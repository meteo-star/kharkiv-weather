// Временный sanity-тест этапа 1 «честные осадки» (v1.51.0).
// Извлекает РЕАЛЬНЫЙ код computeAccuracyStats / precipScoreOf / accuracyComposite
// из app.js (никакого дублирования логики) и проверяет:
//   1) синтетика: occurrence (1 − CSI), amount MAE, фильтр actualSource='archive'
//   2) живые данные production-Worker'а для локации пользователя
// Запуск: node scripts/test-precip-metrics.mjs
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../app.js', import.meta.url), 'utf8');

function slice(from, to) {
  const a = src.indexOf(from);
  const b = src.indexOf(to, a);
  if (a === -1 || b === -1) throw new Error(`Не найден блок: ${from} … ${to}`);
  return src.slice(a, b);
}

const code =
  slice('const WET_DAY_MM', '// === Bias-correction') +
  slice('function precipScoreOf', '// Качество: 0 (отлично)');

const { computeAccuracyStats, precipScoreOf, accuracyComposite, WET_DAY_MM } =
  new Function(`${code}; return { computeAccuracyStats, precipScoreOf, accuracyComposite, WET_DAY_MM };`)();

let failed = 0;
const assert = (cond, name, extra = '') => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  → ' + extra : ''}`);
  if (!cond) failed++;
};

// ───────────────────────── 1. Синтетика ─────────────────────────
// 4 archive-дня: факт мм = [5, 0, 2, 0]  (wet, dry, wet, dry при пороге 0.5)
// perfect: повторяет факт → occMiss 0%, amtMAE 0
// dryliar: всегда 0 мм → 2 misses, 0 hits → occMiss 100%, amtMAE (5+0+2+0)/4=1.75≈1.8
// drizzle: всегда 0.6 мм → hits 2, false 2 → CSI 0.5 → occMiss 50%
const days = [
  { date: '2026-06-01', act: 5 },
  { date: '2026-06-02', act: 0 },
  { date: '2026-06-03', act: 2 },
  { date: '2026-06-04', act: 0 }
];
const recs = days.map(d => ({
  date: d.date,
  actualSource: 'archive',
  actual: { tempMax: 20, tempMin: 10, precip: 50, precipSum: d.act },
  predictions: {
    perfect: { tempMax: 20, tempMin: 10, precip: 50, precipSum: d.act },
    dryliar: { tempMax: 21, tempMin: 11, precip: 50, precipSum: 0 },
    drizzle: { tempMax: 19, tempMin: 9,  precip: 50, precipSum: 0.6 }
  }
}));
// + 1 запись БЕЗ archive (прокси) — не должна попасть в precip-метрики
recs.push({
  date: '2026-06-05',
  actual: { tempMax: 20, tempMin: 10, precip: 50, precipSum: 99 },
  predictions: { perfect: { tempMax: 20, tempMin: 10, precip: 50, precipSum: 0 } }
});

const { stats, sampleSize, groundTruthSamples } = computeAccuracyStats(recs);
assert(sampleSize === 5 && groundTruthSamples === 4, 'sampleSize/groundTruth', `${sampleSize}/${groundTruthSamples}`);
assert(stats.perfect.precipOccMiss === 0, 'perfect: occMiss 0%', String(stats.perfect.precipOccMiss));
assert(stats.perfect.precipAmtMAE === 0, 'perfect: amtMAE 0', String(stats.perfect.precipAmtMAE));
assert(stats.perfect.nPrecipGt === 4, 'perfect: прокси-запись отфильтрована', `n_gt=${stats.perfect.nPrecipGt}`);
assert(stats.dryliar.precipOccMiss === 100, 'dryliar: occMiss 100%', String(stats.dryliar.precipOccMiss));
assert(stats.dryliar.precipAmtMAE === 1.8, 'dryliar: amtMAE 1.8', String(stats.dryliar.precipAmtMAE));
assert(stats.drizzle.precipOccMiss === 50, 'drizzle: occMiss 50% (1−CSI)', String(stats.drizzle.precipOccMiss));
assert(precipScoreOf(stats.perfect) === 0, 'precipScoreOf(perfect) = 0');
assert(precipScoreOf(stats.dryliar) > precipScoreOf(stats.drizzle), 'score: dryliar хуже drizzle',
  `${precipScoreOf(stats.dryliar)} > ${precipScoreOf(stats.drizzle)}`);
// composite: perfect = 0(temp) + 0(precip); dryliar должен быть больше
assert(accuracyComposite(stats.perfect) === 0, 'composite(perfect) = 0', String(accuracyComposite(stats.perfect)));
assert(accuracyComposite(stats.dryliar) > accuracyComposite(stats.perfect), 'composite: dryliar > perfect');
// legacy fallback: без новых полей composite использует precipMAE/10
const legacyOnly = { tempMaxMAE: 1, tempMinMAE: 1, precipMAE: 20 };
assert(accuracyComposite(legacyOnly) === 4, 'legacy fallback (1+1+20/10)', String(accuracyComposite(legacyOnly)));

// ───────────────────── 2. Живые данные Worker'а ─────────────────────
const API = 'https://meteo-star-bot.stanislav-perec.workers.dev/api/accuracy';
const spots = [['Харьков', 49.99, 36.23], ['Південне', 49.88, 36.06]];
for (const [name, lat, lon] of spots) {
  try {
    const r = await fetch(`${API}?lat=${lat}&lon=${lon}`);
    const data = await r.json();
    const records = (data.records || []).map(s => ({
      date: s.date,
      actualSource: s.actualSource,
      actual: s.actual ? { ...s.actual, precip: s.actual.precipProb } : null,
      predictions: Object.fromEntries(Object.entries(s.predictions || {}).map(
        ([k, m]) => [k, { ...m, precip: m.precipProb }]))
    }));
    const st = computeAccuracyStats(records);
    console.log(`\n── ${name} (${lat}, ${lon}): записей ${records.length}, замеров ${st.sampleSize}, ground truth ${st.groundTruthSamples}`);
    const rows = Object.entries(st.stats)
      .map(([id, s]) => ({ id, s, score: precipScoreOf(s), comp: accuracyComposite(s) }))
      .filter(r => r.comp != null)
      .sort((a, b) => (a.score ?? 99) - (b.score ?? 99));
    for (const { id, s, score, comp } of rows) {
      console.log(
        `${id.padEnd(8)} occMiss=${s.precipOccMiss != null ? String(s.precipOccMiss).padStart(5) + '%' : '    —'}` +
        ` (событий ${String(s.precipOccEvents ?? 0).padStart(2)})  amtMAE=${s.precipAmtMAE != null ? s.precipAmtMAE.toFixed(1).padStart(4) + 'мм' : '    —'}` +
        `  precipScore=${score != null ? score.toFixed(2).padStart(5) : '    —'}  composite=${comp.toFixed(2).padStart(5)}` +
        `  legacyProbMAE=${s.precipMAE ?? '—'}`
      );
    }
  } catch (e) {
    console.log(`\n── ${name}: запрос не удался (${e.message}) — не критично для теста`);
  }
}

console.log(failed === 0 ? '\n✅ Все проверки пройдены' : `\n❌ Провалено: ${failed}`);
process.exit(failed === 0 ? 0 : 1);
