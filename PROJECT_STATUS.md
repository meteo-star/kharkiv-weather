# PROJECT_STATUS.md – Метеоагрегатор «Meteo Star»

> Документ для продолжения работы в новом чате с Claude Code.
> Содержит актуальное состояние проекта, что уже сделано, что осталось.
>
> **Дата обновления:** 14 мая 2026
> **Текущая версия:** v1.4-pollen
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
    [стили для каждой фичи: settings, location, astro-photo, activity-windows, climate, pollen, ...]
  </style>
</head>
<body>
  <div class="container">
    [header с локацией и чипом настроек]
    [hero — текущая погода]
    [metrics — ветер, осадки, давление, влажность]
    [astro-row — солнце/луна, УФ, AQI]
    [astro-photo — Astro/Photographer mode]
    [activity-windows — окна возможностей]
    [pollen-card — пыльца]
    [climate-card — климатический контекст]
    [chart-card — почасовой график]
    [days — 5-дневный прогноз]
    [sources-card — выбор источника]
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
| `kw:forecast-cache:LAT_LON:v3` | Прогноз 7 моделей | 15 минут |
| `kw:climate-cache:LAT_LON:v1` | Климатическая норма за 5 лет | 30 дней |

При структурных изменениях в hourly/daily ОБЯЗАТЕЛЬНО поднимай версию ключа forecast-cache (сейчас `:v3`).

---

## 4. Внешние API (все бесплатные, без ключей)

| API | Что даёт | Когда вызывается |
|---|---|---|
| `api.open-meteo.com/v1/forecast` | 7 моделей: ECMWF, GFS, ICON, GEM, JMA, MF, UKMO. Поля: temperature, precipitation_probability, wind, humidity, pressure, weather_code, dew_point, apparent_temperature, cloud_cover, uv_index_max | при init, смене города, кнопке «Обновить» |
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

---

## 6. ОСТАЛОСЬ СДЕЛАТЬ – Фаза В (2 шага)

### В6: Гроза-трекер (Blitzortung)
**Идея:** Мини-карта со светящимися точками молний в реальном времени в радиусе 100 км. Если рядом гроза – баннер «Гроза в 18 км к северу, приближается».

**Источник данных:** Blitzortung.org – открытые WebSocket-фиды для молний в реальном времени.

**Технические детали:**
- WebSocket-соединение к Blitzortung
- Парсинг сообщений о ударах молний (timestamp, lat, lon)
- Фильтрация по радиусу от currentLocation
- Мини-карта Leaflet.js (если хочется тайлы) или просто SVG с точками относительно центра локации
- Тревожный баннер если удар ближе 30 км

**Нюанс по безопасности:** Blitzortung видит IP пользователя. Уже отражено в `SECURITY.md`.

### В7: Самооценка точности источников
**Идея:** Раз в день в фоне сохраняем в localStorage вчерашний прогноз каждого из 7 источников на сегодня. Через сутки сравниваем с фактом. Через 2–3 недели получается **живой рейтинг точности** именно для текущей локации: «За последние 30 дней по температуре точнее всех ECMWF (MAE 0.8°), хуже всех – GFS (MAE 2.1°)».

**Технические детали:**
- localStorage ключ `kw:accuracy:LAT_LON:v1` – массив записей `[{date, predictions: {sourceId: {tempMax, tempMin, precip}}, actual: null}]`
- При загрузке: проверяем какие даты уже прошли и для них нужно собрать `actual` из текущего прогноза `forecast[0]`
- Расчёт MAE (mean absolute error) для каждого источника
- Отображение в карточке «Точность источников» – таблица или звёзды
- Опционально: цветные шкалы на кнопках источников

**Нюанс:** работает только если пользователь регулярно открывает сайт. Для редких посещений данные не накапливаются.

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

*Документ обновлён: 14 мая 2026 после закрытия Шага В5 (v1.4-pollen).*
*Следующий шаг: В6 (Гроза-трекер Blitzortung).*
