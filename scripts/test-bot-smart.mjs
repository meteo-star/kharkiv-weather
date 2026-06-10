// Sanity-тест этапа 4 «Синхронизация бота» (v1.54.0).
// Извлекает РЕАЛЬНЫЙ код из bot/src/index.js:
//   1) averageHourlyMultiModel / averageDailyMultiModel — smart-агрегация
//      (дебиаз температуры, медиана мм, веса) и регрессия avg-пути (без cfg)
//   2) evaluateRule rain_soon/precip_soon — вероятность из fc.ensP:
//      ансамбль 0% ВЕТИРУЕТ proxy-«100%», высокий ensP даёт fire
// Запуск: node scripts/test-bot-smart.mjs
import { readFileSync } from 'node:fs';

const bot = readFileSync(new URL('../bot/src/index.js', import.meta.url), 'utf8');

function slice(src, from, to) {
  const a = src.indexOf(from);
  const b = src.indexOf(to, a);
  if (a === -1 || b === -1) throw new Error(`Не найден блок: ${from} … ${to}`);
  return src.slice(a, b);
}

const code =
  slice(bot, 'function precipThresholds', 'function validateRule') +
  slice(bot, 'function smartStatsFromRecords', '// Обновляет accuracy-records для точки') +
  slice(bot, 'const MODEL_TO_SRCID', 'const _smartCfgCache') +
  slice(bot, 'function averageHourlyMultiModel', 'function averageMinutely15MultiModel') +
  slice(bot, 'function findFirstWetMinutely', 'function buildMorningSummary');

const mod = new Function(`
  // — стабы i18n/утилит (evaluateRule использует только для текстов сообщений) —
  const t = (key, lang, params) => key + (params ? ':' + JSON.stringify(params) : '');
  const tSourceFooter = () => 'src';
  const tInMinutes = (m) => 'in ' + m + 'min';
  const tWhenStr = (iso) => String(iso);
  const esc = (s) => String(s);
  ${code};
  return { precipThresholds, smartStatsFromRecords, smartEffBias, smartWeightsWorker,
           weightedMedianWorker, averageHourlyMultiModel, averageDailyMultiModel, evaluateRule };
`)();

let failed = 0;
const assert = (cond, name, extra = '') => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  → ' + extra : ''}`);
  if (!cond) failed++;
};
const approx = (a, b, eps = 0.01) => typeof a === 'number' && Math.abs(a - b) <= eps;

// ───────────── 1. Агрегация: подготовка ─────────────
const MODELS = ['ecmwf_ifs025', 'ecmwf_aifs025_single', 'gfs_seamless', 'icon_seamless',
                'gem_seamless', 'jma_seamless', 'meteofrance_seamless', 'ukmo_seamless'];
// hourly-данные: все модели 20°, кроме ecmwf = 22° (его bias +2 в cfg);
// precipitation: только gfs видит 4 мм, остальные 0; probability: все 30.
const mkHourly = () => {
  const h = { time: ['2026-06-11T12:00'] };
  for (const m of MODELS) {
    h[`temperature_2m_${m}`] = [m === 'ecmwf_ifs025' ? 22 : 20];
    h[`apparent_temperature_${m}`] = [m === 'ecmwf_ifs025' ? 22 : 20];
    h[`precipitation_${m}`] = [m === 'gfs_seamless' ? 4 : 0];
    h[`precipitation_probability_${m}`] = [30];
    h[`weather_code_${m}`] = [61];
    h[`wind_speed_10m_${m}`] = [3];
    h[`wind_gusts_10m_${m}`] = [6];
    h[`wind_direction_10m_${m}`] = [180];
    h[`cape_${m}`] = [100];
    h[`lifted_index_${m}`] = [0];
  }
  return h;
};
// smartCfg: равные веса, у ecmwf дебиаз +2°
const uniformCfg = { perModel: {} };
for (const m of MODELS) {
  uniformCfg.perModel[m] = {
    tempW: 1 / 8, maxW: 1 / 8, minW: 1 / 8, precW: 1 / 8,
    biasMax: m === 'ecmwf_ifs025' ? 2 : 0,
    biasMin: m === 'ecmwf_ifs025' ? 2 : 0,
    biasMid: m === 'ecmwf_ifs025' ? 2 : 0
  };
}

// ───────────── 1a. Регрессия: без smartCfg = прежний avg ─────────────
const avgH = mod.averageHourlyMultiModel(mkHourly(), MODELS);
assert(approx(avgH.temperature_2m[0], (22 + 20 * 7) / 8), 'avg: температура — обычный mean (22+20×7)/8', String(avgH.temperature_2m[0]));
assert(approx(avgH.precipitation[0], 0.5), 'avg: precipitation — mean (4/8 = 0.5)', String(avgH.precipitation[0]));
assert(avgH.weather_code[0] === 61, 'avg: weather_code — max');

// ───────────── 1b. Smart: дебиаз + медиана ─────────────
const smH = mod.averageHourlyMultiModel(mkHourly(), MODELS, uniformCfg);
assert(approx(smH.temperature_2m[0], 20), 'smart: дебиаз ecmwf +2° → температура ровно 20', String(smH.temperature_2m[0]));
assert(smH.precipitation[0] === 0, 'smart: медиана мм — 1 ливень из 8 → 0 (avg давал 0.5)', String(smH.precipitation[0]));
assert(approx(smH.precipitation_probability[0], 30), 'smart: probability — взвешенный mean (30)');
// заострённые веса: gfs доминирует в осадках → медиана уходит к его 4 мм
const gfsCfg = JSON.parse(JSON.stringify(uniformCfg));
for (const m of MODELS) gfsCfg.perModel[m].precW = m === 'gfs_seamless' ? 0.8 : 0.2 / 7;
const smH2 = mod.averageHourlyMultiModel(mkHourly(), MODELS, gfsCfg);
assert(smH2.precipitation[0] === 4, 'smart: 80% веса у gfs → медиана берёт его 4 мм', String(smH2.precipitation[0]));

// ───────────── 1c. Daily: дебиаз tMax, медиана сумм ─────────────
const mkDaily = () => {
  const d = { time: ['2026-06-11'] };
  for (const m of MODELS) {
    d[`temperature_2m_max_${m}`] = [m === 'ecmwf_ifs025' ? 27 : 25];
    d[`temperature_2m_min_${m}`] = [m === 'ecmwf_ifs025' ? 17 : 15];
    d[`precipitation_sum_${m}`] = [m === 'gfs_seamless' ? 8 : 0.4];
    d[`weather_code_${m}`] = [61];
    d[`sunrise_${m}`] = ['05:00'];
    d[`sunset_${m}`] = ['21:00'];
  }
  return d;
};
const avgD = mod.averageDailyMultiModel(mkDaily(), MODELS);
assert(avgD.precipitation_sum[0] === 8, 'avg daily: precipitation_sum — консервативный max (8)');
const smD = mod.averageDailyMultiModel(mkDaily(), MODELS, uniformCfg);
assert(approx(smD.temperature_2m_max[0], 25), 'smart daily: tMax с дебиазом ecmwf → 25', String(smD.temperature_2m_max[0]));
assert(approx(smD.precipitation_sum[0], 0.4), 'smart daily: медиана сумм → 0.4 (не 8)', String(smD.precipitation_sum[0]));

// ───────────── 2. evaluateRule: ансамблевая вероятность ─────────────
// Времена в формате Open-Meteo (без Z). ВАЖНО: new Date('YYYY-MM-DDTHH:00')
// парсится как ЛОКАЛЬНОЕ время среды исполнения (в Worker — UTC, в этом
// node-тесте — таймзона машины). Поэтому строим строки в ЛОКАЛЬНОЙ зоне
// машины и ставим utcOffsetSec=0 — тогда nowIdx в evaluateRule сходится
// с реальным «сейчас» (урок v1.42.3 наоборот).
const pad = (x) => String(x).padStart(2, '0');
const mkLocalIso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:00`;
const base = new Date();
base.setMinutes(0, 0, 0);
const times = Array.from({ length: 12 }, (_, i) => mkLocalIso(new Date(base.getTime() + i * 3600e3)));
const WET_IDX = 3;
const mkFc = (ensP) => ({
  utcOffsetSec: 0,
  hourly: {
    time: times,
    temperature_2m: times.map(() => 20),
    precipitation: times.map((_, i) => i === WET_IDX ? 1.0 : 0),
    precipitation_probability: times.map(() => 0),   // моделей без prob — proxy-кейс
    weather_code: times.map((_, i) => i === WET_IDX ? 61 : 3),
    cape: times.map(() => 100),
    lifted_index: times.map(() => 0)
  },
  minutely15: null,
  ensP
});
const sub = { name: 'Test', lang: 'ru', source: 'avg' };
const rule = { type: 'rain_soon', windowHours: 6, sensitivity: 'med' }; // [40%, 0.2мм]

// (а) без ensP: prob=0 + mm≥порога → proxy 100% → fired (старое поведение)
const r1 = mod.evaluateRule(rule, mkFc(null), sub);
assert(r1 && r1.fired === true, 'rain_soon без ensP: proxy-100% → fired (регрессия ок)');
// (б) ensP = 0 во все часы: ансамбль ветирует фантомный дождь → NOT fired
const ensZero = Object.fromEntries(times.map(t => [t, 0]));
const r2 = mod.evaluateRule(rule, mkFc(ensZero), sub);
assert(r2 && r2.fired === false, 'rain_soon с ensP=0: ансамбль ветирует → not fired');
// (в) ensP = 80 в мокрый час: fired, в сообщении prob=80
const ensHigh = Object.fromEntries(times.map((t, i) => [t, i === WET_IDX ? 80 : 5]));
const r3 = mod.evaluateRule(rule, mkFc(ensHigh), sub);
assert(r3 && r3.fired === true && r3.message.includes('prob.part') && r3.message.includes('80'),
  'rain_soon с ensP=80: fired, prob из ансамбля', r3 && (r3.message.split('\n')[0]));
// (г) ensP = 30 (< minProb 40) в мокрый час: not fired несмотря на mm
const ensLow = Object.fromEntries(times.map((t, i) => [t, i === WET_IDX ? 30 : 5]));
const r4 = mod.evaluateRule(rule, mkFc(ensLow), sub);
assert(r4 && r4.fired === false, 'rain_soon с ensP=30 < порога 40: not fired');
// (д) precip_soon (rain): те же семантики
const pRule = { type: 'precip_soon', windowHours: 6, watchRain: true, watchSnow: false, sensitivity: 'med' };
const r5 = mod.evaluateRule(pRule, mkFc(ensHigh), sub);
assert(r5 && r5.fired === true, 'precip_soon с ensP=80: fired');
const r6 = mod.evaluateRule(pRule, mkFc(ensZero), sub);
assert(r6 && r6.fired === false, 'precip_soon с ensP=0: not fired');
// (е) temp_below не задет (другие правила не трогали)
const r7 = mod.evaluateRule({ type: 'temp_below', threshold: 25 }, mkFc(null), sub);
assert(r7 && r7.fired === true, 'temp_below: работает как раньше (20 < 25)');

console.log(failed === 0 ? '\n✅ Все проверки пройдены' : `\n❌ Провалено: ${failed}`);
process.exitCode = failed === 0 ? 0 : 1;
