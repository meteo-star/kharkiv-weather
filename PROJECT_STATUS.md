# PROJECT_STATUS.md – Метеоагрегатор «Meteo Star»

> Документ для продолжения работы в новом чате с Claude Code.
> Содержит актуальное состояние проекта, что уже сделано, что осталось.
>
> **Дата обновления:** 12 июня 2026
> **Текущая версия:** v1.56.0
> **Статус фаз А–Л:** ✅ закрыты (см. раздел 5)
> **Статус фазы М (Модуляризация):** ✅ закрыта (v1.16, v1.17)
> **Статус фазы Н (Perf + Compare Mode + alerts):** ✅ закрыта (v1.18, v1.19)
> **Статус фазы О (PWA force-update + sticky hero):** ✅ закрыта (v1.20)
> **Статус фазы П (Glass scrollbar + светлая тема + 8 hero-фото):** ✅ закрыта (v1.20.5, v1.21.0 → v1.21.3)
> **Статус фазы Б (Telegram-бот + Cloudflare Worker + multi-account):** ✅ закрыта (v1.22.0 → v1.23.2)
> **Статус v1.23.3 (hero now-hour fix):** ✅ закрыт — hero показывает погоду текущего часа, не дневного агрегата
> **Статус v1.24.0 (подразделы утренней сводки + precip_soon):** ✅ закрыт — 6 опциональных секций в утренней сводке бота, правило «Осадки в ближайшие N часов» с раздельными подразделами Дождь/Снег
> **Статус фазы Р (4-уровневая облачность + 16 hero-фото):** ✅ закрыта (v1.25.0)
> **Статус v1.26.0 (accuracy hint на hero + 0.1° ключ + авто-миграция):** ✅ закрыт
> **Статус v1.26.1 (persist выбранного источника + bump SW для PWA):** ✅ закрыт
> **Статус фазы С (публичная accuracy через бот, server-truth):** ✅ закрыта (v1.27.0 → v1.27.3)
> **Статус v1.28.x (copy /pair, заголовок «Настройки», fix notif/avg/hero-flicker):** ✅ закрыт (v1.28.0 → v1.28.6)
> **Статус v1.29.x (geo-refresh + PWA auto-update + visible feedback + neighbor-cells fallback + real precip mm):** ✅ закрыт (v1.29.0 → v1.29.4)
> **Статус v1.30.x (бот AVG из 7 моделей + source-aware уведомления + accuracy-advice toast + hint logic):** ✅ закрыт (v1.30.0 → v1.30.2)
> **Статус v1.31.x (новые секции 🌫 Туман и 🌙 Фаза Луны + плитка осадков пик/сумма):** ✅ закрыт (v1.31.0 → v1.31.3)
> **Статус v1.32.x (multi-device pairTokens + усиленный hover-glow дней + AVG day-minmax из hourly):** ✅ закрыт (v1.32.0 → v1.32.2)
> **Статус v1.33.x (precip-sensitivity 3 уровня + уточнённое описание):** ✅ закрыт (v1.33.0 → v1.33.2)
> **Статус v1.34.x (iOS-style wheel-pickers + лимиты + popover + precip% fallback на сайте и в боте):** ✅ закрыт (v1.34.0 → v1.34.3)
> **Статус v1.35.x (повышение точности: ECMWF AIFS + bias-correction):** ✅ закрыт (v1.35.0 → v1.35.1)
> **Статус v1.36.0 (взвешенный AVG: вес = 1/MAE):** ✅ закрыт
> **Статус v1.37.0 (реальные observations из archive-api):** ✅ закрыт
> **Статус v1.38.0 (per-variable best: 🏆 отдельно для Tmax/Tmin/precip):** ✅ закрыт
> **Статус v1.39.0 (15-мин nowcast осадков, плашка на hero):** ✅ закрыт
> **Статус v1.40.0 (бот использует minutely_15 для коротких precip_soon):** ✅ закрыт
> **Статус v1.40.1 (fix: убран сбивающий «Без осадков 2 часа» при противоречии источников):** ✅ закрыт
> **Статус v1.40.2 (плашка различает дождь и снег по температуре):** ✅ закрыт
> **Статус v1.41.0 (расширенная классификация: морось/мокрый снег/ледяной дождь/гроза):** ✅ закрыт
> **Статус v1.42.0 (зелёный «точнее всех»: AVG в per-variable рейтинге, единый цвет лидера):** ✅ закрыт
> **Статус v1.42.1 (fix: иконки часов согласованы с реальным pmm — нет «дождя» при 0 мм/ч):** ✅ закрыт
> **Статус v1.42.2 (CRITICAL: nowcast плашка не работала с multi-model запросом):** ✅ закрыт
> **Статус v1.42.3 (CRITICAL: бот в Worker UTC парсил Open-Meteo local-times как UTC — все precip правила работали с окном в прошлое):** ✅ закрыт
> **Статус v1.42.4 (whenStr UTC-дата + бот max→mean precipitation для согласия с сайтом + storm требует cape):** ✅ закрыт
> **Статус v1.43.0 (стрелки прокрутки и touch-swipe в почасовой ленте модалки дня):** ✅ закрыт
> **Статус v1.43.1 (footer «по данным X» в каждом уведомлении бота):** ✅ закрыт
> **Статус v1.50.0 (🌐 i18n — 16 языков, сайт + бот, авто-detect, picker, автосинк):** ✅ закрыт
> **Статус v1.50.1 (hourly NOW-час: ярче подсветка + надёжное центрирование):** ✅ закрыт
> **Статус v1.50.2 (CRITICAL fix бота: precip_soon/rain_soon слали о дожде в прошлом):** ✅ закрыт
> **Статус v1.50.3 (precip cooldown 6→3ч + smart-reset на конец дождевого эпизода):** ✅ закрыт
> **Статус v1.51.0 (этап 1 «Честные осадки»: occurrence+amount метрики vs реальные мм ERA5):** ✅ закрыт
> **Статус v1.52.0 (этап 2 «🎯 Smart»: per-variable веса + медиана мм + дебиаз членов, сайт + Worker):** ✅ закрыт
> **Статус v1.53.0 (этап 3 «🎲 Ансамблевые осадки»: ECMWF ENS 51 член для Smart, P10–P90 в модалке):** ✅ закрыт
> **Статус v1.53.1 (человеческая формулировка ансамблевой строки):** ✅ закрыт
> **Статус v1.54.0 (этап 4 «Синхронизация бота»: smart-веса в push'ах + ансамблевая вероятность в precip-правилах):** ✅ закрыт
> **Статус v1.54.1 (семантика плитки осадков: интенсивность по мм + локализация подписи + атрибуция ансамбля):** ✅ закрыт
> **Статус v1.54.2 (человеческие формулировки: «по вариантам прогноза» вместо «ансамбль ECMWF», ×16 языков):** ✅ закрыт
> **Статус v1.54.3 (плитка «Осадки» = остаток дня, единое окно с графиком; убран fallback на полные сутки):** ✅ закрыт
> **Статус v1.54.4 (гроза-индикатор: уровни ≥2 требуют подтверждения — грозовой код × CAPE≥500, голый CAPE × влага; закрыта дыра CAPE>2500):** ✅ закрыт
> **Статус v1.54.5 (degraded-fallback: при отказе multi-model запроса — best_match с баннером «Упрощённый прогноз»; не кэшируется, не пишется в accuracy):** ✅ закрыт
> **Статус v1.54.6 (устойчивость: ретраи forecast-запроса по быстрым обрывам + показ протухшего кэша «Прогноз не обновлён · данные от HH:MM» вместо пустого baseline при отказе Open-Meteo):** ✅ закрыт
> **Статус v1.55.0 (строка-сводка «остаток дня + ночь» в hero-карточке «Сейчас» и модалке дня; ×16 языков):** ✅ закрыт
> **Статус v1.55.1 (i18n-фикс: hero-плашка точности и 5 др. групп hardcoded-строк вынесены в ключи и переведены ×16):** ✅ закрыт
> **Статус v1.55.2 (fix: подсветка активного источника Smart/модель в панели при загрузке):** ✅ закрыт
> **Статус v1.56.0 (UI-апгрейд V1, 3 этапа: дни вертикальным списком строк + почасовка в модалке дня вертикальным списком + плавающий нижний док-навигация; ×16 языков):** ✅ закрыт
> **🏁 ПЛАН «МАКСИМАЛЬНОЙ ТОЧНОСТИ» (этапы 1–4, v1.51→v1.54) ЗАВЕРШЁН. Фаза накопления accuracy-данных — см. HANDOFF.md раздел 7.**
>
> ## v1.50.0 — i18n релиз (27 мая 2026)
>
> Полностью завершён план из PLAN_I18N.md (удалён). 3 релиза, 5 фаз:
> - **Релиз 1 (база):** ru, uk, en + de, pl, cs, fr, it, es
> - **Релиз 2 (соседи Украины):** ro, hu, sk
> - **Релиз 3 (туризм/эмиграция):** pt, nl, tr, el
>
> Итого **16 языков** интерфейса, ~9000 переводов суммарно (сайт ~7000 + бот ~1100 + лоадеры/ошибки/правила/aria).
>
> **Что сделано:**
> - **Сайт (app.js):** объект `I18N` × 16 языков (≈410 ключей × 16) + `I18N_EXTRA` extension-блок для доформирования настроек/уведомлений/picker/tооltipов. Авто-detect через `navigator.language`. iOS-style picker (3 фикс. кнопки RU/UK/EN + chevron на EN → bottom-sheet со всеми 16). Локализованы: alert/confirm, RULE_DEFS (правила уведомлений с подразделами и чувствительностью), pollen/notif/toast статусы, единицы (мм/км/ч/дн), aria-label стрелок прокрутки, accuracy-bias title, accuracy-advice toast, `<title>` страницы.
> - **Бот (`bot/src/i18n.js` — новый модуль):** `BOT_TRANSLATIONS` × 16 языков (~70 ключей). Хелперы: `t(key, lang, params)`, `tWhenStr` (TZ-fix v1.42.4 сохранён), `tInMinutes`, `tPluralDays` (правильная плюрализация для славянских one/few/many + EN/DE/FR/IT/ES one/other + HU без склонения + RO one/other), `tWindDir` (8 сторон света × 16), `tSourceLabel` + `tSourceFooter` (например «по данным ECMWF» / «from ECMWF» / «d'après ECMWF»), `tWeatherCodeLabel` (WMO → локализованное), `tMoonName` + `tMoonTrend`, `detectLang(tgCode)`.
> - **Бот (`bot/src/index.js`):** автодетект на 16 языков при `/start` и `/pair`. Все hardcoded русские сообщения переписаны через `t(key, sub.lang, params)`: команды `/start`, `/help`, `/status`, `/location`, `/pair`, `/setup`, `/login`, `/unpair`, `/stop`, неизвестная команда. Полностью локализован `evaluateRule()` — все 10 fired-веток (cold/heat/rainSoon×2/snowSoon×2/precip_soon×2/storm/dryStreak). Полностью локализован `buildMorningSummary()` + 8 блоков (precip/wind/feels/astro/moon/fog/storm/tomorrow). Footer «по данным X» в каждом push на родном языке.
> - **Автосинк сайт ↔ бот:** `/api/rules-set` принимает опциональное `body.lang`. На сайте при смене языка в Settings → `syncLangToBot()` шлёт POST без правил → бот обновляет `sub.lang` → следующий push приходит на новом языке.
> - **Месяцы в нужной форме:** славянские в родительном падеже («13 května», «13 maja», «13 listopada»), греческий генитив («13 Μαΐου»), турецкий капитализованный («13 Mayıs»), английский номинатив.
> - **Метео-нюансы:** sleet/freezing rain/drizzle/thunderstorm подобраны на каждом языке (Schneeregen / deszcz ze śniegiem / lapoviță / havas eső / aguanieve / nevischio / χιονόνερο).
>
> **Что НЕ переведено намеренно:**
> - Админ-команды бота (`/admin_*`) — только для Стаса (userId=151252296), остаются на русском
> - Названия городов в избранном (Высокий, Київ) — нет универсального автоперевода произвольных топонимов
> - Lookup-карты «русское→ключ» (UA_CITY_TRANSLATIONS / MOON_NAME_TO_KEY / UV_LABEL_TO_KEY) — русский там как key для поиска
>
> **3 раунда аудита** через Explore-агентов нашли и закрыли ≈80 пропусков по всему UI: alerts/confirms, лоадеры pollen, notif source label, toasts, RULE_DEFS целиком (~30 текстов настроек правил), aria-label стрелок и кнопки «Назад» в модалках, `<title>` страницы, demo-значения в HTML (заменены на `—` для исключения «вспышки» русского при загрузке), `settings.notif.*` (11 ключей оказались только в RU блоке).
>
> ## v1.50.1 — Hourly NOW-час UX-фикс (27 мая 2026)
>
> Косметика + UX-починка после v1.50.0:
>
> **Подсветка `.hour-cell.now`** приведена к стилю `.day.today` (раньше была заметно слабее):
> - Тёмная тема: cyan-purple градиент 0.22→0.12, border `rgba(0,212,255,0.75)`, 3-слойное свечение (0 10px 32px @ 0.38 + 0 0 18px @ 0.28 + inset highlight), font-weight 700, text-shadow на значении метрики
> - Светлая тема: коралловая палитра 0.32→0.2, border 0.75, аналогичные тени
> - Hover hour-cell: усилен до уровня «выбора» (0.14 fill, 0.55 border, translateY(-2px), box-shadow)
> - `:active` — лёгкий «вдавленный» эффект
>
> **Центрирование текущего часа при загрузке** (раньше не всегда центрировалось — пользователю приходилось листать):
> - **Корень проблемы:** `applyAll()` вызывает `renderHourlyRow` несколько раз (cache → fresh fetch → re-applyAll'ы). Старая логика `savedScroll > 0 → восстановить позицию` фиксировала недо-центрированную позицию от предыдущего ре-рендера.
> - **Новая логика:** флаг `_userScrolledHourly` отслеживает физическое взаимодействие через `wheel` + `touchmove` (без `pointerdown` чтобы случайный tap не отключал авто-центр на следующих ре-рендерах — это важно на iOS PWA где tap по ячейке часа открывает hourly-modal). Пока флаг false — каждый ре-рендер пере-центрирует на NOW_HOUR. Юзер физически свайпнул → флаг становится true → позиция сохраняется.
> - **Надёжность центрирования:** 4 попытки центрирования (`rAF×2 + 100/300/600 мс`) — поймает стабильный layout даже на iOS PWA cold-start, при медленных шрифтах или при re-render'е поверх кэша.
> - **Mobile-safe:** ручной `scrollLeft` вместо `scrollIntoView`. Причины: (1) `behavior:'instant'` появился только в iOS Safari 17.4 (март 2024), на старых iPhone опция игнорируется и может вызвать плавный скролл, что бросается в глаза при загрузке; (2) `scrollIntoView({block:'nearest'})` на iOS может прокрутить ВСЮ страницу если row не полностью видна (например короткая ландшафтная ориентация). Ручной scrollLeft работает строго по горизонтали внутри контейнера.
>
> Service worker: CACHE_VERSION → v1.50.1-hourly-now-fix.
>
> ## v1.51.0 — Этап 1 «Честные осадки» (10 июня 2026)
>
> Первый этап плана «режим максимальной точности» (этапы: 1 честные осадки → 2 Smart per-variable веса → 3 Ensemble API → 4 синхронизация бота + lead-корзины).
>
> **Проблема:** метрика точности осадков `precipMAE` сравнивала прогноз ВЕРОЯТНОСТИ модели с прокси — `precipProb` от avg-прогноза дня-0 (observations-cron сознательно не перезаписывал его архивом, а сайт выбрасывал реальные `precipSum` в `convertServerRecord`). Рейтинг получался «по кругу»: модели сравнивались с консенсусом ансамбля, а не с фактом → AVG структурно выигрывал по осадкам. Вдобавок модели без `precipitation_probability` (AIFS, MF, JMA, UKMO) вообще не участвовали в precip-рейтинге.
>
> **Решение (app.js):**
> - `computeAccuracyStats`: новые метрики по реальным мм из archive-api (ERA5/ERA5T), только для записей `actualSource==='archive'`:
>   - `precipOccMiss` — % промахов «дождь/сухо», порог `WET_DAY_MM = 0.5` мм/сутки. Считается как 1 − CSI: дни «сухо у всех и по факту сухо» не учитываются, иначе редкие дожди тонут в лёгких сухих попаданиях.
>   - `precipAmtMAE` — средняя абсолютная ошибка суточной суммы, мм.
> - `precipScoreOf(s)` — композит осадков на °C-шкале: `occMiss/12.5 + min(amtMAE, 6)/2`.
> - `accuracyComposite` — осадки теперь через `precipScoreOf`; legacy `precipMAE/10` остался только fallback'ом без ground truth (офлайн). Это автоматически чинит и **веса ансамбля** (`computeEnsembleWeights` ест composite).
> - `convertServerRecord` / `extractDayMetrics` — прокидывают `precipSum` (сервер копит его с v1.37 — данные уже были, работают сразу).
> - `renderAccuracy`: `bestByField(field)` → `bestBy(accessor)`, per-variable лидер осадков по `precipScoreOf`. Новая ячейка `precipCell`: % промахов крупно + `±X.Xмм` мелко (`.acm-sub`). Строка-легенда `accuracy.precipLegend` (новый ключ × 16 языков, `accuracy.colPrecip` переименован «%осад» → «Осадки» × 16).
> - `window.dumpPrecip()` — DevTools-дамп честных precip-метрик.
> - `ACCURACY_MAX_RECORDS` / `ACC_MAX_RECORDS` (бот): 30 → 60 — для occurrence информативны только дни с дождём (факт или прогноз), их мало.
>
> **Сервер (bot/src/index.js):** только константа окна 30→60. Схема KV и /api/accuracy не менялись — формат записей уже содержал всё нужное.
>
> **Проверка** (`scripts/test-precip-metrics.mjs` — извлекает реальный код из app.js, 12 синтетических ассертов + прогон на живых данных Worker'а): все PASS. На реальных данных рейтинг осадков сразу изменился: Харьков — AVG 28.6% промахов (лидер), AIFS рядом 30%, ICON худший 69.2%; Південне — **лидер ECMWF 20% промахов против 33.3% у AVG** (старая циклическая метрика показывала лидером AVG в обеих точках). Гипотеза «рейтинг осадков был артефактом метрики» подтверждена данными.
>
> Service worker: CACHE_VERSION → v1.51.0-honest-precip.
>
> ## v1.52.0 — Этап 2 «🎯 Smart-источник» (10 июня 2026)
>
> Второй этап плана «режим максимальной точности». Прямой ответ на исходный запрос юзера: «не усреднённая модель, а самая точная — по Tmax одна, по Tmin другая, по осадкам третья».
>
> **Дизайн-решение:** жёсткий выбор «лучшей модели per параметр» отвергнут (на 20–60 замерах разница топ-1/топ-2 внутри шума → лидер скачет, winner's curse). Вместо этого — per-variable ансамбль с заострением: `w_i = 1/(err_i + 0.5)²` отдельно для Tmax / Tmin / осадков (err осадков = precipScore v1.51.0). Когда одна модель реально стабильно лучше — она доминирует (фактически «самая точная»), когда модели неразличимы — честный ансамбль. Защиты: <3 замеров по параметру → медианный вес; <половины моделей с данными → uniform; глобальный shrink к uniform: `sharp = (minN−3)/(10−3)`.
>
> **Сайт (app.js):**
> - `computeSmartWeights(modelIds, metric)` — metric: 'tempMax' | 'tempMin' | 'precip' | null (композит для ветра/давления/прочего).
> - `weightedMedian(pairs)` — для мм-полей: 1 ливень-выброс из 8 моделей не размазывается в «морось везде» (известная болезнь ensemble-mean), pmmMax сохраняет сигнал выброса для UI.
> - `computeSmartForecast(forecasts, modelIds)` — MOS-lite: температура членов дебиазится ДО смешивания (`getEffectiveBiasForSource`, shrinkage n≥5 + cap ±3°; осадки не дебиазим — мм-bias не копится, prob-bias circular legacy). Часовые t — интерполированная смесь Tmin/Tmax-весов по позиции часа в суточном ходе (ratio из mean-серии, как в applyBiasCorrection). max/min дня — из почасовой ленты (консистентность с модалкой). Display-вызов `applyBiasCorrection(copy,'smart')` остаётся: no-op пока нет stats.smart, потом — остаточная коррекция продукта (двойного счёта нет).
> - `parseAllModels` → `result.smart` (try/catch, при ошибке fallback на avg в getForecast).
> - SOURCES + 'smart' (зелёный #4ade80 / light #16a34a), грид моделей фильтруется по `s.model`, `totalModels` тоже. UI: вторая main-кнопка `#smartSrcBtn` (зелёный вариант стилей `.main-source-btn.smart`), i18n `sources.smartTitle`/`sources.smartSub` ×16, имя «Smart» — language-neutral. `updateNotifSourceLabel` через `localizeSourceName`. `dumpSmart()` в DevTools.
>
> **Worker (bot/src/index.js):**
> - Зеркальные функции с пометкой «держать синхронно с app.js»: `smartStatsFromRecords` (MAE/bias/precipScore из KV-записей локации, только реальные модели), `smartEffBias`, `smartWeightsWorker`, `weightedMedianWorker`, `computeSmartDayWorker` (дневные поля: дебиаз+веса для T, медиана для мм, mean для prob).
> - `updateAccuracyForLocation`: `predictions.smart` пишется в каждую новую запись (веса из УЖЕ накопленных записей до добавления) → Smart копит замеры → через ~3 дня появляется строкой в таблице точности на сайте и честно соревнуется с AVG и моделями (server-truth, все устройства видят одинаково).
> - `sub.source='smart'` принимается в /api/rules-set; cron пока считает его как avg (невзвешенный mean) — честные веса в боте = этап 4. Footer пуша показывает «🎯 Smart» (`SOURCE_NAMES.smart` в i18n.js).
>
> **Проверка:** `scripts/test-smart.mjs` — 18 ассертов на реальном коде сайт+воркер (заострение, uniform-фоллбеки, shrink, per-variable независимость, медиана, дебиаз ровно −2°, синхронность формул воркера) + браузерный смоук через Launch-превью (кнопка, переключение, индикатор «Smart», 8 кнопок в гриде, computed-стили зелёного активного состояния). **Живые Smart-веса (21 gt):** Харьков — Tmax AIFS 20% / Tmin AIFS 27% / осадки AIFS 22%+MF 21%; Південне — Tmax GEM 24% / Tmin AIFS 27% / осадки ECMWF 28%. Три разных лидера по трём параметрам — ровно сценарий из запроса.
>
> Service worker: CACHE_VERSION → v1.52.0-smart-source.
>
> ## v1.53.0 — Этап 3 «🎲 Ансамблевая вероятность осадков» (10 июня 2026)
>
> Третий этап плана «режим максимальной точности»: вероятность дождя для Smart теперь из НАСТОЯЩЕГО ансамбля, а не из «вероятности» детерминированных моделей.
>
> **Источник:** Open-Meteo Ensemble API (ensemble-api.open-meteo.com, бесплатно, без ключа), модель ecmwf_ifs025 → 51 член: контрольный прогон `precipitation` + 50 возмущённых `precipitation_memberNN`, hourly на 7 суток, timezone=auto (локальные времена).
>
> **Сайт (app.js):**
> - `fetchEnsemblePrecip(lat, lon)` — 4-й параллельный запрос в `refreshForecast` (Promise.allSettled, таймаут 12с, любой сбой → null, Smart откатывается на веса моделей).
> - `quantileSorted(sorted, q)` — квантили с линейной интерполяцией.
> - `parseEnsembleHourly(data)` → `{ startDate, hours: [{pWet}], daily: [{date, pWet, p10, p50, p90, members}] }`. pWet часа = % членов с ≥0.1 мм/ч (ENSEMBLE_WET_HOUR_MM); pWet дня = % членов с суточной суммой ≥ WET_DAY_MM (0.5 мм — тот же порог, что в honest-precip метриках v1.51.0); P10/P50/P90 — квантили суточных сумм по членам. Защита: <10 member-полей → null.
> - `computeSmartForecast(forecasts, modelIds, ensemble)`: p часа ← pWet (gIdx = день×24 + час), precip% дня ← max почасовой доли за день (зеркало семантики precipitation_probability_max — НЕ pWet дня, чтобы не менять смысл поля), `precipBand` в объект дня. Мм-поля (pmm/precipSum) НЕ тронуты — медиана моделей. Выравнивание: ансамбль используется только если `ensemble.startDate === data.daily.time[0]` (фетчи у полуночи могут разъехаться на день).
> - Модалка дня: строка `.modal-ens-band` «🎲 Ансамбль ECMWF, 51 членов: дождь в N% сценариев · сумма P10–P90 мм» — ключ `modal.precipBand` ×16 языков, только для Smart (precipBand есть лишь в его днях), скрыта на сухих днях (pDay < 5 и p90 < 0.1).
> - **CSP:** + `https://ensemble-api.open-meteo.com` в connect-src. Без этого fetch молча блокировался (try/catch глотал) — поймано браузерным смоуком, не тестами. Урок: новый внешний домен = правка CSP в index.html.
> - AVG и одиночные модели не тронуты; кэш-формат byModel совместим (band просто отсутствует в старом кэше).
>
> **Worker:** не менялся (деплой не нужен). Бот-часть (precip_soon по доле членов) перенесена в этап 4 — обе правки живут в evaluateRule, делать вместе с per-variable весами бота.
>
> **Проверка:** `scripts/test-ensemble.mjs` — 23 ассерта на реальном коде (квантили, парсер: 6/12 членов → 50%, P50/P90 интерполяция, <10 членов → null; smart+ens: override p часа/дня, band прикреплён, без ансамбля поведение прежнее) + live-прогон. Браузерный смоук: 7 дней с band (51 член), модалка рендерит строку на Smart и НЕ рендерит на AVG. **Живой пример:** завтра Харьков — 82% сценариев с дождём (P10–P90: 0.3–3.6 мм), детерминированная вероятность 23% — ансамбль вскрыл недоуверенность.
>
> Service worker: CACHE_VERSION → v1.53.0-ensemble-precip.
>
> ## v1.54.0 — Этап 4 «Синхронизация бота» (10 июня 2026)
>
> Завершающий этап плана «режим максимальной точности»: push-уведомления совпадают со Smart-экраном сайта. Сайт не менялся — только Worker.
>
> **(1) Smart-агрегация в push'ах** (`bot/src/index.js`):
> - `fetchWeather(lat, lon, sub, env)` — новый параметр env; для `source='smart'` грузится `getSmartConfig(env, lat, lon)`: из KV-записей локации строятся per-variable веса (формулы = `smartWeightsWorker` v1.52.0) и эффективные дебиазы членов (`smartEffBias`, shrinkage+cap).
> - `averageHourlyMultiModel(hourly, models, smartCfg)`: температура/ощущается — взвешенный mean (tempW) с вычетом biasMid члена (midpoint biasMax/biasMin — упрощение против почасовой интерполяции сайта, при |bias| ≤ 1° расхождение пренебрежимо); precipitation — взвешенная МЕДИАНА (precW); probability — взвешенный mean (precW). Прочие поля — как avg.
> - `averageDailyMultiModel(...)`: tMax/tMin — точные дебиазы biasMax/biasMin + веса maxW/minW; precipitation_sum — медиана (для avg остаётся консервативный max).
> - `avg`-путь без smartCfg идентичен старому коду — регрессия закрыта тестом.
>
> **(2) Ансамблевая вероятность в precip-правилах:**
> - `getEnsembleProbMap(lat, lon)` — карта «время → % из 51 сценария ECMWF ENS с осадками ≥0.1 мм/ч» (forecast_days=3, timezone=auto; матчинг с fc.hourly.time по точной строке — без индексной математики и TZ-сдвигов).
> - `runCronCheck` прикрепляет `fc.ensP` для avg/smart-подписок, у которых есть rain_soon/precip_soon с windowHours > 2 (minutely-15 ветка ≤ 2ч не тронута).
> - `evaluateRule`: в hourly-ветках обоих правил prob ← ensP[времени]. КЛЮЧЕВАЯ семантика: ensP — РЕАЛЬНАЯ вероятность, поэтому ensP=0 ветирует старый proxy «prob=0, mm≥порога → считаем 100%». Раньше фантомный mm-выброс в mean мог дать ложное «скоро дождь»; теперь нужно, чтобы ≥ minProb% сценариев действительно видели дождь.
> - Кэши per-grid на время жизни isolate (TTL 25 мин < cron-интервала 30 мин): N подписок одной точки не дёргают KV и ансамбль повторно. Все сбои graceful: smartCfg=null → mean, ensP=null → прежняя логика.
>
> **Проверка:** `scripts/test-bot-smart.mjs` — 17 ассертов на реальном коде бота: smart-агрегация (дебиаз ровно −2°, медиана «1 ливень из 8 → 0», заострённый вес тянет медиану к точной модели, daily-медиана vs max), регрессия avg-пути, evaluateRule (proxy-fire без ensP сохранён; ensP=0 → молчим; ensP=80 → fired с prob из ансамбля; ensP=30 < порога 40 → молчим; temp_below не задет). Попутный урок в тесте: `new Date('YYYY-MM-DDTHH:00')` в node парсится в ЛОКАЛЬНОЙ зоне машины (в Worker — UTC) — синтетические времена для evaluateRule надо строить в зоне среды исполнения.
>
> **Отложено (пункт 5 плана):** lead-корзины D1–2/D3–5 — требуют смены структуры записей (несколько lead на дату ломает date-ключёвый merge сайта, × N раздувает KV), а на ~25 записях per-bucket статистика — шум. Вернуться при ≥120 записях.
>
> ## v1.55.0 — Строка-сводка дня в карточке «Сейчас» (12 июня 2026)
>
> По запросу Стаса: в hero-карточке «Сейчас», сразу под feels-строкой («Ощущается как 30°C · Закат в 20:44»), и в модалке дня «СЕГОДНЯ» добавлена строка-сводка вида **«дождь до 19:00 · 0.3–3.2 мм · ночью до +18°»**. Окно — от текущего часа вперёд (остаток дня по осадкам + ближайшая ночь по T).
>
> - `buildTodayOutlook(fc)` (app.js) — 3 сегмента через ` · `:
>   - **Тайминг осадков:** идёт дождь (pmm текущего часа ≥ 0.1) → «{осадки} до HH:00» (первый сухой час); сухо сейчас → «до HH:00 сухо» (первый мокрый час); сухо весь остаток → «осадков не ожидается». Слово дождь/снег/осадки — по средней T мокрых часов (≤0 снег, ≤2 осадки, иначе дождь).
>   - **Сумма мм:** межквартильный диапазон **P25–P75** по 8 моделям за остаток дня (`remainingPrecipRange()` + `quantileSorted`). Сознательно НЕ min–max: один конвективный выброс давал бы пугающее «0.1–7.6 мм» (поймано на живых данных). <3 моделей → одиночное «~X мм».
>   - **Ночь:** минимум T ближайшей ночи — `nightMinTemp(fc)`: если сейчас предрассветная ночь (NOW < восход) → до сегодняшнего восхода; иначе вечер сегодня (от заката) + утро завтра до восхода.
> - Рендерится в `renderHeroAndMetrics()` (`#heroOutlook`) → следует за выбранным источником (AVG/Smart/модель). В модалке — только для дня id 0 (строка смотрит вперёд). Пустая строка → элемент скрыт (`:empty`).
> - Локализация ×16: 10 ключей `outlook.*`. CSS `.hero-outlook` (под feels, скрывается в sticky-режиме hero) + `.modal-outlook`.
> - Service worker: CACHE_VERSION → v1.55.0-today-outlook.
>
> ## v1.55.1 — i18n-фикс: hero-плашка точности + добивка hardcoded-строк (12 июня 2026)
>
> Фидбек Стаса: плашка точности на hero («🏆 ECMWF AIFS обходит среднее») была захардкожена по-русски и показывалась так на всех 16 языках. Аудит кода (греп backtick-шаблонов и присваиваний с кириллицей) нашёл ещё несколько пропусков. Все вынесены в `t()`-ключи и переведены ×16:
>
> - **`renderHeroAccuracyHint`** — 8 фраз → `accuracy.hint.*` (avgBest, modelBeatsAvg, avgUsuallyBetter, leaderNow, youLeadAll, avgBetter, avgBetterBy, leadModels, modelBetterRank).
> - **`_langPickerTitle`** — был `switch(state.lang)` на 9 кейсов, **ro/hu/sk/pt/nl/tr/el падали в русский default** → `t('settings.langPickerTitle')`.
> - **`shortMetricUnit`** — «мм»/«гПа» в табе давления → `unit.mmhg.short`/`unit.hpa.short` (не-ru/uk → mm/hPa).
> - **Пыльца** «ч/м³» → `pollen.unit` (не-ru/uk → gr/m³).
> - **Тултип грозы** «+Nч» → `storm.hoursAhead`.
> - **Метки аккаунтов** «Группа/Чат {id}» (fallback) → `account.group`/`account.chat`.
> - Озвучка (`spokenTemp`) проверена — там уже намеренные ветки на все 16 языков, не баг. DevTools-дампы оставлены русскими (отладка, не UI).
> - Проверено в браузере (ru/en/el): плашка, заголовок picker'а и юнит пыльцы переводятся. Service worker → v1.55.1-i18n-accuracy-hint. **Урок:** функции, добавленные ДО расширения списка языков, копят hardcoded/частичные switch — периодически аудитить (см. HANDOFF, раздел про i18n).
>
> ## v1.55.2 — Подсветка активного источника в панели при загрузке (12 июня 2026)
>
> Фидбек Стаса: в hero показывался выбранный источник («по данным Smart»), но в панели «Источник прогноза» подсвечивалось «Среднее».
>
> - **Причина:** `renderSourceButtons()` (зовётся из `applyAll()` при загрузке/смене языка) синхронизировал `active` только для кнопок моделей в гриде. Состояние главных кнопок `#mainSrcBtn`/`#smartSrcBtn` выставлялось лишь в `selectSource()` по клику, а у `#mainSrcBtn` класс `active` зашит в HTML по умолчанию → сохранённый Smart (или одиночная модель — двойной хайлайт) на старте показывал активным AVG.
> - **Фикс:** `renderSourceButtons()` теперь тоже синхронизирует main/smart-кнопки с `currentSourceId`. Клик-путь не тронут. Проверено: загрузка с source=smart/ecmwf/avg → ровно одна верная подсветка. Service worker → v1.55.2-source-picker-active.
>
> ## v1.56.0 — Точечный UI-апгрейд V1 (12 июня 2026)
>
> Три точечные UI-фичи внутри существующего дизайна V1 по ТЗ `PLAN_UI_UPGRADE.md` (перенос двух понравившихся фишек из отклонённого V2 + производная). **НЕ редизайн.** Делалось в одной ветке `feature/day-rows`, мерж в main — после всех 3 этапов (указание Стаса); после каждого этапа — стоп-показ и одобрение.
>
> **Этап 1 — дни вертикальным списком строк** (`renderDays`): горизонтальная лента 10 дней → вертикальный список `.day`/`.dr-*`. Каждая строка: день+дата · иконка · min° · температурная полоса · max° · осадки %+мм · ›. Полоса позиционируется на ОБЩЕЙ шкале min/max всех дней (как Apple Weather, `dayTempColor` — градиент по T). «Сегодня» — неоновая строка (`.day.today`, терракот в light) с маркером текущей t°. Полоска согласия моделей `.dr-conf` слева (только AVG). Клик → прежняя `openModal`. Стрелки/scroll-механика ленты убраны. Reuse `unit.mm` из I18N_EXTRA.
>
> **Этап 2 — почасовка в модалке дня вертикальным списком** (`renderModalHourlyRow`): горизонтальная лента часов → вертикальные строки-часы `.mh-*`. Строка: время · иконка · t° · мини-полоса позиции t° в диапазоне дня · осадки %+мм (интенсивность синей заливкой) · ветер. «Сегодня»: прошедшие часы приглушены, текущий — неон. Убраны 5 табов метрик + стрелки/swipe (attachModalHourlyArrows/setupModalHourlyTabs/currentModalMetric удалены; общий `.hour-cell` главной ленты НЕ тронут). Сохранена Smart-строка ансамбля.
>
> **Этап 3 — плавающий нижний док-навигация** (`setupBottomDock`, `#bottomDock`): стеклянная капсула fixed внизу, 4 пункта-якоря (Сейчас/Часы/Дни/Ещё), i18n `dock.*` ×16. Активный пункт — неон, scrollspy (rAF-throttled линия активации; «Ещё» держится для всего нижнего контента). Клик — `window.scrollTo` (не scrollIntoView: у body overflow-y:auto) с офсетом + двухпроходная коррекция под схлопывание sticky-шапки; `prefers-reduced-motion` → мгновенно; `html{overflow-anchor:none}` против отскока. **Над контентными модалками (день/ветер/осадки/давление/влажность) док закреплён поверх** (z-1300, `body.dock-modal-pinned`, контенту нижний отступ), клик закрывает модалку и ведёт к разделу; над утилитарными — скрыт. Стекло: **прозрачное без заливки**, лёгкий `blur 4px` через `@supports` (где backdrop-filter не композитится — видимый fallback-контур). Высота ~49px.
>
> **Попутный фикс:** при открытии модалки «Детали осадков» стрелки прокрутки графика не появлялись до первого скролла — `renderPrecipChart` теперь зовёт `updateScrollArrows(precipScroll)` сразу после установки ширины графика (rAF×2).
>
> **Уроки:** (1) `backdrop-filter` (матовое стекло) требует GPU-композитинга — в headless-превью Claude НЕ рендерится (даже у `.glass`/модалок приложения), проверять стекло только на реальном браузере/телефоне; в превью `scrollY`-чтения рассинхронятся с рендером — доверять скриншотам. (2) Chart.js с CDN в превью не грузится → график осадков там не рисуется. (3) `position:fixed` + backdrop-filter: реальный скроллер — documentElement (у body overflow-y:auto), для клик-скролла надёжнее `window.scrollTo`, чем `scrollIntoView`. SW → v1.56.0-ui-upgrade.
>
> ### 🔗 Все ссылки и доступы
>
> | Что | URL / адрес |
> |---|---|
> | 🌐 Основной сайт (live) | https://meteo-star.github.io/kharkiv-weather/ |
> | 🔐 Веб-админка бота | https://meteo-star.github.io/kharkiv-weather/admin.html |
> | 🤖 Telegram-бот | [@MeteoStarBot](https://t.me/MeteoStarBot) |
> | ☁ Cloudflare Worker (бэкенд бота) | https://meteo-star-bot.stanislav-perec.workers.dev |
> | 🩺 Worker health-check | https://meteo-star-bot.stanislav-perec.workers.dev/health |
> | 📦 GitHub (исходники) | https://github.com/meteo-star/kharkiv-weather |
> | 🏷 Релизы (теги) | https://github.com/meteo-star/kharkiv-weather/releases |
> | ☁ Cloudflare Dashboard | https://dash.cloudflare.com/d9f70cbb1ffaec068c5c15d96a450132 |
> | 🤖 BotFather (управление ботом) | [@BotFather](https://t.me/BotFather) |
>
> **Cloudflare account ID:** `d9f70cbb1ffaec068c5c15d96a450132`
> **Admin Telegram user_id:** `151252296` (Stas)
> **KV namespace IDs:**
> - SUBSCRIPTIONS = `74dcbaeeff3c48a0a24d1b38506b8c0e`
> - PAIRING = `e1e5057893a14f64bb8c2b406f6e38ba`
> - STATS = `32f4dd2c3a4a4d488fbfc92538035c30`
>
> **Cloudflare Secrets** (загружены через `wrangler secret put`, в репо НЕТ):
> - `TELEGRAM_BOT_TOKEN` — токен от @BotFather
> - `TELEGRAM_WEBHOOK_SECRET` — 64-hex для верификации webhook'ов
> - `ADMIN_TOKEN` — пароль для веб-админки (сменён со случайного hex на удобный пароль)

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

### Фаза М: Модуляризация (v1.16 → v1.17)

✅ **Статус: закрыта.** Разнесение `index.html` (8515 строк → 684) на 3 файла + UI-улучшения.

| Шаг | Tag | Что |
|---|---|---|
| М1 | `v1.16-modular` | **Разнесение на модули:** CSS вынесен в `style.css` (1158 строк), JS — в `app.js` (6671 строка). index.html стал ~700 строк (HTML-структура + ссылки на ресурсы). SW: `style.css` и `app.js` добавлены в SHELL_ASSETS + переведены на network-first для мгновенных обновлений. Размер первого запроса HTML: 494 КБ → 46 КБ. |
| М2 | `v1.17.0` | **Sun arc real-time:** дуга солнца стала растягиваться на всю ширину карточки (viewBox 200×100 → 400×100), солнце уменьшено в 2 раза, авто-обновление позиции каждую минуту. Исправлен баг: было захардкожено `'23:10'` вместо текущего времени. **Source Data Modal:** карточки «Источник прогноза» и «Точность источников» убраны из основного потока и переехали в новую модалку, открываемую кликом по индикатору источника в шапке. **Precip chart:** добавлены полные имена дней, чередующиеся подложки по дням (cyan/purple/teal), подсветка меток часов в цвет своего дня, граница суток над «00». **alignBars()** выравнивает нижние полоски эмодзи/дней под реальную геометрию chartArea. **Pollen/Climate fix:** в success-ветке refreshForecast не вызывались render-функции — карточки появлялись только после перезагрузки (когда срабатывал кэш-путь). Добавлены недостающие вызовы. **Hourly card NOW-центрирование** при первом рендере. |

### Фаза Н: Performance + Compare Mode + Alerts (v1.18 → v1.19)

✅ **Статус: закрыта.**

| Шаг | Tag | Что |
|---|---|---|
| Н1 | `v1.18.0` | **Performance pack:** (1) **Page Visibility API** — registerManagedInterval() приостанавливает все таймеры (clock 30с, sun arc 60с, dateLine 60с) когда вкладка/PWA скрыта (экономия батареи). (2) **Lazy-load Chart.js** — библиотека (~200КБ) инжектится только при первом открытии модалок с графиками (Precip Detail / Hourly Detail / Compare). (3) **Skeleton-screen** при холодном старте — body.app-bootstrap с shimmer-плейсхолдерами вместо мерцания BASELINE-данных. (4) **localStorage cleanup** — sweep устаревших версий кэша (forecast-cache:vN, climate-cache:vN с N < current). (5) **Yielding-based parsing** — parseAllModels стал async, между моделями `await setTimeout(0)` чтобы main thread не фризил при обработке JSON. **Алерты экстремальной температуры:** баннер при прогнозе ≥+32°C (Heat) или ≤-15°C (Cold) на 48ч с рекомендациями. 4 уровня (severe/extreme для каждой стороны). **Легенда «согласие моделей»** под кнопкой AVG в Source Modal. |
| Н2 | `v1.19.0` | **Compare Mode (полный режим сравнения двух городов):** чип ⚖ в шапке открывает модалку выбора 2-го города (favorites + worldwide search). body.compare-mode скрывает большую часть основного потока. Внутри: dual hero (cyan для A, фиолет для B), 4 метрики side-by-side с подсветкой лучшего значения, авто-summary «🏆 где лучше» по температуре или осадкам, двухлинейный график почасовой температуры (lazy Chart.js), параллельные ленты прогноза на 10 дней с горизонтальным скроллом и snap-точками, кнопки ↻ swap на каждой hero-карточке (смена A через cityModal, смена B через comparePicker — без выхода из режима). Состояние персистится в `kw:compare:v1`. **Inverse search фиксы:** (а) социальные часы для активностей — шашлык 9-23 (не в 3 ночи), пробежка 5-22, прогулка 7-23 и т.д.; (б) noRainStrict — три слоя проверки «нет дождя» (pmm + probability + condition) вместо одного pmm — раньше выдавал ложные «сухо»-окна где иконка была дождевой; (в) формат окон «22:00 – 23:00» вместо «22:00 – 22:00» для 1-часового окна; (г) возврат в search modal после закрытия day/hourly с body.modal-bridge для плавности перехода. |
| Н2.x | `v1.19.1 → v1.19.3` | **Мобильные доводки Compare Mode:** sync-скролл compare-days через единый scroll-container со sticky-лейблами городов (раньше JS-синхрон между двумя scroll-area давал рывки). Компактная шапка на ≤640px (header → column flex-direction), source-indicator превратился в пилюлю «● Источник» (одно слово вместо «Среднее по 7 моделям» которое не помещалось в ряд с чипами). |

### Фаза О: PWA force-update + Sticky Hero (v1.20)

✅ **Статус: закрыта.**

| Шаг | Tag | Что |
|---|---|---|
| О1 | `v1.20.0` | **Pull-to-refresh:** свайп вниз с верха главного экрана показывает индикатор «Потяни вниз для обновления». За порогом (~170px свайпа): «Отпусти для обновления». На релизе: caches.delete() всех кэшей + registration.update() + skipWaiting + controllerchange listener auto-reload'ит. Решает проблему iOS PWA где старая версия живёт до полного перезапуска через task switcher. Жест не срабатывает внутри горизонтальных скроллов (compare-days, hourly, precip) и поверх модалок. Rubber-band с ×0.55 ratio для natural iOS feel. **Sticky hero:** карточка «Сейчас» становится position:sticky;top:env(safe-area-inset-top). При скролле плавно (0.42s cubic-bezier) сжимается в компактную (padding 28→14px, min-height 220→0, фото-фон затемняется до 38%, скрываются "СЕЙЧАС"/feels/source-note, шрифт темпы 46→38px). Backdrop-filter:blur 24→36px — усиленный glass-эффект. Карточка сохраняет border-radius и ширину контейнера, выглядит как floating glass над скроллящимся контентом без какой-либо подложки. Детекция через rAF-throttled scroll + getBoundingClientRect. В compare-mode sticky-логика автоматически выключается. |
| О1.x | `v1.20.1 → v1.20.4` | **Доводки sticky hero:** 4 итерации пробовали разные варианты «как закрыть просвечивающий фон за скруглёнными уголками». Финал — **БЕЗ overlay**: карточка floating, контент скроллится естественно вверх и проходит под неё, glass-blur делает это плавным. Усиленный backdrop-filter (36px blur, 190% saturate) + чуть прозрачнее фото-фон (0.38) + тонкий hairline rgba(255,255,255,0.07). Угловые артефакты приемлемые на фоне общего «floating glass» вида. |

### Фаза П: Glass scrollbar + Светлая тема + 8 hero-фото (v1.20.5 → v1.21.3)

✅ **Статус: закрыта.**

| Шаг | Tag | Что |
|---|---|---|
| П1 | `v1.20.5` | **Glass-стиль главного скроллбара.** Дефолтный системный скроллбар на iOS PWA выбивался из Liquid Glass. В обоих темах главный скролл `html`/`body` получил тонкий полупрозрачный thumb с бирюзово-фиолетовым градиентом, белым highlight сверху и тёмной нижней тенью — выглядит как кусочек glass. Mobile: уменьшено до 5px и упрощено. |
| П2 | `v1.21.0` | **Базовая инфраструктура темы:** CSS-переменные `--theme-*` на `:root` (default dark) + `:root[data-theme="light"]`. `state.theme = 'dark' \| 'light' \| 'system'` сохраняется в `kw:settings:v1.theme`. Функции `resolveTheme(value)`, `applyTheme()`, `setTheme(value)`. Слушатель `matchMedia('(prefers-color-scheme: dark)')` навешивается только в режиме system. Динамический `<meta name="theme-color">` и `apple-mobile-web-app-status-bar-style` обновляются при смене темы. UI: секция «Тема оформления» в Settings модалке — segmented `🌙 Тёмная / ☀️ Светлая / 🖥 Системная`, переводы на 3 языка. Эмодзи как seg-main для визуальной идентификации. |
| П2.1 | `v1.21.0` | **Светлая палитра (тёплый персик/слоновая кость + терракотовые акценты):** body bg — radial-gradient `#fcc99a` deep peach (после ряда итераций — то слишком светлый, то слишком тёмный); карточки `.glass` — `rgba(255,250,237,0.92)` кремовое стекло с 1.5px coral border `rgba(192,83,42,0.45)` и terracotta-тенью `rgba(192,83,42,0.18)` (двухслойной для глубины); внутренние плитки (`hour-cell`, `.day`, `cd-cell`, `aw-cell`, `pollen-cell`, `climate-metric`, `mini-m`, `modal-astro-cell`, `acc-row` и т.д.) — solid `#fffaf0` с 1.5px coral border. Текст — `#2d1a10` (тёплый dark-brown). Source-цвета через карту `SOURCE_COLORS_LIGHT` подменяются на тёмные глубокие варианты (cyan → terracotta, blue → deep-blue, и т.д.) — `applySourceTheme()` использует `effectiveSourceColor()`. UV/AQI status pills — inline-стиль перекрыт через `!important`, текст всегда тёмный по соответствующему уровню (amber/green/etc.). Pollen-cell.pl-* — насыщенные level-фоны (зелёный/жёлтый/оранжевый/красный) с границами в тон. Унифицированная подсветка `.day.today` ≡ `.hour-cell.now` — мягкий peach gradient `#ffd9b8 → #ffbf90` + 2px coral border + glow. Hero-overlay тёплый peach вместо тёмно-синего. |
| П2.2 | `v1.21.1 → v1.21.2` | **Доводки тем-логики:** (1) Скроллбар не применялся в light-теме — баг в селекторе: `:root[data-theme="light"] html` означает «html внутри root, который сам html» — match невозможен. Заменено на `:root[data-theme="light"]::-webkit-scrollbar`. (2) Гроза-heatmap в light-теме всегда показывал нейтральный beige — мои overrides таргетили `.storm-h.risk-N`, а JS добавляет `.r1`/`.r2`/`.r3`/`.r4`. Глобальная замена `storm-h.risk-` → `storm-h.r`. Дополнительно: гроза получила solid яркие цвета (без gradient — он начинался с белого и сливался с фоном). Legend `.sl-sw.r1-r4` восстановлены через высокоспецифичный `:root[data-theme="light"] .storm-legend .sl-sw.rN` (ранние late-overrides перекрывали с одинаковой специфичностью). |
| П2.3 | `v1.21.2` | **Гроза-индикатор переработан полностью:** heatmap высота 38→46px, ячейки 4px border-radius, inset 1.5px dark border для чёткости в обеих темах, наружный glow по уровню риска. Легенда — grid `auto-fit minmax(110px)`: каждый уровень = карточка swatch+название+описание. Описания на 3 языках добавлены: `storm.desc1-4` («возможны отдалённые грозы, без осадков» / «локальные грозы с дождём» / «ливни с грозами, шквалы» / «сильные грозы, риск града и шквалов»). |
| П2.4 | `v1.21.2` | **HDM модалки (Ветер/Давление/Осадки/Влажность) — заголовок:** `.hdm-top` имел `rgba(8,13,38,0.85)` navy background из dark-темы. В light текст становился тёмным через `.hdm-sheet *`, но фон шапки оставался navy → чёрный на тёмном. Override: peach gradient в шапке, coral border снизу, тёмный текст. Аналогично для `.pdm-top`. **Метрика модалки**: HDM chart text fill через CSS `fill:#2d1a10 !important` (CSS перебивает inline `fill="#e8f0ff"` презентационный атрибут). **Mobile hero scroll flicker fix:** на ПК hero иногда мерцал/зависал при стике/анстике из-за feedback loop (rect.top менялся пока transition анимировал размер). Перешли с `getBoundingClientRect().top` на `window.scrollY` + кэшированный `offsetTop` + гистерезис 18px — стик и unstuck на разных порогах. |
| П3 | `v1.21.3` | **8 светлых hero-фото:** загружены с Unsplash (CC0) для каждой комбинации `{dawn,day,dusk,night}-{clear,cloudy}`, конвертированы в WebP 1600×600 q=82, ~170 KB всего. Положены в `assets/scenes/light/`. `renderHeroScene()` выбирает путь по теме: `assets/scenes/light/{tod}-{grp}.webp` в light, `assets/scenes/{tod}-{grp}.webp` в dark. `setTheme()` перерисовывает hero при смене темы. CSS: текст hero theme-aware (`dawn`/`day` → **тёмный** `#2d1a10` с белым гало для контраста на светлых фото; `dusk`/`night` → **белый** с тёмной тенью). Overlay соответствующий: `rgba(255,250,237,0.55)` cream для светлых, `rgba(80,30,15,0.55)` deep brown для тёмных. Sticky-stuck состояние получает усиленный overlay для читаемости компактного текста. **Сужены окна `computeTimeOfDay()`:** dawn `-40/+50`, day `+50/-50`, dusk `-50/+25` (раньше `+60`), night сверх. Это убрало проблему «уже после заката, но всё ещё dusk-фото» — теперь через 25 мин после заката автоматически night. |

#### Уроки фазы П

1. **CSS-специфичность и source order — главный источник багов в темах.** Десятки правил `:root[data-theme="light"] .X` с равной специфичностью к существующим dark-правилам — побеждает source order. Late-overrides могут случайно перекрыть сами себя. Решение: всегда добавлять `!important` к финальным правилам и тщательно проверять, что специфичность override строго выше базы.
2. **`:root` ЭТО `html` элемент.** Селектор `:root[data-theme=...] html` означает «html внутри html» = ничего. Должно быть `:root[data-theme=...]::pseudo` или `html[data-theme=...]::pseudo`.
3. **Class names в JS могут не совпадать с CSS селекторами.** В коде `storm-h.r1`/`.r2`, а я писал `.risk-1`/`.risk-2`. Регулярно grep'ать имена классов из render-функций перед написанием CSS-правил.
4. **Inline `style="..."` побеждает внешний CSS без `!important`.** UV/AQI status pills в HTML имели hardcoded `color:#facc15` — пришлось override через `!important`. CSS `fill` всё же перебивает презентационный атрибут SVG `fill="..."` без `!important` (специфичный edge case).
5. **Feedback loop при position:sticky + transition.** Использование `getBoundingClientRect().top` для определения «залип ли элемент» приводит к колебанию: stuck → размер меняется → top меняется → unstuck → ... Решение — измерять оригинальный `offsetTop` до stuck-состояния и сравнивать с `scrollY` + гистерезис.
6. **Окна time-of-day должны соответствовать civil twilight (~25 мин)**, а не астрономическим градусам. Раньше dusk тянулся +60 мин после заката (включал nautical twilight), что визуально уже выглядело как ночь.

---

### Фаза Б: Telegram-бот на Cloudflare Worker (v1.22.0 → v1.23.0)

✅ **Статус: закрыта полностью** (все 5 подфаз Б1–Б5).

Архитектура — отдельный проект `bot/` в репо, деплоится в Cloudflare Workers (free tier):

```
Telegram ──webhook──▶ Cloudflare Worker (src/index.js)
                       │
                       ├─ KV: SUBSCRIPTIONS  (sub:<chat_id> → подписка)
                       ├─ KV: PAIRING        (pair:<code> → chatId, TTL 10 мин)
                       ├─ KV: STATS          (stats:<YYYY-MM-DD> → счётчики, TTL 90 дней)
                       ├─ Secrets: TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET, ADMIN_TOKEN
                       └─ Cron: */30 * * * * → runCronCheck()

Сайт meteo-star.github.io ──CORS──▶ Worker /api/* endpoints
                                     - /api/pair-create
                                     - /api/pair-poll
                                     - /api/rules-get
                                     - /api/rules-set
                                     - /api/unpair
                                     - /api/admin/* (защищены X-Admin-Token)
```

| Шаг | Tag | Что |
|---|---|---|
| Б1 | `v1.22.0` | **MVP бот.** Скелет в `bot/`: wrangler.toml (account_id, KV bindings, cron), package.json (wrangler dev), src/index.js (~400 строк MVP). 5 user-команд: `/start`, `/help`, `/status`, `/location <город>`, `/stop`. 6 admin-команд: `/admin_stats`, `/admin_list`, `/admin_broadcast`, `/admin_ban`/`unban`, `/admin_test`. Webhook верификация через `X-Telegram-Bot-Api-Secret-Token`. Подписка хранится в KV как `{ chatId, userId, lat, lon, name, lang, rules, lastFired, banned, pairToken, chatType, chatTitle }`. Геокодинг города через Open-Meteo. Все сообщения через `parse_mode: 'HTML'` (Markdown V1 ломался на `_` в `/admin_*` командах). |
| Б2 | `v1.22.0` | **Cron-логика + 6 типов правил.** `runCronCheck()` каждые 30 мин: list всех `sub:*` ключей в KV, для каждой подписки 1 запрос к Open-Meteo (hourly + daily, 5 дней, `cape`, `lifted_index` для гроз), `evaluateRule()` для каждого правила, проверка cooldown'а из `sub.lastFired[ruleKey]`, отправка через `sendMessage()` если matched. Pause 40мс между сообщениями (Telegram лимит ~30 msg/sec). Типы правил: **temp_below** (12h cooldown), **temp_above** (12h), **rain_soon** (6h, условия: pmm≥0.3 + probability≥60%), **storm_alert** (12h, WMO 95/96/99 ИЛИ CAPE>1500+LI<-2 в 6ч), **dry_streak** (24h, осадки <0.5мм/сутки подряд N дней), **morning_summary** (раз в сутки в окне ±15 мин от заданного времени). Дополнительные admin-команды: `/admin_cron` (ручной запуск), `/admin_addrule`, `/admin_clearrules`, `/admin_cooldowns` (показывает когда сработает каждое правило). |
| Б3 | `v1.22.0` | **HTTP API + UI на сайте.** Pairing flow: сайт генерит 6-значный код → POST `/api/pair-create` → юзер пишет `/pair 123456` в боте → Worker генерит 32-hex `pairToken` и обновляет KV PAIRING → сайт polling'ит `/api/pair-poll` каждую секунду первые 30 сек, потом 3 сек (ускорено от изначальных 3 сек после фидбэка) → получает `chatId+pairToken+chatTitle` → сохраняет в `localStorage 'kw:telegram:v1'`. Дальше POST `/api/rules-get` и `/api/rules-set` с auth `{ chatId, pairToken }`. На сайте новая секция «🔔 Уведомления» в Settings с 3 pane'ами (Unlinked / Code / Linked), редактор 6 правил с iOS-style toggle и инпутами параметров, кнопка «Отвязать» (POST `/api/unpair`). Стили — отдельный блок в style.css с light-темой через `:root[data-theme="light"]` overrides. CORS whitelist: `meteo-star.github.io`, `localhost:8000`, `localhost:8765`. CSP в index.html обновлён с добавлением `https://meteo-star-bot.stanislav-perec.workers.dev` в `connect-src`. |
| Б4 | `v1.22.0` → `v1.23.0` | **Веб-админка.** Новые admin endpoints в Worker (`/api/admin/login`, `/list`, `/stats?days=7`, `/broadcast`, `/ban`, `/unban`, `/test`, `/cron`, `/delete-sub`) — все требуют header `X-Admin-Token: <ADMIN_TOKEN>` (загружен через `wrangler secret put`). CORS preflight расширен `x-admin-token` в `Allow-Headers`. Отдельная страница `admin.html` + `admin.js` (без зависимостей) на сайте, не в навигации, помечена `<meta robots="noindex">`. UI: login pane с маскированным input (`-webkit-text-security:disc`), `sessionStorage 'kw:admin-token:v1'` (очищается при закрытии вкладки), 4 stat cards (total/sent/cron/errors), 7-day stats таблица, subscriptions table с badges (BAN / сайт / group), per-row actions (тест/бан/удалить), broadcast form с подтверждением, manual cron trigger. UI dark-only (не наследует тему сайта). |
| Б5 | `v1.23.0` | **Групповые чаты.** Обработка `new_chat_members` event: когда бота добавляют в группу, `getBotInfo()` (cached) определяет себя в массиве и шлёт приветствие с инструкцией про `/setup`. Новая команда `/setup` — доступна только админу/creator группы (проверка через `getChatMember` API), выдаёт инструкцию связки с сайтом. `/pair` в группе дополнительно проверяет admin-права. Подписка хранит `chatType` ('private' / 'group' / 'supergroup'), `chatTitle`, `initiator` для groups. Ленивая миграция `chatTitle` при любом сообщении в группе. Изменения в UI сайта: `refreshNotifPane()` для группового чата показывает `👥 <chatTitle>` вместо username. В admin.js: для группы показывается `👥 <chatTitle>` (или fallback на `👥 Группа <id>` если миграция ещё не сработала). |
| Б6 | `v1.23.1` | **Admin-пароль + magic-link для cross-device.** (1) Веб-админка раньше требовала случайный 64-hex `ADMIN_TOKEN`. Заменили на удобный пароль — `npx wrangler secret put ADMIN_TOKEN` принимает любую строку. Добавили brute-force защиту: 5 неверных попыток `/api/admin/login` с одного IP → блок на 10 минут (счётчик в KV STATS как `admin_fails:<IP>` с TTL 1ч). UI admin.html — input type=password с маской, friendly error «попробуй позже» при rate_limited. (2) Cross-device login: новая команда `/login` в боте — генерирует одноразовый 32-hex auth-токен (PAIRING KV с TTL 10 мин), возвращает кликабельную ссылку `https://meteo-star.github.io/kharkiv-weather/?auth=<token>`. На сайте при загрузке detects `?auth=` URL-param, POSTит `/api/auth-claim`, обменивает на postоянный `pairToken`, сохраняет в localStorage, чистит URL через history.replaceState. iPhone теперь получает доступ к своему чату или группе одним тапом из бота. |
| Б7 | `v1.23.2` | **Multiple Telegram-аккаунты на одном устройстве.** Раньше localStorage хранил одну связку — при добавлении новой (личный чат + группа) перезаписывал предыдущую. Новое: `kw:telegram-accounts:v1` (массив всех связок) + `kw:telegram-active:v1` (chatId активной). Авто-миграция при первом запуске из legacy `kw:telegram:v1`. Селектор аккаунтов в Settings — `<select>` с label «Активный аккаунт», появляется только когда связок 2+. Custom-style dropdown через background-image SVG arrow, фиолетовая палитра (отличается от cyan-actions), light-theme overrides. Кнопка «+ Добавить ещё один чат / группу» в конце linked-pane запускает обычный pairing-flow. При смене активного — `setActiveAccountId()` + sync legacy + `fetchAndRenderRules()` для нового. unlink удаляет только активный, переключается на оставшиеся. Хелперы: `loadAccounts / addOrUpdateAccount / removeAccount / getActiveAccount / setActiveAccountId / accountDisplayName`. |

#### Уроки фазы Б

1. **Telegram Markdown V1 vs HTML parse_mode.** В Markdown V1 underscore — это italic. `/admin_stats` ломал парсер из-за непарных `_`. Решение — `parse_mode: 'HTML'` и `<code>...</code>` для команд. HTML более предсказуемо, плюс позволяет `<a href>` для ссылок, не доступных в MD V1.
2. **Bot privacy mode в группах.** По умолчанию ВКЛ. Бот видит только команды адресованные ему (`/cmd@username`) или с явным mention. Чтобы видеть все сообщения — `@BotFather /mybots → Bot Settings → Group Privacy → Turn off`, потом обязательно ПЕРЕДОБАВИТЬ бота в группу — иначе настройка не применится.
3. **`from` ≠ `chat` в Telegram update.** В группе `msg.from` это user который написал, `msg.chat` это группа. Если сохранять только `from`, теряется название группы. Нужно хранить `msg.chat.title` отдельно (как `chatTitle`).
4. **CSP в meta-теге блокирует fetch.** Сайт жёстко whitelistит `connect-src` URL'ы. При добавлении нового бэкенда (Worker) обязательно добавить его в CSP — иначе fetch не пройдёт, ошибка `Refused to connect because it violates the document's Content Security Policy`.
5. **CORS preflight для custom headers.** Если запрос содержит non-standard header (`X-Admin-Token`), браузер делает preflight OPTIONS request. Сервер должен ответить `Access-Control-Allow-Headers: x-admin-token`. Иначе POST не пойдёт.
6. **`crypto.getRandomValues()` в Cloudflare Workers** доступен из коробки. Используется для генерации pairToken (16 байт → 32 hex символа), безопаснее `Math.random()`.
7. **KV cost модель.** Free tier: 100k reads / 1k writes / день. Cron `*/30` × N подписок = N×48 reads/день. На 1000 подписок — 48k reads, в пределах лимита. Writes — только при изменениях rules / lastFired. На запуске бота с 1-100 подписок запас огромный.
8. **`workers.dev` subdomain** регистрируется ОДИН РАЗ на аккаунт через wrangler login flow. После — все Workers получают URL `<worker-name>.<subdomain>.workers.dev`.
9. **Cron triggers UTC, не локальное время.** `*/30 * * * *` срабатывает на минутах :00 и :30 UTC. Для morning_summary правила с локальным `rule.hour:rule.minute` нужно вычесть `fc.utcOffsetSec / 60` при сравнении.
10. **Ленивая миграция данных в KV.** При смене структуры подписки (добавление поля `chatTitle`) старые записи остаются без поля. Вместо batch-миграции — апдейтим лениво при следующем доступе. Стоит +1 write per request, но логика проще и нет блокирующего шага.
11. **localStorage `as-source-of-truth` vs source-of-truth на сервере.** Сначала pairToken был привязан к устройству — на iPhone сайт «не помнил» что юзер уже залогинен. Решение через magic-link (`/login` в боте) — Telegram-идентичность как источник истины, токен переносится через одноразовую ссылку. UX: пишешь `/login` на любом устройстве → клик по ссылке → залогинен. Никаких email-регистраций, паролей, синхронизаций аккаунтов.
12. **Telegram chat.id как идентификатор аккаунта** работает естественно для multi-account UI: личный чат имеет положительный id, группа — отрицательный, переключение между ними тривиально. Не нужны искусственные user_id / profile_id.
13. **Brute-force защита без отдельного rate-limit сервиса.** Cloudflare Free tier не даёт встроенного rate limit, но KV-based counter с TTL — рабочее решение для редких операций (login). Ключ `admin_fails:<IP>` хранит `{ count, blockUntil }`, TTL 1ч сам чистит старые записи.
14. **iOS in-app browser sandbox.** Когда юзер кликает magic-link в Telegram на iPhone, она открывается в Telegram's in-app browser. localStorage там shared с Safari (в новых iOS) — поэтому ссылка работает. Но если юзер закроет in-app browser до сохранения — линк уже использован (single-use). Стоит в идеале на сайте после auth открывать `target=_blank` для перехода в нативный Safari, но это сложнее.

---

### v1.23.3 — фикс hero «погода сейчас»

| Tag | Что |
|---|---|
| `v1.23.3` | **Hero показывает погоду текущего часа, не дневного агрегата.** Был баг: `today.condition = 'rain'` если дождь ожидается в 13:00, и в результате hero весь день рисовал дождь, хотя на момент 06:00 было облачно. Введён хелпер `hourSurfaceCondition(nowH, fallback)` — берёт состояние из `today.hourly[NOW_HOUR]` по `wc` (weather_code часа) + страховка от «мокрого кода с нулевыми осадками» (если `pmm < 0.1` — даунгрейд rain/snow/storm → cloudy/partly-cloudy). Используется в `renderHeroAndMetrics` (иконка + текст) и `renderHeroScene` (частицы + group фона). Плитки метрик, дни и графики не тронуты — там логика отдельная и правильная. |

---

### v1.24.0 — подразделы утренней сводки + правило precip_soon

| Tag | Что |
|---|---|
| `v1.24.0` | **Утренняя сводка с 6 опциональными подразделами.** `morning_summary` теперь принимает `rule.sections = { wind, precip, astro, storm, feels, tomorrow }`. Каждый блок — отдельный helper в `bot/src/index.js`. Блок осадков явно пишет «✓ Дождя не ожидается» если их нет; снег упоминается **только в холодный сезон** (октябрь–апрель в северном полушарии, авто по lat подписки через `inSnowSeason()`). Гроза — отдельный блок «⛈ Возможна гроза: HH:MM-HH:MM» / «✓ Грозы не ожидается». **Новое правило `precip_soon`** заменяет `rain_soon`: параметры `{ windowHours, watchRain, watchSnow }`, раздельные сообщения «🌧 Скоро дождь!» / «🌨 Скоро снег!». Старый `rain_soon` остался legacy alias-ом — мигрируется на UI при первом сохранении правил. В `fetchWeather` добавлены `apparent_temperature, wind_gusts_10m, wind_direction_10m`. **На сайте**: новые чипы Дождь/Снег внутри строки «Осадки в ближайшие» (хотя бы один обязательно активен) и 6 чипов секций под «Утренней сводкой» (видны при включении правила). Light-тема overrides — терракотовые акценты для активных чипов. Команда `/admin_summary_test [base|full|wind|precip|astro|storm|feels|tomorrow] [chat_id]` для мгновенной отладки сводки без ожидания cron-времени. |

---

### Фаза Р: 16 hero-фото + 4-уровневая облачность

✅ **Статус: закрыта.**

| Шаг | Tag | Что |
|---|---|---|
| Р1 | `v1.25.0` | **Расширение hero до 4 уровней облачности и 16 фото.** `conditionGroup(cond, cloudCoverPct)` теперь возвращает один из 4 уровней: `clear` (cl<15%) / `partly` (15-50%) / `cloudy` (50-85%) / `overcast` (≥85% или активные осадки). Уровень берётся из `hourly.cloud_cover %` за текущий час. **При активных осадках/грозе/тумане** → `overcast` фон + частицы поверх (визуально «дождь над тяжёлыми тучами»). 8 ранее существовавших фото (clear/cloudy для 4 tod) заменены, добавлены 8 новых (partly/overcast для 4 tod). Источник: Pexels CDN, лицензия Pexels License. Все 16 WebP 1600×600 q≈82, ~700 КБ суммарно. **Удалена параллельная папка `assets/scenes/light/`** — теперь один набор для обеих тем + CSS-фильтр `brightness(1.08) saturate(0.94)` для dawn/day в light. Ночные сцены в light не осветляются — должны оставаться мрачными. Для `overcast` в light добавлен override текста на белый+тень (тяжёлые тучи делают фон тёмным). В dark теме `overcast` усилен общий overlay для гарантии читаемости. **Debug-функции** `previewHero` / `previewCond` обновлены под новые 4 уровня. Service Worker bump → `v1.25.0-hero-scenes` для принудительного обновления PWA. |

#### Уроки фазы Р

1. **Web-scraping Unsplash через WebFetch ненадёжен.** Сайт перерисовывается через JS, og:image мета-теги не всегда содержат финальные CDN-URL'ы, а Unsplash Source API остановлен в 2024. Pexels подошёл лучше: simple HTML с прямыми `images.pexels.com/photos/<NUM>/pexels-photo-<NUM>.jpeg` ссылками, CDN поддерживает `?fm=webp&fit=crop&w=1600&h=600&q=82` без аутентификации. Лимит — Pexels троттлит ~3-4 параллельных запроса, нужны паузы 5-8s между категориями.
2. **Один набор фото + CSS-фильтр vs два отдельных набора.** Раньше было два набора (`assets/scenes/` и `assets/scenes/light/`) — двойная работа по подбору. Финальное решение: один набор + `filter:brightness(1.08) saturate(0.94)` для светлых сцен (dawn/day) в light-теме, ночные оставлены мрачными. Это даёт ~50% меньше работы по подбору и более согласованный визуал.
3. **`cloud_cover %` точнее чем строковый `condition`.** Бинарное `clear/cloudy` теряло детали: «легкая облачность 30%» и «сплошной серый покров 95%» становились одним и тем же визуалом. С 4 уровнями фото точнее соответствуют реальности.
4. **Активные осадки → overcast + частицы.** Изначальная мысль — иметь отдельные «rainy/snowy/stormy» фото. Финальное решение: использовать тот же `overcast` фон (тяжёлые тучи) + поверх анимированные частицы (которые уже работали с фазы К). Это даёт ту же визуальную точность при 16 файлах вместо 17-20+, и частицы динамичны (реагируют на интенсивность из API).

---

### v1.26.0 — accuracy hint на hero + 0.1° ключ

| Tag | Что |
|---|---|
| `v1.26.0` | **Подсказка точности на главной.** Под `source-note` в hero появляется кликабельная плашка типа «🏆 ECMWF точнее AVG» (бирюзовая) или «📊 Среднее — самый точный» (зелёная, если AVG лидер). Скрыта если данных <3 моделей. Клик — открывает `Source Data Modal` с детальной таблицей. Плашка скрывается в sticky-hero состоянии (когда карточка сжата при скролле). **Точность ключа accuracy снижена с 0.01° (≈1 км) до 0.1° (≈10 км)** — на 10км погода практически одинаковая, поэтому данные от близких локаций (дом/работа/дача в одном городе) теперь сливаются в один счётчик. **Авто-миграция v1→v2 при загрузке**: при первом `loadAccuracyData(lat, lon)` за сессию находим все близкие старые ключи (в радиусе 0.1°), сливаем records по date (приоритет — записям с actual), пишем в новый v2-ключ, удаляем старые v1. Срабатывает один раз для каждой уникальной точки за сессию. **DevTools-утилиты**: `dumpAccuracy()` (показывает все ключи + кол-во замеров с/без actual), `resetAccuracy()` (полная очистка для тестирования с нуля), `mergeAccuracyKeys()` (ручное слияние всех ключей в текущий, как fallback). |
| `v1.26.1` | **Persist выбранного источника.** Раньше pull-to-refresh / любой reload сбрасывал `currentSourceId` обратно на `'avg'`. Теперь выбор сохраняется в `localStorage` (`kw:source:v1`) при каждом клике на источник и восстанавливается при init. SW bump для force-update PWA — без него PWA отдавала закэшированный старый `app.js` без новой accuracy-логики из v1.26. |

---

### Фаза С: Публичная анонимная синхронизация accuracy через бот

✅ **Статус: закрыта.**

| Шаг | Tag | Что |
|---|---|---|
| С1 | `v1.27.0` | **Public anonymous accuracy sync.** Бот раз в сутки (04:00 UTC) обходит все «интересные» координаты в `acc:registry` (KV STATS), тянет Open-Meteo с 7 моделями, накапливает accuracy-данные в `acc:loc:LAT_LON` на 0.1° сетке. Сайт после каждого `refreshForecast` параллельно дёргает `GET /api/accuracy?lat=X&lon=Y` — public endpoint без авторизации (CORS open). Регистрирует точку в registry автоматически. Точки старше 30 дней без запросов удаляются. Админ-команда `/admin_accuracy_cron` для ручного запуска cron'а (полезно для тестирования без ожидания 04:00 UTC). |
| С1.1 | `v1.27.1` | **Server — единственный источник правды.** Раньше серверные данные «сливались» с локальными — у двух устройств в одной точке могли быть разные счётчики (1 на iPhone, 0 на ПК) из-за локальной истории одного устройства. Теперь при успешном fetch `/api/accuracy` **полностью заменяем** локальные records серверным набором. Локальное накопление через `updateAccuracyData()` остаётся только как fallback при недоступности бота. Бот теперь также сохраняет `precipitation_probability_max` в predictions/actual — это позволяет считать precip-MAE в синхронной модели. |
| С1.2 | `v1.27.2` | **Убран 30-мин throttle для серверного fetch.** Был баг: throttle блокировал повторный fetch на 30 мин, но при этом UI всё равно показывал старые локальные данные. iPhone и ПК расходились — первый успешный fetch сохранил пустой кэш, потом throttle не давал перезапросить. Сейчас каждый `refreshForecast` → ровно один сетевой запрос → ВСЕГДА replace локальных серверными (даже пустыми). Сетевая нагрузка минимальна (один запрос на ~15 минут кэша forecast'а). |
| С1.3 | `v1.27.3` | **Fix: не стирать локальный pairToken автоматически при 401.** При каждой загрузке сайта дёргается `/api/rules-get` чтобы подтянуть правила бота. Если бот возвращал 401 (например, после `/login` на другом устройстве pairToken обновился, на этом стал устаревшим) — сайт молча стирал локальный токен. Юзер видел «связка пропала после перезагрузки». Теперь при 401 локальная привязка сохраняется — юзер сам решает переподключиться через `/login` или отвязать вручную. |

#### Уроки фазы С

1. **Без backend клиенты неизбежно расходятся.** localStorage per-device → у каждого устройства свой счётчик. Любая попытка «слить» локальные с серверными ведёт к разрыву (особенно когда сервер пуст).
2. **Server-truth проще чем merge.** Полная замена (replace) при success → одна логика для всех устройств. Merge с приоритетами → потенциальные баги в каждом из условий.
3. **Throttle на frontend опасен.** Кажется что «не дёргать сервер каждые 5 секунд» полезно, но при этом UI теряет свежие данные. Лучше доверять SW network-first / HTTP cache headers — там это решено грамотнее.
4. **401 ≠ «удалить локально».** Сервер может вернуть 401 по разным причинам (token expired, KV miss, race). Авто-удаление локального токена при первом же 401 — over-reactive. Лучше показать UI-предупреждение и дать юзеру решить.
5. **Cloudflare KV TTL даёт «самоуправление».** Точки в `acc:registry` имеют lastReq → не дёргается > 30 дней → удаляется автоматически на следующем cron. Никакой ручной cleanup-job не нужен.

---

### v1.28.x — UI-доводки

| Tag | Что |
|---|---|
| `v1.28.0` | **Кнопка-копирование команды `/pair` в буфер обмена.** Команда `/pair XXXXXX` в Settings → 🔔 Уведомления теперь обёрнута в пилюлю-кнопку с иконкой 📋. Клик → `navigator.clipboard.writeText(text)` (fallback на `execCommand` для старых браузеров) → toast «Скопировано ✓». Удобно на iPhone где не хочется вводить команду вручную. |
| `v1.28.1` | **Заголовок Settings → «Настройки».** Раньше было «Язык и единицы измерения» — больше не отражало содержимое (тема, голос, уведомления, аккаунты). RU «Настройки» · UK «Налаштування» · EN «Settings». |
| `v1.28.2` | **Убран дубль заголовка в Settings.** В `modal-header` было два элемента — цветной label («Настройки») и большой белый h2 («Настройки» после v1.28.1). Оставлен один — цветной label, переведён в h2 для семантики. |
| `v1.28.3` | **Fix: рендерить редактор правил в notif-pane при 401 + плашка-предупреждение.** Регрессия v1.27.3: при 401 от `/api/rules-get` выходили молча без `renderRulesUI()`. На устройстве с устаревшим pairToken юзер видел только «Отвязать», без редактора правил. Теперь редактор отрисовывается всегда; при 401 показывается жёлтая плашка «⚠ Связка устарела — отправь /login боту и кликни ссылку». |
| `v1.28.4` | **Fix: согласование `c` и `wc` в AVG-источнике.** Для AVG `wc = Math.max(...wcVals)` (худший код среди моделей побеждает), но `c` бралось из `hours[0].c` (первая модель) — поля рассогласовывались. Hero (читает `wc`) показывал дождь, hourly (читает `c`) — partly-cloudy. Теперь `c = codeToCondition(Math.max(wc))` — оба согласованы. Bump forecast-cache v9 → v10 для авто-инвалидации старых рассогласованных кэшей. |
| `v1.28.5` | **Fix: убран flicker sticky-hero на ПК.** На границе залипания мышиной/трекпад скролл с инерцией колебался → `.stuck`-класс переключался туда-обратно → CSS-transition частично проигрывался → визуально «дрожание» высоты. Гистерезис 18px → 60px, добавлен SWITCH_COOLDOWN 380ms (пока transition идёт — повторное переключение блокируется), `body { overflow-anchor: none }` для отключения браузерного scroll-anchoring. |
| `v1.28.6` | **Stuck hero — увеличена.** Свёрнутая карточка была излишне крошечной. padding 14→20px (десктоп), 12→16px (моб), temp-num 38→50px, temp-unit 18→24px, condition 13→15px. |

---

### v1.29.0 — переспрашивание geolocation при reload

| Tag | Что |
|---|---|
| `v1.29.0` | **Auto-refresh геолокации при старте / reload / pull-to-refresh.** Если последняя локация определена через `navigator.geolocation` (`currentLocation.source === 'geo'`), при каждом init запускается `refreshGeoLocationIfMoved()` в фоне (setTimeout 50ms — даём init завершиться). Запрашиваются свежие координаты через `requestGeolocation()`. Если ушли больше чем на ~200м (0.002° по lat/lon) — `setCurrentLocation()` обновляет точку и автоматически перезагружает прогноз. Выбранный источник погоды НЕ сбрасывается — он в отдельном ключе `kw:source:v1`. UI: на время запроса `.geo-tag` получает класс `.locating` с жёлтой пульсацией (`@keyframes geoTagPulse`). Если permission denied / timeout — тихо остаёмся на старых координатах. Если локация задана вручную (через city picker) — функция не делает ничего. |
| `v1.29.1` | **Авто-обновление SW для PWA.** Проблема: после deploy PWA на iPhone/ПК могла «застрять» на старом коде — браузер проверяет SW обновления раз в 24ч default, плюс HTTP-cache держит service-worker.js до TTL. Из-за этого новинки v1.29.0 не работали в PWA. Три триггера auto-update: (1) сразу после register() — `reg.update()` без ожидания 24ч; (2) каждый час через `setInterval` — для долго открытого PWA; (3) `visibilitychange` — каждый раз когда юзер возвращается к PWA после сворачивания. При обнаружении нового SW → существующий `controllerchange`-listener делает auto-reload. |
| `v1.29.2` | **Видимый feedback при refresh геолокации.** На iPhone PWA `navigator.geolocation` с `maximumAge:60_000` возвращал кэшированную позицию мгновенно (~50-200ms) — пульсация жёлтого чипа проскакивала почти незаметно. Два фикса: (1) минимум 1.2 сек класса `.locating` (через setTimeout в finally) — пульсация теперь точно видна; (2) toast вверху экрана на 2.4 сек после каждого refresh: «📍 Местоположение: без изменений» / «📍 Местоположение обновлено» / «📍 Не удалось определить местоположение». Light-тема override — кремовый фон с terracotta-акцентом. |
| `v1.29.3` | **Fix: один город — один счётчик accuracy, даже если координаты слегка разные.** Корень: city-picker даёт Високий 49.91/36.21 → ячейка 49.9_36.2; geolocation 49.89/36.12 → ячейка 49.9_36.1. Разные 0.1°-ячейки на сервере, у каждой свой счётчик (показывалось 1/7 ручную vs 0/7 геолокация для одного места). Решение в `GET /api/accuracy`: сервер проверяет центральную ячейку + 8 соседних (±0.1° по lat/lon, радиус ~10км). Возвращает ячейку с максимальным числом замеров с actual. Центральная имеет +0.5 бонус. Cron продолжает копить данные в каждой ячейке независимо — только при чтении показываем «лучшую близкую». Поле `cell` в ответе — для отладки, какая ячейка реально отдана. |
| `v1.29.4` | **Fix: плитка «Осадки» показывает реальную сумму мм/сутки из API.** Раньше подпись «~X мм» считалась через legacy-аппроксимацию `precip% * 0.07` (где precip — это вероятность %, не миллиметры). При probability=23% получалось 1.6 мм, хотя по почасовому графику реальный pmm был ~0.1 мм/ч → за день <0.5 мм. Решение: в Open-Meteo daily запрос добавлен `precipitation_sum` (мм/сутки), parseAllModels сохраняет в `day.precipSum`, computeAverageForecast усредняет для AVG, render использует реальное значение. Fallback на старую формулу если precipSum отсутствует (для legacy-кэша). Bump forecast-cache v10 → v11 для авто-инвалидации. |

---

### v1.30.x — бот AVG, source-aware уведомления, hint логика

| Tag | Что |
|---|---|
| `v1.30.0` | **Большой релиз — четыре связанные фичи.** (1) Бот переписан с best_match на multi-model AVG из 7 моделей. precipitation/weather_code/gusts — MAX по моделям (если хоть одна модель видит дождь, бот тоже видит). Если в подписке хранится конкретный source (не 'avg') — используется только эта модель через `stripModelSuffix`. (2) Усиленный buildPrecipBlock: если continuous window не найден, но daily.precipitation_sum или сумма hourly precipitation ≥ 0.5мм за сутки — пишем «🌧 Возможны осадки (за сутки X мм)» вместо ложного «дождя не ожидается». (3) Сайт передаёт текущий `currentSourceId` в `/api/rules-set`. Бот сохраняет в sub.source. /api/rules-get возвращает source. fetchWeather получает sub и использует нужный источник при cron. (4) UI: плашка в notif-pane «Уведомления используют источник: X. Поменяй источник на главной если хочешь другую точность». Обновляется при selectSource(). (5) Accuracy-advice toast при первом фетче за сессию — если выбранный источник не #1, нижний правый toast «🏆 X точнее для вашей локации» с кнопкой ✕, авто-скрытие 8 сек. |
| `v1.30.1` | **Fix: согласованная логика accuracy-hint.** Раньше для ECMWF без данных писалось «Точнее всех: UKMO» без рейтинга; ранги были «#5 из 6» (число моделей с данными, не общее) с английским символом #. Теперь: # → №, «№N из 7» (общее число моделей), если данных для текущей модели нет — fallback на сравнение с AVG. Стрелка ↗ в круге — явный визуальный indicator кликабельности. AVG выбран и лидер → «📊 Среднее — самый точный». AVG не лидер → «🏆 X обходит среднее». Модель #1 и точнее AVG → «🏆 Лидер по точности». Иначе → «📊 Среднее точнее на N°». |
| `v1.30.2` | **Fix: hint всегда показан, полоски с 1 замера.** ECMWF получал пустой hint потому что Open-Meteo для отдельных дат не выдаёт эту модель — локально не накапливалось данных. Теперь даже без данных модели даём общий ориентир («📊 Среднее обычно точнее · накапливаем данные для этой модели» или «🏆 Сейчас лидирует X»). ACCURACY_MIN_SAMPLES: 3 → 1 — полоски в Source Data Modal видны после первого же замера. Условие `rows.length < 3` в renderHeroAccuracyHint убрано. |

---

### v1.31.0 — секции Туман и Фаза Луны

| Tag | Что |
|---|---|
| `v1.31.0` | **Две новые опциональные секции в утренней сводке.** (1) **🌫 Туман**: `buildFogBlock` ищет в hourly за сегодня weather_code 45 (туман) или 48 (изморозь). Возвращает окно «🌫 Туман: 04:00–07:00» или «✓ Тумана не ожидается». (2) **🌙 Фаза Луны**: `buildMoonBlock` считает математически из синодического цикла 29.53 дней от опорного новолуния 06.01.2000. Восемь фаз с эмодзи 🌑🌒🌓🌔🌕🌖🌗🌘 + % освещения + ↑растёт/↓убывает. Пример: «🌕 Полнолуние · 98% · ↑ растёт». UI: 8 чипов вместо 6 в Settings → 🔔 Уведомления → Утренняя сводка. formatRule обновлён. /admin_summary_test full включает новые секции. |
| `v1.31.1` | **Fix: плитка осадков считается с NOW_HOUR до конца суток.** Раньше показывала `precipitation_sum` (полные сутки 00:00–23:59) — включала уже выпавшие утренние осадки. Почасовой график показывал только будущие часы (с NOW_HOUR). Визуально расходилось (плитка 1.2 мм, на графике суммарно ~0.7 мм). Теперь плитка суммирует `hourly[NOW_HOUR..23].pmm` — то же, что на графике. Fallback на `precipSum` если будущих часов нет. |
| `v1.31.2` | **chore: плитка показывает обе метрики — пик и сумму.** Проверил источники: и плитка, и график берут данные из одного `getForecast(currentSourceId).hourly[i].pmm`. Цифры были правильные, просто разные метрики — график показывает мм/ч (пик ~0.2), плитка показывала сумму (0.7 мм = 7 часов × ~0.1 в среднем). Юзер не понимал. Подпись стала: «пик X мм/ч · Y мм всего · описание». Пик визуально совпадает с максимумом графика, total — справочно. |
| `v1.31.3` | **chore: сумма осадков в плитке — в скобках для иерархии.** «пик 0.2 мм/ч · 0.7 мм всего» → «пик 0.2 мм/ч · (0.7 мм всего)». Скобки показывают что пик — основная метрика, сумма — справочная. |

---

### v1.32.x — multi-device связка + hover-glow дней

| Tag | Что |
|---|---|
| `v1.32.0` | **Multi-device pairTokens — один chat_id, N устройств без потери связки.** Корень частой плашки «Связка устарела»: при `/pair` или `/login` с нового устройства генерировался pairToken и перетирал старый — все другие устройства мгновенно становились 401. Решение: `sub.pairTokens` теперь массив (макс 8 последних токенов). Все устройства идентифицируют **один chat_id** = общие настройки уведомлений, но каждое имеет свой токен и не «выкидывает» другие. Изменения: `getPairTokens(sub)` — унифицированный API над legacy `sub.pairToken` и новым `sub.pairTokens`; `addPairToken(sub, t)` — добавление без перетирания; `removePairToken(sub, t)` — удаление одного устройства. `/pair`, `/login`, `/api/auth-claim` используют `addPairToken`. `/api/unpair` удаляет только токен этого устройства. `/unpair` от бота очищает все токены сразу. Frontend без изменений. |
| `v1.32.1` | **chore: hover-плитки дней не обрезаются + усилен неоновый glow.** `.days` получила padding-top:14px (раньше 0) — translateY(-4px) hover'а теперь умещается внутри карточки, верх не уходит за границу. Усилены неоновые акценты: `.day:hover` — border 0.4→0.85, glow двумя слоями rgba(0,212,255,**0.40+0.30**), мягкий cyan-purple градиентный фон. `.day.today` — border 0.5→0.7, glow 0.35+0.25 двумя слоями. Симметричный padding-bottom 14px. |
| `v1.32.2` | **Fix: day.max/min для AVG-источника из hourly[*].t.** Раньше для AVG `day.max = Math.round(meanOf(days.map(d=>d.max)))` — среднее `daily.temperature_2m_max` по моделям. А `hourly[i].t` для AVG — среднее температур моделей за этот час. Это два разных способа усреднения, могли давать разные цифры. Пример из реального скрина: на плитке 28.05 показывалось 9°/5°, а в почасовой модалке для этого же дня — 11° между 12:00–15:00. Теперь day.max/day.min для AVG считаются по `max/min(hourly[*].t)` — плитка дня всегда согласована с почасовой лентой. Для конкретных моделей без изменений (там Open-Meteo сам согласует). Bump forecast-cache v11 → v12 для авто-инвалидации старых кэшей. |

---

### v1.33.x — пользовательская чувствительность precip-уведомлений

| Tag | Что |
|---|---|
| `v1.33.0` | **3 уровня чувствительности для precip-уведомлений.** Раньше порог был хардкодом 60%/0.3 мм/ч — пропускались moderate-вероятные осадки. Теперь правило `precip_soon` (и legacy `rain_soon`) имеет поле `sensitivity` с тремя пресетами: `low` (60%/0.3) — только сильные осадки; `med` (40%/0.2) — баланс, default; `high` (25%/0.1) — даже моросящий дождь. UI: 3-кнопочный бар «Чувствительность» под правилом. `precipThresholds(sensitivity)` — хелпер на стороне бота. `ruleKeyOf` включает sensitivity — при смене cooldown сбрасывается. |
| `v1.33.1` | **chore: уточнённое описание правила «Осадки в ближайшие».** «Уведомить когда ожидаются осадки в указанные часы» → «Уведомить если осадки ожидаются в течение следующих часов». Раньше звучало как «в эти часы» (например 10:00–13:00), а должно быть «в ближайший N-часовой период от сейчас». |
| `v1.33.2` | **chore: убрано дублирование «часов» в описании.** «Уведомить если осадки ожидаются в течение следующих часов» → «Уведомить если в этот период ожидаются осадки». Слово «часов» дублировалось со словом «ч» в input'е количества часов. |

---

### v1.34.x — iOS-style wheel-pickers для всех числовых полей правил

| Tag | Что |
|---|---|
| `v1.34.0` | **Универсальный wheel-picker `createWheelPicker(opts)`.** Все number-input'ы в редакторе правил уведомлений заменены на вертикальные wheel-picker'ы (как настройка будильника iOS). Touch swipe с инерцией (velocity × decay 0.92), mouse drag, wheel-event, keyboard ↑↓, snap к ближайшему значению при отпускании. Подсветка активного (бирюзовая с тенью) и соседних значений, fade-градиенты сверху и снизу. Лимиты под реальный прогноз: `precip_soon.windowHours` 1–24 ч; `temp_below.threshold` −40..+40 °C; `temp_above.threshold` 0..+50 °C; `dry_streak.days` **1–10 дней** (раньше 14, но прогноз ограничен 10 — снижено в `validateRule` бота тоже); `morning_summary.hour` 0–23; `morning_summary.minute` 0–55 шаг **5 мин**. ARIA: role=spinbutton с valuemin/valuemax/valuenow. |
| `v1.34.1` | **chore: wheel-pickers как выпадающие popover'ы вместо постоянного отображения.** Раньше колёса всегда висели в UI — перегружало. Теперь компактная пилюля-триггер `[3 ч ▾]` показывает текущее значение, клик → popover с picker'ом + кнопкой «Готово». Закрытие: клик вне, Esc, или «Готово». `positionWpPopover` автоматически позиционирует под/над триггером в зависимости от viewport. Реестр `_activeWpPopover` закрывает предыдущий при открытии нового. Стрелочка ▾ поворачивается на 180° когда открыт. Для `morning_summary` — два picker'а (час : минута) в одном popover'е. |
| `v1.34.2` | **Fix: синтетический precip% на плитке для конкретных моделей.** Корень: Open-Meteo НЕ возвращает `daily.precipitation_probability_max` для конкретных моделей (только для ensemble AVG). Из-за этого при выборе JMA/GFS/ICON/ECMWF/UKMO плитка «Осадки» показывала `0%`, хотя в почасовой ленте — реальный дождь pmm > 1 мм/ч. Решение: если `today.precip === 0`, оцениваем синтетически — сначала `max(hourly[i].p)` за сутки, иначе доля часов с pmm > 0.1 (мин. 15%). Для AVG без изменений. `precipDescKey` теперь использует пересчитанное значение. |
| `v1.34.3` | **Fix: тот же fallback на стороне бота для precip-уведомлений.** Корень тот же что в v1.34.2: Open-Meteo не возвращает `hourly.precipitation_probability` для конкретных моделей. Если в подписке `sub.source` стоит конкретная модель, бот при cron получал `prob = 0` для всех часов → условие `effProb >= minProb` никогда не выполнялось → уведомление не отправлялось, хотя в прогнозе модели реально были осадки. Решение в `evaluateRule` для `rain_soon` и `precip_soon`: если `prob = 0` но `mm >= minMm` — считаем `effProb = 100%` (дождь точно будет). Сообщение исправлено: «1.2 мм/ч» без «, 0%» когда probability отсутствует. |

---

### v1.35.x — повышение точности прогноза для конкретной локации

✅ **Статус: закрыт.** Двухступенчатый апгрейд точности AVG-ансамбля.

| Tag | Что |
|---|---|
| `v1.35.0` | **+ECMWF AIFS (AI-модель), 7 → 8 моделей.** К 7 классическим физическим моделям (ECMWF IFS, GFS, ICON, GEM, JMA, Météo-France, UKMO) добавлена ECMWF AIFS (`ecmwf_aifs025_single`) — deep-learning модель ECMWF на ERA5-реанализе. Принципиально иная природа ошибок чем у физических NWP → ошибки слабо коррелированы с классическими моделями → в ансамбле взаимно гасятся, AVG становится точнее. Также **в боте** `ecmwf_ifs04` (0.4°, 44 км) заменено на `ecmwf_ifs025` (0.25°, 9 км) — теперь согласовано с сайтом и даёт в 5 раз более высокое разрешение для cron-уведомлений. **GraphCast** (`gfs_graphcast025`) у Open-Meteo сейчас не отдаёт данных (`null` для всех 10 дней) — добавим если/когда вернётся. Изменения: SOURCES расширен 7→8, bump forecast-cache key v12→v13, FORECAST_CACHE_CURRENT 9→13 (заодно починили рассогласование), bot WEATHER_MODELS/SUB_SOURCE_TO_MODEL/fetchModelsForecast/modelKeyMap/allowed sources синхронизированы, i18n строки «7 моделей» → «8 моделей» (RU/UK/EN, 21 место), CACHE_VERSION для PWA. |
| `v1.35.1` | **Bias-correction по накопленным замерам.** Каждая модель имеет хроническое систематическое смещение (например, ECMWF чуть завышает Tmax летом, UKMO занижает Tmin зимой). Локально/на сервере уже копятся пары (predicted, actual) — теперь из них считаем не только MAE но и signed bias = `mean(pred - actual)` по `tempMax/tempMin/precip` отдельно для каждой модели. `getForecast(sourceId)` применяет `applyBiasCorrection` на копии прогноза: `day.max -= bias.tempMax`, `day.min -= bias.tempMin`, hourly `t` корректируется интерполированным значением (линейно от tempMin-bias до tempMax-bias по позиции часа от min до max дня), `feels` тоже. **Safeguards:** (1) shrinkage — при `n < 5` коррекция не применяется, при `5 ≤ n < 15` частичная (`(n-5)/10`), при `n ≥ 15` полная; (2) cap ±3°C для T и ±20% для precip — защита от выбросов; (3) BASELINE (статика до первого fetch) не корректируется. **UI:** маленькая бирюзовая плашка «−1.2°» рядом с именем модели в accuracy-таблице, показывает реально применяемую коррекцию (если |bias| ≥ 0.2°). **DevTools:** `window.dumpBias()` — таблица raw vs effective bias по всем моделям. |

#### Уроки фазы v1.35.x

1. **Большинство Open-Meteo моделей уже `_seamless`** — автоматически берут максимально высокое доступное разрешение. `icon_seamless` для Украины уже отдаёт ICON-EU 6.5 км (не глобальный 13 км). Так что «заменить icon → icon_eu» было бы no-op — нужно было искать **другие** источники, не upgrade resolution существующих.
2. **AI-модели у Open-Meteo доступны под точечными именами.** `ecmwf_aifs025` (default ensemble) отдаёт null для текущих дней — нужен `ecmwf_aifs025_single` (deterministic single member). `gfs_graphcast025` пока не отдаёт данных в реальном времени.
3. **Бот использовал устаревшую ECMWF.** При фразе «бот переписан с best_match на multi-model AVG из 7 моделей» (v1.30.0) ECMWF был залит как `ecmwf_ifs04` (0.4° = 44 км сетка!). Это в 5 раз более грубое разрешение чем `ecmwf_ifs025` на сайте. Cron-уведомления для конкретных локаций фактически работали с очень грубой ECMWF.
4. **Shrinkage важнее cap.** Изначальная мысль — просто использовать `bias` если `n > 0`. Это приводит к over-fitting на первых замерах. Линейная shrinkage в окне `[5..15]` сэмплов даёт плавный переход «нет коррекции → полная коррекция» — поведение предсказуемое.
5. **Cap ±3°C — компромисс.** Если за месяц bias реально вышел больше — это либо аномальный период (резкая смена сезона), либо мало замеров с большим выбросом, либо модель действительно сломана. Все три случая лучше не корректировать в полную величину.
6. **Hourly bias через интерполяцию.** Применять `tempMax_bias` ко всем часам — неверно: ночью температура близка к `tempMin` и должна получить `tempMin_bias`. Решение — вычислить позицию часа `ratio = (h.t - min) / (max - min)` и применить взвешенное bias. Простая идея, но даёт согласованные min/max/часовые значения после коррекции.

---

### v1.36.0 — взвешенный AVG (BMA-light)

✅ **Статус: закрыт.** Простое арифметическое среднее по 8 моделям заменено на взвешенное по обратной композитной MAE.

| Tag | Что |
|---|---|
| `v1.36.0` | **Веса моделей в ансамбле = 1/(composite_MAE + ε).** Раньше AVG был простым средним: все 8 моделей одинаково влияли на итоговое значение, даже если UKMO систематически промахивался на ±2°C а ECMWF был в пределах ±0.5°C. Теперь `computeEnsembleWeights(modelIds)` берёт `ACCURACY_STATE.stats[id]`, считает обратную composite MAE для каждой модели, нормализует так чтобы сумма весов = 1. Формула: `w_i = 1 / (composite_i + 0.5)`, эпсилон 0.5 защищает от деления на ноль и экстремальных весов. Модели с `n < 3` замеров получают медиану весов «надёжных» (нейтральная позиция, не доминируют пока не накопится статистика). Если у >= половины моделей нет данных — fallback на uniform (как до v1.36). `computeAverageForecast(forecasts, weights)` теперь принимает массив весов, использует weighted-mean во всех расчётах: daily fields (max/min/precip/wind/pressure/humidity/dewPoint/precipSum/windGust), hourly fields (t, p, pmm, w, feels, cl, pr, hum, dp, uvi, vis, sr, cape, li). Категориальные поля (wc → max, windDir/sunrise/sunset/condition → первая модель, pressureTrend → mode) остаются без весов — там логика не аддитивная. **Важно:** ACCURACY_STATE теперь подгружается **до** parseAllModels в refreshForecast (раньше — после), чтобы первый же AVG в новой сессии использовал актуальные веса. **DevTools:** `window.dumpWeights()` показывает текущее распределение весов по моделям с composite MAE. **Bias-correction (v1.35.1) применяется ПОСЛЕ AVG в getForecast** — это два независимых улучшения, не конфликтуют. |

#### Уроки v1.36.0

1. **Веса нужны для всех числовых полей одновременно.** Сначала была мысль взвешивать только температуру (это «главное»). Но если t взвешено, а windSpeed — простой средний, в одном дне получаются несогласованные данные от разных «эффективных» моделей. Веса должны применяться к ВСЕМУ числовому набору модели как единое целое — иначе теряется внутренняя согласованность.
2. **При фильтре null-значений вес тоже должен исчезать.** Когда у модели нет данных для конкретного часа/поля, она исключается из mean. Соответствующий вес тоже не должен попасть в делитель — иначе сумма весов не равна 1 и результат смещается к моделям с данными. Решение — pair-up (`[value, weight]`) с фильтром по обоим.
3. **Cache не пришлось инвалидировать.** Веса не меняют структуру AVG — те же поля, та же форма. Старый кэш v13 продолжает работать; новые fetch'и будут использовать новые веса. Без bump'а cache key.
4. **Загрузка ACCURACY_STATE до parseAllModels — критична.** В архитектуре v1.35 accuracy грузилось ПОСЛЕ — для bias это нормально (он применяется на стадии render). Для весов AVG — нет: первый AVG в сессии должен иметь правильные веса. Переместили подгрузку выше.
5. **Защита от выбросов через эпсилон.** Без `+0.5` в знаменателе модель с MAE = 0.1° получала бы вес в 5× больше модели с MAE = 0.5° — overfit. С эпсилон 0.5 — разница 1.4×, разумнее.

---

### v1.37.0 — реальные наблюдения вместо proxy для actual

✅ **Статус: закрыт.** Самый важный фикс точности рейтинга и bias-коррекции.

| Tag | Что |
|---|---|
| `v1.37.0` | **Бот тянет ground truth из Open-Meteo Archive API.** Раньше `record.actual` заполнялся через `avg[0]` (текущий прогноз AVG на сегодня) — это **proxy**, который искусственно занижал MAE для моделей близких к AVG (главным образом ECMWF: он сам формирует большую часть AVG, поэтому «промахивается» меньше относительно proxy чем реально). После v1.37: `runObservationsCron` в 05:00 UTC обходит все локации в `acc:registry`, тянет реальные `temperature_2m_max/min/precipitation_sum` из `archive-api.open-meteo.com` (ERA5 + ERA5T — бесплатный, без ключа, обновляется с задержкой ~3-5 дней) для дат T-8..T-2 и перезаписывает `actual` в KV. Поле `actualSource: 'archive'` маркирует обновлённые записи. На сайте `convertServerRecord` сохраняет `actualSource`, `computeAccuracyStats` считает `groundTruthSamples` — сколько замеров уже проверены реальностью. Subtitle в accuracy-card: «Среднее отклонение по N замерам · M по реальным наблюдениям». **Admin:** `/admin_obs_cron` — ручной запуск для отладки (не ждать 05:00). Cron-расписание разнесено: 04:00 UTC accuracy (forecast +1/+2 дня) → 05:00 UTC observations (T-8..T-2 archive). `precipProb` остаётся proxy от avg — archive не даёт probability. После накопления ~7 дней с новой логикой weights/bias/MAE будут считаться **честно**, а не «vs AVG как у себя самого». |

#### Уроки v1.37.0

1. **Composite metric не должен использовать proxy самого себя.** MAE по avg-as-actual давала топ-1 ECMWF не потому что он точнее, а потому что он *доминирует в AVG*. Это классическая ловушка self-evaluation. Любая accuracy-метрика должна сравнивать с внешним эталоном.
2. **Archive-api имеет задержку 3-5 дней — это нормально.** ERA5T (real-time reanalysis) публикуется через ~3 дня после реального момента, ERA5 (финальный) через 1-3 месяца. Для T-2..T-8 на сегодняшний день — стабильно есть данные. Запрашиваем именно это окно — и actual точно будет доступен.
3. **Два cron job'а лучше одного.** Можно было запихнуть observations внутрь `runAccuracyCron` сразу после forecast'а. Но обход 2× API на одном таймауте — рисково для Worker'а с 50ms budget. Разнесли на 04:00 и 05:00 — каждый идёт независимо, меньше шанс что один пожрёт время другого.
4. **`actualSource` поле для аудита, не для логики.** Сначала была мысль использовать его для disable bias-correction если actual = proxy. Но это раздробило бы accuracy state на две категории. Проще — пусть пользователь видит «N замеров (M по фактам)», а внутри логика работает одинаково. Через 1-2 недели все записи будут archive — proxy уйдёт сам.
5. **Workers free tier выдерживает.** 100k запросов/день. Cron каждые 30 мин (48 запусков). Раз в сутки accuracy + observations (по ~50 локаций × 2 API = 100 fetch'ей). Запас огромный.

---

### v1.38.0 — per-variable best (🏆 отдельно по каждой метрике)

✅ **Статус: закрыт.** Раньше показывался один «общий» 🏆 по composite MAE. Теперь — отдельный лидер по каждой переменной.

| Tag | Что |
|---|---|
| `v1.38.0` | **Разделили лидерство по переменным.** Раньше accuracy-таблица показывала одну колонку с tempMaxMAE и одну с precipMAE, и общий 🏆 на строке. Реальность: модели специализируются — ECMWF может лидировать по дневной температуре, а ICON — по осадкам, GFS — по ночной температуре. Теперь: (1) **3 колонки метрик** вместо 2 — Tmax / Tmin / Осад (раньше tempMin считалась но не показывалась). (2) **`bestByVar` precompute** — для каждой переменной находим модель с минимальной MAE среди реальных моделей (avg исключён, он база для сравнения). (3) **`.best-col`-стиль** на ячейке-лидере: золотая обводка + ☆ перед значением + тёмно-жёлтый цвет числа. Их может быть 3 разных модели — этого мало кто видит в обычных weather-приложениях. (4) **Сжатая плашка «Лидеры»** над таблицей: `☆ по дневной T: X · по ночной T: Y · по осадкам: Z` — мгновенный обзор. Если лидеры по Tmax и Tmin совпадают — Tmin не дублируется в плашке. (5) **Mobile (≤640px)**: колонки сжаты до 40px вместо 56px, gap 5px, чтобы 6 колонок умещались на узких экранах без переноса. **Бот не трогали** — он использует AVG и отдельные источники, рейтинг моделей нужен только в UI сайта. |

#### Уроки v1.38.0

1. **«Один winner» скрывал ценную информацию.** Раньше composite MAE усреднял три метрики в один скор — но это уравнивало модель «отличная по T, плохая по precip» и «средняя по обоим». Per-variable рейтинг показывает специализацию явно, что помогает выбрать источник под конкретный кейс (планируешь пикник → нужна точная precip-модель; одеваться → нужна точная T).
2. **`avg` исключён из per-variable рейтинга, но в таблице остаётся.** AVG — это собранное взвешенное среднее всех моделей; если он «выиграет» по какой-то переменной, это не значит выбрать AVG — это значит ансамбль работает. Per-variable рейтинг — про выбор одной конкретной модели для своих нужд, поэтому avg оттуда выкидываем.
3. **Мобильные 6 колонок — компромисс.** Альтернатива — на ≤640px показывать только composite + одна свёрнутая «лидеры» плашка. Решил оставить все 3 колонки очень компактными (40px), чтобы пользователь видел числа сразу. Если фидбэк будет «давит» — можно вернуться к compact-mobile.
4. **Tmin тоже считается давно**, но раньше она была только частью composite. Достаточно было раскрыть колонку — никаких новых запросов или KV-полей. Cheap win.
5. **`.best-col` ≠ `.best`.** Старый класс `.best` на строке = модель #1 по composite (наследие). Новый `.best-col` на ячейке = лидер именно по этой переменной. Они могут совпадать или нет. Чтобы не путать — разные стили: `.best` бирюзовая обводка строки, `.best-col` золотая обводка ячейки.

---

### v1.39.0 — 15-минутный nowcast осадков (Open-Meteo minutely_15)

✅ **Статус: закрыт.** Изначально планировался RainViewer-blend на 0-2ч, но reality check показал что RainViewer free API даёт только PNG-тайлы радара без точечного API — для точечной интенсивности нужно сэмплить пиксели из тайла по lat/lon (ненадёжно, сложно). Заменено на `Open-Meteo minutely_15` — бесплатно, тот же API, без ключа, 15-мин разрешение на 2 часа вперёд.

| Tag | Что |
|---|---|
| `v1.39.0` | **15-мин nowcast в основном API-запросе.** В `fetchOpenMeteo` добавлены параметры `minutely_15=precipitation,precipitation_probability` и `forecast_minutely_15=8` — Open-Meteo возвращает 8 кадров × 15 мин = 2 часа фронтального прогноза осадков. **Парсер `parseMinutely15(data)`** извлекает массив `{ time, ts, mm, prob }`. Кладётся в `byModel.__minutely15__` (спец-ключ внутри byModel, чтобы попал в кэш и не сломал текущую логику моделей). **`nowcastInfo()`** анализирует кадры с фильтром «начиная с текущего времени −5 мин толерантность» (отбрасываем устаревшие из кэша) и возвращает один из трёх вариантов: (1) `{ kind: 'now', endsTs, peakMm }` — дождь идёт прямо сейчас, известно когда закончится; (2) `{ kind: 'soon', startMin, peakMm, prob }` — дождь начнётся через N минут; (3) `{ kind: 'dry' }` — все 8 кадров сухие. **UI:** новая плашка `<div id="heroNowcastHint">` рядом с accuracy-hint на hero. Render: «🌧 Дождь сейчас · до ~16:45» (синий) / «💧 Дождь через ~30 мин» (бирюзовый) / «✓ Без осадков 2 часа» (зелёный). Плашка **скрывается** если: данных нет, ситуация неоднозначная (модель говорит сухо, но завтра дождь — молчим, не нужно подтверждать обычное состояние), `dry` показывается **только** если сейчас идёт дождь по hourly (т.е. это подтверждение «продолжит быть сухо» / «прекратится»). Скрывается в sticky-hero состоянии (компактный hero не должен переполняться). Light-тема overrides. **Cache:** bump forecast-cache v13→v14 для авто-инвалидации старых кэшей без minutely-данных. **SW** bump для force-update PWA. |

#### Уроки v1.39.0

1. **RainViewer не подходит для точечного nowcast.** Free API даёт только tile-сервер. Чтобы получить интенсивность осадков в конкретной точке, нужно: (a) вычислить tile-координаты, (b) скачать PNG, (c) сэмплить пиксель, (d) маппинг цвета → мм/ч из их легенды. Это два сетевых запроса вместо одного, плюс canvas-пиксель сэмплинг, плюс fragility к смене схемы цветов RainViewer'ом. Не стоит. Радар оставлен как было — как **визуальная** ленточка в радар-модалке, что и должно быть его назначение.
2. **Open-Meteo `minutely_15` — недооценённая фича.** Включается одним параметром в существующий API-запрос, никаких новых endpoint'ов. На Украине работает (источник — `gfs_seamless` + ассимиляция). 15-мин разрешение для 2 часов — отлично для «когда выйти». Странно что это редко используется в weather-приложениях.
3. **`dry` хинт показывать аккуратно.** Изначально была мысль «всегда показывать "без осадков 2 часа", когда сухо» — но это шум. Если сейчас и так сухо по hourly, плашка дублирует обычное состояние. Решение: `dry` рендерится только если **сейчас** идёт дождь по hourly (т.е. подтверждение «через ≤2ч закончится»). Иначе плашка скрыта.
4. **Толерантность ±5 мин для устаревших кадров.** Кэш 15 мин — за это время первый minutely-кадр мог уже устареть. Фильтр `f.ts >= now - 5*60*1000` отсеивает прошлое, но даёт небольшой запас (5 мин) на ритм рендера. Без этого первый кадр мог быть «уже 7 мин назад» и сбивать расчёт «дождь через ~X мин».
5. **Бот пока не использует minutely_15.** Cron-проверки в боте раз в 30 мин — нет смысла дёргать 15-мин данные. Но для `precip_soon` рула с маленьким windowHours=1 это могло бы повысить точность. Follow-up для v1.39.1 если будет фидбэк.

---

### v1.40.0 — minutely_15 в боте для коротких precip_soon

✅ **Статус: закрыт.** Логичное продолжение v1.39 на стороне бота — для коротких окон уведомлений теперь минутная точность.

| Tag | Что |
|---|---|
| `v1.40.0` | **Бот использует minutely_15 при windowHours ≤ 2.** Раньше `precip_soon` (и legacy `rain_soon`) всегда работал по hourly: «вероятность 40% в этом часу» округлял разрешение до 60 мин. Для пользователя с `windowHours=1` это значило «дождь в ближайший час» — а реально дождь мог быть в 16:35-17:10, не покрывая первый прогнозный час. Теперь: (1) **fetchWeather расширен** — параметры `minutely_15=precipitation,precipitation_probability` + `forecast_minutely_15=8` (2 часа вперёд) в основном запросе. (2) **stripModelSuffix** теперь работает и с `minutely_15` (для single-model подписок). (3) **`averageMinutely15MultiModel`** — для AVG: precipitation → max (консервативно «хоть одна модель видит дождь»), probability → mean. (4) **`findFirstWetMinutely(m15, windowMin, minMm, minProb)`** — общий helper, возвращает первый кадр с дождём в окне или null. Толерантность ±5 мин для устаревших кадров. (5) **evaluateRule для `rain_soon` и `precip_soon`**: если `windowH ≤ 2` и есть `fc.minutely15` — используется новый fast-path; иначе старая логика по hourly. (6) **Тип осадков** (дождь vs снег) в `precip_soon` определяется по weather_code часа в который попадает hit, плюс fallback на температуру (T ≤ 1°C → снег если код неоднозначный — minutely сам weather_code не даёт). (7) **Сообщение точнее**: «🌧 5.6 мм/15мин · через ~25 мин» (раньше: «1.2 мм/ч, в 16:00»). Для `minAhead < 5` пишет «прямо сейчас», `< 60` — «через ~N мин», иначе fallback на whenStr(time). |

#### Уроки v1.40.0

1. **minutely_15 и hourly в одном API-запросе — бесплатно.** Open-Meteo не считает «лишним вызовом» когда в одном forecast-запросе и hourly и minutely_15. Cost модели не растёт. Никаких extra reads/writes в KV — то же worker-исполнение.
2. **Тип осадков нужно угадывать.** minutely_15 даёт только мм и %, без weather_code. Для разделения дождь/снег пришлось смотреть hourly[hitHourIdx]. Можно было бы запросить `weather_code` в minutely_15 (Open-Meteo поддерживает) — но это дополнительные байты для редко-используемой информации. Решил: код берём с часовой гранулярностью, мм/время — с минутной. Snow vs rain меняется редко за час, разрешение здесь не критично.
3. **Fallback по температуре защищает граничные коды.** Если код 0 (clear) — а дождь по minutely идёт (нереалистично, но возможно при рассогласовании моделей с hourly разрешением), фоллбэк на T ≤ 1°C даёт ответ «снег при морозе». В худшем случае — слово «дождь» вместо «снег», что не критично — главное факт уведомления.
4. **Cooldown 6ч защищает от спама.** Даже если minutely меняется каждые 15 мин и алгоритм точнее видит «дождь через 20 мин», бот не флудит — 6 часов антиспам на одно правило остаются. Минутная точность — это **качество одного уведомления**, не частота. Хороший принцип: «не больше уведомлений, более точные уведомления».
5. **Окно ≤ 2 часа — компромисс.** Можно было сделать «≤ 1 час → minutely_15, иначе hourly». Но 2-часовое окно полностью покрывается 8 кадрами minutely. До 2ч включительно — minutely. Выше — hourly. Чёткая граница, без overlap.

---

### v1.40.1 — fix: убран сбивающий «✓ Без осадков 2 часа»

✅ **Статус: закрыт.** Hotfix-ответ на user-фидбэк.

| Tag | Что |
|---|---|
| `v1.40.1` | **Убрана UI-ветка `kind='dry'` в renderHeroNowcastHint.** В v1.39 ветка срабатывала когда: (a) minutely_15 видит сухо на все 8 кадров вперёд, (b) hourly при этом считает что сейчас идёт дождь (pmm≥0.1 или p≥50). Логика была — «показать что minutely уверен в сухой погоде, даже если часовой прогноз пессимистичный». На практике это **противоречие источников**: юзер видит дождь за окном, а плашка пишет «✓ Без осадков 2 часа» — теряется доверие. Корректный случай «дождь идёт, скоро закончится» уже покрывается веткой `kind='now'` с конкретным `endsTs` («🌧 Дождь сейчас · до ~16:45»). Если minutely уверенно говорит «сухо в ближайшие 2ч» — плашка теперь просто молча скрыта. Это норма для пасмурной/ясной погоды, и для конфликта источников. i18n-ключ `nowcast.dry` оставлен в словаре на случай возврата в будущем. |

#### Уроки v1.40.1

1. **Противоречивые данные → молчать.** Если два источника не согласны (minutely vs hourly) — не пытаться объяснить юзеру какой источник правильный. Просто не показывать плашку. Сигнал теряется только если есть хоть один источник, и тогда сразу — формулировка «дождь скоро / сейчас / до ~XX:XX». «Sухо» — это default state, а не сообщение.
2. **Хорошо что фидбэк дошёл быстро.** Я мог рационализировать ветку «но это полезный сигнал, ведь minutely точнее!» — а юзер сразу почувствовал «странная плашка». Когда дизайн противоречит интуиции — переделать его, а не объяснять.
3. **Положительные сигналы редко нужны.** «Всё ок, без осадков» — это и так визуальное состояние страницы. Плашка должна появляться когда есть **новость** — а норму подтверждать визуальным шумом не надо.

---

### v1.40.2 — плашка различает дождь и снег

✅ **Статус: закрыт.** Hotfix-ответ на user-фидбэк.

| Tag | Что |
|---|---|
| `v1.40.2` | **Тип осадков в плашке зависит от температуры.** В v1.39 плашка везде использовала слово «Дождь» (🌧/💧) — но `minutely_15.precipitation` это **сумма осадков в мм водного эквивалента**: туда попадает и снег, и морось, и ливень. При −10°C юзер видел «Дождь через 30 мин» — нелепо. Решение: новая функция `precipKindFromTemp()` смотрит `today.hourly[NOW_HOUR].t` и возвращает `'snow'` если T ≤ 1°C, иначе `'rain'`. minutely_15 сам не даёт weather_code, поэтому температура — простой и достаточный эвристик. Используется в `renderHeroNowcastHint` для выбора иконки (❄/🌨 vs 🌧/💧) и текста («Снег сейчас» vs «Дождь сейчас»). **i18n-ключи** переразбиты: `nowcast.now.until` → `.rain` / `.snow`, `nowcast.now.continues` → `.rain` / `.snow`, `nowcast.soon` → `.rain` / `.snow`. RU/UK/EN. |

#### Уроки v1.40.2

1. **«Осадки» ≠ «дождь».** Open-Meteo `precipitation` — это любая жидкость + снег в водном эквиваленте. Слово «дождь» в UI — лексическая привычка, но при минусовой температуре это путает. Каждый раз когда говоришь «дождь» — проверь, точно ли там не снег.
2. **Эвристика по температуре работает.** Бот для precip_soon использует тот же подход (`T ≤ 1°C → снег` + weather_code если есть). На сайте проще — нет weather_code в minutely, только температура. T ≤ 1°C захватывает реальный снег + 0..1°C граничную зону (где смешанные осадки) — это компромисс в пользу «лучше показать снег если холодно».
3. **Single source of truth для типа.** И в боте, и на сайте — одинаковая логика «T ≤ 1°C → снег». Если когда-то изменится одна — другая должна следом. Записал mental note.

---

### v1.41.0 — расширенная классификация осадков (6 типов)

✅ **Статус: закрыт.** Развитие v1.40.2 — вместо бинарного «дождь vs снег» теперь 6 категорий с приоритетом тревожных.

| Tag | Что |
|---|---|
| `v1.41.0` | **6-категорийная классификация осадков в плашке nowcast.** `classifyPrecip(wc, temp)` берёт WMO weather_code из `hourly[NOW_HOUR].wc` + температуру и возвращает один из: **storm** (95-99 — приоритет высшего уровня), **freezing** (56/57/66/67 — ледяной дождь, опасность гололёда), **sleet** (T в −1..+2°C при любом коде — мокрый снег, граничная зона), **snow** (71-77/85-86 или T < −1°C), **drizzle** (51-55 — морось), **rain** (61-65/80-82 или fallback). Sleet-zone имеет приоритет над weather_code — модель может писать «дождь» при +0.5°C, но физически это слякоть, и для пользователя это важнее правильного кода. UI: иконки разные для now (🌧/🌦/❄/🌨/🧊/⛈) и soon (💧/🌦/🌨/🌨/🧊/⛈). **Тонировка**: 4 CSS-тона на плашке — `tone-rain` (синий), `tone-snow` (голубой), `tone-sleet` (серо-фиолетовый), `tone-danger` (янтарно-красный для бури и ледяного дождя, плюс лёгкий orange glow для привлечения внимания). i18n RU/UK/EN — 18 новых ключей (6 типов × 3 фазы: until/continues/soon). **Бот не трогали** — у него есть отдельный storm_alert и rain/snow toggles, расширение до 6 типов потребовало бы новых UI-чекбоксов watchSleet/watchFreezing — это уже не нужно для базовой пользы. |

#### Уроки v1.41.0

1. **Sleet-zone должна перебивать weather_code.** Сначала логика была «сначала проверить код, потом fallback на T». Но в граничной зоне (0..2°C) модель сама не уверена что писать — иногда «дождь», иногда «снег», иногда «слабая морось». Физически это всё *мокрый снег*. Поэтому правильнее — проверить температуру **первым** для всех нейтральных кодов осадков, и переопределить тип на sleet. Storm и freezing — исключения с явным кодом, остаются приоритетом.
2. **Опасные типы тонируются отдельно.** Гроза и ледяной дождь — это не «информация про погоду», это **предупреждение**. Янтарно-красная тонировка + лёгкий glow заставляют пользователя обратить внимание. Это полезнее чем нейтральный синий «дождь».
3. **Снег ≠ мокрый снег для пешехода.** Чисто снежная плашка значит «надевай нормальную обувь, будет холодно». Мокрый снег значит «непромокаемые ботинки, грязные дороги». Это разные действия — поэтому категории разделены.
4. **WMO кодов снег-с-дождём не имеет.** Это удивительно — sleet это базовое погодное явление, но международная классификация его игнорирует (раскладывает на rain/snow по преобладанию). Поэтому мы определяем его эвристикой по температуре.

---

### v1.42.0 — зелёный «точнее всех»: единый цвет лидера

✅ **Статус: закрыт.** Решено по фидбэку: визуальное выделение точнейшего источника независимо от того AVG это или модель.

| Tag | Что |
|---|---|
| `v1.42.0` | **AVG включён в per-variable рейтинг + единое зелёное выделение для любого лидера.** Раньше: AVG был «контрольной строкой» (∑), исключён из per-variable best, golden best-col применялся только к моделям. Теперь: (1) **AVG участвует в bestByField** наравне с моделями — если ансамбль точнее всех в какой-то метрике (а после bias/weights это типичный случай), его ячейка получает зелёное выделение. (2) **Единый класс `.best-col`** теперь зелёный (раньше золотой) — лидер любой метрики выделяется одинаково, чтобы пользователь видел просто «точнее всех». (3) **`overallWinnerId`** — id источника с минимальным composite MAE среди всех (включая AVG). Соответствующая строка получает `.winner`-класс: зелёная обводка с glow, 🏆 в ранге, толстый зелёный bar `.q-winner` 10px. (4) **Леаders-плашка** становится зелёной `.acc-leaders-winner` если ОДИН источник лидер по всем 3 метрикам: «🏆 X точнее всех по всем метрикам» (X = ECMWF / AVG / любой). Иначе обычная плашка с per-variable лидерами. (5) **В легенде внизу** новая пятая строка «🟢→🔵 точнее всех». Если завтра AIFS обойдёт AVG — зелёная полоса автоматически переедет на AIFS, никаких ручных правок. |

#### Уроки v1.42.0

1. **Не привязывать выделение к конкретному источнику — привязывать к роли.** Первая версия (золото для моделей, зелень для AVG) ввела разные цвета для разных типов источника. Пользователь сразу указал: «а если модель окажется точнее AVG? Зелёная полоса должна перейти». Это правильно — UI-цвет должен означать **роль** (лидер), а не **тип** (AVG vs модель). Один цвет, один смысл.
2. **«Ансамбль» — технический жаргон, не для UI.** Тестируемое слово «ансамбль» вызвало вопрос «зачем это слово». Замена на «среднее» (или просто «точнее всех» без указания типа) — однозначно лучше. Метеорологический термин уместен в коде/документации, не в плашке для юзера.
3. **AVG не должен быть «контрольной базой»** в смысле метрик. Раньше я думал — AVG это база сравнения, не «модель». Но если он реально точнее любой модели — он и есть лидер. Дискриминация AVG в рейтинге скрывала позитивный сигнал.

---

### v1.42.1 — fix: иконки почасовых плиток согласованы с реальным pmm

✅ **Статус: закрыт.** Hotfix-ответ на user-фидбэк со скриншотом.

| Tag | Что |
|---|---|
| `v1.42.1` | **Иконки часов 04:00-08:00 показывали дождь, а график осадков честно показывал 0 мм/ч.** Корневая причина — в AVG поле `wc` (weather_code) собирается как **max** по моделям (если хоть одна предсказала дождь — код будет дождевой), а `pmm` (precipitation) — как **weighted mean** (если большинство моделей видят 0 — pmm ~ 0). Иконка рисуется по `c = codeToCondition(wc)`, график — по `pmm`. В результате — рассогласование. Особенно заметно ночью/утром когда 1-2 модели «промахиваются» с прогнозом мороси. Решение: новая утилита `downgradeWetHourlyConditions(hourly)` проходит по всем часам и если `c ∈ {rain, heavy-rain, snow, thunderstorm}` но `pmm < 0.1` — даунгрейд до `cloudy` или `partly-cloudy` (по `cl` облачности). Применяется и в `parseOpenMeteoToForecast` (single model), и в `computeAverageForecast` (AVG). Раньше эта же логика была в `hourSurfaceCondition()` (v1.23.3) только для hero — теперь распространена на все часы. **Cache bump** v14→v15 — старые кэши содержат «неисправленные» c. **SW** bump для force-update PWA. Бот не трогали — там evaluateRule использует pmm напрямую, не строит «иконку часа». |

#### Уроки v1.42.1

1. **«max по моделям» для wc + «mean по моделям» для pmm — потенциальный конфликт.** Я делал max для wc консервативно («хоть одна модель видит грозу — показать»), и mean для pmm объективно («среднее ожидание»). Но эти два решения создают рассогласованные поля. Должна быть единая логика: либо оба max (показываем worst case), либо обе через mean. Я выбрал hybrid + post-fix через downgrade — это работает но сложнее.
2. **Hero уже было фикс с v1.23.3, но я забыл применить его к плиткам почасовой.** Та же логика лежала только в `hourSurfaceCondition()` для hero. Урок: если фиксишь рассогласование в одном месте — сразу думать «где ещё эти данные показываются». Иконки в hourly tiles, в hourly modal, в day-карточке тоже могут отображать `c` — все они теперь получают исправленный.
3. **Юзер-скриншот лучше любых mental tests.** Я не заметил баг при разработке потому что мои тестовые данные не имели «wet wc + 0 mm» сочетания. Скрин с 4 утра показал реальный production-кейс мгновенно.

---

### v1.42.2 — CRITICAL fix: nowcast плашка не работала с multi-model

✅ **Статус: закрыт.** Очень неприятный баг — фича v1.39.0 не работала всё это время для большинства пользователей.

| Tag | Что |
|---|---|
| `v1.42.2` | **Юзер прислал скриншот: «дождь идёт, плашка не появляется, бот молчит».** Расследование показало корневой баг: когда forecast запрашивается с `?models=A,B,C,...`, Open-Meteo НЕ отдаёт голое поле `precipitation` в `minutely_15` — только `precipitation_ecmwf_ifs025`, `precipitation_gfs_seamless` и т.д. с суффиксом каждой модели. А мой `parseMinutely15` искал именно `m.precipitation` → получал undefined → возвращал пустой массив → плашка nowcast **никогда не появлялась** для AVG-юзеров. Это весь основной кейс — большинство пользователей сидит на AVG. Фича была сломана с момента релиза v1.39.0 и я этого не замечал. **Фикс**: parseMinutely15 теперь детектирует формат ответа — если есть голое поле, использует его; если есть поля с суффиксами моделей, усредняет: precipitation → MAX (консервативно «хоть одна модель видит дождь»), probability → MEAN (среднее ожидание). Логика согласована с `averageMinutely15MultiModel` в боте. Cache bump v15→v16 для авто-инвалидации пустых старых кэшей. SW bump. |

#### Уроки v1.42.2

1. **Тестировал без `models=`, релизил с `models=`.** При тесте API в начале работы над v1.39 я отправлял голый запрос на minutely_15 и получал `{precipitation: [...]}`. Поверил что так же будет в production. На самом деле production-запрос содержит `models=` (вместе с hourly), что меняет формат minutely_15. Урок: тестировать API в том же виде в каком его реально дёргает код — без упрощений.
2. **Тихая фича не вызвала фидбэка.** Плашка не появлялась — но это можно объяснить «нет осадков сейчас». Юзер не знал что она ДОЛЖНА появиться. Только когда явный дождь + нет плашки → стало очевидно «что-то не так». Молчаливые баги в условных UI-элементах — самые коварные.
3. **Бот сделал лучше с самого начала.** В боте я сразу написал `averageMinutely15MultiModel` потому что данные шли по строго определённой схеме (всегда с моделями). На сайте я расслабился из-за наличия «упрощённого» теста без моделей и не заметил что путь через models= ломает парсер. Урок: copy-paste от бота на сайт сэкономил бы 2 недели нерабочей фичи.

---

### v1.42.3 — CRITICAL fix: бот парсил локальное время Open-Meteo как UTC

✅ **Статус: закрыт.** Самый серьёзный баг — все precip-правила бота фактически работали с окном **в прошлое**, упуская реальные дожди.

| Tag | Что |
|---|---|
| `v1.42.3` | **Юзер: «дождь идёт, бот молчит, cooldown'ы все ‘никогда’».** Расследование: дёрнул `/admin_cron` принудительно — бот залогировал `processed=2 fired=0`. evaluateRule возвращал `fired=false` хотя данные API однозначно показывали дождь. **Корень**: Open-Meteo с `timezone=auto` возвращает hourly.time в формате `'2026-05-25T11:00'` **БЕЗ суффикса `Z`** и без offset. JavaScript `new Date('2026-05-25T11:00')` парсит такую строку как **местное время** окружения. Cloudflare Worker крутится в UTC → строка интерпретируется как 11:00 UTC. Реально это 11:00 Kiev = 08:00 UTC. **Сдвиг 3 часа.** `nowMs = Date.now()` (UTC = 08:40) сравнивается с парсенными times → бот находит nowIdx = час «08:00 Kiev» вместо «11:00 Kiev», проверяет окно осадков 8-9-10 утра (где дождя ещё не было), возвращает fired=false. **Все precip_soon, rain_soon, temp_above, temp_below, dry_streak правила работали с окном в прошлое.** Только morning_summary (где время сравнивается отдельно с `rule.hour`/`rule.minute`) была не затронута. **Фикс**: `nowMs = Date.now() + (fc.utcOffsetSec || 0) * 1000` в `evaluateRule`, `findFirstWetMinutely` и `findNowIdx`. Это сдвигает now вперёд на UTC-offset подписки (для Kiev +3ч), чтобы значение соответствовало local-парсингу times. `minAhead` в `findFirstWetMinutely` теперь тоже считается внутри функции (где offset уже учтён), возвращается в hit. На сайте этой проблемы нет — там JS-окружение в локальном TZ юзера, парсинг корректный. |

#### Уроки v1.42.3

1. **Cloudflare Workers — UTC окружение.** Это не очевидно — process.env.TZ не выставлен, поведение date-парсинга отличается от Node на dev-машине. JS-код одинаков, поведение разное. Урок: всегда явно работать с UTC offsets в бэкенд-коде, не полагаться на «local time».
2. **Open-Meteo `timezone=auto` — удобно, но без Z.** Кажется удобным — массивы уже в локальной зоне. Но это создаёт двусмысленность парсинга. Альтернатива — `timezone=UTC` и ручной сдвиг при отображении. Менее удобно для логов («что было в 11:00 Kiev?») но устраняет такие баги.
3. **«0 правил сработало» — слишком тихая ошибка.** Бот логировал только `fired=0` итог. Не было видно «evaluateRule вернул false потому что в окне нет осадков». На production debugging cookbook нужно: для precip_soon при fired=false на коротком окне выводить какие mm/prob/wc были в проверенном диапазоне. Это сэкономило бы часы. Добавлю в follow-up.
4. **Юзер скриншоты + cooldowns команда — лучший debugging.** `/admin_cooldowns` показал «никогда, готово к отправке» — это сильный сигнал, что cron РАБОТАЕТ но evaluateRule не находит совпадений. Без этой команды можно было подумать «cron не запускается».
5. **Дотошность важнее «работает же».** Я тестировал бота локально через wrangler dev (где Node TZ обычно local) — там не было видно. Production обнаружил баг через 6+ недель после релиза бота.

---

### v1.42.4 — fix whenStr TZ + бот max→mean для согласия с сайтом

✅ **Статус: закрыт.** Два бага из одного юзер-фидбэка.

| Tag | Что |
|---|---|
| `v1.42.4` | **Баг A — «завтра» вместо «сегодня» в ночные часы.** В 02:00 Kiev бот прислал «🌧 Скоро дождь! завтра в 04:00» — но 04:00 это **тот же** день, через 2 часа. Корень: `whenStr` сравнивал `isoTime.slice(0,10)` (локальная дата от Open-Meteo) с `new Date().toISOString().slice(0,10)` (UTC-дата). В 02:00 Kiev = 23:00 UTC ВЧЕРАШНЕГО дня → `today` давало вчера, а `tomorrow` совпадало с сегодняшней локальной датой → формулировка «завтра». **Фикс**: `nowLocal = new Date(Date.now() + utcOffsetSec * 1000)` сдвигает в локаль подписки, потом `toISOString().slice(0,10)` даёт правильную локальную дату. **Баг B — разные прогнозы у сайта и бота.** В 07:01 бот: «Морось сейчас · Дождь 04:00-20:00, 2.8 мм». В то же время сайт: «Облачно сейчас · дождь только 12:00-15:00, 0.7 мм всего». Корень: бот в `averageHourlyMultiModel` агрегировал `precipitation` как **MAX** по 8 моделям (консервативно «хоть одна модель видит дождь»), сайт — как **weighted MEAN**. Если 1 модель из 8 показывает 0.1 мм в 4 утра, бот видит max=0.1 → расширяет окно дождя; сайт видит mean=0.0125 → плюёт. Бот пугал ложными предупреждениями. **Фикс**: `precipitation` в обоих `averageHourlyMultiModel` и `averageMinutely15MultiModel` теперь mean — синхронизация с сайтом. **Бонус-фикс — ложные storm-алёрты.** Так как `weather_code` остался max, одна outlier-модель с кодом 95 могла триггерить «гроза прогнозируется!» даже без реальных условий. В `storm_alert` evaluateRule добавлено требование `cape ≥ 500` к code-based триггеру (`stormByCode = (95\|96\|99) && cape ≥ 500`). Это исключает false positives от ложных кодов без convective instability. Деплой бота. Сайт не трогали. |

#### Уроки v1.42.4

1. **Worker UTC хитро ломает каждое сравнение дат.** Один раз исправил `Date.now()` (v1.42.3), думал — всё. А `toISOString().slice(0,10)` остался — он тоже даёт UTC. Каждое место где «текущая локальная дата» — отдельный фикс. Урок: вынести в одну функцию `localToday(utcOffsetSec)` и использовать только её.
2. **Max-агрегация для precip — false-positive friendly.** «Консервативно: лучше предупредить» звучит хорошо, но если модели сильно разные, max ловит outlier'ов. Mean более устойчив. Если хочется ещё консервативней — лучше требовать ≥2 моделей видят дождь (квартиль/percentile), чем max.
3. **Storm code 95 без cape — фантом.** WMO коды могут «прилетать» от модели без подтверждения нестабильности. Cape — физический показатель, наличие конвективной энергии. Логика «code 95 + cape ≥ 500» — компромисс: код подтверждает «модель видит грозу», cape подтверждает «есть на чём греметь».
4. **Юзер-сравнение сайт vs бот — золотой источник багов.** Один тот же запрос Open-Meteo, разная агрегация — расхождение видно мгновенно. Если бы у меня была интеграционная проверка «бот говорит о дожде × сайт говорит о дожде», 2 недели false positives не было бы. Идея: автотест в CI сравнивающий что бот и сайт выдают одинаковую «погодную картину» на тех же координатах.

---

### v1.43.0 — стрелки прокрутки и touch-swipe в почасовой ленте модалки дня

✅ **Статус: закрыт.** UI-улучшение по фидбэку.

| Tag | Что |
|---|---|
| `v1.43.0` | **Почасовая лента в модалке дня теперь как на главной.** Юзер: «открываешь карточку дня — в модалке почасовой прогноз, но нет кнопок прокрутки и не листается пальцем». Раньше модалка дня имела голый `<div class="hours-scroll" id="modalHourlyRow">`, без обёртки `.scroll-wrap` и без кнопок ‹ ›. На десктопе нельзя было пролистать ленту мышкой за пределы видимой области. На мобильном лента листалась но не всегда плавно из-за конфликта с swipe-to-close модалки. **Фиксы**: (1) HTML генерация в `openDayModal` теперь оборачивает `modalHourlyRow` в `.scroll-wrap` с двумя `.scroll-arrow` кнопками — как на основной странице. (2) Новая функция `attachModalHourlyArrows()` навешивает обработчики кликов и scroll-listener для активации/деактивации стрелок при достижении краёв — модалка пересоздаётся при каждом открытии, поэтому setupScrollArrows() из init не покрывает её динамические стрелки. (3) CSS `.hours-scroll` улучшен: добавлены `-webkit-overflow-scrolling: touch` (inertial scroll на iOS), `touch-action: pan-x` (явно разрешён горизонтальный свайп, вертикальные жесты остаются у родителя для swipe-to-close модалки), `overscroll-behavior-x: contain` (свайп не «перетягивает» соседние горизонтальные scroll-области). Это улучшает touch везде где есть hours-scroll — и в модалке дня, и в основной почасовой карточке, и в HDM. На мобильных стрелки скрыты (как и в остальных scroll-area, через `.scroll-arrow{display:none}` в media query ≤640px) — пользователь листает пальцем. |

#### Уроки v1.43.0

1. **Динамически создаваемые DOM-элементы — setupScrollArrows() не покрывает.** Init вызывается один раз при загрузке страницы, обходит существующие .scroll-arrow и навешивает обработчики. Модалка дня пересоздаётся через `innerHTML = ...` при каждом открытии — старые элементы удаляются, новые не получают обработчиков. Нужно либо event-delegation на body, либо явный вызов attach при открытии модалки. Выбрал второе — проще.
2. **`touch-action: pan-x` — спасает swipe-to-close.** Без него горизонтальный жест на ленте часов мог случайно зацепить вертикальную составляющую и попасть в логику закрытия модалки. С `pan-x` браузер сам различает: горизонтальный жест → внутренний scroll, вертикальный → bubble на родителя (модалку). Никаких custom touchstart/touchmove fixups.
3. **`-webkit-overflow-scrolling: touch` всё ещё нужен на iOS Safari** даже в 2026. Без него скролл идёт без inertia — рывками, не «как нативный». Хотя CSS-spec эту строку deprecated, реальный Safari всё ещё ей пользуется.
4. **Симметрия с основной страницей — это UX-инвариант.** Лента часов на главной выглядит так-то — в модалке должна выглядеть так же. Если пользователь освоил жест ‹ › на главной, он ожидает того же в модалке. Любая разница — баг даже если технически «работает».

---

### v1.43.1 — footer «по данным X» в каждом уведомлении бота

✅ **Статус: закрыт.** UX-улучшение по фидбэку.

| Tag | Что |
|---|---|
| `v1.43.1` | **Прозрачность источника в push-сообщениях.** Юзер: «Логично было бы в уведомлениях указывать по данным какого источника событие». Раньше push-сообщения бота не упоминали источник — пользователь не знал, AVG это, или его выбранная модель. Особенно сбивает когда юзер переключил источник на ECMWF, но не помнит этого: push приходит, он думает «странно, у меня сайт показывал не так». Добавлено: **`SOURCE_LABEL_RU`** mapping (`avg → 'усреднения 8 моделей'`, `ecmwf → 'ECMWF'`, `aifs → 'ECMWF AIFS (AI)'` и т.д.) + helper `sourceLabel(srcId)`. В `evaluateRule()` формируется `srcFooter = '\n<i>по данным ${sourceLabel(src)}</i>'` (HTML-курсив, мелкий шрифт), который добавляется в конец **всех 10 fired-сообщений** (temp_below, temp_above, rain_soon × 2 пути, precip_soon × 4 пути, storm_alert, dry_streak). Также в `buildMorningSummary` — footer внизу всей сводки. Пример push: `🌧 Скоро дождь! Высокий: 1.2 мм/ч, 65% сегодня в 12:00 \n по данным ECMWF`. Если юзер переключит на AVG — следующий push покажет «по данным усреднения 8 моделей». **Бот деплой**. |

#### Уроки v1.43.1

1. **Подпись источника — это UX-доверие.** Когда юзер видит push, он на автомате доверяет ему — но не знает «как именно бот это посчитал». Маленькая курсивная подпись внизу не отвлекает (по сравнению с заголовком), но даёт прозрачность: «ага, это ECMWF сказал». Особенно ценно для нескольких сценариев: (а) юзер переключил источник и забыл; (б) сайт и push расходятся — теперь видно почему.
2. **Footer лучше встроенного.** Альтернативой было встраивать источник в текст («ECMWF: 1.2 мм/ч…»). Но это меняет тон сообщения — становится «техническим». Footer курсивом внизу — это «metadata», ненавязчивая.
3. **`(sub && sub.source) || 'avg'` — безопасный fallback** для случая когда subscription загружается без сохранённого source (старые записи или admin-команды без полного контекста).

---

## 6. ОСТАЛОСЬ СДЕЛАТЬ

Все фазы А → С закрыты. **Сайт, бот, hero, public accuracy sync — в production.**

Опциональный бэклог — раздел 7.

### 📋 Quick Reference: команды бота @MeteoStarBot

**Для всех:**
- `/start` — подписаться (создаёт запись в KV, локация по умолчанию Высокий)
- `/help` — список команд
- `/status` — текущая подписка и активные правила
- `/location <город>` или `/location 49.9 36.21` — сменить локацию (через Open-Meteo geocoding)
- `/pair <код>` — связать с сайтом по 6-значному коду из Settings → 🔔 Уведомления
- `/login` — получить magic-link для входа на сайт с любого устройства
- `/unpair` — разорвать связь с сайтом (подписка остаётся, сайт теряет доступ)
- `/stop` — полностью отписаться

**Только в группах:**
- `/setup` — инструкция для админа группы как связать чат с сайтом (требует admin/creator)

**Только для админа** (`userId === 151252296`):
- `/admin_stats` — статистика дня (подписки, отправки, ошибки, cron)
- `/admin_list [N]` — последние N подписок (по умолчанию 10)
- `/admin_broadcast <текст>` — рассылка всем (HTML-форматирование поддерживается)
- `/admin_ban <chat_id>` / `/admin_unban <chat_id>` — блокировка подписок
- `/admin_test <chat_id>` — отправить тестовое сообщение
- `/admin_cron` — принудительно запустить cron-проверку прямо сейчас
- `/admin_addrule <тип> [параметры]` — добавить правило себе для теста
- `/admin_clearrules` — удалить все свои правила
- `/admin_cooldowns [chat_id]` — посмотреть когда сработают правила (отладка)

### 🛠 Quick Reference: как обновить бота

После правок в `bot/src/index.js`:
```powershell
cd C:\Users\User\projects\kharkiv-weather\bot
npx wrangler deploy
```

Стрим логов:
```powershell
npx wrangler tail
```

Смена секрета (токен бота, webhook secret, admin password):
```powershell
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_WEBHOOK_SECRET
npx wrangler secret put ADMIN_TOKEN
```

Просмотр содержимого KV:
```powershell
npx wrangler kv key list --binding SUBSCRIPTIONS
npx wrangler kv key get --binding SUBSCRIPTIONS "sub:151252296"
```

---

## 7. БЭКЛОГ – опциональные улучшения

### Полезные доработки

- **Calendar export (.ics):** кнопка «Добавить в календарь», файл с погодой на 7 дней (события на каждый день: max/min температура + condition + осадки %)
- **Sticky-табы метрик** в почасовой карточке: при скролле горизонтальной ленты табы метрик зафиксированы сверху
- **Виджет «Лучший день недели для X»:** использует existing activity-windows engine на 10-дневке — «🏃 пробежка лучше всего во вторник», «🍖 шашлык — суббота»
- **Weather Story (AI-резюме дня):** короткий текстовый абзац-сводка на главной — «Сегодня в Високому будет тепло до +21°C, к вечеру лёгкий дождь, ветер слабый. Завтра похолодает до +14°C, риск грозы.»
- **Сравнение городов: timeline-режим** — слайдер времени, обе локации показывают одну и ту же hour сценарии
- **Web Push API** (альтернатива Telegram-боту): VAPID + Cloudflare Worker. Минус: на iOS работает только в установленной PWA

### Известные ограничения

- При первой загрузке (до завершения fetch) данные показывают BASELINE / placeholders. С v1.18 это решено через skeleton-screen
- Geocoding API Open-Meteo не покрывает абсолютно все мелкие населённые пункты Украины
- Спарклайн климата: на мобильном (узкий экран) подписи годов могут немного теснить друг друга
- Astro-mode «видимость звёзд» использует упрощённую формулу: облачность × (1 – фаза_луны/100) – не учитывает световое загрязнение
- В Compare Mode при сравнении городов на разных континентах (например, Київ vs Tokyo) timezone'ы у графика почасовой температуры берутся локальные каждого — час «12:00» означает разное время. Можно добавить timezone-маркер «12:00 (UTC+3)»
- На iOS PWA backdrop-filter на sticky hero иногда «выпадает» (баг WebKit). Glass-эффект становится менее заметным. Workaround не нашли

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
| `assets/scenes/` | 8 фото-фонов hero для **dark-темы** (Unsplash CC0, WebP 1600×600, ~217 КБ): day/dawn/dusk/night × clear/cloudy |
| `assets/scenes/light/` | 8 фото-фонов hero для **light-темы** (Unsplash CC0, WebP 1600×600, ~170 КБ): те же категории, но светлые тона (pastel sunrise / bright sky / golden sunset / blue hour) |
| `admin.html` + `admin.js` | **Веб-админка** для управления Telegram-ботом. Открывается на `/admin.html`, защищена `ADMIN_TOKEN`. UI: статистика 7 дней, таблица подписок, broadcast, ban/test/delete |
| `bot/` | **Cloudflare Worker** Telegram-бота. Отдельный проект внутри репо, деплоится в Cloudflare через `npx wrangler deploy` |
| `bot/wrangler.toml` | Конфиг Worker'а — account_id, KV bindings (SUBSCRIPTIONS / PAIRING / STATS), cron trigger `*/30 * * * *`, ADMIN_USER_ID |
| `bot/src/index.js` | Весь код Worker'а: webhook handler, 11+ команд, cron-проверка правил, HTTP API для сайта, admin API |
| `bot/scripts/set-webhook.js` | Утилита регистрации webhook'а у Telegram (интерактивно спрашивает token и secret) |
| `bot/README.md` | Пошаговая инструкция установки (wrangler login → KV create → secrets put → deploy → setWebhook) |
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

*Документ обновлён: 18 мая 2026 после серии релизов v1.16 → v1.23.2 (фазы М, Н, О, П, Б закрыты). Главные достижения этой сессии: модуляризация, Compare Mode, переключатель темы dark/light/system с тёплой персиково-коралловой палитрой и 8 светлыми hero-фото, glass-скроллбар, переработанный гроза-индикатор, **полноценный Telegram-бот на Cloudflare Worker с 6 типами правил и cron-проверкой каждые 30 мин, веб-админка с brute-force защитой и удобным паролем (вместо длинного токена), поддержка групповых чатов, magic-link `/login` для cross-device входа, multi-account UI с переключателем на сайте — можно иметь личный чат + несколько групп на одном устройстве и переключаться dropdown'ом**. Бот деплоится в облако и работает 24/7 независимо от ПК.*

### Заметка по В6
По итогам обсуждения от прямого WebSocket к Blitzortung отказались (закрытое API, нестабильный handshake, требует прокси). Вместо этого реализован **прогнозный** индикатор грозы на 48ч из Open-Meteo с использованием `weather_code` (95/96/99), `cape` и `lifted_index`. Real-time трекер молний может вернуться отдельной фичей В6.5 через Cloudflare Worker-прокси, если возникнет потребность.

### Заметка по В7
Реализован **накопительный** рейтинг точности: каждое успешное обновление прогноза пишет в localStorage предсказания на +1/+2 дня от 7 моделей; когда эти даты становятся «сегодня», записывается `actual` из `avg[0]` как лучший доступный наблюдаемый сигнал без backend. MAE считается по парам (prediction, actual) для tempMax / tempMin / precipitation. Минимум 3 замера – рейтинг показывается; до этого карточка в состоянии «накапливаем данные N/7». 🏆-бейдж дублирует лидера на пилле в карточке источника.

**Альтернатива на будущее:** если когда-нибудь появится backend или Cloudflare Worker – можно тянуть фактические наблюдения из Open-Meteo `archive-api` (точнее, чем `forecast[0]` как proxy). Сейчас compromise приемлемый, так как `forecast[0]` ассимилирует свежие наблюдения и близок к реальности.

---

## 11. ✅ ВЫПОЛНЕНО: Выбор темы в настройках (фаза П, v1.21.0 → v1.21.3)

> История раздела сохранена для контекста. Реализовано — см. фазу П в разделе 5.
> Финальная палитра: тёплая персиково-коралловая (а не blue→pink→peach из изначального плана) — пользователь выбрал «тёплый персик/слоновая кость» с terracotta-акцентами. Hero-фото для светлой темы — 8 новых из Unsplash (а не gradient/filter fallback). 6 итераций контраста плиток (фон и плитки сначала слишком сливались, потом слишком тёмные, потом just-right).

### План реализации (исторический)

**Что хочет пользователь:** добавить в настройки выбор темы оформления — три варианта:

1. **🌙 Тёмная** — текущая (Liquid Glass с неоновыми акцентами в синем/циан/фиолетовом спектре)
2. **☀️ Светлая с градиентом** — светлая палитра с градиентным backdrop (мягкий blue→pink→peach), сохраняющая стилистику Liquid Glass но в инверсии
3. **🖥 Системная** — авто-переключение через `prefers-color-scheme: dark` / `light`

### План реализации (исторический, ~3-4 часа изначально, по факту ~10 часов с фотофиксами)

**Этап 1 — переменные:**
- Все цвета в CSS перевести на custom properties (`--bg-base`, `--text-primary`, `--card-bg`, `--accent`, ...) объявленные на `:root`
- Сейчас цвета захардкожены (`#02061a`, `rgba(232,240,255,0.x)`, и т.д.) → нужно extract по grep'у и заменить

**Этап 2 — палитры:**
- `:root` — дефолтная dark палитра (текущая)
- `:root[data-theme="light"]` — overrides для светлой
- Для system — JS определяет `matchMedia('(prefers-color-scheme: dark)').matches` и ставит `data-theme` соответственно, слушает изменения

**Этап 3 — UI в Settings:**
- В существующую settings-модалку добавить новую секцию «🎨 Тема»
- Segmented-control с тремя вариантами (как для языка/единиц)
- Сохранение в `kw:settings:v1.theme` (`'dark' | 'light' | 'system'`)

**Этап 4 — корректировки контента:**
- Photo-backgrounds hero — могут не подойти под светлую тему. Возможно: для light-theme подменять на более светлые dawn/day сцены или градиент без фото
- Particles в body — фиолетовые/синие, нужны более тёплые для light
- Glass-эффект — на light bg blur разные параметры
- SVG-иконки погоды — currently светлые на тёмном. Для light переключить fill/stroke

**Этап 5 — meta theme-color:**
- В light режиме theme-color должен быть светлым (status bar iOS PWA)
- JS меняет `<meta name="theme-color" content="...">` динамически при смене темы

**Сложность:** средняя. Самое муторное — этап 4 (адаптация всех визуальных элементов). Photo-backgrounds могут требовать 8 новых картинок для light-режима.

**Облегчённый MVP:** только этапы 1–3 без замены фото-фонов (light использует те же фото с другим overlay). Грубо, но работает.

---

## 12. ✅ ВЫПОЛНЕНО: Telegram-бот с push-уведомлениями (фаза Б, v1.22.0 → v1.23.0)

> Реализовано полностью. Описание реализации — см. фазу Б в разделе 5.
> План ниже сохранён для контекста.

### План реализации (исторический)

**Что хочет пользователь:** Telegram-бот рассылающий уведомления о настроенных погодных событиях. **Пользователь — главный админ** с полным контролем.

### Use-case
Stas (юрист КНП) хочет уведомления типа:
- «❄️ Температура опустилась ниже 0°C»
- «🌧 Дождь в ближайшие 3 часа»
- «☀️ 3 дня без дождя подряд — самое время на дачу»
- Утренняя сводка для рабочего чата группы коллег
- И т.д. — настраиваемые правила

### Архитектура

```
┌───────────────┐   POST /subscribe   ┌─────────────────────────┐
│  Сайт (PWA)   │ ───────────────────→│   Cloudflare Worker     │
│  (frontend)   │  POST /webhook      │   + KV (subscriptions)  │
└───────────────┘                     │   + KV (admin-stats)    │
        │ открыть @MeteoStarBot       │   + Cron Triggers       │
        ↓                             └────────┬────────────────┘
┌───────────────┐  /start ─────→               │ cron каждые 30 мин
│   Telegram    │  /status, /silence, ...      ↓
│  MeteoStarBot │                         для каждой подписки:
└───────────────┘                         1) fetch Open-Meteo
        ↑                                 2) eval правила
        │  matched alert                  3) если matched →
        └─────────────────────────────────── Telegram Bot API
                                                 → ваш чат
```

### Роль главного админа (Stas)

В `wrangler.toml` (конфиг Worker'а) хранится:
```toml
[vars]
ADMIN_USER_ID = "111111111"  # ваш Telegram user_id
```

Бот распознаёт админ-команды от вашего user_id. Все остальные могут только настроить свою подписку.

**Админ-команды в Telegram:**

| Команда | Что делает |
|---|---|
| `/admin_stats` | Сколько активных подписок, топ городов, сколько уведомлений отправлено за сегодня/неделю |
| `/admin_list [10]` | Список последних 10 подписавшихся (анонимизированно: chat_id, город, кол-во правил) |
| `/admin_broadcast <msg>` | Разослать сообщение **всем** подписчикам (например, «⚙️ Maintenance сегодня 22:00–23:00, бот недоступен») |
| `/admin_ban <chat_id>` | Заблокировать подписку (полезно если спам/абуз) |
| `/admin_unban <chat_id>` | Разблокировать |
| `/admin_logs [N]` | Последние N строк логов (errors, rate-limits, и т.д.) |
| `/admin_test <chat_id>` | Принудительно отправить тестовое уведомление конкретной подписке (для отладки) |

**Веб-админка (опционально, ~2ч):**
Отдельная страница `/admin.html` на сайте, защищённая токеном (только у вас в settings.local). Показывает:
- Список всех подписок (city, lat/lon, rules count, last_fired)
- Графики: подписок/день, отправок/день
- Кнопки broadcast / ban / test

### Фазы разработки

**Б1 — MVP бот (~3-4 часа)**
- Cloudflare account + Worker (бесплатный план)
- @BotFather → создать `@MeteoStarBot`, получить токен
- Worker endpoints:
  - `POST /webhook` — Telegram bot webhook (приём команд)
  - `/start` обработчик — выдача пары-кода
  - Базовые команды: `/subscribe`, `/status`, `/stop`, `/help`
- KV namespace `SUBSCRIPTIONS` структуры:
  ```json
  {
    "111111": {
      "chatId": 111111,
      "lat": 49.9, "lon": 36.21,
      "name": "Високий",
      "lang": "ru",
      "rules": [],
      "createdAt": "2026-05-17T...",
      "banned": false
    }
  }
  ```
- Тест: написать боту /start → получить код → бот сохраняет в KV

**Б2 — Cron + правила (~3-4 часа)**
- Cron trigger Worker'а каждые 30 минут
- Для каждой подписки:
  - Тянем погоду из Open-Meteo для (lat, lon)
  - Применяем все правила
  - Если matched && !recentlyFired (антиспам 6ч/24ч в зависимости от типа) → шлём сообщение через Telegram Bot API
  - Обновляем lastFired в KV
- Типы правил MVP:
  - `temp_below` (threshold) — температура ниже X
  - `temp_above` (threshold)
  - `rain_soon` (windowHours) — дождь в ближайшие N часов
  - `storm_alert` — гроза в 48ч
  - `dry_streak` (days) — N дней подряд без осадков
  - `morning_summary` (hour, minute) — утренняя сводка в конкретное время

**Б3 — UI для настройки правил (~2-3 часа)**
- В сайт: Settings → новая секция «🔔 Уведомления»
- Кнопка «Подключить Telegram» → открывает `tg://resolve?domain=MeteoStarBot`
- Поле ввода пары-кода → POST к Worker `/pair`
- Список активных правил с toggle включения/выключения
- Кнопка «Добавить правило» → форма (тип, threshold, время)
- Сохранение → POST `/update-rules` к Worker

**Б4 — Админ-команды (~2 часа)**
- В webhook-обработчик добавить проверку `event.from.id === ADMIN_USER_ID`
- Реализовать `/admin_*` команды
- Stats: суммируем по KV, или храним отдельный counter в KV `kw:admin:stats:YYYY-MM-DD`
- Broadcast: итерация по KV + Telegram sendMessage с rate-limit (Telegram лимит ~30 msg/sec на бота, делаем 25)

**Б5 — Групповые чаты + админка веб (~2 часа, опционально)**
- Бот добавляется в группу → реагирует на `new_chat_members`
- Команда `/setup` в группе генерирует код, привязка как для личного чата
- Веб-админка `/admin.html` (защищённая токеном)

### Технические детали

**Cloudflare Workers free tier:**
- 100,000 req/day (хватит для 100+ подписок при cron каждые 30 мин)
- KV: 100,000 read/day, 1,000 write/day, 1 GB storage — с запасом
- Cron Triggers — бесплатно, минимум интервал 1 минута

**Open-Meteo:**
- Лимит 10,000/день на IP — Worker исходит с IP Cloudflare, лимит на сам Worker
- При >200 подписок группировать запросы по соседним координатам (один fetch на цельный регион)

**Безопасность:**
- Webhook secret — Telegram отправляет `X-Telegram-Bot-Api-Secret-Token` header, проверяем в Worker
- ADMIN_USER_ID в vars (зашифровано, не в коде)
- Rate-limit на /pair endpoint (защита от brute-force кодов)
- Коды пары — короткие (6 символов), expires через 10 минут

**Хранение в KV:**
- `sub:<chat_id>` → JSON подписки
- `pair:<code>` → `chat_id` (TTL 10 минут)
- `stats:<YYYY-MM-DD>` → JSON счётчики
- `logs:<timestamp>` → строка лога (TTL 7 дней)

### Что нужно от вас (Stas)

1. Завести Cloudflare аккаунт (бесплатный) — `cloudflare.com/sign-up`
2. Установить Wrangler CLI (`npm install -g wrangler`) — это локальный деплой-инструмент
3. Создать бота через `@BotFather` в Telegram, получить токен (формат `1234567890:ABC-DEF...`)
4. Сказать мне ваш Telegram user_id (можно получить написав `@userinfobot` в TG)

**Дальше я могу:**
- Написать весь код Worker'а
- Помочь с `wrangler deploy`
- Написать UI на сайте для настройки правил
- Документировать как добавлять новые типы правил

### Объём работ суммарно

| Фаза | Часы | Польза |
|---|---|---|
| Б1 (MVP бот) | 3-4 | 30% — можно тестить через TG-команды |
| Б2 (Cron + правила) | 3-4 | 50% — реальные уведомления приходят |
| Б3 (UI правил) | 2-3 | 80% — пользователь сам настраивает на сайте |
| Б4 (Админ-команды) | 2 | 90% — управление и контроль |
| Б5 (Группы + веб-админка) | 2 | 100% |
| **Всего** | **12-15ч** | Полноценная push-система с админкой |

**MVP-вариант на 1 вечер:** Б1 + Б2 без UI — настройка через прямые команды в TG. Уведомления уже работают.
