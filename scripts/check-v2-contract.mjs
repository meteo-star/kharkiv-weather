#!/usr/bin/env node
/**
 * check-v2-contract.mjs — гарантия контракта ID между index.html и v2.html.
 *
 * Правило §4.3 ТЗ редизайна V2: v2.html обязана содержать ВСЕ id-элементы
 * оригинального index.html (даже визуально скрытые — скрываются через CSS,
 * не удаляются из DOM). app.js находит элементы по id, где бы те ни лежали,
 * поэтому потеря любого id ломает рендер v1-логики внутри v2.
 *
 * Скрипт извлекает все статические id="..." из index.html и проверяет их
 * наличие в v2.html. Падает (exit 1) со списком отсутствующих.
 *
 * Запуск: node scripts/check-v2-contract.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const ID_RE = /\bid\s*=\s*"([^"]+)"/g;

/** Все статические id из HTML-файла (в порядке появления, с дублями для диагностики). */
function extractIds(file) {
  const html = readFileSync(join(ROOT, file), 'utf8');
  const ids = [];
  let m;
  while ((m = ID_RE.exec(html)) !== null) ids.push(m[1]);
  return ids;
}

function main() {
  const baseIds = extractIds('index.html');
  const v2Ids = new Set(extractIds('v2.html'));

  const baseSet = new Set(baseIds);
  const missing = [];
  for (const id of baseSet) {
    if (!v2Ids.has(id)) missing.push(id);
  }

  // Дубли id внутри index.html — отдельная диагностика (не падение, но предупреждение).
  const seen = new Set();
  const dupes = new Set();
  for (const id of baseIds) {
    if (seen.has(id)) dupes.add(id);
    seen.add(id);
  }

  console.log(`[v2-contract] index.html: ${baseSet.size} уникальных id (${baseIds.length} вхождений)`);
  console.log(`[v2-contract] v2.html:    ${v2Ids.size} уникальных id`);
  if (dupes.size) {
    console.warn(`[v2-contract] ⚠ дубли id в index.html: ${[...dupes].join(', ')}`);
  }

  if (missing.length) {
    console.error(`\n[v2-contract] ✗ ПРОВАЛ: в v2.html отсутствуют ${missing.length} id из index.html:`);
    for (const id of missing) console.error(`   - #${id}`);
    process.exit(1);
  }

  console.log(`\n[v2-contract] ✓ OK: все ${baseSet.size} id из index.html присутствуют в v2.html`);
}

main();
