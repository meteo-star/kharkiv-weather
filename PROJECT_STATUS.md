# PROJECT_STATUS.md – Метеоагрегатор «Meteo Star»

> Документ для продолжения работы в новом чате с Claude Code.
> Содержит актуальное состояние проекта, что уже сделано, что осталось.
>
> **Дата обновления:** 14 мая 2026
> **Текущая версия:** v1.6.1-activity-fix
> **Статус фазы В:** ✅ закрыта полностью (В1–В7)
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
    [chart-card — почасовой график на сегодня]
    [days — 5-дневный прогноз]
    [activity-windows — окна возможностей]
    [pollen-card — пыльца]
    [storm-card — гроза-индикатор на 48ч]
    [climate-card — климатический контекст]
    [astro-photo — Astro/Photographer mode]
    [accuracy-card — точность источников (В7)]
    [sources-card — выбор источника, 🏆 на лучшей модели]
    [footer]
  </div>
  [модалки: cityModal, settingsModal, modal-дня]
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
| `kw:settings:v1` | `{ lang, units: { temp, wind, pressure } }` | бессрочно |
| `kw:location:v1` | `{ name, region, lat, lon, source }` | бессрочно |
| `kw:forecast-cache:LAT_LON:v5` | Прогноз 7 моделей (после hotfix добавлены поля pmm/pmmMax) | 15 минут |
| `kw:climate-cache:LAT_LON:v1` | Климатическая норма за 5 лет | 30 дней |
| `kw:accuracy:LAT_LON:v1` | История пар (predictions, actual) на ~30 дат для расчёта MAE | без TTL, плавающее окно 30 записей |

При структурных изменениях в hourly/daily ОБЯЗАТЕЛЬНО поднимай версию ключа forecast-cache (сейчас `:v4`).

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

---

## 6. ОСТАЛОСЬ СДЕЛАТЬ – Фаза В

✅ **Фаза В закрыта полностью (В1–В7).** Все 7 уникальных фишек реализованы и задеплоены на GitHub Pages.

Следующая активность – из бэклога (см. часть 7) либо новые идеи по запросу.

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

*Документ обновлён: 14 мая 2026 после hotfix-релиза v1.6.1-activity-fix (фикс «Окон возможностей»).*
*Следующий шаг: что-то из бэклога (Inverse search / ICS-export / PWA + Push / RainViewer-радар) либо новые идеи.*

### Заметка по В6
По итогам обсуждения от прямого WebSocket к Blitzortung отказались (закрытое API, нестабильный handshake, требует прокси). Вместо этого реализован **прогнозный** индикатор грозы на 48ч из Open-Meteo с использованием `weather_code` (95/96/99), `cape` и `lifted_index`. Real-time трекер молний может вернуться отдельной фичей В6.5 через Cloudflare Worker-прокси, если возникнет потребность.

### Заметка по В7
Реализован **накопительный** рейтинг точности: каждое успешное обновление прогноза пишет в localStorage предсказания на +1/+2 дня от 7 моделей; когда эти даты становятся «сегодня», записывается `actual` из `avg[0]` как лучший доступный наблюдаемый сигнал без backend. MAE считается по парам (prediction, actual) для tempMax / tempMin / precipitation. Минимум 3 замера – рейтинг показывается; до этого карточка в состоянии «накапливаем данные N/7». 🏆-бейдж дублирует лидера на пилле в карточке источника.

**Альтернатива на будущее:** если когда-нибудь появится backend или Cloudflare Worker – можно тянуть фактические наблюдения из Open-Meteo `archive-api` (точнее, чем `forecast[0]` как proxy). Сейчас compromise приемлемый, так как `forecast[0]` ассимилирует свежие наблюдения и близок к реальности.
