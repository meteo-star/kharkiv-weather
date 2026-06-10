// Sanity-тест этапа 2 «🎯 Smart» (v1.52.0).
// Извлекает РЕАЛЬНЫЙ код из app.js и bot/src/index.js (без дублирования логики):
//   1) computeSmartWeights: заострение α=2, shrinkage, медианный вес, uniform-fallback
//   2) weightedMedian: медиана мм против размазывания ливней
//   3) computeSmartForecast: дебиаз членов, per-variable веса, медиана precipSum
//   4) воркер: smartStatsFromRecords / computeSmartDayWorker — синхронность формул
//   5) живые данные Worker'а: какие веса Smart даст для Харькова и Південного
// Запуск: node scripts/test-smart.mjs
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const bot = readFileSync(new URL('../bot/src/index.js', import.meta.url), 'utf8');

function slice(src, from, to) {
  const a = src.indexOf(from);
  const b = src.indexOf(to, a);
  if (a === -1 || b === -1) throw new Error(`Не найден блок: ${from} … ${to}`);
  return src.slice(a, b);
}

// --- Сайт: stats/score + smart-блок. Заглушки для зависимостей рендера. ---
const siteCode =
  slice(app, 'const WET_DAY_MM', '// === Bias-correction') +
  slice(app, 'const BIAS_MIN_SAMPLES', '// === Weighted ensemble') +
  slice(app, 'const WEIGHT_MIN_SAMPLES = 3;', 'function computeEnsembleWeights') +
  slice(app, 'function precipScoreOf', '// Качество: 0 (отлично)') +
  slice(app, 'const SMART_ALPHA', '// Состояние accuracy —');

const site = new Function(`
  let ACCURACY_STATE = { stats: {}, sampleSize: 0 };
  const codeToCondition = () => 'cloudy';
  const downgradeWetHourlyConditions = () => {};
  const uvLabelFromValue = () => 'ok';
  ${siteCode};
  function getEffectiveBiasForSource(srcId) {
    const s = ACCURACY_STATE && ACCURACY_STATE.stats && ACCURACY_STATE.stats[srcId];
    if (!s) return null;
    const tempMaxBias = effectiveBias(s.tempMaxBias, s.nTempMax || 0, BIAS_CAP_TEMP);
    const tempMinBias = effectiveBias(s.tempMinBias, s.nTempMin || 0, BIAS_CAP_TEMP);
    const precipBias  = effectiveBias(s.precipBias,  s.nPrecip  || 0, BIAS_CAP_PRECIP);
    if (tempMaxBias === 0 && tempMinBias === 0 && precipBias === 0) return null;
    return { tempMax: tempMaxBias, tempMin: tempMinBias, precip: precipBias };
  }
  return {
    setState: (st) => { ACCURACY_STATE = st; },
    computeAccuracyStats, precipScoreOf, accuracyComposite,
    computeSmartWeights, weightedMedian, computeSmartForecast
  };
`)();

// --- Воркер: smart-блок целиком. ---
const botCode = slice(bot, 'const SMART_ALPHA', '// Обновляет accuracy-records для точки');
const worker = new Function(`
  ${botCode};
  return { smartStatsFromRecords, smartWeightsWorker, computeSmartDayWorker, weightedMedianWorker, smartEffBias };
`)();

let failed = 0;
const assert = (cond, name, extra = '') => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  → ' + extra : ''}`);
  if (!cond) failed++;
};
const approx = (a, b, eps = 0.01) => typeof a === 'number' && Math.abs(a - b) <= eps;

// ───────────── 1. computeSmartWeights ─────────────
const mkStats = (over = {}) => ({
  tempMaxMAE: 2, tempMinMAE: 2, nTempMax: 20, nTempMin: 20, n: 20,
  precipOccMiss: 30, precipAmtMAE: 1.0, nPrecipGt: 20, nPrecip: 20,
  tempMaxBias: 0, tempMinBias: 0, precipBias: 0,
  ...over
});
const ids4 = ['a', 'b', 'c', 'd'];
site.setState({ sampleSize: 20, stats: {
  a: mkStats({ tempMaxMAE: 0.5 }),  // явно лучшая по Tmax
  b: mkStats({ tempMaxMAE: 2.0 }),
  c: mkStats({ tempMaxMAE: 2.0 }),
  d: mkStats({ tempMaxMAE: 2.0 })
}});
let w = site.computeSmartWeights(ids4, 'tempMax');
assert(w.get('a') > 0.5, 'заострение: лучшая модель доминирует', `w(a)=${(w.get('a')*100).toFixed(1)}%`);
assert(approx([...w.values()].reduce((s, x) => s + x, 0), 1), 'веса нормированы к 1');
// при равных MAE — почти uniform
site.setState({ sampleSize: 20, stats: { a: mkStats(), b: mkStats(), c: mkStats(), d: mkStats() } });
w = site.computeSmartWeights(ids4, 'tempMax');
assert(approx(w.get('a'), 0.25, 0.001), 'равные MAE → uniform', `w(a)=${(w.get('a')*100).toFixed(1)}%`);
// мало данных (n=4 → sharp=(4−3)/(10−3)≈0.14) — близко к uniform
site.setState({ sampleSize: 4, stats: {
  a: mkStats({ tempMaxMAE: 0.5, nTempMax: 4 }), b: mkStats({ nTempMax: 4 }),
  c: mkStats({ nTempMax: 4 }), d: mkStats({ nTempMax: 4 })
}});
w = site.computeSmartWeights(ids4, 'tempMax');
assert(w.get('a') < 0.40, 'shrink: на 4 замерах заострение придушено', `w(a)=${(w.get('a')*100).toFixed(1)}%`);
// меньше половины моделей с данными → uniform
site.setState({ sampleSize: 20, stats: { a: mkStats() } });
w = site.computeSmartWeights(ids4, 'tempMax');
assert(approx(w.get('d'), 0.25, 0.001), '<половины моделей с данными → uniform');
// per-variable независимость: лидер по Tmax ≠ лидер по precip
site.setState({ sampleSize: 20, stats: {
  a: mkStats({ tempMaxMAE: 0.5, precipOccMiss: 60 }),
  b: mkStats({ precipOccMiss: 10, precipAmtMAE: 0.4 }),
  c: mkStats(), d: mkStats()
}});
const wT = site.computeSmartWeights(ids4, 'tempMax');
const wP = site.computeSmartWeights(ids4, 'precip');
assert(wT.get('a') > wT.get('b') && wP.get('b') > wP.get('a'),
  'per-variable: Tmax-лидер и precip-лидер разные',
  `Tmax: a=${(wT.get('a')*100).toFixed(0)}% b=${(wT.get('b')*100).toFixed(0)}% · precip: a=${(wP.get('a')*100).toFixed(0)}% b=${(wP.get('b')*100).toFixed(0)}%`);

// ───────────── 2. weightedMedian ─────────────
assert(site.weightedMedian([{ v: 0, w: 1 }, { v: 0, w: 1 }, { v: 0, w: 1 }, { v: 8, w: 1 }]) === 0,
  'медиана: 1 ливень из 4 сухих → 0 мм (mean дал бы 2.0)');
assert(site.weightedMedian([{ v: 0, w: 0.1 }, { v: 6, w: 0.9 }]) === 6,
  'медиана: вес точной модели доминирует', '0.9 веса на 6мм → 6');

// ───────────── 3. computeSmartForecast (дебиаз + медиана) ─────────────
const mkDay = (t, pmm, over = {}) => ({
  id: 0, name: 'Сегодня', dayName: 'Среда', date: '10.06.2026',
  condition: 'cloudy', condLabel: 'Облачно', condDescKey: null, condDesc: '',
  max: t + 5, min: t - 5, precip: 50, precipSum: pmm * 3, wind: 3, windDir: 'N',
  windGust: 6, humidity: 60, pressure: 750, pressureTrend: 'stable', dewPoint: 10,
  sunrise: '05:00', sunset: '21:00', dayLen: '16ч', moonIllum: 50, moonName: 'x',
  moonWaxing: true, uv: 5, uvLabel: 'ok', aqi: 42, aqiLabel: 'ok',
  hourly: Array.from({ length: 24 }, (_, h) => ({
    h, t: t + Math.round(5 * Math.sin((h - 9) / 24 * 2 * Math.PI)),
    p: 50, pmm, w: 3, c: 'cloudy', feels: t, cl: 50, pr: 750, hum: 60, dp: 10,
    uvi: 3, vis: 10, sr: 100, wc: 3, cape: 100, li: 0
  })),
  ...over
});
// Модель X систематически +2° (bias накоплен, n=20) — Smart должен вычесть.
site.setState({ sampleSize: 20, stats: {
  x: mkStats({ tempMaxBias: 2, tempMinBias: 2 }),
  y: mkStats(), z: mkStats(), q: mkStats()
}});
const fcX = [mkDay(22, 0)], fcY = [mkDay(20, 0)], fcZ = [mkDay(20, 0)], fcQ = [mkDay(20, 0)];
const smartFc = site.computeSmartForecast([fcX, fcY, fcZ, fcQ], ['x', 'y', 'z', 'q']);
// Наивный mean ПО ПОЛУДЕННЫМ значениям (у mkDay полдень = base + 4):
// (26 + 24 + 24 + 24) / 4 = 24.5. Smart должен вычесть +2° у X: (24+24+24+24)/4 = 24.
const noonNaive = [fcX, fcY, fcZ, fcQ].map(f => f[0].hourly[12].t).reduce((s, v) => s + v, 0) / 4;
const noonSmart = smartFc[0].hourly[12].t;
assert(noonSmart < noonNaive && Math.abs(noonSmart - 24) <= 0.5,
  'дебиаз члена: +2°-модель скорректирована',
  `smart=${noonSmart}° (ожидание 24), наивный mean=${noonNaive}°`);
// Медиана мм: 1 модель из 4 видит ливень → pmm 0
const fcRain = [mkDay(20, 4)], fcD1 = [mkDay(20, 0)], fcD2 = [mkDay(20, 0)], fcD3 = [mkDay(20, 0)];
site.setState({ sampleSize: 20, stats: { x: mkStats(), y: mkStats(), z: mkStats(), q: mkStats() } });
const smartRain = site.computeSmartForecast([fcRain, fcD1, fcD2, fcD3], ['x', 'y', 'z', 'q']);
assert(smartRain[0].hourly[12].pmm === 0, 'медиана pmm: 1 ливень из 4 → 0 мм/ч',
  `pmm=${smartRain[0].hourly[12].pmm}, pmmMax=${smartRain[0].hourly[12].pmmMax}`);
assert(smartRain[0].precipSum === 0, 'медиана precipSum: 1 ливень из 4 → 0 мм/сутки');
assert(smartRain[0].hourly[12].pmmMax === 4, 'pmmMax сохраняет сигнал выброса (для UI)');

// ───────────── 4. Воркер: синхронность формул ─────────────
// Записи: модель good всегда точна, bad всегда +3° и сухой враль при дождях.
const mkRec = (date, actT, actMm) => ({
  date, actualSource: 'archive',
  actual: { tempMax: actT, tempMin: actT - 10, precipSum: actMm, precipProb: 50 },
  predictions: {
    good: { tempMax: actT, tempMin: actT - 10, precipSum: actMm, precipProb: 50 },
    bad:  { tempMax: actT + 3, tempMin: actT - 7, precipSum: 0, precipProb: 50 },
    mid1: { tempMax: actT + 1, tempMin: actT - 9, precipSum: actMm > 0 ? actMm + 2 : 0.7, precipProb: 50 },
    mid2: { tempMax: actT - 1, tempMin: actT - 11, precipSum: actMm > 0 ? Math.max(0, actMm - 2) : 0, precipProb: 50 }
  }
});
const recs = Array.from({ length: 15 }, (_, i) => mkRec(`2026-05-${String(i + 1).padStart(2, '0')}`, 20 + (i % 5), i % 3 === 0 ? 4 : 0));
const wStats = worker.smartStatsFromRecords(recs);
assert(approx(wStats.good.maeMax, 0), 'воркер stats: good MAE=0', String(wStats.good.maeMax));
assert(approx(wStats.bad.maeMax, 3) && approx(wStats.bad.biasMax, 3), 'воркер stats: bad MAE=bias=+3');
assert(wStats.bad.precipScore > wStats.good.precipScore, 'воркер stats: precipScore наказывает сухого враля');
const wwT = worker.smartWeightsWorker(wStats, ['good', 'bad', 'mid1', 'mid2'], 'tempMax');
assert(wwT.get('good') > 0.6, 'воркер веса: good доминирует по Tmax', `${(wwT.get('good')*100).toFixed(0)}%`);
// smart-день: byModel-формат воркера
const byModel = {
  good: [null, { date: 'D+1', tempMax: 25, tempMin: 15, precipSum: 3, precipProb: 70 }],
  bad:  [null, { date: 'D+1', tempMax: 28, tempMin: 18, precipSum: 0, precipProb: 20 }],
  mid1: [null, { date: 'D+1', tempMax: 26, tempMin: 16, precipSum: 5, precipProb: 60 }],
  mid2: [null, { date: 'D+1', tempMax: 24, tempMin: 14, precipSum: 1, precipProb: 50 }],
  avg:  [null, { date: 'D+1', tempMax: 25.8, tempMin: 15.8, precipSum: 2.3, precipProb: 50 }]
};
const sd = worker.computeSmartDayWorker(byModel, wStats, 1);
assert(sd && sd.tempMax != null && Math.abs(sd.tempMax - 25) < 1,
  'воркер smart-день: tempMax тянется к good (дебиаз+вес)', `tempMax=${sd.tempMax}`);
assert(sd.precipSum === 3, 'воркер smart-день: precipSum = взвешенная медиана', `${sd.precipSum}мм`);

// ───────────── 5. Живые данные: какие веса Smart даст сейчас ─────────────
const API = 'https://meteo-star-bot.stanislav-perec.workers.dev/api/accuracy';
for (const [name, lat, lon] of [['Харьков', 49.99, 36.23], ['Південне', 49.88, 36.06]]) {
  try {
    const r = await fetch(`${API}?lat=${lat}&lon=${lon}`);
    const data = await r.json();
    const records = (data.records || []).map(s => ({
      date: s.date, actualSource: s.actualSource,
      actual: s.actual ? { ...s.actual, precip: s.actual.precipProb } : null,
      predictions: Object.fromEntries(Object.entries(s.predictions || {}).map(([k, m]) => [k, { ...m, precip: m.precipProb }]))
    }));
    const st = site.computeAccuracyStats(records);
    site.setState(st);
    const ids = ['ecmwf', 'aifs', 'gfs', 'icon', 'gem', 'jma', 'mf', 'ukmo'];
    console.log(`\n── ${name}: Smart-веса на живых данных (${st.sampleSize} замеров, ${st.groundTruthSamples} gt)`);
    for (const [metric, label] of [['tempMax', 'Tmax  '], ['tempMin', 'Tmin  '], ['precip', 'Осадки']]) {
      const wm = site.computeSmartWeights(ids, metric);
      const top = ids.map(id => ({ id, p: (wm.get(id) || 0) * 100 })).sort((a, b) => b.p - a.p);
      console.log(`${label}: ${top.slice(0, 4).map(x => `${x.id} ${x.p.toFixed(0)}%`).join(' · ')} …`);
    }
  } catch (e) {
    console.log(`\n── ${name}: запрос не удался (${e.message}) — не критично`);
  }
}

console.log(failed === 0 ? '\n✅ Все проверки пройдены' : `\n❌ Провалено: ${failed}`);
// НЕ process.exit(): на Windows node может крэшнуть в libuv при выходе с
// открытыми keep-alive сокетами fetch. exitCode даёт чистое завершение.
process.exitCode = failed === 0 ? 0 : 1;
