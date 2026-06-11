// Sanity-тест v1.54.4 «гроза требует подтверждения» (фидбек юзера 11.06).
// Извлекает РЕАЛЬНЫЙ stormRiskLevel из app.js.
// Запуск: node scripts/test-storm.mjs
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const a = app.indexOf('function stormRiskLevel');
const b = app.indexOf('// Строит массив 48 часов', a);
if (a === -1 || b === -1) throw new Error('Маркеры stormRiskLevel не найдены');
const mod = new Function(`${app.slice(a, b)}; return { stormRiskLevel };`)();

let failed = 0;
const assert = (cond, name, extra = '') => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  → ' + extra : ''}`);
  if (!cond) failed++;
};
const lvl = (h) => mod.stormRiskLevel(h);

// 1. Сценарий юзера: жаркое лето, CAPE 800–1500, сухо → был «умеренный» (2), стал «слабый» (1)
assert(lvl({ wc: 3, cape: 1200, li: -1, p: 10, pmm: 0, cl: 40 }) === 1,
  'сухой CAPE 1200 → уровень 1 (был 2, «локальные грозы с дождём» при нуле осадков)');
// 2. Тот же CAPE + влажностный сигнал → честный «умеренный»
assert(lvl({ wc: 3, cape: 1200, li: -1, p: 60, pmm: 0.4, cl: 80 }) === 2,
  'CAPE 1200 + вероятность 60% → уровень 2');
// 3. Outlier-код 95 от одной модели без энергии → капится
assert(lvl({ wc: 95, cape: 200, li: 0, p: 20, pmm: 0, cl: 50 }) === 1,
  'wc=95 при CAPE 200 → уровень 1 (урок v1.42.4 бота)');
// 4. Код 95 с энергией → остаётся 2
assert(lvl({ wc: 95, cape: 900, li: -2, p: 40, pmm: 0.5, cl: 80 }) === 2,
  'wc=95 + CAPE 900 → уровень 2');
// 5. Дыра старой лестницы: CAPE 2600 при LI −3 проваливался в 0
assert(lvl({ wc: 3, cape: 2600, li: -3, p: 70, pmm: 1.2, cl: 90 }) === 3,
  'CAPE 2600 + влага → уровень 3 (раньше был 0 — дыра диапазонов)');
// 6. Тот же экстремальный CAPE, но сухо → 1
assert(lvl({ wc: 3, cape: 2600, li: -3, p: 5, pmm: 0, cl: 20 }) === 1,
  'CAPE 2600 сухой → уровень 1');
// 7. Слабая нестабильность не тронута
assert(lvl({ wc: 2, cape: 500, li: 0, p: 10, pmm: 0, cl: 30 }) === 1, 'CAPE 500 → уровень 1 (как было)');
assert(lvl({ wc: 1, cape: 100, li: 1, p: 5, pmm: 0, cl: 10 }) === 0, 'спокойный час → 0');
// 8. wc=99 с энергией → опасный; без — капится
assert(lvl({ wc: 99, cape: 2000, li: -5, p: 80, pmm: 3, cl: 95 }) === 4, 'wc=99 + CAPE 2000 → 4');
assert(lvl({ wc: 99, cape: 250, li: 0, p: 10, pmm: 0, cl: 40 }) === 1, 'wc=99 при CAPE 250 (фантом) → 1');

console.log(failed === 0 ? '\n✅ Все проверки пройдены' : `\n❌ Провалено: ${failed}`);
process.exitCode = failed === 0 ? 0 : 1;
