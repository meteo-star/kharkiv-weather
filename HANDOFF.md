# HANDOFF.md — Meteo Star

> Шпаргалка для входа в проект в новой сессии Claude.
> **Полная история проекта** — [PROJECT_STATUS.md](PROJECT_STATUS.md).
>
> **Дата обновления:** 10 июня 2026
> **Текущая версия:** v1.52.0 (этап 2 «🎯 Smart» — per-variable заострённые веса + медиана мм + дебиаз членов)

---

## 1. Цель проекта

Веб-агрегатор погоды для конкретной локации (Харьков и любая точка мира) с упором на **максимальную точность прогноза**. Использует усреднение 8 моделей Open-Meteo (7 физических + AIFS AI), с bias-калибровкой и взвешенным ансамблем на основе накопленных замеров. Telegram-бот для push-уведомлений по настраиваемым правилам. Всё на бесплатных сервисах (Open-Meteo, Cloudflare Workers free, GitHub Pages).

---

## 2. Контекст пользователя

**Стас** (Станислав Перец) — корпоративный юрист КНП в м. Південне Харьковской обл. Знает Python/Flask. Любит конкретику и пошаговую работу.

**Как работать:**
- Русский язык
- Тире `–` (en-dash), не `—` (em-dash)
- Пошагово: один шаг → подтверждение → следующий
- После каждого шага давать **кликабельные ссылки** (локалка / live / коммит / тег)
- **Деплой и push: спрашивать подтверждение, выполнять самому** (изменено 31 мая 2026). После правок Claude **спрашивает** «push? деплой?», и при «да» **сам** запускает `git commit` → `git push` → `cd bot && npx wrangler deploy` (если менялся `bot/`). НЕ просить юзера делать это в его консоли — `wrangler login` уже сохранил токен локально, Claude может из любой сессии. Просто подтверди — а исполнитель Claude
- После правок поднимать локальный сервер сам: `python -m http.server 8765 --bind 127.0.0.1`
- Все изменения через feature-ветки: `feature/имя` или `fix/имя` → merge в main → тег → push

---

## 3. Текущее состояние (в production)

🌐 **Live:** https://meteo-star.github.io/kharkiv-weather/
🤖 **Bot:** [@MeteoStarBot](https://t.me/MeteoStarBot)
☁ **Worker:** https://meteo-star-bot.stanislav-perec.workers.dev
📦 **GitHub:** https://github.com/meteo-star/kharkiv-weather

**Что работает (v1.52.0):**
- Прогноз на 10 дней по 8 моделям с **weighted AVG** (вес = 1/MAE), **bias-correction**, **per-variable best** (🏆 отдельно для Tmax/Tmin/precip), **зелёное выделение** лидера в accuracy-таблице
- **Честные precip-метрики (v1.51.0):** точность осадков меряется по реальным мм из archive (ERA5/ERA5T), а не по вероятности-vs-прокси: `precipOccMiss` (% промахов «дождь/сухо», порог 0.5 мм, 1 − CSI) + `precipAmtMAE` (ошибка суточной суммы в мм). Только записи `actualSource='archive'`. В таблице: % промахов крупно + ±мм мелко. DevTools: `dumpPrecip()`
- **🎯 Smart-источник (v1.52.0):** per-variable веса (Tmax/Tmin/осадки — отдельные наборы, `w = 1/(err+ε)²` с shrinkage), температура членов дебиазится до смешивания (MOS-lite), мм-поля — взвешенная МЕДИАНА (не размазывает ливни). Зелёная main-кнопка в панели источников. Worker пишет `predictions.smart` в accuracy-записи — Smart сам доказывает себя в таблице. В боте Smart пока = avg (этап 4). DevTools: `dumpSmart()`
- **15-мин nowcast осадков** на hero — плашка «🌧 Дождь через ~30 мин» с 6 типами осадков (дождь / морось / снег / мокрый снег / ледяной дождь / гроза)
- **Реальный ground truth** в KV — бот каждую ночь в 05:00 UTC тянет наблюдения из Open-Meteo Archive (ERA5/ERA5T) и перезаписывает actual
- **Telegram-бот**: 6 типов правил, cron каждые 30 мин, веб-админка, magic-link `/login`, multi-account UI, групповые чаты, утренняя сводка с подразделами. Использует minutely_15 для precip_soon с windowHours ≤ 2. **i18n** на 16 языков (push'и приходят на родном языке юзера).
- **PWA** (iOS/Android), pull-to-refresh, sticky hero, dark+light темы
- **🌐 16 языков интерфейса** (v1.50.0): ru, uk, en, de, pl, cs, fr, it, es, ro, hu, sk, pt, nl, tr, el. Автодетект из `navigator.language` / `update.message.from.language_code`. iOS-style picker в Settings (3 кнопки RU/UK/EN + chevron на EN → bottom-sheet со всеми 16). Автосинк сайт↔бот при смене языка.

---

## 4. Ключевые файлы

| Файл | Что внутри |
|---|---|
| `index.html` | HTML-разметка, ~1000 строк |
| `app.js` | Вся клиентская логика, ванильный JS, **~16000 строк** (из них ~7000 — словарь I18N на 16 языков) |
| `style.css` | Liquid Glass UI, dark+light темы, responsive |
| `service-worker.js` | PWA cache strategies (network-first для HTML/JS, cache-first для assets) |
| `bot/src/index.js` | Cloudflare Worker, **~2700 строк**: webhook, команды бота, cron, accuracy-cron, HTTP API |
| `bot/src/i18n.js` | **Словарь бота на 16 языков** + хелперы `t/tWhenStr/tPluralDays/tWindDir/tWeatherCodeLabel/tMoonName/tSourceFooter/detectLang` |
| `bot/wrangler.toml` | Конфиг Worker'а (account_id, KV bindings, cron, ADMIN_USER_ID) |
| `assets/scenes/` | 16 hero-фото (4 tod × 4 уровня облачности) |
| `admin.html` + `admin.js` | Веб-админка бота, защищена ADMIN_TOKEN |
| `PROJECT_STATUS.md` | Полная история и все уроки (1200+ строк) |
| `README.md` | Описание для GitHub |

**Ключевые JS-функции (app.js):**
- `parseAllModels(data, sources)` — парсит ответ Open-Meteo с 8 моделями
- `computeAverageForecast(forecasts, weights)` — взвешенный AVG
- `computeEnsembleWeights(modelIds)` — веса по 1/MAE
- `computeSmartWeights(modelIds, metric)` — per-variable веса Smart (α=2 + shrinkage), v1.52.0
- `computeSmartForecast(forecasts, modelIds)` — 🎯 Smart: дебиаз членов + per-variable веса + медиана мм, v1.52.0
- `applyBiasCorrection(forecast, srcId)` — bias-калибровка при отображении
- `nowcastInfo()` + `renderHeroNowcastHint()` — плашка nowcast
- `parseMinutely15(data)` — minutely-15 с поддержкой multi-model
- `downgradeWetHourlyConditions(hourly)` — синхронизация иконки часа с pmm

**Ключевые bot-функции:**
- `fetchWeather(lat, lon, sub)` — учитывает `sub.source` (AVG или одна модель)
- `averageHourlyMultiModel` / `averageMinutely15MultiModel` — агрегация для AVG (precipitation→mean, wc→max)
- `evaluateRule(rule, fc, sub)` — все 6 типов правил
- `findFirstWetMinutely(m15, windowMin, minMm, minProb, utcOffsetSec)` — 15-мин поиск для precip_soon ≤ 2ч
- `runCronCheck` / `runAccuracyCron` / `runObservationsCron` — cron-задачи

---

## 5. Что недавно меняли (последние ~10 версий)

| Версия | Что |
|---|---|
| v1.35.0 | + ECMWF AIFS (AI-модель). Бот ECMWF 0.4° → 0.25° |
| v1.35.1 | Bias-correction по накопленным замерам (shrinkage + cap ±3°C) |
| v1.36.0 | Взвешенный AVG (w = 1/MAE), ACCURACY_STATE грузится до parseAllModels |
| v1.37.0 | Бот тянет ground truth из archive-api (вместо proxy от avg[0]) |
| v1.38.0 | Per-variable best (отдельный 🏆 для Tmax/Tmin/precip) |
| v1.39.0 | 15-мин nowcast плашка на hero (Open-Meteo minutely_15) |
| v1.40.0 | Бот использует minutely_15 для precip_soon с windowHours ≤ 2 |
| v1.40.1 | Fix: убран сбивающий «Без осадков 2 часа» при противоречии источников |
| v1.40.2 | Плашка различает дождь и снег по температуре |
| v1.41.0 | 6 категорий осадков (морось / мокрый снег / ледяной дождь / гроза) |
| v1.42.0 | Единый зелёный лидер в accuracy-таблице (без разделения AVG/модель) |
| v1.42.1 | Fix: иконки часов согласованы с реальным pmm (нет «дождя» при 0 мм/ч) |
| v1.42.2 | **CRITICAL fix**: nowcast плашка не работала с multi-model запросом — `parseMinutely15` искала голое поле, а API отдаёт с суффиксами моделей |
| v1.42.3 | **CRITICAL fix**: бот в Worker UTC парсил Open-Meteo local-times как UTC → все precip правила работали с окном в прошлое |
| v1.42.4 | Fix: whenStr UTC-дата + бот max→mean precipitation (как сайт) + storm требует cape ≥ 500 |
| v1.43.0 | Стрелки ‹ › и touch-swipe в почасовой ленте модалки дня |
| v1.43.1 | Footer «по данным X» в каждом уведомлении бота (avg / ECMWF / AIFS / GFS / ICON / GEM / JMA / Météo-France / UKMO) |
| v1.50.0 | **🌐 i18n релиз — 16 языков:** ru/uk/en + 13 новых (de/pl/cs/fr/it/es/ro/hu/sk/pt/nl/tr/el). Авто-detect, iOS-style picker, автосинк сайт↔бот через `/api/rules-set` body.lang, локализованный бот (`bot/src/i18n.js`), все push-уведомления и утренние сводки на родном языке. ~9000 переводов суммарно (сайт ~7000 + бот ~1100). RULE_DEFS, токены, alerts, aria-labels, единицы измерения — всё через `t()`. |
| v1.50.1 | **Hourly NOW-час: ярче подсветка + надёжное центрирование.** Подсветка текущего часа `.hour-cell.now` приведена к стилю `.day.today` (цианово-фиолетовый градиент, 3-слойное свечение, font-weight 700). Hover усилен. Центрирование при загрузке стало надёжным: флаг `_userScrolledHourly` (отслеживается через `wheel`+`touchmove`, без `pointerdown` чтобы случайный tap не отключал авто-центр) + 4 попытки центрирования (rAF×2 + 100/300/600 мс) ловят стабильный layout даже при медленных шрифтах или PWA cold-start. Ручной `scrollLeft` вместо `scrollIntoView` — mobile-friendly (не «утекает» в скролл страницы на iOS Safari, не зависит от поддержки `behavior:'instant'` который появился только в iOS 17.4). |
| v1.50.2 | **CRITICAL fix бота: уведомления о дожде в прошлом.** В `evaluateRule` для `rain_soon` и `precip_soon` (hourly-ветка с windowH > 2) цикл начинался с `i = nowIdx` — включая текущий час. В 14:30 cron видел mm в hourly[14:00] и слал «🌧 Скоро дождь сегодня в 14:00», хотя час уже на 30 мин прошёл. Фикс: `i = nowIdx + 1` — пропускаем текущий час, «скоро» по определению должно быть в будущем. Minutely-15-ветка (windowH ≤ 2) уже была корректной — там `findFirstWetMinutely` искала только в future минутах. Cooldown логика и `temp_below`/`temp_above`/`storm_alert` циклы НЕ менялись — для них включение текущего часа корректно. |
| v1.50.3 | **Precip cooldown 6ч→3ч + smart-reset на конец «дождевого эпизода».** Раньше после precip-уведомления бот замолкал на 6ч, даже если дождь закончился через 1ч и через 4ч начался новый — юзер не узнавал. Теперь: (1) cooldown precip_soon/rain_soon = 3ч; (2) в cron каждый тик evaluateRule вызывается даже в cooldown, и если осадков в окне НЕТ (fired=false) — `lastFired[ruleKey]` чистится, давая следующему дождю мгновенное уведомление. Защита от спама сохранена: если дождь идёт непрерывно — fired=true → cooldown не сбрасывается → spam-проверка работает. `temp_*`/`storm_alert`/`dry_streak` НЕ менялись (их cooldown логично долгий). |
| v1.51.0 | **Этап 1 «Честные осадки».** Старая precip-метрика была циклической: прогноз вероятности сравнивался с прокси от ансамбля (avg-прогноз дня-0), а не с фактом — AVG структурно выигрывал, модели без probability (AIFS/MF/JMA/UKMO) не участвовали вовсе. Теперь: `precipOccMiss` (% промахов «дождь/сухо», порог 0.5 мм, как 1 − CSI — сухо-сухо дни не считаются) + `precipAmtMAE` (ошибка мм/сутки) — обе только по `actualSource='archive'` (реальные ERA5-наблюдения, сервер копил мм с v1.37). `precipScoreOf()` на °C-шкале → входит в `accuracyComposite` → автоматически чинит и веса AVG. Окно записей 30→60 (сайт + бот). UI: ячейка осадков «N% ± X.Xмм», легенда-пояснение, ключи ×16 языков. `dumpPrecip()` в DevTools. Тест: `scripts/test-precip-metrics.mjs` (12 ассертов на реальном коде + живые данные). **Результат на проде:** Харьков — лидер осадков AVG (28.6%), Південне — лидер ECMWF (20% vs 33.3% у AVG); старый рейтинг показывал AVG лидером везде → гипотеза об артефакте подтверждена. |
| v1.52.0 | **Этап 2 «🎯 Smart-источник».** Не «среднее» и не «жёсткий выбор лучшей модели», а per-variable заострённый ансамбль: для Tmax / Tmin / осадков — СВОИ веса `w = 1/(err+ε)²` (α=2; err осадков = precipScore из v1.51.0). Защиты: <3 замеров → медианный вес, <половины моделей с данными → uniform, глобальный shrink к uniform до 10 замеров (анти-winner's-curse). Температура членов дебиазится ДО смешивания (effectiveBias модели, MOS-lite; осадки не дебиазим — мм-bias не копится, prob-bias построен на legacy-прокси). Часовые t взвешиваются интерполированной смесью Tmin/Tmax-весов по позиции часа в суточном ходе (как bias-интерполяция). Мм-поля (pmm, precipSum) — взвешенная МЕДИАНА (1 ливень-выброс из 8 не размазывается в «морось везде»; pmmMax сохраняет сигнал для UI). `parseAllModels` → `result.smart` (try/catch → fallback avg). UI: зелёная main-кнопка `#smartSrcBtn` (i18n `sources.smartTitle/.smartSub` ×16, имя «Smart» language-neutral), грид моделей фильтруется по `s.model`. **Worker:** зеркальные функции (`smartStatsFromRecords` / `smartWeightsWorker` / `computeSmartDayWorker`, формулы синхронны с app.js!) пишут `predictions.smart` в каждую новую accuracy-запись → Smart копит собственные замеры и появляется в таблице точности через ~3 дня. `sub.source='smart'` принимается (footer «🎯 Smart»), но cron пока считает его как avg — этап 4. DevTools: `dumpSmart()` (веса по параметрам + дебиазы). Тест: `scripts/test-smart.mjs` (18 ассертов сайт+воркер на реальном коде + живые веса). **Живые веса (21 gt):** Харьков — Tmax: AIFS 20%, Tmin: AIFS 27%, осадки: AIFS 22%/MF 21%; Південне — Tmax: GEM 24%, Tmin: AIFS 27%, осадки: ECMWF 28% — три разных лидера по трём параметрам, ровно сценарий юзера. |

---

## 6. Что пробовали и не сработало (предостережения)

1. **RainViewer-blend для 0-2ч nowcast** (планировался v1.39) → не пошло: их free API даёт только тайлы (PNG), точечной интенсивности нет. Чтобы получить мм/ч в точке нужен tile-pixel sampling — хрупко. Заменено на **Open-Meteo minutely_15** (тот же endpoint, без ключа, 15-мин шаг). Работает.

2. **Google GraphCast** (`gfs_graphcast025`) — у Open-Meteo сейчас не публикует данных (null для всех 10 дней). Не использовать пока. Если когда-то заработает — добавим как 9-ю модель.

3. **«Без осадков 2 часа» плашка** (v1.39) → убрана в v1.40.1. Срабатывала при противоречии источников (minutely сухо, hourly дождь) и сбивала пользователя. Корректный случай «дождь скоро закончится» покрывает kind='now' с endsTs.

4. **Bot AVG с `max precipitation`** (v1.30-v1.42.3) → консервативная логика «лучше предупредить лишний раз» на практике давала false positives (1 outlier-модель растягивала окно дождя на весь день). В v1.42.4 синхронизировано с сайтом — `mean`.

5. **`new Date('2026-05-25T11:00').getTime()` в Cloudflare Worker** → парсится как UTC, не как локальное время. В Worker всегда добавлять `+ utcOffsetSec * 1000` при сравнении с timestamps из Open-Meteo (это локальные строки без `Z`). Везде где есть `new Date(times[i])` или `now.toISOString().slice(0,10)` — проверять offset. См. v1.42.3, v1.42.4.

6. **`stormByCode` без cape** → одна outlier-модель с кодом 95-99 (max wc по моделям) триггерила «гроза прогнозируется» при отсутствии реальной нестабильности. В v1.42.4 добавлено требование `cape ≥ 500` для code-based триггера.

7. **Не использовать `icon → icon_eu` миграцию** — `icon_seamless` (текущий) сам автоматически берёт ICON-EU для Европы. Менять имя модели не надо.

---

## 7. Следующий шаг

Идёт **план «режим максимальной точности»** (4 этапа, все на free tier, согласован с юзером 10 июня 2026):

| Этап | Что | Статус |
|---|---|---|
| 1. Честные осадки | precip-метрики по реальным мм (occurrence + amount) вместо вероятности-vs-прокси | ✅ v1.51.0 |
| 2. Режим «🎯 Smart» | per-variable веса (Tmax/Tmin/precip — отдельные наборы) с заострением `w = 1/(err+ε)²` + shrinkage; взвешенная **медиана** для мм-полей; дебиаз членов до смешивания; Smart как источник рядом с AVG, Worker пишет его в accuracy-записи — докажет себя в таблице через ~3 дня | ✅ v1.52.0 |
| 3. Ансамблевая вероятность дождя | Open-Meteo **Ensemble API** (ensemble-api.open-meteo.com, бесплатно, без ключа): ECMWF ENS 51 членов и др. P(дождь) = доля членов с осадками, полоса P10–P90. Бот precip_soon — порог по P из членов | ⬜ следующий |
| 4. Синхронизация бота + lead-корзины | бот считает те же per-variable веса из своего KV для push'ей (сейчас `source='smart'` в cron = невзвешенный mean, как avg); predictions на D+1…D+5 с полем lead, статистика по корзинам D1–2 / D3–5 | ⬜ |

Контекст решения (анализ 10 июня): жёсткий «выбор самой точной модели per параметр» отвергнут — на ~27-60 замерах разница топ-1/топ-2 внутри шума, лидер скачет (winner's curse). Заострённый per-variable ансамбль сходится к лучшей модели, когда разрыв реален, и остаётся ансамблем, когда модели неразличимы.

Известные ограничения (приняты): ERA5 — реанализ ~31 км, конвективные ливни в точке может размазывать (для occurrence ≥0.5 мм приемлемо); `todayIso()` на сайте — UTC-дата (00:00–03:00 по Харькову локальный fallback пишет actual на вчера; сервер авторитетен — не горит); ML/MOS-постпроцессинг отложен до накопления сезона данных.

Backlog из UX (не в фокусе): 🌫 уведомления при высоком AQI, 📅 calendar export (.ics), ⛈ storm_approaching с минутной точностью.

---

## 8. Доступы и секреты

**Cloudflare:**
- Account ID: `d9f70cbb1ffaec068c5c15d96a450132`
- KV namespaces: SUBSCRIPTIONS (`74dcbaee...`) / PAIRING (`e1e50578...`) / STATS (`32f4dd2c...`)
- Secrets (в репо НЕТ, загружаются через `wrangler secret put`): `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET`, `ADMIN_TOKEN`
- Деплой: `cd bot && npx wrangler deploy`
- Логи: `cd bot && npx wrangler tail`
- Cron: `*/30 * * * *` + accuracy в 04:00 UTC + observations в 05:00 UTC

**Telegram:**
- Bot: `@MeteoStarBot`
- Admin user_id: `151252296` (Стас)

**Git:**
- Email для коммитов: `265459095+stanislavperec-ua@users.noreply.github.com`
- Локальный путь: `C:\Users\User\projects\kharkiv-weather`

---

## 9. Команды бота

**Юзер:** `/start`, `/help`, `/status`, `/location <город>`, `/pair <код>`, `/login`, `/unpair`, `/stop`

**Группы:** `/setup` (только админ/creator группы)

**Админ (`userId=151252296`):** `/admin_stats`, `/admin_list`, `/admin_broadcast`, `/admin_ban`, `/admin_unban`, `/admin_test`, `/admin_cron` (принудительный обход), `/admin_accuracy_cron`, `/admin_obs_cron` (archive-api сейчас), `/admin_cooldowns` (когда сработают правила), `/admin_summary_test` (отладка утренней сводки)

---

## 10. Локальный запуск

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Открыть http://127.0.0.1:8765/

**DevTools-функции для отладки** (window-scope):
- `dumpAccuracy()` — все накопленные предсказания и факты
- `dumpBias()` — raw vs effective bias по моделям
- `dumpWeights()` — текущее распределение весов в AVG
- `dumpPrecip()` — честные precip-метрики: occMiss / amtMAE / score (v1.51.0)
- `dumpSmart()` — per-variable веса Smart + применяемые дебиазы членов (v1.52.0)
- `resetAccuracy()` — полная очистка истории (для тестов)
- `mergeAccuracyKeys()` — слить все KV-ключи в текущий (fallback при смене координат)

**Тесты (извлекают реальные функции из app.js / bot, без дублирования логики):**
- `node scripts/test-precip-metrics.mjs` — precip-метрики: 12 ассертов + живые данные (Харьков + Південне)
- `node scripts/test-smart.mjs` — Smart: 18 ассертов (веса/медиана/дебиаз/воркер-синхронность) + живые Smart-веса

---

## 11. Стек технологий

- **Frontend:** чистый HTML/CSS/JS (без npm, без сборщиков). Chart.js + Leaflet через CDN с SRI.
- **Hosting:** GitHub Pages
- **Backend (для бота):** Cloudflare Workers free tier + KV
- **Внешние API (все бесплатные, без ключей):**
  - `api.open-meteo.com/v1/forecast` — 8 моделей + minutely_15
  - `archive-api.open-meteo.com/v1/archive` — ERA5/ERA5T для ground truth
  - `air-quality-api.open-meteo.com/v1/air-quality` — AQI + пыльца
  - `geocoding-api.open-meteo.com/v1/search` — поиск городов
  - `nominatim.openstreetmap.org` — reverse-геокодинг
  - `tilecache.rainviewer.com` — тайлы радара (только UI)
  - `embed.windy.com` — iframe прогноза 72ч
