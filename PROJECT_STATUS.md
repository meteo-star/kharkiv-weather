# PROJECT_STATUS.md – Метеоагрегатор «Meteo Star»

> Документ для продолжения работы в новом чате с Claude Code.
> Содержит актуальное состояние проекта, что уже сделано, что осталось.
>
> **Дата обновления:** 16 мая 2026
> **Текущая версия:** v1.15.12-pwa-standalone-padding
> **Статус фазы В:** ✅ закрыта полностью (В1–В7)
> **Статус фазы Г (UI-редизайн):** ✅ закрыта полностью
> **Статус фазы Д (PWA + безопасность):** ✅ закрыта (v1.8, v1.9)
> **Статус фазы Е (Inverse search):** ✅ закрыта (v1.10)
> **Статус фазы Ж (Favorites + города мира):** ✅ закрыта (v1.11)
> **Статус фазы З (TTS-озвучка):** ✅ закрыта (v1.12)
> **Статус фазы И (Интерактивные плитки + радар):** ✅ закрыта (v1.13)
> **Статус фазы К (Реалистичная hero-сцена):** ✅ закрыта (v1.14)
> **Статус фазы Л (Mobile safe-area + swipe + iOS PWA):** ✅ закрыта (v1.15 → v1.15.12)
> **Live URL:** https://meteo-star.github.io/kharkiv-weather/
> **GitHub:** https://github.com/meteo-star/kharkiv-weather

---

## 1. Краткое описание проекта

Веб-приложение для агрегации прогноза погоды по нескольким моделям с уникальными фишками, недоступными в коммерческих сервисах.

### Технические особенности

- **Стек:** чистая статика – HTML + CSS + ванильный JavaScript (один файл `index.html`)
- **Графики:** Chart.js через CDN (с SRI можно добавить позже)
- **Шрифты:** Onest + JetBrains Mono через Google Fonts
- **Без сборщиков, без npm** – всё работает прямо при открытии HTML
- **Хостинг:** GitHub Pages (бесплатный план)
- **Размер:** ~5000 строк в `index.html`

### Стиль / дизайн

Тёмный «Liquid Glass» с неоновыми акцентами в синем / циан / фиолетовом / тиркизном спектре. SVG-иконки погоды собственные (9 типов: clear, partly-cloudy, cloudy, overcast, rain, heavy-rain, thunderstorm, snow, fog).

---

## 2. Контекст пользователя

**Кто:** Стас (Станислав Перец), корпоративный юрист КНП ЦПМД №1 в г. Південне Харьковской обл. Знает Python/Flask, имеет GitHub Pages-проекты, новичок в продвинутых Git-операциях.

**Как с ним работать:**
1. **На русском языке**
2. Тире – только en-dash «–», никогда не em-dash «—»
3. **Пошагово**: один шаг, ждать подтверждения «работает», потом следующий
4. Если шаг не получился – не двигаться дальше, разбираться
5. Каждый раз давать **ссылку на проверку** (file:// локально или http://localhost:8000)
6. **Все изменения через feature-ветки**: `feature/<имя>` → merge в main → tag → push
7. Email в коммитах – только noreply: `265459095+stanislavperec-ua@users.noreply.github.com`

---

## 3. Архитектура

### Один файл `index.html`, разделённый на секции:

```
<head>
  <style>
    [глобальные стили]
    [стили для каждой фичи: settings, location, astro-photo, activity-windows, climate, pollen, storm, ...]
  </style>
</head>
<body>
  <div class="container">
    [header с локацией и чипом настроек]
    [hero — текущая погода]
    [metrics — ветер, осадки, давление, влажность]
    [astro-row — солнце/луна, УФ, AQI]
    [hourly-card — почасовой scroll-row на сегодня с табами метрик (Г1)]
    [days — 10-дневный прогноз, горизонтальный scroll (Г2)]
    [precip-card — детальный график осадков мм/ч на 48ч (Г3)]
    [storm-card — гроза-индикатор на 48ч]
    [activity-windows — окна возможностей]
    [pollen-card — пыльца]
    [climate-card — климатический контекст]
    [astro-photo — Astro/Photographer mode]
    [accuracy-card — точность источников (В7)]
    [sources-card — выбор источника, 🏆 на лучшей модели]
    [footer]
  </div>
  [модалки: cityModal, settingsModal, modal-дня, hourlyDetailModal (Г4)]
  <script>
    [UID / utilities]
    [I18N — три языка RU/UK/EN]
    [UNITS — конверсии температуры/ветра/давления]
    [SETTINGS — localStorage]
    [ICONS — SVG-иконки погоды]
    [SOURCES — 7 моделей + avg]
    [BASELINE — fallback захардкоженные данные]
    [getForecast, renderAll и связанные render-функции]
    [LOCATION / CITY PICKER]
    [SETTINGS MENU]
    [OPEN-METEO API — fetch, parse, helpers]
    [POLLEN — В5]
    [CLIMATE CONTEXT — В4]
    [ACTIVITY WINDOWS — В3]
    [ASTRO / PHOTO MODE — В1]
    [renderStaticAstro, renderConfidenceChip — В2]
    [init: loadSavedSettings, loadInitialLocation, setupSegmentedHandlers, applyAll, refreshForecast]
  </script>
</body>
```

### Главные функции

| Функция | Назначение |
|---|---|
| `refreshForecast(force)` | Главный entrypoint загрузки прогноза. Кэш 15 мин в localStorage, fallback на BASELINE при ошибке |
| `applyAll()` | Полная перерисовка UI: переводы, чип настроек, локация, все карточки. Вызывается при init и смене языка/единиц |
| `renderAll()` | Перерисовка погодных данных (hero, метрики, дни, график) – зависит от выбранного источника |
| `t(key, params)` | Перевод по ключу с параметрами `{ name }` через `replace` |
| `getForecast(sourceId)` | Возвращает forecast для конкретной модели или AVG с fallback на UV из avg |
| `parseAllModels(data, sources)` | Разбирает многомодельный ответ Open-Meteo, возвращает map `{ avg, ecmwf, gfs, ... }` |
| `computeAverageForecast(forecasts)` | Честное среднее по 7 моделям, включая confidence index |

### Ключи localStorage

| Ключ | Что хранит | TTL |
|---|---|---|
| `kw:settings:v1` | `{ lang, units: { temp, wind, pressure }, voice: { voiceURI, rate } }` | бессрочно |
| `kw:location:v1` | `{ name, region, lat, lon, source }` | бессрочно |
| `kw:forecast-cache:LAT_LON:v8` | Прогноз 7 моделей, 10 дней, в hourly есть pmm/pmmMax/pr (давление мм рт.ст. почасово) | 15 минут |
| `kw:climate-cache:LAT_LON:v1` | Климатическая норма за 5 лет | 30 дней |
| `kw:accuracy:LAT_LON:v1` | История пар (predictions, actual) на ~30 дат для расчёта MAE | без TTL, плавающее окно 30 записей |
| `kw:favorites:v1` | Массив избранных городов (до 8): `{name, region, country, lat, lon}` | бессрочно |

При структурных изменениях в hourly/daily ОБЯЗАТЕЛЬНО поднимай версию ключа forecast-cache (сейчас `:v8`).

---

## 4. Внешние API (все бесплатные, без ключей)

| API | Что даёт | Когда вызывается |
|---|---|---|
| `api.open-meteo.com/v1/forecast` | 7 моделей: ECMWF, GFS, ICON, GEM, JMA, MF, UKMO. Поля: temperature, precipitation_probability, wind, humidity, pressure, weather_code, dew_point, apparent_temperature, cloud_cover, uv_index_max, cape, lifted_index | при init, смене города, кнопке «Обновить» |
| `air-quality-api.open-meteo.com/v1/air-quality` | AQI European + PM2.5/PM10 + пыльца (alder, birch, grass, mugwort, olive, ragweed) | параллельно с основным forecast |
| `archive-api.open-meteo.com/v1/archive` | Исторические данные за 5 лет для климатической нормы | при смене города (кэш на 30 дней) |
| `geocoding-api.open-meteo.com/v1/search` | Поиск городов по названию (live search в модалке города) | при вводе пользователя |
| `nominatim.openstreetmap.org/reverse` | Имя места по координатам (после navigator.geolocation) | один раз, по запросу геолокации |

---

## 5. ЗАВЕРШЁННЫЕ ФАЗЫ – подробный список

### Фаза А: Деплой прототипа (v0.4)
- Создан репо `meteo-star/kharkiv-weather`
- Включён GitHub Pages
- Переход с личного аккаунта на org `meteo-star` – личный email вычищен из git-истории (через `git filter-branch`)

### Фаза Б: Реальные данные

| Шаг | Tag | Что добавлено |
|---|---|---|
| Б1 | `v0.5-location` | Геолокация через `navigator.geolocation`, модалка выбора города с поиском (Open-Meteo Geocoding + 32 крупных города Украины offline) |
| Б1.5 | `v0.6-i18n` | Поддержка 3 языков (RU/UK/EN) + меню единиц измерения (температура °C/°F, ветер м/с/км/ч/mph/уз, давление мм/гПа/inHg) |
| Б2 | `v0.7-api` | Подключение Open-Meteo (best_match) с loader, error-баннером, автообновлением |
| Б3 | `v0.8-multi-models` | 7 реальных моделей с честным средним вместо bias-имитации |
| Б4 | `v0.9-aqi-polish` | AQI из Air Quality API, динамические описания condDesc, тренд давления, кэш 15 минут, динамическая дата |
| | `v0.9.1-uv-fix` | Hotfix: UV-индекс через fallback на avg (только GFS из 7 моделей выдаёт UV) |

### Фаза В: Уникальные фишки

| Шаг | Tag | Что |
|---|---|---|
| В1 | `v1.0-astro` | **Astro/Photographer mode** – золотой/синий час, качество заката, видимость звёзд ⭐⭐⭐⭐⭐ |
| В2 | `v1.1-confidence` | **Индекс согласия моделей** – чип с цветовой меткой (80%+/65%/50%/30%), цветные риски в днях, полупрозрачная полоса разброса min/max на графике |
| В3 | `v1.2-activity-windows` | **Окна возможностей** – 6 пресетов (пробежка, прогулка, шашлык, бельё, мойка авто, полив) с автоматическим поиском подходящих часов в ближайших 48ч |
| В4 | `v1.3-climate` | **Климатический контекст** – сравнение с 5-летней нормой через Archive API + SVG-спарклайн «в этот день в прошлые годы» |
| В5 | `v1.4-pollen` | **Прогноз пыльцы** – 6 аллергенов с цветовыми уровнями |
| В6 | `v1.5-storm` | **Гроза-индикатор** – heatmap 48 часов риска грозы из Open-Meteo (weather_code + CAPE + lifted_index), статус-строка с цветной пилюлёй, тревожный баннер при риске ≥2 в ближайшие 6ч |
| В7 | `v1.6-accuracy` | **Самооценка точности источников** – при каждом fetch сохраняем предсказания на +1/+2 дня от 7 моделей, когда дата наступает – заполняем `actual` из `avg[0]`. MAE по tempMax/tempMin/precip → таблица-рейтинг с цветными барами, 🏆-бейдж на самой точной модели в карточке выбора источника. Плюс UX-перепорядок: hourly-chart и 5-дневка подняты сразу после astro-row; astro-photo опущен ниже климата; accuracy-карточка стоит прямо перед sources-card. Частицы фона: 13 штук с 5 разными траекториями (вверх, вниз, диагональ в обе стороны, зигзаг) |
| Hotfix | `v1.6.1-activity-fix` | **Окна возможностей теперь работают корректно.** Раньше: проверка `precipitation_probability < N%` усреднялась по 7 моделям, что дало bias – если 2 из 7 моделей прогнозировали дождь, среднее 23% выглядело как «сухо» и активности рекомендовались под дождём. Плюс горизонт был всего 48ч – суббота не попадала в поиск. Фикс: (а) добавлен `precipitation` (мм/ч) в API-запрос и hourly-структуру, (б) проверки переписаны на `pmm < 0.3` + `pmmMax < 0.7` + weather_code не дождевой, (в) горизонт расширен до 5 дней, (г) carwash переписан: ищет любое 24ч-окно в 5 днях, иначе fallback на самое длинное ≥6ч окно, (д) лейблы дней 2-4 — короткое имя дня недели. Bump cache key `:v4` → `:v5` |

### Фаза Г: UI-редизайн (по мотивам мобильных скриншотов)

| Шаг | Tag | Что |
|---|---|---|
| Г1 | `v1.7-ui-redesign` | **Почасовая карточка переделана.** Убран Chart.js, добавлены 5 табов метрик (Температура / По ощущениям / Осадки / Ветер / Давление). Под табами scroll-row из 24 часов (иконка + значение + время), на плитках единицы измерения (`21°C`, `4 м/с`, `758 мм`, `25%`). Auto-scroll на NOW_HOUR при открытии; при переключении таба позиция scroll сохраняется. В модалке дня — тот же scroll-row стиль. Sub-надпись «Усреднено по 7 моделям» подсвечена цветом источника (--src-color). Везде 10 → 7 моделей в i18n+HTML. |
| Г2 | `v1.7-ui-redesign` | **10-дневный прогноз с горизонтальным scroll.** `forecast_days` API расширен с 5 до 10, parser обновлён (Math.min(10, ...)). Карточка `.days` переведена с `grid-template-columns:repeat(5,1fr)` на `grid-auto-flow:column` с `scroll-snap-type:x mandatory`. Адаптация: 5 visible на десктопе/таблете/мобильном ≥640px, 4 visible на ≤380px. |
| Г3 | `v1.7-ui-redesign` | **Карточка «Осадки» — детальный line-area график мм/ч на 48ч.** Использует 3 дня forecast (сегодня-хвост + завтра + послезавтра-головной кусок), фикс. ширина 32px на час → horizontal scroll. Плавный line с `cubic-bezier`-сглаживанием + градиентная заливка, **цвет линии сегментно** меняется по типу осадков (дождь = бирюзовый, снег = светло-голубой, гроза = фиолетовый). Под графиком — ряд эмодзи 💧❄⛈ для часов с pmm > 0.05; полоска-разделитель дней (день · дата). Пунктирные вертикальные линии на границах суток + подсветка тика «00». Гроза-индикатор перемещён под «Осадки» — логичная группировка. |
| Г4 | `v1.7-ui-redesign` | **Новая полноэкранная модалка «Почасовой»** (`hourlyDetailModal`). Открывается кликом на любую плитку часа в почасовой карточке. Sticky-полоса часов сверху (иконка + цифра), под ней 6 SVG mini-charts (`renderHdmMetricChart`): Температура, По ощущениям, Вероятность осадков, Осадки мм, Ветер, Давление. Каждый чарт = area + smooth line (quadratic bezier) + цифровые подписи над точками + вертикальная линия «сейчас» для дня 0. Зрелищная анимация: slide-up scale(0.94)→1 + filter:blur 8px→0 + cubic-bezier(0.16,1,0.3,1) 0.55s. Кнопки прокрутки `‹ ›` поверх sheet (видны и на мобильном — в полноэкранной модалке свайпа не всегда достаточно). Закрытие: ←/Esc/click на backdrop. |
| Г5 | `v1.7-ui-redesign` | **Кнопки прокрутки `‹ ›` + усиленная анимация модалок.** Стрелки на трёх горизонтальных карточках (почасовая, 10 дней, осадки), скрыты на ≤640px (там свайп). `setupScrollArrows()` навешивает обработчики на все `.scroll-arrow`, listen scroll для disabled-состояния (opacity 0 → pointer-events:none). Анимация всех модалок (`.modal-backdrop`): backdrop blur нарастает 0→20px, sheet вылетает с `scale(0.88) + translateY(36px) + filter:blur(6px)`, easing `cubic-bezier(0.16,1,0.3,1)` 0.48s с задержкой 0.06s — даёт эффект «появления через стекло». |

---

### Фаза Д: PWA + безопасность

| Шаг | Tag | Что |
|---|---|---|
| Д1 | `v1.8-modal-security` | **Расширение «Почасовой» модалки до 11 метрик + SRI + CSP.** В Open-Meteo hourly запрос добавлены `uv_index`, `visibility`, `shortwave_radiation`. Парсер кладёт в hourly[] новые поля: `hum`, `dp`, `uvi`, `vis`, `sr`. `computeAverageForecast` усредняет их по 7 моделям. `hdmMetricsConfig` расширен с 6 до 11 метрик (+ Влажность, Точка росы, УФ-индекс, Видимость, Солнечная радиация). Cache-key `:v8 → :v9`. SRI integrity-хэш SHA-384 для Chart.js (защита от подмены кода на CDN). CSP через `<meta http-equiv="Content-Security-Policy">` с whitelist'ом доменов (только cdn.jsdelivr.net, fonts.googleapis.com, fonts.gstatic.com, Open-Meteo APIs, Nominatim), `frame-ancestors 'none'` для защиты от clickjacking. |
| Д2 | `v1.9-pwa` | **PWA-Lite: установка приложения + офлайн-кэш (без push).** Добавлены: `manifest.json` (имя, иконки, theme_color, display:standalone), `service-worker.js` (3 стратегии кэша: cache-first для shell/шрифтов/Chart.js, network-first для API с fallback на кэш, stale-while-revalidate для same-origin), 6 иконок PNG (192/512 normal + 192/512 maskable + 180 apple-touch + 32 favicon) сгенерированы через `scripts/gen-icons.py` (PIL). В `<head>`: link rel=manifest + apple-touch-icon + theme-color + apple-mobile-web-app-capable. Service-worker регистрируется на `window.load`. Работает на Android Chrome (auto-баннер «Установить»), iOS Safari ≥11.3 (Share → На главный экран), всех desktop-браузерах. Push-уведомлений нет — добавятся отдельно при необходимости (нужен внешний backend типа Cloudflare Workers). |

### Фаза Е: Inverse search

| Шаг | Tag | Что |
|---|---|---|
| Е1 | `v1.10-inverse-search` | **Inverse search «когда будет нужная погода?»** Юзер описывает условие — система ищет ближайшие подходящие окна в 10-дневном прогнозе. Новый бирюзовый чип `🔍 Найти окно` в header (рядом с настройками); открывает полноэкранную модалку с полем ввода, кнопкой «Найти» и 8 чипами-пресетами. **Парсер запросов** через regex поддерживает 10 паттернов: «без дождя N часов» / «тепло выше +N°» / «ниже +N°» / «без ветра ≤N» / «сильный ветер ≥N» / «ясно» / «гроза» / «снег» + 6 готовых пресетов (пробежка, шашлык, мойка авто, прогулка, полив, бельё). **Сканер** проходит почасовой массив всех 10 дней, группирует подряд идущие совпадения в окна, разбивает длинные окна (≥2 суток) на пер-дневные сегменты — чтобы каждый день получил свою карточку результата. Сортировка: по дню (раньше = выше), внутри дня — по длительности (длинные сверху). Лимит 15 окон. Результаты — карточки с иконкой погоды, диапазоном часов, длительностью, температурой и средним ветром. Клик на карточку: для сегодня — открывает `hourlyDetailModal`, для будущих дней — стандартную модалку дня. 3 языка (RU/UK/EN), Esc закрывает, фокус возвращается в input при открытии. |

### Фаза Ж: Multi-city favorites + города мира

| Шаг | Tag | Что |
|---|---|---|
| Ж1 | `v1.11-favorites-world` | **Избранные города в шапке + мировой поиск.** Новый бирюзовый ряд `.favorites-row` под header'ом с пилюлями любимых городов + dashed-кнопка `+ Добавить`. Активный чип подсвечен бирюзовым свечением. Клик на чип — переключение локации мгновенно. Hover показывает крестик `×` для удаления. **localStorage** `kw:favorites:v1` (лимит 8 городов, дедуп по координатам 0.01°). В city-modal на каждом item — кнопка-звезда `☆/★` (не переключает локацию, а toggle favorite). Модалка разбита на секции: «Избранные» / «Города Украины» / «Города мира». Добавлен массив `POPULAR_WORLD_CITIES` (23 столицы: NY, London, Paris, Berlin, Tokyo, Sydney, Dubai, ...). **Глобальный поиск через Open-Meteo Geocoding** — раньше был жёстко ограничен `countryCode: 'UA'`, что блокировало мировой поиск; убрали этот фильтр, добавили пост-сортировку (для RU/UK-локали украинские результаты идут сверху). Локальная фильтрация расширена с 32 UA-городов до объединённого набора (UA + Мир + favorites) с дедупом. Лимит API-результатов 15 → 25. При ошибке API локальные результаты остаются видны (вместо стирания всего). |

### Фаза З: TTS-озвучка

| Шаг | Tag | Что |
|---|---|---|
| З1 | `v1.12-audio-tts` | **Аудио-резюме погоды через Web Speech API.** Чип «🔊 Озвучить» в шапке (рядом с поиском и настройками), фиолетовая палитра. Клик — синтез голосом резюме сегодняшней погоды («Сегодня в Высоком. Переменная облачность. Температура от плюс 13 до плюс 21 градуса. Скорость ветра 4 метров в секунду. Возможны небольшие осадки.»). Шаблоны на 3 языках (ru/uk/en) с локализацией чисел («плюс 13»). Во время воспроизведения чип подсвечен фиолетовой пульсацией, повторный клик прерывает. В settings-modal новая секция **«Голос озвучки»** с радио-списком всех доступных TTS-голосов системы (имя + жен./муж. бейдж + языковой код), кнопкой `▶` превью у каждого, авто-выбором первого женского по умолчанию. Скорость воспроизведения через segmented (медленно/норма/быстро). Настройка сохраняется в `kw:settings:v1.voice` (voiceURI + rate). Поддержка: macOS/iOS (Milena, Yuri), Windows (Irina, Pavel), Android (Google TTS). При отсутствии TTS чип скрыт. Кнопка перенесена из footer в header после первой итерации (UX-фидбэк). Озвучка не называет направление ветра (только скорость), фокус на основные параметры. |

### Фаза И: Интерактивные плитки + радар осадков

| Шаг | Tag | Что |
|---|---|---|
| И1 | `v1.13-interactive-tiles` | **Разгрузка главного экрана через интерактивные плитки `metrics`.** С главного экрана убраны 2 объёмные карточки (`.precip-card` и `.storm-card`) — теперь они живут внутри новой модалки «Детали осадков». Плитки `Ветер / Осадки / Давление / Влажность` в `metrics` стали кликабельными: иконка-стрелка `›` в правом верхнем углу, hover-effect (бирюзовая рамка + glow), доступность (role=button, tabindex, Enter/Space). **Плитка «Осадки»** открывает свою специальную модалку с тремя секциями: 1) line-area график мм/ч на 48ч с разделителями суток и типами осадков (дождь/снег/гроза); 2) гроза-индикатор heatmap; 3) **радар осадков** с переключателем табов «📡 Радар · 2ч» (RainViewer + Leaflet тёмная basemap CartoDB Dark Matter, slider/play 13 кадров) и «🔮 Прогноз · 72ч» (Windy iframe, модель ECMWF, прогноз осадков на 10 дней). Lazy-init Leaflet и Windy iframe — только при первом открытии модалки. Авто-pause анимации при закрытии. Manifest TTL 5 минут. Перецентрирование при смене города. **Плитки «Ветер», «Давление», «Влажность»** открывают `hourlyDetailModal` в режиме `singleMetric` (только релевантный график вместо всех 11), заголовок модалки — название метрики. Влажность дополнительно показывает график точки росы (массив metrics: ['humidity','dewpoint']). Подключены: `manifest-src` / `frame-src https://embed.windy.com`, `img-src https://tilecache.rainviewer.com https://*.basemaps.cartocdn.com`, `connect-src https://api.rainviewer.com`. SRI hash для Leaflet 1.9.4 (`sha384-sHL9NAb7...` CSS, `sha384-cxOPjt7s...` JS). |

### Фаза К: Реалистичная hero-сцена (фото-фоны + анимация погоды)

| Шаг | Tag | Что |
|---|---|---|
| К1 | `v1.14-realistic-hero` | **Hero-блок «Сейчас» превращён в фотореалистичное «окно».** Старая статичная 3D-эмблема погоды убрана из hero (осталась в днях / модалках / source-pills). Вместо неё: **8 фотографий неба** (Unsplash CC0, ~217 КБ всего после WebP-оптимизации в 1600×600, q=80) в `assets/scenes/<tod>-<grp>.webp`, где `tod` ∈ {day, dawn, dusk, night} и `grp` ∈ {clear, cloudy}. CSS-структура: `.hero-scene` (background-image: cover/center с плавным fade 0.6s при смене), `.hero-overlay` (адаптивный градиент-затемнение слева под палитру tod, чтобы текст всегда читался), `.hs-bg` (слой погодных частиц поверх фото). **Day/night auto-switch** через `computeTimeOfDay(today)` на основе sunrise/sunset из API: dawn = sunrise ± 60/+90 мин, day = sunrise+90 до sunset−90, dusk = sunset −90/+60 мин, night = всё остальное. **Анимированные погодные частицы (CSS + DOM):** дождь (45 капель `<div>` с линейной анимацией падения 0.55-1.0s + ускорение при moderate/heavy), снег (40 кружков, двойная анимация падение + горизонтальное колебание), туман (3 полупрозрачных полосы с blur 8px дрейфуют горизонтально 18-32s), гроза (центральные вспышки через `mix-blend-mode:screen` с keyframes-цепочкой 7s). **Этап 3 — реакция на интенсивность из API:** `today.hourly[NOW_HOUR].pmm` → `light/moderate/heavy` (≥4 / ≥10 мм/ч): плотность ×1/1.5/2, скорость падения ×1/1.3/1.5. `today.hourly[NOW_HOUR].w` → `calm/windy/storm` (≥6 / ≥12 м/с): при `windy` — наклон капель/снега (translateX в keyframes), при `storm` — сильный наклон + горизонтальные стрики ветра `.hs-windstreak` (8-12 шт., скорость 0.4-1.0s). **Мобильная оптимизация:** при `(max-width: 680px)` плотность частиц ×0.6 для экономии CPU. **Этап 4 — молнии-предчувствие:** `stormRiskLevel(nowH)` ≥3 при condition ≠ thunderstorm → добавляется тусклый overlay `.hs-lightning-distant` в верхнем правом углу с редкими вспышками (~раз в 22s), интенсивность 0.55 (risk=3) или 0.8 (risk=4). При condition = thunderstorm — центральные яркие вспышки как раньше. Уважается `prefers-reduced-motion: reduce` (все анимации частиц + transitions отключаются). **Debug-функции в DevTools Console** для тестирования: `previewHero/Cond/Precip/Intensity/Wind/Storm`, каждая принимает override или 'auto'. |

### Фаза Л: Mobile safe-area + swipe-down + iOS PWA (серия v1.15.x)

✅ **Статус: закрыта полностью.** 12 итераций iOS-фиксов: safe-area для модалок и главного экрана, swipe-down закрытие, PWA status-bar, network-first SW для мгновенных обновлений, центрирование часа на NOW, padding-top через display-mode media query. Закрыто всё что было в плане.

| Шаг | Tag | Что |
|---|---|---|
| Л1 | `v1.15-mobile-safe-area` | **Критический фикс iOS:** все модалки заходили под status bar / Dynamic Island на iPhone, кнопки `×` и `←` физически нельзя было нажать. Решение: `.modal-backdrop` получил `padding-top: max(48px, env(safe-area-inset-top) + 28px)` и `padding-bottom: max(24px, env(safe-area-inset-bottom) + 16px)` (Home Indicator). `align-items: flex-start` вместо `center` (раньше высокий модал мог уехать в минус). `.modal{max-height}` пересчитан с учётом обеих safe-area-зон. `.hdm-top` (полноэкранные модалки «Почасовой» и «Детали осадков») получил `padding-top: calc(22px + env(safe-area-inset-top))`. На ≤640px стрелка `.hdm-back` увеличена 32→36px (лучше попадание пальцем). **Swipe-down закрытие** — универсальный JS-helper `enableSwipeToClose(sheetEl, closeFn, {scrollableSelector})` подключён ко всем 6 модалкам: модалка дня, выбор города, настройки, inverse-search, hourlyDetailModal, precipDetailModal. Активен только на ≤640px. Срабатывает только когда внутренний скролл сверху (не мешает прокрутке контента). Дельта-Y > 90px или быстрый flick (vel > 0.55 px/ms при dy > 36) — закрывает. Палец следует за листом (translateY), opacity падает к 0.4, при отпускании плавная анимация (0.26s). Визуальная подсказка — серый handle 44×5px сверху листа на мобильных (iOS bottom-sheet convention). |
| Л1.1 | `v1.15.1-container-safe-area` | **Hotfix:** главный экран (header с локацией, чипы) тоже залазил под Dynamic Island. К `.container` добавлен `padding-top: calc(24px + env(safe-area-inset-top))`, плюс left/right/bottom env() для landscape-notch и Home Indicator. На ≤640px padding-top сокращён до 18px+env() для компактности. |
| Л1.2 | `v1.15.2-ios-pwa-statusbar` | **iOS PWA только:** в Safari всё было ок, но при установке на главный экран контент опять заходил под строку статуса. Причина — meta `apple-mobile-web-app-status-bar-style="black-translucent"` в стандалон-режиме делал строку прозрачной и контент шёл под неё; Safari этот тег игнорирует. Сменили на `black` (непрозрачная тёмная). Также bump `CACHE_VERSION` в service-worker с `v1` → `v1.15.2`, иначе старые PWA-установки продолжали бы отдавать прежний index.html. |
| Л1.3 | `v1.15.3-sw-network-first` | **SW стратегия для HTML:** раньше `stale-while-revalidate` — пользователь видел обновление только на 2-й запуск PWA. Сменено на `network-first` для navigation-запросов и `manifest.json`: при наличии сети свежая версия видна сразу. Иконки/PNG остались `stale-while-revalidate` (быстрый старт). Без сети — fallback на кэш, offline-режим сохранён. |
| Л1.4 | `v1.15.4-ios-fixes` | **Двойной фикс:** (а) на iPhone с Dynamic Island `status-bar-style=black` показывал **белую** полосу (квирк iOS). Вернули `black-translucent`, но: `theme-color` сменили `#0a1128` → `#02061a` (точно базовый цвет фона) + добавили `background-color: #02061a` на `html` и `body`. Теперь сквозь полупрозрачную полосу виден тёмный фон, не белый. (б) **Корневая причина бага центрирования часа** найдена: `-webkit-overflow-scrolling: touch` на `.hdm-scroll` БЛОКИРУЕТ программное `scrollLeft` до первого касания пользователем (известный iOS-баг). Решение: временно ставим `webkitOverflowScrolling = 'auto'` перед установкой scrollLeft, восстанавливаем через rAF. Плюс 4 попытки на разных таймингах (rAF / 150ms / 600ms + scrollIntoView fallback). |
| Л1.5 | `v1.15.5-hour-center` | **Метрические модалки (Ветер/Давление/Влажность) теперь центрируют час корректно.** Переход на гибридный подход: основной способ — нативный `scrollIntoView({inline:'center'})` (игнорирует все iOS-квирки), с проверкой результата через `getBoundingClientRect()`. Если ячейка реально центрирована (±15% от viewport) — успех. Иначе fallback: ручной расчёт через **реальный** `targetCell.offsetLeft` и `offsetWidth` (а не через константу `HDM_HOUR_WIDTH=60` — если CSS перекрыл ширину, всё равно посчитаем верно). Использован `scrollEl.scrollTo({behavior:'auto'})` вместо прямого присваивания. 5 попыток: rAF / 100ms / 300ms / 600ms / 1000ms. |
| Л1.6 | `v1.15.6-hour-center-full` | **Попытка зафиксить центрирование в полной модалке (11 метрик).** В метрических работало, в полной — нет. Добавлены событийные триггеры: `transitionend` на `.hdm-sheet`, `ResizeObserver` на `hdm-scroll`, `setTimeout(1500ms)`. Не помогло — оказалось, проблема была не в timing'е скролла. |
| Л1.7 | `v1.15.7-pre-open-scroll` | **Пере-архитектурирование:** scrollLeft ставится ПЕРЕД `classList.add('open')`, пока layout стабилен и нет анимаций. Sticky-headers с 11 чартами + transition + `-webkit-overflow-scrolling: touch` создавали конфликт во время transition. Убрано: `scrollIntoView` (плохо дружил со sticky), ResizeObserver, transitionend listener, 5 setTimeout-аттемптов. Код стал на 80 строк проще. Не помогло на iPhone PWA — добавлены debug-средства. |
| Л1.8 | `v1.15.8-debug-panel` | **Debug-панель:** чёрный overlay внизу экрана с зелёным текстом, показывает на каждом шаге (PRE / 100ms / 600ms / 1200ms) startHour, vw, sw, offsetLeft, offsetWidth, targetX, before / after scrollLeft, stuck. Активация через `localStorage.setItem('kw:hdm-debug','1')`. |
| Л1.9 | `v1.15.9-hdmdebug-url` | **Удобная активация debug:** URL-параметр `?hdmdebug` автоматически включает debug-режим. Без него не надо лезть в DevTools — особенно удобно на iPhone. |
| Л1.10 | `v1.15.10-now-center-always` | **🎯 КЛЮЧЕВОЕ ОТКРЫТИЕ:** Debug-панель показала что технически scrollLeft работал ИДЕАЛЬНО (`stuck:true` на всех 4 проверках). Проблема была не техническая а **семантическая**: при клике на час N модалка центрировалась на N, но пользователь ожидал что модалка **всегда** покажет NOW_HOUR в центре. Логика правки (line 4080): клик на любой час → `openHourlyDetail(NOW_HOUR)`. Исключение: если кликнут час близкий к NOW (±3), центрируем на нём — пользователь явно интересуется этой частью дня. Метрические модалки уже работали так. Debug-код удалён — отработал и больше не нужен. |
| Л1.11 | `v1.15.11-dynamic-island-padding` | **Усиление safe-area для Dynamic Island:** на мобильных `padding-top: max(70px, env(safe-area-inset-top, 0px) + 24px)` — гарантирует минимум 70px независимо от env() (на старых iOS env() может вернуть 0). |
| Л1.12 | `v1.15.12-pwa-standalone-padding` | **🎯 РЕШЕНИЕ загадки PWA standalone:** оказалось что в Safari (обычная вкладка) safe-area-inset работает корректно, а **в установленной PWA (галочка «Открыть как Web App» ВКЛ) iOS некорректно применяет `env(safe-area-inset-top)`** — возвращает 0 или малое значение, контент уходит под Dynamic Island. Решение: отдельное CSS-правило `@media (display-mode: standalone), (display-mode: fullscreen)` с `padding-top: max(95px, env+50px) !important`. В Safari (display-mode: browser) правило не действует — там работает прежняя логика. |

#### Архитектурные place-маркеры

- **`openHourlyDetail`** — `index.html` около строки 4257. Логика центрирования часа (`positionToHour` + 3 setTimeout reposition'а).
- **`.container` CSS** — `index.html` около строки 48. Safe-area padding на главный контейнер (4 уровня: дефолт / max-width:640px / display-mode:standalone / display-mode:standalone+max-width:640px).
- **Точка клика на час в почасовой ленте** — `index.html` около строки 4081. Логика `distFromNow <= 3 ? i : NOW_HOUR`.
- **Apple PWA meta-теги** — `index.html` строки 14-17 (`theme-color="#02061a"`, `apple-mobile-web-app-status-bar-style="black-translucent"`).
- **Service Worker** — `service-worker.js`. CACHE_VERSION при каждом крупном изменении бампается, стратегия для HTML — `network-first` (мгновенные обновления PWA).

#### Уроки фазы Л

1. **iOS PWA — отдельный мир.** Safari-вкладка и standalone PWA ведут себя по-разному даже на одном устройстве. Всегда нужно тестировать оба режима.
2. **`@media (display-mode: standalone)` — это инструмент номер один** для PWA-специфичных CSS-правок.
3. **Debug-логирование на устройстве** иногда экономит больше времени чем 6 итераций кода. Если фикс не работает 2 раза подряд — добавляй телеметрию.
4. **`env(safe-area-inset-*)` в standalone PWA может возвращать 0** — всегда комбинируй с `max()` для минимального гарантированного значения.
5. **Иногда баг не в коде а в требовании.** Перечитывать первоначальный запрос пользователя — часто там ответ.

---

## 6. ОСТАЛОСЬ СДЕЛАТЬ

✅ **Фаза В закрыта полностью (В1–В7).** Все 7 уникальных фишек реализованы.
✅ **Фаза Г закрыта полностью (Г1–Г5).** Редизайн UI завершён.
✅ **Фаза Д закрыта (Д1–Д2).** PWA-Lite + SRI/CSP реализованы. Push-уведомления вынесены в бэклог.
✅ **Фаза Е закрыта (Е1).** Inverse search — обратный поиск окон в прогнозе по описанию условия.
✅ **Фаза Ж закрыта (Ж1).** Multi-city favorites + города мира + улучшенный глобальный поиск.
✅ **Фаза З закрыта (З1).** TTS-озвучка с выбором голоса в настройках.
✅ **Фаза И закрыта (И1).** Интерактивные плитки + радар (RainViewer + Windy iframe).
✅ **Фаза К закрыта (К1).** Реалистичная hero-сцена — 8 фото-фонов + 4 типа анимированных частиц + реакция на интенсивность + молнии-предчувствие.
✅ **Фаза Л закрыта полностью (Л1.0 → Л1.12).** 12 итераций iOS-фиксов: safe-area для модалок и главного экрана, swipe-down закрытие, PWA status-bar, network-first SW для мгновенных обновлений, центрирование часа на NOW_HOUR, отдельный padding-top через `display-mode: standalone` media query для iPhone PWA. Все iPhone-проблемы решены.

**При возобновлении проекта — выбираем новое направление из бэклога (часть 7).** Все фазы до Л включительно закрыты.

---

## 7. БЭКЛОГ – опциональные улучшения

### Полезные доработки

- **Inverse search:** строка поиска «когда будет +20°» / «когда без дождя ≥6ч» – парсер из 5–10 паттернов
- **Calendar export (.ics):** кнопка «Добавить в календарь», файл с погодой на 5 дней
- **PWA + Push:** манифест, service worker, web push для уведомлений о дожде/грозе
- **Аудио-резюме:** кнопка «🔊 Прослушать», Web Speech API синтезирует 20-сек резюме
- **Радар осадков:** RainViewer API даёт бесплатные тайлы радара через Leaflet.js
- **Гипертермия/гипотермия предупреждения**

### Технические улучшения

- Subresource Integrity (SRI) для Chart.js – уже в `SECURITY.md` упомянуто, не реализовано
- CSP (Content Security Policy) через `<meta http-equiv>` – часть документа `SECURITY.md`
- Lazy-load: пыльца/климат/окна можно вынести в отдельные модули и грузить по требованию (если когда-то размер станет проблемой)
- Перенос JS из inline в отдельный файл для удобства редактирования (но тогда нужны заголовки или fetch локально)

### Известные ограничения

- При первой загрузке (до завершения fetch) часть данных показывает BASELINE / placeholders. Это нормально, но визуально может казаться багом
- Geocoding API Open-Meteo не покрывает абсолютно все мелкие населённые пункты Украины
- Спарклайн климата: на мобильном (узкий экран) подписи годов могут немного теснить друг друга
- Astro-mode «видимость звёзд» использует упрощённую формулу: облачность × (1 – фаза_луны/100) – не учитывает световое загрязнение

---

## 8. Как запустить локально

### Прямое открытие `index.html`

В Chrome/Edge `file://` блокирует fetch к сторонним API из-за CORS. Поэтому:

### Через локальный HTTP-сервер (Python)

```powershell
python -m http.server 8000 --directory "C:\Users\User\projects\kharkiv-weather" --bind 127.0.0.1
```

Открыть http://localhost:8000/

### Что делать после изменений

1. `git -C C:\Users\User\projects\kharkiv-weather status`
2. Создать ветку: `git -C ... checkout -b feature/что-делаем`
3. После каждого крупного блока – `git add` + `commit`
4. Push в feature-ветку: `git push origin feature/...`
5. Когда фича готова и проверена – merge в main:
   ```powershell
   git -C ... checkout main
   git -C ... merge feature/... --no-ff -m "Merge feature/...: описание"
   git -C ... tag -a v1.X-имя -m "Что добавлено"
   git -C ... push origin main
   git -C ... push origin v1.X-имя
   ```
6. GitHub Pages автоматически передеплоит main за 1–2 минуты

### Где смотреть результат деплоя

- **Live:** https://meteo-star.github.io/kharkiv-weather/
- **Статус билда:** `gh api /repos/meteo-star/kharkiv-weather/pages/builds/latest`
- **Релизы (теги):** https://github.com/meteo-star/kharkiv-weather/tags

---

## 9. Файлы проекта

| Файл | Назначение |
|---|---|
| `index.html` | Весь код – HTML, CSS, JS в одном файле |
| `manifest.json` | PWA-манифест (имя, иконки, theme_color, start_url, display:standalone) |
| `service-worker.js` | PWA service worker — офлайн-кэш + cache strategies (cache-first / network-first / stale-while-revalidate) |
| `icons/` | PNG-иконки PWA: 192, 512, maskable 192/512, apple-touch 180, favicon 32 |
| `assets/scenes/` | 8 фото-фонов hero (Unsplash CC0, WebP 1600×600, ~217 КБ всего): day/dawn/dusk/night × clear/cloudy |
| `scripts/gen-icons.py` | Генератор иконок через PIL/Pillow (запускается вручную при изменении дизайна иконки) |
| `README.md` | Краткое описание проекта (видно на GitHub) |
| `SECURITY.md` | Контракт безопасности и приватности – все внешние сервисы, что они видят |
| `HANDOFF.md` | **Исходный** документ из чата claude.ai (v0.4) – исторический контекст, как начинали |
| `PROJECT_STATUS.md` | **Этот** документ – актуальное состояние |
| `.gitignore` | Стандартный, исключает .env, .vscode, IDE-мусор |

---

## 10. Контакт и git-конфигурация

- **GitHub аккаунт:** stanislavperec-ua
- **Email для коммитов:** `265459095+stanislavperec-ua@users.noreply.github.com` (noreply, реальный email из git-истории убран)
- **Локальный путь:** `C:\Users\User\projects\kharkiv-weather` (вне OneDrive)
- **Git конфигурация:** настроена локально в репо (не глобально)
- **gh CLI:** залогинен в github.com, scopes: gist, read:org, repo

---

*Документ обновлён: 16 мая 2026 после серии релизов v1.15 → v1.15.12 (фаза Л полностью закрыта). 12 итераций iOS-фиксов: safe-area для модалок, главного экрана, swipe-down закрытие, PWA status-bar, network-first SW, network-first для HTML, центрирование часа на NOW_HOUR, отдельный padding для PWA standalone-режима через display-mode media query. Все iPhone-проблемы решены: контент больше не залазит под Dynamic Island ни в Safari ни в установленной PWA, час корректно центрируется в любой модалке, модалки можно закрывать свайпом вниз. **Пользователь поставил проект на паузу до завтра** — следующая сессия начнётся с выбора новой фазы из бэклога.*

*Бэклог следующих шагов (выбирается пользователем при возобновлении): Алерты гипертермии/гипотермии / .ics-экспорт календаря / Sticky-табы метрик / Светлая тема + автопереключение / Сравнение городов split-view / Виджет «Лучший день недели для X» / Weather Story (AI-резюме дня) / Push-уведомления (требует backend через OneSignal или Cloudflare Worker) / Разнести index.html на модули (8500+ строк — становится тяжело).*

### Заметка по В6
По итогам обсуждения от прямого WebSocket к Blitzortung отказались (закрытое API, нестабильный handshake, требует прокси). Вместо этого реализован **прогнозный** индикатор грозы на 48ч из Open-Meteo с использованием `weather_code` (95/96/99), `cape` и `lifted_index`. Real-time трекер молний может вернуться отдельной фичей В6.5 через Cloudflare Worker-прокси, если возникнет потребность.

### Заметка по В7
Реализован **накопительный** рейтинг точности: каждое успешное обновление прогноза пишет в localStorage предсказания на +1/+2 дня от 7 моделей; когда эти даты становятся «сегодня», записывается `actual` из `avg[0]` как лучший доступный наблюдаемый сигнал без backend. MAE считается по парам (prediction, actual) для tempMax / tempMin / precipitation. Минимум 3 замера – рейтинг показывается; до этого карточка в состоянии «накапливаем данные N/7». 🏆-бейдж дублирует лидера на пилле в карточке источника.

**Альтернатива на будущее:** если когда-нибудь появится backend или Cloudflare Worker – можно тянуть фактические наблюдения из Open-Meteo `archive-api` (точнее, чем `forecast[0]` как proxy). Сейчас compromise приемлемый, так как `forecast[0]` ассимилирует свежие наблюдения и близок к реальности.
