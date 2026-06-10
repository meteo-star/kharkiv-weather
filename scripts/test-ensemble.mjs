// Sanity-тест этапа 3 «Ансамблевая вероятность осадков» (v1.53.0).
// Извлекает РЕАЛЬНЫЙ код из app.js:
//   1) quantileSorted — квантили с линейной интерполяцией
//   2) parseEnsembleHourly — pWet час/день + P10/P50/P90 по членам ECMWF ENS
//   3) computeSmartForecast(…, ensemble) — override вероятностей + precipBand
//   4) живые данные ensemble-api для Південного
// Запуск: node scripts/test-ensemble.mjs
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');

function slice(src, from, to) {
  const a = src.indexOf(from);
  const b = src.indexOf(to, a);
  if (a === -1 || b === -1) throw new Error(`Не найден блок: ${from} … ${to}`);
  return src.slice(a, b);
}

const code =
  slice(app, 'const WET_DAY_MM', '// === Bias-correction') +
  slice(app, 'const BIAS_MIN_SAMPLES', '// === Weighted ensemble') +
  slice(app, 'const WEIGHT_MIN_SAMPLES = 3;', 'function computeEnsembleWeights') +
  slice(app, 'function precipScoreOf', '// Качество: 0 (отлично)') +
  slice(app, 'const ENSEMBLE_WET_HOUR_MM', '// Из ответа Air Quality') +
  slice(app, 'const SMART_ALPHA', '// Состояние accuracy —');

const mod = new Function(`
  let ACCURACY_STATE = { stats: {}, sampleSize: 0 };
  const codeToCondition = () => 'cloudy';
  const downgradeWetHourlyConditions = () => {};
  const uvLabelFromValue = () => 'ok';
  ${code};
  function getEffectiveBiasForSource() { return null; }
  return { quantileSorted, parseEnsembleHourly, computeSmartForecast, accuracyComposite };
`)();

let failed = 0;
const assert = (cond, name, extra = '') => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  → ' + extra : ''}`);
  if (!cond) failed++;
};
const approx = (a, b, eps = 0.01) => typeof a === 'number' && Math.abs(a - b) <= eps;

// ───────────── 1. quantileSorted ─────────────
assert(mod.quantileSorted([0, 1, 2, 3, 4], 0.5) === 2, 'квантиль: медиана нечётного массива');
assert(approx(mod.quantileSorted([0, 1, 2, 3, 4], 0.1), 0.4), 'квантиль: P10 с интерполяцией', String(mod.quantileSorted([0, 1, 2, 3, 4], 0.1)));
assert(mod.quantileSorted([], 0.5) === null, 'квантиль: пустой массив → null');

// ───────────── 2. parseEnsembleHourly ─────────────
// 12 членов, 2 дня (48ч). День 0: члены 0–5 дают 1 мм в час 5, остальные сухо.
// День 1: все сухо.
const N_MEMBERS = 12, HOURS = 48;
const fakeHourly = { time: Array.from({ length: HOURS }, (_, i) =>
  `2026-06-${String(10 + Math.floor(i / 24)).padStart(2, '0')}T${String(i % 24).padStart(2, '0')}:00`) };
for (let m = 0; m < N_MEMBERS; m++) {
  const key = m === 0 ? 'precipitation' : `precipitation_member${String(m).padStart(2, '0')}`;
  fakeHourly[key] = Array.from({ length: HOURS }, (_, i) => (i === 5 && m < 6) ? 1.0 : 0);
}
const ens = mod.parseEnsembleHourly({ hourly: fakeHourly });
assert(ens && ens.startDate === '2026-06-10', 'парсер: startDate', ens?.startDate);
assert(ens.hours.length === 48, 'парсер: 48 часов');
assert(ens.hours[5].pWet === 50, 'парсер: час 5 — 6 из 12 членов мокрые → 50%', `pWet=${ens.hours[5].pWet}`);
assert(ens.hours[4].pWet === 0, 'парсер: сухой час → 0%');
assert(ens.daily.length === 2, 'парсер: 2 дня');
assert(ens.daily[0].pWet === 50, 'парсер: день 0 — 50% членов с суммой ≥0.5 мм', `pWet=${ens.daily[0].pWet}`);
// сортированные суммы дня 0: [0×6, 1×6] → P50 = 0.5 (интерполяция), P90 = 1
assert(approx(ens.daily[0].p50, 0.5), 'парсер: P50 дня 0 = 0.5 мм', `p50=${ens.daily[0].p50}`);
assert(approx(ens.daily[0].p90, 1.0), 'парсер: P90 дня 0 = 1.0 мм', `p90=${ens.daily[0].p90}`);
assert(ens.daily[1].pWet === 0 && approx(ens.daily[1].p90, 0), 'парсер: день 1 полностью сухой');
assert(ens.daily[0].members === 12, 'парсер: members = 12');
// меньше 10 членов → null (не ансамбль)
assert(mod.parseEnsembleHourly({ hourly: { time: fakeHourly.time, precipitation: fakeHourly.precipitation } }) === null,
  'парсер: < 10 членов → null');

// ───────────── 3. computeSmartForecast + ensemble ─────────────
const mkDay = (t, pmm) => ({
  id: 0, name: 'Сегодня', dayName: 'Среда', date: '10.06.2026',
  condition: 'cloudy', condLabel: 'Облачно', condDescKey: null, condDesc: '',
  max: t + 5, min: t - 5, precip: 10, precipSum: pmm * 3, wind: 3, windDir: 'N',
  windGust: 6, humidity: 60, pressure: 750, pressureTrend: 'stable', dewPoint: 10,
  sunrise: '05:00', sunset: '21:00', dayLen: '16ч', moonIllum: 50, moonName: 'x',
  moonWaxing: true, uv: 5, uvLabel: 'ok', aqi: 42, aqiLabel: 'ok',
  hourly: Array.from({ length: 24 }, (_, h) => ({
    h, t, p: 10, pmm, w: 3, c: 'cloudy', feels: t, cl: 50, pr: 750, hum: 60, dp: 10,
    uvi: 3, vis: 10, sr: 100, wc: 3, cape: 100, li: 0
  }))
});
const fcs = [[mkDay(20, 0)], [mkDay(20, 0)], [mkDay(20, 0)], [mkDay(20, 0)]];
const ids = ['a', 'b', 'c', 'd'];
// ансамбль на 1 день: час 5 pWet=50, день pWet=50/полоса
const ens1 = { startDate: '2026-06-10', hours: ens.hours.slice(0, 24), daily: [ens.daily[0]] };
const smart = mod.computeSmartForecast(fcs, ids, ens1);
assert(smart[0].hourly[5].p === 50, 'smart+ens: час 5 p из ансамбля (50%), модели говорили 10%', `p=${smart[0].hourly[5].p}`);
assert(smart[0].hourly[4].p === 0, 'smart+ens: сухой час p=0 из ансамбля');
assert(smart[0].precip === 50, 'smart+ens: precip дня = max почасовой доли', `precip=${smart[0].precip}`);
assert(smart[0].precipBand && smart[0].precipBand.pDay === 50 && approx(smart[0].precipBand.p90, 1.0),
  'smart+ens: precipBand {pDay, p90} прикреплён', JSON.stringify(smart[0].precipBand));
assert(smart[0].precipBand.members === 12, 'smart+ens: members в band');
// без ансамбля — прежнее поведение
const smartNoEns = mod.computeSmartForecast(fcs, ids, null);
assert(smartNoEns[0].hourly[5].p === 10, 'smart без ens: p из моделей (10%)');
assert(smartNoEns[0].precipBand === null, 'smart без ens: band отсутствует');

// ───────────── 4. Живые данные (Південне) ─────────────
try {
  const url = 'https://ensemble-api.open-meteo.com/v1/ensemble?latitude=49.88&longitude=36.06&hourly=precipitation&models=ecmwf_ifs025&forecast_days=7&timezone=auto';
  const r = await fetch(url);
  const data = await r.json();
  const live = mod.parseEnsembleHourly(data);
  assert(live && live.daily.length === 7, 'live: 7 дней распарсено', `days=${live?.daily?.length}`);
  assert(live.daily[0] && live.daily[0].members >= 50, 'live: ≥50 членов ECMWF ENS', `members=${live.daily[0]?.members}`);
  console.log(`\n── Південне: ансамбль ECMWF ENS (${live.daily[0].members} членов), старт ${live.startDate}`);
  for (const d of live.daily) {
    if (!d) continue;
    console.log(`${d.date}: дождь в ${String(d.pWet).padStart(3)}% сценариев · P10/P50/P90 = ${d.p10}/${d.p50}/${d.p90} мм`);
  }
} catch (e) {
  console.log(`\n── live-запрос не удался (${e.message}) — не критично`);
}

console.log(failed === 0 ? '\n✅ Все проверки пройдены' : `\n❌ Провалено: ${failed}`);
process.exitCode = failed === 0 ? 0 : 1;
