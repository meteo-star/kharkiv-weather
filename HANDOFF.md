# HANDOFF.md — Meteo Star

> Шпаргалка для входа в проект в новой сессии Claude.
> **Полная история проекта** — [PROJECT_STATUS.md](PROJECT_STATUS.md).
>
> **Дата обновления:** 27 мая 2026
> **Текущая версия:** v1.50.0

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
- **НЕ автодеплоить.** `wrangler deploy`, `git push`, `git push origin <tag>` — только по явной команде юзера. Одно «пуш» не делает автодеплой постоянным
- После правок поднимать локальный сервер сам: `python -m http.server 8765 --bind 127.0.0.1`
- Все изменения через feature-ветки: `feature/имя` или `fix/имя` → merge в main → тег → push

---

## 3. Текущее состояние (в production)

🌐 **Live:** https://meteo-star.github.io/kharkiv-weather/
🤖 **Bot:** [@MeteoStarBot](https://t.me/MeteoStarBot)
☁ **Worker:** https://meteo-star-bot.stanislav-perec.workers.dev
📦 **GitHub:** https://github.com/meteo-star/kharkiv-weather

**Что работает (v1.50.0):**
- Прогноз на 10 дней по 8 моделям с **weighted AVG** (вес = 1/MAE), **bias-correction**, **per-variable best** (🏆 отдельно для Tmax/Tmin/precip), **зелёное выделение** лидера в accuracy-таблице
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

**v1.50.0 задеплоен** — i18n полностью завершён по плану из 3 релизов (PLAN_I18N.md удалён). Теперь — **пауза** для накопления данных:

В KV копится **accuracy** на 0.1°-сетку. Каждую ночь archive-api пишет реальные `actual`. Когда наберётся ≥5 ground-truth замеров per model per location:
- `dumpBias()` в DevTools покажет реальные смещения моделей
- `dumpWeights()` покажет как weighted AVG их учитывает
- Per-variable рейтинг (🏆 Tmax / Tmin / precip) начнёт показывать осмысленных лидеров

**Когда юзер вернётся** — посмотреть `dumpBias()` / `dumpWeights()` / accuracy-таблицу в production. Решить дальнейшие шаги:

- **Ensemble API** (P10/P50/P90 от ECMWF EPS) — полоса неопределённости. ~4-6ч.
- **Spatial stabilization** (4 точки вокруг) — микро-улучшение для границ NWP-ячеек. ~3-4ч.
- **ML postprocessing** (gradient boosting на истории через archive-api) — эмпирическая MOS-формула. ~1-2 дня.
- **Multi-source aggregation** (Tomorrow.io / OpenWeatherMap free tier) — нарушает «без ключей», но даёт независимые источники.

Или backlog из UX:
- 🌫 Уведомления при высоком AQI
- 📅 Calendar export (.ics)
- ⛈ Storm_approaching с минутной точностью

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
- `resetAccuracy()` — полная очистка истории (для тестов)
- `mergeAccuracyKeys()` — слить все KV-ключи в текущий (fallback при смене координат)

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
