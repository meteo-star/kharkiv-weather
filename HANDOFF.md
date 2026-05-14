# HANDOFF.md – Передача проекта «Метеоагрегатор Харьков»

> Документ для Claude Code. Прочитай его целиком перед началом работы.
> Дата создания: 13.05.2026
> Источник: чат claude.ai (Claude Opus 4.7)

---

## 0. Инструкции для Claude Code (КРИТИЧНО, прочитай первым)

Ты получил этот документ от Стаса (Станислав). Контекст работы с ним:

**О пользователе:**
- Корпоративный юрист КНП ЦПМД №1 в м. Південне (Харьковская обл.)
- Знает Python/Flask, делал бота для Telegram, имеет GitHub Pages-проект (marshrutki-rozklad)
- **Новичок в продвинутых Git-операциях** (branches, merge, conflicts)
- Любит конкретику и пошаговую работу

**Как работать:**
1. На **русском языке**
2. Тире – только en-dash «–», никогда не em-dash «—»
3. **Пошагово**. Один шаг – дождаться подтверждения «сделано/работает» – потом следующий. Не вываливать сразу 5 шагов
4. Если шаг не получился – не двигаемся дальше, разбираем проблему
5. Все погодные данные на русском: температура °C, ветер м/с, давление мм рт.ст., время 24-часовое
6. Использовать em-эмодзи и markdown-форматирование умеренно

**Стек проекта:**
- Чистая статика: HTML + CSS + ванильный JS
- Chart.js через CDN
- Onest + JetBrains Mono с Google Fonts
- Без сборщиков, без npm
- Деплой – GitHub Pages

---

## 1. Контекст проекта

### Что мы делали

В чате claude.ai сделали интерактивный прототип метеоприложения для Высокого / Харькова с агрегацией прогнозов по 10 источникам. Тёмный «Liquid Glass» дизайн с неоновыми акцентами в синем/циан/фиолетовом спектре.

### История версий в чате

| Версия | Что добавлено |
|---|---|
| v0.1 | Базовый Liquid Glass layout, hero, метрики, 5-дневный прогноз, почасовой график Chart.js |
| v0.2 | Восход/закат (солнечная дуга), фаза луны, УФ-индекс, AQI, модалки на клик по дню, динамические SVG-иконки погоды |
| v0.3 | Фикс багов с дубликатами `id` в SVG, 3D-иконки в astro-блоках модалок |
| **v0.4** | **Финальная версия из чата.** Переключатель источников: большая кнопка «Среднее» + 10 кнопок-пиллов под ней. При смене источника пересчитываются ВСЕ данные (hero, метрики, дни, график). Source-indicator в шапке меняет цвет и название |

### Что в финальном файле `weather_prototype_v4.html`

**Структура страницы:**
1. Header: локация, дата/время, индикатор источника
2. Hero: большая температура + 3D-иконка + condition + «По данным [источник]»
3. Metrics (4 карточки): ветер, осадки, давление в мм рт.ст., влажность
4. Astro row (3 карточки): Sun & Moon (большая) + UV gauge + AQI scale
5. Hourly chart: почасовой график на сегодня (температура + осадки)
6. 5 интерактивных карточек дней (клик → модалка)
7. Sources card: главная кнопка «Среднее» + 10 пиллов источников
8. Footer: clock + «Обновить»

**Модалка для дня:**
- Backdrop с blur, заголовок дня, hero с большой иконкой
- 4 мини-метрики
- 4 astro-плашки (Sun, Moon, UV, AQI) с 3D-иконками
- Почасовой график для этого дня
- Горизонтальный scroll с 24 часами (иконка + температура + осадки на каждый час)
- Закрытие: крестик / клик вне / Esc

**SVG-иконки погоды (9 типов):**
clear, partly-cloudy, cloudy, overcast, rain, heavy-rain, thunderstorm, snow, fog. Каждая – многослойный SVG с градиентами, тенями и бликами. ID градиентов уникальны через глобальный `uid()` счётчик.

**Все данные пока захардкожены** в массиве `BASELINE`. Каждый из 10 источников имеет свой `bias` от среднего (например, AccuWeather пессимистичнее по осадкам +12%, ECMWF консервативнее -5%, MET Norway холоднее на 0.8°C).

---

## 2. Цель следующей сессии (TL;DR)

В порядке приоритета:

1. **Деплой на GitHub Pages** – сейчас файл лежит локально, надо в облако с публичным URL
2. **Подключение реальных API** – заменить захардкоженные данные на живые из Open-Meteo + MET Norway + ещё пары сервисов
3. **Геолокация** – определять координаты пользователя автоматически (с fallback на Высокий)
4. **Доработки из бэклога** (см. часть 4)

---

## 3. Файлы в проекте

| Файл | Назначение |
|---|---|
| `weather_prototype_v4.html` | Финальный прототип из чата. Использовать как стартовую точку, переименовать в `index.html` |
| `HANDOFF.md` | Этот документ |

---

## ЧАСТЬ 1: Загрузка на GitHub и деплой на Pages

> ⚠️ **Claude Code, важно:** работаем шаг за шагом. После каждого шага – проверка, ждать «ОК / получилось» от Стаса. Не идти дальше до подтверждения.

### Шаг 1.1 – Проверка окружения

Спроси Стаса и убедись:

```bash
# Проверка установки git
git --version
# Должно вывести: git version 2.x.x
```

Если git не установлен:
- Windows: скачать с https://git-scm.com/download/win
- Linux: `sudo apt install git`
- macOS: `brew install git` или `xcode-select --install`

**Проверка конфигурации:**
```bash
git config --global user.name
git config --global user.email
```

Если пусто, настроить (использовать те же данные что в аккаунте GitHub):
```bash
git config --global user.name "Stas Perec"
git config --global user.email "your-email@example.com"
```

✅ **Проверка шага:** `git --version` показывает версию, имя/email настроены.
⏸ **СТОП – ждать подтверждения.**

---

### Шаг 1.2 – Создание репозитория на GitHub (через веб)

Стас делает это через браузер сам:

1. Зайти на https://github.com (авторизоваться)
2. В правом верхнем углу нажать `+` → **New repository**
3. Заполнить:
   - **Repository name:** `kharkiv-weather` (или другое, главное – без пробелов и кириллицы)
   - **Description:** «Метеоагрегатор по 10 источникам · Liquid Glass UI»
   - **Public** (обязательно, иначе GitHub Pages не работает на бесплатном тарифе)
   - ❌ НЕ ставить галочки на «Add README», «Add .gitignore», «license» – мы добавим их сами
4. Нажать **Create repository**
5. Скопировать URL из адресной строки: `https://github.com/<username>/kharkiv-weather`

✅ **Проверка шага:** репо создан, открывается страница «Quick setup» с инструкциями.
⏸ **СТОП – попроси Стаса прислать URL репозитория.**

---

### Шаг 1.3 – Локальная папка и копирование прототипа

```bash
# Создать рабочую папку (выбери удобное место на ПК)
mkdir kharkiv-weather
cd kharkiv-weather

# Инициализировать git
git init
git branch -M main

# Скопировать прототип, ПЕРЕИМЕНОВАВ его в index.html
# (GitHub Pages требует index.html в корне)
# Стас должен скопировать weather_prototype_v4.html в эту папку и переименовать
```

**Команда для Windows (PowerShell):**
```powershell
copy "путь\к\weather_prototype_v4.html" "index.html"
```

**Команда для Linux/macOS:**
```bash
cp /path/to/weather_prototype_v4.html ./index.html
```

Также скопировать сюда `HANDOFF.md` (этот файл).

**Создать `.gitignore`:**
```bash
cat > .gitignore << 'EOF'
# Editor
.vscode/
.idea/
*.swp
.DS_Store
Thumbs.db

# Secrets (если появятся в будущем)
.env
.env.local
config.local.js
EOF
```

**Создать минимальный `README.md`:**
```bash
cat > README.md << 'EOF'
# Метеоагрегатор · Харьков

Веб-приложение для агрегации прогноза погоды по 10 источникам в стиле Liquid Glass.

## Что внутри
- Усреднение прогнозов: ECMWF, GFS, ICON, MET Norway, OpenWeatherMap и др.
- Тёмный Liquid Glass UI с неоновыми акцентами
- 3D-иконки погоды, восход/закат, фаза луны, УФ, AQI
- Интерактивные модалки с почасовым прогнозом на каждый день
- Адаптив под любой экран

## Запуск
Открыть `index.html` в браузере или развернуть на GitHub Pages.

## Демо
https://<username>.github.io/kharkiv-weather/
EOF
```

✅ **Проверка шага:**
```bash
ls -la
# Должны быть: index.html, README.md, .gitignore, HANDOFF.md, .git/
```
⏸ **СТОП – ждать подтверждения.**

---

### Шаг 1.4 – Первый commit и push

```bash
# Проверить что git видит файлы
git status

# Добавить все файлы в индекс
git add .

# Снова проверить (теперь файлы должны быть «to be committed»)
git status

# Сделать первый коммит
git commit -m "init: прототип v0.4 из чата claude.ai"

# Связать с GitHub (подставить URL из шага 1.2)
git remote add origin https://github.com/<username>/kharkiv-weather.git

# Проверить связь
git remote -v

# Запушить
git push -u origin main
```

**При первом push GitHub может попросить аутентификацию:**
- Логин: имя пользователя GitHub
- Пароль: НЕ пароль аккаунта, а Personal Access Token

**Если попросит токен (тыкнет ошибкой):**
1. На GitHub: правый верх → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → дать имя «git-cli» → выбрать scope: `repo` → Generate
3. Скопировать токен (показывается ОДИН раз)
4. Использовать его как пароль при `git push`

Альтернатива – настроить SSH-ключ (быстрее в будущем), но для первого раза токен проще.

✅ **Проверка шага:** на странице GitHub репо появились все файлы.
⏸ **СТОП – ждать подтверждения.**

---

### Шаг 1.5 – Включение GitHub Pages

Стас в браузере:

1. Зайти на репо: `https://github.com/<username>/kharkiv-weather`
2. Открыть вкладку **Settings** (правый верх репо, не профиля)
3. В левом меню найти **Pages** (внизу секции Code and automation)
4. **Source:** выбрать `Deploy from a branch`
5. **Branch:** выбрать `main`, папка `/ (root)`
6. **Save**
7. Подождать 1-2 минуты (GitHub соберёт страницу)
8. Обновить страницу Pages – вверху появится зелёная плашка:
   > Your site is live at https://<username>.github.io/kharkiv-weather/

✅ **Проверка шага:** перейти по URL – должен открыться сайт с метеоприложением.
⏸ **СТОП – ждать подтверждения «работает».**

---

### Шаг 1.6 – Возможные проблемы (troubleshooting)

**Сайт не открывается, 404:**
- Проверь, что файл называется именно `index.html`, не `Index.html` и не `index.HTML`
- Проверь, что он в корне репо, а не в подпапке
- Подожди 3-5 минут после первого включения Pages
- В Settings → Pages должно быть «Your site is live»

**Сайт открывается, но без стилей / иконок:**
- Открой Console в браузере (F12)
- Если есть Mixed Content или CORS-ошибки – проверь, что Chart.js и шрифты грузятся через `https://`, не `http://`
- В нашем коде это уже так, не должно быть проблемы

**При push ругается «non-fast-forward»:**
```bash
git pull origin main --rebase
git push
```

---

## ЧАСТЬ 2: Дерево версий – модель веток для проекта

> Объясни Стасу как новичку. Это критически важно: без веток он потеряет рабочую версию, экспериментируя.

### 2.1 Концепция

Думаем о ветках как о параллельных копиях проекта:

```
main ────●────●────●────●────●─────────●  ← стабильная версия (то что в Pages)
          \              \             /
           ●──●           ●──●──●─────●
           feature/        feature/
           real-api        geolocation
```

**Правила:**
- `main` всегда работает, всегда задеплоен. Не ломать!
- Любое изменение делается в отдельной ветке `feature/что-делаешь`
- Когда фича готова и протестирована – мерж обратно в `main`
- После мержа ветку можно удалить

### 2.2 Базовые команды

**Узнать в какой ветке сейчас:**
```bash
git branch
# звёздочка отметит текущую ветку
```

**Создать ветку и переключиться в неё:**
```bash
git checkout -b feature/real-api
# или новый синтаксис:
git switch -c feature/real-api
```

**Переключиться на существующую ветку:**
```bash
git checkout main
# или:
git switch main
```

**Закоммитить в ветку:**
```bash
git add .
git commit -m "feat: подключил Open-Meteo для 5 моделей"
git push -u origin feature/real-api    # первый push в новую ветку
git push                                # дальнейшие пуши
```

**Замержить ветку обратно в main:**
```bash
# 1. Перейти в main
git checkout main

# 2. Подтянуть последнее из main (на случай если кто-то ещё пушил)
git pull

# 3. Замержить
git merge feature/real-api

# 4. Запушить обновлённый main
git push

# 5. Удалить ветку локально
git branch -d feature/real-api

# 6. Удалить ветку на GitHub
git push origin --delete feature/real-api
```

### 2.3 Теги для версий

Когда выпускаем «релиз» (рабочая версия для деплоя) – ставим тег:

```bash
# Создать тег
git tag -a v0.4 -m "Прототип с переключателем источников (готов к API)"

# Запушить тег на GitHub
git push origin v0.4

# Посмотреть все теги
git tag

# Удалить тег (если ошиблись)
git tag -d v0.4
git push origin --delete v0.4
```

В GitHub теги видны во вкладке **Releases** – удобно для отката.

### 2.4 Типичные сценарии работы

**Сценарий А: «Хочу попробовать новую фичу»**
```bash
git checkout main
git pull                              # обязательно перед началом
git checkout -b feature/uv-real
# ... работаем, правим index.html ...
git add .
git commit -m "feat: подключил UV из Open-Meteo"
git push -u origin feature/uv-real
# тестим, если ОК:
git checkout main
git merge feature/uv-real
git push
git branch -d feature/uv-real
```

**Сценарий Б: «Сломал прод (main), надо откатить»**
```bash
# Посмотреть историю коммитов
git log --oneline

# Откатиться на конкретный коммит (по hash из лога)
git revert <commit-hash>
git push

# Или на тег:
git checkout v0.4
git checkout -b hotfix/rollback
# ... здесь только нужные правки ...
```

**Сценарий В: «Хочу быстро отметить «вот эта версия мне нравится»»**
```bash
git tag -a v0.5-real-api -m "Реальные данные подключены, всё работает"
git push origin v0.5-real-api
```

### 2.5 Рекомендованная структура веток для этого проекта

```
main                                     ← стабильно работает на Pages
├── feature/real-api                    ← подключение Open-Meteo + MET Norway
├── feature/geolocation                 ← определение координат пользователя
├── feature/city-search                 ← поиск города (Nominatim)
├── feature/pwa-manifest                ← возможность установить как app
├── feature/forecast-spread             ← полоса разброса между моделями
└── hotfix/<имя>                        ← срочный фикс прода
```

### 2.6 Что коммитить, а что нет

✅ **Коммитить:**
- `index.html`, `style.css`, `script.js` если разделим
- `README.md`, `HANDOFF.md`
- `manifest.json`, `service-worker.js` (если будут)
- `assets/` с иконками

❌ **НЕ коммитить:**
- `.env` с секретными ключами (если появятся)
- `node_modules/` (если будем использовать npm)
- `.DS_Store`, `Thumbs.db`, `*.swp`
- API ключи в коде (для GitHub Pages их в принципе нельзя скрыть, но не помещай в публичный repo)

`.gitignore` уже настроен в шаге 1.3.

---

## ЧАСТЬ 3: Подключение реальных API

> После того как GitHub Pages работает с прототипом v0.4 – начинаем заменять захардкоженные данные.

### 3.1 Что подключаем

| API | URL | Ключ | Даёт |
|---|---|---|---|
| Open-Meteo Forecast | `api.open-meteo.com/v1/forecast` | не нужен | 7+ моделей (ECMWF, GFS, ICON, GFS Graphcast, JMA, MeteoFrance, UKMO, BOM, GEM) |
| Open-Meteo Air Quality | `air-quality-api.open-meteo.com/v1/air-quality` | не нужен | AQI, PM2.5, PM10, NO2, O3 |
| MET Norway Locationforecast | `api.met.no/weatherapi/locationforecast/2.0/compact` | не нужен, нужен User-Agent | Nordic MEPS модель |
| Open-Meteo Geocoding | `geocoding-api.open-meteo.com/v1/search` | не нужен | Поиск города → координаты |

**Координаты Высокого/Харькова для теста:**
- Lat: 49.9
- Lon: 36.21

### 3.2 Создать ветку для работы

```bash
git checkout main
git pull
git checkout -b feature/real-api
```

### 3.3 Open-Meteo – все 7 моделей одним запросом

URL для теста (вставить в браузер):
```
https://api.open-meteo.com/v1/forecast?latitude=49.9&longitude=36.21&hourly=temperature_2m,precipitation_probability,wind_speed_10m,relative_humidity_2m,surface_pressure&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=Europe/Kiev&wind_speed_unit=ms&models=ecmwf_ifs04,gfs_seamless,icon_seamless,gem_seamless,jma_seamless,meteofrance_seamless,ukmo_seamless
```

**Скелет fetch-функции (вставить в `<script>` после ICONS, перед SOURCES):**

```javascript
async function fetchOpenMeteo(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    hourly: 'temperature_2m,precipitation_probability,wind_speed_10m,relative_humidity_2m,surface_pressure,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max,weather_code',
    timezone: 'Europe/Kiev',
    wind_speed_unit: 'ms',
    models: 'ecmwf_ifs04,gfs_seamless,icon_seamless,gem_seamless,jma_seamless,meteofrance_seamless,ukmo_seamless',
    forecast_days: 5
  });
  
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!response.ok) throw new Error(`Open-Meteo HTTP ${response.status}`);
  return await response.json();
}

// Преобразование hPa → мм рт.ст.
function hPaToMmHg(hPa) {
  return Math.round(hPa * 0.750062);
}

// Open-Meteo weather codes → наши condition strings
function codeToCondition(code) {
  if (code === 0) return 'clear';
  if (code <= 2) return 'partly-cloudy';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code <= 57) return 'rain';
  if (code <= 67) return 'rain';
  if (code <= 77) return 'snow';
  if (code <= 82) return 'heavy-rain';
  if (code <= 86) return 'snow';
  if (code <= 99) return 'thunderstorm';
  return 'cloudy';
}
```

### 3.4 MET Norway (требует User-Agent)

```javascript
async function fetchMetNorway(lat, lon) {
  // ВАЖНО: MET Norway требует User-Agent с контактом, иначе блокирует
  // К сожалению, fetch в браузере не позволяет ставить User-Agent
  // Решение: либо использовать прокси (Cloudflare Worker), либо опустить эту модель
  // на статике можно ограничиться Open-Meteo
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`MET-No HTTP ${response.status}`);
  return await response.json();
}
```

> ⚠️ MET Norway требует User-Agent с email разработчика. В браузере fetch это не позволяет. На GitHub Pages – опустить эту модель, либо позже поднять Cloudflare Worker-прокси (бесплатно).

### 3.5 Air Quality

```javascript
async function fetchAirQuality(lat, lon) {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm2_5,pm10&hourly=european_aqi&timezone=Europe/Kiev`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`AQI HTTP ${response.status}`);
  return await response.json();
}
```

### 3.6 План интеграции

**В index.html заменить:**

1. Массив `BASELINE` – на async функцию `loadBaseline()` что собирает данные из API
2. Функцию `getForecast(sourceId)` – вместо генерации bias-вариаций из BASELINE, доставать данные конкретной модели из ответа Open-Meteo (там есть `temperature_2m_ecmwf_ifs04`, `temperature_2m_gfs_seamless` и т.д.)
3. Среднее «avg» – вычислять как arithmetic mean по всем моделям

**Псевдокод flow:**
```javascript
// При загрузке страницы
async function init() {
  showLoader();
  try {
    const om = await fetchOpenMeteo(LAT, LON);
    const aqi = await fetchAirQuality(LAT, LON);
    parseAndStore(om, aqi);   // распарсить и сохранить в state
    renderAll();
  } catch (err) {
    showError(err);
    // Fallback на захардкоженные данные
    useFallback();
  }
  hideLoader();
}
```

### 3.7 Чеклист задач для этой ветки

- [ ] Реализовать `fetchOpenMeteo()` и проверить через `console.log`
- [ ] Парсер ответа в структуру `forecastData` для каждой из 7 моделей
- [ ] Реализовать вычисление «среднего» из всех моделей
- [ ] Подключить Air Quality endpoint
- [ ] Подключить UV из daily Open-Meteo
- [ ] Sunrise/sunset из daily Open-Meteo (преобразовать ISO в HH:MM)
- [ ] Loader при загрузке (можно простой spinner с glass-стилем)
- [ ] Error handling с fallback на захардкоженные данные
- [ ] Обновить footer: «обновлено в HH:MM:SS» – реальное время загрузки данных
- [ ] Тест на разных условиях (если есть VPN – пощупать как ведёт себя сервис)

### 3.8 Когда фича готова

```bash
# Тестируем локально (открыть index.html в браузере)
# Если всё ОК:

git add .
git commit -m "feat: подключил Open-Meteo (7 моделей) + Air Quality"
git push

# Перейти в main и замержить
git checkout main
git pull
git merge feature/real-api
git push

# Тег
git tag -a v0.5-real-api -m "Реальные данные подключены"
git push origin v0.5-real-api

# Удалить feature-ветку
git branch -d feature/real-api
git push origin --delete feature/real-api
```

GitHub Pages автоматически передеплоит main в течение 1-2 минут.

---

## ЧАСТЬ 4: Бэклог дальнейших улучшений

В порядке полезности:

### 4.1 Геолокация (ветка `feature/geolocation`)

```javascript
async function getUserLocation() {
  if (!navigator.geolocation) return null;
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      err => resolve(null),
      { timeout: 5000 }
    );
  });
}

// В init():
const loc = await getUserLocation();
const { lat, lon } = loc || { lat: 49.9, lon: 36.21 };
```

Браузер спросит у пользователя разрешение. Если откажет – fallback на Высокий.

### 4.2 Поиск города (ветка `feature/city-search`)

Open-Meteo geocoding API:
```
https://geocoding-api.open-meteo.com/v1/search?name=Kharkiv&count=5&language=ru
```

Добавить в header поле поиска. Список из 5 вариантов, клик → перерисовка с новыми координатами. Сохранять выбранный город в `localStorage`.

### 4.3 Полоса разброса между моделями (ветка `feature/forecast-spread`)

На главном графике добавить полупрозрачную полосу между min/max прогнозом всех моделей – покажет диапазон неопределённости. Это уникальная фишка ансамблевого подхода, никто из коммерческих сервисов так не показывает.

В Chart.js делается через `fill: '+1'` между двумя dataset'ами.

### 4.4 PWA – устанавливается на телефон как приложение (ветка `feature/pwa`)

Нужно:
- `manifest.json` с иконками
- `service-worker.js` для офлайн-кэша (Chart.js, шрифты, последние данные)
- `<link rel="manifest">` в `<head>`

После этого Android покажет «Установить приложение», iOS – «На главный экран».

### 4.5 Алерты погодных явлений (ветка `feature/alerts`)

Open-Meteo возвращает `weather_code`. Если для ближайших 6 часов есть код ≥95 (гроза) или ≥85 (сильный снег) – показывать топовую плашку с предупреждением.

### 4.6 Радар осадков (ветка `feature/radar`)

RainViewer API даёт бесплатные тайлы радара. Можно вставить через Leaflet.js небольшую карту на 200×150px над hero. Опционально.

### 4.7 История погоды (ветка `feature/history`)

Open-Meteo даёт исторические данные бесплатно (`archive-api.open-meteo.com`). Можно показать график «за тот же день в прошлые годы» – интересно для Высокого, чтобы видеть тренд.

### 4.8 Кэширование запросов

Слой кэша в `localStorage`: ключ – `coords + дата + час`. Если кэш свежее 15 минут – не делать новый запрос. Это уменьшит нагрузку на бесплатные API и ускорит загрузку.

---

## ЧАСТЬ 5: Troubleshooting

### Git: «fatal: refusing to merge unrelated histories»
```bash
git pull origin main --allow-unrelated-histories
```

### Git: «Your branch is ahead of origin/main by N commits»
```bash
git push
```

### Git: конфликт мерджа
```bash
git status                      # покажет конфликтные файлы
# открыть файлы, найти <<<<<<< / ======= / >>>>>>>
# выбрать нужную версию, удалить маркеры
git add .
git commit
```

### GitHub Pages: пушнул, а сайт не обновляется
- Подождать 2-3 минуты
- В Settings → Pages должно быть «Your site was last deployed N minutes ago»
- В Actions проверить, что workflow завершился без ошибок
- Hard refresh браузера: Ctrl+Shift+R (Windows) / Cmd+Shift+R (macOS)

### CORS-ошибка от какого-то API
Не все API позволяют запросы из браузера. Решение: Cloudflare Worker как прокси (бесплатный план – 100к запросов/день).

### API возвращает 429 «Too Many Requests»
Open-Meteo: лимит 10000 запросов/день на IP – не достижим в обычном использовании.
MET Norway: жёстче. Использовать User-Agent с email + кэшировать.

---

## ЧАСТЬ 6: Финальный чеклист сессии

В конце сессии у Стаса должно быть:

- [ ] Репозиторий на GitHub `<username>/kharkiv-weather`
- [ ] GitHub Pages включён, сайт открывается
- [ ] Локальная папка склонирована, git настроен
- [ ] Git tag `v0.4` поставлен на стартовом состоянии
- [ ] Понимание модели веток (`main` + `feature/*`)
- [ ] (Если время позволит) Ветка `feature/real-api` начата

**Время на полный пайплайн:** 1.5-3 часа в зависимости от того, насколько глубоко уйдём в API.

---

## Финальная нота для Claude Code

Стас знает что делает в технике, но в Git-операциях нуждается в опеке. Не торопись. Каждый шаг – остановись, проверь, попроси подтверждение. Лучше потратить 2 часа и получить рабочий деплой, чем за 30 минут наделать ошибок с откатами.

Когда дойдёшь до подключения реальных API – не уходи слишком глубоко в код за один раз. Сначала пусть Open-Meteo заработает только для одной модели, ты увидишь данные в консоли, Стас подтвердит «вижу цифры» – потом расширяем на все 7. Подобный итеративный подход.

Если у Стаса по ходу появятся идеи / новые требования – фиксируй их в этот же `HANDOFF.md` в раздел «Backlog» или создавай отдельный `BACKLOG.md`.

Удачи! 🌤

---

*Документ создан в чате Claude Opus 4.7 (claude.ai), 13.05.2026.
Следующая сессия – продолжение в Claude Code.*
