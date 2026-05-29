/* ============================================
   UID + UTILITIES
   ============================================ */
let _uid = 0;
const uid = () => ++_uid;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const pseudo = (s) => { const x = Math.sin(s * 9999) * 10000; return ((x - Math.floor(x)) * 2 - 1); };
const hexToRgba = (hex, a) => { const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16); return `rgba(${r},${g},${b},${a})`; };

/* ============================================
   I18N — три языка: RU (default), UK, EN
   ============================================ */
const I18N = {
  ru: {
    'html.lang': 'ru',
    'header.changeCity': 'Сменить город',
    'header.editHint': 'Нажмите чтобы сменить',
    'header.sourceLabel': 'Источник данных',
    'header.sourceShort': 'Источник',
    'hero.label': 'Сейчас',
    'hero.feels': 'Ощущается как {feels}',
    'hero.feelsBeforeSunrise': 'Ощущается как {feels} · Восход в {sunrise}',
    'hero.feelsBeforeSunset':  'Ощущается как {feels} · Закат в {sunset}',
    'hero.feelsAfterSunset':   'Ощущается как {feels} · Закат был в {sunset}',
    'hero.sourceNote': 'По данным {name}',
    'hero.sourceAvg': 'усреднения 8 моделей',
    'metric.temp': 'Температура',
    'metric.feels': 'По ощущениям',
    'metric.wind': 'Ветер',
    'metric.rain': 'Осадки',
    'metric.pressure': 'Давление',
    'metric.humidity': 'Влажность',
    'metric.dewpoint': 'Точка росы',
    'metric.uv': 'УФ-индекс',
    'metric.visibility': 'Видимость',
    'metric.solar': 'Солнечная радиация',
    'metric.windSub': '{dir} · порывы {gust}',
    'metric.rainSub': '~{mm} мм · {desc}',
    'metric.rain.none': 'без осадков',
    'metric.rain.light': 'слабый дождь',
    'metric.rain.moderate': 'умеренный дождь',
    'metric.rain.heavy': 'сильный дождь',
    'metric.pressure.falling': 'Понижается ↓',
    'metric.pressure.rising': 'Растёт ↑',
    'metric.pressure.stable': 'Стабильное',
    'metric.humidity.dewPoint': 'Точка росы {t}',
    'astro.sun': 'Солнце',
    'astro.sunrise': 'Восход',
    'astro.sunset': 'Закат',
    'astro.uv': 'УФ-индекс',
    'astro.aqi': 'Качество воздуха',
    'astro.dayLen': '{h}ч {m}мин',
    'astro.photoTitle': 'Для фотографа и астронома',
    'astro.photoSub': 'Золотой / синий час, качество заката, видимость звёзд',
    'astro.goldenHour': 'Золотой час',
    'astro.blueHour': 'Синий час',
    'astro.morning': 'Утром',
    'astro.evening': 'Вечером',
    'astro.sunsetQuality': 'Закат сегодня',
    'astro.sunset.dramatic': 'Эффектный',
    'astro.sunset.normal': 'Обычный',
    'astro.sunset.dull': 'Тусклый',
    'astro.sunset.cloudHint': 'облачность {cl}%',
    'astro.stars': 'Видимость звёзд',
    'astro.stars.excellent': 'Отлично',
    'astro.stars.good': 'Хорошо',
    'astro.stars.moderate': 'Средне',
    'astro.stars.poor': 'Плохо',
    'astro.stars.veryPoor': 'Очень плохо',
    'astro.stars.hint': 'облачность {cl}% · луна {moon}%',
    'chart.title': 'Сегодня · почасовой прогноз',
    'chart.sub.avg': 'Усреднено по 8 моделям',
    'chart.sub.named': 'Прогноз {name}',
    'precip.title': 'Осадки',
    'precip.sub': 'Прогноз мм/ч на ближайшие 48 часов',
    'precip.tomorrow': 'завтра',
    'precip.legend': 'мм/ч',
    'hdm.title': 'Почасовой',
    'precipDetail.title': 'Детали осадков',
    'metric.rain.tapHint': 'Нажми чтобы посмотреть график, грозу и радар',
    'metric.wind.tapHint': 'Нажми чтобы посмотреть почасовой график ветра',
    'metric.pressure.tapHint': 'Нажми чтобы посмотреть почасовой график давления',
    'metric.humidity.tapHint': 'Нажми чтобы посмотреть почасовой график влажности',
    'radar.title': 'Радар осадков',
    'radar.sub': 'Реальные осадки за последние 2 часа + прогноз ECMWF на 72 часа',
    'radar.loading': 'Загружаем тайлы радара…',
    'radar.error': 'Не удалось получить данные радара',
    'radar.empty': 'Нет данных радара для этой зоны',
    'radar.now': 'сейчас',
    'radar.forecast': 'прогноз',
    'radar.tabLive': 'Радар · 2ч',
    'radar.tabForecast': 'Прогноз · 72ч',
    'radar.windyHint': 'Используется виджет Windy.com с моделью ECMWF',
    'search.chip': 'Найти окно',
    'search.aria': 'Найти окно погоды',
    'search.label': 'Inverse search',
    'search.title': 'Когда будет нужная погода?',
    'search.sub': 'Опиши условие — найдём ближайшее окно в 10-дневном прогнозе',
    'search.placeholder': 'например: без дождя 6 часов, тепло выше +20, ясное утро',
    'search.button': 'Найти',
    'search.popularTitle': 'Популярные запросы',
    'search.empty.title': 'В ближайшие 10 дней такого не будет',
    'search.empty.hint': 'Попробуй другое условие из подсказок',
    'search.empty.closest': 'Самое близкое: {when}',
    'search.error.parse': 'Не понял запрос. Попробуй пример из подсказок.',
    'search.results.found': 'Найдено {n} {label}',
    'search.results.label.one': 'окно',
    'search.results.label.few': 'окна',
    'search.results.label.many': 'окон',
    'search.duration.hours': '{n}ч',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'ветер {v} {unit}',
    'search.day.today': 'Сегодня',
    'search.day.tomorrow': 'Завтра',
    'search.preset.norain': 'без дождя ≥6ч',
    'search.preset.warm': 'тепло выше +20',
    'search.preset.clear': 'ясно',
    'search.preset.calm': 'тихо без ветра',
    'search.preset.run': 'пробежка',
    'search.preset.bbq': 'шашлык',
    'search.preset.carwash': 'мойка авто',
    'search.preset.storm': 'когда гроза',
    'fav.add': '+ Добавить',
    'fav.addToFav': 'В избранное',
    'fav.removeFromFav': 'Убрать из избранного',
    'city.section.favorites': 'Избранные',
    'city.section.ua': 'Города Украины',
    'city.section.world': 'Города мира',
    'city.section.searchResults': 'Результаты поиска',
    'chart.legendTemp': 'Температура',
    'chart.legendPrecip': 'Осадки',
    'sources.title': 'Источник прогноза',
    'sources.sub': 'Выбери источник или используй среднее по всем 8 моделям',
    'sources.avgTitle': 'Среднее по всем сервисам',
    'sources.avgSub': 'Агрегация 8 моделей · ансамблевый прогноз',
    'sources.avgShort': 'Среднее по 8 моделям',
    'sources.dividerOr': 'или конкретный источник',
    'sources.confHint': 'Цветная полоска под карточкой дня — согласие 8 моделей:',
    'sources.confLegend.high': 'надёжный',
    'sources.confLegend.mid': 'средний',
    'sources.confLegend.low': 'шаткий',
    'sources.confLegend.veryLow': 'большой разброс',
    'alert.heat.title': 'Сильная жара ({t}°)',
    'alert.heat.msg': 'Пейте воду каждый час, избегайте солнца с 11 до 16. Лёгкая одежда, головной убор',
    'alert.extremeHeat.title': 'Экстремальная жара ({t}°)',
    'alert.extremeHeat.msg': 'Опасно для здоровья. Ограничьте активность на улице, риск теплового удара',
    'alert.cold.title': 'Сильный мороз ({t}°)',
    'alert.cold.msg': 'Тепло одевайтесь, прикройте лицо и руки. Избегайте долгих прогулок',
    'alert.extremeCold.title': 'Экстремальный мороз ({t}°)',
    'alert.extremeCold.msg': 'Риск обморожения за 10–20 минут. Без необходимости — не выходите на улицу',
    'pullRefresh.pull': 'Потяни вниз для обновления',
    'pullRefresh.ready': 'Отпусти для обновления',
    'pullRefresh.refreshing': 'Обновляем...',
    'compare.chip': 'Сравнить',
    'compare.chipAria': 'Сравнить погоду с другим городом',
    'compare.bannerLabel': 'Сравнение',
    'compare.exitAria': 'Выйти из режима сравнения',
    'compare.pickLabel': 'Сравнить с',
    'compare.pickTitle': 'Выберите второй город',
    'compare.pickHint': 'Избранные или поиск по миру',
    'compare.hourlyTitle': 'Почасовая температура · сегодня',
    'compare.daysTitle': '7 дней',
    'compare.summary.same': 'Сегодня погода похожая в обоих городах',
    'compare.summary.warmerA': 'Сегодня теплее в {a} на {d}°',
    'compare.summary.warmerB': 'Сегодня теплее в {b} на {d}°',
    'compare.summary.drierA': '{a} суше, осадки {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} суше, осадки {pb}% vs {pa}%',
    'compare.loading': 'Загружаем погоду в {city}…',
    'compare.error': 'Не удалось загрузить погоду для {city}',
    'compare.swapA': 'Сменить первый город',
    'compare.swapB': 'Сменить второй город',
    'confidence.label': 'Согласие моделей',
    'confidence.high': 'высокое',
    'confidence.mid': 'среднее',
    'confidence.low': 'низкое',
    'confidence.veryLow': 'плохое',
    'confidence.tooltip': '{n} моделей · разброс ±{range}°C по максимальной температуре сегодня',
    'chart.spreadLabel': 'Разброс между 8 моделями',
    'windows.title': 'Окна возможностей',
    'windows.sub': 'Лучшее время для бытовых задач в ближайшие 5 дней',
    'windows.preset.jogging': 'Пробежка',
    'windows.preset.kids': 'Прогулка с ребёнком',
    'windows.preset.bbq': 'Шашлык / дача',
    'windows.preset.laundry': 'Сушить бельё',
    'windows.preset.carwash': 'Помыть машину',
    'windows.preset.watering': 'Полив огорода',
    'windows.today': 'Сегодня',
    'windows.tomorrow': 'Завтра',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'длительность {h} ч',
    'windows.noWindow': 'Нет окна в ближайшие 5 дней',
    'windows.carwash.dry': 'Сухо {h} ч подряд',
    'windows.carwash.notRec': 'Не рекомендуется · ожидается дождь',
    'climate.title': 'Климатический контекст',
    'climate.sub': 'Сегодня vs средние значения за последние 5 лет',
    'climate.tempLabel': 'Максимум дня',
    'climate.minLabel': 'Минимум ночью',
    'climate.precipLabel': 'Осадки за 5 дней',
    'climate.norm': 'норма {v}',
    'climate.warmer': '+{v}° теплее',
    'climate.colder': '−{v}° холоднее',
    'climate.aboutNorm': 'около нормы',
    'climate.wetter': '+{v}% мокрее',
    'climate.drier': '−{v}% суше',
    'climate.sparkTitle': 'В этот день в прошлые годы',
    'climate.sparkEmpty': 'Архивные данные недоступны',
    'climate.loading': 'Загрузка истории...',
    'pollen.title': 'Пыльца сегодня',
    'pollen.sub': 'Концентрация аллергенов в воздухе (частиц/м³)',
    'pollen.alder': 'Ольха',
    'pollen.birch': 'Берёза',
    'pollen.grass': 'Злаки',
    'pollen.mugwort': 'Полынь',
    'pollen.olive': 'Олива',
    'pollen.ragweed': 'Амброзия',
    'pollen.level.none': 'Не обнаружено',
    'pollen.level.low': 'Низкая',
    'pollen.level.mid': 'Средняя',
    'pollen.level.high': 'Высокая',
    'pollen.level.veryHigh': 'Очень высокая',
    'storm.title': 'Гроза-индикатор',
    'storm.sub': 'Риск грозы по часам на ближайшие 48 часов',
    'storm.noStorm': 'Гроз в ближайшие 48 часов не ожидается',
    'storm.upcoming': 'Гроза через {hours}ч',
    'storm.now': 'Гроза сейчас',
    'storm.risk0': 'нет риска',
    'storm.risk1': 'слабый',
    'storm.risk2': 'умеренный',
    'storm.risk3': 'высокий',
    'storm.risk4': 'опасный',
    'storm.desc1': 'возможны отдалённые грозы, без осадков',
    'storm.desc2': 'локальные грозы с дождём',
    'storm.desc3': 'ливни с грозами, шквалы',
    'storm.desc4': 'сильные грозы, риск града и шквалов',
    'storm.axisNow': 'сейчас',
    'storm.alertSoon': 'Гроза прогнозируется в ближайшие {hours}ч',
    'storm.alertNow': 'Гроза идёт сейчас',
    'accuracy.title': 'Точность источников',
    'accuracy.subEmpty': 'Накапливаем сравнение прогноза с фактом для вашей локации',
    'accuracy.subData': 'Среднее отклонение прогноза по последним {n} замерам',
    'accuracy.groundTruth': 'по реальным наблюдениям',
    'accuracy.colTempMax': 'Tmax',
    'accuracy.colTempMin': 'Tmin',
    'accuracy.leaderTempMax': 'по дневной T:',
    'accuracy.leaderTempMin': 'по ночной T:',
    'accuracy.leaderPrecip': 'по осадкам:',
    'accuracy.leaderAvgAll': 'Среднее точнее любой отдельной модели по всем метрикам',
    'accuracy.leaderBestAll': 'точнее всех по всем метрикам',
    'nowcast.now.until.rain':         'Дождь сейчас · до ~{time}',
    'nowcast.now.until.drizzle':      'Морось сейчас · до ~{time}',
    'nowcast.now.until.snow':         'Снег сейчас · до ~{time}',
    'nowcast.now.until.sleet':        'Мокрый снег · до ~{time}',
    'nowcast.now.until.freezing':     'Ледяной дождь · до ~{time}',
    'nowcast.now.until.storm':        'Гроза сейчас · до ~{time}',
    'nowcast.now.continues.rain':     'Дождь сейчас · продолжится ≥2ч',
    'nowcast.now.continues.drizzle':  'Морось · продолжится ≥2ч',
    'nowcast.now.continues.snow':     'Снег сейчас · продолжится ≥2ч',
    'nowcast.now.continues.sleet':    'Мокрый снег · продолжится ≥2ч',
    'nowcast.now.continues.freezing': 'Ледяной дождь · продолжится ≥2ч',
    'nowcast.now.continues.storm':    'Гроза · продолжится ≥2ч',
    'nowcast.soon.rain':              'Дождь через ~{min} мин',
    'nowcast.soon.drizzle':           'Морось через ~{min} мин',
    'nowcast.soon.snow':              'Снег через ~{min} мин',
    'nowcast.soon.sleet':             'Мокрый снег через ~{min} мин',
    'nowcast.soon.freezing':          'Ледяной дождь через ~{min} мин',
    'nowcast.soon.storm':             'Гроза через ~{min} мин',
    'nowcast.dry':                    'Без осадков 2 часа',
    'accuracy.emptyTitle': 'Накапливаем данные',
    'accuracy.emptyHint': 'Открывайте сайт раз в день — через ~неделю появится рейтинг моделей с MAE по температуре и осадкам именно для этой точки',
    'accuracy.samplesUnit': 'замеров',
    'accuracy.colModel': 'Модель',
    'accuracy.colScore': 'Композитная точность',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%осад',
    'accuracy.legendQ1': 'отлично',
    'accuracy.legendQ2': 'хорошо',
    'accuracy.legendQ3': 'средне',
    'accuracy.legendQ4': 'слабо',
    'accuracy.legendAvgWin': 'точнее всех',
    'accuracy.bestBadge': 'Самая точная модель по последним замерам',
    'footer.refresh': 'Обновить',
    'footer.speak': 'Озвучить',
    'footer.speakStop': 'Стоп',
    'footer.speakAria': 'Озвучить прогноз погоды',
    'settings.voice.label': 'Голос озвучки',
    'settings.voice.female': 'жен.',
    'settings.voice.male': 'муж.',
    'settings.voice.none': 'Голос недоступен на этом устройстве',
    'settings.voice.preview': 'Послушать пример',
    'settings.voice.previewText': 'Привет! Я озвучу прогноз погоды.',
    'settings.voice.rate.label': 'Скорость',
    'settings.voice.rate.slow': 'медленно',
    'settings.voice.rate.normal': 'норма',
    'settings.voice.rate.fast': 'быстро',
    'settings.notif.title': 'Уведомления Telegram',
    'settings.notif.intro': 'Бот @MeteoStarBot будет присылать вам уведомления о погоде по выбранным правилам.',
    'settings.notif.linkBtn': 'Связать с Telegram',
    'settings.notif.codeIntro': 'Открой @MeteoStarBot в Telegram и пришли ему этот код:',
    'settings.notif.codeCmd': 'Команда:',
    'settings.notif.timer': 'Код действителен',
    'settings.notif.openBot': 'Открыть бота',
    'settings.notif.cancel': 'Отменить',
    'settings.notif.linkedTitle': 'Связано с Telegram',
    'settings.notif.unlink': 'Отвязать',
    'settings.notif.save': 'Сохранить правила',
    'settings.notif.activeAccount': 'Активный аккаунт:',
    'settings.notif.addAccount': 'Добавить ещё один чат / группу',
    'footer.updated': 'обновлено в {time}',
    'modal.closeAria': 'Закрыть',
    'modal.day.forecast': 'Прогноз',
    'modal.day.today': 'Сегодня',
    'modal.day.dayLen': 'Долгота дня: {len}',
    'modal.day.uvScale': 'Шкала 0–11+',
    'modal.day.pm25norm': 'PM2.5 в норме',
    'modal.day.hourlyTitle': 'Почасовая температура и осадки',
    'modal.day.hoursTitle': 'Час за часом',
    'city.label': 'Выбор локации',
    'city.title': 'Где смотрим погоду?',
    'city.useMyLocation': 'Использовать моё местоположение',
    'city.geoDesc': 'Браузер спросит разрешение. Координаты не уходят на сервер',
    'city.search.placeholder': 'Поиск города по Украине...',
    'city.search.clearAria': 'Очистить',
    'city.list.popular': 'Популярные города Украины',
    'city.list.foundLocal': 'Найдено в популярных',
    'city.list.searching': 'Ищу...',
    'city.list.found': 'Найдено: {n}',
    'city.list.notFound': 'Ничего не найдено',
    'city.list.empty': 'Город не найден. Попробуй другое название.',
    'city.list.emptyForQuery': 'Города «{q}» нет в базе Open-Meteo по Украине.',
    'city.list.searchError': 'Не удалось выполнить поиск. Проверь интернет.',
    'city.list.minChars': 'Введи минимум 2 символа',
    'city.list.aria': 'Список городов',
    'city.tag.geo': '📍 по геолокации',
    'city.tag.manual': '✋ выбрано',
    'city.geoErr.denied': 'Доступ к местоположению отклонён. Разреши его в настройках браузера.',
    'city.geoErr.unavailable': 'Не удалось определить позицию (нет сигнала GPS / сети)',
    'city.geoErr.timeout': 'Время ожидания истекло',
    'city.geoErr.notSupported': 'Браузер не поддерживает геолокацию',
    'city.geoErr.generic': 'Ошибка геолокации',
    'loader.fetching': 'Загрузка прогноза...',
    'loader.refreshing': 'Обновление...',
    'apiErr.title': 'Не удалось загрузить прогноз',
    'apiErr.msg': 'Показаны демо-данные. Проверь интернет и попробуй ещё раз.',
    'apiErr.retry': 'Повторить',
    'apiErr.cors': 'Сервис погоды недоступен (CORS / сеть)',
    'apiErr.timeout': 'Превышено время ожидания ответа от Open-Meteo',
    'apiErr.http': 'Ошибка ответа сервера ({code})',
    'apiErr.parse': 'Не удалось разобрать ответ Open-Meteo',
    'settings.aria': 'Настройки',
    'settings.label': 'Настройки',
    'settings.title': 'Настройки',
    'settings.theme.title': 'Тема оформления',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Тёмная',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Светлая',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Системная',
    'settings.lang.title': 'Язык интерфейса',
    'settings.temp.title': 'Температура',
    'settings.temp.c': 'Цельсий',
    'settings.temp.f': 'Фаренгейт',
    'settings.wind.title': 'Скорость ветра',
    'settings.wind.ms.unit': 'м/с',
    'settings.wind.ms.full': 'метры/сек',
    'settings.wind.kmh.unit': 'км/ч',
    'settings.wind.kmh.full': 'километры/час',
    'settings.wind.mph.full': 'мили/час',
    'settings.wind.kn.unit': 'уз',
    'settings.wind.kn.full': 'узлы',
    'settings.pressure.title': 'Атмосферное давление',
    'settings.pressure.mmhg.unit': 'мм рт.ст.',
    'settings.pressure.mmhg.full': 'миллиметры',
    'settings.pressure.hpa.unit': 'гПа',
    'settings.pressure.hpa.full': 'гектопаскали',
    'settings.pressure.inhg.full': 'дюймы рт.ст.',
    'cond.clear': 'Ясно',
    'cond.partlyCloudy': 'Переменная облачность',
    'cond.cloudy': 'Облачно',
    'cond.overcast': 'Сплошная облачность',
    'cond.rain': 'Дождь',
    'cond.heavyRain': 'Сильный дождь',
    'cond.thunderstorm': 'Гроза',
    'cond.snow': 'Снег',
    'cond.fog': 'Туман',
    'cond.partlyCloudyWithClear': 'Пасмурно с прояснениями',
    'condDesc.day0': 'Северо-западный фронт, временами морось',
    'condDesc.day1': 'Активный циклон, сильные осадки днём',
    'condDesc.day2': 'Циклон уходит, остаточная облачность',
    'condDesc.day3': 'Антициклон, солнечный день',
    'condDesc.day4': 'Слабый ветер, переменная облачность',
    'condDesc.clear': 'Ясный солнечный день',
    'condDesc.clearWindy': 'Ясно, ветрено',
    'condDesc.partlyCloudy': 'Малая облачность',
    'condDesc.cloudy': 'Сплошная облачность',
    'condDesc.overcast': 'Пасмурно весь день',
    'condDesc.fog': 'Туманно, плохая видимость',
    'condDesc.rainLight': 'Возможны небольшие осадки',
    'condDesc.rain': 'Дождь, временами интенсивный',
    'condDesc.heavyRain': 'Ливневые осадки, ожидается значительное количество воды',
    'condDesc.snow': 'Снегопад',
    'condDesc.thunderstorm': 'Гроза, возможен ливень с грозовыми разрядами',
    'condDesc.windAddition': ', сильный {dir} ветер',
    'uvLabel.low': 'Низкий',
    'uvLabel.moderate': 'Умеренный',
    'uvLabel.high': 'Высокий',
    'uvLabel.veryHigh': 'Очень высокий',
    'uvLabel.extreme': 'Экстремальный',
    'aqiLabel.good': 'Хорошее',
    'aqiLabel.moderate': 'Умеренное',
    'aqiLabel.unhealthySens': 'Вредно для чувствительных',
    'aqiLabel.unhealthy': 'Вредно',
    'aqiLabel.veryUnhealthy': 'Очень вредно',
    'aqiLabel.hazardous': 'Опасно',
    'moon.new': 'Новолуние',
    'moon.waxingCrescent': 'Молодая луна',
    'moon.firstQuarter': 'Первая четверть',
    'moon.waxingGibbous': 'Прибывающая луна',
    'moon.full': 'Полнолуние',
    'moon.waningGibbous': 'Убывающая луна',
    'moon.lastQuarter': 'Последняя четверть',
    'moon.waningCrescent': 'Старая луна',
    'windDir.N': 'С',   'windDir.NE': 'СВ', 'windDir.E': 'В',  'windDir.SE': 'ЮВ',
    'windDir.S': 'Ю',   'windDir.SW': 'ЮЗ', 'windDir.W': 'З',  'windDir.NW': 'СЗ',
    'windDirFull.N': 'Северный', 'windDirFull.NE': 'Северо-восточный', 'windDirFull.E': 'Восточный', 'windDirFull.SE': 'Юго-восточный',
    'windDirFull.S': 'Южный', 'windDirFull.SW': 'Юго-западный', 'windDirFull.W': 'Западный', 'windDirFull.NW': 'Северо-западный',
    'day.tap': 'подробнее',
    'day.today': 'Сегодня',
    'day.short.mon': 'Пн', 'day.short.tue': 'Вт', 'day.short.wed': 'Ср', 'day.short.thu': 'Чт',
    'day.short.fri': 'Пт', 'day.short.sat': 'Сб', 'day.short.sun': 'Вс',
    'day.full.mon': 'Понедельник', 'day.full.tue': 'Вторник', 'day.full.wed': 'Среда', 'day.full.thu': 'Четверг',
    'day.full.fri': 'Пятница', 'day.full.sat': 'Суббота', 'day.full.sun': 'Воскресенье',
    'month.1': 'января', 'month.2': 'февраля', 'month.3': 'марта', 'month.4': 'апреля',
    'month.5': 'мая', 'month.6': 'июня', 'month.7': 'июля', 'month.8': 'августа',
    'month.9': 'сентября', 'month.10': 'октября', 'month.11': 'ноября', 'month.12': 'декабря'
  },

  uk: {
    'html.lang': 'uk',
    'header.changeCity': 'Змінити місто',
    'header.editHint': 'Натисніть щоб змінити',
    'header.sourceLabel': 'Джерело даних',
    'header.sourceShort': 'Джерело',
    'hero.label': 'Зараз',
    'hero.feels': 'Відчувається як {feels}',
    'hero.feelsBeforeSunrise': 'Відчувається як {feels} · Схід о {sunrise}',
    'hero.feelsBeforeSunset':  'Відчувається як {feels} · Захід о {sunset}',
    'hero.feelsAfterSunset':   'Відчувається як {feels} · Захід був о {sunset}',
    'hero.sourceNote': 'За даними {name}',
    'hero.sourceAvg': 'усереднення 8 моделей',
    'metric.temp': 'Температура',
    'metric.feels': 'Відчувається',
    'metric.wind': 'Вітер',
    'metric.rain': 'Опади',
    'metric.pressure': 'Тиск',
    'metric.humidity': 'Вологість',
    'metric.dewpoint': 'Точка роси',
    'metric.uv': 'УФ-індекс',
    'metric.visibility': 'Видимість',
    'metric.solar': 'Сонячна радіація',
    'metric.windSub': '{dir} · пориви {gust}',
    'metric.rainSub': '~{mm} мм · {desc}',
    'metric.rain.none': 'без опадів',
    'metric.rain.light': 'слабкий дощ',
    'metric.rain.moderate': 'помірний дощ',
    'metric.rain.heavy': 'сильний дощ',
    'metric.pressure.falling': 'Знижується ↓',
    'metric.pressure.rising': 'Зростає ↑',
    'metric.pressure.stable': 'Стабільний',
    'metric.humidity.dewPoint': 'Точка роси {t}',
    'astro.sun': 'Сонце',
    'astro.sunrise': 'Схід',
    'astro.sunset': 'Захід',
    'astro.uv': 'УФ-індекс',
    'astro.aqi': 'Якість повітря',
    'astro.dayLen': '{h}год {m}хв',
    'astro.photoTitle': 'Для фотографа та астронома',
    'astro.photoSub': 'Золота / синя година, якість заходу, видимість зірок',
    'astro.goldenHour': 'Золота година',
    'astro.blueHour': 'Синя година',
    'astro.morning': 'Вранці',
    'astro.evening': 'Ввечері',
    'astro.sunsetQuality': 'Захід сьогодні',
    'astro.sunset.dramatic': 'Ефектний',
    'astro.sunset.normal': 'Звичайний',
    'astro.sunset.dull': 'Тьмяний',
    'astro.sunset.cloudHint': 'хмарність {cl}%',
    'astro.stars': 'Видимість зірок',
    'astro.stars.excellent': 'Відмінно',
    'astro.stars.good': 'Добре',
    'astro.stars.moderate': 'Середньо',
    'astro.stars.poor': 'Погано',
    'astro.stars.veryPoor': 'Дуже погано',
    'astro.stars.hint': 'хмарність {cl}% · місяць {moon}%',
    'chart.title': 'Сьогодні · погодинний прогноз',
    'chart.sub.avg': 'Усереднено по 8 моделях',
    'chart.sub.named': 'Прогноз {name}',
    'precip.title': 'Опади',
    'precip.sub': 'Прогноз мм/год на найближчі 48 годин',
    'precip.tomorrow': 'завтра',
    'precip.legend': 'мм/год',
    'hdm.title': 'Погодинний',
    'precipDetail.title': 'Деталі опадів',
    'metric.rain.tapHint': 'Натисни щоб подивитися графік, грозу і радар',
    'metric.wind.tapHint': 'Натисни щоб подивитися погодинний графік вітру',
    'metric.pressure.tapHint': 'Натисни щоб подивитися погодинний графік тиску',
    'metric.humidity.tapHint': 'Натисни щоб подивитися погодинний графік вологості',
    'radar.title': 'Радар опадів',
    'radar.sub': 'Реальні опади за останні 2 години + прогноз ECMWF на 72 години',
    'radar.loading': 'Завантажуємо тайли радара…',
    'radar.error': 'Не вдалося отримати дані радара',
    'radar.empty': 'Немає даних радара для цієї зони',
    'radar.now': 'зараз',
    'radar.forecast': 'прогноз',
    'radar.tabLive': 'Радар · 2год',
    'radar.tabForecast': 'Прогноз · 72год',
    'radar.windyHint': 'Використовується віджет Windy.com з моделлю ECMWF',
    'search.chip': 'Знайти вікно',
    'search.aria': 'Знайти вікно погоди',
    'search.label': 'Inverse search',
    'search.title': 'Коли буде потрібна погода?',
    'search.sub': 'Опиши умову — знайдемо найближче вікно в 10-денному прогнозі',
    'search.placeholder': 'наприклад: без дощу 6 годин, тепло вище +20, ясний ранок',
    'search.button': 'Знайти',
    'search.popularTitle': 'Популярні запити',
    'search.empty.title': 'У найближчі 10 днів такого не буде',
    'search.empty.hint': 'Спробуй іншу умову з підказок',
    'search.empty.closest': 'Найближче: {when}',
    'search.error.parse': 'Не зрозумів запит. Спробуй приклад з підказок.',
    'search.results.found': 'Знайдено {n} {label}',
    'search.results.label.one': 'вікно',
    'search.results.label.few': 'вікна',
    'search.results.label.many': 'вікон',
    'search.duration.hours': '{n}год',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'вітер {v} {unit}',
    'search.day.today': 'Сьогодні',
    'search.day.tomorrow': 'Завтра',
    'search.preset.norain': 'без дощу ≥6год',
    'search.preset.warm': 'тепло вище +20',
    'search.preset.clear': 'ясно',
    'search.preset.calm': 'тихо без вітру',
    'search.preset.run': 'пробіжка',
    'search.preset.bbq': 'шашлик',
    'search.preset.carwash': 'мийка авто',
    'search.preset.storm': 'коли гроза',
    'fav.add': '+ Додати',
    'fav.addToFav': 'В обране',
    'fav.removeFromFav': 'Прибрати з обраного',
    'city.section.favorites': 'Обрані',
    'city.section.ua': 'Міста України',
    'city.section.world': 'Міста світу',
    'city.section.searchResults': 'Результати пошуку',
    'chart.legendTemp': 'Температура',
    'chart.legendPrecip': 'Опади',
    'sources.title': 'Джерело прогнозу',
    'sources.sub': 'Обери джерело або використовуй середнє по 8 моделях',
    'sources.avgTitle': 'Середнє по всіх сервісах',
    'sources.avgSub': 'Агрегація 8 моделей · ансамблевий прогноз',
    'sources.confHint': 'Кольорова смужка під карткою дня — згода 8 моделей:',
    'sources.confLegend.high': 'надійний',
    'sources.confLegend.mid': 'середній',
    'sources.confLegend.low': 'хиткий',
    'sources.confLegend.veryLow': 'великий розкид',
    'alert.heat.title': 'Сильна спека ({t}°)',
    'alert.heat.msg': 'Пийте воду щогодини, уникайте сонця з 11 до 16. Легкий одяг, головний убір',
    'alert.extremeHeat.title': 'Екстремальна спека ({t}°)',
    'alert.extremeHeat.msg': 'Небезпечно для здоровʼя. Обмежте активність надворі, ризик теплового удару',
    'alert.cold.title': 'Сильний мороз ({t}°)',
    'alert.cold.msg': 'Тепло вдягайтеся, прикрийте обличчя й руки. Уникайте довгих прогулянок',
    'alert.extremeCold.title': 'Екстремальний мороз ({t}°)',
    'alert.extremeCold.msg': 'Ризик обмороження за 10–20 хвилин. Без потреби — не виходьте на вулицю',
    'pullRefresh.pull': 'Потягни вниз для оновлення',
    'pullRefresh.ready': 'Відпусти для оновлення',
    'pullRefresh.refreshing': 'Оновлюємо...',
    'compare.chip': 'Порівняти',
    'compare.chipAria': 'Порівняти погоду з іншим містом',
    'compare.bannerLabel': 'Порівняння',
    'compare.exitAria': 'Вийти з режиму порівняння',
    'compare.pickLabel': 'Порівняти з',
    'compare.pickTitle': 'Виберіть друге місто',
    'compare.pickHint': 'Обрані або пошук по світу',
    'compare.hourlyTitle': 'Погодинна температура · сьогодні',
    'compare.daysTitle': '7 днів',
    'compare.summary.same': 'Сьогодні погода схожа в обох містах',
    'compare.summary.warmerA': 'Сьогодні тепліше в {a} на {d}°',
    'compare.summary.warmerB': 'Сьогодні тепліше в {b} на {d}°',
    'compare.summary.drierA': '{a} сухіше, опади {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} сухіше, опади {pb}% vs {pa}%',
    'compare.loading': 'Завантажуємо погоду в {city}…',
    'compare.error': 'Не вдалось завантажити погоду для {city}',
    'compare.swapA': 'Змінити перше місто',
    'compare.swapB': 'Змінити друге місто',
    'sources.avgShort': 'Середнє по 8 моделях',
    'sources.dividerOr': 'або конкретне джерело',
    'confidence.label': 'Згода моделей',
    'confidence.high': 'висока',
    'confidence.mid': 'середня',
    'confidence.low': 'низька',
    'confidence.veryLow': 'погана',
    'confidence.tooltip': '{n} моделей · розкид ±{range}°C по максимальній температурі сьогодні',
    'chart.spreadLabel': 'Розкид між 8 моделями',
    'windows.title': 'Вікна можливостей',
    'windows.sub': 'Найкращий час для побутових справ у найближчі 5 днів',
    'windows.preset.jogging': 'Пробіжка',
    'windows.preset.kids': 'Прогулянка з дитиною',
    'windows.preset.bbq': 'Шашлик / дача',
    'windows.preset.laundry': 'Сушити білизну',
    'windows.preset.carwash': 'Помити машину',
    'windows.preset.watering': 'Полив городу',
    'windows.today': 'Сьогодні',
    'windows.tomorrow': 'Завтра',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'тривалість {h} год',
    'windows.noWindow': 'Немає вікна у найближчі 5 днів',
    'windows.carwash.dry': 'Сухо {h} год поспіль',
    'windows.carwash.notRec': 'Не рекомендується · очікується дощ',
    'climate.title': 'Кліматичний контекст',
    'climate.sub': 'Сьогодні vs середні значення за останні 5 років',
    'climate.tempLabel': 'Максимум дня',
    'climate.minLabel': 'Мінімум вночі',
    'climate.precipLabel': 'Опади за 5 днів',
    'climate.norm': 'норма {v}',
    'climate.warmer': '+{v}° тепліше',
    'climate.colder': '−{v}° холодніше',
    'climate.aboutNorm': 'близько норми',
    'climate.wetter': '+{v}% мокріше',
    'climate.drier': '−{v}% сухіше',
    'climate.sparkTitle': 'У цей день у минулі роки',
    'climate.sparkEmpty': 'Архівні дані недоступні',
    'climate.loading': 'Завантаження історії...',
    'pollen.title': 'Пилок сьогодні',
    'pollen.sub': 'Концентрація алергенів у повітрі (частинок/м³)',
    'pollen.alder': 'Вільха',
    'pollen.birch': 'Береза',
    'pollen.grass': 'Злаки',
    'pollen.mugwort': 'Полин',
    'pollen.olive': 'Олива',
    'pollen.ragweed': 'Амброзія',
    'pollen.level.none': 'Не виявлено',
    'pollen.level.low': 'Низька',
    'pollen.level.mid': 'Середня',
    'pollen.level.high': 'Висока',
    'pollen.level.veryHigh': 'Дуже висока',
    'storm.title': 'Гроза-індикатор',
    'storm.sub': 'Ризик грози по годинах на найближчі 48 годин',
    'storm.noStorm': 'Гроз у найближчі 48 годин не очікується',
    'storm.upcoming': 'Гроза через {hours}год',
    'storm.now': 'Гроза зараз',
    'storm.risk0': 'без ризику',
    'storm.risk1': 'слабкий',
    'storm.risk2': 'помірний',
    'storm.risk3': 'високий',
    'storm.risk4': 'небезпечно',
    'storm.desc1': 'можливі віддалені грози, без опадів',
    'storm.desc2': 'локальні грози з дощем',
    'storm.desc3': 'зливи з грозами, шквали',
    'storm.desc4': 'сильні грози, ризик граду та шквалів',
    'storm.axisNow': 'зараз',
    'storm.alertSoon': 'Гроза прогнозується найближчі {hours}год',
    'storm.alertNow': 'Гроза йде зараз',
    'accuracy.title': 'Точність джерел',
    'accuracy.subEmpty': 'Накопичуємо порівняння прогнозу з фактом для вашої локації',
    'accuracy.subData': 'Середнє відхилення прогнозу за останніми {n} замірами',
    'accuracy.groundTruth': 'за реальними спостереженнями',
    'accuracy.colTempMax': 'Tmax',
    'accuracy.colTempMin': 'Tmin',
    'accuracy.leaderTempMax': 'денна T:',
    'accuracy.leaderTempMin': 'нічна T:',
    'accuracy.leaderPrecip': 'опади:',
    'accuracy.leaderAvgAll': 'Середнє точніше за будь-яку окрему модель за всіма метриками',
    'accuracy.leaderBestAll': 'точніший за всі за всіма метриками',
    'nowcast.now.until.rain':         'Дощ зараз · до ~{time}',
    'nowcast.now.until.drizzle':      'Мряка зараз · до ~{time}',
    'nowcast.now.until.snow':         'Сніг зараз · до ~{time}',
    'nowcast.now.until.sleet':        'Мокрий сніг · до ~{time}',
    'nowcast.now.until.freezing':     'Крижаний дощ · до ~{time}',
    'nowcast.now.until.storm':        'Гроза зараз · до ~{time}',
    'nowcast.now.continues.rain':     'Дощ зараз · триватиме ≥2год',
    'nowcast.now.continues.drizzle':  'Мряка · триватиме ≥2год',
    'nowcast.now.continues.snow':     'Сніг зараз · триватиме ≥2год',
    'nowcast.now.continues.sleet':    'Мокрий сніг · триватиме ≥2год',
    'nowcast.now.continues.freezing': 'Крижаний дощ · триватиме ≥2год',
    'nowcast.now.continues.storm':    'Гроза · триватиме ≥2год',
    'nowcast.soon.rain':              'Дощ через ~{min} хв',
    'nowcast.soon.drizzle':           'Мряка через ~{min} хв',
    'nowcast.soon.snow':              'Сніг через ~{min} хв',
    'nowcast.soon.sleet':             'Мокрий сніг через ~{min} хв',
    'nowcast.soon.freezing':          'Крижаний дощ через ~{min} хв',
    'nowcast.soon.storm':             'Гроза через ~{min} хв',
    'nowcast.dry':                    'Без опадів 2 години',
    'accuracy.emptyTitle': 'Накопичуємо дані',
    'accuracy.emptyHint': 'Відкривайте сайт раз на день — за ~тиждень з\'явиться рейтинг моделей з MAE за температурою та опадами саме для цієї точки',
    'accuracy.samplesUnit': 'замірів',
    'accuracy.colModel': 'Модель',
    'accuracy.colScore': 'Композитна точність',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%опад',
    'accuracy.legendQ1': 'відмінно',
    'accuracy.legendQ2': 'добре',
    'accuracy.legendQ3': 'середньо',
    'accuracy.legendQ4': 'слабко',
    'accuracy.legendAvgWin': 'точніше за всі',
    'accuracy.bestBadge': 'Найточніша модель за останніми замірами',
    'footer.refresh': 'Оновити',
    'footer.speak': 'Озвучити',
    'footer.speakStop': 'Стоп',
    'footer.speakAria': 'Озвучити прогноз погоди',
    'settings.voice.label': 'Голос озвучення',
    'settings.voice.female': 'жін.',
    'settings.voice.male': 'чол.',
    'settings.voice.none': 'Голос недоступний на цьому пристрої',
    'settings.voice.preview': 'Послухати приклад',
    'settings.voice.previewText': 'Привіт! Я озвучу прогноз погоди.',
    'settings.voice.rate.label': 'Швидкість',
    'settings.voice.rate.slow': 'повільно',
    'settings.voice.rate.normal': 'норма',
    'settings.voice.rate.fast': 'швидко',
    'footer.updated': 'оновлено о {time}',
    'modal.closeAria': 'Закрити',
    'modal.day.forecast': 'Прогноз',
    'modal.day.today': 'Сьогодні',
    'modal.day.dayLen': 'Тривалість дня: {len}',
    'modal.day.uvScale': 'Шкала 0–11+',
    'modal.day.pm25norm': 'PM2.5 в нормі',
    'modal.day.hourlyTitle': 'Погодинна температура та опади',
    'modal.day.hoursTitle': 'Година за годиною',
    'city.label': 'Вибір локації',
    'city.title': 'Де дивимось погоду?',
    'city.useMyLocation': 'Використати моє місцезнаходження',
    'city.geoDesc': 'Браузер запитає дозвіл. Координати не йдуть на сервер',
    'city.search.placeholder': 'Пошук міста по Україні...',
    'city.search.clearAria': 'Очистити',
    'city.list.popular': 'Популярні міста України',
    'city.list.foundLocal': 'Знайдено в популярних',
    'city.list.searching': 'Шукаю...',
    'city.list.found': 'Знайдено: {n}',
    'city.list.notFound': 'Нічого не знайдено',
    'city.list.empty': 'Місто не знайдене. Спробуй іншу назву.',
    'city.list.emptyForQuery': 'Міста «{q}» немає в базі Open-Meteo по Україні.',
    'city.list.searchError': 'Не вдалось виконати пошук. Перевір інтернет.',
    'city.list.minChars': 'Введи мінімум 2 символи',
    'city.list.aria': 'Список міст',
    'city.tag.geo': '📍 за геолокацією',
    'city.tag.manual': '✋ обрано',
    'city.geoErr.denied': 'Доступ до місцезнаходження відхилено. Дозволь його в налаштуваннях браузера.',
    'city.geoErr.unavailable': 'Не вдалося визначити позицію (немає сигналу GPS / мережі)',
    'city.geoErr.timeout': 'Час очікування минув',
    'city.geoErr.notSupported': 'Браузер не підтримує геолокацію',
    'city.geoErr.generic': 'Помилка геолокації',
    'loader.fetching': 'Завантаження прогнозу...',
    'loader.refreshing': 'Оновлення...',
    'apiErr.title': 'Не вдалося завантажити прогноз',
    'apiErr.msg': 'Показані демо-дані. Перевір інтернет та спробуй ще раз.',
    'apiErr.retry': 'Повторити',
    'apiErr.cors': 'Сервіс погоди недоступний (CORS / мережа)',
    'apiErr.timeout': 'Перевищено час очікування відповіді від Open-Meteo',
    'apiErr.http': 'Помилка відповіді сервера ({code})',
    'apiErr.parse': 'Не вдалося розібрати відповідь Open-Meteo',
    'settings.aria': 'Налаштування',
    'settings.label': 'Налаштування',
    'settings.title': 'Налаштування',
    'settings.theme.title': 'Оформлення',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Темна',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Світла',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Системна',
    'settings.lang.title': 'Мова інтерфейсу',
    'settings.temp.title': 'Температура',
    'settings.temp.c': 'Цельсій',
    'settings.temp.f': 'Фаренгейт',
    'settings.wind.title': 'Швидкість вітру',
    'settings.wind.ms.unit': 'м/с',
    'settings.wind.ms.full': 'метри/сек',
    'settings.wind.kmh.unit': 'км/год',
    'settings.wind.kmh.full': 'кілометри/год',
    'settings.wind.mph.full': 'милі/год',
    'settings.wind.kn.unit': 'вуз',
    'settings.wind.kn.full': 'вузли',
    'settings.pressure.title': 'Атмосферний тиск',
    'settings.pressure.mmhg.unit': 'мм рт.ст.',
    'settings.pressure.mmhg.full': 'міліметри',
    'settings.pressure.hpa.unit': 'гПа',
    'settings.pressure.hpa.full': 'гектопаскалі',
    'settings.pressure.inhg.full': 'дюйми рт.ст.',
    'cond.clear': 'Ясно',
    'cond.partlyCloudy': 'Мінлива хмарність',
    'cond.cloudy': 'Хмарно',
    'cond.overcast': 'Суцільна хмарність',
    'cond.rain': 'Дощ',
    'cond.heavyRain': 'Сильний дощ',
    'cond.thunderstorm': 'Гроза',
    'cond.snow': 'Сніг',
    'cond.fog': 'Туман',
    'cond.partlyCloudyWithClear': 'Хмарно з проясненнями',
    'condDesc.day0': 'Північно-західний фронт, інколи мряка',
    'condDesc.day1': 'Активний циклон, сильні опади вдень',
    'condDesc.day2': 'Циклон відходить, залишкова хмарність',
    'condDesc.day3': 'Антициклон, сонячний день',
    'condDesc.day4': 'Слабкий вітер, мінлива хмарність',
    'condDesc.clear': 'Ясний сонячний день',
    'condDesc.clearWindy': 'Ясно, вітряно',
    'condDesc.partlyCloudy': 'Невелика хмарність',
    'condDesc.cloudy': 'Суцільна хмарність',
    'condDesc.overcast': 'Похмуро увесь день',
    'condDesc.fog': 'Туманно, погана видимість',
    'condDesc.rainLight': 'Можливі невеликі опади',
    'condDesc.rain': 'Дощ, часом інтенсивний',
    'condDesc.heavyRain': 'Зливові опади, очікується значна кількість води',
    'condDesc.snow': 'Снігопад',
    'condDesc.thunderstorm': 'Гроза, можлива злива з блискавками',
    'condDesc.windAddition': ', сильний {dir} вітер',
    'uvLabel.low': 'Низький',
    'uvLabel.moderate': 'Помірний',
    'uvLabel.high': 'Високий',
    'uvLabel.veryHigh': 'Дуже високий',
    'uvLabel.extreme': 'Екстремальний',
    'aqiLabel.good': 'Добре',
    'aqiLabel.moderate': 'Помірне',
    'aqiLabel.unhealthySens': 'Шкідливе для чутливих',
    'aqiLabel.unhealthy': 'Шкідливе',
    'aqiLabel.veryUnhealthy': 'Дуже шкідливе',
    'aqiLabel.hazardous': 'Небезпечне',
    'moon.new': 'Молодик',
    'moon.waxingCrescent': 'Молодий місяць',
    'moon.firstQuarter': 'Перша чверть',
    'moon.waxingGibbous': 'Зростаючий місяць',
    'moon.full': 'Повня',
    'moon.waningGibbous': 'Спадний місяць',
    'moon.lastQuarter': 'Остання чверть',
    'moon.waningCrescent': 'Старий місяць',
    'windDir.N': 'Пн',  'windDir.NE': 'ПнСх', 'windDir.E': 'Сх', 'windDir.SE': 'ПдСх',
    'windDir.S': 'Пд',  'windDir.SW': 'ПдЗх', 'windDir.W': 'Зх', 'windDir.NW': 'ПнЗх',
    'windDirFull.N': 'Північний', 'windDirFull.NE': 'Північно-східний', 'windDirFull.E': 'Східний', 'windDirFull.SE': 'Південно-східний',
    'windDirFull.S': 'Південний', 'windDirFull.SW': 'Південно-західний', 'windDirFull.W': 'Західний', 'windDirFull.NW': 'Північно-західний',
    'day.tap': 'детальніше',
    'day.today': 'Сьогодні',
    'day.short.mon': 'Пн', 'day.short.tue': 'Вт', 'day.short.wed': 'Ср', 'day.short.thu': 'Чт',
    'day.short.fri': 'Пт', 'day.short.sat': 'Сб', 'day.short.sun': 'Нд',
    'day.full.mon': 'Понеділок', 'day.full.tue': 'Вівторок', 'day.full.wed': 'Середа', 'day.full.thu': 'Четвер',
    'day.full.fri': 'Пʼятниця', 'day.full.sat': 'Субота', 'day.full.sun': 'Неділя',
    'month.1': 'січня', 'month.2': 'лютого', 'month.3': 'березня', 'month.4': 'квітня',
    'month.5': 'травня', 'month.6': 'червня', 'month.7': 'липня', 'month.8': 'серпня',
    'month.9': 'вересня', 'month.10': 'жовтня', 'month.11': 'листопада', 'month.12': 'грудня'
  },

  en: {
    'html.lang': 'en',
    'header.changeCity': 'Change city',
    'header.editHint': 'Click to change',
    'header.sourceLabel': 'Data source',
    'header.sourceShort': 'Source',
    'hero.label': 'Now',
    'hero.feels': 'Feels like {feels}',
    'hero.feelsBeforeSunrise': 'Feels like {feels} · Sunrise at {sunrise}',
    'hero.feelsBeforeSunset':  'Feels like {feels} · Sunset at {sunset}',
    'hero.feelsAfterSunset':   'Feels like {feels} · Sunset was at {sunset}',
    'hero.sourceNote': 'Source: {name}',
    'hero.sourceAvg': 'average of 8 models',
    'metric.temp': 'Temperature',
    'metric.feels': 'Feels like',
    'metric.wind': 'Wind',
    'metric.rain': 'Precipitation',
    'metric.pressure': 'Pressure',
    'metric.humidity': 'Humidity',
    'metric.dewpoint': 'Dew point',
    'metric.uv': 'UV index',
    'metric.visibility': 'Visibility',
    'metric.solar': 'Solar radiation',
    'metric.windSub': '{dir} · gusts {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'no precipitation',
    'metric.rain.light': 'light rain',
    'metric.rain.moderate': 'moderate rain',
    'metric.rain.heavy': 'heavy rain',
    'metric.pressure.falling': 'Falling ↓',
    'metric.pressure.rising': 'Rising ↑',
    'metric.pressure.stable': 'Stable',
    'metric.humidity.dewPoint': 'Dew point {t}',
    'astro.sun': 'Sun',
    'astro.sunrise': 'Sunrise',
    'astro.sunset': 'Sunset',
    'astro.uv': 'UV index',
    'astro.aqi': 'Air quality',
    'astro.dayLen': '{h}h {m}min',
    'astro.photoTitle': 'For photo & stargazing',
    'astro.photoSub': 'Golden / blue hour, sunset quality, star visibility',
    'astro.goldenHour': 'Golden hour',
    'astro.blueHour': 'Blue hour',
    'astro.morning': 'Morning',
    'astro.evening': 'Evening',
    'astro.sunsetQuality': 'Sunset today',
    'astro.sunset.dramatic': 'Dramatic',
    'astro.sunset.normal': 'Normal',
    'astro.sunset.dull': 'Dull',
    'astro.sunset.cloudHint': 'clouds {cl}%',
    'astro.stars': 'Star visibility',
    'astro.stars.excellent': 'Excellent',
    'astro.stars.good': 'Good',
    'astro.stars.moderate': 'Moderate',
    'astro.stars.poor': 'Poor',
    'astro.stars.veryPoor': 'Very poor',
    'astro.stars.hint': 'clouds {cl}% · moon {moon}%',
    'chart.title': 'Today · hourly forecast',
    'chart.sub.avg': 'Averaged across 8 models',
    'chart.sub.named': 'Forecast by {name}',
    'precip.title': 'Precipitation',
    'precip.sub': 'Forecast mm/h for next 48 hours',
    'precip.tomorrow': 'tomorrow',
    'precip.legend': 'mm/h',
    'hdm.title': 'Hourly',
    'precipDetail.title': 'Precipitation details',
    'metric.rain.tapHint': 'Tap to see chart, thunderstorm risk and radar',
    'metric.wind.tapHint': 'Tap to see hourly wind chart',
    'metric.pressure.tapHint': 'Tap to see hourly pressure chart',
    'metric.humidity.tapHint': 'Tap to see hourly humidity chart',
    'radar.title': 'Precipitation radar',
    'radar.sub': 'Live precipitation last 2 hours + ECMWF forecast for next 72 hours',
    'radar.loading': 'Loading radar tiles…',
    'radar.error': 'Failed to load radar data',
    'radar.empty': 'No radar data for this area',
    'radar.now': 'now',
    'radar.forecast': 'forecast',
    'radar.tabLive': 'Radar · 2h',
    'radar.tabForecast': 'Forecast · 72h',
    'radar.windyHint': 'Powered by Windy.com widget with ECMWF model',
    'search.chip': 'Find window',
    'search.aria': 'Find weather window',
    'search.label': 'Inverse search',
    'search.title': 'When will the right weather come?',
    'search.sub': 'Describe the condition — we will find the nearest window in the 10-day forecast',
    'search.placeholder': 'e.g. no rain for 6 hours, warm above +20, clear morning',
    'search.button': 'Find',
    'search.popularTitle': 'Popular queries',
    'search.empty.title': 'No such window in the next 10 days',
    'search.empty.hint': 'Try a different condition from the suggestions',
    'search.empty.closest': 'Closest: {when}',
    'search.error.parse': 'Could not parse the query. Try an example from the suggestions.',
    'search.results.found': 'Found {n} {label}',
    'search.results.label.one': 'window',
    'search.results.label.few': 'windows',
    'search.results.label.many': 'windows',
    'search.duration.hours': '{n}h',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'wind {v} {unit}',
    'search.day.today': 'Today',
    'search.day.tomorrow': 'Tomorrow',
    'search.preset.norain': 'no rain ≥6h',
    'search.preset.warm': 'warm above +20',
    'search.preset.clear': 'clear sky',
    'search.preset.calm': 'calm no wind',
    'search.preset.run': 'good for a run',
    'search.preset.bbq': 'bbq weather',
    'search.preset.carwash': 'car wash',
    'search.preset.storm': 'when thunderstorm',
    'fav.add': '+ Add city',
    'fav.addToFav': 'Add to favorites',
    'fav.removeFromFav': 'Remove from favorites',
    'city.section.favorites': 'Favorites',
    'city.section.ua': 'Ukrainian cities',
    'city.section.world': 'World cities',
    'city.section.searchResults': 'Search results',
    'chart.legendTemp': 'Temperature',
    'chart.legendPrecip': 'Precipitation',
    'sources.title': 'Forecast source',
    'sources.sub': 'Pick a source or use the average of all 8 models',
    'sources.avgTitle': 'Average of all services',
    'sources.avgSub': 'Aggregation of 8 models · ensemble forecast',
    'sources.confHint': 'Coloured bar under the day card — agreement of 8 models:',
    'sources.confLegend.high': 'reliable',
    'sources.confLegend.mid': 'medium',
    'sources.confLegend.low': 'shaky',
    'sources.confLegend.veryLow': 'large spread',
    'alert.heat.title': 'Severe heat ({t}°)',
    'alert.heat.msg': 'Drink water every hour, avoid the sun from 11 to 16. Light clothing, hat',
    'alert.extremeHeat.title': 'Extreme heat ({t}°)',
    'alert.extremeHeat.msg': 'Health hazard. Limit outdoor activity, risk of heatstroke',
    'alert.cold.title': 'Severe frost ({t}°)',
    'alert.cold.msg': 'Dress warmly, cover your face and hands. Avoid long walks',
    'alert.extremeCold.title': 'Extreme frost ({t}°)',
    'alert.extremeCold.msg': 'Frostbite risk in 10–20 min. Stay indoors unless necessary',
    'pullRefresh.pull': 'Pull down to refresh',
    'pullRefresh.ready': 'Release to refresh',
    'pullRefresh.refreshing': 'Refreshing...',
    'compare.chip': 'Compare',
    'compare.chipAria': 'Compare weather with another city',
    'compare.bannerLabel': 'Comparison',
    'compare.exitAria': 'Exit comparison mode',
    'compare.pickLabel': 'Compare with',
    'compare.pickTitle': 'Pick second city',
    'compare.pickHint': 'Favourites or worldwide search',
    'compare.hourlyTitle': 'Hourly temperature · today',
    'compare.daysTitle': '7 days',
    'compare.summary.same': 'Similar weather in both cities today',
    'compare.summary.warmerA': 'Warmer in {a} by {d}° today',
    'compare.summary.warmerB': 'Warmer in {b} by {d}° today',
    'compare.summary.drierA': '{a} is drier, precip {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} is drier, precip {pb}% vs {pa}%',
    'compare.loading': 'Loading weather for {city}…',
    'compare.error': 'Failed to load weather for {city}',
    'compare.swapA': 'Change first city',
    'compare.swapB': 'Change second city',
    'sources.avgShort': 'Average of 8 models',
    'sources.dividerOr': 'or a specific source',
    'confidence.label': 'Model agreement',
    'confidence.high': 'high',
    'confidence.mid': 'moderate',
    'confidence.low': 'low',
    'confidence.veryLow': 'poor',
    'confidence.tooltip': '{n} models · spread ±{range}°C on today\'s max temperature',
    'chart.spreadLabel': 'Spread across 8 models',
    'windows.title': 'Activity windows',
    'windows.sub': 'Best time for everyday tasks in the next 5 days',
    'windows.preset.jogging': 'Jogging',
    'windows.preset.kids': 'Walk with a child',
    'windows.preset.bbq': 'BBQ / outdoors',
    'windows.preset.laundry': 'Dry laundry outside',
    'windows.preset.carwash': 'Wash the car',
    'windows.preset.watering': 'Watering plants',
    'windows.today': 'Today',
    'windows.tomorrow': 'Tomorrow',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'duration {h} h',
    'windows.noWindow': 'No suitable window in the next 5 days',
    'windows.carwash.dry': 'Dry for {h} h straight',
    'windows.carwash.notRec': 'Not recommended · rain expected',
    'climate.title': 'Climate context',
    'climate.sub': 'Today vs 5-year average for this date',
    'climate.tempLabel': 'Daily max',
    'climate.minLabel': 'Overnight low',
    'climate.precipLabel': 'Precipitation in 5 days',
    'climate.norm': 'normal {v}',
    'climate.warmer': '+{v}° warmer',
    'climate.colder': '−{v}° colder',
    'climate.aboutNorm': 'about normal',
    'climate.wetter': '+{v}% wetter',
    'climate.drier': '−{v}% drier',
    'climate.sparkTitle': 'On this date in past years',
    'climate.sparkEmpty': 'Archive data unavailable',
    'climate.loading': 'Loading history...',
    'pollen.title': 'Pollen today',
    'pollen.sub': 'Allergen concentration in the air (grains/m³)',
    'pollen.alder': 'Alder',
    'pollen.birch': 'Birch',
    'pollen.grass': 'Grass',
    'pollen.mugwort': 'Mugwort',
    'pollen.olive': 'Olive',
    'pollen.ragweed': 'Ragweed',
    'pollen.level.none': 'Not detected',
    'pollen.level.low': 'Low',
    'pollen.level.mid': 'Moderate',
    'pollen.level.high': 'High',
    'pollen.level.veryHigh': 'Very high',
    'storm.title': 'Storm tracker',
    'storm.sub': 'Hourly thunderstorm risk for the next 48 hours',
    'storm.noStorm': 'No storms expected in the next 48 hours',
    'storm.upcoming': 'Storm in {hours}h',
    'storm.now': 'Storm now',
    'storm.risk0': 'no risk',
    'storm.risk1': 'low',
    'storm.risk2': 'moderate',
    'storm.risk3': 'high',
    'storm.risk4': 'dangerous',
    'storm.desc1': 'distant thunder possible, no rain',
    'storm.desc2': 'localized thunderstorms with rain',
    'storm.desc3': 'heavy rain with thunder, squalls',
    'storm.desc4': 'severe storms, risk of hail and gusts',
    'storm.axisNow': 'now',
    'storm.alertSoon': 'Storm expected within {hours}h',
    'storm.alertNow': 'Storm in progress now',
    'accuracy.title': 'Source accuracy',
    'accuracy.subEmpty': 'Collecting forecast-vs-actual data for your location',
    'accuracy.subData': 'Mean absolute error across last {n} comparisons',
    'accuracy.groundTruth': 'with real observations',
    'accuracy.colTempMax': 'Tmax',
    'accuracy.colTempMin': 'Tmin',
    'accuracy.leaderTempMax': 'day T:',
    'accuracy.leaderTempMin': 'night T:',
    'accuracy.leaderPrecip': 'precip:',
    'accuracy.leaderAvgAll': 'Average beats any single model on all metrics',
    'accuracy.leaderBestAll': 'is the most accurate on all metrics',
    'nowcast.now.until.rain':         'Rain now · until ~{time}',
    'nowcast.now.until.drizzle':      'Drizzle now · until ~{time}',
    'nowcast.now.until.snow':         'Snow now · until ~{time}',
    'nowcast.now.until.sleet':        'Sleet now · until ~{time}',
    'nowcast.now.until.freezing':     'Freezing rain · until ~{time}',
    'nowcast.now.until.storm':        'Storm now · until ~{time}',
    'nowcast.now.continues.rain':     'Rain now · 2h+ continuous',
    'nowcast.now.continues.drizzle':  'Drizzle · 2h+ continuous',
    'nowcast.now.continues.snow':     'Snow now · 2h+ continuous',
    'nowcast.now.continues.sleet':    'Sleet · 2h+ continuous',
    'nowcast.now.continues.freezing': 'Freezing rain · 2h+ continuous',
    'nowcast.now.continues.storm':    'Storm · 2h+ continuous',
    'nowcast.soon.rain':              'Rain in ~{min} min',
    'nowcast.soon.drizzle':           'Drizzle in ~{min} min',
    'nowcast.soon.snow':              'Snow in ~{min} min',
    'nowcast.soon.sleet':             'Sleet in ~{min} min',
    'nowcast.soon.freezing':          'Freezing rain in ~{min} min',
    'nowcast.soon.storm':             'Storm in ~{min} min',
    'nowcast.dry':                    'Dry next 2 hours',
    'accuracy.emptyTitle': 'Collecting data',
    'accuracy.emptyHint': 'Open the site once a day — after ~a week you\'ll see a model ranking with MAE for temperature and precipitation specific to this location',
    'accuracy.samplesUnit': 'samples',
    'accuracy.colModel': 'Model',
    'accuracy.colScore': 'Composite accuracy',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%precip',
    'accuracy.legendQ1': 'excellent',
    'accuracy.legendQ2': 'good',
    'accuracy.legendQ3': 'fair',
    'accuracy.legendQ4': 'poor',
    'accuracy.legendAvgWin': 'best of all',
    'accuracy.bestBadge': 'Most accurate model by recent samples',
    'footer.refresh': 'Refresh',
    'footer.speak': 'Speak',
    'footer.speakStop': 'Stop',
    'footer.speakAria': 'Speak weather forecast aloud',
    'settings.voice.label': 'Voice',
    'settings.voice.female': 'female',
    'settings.voice.male': 'male',
    'settings.voice.none': 'Voice not available on this device',
    'settings.voice.preview': 'Preview',
    'settings.voice.previewText': 'Hello! I will read the weather forecast.',
    'settings.voice.rate.label': 'Speed',
    'settings.voice.rate.slow': 'slow',
    'settings.voice.rate.normal': 'normal',
    'settings.voice.rate.fast': 'fast',
    'footer.updated': 'updated at {time}',
    'modal.closeAria': 'Close',
    'modal.day.forecast': 'Forecast',
    'modal.day.today': 'Today',
    'modal.day.dayLen': 'Day length: {len}',
    'modal.day.uvScale': 'Scale 0-11+',
    'modal.day.pm25norm': 'PM2.5 normal',
    'modal.day.hourlyTitle': 'Hourly temperature and precipitation',
    'modal.day.hoursTitle': 'Hour by hour',
    'city.label': 'Location',
    'city.title': 'Where to check weather?',
    'city.useMyLocation': 'Use my location',
    'city.geoDesc': 'Browser will ask for permission. Coordinates stay in your browser',
    'city.search.placeholder': 'Search city in Ukraine...',
    'city.search.clearAria': 'Clear',
    'city.list.popular': 'Popular Ukrainian cities',
    'city.list.foundLocal': 'Found in popular',
    'city.list.searching': 'Searching...',
    'city.list.found': 'Found: {n}',
    'city.list.notFound': 'Nothing found',
    'city.list.empty': 'City not found. Try a different name.',
    'city.list.emptyForQuery': 'City "{q}" not found in Open-Meteo Ukraine database.',
    'city.list.searchError': 'Search failed. Check your internet connection.',
    'city.list.minChars': 'Enter at least 2 characters',
    'city.list.aria': 'List of cities',
    'city.tag.geo': '📍 by geolocation',
    'city.tag.manual': '✋ chosen',
    'city.geoErr.denied': 'Location access denied. Allow it in browser settings.',
    'city.geoErr.unavailable': 'Position unavailable (no GPS/network signal)',
    'city.geoErr.timeout': 'Request timed out',
    'city.geoErr.notSupported': "Browser doesn't support geolocation",
    'city.geoErr.generic': 'Geolocation error',
    'loader.fetching': 'Loading forecast...',
    'loader.refreshing': 'Refreshing...',
    'apiErr.title': 'Forecast load failed',
    'apiErr.msg': 'Showing demo data. Check your connection and try again.',
    'apiErr.retry': 'Retry',
    'apiErr.cors': 'Weather service unreachable (CORS / network)',
    'apiErr.timeout': 'Open-Meteo response timed out',
    'apiErr.http': 'Server response error ({code})',
    'apiErr.parse': 'Failed to parse Open-Meteo response',
    'settings.aria': 'Settings',
    'settings.label': 'Settings',
    'settings.title': 'Settings',
    'settings.theme.title': 'Appearance',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Dark',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Light',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'System',
    'settings.lang.title': 'Interface language',
    'settings.temp.title': 'Temperature',
    'settings.temp.c': 'Celsius',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Wind speed',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'meters/sec',
    'settings.wind.kmh.unit': 'km/h',
    'settings.wind.kmh.full': 'kilometers/hour',
    'settings.wind.mph.full': 'miles/hour',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'knots',
    'settings.pressure.title': 'Atmospheric pressure',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'millimeters Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'hectopascals',
    'settings.pressure.inhg.full': 'inches Hg',
    'cond.clear': 'Clear',
    'cond.partlyCloudy': 'Partly cloudy',
    'cond.cloudy': 'Cloudy',
    'cond.overcast': 'Overcast',
    'cond.rain': 'Rain',
    'cond.heavyRain': 'Heavy rain',
    'cond.thunderstorm': 'Thunderstorm',
    'cond.snow': 'Snow',
    'cond.fog': 'Fog',
    'cond.partlyCloudyWithClear': 'Cloudy with clear spells',
    'condDesc.day0': 'NW front, occasional drizzle',
    'condDesc.day1': 'Active cyclone, heavy precipitation in afternoon',
    'condDesc.day2': 'Cyclone leaving, residual clouds',
    'condDesc.day3': 'Anticyclone, sunny day',
    'condDesc.day4': 'Light wind, variable clouds',
    'condDesc.clear': 'Clear sunny day',
    'condDesc.clearWindy': 'Clear and windy',
    'condDesc.partlyCloudy': 'Partly cloudy',
    'condDesc.cloudy': 'Mostly cloudy',
    'condDesc.overcast': 'Overcast all day',
    'condDesc.fog': 'Foggy, poor visibility',
    'condDesc.rainLight': 'Light precipitation possible',
    'condDesc.rain': 'Rain, occasionally intense',
    'condDesc.heavyRain': 'Heavy showers, significant rainfall expected',
    'condDesc.snow': 'Snowfall',
    'condDesc.thunderstorm': 'Thunderstorm with lightning possible',
    'condDesc.windAddition': ', strong {dir} wind',
    'uvLabel.low': 'Low',
    'uvLabel.moderate': 'Moderate',
    'uvLabel.high': 'High',
    'uvLabel.veryHigh': 'Very high',
    'uvLabel.extreme': 'Extreme',
    'aqiLabel.good': 'Good',
    'aqiLabel.moderate': 'Moderate',
    'aqiLabel.unhealthySens': 'Unhealthy for sensitive',
    'aqiLabel.unhealthy': 'Unhealthy',
    'aqiLabel.veryUnhealthy': 'Very unhealthy',
    'aqiLabel.hazardous': 'Hazardous',
    'moon.new': 'New moon',
    'moon.waxingCrescent': 'Waxing crescent',
    'moon.firstQuarter': 'First quarter',
    'moon.waxingGibbous': 'Waxing gibbous',
    'moon.full': 'Full moon',
    'moon.waningGibbous': 'Waning gibbous',
    'moon.lastQuarter': 'Last quarter',
    'moon.waningCrescent': 'Waning crescent',
    'windDir.N': 'N',   'windDir.NE': 'NE', 'windDir.E': 'E',  'windDir.SE': 'SE',
    'windDir.S': 'S',   'windDir.SW': 'SW', 'windDir.W': 'W',  'windDir.NW': 'NW',
    'windDirFull.N': 'Northern', 'windDirFull.NE': 'North-eastern', 'windDirFull.E': 'Eastern', 'windDirFull.SE': 'South-eastern',
    'windDirFull.S': 'Southern', 'windDirFull.SW': 'South-western', 'windDirFull.W': 'Western', 'windDirFull.NW': 'North-western',
    'day.tap': 'details',
    'day.today': 'Today',
    'day.short.mon': 'Mon', 'day.short.tue': 'Tue', 'day.short.wed': 'Wed', 'day.short.thu': 'Thu',
    'day.short.fri': 'Fri', 'day.short.sat': 'Sat', 'day.short.sun': 'Sun',
    'day.full.mon': 'Monday', 'day.full.tue': 'Tuesday', 'day.full.wed': 'Wednesday', 'day.full.thu': 'Thursday',
    'day.full.fri': 'Friday', 'day.full.sat': 'Saturday', 'day.full.sun': 'Sunday',
    'month.1': 'January', 'month.2': 'February', 'month.3': 'March', 'month.4': 'April',
    'month.5': 'May', 'month.6': 'June', 'month.7': 'July', 'month.8': 'August',
    'month.9': 'September', 'month.10': 'October', 'month.11': 'November', 'month.12': 'December'
  },
  de: {
    'html.lang': 'de',
    'header.changeCity': 'Stadt wechseln',
    'header.editHint': 'Klicken zum Ändern',
    'header.sourceLabel': 'Datenquelle',
    'header.sourceShort': 'Quelle',
    'hero.label': 'Jetzt',
    'hero.feels': 'Gefühlt {feels}',
    'hero.feelsBeforeSunrise': 'Gefühlt {feels} · Sonnenaufgang um {sunrise}',
    'hero.feelsBeforeSunset':  'Gefühlt {feels} · Sonnenuntergang um {sunset}',
    'hero.feelsAfterSunset':   'Gefühlt {feels} · Sonnenuntergang war um {sunset}',
    'hero.sourceNote': 'Quelle: {name}',
    'hero.sourceAvg': 'Mittel aus 8 Modellen',
    'metric.temp': 'Temperatur',
    'metric.feels': 'Gefühlt',
    'metric.wind': 'Wind',
    'metric.rain': 'Niederschlag',
    'metric.pressure': 'Luftdruck',
    'metric.humidity': 'Luftfeuchte',
    'metric.dewpoint': 'Taupunkt',
    'metric.uv': 'UV-Index',
    'metric.visibility': 'Sichtweite',
    'metric.solar': 'Sonnenstrahlung',
    'metric.windSub': '{dir} · Böen {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'kein Niederschlag',
    'metric.rain.light': 'leichter Regen',
    'metric.rain.moderate': 'mäßiger Regen',
    'metric.rain.heavy': 'starker Regen',
    'metric.pressure.falling': 'Fällt ↓',
    'metric.pressure.rising': 'Steigt ↑',
    'metric.pressure.stable': 'Stabil',
    'metric.humidity.dewPoint': 'Taupunkt {t}',
    'astro.sun': 'Sonne',
    'astro.sunrise': 'Aufgang',
    'astro.sunset': 'Untergang',
    'astro.uv': 'UV-Index',
    'astro.aqi': 'Luftqualität',
    'astro.dayLen': '{h} Std. {m} Min.',
    'astro.photoTitle': 'Für Foto & Astronomie',
    'astro.photoSub': 'Goldene / blaue Stunde, Sonnenuntergang, Sternsicht',
    'astro.goldenHour': 'Goldene Stunde',
    'astro.blueHour': 'Blaue Stunde',
    'astro.morning': 'Morgens',
    'astro.evening': 'Abends',
    'astro.sunsetQuality': 'Sonnenuntergang heute',
    'astro.sunset.dramatic': 'Spektakulär',
    'astro.sunset.normal': 'Normal',
    'astro.sunset.dull': 'Matt',
    'astro.sunset.cloudHint': 'Wolken {cl}%',
    'astro.stars': 'Sternsicht',
    'astro.stars.excellent': 'Ausgezeichnet',
    'astro.stars.good': 'Gut',
    'astro.stars.moderate': 'Mäßig',
    'astro.stars.poor': 'Schlecht',
    'astro.stars.veryPoor': 'Sehr schlecht',
    'astro.stars.hint': 'Wolken {cl}% · Mond {moon}%',
    'chart.title': 'Heute · stündliche Prognose',
    'chart.sub.avg': 'Mittel über 8 Modelle',
    'chart.sub.named': 'Prognose von {name}',
    'precip.title': 'Niederschlag',
    'precip.sub': 'Prognose mm/h für die nächsten 48 Stunden',
    'precip.tomorrow': 'morgen',
    'precip.legend': 'mm/h',
    'hdm.title': 'Stündlich',
    'precipDetail.title': 'Niederschlag im Detail',
    'metric.rain.tapHint': 'Tippen für Diagramm, Gewitterrisiko und Radar',
    'metric.wind.tapHint': 'Tippen für stündliches Wind-Diagramm',
    'metric.pressure.tapHint': 'Tippen für stündliches Druck-Diagramm',
    'metric.humidity.tapHint': 'Tippen für stündliches Feuchte-Diagramm',
    'radar.title': 'Niederschlagsradar',
    'radar.sub': 'Live-Niederschlag der letzten 2 Stunden + ECMWF-Vorhersage für die nächsten 72 Stunden',
    'radar.loading': 'Radarkacheln werden geladen…',
    'radar.error': 'Radardaten konnten nicht geladen werden',
    'radar.empty': 'Keine Radardaten für dieses Gebiet',
    'radar.now': 'jetzt',
    'radar.forecast': 'Prognose',
    'radar.tabLive': 'Radar · 2 Std',
    'radar.tabForecast': 'Prognose · 72 Std',
    'radar.windyHint': 'Bereitgestellt durch Windy.com mit dem ECMWF-Modell',
    'search.chip': 'Fenster finden',
    'search.aria': 'Wetterfenster finden',
    'search.label': 'Umgekehrte Suche',
    'search.title': 'Wann kommt das passende Wetter?',
    'search.sub': 'Beschreibe die Bedingung — wir finden das nächste Fenster in der 10-Tage-Prognose',
    'search.placeholder': 'z. B. 6 Std. ohne Regen, warm über +20, klarer Morgen',
    'search.button': 'Finden',
    'search.popularTitle': 'Beliebte Anfragen',
    'search.empty.title': 'Kein solches Fenster in den nächsten 10 Tagen',
    'search.empty.hint': 'Probiere eine andere Bedingung aus den Vorschlägen',
    'search.empty.closest': 'Am nächsten: {when}',
    'search.error.parse': 'Anfrage konnte nicht erkannt werden. Versuche ein Beispiel aus den Vorschlägen.',
    'search.results.found': '{n} {label} gefunden',
    'search.results.label.one': 'Fenster',
    'search.results.label.few': 'Fenster',
    'search.results.label.many': 'Fenster',
    'search.duration.hours': '{n} Std.',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'Wind {v} {unit}',
    'search.day.today': 'Heute',
    'search.day.tomorrow': 'Morgen',
    'search.preset.norain': 'kein Regen ≥6 Std.',
    'search.preset.warm': 'warm über +20',
    'search.preset.clear': 'klarer Himmel',
    'search.preset.calm': 'windstill',
    'search.preset.run': 'gut zum Laufen',
    'search.preset.bbq': 'Grillwetter',
    'search.preset.carwash': 'Autowäsche',
    'search.preset.storm': 'wann Gewitter',
    'fav.add': '+ Stadt hinzufügen',
    'fav.addToFav': 'Zu Favoriten',
    'fav.removeFromFav': 'Aus Favoriten entfernen',
    'city.section.favorites': 'Favoriten',
    'city.section.ua': 'Ukrainische Städte',
    'city.section.world': 'Weltweite Städte',
    'city.section.searchResults': 'Suchergebnisse',
    'chart.legendTemp': 'Temperatur',
    'chart.legendPrecip': 'Niederschlag',
    'sources.title': 'Prognosequelle',
    'sources.sub': 'Wähle eine Quelle oder das Mittel aller 8 Modelle',
    'sources.avgTitle': 'Mittel aller Dienste',
    'sources.avgSub': 'Aggregation von 8 Modellen · Ensemble-Prognose',
    'sources.confHint': 'Farbiger Balken unter der Tageskarte — Übereinstimmung der 8 Modelle:',
    'sources.confLegend.high': 'zuverlässig',
    'sources.confLegend.mid': 'mittel',
    'sources.confLegend.low': 'wackelig',
    'sources.confLegend.veryLow': 'große Streuung',
    'alert.heat.title': 'Starke Hitze ({t}°)',
    'alert.heat.msg': 'Stündlich Wasser trinken, Sonne von 11 bis 16 meiden. Leichte Kleidung, Hut',
    'alert.extremeHeat.title': 'Extreme Hitze ({t}°)',
    'alert.extremeHeat.msg': 'Gesundheitsgefahr. Aktivität im Freien einschränken, Hitzschlaggefahr',
    'alert.cold.title': 'Starker Frost ({t}°)',
    'alert.cold.msg': 'Warm anziehen, Gesicht und Hände bedecken. Längere Spaziergänge vermeiden',
    'alert.extremeCold.title': 'Extremer Frost ({t}°)',
    'alert.extremeCold.msg': 'Erfrierungsgefahr in 10–20 Min. Nur bei Bedarf rausgehen',
    'pullRefresh.pull': 'Zum Aktualisieren ziehen',
    'pullRefresh.ready': 'Loslassen zum Aktualisieren',
    'pullRefresh.refreshing': 'Wird aktualisiert...',
    'compare.chip': 'Vergleichen',
    'compare.chipAria': 'Wetter mit einer anderen Stadt vergleichen',
    'compare.bannerLabel': 'Vergleich',
    'compare.exitAria': 'Vergleichsmodus beenden',
    'compare.pickLabel': 'Vergleichen mit',
    'compare.pickTitle': 'Zweite Stadt wählen',
    'compare.pickHint': 'Favoriten oder weltweite Suche',
    'compare.hourlyTitle': 'Stündliche Temperatur · heute',
    'compare.daysTitle': '7 Tage',
    'compare.summary.same': 'Heute ähnliches Wetter in beiden Städten',
    'compare.summary.warmerA': 'In {a} heute um {d}° wärmer',
    'compare.summary.warmerB': 'In {b} heute um {d}° wärmer',
    'compare.summary.drierA': '{a} ist trockener, Niederschlag {pa}% vs. {pb}%',
    'compare.summary.drierB': '{b} ist trockener, Niederschlag {pb}% vs. {pa}%',
    'compare.loading': 'Wetter für {city} wird geladen…',
    'compare.error': 'Wetter für {city} konnte nicht geladen werden',
    'compare.swapA': 'Erste Stadt ändern',
    'compare.swapB': 'Zweite Stadt ändern',
    'sources.avgShort': 'Mittel aus 8 Modellen',
    'sources.dividerOr': 'oder eine bestimmte Quelle',
    'confidence.label': 'Modellübereinstimmung',
    'confidence.high': 'hoch',
    'confidence.mid': 'mittel',
    'confidence.low': 'niedrig',
    'confidence.veryLow': 'schwach',
    'confidence.tooltip': '{n} Modelle · Streuung ±{range}°C bei heutiger Höchsttemperatur',
    'chart.spreadLabel': 'Streuung über 8 Modelle',
    'windows.title': 'Aktivitäten-Fenster',
    'windows.sub': 'Beste Zeit für alltägliche Aufgaben in den nächsten 5 Tagen',
    'windows.preset.jogging': 'Joggen',
    'windows.preset.kids': 'Spaziergang mit Kind',
    'windows.preset.bbq': 'Grillen / draußen',
    'windows.preset.laundry': 'Wäsche draußen trocknen',
    'windows.preset.carwash': 'Auto waschen',
    'windows.preset.watering': 'Pflanzen gießen',
    'windows.today': 'Heute',
    'windows.tomorrow': 'Morgen',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'Dauer {h} Std.',
    'windows.noWindow': 'Kein passendes Fenster in den nächsten 5 Tagen',
    'windows.carwash.dry': '{h} Std. am Stück trocken',
    'windows.carwash.notRec': 'Nicht empfohlen · Regen erwartet',
    'climate.title': 'Klimakontext',
    'climate.sub': 'Heute vs. 5-Jahres-Mittel für dieses Datum',
    'climate.tempLabel': 'Tagesmaximum',
    'climate.minLabel': 'Nächtliches Tief',
    'climate.precipLabel': 'Niederschlag in 5 Tagen',
    'climate.norm': 'Normalwert {v}',
    'climate.warmer': '+{v}° wärmer',
    'climate.colder': '−{v}° kälter',
    'climate.aboutNorm': 'etwa normal',
    'climate.wetter': '+{v}% feuchter',
    'climate.drier': '−{v}% trockener',
    'climate.sparkTitle': 'An diesem Datum in vergangenen Jahren',
    'climate.sparkEmpty': 'Archivdaten nicht verfügbar',
    'climate.loading': 'Verlauf wird geladen...',
    'pollen.title': 'Pollen heute',
    'pollen.sub': 'Allergenkonzentration in der Luft (Körner/m³)',
    'pollen.alder': 'Erle',
    'pollen.birch': 'Birke',
    'pollen.grass': 'Gräser',
    'pollen.mugwort': 'Beifuß',
    'pollen.olive': 'Olive',
    'pollen.ragweed': 'Ambrosia',
    'pollen.level.none': 'Nicht nachgewiesen',
    'pollen.level.low': 'Niedrig',
    'pollen.level.mid': 'Mäßig',
    'pollen.level.high': 'Hoch',
    'pollen.level.veryHigh': 'Sehr hoch',
    'storm.title': 'Gewitter-Tracker',
    'storm.sub': 'Stündliches Gewitterrisiko für die nächsten 48 Stunden',
    'storm.noStorm': 'In den nächsten 48 Stunden keine Gewitter erwartet',
    'storm.upcoming': 'Gewitter in {hours} Std.',
    'storm.now': 'Gewitter jetzt',
    'storm.risk0': 'kein Risiko',
    'storm.risk1': 'niedrig',
    'storm.risk2': 'mäßig',
    'storm.risk3': 'hoch',
    'storm.risk4': 'gefährlich',
    'storm.desc1': 'fernes Donnern möglich, kein Regen',
    'storm.desc2': 'lokale Gewitter mit Regen',
    'storm.desc3': 'starker Regen mit Donner, Böen',
    'storm.desc4': 'schwere Stürme, Hagel- und Böengefahr',
    'storm.axisNow': 'jetzt',
    'storm.alertSoon': 'Gewitter in den nächsten {hours} Std. erwartet',
    'storm.alertNow': 'Gewitter findet jetzt statt',
    'accuracy.title': 'Quellengenauigkeit',
    'accuracy.subEmpty': 'Vergleich Prognose vs. Beobachtung für deinen Ort wird gesammelt',
    'accuracy.subData': 'Mittlerer absoluter Fehler über die letzten {n} Vergleiche',
    'accuracy.groundTruth': 'mit echten Beobachtungen',
    'accuracy.colTempMax': 'T-Max',
    'accuracy.colTempMin': 'T-Min',
    'accuracy.leaderTempMax': 'Tages-T:',
    'accuracy.leaderTempMin': 'Nacht-T:',
    'accuracy.leaderPrecip': 'Niederschlag:',
    'accuracy.leaderAvgAll': 'Mittel schlägt jedes einzelne Modell in allen Metriken',
    'accuracy.leaderBestAll': 'ist in allen Metriken am genauesten',
    'nowcast.now.until.rain':         'Regen jetzt · bis ~{time}',
    'nowcast.now.until.drizzle':      'Nieselregen jetzt · bis ~{time}',
    'nowcast.now.until.snow':         'Schnee jetzt · bis ~{time}',
    'nowcast.now.until.sleet':        'Schneeregen jetzt · bis ~{time}',
    'nowcast.now.until.freezing':     'Gefrierender Regen · bis ~{time}',
    'nowcast.now.until.storm':        'Gewitter jetzt · bis ~{time}',
    'nowcast.now.continues.rain':     'Regen jetzt · 2 Std.+ anhaltend',
    'nowcast.now.continues.drizzle':  'Nieselregen · 2 Std.+ anhaltend',
    'nowcast.now.continues.snow':     'Schnee jetzt · 2 Std.+ anhaltend',
    'nowcast.now.continues.sleet':    'Schneeregen · 2 Std.+ anhaltend',
    'nowcast.now.continues.freezing': 'Gefrierender Regen · 2 Std.+ anhaltend',
    'nowcast.now.continues.storm':    'Gewitter · 2 Std.+ anhaltend',
    'nowcast.soon.rain':              'Regen in ~{min} Min.',
    'nowcast.soon.drizzle':           'Nieselregen in ~{min} Min.',
    'nowcast.soon.snow':              'Schnee in ~{min} Min.',
    'nowcast.soon.sleet':             'Schneeregen in ~{min} Min.',
    'nowcast.soon.freezing':          'Gefrierender Regen in ~{min} Min.',
    'nowcast.soon.storm':             'Gewitter in ~{min} Min.',
    'nowcast.dry':                    'Trocken in den nächsten 2 Stunden',
    'accuracy.emptyTitle': 'Daten werden gesammelt',
    'accuracy.emptyHint': 'Öffne die Seite einmal am Tag — nach etwa einer Woche siehst du eine Modellrangliste mit MAE für Temperatur und Niederschlag speziell für diesen Ort',
    'accuracy.samplesUnit': 'Messungen',
    'accuracy.colModel': 'Modell',
    'accuracy.colScore': 'Gesamtgenauigkeit',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%Niederschlag',
    'accuracy.legendQ1': 'ausgezeichnet',
    'accuracy.legendQ2': 'gut',
    'accuracy.legendQ3': 'akzeptabel',
    'accuracy.legendQ4': 'schlecht',
    'accuracy.legendAvgWin': 'das beste aller',
    'accuracy.bestBadge': 'Genauestes Modell nach jüngsten Messungen',
    'footer.refresh': 'Aktualisieren',
    'footer.speak': 'Vorlesen',
    'footer.speakStop': 'Stopp',
    'footer.speakAria': 'Wettervorhersage vorlesen',
    'settings.voice.label': 'Stimme',
    'settings.voice.female': 'weiblich',
    'settings.voice.male': 'männlich',
    'settings.voice.none': 'Stimme auf diesem Gerät nicht verfügbar',
    'settings.voice.preview': 'Vorhören',
    'settings.voice.previewText': 'Hallo! Ich lese die Wettervorhersage vor.',
    'settings.voice.rate.label': 'Geschwindigkeit',
    'settings.voice.rate.slow': 'langsam',
    'settings.voice.rate.normal': 'normal',
    'settings.voice.rate.fast': 'schnell',
    'footer.updated': 'aktualisiert um {time}',
    'modal.closeAria': 'Schließen',
    'modal.day.forecast': 'Prognose',
    'modal.day.today': 'Heute',
    'modal.day.dayLen': 'Tageslänge: {len}',
    'modal.day.uvScale': 'Skala 0-11+',
    'modal.day.pm25norm': 'PM2.5 normal',
    'modal.day.hourlyTitle': 'Stündliche Temperatur und Niederschlag',
    'modal.day.hoursTitle': 'Stunde für Stunde',
    'city.label': 'Ort',
    'city.title': 'Wo soll das Wetter geprüft werden?',
    'city.useMyLocation': 'Meinen Standort verwenden',
    'city.geoDesc': 'Der Browser fragt nach Erlaubnis. Koordinaten bleiben in deinem Browser',
    'city.search.placeholder': 'Stadt in der Ukraine suchen...',
    'city.search.clearAria': 'Leeren',
    'city.list.popular': 'Beliebte ukrainische Städte',
    'city.list.foundLocal': 'In Beliebten gefunden',
    'city.list.searching': 'Suche läuft...',
    'city.list.found': 'Gefunden: {n}',
    'city.list.notFound': 'Nichts gefunden',
    'city.list.empty': 'Stadt nicht gefunden. Versuche einen anderen Namen.',
    'city.list.emptyForQuery': 'Stadt „{q}" nicht in der Open-Meteo-Datenbank der Ukraine gefunden.',
    'city.list.searchError': 'Suche fehlgeschlagen. Prüfe deine Internetverbindung.',
    'city.list.minChars': 'Gib mindestens 2 Zeichen ein',
    'city.list.aria': 'Städteliste',
    'city.tag.geo': '📍 nach Geolokation',
    'city.tag.manual': '✋ gewählt',
    'city.geoErr.denied': 'Zugriff auf Standort verweigert. Erlaube ihn in den Browser-Einstellungen.',
    'city.geoErr.unavailable': 'Position nicht verfügbar (kein GPS/Netzwerk-Signal)',
    'city.geoErr.timeout': 'Zeitüberschreitung der Anfrage',
    'city.geoErr.notSupported': 'Der Browser unterstützt keine Geolokation',
    'city.geoErr.generic': 'Geolokations-Fehler',
    'loader.fetching': 'Vorhersage wird geladen...',
    'loader.refreshing': 'Aktualisieren...',
    'apiErr.title': 'Laden der Prognose fehlgeschlagen',
    'apiErr.msg': 'Demo-Daten werden angezeigt. Prüfe die Verbindung und versuche es erneut.',
    'apiErr.retry': 'Erneut versuchen',
    'apiErr.cors': 'Wetterdienst nicht erreichbar (CORS / Netzwerk)',
    'apiErr.timeout': 'Open-Meteo-Antwort zeitüberschritten',
    'apiErr.http': 'Server-Antwortfehler ({code})',
    'apiErr.parse': 'Open-Meteo-Antwort konnte nicht verarbeitet werden',
    'settings.aria': 'Einstellungen',
    'settings.label': 'Einstellungen',
    'settings.title': 'Einstellungen',
    'settings.theme.title': 'Erscheinungsbild',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Dunkel',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Hell',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'System',
    'settings.lang.title': 'Sprache der Oberfläche',
    'settings.temp.title': 'Temperatur',
    'settings.temp.c': 'Celsius',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Windgeschwindigkeit',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'Meter/Sek.',
    'settings.wind.kmh.unit': 'km/h',
    'settings.wind.kmh.full': 'Kilometer/Stunde',
    'settings.wind.mph.full': 'Meilen/Stunde',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'Knoten',
    'settings.pressure.title': 'Luftdruck',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'Millimeter Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'Hektopascal',
    'settings.pressure.inhg.full': 'Zoll Hg',
    'cond.clear': 'Klar',
    'cond.partlyCloudy': 'Teilweise bewölkt',
    'cond.cloudy': 'Bewölkt',
    'cond.overcast': 'Bedeckt',
    'cond.rain': 'Regen',
    'cond.heavyRain': 'Starker Regen',
    'cond.thunderstorm': 'Gewitter',
    'cond.snow': 'Schnee',
    'cond.fog': 'Nebel',
    'cond.partlyCloudyWithClear': 'Bewölkt mit Aufheiterungen',
    'condDesc.day0': 'NW-Front, gelegentlicher Nieselregen',
    'condDesc.day1': 'Aktives Tief, starke Niederschläge am Nachmittag',
    'condDesc.day2': 'Tief zieht ab, Restbewölkung',
    'condDesc.day3': 'Hochdruckgebiet, sonniger Tag',
    'condDesc.day4': 'Leichter Wind, wechselnde Bewölkung',
    'condDesc.clear': 'Klarer sonniger Tag',
    'condDesc.clearWindy': 'Klar und windig',
    'condDesc.partlyCloudy': 'Teilweise bewölkt',
    'condDesc.cloudy': 'Überwiegend bewölkt',
    'condDesc.overcast': 'Den ganzen Tag bedeckt',
    'condDesc.fog': 'Neblig, schlechte Sicht',
    'condDesc.rainLight': 'Leichter Niederschlag möglich',
    'condDesc.rain': 'Regen, zeitweise stark',
    'condDesc.heavyRain': 'Starke Schauer, erhebliche Niederschlagsmengen erwartet',
    'condDesc.snow': 'Schneefall',
    'condDesc.thunderstorm': 'Gewitter mit Blitzen möglich',
    'condDesc.windAddition': ', starker {dir} Wind',
    'uvLabel.low': 'Niedrig',
    'uvLabel.moderate': 'Mäßig',
    'uvLabel.high': 'Hoch',
    'uvLabel.veryHigh': 'Sehr hoch',
    'uvLabel.extreme': 'Extrem',
    'aqiLabel.good': 'Gut',
    'aqiLabel.moderate': 'Mäßig',
    'aqiLabel.unhealthySens': 'Ungesund für empfindliche',
    'aqiLabel.unhealthy': 'Ungesund',
    'aqiLabel.veryUnhealthy': 'Sehr ungesund',
    'aqiLabel.hazardous': 'Gefährlich',
    'moon.new': 'Neumond',
    'moon.waxingCrescent': 'Zunehmende Sichel',
    'moon.firstQuarter': 'Erstes Viertel',
    'moon.waxingGibbous': 'Zunehmender Mond',
    'moon.full': 'Vollmond',
    'moon.waningGibbous': 'Abnehmender Mond',
    'moon.lastQuarter': 'Letztes Viertel',
    'moon.waningCrescent': 'Abnehmende Sichel',
    'windDir.N': 'N',   'windDir.NE': 'NO', 'windDir.E': 'O',  'windDir.SE': 'SO',
    'windDir.S': 'S',   'windDir.SW': 'SW', 'windDir.W': 'W',  'windDir.NW': 'NW',
    'windDirFull.N': 'Nord', 'windDirFull.NE': 'Nordost', 'windDirFull.E': 'Ost', 'windDirFull.SE': 'Südost',
    'windDirFull.S': 'Süd',  'windDirFull.SW': 'Südwest', 'windDirFull.W': 'West', 'windDirFull.NW': 'Nordwest',
    'day.tap': 'Details',
    'day.today': 'Heute',
    'day.short.mon': 'Mo', 'day.short.tue': 'Di', 'day.short.wed': 'Mi', 'day.short.thu': 'Do',
    'day.short.fri': 'Fr', 'day.short.sat': 'Sa', 'day.short.sun': 'So',
    'day.full.mon': 'Montag', 'day.full.tue': 'Dienstag', 'day.full.wed': 'Mittwoch', 'day.full.thu': 'Donnerstag',
    'day.full.fri': 'Freitag', 'day.full.sat': 'Samstag', 'day.full.sun': 'Sonntag',
    'month.1': 'Januar', 'month.2': 'Februar', 'month.3': 'März', 'month.4': 'April',
    'month.5': 'Mai', 'month.6': 'Juni', 'month.7': 'Juli', 'month.8': 'August',
    'month.9': 'September', 'month.10': 'Oktober', 'month.11': 'November', 'month.12': 'Dezember'
  },
  pl: {
    'html.lang': 'pl',
    'header.changeCity': 'Zmień miasto',
    'header.editHint': 'Kliknij, aby zmienić',
    'header.sourceLabel': 'Źródło danych',
    'header.sourceShort': 'Źródło',
    'hero.label': 'Teraz',
    'hero.feels': 'Odczuwalna {feels}',
    'hero.feelsBeforeSunrise': 'Odczuwalna {feels} · Wschód o {sunrise}',
    'hero.feelsBeforeSunset':  'Odczuwalna {feels} · Zachód o {sunset}',
    'hero.feelsAfterSunset':   'Odczuwalna {feels} · Zachód był o {sunset}',
    'hero.sourceNote': 'Źródło: {name}',
    'hero.sourceAvg': 'średnia z 8 modeli',
    'metric.temp': 'Temperatura',
    'metric.feels': 'Odczuwalna',
    'metric.wind': 'Wiatr',
    'metric.rain': 'Opady',
    'metric.pressure': 'Ciśnienie',
    'metric.humidity': 'Wilgotność',
    'metric.dewpoint': 'Punkt rosy',
    'metric.uv': 'Indeks UV',
    'metric.visibility': 'Widoczność',
    'metric.solar': 'Promieniowanie słoneczne',
    'metric.windSub': '{dir} · porywy {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'bez opadów',
    'metric.rain.light': 'słaby deszcz',
    'metric.rain.moderate': 'umiarkowany deszcz',
    'metric.rain.heavy': 'silny deszcz',
    'metric.pressure.falling': 'Spada ↓',
    'metric.pressure.rising': 'Rośnie ↑',
    'metric.pressure.stable': 'Stabilne',
    'metric.humidity.dewPoint': 'Punkt rosy {t}',
    'astro.sun': 'Słońce',
    'astro.sunrise': 'Wschód',
    'astro.sunset': 'Zachód',
    'astro.uv': 'Indeks UV',
    'astro.aqi': 'Jakość powietrza',
    'astro.dayLen': '{h} g {m} min',
    'astro.photoTitle': 'Dla fotografa i astronoma',
    'astro.photoSub': 'Złota / niebieska godzina, jakość zachodu, widoczność gwiazd',
    'astro.goldenHour': 'Złota godzina',
    'astro.blueHour': 'Niebieska godzina',
    'astro.morning': 'Rano',
    'astro.evening': 'Wieczorem',
    'astro.sunsetQuality': 'Zachód dziś',
    'astro.sunset.dramatic': 'Spektakularny',
    'astro.sunset.normal': 'Zwykły',
    'astro.sunset.dull': 'Matowy',
    'astro.sunset.cloudHint': 'chmury {cl}%',
    'astro.stars': 'Widoczność gwiazd',
    'astro.stars.excellent': 'Doskonała',
    'astro.stars.good': 'Dobra',
    'astro.stars.moderate': 'Umiarkowana',
    'astro.stars.poor': 'Słaba',
    'astro.stars.veryPoor': 'Bardzo słaba',
    'astro.stars.hint': 'chmury {cl}% · księżyc {moon}%',
    'chart.title': 'Dziś · prognoza godzinowa',
    'chart.sub.avg': 'Średnia z 8 modeli',
    'chart.sub.named': 'Prognoza według {name}',
    'precip.title': 'Opady',
    'precip.sub': 'Prognoza mm/h na najbliższe 48 godzin',
    'precip.tomorrow': 'jutro',
    'precip.legend': 'mm/h',
    'hdm.title': 'Godzinowo',
    'precipDetail.title': 'Szczegóły opadów',
    'metric.rain.tapHint': 'Dotknij, aby zobaczyć wykres, ryzyko burzy i radar',
    'metric.wind.tapHint': 'Dotknij, aby zobaczyć wykres godzinowy wiatru',
    'metric.pressure.tapHint': 'Dotknij, aby zobaczyć wykres godzinowy ciśnienia',
    'metric.humidity.tapHint': 'Dotknij, aby zobaczyć wykres godzinowy wilgotności',
    'radar.title': 'Radar opadów',
    'radar.sub': 'Opady na żywo z ostatnich 2 godzin + prognoza ECMWF na najbliższe 72 godziny',
    'radar.loading': 'Ładowanie kafelków radaru…',
    'radar.error': 'Nie udało się załadować danych radarowych',
    'radar.empty': 'Brak danych radarowych dla tego obszaru',
    'radar.now': 'teraz',
    'radar.forecast': 'prognoza',
    'radar.tabLive': 'Radar · 2 godz.',
    'radar.tabForecast': 'Prognoza · 72 godz.',
    'radar.windyHint': 'Wykonano przez widget Windy.com z modelem ECMWF',
    'search.chip': 'Znajdź okno',
    'search.aria': 'Znajdź okno pogodowe',
    'search.label': 'Wyszukiwanie odwrotne',
    'search.title': 'Kiedy nadejdzie odpowiednia pogoda?',
    'search.sub': 'Opisz warunek — znajdziemy najbliższe okno w 10-dniowej prognozie',
    'search.placeholder': 'np. brak deszczu przez 6 godzin, ciepło powyżej +20, czysty poranek',
    'search.button': 'Znajdź',
    'search.popularTitle': 'Popularne zapytania',
    'search.empty.title': 'Brak takiego okna w najbliższych 10 dniach',
    'search.empty.hint': 'Spróbuj innego warunku z sugestii',
    'search.empty.closest': 'Najbliższe: {when}',
    'search.error.parse': 'Nie udało się rozpoznać zapytania. Spróbuj przykładu z sugestii.',
    'search.results.found': 'Znaleziono {n} {label}',
    'search.results.label.one': 'okno',
    'search.results.label.few': 'okna',
    'search.results.label.many': 'okien',
    'search.duration.hours': '{n} godz.',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'wiatr {v} {unit}',
    'search.day.today': 'Dziś',
    'search.day.tomorrow': 'Jutro',
    'search.preset.norain': 'brak deszczu ≥6 godz.',
    'search.preset.warm': 'ciepło powyżej +20',
    'search.preset.clear': 'bezchmurnie',
    'search.preset.calm': 'bezwietrznie',
    'search.preset.run': 'dobre na bieganie',
    'search.preset.bbq': 'pogoda na grilla',
    'search.preset.carwash': 'mycie auta',
    'search.preset.storm': 'kiedy burza',
    'fav.add': '+ Dodaj miasto',
    'fav.addToFav': 'Do ulubionych',
    'fav.removeFromFav': 'Usuń z ulubionych',
    'city.section.favorites': 'Ulubione',
    'city.section.ua': 'Miasta ukraińskie',
    'city.section.world': 'Miasta świata',
    'city.section.searchResults': 'Wyniki wyszukiwania',
    'chart.legendTemp': 'Temperatura',
    'chart.legendPrecip': 'Opady',
    'sources.title': 'Źródło prognozy',
    'sources.sub': 'Wybierz źródło lub użyj średniej z 8 modeli',
    'sources.avgTitle': 'Średnia ze wszystkich serwisów',
    'sources.avgSub': 'Agregacja 8 modeli · prognoza zespołowa',
    'sources.confHint': 'Kolorowy pasek pod kartą dnia — zgodność 8 modeli:',
    'sources.confLegend.high': 'wiarygodne',
    'sources.confLegend.mid': 'średnie',
    'sources.confLegend.low': 'chwiejne',
    'sources.confLegend.veryLow': 'duży rozrzut',
    'alert.heat.title': 'Silny upał ({t}°)',
    'alert.heat.msg': 'Pij wodę co godzinę, unikaj słońca między 11 a 16. Lekka odzież, kapelusz',
    'alert.extremeHeat.title': 'Ekstremalny upał ({t}°)',
    'alert.extremeHeat.msg': 'Zagrożenie dla zdrowia. Ogranicz aktywność na zewnątrz, ryzyko udaru cieplnego',
    'alert.cold.title': 'Silny mróz ({t}°)',
    'alert.cold.msg': 'Ubierz się ciepło, zakryj twarz i dłonie. Unikaj długich spacerów',
    'alert.extremeCold.title': 'Ekstremalny mróz ({t}°)',
    'alert.extremeCold.msg': 'Ryzyko odmrożeń w 10–20 min. Wychodź tylko w razie konieczności',
    'pullRefresh.pull': 'Pociągnij, aby odświeżyć',
    'pullRefresh.ready': 'Puść, aby odświeżyć',
    'pullRefresh.refreshing': 'Odświeżanie...',
    'compare.chip': 'Porównaj',
    'compare.chipAria': 'Porównaj pogodę z innym miastem',
    'compare.bannerLabel': 'Porównanie',
    'compare.exitAria': 'Wyjdź z trybu porównania',
    'compare.pickLabel': 'Porównaj z',
    'compare.pickTitle': 'Wybierz drugie miasto',
    'compare.pickHint': 'Ulubione lub wyszukiwanie na całym świecie',
    'compare.hourlyTitle': 'Temperatura godzinowa · dziś',
    'compare.daysTitle': '7 dni',
    'compare.summary.same': 'Dziś podobna pogoda w obu miastach',
    'compare.summary.warmerA': 'W {a} dziś cieplej o {d}°',
    'compare.summary.warmerB': 'W {b} dziś cieplej o {d}°',
    'compare.summary.drierA': '{a} jest suchsze, opady {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} jest suchsze, opady {pb}% vs {pa}%',
    'compare.loading': 'Ładowanie pogody dla {city}…',
    'compare.error': 'Nie udało się załadować pogody dla {city}',
    'compare.swapA': 'Zmień pierwsze miasto',
    'compare.swapB': 'Zmień drugie miasto',
    'sources.avgShort': 'Średnia z 8 modeli',
    'sources.dividerOr': 'lub konkretne źródło',
    'confidence.label': 'Zgodność modeli',
    'confidence.high': 'wysoka',
    'confidence.mid': 'umiarkowana',
    'confidence.low': 'niska',
    'confidence.veryLow': 'słaba',
    'confidence.tooltip': '{n} modeli · rozrzut ±{range}°C dla dzisiejszej temperatury maks.',
    'chart.spreadLabel': 'Rozrzut między 8 modelami',
    'windows.title': 'Okna aktywności',
    'windows.sub': 'Najlepszy czas na codzienne zadania w najbliższych 5 dniach',
    'windows.preset.jogging': 'Bieganie',
    'windows.preset.kids': 'Spacer z dzieckiem',
    'windows.preset.bbq': 'Grill / na dworze',
    'windows.preset.laundry': 'Suszenie prania na dworze',
    'windows.preset.carwash': 'Mycie samochodu',
    'windows.preset.watering': 'Podlewanie roślin',
    'windows.today': 'Dziś',
    'windows.tomorrow': 'Jutro',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'czas trwania {h} godz.',
    'windows.noWindow': 'Brak odpowiedniego okna w najbliższych 5 dniach',
    'windows.carwash.dry': 'Sucho przez {h} godz. z rzędu',
    'windows.carwash.notRec': 'Niezalecane · spodziewany deszcz',
    'climate.title': 'Kontekst klimatyczny',
    'climate.sub': 'Dziś vs średnia 5-letnia dla tej daty',
    'climate.tempLabel': 'Maks. dzienne',
    'climate.minLabel': 'Min. nocne',
    'climate.precipLabel': 'Opady w 5 dni',
    'climate.norm': 'norma {v}',
    'climate.warmer': '+{v}° cieplej',
    'climate.colder': '−{v}° chłodniej',
    'climate.aboutNorm': 'około normy',
    'climate.wetter': '+{v}% wilgotniej',
    'climate.drier': '−{v}% sucho',
    'climate.sparkTitle': 'W ten dzień w minionych latach',
    'climate.sparkEmpty': 'Dane archiwalne niedostępne',
    'climate.loading': 'Ładowanie historii...',
    'pollen.title': 'Pyłki dziś',
    'pollen.sub': 'Stężenie alergenów w powietrzu (ziarna/m³)',
    'pollen.alder': 'Olcha',
    'pollen.birch': 'Brzoza',
    'pollen.grass': 'Trawy',
    'pollen.mugwort': 'Bylica',
    'pollen.olive': 'Oliwka',
    'pollen.ragweed': 'Ambrozja',
    'pollen.level.none': 'Niewykryte',
    'pollen.level.low': 'Niskie',
    'pollen.level.mid': 'Umiarkowane',
    'pollen.level.high': 'Wysokie',
    'pollen.level.veryHigh': 'Bardzo wysokie',
    'storm.title': 'Tracker burz',
    'storm.sub': 'Godzinowe ryzyko burzy na najbliższe 48 godzin',
    'storm.noStorm': 'Brak burz w najbliższych 48 godzinach',
    'storm.upcoming': 'Burza za {hours} godz.',
    'storm.now': 'Burza teraz',
    'storm.risk0': 'brak ryzyka',
    'storm.risk1': 'niskie',
    'storm.risk2': 'umiarkowane',
    'storm.risk3': 'wysokie',
    'storm.risk4': 'niebezpieczne',
    'storm.desc1': 'możliwe odległe grzmoty, bez deszczu',
    'storm.desc2': 'lokalne burze z deszczem',
    'storm.desc3': 'silny deszcz z grzmotami, porywy',
    'storm.desc4': 'silne burze, ryzyko gradu i porywów',
    'storm.axisNow': 'teraz',
    'storm.alertSoon': 'Burza spodziewana w ciągu {hours} godz.',
    'storm.alertNow': 'Burza trwa właśnie teraz',
    'accuracy.title': 'Dokładność źródeł',
    'accuracy.subEmpty': 'Zbieranie danych prognoza-vs-rzeczywistość dla twojej lokalizacji',
    'accuracy.subData': 'Średni błąd bezwzględny z ostatnich {n} porównań',
    'accuracy.groundTruth': 'z rzeczywistymi obserwacjami',
    'accuracy.colTempMax': 'T-Maks.',
    'accuracy.colTempMin': 'T-Min.',
    'accuracy.leaderTempMax': 'T dnia:',
    'accuracy.leaderTempMin': 'T nocą:',
    'accuracy.leaderPrecip': 'opady:',
    'accuracy.leaderAvgAll': 'Średnia bije każdy pojedynczy model we wszystkich metrykach',
    'accuracy.leaderBestAll': 'jest najdokładniejszy we wszystkich metrykach',
    'nowcast.now.until.rain':         'Deszcz teraz · do ~{time}',
    'nowcast.now.until.drizzle':      'Mżawka teraz · do ~{time}',
    'nowcast.now.until.snow':         'Śnieg teraz · do ~{time}',
    'nowcast.now.until.sleet':        'Deszcz ze śniegiem · do ~{time}',
    'nowcast.now.until.freezing':     'Marznący deszcz · do ~{time}',
    'nowcast.now.until.storm':        'Burza teraz · do ~{time}',
    'nowcast.now.continues.rain':     'Deszcz teraz · 2 godz.+ ciągle',
    'nowcast.now.continues.drizzle':  'Mżawka · 2 godz.+ ciągle',
    'nowcast.now.continues.snow':     'Śnieg teraz · 2 godz.+ ciągle',
    'nowcast.now.continues.sleet':    'Deszcz ze śniegiem · 2 godz.+ ciągle',
    'nowcast.now.continues.freezing': 'Marznący deszcz · 2 godz.+ ciągle',
    'nowcast.now.continues.storm':    'Burza · 2 godz.+ ciągle',
    'nowcast.soon.rain':              'Deszcz za ~{min} min',
    'nowcast.soon.drizzle':           'Mżawka za ~{min} min',
    'nowcast.soon.snow':              'Śnieg za ~{min} min',
    'nowcast.soon.sleet':             'Deszcz ze śniegiem za ~{min} min',
    'nowcast.soon.freezing':          'Marznący deszcz za ~{min} min',
    'nowcast.soon.storm':             'Burza za ~{min} min',
    'nowcast.dry':                    'Sucho przez najbliższe 2 godziny',
    'accuracy.emptyTitle': 'Zbieranie danych',
    'accuracy.emptyHint': 'Otwieraj stronę raz dziennie — po około tygodniu zobaczysz ranking modeli z MAE dla temperatury i opadów specyficznie dla tej lokalizacji',
    'accuracy.samplesUnit': 'próbek',
    'accuracy.colModel': 'Model',
    'accuracy.colScore': 'Łączna dokładność',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%opady',
    'accuracy.legendQ1': 'doskonale',
    'accuracy.legendQ2': 'dobrze',
    'accuracy.legendQ3': 'umiarkowanie',
    'accuracy.legendQ4': 'słabo',
    'accuracy.legendAvgWin': 'najlepszy ze wszystkich',
    'accuracy.bestBadge': 'Najdokładniejszy model według ostatnich próbek',
    'footer.refresh': 'Odśwież',
    'footer.speak': 'Czytaj',
    'footer.speakStop': 'Stop',
    'footer.speakAria': 'Przeczytaj prognozę pogody na głos',
    'settings.voice.label': 'Głos',
    'settings.voice.female': 'żeński',
    'settings.voice.male': 'męski',
    'settings.voice.none': 'Głos niedostępny na tym urządzeniu',
    'settings.voice.preview': 'Posłuchaj',
    'settings.voice.previewText': 'Cześć! Przeczytam prognozę pogody.',
    'settings.voice.rate.label': 'Prędkość',
    'settings.voice.rate.slow': 'wolno',
    'settings.voice.rate.normal': 'normalnie',
    'settings.voice.rate.fast': 'szybko',
    'footer.updated': 'zaktualizowano o {time}',
    'modal.closeAria': 'Zamknij',
    'modal.day.forecast': 'Prognoza',
    'modal.day.today': 'Dziś',
    'modal.day.dayLen': 'Długość dnia: {len}',
    'modal.day.uvScale': 'Skala 0-11+',
    'modal.day.pm25norm': 'PM2.5 norma',
    'modal.day.hourlyTitle': 'Temperatura i opady godzinowe',
    'modal.day.hoursTitle': 'Godzina po godzinie',
    'city.label': 'Lokalizacja',
    'city.title': 'Gdzie sprawdzić pogodę?',
    'city.useMyLocation': 'Użyj mojej lokalizacji',
    'city.geoDesc': 'Przeglądarka zapyta o pozwolenie. Współrzędne pozostają w twojej przeglądarce',
    'city.search.placeholder': 'Wyszukaj miasto w Ukrainie...',
    'city.search.clearAria': 'Wyczyść',
    'city.list.popular': 'Popularne miasta ukraińskie',
    'city.list.foundLocal': 'Znaleziono w popularnych',
    'city.list.searching': 'Wyszukiwanie...',
    'city.list.found': 'Znaleziono: {n}',
    'city.list.notFound': 'Nic nie znaleziono',
    'city.list.empty': 'Nie znaleziono miasta. Spróbuj innej nazwy.',
    'city.list.emptyForQuery': 'Miasto „{q}" nie znalezione w bazie Open-Meteo Ukraina.',
    'city.list.searchError': 'Wyszukiwanie nie powiodło się. Sprawdź połączenie internetowe.',
    'city.list.minChars': 'Wpisz co najmniej 2 znaki',
    'city.list.aria': 'Lista miast',
    'city.tag.geo': '📍 po geolokalizacji',
    'city.tag.manual': '✋ wybrane',
    'city.geoErr.denied': 'Odmowa dostępu do lokalizacji. Zezwól w ustawieniach przeglądarki.',
    'city.geoErr.unavailable': 'Pozycja niedostępna (brak sygnału GPS/sieci)',
    'city.geoErr.timeout': 'Przekroczono czas zapytania',
    'city.geoErr.notSupported': 'Przeglądarka nie obsługuje geolokalizacji',
    'city.geoErr.generic': 'Błąd geolokalizacji',
    'loader.fetching': 'Ładowanie prognozy...',
    'loader.refreshing': 'Odświeżanie...',
    'apiErr.title': 'Ładowanie prognozy nie powiodło się',
    'apiErr.msg': 'Wyświetlane są dane demonstracyjne. Sprawdź połączenie i spróbuj ponownie.',
    'apiErr.retry': 'Spróbuj ponownie',
    'apiErr.cors': 'Serwis pogodowy niedostępny (CORS / sieć)',
    'apiErr.timeout': 'Przekroczono czas odpowiedzi Open-Meteo',
    'apiErr.http': 'Błąd odpowiedzi serwera ({code})',
    'apiErr.parse': 'Nie udało się przetworzyć odpowiedzi Open-Meteo',
    'settings.aria': 'Ustawienia',
    'settings.label': 'Ustawienia',
    'settings.title': 'Ustawienia',
    'settings.theme.title': 'Wygląd',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Ciemny',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Jasny',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Systemowy',
    'settings.lang.title': 'Język interfejsu',
    'settings.temp.title': 'Temperatura',
    'settings.temp.c': 'Celsjusz',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Prędkość wiatru',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'metry/sek.',
    'settings.wind.kmh.unit': 'km/h',
    'settings.wind.kmh.full': 'kilometry/godz.',
    'settings.wind.mph.full': 'mile/godz.',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'węzły',
    'settings.pressure.title': 'Ciśnienie atmosferyczne',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'milimetry Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'hektopaskale',
    'settings.pressure.inhg.full': 'cale Hg',
    'cond.clear': 'Pogodnie',
    'cond.partlyCloudy': 'Częściowe zachmurzenie',
    'cond.cloudy': 'Pochmurno',
    'cond.overcast': 'Całkowite zachmurzenie',
    'cond.rain': 'Deszcz',
    'cond.heavyRain': 'Silny deszcz',
    'cond.thunderstorm': 'Burza',
    'cond.snow': 'Śnieg',
    'cond.fog': 'Mgła',
    'cond.partlyCloudyWithClear': 'Pochmurno z przejaśnieniami',
    'condDesc.day0': 'Front NW, miejscami mżawka',
    'condDesc.day1': 'Aktywny cyklon, silne opady po południu',
    'condDesc.day2': 'Cyklon odchodzi, resztkowe zachmurzenie',
    'condDesc.day3': 'Wyż, słoneczny dzień',
    'condDesc.day4': 'Lekki wiatr, zmienne zachmurzenie',
    'condDesc.clear': 'Pogodny słoneczny dzień',
    'condDesc.clearWindy': 'Pogodnie i wietrznie',
    'condDesc.partlyCloudy': 'Częściowe zachmurzenie',
    'condDesc.cloudy': 'Przeważnie pochmurno',
    'condDesc.overcast': 'Całodzienne zachmurzenie',
    'condDesc.fog': 'Mglisto, słaba widoczność',
    'condDesc.rainLight': 'Możliwe słabe opady',
    'condDesc.rain': 'Deszcz, miejscami intensywny',
    'condDesc.heavyRain': 'Silne przelotne opady, spodziewane znaczne ilości deszczu',
    'condDesc.snow': 'Opady śniegu',
    'condDesc.thunderstorm': 'Możliwa burza z piorunami',
    'condDesc.windAddition': ', silny {dir} wiatr',
    'uvLabel.low': 'Niski',
    'uvLabel.moderate': 'Umiarkowany',
    'uvLabel.high': 'Wysoki',
    'uvLabel.veryHigh': 'Bardzo wysoki',
    'uvLabel.extreme': 'Ekstremalny',
    'aqiLabel.good': 'Dobre',
    'aqiLabel.moderate': 'Umiarkowane',
    'aqiLabel.unhealthySens': 'Niezdrowe dla wrażliwych',
    'aqiLabel.unhealthy': 'Niezdrowe',
    'aqiLabel.veryUnhealthy': 'Bardzo niezdrowe',
    'aqiLabel.hazardous': 'Niebezpieczne',
    'moon.new': 'Nów',
    'moon.waxingCrescent': 'Sierp przybywający',
    'moon.firstQuarter': 'Pierwsza kwadra',
    'moon.waxingGibbous': 'Garb przybywający',
    'moon.full': 'Pełnia',
    'moon.waningGibbous': 'Garb ubywający',
    'moon.lastQuarter': 'Ostatnia kwadra',
    'moon.waningCrescent': 'Sierp ubywający',
    'windDir.N': 'N',   'windDir.NE': 'NE', 'windDir.E': 'E',  'windDir.SE': 'SE',
    'windDir.S': 'S',   'windDir.SW': 'SW', 'windDir.W': 'W',  'windDir.NW': 'NW',
    'windDirFull.N': 'Północny', 'windDirFull.NE': 'Północno-wschodni', 'windDirFull.E': 'Wschodni', 'windDirFull.SE': 'Południowo-wschodni',
    'windDirFull.S': 'Południowy', 'windDirFull.SW': 'Południowo-zachodni', 'windDirFull.W': 'Zachodni', 'windDirFull.NW': 'Północno-zachodni',
    'day.tap': 'szczegóły',
    'day.today': 'Dziś',
    'day.short.mon': 'Pon', 'day.short.tue': 'Wt', 'day.short.wed': 'Śr', 'day.short.thu': 'Czw',
    'day.short.fri': 'Pt', 'day.short.sat': 'Sob', 'day.short.sun': 'Nd',
    'day.full.mon': 'Poniedziałek', 'day.full.tue': 'Wtorek', 'day.full.wed': 'Środa', 'day.full.thu': 'Czwartek',
    'day.full.fri': 'Piątek', 'day.full.sat': 'Sobota', 'day.full.sun': 'Niedziela',
    // Родительный падеж — для шаблона «13 maja 2026»
    'month.1': 'stycznia', 'month.2': 'lutego', 'month.3': 'marca', 'month.4': 'kwietnia',
    'month.5': 'maja', 'month.6': 'czerwca', 'month.7': 'lipca', 'month.8': 'sierpnia',
    'month.9': 'września', 'month.10': 'października', 'month.11': 'listopada', 'month.12': 'grudnia'
  },
  cs: {
    'html.lang': 'cs',
    'header.changeCity': 'Změnit město',
    'header.editHint': 'Klikněte pro změnu',
    'header.sourceLabel': 'Zdroj dat',
    'header.sourceShort': 'Zdroj',
    'hero.label': 'Teď',
    'hero.feels': 'Pocitově {feels}',
    'hero.feelsBeforeSunrise': 'Pocitově {feels} · Východ slunce v {sunrise}',
    'hero.feelsBeforeSunset':  'Pocitově {feels} · Západ slunce v {sunset}',
    'hero.feelsAfterSunset':   'Pocitově {feels} · Západ slunce byl v {sunset}',
    'hero.sourceNote': 'Zdroj: {name}',
    'hero.sourceAvg': 'průměr z 8 modelů',
    'metric.temp': 'Teplota',
    'metric.feels': 'Pocitová teplota',
    'metric.wind': 'Vítr',
    'metric.rain': 'Srážky',
    'metric.pressure': 'Tlak',
    'metric.humidity': 'Vlhkost',
    'metric.dewpoint': 'Rosný bod',
    'metric.uv': 'UV index',
    'metric.visibility': 'Viditelnost',
    'metric.solar': 'Sluneční záření',
    'metric.windSub': '{dir} · nárazy {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'bez srážek',
    'metric.rain.light': 'slabý déšť',
    'metric.rain.moderate': 'mírný déšť',
    'metric.rain.heavy': 'silný déšť',
    'metric.pressure.falling': 'Klesá ↓',
    'metric.pressure.rising': 'Stoupá ↑',
    'metric.pressure.stable': 'Stabilní',
    'metric.humidity.dewPoint': 'Rosný bod {t}',
    'astro.sun': 'Slunce',
    'astro.sunrise': 'Východ',
    'astro.sunset': 'Západ',
    'astro.uv': 'UV index',
    'astro.aqi': 'Kvalita ovzduší',
    'astro.dayLen': '{h} h {m} min',
    'astro.photoTitle': 'Pro fotografa a astronoma',
    'astro.photoSub': 'Zlatá / modrá hodina, kvalita západu, viditelnost hvězd',
    'astro.goldenHour': 'Zlatá hodina',
    'astro.blueHour': 'Modrá hodina',
    'astro.morning': 'Ráno',
    'astro.evening': 'Večer',
    'astro.sunsetQuality': 'Západ slunce dnes',
    'astro.sunset.dramatic': 'Dramatický',
    'astro.sunset.normal': 'Běžný',
    'astro.sunset.dull': 'Matný',
    'astro.sunset.cloudHint': 'oblačnost {cl}%',
    'astro.stars': 'Viditelnost hvězd',
    'astro.stars.excellent': 'Vynikající',
    'astro.stars.good': 'Dobrá',
    'astro.stars.moderate': 'Střední',
    'astro.stars.poor': 'Špatná',
    'astro.stars.veryPoor': 'Velmi špatná',
    'astro.stars.hint': 'oblačnost {cl}% · měsíc {moon}%',
    'chart.title': 'Dnes · hodinová předpověď',
    'chart.sub.avg': 'Průměr z 8 modelů',
    'chart.sub.named': 'Předpověď od {name}',
    'precip.title': 'Srážky',
    'precip.sub': 'Předpověď mm/h na příštích 48 hodin',
    'precip.tomorrow': 'zítra',
    'precip.legend': 'mm/h',
    'hdm.title': 'Po hodinách',
    'precipDetail.title': 'Detaily srážek',
    'metric.rain.tapHint': 'Klepnutím zobrazíte graf, riziko bouřek a radar',
    'metric.wind.tapHint': 'Klepnutím zobrazíte hodinový graf větru',
    'metric.pressure.tapHint': 'Klepnutím zobrazíte hodinový graf tlaku',
    'metric.humidity.tapHint': 'Klepnutím zobrazíte hodinový graf vlhkosti',
    'radar.title': 'Radar srážek',
    'radar.sub': 'Živé srážky za poslední 2 hodiny + předpověď ECMWF na následujících 72 hodin',
    'radar.loading': 'Načítání radarových dlaždic…',
    'radar.error': 'Nepodařilo se načíst radarová data',
    'radar.empty': 'Žádná radarová data pro tuto oblast',
    'radar.now': 'teď',
    'radar.forecast': 'předpověď',
    'radar.tabLive': 'Radar · 2 h',
    'radar.tabForecast': 'Předpověď · 72 h',
    'radar.windyHint': 'Poháněno widgetem Windy.com s modelem ECMWF',
    'search.chip': 'Najít okno',
    'search.aria': 'Najít okno počasí',
    'search.label': 'Obrácené hledání',
    'search.title': 'Kdy přijde to správné počasí?',
    'search.sub': 'Popište podmínku — najdeme nejbližší okno v 10denní předpovědi',
    'search.placeholder': 'např. bez deště 6 hodin, teplo nad +20, jasné ráno',
    'search.button': 'Najít',
    'search.popularTitle': 'Oblíbené dotazy',
    'search.empty.title': 'V příštích 10 dnech žádné takové okno není',
    'search.empty.hint': 'Vyzkoušejte jinou podmínku z návrhů',
    'search.empty.closest': 'Nejbližší: {when}',
    'search.error.parse': 'Dotaz nelze rozpoznat. Vyzkoušejte příklad z návrhů.',
    'search.results.found': 'Nalezeno {n} {label}',
    'search.results.label.one': 'okno',
    'search.results.label.few': 'okna',
    'search.results.label.many': 'oken',
    'search.duration.hours': '{n} h',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'vítr {v} {unit}',
    'search.day.today': 'Dnes',
    'search.day.tomorrow': 'Zítra',
    'search.preset.norain': 'bez deště ≥6 h',
    'search.preset.warm': 'teplo nad +20',
    'search.preset.clear': 'jasná obloha',
    'search.preset.calm': 'bezvětří',
    'search.preset.run': 'dobré na běh',
    'search.preset.bbq': 'počasí na gril',
    'search.preset.carwash': 'mytí auta',
    'search.preset.storm': 'kdy bouřka',
    'fav.add': '+ Přidat město',
    'fav.addToFav': 'Do oblíbených',
    'fav.removeFromFav': 'Odebrat z oblíbených',
    'city.section.favorites': 'Oblíbené',
    'city.section.ua': 'Ukrajinská města',
    'city.section.world': 'Světová města',
    'city.section.searchResults': 'Výsledky hledání',
    'chart.legendTemp': 'Teplota',
    'chart.legendPrecip': 'Srážky',
    'sources.title': 'Zdroj předpovědi',
    'sources.sub': 'Vyberte zdroj nebo použijte průměr všech 8 modelů',
    'sources.avgTitle': 'Průměr všech služeb',
    'sources.avgSub': 'Agregace 8 modelů · ansámblová předpověď',
    'sources.confHint': 'Barevný pruh pod kartou dne — shoda 8 modelů:',
    'sources.confLegend.high': 'spolehlivé',
    'sources.confLegend.mid': 'střední',
    'sources.confLegend.low': 'nejisté',
    'sources.confLegend.veryLow': 'velký rozptyl',
    'alert.heat.title': 'Silné horko ({t}°)',
    'alert.heat.msg': 'Pijte vodu každou hodinu, vyhněte se slunci od 11 do 16. Lehké oblečení, klobouk',
    'alert.extremeHeat.title': 'Extrémní horko ({t}°)',
    'alert.extremeHeat.msg': 'Zdravotní riziko. Omezte aktivitu venku, riziko úpalu',
    'alert.cold.title': 'Silný mráz ({t}°)',
    'alert.cold.msg': 'Oblékněte se teple, zakryjte si obličej a ruce. Vyhněte se dlouhým procházkám',
    'alert.extremeCold.title': 'Extrémní mráz ({t}°)',
    'alert.extremeCold.msg': 'Riziko omrzlin za 10–20 min. Vycházejte jen v nezbytném případě',
    'pullRefresh.pull': 'Stáhněte pro obnovení',
    'pullRefresh.ready': 'Pusťte pro obnovení',
    'pullRefresh.refreshing': 'Obnovování...',
    'compare.chip': 'Porovnat',
    'compare.chipAria': 'Porovnat počasí s jiným městem',
    'compare.bannerLabel': 'Porovnání',
    'compare.exitAria': 'Ukončit režim porovnání',
    'compare.pickLabel': 'Porovnat s',
    'compare.pickTitle': 'Vyberte druhé město',
    'compare.pickHint': 'Oblíbené nebo celosvětové hledání',
    'compare.hourlyTitle': 'Hodinová teplota · dnes',
    'compare.daysTitle': '7 dní',
    'compare.summary.same': 'Dnes podobné počasí v obou městech',
    'compare.summary.warmerA': 'V {a} je dnes tepleji o {d}°',
    'compare.summary.warmerB': 'V {b} je dnes tepleji o {d}°',
    'compare.summary.drierA': '{a} je sušší, srážky {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} je sušší, srážky {pb}% vs {pa}%',
    'compare.loading': 'Načítání počasí pro {city}…',
    'compare.error': 'Nepodařilo se načíst počasí pro {city}',
    'compare.swapA': 'Změnit první město',
    'compare.swapB': 'Změnit druhé město',
    'sources.avgShort': 'Průměr z 8 modelů',
    'sources.dividerOr': 'nebo konkrétní zdroj',
    'confidence.label': 'Shoda modelů',
    'confidence.high': 'vysoká',
    'confidence.mid': 'střední',
    'confidence.low': 'nízká',
    'confidence.veryLow': 'slabá',
    'confidence.tooltip': '{n} modelů · rozptyl ±{range}°C u dnešní maximální teploty',
    'chart.spreadLabel': 'Rozptyl mezi 8 modely',
    'windows.title': 'Okna aktivit',
    'windows.sub': 'Nejlepší čas na běžné úkoly v příštích 5 dnech',
    'windows.preset.jogging': 'Běh',
    'windows.preset.kids': 'Procházka s dítětem',
    'windows.preset.bbq': 'Gril / venku',
    'windows.preset.laundry': 'Sušení prádla venku',
    'windows.preset.carwash': 'Mytí auta',
    'windows.preset.watering': 'Zalévání rostlin',
    'windows.today': 'Dnes',
    'windows.tomorrow': 'Zítra',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'trvání {h} h',
    'windows.noWindow': 'Žádné vhodné okno v příštích 5 dnech',
    'windows.carwash.dry': 'Sucho {h} h v kuse',
    'windows.carwash.notRec': 'Nedoporučuje se · očekává se déšť',
    'climate.title': 'Klimatický kontext',
    'climate.sub': 'Dnes vs. 5letý průměr pro toto datum',
    'climate.tempLabel': 'Denní maximum',
    'climate.minLabel': 'Noční minimum',
    'climate.precipLabel': 'Srážky za 5 dní',
    'climate.norm': 'norma {v}',
    'climate.warmer': '+{v}° tepleji',
    'climate.colder': '−{v}° chladněji',
    'climate.aboutNorm': 'přibližně norma',
    'climate.wetter': '+{v}% vlhčeji',
    'climate.drier': '−{v}% sušší',
    'climate.sparkTitle': 'V tento den v minulých letech',
    'climate.sparkEmpty': 'Archivní data nedostupná',
    'climate.loading': 'Načítání historie...',
    'pollen.title': 'Pyl dnes',
    'pollen.sub': 'Koncentrace alergenů ve vzduchu (zrn/m³)',
    'pollen.alder': 'Olše',
    'pollen.birch': 'Bříza',
    'pollen.grass': 'Trávy',
    'pollen.mugwort': 'Pelyněk',
    'pollen.olive': 'Olivovník',
    'pollen.ragweed': 'Ambrózie',
    'pollen.level.none': 'Nezjištěno',
    'pollen.level.low': 'Nízká',
    'pollen.level.mid': 'Střední',
    'pollen.level.high': 'Vysoká',
    'pollen.level.veryHigh': 'Velmi vysoká',
    'storm.title': 'Sledování bouřek',
    'storm.sub': 'Hodinové riziko bouřek na příštích 48 hodin',
    'storm.noStorm': 'V příštích 48 hodinách se bouřky neočekávají',
    'storm.upcoming': 'Bouřka za {hours} h',
    'storm.now': 'Bouřka teď',
    'storm.risk0': 'bez rizika',
    'storm.risk1': 'nízké',
    'storm.risk2': 'střední',
    'storm.risk3': 'vysoké',
    'storm.risk4': 'nebezpečné',
    'storm.desc1': 'možné vzdálené hřmění, bez deště',
    'storm.desc2': 'místní bouřky s deštěm',
    'storm.desc3': 'silný déšť s hřměním, nárazy větru',
    'storm.desc4': 'silné bouře, riziko krupobití a nárazů větru',
    'storm.axisNow': 'teď',
    'storm.alertSoon': 'Bouřka se očekává během {hours} h',
    'storm.alertNow': 'Bouřka právě probíhá',
    'accuracy.title': 'Přesnost zdrojů',
    'accuracy.subEmpty': 'Shromažďujeme data předpověď vs. skutečnost pro vaši lokalitu',
    'accuracy.subData': 'Průměrná absolutní chyba za posledních {n} porovnání',
    'accuracy.groundTruth': 'se skutečnými pozorováními',
    'accuracy.colTempMax': 'T-max',
    'accuracy.colTempMin': 'T-min',
    'accuracy.leaderTempMax': 'denní T:',
    'accuracy.leaderTempMin': 'noční T:',
    'accuracy.leaderPrecip': 'srážky:',
    'accuracy.leaderAvgAll': 'Průměr poráží každý jednotlivý model ve všech metrikách',
    'accuracy.leaderBestAll': 'je nejpřesnější ve všech metrikách',
    'nowcast.now.until.rain':         'Déšť teď · do ~{time}',
    'nowcast.now.until.drizzle':      'Mrholení teď · do ~{time}',
    'nowcast.now.until.snow':         'Sněžení teď · do ~{time}',
    'nowcast.now.until.sleet':        'Déšť se sněhem · do ~{time}',
    'nowcast.now.until.freezing':     'Mrznoucí déšť · do ~{time}',
    'nowcast.now.until.storm':        'Bouřka teď · do ~{time}',
    'nowcast.now.continues.rain':     'Déšť teď · 2 h+ trvalý',
    'nowcast.now.continues.drizzle':  'Mrholení · 2 h+ trvalé',
    'nowcast.now.continues.snow':     'Sněžení teď · 2 h+ trvalé',
    'nowcast.now.continues.sleet':    'Déšť se sněhem · 2 h+ trvalý',
    'nowcast.now.continues.freezing': 'Mrznoucí déšť · 2 h+ trvalý',
    'nowcast.now.continues.storm':    'Bouřka · 2 h+ trvalá',
    'nowcast.soon.rain':              'Déšť za ~{min} min',
    'nowcast.soon.drizzle':           'Mrholení za ~{min} min',
    'nowcast.soon.snow':              'Sněžení za ~{min} min',
    'nowcast.soon.sleet':             'Déšť se sněhem za ~{min} min',
    'nowcast.soon.freezing':          'Mrznoucí déšť za ~{min} min',
    'nowcast.soon.storm':             'Bouřka za ~{min} min',
    'nowcast.dry':                    'Sucho v příštích 2 hodinách',
    'accuracy.emptyTitle': 'Shromažďování dat',
    'accuracy.emptyHint': 'Otevírejte stránku jednou denně — po týdnu uvidíte žebříček modelů s MAE pro teplotu a srážky specifický pro tuto lokalitu',
    'accuracy.samplesUnit': 'vzorků',
    'accuracy.colModel': 'Model',
    'accuracy.colScore': 'Celková přesnost',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%srážky',
    'accuracy.legendQ1': 'výborná',
    'accuracy.legendQ2': 'dobrá',
    'accuracy.legendQ3': 'přijatelná',
    'accuracy.legendQ4': 'špatná',
    'accuracy.legendAvgWin': 'nejlepší ze všech',
    'accuracy.bestBadge': 'Nejpřesnější model podle posledních vzorků',
    'footer.refresh': 'Obnovit',
    'footer.speak': 'Přečíst',
    'footer.speakStop': 'Stop',
    'footer.speakAria': 'Přečíst předpověď počasí nahlas',
    'settings.voice.label': 'Hlas',
    'settings.voice.female': 'ženský',
    'settings.voice.male': 'mužský',
    'settings.voice.none': 'Hlas není na tomto zařízení dostupný',
    'settings.voice.preview': 'Náhled',
    'settings.voice.previewText': 'Ahoj! Přečtu předpověď počasí.',
    'settings.voice.rate.label': 'Rychlost',
    'settings.voice.rate.slow': 'pomalu',
    'settings.voice.rate.normal': 'normálně',
    'settings.voice.rate.fast': 'rychle',
    'footer.updated': 'aktualizováno v {time}',
    'modal.closeAria': 'Zavřít',
    'modal.day.forecast': 'Předpověď',
    'modal.day.today': 'Dnes',
    'modal.day.dayLen': 'Délka dne: {len}',
    'modal.day.uvScale': 'Škála 0-11+',
    'modal.day.pm25norm': 'PM2.5 norma',
    'modal.day.hourlyTitle': 'Hodinová teplota a srážky',
    'modal.day.hoursTitle': 'Hodinu po hodině',
    'city.label': 'Místo',
    'city.title': 'Kde zkontrolovat počasí?',
    'city.useMyLocation': 'Použít moji polohu',
    'city.geoDesc': 'Prohlížeč požádá o povolení. Souřadnice zůstanou ve vašem prohlížeči',
    'city.search.placeholder': 'Hledat město na Ukrajině...',
    'city.search.clearAria': 'Vyčistit',
    'city.list.popular': 'Oblíbená ukrajinská města',
    'city.list.foundLocal': 'Nalezeno mezi oblíbenými',
    'city.list.searching': 'Hledání...',
    'city.list.found': 'Nalezeno: {n}',
    'city.list.notFound': 'Nic nenalezeno',
    'city.list.empty': 'Město nenalezeno. Zkuste jiný název.',
    'city.list.emptyForQuery': 'Město „{q}" nebylo nalezeno v databázi Open-Meteo Ukrajina.',
    'city.list.searchError': 'Hledání selhalo. Zkontrolujte připojení k internetu.',
    'city.list.minChars': 'Zadejte alespoň 2 znaky',
    'city.list.aria': 'Seznam měst',
    'city.tag.geo': '📍 podle geolokace',
    'city.tag.manual': '✋ vybráno',
    'city.geoErr.denied': 'Přístup k poloze zamítnut. Povolte v nastavení prohlížeče.',
    'city.geoErr.unavailable': 'Poloha nedostupná (žádný signál GPS/sítě)',
    'city.geoErr.timeout': 'Vypršel časový limit požadavku',
    'city.geoErr.notSupported': 'Prohlížeč nepodporuje geolokaci',
    'city.geoErr.generic': 'Chyba geolokace',
    'loader.fetching': 'Načítání předpovědi...',
    'loader.refreshing': 'Obnovování...',
    'apiErr.title': 'Načtení předpovědi selhalo',
    'apiErr.msg': 'Zobrazují se demo data. Zkontrolujte připojení a zkuste znovu.',
    'apiErr.retry': 'Zkusit znovu',
    'apiErr.cors': 'Služba počasí nedostupná (CORS / síť)',
    'apiErr.timeout': 'Vypršel časový limit odpovědi Open-Meteo',
    'apiErr.http': 'Chyba odpovědi serveru ({code})',
    'apiErr.parse': 'Nepodařilo se zpracovat odpověď Open-Meteo',
    'settings.aria': 'Nastavení',
    'settings.label': 'Nastavení',
    'settings.title': 'Nastavení',
    'settings.theme.title': 'Vzhled',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Tmavý',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Světlý',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Systémový',
    'settings.lang.title': 'Jazyk rozhraní',
    'settings.temp.title': 'Teplota',
    'settings.temp.c': 'Celsius',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Rychlost větru',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'metry/s',
    'settings.wind.kmh.unit': 'km/h',
    'settings.wind.kmh.full': 'kilometry/hod',
    'settings.wind.mph.full': 'míle/hod',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'uzly',
    'settings.pressure.title': 'Atmosférický tlak',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'milimetry Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'hektopascaly',
    'settings.pressure.inhg.full': 'palce Hg',
    'cond.clear': 'Jasno',
    'cond.partlyCloudy': 'Polojasno',
    'cond.cloudy': 'Oblačno',
    'cond.overcast': 'Zataženo',
    'cond.rain': 'Déšť',
    'cond.heavyRain': 'Silný déšť',
    'cond.thunderstorm': 'Bouřka',
    'cond.snow': 'Sníh',
    'cond.fog': 'Mlha',
    'cond.partlyCloudyWithClear': 'Oblačno s občasným vyjasněním',
    'condDesc.day0': 'SZ fronta, občasné mrholení',
    'condDesc.day1': 'Aktivní cyklóna, vydatné srážky odpoledne',
    'condDesc.day2': 'Cyklóna odchází, zbytkové oblačnosti',
    'condDesc.day3': 'Anticyklóna, slunečný den',
    'condDesc.day4': 'Slabý vítr, proměnlivá oblačnost',
    'condDesc.clear': 'Jasný slunečný den',
    'condDesc.clearWindy': 'Jasno a větrno',
    'condDesc.partlyCloudy': 'Polojasno',
    'condDesc.cloudy': 'Převážně oblačno',
    'condDesc.overcast': 'Zataženo celý den',
    'condDesc.fog': 'Mlhavo, špatná viditelnost',
    'condDesc.rainLight': 'Možné slabé srážky',
    'condDesc.rain': 'Déšť, místy intenzivní',
    'condDesc.heavyRain': 'Silné přeháňky, očekávají se značné srážky',
    'condDesc.snow': 'Sněžení',
    'condDesc.thunderstorm': 'Možná bouřka s blesky',
    'condDesc.windAddition': ', silný {dir} vítr',
    'uvLabel.low': 'Nízký',
    'uvLabel.moderate': 'Mírný',
    'uvLabel.high': 'Vysoký',
    'uvLabel.veryHigh': 'Velmi vysoký',
    'uvLabel.extreme': 'Extrémní',
    'aqiLabel.good': 'Dobrá',
    'aqiLabel.moderate': 'Mírná',
    'aqiLabel.unhealthySens': 'Nezdravá pro citlivé',
    'aqiLabel.unhealthy': 'Nezdravá',
    'aqiLabel.veryUnhealthy': 'Velmi nezdravá',
    'aqiLabel.hazardous': 'Nebezpečná',
    'moon.new': 'Nov',
    'moon.waxingCrescent': 'Dorůstající srpek',
    'moon.firstQuarter': 'První čtvrť',
    'moon.waxingGibbous': 'Dorůstající měsíc',
    'moon.full': 'Úplněk',
    'moon.waningGibbous': 'Couvající měsíc',
    'moon.lastQuarter': 'Poslední čtvrť',
    'moon.waningCrescent': 'Couvající srpek',
    'windDir.N': 'S',   'windDir.NE': 'SV', 'windDir.E': 'V',  'windDir.SE': 'JV',
    'windDir.S': 'J',   'windDir.SW': 'JZ', 'windDir.W': 'Z',  'windDir.NW': 'SZ',
    'windDirFull.N': 'Severní', 'windDirFull.NE': 'Severovýchodní', 'windDirFull.E': 'Východní', 'windDirFull.SE': 'Jihovýchodní',
    'windDirFull.S': 'Jižní',   'windDirFull.SW': 'Jihozápadní',    'windDirFull.W': 'Západní',  'windDirFull.NW': 'Severozápadní',
    'day.tap': 'detaily',
    'day.today': 'Dnes',
    'day.short.mon': 'Po', 'day.short.tue': 'Út', 'day.short.wed': 'St', 'day.short.thu': 'Čt',
    'day.short.fri': 'Pá', 'day.short.sat': 'So', 'day.short.sun': 'Ne',
    'day.full.mon': 'Pondělí', 'day.full.tue': 'Úterý', 'day.full.wed': 'Středa', 'day.full.thu': 'Čtvrtek',
    'day.full.fri': 'Pátek', 'day.full.sat': 'Sobota', 'day.full.sun': 'Neděle',
    // Родительный падеж — для шаблона «13 května 2026»
    'month.1': 'ledna', 'month.2': 'února', 'month.3': 'března', 'month.4': 'dubna',
    'month.5': 'května', 'month.6': 'června', 'month.7': 'července', 'month.8': 'srpna',
    'month.9': 'září', 'month.10': 'října', 'month.11': 'listopadu', 'month.12': 'prosince'
  },
  fr: {
    'html.lang': 'fr',
    'header.changeCity': 'Changer de ville',
    'header.editHint': 'Cliquer pour changer',
    'header.sourceLabel': 'Source des données',
    'header.sourceShort': 'Source',
    'hero.label': 'Maintenant',
    'hero.feels': 'Ressenti {feels}',
    'hero.feelsBeforeSunrise': 'Ressenti {feels} · Lever du soleil à {sunrise}',
    'hero.feelsBeforeSunset':  'Ressenti {feels} · Coucher du soleil à {sunset}',
    'hero.feelsAfterSunset':   'Ressenti {feels} · Coucher du soleil à {sunset}',
    'hero.sourceNote': 'Source : {name}',
    'hero.sourceAvg': 'moyenne de 8 modèles',
    'metric.temp': 'Température',
    'metric.feels': 'Ressenti',
    'metric.wind': 'Vent',
    'metric.rain': 'Précipitations',
    'metric.pressure': 'Pression',
    'metric.humidity': 'Humidité',
    'metric.dewpoint': 'Point de rosée',
    'metric.uv': 'Indice UV',
    'metric.visibility': 'Visibilité',
    'metric.solar': 'Rayonnement solaire',
    'metric.windSub': '{dir} · rafales {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'pas de précipitations',
    'metric.rain.light': 'pluie légère',
    'metric.rain.moderate': 'pluie modérée',
    'metric.rain.heavy': 'forte pluie',
    'metric.pressure.falling': 'En baisse ↓',
    'metric.pressure.rising': 'En hausse ↑',
    'metric.pressure.stable': 'Stable',
    'metric.humidity.dewPoint': 'Point de rosée {t}',
    'astro.sun': 'Soleil',
    'astro.sunrise': 'Lever',
    'astro.sunset': 'Coucher',
    'astro.uv': 'Indice UV',
    'astro.aqi': 'Qualité de l\'air',
    'astro.dayLen': '{h} h {m} min',
    'astro.photoTitle': 'Pour photographes et astronomes',
    'astro.photoSub': 'Heure dorée / bleue, qualité du coucher, visibilité des étoiles',
    'astro.goldenHour': 'Heure dorée',
    'astro.blueHour': 'Heure bleue',
    'astro.morning': 'Matin',
    'astro.evening': 'Soir',
    'astro.sunsetQuality': 'Coucher de soleil aujourd\'hui',
    'astro.sunset.dramatic': 'Spectaculaire',
    'astro.sunset.normal': 'Normal',
    'astro.sunset.dull': 'Terne',
    'astro.sunset.cloudHint': 'nuages {cl}%',
    'astro.stars': 'Visibilité des étoiles',
    'astro.stars.excellent': 'Excellente',
    'astro.stars.good': 'Bonne',
    'astro.stars.moderate': 'Moyenne',
    'astro.stars.poor': 'Faible',
    'astro.stars.veryPoor': 'Très faible',
    'astro.stars.hint': 'nuages {cl}% · lune {moon}%',
    'chart.title': 'Aujourd\'hui · prévision horaire',
    'chart.sub.avg': 'Moyenne sur 8 modèles',
    'chart.sub.named': 'Prévision par {name}',
    'precip.title': 'Précipitations',
    'precip.sub': 'Prévision mm/h pour les 48 prochaines heures',
    'precip.tomorrow': 'demain',
    'precip.legend': 'mm/h',
    'hdm.title': 'Par heure',
    'precipDetail.title': 'Détails des précipitations',
    'metric.rain.tapHint': 'Appuyez pour voir le graphique, risque d\'orage et radar',
    'metric.wind.tapHint': 'Appuyez pour voir le graphique horaire du vent',
    'metric.pressure.tapHint': 'Appuyez pour voir le graphique horaire de la pression',
    'metric.humidity.tapHint': 'Appuyez pour voir le graphique horaire de l\'humidité',
    'radar.title': 'Radar de précipitations',
    'radar.sub': 'Précipitations en direct des 2 dernières heures + prévision ECMWF pour les 72 prochaines heures',
    'radar.loading': 'Chargement des tuiles radar…',
    'radar.error': 'Impossible de charger les données radar',
    'radar.empty': 'Pas de données radar pour cette zone',
    'radar.now': 'maintenant',
    'radar.forecast': 'prévision',
    'radar.tabLive': 'Radar · 2 h',
    'radar.tabForecast': 'Prévision · 72 h',
    'radar.windyHint': 'Propulsé par le widget Windy.com avec le modèle ECMWF',
    'search.chip': 'Trouver une fenêtre',
    'search.aria': 'Trouver une fenêtre météo',
    'search.label': 'Recherche inversée',
    'search.title': 'Quand viendra la bonne météo ?',
    'search.sub': 'Décrivez la condition — nous trouverons la prochaine fenêtre dans la prévision sur 10 jours',
    'search.placeholder': 'ex. pas de pluie pendant 6 h, chaud au-dessus de +20, matin clair',
    'search.button': 'Trouver',
    'search.popularTitle': 'Requêtes populaires',
    'search.empty.title': 'Aucune fenêtre de ce type dans les 10 prochains jours',
    'search.empty.hint': 'Essayez une autre condition parmi les suggestions',
    'search.empty.closest': 'Plus proche : {when}',
    'search.error.parse': 'Impossible d\'interpréter la requête. Essayez un exemple des suggestions.',
    'search.results.found': '{n} {label} trouvée(s)',
    'search.results.label.one': 'fenêtre',
    'search.results.label.few': 'fenêtres',
    'search.results.label.many': 'fenêtres',
    'search.duration.hours': '{n} h',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'vent {v} {unit}',
    'search.day.today': 'Aujourd\'hui',
    'search.day.tomorrow': 'Demain',
    'search.preset.norain': 'pas de pluie ≥6 h',
    'search.preset.warm': 'chaud au-dessus de +20',
    'search.preset.clear': 'ciel dégagé',
    'search.preset.calm': 'pas de vent',
    'search.preset.run': 'bon pour courir',
    'search.preset.bbq': 'temps de barbecue',
    'search.preset.carwash': 'lavage auto',
    'search.preset.storm': 'quand l\'orage',
    'fav.add': '+ Ajouter une ville',
    'fav.addToFav': 'Aux favoris',
    'fav.removeFromFav': 'Retirer des favoris',
    'city.section.favorites': 'Favoris',
    'city.section.ua': 'Villes ukrainiennes',
    'city.section.world': 'Villes du monde',
    'city.section.searchResults': 'Résultats de recherche',
    'chart.legendTemp': 'Température',
    'chart.legendPrecip': 'Précipitations',
    'sources.title': 'Source de prévision',
    'sources.sub': 'Choisissez une source ou utilisez la moyenne des 8 modèles',
    'sources.avgTitle': 'Moyenne de tous les services',
    'sources.avgSub': 'Agrégation de 8 modèles · prévision d\'ensemble',
    'sources.confHint': 'Barre colorée sous la carte du jour — accord des 8 modèles :',
    'sources.confLegend.high': 'fiable',
    'sources.confLegend.mid': 'moyen',
    'sources.confLegend.low': 'instable',
    'sources.confLegend.veryLow': 'grande dispersion',
    'alert.heat.title': 'Forte chaleur ({t}°)',
    'alert.heat.msg': 'Buvez de l\'eau chaque heure, évitez le soleil de 11 h à 16 h. Vêtements légers, chapeau',
    'alert.extremeHeat.title': 'Chaleur extrême ({t}°)',
    'alert.extremeHeat.msg': 'Risque pour la santé. Limitez l\'activité en plein air, risque de coup de chaleur',
    'alert.cold.title': 'Fort gel ({t}°)',
    'alert.cold.msg': 'Habillez-vous chaudement, couvrez visage et mains. Évitez les longues promenades',
    'alert.extremeCold.title': 'Gel extrême ({t}°)',
    'alert.extremeCold.msg': 'Risque de gelures en 10–20 min. Restez à l\'intérieur sauf nécessité',
    'pullRefresh.pull': 'Tirez pour actualiser',
    'pullRefresh.ready': 'Relâchez pour actualiser',
    'pullRefresh.refreshing': 'Actualisation...',
    'compare.chip': 'Comparer',
    'compare.chipAria': 'Comparer la météo avec une autre ville',
    'compare.bannerLabel': 'Comparaison',
    'compare.exitAria': 'Quitter le mode comparaison',
    'compare.pickLabel': 'Comparer avec',
    'compare.pickTitle': 'Choisissez la deuxième ville',
    'compare.pickHint': 'Favoris ou recherche mondiale',
    'compare.hourlyTitle': 'Température horaire · aujourd\'hui',
    'compare.daysTitle': '7 jours',
    'compare.summary.same': 'Aujourd\'hui météo similaire dans les deux villes',
    'compare.summary.warmerA': 'Plus chaud à {a} de {d}° aujourd\'hui',
    'compare.summary.warmerB': 'Plus chaud à {b} de {d}° aujourd\'hui',
    'compare.summary.drierA': '{a} est plus sec, précipitations {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} est plus sec, précipitations {pb}% vs {pa}%',
    'compare.loading': 'Chargement de la météo pour {city}…',
    'compare.error': 'Impossible de charger la météo pour {city}',
    'compare.swapA': 'Changer la première ville',
    'compare.swapB': 'Changer la deuxième ville',
    'sources.avgShort': 'Moyenne de 8 modèles',
    'sources.dividerOr': 'ou une source spécifique',
    'confidence.label': 'Accord des modèles',
    'confidence.high': 'élevé',
    'confidence.mid': 'modéré',
    'confidence.low': 'faible',
    'confidence.veryLow': 'mauvais',
    'confidence.tooltip': '{n} modèles · dispersion ±{range}°C sur la température maximale d\'aujourd\'hui',
    'chart.spreadLabel': 'Dispersion entre 8 modèles',
    'windows.title': 'Fenêtres d\'activité',
    'windows.sub': 'Meilleur moment pour les tâches quotidiennes dans les 5 prochains jours',
    'windows.preset.jogging': 'Jogging',
    'windows.preset.kids': 'Promenade avec enfant',
    'windows.preset.bbq': 'Barbecue / extérieur',
    'windows.preset.laundry': 'Sécher le linge dehors',
    'windows.preset.carwash': 'Laver la voiture',
    'windows.preset.watering': 'Arroser les plantes',
    'windows.today': 'Aujourd\'hui',
    'windows.tomorrow': 'Demain',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'durée {h} h',
    'windows.noWindow': 'Pas de fenêtre convenable dans les 5 prochains jours',
    'windows.carwash.dry': 'Sec pendant {h} h d\'affilée',
    'windows.carwash.notRec': 'Non recommandé · pluie attendue',
    'climate.title': 'Contexte climatique',
    'climate.sub': 'Aujourd\'hui vs moyenne 5 ans pour cette date',
    'climate.tempLabel': 'Maximum quotidien',
    'climate.minLabel': 'Minimum nocturne',
    'climate.precipLabel': 'Précipitations en 5 jours',
    'climate.norm': 'normale {v}',
    'climate.warmer': '+{v}° plus chaud',
    'climate.colder': '−{v}° plus froid',
    'climate.aboutNorm': 'à peu près normal',
    'climate.wetter': '+{v}% plus humide',
    'climate.drier': '−{v}% plus sec',
    'climate.sparkTitle': 'À cette date les années passées',
    'climate.sparkEmpty': 'Données d\'archive indisponibles',
    'climate.loading': 'Chargement de l\'historique...',
    'pollen.title': 'Pollens aujourd\'hui',
    'pollen.sub': 'Concentration des allergènes dans l\'air (grains/m³)',
    'pollen.alder': 'Aulne',
    'pollen.birch': 'Bouleau',
    'pollen.grass': 'Graminées',
    'pollen.mugwort': 'Armoise',
    'pollen.olive': 'Olivier',
    'pollen.ragweed': 'Ambroisie',
    'pollen.level.none': 'Non détecté',
    'pollen.level.low': 'Faible',
    'pollen.level.mid': 'Modéré',
    'pollen.level.high': 'Élevé',
    'pollen.level.veryHigh': 'Très élevé',
    'storm.title': 'Suivi des orages',
    'storm.sub': 'Risque horaire d\'orage pour les 48 prochaines heures',
    'storm.noStorm': 'Pas d\'orage prévu dans les 48 prochaines heures',
    'storm.upcoming': 'Orage dans {hours} h',
    'storm.now': 'Orage maintenant',
    'storm.risk0': 'aucun risque',
    'storm.risk1': 'faible',
    'storm.risk2': 'modéré',
    'storm.risk3': 'élevé',
    'storm.risk4': 'dangereux',
    'storm.desc1': 'tonnerre lointain possible, pas de pluie',
    'storm.desc2': 'orages localisés avec pluie',
    'storm.desc3': 'forte pluie avec tonnerre, rafales',
    'storm.desc4': 'orages violents, risque de grêle et rafales',
    'storm.axisNow': 'maintenant',
    'storm.alertSoon': 'Orage attendu dans les {hours} h',
    'storm.alertNow': 'Orage en cours maintenant',
    'accuracy.title': 'Précision des sources',
    'accuracy.subEmpty': 'Collecte des données prévision-vs-réel pour votre lieu',
    'accuracy.subData': 'Erreur absolue moyenne sur les {n} dernières comparaisons',
    'accuracy.groundTruth': 'avec observations réelles',
    'accuracy.colTempMax': 'T-max',
    'accuracy.colTempMin': 'T-min',
    'accuracy.leaderTempMax': 'T du jour :',
    'accuracy.leaderTempMin': 'T de nuit :',
    'accuracy.leaderPrecip': 'précip. :',
    'accuracy.leaderAvgAll': 'La moyenne bat chaque modèle individuel sur toutes les métriques',
    'accuracy.leaderBestAll': 'est le plus précis sur toutes les métriques',
    'nowcast.now.until.rain':         'Pluie maintenant · jusqu\'à ~{time}',
    'nowcast.now.until.drizzle':      'Bruine maintenant · jusqu\'à ~{time}',
    'nowcast.now.until.snow':         'Neige maintenant · jusqu\'à ~{time}',
    'nowcast.now.until.sleet':        'Neige fondue · jusqu\'à ~{time}',
    'nowcast.now.until.freezing':     'Pluie verglaçante · jusqu\'à ~{time}',
    'nowcast.now.until.storm':        'Orage maintenant · jusqu\'à ~{time}',
    'nowcast.now.continues.rain':     'Pluie maintenant · 2 h+ continue',
    'nowcast.now.continues.drizzle':  'Bruine · 2 h+ continue',
    'nowcast.now.continues.snow':     'Neige maintenant · 2 h+ continue',
    'nowcast.now.continues.sleet':    'Neige fondue · 2 h+ continue',
    'nowcast.now.continues.freezing': 'Pluie verglaçante · 2 h+ continue',
    'nowcast.now.continues.storm':    'Orage · 2 h+ continu',
    'nowcast.soon.rain':              'Pluie dans ~{min} min',
    'nowcast.soon.drizzle':           'Bruine dans ~{min} min',
    'nowcast.soon.snow':              'Neige dans ~{min} min',
    'nowcast.soon.sleet':             'Neige fondue dans ~{min} min',
    'nowcast.soon.freezing':          'Pluie verglaçante dans ~{min} min',
    'nowcast.soon.storm':             'Orage dans ~{min} min',
    'nowcast.dry':                    'Sec pendant les 2 prochaines heures',
    'accuracy.emptyTitle': 'Collecte des données',
    'accuracy.emptyHint': 'Ouvrez le site une fois par jour — après environ une semaine vous verrez un classement des modèles avec MAE pour la température et les précipitations spécifique à ce lieu',
    'accuracy.samplesUnit': 'échantillons',
    'accuracy.colModel': 'Modèle',
    'accuracy.colScore': 'Précision globale',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%précip.',
    'accuracy.legendQ1': 'excellent',
    'accuracy.legendQ2': 'bon',
    'accuracy.legendQ3': 'correct',
    'accuracy.legendQ4': 'faible',
    'accuracy.legendAvgWin': 'meilleur de tous',
    'accuracy.bestBadge': 'Modèle le plus précis selon les échantillons récents',
    'footer.refresh': 'Actualiser',
    'footer.speak': 'Lire',
    'footer.speakStop': 'Stop',
    'footer.speakAria': 'Lire la prévision météo à voix haute',
    'settings.voice.label': 'Voix',
    'settings.voice.female': 'féminine',
    'settings.voice.male': 'masculine',
    'settings.voice.none': 'Voix non disponible sur cet appareil',
    'settings.voice.preview': 'Aperçu',
    'settings.voice.previewText': 'Bonjour ! Je vais lire la prévision météo.',
    'settings.voice.rate.label': 'Vitesse',
    'settings.voice.rate.slow': 'lent',
    'settings.voice.rate.normal': 'normal',
    'settings.voice.rate.fast': 'rapide',
    'footer.updated': 'mis à jour à {time}',
    'modal.closeAria': 'Fermer',
    'modal.day.forecast': 'Prévision',
    'modal.day.today': 'Aujourd\'hui',
    'modal.day.dayLen': 'Durée du jour : {len}',
    'modal.day.uvScale': 'Échelle 0-11+',
    'modal.day.pm25norm': 'PM2.5 normal',
    'modal.day.hourlyTitle': 'Température et précipitations horaires',
    'modal.day.hoursTitle': 'Heure par heure',
    'city.label': 'Lieu',
    'city.title': 'Où vérifier la météo ?',
    'city.useMyLocation': 'Utiliser ma position',
    'city.geoDesc': 'Le navigateur demandera l\'autorisation. Les coordonnées restent dans votre navigateur',
    'city.search.placeholder': 'Rechercher une ville en Ukraine...',
    'city.search.clearAria': 'Effacer',
    'city.list.popular': 'Villes ukrainiennes populaires',
    'city.list.foundLocal': 'Trouvé dans les populaires',
    'city.list.searching': 'Recherche...',
    'city.list.found': 'Trouvé : {n}',
    'city.list.notFound': 'Rien trouvé',
    'city.list.empty': 'Ville introuvable. Essayez un autre nom.',
    'city.list.emptyForQuery': 'Ville « {q} » non trouvée dans la base Open-Meteo Ukraine.',
    'city.list.searchError': 'Échec de la recherche. Vérifiez votre connexion internet.',
    'city.list.minChars': 'Saisissez au moins 2 caractères',
    'city.list.aria': 'Liste des villes',
    'city.tag.geo': '📍 par géolocalisation',
    'city.tag.manual': '✋ choisi',
    'city.geoErr.denied': 'Accès à la position refusé. Autorisez-le dans les paramètres du navigateur.',
    'city.geoErr.unavailable': 'Position indisponible (pas de signal GPS/réseau)',
    'city.geoErr.timeout': 'Délai de la requête dépassé',
    'city.geoErr.notSupported': 'Le navigateur ne prend pas en charge la géolocalisation',
    'city.geoErr.generic': 'Erreur de géolocalisation',
    'loader.fetching': 'Chargement de la prévision...',
    'loader.refreshing': 'Actualisation...',
    'apiErr.title': 'Échec du chargement de la prévision',
    'apiErr.msg': 'Affichage des données de démonstration. Vérifiez votre connexion et réessayez.',
    'apiErr.retry': 'Réessayer',
    'apiErr.cors': 'Service météo inaccessible (CORS / réseau)',
    'apiErr.timeout': 'Délai de réponse Open-Meteo dépassé',
    'apiErr.http': 'Erreur de réponse serveur ({code})',
    'apiErr.parse': 'Impossible d\'analyser la réponse Open-Meteo',
    'settings.aria': 'Paramètres',
    'settings.label': 'Paramètres',
    'settings.title': 'Paramètres',
    'settings.theme.title': 'Apparence',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Sombre',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Clair',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Système',
    'settings.lang.title': 'Langue de l\'interface',
    'settings.temp.title': 'Température',
    'settings.temp.c': 'Celsius',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Vitesse du vent',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'mètres/sec',
    'settings.wind.kmh.unit': 'km/h',
    'settings.wind.kmh.full': 'kilomètres/heure',
    'settings.wind.mph.full': 'miles/heure',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'nœuds',
    'settings.pressure.title': 'Pression atmosphérique',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'millimètres Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'hectopascals',
    'settings.pressure.inhg.full': 'pouces Hg',
    'cond.clear': 'Dégagé',
    'cond.partlyCloudy': 'Partiellement nuageux',
    'cond.cloudy': 'Nuageux',
    'cond.overcast': 'Couvert',
    'cond.rain': 'Pluie',
    'cond.heavyRain': 'Forte pluie',
    'cond.thunderstorm': 'Orage',
    'cond.snow': 'Neige',
    'cond.fog': 'Brouillard',
    'cond.partlyCloudyWithClear': 'Nuageux avec éclaircies',
    'condDesc.day0': 'Front NO, bruine occasionnelle',
    'condDesc.day1': 'Cyclone actif, fortes précipitations l\'après-midi',
    'condDesc.day2': 'Cyclone s\'éloigne, nuages résiduels',
    'condDesc.day3': 'Anticyclone, journée ensoleillée',
    'condDesc.day4': 'Vent léger, nuages variables',
    'condDesc.clear': 'Journée claire et ensoleillée',
    'condDesc.clearWindy': 'Dégagé et venteux',
    'condDesc.partlyCloudy': 'Partiellement nuageux',
    'condDesc.cloudy': 'Surtout nuageux',
    'condDesc.overcast': 'Couvert toute la journée',
    'condDesc.fog': 'Brumeux, mauvaise visibilité',
    'condDesc.rainLight': 'Légères précipitations possibles',
    'condDesc.rain': 'Pluie, parfois intense',
    'condDesc.heavyRain': 'Fortes averses, précipitations importantes attendues',
    'condDesc.snow': 'Chute de neige',
    'condDesc.thunderstorm': 'Orage avec éclairs possible',
    'condDesc.windAddition': ', fort vent {dir}',
    'uvLabel.low': 'Faible',
    'uvLabel.moderate': 'Modéré',
    'uvLabel.high': 'Élevé',
    'uvLabel.veryHigh': 'Très élevé',
    'uvLabel.extreme': 'Extrême',
    'aqiLabel.good': 'Bonne',
    'aqiLabel.moderate': 'Modérée',
    'aqiLabel.unhealthySens': 'Mauvaise pour personnes sensibles',
    'aqiLabel.unhealthy': 'Mauvaise',
    'aqiLabel.veryUnhealthy': 'Très mauvaise',
    'aqiLabel.hazardous': 'Dangereuse',
    'moon.new': 'Nouvelle lune',
    'moon.waxingCrescent': 'Premier croissant',
    'moon.firstQuarter': 'Premier quartier',
    'moon.waxingGibbous': 'Lune gibbeuse croissante',
    'moon.full': 'Pleine lune',
    'moon.waningGibbous': 'Lune gibbeuse décroissante',
    'moon.lastQuarter': 'Dernier quartier',
    'moon.waningCrescent': 'Dernier croissant',
    'windDir.N': 'N',   'windDir.NE': 'NE', 'windDir.E': 'E',  'windDir.SE': 'SE',
    'windDir.S': 'S',   'windDir.SW': 'SO', 'windDir.W': 'O',  'windDir.NW': 'NO',
    'windDirFull.N': 'Nord', 'windDirFull.NE': 'Nord-est', 'windDirFull.E': 'Est', 'windDirFull.SE': 'Sud-est',
    'windDirFull.S': 'Sud',  'windDirFull.SW': 'Sud-ouest', 'windDirFull.W': 'Ouest', 'windDirFull.NW': 'Nord-ouest',
    'day.tap': 'détails',
    'day.today': 'Aujourd\'hui',
    'day.short.mon': 'Lun', 'day.short.tue': 'Mar', 'day.short.wed': 'Mer', 'day.short.thu': 'Jeu',
    'day.short.fri': 'Ven', 'day.short.sat': 'Sam', 'day.short.sun': 'Dim',
    'day.full.mon': 'Lundi', 'day.full.tue': 'Mardi', 'day.full.wed': 'Mercredi', 'day.full.thu': 'Jeudi',
    'day.full.fri': 'Vendredi', 'day.full.sat': 'Samedi', 'day.full.sun': 'Dimanche',
    'month.1': 'janvier', 'month.2': 'février', 'month.3': 'mars', 'month.4': 'avril',
    'month.5': 'mai', 'month.6': 'juin', 'month.7': 'juillet', 'month.8': 'août',
    'month.9': 'septembre', 'month.10': 'octobre', 'month.11': 'novembre', 'month.12': 'décembre'
  },
  it: {
    'html.lang': 'it',
    'header.changeCity': 'Cambia città',
    'header.editHint': 'Clicca per cambiare',
    'header.sourceLabel': 'Fonte dati',
    'header.sourceShort': 'Fonte',
    'hero.label': 'Ora',
    'hero.feels': 'Percepita {feels}',
    'hero.feelsBeforeSunrise': 'Percepita {feels} · Alba alle {sunrise}',
    'hero.feelsBeforeSunset':  'Percepita {feels} · Tramonto alle {sunset}',
    'hero.feelsAfterSunset':   'Percepita {feels} · Tramonto alle {sunset}',
    'hero.sourceNote': 'Fonte: {name}',
    'hero.sourceAvg': 'media di 8 modelli',
    'metric.temp': 'Temperatura',
    'metric.feels': 'Percepita',
    'metric.wind': 'Vento',
    'metric.rain': 'Precipitazioni',
    'metric.pressure': 'Pressione',
    'metric.humidity': 'Umidità',
    'metric.dewpoint': 'Punto di rugiada',
    'metric.uv': 'Indice UV',
    'metric.visibility': 'Visibilità',
    'metric.solar': 'Radiazione solare',
    'metric.windSub': '{dir} · raffiche {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'nessuna precipitazione',
    'metric.rain.light': 'pioggia leggera',
    'metric.rain.moderate': 'pioggia moderata',
    'metric.rain.heavy': 'pioggia forte',
    'metric.pressure.falling': 'In calo ↓',
    'metric.pressure.rising': 'In aumento ↑',
    'metric.pressure.stable': 'Stabile',
    'metric.humidity.dewPoint': 'Punto di rugiada {t}',
    'astro.sun': 'Sole',
    'astro.sunrise': 'Alba',
    'astro.sunset': 'Tramonto',
    'astro.uv': 'Indice UV',
    'astro.aqi': 'Qualità dell\'aria',
    'astro.dayLen': '{h} h {m} min',
    'astro.photoTitle': 'Per fotografi e astronomi',
    'astro.photoSub': 'Ora dorata / blu, qualità del tramonto, visibilità stellare',
    'astro.goldenHour': 'Ora dorata',
    'astro.blueHour': 'Ora blu',
    'astro.morning': 'Mattina',
    'astro.evening': 'Sera',
    'astro.sunsetQuality': 'Tramonto oggi',
    'astro.sunset.dramatic': 'Spettacolare',
    'astro.sunset.normal': 'Normale',
    'astro.sunset.dull': 'Spento',
    'astro.sunset.cloudHint': 'nuvole {cl}%',
    'astro.stars': 'Visibilità stelle',
    'astro.stars.excellent': 'Eccellente',
    'astro.stars.good': 'Buona',
    'astro.stars.moderate': 'Moderata',
    'astro.stars.poor': 'Scarsa',
    'astro.stars.veryPoor': 'Molto scarsa',
    'astro.stars.hint': 'nuvole {cl}% · luna {moon}%',
    'chart.title': 'Oggi · previsione oraria',
    'chart.sub.avg': 'Media su 8 modelli',
    'chart.sub.named': 'Previsione di {name}',
    'precip.title': 'Precipitazioni',
    'precip.sub': 'Previsione mm/h per le prossime 48 ore',
    'precip.tomorrow': 'domani',
    'precip.legend': 'mm/h',
    'hdm.title': 'Orario',
    'precipDetail.title': 'Dettagli precipitazioni',
    'metric.rain.tapHint': 'Tocca per vedere grafico, rischio temporali e radar',
    'metric.wind.tapHint': 'Tocca per vedere il grafico orario del vento',
    'metric.pressure.tapHint': 'Tocca per vedere il grafico orario della pressione',
    'metric.humidity.tapHint': 'Tocca per vedere il grafico orario dell\'umidità',
    'radar.title': 'Radar precipitazioni',
    'radar.sub': 'Precipitazioni in tempo reale delle ultime 2 ore + previsione ECMWF per le prossime 72 ore',
    'radar.loading': 'Caricamento dei tile radar…',
    'radar.error': 'Impossibile caricare i dati radar',
    'radar.empty': 'Nessun dato radar per quest\'area',
    'radar.now': 'ora',
    'radar.forecast': 'previsione',
    'radar.tabLive': 'Radar · 2 h',
    'radar.tabForecast': 'Previsione · 72 h',
    'radar.windyHint': 'Tramite il widget Windy.com con il modello ECMWF',
    'search.chip': 'Trova finestra',
    'search.aria': 'Trova finestra meteo',
    'search.label': 'Ricerca inversa',
    'search.title': 'Quando arriverà il tempo giusto?',
    'search.sub': 'Descrivi la condizione — troveremo la prossima finestra nella previsione a 10 giorni',
    'search.placeholder': 'es. niente pioggia per 6 h, caldo sopra +20, mattino sereno',
    'search.button': 'Trova',
    'search.popularTitle': 'Richieste popolari',
    'search.empty.title': 'Nessuna finestra simile nei prossimi 10 giorni',
    'search.empty.hint': 'Prova una condizione diversa tra i suggerimenti',
    'search.empty.closest': 'Più vicina: {when}',
    'search.error.parse': 'Impossibile interpretare la richiesta. Prova un esempio dai suggerimenti.',
    'search.results.found': 'Trovate {n} {label}',
    'search.results.label.one': 'finestra',
    'search.results.label.few': 'finestre',
    'search.results.label.many': 'finestre',
    'search.duration.hours': '{n} h',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'vento {v} {unit}',
    'search.day.today': 'Oggi',
    'search.day.tomorrow': 'Domani',
    'search.preset.norain': 'niente pioggia ≥6 h',
    'search.preset.warm': 'caldo sopra +20',
    'search.preset.clear': 'cielo sereno',
    'search.preset.calm': 'nessun vento',
    'search.preset.run': 'buono per correre',
    'search.preset.bbq': 'tempo da barbecue',
    'search.preset.carwash': 'lavaggio auto',
    'search.preset.storm': 'quando temporale',
    'fav.add': '+ Aggiungi città',
    'fav.addToFav': 'Ai preferiti',
    'fav.removeFromFav': 'Rimuovi dai preferiti',
    'city.section.favorites': 'Preferiti',
    'city.section.ua': 'Città ucraine',
    'city.section.world': 'Città del mondo',
    'city.section.searchResults': 'Risultati ricerca',
    'chart.legendTemp': 'Temperatura',
    'chart.legendPrecip': 'Precipitazioni',
    'sources.title': 'Fonte previsione',
    'sources.sub': 'Scegli una fonte o usa la media di tutti gli 8 modelli',
    'sources.avgTitle': 'Media di tutti i servizi',
    'sources.avgSub': 'Aggregazione di 8 modelli · previsione di ensemble',
    'sources.confHint': 'Barra colorata sotto la carta del giorno — accordo degli 8 modelli:',
    'sources.confLegend.high': 'affidabile',
    'sources.confLegend.mid': 'medio',
    'sources.confLegend.low': 'incerto',
    'sources.confLegend.veryLow': 'grande dispersione',
    'alert.heat.title': 'Caldo intenso ({t}°)',
    'alert.heat.msg': 'Bevi acqua ogni ora, evita il sole dalle 11 alle 16. Abbigliamento leggero, cappello',
    'alert.extremeHeat.title': 'Caldo estremo ({t}°)',
    'alert.extremeHeat.msg': 'Pericolo per la salute. Limita le attività all\'aperto, rischio di colpo di calore',
    'alert.cold.title': 'Gelo intenso ({t}°)',
    'alert.cold.msg': 'Vestiti caldo, copri viso e mani. Evita lunghe passeggiate',
    'alert.extremeCold.title': 'Gelo estremo ({t}°)',
    'alert.extremeCold.msg': 'Rischio di congelamento in 10–20 min. Resta al chiuso se non necessario',
    'pullRefresh.pull': 'Tira per aggiornare',
    'pullRefresh.ready': 'Rilascia per aggiornare',
    'pullRefresh.refreshing': 'Aggiornamento...',
    'compare.chip': 'Confronta',
    'compare.chipAria': 'Confronta il meteo con un\'altra città',
    'compare.bannerLabel': 'Confronto',
    'compare.exitAria': 'Esci dal modo confronto',
    'compare.pickLabel': 'Confronta con',
    'compare.pickTitle': 'Scegli la seconda città',
    'compare.pickHint': 'Preferiti o ricerca mondiale',
    'compare.hourlyTitle': 'Temperatura oraria · oggi',
    'compare.daysTitle': '7 giorni',
    'compare.summary.same': 'Oggi meteo simile in entrambe le città',
    'compare.summary.warmerA': 'A {a} oggi più caldo di {d}°',
    'compare.summary.warmerB': 'A {b} oggi più caldo di {d}°',
    'compare.summary.drierA': '{a} è più secca, precipitazioni {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} è più secca, precipitazioni {pb}% vs {pa}%',
    'compare.loading': 'Caricamento meteo per {city}…',
    'compare.error': 'Impossibile caricare il meteo per {city}',
    'compare.swapA': 'Cambia la prima città',
    'compare.swapB': 'Cambia la seconda città',
    'sources.avgShort': 'Media di 8 modelli',
    'sources.dividerOr': 'oppure una fonte specifica',
    'confidence.label': 'Accordo dei modelli',
    'confidence.high': 'alto',
    'confidence.mid': 'moderato',
    'confidence.low': 'basso',
    'confidence.veryLow': 'scarso',
    'confidence.tooltip': '{n} modelli · dispersione ±{range}°C sulla temperatura massima di oggi',
    'chart.spreadLabel': 'Dispersione tra 8 modelli',
    'windows.title': 'Finestre di attività',
    'windows.sub': 'Miglior momento per attività quotidiane nei prossimi 5 giorni',
    'windows.preset.jogging': 'Jogging',
    'windows.preset.kids': 'Passeggiata con bambino',
    'windows.preset.bbq': 'Barbecue / all\'aperto',
    'windows.preset.laundry': 'Asciugare il bucato fuori',
    'windows.preset.carwash': 'Lavare l\'auto',
    'windows.preset.watering': 'Annaffiare le piante',
    'windows.today': 'Oggi',
    'windows.tomorrow': 'Domani',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'durata {h} h',
    'windows.noWindow': 'Nessuna finestra adatta nei prossimi 5 giorni',
    'windows.carwash.dry': 'Asciutto per {h} h consecutive',
    'windows.carwash.notRec': 'Non consigliato · pioggia prevista',
    'climate.title': 'Contesto climatico',
    'climate.sub': 'Oggi vs media 5 anni per questa data',
    'climate.tempLabel': 'Massima giornaliera',
    'climate.minLabel': 'Minima notturna',
    'climate.precipLabel': 'Precipitazioni in 5 giorni',
    'climate.norm': 'normale {v}',
    'climate.warmer': '+{v}° più caldo',
    'climate.colder': '−{v}° più freddo',
    'climate.aboutNorm': 'circa normale',
    'climate.wetter': '+{v}% più umido',
    'climate.drier': '−{v}% più secco',
    'climate.sparkTitle': 'In questa data negli anni passati',
    'climate.sparkEmpty': 'Dati di archivio non disponibili',
    'climate.loading': 'Caricamento storico...',
    'pollen.title': 'Pollini oggi',
    'pollen.sub': 'Concentrazione di allergeni nell\'aria (grani/m³)',
    'pollen.alder': 'Ontano',
    'pollen.birch': 'Betulla',
    'pollen.grass': 'Graminacee',
    'pollen.mugwort': 'Artemisia',
    'pollen.olive': 'Olivo',
    'pollen.ragweed': 'Ambrosia',
    'pollen.level.none': 'Non rilevato',
    'pollen.level.low': 'Basso',
    'pollen.level.mid': 'Moderato',
    'pollen.level.high': 'Alto',
    'pollen.level.veryHigh': 'Molto alto',
    'storm.title': 'Tracker temporali',
    'storm.sub': 'Rischio orario di temporale per le prossime 48 ore',
    'storm.noStorm': 'Nessun temporale previsto nelle prossime 48 ore',
    'storm.upcoming': 'Temporale tra {hours} h',
    'storm.now': 'Temporale ora',
    'storm.risk0': 'nessun rischio',
    'storm.risk1': 'basso',
    'storm.risk2': 'moderato',
    'storm.risk3': 'alto',
    'storm.risk4': 'pericoloso',
    'storm.desc1': 'tuoni lontani possibili, niente pioggia',
    'storm.desc2': 'temporali localizzati con pioggia',
    'storm.desc3': 'pioggia forte con tuoni, raffiche',
    'storm.desc4': 'temporali violenti, rischio grandine e raffiche',
    'storm.axisNow': 'ora',
    'storm.alertSoon': 'Temporale previsto entro {hours} h',
    'storm.alertNow': 'Temporale in corso ora',
    'accuracy.title': 'Precisione delle fonti',
    'accuracy.subEmpty': 'Raccolta dati previsione-vs-reale per la tua località',
    'accuracy.subData': 'Errore assoluto medio sugli ultimi {n} confronti',
    'accuracy.groundTruth': 'con osservazioni reali',
    'accuracy.colTempMax': 'T-max',
    'accuracy.colTempMin': 'T-min',
    'accuracy.leaderTempMax': 'T giorno:',
    'accuracy.leaderTempMin': 'T notte:',
    'accuracy.leaderPrecip': 'precip.:',
    'accuracy.leaderAvgAll': 'La media batte ogni singolo modello su tutte le metriche',
    'accuracy.leaderBestAll': 'è il più preciso su tutte le metriche',
    'nowcast.now.until.rain':         'Pioggia ora · fino a ~{time}',
    'nowcast.now.until.drizzle':      'Pioviggine ora · fino a ~{time}',
    'nowcast.now.until.snow':         'Neve ora · fino a ~{time}',
    'nowcast.now.until.sleet':        'Nevischio · fino a ~{time}',
    'nowcast.now.until.freezing':     'Pioggia gelata · fino a ~{time}',
    'nowcast.now.until.storm':        'Temporale ora · fino a ~{time}',
    'nowcast.now.continues.rain':     'Pioggia ora · 2 h+ continua',
    'nowcast.now.continues.drizzle':  'Pioviggine · 2 h+ continua',
    'nowcast.now.continues.snow':     'Neve ora · 2 h+ continua',
    'nowcast.now.continues.sleet':    'Nevischio · 2 h+ continuo',
    'nowcast.now.continues.freezing': 'Pioggia gelata · 2 h+ continua',
    'nowcast.now.continues.storm':    'Temporale · 2 h+ continuo',
    'nowcast.soon.rain':              'Pioggia tra ~{min} min',
    'nowcast.soon.drizzle':           'Pioviggine tra ~{min} min',
    'nowcast.soon.snow':              'Neve tra ~{min} min',
    'nowcast.soon.sleet':             'Nevischio tra ~{min} min',
    'nowcast.soon.freezing':          'Pioggia gelata tra ~{min} min',
    'nowcast.soon.storm':             'Temporale tra ~{min} min',
    'nowcast.dry':                    'Asciutto nelle prossime 2 ore',
    'accuracy.emptyTitle': 'Raccolta dati',
    'accuracy.emptyHint': 'Apri il sito una volta al giorno — dopo circa una settimana vedrai una classifica dei modelli con MAE per temperatura e precipitazioni specifica per questa località',
    'accuracy.samplesUnit': 'campioni',
    'accuracy.colModel': 'Modello',
    'accuracy.colScore': 'Precisione complessiva',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%precip.',
    'accuracy.legendQ1': 'eccellente',
    'accuracy.legendQ2': 'buono',
    'accuracy.legendQ3': 'discreto',
    'accuracy.legendQ4': 'scarso',
    'accuracy.legendAvgWin': 'il migliore di tutti',
    'accuracy.bestBadge': 'Modello più preciso secondo i campioni recenti',
    'footer.refresh': 'Aggiorna',
    'footer.speak': 'Leggi',
    'footer.speakStop': 'Stop',
    'footer.speakAria': 'Leggi la previsione meteo ad alta voce',
    'settings.voice.label': 'Voce',
    'settings.voice.female': 'femminile',
    'settings.voice.male': 'maschile',
    'settings.voice.none': 'Voce non disponibile su questo dispositivo',
    'settings.voice.preview': 'Anteprima',
    'settings.voice.previewText': 'Ciao! Leggerò la previsione del tempo.',
    'settings.voice.rate.label': 'Velocità',
    'settings.voice.rate.slow': 'lenta',
    'settings.voice.rate.normal': 'normale',
    'settings.voice.rate.fast': 'veloce',
    'footer.updated': 'aggiornato alle {time}',
    'modal.closeAria': 'Chiudi',
    'modal.day.forecast': 'Previsione',
    'modal.day.today': 'Oggi',
    'modal.day.dayLen': 'Durata del giorno: {len}',
    'modal.day.uvScale': 'Scala 0-11+',
    'modal.day.pm25norm': 'PM2.5 normale',
    'modal.day.hourlyTitle': 'Temperatura e precipitazioni orarie',
    'modal.day.hoursTitle': 'Ora per ora',
    'city.label': 'Luogo',
    'city.title': 'Dove controllare il meteo?',
    'city.useMyLocation': 'Usa la mia posizione',
    'city.geoDesc': 'Il browser chiederà il permesso. Le coordinate restano nel tuo browser',
    'city.search.placeholder': 'Cerca città in Ucraina...',
    'city.search.clearAria': 'Cancella',
    'city.list.popular': 'Città ucraine popolari',
    'city.list.foundLocal': 'Trovata tra le popolari',
    'city.list.searching': 'Ricerca...',
    'city.list.found': 'Trovate: {n}',
    'city.list.notFound': 'Nessun risultato',
    'city.list.empty': 'Città non trovata. Prova un altro nome.',
    'city.list.emptyForQuery': 'Città „{q}" non trovata nel database Open-Meteo Ucraina.',
    'city.list.searchError': 'Ricerca fallita. Controlla la connessione internet.',
    'city.list.minChars': 'Inserisci almeno 2 caratteri',
    'city.list.aria': 'Elenco città',
    'city.tag.geo': '📍 per geolocalizzazione',
    'city.tag.manual': '✋ scelta',
    'city.geoErr.denied': 'Accesso alla posizione negato. Consentilo nelle impostazioni del browser.',
    'city.geoErr.unavailable': 'Posizione non disponibile (nessun segnale GPS/rete)',
    'city.geoErr.timeout': 'Timeout della richiesta',
    'city.geoErr.notSupported': 'Il browser non supporta la geolocalizzazione',
    'city.geoErr.generic': 'Errore di geolocalizzazione',
    'loader.fetching': 'Caricamento previsione...',
    'loader.refreshing': 'Aggiornamento...',
    'apiErr.title': 'Caricamento previsione fallito',
    'apiErr.msg': 'Vengono mostrati dati demo. Controlla la connessione e riprova.',
    'apiErr.retry': 'Riprova',
    'apiErr.cors': 'Servizio meteo irraggiungibile (CORS / rete)',
    'apiErr.timeout': 'Timeout della risposta Open-Meteo',
    'apiErr.http': 'Errore di risposta del server ({code})',
    'apiErr.parse': 'Impossibile analizzare la risposta Open-Meteo',
    'settings.aria': 'Impostazioni',
    'settings.label': 'Impostazioni',
    'settings.title': 'Impostazioni',
    'settings.theme.title': 'Aspetto',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Scuro',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Chiaro',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Sistema',
    'settings.lang.title': 'Lingua dell\'interfaccia',
    'settings.temp.title': 'Temperatura',
    'settings.temp.c': 'Celsius',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Velocità del vento',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'metri/sec',
    'settings.wind.kmh.unit': 'km/h',
    'settings.wind.kmh.full': 'chilometri/ora',
    'settings.wind.mph.full': 'miglia/ora',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'nodi',
    'settings.pressure.title': 'Pressione atmosferica',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'millimetri Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'ettopascal',
    'settings.pressure.inhg.full': 'pollici Hg',
    'cond.clear': 'Sereno',
    'cond.partlyCloudy': 'Parzialmente nuvoloso',
    'cond.cloudy': 'Nuvoloso',
    'cond.overcast': 'Coperto',
    'cond.rain': 'Pioggia',
    'cond.heavyRain': 'Pioggia forte',
    'cond.thunderstorm': 'Temporale',
    'cond.snow': 'Neve',
    'cond.fog': 'Nebbia',
    'cond.partlyCloudyWithClear': 'Nuvoloso con schiarite',
    'condDesc.day0': 'Fronte NO, pioviggine occasionale',
    'condDesc.day1': 'Ciclone attivo, forti precipitazioni nel pomeriggio',
    'condDesc.day2': 'Ciclone in allontanamento, nuvole residue',
    'condDesc.day3': 'Anticiclone, giornata soleggiata',
    'condDesc.day4': 'Vento leggero, nuvolosità variabile',
    'condDesc.clear': 'Giornata serena e soleggiata',
    'condDesc.clearWindy': 'Sereno e ventoso',
    'condDesc.partlyCloudy': 'Parzialmente nuvoloso',
    'condDesc.cloudy': 'Prevalentemente nuvoloso',
    'condDesc.overcast': 'Coperto tutto il giorno',
    'condDesc.fog': 'Nebbioso, scarsa visibilità',
    'condDesc.rainLight': 'Possibili precipitazioni leggere',
    'condDesc.rain': 'Pioggia, a tratti intensa',
    'condDesc.heavyRain': 'Forti rovesci, attese precipitazioni significative',
    'condDesc.snow': 'Nevicata',
    'condDesc.thunderstorm': 'Possibile temporale con fulmini',
    'condDesc.windAddition': ', forte vento {dir}',
    'uvLabel.low': 'Basso',
    'uvLabel.moderate': 'Moderato',
    'uvLabel.high': 'Alto',
    'uvLabel.veryHigh': 'Molto alto',
    'uvLabel.extreme': 'Estremo',
    'aqiLabel.good': 'Buona',
    'aqiLabel.moderate': 'Moderata',
    'aqiLabel.unhealthySens': 'Insalubre per soggetti sensibili',
    'aqiLabel.unhealthy': 'Insalubre',
    'aqiLabel.veryUnhealthy': 'Molto insalubre',
    'aqiLabel.hazardous': 'Pericolosa',
    'moon.new': 'Luna nuova',
    'moon.waxingCrescent': 'Falce crescente',
    'moon.firstQuarter': 'Primo quarto',
    'moon.waxingGibbous': 'Gibbosa crescente',
    'moon.full': 'Luna piena',
    'moon.waningGibbous': 'Gibbosa calante',
    'moon.lastQuarter': 'Ultimo quarto',
    'moon.waningCrescent': 'Falce calante',
    'windDir.N': 'N',   'windDir.NE': 'NE', 'windDir.E': 'E',  'windDir.SE': 'SE',
    'windDir.S': 'S',   'windDir.SW': 'SO', 'windDir.W': 'O',  'windDir.NW': 'NO',
    'windDirFull.N': 'Settentrionale', 'windDirFull.NE': 'Nord-orientale', 'windDirFull.E': 'Orientale', 'windDirFull.SE': 'Sud-orientale',
    'windDirFull.S': 'Meridionale',    'windDirFull.SW': 'Sud-occidentale', 'windDirFull.W': 'Occidentale', 'windDirFull.NW': 'Nord-occidentale',
    'day.tap': 'dettagli',
    'day.today': 'Oggi',
    'day.short.mon': 'Lun', 'day.short.tue': 'Mar', 'day.short.wed': 'Mer', 'day.short.thu': 'Gio',
    'day.short.fri': 'Ven', 'day.short.sat': 'Sab', 'day.short.sun': 'Dom',
    'day.full.mon': 'Lunedì', 'day.full.tue': 'Martedì', 'day.full.wed': 'Mercoledì', 'day.full.thu': 'Giovedì',
    'day.full.fri': 'Venerdì', 'day.full.sat': 'Sabato', 'day.full.sun': 'Domenica',
    'month.1': 'gennaio', 'month.2': 'febbraio', 'month.3': 'marzo', 'month.4': 'aprile',
    'month.5': 'maggio', 'month.6': 'giugno', 'month.7': 'luglio', 'month.8': 'agosto',
    'month.9': 'settembre', 'month.10': 'ottobre', 'month.11': 'novembre', 'month.12': 'dicembre'
  },
  es: {
    'html.lang': 'es',
    'header.changeCity': 'Cambiar ciudad',
    'header.editHint': 'Haz clic para cambiar',
    'header.sourceLabel': 'Fuente de datos',
    'header.sourceShort': 'Fuente',
    'hero.label': 'Ahora',
    'hero.feels': 'Sensación {feels}',
    'hero.feelsBeforeSunrise': 'Sensación {feels} · Amanecer a las {sunrise}',
    'hero.feelsBeforeSunset':  'Sensación {feels} · Atardecer a las {sunset}',
    'hero.feelsAfterSunset':   'Sensación {feels} · Atardecer fue a las {sunset}',
    'hero.sourceNote': 'Fuente: {name}',
    'hero.sourceAvg': 'promedio de 8 modelos',
    'metric.temp': 'Temperatura',
    'metric.feels': 'Sensación',
    'metric.wind': 'Viento',
    'metric.rain': 'Precipitaciones',
    'metric.pressure': 'Presión',
    'metric.humidity': 'Humedad',
    'metric.dewpoint': 'Punto de rocío',
    'metric.uv': 'Índice UV',
    'metric.visibility': 'Visibilidad',
    'metric.solar': 'Radiación solar',
    'metric.windSub': '{dir} · ráfagas {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'sin precipitaciones',
    'metric.rain.light': 'lluvia ligera',
    'metric.rain.moderate': 'lluvia moderada',
    'metric.rain.heavy': 'lluvia fuerte',
    'metric.pressure.falling': 'Cae ↓',
    'metric.pressure.rising': 'Sube ↑',
    'metric.pressure.stable': 'Estable',
    'metric.humidity.dewPoint': 'Punto de rocío {t}',
    'astro.sun': 'Sol',
    'astro.sunrise': 'Amanecer',
    'astro.sunset': 'Atardecer',
    'astro.uv': 'Índice UV',
    'astro.aqi': 'Calidad del aire',
    'astro.dayLen': '{h} h {m} min',
    'astro.photoTitle': 'Para fotografía y astronomía',
    'astro.photoSub': 'Hora dorada / azul, calidad del atardecer, visibilidad estelar',
    'astro.goldenHour': 'Hora dorada',
    'astro.blueHour': 'Hora azul',
    'astro.morning': 'Mañana',
    'astro.evening': 'Tarde',
    'astro.sunsetQuality': 'Atardecer hoy',
    'astro.sunset.dramatic': 'Espectacular',
    'astro.sunset.normal': 'Normal',
    'astro.sunset.dull': 'Apagado',
    'astro.sunset.cloudHint': 'nubes {cl}%',
    'astro.stars': 'Visibilidad estelar',
    'astro.stars.excellent': 'Excelente',
    'astro.stars.good': 'Buena',
    'astro.stars.moderate': 'Moderada',
    'astro.stars.poor': 'Pobre',
    'astro.stars.veryPoor': 'Muy pobre',
    'astro.stars.hint': 'nubes {cl}% · luna {moon}%',
    'chart.title': 'Hoy · previsión horaria',
    'chart.sub.avg': 'Promedio sobre 8 modelos',
    'chart.sub.named': 'Previsión por {name}',
    'precip.title': 'Precipitaciones',
    'precip.sub': 'Previsión mm/h para las próximas 48 horas',
    'precip.tomorrow': 'mañana',
    'precip.legend': 'mm/h',
    'hdm.title': 'Por hora',
    'precipDetail.title': 'Detalles de precipitaciones',
    'metric.rain.tapHint': 'Toca para ver gráfico, riesgo de tormenta y radar',
    'metric.wind.tapHint': 'Toca para ver el gráfico horario del viento',
    'metric.pressure.tapHint': 'Toca para ver el gráfico horario de la presión',
    'metric.humidity.tapHint': 'Toca para ver el gráfico horario de la humedad',
    'radar.title': 'Radar de precipitaciones',
    'radar.sub': 'Precipitaciones en vivo de las últimas 2 horas + previsión ECMWF para las próximas 72 horas',
    'radar.loading': 'Cargando teselas de radar…',
    'radar.error': 'Error al cargar los datos del radar',
    'radar.empty': 'Sin datos de radar para esta zona',
    'radar.now': 'ahora',
    'radar.forecast': 'previsión',
    'radar.tabLive': 'Radar · 2 h',
    'radar.tabForecast': 'Previsión · 72 h',
    'radar.windyHint': 'Impulsado por el widget Windy.com con el modelo ECMWF',
    'search.chip': 'Buscar ventana',
    'search.aria': 'Buscar ventana meteorológica',
    'search.label': 'Búsqueda inversa',
    'search.title': '¿Cuándo llegará el clima adecuado?',
    'search.sub': 'Describe la condición — encontraremos la ventana más cercana en la previsión de 10 días',
    'search.placeholder': 'ej. sin lluvia 6 h, cálido sobre +20, mañana despejada',
    'search.button': 'Buscar',
    'search.popularTitle': 'Búsquedas populares',
    'search.empty.title': 'No hay tal ventana en los próximos 10 días',
    'search.empty.hint': 'Prueba otra condición de las sugerencias',
    'search.empty.closest': 'Más cercana: {when}',
    'search.error.parse': 'No se pudo interpretar la consulta. Prueba un ejemplo de las sugerencias.',
    'search.results.found': 'Encontradas {n} {label}',
    'search.results.label.one': 'ventana',
    'search.results.label.few': 'ventanas',
    'search.results.label.many': 'ventanas',
    'search.duration.hours': '{n} h',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'viento {v} {unit}',
    'search.day.today': 'Hoy',
    'search.day.tomorrow': 'Mañana',
    'search.preset.norain': 'sin lluvia ≥6 h',
    'search.preset.warm': 'cálido sobre +20',
    'search.preset.clear': 'cielo despejado',
    'search.preset.calm': 'sin viento',
    'search.preset.run': 'bueno para correr',
    'search.preset.bbq': 'clima para barbacoa',
    'search.preset.carwash': 'lavado de coche',
    'search.preset.storm': 'cuándo tormenta',
    'fav.add': '+ Añadir ciudad',
    'fav.addToFav': 'A favoritos',
    'fav.removeFromFav': 'Quitar de favoritos',
    'city.section.favorites': 'Favoritos',
    'city.section.ua': 'Ciudades ucranianas',
    'city.section.world': 'Ciudades del mundo',
    'city.section.searchResults': 'Resultados de búsqueda',
    'chart.legendTemp': 'Temperatura',
    'chart.legendPrecip': 'Precipitaciones',
    'sources.title': 'Fuente de previsión',
    'sources.sub': 'Elige una fuente o usa el promedio de los 8 modelos',
    'sources.avgTitle': 'Promedio de todos los servicios',
    'sources.avgSub': 'Agregación de 8 modelos · previsión por ensemble',
    'sources.confHint': 'Barra de color bajo la tarjeta del día — acuerdo de los 8 modelos:',
    'sources.confLegend.high': 'fiable',
    'sources.confLegend.mid': 'medio',
    'sources.confLegend.low': 'inestable',
    'sources.confLegend.veryLow': 'gran dispersión',
    'alert.heat.title': 'Calor intenso ({t}°)',
    'alert.heat.msg': 'Bebe agua cada hora, evita el sol de 11 a 16. Ropa ligera, sombrero',
    'alert.extremeHeat.title': 'Calor extremo ({t}°)',
    'alert.extremeHeat.msg': 'Riesgo para la salud. Limita la actividad al aire libre, riesgo de golpe de calor',
    'alert.cold.title': 'Helada fuerte ({t}°)',
    'alert.cold.msg': 'Abrígate, cubre cara y manos. Evita paseos largos',
    'alert.extremeCold.title': 'Helada extrema ({t}°)',
    'alert.extremeCold.msg': 'Riesgo de congelación en 10–20 min. Mantente en interiores salvo necesidad',
    'pullRefresh.pull': 'Tira para actualizar',
    'pullRefresh.ready': 'Suelta para actualizar',
    'pullRefresh.refreshing': 'Actualizando...',
    'compare.chip': 'Comparar',
    'compare.chipAria': 'Comparar el tiempo con otra ciudad',
    'compare.bannerLabel': 'Comparación',
    'compare.exitAria': 'Salir del modo comparación',
    'compare.pickLabel': 'Comparar con',
    'compare.pickTitle': 'Elige la segunda ciudad',
    'compare.pickHint': 'Favoritos o búsqueda mundial',
    'compare.hourlyTitle': 'Temperatura horaria · hoy',
    'compare.daysTitle': '7 días',
    'compare.summary.same': 'Hoy clima similar en ambas ciudades',
    'compare.summary.warmerA': 'En {a} hoy más cálido en {d}°',
    'compare.summary.warmerB': 'En {b} hoy más cálido en {d}°',
    'compare.summary.drierA': '{a} está más seca, precipitaciones {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} está más seca, precipitaciones {pb}% vs {pa}%',
    'compare.loading': 'Cargando el tiempo para {city}…',
    'compare.error': 'Error al cargar el tiempo para {city}',
    'compare.swapA': 'Cambiar la primera ciudad',
    'compare.swapB': 'Cambiar la segunda ciudad',
    'sources.avgShort': 'Promedio de 8 modelos',
    'sources.dividerOr': 'o una fuente específica',
    'confidence.label': 'Acuerdo de modelos',
    'confidence.high': 'alto',
    'confidence.mid': 'moderado',
    'confidence.low': 'bajo',
    'confidence.veryLow': 'pobre',
    'confidence.tooltip': '{n} modelos · dispersión ±{range}°C en la temperatura máxima de hoy',
    'chart.spreadLabel': 'Dispersión entre 8 modelos',
    'windows.title': 'Ventanas de actividad',
    'windows.sub': 'Mejor momento para tareas cotidianas en los próximos 5 días',
    'windows.preset.jogging': 'Correr',
    'windows.preset.kids': 'Paseo con un niño',
    'windows.preset.bbq': 'Barbacoa / al aire libre',
    'windows.preset.laundry': 'Secar ropa al aire libre',
    'windows.preset.carwash': 'Lavar el coche',
    'windows.preset.watering': 'Regar plantas',
    'windows.today': 'Hoy',
    'windows.tomorrow': 'Mañana',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'duración {h} h',
    'windows.noWindow': 'No hay ventana adecuada en los próximos 5 días',
    'windows.carwash.dry': 'Seco durante {h} h seguidas',
    'windows.carwash.notRec': 'No recomendado · se espera lluvia',
    'climate.title': 'Contexto climático',
    'climate.sub': 'Hoy vs media de 5 años para esta fecha',
    'climate.tempLabel': 'Máxima diaria',
    'climate.minLabel': 'Mínima nocturna',
    'climate.precipLabel': 'Precipitaciones en 5 días',
    'climate.norm': 'normal {v}',
    'climate.warmer': '+{v}° más cálido',
    'climate.colder': '−{v}° más frío',
    'climate.aboutNorm': 'cerca de lo normal',
    'climate.wetter': '+{v}% más húmedo',
    'climate.drier': '−{v}% más seco',
    'climate.sparkTitle': 'En esta fecha en años pasados',
    'climate.sparkEmpty': 'Datos de archivo no disponibles',
    'climate.loading': 'Cargando historial...',
    'pollen.title': 'Polen hoy',
    'pollen.sub': 'Concentración de alérgenos en el aire (granos/m³)',
    'pollen.alder': 'Aliso',
    'pollen.birch': 'Abedul',
    'pollen.grass': 'Gramíneas',
    'pollen.mugwort': 'Artemisa',
    'pollen.olive': 'Olivo',
    'pollen.ragweed': 'Ambrosía',
    'pollen.level.none': 'No detectado',
    'pollen.level.low': 'Bajo',
    'pollen.level.mid': 'Moderado',
    'pollen.level.high': 'Alto',
    'pollen.level.veryHigh': 'Muy alto',
    'storm.title': 'Rastreador de tormentas',
    'storm.sub': 'Riesgo horario de tormenta para las próximas 48 horas',
    'storm.noStorm': 'Sin tormentas previstas en las próximas 48 horas',
    'storm.upcoming': 'Tormenta en {hours} h',
    'storm.now': 'Tormenta ahora',
    'storm.risk0': 'sin riesgo',
    'storm.risk1': 'bajo',
    'storm.risk2': 'moderado',
    'storm.risk3': 'alto',
    'storm.risk4': 'peligroso',
    'storm.desc1': 'truenos lejanos posibles, sin lluvia',
    'storm.desc2': 'tormentas localizadas con lluvia',
    'storm.desc3': 'lluvia fuerte con truenos, ráfagas',
    'storm.desc4': 'tormentas severas, riesgo de granizo y ráfagas',
    'storm.axisNow': 'ahora',
    'storm.alertSoon': 'Tormenta prevista en las próximas {hours} h',
    'storm.alertNow': 'Tormenta en curso ahora',
    'accuracy.title': 'Precisión de las fuentes',
    'accuracy.subEmpty': 'Recopilando datos previsión-vs-real para tu ubicación',
    'accuracy.subData': 'Error absoluto medio en las últimas {n} comparaciones',
    'accuracy.groundTruth': 'con observaciones reales',
    'accuracy.colTempMax': 'T-máx.',
    'accuracy.colTempMin': 'T-mín.',
    'accuracy.leaderTempMax': 'T del día:',
    'accuracy.leaderTempMin': 'T de noche:',
    'accuracy.leaderPrecip': 'precip.:',
    'accuracy.leaderAvgAll': 'La media supera a cada modelo individual en todas las métricas',
    'accuracy.leaderBestAll': 'es la más precisa en todas las métricas',
    'nowcast.now.until.rain':         'Lluvia ahora · hasta ~{time}',
    'nowcast.now.until.drizzle':      'Llovizna ahora · hasta ~{time}',
    'nowcast.now.until.snow':         'Nieve ahora · hasta ~{time}',
    'nowcast.now.until.sleet':        'Aguanieve · hasta ~{time}',
    'nowcast.now.until.freezing':     'Lluvia helada · hasta ~{time}',
    'nowcast.now.until.storm':        'Tormenta ahora · hasta ~{time}',
    'nowcast.now.continues.rain':     'Lluvia ahora · 2 h+ continua',
    'nowcast.now.continues.drizzle':  'Llovizna · 2 h+ continua',
    'nowcast.now.continues.snow':     'Nieve ahora · 2 h+ continua',
    'nowcast.now.continues.sleet':    'Aguanieve · 2 h+ continua',
    'nowcast.now.continues.freezing': 'Lluvia helada · 2 h+ continua',
    'nowcast.now.continues.storm':    'Tormenta · 2 h+ continua',
    'nowcast.soon.rain':              'Lluvia en ~{min} min',
    'nowcast.soon.drizzle':           'Llovizna en ~{min} min',
    'nowcast.soon.snow':              'Nieve en ~{min} min',
    'nowcast.soon.sleet':             'Aguanieve en ~{min} min',
    'nowcast.soon.freezing':          'Lluvia helada en ~{min} min',
    'nowcast.soon.storm':             'Tormenta en ~{min} min',
    'nowcast.dry':                    'Seco en las próximas 2 horas',
    'accuracy.emptyTitle': 'Recopilando datos',
    'accuracy.emptyHint': 'Abre el sitio una vez al día — después de aproximadamente una semana verás un ranking de modelos con MAE para temperatura y precipitaciones específico para esta ubicación',
    'accuracy.samplesUnit': 'muestras',
    'accuracy.colModel': 'Modelo',
    'accuracy.colScore': 'Precisión global',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%precip.',
    'accuracy.legendQ1': 'excelente',
    'accuracy.legendQ2': 'buena',
    'accuracy.legendQ3': 'aceptable',
    'accuracy.legendQ4': 'pobre',
    'accuracy.legendAvgWin': 'el mejor de todos',
    'accuracy.bestBadge': 'Modelo más preciso según muestras recientes',
    'footer.refresh': 'Actualizar',
    'footer.speak': 'Leer',
    'footer.speakStop': 'Parar',
    'footer.speakAria': 'Leer la previsión meteorológica en voz alta',
    'settings.voice.label': 'Voz',
    'settings.voice.female': 'femenina',
    'settings.voice.male': 'masculina',
    'settings.voice.none': 'Voz no disponible en este dispositivo',
    'settings.voice.preview': 'Previsualizar',
    'settings.voice.previewText': '¡Hola! Voy a leer la previsión del tiempo.',
    'settings.voice.rate.label': 'Velocidad',
    'settings.voice.rate.slow': 'lenta',
    'settings.voice.rate.normal': 'normal',
    'settings.voice.rate.fast': 'rápida',
    'footer.updated': 'actualizado a las {time}',
    'modal.closeAria': 'Cerrar',
    'modal.day.forecast': 'Previsión',
    'modal.day.today': 'Hoy',
    'modal.day.dayLen': 'Duración del día: {len}',
    'modal.day.uvScale': 'Escala 0-11+',
    'modal.day.pm25norm': 'PM2.5 normal',
    'modal.day.hourlyTitle': 'Temperatura y precipitaciones horarias',
    'modal.day.hoursTitle': 'Hora a hora',
    'city.label': 'Ubicación',
    'city.title': '¿Dónde consultar el tiempo?',
    'city.useMyLocation': 'Usar mi ubicación',
    'city.geoDesc': 'El navegador pedirá permiso. Las coordenadas se quedan en tu navegador',
    'city.search.placeholder': 'Buscar ciudad en Ucrania...',
    'city.search.clearAria': 'Borrar',
    'city.list.popular': 'Ciudades ucranianas populares',
    'city.list.foundLocal': 'Encontrada en populares',
    'city.list.searching': 'Buscando...',
    'city.list.found': 'Encontradas: {n}',
    'city.list.notFound': 'Sin resultados',
    'city.list.empty': 'Ciudad no encontrada. Prueba otro nombre.',
    'city.list.emptyForQuery': 'Ciudad „{q}" no encontrada en la base Open-Meteo Ucrania.',
    'city.list.searchError': 'Error en la búsqueda. Comprueba tu conexión a internet.',
    'city.list.minChars': 'Introduce al menos 2 caracteres',
    'city.list.aria': 'Lista de ciudades',
    'city.tag.geo': '📍 por geolocalización',
    'city.tag.manual': '✋ elegida',
    'city.geoErr.denied': 'Acceso a la ubicación denegado. Permítelo en los ajustes del navegador.',
    'city.geoErr.unavailable': 'Posición no disponible (sin señal GPS/red)',
    'city.geoErr.timeout': 'Tiempo de espera agotado',
    'city.geoErr.notSupported': 'El navegador no admite geolocalización',
    'city.geoErr.generic': 'Error de geolocalización',
    'loader.fetching': 'Cargando previsión...',
    'loader.refreshing': 'Actualizando...',
    'apiErr.title': 'Error al cargar la previsión',
    'apiErr.msg': 'Mostrando datos de demostración. Comprueba la conexión e inténtalo de nuevo.',
    'apiErr.retry': 'Reintentar',
    'apiErr.cors': 'Servicio meteorológico inaccesible (CORS / red)',
    'apiErr.timeout': 'Tiempo de respuesta de Open-Meteo agotado',
    'apiErr.http': 'Error de respuesta del servidor ({code})',
    'apiErr.parse': 'No se pudo analizar la respuesta de Open-Meteo',
    'settings.aria': 'Ajustes',
    'settings.label': 'Ajustes',
    'settings.title': 'Ajustes',
    'settings.theme.title': 'Apariencia',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Oscuro',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Claro',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Sistema',
    'settings.lang.title': 'Idioma de la interfaz',
    'settings.temp.title': 'Temperatura',
    'settings.temp.c': 'Celsius',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Velocidad del viento',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'metros/seg',
    'settings.wind.kmh.unit': 'km/h',
    'settings.wind.kmh.full': 'kilómetros/hora',
    'settings.wind.mph.full': 'millas/hora',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'nudos',
    'settings.pressure.title': 'Presión atmosférica',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'milímetros Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'hectopascales',
    'settings.pressure.inhg.full': 'pulgadas Hg',
    'cond.clear': 'Despejado',
    'cond.partlyCloudy': 'Parcialmente nublado',
    'cond.cloudy': 'Nublado',
    'cond.overcast': 'Cubierto',
    'cond.rain': 'Lluvia',
    'cond.heavyRain': 'Lluvia fuerte',
    'cond.thunderstorm': 'Tormenta',
    'cond.snow': 'Nieve',
    'cond.fog': 'Niebla',
    'cond.partlyCloudyWithClear': 'Nublado con claros',
    'condDesc.day0': 'Frente NO, llovizna ocasional',
    'condDesc.day1': 'Ciclón activo, fuertes precipitaciones por la tarde',
    'condDesc.day2': 'Ciclón alejándose, nubosidad residual',
    'condDesc.day3': 'Anticiclón, día soleado',
    'condDesc.day4': 'Viento ligero, nubosidad variable',
    'condDesc.clear': 'Día claro y soleado',
    'condDesc.clearWindy': 'Despejado y ventoso',
    'condDesc.partlyCloudy': 'Parcialmente nublado',
    'condDesc.cloudy': 'Mayormente nublado',
    'condDesc.overcast': 'Cubierto todo el día',
    'condDesc.fog': 'Brumoso, mala visibilidad',
    'condDesc.rainLight': 'Posibles precipitaciones ligeras',
    'condDesc.rain': 'Lluvia, a veces intensa',
    'condDesc.heavyRain': 'Chubascos fuertes, se esperan precipitaciones significativas',
    'condDesc.snow': 'Nevada',
    'condDesc.thunderstorm': 'Posible tormenta con relámpagos',
    'condDesc.windAddition': ', fuerte viento {dir}',
    'uvLabel.low': 'Bajo',
    'uvLabel.moderate': 'Moderado',
    'uvLabel.high': 'Alto',
    'uvLabel.veryHigh': 'Muy alto',
    'uvLabel.extreme': 'Extremo',
    'aqiLabel.good': 'Buena',
    'aqiLabel.moderate': 'Moderada',
    'aqiLabel.unhealthySens': 'Insalubre para sensibles',
    'aqiLabel.unhealthy': 'Insalubre',
    'aqiLabel.veryUnhealthy': 'Muy insalubre',
    'aqiLabel.hazardous': 'Peligrosa',
    'moon.new': 'Luna nueva',
    'moon.waxingCrescent': 'Creciente',
    'moon.firstQuarter': 'Cuarto creciente',
    'moon.waxingGibbous': 'Gibosa creciente',
    'moon.full': 'Luna llena',
    'moon.waningGibbous': 'Gibosa menguante',
    'moon.lastQuarter': 'Cuarto menguante',
    'moon.waningCrescent': 'Menguante',
    'windDir.N': 'N',   'windDir.NE': 'NE', 'windDir.E': 'E',  'windDir.SE': 'SE',
    'windDir.S': 'S',   'windDir.SW': 'SO', 'windDir.W': 'O',  'windDir.NW': 'NO',
    'windDirFull.N': 'Norte', 'windDirFull.NE': 'Nordeste', 'windDirFull.E': 'Este', 'windDirFull.SE': 'Sudeste',
    'windDirFull.S': 'Sur',   'windDirFull.SW': 'Sudoeste', 'windDirFull.W': 'Oeste', 'windDirFull.NW': 'Noroeste',
    'day.tap': 'detalles',
    'day.today': 'Hoy',
    'day.short.mon': 'Lun', 'day.short.tue': 'Mar', 'day.short.wed': 'Mié', 'day.short.thu': 'Jue',
    'day.short.fri': 'Vie', 'day.short.sat': 'Sáb', 'day.short.sun': 'Dom',
    'day.full.mon': 'Lunes', 'day.full.tue': 'Martes', 'day.full.wed': 'Miércoles', 'day.full.thu': 'Jueves',
    'day.full.fri': 'Viernes', 'day.full.sat': 'Sábado', 'day.full.sun': 'Domingo',
    'month.1': 'enero', 'month.2': 'febrero', 'month.3': 'marzo', 'month.4': 'abril',
    'month.5': 'mayo', 'month.6': 'junio', 'month.7': 'julio', 'month.8': 'agosto',
    'month.9': 'septiembre', 'month.10': 'octubre', 'month.11': 'noviembre', 'month.12': 'diciembre'
  },
  ro: {
    'html.lang': 'ro',
    'header.changeCity': 'Schimbă orașul',
    'header.editHint': 'Click pentru a schimba',
    'header.sourceLabel': 'Sursa datelor',
    'header.sourceShort': 'Sursa',
    'hero.label': 'Acum',
    'hero.feels': 'Resimțit {feels}',
    'hero.feelsBeforeSunrise': 'Resimțit {feels} · Răsărit la {sunrise}',
    'hero.feelsBeforeSunset':  'Resimțit {feels} · Apus la {sunset}',
    'hero.feelsAfterSunset':   'Resimțit {feels} · Apus a fost la {sunset}',
    'hero.sourceNote': 'Sursă: {name}',
    'hero.sourceAvg': 'media a 8 modele',
    'metric.temp': 'Temperatură',
    'metric.feels': 'Resimțit',
    'metric.wind': 'Vânt',
    'metric.rain': 'Precipitații',
    'metric.pressure': 'Presiune',
    'metric.humidity': 'Umiditate',
    'metric.dewpoint': 'Punct de rouă',
    'metric.uv': 'Indice UV',
    'metric.visibility': 'Vizibilitate',
    'metric.solar': 'Radiație solară',
    'metric.windSub': '{dir} · rafale {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'fără precipitații',
    'metric.rain.light': 'ploaie ușoară',
    'metric.rain.moderate': 'ploaie moderată',
    'metric.rain.heavy': 'ploaie puternică',
    'metric.pressure.falling': 'În scădere ↓',
    'metric.pressure.rising': 'În creștere ↑',
    'metric.pressure.stable': 'Stabilă',
    'metric.humidity.dewPoint': 'Punct de rouă {t}',
    'astro.sun': 'Soare',
    'astro.sunrise': 'Răsărit',
    'astro.sunset': 'Apus',
    'astro.uv': 'Indice UV',
    'astro.aqi': 'Calitatea aerului',
    'astro.dayLen': '{h}h {m}min',
    'astro.photoTitle': 'Pentru fotografi și astronomi',
    'astro.photoSub': 'Ora aurie / albastră, calitatea apusului, vizibilitatea stelelor',
    'astro.goldenHour': 'Ora aurie',
    'astro.blueHour': 'Ora albastră',
    'astro.morning': 'Dimineața',
    'astro.evening': 'Seara',
    'astro.sunsetQuality': 'Apus astăzi',
    'astro.sunset.dramatic': 'Spectaculos',
    'astro.sunset.normal': 'Normal',
    'astro.sunset.dull': 'Mat',
    'astro.sunset.cloudHint': 'nori {cl}%',
    'astro.stars': 'Vizibilitate stele',
    'astro.stars.excellent': 'Excelentă',
    'astro.stars.good': 'Bună',
    'astro.stars.moderate': 'Moderată',
    'astro.stars.poor': 'Slabă',
    'astro.stars.veryPoor': 'Foarte slabă',
    'astro.stars.hint': 'nori {cl}% · lună {moon}%',
    'chart.title': 'Astăzi · prognoză orară',
    'chart.sub.avg': 'Media pe 8 modele',
    'chart.sub.named': 'Prognoză de la {name}',
    'precip.title': 'Precipitații',
    'precip.sub': 'Prognoză mm/h pentru următoarele 48 de ore',
    'precip.tomorrow': 'mâine',
    'precip.legend': 'mm/h',
    'hdm.title': 'Orar',
    'precipDetail.title': 'Detalii precipitații',
    'metric.rain.tapHint': 'Apasă pentru a vedea graficul, riscul de furtună și radarul',
    'metric.wind.tapHint': 'Apasă pentru a vedea graficul orar al vântului',
    'metric.pressure.tapHint': 'Apasă pentru a vedea graficul orar al presiunii',
    'metric.humidity.tapHint': 'Apasă pentru a vedea graficul orar al umidității',
    'radar.title': 'Radar precipitații',
    'radar.sub': 'Precipitații live ultimele 2 ore + prognoză ECMWF pentru următoarele 72 ore',
    'radar.loading': 'Se încarcă tile-urile radar…',
    'radar.error': 'Nu s-au putut încărca datele radar',
    'radar.empty': 'Nu există date radar pentru această zonă',
    'radar.now': 'acum',
    'radar.forecast': 'prognoză',
    'radar.tabLive': 'Radar · 2h',
    'radar.tabForecast': 'Prognoză · 72h',
    'radar.windyHint': 'Furnizat de widget-ul Windy.com cu modelul ECMWF',
    'search.chip': 'Găsește fereastră',
    'search.aria': 'Găsește fereastră meteo',
    'search.label': 'Căutare inversă',
    'search.title': 'Când vine vremea potrivită?',
    'search.sub': 'Descrie condiția — vom găsi cea mai apropiată fereastră în prognoza pe 10 zile',
    'search.placeholder': 'ex. fără ploaie 6h, cald peste +20, dimineață senină',
    'search.button': 'Caută',
    'search.popularTitle': 'Căutări populare',
    'search.empty.title': 'Nu există o astfel de fereastră în următoarele 10 zile',
    'search.empty.hint': 'Încearcă o altă condiție din sugestii',
    'search.empty.closest': 'Cea mai apropiată: {when}',
    'search.error.parse': 'Nu am putut interpreta cererea. Încearcă un exemplu din sugestii.',
    'search.results.found': 'Găsite {n} {label}',
    'search.results.label.one': 'fereastră',
    'search.results.label.few': 'ferestre',
    'search.results.label.many': 'ferestre',
    'search.duration.hours': '{n}h',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'vânt {v} {unit}',
    'search.day.today': 'Astăzi',
    'search.day.tomorrow': 'Mâine',
    'search.preset.norain': 'fără ploaie ≥6h',
    'search.preset.warm': 'cald peste +20',
    'search.preset.clear': 'cer senin',
    'search.preset.calm': 'fără vânt',
    'search.preset.run': 'bun pentru alergat',
    'search.preset.bbq': 'vreme de grătar',
    'search.preset.carwash': 'spălare mașină',
    'search.preset.storm': 'când furtună',
    'fav.add': '+ Adaugă oraș',
    'fav.addToFav': 'La favorite',
    'fav.removeFromFav': 'Șterge din favorite',
    'city.section.favorites': 'Favorite',
    'city.section.ua': 'Orașe ucrainene',
    'city.section.world': 'Orașe din lume',
    'city.section.searchResults': 'Rezultatele căutării',
    'chart.legendTemp': 'Temperatură',
    'chart.legendPrecip': 'Precipitații',
    'sources.title': 'Sursa prognozei',
    'sources.sub': 'Alege o sursă sau folosește media celor 8 modele',
    'sources.avgTitle': 'Media tuturor serviciilor',
    'sources.avgSub': 'Agregare a 8 modele · prognoză de ansamblu',
    'sources.confHint': 'Bara colorată sub cardul zilei — acordul celor 8 modele:',
    'sources.confLegend.high': 'fiabil',
    'sources.confLegend.mid': 'mediu',
    'sources.confLegend.low': 'instabil',
    'sources.confLegend.veryLow': 'dispersie mare',
    'alert.heat.title': 'Caniculă puternică ({t}°)',
    'alert.heat.msg': 'Bea apă în fiecare oră, evită soarele de la 11 la 16. Haine ușoare, pălărie',
    'alert.extremeHeat.title': 'Caniculă extremă ({t}°)',
    'alert.extremeHeat.msg': 'Pericol pentru sănătate. Limitează activitatea în aer liber, risc de insolație',
    'alert.cold.title': 'Ger puternic ({t}°)',
    'alert.cold.msg': 'Îmbracă-te călduros, acoperă fața și mâinile. Evită plimbările lungi',
    'alert.extremeCold.title': 'Ger extrem ({t}°)',
    'alert.extremeCold.msg': 'Risc de degerături în 10–20 min. Rămâi în interior dacă nu e necesar',
    'pullRefresh.pull': 'Trage pentru a reîmprospăta',
    'pullRefresh.ready': 'Eliberează pentru a reîmprospăta',
    'pullRefresh.refreshing': 'Se reîmprospătează...',
    'compare.chip': 'Compară',
    'compare.chipAria': 'Compară vremea cu alt oraș',
    'compare.bannerLabel': 'Comparație',
    'compare.exitAria': 'Ieși din modul comparație',
    'compare.pickLabel': 'Compară cu',
    'compare.pickTitle': 'Alege al doilea oraș',
    'compare.pickHint': 'Favorite sau căutare globală',
    'compare.hourlyTitle': 'Temperatură orară · astăzi',
    'compare.daysTitle': '7 zile',
    'compare.summary.same': 'Astăzi vreme similară în ambele orașe',
    'compare.summary.warmerA': 'La {a} mai cald cu {d}° astăzi',
    'compare.summary.warmerB': 'La {b} mai cald cu {d}° astăzi',
    'compare.summary.drierA': '{a} mai uscat, precipitații {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} mai uscat, precipitații {pb}% vs {pa}%',
    'compare.loading': 'Se încarcă vremea pentru {city}…',
    'compare.error': 'Nu s-a putut încărca vremea pentru {city}',
    'compare.swapA': 'Schimbă primul oraș',
    'compare.swapB': 'Schimbă al doilea oraș',
    'sources.avgShort': 'Media a 8 modele',
    'sources.dividerOr': 'sau o sursă specifică',
    'confidence.label': 'Acordul modelelor',
    'confidence.high': 'ridicat',
    'confidence.mid': 'moderat',
    'confidence.low': 'scăzut',
    'confidence.veryLow': 'slab',
    'confidence.tooltip': '{n} modele · dispersie ±{range}°C la temperatura maximă de azi',
    'chart.spreadLabel': 'Dispersie între 8 modele',
    'windows.title': 'Ferestre de activitate',
    'windows.sub': 'Cel mai bun moment pentru sarcini zilnice în următoarele 5 zile',
    'windows.preset.jogging': 'Alergare',
    'windows.preset.kids': 'Plimbare cu copil',
    'windows.preset.bbq': 'Grătar / în aer liber',
    'windows.preset.laundry': 'Uscare rufe afară',
    'windows.preset.carwash': 'Spălarea mașinii',
    'windows.preset.watering': 'Udarea plantelor',
    'windows.today': 'Astăzi',
    'windows.tomorrow': 'Mâine',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'durată {h}h',
    'windows.noWindow': 'Nu există fereastră potrivită în următoarele 5 zile',
    'windows.carwash.dry': 'Uscat {h}h consecutiv',
    'windows.carwash.notRec': 'Nu se recomandă · se așteaptă ploaie',
    'climate.title': 'Context climatic',
    'climate.sub': 'Astăzi vs media de 5 ani pentru această dată',
    'climate.tempLabel': 'Maxima zilei',
    'climate.minLabel': 'Minima nopții',
    'climate.precipLabel': 'Precipitații în 5 zile',
    'climate.norm': 'normal {v}',
    'climate.warmer': '+{v}° mai cald',
    'climate.colder': '−{v}° mai rece',
    'climate.aboutNorm': 'aproximativ normal',
    'climate.wetter': '+{v}% mai umed',
    'climate.drier': '−{v}% mai uscat',
    'climate.sparkTitle': 'La această dată în anii trecuți',
    'climate.sparkEmpty': 'Date de arhivă indisponibile',
    'climate.loading': 'Se încarcă istoricul...',
    'pollen.title': 'Polen astăzi',
    'pollen.sub': 'Concentrația alergenilor în aer (granule/m³)',
    'pollen.alder': 'Arin',
    'pollen.birch': 'Mesteacăn',
    'pollen.grass': 'Graminee',
    'pollen.mugwort': 'Pelin',
    'pollen.olive': 'Măslin',
    'pollen.ragweed': 'Ambrozie',
    'pollen.level.none': 'Nedetectat',
    'pollen.level.low': 'Scăzut',
    'pollen.level.mid': 'Moderat',
    'pollen.level.high': 'Ridicat',
    'pollen.level.veryHigh': 'Foarte ridicat',
    'storm.title': 'Tracker furtuni',
    'storm.sub': 'Risc orar de furtună pentru următoarele 48 de ore',
    'storm.noStorm': 'Nu se așteaptă furtuni în următoarele 48 de ore',
    'storm.upcoming': 'Furtună în {hours}h',
    'storm.now': 'Furtună acum',
    'storm.risk0': 'fără risc',
    'storm.risk1': 'scăzut',
    'storm.risk2': 'moderat',
    'storm.risk3': 'ridicat',
    'storm.risk4': 'periculos',
    'storm.desc1': 'posibile tunete îndepărtate, fără ploaie',
    'storm.desc2': 'furtuni localizate cu ploaie',
    'storm.desc3': 'ploaie puternică cu tunete, rafale',
    'storm.desc4': 'furtuni violente, risc de grindină și rafale',
    'storm.axisNow': 'acum',
    'storm.alertSoon': 'Furtună prevăzută în {hours}h',
    'storm.alertNow': 'Furtună în desfășurare acum',
    'accuracy.title': 'Precizia surselor',
    'accuracy.subEmpty': 'Se colectează date prognoză-vs-real pentru locația ta',
    'accuracy.subData': 'Eroare absolută medie pe ultimele {n} comparații',
    'accuracy.groundTruth': 'cu observații reale',
    'accuracy.colTempMax': 'T-max',
    'accuracy.colTempMin': 'T-min',
    'accuracy.leaderTempMax': 'T zi:',
    'accuracy.leaderTempMin': 'T noapte:',
    'accuracy.leaderPrecip': 'precip.:',
    'accuracy.leaderAvgAll': 'Media depășește fiecare model individual la toate metricile',
    'accuracy.leaderBestAll': 'este cel mai precis la toate metricile',
    'nowcast.now.until.rain':         'Ploaie acum · până la ~{time}',
    'nowcast.now.until.drizzle':      'Burniță acum · până la ~{time}',
    'nowcast.now.until.snow':         'Ninsoare acum · până la ~{time}',
    'nowcast.now.until.sleet':        'Lapoviță · până la ~{time}',
    'nowcast.now.until.freezing':     'Ploaie înghețată · până la ~{time}',
    'nowcast.now.until.storm':        'Furtună acum · până la ~{time}',
    'nowcast.now.continues.rain':     'Ploaie acum · 2h+ continuă',
    'nowcast.now.continues.drizzle':  'Burniță · 2h+ continuă',
    'nowcast.now.continues.snow':     'Ninsoare acum · 2h+ continuă',
    'nowcast.now.continues.sleet':    'Lapoviță · 2h+ continuă',
    'nowcast.now.continues.freezing': 'Ploaie înghețată · 2h+ continuă',
    'nowcast.now.continues.storm':    'Furtună · 2h+ continuă',
    'nowcast.soon.rain':              'Ploaie peste ~{min} min',
    'nowcast.soon.drizzle':           'Burniță peste ~{min} min',
    'nowcast.soon.snow':              'Ninsoare peste ~{min} min',
    'nowcast.soon.sleet':             'Lapoviță peste ~{min} min',
    'nowcast.soon.freezing':          'Ploaie înghețată peste ~{min} min',
    'nowcast.soon.storm':             'Furtună peste ~{min} min',
    'nowcast.dry':                    'Uscat în următoarele 2 ore',
    'accuracy.emptyTitle': 'Se colectează date',
    'accuracy.emptyHint': 'Deschide site-ul o dată pe zi — după aproximativ o săptămână vei vedea un clasament al modelelor cu MAE pentru temperatură și precipitații specific acestei locații',
    'accuracy.samplesUnit': 'eșantioane',
    'accuracy.colModel': 'Model',
    'accuracy.colScore': 'Precizie globală',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%precip.',
    'accuracy.legendQ1': 'excelent',
    'accuracy.legendQ2': 'bun',
    'accuracy.legendQ3': 'acceptabil',
    'accuracy.legendQ4': 'slab',
    'accuracy.legendAvgWin': 'cel mai bun dintre toate',
    'accuracy.bestBadge': 'Cel mai precis model conform eșantioanelor recente',
    'footer.refresh': 'Reîmprospătează',
    'footer.speak': 'Citește',
    'footer.speakStop': 'Stop',
    'footer.speakAria': 'Citește prognoza meteo cu voce tare',
    'settings.voice.label': 'Voce',
    'settings.voice.female': 'feminină',
    'settings.voice.male': 'masculină',
    'settings.voice.none': 'Voce indisponibilă pe acest dispozitiv',
    'settings.voice.preview': 'Previzualizare',
    'settings.voice.previewText': 'Salut! Voi citi prognoza meteo.',
    'settings.voice.rate.label': 'Viteză',
    'settings.voice.rate.slow': 'lentă',
    'settings.voice.rate.normal': 'normală',
    'settings.voice.rate.fast': 'rapidă',
    'footer.updated': 'actualizat la {time}',
    'modal.closeAria': 'Închide',
    'modal.day.forecast': 'Prognoză',
    'modal.day.today': 'Astăzi',
    'modal.day.dayLen': 'Durata zilei: {len}',
    'modal.day.uvScale': 'Scală 0-11+',
    'modal.day.pm25norm': 'PM2.5 normal',
    'modal.day.hourlyTitle': 'Temperatura și precipitațiile orare',
    'modal.day.hoursTitle': 'Oră cu oră',
    'city.label': 'Locație',
    'city.title': 'Unde verificăm vremea?',
    'city.useMyLocation': 'Folosește locația mea',
    'city.geoDesc': 'Browserul va cere permisiunea. Coordonatele rămân în browserul tău',
    'city.search.placeholder': 'Caută oraș în Ucraina...',
    'city.search.clearAria': 'Șterge',
    'city.list.popular': 'Orașe ucrainene populare',
    'city.list.foundLocal': 'Găsit în populare',
    'city.list.searching': 'Se caută...',
    'city.list.found': 'Găsite: {n}',
    'city.list.notFound': 'Nimic găsit',
    'city.list.empty': 'Oraș negăsit. Încearcă alt nume.',
    'city.list.emptyForQuery': 'Orașul „{q}" nu a fost găsit în baza Open-Meteo Ucraina.',
    'city.list.searchError': 'Căutarea a eșuat. Verifică conexiunea la internet.',
    'city.list.minChars': 'Introdu cel puțin 2 caractere',
    'city.list.aria': 'Lista orașelor',
    'city.tag.geo': '📍 după geolocație',
    'city.tag.manual': '✋ ales',
    'city.geoErr.denied': 'Acces la locație refuzat. Permite-l în setările browserului.',
    'city.geoErr.unavailable': 'Poziție indisponibilă (fără semnal GPS/rețea)',
    'city.geoErr.timeout': 'Timpul cererii a expirat',
    'city.geoErr.notSupported': 'Browserul nu suportă geolocația',
    'city.geoErr.generic': 'Eroare de geolocație',
    'loader.fetching': 'Se încarcă prognoza...',
    'loader.refreshing': 'Se reîmprospătează...',
    'apiErr.title': 'Încărcarea prognozei a eșuat',
    'apiErr.msg': 'Se afișează date demo. Verifică conexiunea și încearcă din nou.',
    'apiErr.retry': 'Reîncearcă',
    'apiErr.cors': 'Serviciu meteo inaccesibil (CORS / rețea)',
    'apiErr.timeout': 'Timpul de răspuns Open-Meteo a expirat',
    'apiErr.http': 'Eroare răspuns server ({code})',
    'apiErr.parse': 'Nu s-a putut analiza răspunsul Open-Meteo',
    'settings.aria': 'Setări',
    'settings.label': 'Setări',
    'settings.title': 'Setări',
    'settings.theme.title': 'Aspect',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Întunecat',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Luminos',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Sistem',
    'settings.lang.title': 'Limba interfeței',
    'settings.temp.title': 'Temperatură',
    'settings.temp.c': 'Celsius',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Viteza vântului',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'metri/sec',
    'settings.wind.kmh.unit': 'km/h',
    'settings.wind.kmh.full': 'kilometri/oră',
    'settings.wind.mph.full': 'mile/oră',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'noduri',
    'settings.pressure.title': 'Presiune atmosferică',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'milimetri Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'hectopascali',
    'settings.pressure.inhg.full': 'țoli Hg',
    'cond.clear': 'Senin',
    'cond.partlyCloudy': 'Parțial înnorat',
    'cond.cloudy': 'Înnorat',
    'cond.overcast': 'Acoperit',
    'cond.rain': 'Ploaie',
    'cond.heavyRain': 'Ploaie puternică',
    'cond.thunderstorm': 'Furtună',
    'cond.snow': 'Ninsoare',
    'cond.fog': 'Ceață',
    'cond.partlyCloudyWithClear': 'Înnorat cu intervale senine',
    'condDesc.day0': 'Front NV, burniță ocazională',
    'condDesc.day1': 'Ciclon activ, precipitații puternice după-amiaza',
    'condDesc.day2': 'Ciclonul se îndepărtează, nori reziduali',
    'condDesc.day3': 'Anticiclon, zi însorită',
    'condDesc.day4': 'Vânt ușor, înnorare variabilă',
    'condDesc.clear': 'Zi senină și însorită',
    'condDesc.clearWindy': 'Senin și vântos',
    'condDesc.partlyCloudy': 'Parțial înnorat',
    'condDesc.cloudy': 'Predominant înnorat',
    'condDesc.overcast': 'Acoperit toată ziua',
    'condDesc.fog': 'Cețos, vizibilitate redusă',
    'condDesc.rainLight': 'Posibile precipitații ușoare',
    'condDesc.rain': 'Ploaie, uneori intensă',
    'condDesc.heavyRain': 'Averse puternice, sunt așteptate precipitații semnificative',
    'condDesc.snow': 'Ninsoare',
    'condDesc.thunderstorm': 'Posibilă furtună cu fulgere',
    'condDesc.windAddition': ', vânt {dir} puternic',
    'uvLabel.low': 'Scăzut',
    'uvLabel.moderate': 'Moderat',
    'uvLabel.high': 'Ridicat',
    'uvLabel.veryHigh': 'Foarte ridicat',
    'uvLabel.extreme': 'Extrem',
    'aqiLabel.good': 'Bună',
    'aqiLabel.moderate': 'Moderată',
    'aqiLabel.unhealthySens': 'Nesănătoasă pentru sensibili',
    'aqiLabel.unhealthy': 'Nesănătoasă',
    'aqiLabel.veryUnhealthy': 'Foarte nesănătoasă',
    'aqiLabel.hazardous': 'Periculoasă',
    'moon.new': 'Lună nouă',
    'moon.waxingCrescent': 'Lună crescătoare',
    'moon.firstQuarter': 'Primul pătrar',
    'moon.waxingGibbous': 'Lună gheboasă crescătoare',
    'moon.full': 'Lună plină',
    'moon.waningGibbous': 'Lună gheboasă descrescătoare',
    'moon.lastQuarter': 'Ultimul pătrar',
    'moon.waningCrescent': 'Lună descrescătoare',
    'windDir.N': 'N',   'windDir.NE': 'NE', 'windDir.E': 'E',  'windDir.SE': 'SE',
    'windDir.S': 'S',   'windDir.SW': 'SV', 'windDir.W': 'V',  'windDir.NW': 'NV',
    'windDirFull.N': 'Nordic', 'windDirFull.NE': 'Nord-estic', 'windDirFull.E': 'Estic', 'windDirFull.SE': 'Sud-estic',
    'windDirFull.S': 'Sudic',  'windDirFull.SW': 'Sud-vestic', 'windDirFull.W': 'Vestic', 'windDirFull.NW': 'Nord-vestic',
    'day.tap': 'detalii',
    'day.today': 'Astăzi',
    'day.short.mon': 'Lun', 'day.short.tue': 'Mar', 'day.short.wed': 'Mie', 'day.short.thu': 'Joi',
    'day.short.fri': 'Vin', 'day.short.sat': 'Sâm', 'day.short.sun': 'Dum',
    'day.full.mon': 'Luni', 'day.full.tue': 'Marți', 'day.full.wed': 'Miercuri', 'day.full.thu': 'Joi',
    'day.full.fri': 'Vineri', 'day.full.sat': 'Sâmbătă', 'day.full.sun': 'Duminică',
    'month.1': 'ianuarie', 'month.2': 'februarie', 'month.3': 'martie', 'month.4': 'aprilie',
    'month.5': 'mai', 'month.6': 'iunie', 'month.7': 'iulie', 'month.8': 'august',
    'month.9': 'septembrie', 'month.10': 'octombrie', 'month.11': 'noiembrie', 'month.12': 'decembrie'
  },
  hu: {
    'html.lang': 'hu',
    'header.changeCity': 'Város módosítása',
    'header.editHint': 'Kattints a módosításhoz',
    'header.sourceLabel': 'Adatforrás',
    'header.sourceShort': 'Forrás',
    'hero.label': 'Most',
    'hero.feels': 'Hőérzet {feels}',
    'hero.feelsBeforeSunrise': 'Hőérzet {feels} · Napkelte: {sunrise}',
    'hero.feelsBeforeSunset':  'Hőérzet {feels} · Napnyugta: {sunset}',
    'hero.feelsAfterSunset':   'Hőérzet {feels} · Napnyugta volt: {sunset}',
    'hero.sourceNote': 'Forrás: {name}',
    'hero.sourceAvg': '8 modell átlaga',
    'metric.temp': 'Hőmérséklet',
    'metric.feels': 'Hőérzet',
    'metric.wind': 'Szél',
    'metric.rain': 'Csapadék',
    'metric.pressure': 'Légnyomás',
    'metric.humidity': 'Páratartalom',
    'metric.dewpoint': 'Harmatpont',
    'metric.uv': 'UV-index',
    'metric.visibility': 'Látótávolság',
    'metric.solar': 'Napsugárzás',
    'metric.windSub': '{dir} · széllökések {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'csapadék nélkül',
    'metric.rain.light': 'gyenge eső',
    'metric.rain.moderate': 'mérsékelt eső',
    'metric.rain.heavy': 'erős eső',
    'metric.pressure.falling': 'Csökken ↓',
    'metric.pressure.rising': 'Emelkedik ↑',
    'metric.pressure.stable': 'Stabil',
    'metric.humidity.dewPoint': 'Harmatpont {t}',
    'astro.sun': 'Nap',
    'astro.sunrise': 'Napkelte',
    'astro.sunset': 'Napnyugta',
    'astro.uv': 'UV-index',
    'astro.aqi': 'Légköri állapot',
    'astro.dayLen': '{h}ó {m}p',
    'astro.photoTitle': 'Fotósoknak és csillagászoknak',
    'astro.photoSub': 'Arany / kék óra, napnyugta minősége, csillagok láthatósága',
    'astro.goldenHour': 'Arany óra',
    'astro.blueHour': 'Kék óra',
    'astro.morning': 'Reggel',
    'astro.evening': 'Este',
    'astro.sunsetQuality': 'Napnyugta ma',
    'astro.sunset.dramatic': 'Látványos',
    'astro.sunset.normal': 'Normál',
    'astro.sunset.dull': 'Halvány',
    'astro.sunset.cloudHint': 'felhők {cl}%',
    'astro.stars': 'Csillagok láthatósága',
    'astro.stars.excellent': 'Kiváló',
    'astro.stars.good': 'Jó',
    'astro.stars.moderate': 'Mérsékelt',
    'astro.stars.poor': 'Gyenge',
    'astro.stars.veryPoor': 'Nagyon gyenge',
    'astro.stars.hint': 'felhők {cl}% · hold {moon}%',
    'chart.title': 'Ma · óránkénti előrejelzés',
    'chart.sub.avg': '8 modell átlaga',
    'chart.sub.named': 'Előrejelzés: {name}',
    'precip.title': 'Csapadék',
    'precip.sub': 'Előrejelzés mm/h a következő 48 órára',
    'precip.tomorrow': 'holnap',
    'precip.legend': 'mm/h',
    'hdm.title': 'Óránként',
    'precipDetail.title': 'Csapadék részletei',
    'metric.rain.tapHint': 'Koppints a grafikonért, zivatarkockázatért és radarért',
    'metric.wind.tapHint': 'Koppints az óránkénti szél-grafikonért',
    'metric.pressure.tapHint': 'Koppints az óránkénti nyomás-grafikonért',
    'metric.humidity.tapHint': 'Koppints az óránkénti páratartalom-grafikonért',
    'radar.title': 'Csapadékradar',
    'radar.sub': 'Élő csapadék az elmúlt 2 órából + ECMWF előrejelzés a következő 72 órára',
    'radar.loading': 'Radarcsempék betöltése…',
    'radar.error': 'Nem sikerült betölteni a radaradatokat',
    'radar.empty': 'Nincs radaradat ehhez a területhez',
    'radar.now': 'most',
    'radar.forecast': 'előrejelzés',
    'radar.tabLive': 'Radar · 2 ó',
    'radar.tabForecast': 'Előrejelzés · 72 ó',
    'radar.windyHint': 'A Windy.com widget biztosítja az ECMWF modellel',
    'search.chip': 'Ablak keresése',
    'search.aria': 'Időjárási ablak keresése',
    'search.label': 'Fordított keresés',
    'search.title': 'Mikor lesz a megfelelő idő?',
    'search.sub': 'Írd le a feltételt — megkeressük a legközelebbi ablakot a 10 napos előrejelzésben',
    'search.placeholder': 'pl. 6 óra eső nélkül, meleg +20 felett, derült reggel',
    'search.button': 'Keresés',
    'search.popularTitle': 'Népszerű kérések',
    'search.empty.title': 'Ilyen ablak nincs a következő 10 napban',
    'search.empty.hint': 'Próbálj meg másik feltételt a javaslatokból',
    'search.empty.closest': 'Legközelebbi: {when}',
    'search.error.parse': 'Nem sikerült értelmezni a kérést. Próbálj egy példát a javaslatokból.',
    'search.results.found': '{n} {label} találat',
    'search.results.label.one': 'ablak',
    'search.results.label.few': 'ablak',
    'search.results.label.many': 'ablak',
    'search.duration.hours': '{n}ó',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'szél {v} {unit}',
    'search.day.today': 'Ma',
    'search.day.tomorrow': 'Holnap',
    'search.preset.norain': 'eső nélkül ≥6ó',
    'search.preset.warm': 'meleg +20 felett',
    'search.preset.clear': 'derült ég',
    'search.preset.calm': 'szélcsend',
    'search.preset.run': 'jó futáshoz',
    'search.preset.bbq': 'grill-idő',
    'search.preset.carwash': 'autómosás',
    'search.preset.storm': 'mikor zivatar',
    'fav.add': '+ Város hozzáadása',
    'fav.addToFav': 'Kedvencekhez',
    'fav.removeFromFav': 'Eltávolítás a kedvencekből',
    'city.section.favorites': 'Kedvencek',
    'city.section.ua': 'Ukrán városok',
    'city.section.world': 'Világ városai',
    'city.section.searchResults': 'Keresési eredmények',
    'chart.legendTemp': 'Hőmérséklet',
    'chart.legendPrecip': 'Csapadék',
    'sources.title': 'Előrejelzés forrása',
    'sources.sub': 'Válassz forrást vagy használd mind a 8 modell átlagát',
    'sources.avgTitle': 'Minden szolgáltatás átlaga',
    'sources.avgSub': '8 modell aggregálása · együttes előrejelzés',
    'sources.confHint': 'Színes sáv a napi kártya alatt — a 8 modell egyetértése:',
    'sources.confLegend.high': 'megbízható',
    'sources.confLegend.mid': 'közepes',
    'sources.confLegend.low': 'ingatag',
    'sources.confLegend.veryLow': 'nagy szórás',
    'alert.heat.title': 'Erős hőség ({t}°)',
    'alert.heat.msg': 'Igyál vizet óránként, kerüld a napot 11-től 16-ig. Könnyű ruha, kalap',
    'alert.extremeHeat.title': 'Szélsőséges hőség ({t}°)',
    'alert.extremeHeat.msg': 'Egészségi kockázat. Korlátozd a szabadtéri tevékenységet, hőguta-veszély',
    'alert.cold.title': 'Erős fagy ({t}°)',
    'alert.cold.msg': 'Öltözz melegen, takard be az arcot és a kezet. Kerüld a hosszú sétákat',
    'alert.extremeCold.title': 'Szélsőséges fagy ({t}°)',
    'alert.extremeCold.msg': 'Fagyási kockázat 10–20 perc alatt. Csak szükség esetén menj ki',
    'pullRefresh.pull': 'Húzd lefelé a frissítéshez',
    'pullRefresh.ready': 'Engedd el a frissítéshez',
    'pullRefresh.refreshing': 'Frissítés...',
    'compare.chip': 'Összehasonlítás',
    'compare.chipAria': 'Időjárás összehasonlítása másik várossal',
    'compare.bannerLabel': 'Összehasonlítás',
    'compare.exitAria': 'Kilépés az összehasonlító módból',
    'compare.pickLabel': 'Összehasonlítás:',
    'compare.pickTitle': 'Válassz második várost',
    'compare.pickHint': 'Kedvencek vagy globális keresés',
    'compare.hourlyTitle': 'Óránkénti hőmérséklet · ma',
    'compare.daysTitle': '7 nap',
    'compare.summary.same': 'Ma hasonló idő mindkét városban',
    'compare.summary.warmerA': '{a} ma {d}°-kal melegebb',
    'compare.summary.warmerB': '{b} ma {d}°-kal melegebb',
    'compare.summary.drierA': '{a} szárazabb, csapadék {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} szárazabb, csapadék {pb}% vs {pa}%',
    'compare.loading': 'Időjárás betöltése: {city}…',
    'compare.error': 'Nem sikerült betölteni az időjárást: {city}',
    'compare.swapA': 'Első város módosítása',
    'compare.swapB': 'Második város módosítása',
    'sources.avgShort': '8 modell átlaga',
    'sources.dividerOr': 'vagy egy konkrét forrás',
    'confidence.label': 'Modellek egyetértése',
    'confidence.high': 'magas',
    'confidence.mid': 'mérsékelt',
    'confidence.low': 'alacsony',
    'confidence.veryLow': 'gyenge',
    'confidence.tooltip': '{n} modell · szórás ±{range}°C a mai maximumhőmérsékletre',
    'chart.spreadLabel': 'Szórás 8 modell között',
    'windows.title': 'Tevékenységi ablakok',
    'windows.sub': 'Legjobb idő a hétköznapi feladatokhoz a következő 5 napban',
    'windows.preset.jogging': 'Futás',
    'windows.preset.kids': 'Séta gyerekkel',
    'windows.preset.bbq': 'Grill / szabadtéri',
    'windows.preset.laundry': 'Ruhaszárítás kint',
    'windows.preset.carwash': 'Autómosás',
    'windows.preset.watering': 'Növényöntözés',
    'windows.today': 'Ma',
    'windows.tomorrow': 'Holnap',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'időtartam {h}ó',
    'windows.noWindow': 'Nincs megfelelő ablak a következő 5 napban',
    'windows.carwash.dry': 'Száraz {h} órán át egyfolytában',
    'windows.carwash.notRec': 'Nem ajánlott · eső várható',
    'climate.title': 'Klimatikus kontextus',
    'climate.sub': 'Ma vs 5 éves átlag erre a dátumra',
    'climate.tempLabel': 'Napi maximum',
    'climate.minLabel': 'Éjszakai minimum',
    'climate.precipLabel': 'Csapadék 5 nap alatt',
    'climate.norm': 'normál {v}',
    'climate.warmer': '+{v}° melegebb',
    'climate.colder': '−{v}° hidegebb',
    'climate.aboutNorm': 'körülbelül normál',
    'climate.wetter': '+{v}% nedvesebb',
    'climate.drier': '−{v}% szárazabb',
    'climate.sparkTitle': 'Ezen a napon az elmúlt években',
    'climate.sparkEmpty': 'Archív adatok nem elérhetők',
    'climate.loading': 'Előzmények betöltése...',
    'pollen.title': 'Pollen ma',
    'pollen.sub': 'Allergén-koncentráció a levegőben (szem/m³)',
    'pollen.alder': 'Égerfa',
    'pollen.birch': 'Nyírfa',
    'pollen.grass': 'Füvek',
    'pollen.mugwort': 'Üröm',
    'pollen.olive': 'Olajfa',
    'pollen.ragweed': 'Parlagfű',
    'pollen.level.none': 'Nem észlelt',
    'pollen.level.low': 'Alacsony',
    'pollen.level.mid': 'Mérsékelt',
    'pollen.level.high': 'Magas',
    'pollen.level.veryHigh': 'Nagyon magas',
    'storm.title': 'Zivatarkövető',
    'storm.sub': 'Óránkénti zivatarkockázat a következő 48 órára',
    'storm.noStorm': 'Nincs zivatar várható a következő 48 órában',
    'storm.upcoming': 'Zivatar {hours} óra múlva',
    'storm.now': 'Zivatar most',
    'storm.risk0': 'nincs kockázat',
    'storm.risk1': 'alacsony',
    'storm.risk2': 'mérsékelt',
    'storm.risk3': 'magas',
    'storm.risk4': 'veszélyes',
    'storm.desc1': 'távoli mennydörgés lehetséges, eső nélkül',
    'storm.desc2': 'helyi zivatarok esővel',
    'storm.desc3': 'erős eső mennydörgéssel, széllökések',
    'storm.desc4': 'súlyos viharok, jégeső- és széllökés-veszély',
    'storm.axisNow': 'most',
    'storm.alertSoon': 'Zivatar várható a következő {hours} órában',
    'storm.alertNow': 'Zivatar zajlik most',
    'accuracy.title': 'Források pontossága',
    'accuracy.subEmpty': 'Előrejelzés-vs-valóság adatok gyűjtése a helyedhez',
    'accuracy.subData': 'Átlagos abszolút hiba az utolsó {n} összehasonlításnál',
    'accuracy.groundTruth': 'valós megfigyelésekkel',
    'accuracy.colTempMax': 'T-max',
    'accuracy.colTempMin': 'T-min',
    'accuracy.leaderTempMax': 'nappali T:',
    'accuracy.leaderTempMin': 'éjjeli T:',
    'accuracy.leaderPrecip': 'csapadék:',
    'accuracy.leaderAvgAll': 'Az átlag minden mutatóban veri az egyes modelleket',
    'accuracy.leaderBestAll': 'a legpontosabb minden mutatóban',
    'nowcast.now.until.rain':         'Eső most · ~{time}-ig',
    'nowcast.now.until.drizzle':      'Szitálás most · ~{time}-ig',
    'nowcast.now.until.snow':         'Havazás most · ~{time}-ig',
    'nowcast.now.until.sleet':        'Havas eső · ~{time}-ig',
    'nowcast.now.until.freezing':     'Ónos eső · ~{time}-ig',
    'nowcast.now.until.storm':        'Zivatar most · ~{time}-ig',
    'nowcast.now.continues.rain':     'Eső most · 2 ó+ folyamatos',
    'nowcast.now.continues.drizzle':  'Szitálás · 2 ó+ folyamatos',
    'nowcast.now.continues.snow':     'Havazás most · 2 ó+ folyamatos',
    'nowcast.now.continues.sleet':    'Havas eső · 2 ó+ folyamatos',
    'nowcast.now.continues.freezing': 'Ónos eső · 2 ó+ folyamatos',
    'nowcast.now.continues.storm':    'Zivatar · 2 ó+ folyamatos',
    'nowcast.soon.rain':              'Eső ~{min} perc múlva',
    'nowcast.soon.drizzle':           'Szitálás ~{min} perc múlva',
    'nowcast.soon.snow':              'Havazás ~{min} perc múlva',
    'nowcast.soon.sleet':             'Havas eső ~{min} perc múlva',
    'nowcast.soon.freezing':          'Ónos eső ~{min} perc múlva',
    'nowcast.soon.storm':             'Zivatar ~{min} perc múlva',
    'nowcast.dry':                    'Száraz a következő 2 órában',
    'accuracy.emptyTitle': 'Adatok gyűjtése',
    'accuracy.emptyHint': 'Nyisd meg az oldalt naponta egyszer — körülbelül egy hét múlva megjelenik a modellek rangsora MAE-vel, hőmérséklet és csapadék szempontjából, erre a helyre specifikusan',
    'accuracy.samplesUnit': 'minta',
    'accuracy.colModel': 'Modell',
    'accuracy.colScore': 'Általános pontosság',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%csap.',
    'accuracy.legendQ1': 'kiváló',
    'accuracy.legendQ2': 'jó',
    'accuracy.legendQ3': 'elfogadható',
    'accuracy.legendQ4': 'gyenge',
    'accuracy.legendAvgWin': 'a legjobb mind közül',
    'accuracy.bestBadge': 'A legpontosabb modell a legutóbbi minták szerint',
    'footer.refresh': 'Frissítés',
    'footer.speak': 'Felolvasás',
    'footer.speakStop': 'Stop',
    'footer.speakAria': 'Időjárás-előrejelzés felolvasása hangosan',
    'settings.voice.label': 'Hang',
    'settings.voice.female': 'női',
    'settings.voice.male': 'férfi',
    'settings.voice.none': 'A hang nem elérhető ezen az eszközön',
    'settings.voice.preview': 'Előnézet',
    'settings.voice.previewText': 'Szia! Felolvasom az időjárás-előrejelzést.',
    'settings.voice.rate.label': 'Sebesség',
    'settings.voice.rate.slow': 'lassú',
    'settings.voice.rate.normal': 'normál',
    'settings.voice.rate.fast': 'gyors',
    'footer.updated': 'frissítve: {time}',
    'modal.closeAria': 'Bezárás',
    'modal.day.forecast': 'Előrejelzés',
    'modal.day.today': 'Ma',
    'modal.day.dayLen': 'Nap hossza: {len}',
    'modal.day.uvScale': 'Skála 0-11+',
    'modal.day.pm25norm': 'PM2.5 normál',
    'modal.day.hourlyTitle': 'Óránkénti hőmérséklet és csapadék',
    'modal.day.hoursTitle': 'Óráról órára',
    'city.label': 'Hely',
    'city.title': 'Hol nézzük az időjárást?',
    'city.useMyLocation': 'Saját hely használata',
    'city.geoDesc': 'A böngésző engedélyt fog kérni. A koordináták a böngészőben maradnak',
    'city.search.placeholder': 'Ukrajna városai...',
    'city.search.clearAria': 'Törlés',
    'city.list.popular': 'Népszerű ukrán városok',
    'city.list.foundLocal': 'Megtalálva a népszerűek között',
    'city.list.searching': 'Keresés...',
    'city.list.found': 'Találatok: {n}',
    'city.list.notFound': 'Nincs találat',
    'city.list.empty': 'A város nem található. Próbálj másik nevet.',
    'city.list.emptyForQuery': 'A(z) „{q}" város nem található az Open-Meteo Ukrajna adatbázisában.',
    'city.list.searchError': 'A keresés sikertelen. Ellenőrizd az internetkapcsolatot.',
    'city.list.minChars': 'Adj meg legalább 2 karaktert',
    'city.list.aria': 'Városlista',
    'city.tag.geo': '📍 helymeghatározással',
    'city.tag.manual': '✋ kiválasztva',
    'city.geoErr.denied': 'A helyhozzáférés elutasítva. Engedélyezd a böngésző beállításaiban.',
    'city.geoErr.unavailable': 'Pozíció nem elérhető (nincs GPS/hálózati jel)',
    'city.geoErr.timeout': 'A kérés időtúllépést szenvedett',
    'city.geoErr.notSupported': 'A böngésző nem támogatja a helymeghatározást',
    'city.geoErr.generic': 'Helymeghatározási hiba',
    'loader.fetching': 'Előrejelzés betöltése...',
    'loader.refreshing': 'Frissítés...',
    'apiErr.title': 'Az előrejelzés betöltése sikertelen',
    'apiErr.msg': 'Demo adatok jelennek meg. Ellenőrizd a kapcsolatot és próbáld újra.',
    'apiErr.retry': 'Újrapróbálás',
    'apiErr.cors': 'Az időjárási szolgáltatás nem elérhető (CORS / hálózat)',
    'apiErr.timeout': 'Az Open-Meteo válasz időtúllépést szenvedett',
    'apiErr.http': 'Szerverválasz-hiba ({code})',
    'apiErr.parse': 'Nem sikerült feldolgozni az Open-Meteo választ',
    'settings.aria': 'Beállítások',
    'settings.label': 'Beállítások',
    'settings.title': 'Beállítások',
    'settings.theme.title': 'Megjelenés',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Sötét',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Világos',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Rendszer',
    'settings.lang.title': 'A felület nyelve',
    'settings.temp.title': 'Hőmérséklet',
    'settings.temp.c': 'Celsius',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Szélsebesség',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'méter/mp',
    'settings.wind.kmh.unit': 'km/h',
    'settings.wind.kmh.full': 'kilométer/óra',
    'settings.wind.mph.full': 'mérföld/óra',
    'settings.wind.kn.unit': 'cs',
    'settings.wind.kn.full': 'csomó',
    'settings.pressure.title': 'Légnyomás',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'milliméter Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'hektopaszkál',
    'settings.pressure.inhg.full': 'hüvelyk Hg',
    'cond.clear': 'Derült',
    'cond.partlyCloudy': 'Részben felhős',
    'cond.cloudy': 'Felhős',
    'cond.overcast': 'Borult',
    'cond.rain': 'Eső',
    'cond.heavyRain': 'Erős eső',
    'cond.thunderstorm': 'Zivatar',
    'cond.snow': 'Hó',
    'cond.fog': 'Köd',
    'cond.partlyCloudyWithClear': 'Felhős, helyenként derült',
    'condDesc.day0': 'ÉNy front, alkalmi szitálás',
    'condDesc.day1': 'Aktív ciklon, erős csapadék délután',
    'condDesc.day2': 'A ciklon távozik, maradék felhőzet',
    'condDesc.day3': 'Anticiklon, napos nap',
    'condDesc.day4': 'Gyenge szél, változó felhőzet',
    'condDesc.clear': 'Derült, napos nap',
    'condDesc.clearWindy': 'Derült és szeles',
    'condDesc.partlyCloudy': 'Részben felhős',
    'condDesc.cloudy': 'Túlnyomórészt felhős',
    'condDesc.overcast': 'Egész nap borult',
    'condDesc.fog': 'Ködös, rossz látótávolság',
    'condDesc.rainLight': 'Gyenge csapadék lehetséges',
    'condDesc.rain': 'Eső, néha intenzív',
    'condDesc.heavyRain': 'Erős záporok, jelentős csapadék várható',
    'condDesc.snow': 'Havazás',
    'condDesc.thunderstorm': 'Zivatar villámokkal lehetséges',
    'condDesc.windAddition': ', erős {dir} szél',
    'uvLabel.low': 'Alacsony',
    'uvLabel.moderate': 'Mérsékelt',
    'uvLabel.high': 'Magas',
    'uvLabel.veryHigh': 'Nagyon magas',
    'uvLabel.extreme': 'Szélsőséges',
    'aqiLabel.good': 'Jó',
    'aqiLabel.moderate': 'Mérsékelt',
    'aqiLabel.unhealthySens': 'Érzékenyeknek egészségtelen',
    'aqiLabel.unhealthy': 'Egészségtelen',
    'aqiLabel.veryUnhealthy': 'Nagyon egészségtelen',
    'aqiLabel.hazardous': 'Veszélyes',
    'moon.new': 'Újhold',
    'moon.waxingCrescent': 'Növekvő sarló',
    'moon.firstQuarter': 'Első negyed',
    'moon.waxingGibbous': 'Növekvő hold',
    'moon.full': 'Telihold',
    'moon.waningGibbous': 'Fogyó hold',
    'moon.lastQuarter': 'Utolsó negyed',
    'moon.waningCrescent': 'Fogyó sarló',
    'windDir.N': 'É',   'windDir.NE': 'ÉK', 'windDir.E': 'K',  'windDir.SE': 'DK',
    'windDir.S': 'D',   'windDir.SW': 'DNy', 'windDir.W': 'Ny', 'windDir.NW': 'ÉNy',
    'windDirFull.N': 'Északi', 'windDirFull.NE': 'Északkeleti', 'windDirFull.E': 'Keleti', 'windDirFull.SE': 'Délkeleti',
    'windDirFull.S': 'Déli',   'windDirFull.SW': 'Délnyugati',  'windDirFull.W': 'Nyugati', 'windDirFull.NW': 'Északnyugati',
    'day.tap': 'részletek',
    'day.today': 'Ma',
    'day.short.mon': 'H', 'day.short.tue': 'K', 'day.short.wed': 'Sze', 'day.short.thu': 'Cs',
    'day.short.fri': 'P', 'day.short.sat': 'Szo', 'day.short.sun': 'V',
    'day.full.mon': 'Hétfő', 'day.full.tue': 'Kedd', 'day.full.wed': 'Szerda', 'day.full.thu': 'Csütörtök',
    'day.full.fri': 'Péntek', 'day.full.sat': 'Szombat', 'day.full.sun': 'Vasárnap',
    'month.1': 'január', 'month.2': 'február', 'month.3': 'március', 'month.4': 'április',
    'month.5': 'május', 'month.6': 'június', 'month.7': 'július', 'month.8': 'augusztus',
    'month.9': 'szeptember', 'month.10': 'október', 'month.11': 'november', 'month.12': 'december'
  },
  sk: {
    'html.lang': 'sk',
    'header.changeCity': 'Zmeniť mesto',
    'header.editHint': 'Kliknite pre zmenu',
    'header.sourceLabel': 'Zdroj údajov',
    'header.sourceShort': 'Zdroj',
    'hero.label': 'Teraz',
    'hero.feels': 'Pocitovo {feels}',
    'hero.feelsBeforeSunrise': 'Pocitovo {feels} · Východ slnka o {sunrise}',
    'hero.feelsBeforeSunset':  'Pocitovo {feels} · Západ slnka o {sunset}',
    'hero.feelsAfterSunset':   'Pocitovo {feels} · Západ slnka bol o {sunset}',
    'hero.sourceNote': 'Zdroj: {name}',
    'hero.sourceAvg': 'priemer z 8 modelov',
    'metric.temp': 'Teplota',
    'metric.feels': 'Pocitová teplota',
    'metric.wind': 'Vietor',
    'metric.rain': 'Zrážky',
    'metric.pressure': 'Tlak',
    'metric.humidity': 'Vlhkosť',
    'metric.dewpoint': 'Rosný bod',
    'metric.uv': 'UV index',
    'metric.visibility': 'Viditeľnosť',
    'metric.solar': 'Slnečné žiarenie',
    'metric.windSub': '{dir} · nárazy {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'bez zrážok',
    'metric.rain.light': 'slabý dážď',
    'metric.rain.moderate': 'mierny dážď',
    'metric.rain.heavy': 'silný dážď',
    'metric.pressure.falling': 'Klesá ↓',
    'metric.pressure.rising': 'Stúpa ↑',
    'metric.pressure.stable': 'Stabilný',
    'metric.humidity.dewPoint': 'Rosný bod {t}',
    'astro.sun': 'Slnko',
    'astro.sunrise': 'Východ',
    'astro.sunset': 'Západ',
    'astro.uv': 'UV index',
    'astro.aqi': 'Kvalita ovzdušia',
    'astro.dayLen': '{h}h {m}m',
    'astro.photoTitle': 'Pre fotografa a astronóma',
    'astro.photoSub': 'Zlatá / modrá hodina, kvalita západu, viditeľnosť hviezd',
    'astro.goldenHour': 'Zlatá hodina',
    'astro.blueHour': 'Modrá hodina',
    'astro.morning': 'Ráno',
    'astro.evening': 'Večer',
    'astro.sunsetQuality': 'Západ slnka dnes',
    'astro.sunset.dramatic': 'Dramatický',
    'astro.sunset.normal': 'Bežný',
    'astro.sunset.dull': 'Matný',
    'astro.sunset.cloudHint': 'oblačnosť {cl}%',
    'astro.stars': 'Viditeľnosť hviezd',
    'astro.stars.excellent': 'Vynikajúca',
    'astro.stars.good': 'Dobrá',
    'astro.stars.moderate': 'Stredná',
    'astro.stars.poor': 'Slabá',
    'astro.stars.veryPoor': 'Veľmi slabá',
    'astro.stars.hint': 'oblačnosť {cl}% · mesiac {moon}%',
    'chart.title': 'Dnes · hodinová predpoveď',
    'chart.sub.avg': 'Priemer z 8 modelov',
    'chart.sub.named': 'Predpoveď od {name}',
    'precip.title': 'Zrážky',
    'precip.sub': 'Predpoveď mm/h na nasledujúcich 48 hodín',
    'precip.tomorrow': 'zajtra',
    'precip.legend': 'mm/h',
    'hdm.title': 'Po hodinách',
    'precipDetail.title': 'Detaily zrážok',
    'metric.rain.tapHint': 'Klepnite pre graf, riziko búrok a radar',
    'metric.wind.tapHint': 'Klepnite pre hodinový graf vetra',
    'metric.pressure.tapHint': 'Klepnite pre hodinový graf tlaku',
    'metric.humidity.tapHint': 'Klepnite pre hodinový graf vlhkosti',
    'radar.title': 'Radar zrážok',
    'radar.sub': 'Živé zrážky za posledné 2 hodiny + predpoveď ECMWF na nasledujúcich 72 hodín',
    'radar.loading': 'Načítanie radarových dlaždíc…',
    'radar.error': 'Nepodarilo sa načítať údaje radaru',
    'radar.empty': 'Žiadne radarové údaje pre túto oblasť',
    'radar.now': 'teraz',
    'radar.forecast': 'predpoveď',
    'radar.tabLive': 'Radar · 2 h',
    'radar.tabForecast': 'Predpoveď · 72 h',
    'radar.windyHint': 'Poháňané widgetom Windy.com s modelom ECMWF',
    'search.chip': 'Nájsť okno',
    'search.aria': 'Nájsť okno počasia',
    'search.label': 'Obrátené hľadanie',
    'search.title': 'Kedy príde správne počasie?',
    'search.sub': 'Opíšte podmienku — nájdeme najbližšie okno v 10-dňovej predpovedi',
    'search.placeholder': 'napr. bez dažďa 6 hodín, teplo nad +20, jasné ráno',
    'search.button': 'Nájsť',
    'search.popularTitle': 'Obľúbené dotazy',
    'search.empty.title': 'V nasledujúcich 10 dňoch také okno neexistuje',
    'search.empty.hint': 'Vyskúšajte inú podmienku z návrhov',
    'search.empty.closest': 'Najbližšie: {when}',
    'search.error.parse': 'Dotaz sa nepodarilo rozpoznať. Vyskúšajte príklad z návrhov.',
    'search.results.found': 'Nájdených {n} {label}',
    'search.results.label.one': 'okno',
    'search.results.label.few': 'okná',
    'search.results.label.many': 'okien',
    'search.duration.hours': '{n} h',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'vietor {v} {unit}',
    'search.day.today': 'Dnes',
    'search.day.tomorrow': 'Zajtra',
    'search.preset.norain': 'bez dažďa ≥6 h',
    'search.preset.warm': 'teplo nad +20',
    'search.preset.clear': 'jasná obloha',
    'search.preset.calm': 'bezvetrie',
    'search.preset.run': 'dobré na beh',
    'search.preset.bbq': 'počasie na gril',
    'search.preset.carwash': 'umývanie auta',
    'search.preset.storm': 'kedy búrka',
    'fav.add': '+ Pridať mesto',
    'fav.addToFav': 'Do obľúbených',
    'fav.removeFromFav': 'Odstrániť z obľúbených',
    'city.section.favorites': 'Obľúbené',
    'city.section.ua': 'Ukrajinské mestá',
    'city.section.world': 'Svetové mestá',
    'city.section.searchResults': 'Výsledky hľadania',
    'chart.legendTemp': 'Teplota',
    'chart.legendPrecip': 'Zrážky',
    'sources.title': 'Zdroj predpovede',
    'sources.sub': 'Vyberte zdroj alebo použite priemer všetkých 8 modelov',
    'sources.avgTitle': 'Priemer všetkých služieb',
    'sources.avgSub': 'Agregácia 8 modelov · súborová predpoveď',
    'sources.confHint': 'Farebný pruh pod kartou dňa — zhoda 8 modelov:',
    'sources.confLegend.high': 'spoľahlivé',
    'sources.confLegend.mid': 'stredné',
    'sources.confLegend.low': 'neisté',
    'sources.confLegend.veryLow': 'veľký rozptyl',
    'alert.heat.title': 'Silné teplo ({t}°)',
    'alert.heat.msg': 'Pite vodu každú hodinu, vyhnite sa slnku od 11 do 16. Ľahké oblečenie, klobúk',
    'alert.extremeHeat.title': 'Extrémne teplo ({t}°)',
    'alert.extremeHeat.msg': 'Zdravotné riziko. Obmedzte aktivitu vonku, riziko úpalu',
    'alert.cold.title': 'Silný mráz ({t}°)',
    'alert.cold.msg': 'Oblečte sa teplo, zakryte si tvár a ruky. Vyhnite sa dlhým prechádzkam',
    'alert.extremeCold.title': 'Extrémny mráz ({t}°)',
    'alert.extremeCold.msg': 'Riziko omrzlín za 10–20 min. Zostaňte vnútri, ak nie je nutné',
    'pullRefresh.pull': 'Potiahnite pre obnovenie',
    'pullRefresh.ready': 'Pustite pre obnovenie',
    'pullRefresh.refreshing': 'Obnovovanie...',
    'compare.chip': 'Porovnať',
    'compare.chipAria': 'Porovnať počasie s iným mestom',
    'compare.bannerLabel': 'Porovnanie',
    'compare.exitAria': 'Ukončiť režim porovnania',
    'compare.pickLabel': 'Porovnať s',
    'compare.pickTitle': 'Vyberte druhé mesto',
    'compare.pickHint': 'Obľúbené alebo celosvetové hľadanie',
    'compare.hourlyTitle': 'Hodinová teplota · dnes',
    'compare.daysTitle': '7 dní',
    'compare.summary.same': 'Dnes podobné počasie v oboch mestách',
    'compare.summary.warmerA': 'V {a} je dnes teplejšie o {d}°',
    'compare.summary.warmerB': 'V {b} je dnes teplejšie o {d}°',
    'compare.summary.drierA': '{a} je suchšie, zrážky {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} je suchšie, zrážky {pb}% vs {pa}%',
    'compare.loading': 'Načítava sa počasie pre {city}…',
    'compare.error': 'Nepodarilo sa načítať počasie pre {city}',
    'compare.swapA': 'Zmeniť prvé mesto',
    'compare.swapB': 'Zmeniť druhé mesto',
    'sources.avgShort': 'Priemer z 8 modelov',
    'sources.dividerOr': 'alebo konkrétny zdroj',
    'confidence.label': 'Zhoda modelov',
    'confidence.high': 'vysoká',
    'confidence.mid': 'stredná',
    'confidence.low': 'nízka',
    'confidence.veryLow': 'slabá',
    'confidence.tooltip': '{n} modelov · rozptyl ±{range}°C pri dnešnej maximálnej teplote',
    'chart.spreadLabel': 'Rozptyl medzi 8 modelmi',
    'windows.title': 'Okná aktivít',
    'windows.sub': 'Najlepší čas na bežné úlohy v nasledujúcich 5 dňoch',
    'windows.preset.jogging': 'Beh',
    'windows.preset.kids': 'Prechádzka s dieťaťom',
    'windows.preset.bbq': 'Gril / vonku',
    'windows.preset.laundry': 'Sušenie bielizne vonku',
    'windows.preset.carwash': 'Umývanie auta',
    'windows.preset.watering': 'Polievanie rastlín',
    'windows.today': 'Dnes',
    'windows.tomorrow': 'Zajtra',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'trvanie {h} h',
    'windows.noWindow': 'Žiadne vhodné okno v nasledujúcich 5 dňoch',
    'windows.carwash.dry': 'Sucho {h} h v kuse',
    'windows.carwash.notRec': 'Neodporúča sa · očakáva sa dážď',
    'climate.title': 'Klimatický kontext',
    'climate.sub': 'Dnes vs. 5-ročný priemer pre tento dátum',
    'climate.tempLabel': 'Denné maximum',
    'climate.minLabel': 'Nočné minimum',
    'climate.precipLabel': 'Zrážky za 5 dní',
    'climate.norm': 'norma {v}',
    'climate.warmer': '+{v}° teplejšie',
    'climate.colder': '−{v}° chladnejšie',
    'climate.aboutNorm': 'približne norma',
    'climate.wetter': '+{v}% vlhkejšie',
    'climate.drier': '−{v}% suchšie',
    'climate.sparkTitle': 'V tento deň v minulých rokoch',
    'climate.sparkEmpty': 'Archívne údaje nedostupné',
    'climate.loading': 'Načítava sa história...',
    'pollen.title': 'Peľ dnes',
    'pollen.sub': 'Koncentrácia alergénov vo vzduchu (zrn/m³)',
    'pollen.alder': 'Jelša',
    'pollen.birch': 'Breza',
    'pollen.grass': 'Trávy',
    'pollen.mugwort': 'Palina',
    'pollen.olive': 'Olivovník',
    'pollen.ragweed': 'Ambrózia',
    'pollen.level.none': 'Nezistené',
    'pollen.level.low': 'Nízka',
    'pollen.level.mid': 'Stredná',
    'pollen.level.high': 'Vysoká',
    'pollen.level.veryHigh': 'Veľmi vysoká',
    'storm.title': 'Sledovanie búrok',
    'storm.sub': 'Hodinové riziko búrok na nasledujúcich 48 hodín',
    'storm.noStorm': 'V nasledujúcich 48 hodinách sa búrky neočakávajú',
    'storm.upcoming': 'Búrka za {hours} h',
    'storm.now': 'Búrka teraz',
    'storm.risk0': 'bez rizika',
    'storm.risk1': 'nízke',
    'storm.risk2': 'stredné',
    'storm.risk3': 'vysoké',
    'storm.risk4': 'nebezpečné',
    'storm.desc1': 'možné vzdialené hrmenie, bez dažďa',
    'storm.desc2': 'miestne búrky s dažďom',
    'storm.desc3': 'silný dážď s hrmením, nárazy vetra',
    'storm.desc4': 'silné búrky, riziko krupobitia a nárazov vetra',
    'storm.axisNow': 'teraz',
    'storm.alertSoon': 'Búrka sa očakáva v priebehu {hours} h',
    'storm.alertNow': 'Búrka práve prebieha',
    'accuracy.title': 'Presnosť zdrojov',
    'accuracy.subEmpty': 'Zhromažďujú sa údaje predpoveď vs. skutočnosť pre vašu lokalitu',
    'accuracy.subData': 'Priemerná absolútna chyba za posledných {n} porovnaní',
    'accuracy.groundTruth': 'so skutočnými pozorovaniami',
    'accuracy.colTempMax': 'T-max',
    'accuracy.colTempMin': 'T-min',
    'accuracy.leaderTempMax': 'denná T:',
    'accuracy.leaderTempMin': 'nočná T:',
    'accuracy.leaderPrecip': 'zrážky:',
    'accuracy.leaderAvgAll': 'Priemer poráža každý jednotlivý model vo všetkých metrikách',
    'accuracy.leaderBestAll': 'je najpresnejší vo všetkých metrikách',
    'nowcast.now.until.rain':         'Dážď teraz · do ~{time}',
    'nowcast.now.until.drizzle':      'Mrholenie teraz · do ~{time}',
    'nowcast.now.until.snow':         'Sneženie teraz · do ~{time}',
    'nowcast.now.until.sleet':        'Dážď so snehom · do ~{time}',
    'nowcast.now.until.freezing':     'Mrznúci dážď · do ~{time}',
    'nowcast.now.until.storm':        'Búrka teraz · do ~{time}',
    'nowcast.now.continues.rain':     'Dážď teraz · 2 h+ trvalý',
    'nowcast.now.continues.drizzle':  'Mrholenie · 2 h+ trvalé',
    'nowcast.now.continues.snow':     'Sneženie teraz · 2 h+ trvalé',
    'nowcast.now.continues.sleet':    'Dážď so snehom · 2 h+ trvalý',
    'nowcast.now.continues.freezing': 'Mrznúci dážď · 2 h+ trvalý',
    'nowcast.now.continues.storm':    'Búrka · 2 h+ trvalá',
    'nowcast.soon.rain':              'Dážď za ~{min} min',
    'nowcast.soon.drizzle':           'Mrholenie za ~{min} min',
    'nowcast.soon.snow':              'Sneženie za ~{min} min',
    'nowcast.soon.sleet':             'Dážď so snehom za ~{min} min',
    'nowcast.soon.freezing':          'Mrznúci dážď za ~{min} min',
    'nowcast.soon.storm':             'Búrka za ~{min} min',
    'nowcast.dry':                    'Sucho v nasledujúcich 2 hodinách',
    'accuracy.emptyTitle': 'Zhromažďovanie údajov',
    'accuracy.emptyHint': 'Otvárajte stránku raz denne — po týždni uvidíte rebríček modelov s MAE pre teplotu a zrážky špecifický pre túto lokalitu',
    'accuracy.samplesUnit': 'vzoriek',
    'accuracy.colModel': 'Model',
    'accuracy.colScore': 'Celková presnosť',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%zrážky',
    'accuracy.legendQ1': 'výborná',
    'accuracy.legendQ2': 'dobrá',
    'accuracy.legendQ3': 'prijateľná',
    'accuracy.legendQ4': 'slabá',
    'accuracy.legendAvgWin': 'najlepší zo všetkých',
    'accuracy.bestBadge': 'Najpresnejší model podľa nedávnych vzoriek',
    'footer.refresh': 'Obnoviť',
    'footer.speak': 'Prečítať',
    'footer.speakStop': 'Stop',
    'footer.speakAria': 'Prečítať predpoveď počasia nahlas',
    'settings.voice.label': 'Hlas',
    'settings.voice.female': 'ženský',
    'settings.voice.male': 'mužský',
    'settings.voice.none': 'Hlas nie je na tomto zariadení dostupný',
    'settings.voice.preview': 'Náhľad',
    'settings.voice.previewText': 'Ahoj! Prečítam predpoveď počasia.',
    'settings.voice.rate.label': 'Rýchlosť',
    'settings.voice.rate.slow': 'pomaly',
    'settings.voice.rate.normal': 'normálne',
    'settings.voice.rate.fast': 'rýchlo',
    'footer.updated': 'aktualizované o {time}',
    'modal.closeAria': 'Zavrieť',
    'modal.day.forecast': 'Predpoveď',
    'modal.day.today': 'Dnes',
    'modal.day.dayLen': 'Dĺžka dňa: {len}',
    'modal.day.uvScale': 'Stupnica 0-11+',
    'modal.day.pm25norm': 'PM2.5 normál',
    'modal.day.hourlyTitle': 'Hodinová teplota a zrážky',
    'modal.day.hoursTitle': 'Hodinu po hodine',
    'city.label': 'Miesto',
    'city.title': 'Kde skontrolovať počasie?',
    'city.useMyLocation': 'Použiť moju polohu',
    'city.geoDesc': 'Prehliadač požiada o povolenie. Súradnice zostanú vo vašom prehliadači',
    'city.search.placeholder': 'Hľadať mesto na Ukrajine...',
    'city.search.clearAria': 'Vyčistiť',
    'city.list.popular': 'Obľúbené ukrajinské mestá',
    'city.list.foundLocal': 'Nájdené medzi obľúbenými',
    'city.list.searching': 'Hľadanie...',
    'city.list.found': 'Nájdené: {n}',
    'city.list.notFound': 'Nič nenájdené',
    'city.list.empty': 'Mesto nenájdené. Skúste iný názov.',
    'city.list.emptyForQuery': 'Mesto „{q}" sa nenašlo v databáze Open-Meteo Ukrajina.',
    'city.list.searchError': 'Hľadanie zlyhalo. Skontrolujte pripojenie k internetu.',
    'city.list.minChars': 'Zadajte aspoň 2 znaky',
    'city.list.aria': 'Zoznam miest',
    'city.tag.geo': '📍 podľa geolokácie',
    'city.tag.manual': '✋ vybrané',
    'city.geoErr.denied': 'Prístup k polohe zamietnutý. Povoľte ho v nastaveniach prehliadača.',
    'city.geoErr.unavailable': 'Poloha nedostupná (žiadny signál GPS/siete)',
    'city.geoErr.timeout': 'Vypršal časový limit požiadavky',
    'city.geoErr.notSupported': 'Prehliadač nepodporuje geolokáciu',
    'city.geoErr.generic': 'Chyba geolokácie',
    'loader.fetching': 'Načítava sa predpoveď...',
    'loader.refreshing': 'Obnovovanie...',
    'apiErr.title': 'Načítanie predpovede zlyhalo',
    'apiErr.msg': 'Zobrazujú sa demo údaje. Skontrolujte pripojenie a skúste znova.',
    'apiErr.retry': 'Skúsiť znova',
    'apiErr.cors': 'Služba počasia nedostupná (CORS / sieť)',
    'apiErr.timeout': 'Vypršal časový limit odpovede Open-Meteo',
    'apiErr.http': 'Chyba odpovede servera ({code})',
    'apiErr.parse': 'Nepodarilo sa spracovať odpoveď Open-Meteo',
    'settings.aria': 'Nastavenia',
    'settings.label': 'Nastavenia',
    'settings.title': 'Nastavenia',
    'settings.theme.title': 'Vzhľad',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Tmavý',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Svetlý',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Systémový',
    'settings.lang.title': 'Jazyk rozhrania',
    'settings.temp.title': 'Teplota',
    'settings.temp.c': 'Celsius',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Rýchlosť vetra',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'metre/sek.',
    'settings.wind.kmh.unit': 'km/h',
    'settings.wind.kmh.full': 'kilometre/hod.',
    'settings.wind.mph.full': 'míle/hod.',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'uzly',
    'settings.pressure.title': 'Atmosférický tlak',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'milimetre Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'hektopaskaly',
    'settings.pressure.inhg.full': 'palce Hg',
    'cond.clear': 'Jasno',
    'cond.partlyCloudy': 'Polojasno',
    'cond.cloudy': 'Oblačno',
    'cond.overcast': 'Zamračené',
    'cond.rain': 'Dážď',
    'cond.heavyRain': 'Silný dážď',
    'cond.thunderstorm': 'Búrka',
    'cond.snow': 'Sneh',
    'cond.fog': 'Hmla',
    'cond.partlyCloudyWithClear': 'Oblačno s občasným vyjasnením',
    'condDesc.day0': 'SZ front, občasné mrholenie',
    'condDesc.day1': 'Aktívna cyklóna, výdatné zrážky popoludní',
    'condDesc.day2': 'Cyklóna odchádza, zvyšková oblačnosť',
    'condDesc.day3': 'Anticyklóna, slnečný deň',
    'condDesc.day4': 'Slabý vietor, premenlivá oblačnosť',
    'condDesc.clear': 'Jasný slnečný deň',
    'condDesc.clearWindy': 'Jasno a veterno',
    'condDesc.partlyCloudy': 'Polojasno',
    'condDesc.cloudy': 'Prevažne oblačno',
    'condDesc.overcast': 'Zamračené celý deň',
    'condDesc.fog': 'Hmlisto, slabá viditeľnosť',
    'condDesc.rainLight': 'Možné slabé zrážky',
    'condDesc.rain': 'Dážď, miestami intenzívny',
    'condDesc.heavyRain': 'Silné prehánky, očakávajú sa značné zrážky',
    'condDesc.snow': 'Sneženie',
    'condDesc.thunderstorm': 'Možná búrka s bleskami',
    'condDesc.windAddition': ', silný {dir} vietor',
    'uvLabel.low': 'Nízky',
    'uvLabel.moderate': 'Mierny',
    'uvLabel.high': 'Vysoký',
    'uvLabel.veryHigh': 'Veľmi vysoký',
    'uvLabel.extreme': 'Extrémny',
    'aqiLabel.good': 'Dobrá',
    'aqiLabel.moderate': 'Mierna',
    'aqiLabel.unhealthySens': 'Nezdravá pre citlivé',
    'aqiLabel.unhealthy': 'Nezdravá',
    'aqiLabel.veryUnhealthy': 'Veľmi nezdravá',
    'aqiLabel.hazardous': 'Nebezpečná',
    'moon.new': 'Nov',
    'moon.waxingCrescent': 'Dorastajúci kosáčik',
    'moon.firstQuarter': 'Prvá štvrť',
    'moon.waxingGibbous': 'Dorastajúci mesiac',
    'moon.full': 'Spln',
    'moon.waningGibbous': 'Cúvajúci mesiac',
    'moon.lastQuarter': 'Posledná štvrť',
    'moon.waningCrescent': 'Cúvajúci kosáčik',
    'windDir.N': 'S',   'windDir.NE': 'SV', 'windDir.E': 'V',  'windDir.SE': 'JV',
    'windDir.S': 'J',   'windDir.SW': 'JZ', 'windDir.W': 'Z',  'windDir.NW': 'SZ',
    'windDirFull.N': 'Severný', 'windDirFull.NE': 'Severovýchodný', 'windDirFull.E': 'Východný', 'windDirFull.SE': 'Juhovýchodný',
    'windDirFull.S': 'Južný',   'windDirFull.SW': 'Juhozápadný',    'windDirFull.W': 'Západný',  'windDirFull.NW': 'Severozápadný',
    'day.tap': 'detaily',
    'day.today': 'Dnes',
    'day.short.mon': 'Po', 'day.short.tue': 'Ut', 'day.short.wed': 'St', 'day.short.thu': 'Št',
    'day.short.fri': 'Pi', 'day.short.sat': 'So', 'day.short.sun': 'Ne',
    'day.full.mon': 'Pondelok', 'day.full.tue': 'Utorok', 'day.full.wed': 'Streda', 'day.full.thu': 'Štvrtok',
    'day.full.fri': 'Piatok', 'day.full.sat': 'Sobota', 'day.full.sun': 'Nedeľa',
    'month.1': 'januára', 'month.2': 'februára', 'month.3': 'marca', 'month.4': 'apríla',
    'month.5': 'mája', 'month.6': 'júna', 'month.7': 'júla', 'month.8': 'augusta',
    'month.9': 'septembra', 'month.10': 'októbra', 'month.11': 'novembra', 'month.12': 'decembra'
  },
  pt: {
    'html.lang': 'pt',
    'header.changeCity': 'Mudar cidade',
    'header.editHint': 'Clique para mudar',
    'header.sourceLabel': 'Fonte dos dados',
    'header.sourceShort': 'Fonte',
    'hero.label': 'Agora',
    'hero.feels': 'Sensação {feels}',
    'hero.feelsBeforeSunrise': 'Sensação {feels} · Nascer-do-sol às {sunrise}',
    'hero.feelsBeforeSunset':  'Sensação {feels} · Pôr-do-sol às {sunset}',
    'hero.feelsAfterSunset':   'Sensação {feels} · Pôr-do-sol foi às {sunset}',
    'hero.sourceNote': 'Fonte: {name}',
    'hero.sourceAvg': 'média de 8 modelos',
    'metric.temp': 'Temperatura',
    'metric.feels': 'Sensação',
    'metric.wind': 'Vento',
    'metric.rain': 'Precipitação',
    'metric.pressure': 'Pressão',
    'metric.humidity': 'Humidade',
    'metric.dewpoint': 'Ponto de orvalho',
    'metric.uv': 'Índice UV',
    'metric.visibility': 'Visibilidade',
    'metric.solar': 'Radiação solar',
    'metric.windSub': '{dir} · rajadas {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'sem precipitação',
    'metric.rain.light': 'chuva fraca',
    'metric.rain.moderate': 'chuva moderada',
    'metric.rain.heavy': 'chuva forte',
    'metric.pressure.falling': 'A descer ↓',
    'metric.pressure.rising': 'A subir ↑',
    'metric.pressure.stable': 'Estável',
    'metric.humidity.dewPoint': 'Ponto de orvalho {t}',
    'astro.sun': 'Sol',
    'astro.sunrise': 'Nascer',
    'astro.sunset': 'Pôr',
    'astro.uv': 'Índice UV',
    'astro.aqi': 'Qualidade do ar',
    'astro.dayLen': '{h}h {m}min',
    'astro.photoTitle': 'Para fotógrafos e astrónomos',
    'astro.photoSub': 'Hora dourada / azul, qualidade do pôr-do-sol, visibilidade das estrelas',
    'astro.goldenHour': 'Hora dourada',
    'astro.blueHour': 'Hora azul',
    'astro.morning': 'Manhã',
    'astro.evening': 'Tarde',
    'astro.sunsetQuality': 'Pôr-do-sol hoje',
    'astro.sunset.dramatic': 'Espetacular',
    'astro.sunset.normal': 'Normal',
    'astro.sunset.dull': 'Apagado',
    'astro.sunset.cloudHint': 'nuvens {cl}%',
    'astro.stars': 'Visibilidade das estrelas',
    'astro.stars.excellent': 'Excelente',
    'astro.stars.good': 'Boa',
    'astro.stars.moderate': 'Moderada',
    'astro.stars.poor': 'Fraca',
    'astro.stars.veryPoor': 'Muito fraca',
    'astro.stars.hint': 'nuvens {cl}% · lua {moon}%',
    'chart.title': 'Hoje · previsão horária',
    'chart.sub.avg': 'Média de 8 modelos',
    'chart.sub.named': 'Previsão de {name}',
    'precip.title': 'Precipitação',
    'precip.sub': 'Previsão mm/h para as próximas 48 horas',
    'precip.tomorrow': 'amanhã',
    'precip.legend': 'mm/h',
    'hdm.title': 'Horário',
    'precipDetail.title': 'Detalhes da precipitação',
    'metric.rain.tapHint': 'Toca para ver gráfico, risco de trovoada e radar',
    'metric.wind.tapHint': 'Toca para ver o gráfico horário do vento',
    'metric.pressure.tapHint': 'Toca para ver o gráfico horário da pressão',
    'metric.humidity.tapHint': 'Toca para ver o gráfico horário da humidade',
    'radar.title': 'Radar de precipitação',
    'radar.sub': 'Precipitação em direto das últimas 2 horas + previsão ECMWF para as próximas 72 horas',
    'radar.loading': 'A carregar tiles do radar…',
    'radar.error': 'Falha ao carregar dados do radar',
    'radar.empty': 'Sem dados de radar para esta área',
    'radar.now': 'agora',
    'radar.forecast': 'previsão',
    'radar.tabLive': 'Radar · 2h',
    'radar.tabForecast': 'Previsão · 72h',
    'radar.windyHint': 'Fornecido pelo widget Windy.com com o modelo ECMWF',
    'search.chip': 'Encontrar janela',
    'search.aria': 'Encontrar janela meteorológica',
    'search.label': 'Pesquisa inversa',
    'search.title': 'Quando virá o tempo certo?',
    'search.sub': 'Descreve a condição — encontraremos a janela mais próxima na previsão de 10 dias',
    'search.placeholder': 'ex. sem chuva 6h, calor acima de +20, manhã limpa',
    'search.button': 'Procurar',
    'search.popularTitle': 'Pesquisas populares',
    'search.empty.title': 'Sem essa janela nos próximos 10 dias',
    'search.empty.hint': 'Tenta outra condição das sugestões',
    'search.empty.closest': 'Mais próxima: {when}',
    'search.error.parse': 'Não foi possível interpretar a consulta. Tenta um exemplo das sugestões.',
    'search.results.found': '{n} {label} encontrada(s)',
    'search.results.label.one': 'janela',
    'search.results.label.few': 'janelas',
    'search.results.label.many': 'janelas',
    'search.duration.hours': '{n}h',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'vento {v} {unit}',
    'search.day.today': 'Hoje',
    'search.day.tomorrow': 'Amanhã',
    'search.preset.norain': 'sem chuva ≥6h',
    'search.preset.warm': 'calor acima de +20',
    'search.preset.clear': 'céu limpo',
    'search.preset.calm': 'sem vento',
    'search.preset.run': 'bom para correr',
    'search.preset.bbq': 'tempo de churrasco',
    'search.preset.carwash': 'lavagem do carro',
    'search.preset.storm': 'quando trovoada',
    'fav.add': '+ Adicionar cidade',
    'fav.addToFav': 'Aos favoritos',
    'fav.removeFromFav': 'Remover dos favoritos',
    'city.section.favorites': 'Favoritos',
    'city.section.ua': 'Cidades ucranianas',
    'city.section.world': 'Cidades do mundo',
    'city.section.searchResults': 'Resultados da pesquisa',
    'chart.legendTemp': 'Temperatura',
    'chart.legendPrecip': 'Precipitação',
    'sources.title': 'Fonte da previsão',
    'sources.sub': 'Escolhe uma fonte ou usa a média dos 8 modelos',
    'sources.avgTitle': 'Média de todos os serviços',
    'sources.avgSub': 'Agregação de 8 modelos · previsão por ensemble',
    'sources.confHint': 'Barra colorida sob o cartão do dia — concordância dos 8 modelos:',
    'sources.confLegend.high': 'fiável',
    'sources.confLegend.mid': 'médio',
    'sources.confLegend.low': 'instável',
    'sources.confLegend.veryLow': 'grande dispersão',
    'alert.heat.title': 'Calor intenso ({t}°)',
    'alert.heat.msg': 'Bebe água a cada hora, evita o sol das 11 às 16. Roupa leve, chapéu',
    'alert.extremeHeat.title': 'Calor extremo ({t}°)',
    'alert.extremeHeat.msg': 'Risco para a saúde. Limita a atividade ao ar livre, risco de insolação',
    'alert.cold.title': 'Geada intensa ({t}°)',
    'alert.cold.msg': 'Veste-te com agasalho, cobre o rosto e as mãos. Evita longas caminhadas',
    'alert.extremeCold.title': 'Geada extrema ({t}°)',
    'alert.extremeCold.msg': 'Risco de queimaduras pelo frio em 10–20 min. Fica em casa se não for necessário',
    'pullRefresh.pull': 'Puxa para atualizar',
    'pullRefresh.ready': 'Larga para atualizar',
    'pullRefresh.refreshing': 'A atualizar...',
    'compare.chip': 'Comparar',
    'compare.chipAria': 'Comparar tempo com outra cidade',
    'compare.bannerLabel': 'Comparação',
    'compare.exitAria': 'Sair do modo de comparação',
    'compare.pickLabel': 'Comparar com',
    'compare.pickTitle': 'Escolhe a segunda cidade',
    'compare.pickHint': 'Favoritos ou pesquisa mundial',
    'compare.hourlyTitle': 'Temperatura horária · hoje',
    'compare.daysTitle': '7 dias',
    'compare.summary.same': 'Hoje tempo semelhante em ambas as cidades',
    'compare.summary.warmerA': 'Em {a} hoje mais quente em {d}°',
    'compare.summary.warmerB': 'Em {b} hoje mais quente em {d}°',
    'compare.summary.drierA': '{a} é mais seca, precipitação {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} é mais seca, precipitação {pb}% vs {pa}%',
    'compare.loading': 'A carregar tempo para {city}…',
    'compare.error': 'Falha ao carregar tempo para {city}',
    'compare.swapA': 'Mudar primeira cidade',
    'compare.swapB': 'Mudar segunda cidade',
    'sources.avgShort': 'Média de 8 modelos',
    'sources.dividerOr': 'ou uma fonte específica',
    'confidence.label': 'Concordância dos modelos',
    'confidence.high': 'alta',
    'confidence.mid': 'moderada',
    'confidence.low': 'baixa',
    'confidence.veryLow': 'fraca',
    'confidence.tooltip': '{n} modelos · dispersão ±{range}°C na temperatura máxima de hoje',
    'chart.spreadLabel': 'Dispersão entre 8 modelos',
    'windows.title': 'Janelas de atividade',
    'windows.sub': 'Melhor altura para tarefas diárias nos próximos 5 dias',
    'windows.preset.jogging': 'Corrida',
    'windows.preset.kids': 'Passeio com criança',
    'windows.preset.bbq': 'Churrasco / ao ar livre',
    'windows.preset.laundry': 'Secar roupa lá fora',
    'windows.preset.carwash': 'Lavar o carro',
    'windows.preset.watering': 'Regar plantas',
    'windows.today': 'Hoje',
    'windows.tomorrow': 'Amanhã',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'duração {h}h',
    'windows.noWindow': 'Sem janela adequada nos próximos 5 dias',
    'windows.carwash.dry': 'Seco {h}h seguidas',
    'windows.carwash.notRec': 'Não recomendado · espera-se chuva',
    'climate.title': 'Contexto climático',
    'climate.sub': 'Hoje vs média de 5 anos para esta data',
    'climate.tempLabel': 'Máxima diária',
    'climate.minLabel': 'Mínima noturna',
    'climate.precipLabel': 'Precipitação em 5 dias',
    'climate.norm': 'normal {v}',
    'climate.warmer': '+{v}° mais quente',
    'climate.colder': '−{v}° mais frio',
    'climate.aboutNorm': 'cerca do normal',
    'climate.wetter': '+{v}% mais húmido',
    'climate.drier': '−{v}% mais seco',
    'climate.sparkTitle': 'Nesta data em anos passados',
    'climate.sparkEmpty': 'Dados de arquivo indisponíveis',
    'climate.loading': 'A carregar histórico...',
    'pollen.title': 'Pólen hoje',
    'pollen.sub': 'Concentração de alergénios no ar (grãos/m³)',
    'pollen.alder': 'Amieiro',
    'pollen.birch': 'Bétula',
    'pollen.grass': 'Gramíneas',
    'pollen.mugwort': 'Artemísia',
    'pollen.olive': 'Oliveira',
    'pollen.ragweed': 'Ambrósia',
    'pollen.level.none': 'Não detetado',
    'pollen.level.low': 'Baixo',
    'pollen.level.mid': 'Moderado',
    'pollen.level.high': 'Alto',
    'pollen.level.veryHigh': 'Muito alto',
    'storm.title': 'Rastreador de trovoadas',
    'storm.sub': 'Risco horário de trovoada para as próximas 48 horas',
    'storm.noStorm': 'Sem trovoadas previstas nas próximas 48 horas',
    'storm.upcoming': 'Trovoada em {hours}h',
    'storm.now': 'Trovoada agora',
    'storm.risk0': 'sem risco',
    'storm.risk1': 'baixo',
    'storm.risk2': 'moderado',
    'storm.risk3': 'alto',
    'storm.risk4': 'perigoso',
    'storm.desc1': 'possível trovão distante, sem chuva',
    'storm.desc2': 'trovoadas localizadas com chuva',
    'storm.desc3': 'chuva forte com trovões, rajadas',
    'storm.desc4': 'trovoadas violentas, risco de granizo e rajadas',
    'storm.axisNow': 'agora',
    'storm.alertSoon': 'Trovoada esperada nas próximas {hours}h',
    'storm.alertNow': 'Trovoada em curso agora',
    'accuracy.title': 'Precisão das fontes',
    'accuracy.subEmpty': 'A recolher dados previsão-vs-real para a tua localização',
    'accuracy.subData': 'Erro absoluto médio nas últimas {n} comparações',
    'accuracy.groundTruth': 'com observações reais',
    'accuracy.colTempMax': 'T-max',
    'accuracy.colTempMin': 'T-min',
    'accuracy.leaderTempMax': 'T dia:',
    'accuracy.leaderTempMin': 'T noite:',
    'accuracy.leaderPrecip': 'precip.:',
    'accuracy.leaderAvgAll': 'A média supera cada modelo individual em todas as métricas',
    'accuracy.leaderBestAll': 'é a mais precisa em todas as métricas',
    'nowcast.now.until.rain':         'Chuva agora · até ~{time}',
    'nowcast.now.until.drizzle':      'Chuvisco agora · até ~{time}',
    'nowcast.now.until.snow':         'Neve agora · até ~{time}',
    'nowcast.now.until.sleet':        'Sleet · até ~{time}',
    'nowcast.now.until.freezing':     'Chuva gelada · até ~{time}',
    'nowcast.now.until.storm':        'Trovoada agora · até ~{time}',
    'nowcast.now.continues.rain':     'Chuva agora · 2h+ contínua',
    'nowcast.now.continues.drizzle':  'Chuvisco · 2h+ contínuo',
    'nowcast.now.continues.snow':     'Neve agora · 2h+ contínua',
    'nowcast.now.continues.sleet':    'Sleet · 2h+ contínuo',
    'nowcast.now.continues.freezing': 'Chuva gelada · 2h+ contínua',
    'nowcast.now.continues.storm':    'Trovoada · 2h+ contínua',
    'nowcast.soon.rain':              'Chuva em ~{min} min',
    'nowcast.soon.drizzle':           'Chuvisco em ~{min} min',
    'nowcast.soon.snow':              'Neve em ~{min} min',
    'nowcast.soon.sleet':             'Sleet em ~{min} min',
    'nowcast.soon.freezing':          'Chuva gelada em ~{min} min',
    'nowcast.soon.storm':             'Trovoada em ~{min} min',
    'nowcast.dry':                    'Seco nas próximas 2 horas',
    'accuracy.emptyTitle': 'A recolher dados',
    'accuracy.emptyHint': 'Abre o site uma vez por dia — após cerca de uma semana verás um ranking dos modelos com MAE para temperatura e precipitação específico desta localização',
    'accuracy.samplesUnit': 'amostras',
    'accuracy.colModel': 'Modelo',
    'accuracy.colScore': 'Precisão global',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%precip.',
    'accuracy.legendQ1': 'excelente',
    'accuracy.legendQ2': 'bom',
    'accuracy.legendQ3': 'aceitável',
    'accuracy.legendQ4': 'fraco',
    'accuracy.legendAvgWin': 'o melhor de todos',
    'accuracy.bestBadge': 'Modelo mais preciso segundo as amostras recentes',
    'footer.refresh': 'Atualizar',
    'footer.speak': 'Ler',
    'footer.speakStop': 'Parar',
    'footer.speakAria': 'Ler a previsão meteorológica em voz alta',
    'settings.voice.label': 'Voz',
    'settings.voice.female': 'feminina',
    'settings.voice.male': 'masculina',
    'settings.voice.none': 'Voz indisponível neste dispositivo',
    'settings.voice.preview': 'Pré-visualizar',
    'settings.voice.previewText': 'Olá! Vou ler a previsão do tempo.',
    'settings.voice.rate.label': 'Velocidade',
    'settings.voice.rate.slow': 'lenta',
    'settings.voice.rate.normal': 'normal',
    'settings.voice.rate.fast': 'rápida',
    'footer.updated': 'atualizado às {time}',
    'modal.closeAria': 'Fechar',
    'modal.day.forecast': 'Previsão',
    'modal.day.today': 'Hoje',
    'modal.day.dayLen': 'Duração do dia: {len}',
    'modal.day.uvScale': 'Escala 0-11+',
    'modal.day.pm25norm': 'PM2.5 normal',
    'modal.day.hourlyTitle': 'Temperatura e precipitação horárias',
    'modal.day.hoursTitle': 'Hora a hora',
    'city.label': 'Localização',
    'city.title': 'Onde verificar o tempo?',
    'city.useMyLocation': 'Usar a minha localização',
    'city.geoDesc': 'O browser pedirá permissão. As coordenadas ficam no teu browser',
    'city.search.placeholder': 'Procurar cidade na Ucrânia...',
    'city.search.clearAria': 'Limpar',
    'city.list.popular': 'Cidades ucranianas populares',
    'city.list.foundLocal': 'Encontrada nas populares',
    'city.list.searching': 'A procurar...',
    'city.list.found': 'Encontradas: {n}',
    'city.list.notFound': 'Nada encontrado',
    'city.list.empty': 'Cidade não encontrada. Tenta outro nome.',
    'city.list.emptyForQuery': 'Cidade „{q}" não encontrada na base Open-Meteo Ucrânia.',
    'city.list.searchError': 'A pesquisa falhou. Verifica a tua ligação à internet.',
    'city.list.minChars': 'Introduz pelo menos 2 caracteres',
    'city.list.aria': 'Lista de cidades',
    'city.tag.geo': '📍 por geolocalização',
    'city.tag.manual': '✋ escolhida',
    'city.geoErr.denied': 'Acesso à localização recusado. Permite-o nas definições do browser.',
    'city.geoErr.unavailable': 'Posição indisponível (sem sinal GPS/rede)',
    'city.geoErr.timeout': 'Tempo da requisição esgotado',
    'city.geoErr.notSupported': 'O browser não suporta geolocalização',
    'city.geoErr.generic': 'Erro de geolocalização',
    'loader.fetching': 'A carregar previsão...',
    'loader.refreshing': 'A atualizar...',
    'apiErr.title': 'Falha ao carregar a previsão',
    'apiErr.msg': 'A mostrar dados de demonstração. Verifica a ligação e tenta novamente.',
    'apiErr.retry': 'Tentar novamente',
    'apiErr.cors': 'Serviço meteorológico inacessível (CORS / rede)',
    'apiErr.timeout': 'Tempo de resposta da Open-Meteo esgotado',
    'apiErr.http': 'Erro de resposta do servidor ({code})',
    'apiErr.parse': 'Falha ao analisar a resposta da Open-Meteo',
    'settings.aria': 'Definições',
    'settings.label': 'Definições',
    'settings.title': 'Definições',
    'settings.theme.title': 'Aparência',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Escuro',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Claro',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Sistema',
    'settings.lang.title': 'Idioma da interface',
    'settings.temp.title': 'Temperatura',
    'settings.temp.c': 'Celsius',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Velocidade do vento',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'metros/seg',
    'settings.wind.kmh.unit': 'km/h',
    'settings.wind.kmh.full': 'quilómetros/hora',
    'settings.wind.mph.full': 'milhas/hora',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'nós',
    'settings.pressure.title': 'Pressão atmosférica',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'milímetros Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'hectopascais',
    'settings.pressure.inhg.full': 'polegadas Hg',
    'cond.clear': 'Limpo',
    'cond.partlyCloudy': 'Parcialmente nublado',
    'cond.cloudy': 'Nublado',
    'cond.overcast': 'Encoberto',
    'cond.rain': 'Chuva',
    'cond.heavyRain': 'Chuva forte',
    'cond.thunderstorm': 'Trovoada',
    'cond.snow': 'Neve',
    'cond.fog': 'Nevoeiro',
    'cond.partlyCloudyWithClear': 'Nublado com abertas',
    'condDesc.day0': 'Frente NO, chuvisco ocasional',
    'condDesc.day1': 'Ciclone ativo, precipitação forte à tarde',
    'condDesc.day2': 'Ciclone a afastar-se, nuvens residuais',
    'condDesc.day3': 'Anticiclone, dia soalheiro',
    'condDesc.day4': 'Vento fraco, nebulosidade variável',
    'condDesc.clear': 'Dia limpo e soalheiro',
    'condDesc.clearWindy': 'Limpo e ventoso',
    'condDesc.partlyCloudy': 'Parcialmente nublado',
    'condDesc.cloudy': 'Predominantemente nublado',
    'condDesc.overcast': 'Encoberto todo o dia',
    'condDesc.fog': 'Com nevoeiro, fraca visibilidade',
    'condDesc.rainLight': 'Possível precipitação fraca',
    'condDesc.rain': 'Chuva, por vezes intensa',
    'condDesc.heavyRain': 'Aguaceiros fortes, precipitação significativa esperada',
    'condDesc.snow': 'Queda de neve',
    'condDesc.thunderstorm': 'Trovoada com relâmpagos possível',
    'condDesc.windAddition': ', vento {dir} forte',
    'uvLabel.low': 'Baixo',
    'uvLabel.moderate': 'Moderado',
    'uvLabel.high': 'Alto',
    'uvLabel.veryHigh': 'Muito alto',
    'uvLabel.extreme': 'Extremo',
    'aqiLabel.good': 'Boa',
    'aqiLabel.moderate': 'Moderada',
    'aqiLabel.unhealthySens': 'Insalubre para sensíveis',
    'aqiLabel.unhealthy': 'Insalubre',
    'aqiLabel.veryUnhealthy': 'Muito insalubre',
    'aqiLabel.hazardous': 'Perigosa',
    'moon.new': 'Lua nova',
    'moon.waxingCrescent': 'Lua crescente',
    'moon.firstQuarter': 'Quarto crescente',
    'moon.waxingGibbous': 'Lua gibosa crescente',
    'moon.full': 'Lua cheia',
    'moon.waningGibbous': 'Lua gibosa minguante',
    'moon.lastQuarter': 'Quarto minguante',
    'moon.waningCrescent': 'Lua minguante',
    'windDir.N': 'N',   'windDir.NE': 'NE', 'windDir.E': 'E',  'windDir.SE': 'SE',
    'windDir.S': 'S',   'windDir.SW': 'SO', 'windDir.W': 'O',  'windDir.NW': 'NO',
    'windDirFull.N': 'Norte', 'windDirFull.NE': 'Nordeste', 'windDirFull.E': 'Leste', 'windDirFull.SE': 'Sudeste',
    'windDirFull.S': 'Sul',   'windDirFull.SW': 'Sudoeste', 'windDirFull.W': 'Oeste', 'windDirFull.NW': 'Noroeste',
    'day.tap': 'detalhes',
    'day.today': 'Hoje',
    'day.short.mon': 'Seg', 'day.short.tue': 'Ter', 'day.short.wed': 'Qua', 'day.short.thu': 'Qui',
    'day.short.fri': 'Sex', 'day.short.sat': 'Sáb', 'day.short.sun': 'Dom',
    'day.full.mon': 'Segunda', 'day.full.tue': 'Terça', 'day.full.wed': 'Quarta', 'day.full.thu': 'Quinta',
    'day.full.fri': 'Sexta', 'day.full.sat': 'Sábado', 'day.full.sun': 'Domingo',
    'month.1': 'janeiro', 'month.2': 'fevereiro', 'month.3': 'março', 'month.4': 'abril',
    'month.5': 'maio', 'month.6': 'junho', 'month.7': 'julho', 'month.8': 'agosto',
    'month.9': 'setembro', 'month.10': 'outubro', 'month.11': 'novembro', 'month.12': 'dezembro'
  },
  nl: {
    'html.lang': 'nl',
    'header.changeCity': 'Stad wijzigen',
    'header.editHint': 'Klik om te wijzigen',
    'header.sourceLabel': 'Gegevensbron',
    'header.sourceShort': 'Bron',
    'hero.label': 'Nu',
    'hero.feels': 'Gevoelstemperatuur {feels}',
    'hero.feelsBeforeSunrise': 'Gevoel {feels} · Zonsopkomst om {sunrise}',
    'hero.feelsBeforeSunset':  'Gevoel {feels} · Zonsondergang om {sunset}',
    'hero.feelsAfterSunset':   'Gevoel {feels} · Zonsondergang was om {sunset}',
    'hero.sourceNote': 'Bron: {name}',
    'hero.sourceAvg': 'gemiddelde van 8 modellen',
    'metric.temp': 'Temperatuur',
    'metric.feels': 'Gevoel',
    'metric.wind': 'Wind',
    'metric.rain': 'Neerslag',
    'metric.pressure': 'Druk',
    'metric.humidity': 'Vochtigheid',
    'metric.dewpoint': 'Dauwpunt',
    'metric.uv': 'UV-index',
    'metric.visibility': 'Zicht',
    'metric.solar': 'Zonnestraling',
    'metric.windSub': '{dir} · vlagen {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'geen neerslag',
    'metric.rain.light': 'lichte regen',
    'metric.rain.moderate': 'matige regen',
    'metric.rain.heavy': 'zware regen',
    'metric.pressure.falling': 'Dalend ↓',
    'metric.pressure.rising': 'Stijgend ↑',
    'metric.pressure.stable': 'Stabiel',
    'metric.humidity.dewPoint': 'Dauwpunt {t}',
    'astro.sun': 'Zon',
    'astro.sunrise': 'Opkomst',
    'astro.sunset': 'Ondergang',
    'astro.uv': 'UV-index',
    'astro.aqi': 'Luchtkwaliteit',
    'astro.dayLen': '{h}u {m}m',
    'astro.photoTitle': 'Voor fotografen en astronomen',
    'astro.photoSub': 'Gouden / blauwe uur, kwaliteit zonsondergang, sterzichtbaarheid',
    'astro.goldenHour': 'Gouden uur',
    'astro.blueHour': 'Blauwe uur',
    'astro.morning': '\'s Ochtends',
    'astro.evening': '\'s Avonds',
    'astro.sunsetQuality': 'Zonsondergang vandaag',
    'astro.sunset.dramatic': 'Spectaculair',
    'astro.sunset.normal': 'Normaal',
    'astro.sunset.dull': 'Mat',
    'astro.sunset.cloudHint': 'wolken {cl}%',
    'astro.stars': 'Sterzichtbaarheid',
    'astro.stars.excellent': 'Uitstekend',
    'astro.stars.good': 'Goed',
    'astro.stars.moderate': 'Gemiddeld',
    'astro.stars.poor': 'Slecht',
    'astro.stars.veryPoor': 'Zeer slecht',
    'astro.stars.hint': 'wolken {cl}% · maan {moon}%',
    'chart.title': 'Vandaag · uurlijkse voorspelling',
    'chart.sub.avg': 'Gemiddelde van 8 modellen',
    'chart.sub.named': 'Voorspelling door {name}',
    'precip.title': 'Neerslag',
    'precip.sub': 'Voorspelling mm/u voor de komende 48 uur',
    'precip.tomorrow': 'morgen',
    'precip.legend': 'mm/u',
    'hdm.title': 'Per uur',
    'precipDetail.title': 'Neerslagdetails',
    'metric.rain.tapHint': 'Tik om grafiek, onweersrisico en radar te zien',
    'metric.wind.tapHint': 'Tik om uurlijkse wind-grafiek te zien',
    'metric.pressure.tapHint': 'Tik om uurlijkse druk-grafiek te zien',
    'metric.humidity.tapHint': 'Tik om uurlijkse vochtigheid-grafiek te zien',
    'radar.title': 'Neerslagradar',
    'radar.sub': 'Live neerslag van de afgelopen 2 uur + ECMWF-voorspelling voor de komende 72 uur',
    'radar.loading': 'Radartiles laden…',
    'radar.error': 'Kon radargegevens niet laden',
    'radar.empty': 'Geen radargegevens voor dit gebied',
    'radar.now': 'nu',
    'radar.forecast': 'voorspelling',
    'radar.tabLive': 'Radar · 2u',
    'radar.tabForecast': 'Voorspelling · 72u',
    'radar.windyHint': 'Aangedreven door Windy.com-widget met ECMWF-model',
    'search.chip': 'Vind venster',
    'search.aria': 'Vind weersvenster',
    'search.label': 'Omgekeerd zoeken',
    'search.title': 'Wanneer komt het juiste weer?',
    'search.sub': 'Beschrijf de voorwaarde — wij vinden het dichtstbijzijnde venster in de 10-daagse voorspelling',
    'search.placeholder': 'bv. geen regen 6u, warm boven +20, heldere ochtend',
    'search.button': 'Zoeken',
    'search.popularTitle': 'Populaire zoekopdrachten',
    'search.empty.title': 'Geen zo\'n venster in de komende 10 dagen',
    'search.empty.hint': 'Probeer een andere voorwaarde uit de suggesties',
    'search.empty.closest': 'Dichtstbijzijnde: {when}',
    'search.error.parse': 'Kon de zoekopdracht niet interpreteren. Probeer een voorbeeld uit de suggesties.',
    'search.results.found': '{n} {label} gevonden',
    'search.results.label.one': 'venster',
    'search.results.label.few': 'vensters',
    'search.results.label.many': 'vensters',
    'search.duration.hours': '{n}u',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'wind {v} {unit}',
    'search.day.today': 'Vandaag',
    'search.day.tomorrow': 'Morgen',
    'search.preset.norain': 'geen regen ≥6u',
    'search.preset.warm': 'warm boven +20',
    'search.preset.clear': 'heldere lucht',
    'search.preset.calm': 'windstil',
    'search.preset.run': 'goed om te lopen',
    'search.preset.bbq': 'barbecue-weer',
    'search.preset.carwash': 'autowas',
    'search.preset.storm': 'wanneer onweer',
    'fav.add': '+ Stad toevoegen',
    'fav.addToFav': 'Aan favorieten',
    'fav.removeFromFav': 'Verwijderen uit favorieten',
    'city.section.favorites': 'Favorieten',
    'city.section.ua': 'Oekraïense steden',
    'city.section.world': 'Wereldsteden',
    'city.section.searchResults': 'Zoekresultaten',
    'chart.legendTemp': 'Temperatuur',
    'chart.legendPrecip': 'Neerslag',
    'sources.title': 'Voorspellingsbron',
    'sources.sub': 'Kies een bron of gebruik het gemiddelde van alle 8 modellen',
    'sources.avgTitle': 'Gemiddelde van alle diensten',
    'sources.avgSub': 'Aggregatie van 8 modellen · ensemble-voorspelling',
    'sources.confHint': 'Gekleurde balk onder de dagkaart — overeenstemming van 8 modellen:',
    'sources.confLegend.high': 'betrouwbaar',
    'sources.confLegend.mid': 'gemiddeld',
    'sources.confLegend.low': 'onzeker',
    'sources.confLegend.veryLow': 'grote spreiding',
    'alert.heat.title': 'Sterke hitte ({t}°)',
    'alert.heat.msg': 'Drink elk uur water, vermijd zon van 11 tot 16. Lichte kleding, hoed',
    'alert.extremeHeat.title': 'Extreme hitte ({t}°)',
    'alert.extremeHeat.msg': 'Gezondheidsrisico. Beperk buitenactiviteit, risico op hitteberoerte',
    'alert.cold.title': 'Strenge vorst ({t}°)',
    'alert.cold.msg': 'Kleed je warm, bedek gezicht en handen. Vermijd lange wandelingen',
    'alert.extremeCold.title': 'Extreme vorst ({t}°)',
    'alert.extremeCold.msg': 'Bevriezingsrisico in 10–20 min. Blijf binnen tenzij nodig',
    'pullRefresh.pull': 'Trek omlaag om te verversen',
    'pullRefresh.ready': 'Laat los om te verversen',
    'pullRefresh.refreshing': 'Verversen...',
    'compare.chip': 'Vergelijken',
    'compare.chipAria': 'Weer vergelijken met andere stad',
    'compare.bannerLabel': 'Vergelijking',
    'compare.exitAria': 'Vergelijkingsmodus verlaten',
    'compare.pickLabel': 'Vergelijken met',
    'compare.pickTitle': 'Kies tweede stad',
    'compare.pickHint': 'Favorieten of wereldwijde zoekopdracht',
    'compare.hourlyTitle': 'Uurlijkse temperatuur · vandaag',
    'compare.daysTitle': '7 dagen',
    'compare.summary.same': 'Vandaag vergelijkbaar weer in beide steden',
    'compare.summary.warmerA': 'In {a} vandaag {d}° warmer',
    'compare.summary.warmerB': 'In {b} vandaag {d}° warmer',
    'compare.summary.drierA': '{a} is droger, neerslag {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} is droger, neerslag {pb}% vs {pa}%',
    'compare.loading': 'Weer laden voor {city}…',
    'compare.error': 'Kon weer niet laden voor {city}',
    'compare.swapA': 'Eerste stad wijzigen',
    'compare.swapB': 'Tweede stad wijzigen',
    'sources.avgShort': 'Gemiddelde van 8 modellen',
    'sources.dividerOr': 'of een specifieke bron',
    'confidence.label': 'Modeloverlap',
    'confidence.high': 'hoog',
    'confidence.mid': 'matig',
    'confidence.low': 'laag',
    'confidence.veryLow': 'slecht',
    'confidence.tooltip': '{n} modellen · spreiding ±{range}°C op de maximumtemperatuur van vandaag',
    'chart.spreadLabel': 'Spreiding tussen 8 modellen',
    'windows.title': 'Activiteitsvensters',
    'windows.sub': 'Beste tijd voor dagelijkse taken in de komende 5 dagen',
    'windows.preset.jogging': 'Hardlopen',
    'windows.preset.kids': 'Wandeling met kind',
    'windows.preset.bbq': 'Barbecue / buiten',
    'windows.preset.laundry': 'Was buiten drogen',
    'windows.preset.carwash': 'Auto wassen',
    'windows.preset.watering': 'Planten water geven',
    'windows.today': 'Vandaag',
    'windows.tomorrow': 'Morgen',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'duur {h}u',
    'windows.noWindow': 'Geen geschikt venster in de komende 5 dagen',
    'windows.carwash.dry': 'Droog {h}u achter elkaar',
    'windows.carwash.notRec': 'Niet aanbevolen · regen verwacht',
    'climate.title': 'Klimaatcontext',
    'climate.sub': 'Vandaag vs 5-jaarsgemiddelde voor deze datum',
    'climate.tempLabel': 'Dagmaximum',
    'climate.minLabel': 'Nachtminimum',
    'climate.precipLabel': 'Neerslag in 5 dagen',
    'climate.norm': 'normaal {v}',
    'climate.warmer': '+{v}° warmer',
    'climate.colder': '−{v}° kouder',
    'climate.aboutNorm': 'ongeveer normaal',
    'climate.wetter': '+{v}% natter',
    'climate.drier': '−{v}% droger',
    'climate.sparkTitle': 'Op deze datum in vorige jaren',
    'climate.sparkEmpty': 'Archiefgegevens niet beschikbaar',
    'climate.loading': 'Geschiedenis laden...',
    'pollen.title': 'Pollen vandaag',
    'pollen.sub': 'Allergenenconcentratie in de lucht (korrels/m³)',
    'pollen.alder': 'Els',
    'pollen.birch': 'Berk',
    'pollen.grass': 'Grassen',
    'pollen.mugwort': 'Bijvoet',
    'pollen.olive': 'Olijfboom',
    'pollen.ragweed': 'Ambrosia',
    'pollen.level.none': 'Niet gedetecteerd',
    'pollen.level.low': 'Laag',
    'pollen.level.mid': 'Matig',
    'pollen.level.high': 'Hoog',
    'pollen.level.veryHigh': 'Zeer hoog',
    'storm.title': 'Onweersbewaking',
    'storm.sub': 'Uurlijks onweersrisico voor de komende 48 uur',
    'storm.noStorm': 'Geen onweer verwacht in de komende 48 uur',
    'storm.upcoming': 'Onweer over {hours}u',
    'storm.now': 'Onweer nu',
    'storm.risk0': 'geen risico',
    'storm.risk1': 'laag',
    'storm.risk2': 'matig',
    'storm.risk3': 'hoog',
    'storm.risk4': 'gevaarlijk',
    'storm.desc1': 'verre donder mogelijk, geen regen',
    'storm.desc2': 'lokale onweersbuien met regen',
    'storm.desc3': 'zware regen met donder, windvlagen',
    'storm.desc4': 'zware onweersbuien, kans op hagel en vlagen',
    'storm.axisNow': 'nu',
    'storm.alertSoon': 'Onweer verwacht binnen {hours}u',
    'storm.alertNow': 'Onweer aan de gang',
    'accuracy.title': 'Nauwkeurigheid van bronnen',
    'accuracy.subEmpty': 'Voorspelling-vs-realiteit gegevens verzamelen voor jouw locatie',
    'accuracy.subData': 'Gemiddelde absolute fout over de laatste {n} vergelijkingen',
    'accuracy.groundTruth': 'met echte waarnemingen',
    'accuracy.colTempMax': 'T-max',
    'accuracy.colTempMin': 'T-min',
    'accuracy.leaderTempMax': 'T dag:',
    'accuracy.leaderTempMin': 'T nacht:',
    'accuracy.leaderPrecip': 'neerslag:',
    'accuracy.leaderAvgAll': 'Het gemiddelde verslaat elk afzonderlijk model op alle statistieken',
    'accuracy.leaderBestAll': 'is het meest nauwkeurig op alle statistieken',
    'nowcast.now.until.rain':         'Regen nu · tot ~{time}',
    'nowcast.now.until.drizzle':      'Motregen nu · tot ~{time}',
    'nowcast.now.until.snow':         'Sneeuw nu · tot ~{time}',
    'nowcast.now.until.sleet':        'Natte sneeuw · tot ~{time}',
    'nowcast.now.until.freezing':     'IJsregen · tot ~{time}',
    'nowcast.now.until.storm':        'Onweer nu · tot ~{time}',
    'nowcast.now.continues.rain':     'Regen nu · 2u+ aanhoudend',
    'nowcast.now.continues.drizzle':  'Motregen · 2u+ aanhoudend',
    'nowcast.now.continues.snow':     'Sneeuw nu · 2u+ aanhoudend',
    'nowcast.now.continues.sleet':    'Natte sneeuw · 2u+ aanhoudend',
    'nowcast.now.continues.freezing': 'IJsregen · 2u+ aanhoudend',
    'nowcast.now.continues.storm':    'Onweer · 2u+ aanhoudend',
    'nowcast.soon.rain':              'Regen over ~{min} min',
    'nowcast.soon.drizzle':           'Motregen over ~{min} min',
    'nowcast.soon.snow':              'Sneeuw over ~{min} min',
    'nowcast.soon.sleet':             'Natte sneeuw over ~{min} min',
    'nowcast.soon.freezing':          'IJsregen over ~{min} min',
    'nowcast.soon.storm':             'Onweer over ~{min} min',
    'nowcast.dry':                    'Droog in de komende 2 uur',
    'accuracy.emptyTitle': 'Gegevens verzamelen',
    'accuracy.emptyHint': 'Open de site één keer per dag — na ongeveer een week zie je een modelranglijst met MAE voor temperatuur en neerslag specifiek voor deze locatie',
    'accuracy.samplesUnit': 'monsters',
    'accuracy.colModel': 'Model',
    'accuracy.colScore': 'Totale nauwkeurigheid',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%neerslag',
    'accuracy.legendQ1': 'uitstekend',
    'accuracy.legendQ2': 'goed',
    'accuracy.legendQ3': 'acceptabel',
    'accuracy.legendQ4': 'slecht',
    'accuracy.legendAvgWin': 'het beste van allemaal',
    'accuracy.bestBadge': 'Meest nauwkeurig model volgens recente monsters',
    'footer.refresh': 'Verversen',
    'footer.speak': 'Voorlezen',
    'footer.speakStop': 'Stop',
    'footer.speakAria': 'Weersvoorspelling hardop voorlezen',
    'settings.voice.label': 'Stem',
    'settings.voice.female': 'vrouwelijk',
    'settings.voice.male': 'mannelijk',
    'settings.voice.none': 'Stem niet beschikbaar op dit apparaat',
    'settings.voice.preview': 'Voorbeeld',
    'settings.voice.previewText': 'Hallo! Ik ga de weersvoorspelling voorlezen.',
    'settings.voice.rate.label': 'Snelheid',
    'settings.voice.rate.slow': 'langzaam',
    'settings.voice.rate.normal': 'normaal',
    'settings.voice.rate.fast': 'snel',
    'footer.updated': 'bijgewerkt om {time}',
    'modal.closeAria': 'Sluiten',
    'modal.day.forecast': 'Voorspelling',
    'modal.day.today': 'Vandaag',
    'modal.day.dayLen': 'Daglengte: {len}',
    'modal.day.uvScale': 'Schaal 0-11+',
    'modal.day.pm25norm': 'PM2.5 normaal',
    'modal.day.hourlyTitle': 'Uurlijkse temperatuur en neerslag',
    'modal.day.hoursTitle': 'Uur voor uur',
    'city.label': 'Locatie',
    'city.title': 'Waar wil je het weer bekijken?',
    'city.useMyLocation': 'Mijn locatie gebruiken',
    'city.geoDesc': 'De browser zal om toestemming vragen. Coördinaten blijven in je browser',
    'city.search.placeholder': 'Stad in Oekraïne zoeken...',
    'city.search.clearAria': 'Wissen',
    'city.list.popular': 'Populaire Oekraïense steden',
    'city.list.foundLocal': 'Gevonden in populaire',
    'city.list.searching': 'Zoeken...',
    'city.list.found': 'Gevonden: {n}',
    'city.list.notFound': 'Niets gevonden',
    'city.list.empty': 'Stad niet gevonden. Probeer een andere naam.',
    'city.list.emptyForQuery': 'Stad „{q}" niet gevonden in de Open-Meteo Oekraïne-database.',
    'city.list.searchError': 'Zoeken mislukt. Controleer je internetverbinding.',
    'city.list.minChars': 'Voer minimaal 2 tekens in',
    'city.list.aria': 'Lijst met steden',
    'city.tag.geo': '📍 via geolocatie',
    'city.tag.manual': '✋ gekozen',
    'city.geoErr.denied': 'Toegang tot locatie geweigerd. Sta het toe in de browserinstellingen.',
    'city.geoErr.unavailable': 'Positie niet beschikbaar (geen GPS/netwerksignaal)',
    'city.geoErr.timeout': 'Aanvraag time-out',
    'city.geoErr.notSupported': 'De browser ondersteunt geen geolocatie',
    'city.geoErr.generic': 'Geolocatie-fout',
    'loader.fetching': 'Voorspelling laden...',
    'loader.refreshing': 'Verversen...',
    'apiErr.title': 'Laden van voorspelling mislukt',
    'apiErr.msg': 'Demo-gegevens worden weergegeven. Controleer je verbinding en probeer opnieuw.',
    'apiErr.retry': 'Opnieuw proberen',
    'apiErr.cors': 'Weerservice onbereikbaar (CORS / netwerk)',
    'apiErr.timeout': 'Open-Meteo antwoord time-out',
    'apiErr.http': 'Server-antwoordfout ({code})',
    'apiErr.parse': 'Kon Open-Meteo antwoord niet verwerken',
    'settings.aria': 'Instellingen',
    'settings.label': 'Instellingen',
    'settings.title': 'Instellingen',
    'settings.theme.title': 'Weergave',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Donker',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Licht',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Systeem',
    'settings.lang.title': 'Taal van de interface',
    'settings.temp.title': 'Temperatuur',
    'settings.temp.c': 'Celsius',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Windsnelheid',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'meter/sec',
    'settings.wind.kmh.unit': 'km/u',
    'settings.wind.kmh.full': 'kilometer/uur',
    'settings.wind.mph.full': 'mijl/uur',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'knopen',
    'settings.pressure.title': 'Luchtdruk',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'millimeter Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'hectopascal',
    'settings.pressure.inhg.full': 'inch Hg',
    'cond.clear': 'Helder',
    'cond.partlyCloudy': 'Half bewolkt',
    'cond.cloudy': 'Bewolkt',
    'cond.overcast': 'Zwaar bewolkt',
    'cond.rain': 'Regen',
    'cond.heavyRain': 'Zware regen',
    'cond.thunderstorm': 'Onweer',
    'cond.snow': 'Sneeuw',
    'cond.fog': 'Mist',
    'cond.partlyCloudyWithClear': 'Bewolkt met opklaringen',
    'condDesc.day0': 'NW-front, af en toe motregen',
    'condDesc.day1': 'Actieve cycloon, zware neerslag in de middag',
    'condDesc.day2': 'Cycloon trekt weg, restbewolking',
    'condDesc.day3': 'Anticycloon, zonnige dag',
    'condDesc.day4': 'Lichte wind, wisselende bewolking',
    'condDesc.clear': 'Heldere zonnige dag',
    'condDesc.clearWindy': 'Helder en winderig',
    'condDesc.partlyCloudy': 'Half bewolkt',
    'condDesc.cloudy': 'Overwegend bewolkt',
    'condDesc.overcast': 'Zwaar bewolkt de hele dag',
    'condDesc.fog': 'Mistig, slechte zicht',
    'condDesc.rainLight': 'Lichte neerslag mogelijk',
    'condDesc.rain': 'Regen, soms intens',
    'condDesc.heavyRain': 'Zware buien, aanzienlijke neerslag verwacht',
    'condDesc.snow': 'Sneeuwval',
    'condDesc.thunderstorm': 'Onweer met bliksem mogelijk',
    'condDesc.windAddition': ', sterke {dir} wind',
    'uvLabel.low': 'Laag',
    'uvLabel.moderate': 'Matig',
    'uvLabel.high': 'Hoog',
    'uvLabel.veryHigh': 'Zeer hoog',
    'uvLabel.extreme': 'Extreem',
    'aqiLabel.good': 'Goed',
    'aqiLabel.moderate': 'Matig',
    'aqiLabel.unhealthySens': 'Ongezond voor gevoeligen',
    'aqiLabel.unhealthy': 'Ongezond',
    'aqiLabel.veryUnhealthy': 'Zeer ongezond',
    'aqiLabel.hazardous': 'Gevaarlijk',
    'moon.new': 'Nieuwe maan',
    'moon.waxingCrescent': 'Wassende sikkel',
    'moon.firstQuarter': 'Eerste kwartier',
    'moon.waxingGibbous': 'Wassende maan',
    'moon.full': 'Volle maan',
    'moon.waningGibbous': 'Afnemende maan',
    'moon.lastQuarter': 'Laatste kwartier',
    'moon.waningCrescent': 'Afnemende sikkel',
    'windDir.N': 'N',   'windDir.NE': 'NO', 'windDir.E': 'O',  'windDir.SE': 'ZO',
    'windDir.S': 'Z',   'windDir.SW': 'ZW', 'windDir.W': 'W',  'windDir.NW': 'NW',
    'windDirFull.N': 'Noord', 'windDirFull.NE': 'Noordoost', 'windDirFull.E': 'Oost', 'windDirFull.SE': 'Zuidoost',
    'windDirFull.S': 'Zuid',  'windDirFull.SW': 'Zuidwest',  'windDirFull.W': 'West', 'windDirFull.NW': 'Noordwest',
    'day.tap': 'details',
    'day.today': 'Vandaag',
    'day.short.mon': 'Ma', 'day.short.tue': 'Di', 'day.short.wed': 'Wo', 'day.short.thu': 'Do',
    'day.short.fri': 'Vr', 'day.short.sat': 'Za', 'day.short.sun': 'Zo',
    'day.full.mon': 'Maandag', 'day.full.tue': 'Dinsdag', 'day.full.wed': 'Woensdag', 'day.full.thu': 'Donderdag',
    'day.full.fri': 'Vrijdag', 'day.full.sat': 'Zaterdag', 'day.full.sun': 'Zondag',
    'month.1': 'januari', 'month.2': 'februari', 'month.3': 'maart', 'month.4': 'april',
    'month.5': 'mei', 'month.6': 'juni', 'month.7': 'juli', 'month.8': 'augustus',
    'month.9': 'september', 'month.10': 'oktober', 'month.11': 'november', 'month.12': 'december'
  },
  tr: {
    'html.lang': 'tr',
    'header.changeCity': 'Şehri değiştir',
    'header.editHint': 'Değiştirmek için tıkla',
    'header.sourceLabel': 'Veri kaynağı',
    'header.sourceShort': 'Kaynak',
    'hero.label': 'Şimdi',
    'hero.feels': 'Hissedilen {feels}',
    'hero.feelsBeforeSunrise': 'Hissedilen {feels} · Gün doğumu {sunrise}',
    'hero.feelsBeforeSunset':  'Hissedilen {feels} · Gün batımı {sunset}',
    'hero.feelsAfterSunset':   'Hissedilen {feels} · Gün batımı {sunset}\'de',
    'hero.sourceNote': 'Kaynak: {name}',
    'hero.sourceAvg': '8 modelin ortalaması',
    'metric.temp': 'Sıcaklık',
    'metric.feels': 'Hissedilen',
    'metric.wind': 'Rüzgar',
    'metric.rain': 'Yağış',
    'metric.pressure': 'Basınç',
    'metric.humidity': 'Nem',
    'metric.dewpoint': 'Çiy noktası',
    'metric.uv': 'UV indeksi',
    'metric.visibility': 'Görüş',
    'metric.solar': 'Güneş radyasyonu',
    'metric.windSub': '{dir} · hamleler {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'yağış yok',
    'metric.rain.light': 'hafif yağmur',
    'metric.rain.moderate': 'orta yağmur',
    'metric.rain.heavy': 'kuvvetli yağmur',
    'metric.pressure.falling': 'Düşüyor ↓',
    'metric.pressure.rising': 'Yükseliyor ↑',
    'metric.pressure.stable': 'Sabit',
    'metric.humidity.dewPoint': 'Çiy noktası {t}',
    'astro.sun': 'Güneş',
    'astro.sunrise': 'Doğuş',
    'astro.sunset': 'Batış',
    'astro.uv': 'UV indeksi',
    'astro.aqi': 'Hava kalitesi',
    'astro.dayLen': '{h}s {m}dk',
    'astro.photoTitle': 'Fotoğrafçı ve astronomlar için',
    'astro.photoSub': 'Altın / mavi saat, gün batımı kalitesi, yıldız görünürlüğü',
    'astro.goldenHour': 'Altın saat',
    'astro.blueHour': 'Mavi saat',
    'astro.morning': 'Sabah',
    'astro.evening': 'Akşam',
    'astro.sunsetQuality': 'Bugünkü gün batımı',
    'astro.sunset.dramatic': 'Etkileyici',
    'astro.sunset.normal': 'Normal',
    'astro.sunset.dull': 'Donuk',
    'astro.sunset.cloudHint': 'bulutlar %{cl}',
    'astro.stars': 'Yıldız görünürlüğü',
    'astro.stars.excellent': 'Mükemmel',
    'astro.stars.good': 'İyi',
    'astro.stars.moderate': 'Orta',
    'astro.stars.poor': 'Zayıf',
    'astro.stars.veryPoor': 'Çok zayıf',
    'astro.stars.hint': 'bulutlar %{cl} · ay %{moon}',
    'chart.title': 'Bugün · saatlik tahmin',
    'chart.sub.avg': '8 model ortalaması',
    'chart.sub.named': '{name} tahmini',
    'precip.title': 'Yağış',
    'precip.sub': 'Önümüzdeki 48 saat için mm/sa tahmini',
    'precip.tomorrow': 'yarın',
    'precip.legend': 'mm/sa',
    'hdm.title': 'Saatlik',
    'precipDetail.title': 'Yağış ayrıntıları',
    'metric.rain.tapHint': 'Grafik, fırtına riski ve radar için dokun',
    'metric.wind.tapHint': 'Saatlik rüzgar grafiği için dokun',
    'metric.pressure.tapHint': 'Saatlik basınç grafiği için dokun',
    'metric.humidity.tapHint': 'Saatlik nem grafiği için dokun',
    'radar.title': 'Yağış radarı',
    'radar.sub': 'Son 2 saatin canlı yağışı + önümüzdeki 72 saat için ECMWF tahmini',
    'radar.loading': 'Radar karoları yükleniyor…',
    'radar.error': 'Radar verileri yüklenemedi',
    'radar.empty': 'Bu bölge için radar verisi yok',
    'radar.now': 'şimdi',
    'radar.forecast': 'tahmin',
    'radar.tabLive': 'Radar · 2s',
    'radar.tabForecast': 'Tahmin · 72s',
    'radar.windyHint': 'ECMWF modeli ile Windy.com widget\'ı tarafından',
    'search.chip': 'Pencere bul',
    'search.aria': 'Hava penceresi bul',
    'search.label': 'Ters arama',
    'search.title': 'Uygun hava ne zaman gelecek?',
    'search.sub': 'Koşulu tarif et — 10 günlük tahminde en yakın pencereyi bulalım',
    'search.placeholder': 'örn. 6 saat yağmursuz, +20 üzeri sıcak, açık sabah',
    'search.button': 'Ara',
    'search.popularTitle': 'Popüler aramalar',
    'search.empty.title': 'Önümüzdeki 10 günde böyle bir pencere yok',
    'search.empty.hint': 'Önerilerden başka bir koşul dene',
    'search.empty.closest': 'En yakın: {when}',
    'search.error.parse': 'Sorgu yorumlanamadı. Önerilerden bir örnek dene.',
    'search.results.found': '{n} {label} bulundu',
    'search.results.label.one': 'pencere',
    'search.results.label.few': 'pencere',
    'search.results.label.many': 'pencere',
    'search.duration.hours': '{n}s',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'rüzgar {v} {unit}',
    'search.day.today': 'Bugün',
    'search.day.tomorrow': 'Yarın',
    'search.preset.norain': 'yağmursuz ≥6s',
    'search.preset.warm': '+20 üzeri sıcak',
    'search.preset.clear': 'açık gökyüzü',
    'search.preset.calm': 'rüzgarsız',
    'search.preset.run': 'koşmak için iyi',
    'search.preset.bbq': 'mangal havası',
    'search.preset.carwash': 'araba yıkama',
    'search.preset.storm': 'ne zaman fırtına',
    'fav.add': '+ Şehir ekle',
    'fav.addToFav': 'Favorilere',
    'fav.removeFromFav': 'Favorilerden kaldır',
    'city.section.favorites': 'Favoriler',
    'city.section.ua': 'Ukrayna şehirleri',
    'city.section.world': 'Dünya şehirleri',
    'city.section.searchResults': 'Arama sonuçları',
    'chart.legendTemp': 'Sıcaklık',
    'chart.legendPrecip': 'Yağış',
    'sources.title': 'Tahmin kaynağı',
    'sources.sub': 'Bir kaynak seç veya 8 modelin ortalamasını kullan',
    'sources.avgTitle': 'Tüm hizmetlerin ortalaması',
    'sources.avgSub': '8 model toplaması · topluluk tahmini',
    'sources.confHint': 'Gün kartının altındaki renkli çubuk — 8 modelin uyumu:',
    'sources.confLegend.high': 'güvenilir',
    'sources.confLegend.mid': 'orta',
    'sources.confLegend.low': 'kararsız',
    'sources.confLegend.veryLow': 'büyük dağılım',
    'alert.heat.title': 'Şiddetli sıcaklık ({t}°)',
    'alert.heat.msg': 'Her saat su iç, 11-16 arasında güneşten kaçın. Hafif giysi, şapka',
    'alert.extremeHeat.title': 'Aşırı sıcak ({t}°)',
    'alert.extremeHeat.msg': 'Sağlık riski. Dış aktiviteyi kısıtla, sıcak çarpması riski',
    'alert.cold.title': 'Şiddetli soğuk ({t}°)',
    'alert.cold.msg': 'Sıcak giyin, yüzü ve elleri ört. Uzun yürüyüşlerden kaçın',
    'alert.extremeCold.title': 'Aşırı soğuk ({t}°)',
    'alert.extremeCold.msg': '10–20 dakikada donma riski. Gerekmedikçe içeride kal',
    'pullRefresh.pull': 'Yenilemek için aşağı çek',
    'pullRefresh.ready': 'Yenilemek için bırak',
    'pullRefresh.refreshing': 'Yenileniyor...',
    'compare.chip': 'Karşılaştır',
    'compare.chipAria': 'Havayı başka bir şehirle karşılaştır',
    'compare.bannerLabel': 'Karşılaştırma',
    'compare.exitAria': 'Karşılaştırma modundan çık',
    'compare.pickLabel': 'Şununla karşılaştır:',
    'compare.pickTitle': 'İkinci şehri seç',
    'compare.pickHint': 'Favoriler veya dünya çapında arama',
    'compare.hourlyTitle': 'Saatlik sıcaklık · bugün',
    'compare.daysTitle': '7 gün',
    'compare.summary.same': 'Bugün her iki şehirde benzer hava',
    'compare.summary.warmerA': '{a} bugün {d}° daha sıcak',
    'compare.summary.warmerB': '{b} bugün {d}° daha sıcak',
    'compare.summary.drierA': '{a} daha kuru, yağış %{pa} vs %{pb}',
    'compare.summary.drierB': '{b} daha kuru, yağış %{pb} vs %{pa}',
    'compare.loading': '{city} için hava yükleniyor…',
    'compare.error': '{city} için hava yüklenemedi',
    'compare.swapA': 'İlk şehri değiştir',
    'compare.swapB': 'İkinci şehri değiştir',
    'sources.avgShort': '8 model ortalaması',
    'sources.dividerOr': 'veya belirli bir kaynak',
    'confidence.label': 'Model uyumu',
    'confidence.high': 'yüksek',
    'confidence.mid': 'orta',
    'confidence.low': 'düşük',
    'confidence.veryLow': 'zayıf',
    'confidence.tooltip': '{n} model · bugünkü maks. sıcaklıkta dağılım ±{range}°C',
    'chart.spreadLabel': '8 model arası dağılım',
    'windows.title': 'Aktivite pencereleri',
    'windows.sub': 'Önümüzdeki 5 gün için günlük görevlerin en iyi zamanı',
    'windows.preset.jogging': 'Koşu',
    'windows.preset.kids': 'Çocukla yürüyüş',
    'windows.preset.bbq': 'Mangal / dışarıda',
    'windows.preset.laundry': 'Çamaşırı dışarıda kurutmak',
    'windows.preset.carwash': 'Araba yıkama',
    'windows.preset.watering': 'Bitkileri sulamak',
    'windows.today': 'Bugün',
    'windows.tomorrow': 'Yarın',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'süre {h}s',
    'windows.noWindow': 'Önümüzdeki 5 günde uygun pencere yok',
    'windows.carwash.dry': '{h} saat üst üste kuru',
    'windows.carwash.notRec': 'Önerilmez · yağmur bekleniyor',
    'climate.title': 'İklim bağlamı',
    'climate.sub': 'Bu tarih için bugün vs 5 yıllık ortalama',
    'climate.tempLabel': 'Günlük maksimum',
    'climate.minLabel': 'Gecelik minimum',
    'climate.precipLabel': '5 günde yağış',
    'climate.norm': 'normal {v}',
    'climate.warmer': '+{v}° daha sıcak',
    'climate.colder': '−{v}° daha soğuk',
    'climate.aboutNorm': 'yaklaşık normal',
    'climate.wetter': '+%{v} daha nemli',
    'climate.drier': '−%{v} daha kuru',
    'climate.sparkTitle': 'Geçmiş yıllarda bu tarihte',
    'climate.sparkEmpty': 'Arşiv verileri mevcut değil',
    'climate.loading': 'Geçmiş yükleniyor...',
    'pollen.title': 'Bugün polen',
    'pollen.sub': 'Havadaki alerjen yoğunluğu (tane/m³)',
    'pollen.alder': 'Kızılağaç',
    'pollen.birch': 'Huş',
    'pollen.grass': 'Çimen',
    'pollen.mugwort': 'Pelin',
    'pollen.olive': 'Zeytin',
    'pollen.ragweed': 'Ambrosia',
    'pollen.level.none': 'Tespit edilmedi',
    'pollen.level.low': 'Düşük',
    'pollen.level.mid': 'Orta',
    'pollen.level.high': 'Yüksek',
    'pollen.level.veryHigh': 'Çok yüksek',
    'storm.title': 'Fırtına takipçisi',
    'storm.sub': 'Önümüzdeki 48 saat için saatlik fırtına riski',
    'storm.noStorm': 'Önümüzdeki 48 saatte fırtına beklenmiyor',
    'storm.upcoming': '{hours} saat içinde fırtına',
    'storm.now': 'Şu anda fırtına',
    'storm.risk0': 'risk yok',
    'storm.risk1': 'düşük',
    'storm.risk2': 'orta',
    'storm.risk3': 'yüksek',
    'storm.risk4': 'tehlikeli',
    'storm.desc1': 'uzaktan gök gürültüsü olası, yağmur yok',
    'storm.desc2': 'lokal fırtına ile yağmur',
    'storm.desc3': 'gök gürültülü kuvvetli yağmur, hamleler',
    'storm.desc4': 'şiddetli fırtınalar, dolu ve hamle riski',
    'storm.axisNow': 'şimdi',
    'storm.alertSoon': 'Önümüzdeki {hours} saatte fırtına bekleniyor',
    'storm.alertNow': 'Fırtına devam ediyor',
    'accuracy.title': 'Kaynak doğruluğu',
    'accuracy.subEmpty': 'Konumun için tahmin-vs-gerçek verisi toplanıyor',
    'accuracy.subData': 'Son {n} karşılaştırmada ortalama mutlak hata',
    'accuracy.groundTruth': 'gerçek gözlemlerle',
    'accuracy.colTempMax': 'T-maks',
    'accuracy.colTempMin': 'T-min',
    'accuracy.leaderTempMax': 'gündüz T:',
    'accuracy.leaderTempMin': 'gece T:',
    'accuracy.leaderPrecip': 'yağış:',
    'accuracy.leaderAvgAll': 'Ortalama tüm metriklerde her bir modeli yener',
    'accuracy.leaderBestAll': 'tüm metriklerde en doğru olanı',
    'nowcast.now.until.rain':         'Yağmur şimdi · ~{time}\'a kadar',
    'nowcast.now.until.drizzle':      'Çisenti şimdi · ~{time}\'a kadar',
    'nowcast.now.until.snow':         'Kar şimdi · ~{time}\'a kadar',
    'nowcast.now.until.sleet':        'Sulu kar · ~{time}\'a kadar',
    'nowcast.now.until.freezing':     'Donan yağmur · ~{time}\'a kadar',
    'nowcast.now.until.storm':        'Fırtına şimdi · ~{time}\'a kadar',
    'nowcast.now.continues.rain':     'Yağmur şimdi · 2sa+ sürekli',
    'nowcast.now.continues.drizzle':  'Çisenti · 2sa+ sürekli',
    'nowcast.now.continues.snow':     'Kar şimdi · 2sa+ sürekli',
    'nowcast.now.continues.sleet':    'Sulu kar · 2sa+ sürekli',
    'nowcast.now.continues.freezing': 'Donan yağmur · 2sa+ sürekli',
    'nowcast.now.continues.storm':    'Fırtına · 2sa+ sürekli',
    'nowcast.soon.rain':              '~{min} dakika içinde yağmur',
    'nowcast.soon.drizzle':           '~{min} dakika içinde çisenti',
    'nowcast.soon.snow':              '~{min} dakika içinde kar',
    'nowcast.soon.sleet':             '~{min} dakika içinde sulu kar',
    'nowcast.soon.freezing':          '~{min} dakika içinde donan yağmur',
    'nowcast.soon.storm':             '~{min} dakika içinde fırtına',
    'nowcast.dry':                    'Önümüzdeki 2 saat kuru',
    'accuracy.emptyTitle': 'Veri toplanıyor',
    'accuracy.emptyHint': 'Siteyi günde bir kez aç — yaklaşık bir hafta sonra bu konuma özel sıcaklık ve yağış için MAE ile model sıralaması göreceksin',
    'accuracy.samplesUnit': 'örnek',
    'accuracy.colModel': 'Model',
    'accuracy.colScore': 'Genel doğruluk',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%yağış',
    'accuracy.legendQ1': 'mükemmel',
    'accuracy.legendQ2': 'iyi',
    'accuracy.legendQ3': 'kabul edilebilir',
    'accuracy.legendQ4': 'zayıf',
    'accuracy.legendAvgWin': 'hepsinin en iyisi',
    'accuracy.bestBadge': 'Son örneklere göre en doğru model',
    'footer.refresh': 'Yenile',
    'footer.speak': 'Oku',
    'footer.speakStop': 'Dur',
    'footer.speakAria': 'Hava tahminini sesli oku',
    'settings.voice.label': 'Ses',
    'settings.voice.female': 'kadın',
    'settings.voice.male': 'erkek',
    'settings.voice.none': 'Bu cihazda ses mevcut değil',
    'settings.voice.preview': 'Önizleme',
    'settings.voice.previewText': 'Merhaba! Hava tahminini okuyacağım.',
    'settings.voice.rate.label': 'Hız',
    'settings.voice.rate.slow': 'yavaş',
    'settings.voice.rate.normal': 'normal',
    'settings.voice.rate.fast': 'hızlı',
    'footer.updated': '{time}\'de güncellendi',
    'modal.closeAria': 'Kapat',
    'modal.day.forecast': 'Tahmin',
    'modal.day.today': 'Bugün',
    'modal.day.dayLen': 'Gün uzunluğu: {len}',
    'modal.day.uvScale': 'Skala 0-11+',
    'modal.day.pm25norm': 'PM2.5 normal',
    'modal.day.hourlyTitle': 'Saatlik sıcaklık ve yağış',
    'modal.day.hoursTitle': 'Saat saat',
    'city.label': 'Konum',
    'city.title': 'Havayı nerede kontrol edelim?',
    'city.useMyLocation': 'Konumumu kullan',
    'city.geoDesc': 'Tarayıcı izin isteyecek. Koordinatlar tarayıcında kalır',
    'city.search.placeholder': 'Ukrayna\'da şehir ara...',
    'city.search.clearAria': 'Temizle',
    'city.list.popular': 'Popüler Ukrayna şehirleri',
    'city.list.foundLocal': 'Popülerlerde bulundu',
    'city.list.searching': 'Aranıyor...',
    'city.list.found': 'Bulundu: {n}',
    'city.list.notFound': 'Bir şey bulunmadı',
    'city.list.empty': 'Şehir bulunamadı. Başka bir ad dene.',
    'city.list.emptyForQuery': '„{q}" şehri Open-Meteo Ukrayna veritabanında bulunamadı.',
    'city.list.searchError': 'Arama başarısız. İnternet bağlantını kontrol et.',
    'city.list.minChars': 'En az 2 karakter gir',
    'city.list.aria': 'Şehir listesi',
    'city.tag.geo': '📍 konum bilgisine göre',
    'city.tag.manual': '✋ seçilmiş',
    'city.geoErr.denied': 'Konum erişimi reddedildi. Tarayıcı ayarlarından izin ver.',
    'city.geoErr.unavailable': 'Konum mevcut değil (GPS/ağ sinyali yok)',
    'city.geoErr.timeout': 'İstek zaman aşımına uğradı',
    'city.geoErr.notSupported': 'Tarayıcı konum desteklemiyor',
    'city.geoErr.generic': 'Konum hatası',
    'loader.fetching': 'Tahmin yükleniyor...',
    'loader.refreshing': 'Yenileniyor...',
    'apiErr.title': 'Tahmin yükleme başarısız',
    'apiErr.msg': 'Demo veriler gösteriliyor. Bağlantını kontrol et ve tekrar dene.',
    'apiErr.retry': 'Tekrar dene',
    'apiErr.cors': 'Hava servisi erişilemez (CORS / ağ)',
    'apiErr.timeout': 'Open-Meteo yanıt zaman aşımı',
    'apiErr.http': 'Sunucu yanıt hatası ({code})',
    'apiErr.parse': 'Open-Meteo yanıtı ayrıştırılamadı',
    'settings.aria': 'Ayarlar',
    'settings.label': 'Ayarlar',
    'settings.title': 'Ayarlar',
    'settings.theme.title': 'Görünüm',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Koyu',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Açık',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Sistem',
    'settings.lang.title': 'Arayüz dili',
    'settings.temp.title': 'Sıcaklık',
    'settings.temp.c': 'Celsius',
    'settings.temp.f': 'Fahrenheit',
    'settings.wind.title': 'Rüzgar hızı',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'metre/sn',
    'settings.wind.kmh.unit': 'km/sa',
    'settings.wind.kmh.full': 'kilometre/saat',
    'settings.wind.mph.full': 'mil/saat',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'knot',
    'settings.pressure.title': 'Atmosfer basıncı',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'milimetre Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'hektopaskal',
    'settings.pressure.inhg.full': 'inç Hg',
    'cond.clear': 'Açık',
    'cond.partlyCloudy': 'Parçalı bulutlu',
    'cond.cloudy': 'Bulutlu',
    'cond.overcast': 'Kapalı',
    'cond.rain': 'Yağmur',
    'cond.heavyRain': 'Kuvvetli yağmur',
    'cond.thunderstorm': 'Fırtına',
    'cond.snow': 'Kar',
    'cond.fog': 'Sis',
    'cond.partlyCloudyWithClear': 'Açılmalı bulutlu',
    'condDesc.day0': 'KB cephesi, ara sıra çisenti',
    'condDesc.day1': 'Aktif siklon, öğleden sonra şiddetli yağış',
    'condDesc.day2': 'Siklon uzaklaşıyor, kalıcı bulutlanma',
    'condDesc.day3': 'Yüksek basınç, güneşli gün',
    'condDesc.day4': 'Hafif rüzgar, değişken bulutluluk',
    'condDesc.clear': 'Açık güneşli gün',
    'condDesc.clearWindy': 'Açık ve rüzgarlı',
    'condDesc.partlyCloudy': 'Parçalı bulutlu',
    'condDesc.cloudy': 'Çoğunlukla bulutlu',
    'condDesc.overcast': 'Tüm gün kapalı',
    'condDesc.fog': 'Sisli, kötü görüş',
    'condDesc.rainLight': 'Hafif yağış olası',
    'condDesc.rain': 'Yağmur, bazen yoğun',
    'condDesc.heavyRain': 'Kuvvetli sağanaklar, önemli yağış bekleniyor',
    'condDesc.snow': 'Kar yağışı',
    'condDesc.thunderstorm': 'Yıldırımlı fırtına olası',
    'condDesc.windAddition': ', kuvvetli {dir} rüzgarı',
    'uvLabel.low': 'Düşük',
    'uvLabel.moderate': 'Orta',
    'uvLabel.high': 'Yüksek',
    'uvLabel.veryHigh': 'Çok yüksek',
    'uvLabel.extreme': 'Aşırı',
    'aqiLabel.good': 'İyi',
    'aqiLabel.moderate': 'Orta',
    'aqiLabel.unhealthySens': 'Hassaslara sağlıksız',
    'aqiLabel.unhealthy': 'Sağlıksız',
    'aqiLabel.veryUnhealthy': 'Çok sağlıksız',
    'aqiLabel.hazardous': 'Tehlikeli',
    'moon.new': 'Yeni ay',
    'moon.waxingCrescent': 'Büyüyen hilal',
    'moon.firstQuarter': 'İlk dördün',
    'moon.waxingGibbous': 'Büyüyen ay',
    'moon.full': 'Dolunay',
    'moon.waningGibbous': 'Azalan ay',
    'moon.lastQuarter': 'Son dördün',
    'moon.waningCrescent': 'Azalan hilal',
    'windDir.N': 'K',   'windDir.NE': 'KD', 'windDir.E': 'D',  'windDir.SE': 'GD',
    'windDir.S': 'G',   'windDir.SW': 'GB', 'windDir.W': 'B',  'windDir.NW': 'KB',
    'windDirFull.N': 'Kuzey', 'windDirFull.NE': 'Kuzeydoğu', 'windDirFull.E': 'Doğu', 'windDirFull.SE': 'Güneydoğu',
    'windDirFull.S': 'Güney', 'windDirFull.SW': 'Güneybatı', 'windDirFull.W': 'Batı', 'windDirFull.NW': 'Kuzeybatı',
    'day.tap': 'detaylar',
    'day.today': 'Bugün',
    'day.short.mon': 'Pzt', 'day.short.tue': 'Sal', 'day.short.wed': 'Çar', 'day.short.thu': 'Per',
    'day.short.fri': 'Cum', 'day.short.sat': 'Cmt', 'day.short.sun': 'Paz',
    'day.full.mon': 'Pazartesi', 'day.full.tue': 'Salı', 'day.full.wed': 'Çarşamba', 'day.full.thu': 'Perşembe',
    'day.full.fri': 'Cuma', 'day.full.sat': 'Cumartesi', 'day.full.sun': 'Pazar',
    'month.1': 'Ocak', 'month.2': 'Şubat', 'month.3': 'Mart', 'month.4': 'Nisan',
    'month.5': 'Mayıs', 'month.6': 'Haziran', 'month.7': 'Temmuz', 'month.8': 'Ağustos',
    'month.9': 'Eylül', 'month.10': 'Ekim', 'month.11': 'Kasım', 'month.12': 'Aralık'
  },
  el: {
    'html.lang': 'el',
    'header.changeCity': 'Αλλαγή πόλης',
    'header.editHint': 'Κάντε κλικ για αλλαγή',
    'header.sourceLabel': 'Πηγή δεδομένων',
    'header.sourceShort': 'Πηγή',
    'hero.label': 'Τώρα',
    'hero.feels': 'Αισθητή {feels}',
    'hero.feelsBeforeSunrise': 'Αισθητή {feels} · Ανατολή στις {sunrise}',
    'hero.feelsBeforeSunset':  'Αισθητή {feels} · Δύση στις {sunset}',
    'hero.feelsAfterSunset':   'Αισθητή {feels} · Δύση ήταν στις {sunset}',
    'hero.sourceNote': 'Πηγή: {name}',
    'hero.sourceAvg': 'μέσος όρος 8 μοντέλων',
    'metric.temp': 'Θερμοκρασία',
    'metric.feels': 'Αισθητή',
    'metric.wind': 'Άνεμος',
    'metric.rain': 'Βροχόπτωση',
    'metric.pressure': 'Πίεση',
    'metric.humidity': 'Υγρασία',
    'metric.dewpoint': 'Σημείο δρόσου',
    'metric.uv': 'Δείκτης UV',
    'metric.visibility': 'Ορατότητα',
    'metric.solar': 'Ηλιακή ακτινοβολία',
    'metric.windSub': '{dir} · ριπές {gust}',
    'metric.rainSub': '~{mm} mm · {desc}',
    'metric.rain.none': 'χωρίς βροχόπτωση',
    'metric.rain.light': 'ελαφρά βροχή',
    'metric.rain.moderate': 'μέτρια βροχή',
    'metric.rain.heavy': 'δυνατή βροχή',
    'metric.pressure.falling': 'Πέφτει ↓',
    'metric.pressure.rising': 'Ανεβαίνει ↑',
    'metric.pressure.stable': 'Σταθερή',
    'metric.humidity.dewPoint': 'Σημείο δρόσου {t}',
    'astro.sun': 'Ήλιος',
    'astro.sunrise': 'Ανατολή',
    'astro.sunset': 'Δύση',
    'astro.uv': 'Δείκτης UV',
    'astro.aqi': 'Ποιότητα αέρα',
    'astro.dayLen': '{h}ώ {m}λ',
    'astro.photoTitle': 'Για φωτογράφους και αστρονόμους',
    'astro.photoSub': 'Χρυσή / γαλάζια ώρα, ποιότητα ηλιοβασιλέματος, ορατότητα αστεριών',
    'astro.goldenHour': 'Χρυσή ώρα',
    'astro.blueHour': 'Γαλάζια ώρα',
    'astro.morning': 'Το πρωί',
    'astro.evening': 'Το βράδυ',
    'astro.sunsetQuality': 'Ηλιοβασίλεμα σήμερα',
    'astro.sunset.dramatic': 'Εντυπωσιακό',
    'astro.sunset.normal': 'Κανονικό',
    'astro.sunset.dull': 'Θαμπό',
    'astro.sunset.cloudHint': 'νέφη {cl}%',
    'astro.stars': 'Ορατότητα αστεριών',
    'astro.stars.excellent': 'Εξαιρετική',
    'astro.stars.good': 'Καλή',
    'astro.stars.moderate': 'Μέτρια',
    'astro.stars.poor': 'Φτωχή',
    'astro.stars.veryPoor': 'Πολύ φτωχή',
    'astro.stars.hint': 'νέφη {cl}% · σελήνη {moon}%',
    'chart.title': 'Σήμερα · ωριαία πρόγνωση',
    'chart.sub.avg': 'Μέσος όρος 8 μοντέλων',
    'chart.sub.named': 'Πρόγνωση από {name}',
    'precip.title': 'Βροχόπτωση',
    'precip.sub': 'Πρόγνωση mm/ώρα για τις επόμενες 48 ώρες',
    'precip.tomorrow': 'αύριο',
    'precip.legend': 'mm/ώ',
    'hdm.title': 'Ωριαία',
    'precipDetail.title': 'Λεπτομέρειες βροχόπτωσης',
    'metric.rain.tapHint': 'Πατήστε για γράφημα, κίνδυνο καταιγίδας και ραντάρ',
    'metric.wind.tapHint': 'Πατήστε για ωριαίο γράφημα ανέμου',
    'metric.pressure.tapHint': 'Πατήστε για ωριαίο γράφημα πίεσης',
    'metric.humidity.tapHint': 'Πατήστε για ωριαίο γράφημα υγρασίας',
    'radar.title': 'Ραντάρ βροχόπτωσης',
    'radar.sub': 'Ζωντανή βροχόπτωση των τελευταίων 2 ωρών + πρόγνωση ECMWF για τις επόμενες 72 ώρες',
    'radar.loading': 'Φόρτωση πλακιδίων ραντάρ…',
    'radar.error': 'Αποτυχία φόρτωσης δεδομένων ραντάρ',
    'radar.empty': 'Δεν υπάρχουν δεδομένα ραντάρ για αυτή την περιοχή',
    'radar.now': 'τώρα',
    'radar.forecast': 'πρόγνωση',
    'radar.tabLive': 'Ραντάρ · 2ώ',
    'radar.tabForecast': 'Πρόγνωση · 72ώ',
    'radar.windyHint': 'Παρέχεται από το widget Windy.com με το μοντέλο ECMWF',
    'search.chip': 'Εύρεση παραθύρου',
    'search.aria': 'Εύρεση παραθύρου καιρού',
    'search.label': 'Αντίστροφη αναζήτηση',
    'search.title': 'Πότε θα έρθει ο κατάλληλος καιρός;',
    'search.sub': 'Περίγραψε τη συνθήκη — θα βρούμε το πλησιέστερο παράθυρο στην πρόγνωση 10 ημερών',
    'search.placeholder': 'π.χ. χωρίς βροχή 6 ώρες, ζεστός πάνω από +20, καθαρό πρωί',
    'search.button': 'Εύρεση',
    'search.popularTitle': 'Δημοφιλείς αναζητήσεις',
    'search.empty.title': 'Δεν υπάρχει τέτοιο παράθυρο στις επόμενες 10 ημέρες',
    'search.empty.hint': 'Δοκίμασε άλλη συνθήκη από τις προτάσεις',
    'search.empty.closest': 'Πλησιέστερο: {when}',
    'search.error.parse': 'Δεν μπόρεσα να ερμηνεύσω το ερώτημα. Δοκίμασε ένα παράδειγμα από τις προτάσεις.',
    'search.results.found': 'Βρέθηκαν {n} {label}',
    'search.results.label.one': 'παράθυρο',
    'search.results.label.few': 'παράθυρα',
    'search.results.label.many': 'παράθυρα',
    'search.duration.hours': '{n}ώ',
    'search.tempRange': '{lo}…{hi}',
    'search.wind': 'άνεμος {v} {unit}',
    'search.day.today': 'Σήμερα',
    'search.day.tomorrow': 'Αύριο',
    'search.preset.norain': 'χωρίς βροχή ≥6ώ',
    'search.preset.warm': 'ζεστός πάνω από +20',
    'search.preset.clear': 'καθαρός ουρανός',
    'search.preset.calm': 'άπνοια',
    'search.preset.run': 'καλός για τρέξιμο',
    'search.preset.bbq': 'καιρός για ψησταριά',
    'search.preset.carwash': 'πλύσιμο αυτοκινήτου',
    'search.preset.storm': 'πότε καταιγίδα',
    'fav.add': '+ Προσθήκη πόλης',
    'fav.addToFav': 'Στα αγαπημένα',
    'fav.removeFromFav': 'Αφαίρεση από τα αγαπημένα',
    'city.section.favorites': 'Αγαπημένα',
    'city.section.ua': 'Ουκρανικές πόλεις',
    'city.section.world': 'Πόλεις του κόσμου',
    'city.section.searchResults': 'Αποτελέσματα αναζήτησης',
    'chart.legendTemp': 'Θερμοκρασία',
    'chart.legendPrecip': 'Βροχόπτωση',
    'sources.title': 'Πηγή πρόγνωσης',
    'sources.sub': 'Επίλεξε πηγή ή χρησιμοποίησε τον μέσο όρο 8 μοντέλων',
    'sources.avgTitle': 'Μέσος όρος όλων των υπηρεσιών',
    'sources.avgSub': 'Συνάθροιση 8 μοντέλων · πρόγνωση συνόλου',
    'sources.confHint': 'Χρωματιστή μπάρα κάτω από την κάρτα ημέρας — συμφωνία 8 μοντέλων:',
    'sources.confLegend.high': 'αξιόπιστα',
    'sources.confLegend.mid': 'μέτρια',
    'sources.confLegend.low': 'ασταθή',
    'sources.confLegend.veryLow': 'μεγάλη διασπορά',
    'alert.heat.title': 'Έντονη ζέστη ({t}°)',
    'alert.heat.msg': 'Πίνε νερό κάθε ώρα, απόφυγε τον ήλιο από τις 11 έως τις 16. Ελαφρά ρούχα, καπέλο',
    'alert.extremeHeat.title': 'Ακραία ζέστη ({t}°)',
    'alert.extremeHeat.msg': 'Κίνδυνος για την υγεία. Περιόρισε τις υπαίθριες δραστηριότητες, κίνδυνος θερμοπληξίας',
    'alert.cold.title': 'Έντονος παγετός ({t}°)',
    'alert.cold.msg': 'Ντύσου ζεστά, κάλυψε το πρόσωπο και τα χέρια. Απόφυγε μακρινούς περιπάτους',
    'alert.extremeCold.title': 'Ακραίος παγετός ({t}°)',
    'alert.extremeCold.msg': 'Κίνδυνος κρυοπαγημάτων σε 10–20 λεπτά. Μείνε μέσα εκτός αν είναι απαραίτητο',
    'pullRefresh.pull': 'Τράβα κάτω για ανανέωση',
    'pullRefresh.ready': 'Άφησε για ανανέωση',
    'pullRefresh.refreshing': 'Ανανέωση...',
    'compare.chip': 'Σύγκριση',
    'compare.chipAria': 'Σύγκριση καιρού με άλλη πόλη',
    'compare.bannerLabel': 'Σύγκριση',
    'compare.exitAria': 'Έξοδος από λειτουργία σύγκρισης',
    'compare.pickLabel': 'Σύγκριση με',
    'compare.pickTitle': 'Επίλεξε δεύτερη πόλη',
    'compare.pickHint': 'Αγαπημένα ή παγκόσμια αναζήτηση',
    'compare.hourlyTitle': 'Ωριαία θερμοκρασία · σήμερα',
    'compare.daysTitle': '7 ημέρες',
    'compare.summary.same': 'Σήμερα παρόμοιος καιρός και στις δύο πόλεις',
    'compare.summary.warmerA': 'Στη/Στην {a} σήμερα θερμότερα κατά {d}°',
    'compare.summary.warmerB': 'Στη/Στην {b} σήμερα θερμότερα κατά {d}°',
    'compare.summary.drierA': '{a} είναι ξηρότερη, βροχόπτωση {pa}% vs {pb}%',
    'compare.summary.drierB': '{b} είναι ξηρότερη, βροχόπτωση {pb}% vs {pa}%',
    'compare.loading': 'Φόρτωση καιρού για {city}…',
    'compare.error': 'Αποτυχία φόρτωσης καιρού για {city}',
    'compare.swapA': 'Αλλαγή πρώτης πόλης',
    'compare.swapB': 'Αλλαγή δεύτερης πόλης',
    'sources.avgShort': 'Μέσος όρος 8 μοντέλων',
    'sources.dividerOr': 'ή συγκεκριμένη πηγή',
    'confidence.label': 'Συμφωνία μοντέλων',
    'confidence.high': 'υψηλή',
    'confidence.mid': 'μέτρια',
    'confidence.low': 'χαμηλή',
    'confidence.veryLow': 'φτωχή',
    'confidence.tooltip': '{n} μοντέλα · διασπορά ±{range}°C στη σημερινή μέγιστη θερμοκρασία',
    'chart.spreadLabel': 'Διασπορά μεταξύ 8 μοντέλων',
    'windows.title': 'Παράθυρα δραστηριοτήτων',
    'windows.sub': 'Καλύτερη ώρα για καθημερινές εργασίες τις επόμενες 5 ημέρες',
    'windows.preset.jogging': 'Τζόγκινγκ',
    'windows.preset.kids': 'Βόλτα με παιδί',
    'windows.preset.bbq': 'Ψησταριά / έξω',
    'windows.preset.laundry': 'Στέγνωμα ρούχων έξω',
    'windows.preset.carwash': 'Πλύσιμο αυτοκινήτου',
    'windows.preset.watering': 'Πότισμα φυτών',
    'windows.today': 'Σήμερα',
    'windows.tomorrow': 'Αύριο',
    'windows.range': '{day} {start}–{end}',
    'windows.crossDay': '{startDay} {start} — {endDay} {end}',
    'windows.duration': 'διάρκεια {h}ώ',
    'windows.noWindow': 'Δεν υπάρχει κατάλληλο παράθυρο τις επόμενες 5 ημέρες',
    'windows.carwash.dry': 'Στεγνά {h}ώ συνεχόμενες',
    'windows.carwash.notRec': 'Δεν συνιστάται · αναμένεται βροχή',
    'climate.title': 'Κλιματικό πλαίσιο',
    'climate.sub': 'Σήμερα vs 5ετής μέσος όρος για αυτή την ημερομηνία',
    'climate.tempLabel': 'Ημερήσιο μέγιστο',
    'climate.minLabel': 'Νυχτερινό ελάχιστο',
    'climate.precipLabel': 'Βροχόπτωση σε 5 ημέρες',
    'climate.norm': 'κανονικά {v}',
    'climate.warmer': '+{v}° θερμότερα',
    'climate.colder': '−{v}° ψυχρότερα',
    'climate.aboutNorm': 'περίπου κανονικά',
    'climate.wetter': '+{v}% πιο υγρά',
    'climate.drier': '−{v}% πιο ξηρά',
    'climate.sparkTitle': 'Αυτή την ημερομηνία τα προηγούμενα χρόνια',
    'climate.sparkEmpty': 'Δεδομένα αρχείου μη διαθέσιμα',
    'climate.loading': 'Φόρτωση ιστορικού...',
    'pollen.title': 'Γύρη σήμερα',
    'pollen.sub': 'Συγκέντρωση αλλεργιογόνων στον αέρα (κόκκοι/m³)',
    'pollen.alder': 'Σκλήθρο',
    'pollen.birch': 'Σημύδα',
    'pollen.grass': 'Αγρωστώδη',
    'pollen.mugwort': 'Αρτεμισία',
    'pollen.olive': 'Ελιά',
    'pollen.ragweed': 'Αμβροσία',
    'pollen.level.none': 'Δεν ανιχνεύτηκε',
    'pollen.level.low': 'Χαμηλή',
    'pollen.level.mid': 'Μέτρια',
    'pollen.level.high': 'Υψηλή',
    'pollen.level.veryHigh': 'Πολύ υψηλή',
    'storm.title': 'Παρακολούθηση καταιγίδων',
    'storm.sub': 'Ωριαίος κίνδυνος καταιγίδας για τις επόμενες 48 ώρες',
    'storm.noStorm': 'Δεν αναμένονται καταιγίδες τις επόμενες 48 ώρες',
    'storm.upcoming': 'Καταιγίδα σε {hours}ώ',
    'storm.now': 'Καταιγίδα τώρα',
    'storm.risk0': 'χωρίς κίνδυνο',
    'storm.risk1': 'χαμηλός',
    'storm.risk2': 'μέτριος',
    'storm.risk3': 'υψηλός',
    'storm.risk4': 'επικίνδυνος',
    'storm.desc1': 'πιθανές μακρινές βροντές, χωρίς βροχή',
    'storm.desc2': 'τοπικές καταιγίδες με βροχή',
    'storm.desc3': 'δυνατή βροχή με βροντές, ριπές',
    'storm.desc4': 'σφοδρές καταιγίδες, κίνδυνος χαλαζιού και ριπών',
    'storm.axisNow': 'τώρα',
    'storm.alertSoon': 'Καταιγίδα αναμένεται μέσα στις επόμενες {hours}ώ',
    'storm.alertNow': 'Καταιγίδα σε εξέλιξη τώρα',
    'accuracy.title': 'Ακρίβεια πηγών',
    'accuracy.subEmpty': 'Συλλογή δεδομένων πρόγνωση-vs-πραγματικό για την τοποθεσία σου',
    'accuracy.subData': 'Μέσο απόλυτο σφάλμα στις τελευταίες {n} συγκρίσεις',
    'accuracy.groundTruth': 'με πραγματικές παρατηρήσεις',
    'accuracy.colTempMax': 'T-μέγ.',
    'accuracy.colTempMin': 'T-ελάχ.',
    'accuracy.leaderTempMax': 'T ημέρας:',
    'accuracy.leaderTempMin': 'T νύχτας:',
    'accuracy.leaderPrecip': 'βροχ.:',
    'accuracy.leaderAvgAll': 'Ο μέσος όρος ξεπερνά κάθε μεμονωμένο μοντέλο σε όλες τις μετρήσεις',
    'accuracy.leaderBestAll': 'είναι ο πιο ακριβής σε όλες τις μετρήσεις',
    'nowcast.now.until.rain':         'Βροχή τώρα · μέχρι ~{time}',
    'nowcast.now.until.drizzle':      'Ψιλόβροχο τώρα · μέχρι ~{time}',
    'nowcast.now.until.snow':         'Χιόνι τώρα · μέχρι ~{time}',
    'nowcast.now.until.sleet':        'Χιονόνερο · μέχρι ~{time}',
    'nowcast.now.until.freezing':     'Παγωμένη βροχή · μέχρι ~{time}',
    'nowcast.now.until.storm':        'Καταιγίδα τώρα · μέχρι ~{time}',
    'nowcast.now.continues.rain':     'Βροχή τώρα · 2ώ+ συνεχόμενη',
    'nowcast.now.continues.drizzle':  'Ψιλόβροχο · 2ώ+ συνεχόμενο',
    'nowcast.now.continues.snow':     'Χιόνι τώρα · 2ώ+ συνεχόμενο',
    'nowcast.now.continues.sleet':    'Χιονόνερο · 2ώ+ συνεχόμενο',
    'nowcast.now.continues.freezing': 'Παγωμένη βροχή · 2ώ+ συνεχόμενη',
    'nowcast.now.continues.storm':    'Καταιγίδα · 2ώ+ συνεχόμενη',
    'nowcast.soon.rain':              'Βροχή σε ~{min} λεπτά',
    'nowcast.soon.drizzle':           'Ψιλόβροχο σε ~{min} λεπτά',
    'nowcast.soon.snow':              'Χιόνι σε ~{min} λεπτά',
    'nowcast.soon.sleet':             'Χιονόνερο σε ~{min} λεπτά',
    'nowcast.soon.freezing':          'Παγωμένη βροχή σε ~{min} λεπτά',
    'nowcast.soon.storm':             'Καταιγίδα σε ~{min} λεπτά',
    'nowcast.dry':                    'Στεγνά τις επόμενες 2 ώρες',
    'accuracy.emptyTitle': 'Συλλογή δεδομένων',
    'accuracy.emptyHint': 'Άνοιξε τον ιστότοπο μία φορά την ημέρα — σε περίπου μία εβδομάδα θα δεις κατάταξη μοντέλων με MAE για θερμοκρασία και βροχόπτωση ειδικά για αυτή την τοποθεσία',
    'accuracy.samplesUnit': 'δείγματα',
    'accuracy.colModel': 'Μοντέλο',
    'accuracy.colScore': 'Συνολική ακρίβεια',
    'accuracy.colTemp': '°C',
    'accuracy.colPrecip': '%βροχ.',
    'accuracy.legendQ1': 'άριστο',
    'accuracy.legendQ2': 'καλό',
    'accuracy.legendQ3': 'αποδεκτό',
    'accuracy.legendQ4': 'φτωχό',
    'accuracy.legendAvgWin': 'το καλύτερο όλων',
    'accuracy.bestBadge': 'Πιο ακριβές μοντέλο σύμφωνα με τα πρόσφατα δείγματα',
    'footer.refresh': 'Ανανέωση',
    'footer.speak': 'Ανάγνωση',
    'footer.speakStop': 'Στοπ',
    'footer.speakAria': 'Ανάγνωση πρόγνωσης καιρού δυνατά',
    'settings.voice.label': 'Φωνή',
    'settings.voice.female': 'γυναικεία',
    'settings.voice.male': 'ανδρική',
    'settings.voice.none': 'Φωνή μη διαθέσιμη σε αυτή τη συσκευή',
    'settings.voice.preview': 'Προεπισκόπηση',
    'settings.voice.previewText': 'Γεια! Θα διαβάσω την πρόγνωση καιρού.',
    'settings.voice.rate.label': 'Ταχύτητα',
    'settings.voice.rate.slow': 'αργή',
    'settings.voice.rate.normal': 'κανονική',
    'settings.voice.rate.fast': 'γρήγορη',
    'footer.updated': 'ενημερώθηκε στις {time}',
    'modal.closeAria': 'Κλείσιμο',
    'modal.day.forecast': 'Πρόγνωση',
    'modal.day.today': 'Σήμερα',
    'modal.day.dayLen': 'Διάρκεια ημέρας: {len}',
    'modal.day.uvScale': 'Κλίμακα 0-11+',
    'modal.day.pm25norm': 'PM2.5 κανονικό',
    'modal.day.hourlyTitle': 'Ωριαία θερμοκρασία και βροχόπτωση',
    'modal.day.hoursTitle': 'Ώρα προς ώρα',
    'city.label': 'Τοποθεσία',
    'city.title': 'Πού να ελέγξουμε τον καιρό;',
    'city.useMyLocation': 'Χρήση της τοποθεσίας μου',
    'city.geoDesc': 'Ο browser θα ζητήσει άδεια. Οι συντεταγμένες παραμένουν στον browser σου',
    'city.search.placeholder': 'Αναζήτηση πόλης στην Ουκρανία...',
    'city.search.clearAria': 'Καθαρισμός',
    'city.list.popular': 'Δημοφιλείς ουκρανικές πόλεις',
    'city.list.foundLocal': 'Βρέθηκε στις δημοφιλείς',
    'city.list.searching': 'Αναζήτηση...',
    'city.list.found': 'Βρέθηκαν: {n}',
    'city.list.notFound': 'Τίποτα δεν βρέθηκε',
    'city.list.empty': 'Η πόλη δεν βρέθηκε. Δοκίμασε άλλο όνομα.',
    'city.list.emptyForQuery': 'Η πόλη „{q}" δεν βρέθηκε στη βάση Open-Meteo Ουκρανία.',
    'city.list.searchError': 'Η αναζήτηση απέτυχε. Έλεγξε τη σύνδεση στο διαδίκτυο.',
    'city.list.minChars': 'Εισήγαγε τουλάχιστον 2 χαρακτήρες',
    'city.list.aria': 'Λίστα πόλεων',
    'city.tag.geo': '📍 με γεωεντοπισμό',
    'city.tag.manual': '✋ επιλεγμένη',
    'city.geoErr.denied': 'Άρνηση πρόσβασης στην τοποθεσία. Επίτρεψέ την στις ρυθμίσεις του browser.',
    'city.geoErr.unavailable': 'Θέση μη διαθέσιμη (χωρίς σήμα GPS/δικτύου)',
    'city.geoErr.timeout': 'Λήξη χρόνου αιτήματος',
    'city.geoErr.notSupported': 'Ο browser δεν υποστηρίζει γεωεντοπισμό',
    'city.geoErr.generic': 'Σφάλμα γεωεντοπισμού',
    'loader.fetching': 'Φόρτωση πρόγνωσης...',
    'loader.refreshing': 'Ανανέωση...',
    'apiErr.title': 'Αποτυχία φόρτωσης πρόγνωσης',
    'apiErr.msg': 'Εμφανίζονται δεδομένα demo. Έλεγξε τη σύνδεση και προσπάθησε ξανά.',
    'apiErr.retry': 'Δοκιμή ξανά',
    'apiErr.cors': 'Η υπηρεσία καιρού δεν είναι προσβάσιμη (CORS / δίκτυο)',
    'apiErr.timeout': 'Λήξη χρόνου απόκρισης Open-Meteo',
    'apiErr.http': 'Σφάλμα απόκρισης διακομιστή ({code})',
    'apiErr.parse': 'Αποτυχία ανάλυσης απόκρισης Open-Meteo',
    'settings.aria': 'Ρυθμίσεις',
    'settings.label': 'Ρυθμίσεις',
    'settings.title': 'Ρυθμίσεις',
    'settings.theme.title': 'Εμφάνιση',
    'settings.theme.dark.unit': '🌙',
    'settings.theme.dark.full': 'Σκούρο',
    'settings.theme.light.unit': '☀️',
    'settings.theme.light.full': 'Φωτεινό',
    'settings.theme.system.unit': '🖥',
    'settings.theme.system.full': 'Σύστημα',
    'settings.lang.title': 'Γλώσσα διεπαφής',
    'settings.temp.title': 'Θερμοκρασία',
    'settings.temp.c': 'Κελσίου',
    'settings.temp.f': 'Φαρενάιτ',
    'settings.wind.title': 'Ταχύτητα ανέμου',
    'settings.wind.ms.unit': 'm/s',
    'settings.wind.ms.full': 'μέτρα/δευτ.',
    'settings.wind.kmh.unit': 'km/ώ',
    'settings.wind.kmh.full': 'χιλιόμετρα/ώρα',
    'settings.wind.mph.full': 'μίλια/ώρα',
    'settings.wind.kn.unit': 'kn',
    'settings.wind.kn.full': 'κόμβοι',
    'settings.pressure.title': 'Ατμοσφαιρική πίεση',
    'settings.pressure.mmhg.unit': 'mmHg',
    'settings.pressure.mmhg.full': 'χιλιοστά Hg',
    'settings.pressure.hpa.unit': 'hPa',
    'settings.pressure.hpa.full': 'εκτοπασκάλ',
    'settings.pressure.inhg.full': 'ίντσες Hg',
    'cond.clear': 'Αίθριος',
    'cond.partlyCloudy': 'Μερικώς νεφελώδης',
    'cond.cloudy': 'Νεφελώδης',
    'cond.overcast': 'Συννεφιασμένος',
    'cond.rain': 'Βροχή',
    'cond.heavyRain': 'Δυνατή βροχή',
    'cond.thunderstorm': 'Καταιγίδα',
    'cond.snow': 'Χιόνι',
    'cond.fog': 'Ομίχλη',
    'cond.partlyCloudyWithClear': 'Νεφώσεις με διαλείμματα',
    'condDesc.day0': 'Μέτωπο ΒΔ, περιστασιακό ψιλόβροχο',
    'condDesc.day1': 'Ενεργός κυκλώνας, έντονη βροχόπτωση το απόγευμα',
    'condDesc.day2': 'Ο κυκλώνας απομακρύνεται, υπολειμματική νέφωση',
    'condDesc.day3': 'Αντικυκλώνας, ηλιόλουστη ημέρα',
    'condDesc.day4': 'Ελαφρύς άνεμος, μεταβλητή νέφωση',
    'condDesc.clear': 'Αίθρια ηλιόλουστη ημέρα',
    'condDesc.clearWindy': 'Αίθριος και θυελλώδης',
    'condDesc.partlyCloudy': 'Μερικώς νεφελώδης',
    'condDesc.cloudy': 'Κυρίως νεφελώδης',
    'condDesc.overcast': 'Συννεφιασμένος όλη την ημέρα',
    'condDesc.fog': 'Ομιχλώδης, κακή ορατότητα',
    'condDesc.rainLight': 'Πιθανή ελαφρά βροχόπτωση',
    'condDesc.rain': 'Βροχή, μερικές φορές έντονη',
    'condDesc.heavyRain': 'Δυνατές καταιγίδες, αναμένεται σημαντική βροχόπτωση',
    'condDesc.snow': 'Χιονόπτωση',
    'condDesc.thunderstorm': 'Πιθανή καταιγίδα με κεραυνούς',
    'condDesc.windAddition': ', ισχυρός {dir} άνεμος',
    'uvLabel.low': 'Χαμηλός',
    'uvLabel.moderate': 'Μέτριος',
    'uvLabel.high': 'Υψηλός',
    'uvLabel.veryHigh': 'Πολύ υψηλός',
    'uvLabel.extreme': 'Ακραίος',
    'aqiLabel.good': 'Καλή',
    'aqiLabel.moderate': 'Μέτρια',
    'aqiLabel.unhealthySens': 'Ανθυγιεινή για ευαίσθητους',
    'aqiLabel.unhealthy': 'Ανθυγιεινή',
    'aqiLabel.veryUnhealthy': 'Πολύ ανθυγιεινή',
    'aqiLabel.hazardous': 'Επικίνδυνη',
    'moon.new': 'Νέα Σελήνη',
    'moon.waxingCrescent': 'Αυξανόμενος μηνίσκος',
    'moon.firstQuarter': 'Πρώτο τέταρτο',
    'moon.waxingGibbous': 'Αυξανόμενη',
    'moon.full': 'Πανσέληνος',
    'moon.waningGibbous': 'Φθίνουσα',
    'moon.lastQuarter': 'Τελευταίο τέταρτο',
    'moon.waningCrescent': 'Φθίνων μηνίσκος',
    'windDir.N': 'Β',   'windDir.NE': 'ΒΑ', 'windDir.E': 'Α',  'windDir.SE': 'ΝΑ',
    'windDir.S': 'Ν',   'windDir.SW': 'ΝΔ', 'windDir.W': 'Δ',  'windDir.NW': 'ΒΔ',
    'windDirFull.N': 'Βόρειος', 'windDirFull.NE': 'Βορειοανατολικός', 'windDirFull.E': 'Ανατολικός', 'windDirFull.SE': 'Νοτιοανατολικός',
    'windDirFull.S': 'Νότιος',  'windDirFull.SW': 'Νοτιοδυτικός',     'windDirFull.W': 'Δυτικός',    'windDirFull.NW': 'Βορειοδυτικός',
    'day.tap': 'λεπτομέρειες',
    'day.today': 'Σήμερα',
    'day.short.mon': 'Δευ', 'day.short.tue': 'Τρι', 'day.short.wed': 'Τετ', 'day.short.thu': 'Πεμ',
    'day.short.fri': 'Παρ', 'day.short.sat': 'Σαβ', 'day.short.sun': 'Κυρ',
    'day.full.mon': 'Δευτέρα', 'day.full.tue': 'Τρίτη', 'day.full.wed': 'Τετάρτη', 'day.full.thu': 'Πέμπτη',
    'day.full.fri': 'Παρασκευή', 'day.full.sat': 'Σάββατο', 'day.full.sun': 'Κυριακή',
    'month.1': 'Ιανουαρίου', 'month.2': 'Φεβρουαρίου', 'month.3': 'Μαρτίου', 'month.4': 'Απριλίου',
    'month.5': 'Μαΐου', 'month.6': 'Ιουνίου', 'month.7': 'Ιουλίου', 'month.8': 'Αυγούστου',
    'month.9': 'Σεπτεμβρίου', 'month.10': 'Οκτωβρίου', 'month.11': 'Νοεμβρίου', 'month.12': 'Δεκεμβρίου'
  }
};

// I18N extension — добавочные ключи, которые понадобились позже.
// Хранятся плоско { key: { lang: text } }, мерджатся в I18N одной итерацией.
// Так избегаем 16 отдельных Edit'ов в основные блоки.
const I18N_EXTRA = {
  'alert.botUnreachable': {
    ru: 'Не удалось связаться с ботом. Попробуй позже.',
    uk: 'Не вдалося зв\'язатися з ботом. Спробуй пізніше.',
    en: 'Could not reach the bot. Try again later.',
    de: 'Konnte den Bot nicht erreichen. Versuche es später erneut.',
    pl: 'Nie udało się połączyć z botem. Spróbuj później.',
    cs: 'Nepodařilo se spojit s botem. Zkus to později.',
    fr: 'Impossible de joindre le bot. Réessaie plus tard.',
    it: 'Impossibile contattare il bot. Riprova più tardi.',
    es: 'No se pudo contactar al bot. Inténtalo más tarde.',
    ro: 'Nu am putut contacta botul. Încearcă mai târziu.',
    hu: 'Nem sikerült elérni a botot. Próbáld újra később.',
    sk: 'Nepodarilo sa spojiť s botom. Skús to neskôr.',
    pt: 'Não foi possível contactar o bot. Tenta mais tarde.',
    nl: 'Kon de bot niet bereiken. Probeer het later opnieuw.',
    tr: 'Bot ile bağlantı kurulamadı. Daha sonra tekrar dene.',
    el: 'Δεν ήταν δυνατή η επικοινωνία με το bot. Δοκίμασε αργότερα.'
  },
  'alert.codeExpired': {
    ru: 'Код истёк или не найден',
    uk: 'Код вичерпався або не знайдено',
    en: 'Code expired or not found',
    de: 'Code abgelaufen oder nicht gefunden',
    pl: 'Kod wygasł lub nie znaleziono',
    cs: 'Kód vypršel nebo nenalezen',
    fr: 'Code expiré ou introuvable',
    it: 'Codice scaduto o non trovato',
    es: 'Código caducado o no encontrado',
    ro: 'Cod expirat sau negăsit',
    hu: 'A kód lejárt vagy nem található',
    sk: 'Kód vypršal alebo sa nenašiel',
    pt: 'Código caducado ou não encontrado',
    nl: 'Code verlopen of niet gevonden',
    tr: 'Kodun süresi doldu veya bulunamadı',
    el: 'Ο κωδικός έληξε ή δεν βρέθηκε'
  },
  'confirm.unlinkTelegram': {
    ru: 'Отвязать сайт от бота? Подписка в Telegram останется.',
    uk: 'Відв\'язати сайт від бота? Підписка в Telegram залишиться.',
    en: 'Unlink the site from the bot? Your Telegram subscription will remain.',
    de: 'Website vom Bot trennen? Dein Telegram-Abo bleibt bestehen.',
    pl: 'Odłączyć stronę od bota? Subskrypcja w Telegramie pozostanie.',
    cs: 'Odpojit web od bota? Předplatné v Telegramu zůstane.',
    fr: 'Dissocier le site du bot ? Ton abonnement Telegram restera.',
    it: 'Scollegare il sito dal bot? Il tuo abbonamento Telegram rimarrà.',
    es: 'Desvincular el sitio del bot? Tu suscripción de Telegram permanecerá.',
    ro: 'Deconectezi site-ul de la bot? Abonamentul Telegram rămâne.',
    hu: 'Leválasztod a webhelyet a botról? A Telegram-előfizetésed megmarad.',
    sk: 'Odpojiť web od bota? Predplatné v Telegrame zostane.',
    pt: 'Desvincular o site do bot? A subscrição no Telegram permanecerá.',
    nl: 'Site loskoppelen van bot? Je Telegram-abonnement blijft behouden.',
    tr: 'Site botu ile bağlantısı kesilsin mi? Telegram aboneliği kalır.',
    el: 'Αποσύνδεση του ιστοτόπου από το bot; Η συνδρομή Telegram θα παραμείνει.'
  },
  'notif.sourceLabel': {
    ru: 'Уведомления используют источник:',
    uk: 'Сповіщення використовують джерело:',
    en: 'Notifications use source:',
    de: 'Benachrichtigungen verwenden Quelle:',
    pl: 'Powiadomienia używają źródła:',
    cs: 'Upozornění používají zdroj:',
    fr: 'Les notifications utilisent la source :',
    it: 'Le notifiche usano la fonte:',
    es: 'Las notificaciones usan la fuente:',
    ro: 'Notificările folosesc sursa:',
    hu: 'Az értesítések forrása:',
    sk: 'Upozornenia používajú zdroj:',
    pt: 'As notificações usam a fonte:',
    nl: 'Meldingen gebruiken bron:',
    tr: 'Bildirimler kaynağı kullanıyor:',
    el: 'Οι ειδοποιήσεις χρησιμοποιούν την πηγή:'
  },
  'pollen.error': {
    ru: '⚠ Данные пыльцы не получены (возможно, блокирует расширение)',
    uk: '⚠ Дані про пилок не отримано (можливо, блокує розширення)',
    en: '⚠ Pollen data unavailable (an extension may be blocking it)',
    de: '⚠ Pollendaten nicht verfügbar (möglicherweise blockiert eine Erweiterung)',
    pl: '⚠ Brak danych o pyłku (być może blokuje rozszerzenie)',
    cs: '⚠ Data o pylu nedostupná (možná blokuje rozšíření)',
    fr: '⚠ Données polliniques indisponibles (une extension peut bloquer)',
    it: '⚠ Dati sui pollini non disponibili (forse bloccati da un\'estensione)',
    es: '⚠ Datos de polen no disponibles (puede que una extensión los bloquee)',
    ro: '⚠ Date despre polen indisponibile (poate o extensie blochează)',
    hu: '⚠ Pollenadatok nem érhetők el (esetleg egy bővítmény blokkolja)',
    sk: '⚠ Údaje o peli nedostupné (môže blokovať rozšírenie)',
    pt: '⚠ Dados de pólen indisponíveis (uma extensão pode estar a bloquear)',
    nl: '⚠ Pollendata niet beschikbaar (mogelijk geblokkeerd door een extensie)',
    tr: '⚠ Polen verileri alınamadı (bir uzantı engelliyor olabilir)',
    el: '⚠ Δεδομένα γύρης μη διαθέσιμα (ίσως τα μπλοκάρει επέκταση)'
  },
  'pollen.loading': {
    ru: '⏳ Загрузка...', uk: '⏳ Завантаження...', en: '⏳ Loading...',
    de: '⏳ Wird geladen...', pl: '⏳ Ładowanie...', cs: '⏳ Načítání...',
    fr: '⏳ Chargement...', it: '⏳ Caricamento...', es: '⏳ Cargando...',
    ro: '⏳ Se încarcă...', hu: '⏳ Betöltés...', sk: '⏳ Načítava sa...',
    pt: '⏳ A carregar...', nl: '⏳ Laden...', tr: '⏳ Yükleniyor...',
    el: '⏳ Φόρτωση...'
  },
  'common.done': {
    ru: 'Готово', uk: 'Готово', en: 'Done', de: 'Fertig', pl: 'Gotowe',
    cs: 'Hotovo', fr: 'Terminé', it: 'Fatto', es: 'Listo',
    ro: 'Gata', hu: 'Kész', sk: 'Hotovo', pt: 'Pronto',
    nl: 'Klaar', tr: 'Tamam', el: 'Έτοιμο'
  },
  'notif.saving': {
    ru: '⏳ Сохраняю...', uk: '⏳ Зберігаю...', en: '⏳ Saving...',
    de: '⏳ Speichert...', pl: '⏳ Zapisuję...', cs: '⏳ Ukládám...',
    fr: '⏳ Enregistrement...', it: '⏳ Salvataggio...', es: '⏳ Guardando...',
    ro: '⏳ Se salvează...', hu: '⏳ Mentés...', sk: '⏳ Ukladám...',
    pt: '⏳ A guardar...', nl: '⏳ Opslaan...', tr: '⏳ Kaydediliyor...',
    el: '⏳ Αποθήκευση...'
  },
  'notif.saved': {
    ru: '✅ Сохранено: {n} правил · источник: {src}',
    uk: '✅ Збережено: {n} правил · джерело: {src}',
    en: '✅ Saved: {n} rules · source: {src}',
    de: '✅ Gespeichert: {n} Regeln · Quelle: {src}',
    pl: '✅ Zapisano: {n} reguł · źródło: {src}',
    cs: '✅ Uloženo: {n} pravidel · zdroj: {src}',
    fr: '✅ Enregistré : {n} règles · source : {src}',
    it: '✅ Salvato: {n} regole · fonte: {src}',
    es: '✅ Guardado: {n} reglas · fuente: {src}',
    ro: '✅ Salvat: {n} reguli · sursă: {src}',
    hu: '✅ Mentve: {n} szabály · forrás: {src}',
    sk: '✅ Uložené: {n} pravidiel · zdroj: {src}',
    pt: '✅ Guardado: {n} regras · fonte: {src}',
    nl: '✅ Opgeslagen: {n} regels · bron: {src}',
    tr: '✅ Kaydedildi: {n} kural · kaynak: {src}',
    el: '✅ Αποθηκεύτηκαν: {n} κανόνες · πηγή: {src}'
  },
  'notif.saveError': {
    ru: '❌ Ошибка: {msg}', uk: '❌ Помилка: {msg}', en: '❌ Error: {msg}',
    de: '❌ Fehler: {msg}', pl: '❌ Błąd: {msg}', cs: '❌ Chyba: {msg}',
    fr: '❌ Erreur : {msg}', it: '❌ Errore: {msg}', es: '❌ Error: {msg}',
    ro: '❌ Eroare: {msg}', hu: '❌ Hiba: {msg}', sk: '❌ Chyba: {msg}',
    pt: '❌ Erro: {msg}', nl: '❌ Fout: {msg}', tr: '❌ Hata: {msg}',
    el: '❌ Σφάλμα: {msg}'
  },
  'accuracy.openAria': {
    ru: 'Открыть рейтинг точности', uk: 'Відкрити рейтинг точності', en: 'Open accuracy ranking',
    de: 'Genauigkeits-Rangliste öffnen', pl: 'Otwórz ranking dokładności', cs: 'Otevřít žebříček přesnosti',
    fr: 'Ouvrir le classement de précision', it: 'Apri classifica di precisione', es: 'Abrir ranking de precisión',
    ro: 'Deschide clasamentul de precizie', hu: 'Pontossági rangsor megnyitása', sk: 'Otvoriť rebríček presnosti',
    pt: 'Abrir ranking de precisão', nl: 'Nauwkeurigheidsranglijst openen', tr: 'Doğruluk sıralamasını aç',
    el: 'Άνοιγμα κατάταξης ακρίβειας'
  },
  'accuracy.openTitle': {
    ru: 'Нажмите чтобы открыть полный рейтинг моделей',
    uk: 'Натисніть, щоб відкрити повний рейтинг моделей',
    en: 'Click to open the full model ranking',
    de: 'Klicke, um die vollständige Modell-Rangliste zu öffnen',
    pl: 'Kliknij, aby otworzyć pełny ranking modeli',
    cs: 'Klikněte pro otevření kompletního žebříčku modelů',
    fr: 'Cliquez pour ouvrir le classement complet des modèles',
    it: 'Clicca per aprire la classifica completa dei modelli',
    es: 'Clic para abrir el ranking completo de modelos',
    ro: 'Click pentru a deschide clasamentul complet al modelelor',
    hu: 'Kattints a teljes modell-rangsor megnyitásához',
    sk: 'Kliknite pre otvorenie kompletného rebríčka modelov',
    pt: 'Clique para abrir o ranking completo dos modelos',
    nl: 'Klik om de volledige modelranglijst te openen',
    tr: 'Tam model sıralamasını açmak için tıkla',
    el: 'Κάντε κλικ για να ανοίξετε την πλήρη κατάταξη μοντέλων'
  },
  'unit.mm': {
    ru: 'мм', uk: 'мм', en: 'mm', de: 'mm', pl: 'mm', cs: 'mm',
    fr: 'mm', it: 'mm', es: 'mm', ro: 'mm', hu: 'mm', sk: 'mm',
    pt: 'mm', nl: 'mm', tr: 'mm', el: 'χλστ'
  },
  'unit.h': {
    ru: 'ч', uk: 'год', en: 'h', de: 'h', pl: 'h', cs: 'h',
    fr: 'h', it: 'h', es: 'h', ro: 'h', hu: 'ó', sk: 'h',
    pt: 'h', nl: 'u', tr: 'sa', el: 'ώ'
  },
  'page.title': {
    ru: 'Meteo Star · точный прогноз',
    uk: 'Meteo Star · точний прогноз',
    en: 'Meteo Star · accurate forecast',
    de: 'Meteo Star · genaue Wettervorhersage',
    pl: 'Meteo Star · dokładna prognoza',
    cs: 'Meteo Star · přesná předpověď',
    fr: 'Meteo Star · prévisions précises',
    it: 'Meteo Star · previsioni accurate',
    es: 'Meteo Star · pronóstico preciso',
    ro: 'Meteo Star · prognoză precisă',
    hu: 'Meteo Star · pontos előrejelzés',
    sk: 'Meteo Star · presná predpoveď',
    pt: 'Meteo Star · previsão precisa',
    nl: 'Meteo Star · nauwkeurige voorspelling',
    tr: 'Meteo Star · doğru tahmin',
    el: 'Meteo Star · ακριβής πρόγνωση'
  },
  'astro.moon': {
    ru: 'Луна', uk: 'Місяць', en: 'Moon', de: 'Mond', pl: 'Księżyc',
    cs: 'Měsíc', fr: 'Lune', it: 'Luna', es: 'Luna',
    ro: 'Lună', hu: 'Hold', sk: 'Mesiac',
    pt: 'Lua', nl: 'Maan', tr: 'Ay', el: 'Σελήνη'
  },
  'scroll.left': {
    ru: 'Прокрутить влево', uk: 'Прокрутити вліво', en: 'Scroll left',
    de: 'Nach links scrollen', pl: 'Przewiń w lewo', cs: 'Posunout doleva',
    fr: 'Faire défiler à gauche', it: 'Scorri a sinistra', es: 'Desplazar a la izquierda',
    ro: 'Derulează la stânga', hu: 'Görgetés balra', sk: 'Posunúť doľava',
    pt: 'Deslocar para a esquerda', nl: 'Naar links scrollen', tr: 'Sola kaydır',
    el: 'Κύλιση αριστερά'
  },
  'scroll.right': {
    ru: 'Прокрутить вправо', uk: 'Прокрутити вправо', en: 'Scroll right',
    de: 'Nach rechts scrollen', pl: 'Przewiń w prawo', cs: 'Posunout doprava',
    fr: 'Faire défiler à droite', it: 'Scorri a destra', es: 'Desplazar a la derecha',
    ro: 'Derulează la dreapta', hu: 'Görgetés jobbra', sk: 'Posunúť doprava',
    pt: 'Deslocar para a direita', nl: 'Naar rechts scrollen', tr: 'Sağa kaydır',
    el: 'Κύλιση δεξιά'
  },
  'modal.back': {
    ru: 'Назад', uk: 'Назад', en: 'Back', de: 'Zurück', pl: 'Wstecz',
    cs: 'Zpět', fr: 'Retour', it: 'Indietro', es: 'Atrás',
    ro: 'Înapoi', hu: 'Vissza', sk: 'Späť',
    pt: 'Voltar', nl: 'Terug', tr: 'Geri', el: 'Πίσω'
  },
  'unit.km': {
    ru: 'км', uk: 'км', en: 'km', de: 'km', pl: 'km', cs: 'km',
    fr: 'km', it: 'km', es: 'km', ro: 'km', hu: 'km', sk: 'km',
    pt: 'km', nl: 'km', tr: 'km', el: 'χλμ'
  },
  'unit.days': {
    ru: 'дн', uk: 'дн', en: 'd', de: 'T', pl: 'd', cs: 'd',
    fr: 'j', it: 'g', es: 'd', ro: 'z', hu: 'n', sk: 'd',
    pt: 'd', nl: 'd', tr: 'g', el: 'η'
  },
  // ===== Названия и описания правил (notifications) =====
  'rule.precipSoon.name': {
    ru: 'Осадки в ближайшие', uk: 'Опади найближчі', en: 'Precipitation in the next',
    de: 'Niederschlag in den nächsten', pl: 'Opady w ciągu', cs: 'Srážky v následujících',
    fr: 'Précipitations dans les', it: 'Precipitazioni nelle prossime', es: 'Precipitaciones en las próximas',
    ro: 'Precipitații în următoarele', hu: 'Csapadék a következő', sk: 'Zrážky v nasledujúcich',
    pt: 'Precipitação nas próximas', nl: 'Neerslag binnen', tr: 'Önümüzdeki', el: 'Βροχόπτωση τις επόμενες'
  },
  'rule.precipSoon.desc': {
    ru: 'Уведомить если в этот период ожидаются осадки',
    uk: 'Сповістити якщо в цей період очікуються опади',
    en: 'Notify if precipitation is expected in this period',
    de: 'Benachrichtigen, wenn in diesem Zeitraum Niederschlag erwartet wird',
    pl: 'Powiadom, jeśli w tym okresie spodziewane są opady',
    cs: 'Upozornit, pokud se v tomto období očekávají srážky',
    fr: 'Notifier si des précipitations sont prévues sur cette période',
    it: 'Notifica se sono previste precipitazioni in questo periodo',
    es: 'Notificar si se esperan precipitaciones en este período',
    ro: 'Notifică dacă sunt așteptate precipitații în această perioadă',
    hu: 'Értesítés, ha ebben az időszakban csapadék várható',
    sk: 'Upozorniť, ak sa v tomto období očakávajú zrážky',
    pt: 'Notificar se houver precipitação prevista neste período',
    nl: 'Melden als neerslag verwacht wordt in deze periode',
    tr: 'Bu süreçte yağış bekleniyorsa bildir',
    el: 'Ειδοποίηση αν αναμένεται βροχόπτωση σε αυτή την περίοδο'
  },
  'rule.precipSoon.choice.rain': {
    ru: 'Дождь', uk: 'Дощ', en: 'Rain', de: 'Regen', pl: 'Deszcz', cs: 'Déšť',
    fr: 'Pluie', it: 'Pioggia', es: 'Lluvia', ro: 'Ploaie', hu: 'Eső', sk: 'Dážď',
    pt: 'Chuva', nl: 'Regen', tr: 'Yağmur', el: 'Βροχή'
  },
  'rule.precipSoon.choice.snow': {
    ru: 'Снег', uk: 'Сніг', en: 'Snow', de: 'Schnee', pl: 'Śnieg', cs: 'Sníh',
    fr: 'Neige', it: 'Neve', es: 'Nieve', ro: 'Ninsoare', hu: 'Hó', sk: 'Sneh',
    pt: 'Neve', nl: 'Sneeuw', tr: 'Kar', el: 'Χιόνι'
  },
  'rule.precipSoon.sens.low.label': {
    ru: 'Строгий', uk: 'Строгий', en: 'Strict', de: 'Streng', pl: 'Surowy', cs: 'Přísný',
    fr: 'Strict', it: 'Stretto', es: 'Estricto', ro: 'Strict', hu: 'Szigorú', sk: 'Prísny',
    pt: 'Estrito', nl: 'Strikt', tr: 'Sıkı', el: 'Αυστηρό'
  },
  'rule.precipSoon.sens.low.desc': {
    ru: '≥60% и ≥0.3 мм/ч — только сильные осадки',
    uk: '≥60% і ≥0.3 мм/год — тільки сильні опади',
    en: '≥60% and ≥0.3 mm/h — only heavy precipitation',
    de: '≥60% und ≥0.3 mm/h — nur starker Niederschlag',
    pl: '≥60% i ≥0.3 mm/h — tylko silne opady',
    cs: '≥60% a ≥0.3 mm/h — pouze silné srážky',
    fr: '≥60% et ≥0.3 mm/h — uniquement fortes précipitations',
    it: '≥60% e ≥0.3 mm/h — solo precipitazioni intense',
    es: '≥60% y ≥0.3 mm/h — solo precipitaciones fuertes',
    ro: '≥60% și ≥0.3 mm/h — doar precipitații puternice',
    hu: '≥60% és ≥0.3 mm/ó — csak erős csapadék',
    sk: '≥60% a ≥0.3 mm/h — len silné zrážky',
    pt: '≥60% e ≥0.3 mm/h — apenas precipitação forte',
    nl: '≥60% en ≥0.3 mm/u — alleen zware neerslag',
    tr: '≥60% ve ≥0.3 mm/sa — sadece kuvvetli yağış',
    el: '≥60% και ≥0.3 mm/ώ — μόνο έντονη βροχόπτωση'
  },
  'rule.precipSoon.sens.med.label': {
    ru: 'Средний', uk: 'Середній', en: 'Medium', de: 'Mittel', pl: 'Średni', cs: 'Střední',
    fr: 'Moyen', it: 'Medio', es: 'Medio', ro: 'Mediu', hu: 'Közepes', sk: 'Stredný',
    pt: 'Médio', nl: 'Gemiddeld', tr: 'Orta', el: 'Μέτριο'
  },
  'rule.precipSoon.sens.med.desc': {
    ru: '≥40% и ≥0.2 мм/ч — баланс (default)',
    uk: '≥40% і ≥0.2 мм/год — баланс (default)',
    en: '≥40% and ≥0.2 mm/h — balanced (default)',
    de: '≥40% und ≥0.2 mm/h — ausgewogen (Standard)',
    pl: '≥40% i ≥0.2 mm/h — równowaga (domyślnie)',
    cs: '≥40% a ≥0.2 mm/h — vyvážené (výchozí)',
    fr: '≥40% et ≥0.2 mm/h — équilibré (défaut)',
    it: '≥40% e ≥0.2 mm/h — bilanciato (default)',
    es: '≥40% y ≥0.2 mm/h — equilibrado (por defecto)',
    ro: '≥40% și ≥0.2 mm/h — echilibrat (implicit)',
    hu: '≥40% és ≥0.2 mm/ó — kiegyensúlyozott (alapért.)',
    sk: '≥40% a ≥0.2 mm/h — vyvážené (predvolené)',
    pt: '≥40% e ≥0.2 mm/h — equilibrado (padrão)',
    nl: '≥40% en ≥0.2 mm/u — gebalanceerd (standaard)',
    tr: '≥40% ve ≥0.2 mm/sa — dengeli (varsayılan)',
    el: '≥40% και ≥0.2 mm/ώ — ισορροπημένο (προεπιλογή)'
  },
  'rule.precipSoon.sens.high.label': {
    ru: 'Чувств.', uk: 'Чутл.', en: 'Sensitive', de: 'Empfindl.', pl: 'Czuły', cs: 'Citlivý',
    fr: 'Sensible', it: 'Sensibile', es: 'Sensible', ro: 'Sensibil', hu: 'Érzékeny', sk: 'Citlivý',
    pt: 'Sensível', nl: 'Gevoelig', tr: 'Hassas', el: 'Ευαίσθητο'
  },
  'rule.precipSoon.sens.high.desc': {
    ru: '≥25% и ≥0.1 мм/ч — даже моросящий дождь',
    uk: '≥25% і ≥0.1 мм/год — навіть мряка',
    en: '≥25% and ≥0.1 mm/h — even drizzle',
    de: '≥25% und ≥0.1 mm/h — auch Nieselregen',
    pl: '≥25% i ≥0.1 mm/h — nawet mżawka',
    cs: '≥25% a ≥0.1 mm/h — i mrholení',
    fr: '≥25% et ≥0.1 mm/h — même la bruine',
    it: '≥25% e ≥0.1 mm/h — anche pioviggine',
    es: '≥25% y ≥0.1 mm/h — incluso llovizna',
    ro: '≥25% și ≥0.1 mm/h — chiar și burniță',
    hu: '≥25% és ≥0.1 mm/ó — még szitálás is',
    sk: '≥25% a ≥0.1 mm/h — aj mrholenie',
    pt: '≥25% e ≥0.1 mm/h — até chuvisco',
    nl: '≥25% en ≥0.1 mm/u — zelfs motregen',
    tr: '≥25% ve ≥0.1 mm/sa — çisenti bile',
    el: '≥25% και ≥0.1 mm/ώ — ακόμη και ψιλόβροχο'
  },
  'rule.stormAlert.name': {
    ru: 'Гроза в ближайшие 6 часов', uk: 'Гроза найближчі 6 годин', en: 'Storm in the next 6 hours',
    de: 'Gewitter in den nächsten 6 Stunden', pl: 'Burza w ciągu 6 godzin', cs: 'Bouřka v následujících 6 hodinách',
    fr: 'Orage dans les 6 prochaines heures', it: 'Temporale nelle prossime 6 ore', es: 'Tormenta en las próximas 6 horas',
    ro: 'Furtună în următoarele 6 ore', hu: 'Zivatar a következő 6 órában', sk: 'Búrka v nasledujúcich 6 hodinách',
    pt: 'Trovoada nas próximas 6 horas', nl: 'Onweer in de komende 6 uur', tr: 'Önümüzdeki 6 saatte fırtına',
    el: 'Καταιγίδα τις επόμενες 6 ώρες'
  },
  'rule.stormAlert.desc': {
    ru: 'Алерт при weather_code 95/96/99 или CAPE>1500 + LI<-2',
    uk: 'Алерт при weather_code 95/96/99 або CAPE>1500 + LI<-2',
    en: 'Alert on weather_code 95/96/99 or CAPE>1500 + LI<-2',
    de: 'Alarm bei weather_code 95/96/99 oder CAPE>1500 + LI<-2',
    pl: 'Alert przy weather_code 95/96/99 lub CAPE>1500 + LI<-2',
    cs: 'Alert při weather_code 95/96/99 nebo CAPE>1500 + LI<-2',
    fr: 'Alerte sur weather_code 95/96/99 ou CAPE>1500 + LI<-2',
    it: 'Allarme su weather_code 95/96/99 o CAPE>1500 + LI<-2',
    es: 'Alerta en weather_code 95/96/99 o CAPE>1500 + LI<-2',
    ro: 'Alertă la weather_code 95/96/99 sau CAPE>1500 + LI<-2',
    hu: 'Riasztás weather_code 95/96/99 vagy CAPE>1500 + LI<-2 esetén',
    sk: 'Upozornenie pri weather_code 95/96/99 alebo CAPE>1500 + LI<-2',
    pt: 'Alerta em weather_code 95/96/99 ou CAPE>1500 + LI<-2',
    nl: 'Alert bij weather_code 95/96/99 of CAPE>1500 + LI<-2',
    tr: 'weather_code 95/96/99 veya CAPE>1500 + LI<-2 üzerinde uyarı',
    el: 'Ειδοποίηση σε weather_code 95/96/99 ή CAPE>1500 + LI<-2'
  },
  'rule.tempBelow.name': {
    ru: 'Температура ниже', uk: 'Температура нижче', en: 'Temperature below',
    de: 'Temperatur unter', pl: 'Temperatura poniżej', cs: 'Teplota pod',
    fr: 'Température sous', it: 'Temperatura sotto', es: 'Temperatura bajo',
    ro: 'Temperatura sub', hu: 'Hőmérséklet alatt', sk: 'Teplota pod',
    pt: 'Temperatura abaixo', nl: 'Temperatuur onder', tr: 'Sıcaklık altında', el: 'Θερμοκρασία κάτω από'
  },
  'rule.tempBelow.desc': {
    ru: 'Минимум по прогнозу на ближайшие 12 часов',
    uk: 'Мінімум за прогнозом на найближчі 12 годин',
    en: 'Minimum forecast for the next 12 hours',
    de: 'Minimum laut Prognose für die nächsten 12 Stunden',
    pl: 'Minimum prognozy na najbliższe 12 godzin',
    cs: 'Minimum z předpovědi pro následujících 12 hodin',
    fr: 'Minimum prévu pour les 12 prochaines heures',
    it: 'Minimo previsto per le prossime 12 ore',
    es: 'Mínimo de previsión para las próximas 12 horas',
    ro: 'Minim previzionat pentru următoarele 12 ore',
    hu: 'A következő 12 óra előrejelzett minimuma',
    sk: 'Minimum predpovede na nasledujúcich 12 hodín',
    pt: 'Mínimo previsto para as próximas 12 horas',
    nl: 'Minimum volgens voorspelling voor de komende 12 uur',
    tr: 'Önümüzdeki 12 saat tahmini minimum',
    el: 'Ελάχιστο πρόγνωσης για τις επόμενες 12 ώρες'
  },
  'rule.tempAbove.name': {
    ru: 'Температура выше', uk: 'Температура вище', en: 'Temperature above',
    de: 'Temperatur über', pl: 'Temperatura powyżej', cs: 'Teplota nad',
    fr: 'Température au-dessus de', it: 'Temperatura sopra', es: 'Temperatura sobre',
    ro: 'Temperatura peste', hu: 'Hőmérséklet felett', sk: 'Teplota nad',
    pt: 'Temperatura acima', nl: 'Temperatuur boven', tr: 'Sıcaklık üzerinde', el: 'Θερμοκρασία πάνω από'
  },
  'rule.tempAbove.desc': {
    ru: 'Максимум по прогнозу на ближайшие 12 часов',
    uk: 'Максимум за прогнозом на найближчі 12 годин',
    en: 'Maximum forecast for the next 12 hours',
    de: 'Maximum laut Prognose für die nächsten 12 Stunden',
    pl: 'Maksimum prognozy na najbliższe 12 godzin',
    cs: 'Maximum z předpovědi pro následujících 12 hodin',
    fr: 'Maximum prévu pour les 12 prochaines heures',
    it: 'Massimo previsto per le prossime 12 ore',
    es: 'Máximo de previsión para las próximas 12 horas',
    ro: 'Maxim previzionat pentru următoarele 12 ore',
    hu: 'A következő 12 óra előrejelzett maximuma',
    sk: 'Maximum predpovede na nasledujúcich 12 hodín',
    pt: 'Máximo previsto para as próximas 12 horas',
    nl: 'Maximum volgens voorspelling voor de komende 12 uur',
    tr: 'Önümüzdeki 12 saat tahmini maksimum',
    el: 'Μέγιστο πρόγνωσης για τις επόμενες 12 ώρες'
  },
  'rule.dryStreak.name': {
    ru: 'Дней без дождя подряд', uk: 'Днів без дощу поспіль', en: 'Days without rain in a row',
    de: 'Tage in Folge ohne Regen', pl: 'Dni bez deszczu z rzędu', cs: 'Dnů bez deště v řadě',
    fr: 'Jours sans pluie d\'affilée', it: 'Giorni di seguito senza pioggia', es: 'Días seguidos sin lluvia',
    ro: 'Zile consecutive fără ploaie', hu: 'Egymást követő esőmentes nap', sk: 'Dní bez dažďa v rade',
    pt: 'Dias seguidos sem chuva', nl: 'Aaneengesloten dagen zonder regen', tr: 'Üst üste yağmursuz gün',
    el: 'Συνεχόμενες ημέρες χωρίς βροχή'
  },
  'rule.dryStreak.desc': {
    ru: 'Алерт когда подряд N+ дней с осадками <0.5 мм/сутки',
    uk: 'Алерт коли поспіль N+ днів з опадами <0.5 мм/добу',
    en: 'Alert when N+ days in a row with <0.5 mm/day precipitation',
    de: 'Alarm bei N+ Tagen in Folge mit <0.5 mm/Tag Niederschlag',
    pl: 'Alert gdy N+ dni z rzędu z opadami <0.5 mm/dobę',
    cs: 'Alert při N+ dnech v řadě se srážkami <0.5 mm/den',
    fr: 'Alerte quand N+ jours d\'affilée avec <0.5 mm/jour de précipitations',
    it: 'Allarme quando N+ giorni di fila con <0.5 mm/giorno di precipitazioni',
    es: 'Alerta cuando N+ días seguidos con <0.5 mm/día de precipitación',
    ro: 'Alertă când N+ zile la rând cu <0.5 mm/zi precipitații',
    hu: 'Riasztás, ha N+ egymást követő napon <0.5 mm/nap csapadék',
    sk: 'Upozornenie keď N+ dní v rade so zrážkami <0.5 mm/deň',
    pt: 'Alerta quando N+ dias seguidos com <0.5 mm/dia de precipitação',
    nl: 'Alert wanneer N+ dagen achtereen met <0.5 mm/dag neerslag',
    tr: 'Üst üste N+ gün <0.5 mm/gün yağışla uyarı',
    el: 'Ειδοποίηση όταν N+ ημέρες στη σειρά με <0.5 mm/ημέρα βροχόπτωση'
  },
  'rule.morningSummary.name': {
    ru: 'Утренняя сводка', uk: 'Ранкове зведення', en: 'Morning summary',
    de: 'Morgen-Zusammenfassung', pl: 'Poranne podsumowanie', cs: 'Ranní souhrn',
    fr: 'Résumé du matin', it: 'Riepilogo del mattino', es: 'Resumen matutino',
    ro: 'Rezumat de dimineață', hu: 'Reggeli összefoglaló', sk: 'Ranný súhrn',
    pt: 'Resumo matinal', nl: 'Ochtendoverzicht', tr: 'Sabah özeti', el: 'Πρωινή σύνοψη'
  },
  'rule.morningSummary.desc': {
    ru: 'Ежедневная сводка погоды в указанное время',
    uk: 'Щоденне зведення погоди в указаний час',
    en: 'Daily weather summary at the chosen time',
    de: 'Tägliche Wetter-Zusammenfassung zur gewählten Zeit',
    pl: 'Codzienne podsumowanie pogody o wybranej godzinie',
    cs: 'Denní souhrn počasí v určený čas',
    fr: 'Résumé météo quotidien à l\'heure choisie',
    it: 'Riepilogo meteo giornaliero all\'ora scelta',
    es: 'Resumen meteorológico diario a la hora elegida',
    ro: 'Rezumat meteo zilnic la ora aleasă',
    hu: 'Napi időjárás-összefoglaló a megadott időpontban',
    sk: 'Denný súhrn počasia v zvolenom čase',
    pt: 'Resumo meteorológico diário à hora escolhida',
    nl: 'Dagelijks weersoverzicht op het gekozen tijdstip',
    tr: 'Belirtilen saatte günlük hava özeti',
    el: 'Καθημερινή σύνοψη καιρού στην επιλεγμένη ώρα'
  },
  // Labels секций утренней сводки
  'rule.section.wind':     { ru:'Ветер', uk:'Вітер', en:'Wind', de:'Wind', pl:'Wiatr', cs:'Vítr', fr:'Vent', it:'Vento', es:'Viento', ro:'Vânt', hu:'Szél', sk:'Vietor', pt:'Vento', nl:'Wind', tr:'Rüzgar', el:'Άνεμος' },
  'rule.section.precip':   { ru:'Осадки', uk:'Опади', en:'Precipitation', de:'Niederschlag', pl:'Opady', cs:'Srážky', fr:'Précipitations', it:'Precipitazioni', es:'Precipitaciones', ro:'Precipitații', hu:'Csapadék', sk:'Zrážky', pt:'Precipitação', nl:'Neerslag', tr:'Yağış', el:'Βροχόπτωση' },
  'rule.section.fog':      { ru:'Туман', uk:'Туман', en:'Fog', de:'Nebel', pl:'Mgła', cs:'Mlha', fr:'Brouillard', it:'Nebbia', es:'Niebla', ro:'Ceață', hu:'Köd', sk:'Hmla', pt:'Nevoeiro', nl:'Mist', tr:'Sis', el:'Ομίχλη' },
  'rule.section.astro':    { ru:'Восход/закат', uk:'Схід/захід', en:'Sunrise/Sunset', de:'Auf-/Untergang', pl:'Wschód/zachód', cs:'Východ/západ', fr:'Lever/coucher', it:'Alba/tramonto', es:'Amanecer/atardecer', ro:'Răsărit/apus', hu:'Napkelte/napnyugta', sk:'Východ/západ', pt:'Nascer/pôr-do-sol', nl:'Opkomst/ondergang', tr:'Doğuş/batış', el:'Ανατολή/δύση' },
  'rule.section.moon':     { ru:'Фаза Луны', uk:'Фаза Місяця', en:'Moon phase', de:'Mondphase', pl:'Faza Księżyca', cs:'Fáze Měsíce', fr:'Phase de la lune', it:'Fase lunare', es:'Fase lunar', ro:'Faza lunii', hu:'Holdfázis', sk:'Fáza Mesiaca', pt:'Fase da lua', nl:'Maanfase', tr:'Ay evresi', el:'Φάση σελήνης' },
  'rule.section.storm':    { ru:'Гроза', uk:'Гроза', en:'Storm', de:'Gewitter', pl:'Burza', cs:'Bouřka', fr:'Orage', it:'Temporale', es:'Tormenta', ro:'Furtună', hu:'Zivatar', sk:'Búrka', pt:'Trovoada', nl:'Onweer', tr:'Fırtına', el:'Καταιγίδα' },
  'rule.section.feels':    { ru:'По ощущениям', uk:'За відчуттями', en:'Feels like', de:'Gefühlt', pl:'Odczuwalna', cs:'Pocitově', fr:'Ressenti', it:'Percepita', es:'Sensación', ro:'Resimțită', hu:'Hőérzet', sk:'Pocitovo', pt:'Sensação', nl:'Gevoel', tr:'Hissedilen', el:'Αισθητή' },
  'rule.section.tomorrow': { ru:'Завтра', uk:'Завтра', en:'Tomorrow', de:'Morgen', pl:'Jutro', cs:'Zítra', fr:'Demain', it:'Domani', es:'Mañana', ro:'Mâine', hu:'Holnap', sk:'Zajtra', pt:'Amanhã', nl:'Morgen', tr:'Yarın', el:'Αύριο' },
  'rule.sensitivityHint': {
    ru: 'Чувствительность', uk: 'Чутливість', en: 'Sensitivity', de: 'Empfindlichkeit', pl: 'Czułość',
    cs: 'Citlivost', fr: 'Sensibilité', it: 'Sensibilità', es: 'Sensibilidad',
    ro: 'Sensibilitate', hu: 'Érzékenység', sk: 'Citlivosť',
    pt: 'Sensibilidade', nl: 'Gevoeligheid', tr: 'Hassasiyet', el: 'Ευαισθησία'
  },
  'rule.sectionsHint': {
    ru: 'Доп. блоки в утреннем сообщении',
    uk: 'Дод. блоки в ранковому повідомленні',
    en: 'Extra blocks in the morning message',
    de: 'Zusätzliche Blöcke in der Morgennachricht',
    pl: 'Dod. bloki w porannej wiadomości',
    cs: 'Další bloky v ranní zprávě',
    fr: 'Blocs supplémentaires dans le message du matin',
    it: 'Blocchi aggiuntivi nel messaggio mattutino',
    es: 'Bloques adicionales en el mensaje matutino',
    ro: 'Blocuri suplimentare în mesajul de dimineață',
    hu: 'További blokkok a reggeli üzenetben',
    sk: 'Ďalšie bloky v ranne správe',
    pt: 'Blocos adicionais na mensagem matinal',
    nl: 'Extra blokken in het ochtendbericht',
    tr: 'Sabah mesajında ek bloklar',
    el: 'Πρόσθετα μπλοκ στο πρωινό μήνυμα'
  },
  // accuracy advice toast + bias title + copy command aria + radar slider
  'accuracy.adviceTitle': {
    ru: '{name} точнее для вашей локации',
    uk: '{name} точніше для вашої локації',
    en: '{name} is more accurate for your location',
    de: '{name} ist genauer für deinen Standort',
    pl: '{name} jest dokładniejszy dla twojej lokalizacji',
    cs: '{name} je přesnější pro tvou lokalitu',
    fr: '{name} est plus précis pour ton lieu',
    it: '{name} è più preciso per la tua località',
    es: '{name} es más preciso para tu ubicación',
    ro: '{name} este mai precis pentru locația ta',
    hu: '{name} pontosabb a helyedhez',
    sk: '{name} je presnejší pre tvoju lokalitu',
    pt: '{name} é mais preciso para a tua localização',
    nl: '{name} is nauwkeuriger voor jouw locatie',
    tr: '{name} konumun için daha doğru',
    el: 'Το {name} είναι ακριβέστερο για την τοποθεσία σου'
  },
  'accuracy.adviceHint': {
    ru: 'Нажмите на индикатор источника в шапке, чтобы переключиться',
    uk: 'Натисніть на індикатор джерела в шапці, щоб перемкнути',
    en: 'Tap the source indicator in the header to switch',
    de: 'Tippe auf den Quellenindikator in der Kopfzeile, um zu wechseln',
    pl: 'Kliknij wskaźnik źródła w nagłówku, aby przełączyć',
    cs: 'Klikni na ukazatel zdroje v záhlaví pro přepnutí',
    fr: 'Appuie sur l\'indicateur de source dans l\'en-tête pour changer',
    it: 'Tocca l\'indicatore della fonte nell\'intestazione per cambiare',
    es: 'Toca el indicador de fuente en la cabecera para cambiar',
    ro: 'Apasă pe indicatorul sursei din antet pentru a comuta',
    hu: 'Koppints a fejléc forrásjelzőjére a váltáshoz',
    sk: 'Klepni na ukazovateľ zdroja v hlavičke pre prepnutie',
    pt: 'Toca no indicador de fonte no cabeçalho para mudar',
    nl: 'Tik op de bronindicator in de header om te wisselen',
    tr: 'Geçiş için başlıktaki kaynak göstergesine dokun',
    el: 'Πάτησε στον δείκτη πηγής στην κεφαλίδα για εναλλαγή'
  },
  'accuracy.biasTitle': {
    ru: 'Калибровка по накопленным замерам',
    uk: 'Калібрування за накопиченими замірами',
    en: 'Calibrated by accumulated samples',
    de: 'Kalibriert nach gesammelten Messungen',
    pl: 'Kalibracja na podstawie zebranych pomiarów',
    cs: 'Kalibrace podle nashromážděných měření',
    fr: 'Calibré par les mesures accumulées',
    it: 'Calibrato sui campioni accumulati',
    es: 'Calibrado por muestras acumuladas',
    ro: 'Calibrat după măsurătorile acumulate',
    hu: 'A gyűjtött mérések alapján kalibrálva',
    sk: 'Kalibrácia podľa nahromadených meraní',
    pt: 'Calibrado por amostras acumuladas',
    nl: 'Gekalibreerd op basis van verzamelde metingen',
    tr: 'Birikmiş ölçümlerle kalibre',
    el: 'Βαθμονομημένο με συσσωρευμένες μετρήσεις'
  },
  'notif.copyCmdAria': {
    ru: 'Скопировать команду', uk: 'Скопіювати команду', en: 'Copy command',
    de: 'Befehl kopieren', pl: 'Skopiuj polecenie', cs: 'Zkopírovat příkaz',
    fr: 'Copier la commande', it: 'Copia comando', es: 'Copiar comando',
    ro: 'Copiază comanda', hu: 'Parancs másolása', sk: 'Skopírovať príkaz',
    pt: 'Copiar comando', nl: 'Commando kopiëren', tr: 'Komutu kopyala', el: 'Αντιγραφή εντολής'
  },
  'radar.sliderAria': {
    ru: 'Время кадра', uk: 'Час кадру', en: 'Frame time',
    de: 'Frame-Zeit', pl: 'Czas klatki', cs: 'Čas snímku',
    fr: 'Heure de l\'image', it: 'Orario del frame', es: 'Hora del fotograma',
    ro: 'Timp cadru', hu: 'Képkocka ideje', sk: 'Čas snímky',
    pt: 'Hora do quadro', nl: 'Frame-tijd', tr: 'Kare zamanı', el: 'Χρόνος καρέ'
  },
  // ===== Telegram notifications panel — пропущенные ключи (были только в RU) =====
  'settings.notif.title': {
    ru: 'Уведомления Telegram', uk: 'Сповіщення Telegram', en: 'Telegram notifications',
    de: 'Telegram-Benachrichtigungen', pl: 'Powiadomienia Telegram', cs: 'Telegram upozornění',
    fr: 'Notifications Telegram', it: 'Notifiche Telegram', es: 'Notificaciones de Telegram',
    ro: 'Notificări Telegram', hu: 'Telegram értesítések', sk: 'Telegram upozornenia',
    pt: 'Notificações do Telegram', nl: 'Telegram-meldingen', tr: 'Telegram bildirimleri',
    el: 'Ειδοποιήσεις Telegram'
  },
  'settings.notif.intro': {
    ru: 'Бот @MeteoStarBot будет присылать вам уведомления о погоде по выбранным правилам.',
    uk: 'Бот @MeteoStarBot надсилатиме вам сповіщення про погоду за обраними правилами.',
    en: 'The @MeteoStarBot bot will send you weather notifications based on your rules.',
    de: 'Der Bot @MeteoStarBot sendet dir Wetter-Benachrichtigungen nach deinen Regeln.',
    pl: 'Bot @MeteoStarBot będzie wysyłał ci powiadomienia pogodowe według wybranych reguł.',
    cs: 'Bot @MeteoStarBot ti bude posílat upozornění o počasí podle vybraných pravidel.',
    fr: 'Le bot @MeteoStarBot t\'enverra des notifications météo selon tes règles.',
    it: 'Il bot @MeteoStarBot ti invierà notifiche meteo secondo le tue regole.',
    es: 'El bot @MeteoStarBot te enviará notificaciones meteorológicas según tus reglas.',
    ro: 'Botul @MeteoStarBot îți va trimite notificări meteo conform regulilor alese.',
    hu: 'A @MeteoStarBot bot a kiválasztott szabályok alapján küld időjárási értesítéseket.',
    sk: 'Bot @MeteoStarBot ti bude posielať upozornenia o počasí podľa zvolených pravidiel.',
    pt: 'O bot @MeteoStarBot enviar-te-á notificações meteorológicas segundo as tuas regras.',
    nl: 'De bot @MeteoStarBot stuurt je weermeldingen op basis van je regels.',
    tr: '@MeteoStarBot botu seçtiğin kurallara göre sana hava bildirimleri gönderecek.',
    el: 'Το bot @MeteoStarBot θα σου στέλνει ειδοποιήσεις καιρού βάσει των κανόνων σου.'
  },
  'settings.notif.linkBtn': {
    ru: 'Связать с Telegram', uk: 'Зв\'язати з Telegram', en: 'Link with Telegram',
    de: 'Mit Telegram verbinden', pl: 'Połącz z Telegramem', cs: 'Propojit s Telegramem',
    fr: 'Lier à Telegram', it: 'Collega a Telegram', es: 'Vincular con Telegram',
    ro: 'Conectează cu Telegram', hu: 'Telegram összekapcsolása', sk: 'Prepojiť s Telegramom',
    pt: 'Ligar com Telegram', nl: 'Koppelen met Telegram', tr: 'Telegram\'a bağla',
    el: 'Σύνδεση με Telegram'
  },
  'settings.notif.codeIntro': {
    ru: 'Открой @MeteoStarBot в Telegram и пришли ему этот код:',
    uk: 'Відкрий @MeteoStarBot у Telegram і надішли йому цей код:',
    en: 'Open @MeteoStarBot in Telegram and send it this code:',
    de: 'Öffne @MeteoStarBot in Telegram und sende ihm diesen Code:',
    pl: 'Otwórz @MeteoStarBot w Telegramie i wyślij mu ten kod:',
    cs: 'Otevři @MeteoStarBot v Telegramu a pošli mu tento kód:',
    fr: 'Ouvre @MeteoStarBot dans Telegram et envoie-lui ce code :',
    it: 'Apri @MeteoStarBot in Telegram e inviagli questo codice:',
    es: 'Abre @MeteoStarBot en Telegram y envíale este código:',
    ro: 'Deschide @MeteoStarBot în Telegram și trimite-i acest cod:',
    hu: 'Nyisd meg a @MeteoStarBot-ot a Telegramban és küldd el neki ezt a kódot:',
    sk: 'Otvor @MeteoStarBot v Telegrame a pošli mu tento kód:',
    pt: 'Abre @MeteoStarBot no Telegram e envia-lhe este código:',
    nl: 'Open @MeteoStarBot in Telegram en stuur deze code:',
    tr: '@MeteoStarBot\'u Telegram\'da aç ve ona bu kodu gönder:',
    el: 'Άνοιξε το @MeteoStarBot στο Telegram και στείλε του αυτόν τον κωδικό:'
  },
  'settings.notif.codeCmd': {
    ru: 'Команда:', uk: 'Команда:', en: 'Command:', de: 'Befehl:', pl: 'Polecenie:',
    cs: 'Příkaz:', fr: 'Commande :', it: 'Comando:', es: 'Comando:',
    ro: 'Comandă:', hu: 'Parancs:', sk: 'Príkaz:',
    pt: 'Comando:', nl: 'Commando:', tr: 'Komut:', el: 'Εντολή:'
  },
  'settings.notif.timer': {
    ru: 'Код действителен', uk: 'Код дійсний', en: 'Code valid',
    de: 'Code gültig', pl: 'Kod ważny', cs: 'Kód platný',
    fr: 'Code valide', it: 'Codice valido', es: 'Código válido',
    ro: 'Cod valabil', hu: 'A kód érvényes', sk: 'Kód platný',
    pt: 'Código válido', nl: 'Code geldig', tr: 'Kod geçerli', el: 'Ο κωδικός ισχύει'
  },
  'settings.notif.openBot': {
    ru: 'Открыть бота', uk: 'Відкрити бота', en: 'Open bot',
    de: 'Bot öffnen', pl: 'Otwórz bota', cs: 'Otevřít bota',
    fr: 'Ouvrir le bot', it: 'Apri bot', es: 'Abrir bot',
    ro: 'Deschide botul', hu: 'Bot megnyitása', sk: 'Otvoriť bota',
    pt: 'Abrir bot', nl: 'Bot openen', tr: 'Botu aç', el: 'Άνοιγμα bot'
  },
  'settings.notif.cancel': {
    ru: 'Отменить', uk: 'Скасувати', en: 'Cancel',
    de: 'Abbrechen', pl: 'Anuluj', cs: 'Zrušit',
    fr: 'Annuler', it: 'Annulla', es: 'Cancelar',
    ro: 'Anulează', hu: 'Mégse', sk: 'Zrušiť',
    pt: 'Cancelar', nl: 'Annuleren', tr: 'İptal', el: 'Ακύρωση'
  },
  'settings.notif.linkedTitle': {
    ru: 'Связано с Telegram', uk: 'Зв\'язано з Telegram', en: 'Linked with Telegram',
    de: 'Mit Telegram verbunden', pl: 'Połączono z Telegramem', cs: 'Propojeno s Telegramem',
    fr: 'Lié à Telegram', it: 'Collegato a Telegram', es: 'Vinculado con Telegram',
    ro: 'Conectat cu Telegram', hu: 'Telegrammal összekapcsolva', sk: 'Prepojené s Telegramom',
    pt: 'Ligado ao Telegram', nl: 'Gekoppeld met Telegram', tr: 'Telegram\'a bağlı',
    el: 'Συνδεδεμένο με Telegram'
  },
  'settings.notif.unlink': {
    ru: 'Отвязать', uk: 'Відв\'язати', en: 'Unlink',
    de: 'Trennen', pl: 'Odłącz', cs: 'Odpojit',
    fr: 'Dissocier', it: 'Scollega', es: 'Desvincular',
    ro: 'Deconectează', hu: 'Leválasztás', sk: 'Odpojiť',
    pt: 'Desvincular', nl: 'Ontkoppelen', tr: 'Bağlantıyı kes', el: 'Αποσύνδεση'
  },
  'settings.notif.save': {
    ru: 'Сохранить правила', uk: 'Зберегти правила', en: 'Save rules',
    de: 'Regeln speichern', pl: 'Zapisz reguły', cs: 'Uložit pravidla',
    fr: 'Enregistrer les règles', it: 'Salva regole', es: 'Guardar reglas',
    ro: 'Salvează regulile', hu: 'Szabályok mentése', sk: 'Uložiť pravidlá',
    pt: 'Guardar regras', nl: 'Regels opslaan', tr: 'Kuralları kaydet',
    el: 'Αποθήκευση κανόνων'
  },
  'settings.notif.activeAccount': {
    ru: 'Активный аккаунт:', uk: 'Активний акаунт:', en: 'Active account:',
    de: 'Aktives Konto:', pl: 'Aktywne konto:', cs: 'Aktivní účet:',
    fr: 'Compte actif :', it: 'Account attivo:', es: 'Cuenta activa:',
    ro: 'Cont activ:', hu: 'Aktív fiók:', sk: 'Aktívny účet:',
    pt: 'Conta ativa:', nl: 'Actief account:', tr: 'Aktif hesap:',
    el: 'Ενεργός λογαριασμός:'
  },
  'settings.notif.addAccount': {
    ru: 'Добавить ещё один чат / группу',
    uk: 'Додати ще один чат / групу',
    en: 'Add another chat / group',
    de: 'Weiteren Chat / weitere Gruppe hinzufügen',
    pl: 'Dodaj kolejny czat / grupę',
    cs: 'Přidat další chat / skupinu',
    fr: 'Ajouter un autre chat / groupe',
    it: 'Aggiungi un\'altra chat / gruppo',
    es: 'Añadir otro chat / grupo',
    ro: 'Adaugă un alt chat / grup',
    hu: 'Másik csevegés / csoport hozzáadása',
    sk: 'Pridať ďalší chat / skupinu',
    pt: 'Adicionar outro chat / grupo',
    nl: 'Nog een chat / groep toevoegen',
    tr: 'Başka bir sohbet / grup ekle',
    el: 'Προσθήκη άλλης συνομιλίας / ομάδας'
  },
  // ===== Favorites — пропущенные ключи для большинства языков =====
  'fav.addToFav': {
    ru: 'В избранное', uk: 'В обрані', en: 'Add to favorites',
    de: 'Zu Favoriten', pl: 'Do ulubionych', cs: 'Do oblíbených',
    fr: 'Aux favoris', it: 'Ai preferiti', es: 'A favoritos',
    ro: 'La favorite', hu: 'Kedvencekhez', sk: 'Do obľúbených',
    pt: 'Aos favoritos', nl: 'Aan favorieten toevoegen', tr: 'Favorilere ekle',
    el: 'Στα αγαπημένα'
  },
  'fav.removeFromFav': {
    ru: 'Убрать из избранного', uk: 'Прибрати з обраних', en: 'Remove from favorites',
    de: 'Aus Favoriten entfernen', pl: 'Usuń z ulubionych', cs: 'Odebrat z oblíbených',
    fr: 'Retirer des favoris', it: 'Rimuovi dai preferiti', es: 'Quitar de favoritos',
    ro: 'Șterge din favorite', hu: 'Eltávolítás a kedvencekből', sk: 'Odstrániť z obľúbených',
    pt: 'Remover dos favoritos', nl: 'Verwijderen uit favorieten', tr: 'Favorilerden çıkar',
    el: 'Αφαίρεση από τα αγαπημένα'
  },
  'page.h2': {
    ru: 'Прогноз погоды с переключателем источников',
    uk: 'Прогноз погоди з перемикачем джерел',
    en: 'Weather forecast with source switcher',
    de: 'Wettervorhersage mit Quellenumschalter',
    pl: 'Prognoza pogody z przełącznikiem źródeł',
    cs: 'Předpověď počasí s přepínačem zdrojů',
    fr: 'Prévisions météo avec sélecteur de sources',
    it: 'Previsioni meteo con selettore di fonti',
    es: 'Pronóstico del tiempo con selector de fuentes',
    ro: 'Prognoză meteo cu comutator de surse',
    hu: 'Időjárás-előrejelzés forrásválasztóval',
    sk: 'Predpoveď počasia s prepínačom zdrojov',
    pt: 'Previsão meteorológica com seletor de fontes',
    nl: 'Weersvoorspelling met bronkeuze',
    tr: 'Kaynak seçicili hava tahmini',
    el: 'Πρόγνωση καιρού με επιλογέα πηγών'
  },
  'toast.copied': {
    ru: 'Скопировано ✓', uk: 'Скопійовано ✓', en: 'Copied ✓',
    de: 'Kopiert ✓', pl: 'Skopiowano ✓', cs: 'Zkopírováno ✓',
    fr: 'Copié ✓', it: 'Copiato ✓', es: 'Copiado ✓',
    ro: 'Copiat ✓', hu: 'Másolva ✓', sk: 'Skopírované ✓',
    pt: 'Copiado ✓', nl: 'Gekopieerd ✓', tr: 'Kopyalandı ✓',
    el: 'Αντιγράφηκε ✓'
  },
  'toast.copyFailed': {
    ru: 'Не удалось скопировать', uk: 'Не вдалося скопіювати', en: 'Copy failed',
    de: 'Kopieren fehlgeschlagen', pl: 'Nie udało się skopiować', cs: 'Kopírování selhalo',
    fr: 'Échec de la copie', it: 'Copia non riuscita', es: 'No se pudo copiar',
    ro: 'Copiere eșuată', hu: 'A másolás sikertelen', sk: 'Kopírovanie zlyhalo',
    pt: 'Falha ao copiar', nl: 'Kopiëren mislukt', tr: 'Kopyalama başarısız',
    el: 'Αποτυχία αντιγραφής'
  },
  'notif.authStale': {
    ru: '⚠ Связка устарела — отправь <code>/login</code> боту и кликни ссылку, чтобы переподключиться. Изменения правил не сохранятся пока связка не обновлена.',
    uk: '⚠ Зв\'язок застарів — надішли <code>/login</code> боту й клікни посилання, щоб перепідключитися. Зміни правил не збережуться, поки зв\'язок не оновиться.',
    en: '⚠ Link is stale — send <code>/login</code> to the bot and click the link to reconnect. Rule changes will not be saved until the link is refreshed.',
    de: '⚠ Verbindung veraltet — sende <code>/login</code> an den Bot und klicke den Link zum erneuten Verbinden. Regeländerungen werden nicht gespeichert, bis die Verbindung aktualisiert ist.',
    pl: '⚠ Połączenie nieaktualne — wyślij <code>/login</code> do bota i kliknij link, aby ponownie połączyć. Zmiany reguł nie zostaną zapisane, dopóki połączenie nie zostanie odświeżone.',
    cs: '⚠ Propojení je zastaralé — pošli <code>/login</code> botovi a klikni na odkaz pro opětovné připojení. Změny pravidel se neuloží, dokud nebude propojení obnoveno.',
    fr: '⚠ Liaison obsolète — envoie <code>/login</code> au bot et clique le lien pour te reconnecter. Les modifications de règles ne seront pas enregistrées tant que la liaison n\'est pas actualisée.',
    it: '⚠ Collegamento obsoleto — invia <code>/login</code> al bot e clicca il link per riconnetterti. Le modifiche alle regole non verranno salvate finché il collegamento non è aggiornato.',
    es: '⚠ Vinculación obsoleta — envía <code>/login</code> al bot y haz clic en el enlace para reconectar. Los cambios en las reglas no se guardarán hasta que la vinculación se actualice.',
    ro: '⚠ Conexiunea este învechită — trimite <code>/login</code> botului și apasă pe link pentru a te reconecta. Modificările regulilor nu vor fi salvate până când conexiunea nu se actualizează.',
    hu: '⚠ A kapcsolat elavult — küldd a <code>/login</code> parancsot a botnak, és kattints a linkre az újrakapcsolódáshoz. A szabálymódosítások nem mentődnek, amíg a kapcsolat nem frissül.',
    sk: '⚠ Spojenie je zastarané — pošli <code>/login</code> botovi a klikni na odkaz pre opätovné pripojenie. Zmeny pravidiel sa neuložia, kým sa spojenie neobnoví.',
    pt: '⚠ Ligação desatualizada — envia <code>/login</code> ao bot e clica no link para te reconectares. As alterações às regras não serão guardadas até a ligação ser atualizada.',
    nl: '⚠ Verbinding verouderd — stuur <code>/login</code> naar de bot en klik op de link om opnieuw te verbinden. Wijzigingen worden niet opgeslagen tot de verbinding is vernieuwd.',
    tr: '⚠ Bağlantı eski — bota <code>/login</code> gönder ve yeniden bağlanmak için bağlantıya tıkla. Kural değişiklikleri bağlantı yenilenene kadar kaydedilmeyecek.',
    el: '⚠ Η σύνδεση είναι παλαιά — στείλε <code>/login</code> στο bot και κάνε κλικ στον σύνδεσμο για επανασύνδεση. Οι αλλαγές κανόνων δεν θα αποθηκευτούν μέχρι να ανανεωθεί η σύνδεση.'
  },
  'notif.sourceHint': {
    ru: 'Если хочешь другую точность — поменяй источник погоды на главной и сохрани правила заново',
    uk: 'Якщо хочеш іншу точність — зміни джерело погоди на головній і збережи правила знову',
    en: 'For different accuracy — switch the weather source on the home screen and re-save the rules',
    de: 'Für eine andere Genauigkeit — ändere die Wetterquelle auf der Hauptseite und speichere die Regeln neu',
    pl: 'Aby uzyskać inną dokładność — zmień źródło pogody na stronie głównej i zapisz reguły ponownie',
    cs: 'Pro jinou přesnost — změň zdroj počasí na hlavní stránce a ulož pravidla znovu',
    fr: 'Pour une précision différente — change la source météo sur l\'accueil et sauvegarde à nouveau les règles',
    it: 'Per una precisione diversa — cambia la fonte meteo nella home e salva nuovamente le regole',
    es: 'Para otra precisión — cambia la fuente del tiempo en la pantalla principal y guarda las reglas de nuevo',
    ro: 'Pentru altă precizie — schimbă sursa meteo de pe pagina principală și salvează regulile din nou',
    hu: 'Másik pontossághoz — módosítsd az időjárás-forrást a főképernyőn, majd mentsd újra a szabályokat',
    sk: 'Pre inú presnosť — zmeň zdroj počasia na hlavnej obrazovke a ulož pravidlá znova',
    pt: 'Para precisão diferente — muda a fonte do tempo na página inicial e guarda as regras novamente',
    nl: 'Voor andere nauwkeurigheid — wijzig de weerbron op het hoofdscherm en sla de regels opnieuw op',
    tr: 'Farklı doğruluk için — ana ekrandaki hava kaynağını değiştir ve kuralları tekrar kaydet',
    el: 'Για διαφορετική ακρίβεια — άλλαξε την πηγή καιρού στην αρχική και αποθήκευσε ξανά τους κανόνες'
  }
};
// Мерджим extra-ключи в основной I18N. Идемпотентно, безопасно при повторе.
for (const [key, vals] of Object.entries(I18N_EXTRA)) {
  for (const lang of Object.keys(vals)) {
    if (I18N[lang]) I18N[lang][key] = vals[lang];
  }
}

// Поддерживаемые языки интерфейса. Источник истины — для UI dropdown,
// whitelist в loadSavedSettings, авто-detect, fallback в setupSegmentedHandlers.
// Расширяется добавлением нового кода СЮДА + блок в I18N + (опционально)
// мета-инфо в LANG_META (название, флаг).
const SUPPORTED_LANGS = ['ru','uk','en','de','pl','cs','fr','it','es','ro','hu','sk','pt','nl','tr','el'];
const LANG_META = {
  ru: { native: 'Русский',   flag: '🇷🇺' },
  uk: { native: 'Українська', flag: '🇺🇦' },
  en: { native: 'English',    flag: '🇬🇧' },
  de: { native: 'Deutsch',    flag: '🇩🇪' },
  pl: { native: 'Polski',     flag: '🇵🇱' },
  cs: { native: 'Čeština',    flag: '🇨🇿' },
  fr: { native: 'Français',   flag: '🇫🇷' },
  it: { native: 'Italiano',   flag: '🇮🇹' },
  es: { native: 'Español',    flag: '🇪🇸' },
  ro: { native: 'Română',     flag: '🇷🇴' },
  hu: { native: 'Magyar',     flag: '🇭🇺' },
  sk: { native: 'Slovenčina', flag: '🇸🇰' },
  pt: { native: 'Português',  flag: '🇵🇹' },
  nl: { native: 'Nederlands', flag: '🇳🇱' },
  tr: { native: 'Türkçe',     flag: '🇹🇷' },
  el: { native: 'Ελληνικά',   flag: '🇬🇷' }
};

// Авто-определение языка из navigator.language при ПЕРВОЙ загрузке
// (когда в localStorage ещё нет сохранённой настройки). Возвращает один
// из SUPPORTED_LANGS либо 'en' как fallback.
function detectBrowserLang() {
  try {
    const langs = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || 'en'];
    for (const raw of langs) {
      const code = String(raw).toLowerCase().slice(0,2);
      if (SUPPORTED_LANGS.includes(code)) return code;
    }
  } catch (_) {}
  return 'en';
}

// App-level state (overwritten from localStorage in init below)
const state = {
  lang: detectBrowserLang(),
  units: { temp: 'C', wind: 'ms', pressure: 'mmhg' },
  // Голос озвучки: voiceURI = идентификатор системного голоса (null = автоматический),
  // rate = 0.85 / 1.0 / 1.2 (медленно / норма / быстро)
  voice: { voiceURI: null, rate: 1.0 },
  // Тема: 'dark' (default), 'light' (peach/ivory), 'system' (по prefers-color-scheme)
  theme: 'dark'
};

/* ============================================
   THEME — переключение dark/light/system
   ============================================ */
let _themeMql = null;
function resolveTheme(value) {
  if (value === 'system') {
    if (!_themeMql) _themeMql = window.matchMedia('(prefers-color-scheme: dark)');
    return _themeMql.matches ? 'dark' : 'light';
  }
  return value === 'light' ? 'light' : 'dark';
}
function applyTheme() {
  const effective = resolveTheme(state.theme);
  if (effective === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  // meta theme-color (статус-бар iOS PWA, Android Chrome)
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', effective === 'light' ? '#ffeacc' : '#02061a');
  // apple status-bar — в light PWA должна быть default (тёмный текст на светлом)
  const apple = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (apple) apple.setAttribute('content', effective === 'light' ? 'default' : 'black-translucent');
}
function setTheme(value) {
  if (!['dark','light','system'].includes(value)) value = 'dark';
  state.theme = value;
  applyTheme();
  saveSettings();
  // Перевызываем source-theme и source-buttons — они пересчитывают
  // --src-color/--src-bg/--src-glow в зависимости от темы
  if (typeof applySourceTheme === 'function') applySourceTheme();
  if (typeof renderSourceButtons === 'function') renderSourceButtons();
  // Перерисовываем hero-scene — путь к фото зависит от темы
  // (assets/scenes/light/* vs assets/scenes/*)
  try {
    const af = (typeof getForecast === 'function') ? getForecast(currentSourceId) : null;
    if (af && af[0] && typeof renderHeroScene === 'function') renderHeroScene(af[0]);
  } catch (e) { /* hero ещё не отрисован */ }
  // Слушатель системной темы — только когда в system-режиме
  if (value === 'system') {
    if (!_themeMql) _themeMql = window.matchMedia('(prefers-color-scheme: dark)');
    if (_themeMql && !_themeMql._themeListener) {
      const handler = () => {
        if (state.theme === 'system') {
          applyTheme();
          if (typeof applySourceTheme === 'function') applySourceTheme();
          if (typeof renderSourceButtons === 'function') renderSourceButtons();
        }
      };
      _themeMql._themeListener = handler;
      if (_themeMql.addEventListener) _themeMql.addEventListener('change', handler);
      else _themeMql.addListener(handler);
    }
  }
}

function t(key, params) {
  let s = (I18N[state.lang] && I18N[state.lang][key]);
  if (s === undefined) s = I18N.ru[key];
  if (s === undefined) return key; // fail-safe: вернуть сам ключ
  if (params) {
    for (const k of Object.keys(params)) {
      s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
    }
  }
  return s;
}

function applyTranslations() {
  document.documentElement.lang = t('html.lang');
  // Title тега <title> (вкладка браузера). Использует ключ page.title.
  try { document.title = t('page.title'); } catch (_) {}
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (!key) return;
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (key) el.placeholder = t(key);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.dataset.i18nAria;
    if (key) el.setAttribute('aria-label', t(key));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.dataset.i18nTitle;
    if (key) el.setAttribute('title', t(key));
  });
  // data-i18n-h="12" → «+12{unit.h}» (для оси storm-heatmap и подобных)
  document.querySelectorAll('[data-i18n-h]').forEach(el => {
    const n = el.dataset.i18nH;
    if (n) el.textContent = `+${n}${t('unit.h')}`;
  });
}

/* ============================================
   UNITS — конверсии + форматтеры
   База: температура – °C, ветер – м/с, давление – мм рт.ст.
   ============================================ */

function convertTemp(c, to) {
  if (to === 'F') return c * 9/5 + 32;
  return c;
}
function convertWind(ms, to) {
  switch(to) {
    case 'kmh': return ms * 3.6;
    case 'mph': return ms * 2.236936;
    case 'kn':  return ms * 1.943844;
    default:    return ms;
  }
}
function convertPressure(mmhg, to) {
  switch(to) {
    case 'hpa':  return mmhg * 1.33322;
    case 'inhg': return mmhg * 0.0393701;
    default:     return mmhg;
  }
}

// Краткие текущие единицы (для чипа и подписей)
function unitTemp()     { return '°' + state.units.temp; }
function unitWind()     { return t('settings.wind.' + state.units.wind + '.unit'); }
function unitPressure() { return t('settings.pressure.' + state.units.pressure + '.unit'); }

// Форматтер температуры. opts: { withUnit, sign, precision }
function fmtTemp(c, opts = {}) {
  const { withUnit = true, sign = false, precision = 0 } = opts;
  if (c == null || Number.isNaN(c)) return '—';
  const u = state.units.temp;
  const v = convertTemp(c, u);
  const rounded = precision === 0 ? Math.round(v) : Number(v.toFixed(precision));
  const num = sign && rounded > 0 ? '+' + rounded : String(rounded);
  return withUnit ? `${num}°${u}` : num;
}

// Только число температуры, без °
function fmtTempNum(c, precision = 0) { return fmtTemp(c, { withUnit: false, precision }); }

// Форматтер скорости ветра
function fmtWind(ms, opts = {}) {
  const { withUnit = true, precision = 0 } = opts;
  if (ms == null || Number.isNaN(ms)) return '—';
  const u = state.units.wind;
  const v = convertWind(ms, u);
  const rounded = precision === 0 ? Math.round(v) : Number(v.toFixed(precision));
  return withUnit ? `${rounded} ${unitWind()}` : String(rounded);
}

// Форматтер давления (точность зависит от единицы)
function fmtPressure(mmhg, opts = {}) {
  const { withUnit = true } = opts;
  if (mmhg == null || Number.isNaN(mmhg)) return '—';
  const u = state.units.pressure;
  const v = convertPressure(mmhg, u);
  let num;
  if (u === 'inhg') num = v.toFixed(2);
  else num = String(Math.round(v));
  return withUnit ? `${num} ${unitPressure()}` : num;
}

// Длина дня из суммарных минут → локализованная строка ("15ч 19мин" / "15h 19min")
function fmtDayLen(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return t('astro.dayLen', { h, m });
}

// Парсер "15ч 19мин" (или "15ч 19мин"-подобных строк) обратно в минуты, для совместимости с BASELINE
function parseDayLenToMinutes(str) {
  if (typeof str !== 'string') return 0;
  const numbers = (str.match(/\d+/g) || []).map(Number);
  if (numbers.length >= 2) return numbers[0] * 60 + numbers[1];
  if (numbers.length === 1) return numbers[0] * 60;
  return 0;
}

// Краткий код направления ветра ("СЗ" / "Ю" / "В" и т.д.) → внутренний код "NW" / "S" / "E"
const WIND_DIR_RU2CODE = { 'С': 'N', 'СВ': 'NE', 'В': 'E', 'ЮВ': 'SE', 'Ю': 'S', 'ЮЗ': 'SW', 'З': 'W', 'СЗ': 'NW' };
function windDirCode(dir) {
  if (!dir) return null;
  if (WIND_DIR_RU2CODE[dir]) return WIND_DIR_RU2CODE[dir];
  if (['N','NE','E','SE','S','SW','W','NW'].includes(dir)) return dir;
  return null;
}
function localizeWindDirShort(dir) { const c = windDirCode(dir); return c ? t('windDir.' + c) : dir; }
function localizeWindDirFull(dir)  { const c = windDirCode(dir); return c ? t('windDirFull.' + c) : dir; }

/* ============================================
   ЛОКАЛИЗАТОРЫ — мапперы русских строк из BASELINE в i18n-ключи
   (BASELINE/SOURCES не меняем, маппинг лежит здесь)
   ============================================ */

const COND_LABEL_TO_KEY = {
  'Ясно': 'cond.clear',
  'Переменная облачность': 'cond.partlyCloudy',
  'Малооблачно': 'cond.partlyCloudy',
  'Облачно': 'cond.cloudy',
  'Пасмурно с прояснениями': 'cond.partlyCloudyWithClear',
  'Сплошная облачность': 'cond.overcast',
  'Дождь': 'cond.rain',
  'Сильный дождь': 'cond.heavyRain',
  'Гроза': 'cond.thunderstorm',
  'Снег': 'cond.snow',
  'Туман': 'cond.fog'
};
function localizeCondLabel(label) {
  return COND_LABEL_TO_KEY[label] ? t(COND_LABEL_TO_KEY[label]) : label;
}

// condDesc из BASELINE — нумерованные ключи по dayId (см. I18N condDesc.day0..day4)
function localizeCondDescByDayId(dayId) {
  return t('condDesc.day' + dayId);
}

const UV_LABEL_TO_KEY = {
  'Низкий': 'uvLabel.low',
  'Слабый': 'uvLabel.low',
  'Умеренный': 'uvLabel.moderate',
  'Высокий': 'uvLabel.high',
  'Очень высокий': 'uvLabel.veryHigh',
  'Экстремальный': 'uvLabel.extreme'
};
function localizeUvLabel(label) {
  return UV_LABEL_TO_KEY[label] ? t(UV_LABEL_TO_KEY[label]) : label;
}

const AQI_LABEL_TO_KEY = {
  'Хорошее': 'aqiLabel.good',
  'Умеренное': 'aqiLabel.moderate',
  'Вредно для чувствительных': 'aqiLabel.unhealthySens',
  'Вредно': 'aqiLabel.unhealthy',
  'Очень вредно': 'aqiLabel.veryUnhealthy',
  'Опасно': 'aqiLabel.hazardous'
};
function localizeAqiLabel(label) {
  return AQI_LABEL_TO_KEY[label] ? t(AQI_LABEL_TO_KEY[label]) : label;
}

const MOON_NAME_TO_KEY = {
  'Новолуние': 'moon.new',
  'Молодая луна': 'moon.waxingCrescent',
  'Первая четверть': 'moon.firstQuarter',
  'Прибывающая луна': 'moon.waxingGibbous',
  'Полнолуние': 'moon.full',
  'Убывающая луна': 'moon.waningGibbous',
  'Последняя четверть': 'moon.lastQuarter',
  'Старая луна': 'moon.waningCrescent'
};
function localizeMoonName(name) {
  return MOON_NAME_TO_KEY[name] ? t(MOON_NAME_TO_KEY[name]) : name;
}

// Дни недели: dayName из BASELINE на русском
const DAY_FULL_TO_KEY = {
  'Понедельник': 'day.full.mon', 'Вторник': 'day.full.tue', 'Среда': 'day.full.wed', 'Четверг': 'day.full.thu',
  'Пятница': 'day.full.fri', 'Суббота': 'day.full.sat', 'Воскресенье': 'day.full.sun'
};
function localizeDayFull(name) { return DAY_FULL_TO_KEY[name] ? t(DAY_FULL_TO_KEY[name]) : name; }

const DAY_SHORT_TO_KEY = {
  'Пн':'day.short.mon','Вт':'day.short.tue','Ср':'day.short.wed','Чт':'day.short.thu',
  'Пт':'day.short.fri','Сб':'day.short.sat','Вс':'day.short.sun'
};
function localizeDayShort(name) { return DAY_SHORT_TO_KEY[name] ? t(DAY_SHORT_TO_KEY[name]) : name; }

// Имя источника (для SOURCES.shortName, который захардкожен по-русски)
function localizeSourceName(src) {
  if (!src) return '';
  if (src.id === 'avg') return t('sources.avgShort');
  return src.shortName || src.name;
}
function localizeSourceFullName(src) {
  if (!src) return '';
  if (src.id === 'avg') return t('hero.sourceAvg');
  return src.name;
}

// Описание осадков по проценту
function precipDescKey(p) {
  if (!p || p < 5) return 'metric.rain.none';
  if (p < 30) return 'metric.rain.light';
  if (p < 60) return 'metric.rain.moderate';
  return 'metric.rain.heavy';
}

// Дата "ДД.ММ.ГГГГ" → локализованная "13 мая 2026" / "13 травня 2026" / "May 13, 2026"
function formatDateLocale(dateStr) {
  // dateStr формата "13.05.2026"
  const m = dateStr.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!m) return dateStr;
  const day = parseInt(m[1], 10), month = parseInt(m[2], 10), year = m[3];
  const monthName = t('month.' + month);
  if (state.lang === 'en') return `${monthName} ${day}, ${year}`;
  return `${day} ${monthName} ${year}`;
}

// "15ч 19мин" → перевод
function localizeDayLen(rusStr) {
  const minutes = parseDayLenToMinutes(rusStr);
  return fmtDayLen(minutes);
}

// Локализация городов из POPULAR_UA_CITIES.
// Принимает объект city {name, region, lat, lon} с русскими полями и возвращает локализованную пару.
const UA_CITY_TRANSLATIONS = {
  'Киев':           { uk: 'Київ',           en: 'Kyiv' },
  'Харьков':        { uk: 'Харків',         en: 'Kharkiv' },
  'Высокий':        { uk: 'Високий',        en: 'Vysokyi' },
  'Одесса':         { uk: 'Одеса',          en: 'Odesa' },
  'Днепр':          { uk: 'Дніпро',         en: 'Dnipro' },
  'Львов':          { uk: 'Львів',          en: 'Lviv' },
  'Запорожье':      { uk: 'Запоріжжя',      en: 'Zaporizhzhia' },
  'Кривой Рог':     { uk: 'Кривий Ріг',     en: 'Kryvyi Rih' },
  'Николаев':       { uk: 'Миколаїв',       en: 'Mykolaiv' },
  'Винница':        { uk: 'Вінниця',        en: 'Vinnytsia' },
  'Полтава':        { uk: 'Полтава',        en: 'Poltava' },
  'Чернигов':       { uk: 'Чернігів',       en: 'Chernihiv' },
  'Херсон':         { uk: 'Херсон',         en: 'Kherson' },
  'Черкассы':       { uk: 'Черкаси',        en: 'Cherkasy' },
  'Сумы':           { uk: 'Суми',           en: 'Sumy' },
  'Житомир':        { uk: 'Житомир',        en: 'Zhytomyr' },
  'Ровно':          { uk: 'Рівне',          en: 'Rivne' },
  'Кропивницкий':   { uk: 'Кропивницький',  en: 'Kropyvnytskyi' },
  'Хмельницкий':    { uk: 'Хмельницький',   en: 'Khmelnytskyi' },
  'Ивано-Франковск':{ uk: 'Івано-Франківськ',en: 'Ivano-Frankivsk' },
  'Тернополь':      { uk: 'Тернопіль',      en: 'Ternopil' },
  'Луцк':           { uk: 'Луцьк',          en: 'Lutsk' },
  'Краматорск':     { uk: 'Краматорськ',    en: 'Kramatorsk' },
  'Белая Церковь':  { uk: 'Біла Церква',    en: 'Bila Tserkva' },
  'Мелитополь':     { uk: 'Мелітополь',     en: 'Melitopol' },
  'Ужгород':        { uk: 'Ужгород',        en: 'Uzhhorod' },
  'Бровары':        { uk: 'Бровари',        en: 'Brovary' },
  'Каменское':      { uk: 'Камʼянське', en: 'Kamianske' },
  'Мариуполь':      { uk: 'Маріуполь',      en: 'Mariupol' },
  'Северодонецк':   { uk: 'Сєвєродонецьк',  en: 'Sievierodonetsk' },
  'Бахмут':         { uk: 'Бахмут',         en: 'Bakhmut' },
  'Каменец-Подольский': { uk: 'Камʼянець-Подільський', en: 'Kamianets-Podilskyi' }
};

const UA_REGION_TRANSLATIONS = {
  'Киевская обл.':           { uk: 'Київська обл.',           en: 'Kyiv region' },
  'Харьковская обл.':        { uk: 'Харківська обл.',         en: 'Kharkiv region' },
  'Харьковская обл. (пгт)':  { uk: 'Харківська обл. (смт)',   en: 'Kharkiv region (town)' },
  'Одесская обл.':           { uk: 'Одеська обл.',            en: 'Odesa region' },
  'Днепропетровская обл.':   { uk: 'Дніпропетровська обл.',   en: 'Dnipropetrovsk region' },
  'Львовская обл.':          { uk: 'Львівська обл.',          en: 'Lviv region' },
  'Запорожская обл.':        { uk: 'Запорізька обл.',         en: 'Zaporizhzhia region' },
  'Николаевская обл.':       { uk: 'Миколаївська обл.',       en: 'Mykolaiv region' },
  'Винницкая обл.':          { uk: 'Вінницька обл.',          en: 'Vinnytsia region' },
  'Полтавская обл.':         { uk: 'Полтавська обл.',         en: 'Poltava region' },
  'Черниговская обл.':       { uk: 'Чернігівська обл.',       en: 'Chernihiv region' },
  'Херсонская обл.':         { uk: 'Херсонська обл.',         en: 'Kherson region' },
  'Черкасская обл.':         { uk: 'Черкаська обл.',          en: 'Cherkasy region' },
  'Сумская обл.':            { uk: 'Сумська обл.',            en: 'Sumy region' },
  'Житомирская обл.':        { uk: 'Житомирська обл.',        en: 'Zhytomyr region' },
  'Ровненская обл.':         { uk: 'Рівненська обл.',         en: 'Rivne region' },
  'Кировоградская обл.':     { uk: 'Кіровоградська обл.',     en: 'Kirovohrad region' },
  'Хмельницкая обл.':        { uk: 'Хмельницька обл.',        en: 'Khmelnytskyi region' },
  'Ивано-Франковская обл.':  { uk: 'Івано-Франківська обл.',  en: 'Ivano-Frankivsk region' },
  'Тернопольская обл.':      { uk: 'Тернопільська обл.',      en: 'Ternopil region' },
  'Волынская обл.':          { uk: 'Волинська обл.',          en: 'Volyn region' },
  'Донецкая обл.':           { uk: 'Донецька обл.',           en: 'Donetsk region' },
  'Закарпатская обл.':       { uk: 'Закарпатська обл.',       en: 'Zakarpattia region' },
  'Луганская обл.':          { uk: 'Луганська обл.',          en: 'Luhansk region' },
  'Украина':                 { uk: 'Україна',                 en: 'Ukraine' }
};

function localizeCity(city) {
  if (!city) return { name: '', region: '' };
  const tr = UA_CITY_TRANSLATIONS[city.name];
  const rtr = UA_REGION_TRANSLATIONS[city.region];
  let name = city.name, region = city.region || '';
  // ru — оставляем оригинал. uk — украинский транслит. Все остальные (en/de/pl/…) → en (латиница).
  if (state.lang === 'uk' && tr) name = tr.uk;
  else if (state.lang !== 'ru' && tr) name = tr.en;
  if (state.lang === 'uk' && rtr) region = rtr.uk;
  else if (state.lang !== 'ru' && rtr) region = rtr.en;
  return { name, region };
}

/* ============================================
   SETTINGS — localStorage + apply
   ============================================ */

const SETTINGS_STORAGE_KEY = 'kw:settings:v1';

function loadSavedSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (s && typeof s === 'object') {
      if (SUPPORTED_LANGS.includes(s.lang)) state.lang = s.lang;
      if (s.units && typeof s.units === 'object') {
        if (['C','F'].includes(s.units.temp)) state.units.temp = s.units.temp;
        if (['ms','kmh','mph','kn'].includes(s.units.wind)) state.units.wind = s.units.wind;
        if (['mmhg','hpa','inhg'].includes(s.units.pressure)) state.units.pressure = s.units.pressure;
      }
      if (s.voice && typeof s.voice === 'object') {
        if (typeof s.voice.voiceURI === 'string') state.voice.voiceURI = s.voice.voiceURI;
        if (typeof s.voice.rate === 'number' && s.voice.rate >= 0.5 && s.voice.rate <= 2) state.voice.rate = s.voice.rate;
      }
      if (['dark','light','system'].includes(s.theme)) state.theme = s.theme;
    }
  } catch (e) {
    console.warn('Не удалось прочитать настройки:', e);
  }
}
function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({
      lang: state.lang,
      units: { ...state.units },
      voice: { ...state.voice },
      theme: state.theme
    }));
  } catch (e) {
    console.warn('Не удалось сохранить настройки:', e);
  }
}

/* ============================================
   COMPARE MODE — состояние и хранилище
   ============================================ */
const COMPARE_STATE = {
  active: false,
  cityB: null,         // { name, region, lat, lon }
  forecastB: null      // распарсенный byModel второго города
};
const COMPARE_STORAGE_KEY = 'kw:compare:v1';

function loadCompareState() {
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (s && s.active && s.cityB && typeof s.cityB.lat === 'number') {
      COMPARE_STATE.active = true;
      COMPARE_STATE.cityB = s.cityB;
      // forecastB не персистится — догрузится при первом render'е
    }
  } catch (e) { /* ignore */ }
}
function saveCompareState() {
  try {
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify({
      active: COMPARE_STATE.active,
      cityB: COMPARE_STATE.cityB
    }));
  } catch (e) { /* ignore */ }
}

/* ============================================
   3D ICONS (same as v3)
   ============================================ */
const ICONS = {
  'clear': (s, u) => `<svg viewBox="0 0 64 64" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sg-${u}" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="#fff5d4"/><stop offset="45%" stop-color="#ffd84d"/><stop offset="100%" stop-color="#ff8c00"/></radialGradient>
      <radialGradient id="sgg-${u}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255,200,80,0.55)"/><stop offset="100%" stop-color="rgba(255,200,80,0)"/></radialGradient>
      <filter id="sf-${u}"><feGaussianBlur stdDeviation="2"/><feOffset dx="0" dy="3" result="o"/><feFlood flood-color="#ff8c00" flood-opacity="0.4"/><feComposite in2="o" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#sgg-${u})"/>
    <circle cx="32" cy="32" r="16" fill="url(#sg-${u})" filter="url(#sf-${u})"/>
    <ellipse cx="27" cy="27" rx="6" ry="4" fill="rgba(255,255,255,0.55)"/>
  </svg>`,
  'partly-cloudy': (s, u) => `<svg viewBox="0 0 64 64" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="psg-${u}" cx="40%" cy="40%" r="60%"><stop offset="0%" stop-color="#fff5d4"/><stop offset="50%" stop-color="#ffd84d"/><stop offset="100%" stop-color="#ffa726"/></radialGradient>
      <linearGradient id="pcg-${u}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e0e7ff"/><stop offset="50%" stop-color="#93c5fd"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient>
      <radialGradient id="pch-${u}" cx="30%" cy="20%" r="50%"><stop offset="0%" stop-color="rgba(255,255,255,0.85)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient>
      <filter id="pf-${u}"><feGaussianBlur stdDeviation="1.5"/><feOffset dx="0" dy="2" result="o"/><feFlood flood-color="#001845" flood-opacity="0.5"/><feComposite in2="o" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <circle cx="22" cy="22" r="11" fill="url(#psg-${u})" filter="url(#pf-${u})"/>
    <ellipse cx="20" cy="19" rx="4" ry="2.5" fill="rgba(255,255,255,0.5)"/>
    <g filter="url(#pf-${u})">
      <ellipse cx="38" cy="40" rx="20" ry="13" fill="url(#pcg-${u})"/>
      <ellipse cx="26" cy="44" rx="14" ry="10" fill="url(#pcg-${u})"/>
      <ellipse cx="50" cy="42" rx="12" ry="9" fill="url(#pcg-${u})"/>
      <ellipse cx="32" cy="33" rx="14" ry="4" fill="url(#pch-${u})"/>
    </g>
  </svg>`,
  'cloudy': (s, u) => `<svg viewBox="0 0 64 64" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cg-${u}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e0e7ff"/><stop offset="50%" stop-color="#93c5fd"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient>
      <linearGradient id="cg2-${u}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#cbd5e1"/><stop offset="100%" stop-color="#64748b"/></linearGradient>
      <radialGradient id="ch-${u}" cx="30%" cy="20%" r="50%"><stop offset="0%" stop-color="rgba(255,255,255,0.85)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient>
      <filter id="cf-${u}"><feGaussianBlur stdDeviation="1.5"/><feOffset dx="0" dy="3" result="o"/><feFlood flood-color="#001845" flood-opacity="0.5"/><feComposite in2="o" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g filter="url(#cf-${u})"><ellipse cx="40" cy="22" rx="16" ry="11" fill="url(#cg2-${u})"/><ellipse cx="50" cy="28" rx="12" ry="9" fill="url(#cg2-${u})"/></g>
    <g filter="url(#cf-${u})"><ellipse cx="30" cy="40" rx="22" ry="14" fill="url(#cg-${u})"/><ellipse cx="46" cy="42" rx="16" ry="12" fill="url(#cg-${u})"/><ellipse cx="18" cy="44" rx="12" ry="9" fill="url(#cg-${u})"/><ellipse cx="28" cy="33" rx="16" ry="4" fill="url(#ch-${u})"/></g>
  </svg>`,
  'overcast': (s, u) => `<svg viewBox="0 0 64 64" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="og-${u}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#94a3b8"/><stop offset="100%" stop-color="#475569"/></linearGradient>
      <radialGradient id="oh-${u}" cx="30%" cy="20%" r="50%"><stop offset="0%" stop-color="rgba(255,255,255,0.5)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient>
      <filter id="of-${u}"><feGaussianBlur stdDeviation="1.5"/><feOffset dx="0" dy="3" result="o"/><feFlood flood-color="#001845" flood-opacity="0.5"/><feComposite in2="o" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g filter="url(#of-${u})"><ellipse cx="36" cy="34" rx="24" ry="14" fill="url(#og-${u})"/><ellipse cx="22" cy="38" rx="14" ry="10" fill="url(#og-${u})"/><ellipse cx="48" cy="38" rx="14" ry="10" fill="url(#og-${u})"/><ellipse cx="32" cy="28" rx="18" ry="4" fill="url(#oh-${u})"/></g>
  </svg>`,
  'rain': (s, u) => `<svg viewBox="0 0 64 64" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rg-${u}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#94a3b8"/><stop offset="100%" stop-color="#334155"/></linearGradient>
      <linearGradient id="rd-${u}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#00d4ff"/><stop offset="100%" stop-color="#0284c7"/></linearGradient>
      <radialGradient id="rh-${u}" cx="30%" cy="20%" r="50%"><stop offset="0%" stop-color="rgba(255,255,255,0.6)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient>
      <filter id="rf-${u}"><feGaussianBlur stdDeviation="1.5"/><feOffset dx="0" dy="3" result="o"/><feFlood flood-color="#001845" flood-opacity="0.5"/><feComposite in2="o" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g filter="url(#rf-${u})"><ellipse cx="32" cy="26" rx="22" ry="13" fill="url(#rg-${u})"/><ellipse cx="22" cy="30" rx="13" ry="10" fill="url(#rg-${u})"/><ellipse cx="44" cy="30" rx="13" ry="9" fill="url(#rg-${u})"/><ellipse cx="28" cy="20" rx="14" ry="3" fill="url(#rh-${u})"/></g>
    <g fill="url(#rd-${u})"><path d="M18 44 Q17 47 18 50 Q19 47 18 44 Z"/><path d="M26 47 Q25 50 26 53 Q27 50 26 47 Z"/><path d="M34 44 Q33 48 34 52 Q35 48 34 44 Z"/><path d="M42 47 Q41 50 42 53 Q43 50 42 47 Z"/><path d="M48 44 Q47 47 48 50 Q49 47 48 44 Z"/></g>
  </svg>`,
  'heavy-rain': (s, u) => `<svg viewBox="0 0 64 64" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hrg-${u}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#64748b"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
      <linearGradient id="hrd-${u}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#00d4ff"/><stop offset="100%" stop-color="#0369a1"/></linearGradient>
      <filter id="hrf-${u}"><feGaussianBlur stdDeviation="1.5"/><feOffset dx="0" dy="3" result="o"/><feFlood flood-color="#000" flood-opacity="0.5"/><feComposite in2="o" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g filter="url(#hrf-${u})"><ellipse cx="32" cy="24" rx="24" ry="14" fill="url(#hrg-${u})"/><ellipse cx="20" cy="28" rx="14" ry="10" fill="url(#hrg-${u})"/><ellipse cx="46" cy="28" rx="14" ry="11" fill="url(#hrg-${u})"/></g>
    <g fill="url(#hrd-${u})"><path d="M14 42 L16 50 L12 50 Z"/><path d="M22 44 L24 54 L20 54 Z"/><path d="M30 42 L32 52 L28 52 Z"/><path d="M38 44 L40 54 L36 54 Z"/><path d="M46 42 L48 52 L44 52 Z"/><path d="M54 44 L56 52 L52 52 Z"/></g>
  </svg>`,
  'thunderstorm': (s, u) => `<svg viewBox="0 0 64 64" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tg-${u}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#475569"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      <linearGradient id="tb-${u}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fef9c3"/><stop offset="50%" stop-color="#fde047"/><stop offset="100%" stop-color="#facc15"/></linearGradient>
      <filter id="tf-${u}"><feGaussianBlur stdDeviation="1.5"/><feOffset dx="0" dy="3" result="o"/><feFlood flood-color="#000" flood-opacity="0.6"/><feComposite in2="o" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="tbg-${u}"><feGaussianBlur stdDeviation="2"/><feFlood flood-color="#facc15" flood-opacity="0.8"/><feComposite operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g filter="url(#tf-${u})"><ellipse cx="32" cy="22" rx="24" ry="14" fill="url(#tg-${u})"/><ellipse cx="20" cy="26" rx="14" ry="10" fill="url(#tg-${u})"/><ellipse cx="46" cy="26" rx="14" ry="11" fill="url(#tg-${u})"/></g>
    <path d="M34 36 L24 50 L31 50 L26 60 L42 44 L35 44 L40 36 Z" fill="url(#tb-${u})" filter="url(#tbg-${u})" stroke="#fffbeb" stroke-width="0.5"/>
  </svg>`,
  'snow': (s, u) => `<svg viewBox="0 0 64 64" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ng-${u}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e0e7ff"/><stop offset="100%" stop-color="#94a3b8"/></linearGradient>
      <radialGradient id="nf-${u}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#bfdbfe"/></radialGradient>
      <filter id="nfilt-${u}"><feGaussianBlur stdDeviation="1.5"/><feOffset dx="0" dy="3" result="o"/><feFlood flood-color="#001845" flood-opacity="0.5"/><feComposite in2="o" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g filter="url(#nfilt-${u})"><ellipse cx="32" cy="24" rx="22" ry="13" fill="url(#ng-${u})"/><ellipse cx="22" cy="28" rx="12" ry="9" fill="url(#ng-${u})"/><ellipse cx="44" cy="28" rx="13" ry="10" fill="url(#ng-${u})"/></g>
    <circle cx="20" cy="46" r="2.5" fill="url(#nf-${u})"/><circle cx="32" cy="50" r="3" fill="url(#nf-${u})"/><circle cx="44" cy="46" r="2.5" fill="url(#nf-${u})"/><circle cx="26" cy="56" r="2" fill="url(#nf-${u})"/><circle cx="38" cy="56" r="2" fill="url(#nf-${u})"/>
  </svg>`,
  'fog': (s, u) => `<svg viewBox="0 0 64 64" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="fg-${u}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#cbd5e1"/><stop offset="100%" stop-color="#64748b"/></linearGradient></defs>
    <ellipse cx="32" cy="20" rx="22" ry="8" fill="url(#fg-${u})" opacity="0.6"/>
    <line x1="8" y1="32" x2="56" y2="32" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
    <line x1="12" y1="40" x2="52" y2="40" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
    <line x1="8" y1="48" x2="48" y2="48" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
    <line x1="16" y1="56" x2="56" y2="56" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
  </svg>`
};
function weatherIcon(cond, size=64) { return (ICONS[cond] || ICONS['cloudy'])(size, uid()); }

function sunMini3D(size=48) {
  const u = uid();
  return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="smg-${u}" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="#fff5d4"/><stop offset="50%" stop-color="#ffd84d"/><stop offset="100%" stop-color="#ff8c00"/></radialGradient>
      <radialGradient id="smgg-${u}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255,200,80,0.7)"/><stop offset="100%" stop-color="rgba(255,200,80,0)"/></radialGradient>
      <filter id="smf-${u}"><feGaussianBlur stdDeviation="1.5"/><feFlood flood-color="#ffa726" flood-opacity="0.7"/><feComposite operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#smgg-${u})"/>
    <g stroke="#ffd84d" stroke-width="2.5" stroke-linecap="round" filter="url(#smf-${u})">
      <line x1="32" y1="4" x2="32" y2="10"/><line x1="32" y1="54" x2="32" y2="60"/>
      <line x1="4" y1="32" x2="10" y2="32"/><line x1="54" y1="32" x2="60" y2="32"/>
      <line x1="12" y1="12" x2="17" y2="17"/><line x1="47" y1="47" x2="52" y2="52"/>
      <line x1="12" y1="52" x2="17" y2="47"/><line x1="47" y1="17" x2="52" y2="12"/>
    </g>
    <circle cx="32" cy="32" r="15" fill="url(#smg-${u})" filter="url(#smf-${u})"/>
    <ellipse cx="28" cy="28" rx="5" ry="3.5" fill="rgba(255,255,255,0.6)"/>
  </svg>`;
}

function uvMini3D(size=48, value=5, color='#facc15') {
  const u = uid();
  return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="uvm-${u}" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="#fff8e0"/><stop offset="55%" stop-color="${color}"/><stop offset="100%" stop-color="${color}"/></radialGradient>
      <radialGradient id="uvmg-${u}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${color}" stop-opacity="0.7"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></radialGradient>
      <filter id="uvf-${u}"><feGaussianBlur stdDeviation="1.5"/><feFlood flood-color="${color}" flood-opacity="0.8"/><feComposite operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#uvmg-${u})"/>
    <g stroke="${color}" stroke-width="2.5" stroke-linecap="round" filter="url(#uvf-${u})">
      <line x1="32" y1="3" x2="32" y2="11"/><line x1="32" y1="53" x2="32" y2="61"/>
      <line x1="3" y1="32" x2="11" y2="32"/><line x1="53" y1="32" x2="61" y2="32"/>
      <line x1="11" y1="11" x2="17" y2="17"/><line x1="47" y1="47" x2="53" y2="53"/>
      <line x1="11" y1="53" x2="17" y2="47"/><line x1="47" y1="17" x2="53" y2="11"/>
    </g>
    <circle cx="32" cy="32" r="15" fill="url(#uvm-${u})" filter="url(#uvf-${u})"/>
    <text x="32" y="37" text-anchor="middle" fill="rgba(0,0,0,0.55)" font-size="14" font-weight="700" font-family="Onest, sans-serif">${value}</text>
  </svg>`;
}

function aqiMini3D(size=48, value=42, color='#4ade80') {
  const u = uid();
  return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="aqg-${u}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${color}" stop-opacity="0.85"/><stop offset="55%" stop-color="${color}" stop-opacity="0.4"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></radialGradient>
      <linearGradient id="aql-${u}" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="${color}" stop-opacity="0"/><stop offset="30%" stop-color="${color}"/><stop offset="70%" stop-color="${color}"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></linearGradient>
      <radialGradient id="aqp-${u}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="${color}"/></radialGradient>
      <filter id="aqf-${u}"><feGaussianBlur stdDeviation="1.5"/><feFlood flood-color="${color}" flood-opacity="0.7"/><feComposite operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#aqg-${u})"/>
    <g filter="url(#aqf-${u})">
      <path d="M 8 24 Q 20 19 32 24 T 56 24" stroke="url(#aql-${u})" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 8 33 Q 20 28 32 33 T 56 33" stroke="url(#aql-${u})" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 8 42 Q 20 37 32 42 T 56 42" stroke="url(#aql-${u})" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.7"/>
    </g>
    <circle cx="16" cy="20" r="2" fill="url(#aqp-${u})"/><circle cx="48" cy="28" r="2" fill="url(#aqp-${u})" opacity="0.85"/>
    <circle cx="20" cy="48" r="2" fill="url(#aqp-${u})" opacity="0.7"/><circle cx="46" cy="46" r="1.5" fill="url(#aqp-${u})" opacity="0.6"/>
  </svg>`;
}

function moonPhaseIcon(illumPercent, waxing) {
  const u = uid();
  const offset = waxing ? -(80 - illumPercent * 0.8) : (80 - illumPercent * 0.8);
  return `<svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ml-${u}" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="#ffffff"/><stop offset="50%" stop-color="#f0f4ff"/><stop offset="100%" stop-color="#94a3b8"/></radialGradient>
      <radialGradient id="mg-${u}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(220,230,255,0.6)"/><stop offset="100%" stop-color="rgba(220,230,255,0)"/></radialGradient>
      <clipPath id="mc-${u}"><circle cx="50" cy="50" r="38"/></clipPath>
      <filter id="mf-${u}"><feGaussianBlur stdDeviation="2"/><feFlood flood-color="#dbeafe" flood-opacity="0.5"/><feComposite operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#mg-${u})"/>
    <circle cx="50" cy="50" r="38" fill="url(#ml-${u})" filter="url(#mf-${u})"/>
    <g clip-path="url(#mc-${u})"><ellipse cx="${50 + offset}" cy="50" rx="38" ry="38" fill="#0a1128" opacity="0.92"/></g>
    <circle cx="42" cy="42" r="3" fill="rgba(100,120,160,0.3)"/>
    <circle cx="55" cy="38" r="2" fill="rgba(100,120,160,0.25)"/>
    <circle cx="46" cy="55" r="2.5" fill="rgba(100,120,160,0.28)"/>
  </svg>`;
}

// Красивая визуализация хода солнца от восхода к закату.
// Дуга: квадратичная Безье от восхода через зенит к закату.
// Сейчас: яркое солнце с двойным glow на своей позиции (или прозрачное «прошло/ещё не взошло»).
// Под горизонтом — лёгкая «земля» с заливкой.
// Тики через каждые ~2 часа на дуге для масштаба.
// Текущее локальное время браузера в формате HH:MM (для позиции солнца на дуге).
// Примечание: sunrise/sunset приходят из Open-Meteo в таймзоне выбранного города.
// Если пользователь смотрит другой часовой пояс, позиция будет немного сдвинута —
// для большинства случаев (свой город) совпадает с системным временем.
function currentLocalHHMM() {
  const d = new Date();
  return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
}

function sunArc(sunrise, sunset, nowHHMM) {
  const u = uid();
  const toMin = (t) => { if (!t) return 0; const [h,m] = t.split(':').map(Number); return h*60+m; };
  const rise = toMin(sunrise), set = toMin(sunset), now = toMin(nowHHMM);
  const daylen = Math.max(60, set - rise);
  let pos = (now - rise) / daylen;
  const isDay = (now >= rise && now <= set);
  pos = Math.max(0, Math.min(1, pos));

  // Параметры дуги: SVG viewBox 400×100 (растянут по горизонтали чтобы дуга
  // охватывала всю ширину карточки). Солнце уменьшено (r_outer=16), чтобы
  // помещалось в верхней точке дуги (peak y=18) и не обрезалось у краёв
  // (отступы X1=20, X2=380 ≥ r_outer).
  const VB_W = 400, VB_CENTER = 200;
  const ARC_X1 = 22, ARC_X2 = VB_W - 22, ARC_Y = 78, ARC_PEAK_Y = 22;
  const cpY = 2 * ARC_PEAK_Y - ARC_Y;
  const sunX = (1-pos)*(1-pos)*ARC_X1 + 2*(1-pos)*pos*VB_CENTER + pos*pos*ARC_X2;
  const sunY = (1-pos)*(1-pos)*ARC_Y + 2*(1-pos)*pos*cpY + pos*pos*ARC_Y;

  // Тики на дуге: 4 промежуточных точки
  const tickPositions = [0.2, 0.4, 0.6, 0.8];
  const ticks = tickPositions.map(t => {
    const tx = (1-t)*(1-t)*ARC_X1 + 2*(1-t)*t*VB_CENTER + t*t*ARC_X2;
    const ty = (1-t)*(1-t)*ARC_Y + 2*(1-t)*t*cpY + t*t*ARC_Y;
    return `<circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="2.8" fill="rgba(255,210,120,0.35)"/>`;
  }).join('');

  const sunriseLabel = `<text x="${ARC_X1}" y="93" text-anchor="middle" fill="rgba(255,200,120,0.85)" font-size="11" font-family="JetBrains Mono, monospace" font-weight="500">${sunrise || ''}</text>`;
  const sunsetLabel  = `<text x="${ARC_X2}" y="93" text-anchor="middle" fill="rgba(255,160,80,0.85)"  font-size="11" font-family="JetBrains Mono, monospace" font-weight="500">${sunset  || ''}</text>`;

  // Солнце — двойной glow + ядро + блик. Только когда день.
  const sunRender = isDay ? `
    <circle cx="${sunX.toFixed(1)}" cy="${sunY.toFixed(1)}" r="20" fill="url(#sg-outer-${u})" opacity="0.55"/>
    <circle cx="${sunX.toFixed(1)}" cy="${sunY.toFixed(1)}" r="13" fill="url(#sg-mid-${u})" opacity="0.85"/>
    <circle cx="${sunX.toFixed(1)}" cy="${sunY.toFixed(1)}" r="8" fill="url(#sg-core-${u})"/>
    <ellipse cx="${(sunX-2).toFixed(1)}" cy="${(sunY-2).toFixed(1)}" rx="2.8" ry="2" fill="rgba(255,255,255,0.7)"/>
  ` : `
    <circle cx="${now < rise ? ARC_X1 : ARC_X2}" cy="${ARC_Y}" r="5" fill="rgba(180,200,230,0.3)" stroke="rgba(180,200,230,0.5)" stroke-width="0.6"/>
  `;

  return `<svg viewBox="0 0 ${VB_W} 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyG-${u}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#7c4dff" stop-opacity="0.18"/>
        <stop offset="30%" stop-color="#ff9966" stop-opacity="0.25"/>
        <stop offset="50%" stop-color="#ffd54f" stop-opacity="0.32"/>
        <stop offset="70%" stop-color="#ff9966" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#7c4dff" stop-opacity="0.18"/>
      </linearGradient>
      <linearGradient id="arcG-${u}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#a78bfa"/>
        <stop offset="25%" stop-color="#fb923c"/>
        <stop offset="50%" stop-color="#facc15"/>
        <stop offset="75%" stop-color="#fb923c"/>
        <stop offset="100%" stop-color="#a78bfa"/>
      </linearGradient>
      <linearGradient id="groundG-${u}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(60,80,120,0.18)"/>
        <stop offset="100%" stop-color="rgba(20,30,60,0)"/>
      </linearGradient>
      <radialGradient id="sg-core-${u}" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#fffbe6"/>
        <stop offset="50%" stop-color="#ffd54f"/>
        <stop offset="100%" stop-color="#ff8a00"/>
      </radialGradient>
      <radialGradient id="sg-mid-${u}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(255,215,100,0.9)"/>
        <stop offset="100%" stop-color="rgba(255,150,40,0)"/>
      </radialGradient>
      <radialGradient id="sg-outer-${u}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(255,200,90,0.7)"/>
        <stop offset="100%" stop-color="rgba(255,150,40,0)"/>
      </radialGradient>
    </defs>
    <path d="M ${ARC_X1} ${ARC_Y} Q ${VB_CENTER} ${cpY} ${ARC_X2} ${ARC_Y} L ${ARC_X2} ${ARC_Y} L ${ARC_X1} ${ARC_Y} Z" fill="url(#skyG-${u})"/>
    <rect x="0" y="${ARC_Y}" width="${VB_W}" height="${100 - ARC_Y}" fill="url(#groundG-${u})"/>
    <line x1="4" y1="${ARC_Y}" x2="${VB_W - 4}" y2="${ARC_Y}" stroke="rgba(255,255,255,0.18)" stroke-width="0.6"/>
    <path d="M ${ARC_X1} ${ARC_Y} Q ${VB_CENTER} ${cpY} ${ARC_X2} ${ARC_Y}" stroke="url(#arcG-${u})" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.75" stroke-dasharray="3,2.5"/>
    ${ticks}
    <circle cx="${ARC_X1}" cy="${ARC_Y}" r="3.6" fill="#a78bfa" opacity="0.85"/>
    <circle cx="${ARC_X2}" cy="${ARC_Y}" r="3.6" fill="#fb923c" opacity="0.85"/>
    ${sunriseLabel}
    ${sunsetLabel}
    ${sunRender}
  </svg>`;
}

function uvGauge(value) {
  const u = uid();
  const max = 11;
  const angle = Math.min(value/max, 1) * 180;
  const colors = ['#4ade80','#facc15','#fb923c','#ef4444','#a855f7'];
  const c = value <= 2 ? colors[0] : value <= 5 ? colors[1] : value <= 7 ? colors[2] : value <= 10 ? colors[3] : colors[4];
  const rad = (angle - 180) * Math.PI / 180;
  const cx = 65, cy = 65, r = 50;
  const ex = cx + r * Math.cos(rad);
  const ey = cy + r * Math.sin(rad);
  const large = angle > 180 ? 1 : 0;
  return `<svg viewBox="0 0 130 75" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="uvBg-${u}" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#4ade80"/><stop offset="25%" stop-color="#facc15"/><stop offset="50%" stop-color="#fb923c"/><stop offset="75%" stop-color="#ef4444"/><stop offset="100%" stop-color="#a855f7"/></linearGradient>
      <filter id="uvG-${u}"><feGaussianBlur stdDeviation="3"/><feFlood flood-color="${c}" flood-opacity="0.8"/><feComposite operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <path d="M 15 65 A 50 50 0 0 1 115 65" stroke="rgba(255,255,255,0.06)" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M 15 65 A 50 50 0 ${large} 1 ${ex} ${ey}" stroke="url(#uvBg-${u})" stroke-width="8" fill="none" stroke-linecap="round" filter="url(#uvG-${u})"/>
    <circle cx="${ex}" cy="${ey}" r="5" fill="${c}" stroke="#fff" stroke-width="1.5" filter="url(#uvG-${u})"/>
  </svg>`;
}

/* ============================================
   SOURCES & BIAS
   ============================================ */

// 8 бесплатных моделей Open-Meteo (7 классических физических + ECMWF AIFS AI) + ансамблевое среднее.
// AIFS — глубокое обучение на ERA5, принципиально иная природа ошибок чем
// у физических моделей → снижает корреляцию ошибок в ансамбле, делая AVG точнее.
// (Google GraphCast у Open-Meteo сейчас не публикует данные — добавим если/когда вернётся.)
const SOURCES = [
  { id: 'avg',       name: 'Среднее по всем моделям', shortName: 'Среднее по 8 моделям', tag: 'AVG',       color: '#00d4ff', model: null },
  { id: 'ecmwf',     name: 'ECMWF IFS 0.25°',          shortName: 'ECMWF',                tag: 'ECMWF',     color: '#60a5fa', model: 'ecmwf_ifs025' },
  { id: 'aifs',      name: 'ECMWF AIFS (AI)',          shortName: 'ECMWF AIFS',           tag: 'AIFS',      color: '#22d3ee', model: 'ecmwf_aifs025_single' },
  { id: 'gfs',       name: 'NOAA GFS',                 shortName: 'GFS',                  tag: 'GFS',       color: '#a78bfa', model: 'gfs_seamless' },
  { id: 'icon',      name: 'DWD ICON',                 shortName: 'ICON',                 tag: 'ICON',      color: '#5eead4', model: 'icon_seamless' },
  { id: 'gem',       name: 'CMC GEM (Канада)',         shortName: 'GEM',                  tag: 'GEM',       color: '#fb923c', model: 'gem_seamless' },
  { id: 'jma',       name: 'JMA (Япония)',             shortName: 'JMA',                  tag: 'JMA',       color: '#facc15', model: 'jma_seamless' },
  { id: 'mf',        name: 'Météo-France',             shortName: 'Météo-France',         tag: 'MF',        color: '#f472b6', model: 'meteofrance_seamless' },
  { id: 'ukmo',      name: 'UK Met Office',            shortName: 'UKMO',                 tag: 'UKMO',      color: '#4ade80', model: 'ukmo_seamless' }
];

function getSrc(id) { return SOURCES.find(s => s.id === id) || SOURCES[0]; }

/* ============================================
   BASELINE FORECAST (= AVG)
   ============================================ */

const BASELINE = [
  { id: 0, name: 'Сегодня', dayName: 'Среда', date: '13.05.2026',
    condition: 'partly-cloudy', condLabel: 'Пасмурно с прояснениями', condDesc: 'Северо-западный фронт, временами морось',
    max: 21, min: 12, precip: 30, wind: 3, windDir: 'СЗ', windGust: 6, humidity: 72, pressure: 756, dewPoint: 11,
    sunrise: '05:13', sunset: '20:11', dayLen: '15ч 19мин',
    moonIllum: 26, moonName: 'Убывающая луна', moonWaxing: false,
    uv: 5, uvLabel: 'Умеренный', aqi: 42, aqiLabel: 'Хорошее',
    hourly: [
      {h:0,t:15,p:35,w:2,c:'cloudy'},{h:1,t:14,p:40,w:2,c:'cloudy'},{h:2,t:14,p:45,w:2,c:'rain'},{h:3,t:13,p:50,w:3,c:'rain'},
      {h:4,t:13,p:45,w:3,c:'rain'},{h:5,t:13,p:40,w:3,c:'rain'},{h:6,t:14,p:35,w:3,c:'cloudy'},{h:7,t:15,p:30,w:3,c:'cloudy'},
      {h:8,t:16,p:25,w:3,c:'partly-cloudy'},{h:9,t:17,p:20,w:3,c:'partly-cloudy'},{h:10,t:18,p:20,w:3,c:'partly-cloudy'},{h:11,t:20,p:15,w:3,c:'partly-cloudy'},
      {h:12,t:21,p:15,w:3,c:'partly-cloudy'},{h:13,t:21,p:20,w:4,c:'partly-cloudy'},{h:14,t:20,p:20,w:4,c:'cloudy'},{h:15,t:19,p:20,w:4,c:'cloudy'},
      {h:16,t:18,p:25,w:3,c:'cloudy'},{h:17,t:17,p:30,w:3,c:'cloudy'},{h:18,t:17,p:35,w:3,c:'cloudy'},{h:19,t:16,p:40,w:3,c:'cloudy'},
      {h:20,t:16,p:45,w:3,c:'cloudy'},{h:21,t:15,p:45,w:2,c:'cloudy'},{h:22,t:15,p:40,w:2,c:'cloudy'},{h:23,t:15,p:35,w:2,c:'cloudy'}
    ] },
  { id: 1, name: 'Чт', dayName: 'Четверг', date: '14.05.2026',
    condition: 'rain', condLabel: 'Дождь', condDesc: 'Активный циклон, сильные осадки днём',
    max: 19, min: 13, precip: 65, wind: 4, windDir: 'З', windGust: 9, humidity: 85, pressure: 752, dewPoint: 13,
    sunrise: '05:12', sunset: '20:13', dayLen: '15ч 21мин',
    moonIllum: 18, moonName: 'Убывающая луна', moonWaxing: false,
    uv: 3, uvLabel: 'Слабый', aqi: 38, aqiLabel: 'Хорошее',
    hourly: [
      {h:0,t:14,p:55,w:3,c:'rain'},{h:1,t:14,p:60,w:3,c:'rain'},{h:2,t:14,p:65,w:3,c:'rain'},{h:3,t:13,p:70,w:3,c:'heavy-rain'},
      {h:4,t:13,p:75,w:4,c:'heavy-rain'},{h:5,t:13,p:75,w:4,c:'heavy-rain'},{h:6,t:14,p:70,w:4,c:'rain'},{h:7,t:14,p:65,w:4,c:'rain'},
      {h:8,t:15,p:60,w:4,c:'rain'},{h:9,t:16,p:55,w:4,c:'rain'},{h:10,t:17,p:55,w:4,c:'rain'},{h:11,t:18,p:60,w:5,c:'rain'},
      {h:12,t:19,p:65,w:5,c:'rain'},{h:13,t:19,p:70,w:5,c:'heavy-rain'},{h:14,t:19,p:75,w:5,c:'heavy-rain'},{h:15,t:18,p:80,w:5,c:'heavy-rain'},
      {h:16,t:17,p:75,w:5,c:'heavy-rain'},{h:17,t:17,p:70,w:4,c:'rain'},{h:18,t:16,p:65,w:4,c:'rain'},{h:19,t:15,p:60,w:4,c:'rain'},
      {h:20,t:15,p:55,w:4,c:'rain'},{h:21,t:14,p:50,w:3,c:'rain'},{h:22,t:14,p:45,w:3,c:'cloudy'},{h:23,t:14,p:40,w:3,c:'cloudy'}
    ] },
  { id: 2, name: 'Пт', dayName: 'Пятница', date: '15.05.2026',
    condition: 'cloudy', condLabel: 'Переменная облачность', condDesc: 'Циклон уходит, остаточная облачность',
    max: 18, min: 11, precip: 25, wind: 4, windDir: 'З', windGust: 8, humidity: 68, pressure: 758, dewPoint: 9,
    sunrise: '05:10', sunset: '20:14', dayLen: '15ч 24мин',
    moonIllum: 11, moonName: 'Старая луна', moonWaxing: false,
    uv: 5, uvLabel: 'Умеренный', aqi: 45, aqiLabel: 'Хорошее',
    hourly: [
      {h:0,t:13,p:35,w:3,c:'cloudy'},{h:1,t:12,p:30,w:3,c:'cloudy'},{h:2,t:12,p:30,w:3,c:'cloudy'},{h:3,t:11,p:25,w:3,c:'cloudy'},
      {h:4,t:11,p:25,w:3,c:'cloudy'},{h:5,t:11,p:20,w:3,c:'cloudy'},{h:6,t:12,p:20,w:3,c:'partly-cloudy'},{h:7,t:13,p:20,w:3,c:'partly-cloudy'},
      {h:8,t:14,p:20,w:3,c:'partly-cloudy'},{h:9,t:15,p:20,w:4,c:'partly-cloudy'},{h:10,t:16,p:20,w:4,c:'partly-cloudy'},{h:11,t:17,p:20,w:4,c:'partly-cloudy'},
      {h:12,t:18,p:20,w:4,c:'partly-cloudy'},{h:13,t:18,p:25,w:4,c:'partly-cloudy'},{h:14,t:18,p:25,w:5,c:'cloudy'},{h:15,t:17,p:30,w:5,c:'cloudy'},
      {h:16,t:17,p:30,w:4,c:'cloudy'},{h:17,t:16,p:30,w:4,c:'cloudy'},{h:18,t:15,p:30,w:4,c:'cloudy'},{h:19,t:14,p:30,w:3,c:'cloudy'},
      {h:20,t:14,p:25,w:3,c:'cloudy'},{h:21,t:13,p:25,w:3,c:'cloudy'},{h:22,t:13,p:25,w:3,c:'cloudy'},{h:23,t:12,p:25,w:3,c:'cloudy'}
    ] },
  { id: 3, name: 'Сб', dayName: 'Суббота', date: '16.05.2026',
    condition: 'clear', condLabel: 'Ясно', condDesc: 'Антициклон, солнечный день',
    max: 20, min: 10, precip: 12, wind: 3, windDir: 'Ю', windGust: 5, humidity: 55, pressure: 762, dewPoint: 7,
    sunrise: '05:09', sunset: '20:16', dayLen: '15ч 27мин',
    moonIllum: 5, moonName: 'Новолуние', moonWaxing: true,
    uv: 7, uvLabel: 'Высокий', aqi: 51, aqiLabel: 'Умеренное',
    hourly: [
      {h:0,t:12,p:15,w:2,c:'clear'},{h:1,t:11,p:15,w:2,c:'clear'},{h:2,t:11,p:10,w:2,c:'clear'},{h:3,t:10,p:10,w:2,c:'clear'},
      {h:4,t:10,p:10,w:2,c:'clear'},{h:5,t:10,p:10,w:2,c:'clear'},{h:6,t:12,p:10,w:2,c:'clear'},{h:7,t:14,p:10,w:3,c:'clear'},
      {h:8,t:15,p:10,w:3,c:'clear'},{h:9,t:16,p:10,w:3,c:'clear'},{h:10,t:18,p:10,w:3,c:'clear'},{h:11,t:19,p:10,w:3,c:'clear'},
      {h:12,t:20,p:10,w:3,c:'clear'},{h:13,t:20,p:15,w:4,c:'partly-cloudy'},{h:14,t:20,p:15,w:4,c:'partly-cloudy'},{h:15,t:19,p:15,w:4,c:'partly-cloudy'},
      {h:16,t:19,p:15,w:4,c:'clear'},{h:17,t:18,p:15,w:3,c:'clear'},{h:18,t:17,p:15,w:3,c:'clear'},{h:19,t:15,p:15,w:3,c:'clear'},
      {h:20,t:14,p:10,w:2,c:'clear'},{h:21,t:13,p:10,w:2,c:'clear'},{h:22,t:12,p:10,w:2,c:'clear'},{h:23,t:11,p:10,w:2,c:'clear'}
    ] },
  { id: 4, name: 'Вс', dayName: 'Воскресенье', date: '17.05.2026',
    condition: 'partly-cloudy', condLabel: 'Малооблачно', condDesc: 'Тепло, юго-восточный ветер',
    max: 23, min: 12, precip: 30, wind: 3, windDir: 'ЮВ', windGust: 6, humidity: 60, pressure: 760, dewPoint: 10,
    sunrise: '05:08', sunset: '20:17', dayLen: '15ч 29мин',
    moonIllum: 2, moonName: 'Новолуние', moonWaxing: true,
    uv: 7, uvLabel: 'Высокий', aqi: 48, aqiLabel: 'Хорошее',
    hourly: [
      {h:0,t:13,p:20,w:2,c:'clear'},{h:1,t:13,p:20,w:2,c:'clear'},{h:2,t:12,p:20,w:2,c:'clear'},{h:3,t:12,p:20,w:2,c:'clear'},
      {h:4,t:12,p:25,w:2,c:'clear'},{h:5,t:12,p:25,w:2,c:'clear'},{h:6,t:14,p:25,w:2,c:'partly-cloudy'},{h:7,t:16,p:25,w:3,c:'partly-cloudy'},
      {h:8,t:17,p:25,w:3,c:'partly-cloudy'},{h:9,t:19,p:25,w:3,c:'partly-cloudy'},{h:10,t:20,p:25,w:3,c:'partly-cloudy'},{h:11,t:21,p:30,w:3,c:'partly-cloudy'},
      {h:12,t:22,p:30,w:3,c:'partly-cloudy'},{h:13,t:23,p:35,w:4,c:'cloudy'},{h:14,t:23,p:35,w:4,c:'cloudy'},{h:15,t:22,p:40,w:4,c:'cloudy'},
      {h:16,t:21,p:35,w:4,c:'cloudy'},{h:17,t:20,p:35,w:3,c:'cloudy'},{h:18,t:19,p:30,w:3,c:'partly-cloudy'},{h:19,t:17,p:25,w:3,c:'partly-cloudy'},
      {h:20,t:16,p:25,w:2,c:'partly-cloudy'},{h:21,t:15,p:25,w:2,c:'clear'},{h:22,t:14,p:25,w:2,c:'clear'},{h:23,t:13,p:25,w:2,c:'clear'}
    ] }
];

// NOW_HOUR — обновляется автоматически из системного времени при каждом applyAll().
// Захардкоженное значение 23 нужно только до первого applyAll() (рендер не должен упасть).
let NOW_HOUR = 23;

// ACTIVE_FORECAST_BY_MODEL — { sourceId: forecast[5days] }
// Заполняется после fetch Open-Meteo (parseAllModels).
// До первого успешного fetch все источники возвращают BASELINE.
let ACTIVE_FORECAST_BY_MODEL = {};

/* ============================================
   DERIVE PER-SOURCE DATA
   ============================================ */

function getForecast(sourceId) {
  const data = ACTIVE_FORECAST_BY_MODEL[sourceId];
  if (data && data.length > 0) {
    const avg = ACTIVE_FORECAST_BY_MODEL.avg;
    // Глубокая копия с подмешиванием UV из avg, если у этой модели его нет
    // (только GFS из 8 бесплатных моделей выдаёт UV — для остальных он null)
    const copy = data.map((d, i) => {
      const out = {...d, hourly: d.hourly.map(h => ({...h}))};
      if (out.uv == null && avg && avg[i] && avg[i].uv != null) {
        out.uv = avg[i].uv;
        out.uvLabel = avg[i].uvLabel;
      }
      return out;
    });
    // v1.35.1: пост-калибровка по накопленному bias.
    // Если у модели есть стабильное смещение vs actual — компенсируем.
    return applyBiasCorrection(copy, sourceId);
  }
  // fallback: avg или BASELINE
  const fb = ACTIVE_FORECAST_BY_MODEL.avg || BASELINE;
  const copy = fb.map(d => ({...d, hourly: d.hourly.map(h => ({...h}))}));
  // Bias применяется только если реальный fetch состоялся (fb === avg).
  // BASELINE — статика, корректировать нечего.
  if (ACTIVE_FORECAST_BY_MODEL.avg) {
    return applyBiasCorrection(copy, 'avg');
  }
  return copy;
}

// Совместимость: некоторые места кода ссылаются на ACTIVE_FORECAST как на главный массив (демо или avg).
// Возвращаем avg если есть, иначе BASELINE.
function getActiveForecast() {
  return ACTIVE_FORECAST_BY_MODEL.avg || BASELINE;
}

function colorForAQI(v) {
  if (v <= 50) return { c: '#4ade80', bg: 'rgba(74,222,128,0.15)', br: 'rgba(74,222,128,0.3)' };
  if (v <= 100) return { c: '#facc15', bg: 'rgba(250,204,21,0.15)', br: 'rgba(250,204,21,0.3)' };
  if (v <= 150) return { c: '#fb923c', bg: 'rgba(251,146,60,0.15)', br: 'rgba(251,146,60,0.3)' };
  if (v <= 200) return { c: '#ef4444', bg: 'rgba(239,68,68,0.15)', br: 'rgba(239,68,68,0.3)' };
  return { c: '#a855f7', bg: 'rgba(168,85,247,0.15)', br: 'rgba(168,85,247,0.3)' };
}

function colorForUV(v) {
  if (v <= 2) return { c: '#4ade80', bg: 'rgba(74,222,128,0.15)', br: 'rgba(74,222,128,0.3)' };
  if (v <= 5) return { c: '#facc15', bg: 'rgba(250,204,21,0.15)', br: 'rgba(250,204,21,0.3)' };
  if (v <= 7) return { c: '#fb923c', bg: 'rgba(251,146,60,0.15)', br: 'rgba(251,146,60,0.3)' };
  if (v <= 10) return { c: '#ef4444', bg: 'rgba(239,68,68,0.15)', br: 'rgba(239,68,68,0.3)' };
  return { c: '#a855f7', bg: 'rgba(168,85,247,0.15)', br: 'rgba(168,85,247,0.3)' };
}

/* ============================================
   STATE & RENDER
   ============================================ */

// Восстанавливаем выбранный источник из localStorage, чтобы pull-to-refresh
// (и любой reload) не сбрасывал выбор на 'avg'. Дефолт — 'avg'.
const SOURCE_STORAGE_KEY = 'kw:source:v1';
let currentSourceId = (function() {
  try {
    const v = localStorage.getItem(SOURCE_STORAGE_KEY);
    return (v && typeof v === 'string') ? v : 'avg';
  } catch (e) { return 'avg'; }
})();
let modalChartInstance = null;
let precipChartInstance = null;
// Активная метрика почасовой карточки: 'temp' | 'feels' | 'precip' | 'wind' | 'pressure'
let currentHourlyMetric = 'temp';
// Отдельная метрика для модалки дня (сбрасывается на 'temp' при каждом открытии).
let currentModalMetric = 'temp';

function getCurrentSource() { return getSrc(currentSourceId); }

// Тёмные варианты source-цветов для светлой темы — бирюзовый/циан/пастельные
// сливаются с peach-фоном, поэтому в light режиме показываем насыщенные
// тёплые/глубокие варианты тех же оттенков.
const SOURCE_COLORS_LIGHT = {
  avg:       '#c0532a',  // terracotta вместо cyan
  ecmwf:     '#2563eb',  // deep blue
  aifs:      '#0891b2',  // deep cyan
  gfs:       '#7c3aed',  // deep purple
  icon:      '#0d9488',  // teal-dark
  gem:       '#ea580c',  // orange-dark
  jma:       '#ca8a04',  // gold-dark
  mf:        '#db2777',  // pink-dark
  ukmo:      '#16a34a'   // green-dark
};
function effectiveSourceColor(s) {
  if (state.theme && resolveTheme(state.theme) === 'light') {
    return SOURCE_COLORS_LIGHT[s.id] || s.color;
  }
  return s.color;
}
function applySourceTheme() {
  const s = getCurrentSource();
  const color = effectiveSourceColor(s);
  const root = document.documentElement;
  root.style.setProperty('--src-color', color);
  root.style.setProperty('--src-bg', hexToRgba(color, 0.18));
  root.style.setProperty('--src-glow', hexToRgba(color, 0.25));
}

function renderSourceIndicator() {
  const s = getCurrentSource();
  document.getElementById('sourceIndicatorName').textContent = localizeSourceName(s);
  document.getElementById('chartSourceSub').textContent =
    s.id === 'avg' ? t('chart.sub.avg') : t('chart.sub.named', { name: s.name });
}

// === Hero scene (Этап 1: фоновая сцена по времени суток) ===
// Вычисляет time-of-day из sunrise/sunset и применяет соответствующий фон + светило.
function computeTimeOfDay(today) {
  const hhmmToMin = (s) => { if (!s || typeof s !== 'string') return null; const [h,m] = s.split(':').map(Number); return (h|0)*60 + (m|0); };
  const now = new Date();
  const nowMin = now.getHours()*60 + now.getMinutes();
  const riseMin = hhmmToMin(today.sunrise) ?? 360;
  const setMin  = hhmmToMin(today.sunset)  ?? 1200;
  // Окна сужены до естественных по civil-twilight:
  //   dawn: за 40 мин до восхода → +50 мин после (момент рассвета + утреннее освещение)
  //   day:  +50 мин после восхода → -50 мин до заката (большая часть дня)
  //   dusk: -50 мин до заката → +25 мин после заката (момент заката + civil twilight)
  //   night: +25 мин после заката и далее (как только сумерки заканчиваются)
  // Раньше dusk тянулся +60 мин после заката, и в 21:30 (при закате 20:50) показывался
  // оранжевый dusk-фото, хотя визуально уже ночь.
  if (nowMin >= riseMin - 40 && nowMin < riseMin + 50) return { tod: 'dawn', nowMin, riseMin, setMin };
  if (nowMin >= riseMin + 50 && nowMin < setMin - 50)  return { tod: 'day', nowMin, riseMin, setMin };
  if (nowMin >= setMin - 50 && nowMin < setMin + 25)   return { tod: 'dusk', nowMin, riseMin, setMin };
  return { tod: 'night', nowMin, riseMin, setMin };
}

// Детерминированные «случайные» точки для звёзд (mulberry32 seed)
function seededRand(seed) {
  let s = seed >>> 0;
  return () => { s = (s + 0x6D2B79F5) | 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// Группировка condition + cloud cover → фото-сцена.
// 4 уровня: clear (cl<15) / partly (15-50) / cloudy (50-85) / overcast (≥85 ИЛИ активные осадки).
// При активной погоде (дождь/снег/гроза/туман) — overcast как тяжёлый базовый фон, поверх него рисуем частицы.
function conditionGroup(cond, cloudCoverPct) {
  // Активные осадки/гроза/туман → overcast (тяжёлый базовый фон, частицы поверх)
  if (cond === 'rain' || cond === 'heavy-rain' || cond === 'snow'
      || cond === 'thunderstorm' || cond === 'fog' || cond === 'overcast') {
    return 'overcast';
  }
  // Если есть точная облачность из API — используем её
  if (cloudCoverPct != null && Number.isFinite(cloudCoverPct)) {
    if (cloudCoverPct < 15) return 'clear';
    if (cloudCoverPct < 50) return 'partly';
    if (cloudCoverPct < 85) return 'cloudy';
    return 'overcast';
  }
  // Fallback по строковому condition
  switch (cond) {
    case 'clear':         return 'clear';
    case 'partly-cloudy': return 'partly';
    case 'cloudy':        return 'cloudy';
    default:              return 'cloudy';
  }
}

// Реально присутствующие в `assets/scenes/` варианты condition-группы.
// Если кода ожидает grp которого нет в наборе — мапим на ближайший существующий.
// При появлении новых фото просто добавляй ключ в Set ниже.
const EXISTING_SCENE_VARIANTS = new Set(['clear', 'partly', 'cloudy', 'overcast']);
const SCENE_VARIANT_FALLBACK = { partly: 'clear', overcast: 'cloudy' };
function pickSceneVariant(grp) {
  if (EXISTING_SCENE_VARIANTS.has(grp)) return grp;
  return SCENE_VARIANT_FALLBACK[grp] || 'cloudy';
}

// Тип погодных частиц поверх фото (Этап 2)
function precipitationType(cond) {
  if (cond === 'rain' || cond === 'heavy-rain') return 'rain';
  if (cond === 'snow') return 'snow';
  if (cond === 'fog') return 'fog';
  if (cond === 'thunderstorm') return 'thunderstorm';
  return null;
}

// Генераторы частиц. Каждый возвращает HTML-фрагмент для .hs-bg.
function rainHtml(count, speedMult = 1.0) {
  let html = '';
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const dur = (0.55 + Math.random() * 0.45) * speedMult;
    const delay = -Math.random() * dur;
    const opacity = 0.6 + Math.random() * 0.4;
    html += `<div class="hs-raindrop" style="left:${x.toFixed(1)}%;animation-duration:${dur.toFixed(2)}s;animation-delay:${delay.toFixed(2)}s;opacity:${opacity.toFixed(2)}"></div>`;
  }
  return html;
}

function snowHtml(count, speedMult = 1.0) {
  let html = '';
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const size = 3 + Math.random() * 4;
    const fallDur = (5 + Math.random() * 4) * speedMult;
    const swayDur = 2 + Math.random() * 2;
    const fallDelay = -Math.random() * fallDur;
    const swayDelay = -Math.random() * swayDur;
    const opacity = 0.55 + Math.random() * 0.4;
    html += `<div class="hs-snowflake" style="left:${x.toFixed(1)}%;width:${size.toFixed(1)}px;height:${size.toFixed(1)}px;animation-duration:${fallDur.toFixed(2)}s,${swayDur.toFixed(2)}s;animation-delay:${fallDelay.toFixed(2)}s,${swayDelay.toFixed(2)}s;opacity:${opacity.toFixed(2)}"></div>`;
  }
  return html;
}

function fogHtml() {
  // 3 слоя на разных высотах и скоростях для глубины
  return `
    <div class="hs-fogband" style="top:30%;animation-duration:24s"></div>
    <div class="hs-fogband" style="top:55%;height:80px;opacity:0.85;animation-duration:32s;animation-direction:reverse"></div>
    <div class="hs-fogband" style="top:75%;height:50px;opacity:0.75;animation-duration:18s"></div>
  `;
}

function lightningHtml() {
  return `<div class="hs-lightning"></div>`;
}

// Далёкая гроза — для condition не "thunderstorm", но при высоком грозовом риске.
// intensity 0..1: чем выше risk (3 или 4), тем ярче вспышка.
function distantLightningHtml(intensity = 0.55) {
  return `<div class="hs-lightning-distant" style="--ld-int:${intensity.toFixed(2)}"></div>`;
}

// Горизонтальные стрики ветра (для штормового ветра >12 м/с)
function windStreaksHtml(count = 8) {
  let html = '';
  for (let i = 0; i < count; i++) {
    const y = 8 + Math.random() * 75;
    const width = 60 + Math.random() * 140;
    const dur = 0.4 + Math.random() * 0.6;
    const delay = -Math.random() * dur;
    const opacity = 0.4 + Math.random() * 0.5;
    html += `<div class="hs-windstreak" style="top:${y.toFixed(1)}%;width:${width.toFixed(0)}px;animation-duration:${dur.toFixed(2)}s;animation-delay:${delay.toFixed(2)}s;opacity:${opacity.toFixed(2)}"></div>`;
  }
  return html;
}

// Этап 3: уровни интенсивности и ветра из API
function precipIntensityLevel(mmPerHour) {
  if (mmPerHour >= 10) return 'heavy';   // ливень
  if (mmPerHour >= 4)  return 'moderate';// умеренный
  return 'light';
}
function windLevel(ms) {
  if (ms >= 12) return 'storm';
  if (ms >= 6)  return 'windy';
  return 'calm';
}
// Множители количества частиц по интенсивности
const INTENSITY_MULT = { light: 1.0, moderate: 1.5, heavy: 2.0 };
// Множитель длительности падения (меньше = быстрее)
const INTENSITY_SPEED = { light: 1.0, moderate: 0.77, heavy: 0.65 };

function renderHeroScene(today) {
  const sceneEl = document.querySelector('#heroBlock .hero-scene');
  const bgEl = document.getElementById('heroSceneBg');
  const heroEl = document.getElementById('heroBlock');
  if (!sceneEl || !bgEl || !heroEl) return;
  const auto = computeTimeOfDay(today).tod;
  const tod = window.__heroTodOverride || auto;
  if (heroEl.dataset.tod !== tod) heroEl.dataset.tod = tod;
  // Фон, частицы и group берём по СОСТОЯНИЮ ТЕКУЩЕГО ЧАСА, а не по дневному агрегату.
  // Иначе hero весь день показывает «дождь», если он ожидается в 13:00.
  const _nowHForScene = (today.hourly && today.hourly[NOW_HOUR]) || null;
  const _hourCondForScene = hourSurfaceCondition(_nowHForScene, today.condition);
  // Cloud cover из API (поле hourly.cloud_cover), если есть. Иначе fallback на condition.
  const _cloudPct = (_nowHForScene && typeof _nowHForScene.cl === 'number') ? _nowHForScene.cl : null;
  const grp = window.__heroCondOverride || conditionGroup(_hourCondForScene, _cloudPct);
  if (heroEl.dataset.cond !== grp) heroEl.dataset.cond = grp;
  // Один набор фото для обеих тем; в light-теме осветление делается CSS-фильтром
  // на dawn/day сценах (см. style.css).
  // Если конкретного фото для группы ещё нет в наборе — fallback на ближайшую
  // визуально похожую (partly→clear как «небо в основном открытое»,
  // overcast→cloudy как «плотная облачность»). По мере пополнения фото
  // расширяем EXISTING_SCENE_VARIANTS.
  const fileGrp = pickSceneVariant(grp);
  const scenePath = `assets/scenes/${tod}-${fileGrp}.webp`;
  sceneEl.style.backgroundImage = `url('${scenePath}')`;
  // Данные текущего часа для интенсивности и ветра
  const nowH = (today.hourly && today.hourly[NOW_HOUR]) || {};
  const mmH = (typeof nowH.pmm === 'number') ? nowH.pmm : 0;
  const windMs = (typeof nowH.w === 'number') ? nowH.w : (today.wind || 0);
  const intensity = window.__heroIntensityOverride || precipIntensityLevel(mmH);
  const wind = window.__heroWindOverride || windLevel(windMs);
  // Мобильная оптимизация — меньше частиц на узких экранах
  const isMobile = window.matchMedia && window.matchMedia('(max-width: 680px)').matches;
  const mobileMult = isMobile ? 0.6 : 1.0;
  bgEl.dataset.wind = wind;
  bgEl.dataset.intensity = intensity;
  // Тип частиц — тоже от текущего часа: если сейчас сухо, не льём капли.
  const precip = window.__heroPrecipOverride || precipitationType(_hourCondForScene);
  const mult = INTENSITY_MULT[intensity] * mobileMult;
  const speedMult = INTENSITY_SPEED[intensity];
  let particlesHtml = '';
  if (precip === 'rain')               particlesHtml = rainHtml(Math.round(45 * mult), speedMult);
  else if (precip === 'snow')          particlesHtml = snowHtml(Math.round(40 * mult), speedMult);
  else if (precip === 'fog')           particlesHtml = fogHtml();
  else if (precip === 'thunderstorm')  particlesHtml = rainHtml(Math.round(50 * mult), speedMult) + lightningHtml();
  // Этап 4: молнии-предчувствие. Если condition НЕ гроза, но грозовой риск ≥3 — добавляем редкие далёкие вспышки.
  const stormRiskRaw = (typeof stormRiskLevel === 'function') ? stormRiskLevel(nowH) : 0;
  const risk = (window.__heroStormRiskOverride != null) ? window.__heroStormRiskOverride : stormRiskRaw;
  if (precip !== 'thunderstorm' && risk >= 3) {
    const flashInt = risk >= 4 ? 0.8 : 0.55;
    particlesHtml += distantLightningHtml(flashInt);
  }
  // Стрики ветра — независимый слой, для любых сцен при штормовом ветре
  if (wind === 'storm') particlesHtml += windStreaksHtml(isMobile ? 6 : 10);
  bgEl.innerHTML = particlesHtml;
}

// Debug helpers для DevTools.
// previewHero('night'|'dawn'|'day'|'dusk'|'auto') — подмена time-of-day
// previewCond('clear'|'partly'|'cloudy'|'overcast'|'auto') — подмена condition-группы
window.previewHero = function(tod) {
  window.__heroTodOverride = (tod === 'auto' || !tod) ? null : tod;
  const af = ACTIVE_FORECAST_BY_MODEL && (ACTIVE_FORECAST_BY_MODEL.avg || ACTIVE_FORECAST_BY_MODEL[Object.keys(ACTIVE_FORECAST_BY_MODEL)[0]]);
  if (af && af[0]) renderHeroScene(af[0]);
  console.log('Hero TOD →', window.__heroTodOverride || 'auto');
};
window.previewCond = function(grp) {
  window.__heroCondOverride = (grp === 'auto' || !grp) ? null : grp;
  const af = ACTIVE_FORECAST_BY_MODEL && (ACTIVE_FORECAST_BY_MODEL.avg || ACTIVE_FORECAST_BY_MODEL[Object.keys(ACTIVE_FORECAST_BY_MODEL)[0]]);
  if (af && af[0]) renderHeroScene(af[0]);
  console.log('Hero cond-group →', window.__heroCondOverride || 'auto');
};
// previewPrecip('rain'|'snow'|'fog'|'thunderstorm'|'none'|'auto') — подмена типа частиц
window.previewPrecip = function(precip) {
  if (precip === 'auto' || !precip) window.__heroPrecipOverride = null;
  else if (precip === 'none') window.__heroPrecipOverride = 'none';
  else window.__heroPrecipOverride = precip;
  const af = ACTIVE_FORECAST_BY_MODEL && (ACTIVE_FORECAST_BY_MODEL.avg || ACTIVE_FORECAST_BY_MODEL[Object.keys(ACTIVE_FORECAST_BY_MODEL)[0]]);
  if (af && af[0]) renderHeroScene(af[0]);
  console.log('Hero precip →', window.__heroPrecipOverride || 'auto');
};
// previewIntensity('light'|'moderate'|'heavy'|'auto') — плотность и скорость
window.previewIntensity = function(level) {
  window.__heroIntensityOverride = (level === 'auto' || !level) ? null : level;
  const af = ACTIVE_FORECAST_BY_MODEL && (ACTIVE_FORECAST_BY_MODEL.avg || ACTIVE_FORECAST_BY_MODEL[Object.keys(ACTIVE_FORECAST_BY_MODEL)[0]]);
  if (af && af[0]) renderHeroScene(af[0]);
  console.log('Hero intensity →', window.__heroIntensityOverride || 'auto');
};
// previewWind('calm'|'windy'|'storm'|'auto') — наклон + стрики
window.previewWind = function(level) {
  window.__heroWindOverride = (level === 'auto' || !level) ? null : level;
  const af = ACTIVE_FORECAST_BY_MODEL && (ACTIVE_FORECAST_BY_MODEL.avg || ACTIVE_FORECAST_BY_MODEL[Object.keys(ACTIVE_FORECAST_BY_MODEL)[0]]);
  if (af && af[0]) renderHeroScene(af[0]);
  console.log('Hero wind →', window.__heroWindOverride || 'auto');
};
// previewStorm(0..4 | 'auto') — грозовой риск для теста далёких вспышек
window.previewStorm = function(risk) {
  window.__heroStormRiskOverride = (risk === 'auto' || risk == null) ? null : Number(risk);
  const af = ACTIVE_FORECAST_BY_MODEL && (ACTIVE_FORECAST_BY_MODEL.avg || ACTIVE_FORECAST_BY_MODEL[Object.keys(ACTIVE_FORECAST_BY_MODEL)[0]]);
  if (af && af[0]) renderHeroScene(af[0]);
  console.log('Hero storm risk →', window.__heroStormRiskOverride != null ? window.__heroStormRiskOverride : 'auto');
};

function renderHeroAndMetrics(forecast) {
  const s = getCurrentSource();
  const today = forecast[0];
  const nowH = today.hourly[NOW_HOUR];
  renderHeroScene(today);
  // Иконка и текст состояния — для ТЕКУЩЕГО часа, не для всех суток.
  const hourCond = hourSurfaceCondition(nowH, today.condition);
  document.getElementById('heroIcon').innerHTML = weatherIcon(hourCond, 170);

  document.getElementById('heroTempNum').textContent = fmtTempNum(nowH.t);
  document.getElementById('heroTempUnit').textContent = unitTemp();
  document.getElementById('heroCondition').textContent = localizeCondLabel(hourCondToLabelRu(hourCond));

  // Feels-like: предпочитаем apparent_temperature из API, fallback на грубую формулу
  const feelsC = (nowH.feels != null) ? nowH.feels : (nowH.t - Math.max(0, nowH.w - 2) * 0.5);
  const feelsStr = `<strong>${fmtTemp(feelsC)}</strong>`;
  // Выбираем строку в зависимости от времени дня (до восхода / днём / после заката)
  const hhmmToMin = (s) => { if (!s || typeof s !== 'string') return null; const [h,m] = s.split(':').map(Number); return (h|0)*60 + (m|0); };
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const riseMin = hhmmToMin(today.sunrise);
  const setMin  = hhmmToMin(today.sunset);
  let feelsKey = 'hero.feels';
  if (riseMin != null && setMin != null) {
    if (nowMin < riseMin)      feelsKey = 'hero.feelsBeforeSunrise';
    else if (nowMin > setMin)  feelsKey = 'hero.feelsAfterSunset';
    else                       feelsKey = 'hero.feelsBeforeSunset';
  }
  document.getElementById('heroFeelsLine').innerHTML =
    t(feelsKey, { feels: feelsStr, sunrise: today.sunrise, sunset: today.sunset });

  const srcName = `<span class="src-name">${localizeSourceFullName(s)}</span>`;
  let sourceNoteHtml = t('hero.sourceNote', { name: srcName });
  // Если выбрано "Среднее" — рядом показываем согласие моделей. Для конкретной модели метрика бессмысленна.
  if (s.id === 'avg') {
    const avgToday = ACTIVE_FORECAST_BY_MODEL.avg && ACTIVE_FORECAST_BY_MODEL.avg[0];
    if (avgToday && avgToday.confidence != null) {
      const cls = confidenceClass(avgToday.confidence);
      const tooltipText = t('confidence.tooltip', { n: avgToday.modelCount || 7, range: avgToday.tempRange != null ? avgToday.tempRange : '?' });
      sourceNoteHtml += ` <span class="hero-conf cc-${cls}" title="${tooltipText}"><span class="hc-dot"></span><span class="hc-val">${avgToday.confidence}%</span></span>`;
    }
  }
  document.getElementById('heroSourceNote').innerHTML = sourceNoteHtml;

  // Подсказка точности — кликабельный chip с лидером (или подтверждением, что AVG лучший).
  renderHeroAccuracyHint();
  // v1.39.0: 15-минутный nowcast осадков (когда начнётся / закончится дождь).
  renderHeroNowcastHint();

  document.getElementById('metricWind').innerHTML =
    `${fmtWind(today.wind, {withUnit:false})}<span>${unitWind()}</span>`;
  document.getElementById('metricWindSub').textContent =
    t('metric.windSub', { dir: localizeWindDirFull(today.windDir), gust: fmtWind(today.windGust) });

  // Для конкретных моделей Open-Meteo НЕ возвращает precipitation_probability_max
  // (это поле есть только в ensemble/best_match). Приходит 0. Если так —
  // оценим % синтетически: из max hourly probability за сегодня, либо
  // (если и hourly probability пуст) из доли часов с pmm > 0.1.
  let dayPrecipPct = today.precip || 0;
  if (dayPrecipPct === 0 && today.hourly && Array.isArray(today.hourly)) {
    let wetHours = 0;
    let maxHourlyProb = 0;
    let totalHours = 0;
    for (const h of today.hourly) {
      totalHours++;
      if ((h.pmm || 0) > 0.1) wetHours++;
      if (typeof h.p === 'number' && h.p > maxHourlyProb) maxHourlyProb = h.p;
    }
    if (maxHourlyProb > 0) {
      dayPrecipPct = maxHourlyProb;
    } else if (wetHours > 0 && totalHours > 0) {
      dayPrecipPct = Math.max(15, Math.round((wetHours / totalHours) * 100));
    }
  }
  document.getElementById('metricRain').innerHTML = `${dayPrecipPct}<span>%</span>`;
  // Считаем сумму осадков с ТЕКУЩЕГО часа до конца суток — это то, что юзер
  // видит на почасовом графике «Детали осадков» (он показывает будущие часы).
  // Так плитка визуально совпадает с графиком. Если будущих часов нет
  // (например, сейчас 23:50) или сумма ~0 — fallback на daily.precipSum
  // (полные сутки) или старую аппроксимацию.
  // Считаем сумму осадков и пиковую интенсивность с ТЕКУЩЕГО часа до конца
  // суток — обе метрики берутся из того же массива hourly, что использует
  // почасовой график «Детали осадков». Сумма (мм) и пик (мм/ч) — разные
  // метрики, юзер видит обе для контекста.
  let mm = 0;
  let peak = 0;
  if (today.hourly && Array.isArray(today.hourly)) {
    for (let i = NOW_HOUR; i < today.hourly.length; i++) {
      const v = today.hourly[i]?.pmm;
      if (typeof v === 'number') {
        mm += v;
        if (v > peak) peak = v;
      }
    }
    mm = Math.round(mm * 10) / 10;
    peak = Math.round(peak * 10) / 10;
  }
  if (mm <= 0) {
    mm = (typeof today.precipSum === 'number' && today.precipSum > 0)
      ? today.precipSum
      : Math.max(0, Math.round(today.precip * 0.07 * 10) / 10);
  }
  // Подпись: «пик 0.2 мм/ч · 0.7 мм всего · слабый дождь»
  // (если pик 0 — показываем только описание; если сумма 0 — лаконичнее)
  const desc = t(precipDescKey(dayPrecipPct));
  let subText;
  if (peak > 0) {
    subText = `пик ${peak} мм/ч · (${mm} мм всего) · ${desc}`;
  } else if (mm > 0) {
    subText = `${mm} мм · ${desc}`;
  } else {
    subText = desc;
  }
  document.getElementById('metricRainSub').textContent = subText;

  document.getElementById('metricPressure').innerHTML =
    `${fmtPressure(today.pressure, {withUnit:false})}<span>${unitPressure()}</span>`;
  // Тренд берём из API (изменение давления за 6 часов), fallback на абсолютное значение
  const trend = today.pressureTrend
    || (today.pressure < 755 ? 'falling' : today.pressure > 760 ? 'rising' : 'stable');
  document.getElementById('metricPressureSub').textContent = t('metric.pressure.' + trend);

  document.getElementById('metricHumidity').innerHTML = `${today.humidity}<span>%</span>`;
  document.getElementById('metricHumiditySub').textContent =
    t('metric.humidity.dewPoint', { t: fmtTemp(today.dewPoint) });
}

// === DEBUG: dumpAccuracy() в DevTools console — показывает ВСЕ накопленные записи
// по ВСЕМ локациям в localStorage. Полезно если непонятно, почему счётчик замеров
// застрял на 1 — часто оказывается, что данные разбросаны по нескольким ключам
// (разные координаты при переключении геолокации / городов).
window.dumpAccuracy = function() {
  console.group('📊 Accuracy storage dump');
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('kw:accuracy:')) keys.push(k);
  }
  if (keys.length === 0) {
    console.log('Нет accuracy-ключей в localStorage.');
    console.groupEnd();
    return;
  }
  console.log(`Найдено ${keys.length} accuracy-ключей:`);
  let totalRecords = 0;
  let totalWithActual = 0;
  for (const k of keys) {
    try {
      const data = JSON.parse(localStorage.getItem(k));
      const records = (data && data.records) || [];
      const withActual = records.filter(r => r.actual).length;
      totalRecords += records.length;
      totalWithActual += withActual;
      console.log(`%c${k}`, 'color:#5eead4;font-weight:bold');
      console.log(`  всего записей: ${records.length}, с actual (= замер): ${withActual}`);
      if (records.length > 0) {
        const firstDate = records[0].date;
        const lastDate = records[records.length - 1].date;
        console.log(`  даты: ${firstDate} … ${lastDate}`);
        const noActualDates = records.filter(r => !r.actual).map(r => r.date);
        if (noActualDates.length > 0) {
          console.log(`  ⚠ записи БЕЗ actual: ${noActualDates.join(', ')}`);
        }
      }
    } catch (e) {
      console.error(`  ошибка парсинга ${k}: ${e.message}`);
    }
  }
  console.log('');
  console.log(`%cИТОГО: ${totalRecords} записей, ${totalWithActual} замеров`, 'color:#fbbf24;font-weight:bold');
  if (keys.length > 1) {
    console.log('%c⚠ Несколько ключей — данные разбросаны по разным локациям!', 'color:#fca5a5');
    console.log('   Чтобы слить — см. mergeAccuracyKeys() ниже.');
  }
  console.groupEnd();
};

// Полная очистка всех accuracy-ключей. Использовать когда накопленные данные
// размазаны / неверны и нужно начать с нуля.
window.resetAccuracy = function() {
  const toRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('kw:accuracy:')) toRemove.push(k);
  }
  for (const k of toRemove) localStorage.removeItem(k);
  // Также сбросить in-memory кэш миграций — на случай повторного запуска без F5
  if (typeof _accuracyMigratedKeys !== 'undefined') _accuracyMigratedKeys.clear();
  console.log(`🗑 Удалено ${toRemove.length} accuracy-ключ(ей). Перезагрузи F5 — accuracy начнётся с нуля.`);
};

// Сливает все accuracy-ключи в один, привязанный к текущей локации.
// Полезно если данные накопились в разных ключах из-за смены координат.
window.mergeAccuracyKeys = function() {
  if (!currentLocation || currentLocation.lat == null) {
    console.warn('Текущая локация не определена.');
    return;
  }
  const targetKey = `kw:accuracy:${currentLocation.lat.toFixed(2)}_${currentLocation.lon.toFixed(2)}:v1`;
  const allRecords = new Map(); // date → record (приоритет: записи с actual)
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('kw:accuracy:')) keys.push(k);
  }
  for (const k of keys) {
    try {
      const data = JSON.parse(localStorage.getItem(k));
      const records = (data && data.records) || [];
      for (const r of records) {
        const existing = allRecords.get(r.date);
        // Сохраняем запись с actual если выбираем между двумя
        if (!existing || (!existing.actual && r.actual)) {
          allRecords.set(r.date, r);
        }
      }
    } catch (e) {}
  }
  const merged = Array.from(allRecords.values()).sort((a, b) => a.date.localeCompare(b.date));
  // Удаляем старые ключи
  for (const k of keys) {
    if (k !== targetKey) localStorage.removeItem(k);
  }
  localStorage.setItem(targetKey, JSON.stringify({ records: merged }));
  console.log(`✅ Слито ${keys.length} ключей в ${targetKey}: ${merged.length} записей, ${merged.filter(r => r.actual).length} замеров.`);
  console.log('Перезагрузи страницу (F5), чтобы UI подтянул объединённые данные.');
};

// === DEBUG: dumpWeights() — показывает текущие AVG-веса по моделям. ===
// Веса считаются из ACCURACY_STATE (composite MAE по последним замерам).
// При недостаточных данных — uniform.
window.dumpWeights = function() {
  const modelIds = SOURCES.filter(s => s.model).map(s => s.id);
  const weights = computeEnsembleWeights(modelIds);
  const state = ACCURACY_STATE || { stats: {} };
  console.log(`AVG-веса (доля в ансамбле, %):`);
  console.log(`Правила: n < ${WEIGHT_MIN_SAMPLES} — uniform; иначе w = 1/(composite_MAE + ${WEIGHT_EPSILON}).\n`);
  const rows = modelIds.map(id => {
    const s = state.stats[id];
    const composite = s ? (typeof accuracyComposite === 'function' ? accuracyComposite(s) : null) : null;
    const w = weights.get(id);
    return {
      id,
      n: s ? (s.n || 0) : 0,
      compositeMAE: composite != null ? composite.toFixed(2) : '—',
      pct: (w * 100).toFixed(1) + '%'
    };
  });
  rows.sort((a, b) => parseFloat(b.pct) - parseFloat(a.pct));
  for (const r of rows) {
    console.log(`${r.id.padEnd(10)} n=${r.n.toString().padStart(2)}  composite=${r.compositeMAE.padStart(6)}  weight=${r.pct.padStart(6)}`);
  }
  const total = rows.reduce((s, r) => s + parseFloat(r.pct), 0);
  console.log(`sum: ${total.toFixed(1)}%`);
};

// === DEBUG: dumpBias() — показывает текущие bias-коррекции по моделям. ===
// Полезно чтобы понять, какие модели систематически завышают/занижают,
// и какая коррекция реально применяется к показанному прогнозу.
window.dumpBias = function() {
  const state = (typeof ACCURACY_STATE !== 'undefined') ? ACCURACY_STATE : null;
  if (!state || !state.stats || Object.keys(state.stats).length === 0) {
    console.log('Bias-данных пока нет. Накопи замеры (см. dumpAccuracy()).');
    return;
  }
  console.log(`Bias по моделям (предсказание - факт, в °C для T и % для precip):`);
  console.log(`Правила: n < ${BIAS_MIN_SAMPLES} → нет коррекции; n ≥ ${BIAS_FULL_SAMPLES} → полная коррекция.`);
  console.log(`Cap: ±${BIAS_CAP_TEMP}° для T, ±${BIAS_CAP_PRECIP}% для precip.\n`);
  const ids = Object.keys(state.stats);
  for (const id of ids) {
    const s = state.stats[id];
    const eff = getEffectiveBiasForSource(id);
    const rawMax = s.tempMaxBias != null ? `${s.tempMaxBias >= 0 ? '+' : ''}${s.tempMaxBias.toFixed(1)}°` : '—';
    const rawMin = s.tempMinBias != null ? `${s.tempMinBias >= 0 ? '+' : ''}${s.tempMinBias.toFixed(1)}°` : '—';
    const rawPrecip = s.precipBias != null ? `${s.precipBias >= 0 ? '+' : ''}${s.precipBias.toFixed(1)}%` : '—';
    const effMax = eff ? `${eff.tempMax >= 0 ? '+' : ''}${eff.tempMax.toFixed(1)}°` : '0';
    const effMin = eff ? `${eff.tempMin >= 0 ? '+' : ''}${eff.tempMin.toFixed(1)}°` : '0';
    const effPrecip = eff ? `${eff.precip >= 0 ? '+' : ''}${eff.precip.toFixed(1)}%` : '0';
    console.log(`${id.padEnd(10)} n=${(s.nTempMax || 0).toString().padStart(2)}  raw: max ${rawMax}/min ${rawMin}/p ${rawPrecip}   eff: max ${effMax}/min ${effMin}/p ${effPrecip}`);
  }
};

// Toast «Выбранный источник не самый точный» — показывается один раз за сессию
// после первого успешного fetch + accuracy update. Подсказывает пользователю
// что есть более точная модель для его локации, и предлагает переключиться.
let _accuracyAdvisedThisSession = false;
function maybeAdviseBetterSource() {
  if (_accuracyAdvisedThisSession) return;
  const accState = (typeof ACCURACY_STATE !== 'undefined') ? ACCURACY_STATE : null;
  if (!accState || !accState.stats || typeof accuracyComposite !== 'function') return;
  const rows = [];
  for (const src of SOURCES) {
    if (src.id === 'avg') continue;
    const s = accState.stats[src.id];
    if (!s) continue;
    const score = accuracyComposite(s);
    if (score == null) continue;
    rows.push({ src, score });
  }
  if (rows.length < 3) return; // данных мало
  rows.sort((a, b) => a.score - b.score);
  const top = rows[0];
  const cur = (typeof currentSourceId === 'string') ? currentSourceId : 'avg';

  // Если AVG выбран — проверяем что AVG лидер; если конкретная модель — что она #1
  const avgScore = accState.stats.avg ? accuracyComposite(accState.stats.avg) : null;
  if (cur === 'avg') {
    if (avgScore != null && avgScore <= top.score + 0.05) return; // AVG ок
  } else {
    const curIdx = rows.findIndex(r => r.src.id === cur);
    if (curIdx === 0) return; // выбранная модель уже #1
  }
  // Есть кто-то лучше — показываем toast
  _accuracyAdvisedThisSession = true;
  showAccuracyAdviceToast(top.src);
}

function showAccuracyAdviceToast(betterSrc) {
  let toast = document.getElementById('accAdviceToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'accAdviceToast';
    toast.className = 'acc-advice-toast';
    document.body.appendChild(toast);
  }
  const name = betterSrc.shortName || betterSrc.name;
  toast.innerHTML = `
    <div class="aat-text">
      <div class="aat-title">🏆 ${t('accuracy.adviceTitle', { name })}</div>
      <div class="aat-hint">${t('accuracy.adviceHint')}</div>
    </div>
    <button type="button" class="aat-close" aria-label="${_escAttr(t('modal.closeAria'))}">✕</button>
  `;
  toast.classList.add('show');
  const closeBtn = toast.querySelector('.aat-close');
  if (closeBtn) closeBtn.addEventListener('click', () => toast.classList.remove('show'));
  // Автоскрытие через 8 сек
  clearTimeout(toast._hide);
  toast._hide = setTimeout(() => toast.classList.remove('show'), 8000);
}

// v1.41.0: расширенная классификация типа осадков. minutely_15 даёт только мм,
// поэтому смотрим hourly[NOW_HOUR].wc (WMO weather_code) + .t (температура).
// 6 категорий: storm / freezing / sleet / snow / drizzle / rain.
// Sleet — отдельного кода в WMO нет, определяется по граничной температуре
// (−1..+2°C). Эта зона критична — мокрый снег ≠ обычный снег по поведению на
// дорогах и одежде. Эвристика «sleet zone» имеет приоритет над weather_code
// (модель может писать «дождь» при 0.5°C — но физически это слякоть).
function classifyPrecip(wc, temp) {
  // Гроза — высший приоритет
  if (wc >= 95 && wc <= 99) return 'storm';
  // Ледяной дождь / freezing rain / freezing drizzle
  if (wc === 56 || wc === 57 || wc === 66 || wc === 67) return 'freezing';
  // Sleet zone — −1..+2°C физически мокрый снег независимо от того что говорит код
  if (typeof temp === 'number' && temp >= -1 && temp <= 2) return 'sleet';
  // Снег по коду или по морозу
  if ((wc >= 71 && wc <= 77) || (wc >= 85 && wc <= 86)) return 'snow';
  if (typeof temp === 'number' && temp < -1) return 'snow';
  // Морось
  if (wc >= 51 && wc <= 55) return 'drizzle';
  // Дождь по коду или дефолт (тёплая температура)
  if ((wc >= 61 && wc <= 65) || (wc >= 80 && wc <= 82)) return 'rain';
  return 'rain';
}

// Берёт wc + температуру текущего часа из активного прогноза и возвращает
// один из 6 типов осадков. Используется renderHeroNowcastHint().
function precipKindNow() {
  try {
    const f = (typeof getActiveForecast === 'function') ? getActiveForecast() : null;
    const nowH = (typeof NOW_HOUR === 'number') ? NOW_HOUR : new Date().getHours();
    const todayH = f && f[0] && f[0].hourly && f[0].hourly[nowH];
    if (!todayH) return 'rain';
    return classifyPrecip(todayH.wc, todayH.t);
  } catch (e) { return 'rain'; }
}
// v1.41.0: иконки и CSS-класс для каждого типа осадков. nc-class-* добавляется
// к плашке для тонировки (буря/лёд — тревожные, морось/дождь — нейтральные).
const PRECIP_ICONS = {
  rain:     { now: '🌧', soon: '💧' },
  drizzle:  { now: '🌦', soon: '🌦' },
  snow:     { now: '❄',  soon: '🌨' },
  sleet:    { now: '🌨', soon: '🌨' },
  freezing: { now: '🧊', soon: '🧊' },
  storm:    { now: '⛈',  soon: '⛈' }
};
const PRECIP_CSS_TONE = {
  rain: 'tone-rain',
  drizzle: 'tone-rain',
  snow: 'tone-snow',
  sleet: 'tone-sleet',
  freezing: 'tone-danger',
  storm: 'tone-danger'
};
function renderHeroNowcastHint() {
  const el = document.getElementById('heroNowcastHint');
  if (!el) return;
  const info = (typeof nowcastInfo === 'function') ? nowcastInfo() : null;
  if (!info) { el.innerHTML = ''; el.classList.remove('show'); return; }
  const kind = precipKindNow(); // rain|drizzle|snow|sleet|freezing|storm
  const tone = PRECIP_CSS_TONE[kind] || 'tone-rain';
  let icon = '', text = '', cls = '';
  if (info.kind === 'now') {
    icon = PRECIP_ICONS[kind].now;
    cls = 'nc-now ' + tone;
    if (info.endsTs) {
      const endTime = new Date(info.endsTs);
      const hh = String(endTime.getHours()).padStart(2, '0');
      const mm = String(endTime.getMinutes()).padStart(2, '0');
      text = t(`nowcast.now.until.${kind}`, { time: `${hh}:${mm}` });
    } else {
      text = t(`nowcast.now.continues.${kind}`);
    }
  } else if (info.kind === 'soon') {
    icon = PRECIP_ICONS[kind].soon;
    cls = 'nc-soon ' + tone;
    text = t(`nowcast.soon.${kind}`, { min: info.startMin });
  } else if (info.kind === 'dry') {
    // v1.40.1: ветка убрана. Раньше при противоречии «minutely сухо vs hourly
    // дождь» показывали «✓ Без осадков 2 часа» — но это путало (юзер видит
    // дождь за окном, а плашка говорит «сухо»). Случай «дождь идёт, скоро
    // закончится» корректно покрывается веткой kind='now' с endsTs.
    // Если minutely уверенно говорит сухо — плашка молчит, это норма.
    el.innerHTML = ''; el.classList.remove('show'); return;
  }
  if (!text) { el.innerHTML = ''; el.classList.remove('show'); return; }
  el.innerHTML = `<span class="nc-pill ${cls}"><span class="nc-icon">${icon}</span><span class="nc-text">${text}</span></span>`;
  el.classList.add('show');
}

// Подсказка точности на hero — короткий chip с лидером (или подтверждением что AVG лучший).
// Открывает Source Data Modal по клику. Скрывается если данных <3 пар замеров.
function renderHeroAccuracyHint() {
  const el = document.getElementById('heroAccuracyHint');
  if (!el) return;
  const accState = (typeof ACCURACY_STATE !== 'undefined') ? ACCURACY_STATE : null;
  if (!accState || !accState.stats || typeof accuracyComposite !== 'function') { el.innerHTML = ''; return; }

  // Собираем composite-score для каждой реальной модели
  const rows = [];
  for (const src of SOURCES) {
    if (src.id === 'avg') continue;
    const s = accState.stats[src.id];
    if (!s) continue;
    const score = accuracyComposite(s);
    if (score == null) continue;
    rows.push({ src, s, score });
  }
  rows.sort((a, b) => a.score - b.score);
  const top = rows[0] || null;
  const topName = top ? (top.src.shortName || top.src.name) : null;

  const avgS = accState.stats.avg;
  const avgScore = avgS ? accuracyComposite(avgS) : null;
  const cur = (typeof currentSourceId === 'string') ? currentSourceId : 'avg';

  // Совсем нет данных (ни моделей, ни AVG) — скрываем
  if (!top && avgScore == null) { el.innerHTML = ''; return; }

  // Общее число моделей (для красивого «№N из 7» с учётом моделей без данных)
  const totalModels = SOURCES.filter(s => s.id !== 'avg').length;

  let txt = '';
  let cls = 'hap-leader';
  if (cur === 'avg') {
    // AVG почти всегда математически точнее любой отдельной модели (закон
    // больших чисел снижает дисперсию). Если у AVG composite-score ≤ топа
    // моделей — он самый точный. Иначе кто-то его обогнал.
    if (avgScore == null || avgScore <= top.score + 0.05) {
      txt = `📊 Среднее — самый точный`;
      cls = 'hap-best';
    } else {
      txt = `🏆 ${topName} обходит среднее`;
    }
  } else {
    // Конкретная модель выбрана
    const curRow = rows.find(r => r.src.id === cur);
    if (!curRow) {
      // Для этой модели данных пока нет. Но если AVG/другие модели набрали —
      // даём общий ориентир: «📊 Среднее точнее» (или «🏆 X лидирует»).
      if (avgScore != null) {
        txt = `📊 Среднее обычно точнее · накапливаем данные для этой модели`;
      } else if (top) {
        txt = `🏆 Сейчас лидирует ${topName}`;
      } else {
        el.innerHTML = ''; return;
      }
    } else {
      const rank = rows.indexOf(curRow) + 1;
      if (rank === 1 && (avgScore == null || curRow.score <= avgScore)) {
        txt = `🏆 Лидер по точности`;
        cls = 'hap-best';
      } else if (avgScore != null && avgScore < curRow.score) {
        const diff = curRow.score - avgScore;
        const diffStr = diff < 0.1 ? '' : ` на ${diff.toFixed(1)}°`;
        txt = `📊 Среднее точнее${diffStr}`;
      } else if (rank === 1) {
        txt = `🏆 Лидер среди моделей`;
        cls = 'hap-best';
      } else {
        txt = `🏆 ${topName} точнее · вы №${rank} из ${totalModels}`;
      }
    }
  }

  const _ariaOpen = escapeHtml(t('accuracy.openAria'));
  const _titleOpen = escapeHtml(t('accuracy.openTitle'));
  el.innerHTML = `<button type="button" class="hero-acc-pill ${cls}" aria-label="${_ariaOpen}" title="${_titleOpen}">${txt}<span class="hap-arrow" aria-hidden="true">↗</span></button>`;
  const btn = el.querySelector('button');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof openSourceDataModal === 'function') openSourceDataModal();
    });
  }
}

// confidence (0..100) → класс из ['high','mid','low','veryLow']
function confidenceClass(conf) {
  if (conf == null) return null;
  if (conf >= 80) return 'high';
  if (conf >= 65) return 'mid';
  if (conf >= 50) return 'low';
  return 'veryLow';
}

function renderDays(forecast) {
  const grid = document.getElementById('daysGrid');
  grid.innerHTML = '';
  // Confidence показываем только когда смотрим AVG (для конкретной модели спред бессмыслен).
  const showConf = currentSourceId === 'avg';
  forecast.forEach((d, i) => {
    const card = document.createElement('div');
    card.className = 'glass day' + (i === 0 ? ' today' : '');
    const dayLabel = d.id === 0 ? t('day.today') : localizeDayShort(d.name);
    const confCls = showConf ? confidenceClass(d.confidence) : null;
    card.innerHTML = `
      <div class="day-name">${dayLabel}</div>
      <div class="day-date">${d.date.slice(0,5)}</div>
      <div class="day-icon">${weatherIcon(d.condition, 56)}</div>
      <div class="day-temps"><span class="day-hi">${fmtTempNum(d.max)}°</span><span class="day-lo">${fmtTempNum(d.min)}°</span></div>
      <div class="day-prec"><svg width="10" height="10" viewBox="0 0 24 24" fill="#00d4ff"><path d="M12 2.7s5.5 6 5.5 11a5.5 5.5 0 0 1-11 0c0-5 5.5-11 5.5-11z"/></svg>${d.precip}%</div>
      <div class="day-wind">${fmtWind(d.wind)} ${localizeWindDirShort(d.windDir)}</div>
      <div class="day-tap">${t('day.tap')} ↑</div>
      ${confCls ? `<div class="day-confidence-bar ${confCls}" title="${t('confidence.label')}: ${d.confidence}%"></div>` : ''}
    `;
    card.addEventListener('click', () => openModal(d.id));
    grid.appendChild(card);
  });
}

// Чип "Согласие моделей" в карточке источника. Показываем только когда сейчас AVG и есть реальные данные.
function renderConfidenceChip() {
  const chip = document.getElementById('confidenceChip');
  if (!chip) return;
  const avg = ACTIVE_FORECAST_BY_MODEL.avg;
  if (currentSourceId !== 'avg' || !avg || !avg[0] || avg[0].confidence == null) {
    chip.style.display = 'none';
    return;
  }
  const day = avg[0];
  const cls = confidenceClass(day.confidence);
  chip.style.display = '';
  chip.classList.remove('cc-high','cc-mid','cc-low','cc-veryLow');
  chip.classList.add('cc-' + cls);
  document.getElementById('confidenceVal').textContent = day.confidence + '%';
  document.getElementById('confidenceStatus').textContent = t('confidence.' + cls);
  chip.title = t('confidence.tooltip', { n: day.modelCount || 7, range: day.tempRange != null ? day.tempRange : '?' });
}

// Короткая единица измерения для метрики (для подписей в табах).
// Давление сокращаем до 'мм' / 'гПа' / 'inHg' — полная форма «мм рт.ст.» слишком длинная для таба.
function shortMetricUnit(metric) {
  switch (metric) {
    case 'temp':
    case 'feels': return unitTemp();
    case 'precip': return '%';
    case 'wind': return unitWind();
    case 'pressure': {
      const u = state.units.pressure;
      if (u === 'mmhg') return 'мм';
      if (u === 'hpa') return 'гПа';
      if (u === 'inhg') return 'inHg';
      return u;
    }
    default: return '';
  }
}

// Возвращает HTML-строку значения метрики для часа h.
// Единица измерения завёрнута в <span class="hc-unit"> — приглушённая, мелким шрифтом, в стиле таба.
function hourMetricValue(h, metric) {
  switch (metric) {
    case 'temp':
      return `${fmtTempNum(h.t)}<span class="hc-unit">${unitTemp()}</span>`;
    case 'feels': {
      const f = h.feels != null ? h.feels : h.t;
      return `${fmtTempNum(f)}<span class="hc-unit">${unitTemp()}</span>`;
    }
    case 'precip':
      return `${h.p}<span class="hc-unit">%</span>`;
    case 'wind':
      return `${fmtWind(h.w, { withUnit: false })}<span class="hc-unit">${unitWind()}</span>`;
    case 'pressure':
      return h.pr != null
        ? `${fmtPressure(h.pr, { withUnit: false })}<span class="hc-unit">${shortMetricUnit('pressure')}</span>`
        : '—';
    default:
      return '';
  }
}

function renderHourlyRow(forecast) {
  const row = document.getElementById('hourlyRow');
  if (!row) return;
  const today = forecast[0];
  const metric = currentHourlyMetric;

  document.querySelectorAll('#hourlyTabs .ht-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.metric === metric);
  });

  // Однократно вешаем listener на физический scroll — отличает программный
  // scroll (когда мы центрируем) от пользовательского (когда он листает).
  //   - wheel: гарантированно user-initiated на десктопе (тачпад / мышь).
  //   - touchmove: на мобильных триггерится только при движении пальца ПО
  //     элементу — обычный tap (без свайпа) не сработает. Это важно: иначе
  //     случайный тап на ленте мгновенно бы отключил авто-центрирование.
  // pointerdown НЕ используем — он триггерится даже на одиночный tap.
  if (!row._userScrollHooked) {
    row._userScrollHooked = true;
    const markScrolled = () => { _userScrolledHourly = true; };
    row.addEventListener('wheel', markScrolled, { passive: true });
    row.addEventListener('touchmove', markScrolled, { passive: true });
  }

  // Сохраняем позицию scroll'а перед перерисовкой (например при переключении метрики)
  const savedScroll = row.scrollLeft;

  row.innerHTML = today.hourly.map((h, i) => {
    const isNow = (i === NOW_HOUR);
    return `
      <div class="hour-cell${isNow ? ' now' : ''}" data-hour-index="${i}">
        <div class="h">${String(h.h).padStart(2,'0')}:00</div>
        <div class="ic">${weatherIcon(h.c, 36)}</div>
        <div class="t">${hourMetricValue(h, metric)}</div>
      </div>
    `;
  }).join('');

  // Клик на любую плитку часа → открывает модалку "Почасовой".
  // ВСЕГДА центрируем на NOW_HOUR (текущий час), а не на кликнутом — по запросу
  // пользователя: «чтоб текущий час был посреди экрана сразу чтобы пользователь его
  // не искал». Кликнутый час всё равно виден в модалке через скролл.
  // Исключение — если кликнут конкретный час близкий к NOW (±3), центрируем на нём:
  // явный жест внимания, пользователь хочет именно этот час.
  row.querySelectorAll('.hour-cell').forEach(cell => {
    cell.style.cursor = 'pointer';
    cell.addEventListener('click', () => {
      const i = parseInt(cell.dataset.hourIndex, 10);
      if (Number.isNaN(i)) return;
      const distFromNow = Math.abs(i - NOW_HOUR);
      openHourlyDetail(distFromNow <= 3 ? i : NOW_HOUR);
    });
  });

  // Центрирование текущего часа. Используем флаг _userScrolledHourly: пока юзер
  // не дёргал ленту руками — каждый ре-рендер пере-центрирует. Когда юзер скроллит
  // (scroll event с большой дельтой) — флаг ставится в true и мы восстанавливаем
  // его позицию вместо центрирования.
  //
  // Используем встроенный scrollIntoView({inline:'center'}) — нативный метод
  // надёжнее ручного scrollLeft при нестабильном layout. И повторяем попытку
  // несколько раз (rAF + setTimeout 100/300/600 мс) на случай медленных шрифтов
  // или re-render'ов после fetch'а свежих данных поверх кэша.
  if (_userScrolledHourly && savedScroll > 0) {
    row.scrollLeft = savedScroll;
    return;
  }
  // Ручной scrollLeft вместо scrollIntoView. Причины:
  //  - iOS Safari до 17.4 (март 2024) молча игнорирует behavior:'instant',
  //    подставляя 'auto' (на части настроек получается плавный скролл,
  //    что бросается в глаза при первой загрузке).
  //  - scrollIntoView с block:'nearest' на iOS может скроллить ВСЮ страницу,
  //    если hourly-row хотя бы частично выходит за viewport (например в
  //    короткой ландшафтной ориентации). Ручной scrollLeft работает строго
  //    по горизонтали внутри контейнера и в страницу не «утекает».
  const centerNow = () => {
    const nowCell = row.querySelector('.hour-cell.now');
    if (!nowCell) return;
    const rowW = row.clientWidth;
    const cellW = nowCell.offsetWidth;
    if (rowW < 50 || cellW < 20) return; // layout не готов
    const target = Math.max(0, nowCell.offsetLeft - (rowW / 2) + (cellW / 2));
    row.scrollLeft = target;
  };
  // Несколько попыток с разными задержками — кто-нибудь да поймает стабильный
  // layout (медленные шрифты / re-render после cache → fresh fetch / iOS PWA cold).
  requestAnimationFrame(() => requestAnimationFrame(centerNow));
  setTimeout(centerNow, 100);
  setTimeout(centerNow, 300);
  setTimeout(centerNow, 600);
}

// Глобальный флаг: пользователь физически прокрутил почасовую ленту?
// Ставится из scroll-handler'а в renderHourlyRow init (см. ниже).
// Пока флаг false — ре-рендеры (например при смене метрики) пере-центрируют
// на текущий час. Когда юзер скроллит руками — флаг становится true, и его
// позиция сохраняется.
let _userScrolledHourly = false;

/* ============================================
   HOURLY DETAIL MODAL — полноэкранная карточка "Почасовой"
   Sticky-часы сверху, под ними mini-charts по 6 метрикам, всё скроллится горизонтально.
   ============================================ */
const HDM_HOUR_WIDTH = 60;
const HDM_CHART_HEIGHT = 90;
let hdmEscHandler = null;

// Конфигурация метрик: emoji + ключ названия + единица + цвет + getter из часа + форматтер числа
function hdmMetricsConfig() {
  const tempColor = '#fbbf24';
  const blueColor = '#00d4ff';
  const purpleColor = '#a78bfa';
  const grayColor = '#9ca3af';
  const cyanColor = '#67e8f9';
  const violetColor = '#c084fc';
  const yellowColor = '#fde047';
  const whiteColor = '#e5e7eb';
  return [
    { id:'temp',       emoji:'🌡', nameKey:'metric.temp',       unit:unitTemp(),                  color:tempColor,   get:h=>convertTemp(h.t, state.units.temp),                            fmt:v=>`${Math.round(v)}°` },
    { id:'feels',      emoji:'🌡', nameKey:'metric.feels',      unit:unitTemp(),                  color:tempColor,   get:h=>convertTemp(h.feels!=null?h.feels:h.t, state.units.temp),      fmt:v=>`${Math.round(v)}°` },
    { id:'precip',     emoji:'💧', nameKey:'metric.rain',       unit:'%',                         color:blueColor,   get:h=>typeof h.p==='number'?h.p:0,                                   fmt:v=>`${Math.round(v)}` },
    { id:'pmm',        emoji:'🌧', nameKey:'precip.title',      unit:t('unit.mm'),                color:blueColor,   get:h=>typeof h.pmm==='number'?h.pmm:0,                               fmt:v=>`${Math.round(v*10)/10}` },
    { id:'wind',       emoji:'💨', nameKey:'metric.wind',       unit:unitWind(),                  color:grayColor,   get:h=>convertWind(h.w, state.units.wind),                            fmt:v=>`${Math.round(v)}` },
    { id:'pressure',   emoji:'⊙',  nameKey:'metric.pressure',   unit:shortMetricUnit('pressure'), color:purpleColor, get:h=>h.pr!=null?convertPressure(h.pr, state.units.pressure):null,   fmt:v=>v!=null?`${Math.round(v)}`:'—' },
    { id:'humidity',   emoji:'💦', nameKey:'metric.humidity',   unit:'%',                         color:cyanColor,   get:h=>typeof h.hum==='number'?h.hum:null,                            fmt:v=>v!=null?`${Math.round(v)}`:'—' },
    { id:'dewpoint',   emoji:'🌫', nameKey:'metric.dewpoint',   unit:unitTemp(),                  color:violetColor, get:h=>h.dp!=null?convertTemp(h.dp, state.units.temp):null,           fmt:v=>v!=null?`${Math.round(v)}°`:'—' },
    { id:'uv',         emoji:'☀',  nameKey:'metric.uv',         unit:'/11',                       color:yellowColor, get:h=>typeof h.uvi==='number'?h.uvi:null,                            fmt:v=>v!=null?`${Math.round(v)}`:'—' },
    { id:'visibility', emoji:'👁', nameKey:'metric.visibility', unit:t('unit.km'),                color:whiteColor,  get:h=>typeof h.vis==='number'?h.vis:null,                            fmt:v=>v!=null?`${Math.round(v)}`:'—' },
    { id:'solar',      emoji:'🔆', nameKey:'metric.solar',      unit:'W/m²',                      color:yellowColor, get:h=>typeof h.sr==='number'?h.sr:null,                              fmt:v=>v!=null?`${Math.round(v)}`:'—' }
  ];
}

// SVG mini-chart: area-fill + smooth line + цифровые подписи над каждой точкой
function renderHdmMetricChart(values, color, formatValue) {
  const w = values.length * HDM_HOUR_WIDTH;
  const h = HDM_CHART_HEIGHT;
  const padTop = 22;   // место для цифр над линией
  const padBot = 8;

  const nonNull = values.filter(v => typeof v === 'number' && !Number.isNaN(v));
  if (nonNull.length === 0) return `<svg width="${w}" height="${h}"></svg>`;

  let minV = Math.min(...nonNull);
  let maxV = Math.max(...nonNull);
  if (maxV - minV < 0.5) { minV -= 0.5; maxV += 0.5; }   // плоская линия — расширяем диапазон
  const range = maxV - minV;
  const yScale = v => h - padBot - ((v - minV) / range) * (h - padTop - padBot);
  const xScale = i => i * HDM_HOUR_WIDTH + HDM_HOUR_WIDTH / 2;

  const gradId = `hdmgrad-${uid()}`;

  // Сглаживание через cubic-bezier (monotone-подобное): control points = (prev+cur)/2
  const pts = values.map((v, i) => (typeof v === 'number' && !Number.isNaN(v)) ? { x: xScale(i), y: yScale(v) } : null);
  let pathD = '';
  let areaD = '';
  let firstX = null, lastX = null;
  for (let i = 0; i < pts.length; i++) {
    if (!pts[i]) continue;
    const p = pts[i];
    if (firstX === null) {
      pathD = `M ${p.x} ${p.y}`;
      areaD = `M ${p.x} ${h - padBot} L ${p.x} ${p.y}`;
      firstX = p.x;
    } else {
      const prev = pts.slice(0, i).reverse().find(Boolean);
      const cx = (prev.x + p.x) / 2;
      pathD += ` Q ${cx} ${prev.y}, ${cx} ${(prev.y + p.y) / 2} T ${p.x} ${p.y}`;
      areaD += ` L ${p.x} ${p.y}`;
    }
    lastX = p.x;
  }
  if (lastX !== null) areaD += ` L ${lastX} ${h - padBot} Z`;

  const labels = values.map((v, i) => {
    if (typeof v !== 'number' || Number.isNaN(v)) return '';
    return `<text x="${xScale(i)}" y="${yScale(v) - 8}" text-anchor="middle" fill="#e8f0ff" font-size="11" font-family="Onest,sans-serif" font-weight="500" style="font-feature-settings:'tnum'">${formatValue(v)}</text>`;
  }).join('');

  return `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.38"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${areaD}" fill="url(#${gradId})" stroke="none"/>
      <path d="${pathD}" stroke="${color}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>
      ${labels}
    </svg>
  `;
}

function renderHdmContent(forecast, opts = {}) {
  const day = forecast[0];
  if (!day || !day.hourly) return;
  const hours = day.hourly;
  const totalWidth = hours.length * HDM_HOUR_WIDTH;

  const inner = document.getElementById('hdmInner');
  const stickyHours = document.getElementById('hdmHoursRow');
  const dayLabel = document.getElementById('hdmDayLabel');
  const metricsContainer = document.getElementById('hdmMetrics');
  if (!inner || !stickyHours || !metricsContainer) return;

  inner.style.width = totalWidth + 'px';

  stickyHours.innerHTML = hours.map((h, i) => {
    const isNow = (i === NOW_HOUR && day.id === 0);
    return `<div class="hdm-hour-cell${isNow ? ' now' : ''}" style="width:${HDM_HOUR_WIDTH}px">
      <div class="hic">${weatherIcon(h.c, 30)}</div>
      <div class="hh">${h.h}</div>
    </div>`;
  }).join('');

  const dateShort = day.date ? day.date.slice(0,5) : '';
  const labelText = (day.id === 0)
    ? `${t('day.today')} · ${dateShort}`
    : `${localizeDayShort(day.name)} · ${dateShort}`;
  dayLabel.textContent = labelText;

  const allCfg = hdmMetricsConfig();
  // Опции:
  //   opts.singleMetric — id одной метрики (legacy, для одного графика)
  //   opts.metrics — массив id-шников для нескольких графиков подряд
  // Если ничего не задано — показываем все 11.
  let cfg = allCfg;
  if (Array.isArray(opts.metrics) && opts.metrics.length) {
    cfg = opts.metrics.map(id => allCfg.find(m => m.id === id)).filter(Boolean);
  } else if (opts.singleMetric) {
    cfg = allCfg.filter(m => m.id === opts.singleMetric);
  }
  metricsContainer.innerHTML = cfg.map(m => {
    const values = hours.map(m.get);
    const chartSvg = renderHdmMetricChart(values, m.color, m.fmt);
    return `
      <div class="hdm-metric" data-metric="${m.id}">
        <div class="hdm-metric-head">
          <span class="hdm-metric-emoji">${m.emoji}</span>
          <span class="hdm-metric-name">${t(m.nameKey)}</span>
          <span class="hdm-metric-unit">${m.unit}</span>
        </div>
        <div class="hdm-metric-chart">${chartSvg}</div>
      </div>
    `;
  }).join('');

  // Вертикальная линия "сейчас" — поверх всех графиков (только для сегодняшнего дня)
  if (day.id === 0) {
    const nowX = NOW_HOUR * HDM_HOUR_WIDTH + HDM_HOUR_WIDTH / 2;
    metricsContainer.querySelectorAll('.hdm-metric-chart').forEach(chartEl => {
      const line = document.createElement('div');
      line.className = 'hdm-now-line';
      line.style.left = (nowX - 0.75) + 'px';
      chartEl.appendChild(line);
    });
  }
}

function openHourlyDetail(startHour, opts = {}) {
  const modal = document.getElementById('hourlyDetailModal');
  if (!modal) return;
  const forecast = getForecast(currentSourceId);
  renderHdmContent(forecast, { singleMetric: opts.singleMetric, metrics: opts.metrics });
  // Управление заголовком: для одной метрики — её имя; для массива — имя первой;
  // если ничего не задано — общий «Почасовой».
  const titleEl = document.getElementById('hdmTitle');
  if (titleEl) {
    const firstId = (Array.isArray(opts.metrics) && opts.metrics[0]) || opts.singleMetric;
    if (firstId) {
      const m = hdmMetricsConfig().find(x => x.id === firstId);
      titleEl.textContent = m ? t(m.nameKey) : t('hdm.title');
      titleEl.removeAttribute('data-i18n');  // запрещаем applyTranslations переписать
    } else {
      titleEl.textContent = t('hdm.title');
      titleEl.setAttribute('data-i18n', 'hdm.title');
    }
  }

  // КЛЮЧЕВОЕ: ставим scrollLeft ПЕРЕД открытием модалки, пока layout стабилен и
  // нет анимаций. Иначе iOS Safari конфликтует со sticky-headers .hdm-metric-head
  // (11 штук в полной модалке) во время transition и сбрасывает scrollLeft.
  const scrollElPre = document.getElementById('hdmScroll');
  if (scrollElPre) {
    void scrollElPre.offsetWidth; // force layout
    const preCells = scrollElPre.querySelectorAll('.hdm-hour-cell');
    const preTarget = preCells[startHour];
    if (preTarget && scrollElPre.clientWidth >= 50) {
      const preVw = scrollElPre.clientWidth;
      const preMax = Math.max(0, scrollElPre.scrollWidth - preVw);
      const preX = Math.max(0, Math.min(preTarget.offsetLeft + preTarget.offsetWidth / 2 - preVw / 2, preMax));
      const prevWebkit = scrollElPre.style.webkitOverflowScrolling;
      scrollElPre.style.webkitOverflowScrolling = 'auto';
      scrollElPre.scrollTop = 0;
      scrollElPre.scrollLeft = preX;
      scrollElPre.dataset.prevWebkit = prevWebkit || '';
    }
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Подстраховка: пере-центрируем 3 раза после открытия на случай если iOS сбросит.
  const repositionAndRestore = () => {
    const scrollEl = document.getElementById('hdmScroll');
    if (!scrollEl) return;
    const cells = scrollEl.querySelectorAll('.hdm-hour-cell');
    const targetCell = cells[startHour];
    const vw = scrollEl.clientWidth || scrollEl.offsetWidth || 0;
    if (!targetCell || vw < 50) return;
    const maxScroll = Math.max(0, scrollEl.scrollWidth - vw);
    const targetX = Math.max(0, Math.min(targetCell.offsetLeft + targetCell.offsetWidth / 2 - vw / 2, maxScroll));
    if (Math.abs(scrollEl.scrollLeft - targetX) > 5) {
      scrollEl.scrollLeft = targetX;
    }
    if (typeof updateScrollArrows === 'function') updateScrollArrows(scrollEl);
  };

  setTimeout(repositionAndRestore, 100);
  setTimeout(repositionAndRestore, 600);
  setTimeout(() => {
    repositionAndRestore();
    const scrollEl = document.getElementById('hdmScroll');
    if (scrollEl) {
      const prev = scrollEl.dataset.prevWebkit;
      scrollEl.style.webkitOverflowScrolling = (prev !== undefined && prev !== '') ? prev : 'touch';
      delete scrollEl.dataset.prevWebkit;
    }
  }, 1200);

  hdmEscHandler = (e) => { if (e.key === 'Escape') closeHourlyDetail(); };
  document.addEventListener('keydown', hdmEscHandler);
}

function closeHourlyDetail() {
  const modal = document.getElementById('hourlyDetailModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (hdmEscHandler) {
    document.removeEventListener('keydown', hdmEscHandler);
    hdmEscHandler = null;
  }
  // Если пришли из search modal — открываем search ПОВЕРХ закрывающейся
  // модалки (без задержки) + поднимаем body.modal-bridge на время перехода,
  // чтобы главный экран между ними не мелькнул.
  if (_returnToSearchModal) {
    _returnToSearchModal = false;
    startModalBridge();
    if (typeof openSearchModal === 'function') openSearchModal();
  }
}

function setupHourlyDetailModal() {
  const modal = document.getElementById('hourlyDetailModal');
  const backBtn = document.getElementById('hdmBack');
  if (!modal || !backBtn) return;
  backBtn.addEventListener('click', closeHourlyDetail);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeHourlyDetail();
  });
}

/* ============================================
   PRECIP DETAIL MODAL — клик по плитке "Осадки" открывает детальный вид:
   график мм/ч (precip-card) + гроза-индикатор (storm-card).
   Карточки физически живут внутри этой модалки, рендер renderPrecipChart/renderStorm
   работает без изменений потому что id элементов сохранены.
   ============================================ */

let precipDetailEscHandler = null;

function openPrecipDetail() {
  const modal = document.getElementById('precipDetailModal');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // Принудительно перерисовываем precip-chart — Chart.js мог сложиться когда модалка была hidden
  requestAnimationFrame(() => {
    const forecast = getForecast(currentSourceId);
    renderPrecipChart(forecast);
    // Скроллим горизонтальный график на 0 (показываем «сейчас» слева)
    const ps = document.getElementById('precipScroll');
    if (ps) ps.scrollLeft = 0;
    // Lazy-init радара (загружает Leaflet + RainViewer) — только при первом открытии
    initRainRadar().catch(err => console.warn('Radar init failed:', err));
    // Если открыта вкладка «Прогноз 72ч» — обновим iframe (вдруг город сменился)
    if (currentRadarTab === 'forecast') ensureWindyIframe();
  });
  precipDetailEscHandler = (e) => { if (e.key === 'Escape') closePrecipDetail(); };
  document.addEventListener('keydown', precipDetailEscHandler);
}

function closePrecipDetail() {
  const modal = document.getElementById('precipDetailModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // Останавливаем анимацию радара чтобы не крутилась впустую в фоне
  rainRadarPause();
  if (precipDetailEscHandler) {
    document.removeEventListener('keydown', precipDetailEscHandler);
    precipDetailEscHandler = null;
  }
}

function setupPrecipDetailModal() {
  const modal = document.getElementById('precipDetailModal');
  const backBtn = document.getElementById('pdmBack');
  const card = document.getElementById('metricRainCard');
  if (!modal || !backBtn || !card) return;

  backBtn.addEventListener('click', closePrecipDetail);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePrecipDetail();
  });
  card.addEventListener('click', openPrecipDetail);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPrecipDetail(); }
  });
}

// Клик/Enter на плитках Ветер / Давление / Влажность открывает hourlyDetailModal,
// но с отфильтрованным набором метрик и кастомным заголовком.
// Это даёт по сути отдельные модалки «Ветер» / «Давление» / «Влажность» бесплатно,
// без копирования инфраструктуры sticky-часов и horizontal scroll.
// Маппинг: id плитки → массив id-шников графиков в hdmMetricsConfig.
const METRIC_CARD_TO_HDM = {
  wind:     ['wind'],
  pressure: ['pressure'],
  // Влажность включает дополнительно точку росы — связанные метрики удобнее видеть вместе
  humidity: ['humidity', 'dewpoint']
};
function setupMetricCards() {
  document.querySelectorAll('.metric-clickable[data-open-metric]').forEach(card => {
    const metricId = card.dataset.openMetric;
    // Плитка осадков (rain) обрабатывается своей собственной модалкой (с радаром/грозой)
    if (!metricId || metricId === 'rain') return;
    const targetMetrics = METRIC_CARD_TO_HDM[metricId];
    if (!targetMetrics) return;
    const trigger = () => openHourlyDetail(NOW_HOUR, { metrics: targetMetrics });
    card.addEventListener('click', trigger);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
    });
  });
}

/* ============================================
   RAIN RADAR — RainViewer tiles на Leaflet карте (тёмная basemap CartoDB).
   Lazy-init при первом открытии precipDetailModal.
   API: https://api.rainviewer.com/public/weather-maps.json
   Тайлы: https://tilecache.rainviewer.com{path}/{size}/{z}/{x}/{y}/{color}/{smooth}_{snow}.png
   ============================================ */

const RV_API_URL = 'https://api.rainviewer.com/public/weather-maps.json';
const RV_TILE_SIZE = 256;
const RV_COLOR_SCHEME = 4;    // 4 = классическая шкала, читаемая на тёмной basemap
const RV_SMOOTH = 1;
const RV_SNOW = 1;
const RV_INITIAL_ZOOM = 7;
const RV_ANIMATION_INTERVAL_MS = 600;

const rainRadar = {
  map: null,
  cityMarker: null,
  frames: [],          // [{ time, path, kind: 'past'|'nowcast' }]
  layers: [],          // соответствующие L.tileLayer для каждого frame
  currentIdx: 0,
  playing: false,
  playTimer: null,
  manifestHost: null,
  inited: false,
  initPromise: null
};

// Инициализируем карту и подгружаем RainViewer тайлы. Идемпотентна — повторные вызовы
// просто перецентрируют карту на текущий город (полезно при смене локации).
async function initRainRadar() {
  const mapEl = document.getElementById('rainRadarMap');
  const statusEl = document.getElementById('radarStatus');
  const controlsEl = document.getElementById('radarControls');
  if (!mapEl || !statusEl) return;

  // Leaflet может ещё не подгрузиться (defer-script)
  if (typeof L === 'undefined') {
    statusEl.textContent = t('radar.loading');
    await new Promise(r => setTimeout(r, 250));
    if (typeof L === 'undefined') {
      statusEl.textContent = t('radar.error');
      statusEl.classList.add('error');
      return;
    }
  }

  const { lat, lon } = currentLocation;

  if (!rainRadar.map) {
    rainRadar.map = L.map(mapEl, {
      center: [lat, lon],
      zoom: RV_INITIAL_ZOOM,
      zoomControl: true,
      attributionControl: true,
      preferCanvas: false
    });
    // Тёмная basemap CartoDB Dark Matter (бесплатная, без ключа)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 11,
      minZoom: 3,
      attribution: '&copy; OpenStreetMap &copy; CARTO &copy; RainViewer'
    }).addTo(rainRadar.map);
    // Маркер города поверх basemap, под тайлами радара
    rainRadar.cityMarker = L.circleMarker([lat, lon], {
      radius: 6, color: '#00d4ff', weight: 2, fillColor: '#00d4ff', fillOpacity: 0.85, className: 'rv-city-pin'
    }).addTo(rainRadar.map);
  } else {
    // Карта уже создана — просто перецентрируем
    rainRadar.map.setView([lat, lon], RV_INITIAL_ZOOM, { animate: true });
    if (rainRadar.cityMarker) rainRadar.cityMarker.setLatLng([lat, lon]);
  }

  // Загружаем manifest RainViewer (если ещё не загружали ИЛИ если он старше 5 минут)
  if (!rainRadar.frames.length || (Date.now() - (rainRadar._manifestTs || 0) > 5 * 60 * 1000)) {
    statusEl.textContent = t('radar.loading');
    statusEl.classList.remove('error');
    try {
      const resp = await fetch(RV_API_URL);
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const data = await resp.json();
      rainRadar.manifestHost = data.host;
      rainRadar._manifestTs = Date.now();
      const past = (data.radar && data.radar.past) ? data.radar.past.map(f => ({ ...f, kind: 'past' })) : [];
      const nowcast = (data.radar && data.radar.nowcast) ? data.radar.nowcast.map(f => ({ ...f, kind: 'nowcast' })) : [];
      rainRadar.frames = [...past, ...nowcast];
      if (!rainRadar.frames.length) {
        statusEl.textContent = t('radar.empty');
        return;
      }
      // Очищаем старые слои если были
      rainRadar.layers.forEach(l => rainRadar.map.removeLayer(l));
      rainRadar.layers = rainRadar.frames.map(f => {
        const url = `${rainRadar.manifestHost}${f.path}/${RV_TILE_SIZE}/{z}/{x}/{y}/${RV_COLOR_SCHEME}/${RV_SMOOTH}_${RV_SNOW}.png`;
        return L.tileLayer(url, {
          opacity: 0,
          zIndex: 5,
          maxZoom: 11,
          tileSize: 256
        }).addTo(rainRadar.map);
      });
      // Стартуем на последнем «past» кадре (это «сейчас»)
      const pastCount = past.length;
      rainRadar.currentIdx = Math.max(0, pastCount - 1);
    } catch (err) {
      console.warn('RainViewer manifest error:', err);
      statusEl.textContent = t('radar.error');
      statusEl.classList.add('error');
      return;
    }
  }

  // Показываем slider и play
  statusEl.style.display = 'none';
  if (controlsEl) controlsEl.style.display = '';
  const slider = document.getElementById('radarSlider');
  if (slider) {
    slider.max = String(rainRadar.frames.length - 1);
    slider.value = String(rainRadar.currentIdx);
  }
  showRadarFrame(rainRadar.currentIdx);
  rainRadar.inited = true;

  // Invalidate size — Leaflet нужно когда контейнер становится видим (открыта модалка)
  setTimeout(() => { if (rainRadar.map) rainRadar.map.invalidateSize(); }, 100);
}

function showRadarFrame(idx) {
  if (!rainRadar.layers.length) return;
  idx = Math.max(0, Math.min(rainRadar.layers.length - 1, idx));
  rainRadar.currentIdx = idx;
  rainRadar.layers.forEach((l, i) => l.setOpacity(i === idx ? 0.75 : 0));
  // Обновить подпись времени
  const timeEl = document.getElementById('radarTime');
  if (timeEl && rainRadar.frames[idx]) {
    const d = new Date(rainRadar.frames[idx].time * 1000);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const tag = rainRadar.frames[idx].kind === 'nowcast' ? ` · ${t('radar.forecast')}` : '';
    timeEl.textContent = `${hh}:${mm}${tag}`;
  }
  const slider = document.getElementById('radarSlider');
  if (slider && slider.value !== String(idx)) slider.value = String(idx);
}

function rainRadarPlay() {
  if (rainRadar.playing) return;
  rainRadar.playing = true;
  setRadarPlayIcon(true);
  rainRadar.playTimer = setInterval(() => {
    const next = (rainRadar.currentIdx + 1) % rainRadar.layers.length;
    showRadarFrame(next);
    // Дойдя до последнего кадра — пауза
    if (next === rainRadar.layers.length - 1) rainRadarPause();
  }, RV_ANIMATION_INTERVAL_MS);
}
function rainRadarPause() {
  rainRadar.playing = false;
  setRadarPlayIcon(false);
  if (rainRadar.playTimer) { clearInterval(rainRadar.playTimer); rainRadar.playTimer = null; }
}
function setRadarPlayIcon(playing) {
  const btn = document.getElementById('radarPlayBtn');
  if (!btn) return;
  const play = btn.querySelector('.rp-play');
  const pause = btn.querySelector('.rp-pause');
  if (play && pause) {
    play.style.display = playing ? 'none' : '';
    pause.style.display = playing ? '' : 'none';
  }
}

function setupRainRadarControls() {
  const playBtn = document.getElementById('radarPlayBtn');
  const slider = document.getElementById('radarSlider');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (rainRadar.playing) rainRadarPause(); else rainRadarPlay();
    });
  }
  if (slider) {
    slider.addEventListener('input', (e) => {
      rainRadarPause();
      showRadarFrame(parseInt(e.target.value, 10) || 0);
    });
  }
  // Табы переключения «Радар (live) / Прогноз (Windy)»
  document.querySelectorAll('.radar-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.radarTab;
      switchRadarTab(tab);
    });
  });
}

// Текущая активная вкладка ('live' или 'forecast')
let currentRadarTab = 'live';

function switchRadarTab(tab) {
  if (tab !== 'live' && tab !== 'forecast') return;
  currentRadarTab = tab;
  document.querySelectorAll('.radar-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.radarTab === tab);
  });
  const liveWrap = document.getElementById('radarLiveWrap');
  const forecastWrap = document.getElementById('radarForecastWrap');
  if (!liveWrap || !forecastWrap) return;
  if (tab === 'live') {
    liveWrap.style.display = '';
    forecastWrap.style.display = 'none';
    // Leaflet нужно invalidateSize когда контейнер стал виден
    setTimeout(() => { if (rainRadar.map) rainRadar.map.invalidateSize(); }, 50);
  } else {
    liveWrap.style.display = 'none';
    forecastWrap.style.display = '';
    rainRadarPause();   // на всякий случай — анимация в скрытом табе бесполезна
    ensureWindyIframe();
  }
}

// Lazy-инициализация Windy iframe — создаём только при первом переключении на вкладку.
// При смене города пересоздаём src чтобы карта показывала актуальную точку.
function ensureWindyIframe() {
  const wrap = document.getElementById('windyIframeWrap');
  if (!wrap) return;
  const { lat, lon } = currentLocation;
  const latStr = lat.toFixed(3);
  const lonStr = lon.toFixed(3);
  // Windy embed2 params:
  //   overlay=rain     слой осадков (прогноз ECMWF на 10 дней — нам нужны первые 72ч)
  //   product=ecmwf    модель ECMWF (бесплатная, точная)
  //   level=surface    приземный уровень
  //   marker=true      маркер с координатами города
  //   metric*          метрические единицы
  const url = `https://embed.windy.com/embed2.html?lat=${latStr}&lon=${lonStr}&detailLat=${latStr}&detailLon=${lonStr}&zoom=7&level=surface&overlay=rain&product=ecmwf&menu=&message=true&marker=true&calendar=&pressure=&type=map&location=coordinates&detail=&metricWind=m%2Fs&metricTemp=%C2%B0C&radarRange=-1`;
  let iframe = wrap.querySelector('iframe.windy-iframe');
  if (!iframe) {
    // Очищаем placeholder-текст
    wrap.innerHTML = '';
    iframe = document.createElement('iframe');
    iframe.className = 'windy-iframe';
    iframe.setAttribute('title', 'Windy precipitation forecast');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'no-referrer');
    iframe.setAttribute('allow', 'fullscreen');
    iframe.src = url;
    wrap.appendChild(iframe);
  } else if (iframe.dataset.lat !== latStr || iframe.dataset.lon !== lonStr) {
    // Координаты изменились — обновим src
    iframe.src = url;
  }
  iframe.dataset.lat = latStr;
  iframe.dataset.lon = lonStr;
}

/* ============================================
   INVERSE SEARCH — «когда будет нужная погода?»
   Парсер: 10 паттернов через regex (без дождя, тепло выше +N, ясно, ветер и т.д.)
   Сканер: проходит почасовой массив всех дней, группирует подряд идущие совпадения в окна
   Рендер: карточки окон с метаданными + клик открывает детальную модалку
   ============================================ */

let searchEscHandler = null;
// Флаг: если из search modal открыли day/hourly-detail и юзер закроет ту модалку,
// возвращаемся обратно в search (а не на главный экран). Сбрасывается при ручном
// закрытии search или открытии других режимов.
let _returnToSearchModal = false;
// Помощник для «бесшовного» перехода между двумя модалками. Поднимает
// body.modal-bridge на ~500мс — статичный плотный фон, скрывающий главный
// экран пока обе модалки одновременно анимируются.
let _modalBridgeTimer = null;
function startModalBridge() {
  if (!document.body) return;
  document.body.classList.add('modal-bridge');
  if (_modalBridgeTimer) clearTimeout(_modalBridgeTimer);
  _modalBridgeTimer = setTimeout(() => {
    document.body.classList.remove('modal-bridge');
    _modalBridgeTimer = null;
  }, 520);
}

// Разбирает текст запроса в структурированный фильтр {type, threshold?, minDuration?, preset?}.
// Возвращает null если не понял.
function parseSearchQuery(text) {
  if (!text || typeof text !== 'string') return null;
  const q = text.toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim();
  if (!q) return null;

  // Числа в запросе (для «без дождя 6ч», «выше +20» и т.п.)
  const numbers = (q.match(/-?\d+/g) || []).map(Number);
  const firstNum = numbers.length > 0 ? numbers[0] : null;

  // Пресеты — переиспользуем concept из карточки "Окна возможностей" (фаза В3)
  if (/(пробеж|пробiж|run|jog)/.test(q))                    return { type:'preset', preset:'run', raw:q };
  if (/(шашлы|шашли|bbq|barbecue|grill)/.test(q))           return { type:'preset', preset:'bbq', raw:q };
  if (/(мой(к|т)\s*ав|мийк|car\s*wash|carwash)/.test(q))    return { type:'preset', preset:'carwash', raw:q };
  if (/(прогул|walk|выгул)/.test(q))                        return { type:'preset', preset:'walk', raw:q };
  if (/(поли(в|ть)|water(ing)?\s*plant)/.test(q))           return { type:'preset', preset:'water', raw:q };
  if (/(бель[еёє]|laundry|сушит.*дос)/.test(q))             return { type:'preset', preset:'laundry', raw:q };

  // Гроза
  if (/(гроз|молн|thunder|lightning)/.test(q))              return { type:'thunderstorm', raw:q };
  // Снег
  if (/(\bснег\b|снiг|snow|первый\s*снег)/.test(q))         return { type:'snow', raw:q };

  // Без дождя N часов
  if (/(без\s*до(ж|щ)|сух(о|их|ие)?|без\s*осад|no\s*rain|\bdry\b)/.test(q)) {
    const dur = firstNum && firstNum > 0 && firstNum <= 24 ? firstNum : 4;
    return { type:'no_rain', minDuration: dur, raw:q };
  }

  // Сильный ветер / шторм
  if (/(сильн.*ветр|сильн.*вiтр|штормит|шторм\b|windy|strong\s*wind|gale)/.test(q)) {
    return { type:'windy', threshold: firstNum != null ? firstNum : 10, raw:q };
  }
  // Без ветра / тихо / штиль
  if (/(тихо|без\s*ветр|без\s*вiтр|штил|calm|no\s*wind)/.test(q)) {
    return { type:'calm', threshold: firstNum != null ? firstNum : 3, raw:q };
  }

  // Холодно ниже / заморозок
  if (/(холодн|cold|below|ниже|нижче|заморозок|freeze|frost)/.test(q)) {
    return { type:'temp_below', threshold: firstNum != null ? firstNum : 0, raw:q };
  }
  // Тепло выше +N / жара
  if (/(тепл|тепле|жар|hot|warm|above|выше|вище|больше\s*\+|more\s*than)/.test(q)) {
    return { type:'temp_above', threshold: firstNum != null ? firstNum : 20, raw:q };
  }

  // Ясное / солнечно
  if (/(ясн|солнечн|сонячн|clear|sunny|без\s*облак)/.test(q)) {
    return { type:'clear', raw:q };
  }

  // Если есть число и слово «градус» — считаем что это temp_above
  if (firstNum != null && /(градус|°|degree)/.test(q)) {
    return { type: firstNum >= 0 ? 'temp_above' : 'temp_below', threshold: firstNum, raw:q };
  }

  return null;
}

// Возвращает функцию-предикат (час → boolean) для фильтра.
function makeSearchMatcher(filter) {
  if (!filter) return null;
  // "Сухо" (мягкий критерий): только мм/ч. Используется для общих условий
  // типа "когда без дождя 6 часов" — пользователь спрашивает количественно.
  const noRainCond = (h) => (typeof h.pmm === 'number' ? h.pmm : 0) < 0.1;
  // "Сухо" (строгий, для активностей): три критерия защиты от
  // ложноположительных «шашлык 9-13 в дождь»:
  //   1) среднее количество осадков < 0.1 мм/ч
  //   2) вероятность дождя < 35% (если большинство моделей ждут дождь, не предлагаем)
  //   3) condition (по weather_code) не дождевой/снежный/грозовой
  const noRainStrict = (h) => {
    const pmm = typeof h.pmm === 'number' ? h.pmm : 0;
    const prob = typeof h.p === 'number' ? h.p : 0;
    const badConds = ['rain', 'heavy-rain', 'thunderstorm', 'snow'];
    return pmm < 0.1 && prob < 35 && !badConds.includes(h.c);
  };
  switch (filter.type) {
    case 'no_rain':     return noRainCond;
    case 'temp_above':  return (h) => h.t >= filter.threshold;
    case 'temp_below':  return (h) => h.t < filter.threshold;
    case 'calm':        return (h) => (typeof h.w === 'number' ? h.w : 0) <= filter.threshold && noRainCond(h);
    case 'windy':       return (h) => (typeof h.w === 'number' ? h.w : 0) >= filter.threshold;
    case 'clear':       return (h) => (h.cl == null || h.cl < 30) && noRainCond(h);
    case 'thunderstorm':return (h) => h.c === 'thunderstorm' || (typeof h.wc === 'number' && h.wc >= 95 && h.wc <= 99);
    case 'snow':        return (h) => h.c === 'snow' || (typeof h.wc === 'number' && h.wc >= 71 && h.wc <= 77);
    case 'preset': {
      // Социальные часы суток для активностей — никто не жарит шашлык в 3 ночи
      // и не моет машину в час ночи, даже если погода технически "ок".
      // [hourStart, hourEnd] включительно. Полив раннее утро + вечер
      // (днём вредно — растения сгорят), у остальных — день/вечер.
      const inRange = (h, range) => h.h >= range[0] && h.h <= range[1];
      const inRanges = (h, ranges) => ranges.some(r => inRange(h, r));
      // ВСЕ активности используют noRainStrict — это спасает от ложных
      // "сухо" окон где иконка показывает дождь а среднее мм мало.
      switch (filter.preset) {
        case 'run':     return (h) => inRange(h, [5, 21])  && noRainStrict(h) && h.t >= 5 && h.t <= 28 && (h.w || 0) < 8;
        case 'bbq':     return (h) => inRange(h, [9, 22])  && noRainStrict(h) && h.t >= 12 && (h.w || 0) < 7;
        case 'carwash': return (h) => inRange(h, [8, 20])  && noRainStrict(h) && h.t > 0;
        case 'walk':    return (h) => inRange(h, [7, 22])  && noRainStrict(h) && h.t >= -2 && (h.w || 0) < 8;
        // Полив: раннее утро 6-9 или вечер 18-21. Днём вредно (солнце сожжёт капли на листьях).
        case 'water':   return (h) => inRanges(h, [[6, 9], [18, 21]]) && h.t >= 8 && h.t <= 25 && (h.cl == null || h.cl < 70);
        // Бельё на улице: солнечная середина дня, чтобы успело высохнуть до вечерней росы.
        case 'laundry': return (h) => inRange(h, [9, 18])  && noRainStrict(h) && (h.hum == null || h.hum < 70) && (h.w || 0) < 10;
        default: return null;
      }
    }
    default: return null;
  }
}

// Сканер — собирает все часы из forecast, группирует подряд идущие совпадения в окна.
// Возвращает массив окон, отсортированных по времени появления.
function findSearchWindows(forecast, filter) {
  if (!forecast || !filter) return [];
  const matcher = makeSearchMatcher(filter);
  if (!matcher) return [];

  const minDuration = filter.minDuration || 1;

  // Flatten все часы со ссылкой на день
  const all = [];
  for (let di = 0; di < forecast.length; di++) {
    const day = forecast[di];
    if (!day || !day.hourly) continue;
    for (let hi = 0; hi < day.hourly.length; hi++) {
      all.push({ h: day.hourly[hi], dayIdx: di, hourIdx: hi, day });
    }
  }
  // Для "сегодня" отсекаем часы до текущего — искать в прошлом бессмысленно
  const startCursor = (forecast[0] && forecast[0].id === 0) ? NOW_HOUR : 0;
  const filtered = all.slice(startCursor);

  const windows = [];
  let run = null;
  // Длинные окна, перекрывающие несколько дней, разбиваем на пер-дневные сегменты —
  // иначе суббота, входящая в "Сегодня→Сб→Вс" 48-часовое окно, скрывается под лейблом "Сегодня".
  const pushRun = (start, end) => {
    const byDay = new Map();
    for (let k = start; k <= end; k++) {
      const di = filtered[k].dayIdx;
      if (!byDay.has(di)) byDay.set(di, { startI: k, endI: k });
      else byDay.get(di).endI = k;
    }
    for (const range of byDay.values()) {
      windows.push(buildSearchWindow(filtered, range.startI, range.endI));
    }
  };
  for (let i = 0; i < filtered.length; i++) {
    if (matcher(filtered[i].h)) {
      if (!run) run = { startI: i, endI: i };
      else run.endI = i;
    } else if (run) {
      pushRun(run.startI, run.endI);
      run = null;
    }
  }
  if (run) pushRun(run.startI, run.endI);

  // Фильтрация по minDuration, потом сортировка:
  // ближайшие окна важнее, но среди равных по близости — длинные приоритетнее
  // (комбинированный score: dayIdx * 10000 - duration; меньше = лучше)
  return windows
    .filter(w => w.duration >= minDuration)
    .sort((a, b) => {
      // Сначала по дню (раньше = выше)
      if (a.dayIdx !== b.dayIdx) return a.dayIdx - b.dayIdx;
      // Внутри одного дня — по длительности убыванию
      return b.duration - a.duration;
    })
    .slice(0, 15);
}

function buildSearchWindow(items, startI, endI) {
  const slice = items.slice(startI, endI + 1);
  const first = slice[0];
  const last = slice[slice.length - 1];
  const temps = slice.map(s => s.h.t).filter(v => typeof v === 'number');
  const winds = slice.map(s => s.h.w || 0);
  const midItem = slice[Math.floor(slice.length / 2)];
  return {
    duration: slice.length,
    dayIdx: first.dayIdx,
    day: first.day,
    hourStart: first.h.h,
    hourEnd: last.h.h,
    startHourIdx: first.hourIdx,
    tMin: temps.length ? Math.min(...temps) : 0,
    tMax: temps.length ? Math.max(...temps) : 0,
    wAvg: Math.round(winds.reduce((a, b) => a + b, 0) / winds.length),
    cond: midItem.h.c || 'cloudy'
  };
}

function renderSearchResults(windows, filter) {
  const container = document.getElementById('searchResults');
  if (!container) return;

  if (!windows.length) {
    container.innerHTML = `
      <div class="search-empty">
        <div class="search-empty-icon">😔</div>
        <div class="search-empty-title">${t('search.empty.title')}</div>
        <div class="search-empty-hint">${t('search.empty.hint')}</div>
      </div>`;
    return;
  }

  const n = windows.length;
  const label = n === 1 ? t('search.results.label.one')
              : (n <= 4 ? t('search.results.label.few') : t('search.results.label.many'));
  const header = `<div class="search-presets-title">${t('search.results.found', { n, label })}</div>`;

  const cards = windows.map(w => {
    const dayName = w.dayIdx === 0 ? t('search.day.today')
                  : (w.dayIdx === 1 ? t('search.day.tomorrow')
                  : `${localizeDayShort(w.day.name)}, ${(w.day.date || '').slice(0,5)}`);
    // Конец часа = час +1 (час 22 = «с 22:00 до 23:00»). Иначе «22:00–22:00» выглядит
    // как 0-часовое окно при duration:1. Час 23 → 24:00 (читается как «до полуночи»).
    const endHourRaw = w.hourEnd + 1;
    const endHourStr = endHourRaw === 24 ? '24' : String(endHourRaw).padStart(2,'0');
    const range = `${String(w.hourStart).padStart(2,'0')}:00 – ${endHourStr}:00`;
    const durStr = t('search.duration.hours', { n: w.duration });
    const tLo = fmtTempNum(w.tMin), tHi = fmtTempNum(w.tMax);
    const tempStr = `${tLo}…${tHi}${unitTemp()}`;
    const windStr = `💨 ${fmtWind(w.wAvg, { withUnit: false })} ${unitWind()}`;
    return `
      <div class="search-result-card" data-day-idx="${w.dayIdx}" data-hour="${w.startHourIdx}">
        <div class="search-result-icon">${weatherIcon(w.cond, 46)}</div>
        <div class="search-result-body">
          <div class="search-result-head"><span class="sr-day">${dayName}</span> · <span class="sr-range">${range}</span> · ${durStr}</div>
          <div class="search-result-meta"><span>🌡 ${tempStr}</span><span>${windStr}</span></div>
        </div>
        <div class="search-result-arrow">→</div>
      </div>`;
  }).join('');

  container.innerHTML = header + cards;
  container.querySelectorAll('.search-result-card').forEach(card => {
    card.addEventListener('click', () => {
      const dayIdx = parseInt(card.dataset.dayIdx, 10);
      const hour = parseInt(card.dataset.hour, 10);
      // Поднимаем флаг — после закрытия day/hourly модалки возвращаемся в search.
      _returnToSearchModal = true;
      // Мост — плотный фон поверх всего на время перехода, чтобы не мелькнул
      // главный экран между фейд-аутом search и фейд-ином day.
      startModalBridge();
      if (dayIdx === 0) openHourlyDetail(isNaN(hour) ? 0 : hour);
      else openModal(dayIdx);
      closeSearchModal();
    });
  });
}

function doSearch(query) {
  const resultsEl = document.getElementById('searchResults');
  if (!resultsEl) return;
  const filter = parseSearchQuery(query);
  if (!filter) {
    resultsEl.innerHTML = `<div class="search-error">${t('search.error.parse')}</div>`;
    return;
  }
  const forecast = getForecast(currentSourceId);
  const windows = findSearchWindows(forecast, filter);
  renderSearchResults(windows, filter);
}

function renderSearchPresets() {
  const grid = document.getElementById('searchPresetsGrid');
  if (!grid) return;
  // Локализованный запрос (в actual query идёт нелокализованная подсказка — парсер всё равно matchнет)
  const presets = [
    { emoji:'🌤', key:'search.preset.norain',  query:'без дождя 6 часов' },
    { emoji:'🌡', key:'search.preset.warm',    query:'когда выше +20' },
    { emoji:'☀',  key:'search.preset.clear',   query:'когда ясно' },
    { emoji:'💨', key:'search.preset.calm',    query:'без ветра' },
    { emoji:'🏃', key:'search.preset.run',     query:'пробежка' },
    { emoji:'🍖', key:'search.preset.bbq',     query:'шашлык' },
    { emoji:'🚗', key:'search.preset.carwash', query:'мойка авто' },
    { emoji:'⛈', key:'search.preset.storm',   query:'когда гроза' }
  ];
  grid.innerHTML = presets.map(p =>
    `<button class="search-preset" type="button" data-query="${p.query}">
      <span class="search-preset-emoji">${p.emoji}</span>
      <span>${t(p.key)}</span>
    </button>`).join('');
  grid.querySelectorAll('.search-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.query;
      const input = document.getElementById('searchInput');
      if (input) input.value = q;
      doSearch(q);
    });
  });
}

function openSearchModal() {
  const modal = document.getElementById('searchModal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Перерисовать пресеты (текст обновится при смене языка)
  renderSearchPresets();
  // Фокус в инпут после анимации
  setTimeout(() => {
    const input = document.getElementById('searchInput');
    if (input) input.focus();
  }, 320);
  searchEscHandler = (e) => { if (e.key === 'Escape') closeSearchModal(); };
  document.addEventListener('keydown', searchEscHandler);
}

function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (searchEscHandler) {
    document.removeEventListener('keydown', searchEscHandler);
    searchEscHandler = null;
  }
}

function setupSearchModal() {
  const chip = document.getElementById('searchChip');
  const modal = document.getElementById('searchModal');
  const closeBtn = document.getElementById('searchModalClose');
  const input = document.getElementById('searchInput');
  const submitBtn = document.getElementById('searchSubmitBtn');
  const clearBtn = document.getElementById('searchClearBtn');
  if (!chip || !modal || !input || !submitBtn) return;

  chip.addEventListener('click', openSearchModal);
  closeBtn.addEventListener('click', closeSearchModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeSearchModal(); });

  submitBtn.addEventListener('click', () => doSearch(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); doSearch(input.value); }
  });
  input.addEventListener('input', () => {
    clearBtn.style.display = input.value ? '' : 'none';
  });
  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    const results = document.getElementById('searchResults');
    if (results) results.innerHTML = '';
    input.focus();
  });
}

/* ============================================
   TTS — Аудио-резюме погоды (Web Speech API)
   Генератор текста + контроллер speak/stop + работа со списком голосов.
   ============================================ */

const TTS_SUPPORTED = ('speechSynthesis' in window) && ('SpeechSynthesisUtterance' in window);
let _ttsVoicesCache = null;          // массив SpeechSynthesisVoice
let _ttsCurrentUtterance = null;     // активный говорящий utterance (для остановки)

// Имена голосов которые мы считаем "женскими" (по платформам).
// Не идеально (нет cross-browser gender API), но покрывает 90% случаев.
const FEMALE_VOICE_NAMES = [
  // Russian
  'Milena','Yelena','Irina','Tatyana','Katyusha','Maria','Anna','Elena',
  // Ukrainian
  'Lesya','Solomiya',
  // English (часто полезно как fallback)
  'Samantha','Karen','Tessa','Moira','Victoria','Susan','Allison','Ava','Zira','Eva','Fiona',
  // generic markers
  'Female','female'
];
const MALE_VOICE_NAMES = ['Yuri','Pavel','Daniel','Alex','Tom','David','Mark','Pavlo'];

function ttsLangCode() {
  // Маппим наш state.lang в BCP-47 для Web Speech
  if (state.lang === 'uk') return 'uk-UA';
  if (state.lang === 'en') return 'en-US';
  if (state.lang === 'de') return 'de-DE';
  if (state.lang === 'pl') return 'pl-PL';
  if (state.lang === 'cs') return 'cs-CZ';
  if (state.lang === 'fr') return 'fr-FR';
  if (state.lang === 'it') return 'it-IT';
  if (state.lang === 'es') return 'es-ES';
  if (state.lang === 'ro') return 'ro-RO';
  if (state.lang === 'hu') return 'hu-HU';
  if (state.lang === 'sk') return 'sk-SK';
  if (state.lang === 'pt') return 'pt-PT';
  if (state.lang === 'nl') return 'nl-NL';
  if (state.lang === 'tr') return 'tr-TR';
  if (state.lang === 'el') return 'el-GR';
  return 'ru-RU';
}

// Считается, что имя голоса принадлежит женщине, если содержит одно из FEMALE_VOICE_NAMES.
function voiceGender(voice) {
  const n = (voice.name || '').toLowerCase();
  for (const fn of FEMALE_VOICE_NAMES) if (n.includes(fn.toLowerCase())) return 'female';
  for (const mn of MALE_VOICE_NAMES) if (n.includes(mn.toLowerCase())) return 'male';
  return 'unknown';
}

// Список голосов, релевантных для текущего языка + общедоступных как fallback (en).
// При недостатке возвращаем все голоса.
function getAvailableVoices() {
  if (!TTS_SUPPORTED) return [];
  const all = speechSynthesis.getVoices() || [];
  if (!all.length) return [];
  const lang = ttsLangCode();
  const langPrefix = lang.split('-')[0];
  // Сначала точное совпадение языка, потом тот же языковой prefix, потом fallback en
  const sameLang = all.filter(v => v.lang === lang);
  const samePrefix = all.filter(v => v.lang.startsWith(langPrefix + '-') && v.lang !== lang);
  const enFallback = all.filter(v => v.lang.startsWith('en-'));
  // Возвращаем primary (нашего языка) + английские как запасной (для редких uk-UA случаев)
  const primary = [...sameLang, ...samePrefix];
  if (primary.length > 0) return primary;
  return enFallback.length > 0 ? enFallback : all;
}

// Выбираем активный голос: 1) сохранённый по voiceURI, 2) первый женский, 3) первый из списка.
function pickActiveVoice() {
  const voices = getAvailableVoices();
  if (!voices.length) return null;
  if (state.voice.voiceURI) {
    const found = voices.find(v => v.voiceURI === state.voice.voiceURI);
    if (found) return found;
  }
  const female = voices.find(v => voiceGender(v) === 'female');
  return female || voices[0];
}

// Voices грузятся асинхронно в Chrome/Firefox. Дожидаемся первого заполнения.
function ensureVoicesLoaded() {
  return new Promise((resolve) => {
    if (!TTS_SUPPORTED) { resolve([]); return; }
    let voices = speechSynthesis.getVoices();
    if (voices && voices.length) { _ttsVoicesCache = voices; resolve(voices); return; }
    const handler = () => {
      voices = speechSynthesis.getVoices() || [];
      _ttsVoicesCache = voices;
      speechSynthesis.removeEventListener('voiceschanged', handler);
      resolve(voices);
    };
    speechSynthesis.addEventListener('voiceschanged', handler);
    // Защитный таймаут на случай если событие не сработает
    setTimeout(() => {
      voices = speechSynthesis.getVoices() || [];
      _ttsVoicesCache = voices;
      resolve(voices);
    }, 1500);
  });
}

// --- Локализация числа: «плюс 13 / минус 5» вместо «13 / −5» ---
function spokenTemp(c) {
  const n = Math.round(c);
  if (state.lang === 'ru') {
    if (n > 0) return `плюс ${n}`;
    if (n < 0) return `минус ${Math.abs(n)}`;
    return 'ноль';
  }
  if (state.lang === 'uk') {
    if (n > 0) return `плюс ${n}`;
    if (n < 0) return `мінус ${Math.abs(n)}`;
    return 'нуль';
  }
  if (state.lang === 'de') {
    if (n > 0) return `plus ${n}`;
    if (n < 0) return `minus ${Math.abs(n)}`;
    return 'null';
  }
  if (state.lang === 'pl') {
    if (n > 0) return `plus ${n}`;
    if (n < 0) return `minus ${Math.abs(n)}`;
    return 'zero';
  }
  if (state.lang === 'cs') {
    if (n > 0) return `plus ${n}`;
    if (n < 0) return `minus ${Math.abs(n)}`;
    return 'nula';
  }
  if (state.lang === 'fr') {
    if (n > 0) return `plus ${n}`;
    if (n < 0) return `moins ${Math.abs(n)}`;
    return 'zéro';
  }
  if (state.lang === 'it') {
    if (n > 0) return `più ${n}`;
    if (n < 0) return `meno ${Math.abs(n)}`;
    return 'zero';
  }
  if (state.lang === 'es') {
    if (n > 0) return `más ${n}`;
    if (n < 0) return `menos ${Math.abs(n)}`;
    return 'cero';
  }
  if (state.lang === 'ro') {
    if (n > 0) return `plus ${n}`;
    if (n < 0) return `minus ${Math.abs(n)}`;
    return 'zero';
  }
  if (state.lang === 'hu') {
    if (n > 0) return `plusz ${n}`;
    if (n < 0) return `mínusz ${Math.abs(n)}`;
    return 'nulla';
  }
  if (state.lang === 'sk') {
    if (n > 0) return `plus ${n}`;
    if (n < 0) return `mínus ${Math.abs(n)}`;
    return 'nula';
  }
  if (state.lang === 'pt') {
    if (n > 0) return `mais ${n}`;
    if (n < 0) return `menos ${Math.abs(n)}`;
    return 'zero';
  }
  if (state.lang === 'nl') {
    if (n > 0) return `plus ${n}`;
    if (n < 0) return `min ${Math.abs(n)}`;
    return 'nul';
  }
  if (state.lang === 'tr') {
    if (n > 0) return `artı ${n}`;
    if (n < 0) return `eksi ${Math.abs(n)}`;
    return 'sıfır';
  }
  if (state.lang === 'el') {
    if (n > 0) return `συν ${n}`;
    if (n < 0) return `πλην ${Math.abs(n)}`;
    return 'μηδέν';
  }
  // en
  if (n > 0) return `plus ${n}`;
  if (n < 0) return `minus ${Math.abs(n)}`;
  return 'zero';
}

// Сборка текста резюме на текущем языке для одного дня прогноза.
function generateWeatherSummary(forecast, dayIdx = 0) {
  const day = forecast && forecast[dayIdx];
  if (!day) return '';
  const lang = state.lang;
  const cond = localizeCondLabel(day.condLabel) || '';
  const tMax = spokenTemp(convertTemp(day.max, state.units.temp));
  const tMin = spokenTemp(convertTemp(day.min, state.units.temp));
  const windV = Math.round(convertWind(day.wind, state.units.wind));
  const precipPct = day.precip;
  const cityName = (localizeCity(currentLocation).name || currentLocation.name || '').trim();

  const parts = [];
  if (lang === 'uk') {
    parts.push(dayIdx === 0 ? `Сьогодні в ${cityName}.` : `${localizeDayShort(day.name)}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Температура від ${tMin} до ${tMax} градусів.`);
    parts.push(`Швидкість вітру ${windV} метрів за секунду.`);
    if (precipPct >= 60) parts.push(`Ймовірність опадів ${precipPct} відсотків.`);
    else if (precipPct >= 30) parts.push(`Можливі опади.`);
  } else if (lang === 'en') {
    parts.push(dayIdx === 0 ? `Today in ${cityName}.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Temperature from ${tMin} to ${tMax} degrees.`);
    parts.push(`Wind speed ${windV} meters per second.`);
    if (precipPct >= 60) parts.push(`Precipitation probability ${precipPct} percent.`);
    else if (precipPct >= 30) parts.push(`Some precipitation possible.`);
  } else if (lang === 'de') {
    parts.push(dayIdx === 0 ? `Heute in ${cityName}.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Temperatur von ${tMin} bis ${tMax} Grad.`);
    parts.push(`Windgeschwindigkeit ${windV} Meter pro Sekunde.`);
    if (precipPct >= 60) parts.push(`Niederschlagswahrscheinlichkeit ${precipPct} Prozent.`);
    else if (precipPct >= 30) parts.push(`Leichter Niederschlag möglich.`);
  } else if (lang === 'pl') {
    parts.push(dayIdx === 0 ? `Dzisiaj w ${cityName}.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Temperatura od ${tMin} do ${tMax} stopni.`);
    parts.push(`Prędkość wiatru ${windV} metrów na sekundę.`);
    if (precipPct >= 60) parts.push(`Prawdopodobieństwo opadów ${precipPct} procent.`);
    else if (precipPct >= 30) parts.push(`Możliwe niewielkie opady.`);
  } else if (lang === 'cs') {
    parts.push(dayIdx === 0 ? `Dnes v ${cityName}.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Teplota od ${tMin} do ${tMax} stupňů.`);
    parts.push(`Rychlost větru ${windV} metrů za sekundu.`);
    if (precipPct >= 60) parts.push(`Pravděpodobnost srážek ${precipPct} procent.`);
    else if (precipPct >= 30) parts.push(`Možné mírné srážky.`);
  } else if (lang === 'fr') {
    parts.push(dayIdx === 0 ? `Aujourd'hui à ${cityName}.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Température de ${tMin} à ${tMax} degrés.`);
    parts.push(`Vitesse du vent ${windV} mètres par seconde.`);
    if (precipPct >= 60) parts.push(`Probabilité de précipitations ${precipPct} pour cent.`);
    else if (precipPct >= 30) parts.push(`Quelques précipitations possibles.`);
  } else if (lang === 'it') {
    parts.push(dayIdx === 0 ? `Oggi a ${cityName}.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Temperatura da ${tMin} a ${tMax} gradi.`);
    parts.push(`Velocità del vento ${windV} metri al secondo.`);
    if (precipPct >= 60) parts.push(`Probabilità di precipitazioni ${precipPct} per cento.`);
    else if (precipPct >= 30) parts.push(`Possibili precipitazioni leggere.`);
  } else if (lang === 'es') {
    parts.push(dayIdx === 0 ? `Hoy en ${cityName}.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Temperatura de ${tMin} a ${tMax} grados.`);
    parts.push(`Velocidad del viento ${windV} metros por segundo.`);
    if (precipPct >= 60) parts.push(`Probabilidad de precipitaciones ${precipPct} por ciento.`);
    else if (precipPct >= 30) parts.push(`Posibles precipitaciones ligeras.`);
  } else if (lang === 'ro') {
    parts.push(dayIdx === 0 ? `Astăzi în ${cityName}.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Temperatura de la ${tMin} la ${tMax} grade.`);
    parts.push(`Viteza vântului ${windV} metri pe secundă.`);
    if (precipPct >= 60) parts.push(`Probabilitatea precipitațiilor ${precipPct} la sută.`);
    else if (precipPct >= 30) parts.push(`Sunt posibile precipitații ușoare.`);
  } else if (lang === 'hu') {
    parts.push(dayIdx === 0 ? `Ma ${cityName}-ban.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Hőmérséklet ${tMin}-tól ${tMax}-ig fok.`);
    parts.push(`Szélsebesség ${windV} méter másodpercenként.`);
    if (precipPct >= 60) parts.push(`Csapadék valószínűsége ${precipPct} százalék.`);
    else if (precipPct >= 30) parts.push(`Kisebb csapadék lehetséges.`);
  } else if (lang === 'sk') {
    parts.push(dayIdx === 0 ? `Dnes v ${cityName}.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Teplota od ${tMin} do ${tMax} stupňov.`);
    parts.push(`Rýchlosť vetra ${windV} metrov za sekundu.`);
    if (precipPct >= 60) parts.push(`Pravdepodobnosť zrážok ${precipPct} percent.`);
    else if (precipPct >= 30) parts.push(`Možné mierne zrážky.`);
  } else if (lang === 'pt') {
    parts.push(dayIdx === 0 ? `Hoje em ${cityName}.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Temperatura de ${tMin} a ${tMax} graus.`);
    parts.push(`Velocidade do vento ${windV} metros por segundo.`);
    if (precipPct >= 60) parts.push(`Probabilidade de precipitação ${precipPct} por cento.`);
    else if (precipPct >= 30) parts.push(`Possíveis precipitações leves.`);
  } else if (lang === 'nl') {
    parts.push(dayIdx === 0 ? `Vandaag in ${cityName}.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Temperatuur van ${tMin} tot ${tMax} graden.`);
    parts.push(`Windsnelheid ${windV} meter per seconde.`);
    if (precipPct >= 60) parts.push(`Neerslagkans ${precipPct} procent.`);
    else if (precipPct >= 30) parts.push(`Lichte neerslag mogelijk.`);
  } else if (lang === 'tr') {
    parts.push(dayIdx === 0 ? `Bugün ${cityName}'da.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Sıcaklık ${tMin} ile ${tMax} derece arasında.`);
    parts.push(`Rüzgar hızı saniyede ${windV} metre.`);
    if (precipPct >= 60) parts.push(`Yağış olasılığı yüzde ${precipPct}.`);
    else if (precipPct >= 30) parts.push(`Hafif yağış olası.`);
  } else if (lang === 'el') {
    parts.push(dayIdx === 0 ? `Σήμερα στη/ν ${cityName}.` : `${day.name}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Θερμοκρασία από ${tMin} έως ${tMax} βαθμούς.`);
    parts.push(`Ταχύτητα ανέμου ${windV} μέτρα ανά δευτερόλεπτο.`);
    if (precipPct >= 60) parts.push(`Πιθανότητα βροχόπτωσης ${precipPct} τοις εκατό.`);
    else if (precipPct >= 30) parts.push(`Πιθανή ελαφρά βροχόπτωση.`);
  } else {
    // ru
    parts.push(dayIdx === 0 ? `Сегодня в ${cityName}.` : `${localizeDayShort(day.name)}, ${(day.date||'').slice(0,5)}.`);
    if (cond) parts.push(`${cond}.`);
    parts.push(`Температура от ${tMin} до ${tMax} градусов.`);
    parts.push(`Скорость ветра ${windV} метров в секунду.`);
    if (precipPct >= 60) parts.push(`Вероятность осадков ${precipPct} процентов.`);
    else if (precipPct >= 30) parts.push(`Возможны небольшие осадки.`);
  }
  return parts.join(' ');
}

// Запускаем озвучку. onEnd вызывается когда речь закончилась или прервана.
function speakText(text, onEnd) {
  if (!TTS_SUPPORTED || !text) { if (onEnd) onEnd(); return; }
  stopSpeaking();  // прерываем предыдущую если играет
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = ttsLangCode();
  utter.rate = state.voice.rate || 1.0;
  utter.pitch = 1.0;
  utter.volume = 1.0;
  const voice = pickActiveVoice();
  if (voice) utter.voice = voice;
  utter.onend = () => { _ttsCurrentUtterance = null; if (onEnd) onEnd(); };
  utter.onerror = () => { _ttsCurrentUtterance = null; if (onEnd) onEnd(); };
  _ttsCurrentUtterance = utter;
  speechSynthesis.speak(utter);
}

function stopSpeaking() {
  if (!TTS_SUPPORTED) return;
  if (speechSynthesis.speaking || speechSynthesis.pending) {
    speechSynthesis.cancel();
  }
  _ttsCurrentUtterance = null;
}

function isSpeaking() {
  return TTS_SUPPORTED && (speechSynthesis.speaking || speechSynthesis.pending);
}

// === UI ===

// Рисуем список доступных голосов в settings-modal.
async function renderVoiceList() {
  const container = document.getElementById('voiceList');
  if (!container) return;
  if (!TTS_SUPPORTED) {
    container.innerHTML = `<div class="voice-list-empty">${t('settings.voice.none')}</div>`;
    return;
  }
  await ensureVoicesLoaded();
  const voices = getAvailableVoices();
  if (!voices.length) {
    container.innerHTML = `<div class="voice-list-empty">${t('settings.voice.none')}</div>`;
    return;
  }
  // Если ничего ещё не сохранено в state — выбираем первый женский (или первый из списка) и сохраняем
  if (!state.voice.voiceURI) {
    const active = pickActiveVoice();
    if (active) {
      state.voice.voiceURI = active.voiceURI;
      saveSettings();
    }
  }
  container.innerHTML = voices.map(v => {
    const gender = voiceGender(v);
    const genderLabel = gender === 'female' ? t('settings.voice.female')
                      : gender === 'male' ? t('settings.voice.male') : '';
    const isActive = v.voiceURI === state.voice.voiceURI;
    return `
      <div class="voice-item${isActive ? ' active' : ''}" data-voice-uri="${escapeHtml(v.voiceURI)}">
        <span class="voice-radio"></span>
        <span class="voice-name">${escapeHtml(v.name)}</span>
        ${genderLabel ? `<span class="voice-gender ${gender}">${escapeHtml(genderLabel)}</span>` : ''}
        <span class="voice-lang">${escapeHtml(v.lang)}</span>
        <button type="button" class="voice-preview-btn" aria-label="${escapeHtml(t('settings.voice.preview'))}" title="${escapeHtml(t('settings.voice.preview'))}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>`;
  }).join('');

  container.querySelectorAll('.voice-item').forEach(item => {
    const uri = item.dataset.voiceUri;
    item.addEventListener('click', () => {
      state.voice.voiceURI = uri;
      saveSettings();
      // Обновляем active-стиль
      container.querySelectorAll('.voice-item').forEach(el => el.classList.toggle('active', el.dataset.voiceUri === uri));
    });
    // Превью голоса — не должно переключать (stopPropagation)
    const previewBtn = item.querySelector('.voice-preview-btn');
    previewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Временно делаем этот голос активным для preview, потом возвращаем сохранённый
      const savedUri = state.voice.voiceURI;
      state.voice.voiceURI = uri;
      speakText(t('settings.voice.previewText'), () => {
        // Восстанавливаем выбор пользователя если он не менял голос
        state.voice.voiceURI = savedUri;
      });
    });
  });
}

// Обновить состояние footer-кнопки "Озвучить" (показывать / прятать / play / stop)
function refreshSpeakButton() {
  const btn = document.getElementById('btnSpeak');
  if (!btn) return;
  // Если TTS не поддерживается — прячем кнопку
  if (!TTS_SUPPORTED) {
    btn.style.display = 'none';
    return;
  }
  // Если голосов нет — тоже прячем (пока async проверка делается, она будет повторно вызвана)
  const voices = getAvailableVoices();
  btn.style.display = voices.length > 0 ? '' : 'none';
  // Состояние "сейчас играет"
  const speaking = isSpeaking();
  btn.classList.toggle('speaking', speaking);
  const labelSpan = btn.querySelector('.speak-chip-label');
  if (labelSpan) {
    labelSpan.setAttribute('data-i18n', speaking ? 'footer.speakStop' : 'footer.speak');
    labelSpan.textContent = t(speaking ? 'footer.speakStop' : 'footer.speak');
  }
}

function onSpeakBtnClick() {
  if (!TTS_SUPPORTED) return;
  if (isSpeaking()) {
    stopSpeaking();
    refreshSpeakButton();
    return;
  }
  const forecast = getForecast(currentSourceId);
  const text = generateWeatherSummary(forecast, 0);
  if (!text) return;
  speakText(text, () => refreshSpeakButton());
  refreshSpeakButton();
}

function setupSpeakButton() {
  const btn = document.getElementById('btnSpeak');
  if (!btn) return;
  btn.addEventListener('click', onSpeakBtnClick);
  // Подписываемся на voiceschanged чтобы прятать/показывать кнопку и перерисовывать список
  if (TTS_SUPPORTED) {
    ensureVoicesLoaded().then(() => {
      refreshSpeakButton();
      // Если на момент load уже открыта settings — обновим список (защита от race)
      const settingsModalEl = document.getElementById('settingsModal');
      if (settingsModalEl && settingsModalEl.classList.contains('open')) renderVoiceList();
    });
    speechSynthesis.addEventListener('voiceschanged', () => {
      _ttsVoicesCache = speechSynthesis.getVoices();
      refreshSpeakButton();
      const settingsModalEl = document.getElementById('settingsModal');
      if (settingsModalEl && settingsModalEl.classList.contains('open')) renderVoiceList();
    });
  }
}

// Привязка кликов на табы метрик. Вызывается один раз при init.
function setupHourlyTabs() {
  document.querySelectorAll('#hourlyTabs .ht-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentHourlyMetric = btn.dataset.metric;
      renderHourlyRow(getForecast(currentSourceId));
    });
  });
}

// Кнопки прокрутки «‹ ›» для горизонтальных скролл-карточек.
// Один раз вешает обработчики на все .scroll-arrow и слушает scroll для disabled-состояния.
function setupScrollArrows() {
  document.querySelectorAll('.scroll-arrow').forEach(btn => {
    const targetId = btn.dataset.scrollTarget;
    const target = document.getElementById(targetId);
    if (!target) return;
    const isRight = btn.classList.contains('right');
    btn.addEventListener('click', () => {
      // Прокручиваем на ~80% видимой ширины — мягко, чтобы не «перепрыгнуть»
      const delta = target.clientWidth * 0.8 * (isRight ? 1 : -1);
      target.scrollBy({ left: delta, behavior: 'smooth' });
    });
  });
  // Слушаем scroll на каждом таргете, чтобы прятать неактивную стрелку
  const targets = new Set();
  document.querySelectorAll('.scroll-arrow').forEach(b => {
    const t = document.getElementById(b.dataset.scrollTarget);
    if (t) targets.add(t);
  });
  targets.forEach(t => {
    const update = () => updateScrollArrows(t);
    t.addEventListener('scroll', update, { passive: true });
    update();
  });
  // Также пересчитать при ресайзе окна (например при повороте устройства)
  window.addEventListener('resize', () => {
    targets.forEach(t => updateScrollArrows(t));
  });
}

function updateScrollArrows(target) {
  const max = target.scrollWidth - target.clientWidth;
  const cur = target.scrollLeft;
  const atStart = cur <= 1;
  const atEnd = cur >= max - 1;
  const noScroll = max <= 1;
  document.querySelectorAll(`.scroll-arrow[data-scroll-target="${target.id}"]`).forEach(btn => {
    const isRight = btn.classList.contains('right');
    const disabled = noScroll || (isRight ? atEnd : atStart);
    btn.classList.toggle('disabled', disabled);
  });
}

// График осадков (мм/ч) на ближайшие 48 часов от текущего часа.
// Использует несколько последовательных дней forecast (обычно 3: сегодня-хвост + завтра + послезавтра-головной кусок).
// Фиксированная ширина по часам, контейнер скроллится горизонтально.
// Под графиком — ряд эмодзи (тип осадков: дождь/снег/гроза) и полоска с сегментами дней.
// На границах суток в графике — пунктирная вертикальная линия.
const PRECIP_PX_PER_HOUR = 32;
const PRECIP_TARGET_HOURS = 48;

// Определяет тип осадков для часа на основе condition/weather_code и фактического pmm.
// Порог 0.05 мм/ч — отсекает «технические» следы прогноза без видимых осадков.
function precipKind(h) {
  if (!h || typeof h.pmm !== 'number' || h.pmm < 0.05) return null;
  const c = h.c;
  if (c === 'snow') return 'snow';
  if (c === 'thunderstorm') return 'storm';
  if (c === 'rain' || c === 'heavy-rain') return 'rain';
  // Прочие условия с заметным pmm (морось, fog с осадками) — считаем дождём.
  return 'rain';
}

const PRECIP_KIND_COLORS = {
  rain:  '#00d4ff',
  snow:  '#dbeefd',
  storm: '#c4b5fd'
};
const PRECIP_KIND_EMOJI = {
  rain:  '💧',
  snow:  '❄',
  storm: '⛈'
};

// Ленивая загрузка Chart.js — однократно, по требованию (первое открытие
// модалки с графиком осадков или почасовой). Промис кешируется.
let _chartJsPromise = null;
function ensureChartJs() {
  if (window.Chart) return Promise.resolve(window.Chart);
  if (_chartJsPromise) return _chartJsPromise;
  _chartJsPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
    s.integrity = 'sha384-9nhczxUqK87bcKHh20fSQcTGD4qq5GhayNYSYWqwBkINBhOfQLg/P5HG5lF1urn4';
    s.crossOrigin = 'anonymous';
    s.referrerPolicy = 'no-referrer';
    s.onload = () => resolve(window.Chart);
    s.onerror = (e) => { _chartJsPromise = null; reject(new Error('Chart.js load failed')); };
    document.head.appendChild(s);
  });
  return _chartJsPromise;
}

function renderPrecipChart(forecast) {
  const canvas = document.getElementById('precipChart');
  const inner = document.getElementById('precipInner');
  const daysBar = document.getElementById('precipDays');
  const typesBar = document.getElementById('precipTypes');
  if (!canvas || !inner || !daysBar || !typesBar) return;
  if (!forecast || !forecast[0] || !forecast[0].hourly) return;
  // Lazy-load Chart.js — если ещё не загружен, дотягиваем и пере-вызываем себя
  if (!window.Chart) {
    ensureChartJs().then(() => renderPrecipChart(forecast)).catch(err => {
      console.warn('Chart.js не загрузился:', err);
    });
    return;
  }

  // Собираем последовательность из дней forecast, начиная с сегодня от NOW_HOUR.
  // Каждый сегмент: { day, hours } — где hours это кусок из day.hourly.
  // Останавливаемся когда набрали 48 часов или forecast кончился.
  const segments = [];
  let collected = 0;
  for (let di = 0; di < forecast.length && collected < PRECIP_TARGET_HOURS; di++) {
    const day = forecast[di];
    if (!day || !day.hourly) continue;
    const startHour = (di === 0) ? NOW_HOUR : 0;
    const need = PRECIP_TARGET_HOURS - collected;
    const hours = day.hourly.slice(startHour, startHour + need);
    if (hours.length === 0) continue;
    segments.push({ day, hours });
    collected += hours.length;
  }

  // Плоский массив всех часов для графика; обогащаем каждый час индексом дня (сегмента),
  // чтобы потом красить x-ticks в цвет своего дня.
  const merged = [];
  segments.forEach((s, si) => s.hours.forEach(h => merged.push(Object.assign({}, h, { _dayIdx: si }))));
  if (merged.length === 0) return;

  // Фикс. ширина: PRECIP_PX_PER_HOUR на каждый час. Получаем горизонтальный scroll, если viewport уже.
  const totalWidth = merged.length * PRECIP_PX_PER_HOUR;
  inner.style.width = totalWidth + 'px';

  // Полоска дней под графиком: по одному сегменту на каждый день.
  // Полное название (Среда, Четверг…) + чередующаяся подсветка тоном дня.
  daysBar.innerHTML = segments.map((s, i) => {
    const d = s.day;
    const dateShort = d.date ? d.date.slice(0,5) : '';
    const label = (i === 0 && d.id === 0)
      ? `${t('day.today')} · ${dateShort}`
      : `${localizeDayFull(d.dayName) || localizeDayShort(d.name)} · ${dateShort}`;
    return `<div class="precip-day" data-day-idx="${i % 3}" style="width:${s.hours.length * PRECIP_PX_PER_HOUR}px">${label}</div>`;
  }).join('');

  const labels = merged.map(h => String(h.h).padStart(2, '0'));
  const values = merged.map(h => (typeof h.pmm === 'number' ? h.pmm : 0));
  const kinds = merged.map(h => precipKind(h));

  // Ряд эмодзи под графиком: один блок на каждый час, эмодзи только там где есть осадки.
  typesBar.innerHTML = kinds.map((k) => {
    const emoji = k ? PRECIP_KIND_EMOJI[k] : '';
    const cls = k ? `precip-type ${k}` : 'precip-type';
    return `<div class="${cls}" style="width:${PRECIP_PX_PER_HOUR}px">${emoji}</div>`;
  }).join('');

  // Индексы где начинается новый день (для пунктирных разделителей в графике)
  const dayBreakIndices = [];
  let acc = 0;
  for (let i = 0; i < segments.length - 1; i++) {
    acc += segments[i].hours.length;
    dayBreakIndices.push(acc);
  }

  const ctx = canvas.getContext('2d');
  if (precipChartInstance) precipChartInstance.destroy();

  const maxVal = Math.max(...values, 1);

  // Градиент заливки под линией: насыщенный бирюзовый внизу → прозрачный наверху
  const fillGrad = ctx.createLinearGradient(0, 0, 0, 200);
  fillGrad.addColorStop(0, 'rgba(0,212,255,0.45)');
  fillGrad.addColorStop(0.5, 'rgba(77,171,247,0.18)');
  fillGrad.addColorStop(1, 'rgba(0,212,255,0.02)');

  // Helper: позиция границы между двумя сегментами — точно над tick'ом "00"
  // нового дня. Новый день начинается ровно на 00:00.
  const boundaryAtIdx = (xScale, idx) => xScale.getPixelForValue(idx);

  const dayDividersPlugin = {
    id: 'precipDayDividers',
    afterDatasetsDraw(chart) {
      const c = chart.ctx;
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      dayBreakIndices.forEach(idx => {
        const x = boundaryAtIdx(xScale, idx);
        c.save();
        c.beginPath();
        c.strokeStyle = 'rgba(0,212,255,0.7)';
        c.lineWidth = 2;
        c.setLineDash([5, 3]);
        c.moveTo(x, yScale.top);
        c.lineTo(x, yScale.bottom);
        c.stroke();
        c.restore();
      });
    }
  };

  const DAY_BG_COLORS = [
    'rgba(0,212,255,0.08)',     // cyan — день 0
    'rgba(167,139,250,0.10)',   // purple — день 1
    'rgba(94,234,212,0.08)'     // teal — день 2
  ];
  const dayBackgroundPlugin = {
    id: 'precipDayBackground',
    beforeDatasetsDraw(chart) {
      const c = chart.ctx;
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      let cursor = 0;
      segments.forEach((s, si) => {
        cursor += s.hours.length;
        const isFirst = (si === 0);
        const isLast  = (si === segments.length - 1);
        const xStart = isFirst ? xScale.left  : boundaryAtIdx(xScale, cursor - s.hours.length);
        const xEnd   = isLast  ? xScale.right : boundaryAtIdx(xScale, cursor);
        c.save();
        c.fillStyle = DAY_BG_COLORS[si % DAY_BG_COLORS.length];
        c.fillRect(xStart, yScale.top, xEnd - xStart, yScale.bottom - yScale.top);
        c.restore();
      });
    }
  };

  precipChartInstance = new Chart(ctx, {
    type: 'line',
    plugins: [dayBackgroundPlugin, dayDividersPlugin],
    data: {
      labels,
      datasets: [{
        label: t('precip.legend'),
        data: values,
        borderColor: '#00d4ff',
        backgroundColor: fillGrad,
        borderWidth: 2.5,
        pointRadius: values.map((v, i) => (i === 0 || (kinds[i] && v > 0.05)) ? 4 : 0),
        pointHoverRadius: 6,
        pointBackgroundColor: kinds.map(k => k ? PRECIP_KIND_COLORS[k] : '#00d4ff'),
        pointBorderColor: '#fff',
        pointBorderWidth: 1.5,
        fill: true,
        tension: 0.4,
        cubicInterpolationMode: 'monotone',
        spanGaps: true,
        segment: {
          borderColor: (ctx) => {
            const k = kinds[ctx.p1DataIndex] || kinds[ctx.p0DataIndex];
            return k ? PRECIP_KIND_COLORS[k] : '#00d4ff';
          }
        }
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10,17,40,0.95)', titleColor: '#00d4ff', bodyColor: '#e8f0ff',
          borderColor: 'rgba(0,212,255,0.3)', borderWidth: 1, padding: 12, cornerRadius: 12,
          titleFont: { family: 'Onest', size: 13, weight: '600' },
          bodyFont: { family: 'Onest', size: 12 },
          callbacks: {
            title: (items) => {
              const i = items[0].dataIndex;
              const h = merged[i];
              // Определить день: считаем сколько часов прошло
              let dayIdx = 0, sum = 0;
              for (let s = 0; s < segments.length; s++) {
                sum += segments[s].hours.length;
                if (i < sum) { dayIdx = s; break; }
              }
              const day = segments[dayIdx].day;
              const dateShort = day.date ? day.date.slice(0,5) : '';
              const dayLabel = (dayIdx === 0 && day.id === 0)
                ? t('day.today')
                : (localizeDayFull(day.dayName) || localizeDayShort(day.name));
              return `${String(h.h).padStart(2,'0')}:00 · ${dayLabel} · ${dateShort}`;
            },
            label: (c) => ` ${c.parsed.y.toFixed(1)} ${t('precip.legend')}`
          }
        }
      },
      scales: {
        x: {
          ticks: {
            // Цвет метки часа = цвет своего дня (cyan/purple/teal по индексу сегмента).
            // Полуночный час "00" — более насыщенный и жирный, как маркер начала суток.
            color: (c) => {
              const m = merged[c.index];
              if (!m) return 'rgba(232,240,255,0.5)';
              const palette = ['#00d4ff', '#a78bfa', '#5eead4'];
              const base = palette[m._dayIdx % palette.length];
              return m.h === 0 ? base : base + 'b3'; // b3 ≈ 70% alpha
            },
            font: (c) => ({
              family: 'JetBrains Mono',
              size: 10,
              weight: (merged[c.index] && merged[c.index].h === 0) ? '700' : '400'
            }),
            maxRotation: 0, minRotation: 0, autoSkip: false, padding: 4
          },
          grid: { color: 'rgba(255,255,255,0.04)' },
          border: { display: false }
        },
        y: { min: 0, max: Math.ceil(maxVal * 1.2), ticks: { display: false }, grid: { color: 'rgba(255,255,255,0.04)' }, border: { display: false } }
      },
      // Y-подписи теперь живут в отдельной колонке .precip-y-axis СЛЕВА от
      // скролла. Сам chart внутри scroll-зоны без левого padding — данные
      // начинаются от x=0, граница колонки естественно отделяет ось от графика.
      layout: { padding: { left: 0, right: 0 } }
    }
  });

  // === Y-ось в отдельной DOM-колонке (не скроллится горизонтально) ===
  // Колонка — flex-сосед .precip-scroll-area, фон у неё прозрачный → видно
  // натуральный фон карточки .glass. Тики позиционируются абсолютно по высоте
  // canvas (синхронно с chart.yScale).
  const renderYAxisOverlay = () => {
    const yScale = precipChartInstance && precipChartInstance.scales.y;
    const chartWrap = document.querySelector('.precip-chart-wrap');
    const yAxisEl = document.getElementById('precipYAxis');
    if (!yScale || !chartWrap || !yAxisEl) return;
    const ticks = yScale.ticks || [];
    if (ticks.length === 0) return;
    // Высота колонки = высота chart-wrap (200px), top уже совпадает (флекс align-items:stretch).
    yAxisEl.style.height = chartWrap.offsetHeight + 'px';
    const unit = t('precip.legend');
    yAxisEl.innerHTML = ticks.map(tk => {
      const y = yScale.getPixelForValue(tk.value);
      if (!Number.isFinite(y)) return '';
      return `<div class="pya-tick" style="top:${y}px">${tk.value} ${unit}</div>`;
    }).join('');
  };
  renderYAxisOverlay();
  requestAnimationFrame(renderYAxisOverlay);
  setTimeout(renderYAxisOverlay, 200);

  // ВАЖНО: выровнять нижние полоски (типы осадков + дни) под РЕАЛЬНУЮ геометрию
  // chart.chartArea. Без этого они смещены ~на ширину Y-оси (~40px), и эмодзи/дни
  // не совпадают по часам с точками графика.
  const alignBars = () => {
    if (!precipChartInstance) return;
    const cArea  = precipChartInstance.chartArea;
    const xScale = precipChartInstance.scales.x;
    if (!cArea || !xScale) return;
    // Sanity check: chart должен быть полностью разложен
    if (typeof cArea.left !== 'number' || cArea.right <= cArea.left) return;
    if (typeof xScale.getPixelForValue !== 'function') return;
    const testPx = xScale.getPixelForValue(1);
    if (!Number.isFinite(testPx) || testPx <= 0) return;

    // Граница над tick'ом "00" нового дня (та же логика что в dayDividers/dayBackground).
    const bnd = (idx) => xScale.getPixelForValue(idx);
    let cursor = 0;
    const segPx = segments.map((s, si) => {
      cursor += s.hours.length;
      const leftPx  = (si === 0) ? cArea.left : bnd(cursor - s.hours.length);
      const rightPx = (si === segments.length - 1) ? cArea.right : bnd(cursor);
      return rightPx - leftPx;
    });
    if (segPx.some(w => !Number.isFinite(w) || w <= 0)) return;

    const hourPx = merged.length > 1
      ? (xScale.getPixelForValue(1) - xScale.getPixelForValue(0))
      : (cArea.right - cArea.left);
    if (!Number.isFinite(hourPx) || hourPx <= 0) return;

    const innerW = inner.offsetWidth || (cArea.right + 10);
    const rightMargin = Math.max(0, innerW - cArea.right);

    typesBar.style.marginLeft  = cArea.left + 'px';
    typesBar.style.marginRight = rightMargin + 'px';
    daysBar.style.marginLeft   = cArea.left + 'px';
    daysBar.style.marginRight  = rightMargin + 'px';

    [...typesBar.children].forEach((el) => { el.style.width = hourPx + 'px'; });
    [...daysBar.children].forEach((el, si) => { el.style.width = segPx[si] + 'px'; });
  };

  // Несколько попыток на разных таймингах — Chart.js может ещё не успеть
  // выполнить layout к моменту синхронного вызова, особенно при первом
  // рендере внутри только что открытой модалки.
  alignBars();
  requestAnimationFrame(alignBars);
  setTimeout(alignBars, 50);
  setTimeout(alignBars, 200);
  setTimeout(alignBars, 600);
}

// Снять skeleton-маску с UI. Идемпотентно. Вызывается после первого
// рендера с реальными/кэшированными данными.
function clearAppBootstrap() {
  if (document.body && document.body.classList.contains('app-bootstrap')) {
    document.body.classList.remove('app-bootstrap');
  }
}
// Safety: даже если refreshForecast почему-то не запустится — снимаем skeleton
// через 8 секунд, чтобы пользователь не залип в shimmer'ах вечно.
setTimeout(clearAppBootstrap, 8000);

// === localStorage cleanup =======================================
// При структурных изменениях формата кэша мы поднимаем версию ключа
// (forecast-cache :v5 → :v6 → :v7 → :v8 → :v9). Старые ключи остаются
// в localStorage навсегда — после года использования это могут быть
// мегабайты мусора, и при многих городах есть шанс упереться в 5–10МБ
// квоту браузера. Это лучше прочистить разово при старте.
//
// Текущие "живые" версии указаны в *_CURRENT_VERSION ниже. Всё что
// меньше или с неизвестной версией под этим префиксом — удаляется.
const FORECAST_CACHE_CURRENT = 16;
const CLIMATE_CACHE_CURRENT  = 1;
function cleanupStaleLocalStorage() {
  if (typeof localStorage === 'undefined') return;
  try {
    const toDelete = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      // forecast-cache: формат kw:forecast-cache:LAT_LON:vN
      const fm = key.match(/^kw:forecast-cache:[^:]+:v(\d+)$/);
      if (fm && parseInt(fm[1], 10) < FORECAST_CACHE_CURRENT) { toDelete.push(key); continue; }
      // climate-cache: kw:climate-cache:LAT_LON:vN
      const cm = key.match(/^kw:climate-cache:[^:]+:v(\d+)$/);
      if (cm && parseInt(cm[1], 10) < CLIMATE_CACHE_CURRENT) { toDelete.push(key); continue; }
    }
    toDelete.forEach(k => { try { localStorage.removeItem(k); } catch (_) {} });
    if (toDelete.length > 0) console.info(`[cleanup] удалено ${toDelete.length} устаревших ключей кэша`);
  } catch (err) {
    console.warn('localStorage cleanup пропущен:', err);
  }
}
cleanupStaleLocalStorage();

// === Алерт-баннер для экстремальной температуры =================
// Показываем когда в ближайших 48ч (с NOW_HOUR) есть пик ≥+32°C
// (жара) или ≤-15°C (мороз). Используем реальные хх часовые значения,
// а не daily max — он округляет и сглаживает.
// Пороги (по Цельсию, не зависят от настроек юзера — для здоровья
// важна абсолютная температура).
const HEAT_THRESHOLD         = 32;
const EXTREME_HEAT_THRESHOLD = 38;
const COLD_THRESHOLD         = -15;
const EXTREME_COLD_THRESHOLD = -25;

function renderWeatherAlert(forecast) {
  const el = document.getElementById('weatherAlertBanner');
  if (!el) return;
  if (!forecast || !forecast.length) { el.style.display = 'none'; return; }

  // Собираем все часы из ближайших 48ч начиная с NOW_HOUR
  let collected = 0;
  let peakHot = -Infinity, peakCold = Infinity;
  for (let di = 0; di < forecast.length && collected < 48; di++) {
    const day = forecast[di];
    if (!day || !day.hourly) continue;
    const startHour = (di === 0) ? NOW_HOUR : 0;
    for (let i = startHour; i < day.hourly.length && collected < 48; i++, collected++) {
      const t = day.hourly[i].t;
      if (typeof t !== 'number') continue;
      if (t > peakHot)  peakHot = t;
      if (t < peakCold) peakCold = t;
    }
  }

  let titleKey, msgKey, icon, cls, peakC;
  if (peakHot >= EXTREME_HEAT_THRESHOLD) {
    titleKey = 'alert.extremeHeat.title'; msgKey = 'alert.extremeHeat.msg';
    icon = '🥵'; cls = 'hot'; peakC = peakHot;
  } else if (peakHot >= HEAT_THRESHOLD) {
    titleKey = 'alert.heat.title'; msgKey = 'alert.heat.msg';
    icon = '🥵'; cls = 'hot'; peakC = peakHot;
  } else if (peakCold <= EXTREME_COLD_THRESHOLD) {
    titleKey = 'alert.extremeCold.title'; msgKey = 'alert.extremeCold.msg';
    icon = '🥶'; cls = 'cold'; peakC = peakCold;
  } else if (peakCold <= COLD_THRESHOLD) {
    titleKey = 'alert.cold.title'; msgKey = 'alert.cold.msg';
    icon = '🥶'; cls = 'cold'; peakC = peakCold;
  } else {
    el.style.display = 'none';
    return;
  }

  // Конвертируем пик в текущие пользовательские единицы для отображения
  const displayT = Math.round(convertTemp(peakC, state.units.temp));
  const tStr = (displayT > 0 ? '+' : '') + displayT;
  document.getElementById('weatherAlertIcon').textContent = icon;
  document.getElementById('weatherAlertTitle').textContent = t(titleKey, { t: tStr });
  document.getElementById('weatherAlertMsg').textContent   = t(msgKey);
  el.classList.toggle('cold', cls === 'cold');
  el.style.display = '';
}

function renderAll() {
  applySourceTheme();
  const forecast = getForecast(currentSourceId);
  renderSourceIndicator();
  renderHeroAndMetrics(forecast);
  renderDays(forecast);
  renderHourlyRow(forecast);
  renderWeatherAlert(forecast);
  // Compare mode — обновляем дубль-вьюшку при любом ре-рендере (смена источника, языка, units)
  if (COMPARE_STATE.active) renderCompareView();
  // Precip chart рендерим только если модалка открыта (chart внутри скрытой
  // модалки рендерить бессмысленно + это блокировало бы lazy-load Chart.js).
  const precipModalEl = document.getElementById('precipDetailModal');
  if (precipModalEl && precipModalEl.classList.contains('open')) {
    renderPrecipChart(forecast);
  }
  renderConfidenceChip();
  // После любого ре-рендера пересчитать состояние стрелок прокрутки (ширина контента могла измениться)
  requestAnimationFrame(() => {
    ['hourlyRow', 'daysGrid', 'precipScroll'].forEach(id => {
      const el = document.getElementById(id);
      if (el) updateScrollArrows(el);
    });
  });
}

/* ============================================
   SOURCE PICKER UI
   ============================================ */

// Возвращает id источника с лучшей композитной точностью (или null, если данных мало).
function bestAccuracySourceId() {
  const state = ACCURACY_STATE || { stats: {}, sampleSize: 0 };
  if (state.sampleSize < ACCURACY_MIN_SAMPLES) return null;
  let bestId = null;
  let bestScore = Infinity;
  for (const src of SOURCES) {
    if (src.id === 'avg') continue;
    const s = state.stats[src.id];
    if (!s) continue;
    const score = accuracyComposite(s);
    if (score == null) continue;
    if (score < bestScore) { bestScore = score; bestId = src.id; }
  }
  return bestId;
}

function renderSourceButtons() {
  const grid = document.getElementById('sourcesGrid');
  grid.innerHTML = '';
  const bestId = bestAccuracySourceId();
  SOURCES.filter(s => s.id !== 'avg').forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'source-btn' + (currentSourceId === s.id ? ' active' : '');
    btn.dataset.source = s.id;
    const sColor = effectiveSourceColor(s);
    btn.style.setProperty('--src-color', sColor);
    btn.style.setProperty('--src-bg', hexToRgba(sColor, 0.15));
    btn.style.setProperty('--src-glow', hexToRgba(sColor, 0.2));
    const badge = (s.id === bestId)
      ? `<span class="src-badge" title="${t('accuracy.bestBadge')}">🏆</span>`
      : '';
    btn.innerHTML = `<span class="src-dot"></span><span class="src-name">${s.shortName}</span>${badge}`;
    btn.addEventListener('click', () => selectSource(s.id));
    grid.appendChild(btn);
  });
}

function selectSource(id) {
  currentSourceId = id;
  // Сохраняем выбор — переживёт reload (включая pull-to-refresh).
  try { localStorage.setItem(SOURCE_STORAGE_KEY, id); } catch (e) {}
  // Update buttons state
  document.getElementById('mainSrcBtn').classList.toggle('active', id === 'avg');
  document.querySelectorAll('.source-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.source === id);
  });
  // Re-render with new data
  renderAll();
  // Обновить плашку источника в notif-pane, если она открыта
  if (typeof updateNotifSourceLabel === 'function') updateNotifSourceLabel();
  // Close modal if open (since data changed)
  if (modal.classList.contains('open')) closeModal();
}

document.getElementById('mainSrcBtn').addEventListener('click', () => selectSource('avg'));

/* ============================================
   MODAL
   ============================================ */

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(dayId) {
  const forecast = getForecast(currentSourceId);
  const d = forecast[dayId];
  const src = getCurrentSource();
  const uvColor = colorForUV(d.uv);
  const aqiColor = colorForAQI(d.aqi);

  const dayLabel = d.id === 0 ? t('modal.day.today') : t('modal.day.forecast');
  const dayTitle = localizeDayFull(d.dayName);
  const dateLoc  = formatDateLocale(d.date);
  const dayLenLoc = localizeDayLen(d.dayLen);
  const srcFull = `<span class="src-name">${localizeSourceFullName(src)}</span>`;

  modalBody.innerHTML = `
    <div class="modal-header">
      <div class="modal-day-label">${dayLabel} · ${src.tag}</div>
      <h2 class="modal-day-title" id="modalTitle">${dayTitle}</h2>
      <div class="modal-day-date">${dateLoc} · ${dayLenLoc}</div>
      <div class="modal-source-note">${t('hero.sourceNote', { name: srcFull })}</div>
    </div>

    <div class="modal-hero">
      <div class="modal-icon">${weatherIcon(d.condition, 110)}</div>
      <div>
        <div class="modal-temp">
          <span class="modal-hi">${fmtTempNum(d.max)}</span>
          <span class="modal-unit">${unitTemp()}</span>
          <span class="modal-lo">${fmtTempNum(d.min)}°</span>
        </div>
        <div class="modal-cond">${localizeCondLabel(d.condLabel)}</div>
        <div class="modal-cond-sub">${d.condDescKey ? t(d.condDescKey) : localizeCondDescByDayId(d.id)}</div>
      </div>
    </div>

    <div class="modal-mini-metrics">
      <div class="mini-m"><div class="l">${t('metric.wind')}</div><div class="v">${fmtWind(d.wind, {withUnit:false})}<span> ${unitWind()} ${localizeWindDirShort(d.windDir)}</span></div></div>
      <div class="mini-m"><div class="l">${t('metric.rain')}</div><div class="v">${d.precip}<span> %</span></div></div>
      <div class="mini-m"><div class="l">${t('metric.pressure')}</div><div class="v">${fmtPressure(d.pressure, {withUnit:false})}<span> ${unitPressure()}</span></div></div>
      <div class="mini-m"><div class="l">${t('metric.humidity')}</div><div class="v">${d.humidity}<span> %</span></div></div>
    </div>

    <div class="modal-astro">
      <div class="modal-astro-cell sun">
        <div class="ico">${sunMini3D(48)}</div>
        <div class="txt">
          <div class="l">${t('astro.sun')}</div>
          <div class="v big">↑ ${d.sunrise} · ↓ ${d.sunset}</div>
          <div class="v" style="font-size:11px;color:rgba(232,240,255,0.55);margin-top:2px">${t('modal.day.dayLen', { len: dayLenLoc })}</div>
        </div>
      </div>
      <div class="modal-astro-cell moon">
        <div class="ico">${moonPhaseIcon(d.moonIllum, d.moonWaxing)}</div>
        <div class="txt">
          <div class="l">${t('astro.moon')} · ${d.moonIllum}%</div>
          <div class="v big">${localizeMoonName(d.moonName)}</div>
        </div>
      </div>
      <div class="modal-astro-cell" style="background:linear-gradient(135deg,${uvColor.bg} 0%,rgba(0,0,0,0.02) 100%);border-color:${uvColor.br}">
        <div class="ico" style="background:${uvColor.bg};box-shadow:inset 0 0 16px ${uvColor.bg},0 0 12px ${uvColor.bg}">${uvMini3D(48, d.uv, uvColor.c)}</div>
        <div class="txt">
          <div class="l">${t('astro.uv')}</div>
          <div class="v big" style="color:${uvColor.c}">${d.uv} · ${localizeUvLabel(d.uvLabel)}</div>
          <div class="v" style="font-size:11px;color:rgba(232,240,255,0.55);margin-top:2px">${t('modal.day.uvScale')}</div>
        </div>
      </div>
      <div class="modal-astro-cell" style="background:linear-gradient(135deg,${aqiColor.bg} 0%,rgba(0,0,0,0.02) 100%);border-color:${aqiColor.br}">
        <div class="ico" style="background:${aqiColor.bg};box-shadow:inset 0 0 16px ${aqiColor.bg},0 0 12px ${aqiColor.bg}">${aqiMini3D(48, d.aqi, aqiColor.c)}</div>
        <div class="txt">
          <div class="l">${t('astro.aqi')}</div>
          <div class="v big" style="color:${aqiColor.c}">${d.aqi} AQI · ${localizeAqiLabel(d.aqiLabel)}</div>
          <div class="v" style="font-size:11px;color:rgba(232,240,255,0.55);margin-top:2px">${t('modal.day.pm25norm')}</div>
        </div>
      </div>
    </div>

    <div class="modal-hours-list">
      <h3>${t('modal.day.hoursTitle')}</h3>
      <div class="hourly-tabs" id="modalHourlyTabs" role="tablist">
        <button class="ht-tab" data-metric="temp" role="tab"><span data-i18n="metric.temp">Температура</span></button>
        <button class="ht-tab" data-metric="feels" role="tab"><span data-i18n="metric.feels">По ощущениям</span></button>
        <button class="ht-tab" data-metric="precip" role="tab"><span data-i18n="metric.rain">Осадки</span></button>
        <button class="ht-tab" data-metric="wind" role="tab"><span data-i18n="metric.wind">Ветер</span></button>
        <button class="ht-tab" data-metric="pressure" role="tab"><span data-i18n="metric.pressure">Давление</span></button>
      </div>
      <div class="scroll-wrap">
        <button class="scroll-arrow left" data-scroll-target="modalHourlyRow" data-i18n-aria="scroll.left" aria-label="Прокрутить влево">‹</button>
        <div class="hours-scroll" id="modalHourlyRow"></div>
        <button class="scroll-arrow right" data-scroll-target="modalHourlyRow" data-i18n-aria="scroll.right" aria-label="Прокрутить вправо">›</button>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Модалка создаётся динамически через innerHTML — applyTranslations() не пройдёт
  // через data-i18n атрибуты внутри неё автоматически. Вызываем явно, чтобы
  // tab-кнопки «Температура / По ощущениям / Осадки / Ветер / Давление» и aria
  // переводы стрелок применились на выбранном языке.
  applyTranslations();

  // Сбрасываем модальную метрику на температуру при каждом открытии — так UX предсказуемее.
  currentModalMetric = 'temp';
  renderModalHourlyRow(d);
  setupModalHourlyTabs(d);
  // v1.43.0: модалка создаётся динамически, поэтому setupScrollArrows() из init
  // не покрывает её стрелки. Навешиваем обработчики вручную для конкретного row.
  attachModalHourlyArrows();
}

// v1.43.0: подключение кнопок ‹ › для почасовой ленты в модалке дня.
// Каждый раз при открытии модалки — стрелки новые (модалка пересоздана),
// поэтому навешиваем обработчики заново. Старые не остаются в памяти —
// modal.innerHTML = ... выкидывает их.
function attachModalHourlyArrows() {
  const row = document.getElementById('modalHourlyRow');
  if (!row) return;
  const modal = document.getElementById('modal');
  if (!modal) return;
  const arrows = modal.querySelectorAll('.scroll-arrow[data-scroll-target="modalHourlyRow"]');
  arrows.forEach(btn => {
    const isRight = btn.classList.contains('right');
    btn.onclick = () => {
      const delta = row.clientWidth * 0.8 * (isRight ? 1 : -1);
      row.scrollBy({ left: delta, behavior: 'smooth' });
    };
  });
  const update = () => updateScrollArrows(row);
  row.addEventListener('scroll', update, { passive: true });
  // Первичный update после рендера (rAF чтобы дождаться layout).
  requestAnimationFrame(() => requestAnimationFrame(update));
}

function renderModalHourlyRow(d) {
  const row = document.getElementById('modalHourlyRow');
  if (!row) return;
  document.querySelectorAll('#modalHourlyTabs .ht-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.metric === currentModalMetric);
  });
  const isToday = (d.id === 0);
  row.innerHTML = d.hourly.map((h, i) => {
    const isNow = isToday && (i === NOW_HOUR);
    return `
    <div class="hour-cell${isNow ? ' now' : ''}">
      <div class="h">${String(h.h).padStart(2,'0')}:00</div>
      <div class="ic">${weatherIcon(h.c, 36)}</div>
      <div class="t">${hourMetricValue(h, currentModalMetric)}</div>
    </div>
  `;
  }).join('');
}

function setupModalHourlyTabs(d) {
  document.querySelectorAll('#modalHourlyTabs .ht-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentModalMetric = btn.dataset.metric;
      renderModalHourlyRow(d);
    });
  });
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (modalChartInstance) { modalChartInstance.destroy(); modalChartInstance = null; }
  // Если пришли из search modal — открываем search ПОВЕРХ закрывающейся
  // модалки (без задержки) + поднимаем body.modal-bridge на время перехода,
  // чтобы главный экран между ними не мелькнул.
  if (_returnToSearchModal) {
    _returnToSearchModal = false;
    startModalBridge();
    if (typeof openSearchModal === 'function') openSearchModal();
  }
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

/* ============================================
   INIT
   ============================================ */

/* ============================================
   ASTRO / PHOTO MODE (Фаза В1)
   Golden hour, Blue hour, качество заката, видимость звёзд.
   Все расчёты — из текущих forecast-данных (sunrise/sunset + hourly.cl + moonIllum).
   ============================================ */

// "HH:MM" → минуты от полуночи. null если неверный.
function hhmmToMinutes(s) {
  if (!s || typeof s !== 'string' || !/^\d{2}:\d{2}$/.test(s)) return null;
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
}
// Минуты от полуночи → "HH:MM"
function minutesToHHMM(m) {
  const norm = ((m % (24*60)) + (24*60)) % (24*60);
  const h = Math.floor(norm / 60);
  const mm = norm % 60;
  return `${String(h).padStart(2,'0')}:${String(mm).padStart(2,'0')}`;
}

function renderAstroPhoto() {
  const fc = getActiveForecast();
  if (!fc || !fc[0]) return;
  const today = fc[0];
  const riseMin = hhmmToMinutes(today.sunrise);
  const setMin  = hhmmToMinutes(today.sunset);

  // === Golden hour: -15 / +60 у восхода и -60 / +15 у заката ===
  if (riseMin != null) {
    document.getElementById('apGoldenMorning').textContent =
      `${minutesToHHMM(riseMin - 15)} — ${minutesToHHMM(riseMin + 60)}`;
  }
  if (setMin != null) {
    document.getElementById('apGoldenEvening').textContent =
      `${minutesToHHMM(setMin - 60)} — ${minutesToHHMM(setMin + 15)}`;
  }

  // === Blue hour: -30 у восхода (утром) и +30 у заката (вечером) ===
  if (riseMin != null) {
    document.getElementById('apBlueMorning').textContent =
      `${minutesToHHMM(riseMin - 30)} — ${minutesToHHMM(riseMin)}`;
  }
  if (setMin != null) {
    document.getElementById('apBlueEvening').textContent =
      `${minutesToHHMM(setMin)} — ${minutesToHHMM(setMin + 30)}`;
  }

  // === Качество заката: облачность за час до заката ===
  // Эффектный закат — когда есть облака (30-70%), которые подсвечиваются солнцем.
  let sunsetStatus = 'normal';
  let sunsetCloudPct = null;
  if (setMin != null && Array.isArray(today.hourly)) {
    const targetHour = Math.floor((setMin - 30) / 60);
    const slot = today.hourly.find(h => h.h === targetHour) || today.hourly[Math.max(0, Math.min(23, targetHour))];
    if (slot && typeof slot.cl === 'number') {
      sunsetCloudPct = slot.cl;
      if (slot.cl >= 30 && slot.cl <= 70) sunsetStatus = 'dramatic';
      else if (slot.cl > 70) sunsetStatus = 'dull';
      else sunsetStatus = 'normal';
    }
  }
  const sunsetEl = document.getElementById('apSunsetStatus');
  const sunsetHintEl = document.getElementById('apSunsetHint');
  sunsetEl.className = 'ap-status ' + sunsetStatus;
  sunsetEl.textContent = t('astro.sunset.' + sunsetStatus);
  sunsetHintEl.textContent = sunsetCloudPct != null
    ? t('astro.sunset.cloudHint', { cl: sunsetCloudPct })
    : '';

  // === Видимость звёзд: средняя облачность ночью (00-04) и фаза луны ===
  let nightCloud = null;
  if (Array.isArray(today.hourly)) {
    const nightSlots = today.hourly.filter(h => h.h >= 0 && h.h <= 4 && typeof h.cl === 'number');
    if (nightSlots.length > 0) {
      nightCloud = Math.round(nightSlots.reduce((a, b) => a + b.cl, 0) / nightSlots.length);
    }
  }
  const moonIllum = typeof today.moonIllum === 'number' ? today.moonIllum : 50;
  // starScore от 0 до 1: ясное небо и тёмная луна = 1, облачно или полнолуние = 0
  const cloudFactor = nightCloud != null ? (1 - nightCloud / 100) : 0.5;
  const moonFactor = 1 - moonIllum / 100;
  const starScore = cloudFactor * (0.4 + 0.6 * moonFactor); // луна влияет умеренно
  let starStatus, starCount;
  if (starScore > 0.7)      { starStatus = 'excellent'; starCount = 5; }
  else if (starScore > 0.5) { starStatus = 'good';      starCount = 4; }
  else if (starScore > 0.3) { starStatus = 'moderate';  starCount = 3; }
  else if (starScore > 0.15){ starStatus = 'poor';      starCount = 2; }
  else                      { starStatus = 'veryPoor';  starCount = 1; }
  const starsEl = document.getElementById('apStarsRating');
  starsEl.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const s = document.createElement('span');
    s.className = 's' + (i > starCount ? ' off' : '');
    s.textContent = '★';
    starsEl.appendChild(s);
  }
  const starsStatusEl = document.getElementById('apStarsStatus');
  const starsHintEl = document.getElementById('apStarsHint');
  starsStatusEl.className = 'ap-status ' + starStatus;
  starsStatusEl.textContent = t('astro.stars.' + starStatus);
  starsHintEl.textContent = t('astro.stars.hint', { cl: nightCloud != null ? nightCloud : '—', moon: moonIllum });
}

/* ============================================
   POLLEN (В5) — пыльца аллергенов
   ============================================ */

const POLLEN_DATA = { today: undefined }; // undefined = ещё не запрашивали; null = запрос упал; объект = есть данные

const POLLEN_TYPES = [
  { id: 'alder',   icon: '🌳' },
  { id: 'birch',   icon: '🌿' },
  { id: 'grass',   icon: '🌾' },
  { id: 'mugwort', icon: '🌱' },
  { id: 'olive',   icon: '🫒' },
  { id: 'ragweed', icon: '🥀' }
];

function renderPollen() {
  const card = document.getElementById('pollenCard');
  const grid = document.getElementById('pollenGrid');
  if (!card || !grid) return;

  // Карточка всегда видна.
  card.style.display = '';
  // Подзаголовок меняем в зависимости от состояния
  const subEl = card.querySelector('.sub');
  if (subEl) {
    if (POLLEN_DATA.today === null) {
      subEl.textContent = t('pollen.error');
    } else if (POLLEN_DATA.today === undefined) {
      subEl.textContent = t('pollen.loading');
    } else {
      subEl.textContent = t('pollen.sub');
    }
  }
  const data = POLLEN_DATA.today || {};
  grid.innerHTML = '';

  POLLEN_TYPES.forEach(p => {
    const value = data[p.id];
    const level = pollenLevel(value);
    const cell = document.createElement('div');
    cell.className = `pollen-cell pl-${level}`;
    // Заполнение полоски: 0..50 ч/м³ -> 0..100%
    const fillPct = level === 'none' ? 0 : Math.min(100, Math.round((value / 50) * 100));
    const valueStr = value != null ? `${value} ч/м³` : '—';
    cell.innerHTML = `
      <div class="pollen-head">
        <span class="pollen-icon">${p.icon}</span>
        <span class="pollen-title">${t('pollen.' + p.id)}</span>
      </div>
      <div class="pollen-level">${t('pollen.level.' + level)}</div>
      <div class="pollen-bar"><div class="pollen-bar-fill" style="width:${fillPct}%"></div></div>
      <div class="pollen-hint">${escapeHtml(valueStr)}</div>
    `;
    grid.appendChild(cell);
  });
}

/* ============================================
   STORM TRACKER (В6) — гроза-индикатор на 48ч
   Источник: hourly weather_code / cape / lifted_index из Open-Meteo (вычисляются на стороне API).
   Гроза-сигналы: weather_code in {95, 96, 99} + CAPE (J/kg) + LI (lifted_index).
   ============================================ */

// Уровень риска грозы для одного часа: 0 нет / 1 слабый / 2 умеренный / 3 высокий / 4 опасный.
function stormRiskLevel(h) {
  if (!h) return 0;
  const wc   = typeof h.wc === 'number' ? h.wc : null;
  const cape = typeof h.cape === 'number' ? h.cape : null;
  const li   = typeof h.li === 'number' ? h.li : null;
  const pp   = typeof h.p === 'number' ? h.p : null;
  const cl   = typeof h.cl === 'number' ? h.cl : null;

  // 4 — опасный: явный код грозы с градом/ливнем или экстремальные CAPE+LI
  if (wc === 99) return 4;
  if (cape != null && cape > 2500 && li != null && li < -6) return 4;

  // 3 — высокий: гроза с умеренным/сильным градом, или CAPE 1500..2500
  if (wc === 96) return 3;
  if (cape != null && cape > 1500 && cape <= 2500) return 3;
  if (cape != null && cape > 1500 && li != null && li < -4) return 3;

  // 2 — умеренный: обычный грозовой код, или CAPE 800..1500
  if (wc === 95) return 2;
  if (cape != null && cape > 800 && cape <= 1500) return 2;

  // 1 — слабый: малый CAPE (нестабильность есть, но энергии мало),
  // либо высокая вероятность дождя при густой облачности и небольшом CAPE.
  if (cape != null && cape >= 300 && cape <= 800) return 1;
  if (pp != null && pp >= 60 && cl != null && cl >= 70 && cape != null && cape >= 200) return 1;

  return 0;
}

// Строит массив 48 часов начиная с ТЕКУЩЕГО часа из AVG-прогноза.
// Элемент: { level, hoursAhead, hour, day, wc, cape, li, p }
function buildStorm48h() {
  const f = getForecast('avg');
  if (!Array.isArray(f) || f.length === 0) return [];
  const now = new Date();
  const startHour = now.getHours();
  const result = [];
  for (let d = 0; d < Math.min(3, f.length); d++) {
    const day = f[d];
    if (!day || !Array.isArray(day.hourly)) continue;
    const offset = d === 0 ? startHour : 0;
    for (let i = offset; i < 24; i++) {
      const h = day.hourly[i];
      if (!h) continue;
      result.push({
        level: stormRiskLevel(h),
        hoursAhead: result.length,
        hour: h.h,
        day: d,
        wc: h.wc,
        cape: h.cape,
        li: h.li,
        p: h.p
      });
      if (result.length >= 48) break;
    }
    if (result.length >= 48) break;
  }
  return result;
}

// Рендер карточки гроза-индикатора + тревожный баннер если есть риск в ближайшие 6ч.
function renderStorm() {
  const card = document.getElementById('stormCard');
  if (!card) return;
  card.style.display = '';

  const heatmap   = document.getElementById('stormHeatmap');
  const statusEl  = document.getElementById('stormStatus');
  const textEl    = document.getElementById('stormStatusText');
  const pillEl    = document.getElementById('stormStatusPill');
  const bannerEl  = document.getElementById('stormBanner');
  const bannerTxt = document.getElementById('stormBannerText');
  const legendEl  = document.getElementById('stormLegend');

  const hours = buildStorm48h();

  // Heatmap
  if (heatmap) {
    heatmap.innerHTML = '';
    hours.forEach(h => {
      const cell = document.createElement('div');
      cell.className = 'storm-h r' + h.level;
      const parts = [
        `+${h.hoursAhead}ч`,
        t('storm.risk' + h.level)
      ];
      if (h.cape != null) parts.push('CAPE ' + h.cape);
      if (h.wc != null)   parts.push('wc ' + h.wc);
      cell.title = parts.join(' · ');
      heatmap.appendChild(cell);
    });
  }

  // Легенда (4 ненулевых уровня — для нулевого «нет риска» отдельная
  // плашка не нужна, его и так видно по неактивным ячейкам).
  // Каждый уровень = название + краткое описание что значит на практике.
  if (legendEl) {
    legendEl.innerHTML = [1,2,3,4].map(lvl =>
      `<span class="sl-item">
        <span class="sl-sw r${lvl}"></span>
        <span class="sl-text">
          <span class="sl-name">${escapeHtml(t('storm.risk' + lvl))}</span>
          <span class="sl-desc">${escapeHtml(t('storm.desc' + lvl))}</span>
        </span>
      </span>`
    ).join('');
  }

  // Статус и баннер
  const firstRisky = hours.find(x => x.level >= 1);
  const maxLvl = hours.reduce((m, x) => Math.max(m, x.level), 0);
  if (!firstRisky) {
    if (textEl) textEl.textContent = t('storm.noStorm');
    if (pillEl) pillEl.style.display = 'none';
    if (statusEl) statusEl.className = 'storm-status st-r0';
    if (bannerEl) bannerEl.className = 'storm-banner';
  } else {
    if (textEl) {
      textEl.textContent = firstRisky.hoursAhead === 0
        ? t('storm.now')
        : t('storm.upcoming', { hours: firstRisky.hoursAhead });
    }
    if (pillEl) {
      pillEl.style.display = '';
      pillEl.textContent = t('storm.risk' + maxLvl);
    }
    if (statusEl) statusEl.className = 'storm-status st-r' + maxLvl;

    // Тревожный баннер: первый риск ≥2 в ближайшие 6ч
    if (bannerEl && bannerTxt) {
      const earlyDanger = hours.find(x => x.hoursAhead <= 6 && x.level >= 2);
      if (earlyDanger) {
        const lvl = Math.max(...hours.filter(x => x.hoursAhead <= 6).map(x => x.level));
        bannerEl.className = 'storm-banner show bn-r' + lvl;
        bannerTxt.textContent = earlyDanger.hoursAhead === 0
          ? t('storm.alertNow')
          : t('storm.alertSoon', { hours: earlyDanger.hoursAhead });
      } else {
        bannerEl.className = 'storm-banner';
      }
    }
  }
}

/* ============================================
   ACCURACY (В7) — рендер карточки самооценки точности
   Использует ACCURACY_STATE, заполняемый в refreshForecast.
   ============================================ */

// Минимальное число пар (prediction, actual), при котором имеет смысл показать рейтинг.
// После первого же замера уже даём ориентир (полоски частичные).
const ACCURACY_MIN_SAMPLES = 1;
// Цель прогресса в плейсхолдере (для бара «N / 7»).
const ACCURACY_TARGET_SAMPLES = 7;

// Композитный скор = MAE °C по max + MAE °C по min + MAE %осад / 10 (приводим % к ° по масштабу).
// Чем меньше — тем точнее. Возвращает null если данных совсем нет.
function accuracyComposite(s) {
  if (!s) return null;
  const parts = [];
  if (typeof s.tempMaxMAE === 'number') parts.push(s.tempMaxMAE);
  if (typeof s.tempMinMAE === 'number') parts.push(s.tempMinMAE);
  if (typeof s.precipMAE  === 'number') parts.push(s.precipMAE / 10);
  if (parts.length === 0) return null;
  return parts.reduce((a, b) => a + b, 0);
}

// Качество: 0 (отлично) … 3 (слабо). Пороги по композитному скору.
function accuracyQuality(score, minScore, maxScore) {
  if (score == null) return null;
  if (maxScore === minScore) return 0;
  const norm = (score - minScore) / (maxScore - minScore); // 0..1
  if (norm < 0.25) return 0;
  if (norm < 0.5)  return 1;
  if (norm < 0.75) return 2;
  return 3;
}

function renderAccuracy() {
  const card = document.getElementById('accuracyCard');
  if (!card) return;
  card.style.display = '';

  const subEl     = document.getElementById('accuracySub');
  const emptyEl   = document.getElementById('accuracyEmpty');
  const progEl    = document.getElementById('accuracyProgress');
  const headEl    = document.getElementById('accuracyHead');
  const tableEl   = document.getElementById('accuracyTable');
  const legendEl  = document.getElementById('accuracyLegend');

  const state = ACCURACY_STATE || { stats: {}, sampleSize: 0 };
  const n = state.sampleSize || 0;

  // Empty state: данных меньше минимума
  if (n < ACCURACY_MIN_SAMPLES) {
    if (emptyEl) emptyEl.style.display = '';
    if (headEl) headEl.style.display = 'none';
    if (tableEl) tableEl.style.display = 'none';
    if (legendEl) legendEl.style.display = 'none';
    if (progEl) progEl.textContent = `${n} / ${ACCURACY_TARGET_SAMPLES} ${t('accuracy.samplesUnit')}`;
    if (subEl) subEl.textContent = t('accuracy.subEmpty');
    return;
  }

  // Есть данные: считаем рейтинг по композитному скору
  if (emptyEl) emptyEl.style.display = 'none';
  if (headEl) headEl.style.display = '';
  if (tableEl) tableEl.style.display = '';
  if (legendEl) legendEl.style.display = '';
  // v1.37: показываем сколько замеров уже подтверждены реальными наблюдениями
  // из archive-api (а не proxy от avg[0]). Аудит честности рейтинга.
  // v1.38: к subtitle добавляем сжатый список per-variable лидеров.
  if (subEl) {
    let sub = t('accuracy.subData', { n });
    const gt = state.groundTruthSamples || 0;
    if (gt > 0) sub += ` · ${gt} ${t('accuracy.groundTruth')}`;
    subEl.textContent = sub;
  }

  // Собираем массив строк (только для реальных моделей, avg отдельно)
  const rows = [];
  for (const src of SOURCES) {
    if (src.id === 'avg') continue;
    const s = state.stats[src.id];
    if (!s) continue;
    const score = accuracyComposite(s);
    if (score == null) continue;
    rows.push({ src, s, score });
  }
  // avg в конец отдельной строкой (если есть данные)
  const avgSrc = SOURCES.find(s => s.id === 'avg');
  const avgS = state.stats.avg;
  const avgScore = avgS ? accuracyComposite(avgS) : null;

  // Сортировка по композитному скору (меньше — точнее)
  rows.sort((a, b) => a.score - b.score);

  // v1.38.0: per-variable best — для каждой метрики (tempMax/tempMin/precip)
  // находим модель с минимальной MAE. Эта ячейка в таблице получит .best-col.
  // v1.42.0: AVG теперь УЧАСТВУЕТ в per-variable рейтинге. Если ансамбль реально
  // точнее любой одиночной модели — это позитивный сигнал «AVG работает», и его
  // надо выделять отдельно (зелёным best-col-avg, чтобы отличать от золотого
  // best-col у моделей).
  function bestByField(field) {
    let bestId = null, bestVal = Infinity;
    for (const r of rows) {
      const v = r.s[field];
      if (typeof v === 'number' && v < bestVal) {
        bestVal = v; bestId = r.src.id;
      }
    }
    // Проверяем AVG отдельно — он может побить модели.
    if (avgS && typeof avgS[field] === 'number' && avgS[field] < bestVal) {
      bestId = 'avg';
    }
    return bestId;
  }
  const bestByVar = {
    tempMax: bestByField('tempMaxMAE'),
    tempMin: bestByField('tempMinMAE'),
    precip:  bestByField('precipMAE')
  };
  // v1.42.0: общий «победитель композитного скора» — может быть avg, может быть модель.
  // Зелёное выделение даём строке-победителю независимо от того AVG это или модель.
  // Если AVG лидер — это сигнал «ансамбль работает». Если модель лидер — это сигнал
  // «эта модель точнее AVG для твоей локации».
  let overallWinnerId = null;
  let minOverall = Infinity;
  for (const r of rows) {
    if (r.score < minOverall) { minOverall = r.score; overallWinnerId = r.src.id; }
  }
  if (avgScore != null && avgScore < minOverall) {
    overallWinnerId = 'avg';
    minOverall = avgScore;
  }

  // Пороги для квартилей по реальным моделям
  const scores = rows.map(r => r.score);
  const minScore = scores.length > 0 ? Math.min(...scores) : 0;
  const maxScore = scores.length > 0 ? Math.max(...scores) : 1;

  // Ширина бара: чем меньше score, тем длиннее бар (инверсия). minScore → 100%, maxScore → 25%
  function barWidth(score) {
    if (maxScore === minScore) return 100;
    const norm = (score - minScore) / (maxScore - minScore); // 0..1
    return Math.round(100 - norm * 75); // 100..25
  }

  function formatMetric(val, unit, decimals = 1) {
    if (val == null || typeof val !== 'number') {
      return `<span class="acm-val">—</span>`;
    }
    const v = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
    return `<span class="acm-val">${v}</span><span class="acm-unit">${unit}</span>`;
  }

  // Подсказка о применённой bias-коррекции (v1.35.1).
  // Берёт средний эффективный bias по tempMax/tempMin и форматирует «±X.X°».
  // Если бы исходный bias был ниже порога shrinkage (n < 5) — null, ничего не показываем.
  function biasHint(srcId) {
    const eff = getEffectiveBiasForSource(srcId);
    if (!eff) return '';
    const tempBias = (eff.tempMax + eff.tempMin) / 2;
    if (Math.abs(tempBias) < 0.2) return ''; // меньше 0.2° — не значимо для UI
    const sign = tempBias > 0 ? '−' : '+'; // мы вычитаем bias → показываем как корректировку
    const v = Math.abs(tempBias).toFixed(1);
    return `<span class="acc-bias" title="${_escAttr(t('accuracy.biasTitle'))}">${sign}${v}°</span>`;
  }

  // metricCell: ячейка-метрика. Если src — лидер по этой переменной, добавляем
  // .best-col (зелёное выделение + ✓). v1.42.0: единый цвет — не важно AVG это
  // или модель, важен факт «лучший по этой метрике». Если зелёная полоска
  // переедет с AVG на модель — это нормальный позитивный сигнал.
  function metricCell(srcId, val, unit, decimals, bestId) {
    const naCls = (val == null || typeof val !== 'number') ? ' na' : '';
    const isBest = (srcId === bestId && val != null);
    const bestCls = isBest ? ' best-col' : '';
    const badge = isBest ? '<span class="acm-best">✓</span>' : '';
    return `<div class="acc-metric${naCls}${bestCls}">${badge}${formatMetric(val, unit, decimals)}</div>`;
  }

  function buildRow({ src, s, score }, rank) {
    const q = accuracyQuality(score, minScore, maxScore) || 0;
    const w = barWidth(score);
    const isWinner = src.id === overallWinnerId;
    const rankBadge = isWinner ? '🏆' : String(rank);
    const rankCls = isWinner ? 'r1' : '';
    const rowCls = isWinner ? ' winner' : '';
    const barCls = isWinner ? ' q-winner' : ` q${q + 1}`;
    return `
      <div class="acc-row${rowCls}" data-src="${src.id}">
        <div class="acc-rank ${rankCls}">${rankBadge}</div>
        <div class="acc-name"><span class="ac-dot" style="background:${src.color};color:${src.color}"></span><span class="ac-text">${src.shortName || src.name}</span>${biasHint(src.id)}</div>
        <div class="acc-bar-wrap"><div class="acc-bar${barCls}" style="width:${w}%"></div></div>
        ${metricCell(src.id, s.tempMaxMAE, '°', 1, bestByVar.tempMax)}
        ${metricCell(src.id, s.tempMinMAE, '°', 1, bestByVar.tempMin)}
        ${metricCell(src.id, s.precipMAE, '%', 0, bestByVar.precip)}
      </div>`;
  }

  // v1.38: сжатый summary per-variable лидеров перед таблицей.
  // Только показываем переменные у которых лидер реально определился.
  function leaderName(srcId) {
    const s = SOURCES.find(x => x.id === srcId);
    return s ? (s.shortName || s.name) : srcId;
  }
  const leaderBits = [];
  if (bestByVar.tempMax) leaderBits.push(`${t('accuracy.leaderTempMax')} <strong>${leaderName(bestByVar.tempMax)}</strong>`);
  if (bestByVar.tempMin && bestByVar.tempMin !== bestByVar.tempMax) {
    leaderBits.push(`${t('accuracy.leaderTempMin')} <strong>${leaderName(bestByVar.tempMin)}</strong>`);
  }
  if (bestByVar.precip)  leaderBits.push(`${t('accuracy.leaderPrecip')} <strong>${leaderName(bestByVar.precip)}</strong>`);
  // v1.42.0: если ОДИН источник (AVG или модель) лидер по всем трём метрикам —
  // показываем зелёную плашку «🏆 X точнее всех». Иначе обычная плашка лидеров.
  const oneWinsAll = bestByVar.tempMax && bestByVar.tempMin === bestByVar.tempMax && bestByVar.precip === bestByVar.tempMax;
  let leadersHtml = '';
  if (oneWinsAll) {
    leadersHtml = `<div class="acc-leaders acc-leaders-winner">🏆 <strong>${leaderName(bestByVar.tempMax)}</strong> ${t('accuracy.leaderBestAll')}</div>`;
  } else if (leaderBits.length > 0) {
    leadersHtml = `<div class="acc-leaders">☆ ${leaderBits.join(' · ')}</div>`;
  }

  let html = leadersHtml + rows.map((r, i) => buildRow(r, i + 1)).join('');

  // Добавляем avg-строку. Если AVG — overall-winner, ему присваивается тот же
  // .winner класс что и моделям-победителям (зелёная обводка, glow, толстый bar).
  // Visual treatment одинаковый — это упрощает «победитель = зелёный» без оглядки
  // на тип источника.
  if (avgSrc && avgScore != null) {
    const q = accuracyQuality(avgScore, minScore, maxScore);
    const w = barWidth(avgScore);
    const isWinner = overallWinnerId === 'avg';
    const rowCls = isWinner ? ' winner' : '';
    const barCls = isWinner ? ' q-winner' : ` q${(q || 0) + 1}`;
    const rankSym = isWinner ? '🏆' : '∑';
    const rankColor = isWinner ? '#4ade80' : '#5eead4';
    html += `
      <div class="acc-row${rowCls}" data-src="avg" style="margin-top:6px;border-top:1px dashed rgba(255,255,255,0.08);border-radius:0 0 10px 10px">
        <div class="acc-rank" style="color:${rankColor}">${rankSym}</div>
        <div class="acc-name"><span class="ac-dot" style="background:${avgSrc.color};color:${avgSrc.color}"></span><span class="ac-text">${avgSrc.shortName || avgSrc.name}</span></div>
        <div class="acc-bar-wrap"><div class="acc-bar${barCls}" style="width:${w}%"></div></div>
        ${metricCell('avg', avgS.tempMaxMAE, '°', 1, bestByVar.tempMax)}
        ${metricCell('avg', avgS.tempMinMAE, '°', 1, bestByVar.tempMin)}
        ${metricCell('avg', avgS.precipMAE, '%', 0, bestByVar.precip)}
      </div>`;
  }

  if (tableEl) tableEl.innerHTML = html;
}

/* ============================================
   CLIMATE CONTEXT (В4) — сравнение с 5-летней нормой
   Один запрос к Open-Meteo Archive API на последние 5 лет, плюс кэш на 30 дней.
   ============================================ */

const CLIMATE_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 дней
function climateCacheKey(lat, lon) {
  return `kw:climate-cache:${lat.toFixed(2)}_${lon.toFixed(2)}:v1`;
}
function loadClimateCache(lat, lon) {
  try {
    const raw = localStorage.getItem(climateCacheKey(lat, lon));
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (!obj || typeof obj.timestamp !== 'number') return null;
    if (Date.now() - obj.timestamp > CLIMATE_CACHE_TTL_MS) return null;
    return obj.data;
  } catch (e) { return null; }
}
function saveClimateCache(lat, lon, data) {
  try { localStorage.setItem(climateCacheKey(lat, lon), JSON.stringify({ timestamp: Date.now(), data })); } catch (e) {}
}

// Запрос архива за последние 5 лет, ±3 дня от сегодняшней даты в каждом году.
// Чтобы один запрос покрыл 5 лет — берём диапазон с 5 лет назад до прошлого года, целиком.
// Из этого диапазона потом отфильтруем нужные дни.
async function fetchArchiveClimate(lat, lon) {
  const now = new Date();
  const thisYear = now.getFullYear();
  const startDate = `${thisYear - 5}-01-01`;
  const endDate   = `${thisYear - 1}-12-31`;
  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    start_date: startDate,
    end_date: endDate,
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
    timezone: 'auto'
  });
  const url = `https://archive-api.open-meteo.com/v1/archive?${params.toString()}`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) return null;
    return await resp.json();
  } catch (e) { return null; }
}

// Разбираем archive-ответ: для каждого года последних 5 лет считаем средние max/min/precip-sum
// в окне ±3 дня от сегодняшней даты (по календарю).
// Возвращает { years: [{year, maxT, minT, precipSum}], normMax, normMin, normPrecip5d }.
function parseArchiveClimate(data) {
  if (!data || !data.daily || !Array.isArray(data.daily.time)) return null;
  const now = new Date();
  const todayMonth = now.getMonth(); // 0..11
  const todayDay = now.getDate();    // 1..31
  // Объединяем дни в "дни года" (приблизительно — пропускаем 29 февраля).
  const yearGroups = {};
  data.daily.time.forEach((dateStr, i) => {
    const d = new Date(dateStr + 'T12:00:00');
    const yr = d.getFullYear();
    if (!yearGroups[yr]) yearGroups[yr] = [];
    // Окно ±3 дня вокруг сегодняшней даты, без учёта года (по календарной близости)
    const refDate = new Date(yr, todayMonth, todayDay);
    const diffDays = Math.abs((d - refDate) / 86400000);
    if (diffDays <= 3) {
      yearGroups[yr].push({
        maxT: data.daily.temperature_2m_max[i],
        minT: data.daily.temperature_2m_min[i],
        precip: data.daily.precipitation_sum[i]
      });
    }
  });

  const years = [];
  Object.keys(yearGroups).sort().forEach(yr => {
    const items = yearGroups[yr].filter(x => x.maxT != null);
    if (items.length === 0) return;
    const meanMax = items.reduce((a, b) => a + b.maxT, 0) / items.length;
    const meanMin = items.reduce((a, b) => a + (b.minT != null ? b.minT : 0), 0) / items.length;
    const sumPrecip = items.reduce((a, b) => a + (b.precip != null ? b.precip : 0), 0);
    years.push({
      year: parseInt(yr, 10),
      maxT: Math.round(meanMax * 10) / 10,
      minT: Math.round(meanMin * 10) / 10,
      precipSum: Math.round(sumPrecip * 10) / 10
    });
  });

  if (years.length === 0) return null;

  const normMax = years.reduce((a, b) => a + b.maxT, 0) / years.length;
  const normMin = years.reduce((a, b) => a + b.minT, 0) / years.length;
  const normPrecip5d = years.reduce((a, b) => a + b.precipSum, 0) / years.length;

  return {
    years,
    normMax: Math.round(normMax * 10) / 10,
    normMin: Math.round(normMin * 10) / 10,
    normPrecip5d: Math.round(normPrecip5d * 10) / 10
  };
}

// === Render ===
let CLIMATE_DATA = null; // заполняется в refreshForecast

function renderClimateContext() {
  if (!CLIMATE_DATA) return;
  const c = CLIMATE_DATA;

  // Текущие значения из ACTIVE_FORECAST_BY_MODEL.avg (или fallback)
  const fc = ACTIVITY_PRESETS_FORECAST_SOURCE();
  if (!fc || !fc[0]) return;
  const today = fc[0];

  // Максимум сегодня и норма
  setClimateMetric('climateTempCurrent', 'climateTempNorm', 'climateTempDiff',
    today.max, c.normMax, 'temp');
  // Минимум сегодня
  setClimateMetric('climateMinCurrent', 'climateMinNorm', 'climateMinDiff',
    today.min, c.normMin, 'temp');
  // Сумма осадков на 5 дней
  let precip5d = 0;
  for (let i = 0; i < Math.min(5, fc.length); i++) {
    // precip — вероятность, не миллиметры. Аппроксимируем: precip% * 0.07 мм/% (как в renderHeroAndMetrics)
    precip5d += Math.max(0, fc[i].precip * 0.07);
  }
  precip5d = Math.round(precip5d * 10) / 10;
  setClimateMetric('climatePrecipCurrent', 'climatePrecipNorm', 'climatePrecipDiff',
    precip5d, c.normPrecip5d, 'precip');

  // Спарклайн
  renderClimateSpark(c.years);
}

function setClimateMetric(curId, normId, diffId, current, norm, kind) {
  const curEl = document.getElementById(curId);
  const normEl = document.getElementById(normId);
  const diffEl = document.getElementById(diffId);
  if (!curEl || !normEl || !diffEl) return;

  if (kind === 'temp') {
    curEl.textContent = fmtTemp(current);
    normEl.textContent = t('climate.norm', { v: fmtTemp(norm) });
  } else if (kind === 'precip') {
    curEl.textContent = `${current} ${t('unit.mm')}`;
    normEl.textContent = t('climate.norm', { v: `${norm} ${t('unit.mm')}` });
  }

  if (typeof current !== 'number' || typeof norm !== 'number') { diffEl.style.display = 'none'; return; }
  diffEl.style.display = '';
  diffEl.classList.remove('warmer','colder','normal','wetter','drier');

  if (kind === 'temp') {
    const diff = current - norm;
    const absDiff = Math.abs(diff);
    if (absDiff < 1) {
      diffEl.classList.add('normal');
      diffEl.textContent = t('climate.aboutNorm');
    } else if (diff > 0) {
      diffEl.classList.add('warmer');
      diffEl.textContent = t('climate.warmer', { v: Math.round(diff * 10) / 10 });
    } else {
      diffEl.classList.add('colder');
      diffEl.textContent = t('climate.colder', { v: Math.round(absDiff * 10) / 10 });
    }
  } else if (kind === 'precip') {
    if (norm < 0.5) { diffEl.style.display = 'none'; return; }
    const pct = Math.round(((current - norm) / norm) * 100);
    if (Math.abs(pct) < 10) {
      diffEl.classList.add('normal');
      diffEl.textContent = t('climate.aboutNorm');
    } else if (pct > 0) {
      diffEl.classList.add('wetter');
      diffEl.textContent = t('climate.wetter', { v: pct });
    } else {
      diffEl.classList.add('drier');
      diffEl.textContent = t('climate.drier', { v: Math.abs(pct) });
    }
  }
}

// Простой SVG-спарклайн max-температуры по годам.
function renderClimateSpark(years) {
  const chart = document.getElementById('climateSparkChart');
  const yearsEl = document.getElementById('climateSparkYears');
  if (!chart || !yearsEl) return;
  if (!years || years.length === 0) {
    chart.innerHTML = `<div class="cs-empty">${t('climate.sparkEmpty')}</div>`;
    yearsEl.innerHTML = '';
    return;
  }
  const values = years.map(y => y.maxT);
  const minV = Math.min(...values), maxV = Math.max(...values);
  const range = Math.max(1, maxV - minV);
  // Большой viewBox + сохранение aspect ratio — текст не сплющивается, точки и подписи выровнены.
  const W = 300, H = 110, PAD_X = 22, TOP = 22, LINE_BOTTOM = 82; // график занимает 22..82, годы — на y=100
  const step = (W - PAD_X * 2) / Math.max(1, values.length - 1);
  const points = values.map((v, i) => {
    const x = PAD_X + i * step;
    const y = TOP + (LINE_BOTTOM - TOP) * (1 - (v - minV) / range);
    return { x, y, v, year: years[i].year };
  });
  const pathD = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
  const areaD = pathD + ` L ${points[points.length-1].x} ${LINE_BOTTOM} L ${points[0].x} ${LINE_BOTTOM} Z`;
  const dotsHtml = points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#a78bfa" stroke="#fff" stroke-width="1.5"/>`).join('');
  const tempLabelsHtml = points.map(p => `<text x="${p.x}" y="${Math.max(p.y - 7, 13)}" text-anchor="middle" font-size="10" fill="#fff" font-family="JetBrains Mono" font-weight="600">${Math.round(p.v)}°</text>`).join('');
  const yearLabelsHtml = points.map(p => `<text x="${p.x}" y="100" text-anchor="middle" font-size="9" fill="rgba(232,240,255,0.55)" font-family="JetBrains Mono">${p.year}</text>`).join('');
  chart.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">
      <defs>
        <linearGradient id="csGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(167,139,250,0.45)"/>
          <stop offset="100%" stop-color="rgba(167,139,250,0)"/>
        </linearGradient>
      </defs>
      <path d="${areaD}" fill="url(#csGrad)"/>
      <path d="${pathD}" stroke="#a78bfa" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      ${dotsHtml}
      ${tempLabelsHtml}
      ${yearLabelsHtml}
    </svg>`;
  yearsEl.innerHTML = ''; // годы внутри SVG
}

/* ============================================
   ACTIVITY WINDOWS (В3) — окна возможностей для бытовых задач
   ============================================ */

// Пресеты. Все температурные пороги в °C (база). Часы в локальном времени из API.
// minDuration — минимум подряд идущих часов, удовлетворяющих условию.
// Helper-функции для проверки осадков на час.
// pmm — среднее по моделям мм/ч; pmmMax — максимум по моделям (если хоть одна модель прогнозит дождь, мы это видим);
// wc — weather_code (51-67 дождь, 71-77 снег, 80-86 ливни, 95-99 гроза).
// Тройная проверка: средний прогноз + максимум по моделям + категория погоды.
const RAIN_WC_RANGES = [[51,57],[61,67],[71,77],[80,86],[95,99]];
function isRainyCode(wc) {
  if (wc == null) return false;
  return RAIN_WC_RANGES.some(([lo, hi]) => wc >= lo && wc <= hi);
}
// Полная сухость: avg < 0.1мм И max < 0.3мм И не дождевой код. Для bbq/laundry — где даже дождь критичен.
function isDry(h)      { return (h.pmm || 0) < 0.1 && (h.pmmMax || 0) < 0.3 && !isRainyCode(h.wc); }
// Лёгкая сухость: avg < 0.3мм И max < 0.7мм И не дождевой код. Для пробежки, прогулки с детьми.
function isMostlyDry(h){ return (h.pmm || 0) < 0.3 && (h.pmmMax || 0) < 0.7 && !isRainyCode(h.wc); }

const ACTIVITY_PRESETS = [
  {
    id: 'jogging',
    minDuration: 1,
    check: (h) => {
      const t = h.feels != null ? h.feels : h.t;
      return t >= 5 && t <= 22 && h.w <= 5 && isMostlyDry(h);
    }
  },
  {
    id: 'kids',
    minDuration: 1,
    check: (h) => {
      const t = h.feels != null ? h.feels : h.t;
      return t >= 12 && t <= 24 && h.w < 5 && isMostlyDry(h) && h.h >= 8 && h.h <= 20;
    }
  },
  {
    id: 'bbq',
    minDuration: 3,
    check: (h) => h.t > 15 && h.w < 5 && isDry(h) && h.h >= 12 && h.h <= 22
  },
  {
    id: 'laundry',
    minDuration: 6,
    check: (h) => isDry(h) && h.w >= 2 && h.h >= 8 && h.h <= 22
  },
  {
    id: 'carwash',
    minDuration: 24,
    check: (h) => isMostlyDry(h)
  },
  {
    id: 'watering',
    minDuration: 1,
    check: (h) => isMostlyDry(h) && h.h >= 18 && h.h <= 22
  }
];

// Горизонт поиска окон — 5 дней (вся доступная глубина прогноза).
// Если в ближайшие 48ч нет подходящего окна, оно может найтись на 3-4-5-й день.
const ACTIVITY_HORIZON_DAYS = 5;

// Собрать все часовые слоты из forecast (до ACTIVITY_HORIZON_DAYS дней) начиная с текущего часа.
function collectUpcomingHours(forecast) {
  const out = [];
  for (let dayIdx = 0; dayIdx < Math.min(ACTIVITY_HORIZON_DAYS, forecast.length); dayIdx++) {
    const day = forecast[dayIdx];
    if (!day || !day.hourly) continue;
    for (const h of day.hourly) {
      // Сегодня — отсекаем уже прошедшие часы
      if (dayIdx === 0 && h.h < NOW_HOUR) continue;
      out.push({ ...h, dayId: dayIdx });
    }
  }
  return out;
}

// Лейбл дня по индексу: 0 — сегодня, 1 — завтра, 2-4 — локализованное имя дня недели ("Сб", "Вс"...)
function dayLabelFromForecast(forecast, dayId) {
  if (dayId === 0) return t('windows.today');
  if (dayId === 1) return t('windows.tomorrow');
  const day = forecast[dayId];
  if (!day) return '';
  return localizeDayShort(day.name);
}

// Найти ближайшее окно длиной >= minDuration, удовлетворяющее check.
// Возвращает { dayId, startH, endH, endDayId, duration } или null.
function findActivityWindow(hours, check, minDuration) {
  let runStart = null;
  for (let i = 0; i < hours.length; i++) {
    const ok = check(hours[i]);
    if (ok && runStart === null) runStart = i;
    if ((!ok || i === hours.length - 1) && runStart !== null) {
      const runEnd = ok ? i : i - 1;
      const len = runEnd - runStart + 1;
      if (len >= minDuration) {
        return {
          dayId: hours[runStart].dayId,
          startH: hours[runStart].h,
          endH: hours[runEnd].h,
          endDayId: hours[runEnd].dayId,
          duration: len
        };
      }
      runStart = null;
    }
  }
  return null;
}

// Найти самое длинное окно (без ограничения minDuration). Полезно для carwash —
// если 24ч полосы нет, показываем хотя бы доступный максимум (≥6ч).
function findLongestActivityWindow(hours, check, minDuration = 1) {
  let best = null;
  let runStart = null;
  const flush = (endIdx) => {
    if (runStart === null) return;
    const len = endIdx - runStart + 1;
    if (len >= minDuration && (!best || len > best.duration)) {
      best = {
        dayId: hours[runStart].dayId,
        startH: hours[runStart].h,
        endH: hours[endIdx].h,
        endDayId: hours[endIdx].dayId,
        duration: len
      };
    }
    runStart = null;
  };
  for (let i = 0; i < hours.length; i++) {
    const ok = check(hours[i]);
    if (ok && runStart === null) runStart = i;
    if (!ok) flush(i - 1);
    if (i === hours.length - 1 && ok) flush(i);
  }
  return best;
}

// Форматирование результата для отображения. Принимает forecast — нужен для лейблов дней 2-4.
function formatActivityWindow(win, forecast) {
  if (!win) return { text: t('windows.noWindow'), found: false, hint: '' };
  const startDay = dayLabelFromForecast(forecast, win.dayId);
  const endDay = dayLabelFromForecast(forecast, win.endDayId);
  const sh = String(win.startH).padStart(2,'0') + ':00';
  const eh = String((win.endH + 1) % 24).padStart(2,'0') + ':00';
  let text;
  if (win.dayId === win.endDayId) {
    text = t('windows.range', { day: startDay, start: sh, end: eh });
  } else {
    text = t('windows.crossDay', { startDay, start: sh, endDay, end: eh });
  }
  return { text, found: true, hint: t('windows.duration', { h: win.duration }) };
}

function renderActivityWindows() {
  const grid = document.getElementById('activityWindowsGrid');
  if (!grid) return;
  // Используем AVG-прогноз (даже если выбран отдельный источник — окна показываем по среднему, оно надёжнее)
  const fc = ACTIVITY_PRESETS_FORECAST_SOURCE();
  const hours = collectUpcomingHours(fc);
  grid.innerHTML = '';

  ACTIVITY_PRESETS.forEach(preset => {
    let result;
    if (preset.id === 'carwash') {
      // Спецлогика: ищем самое раннее окно ≥24ч в 5-дневном горизонте.
      // Если такого нет — самое длинное доступное окно ≥6ч (где можно помыть, и оно постоит).
      const longWin = findActivityWindow(hours, preset.check, 24);
      if (longWin) {
        const fmt = formatActivityWindow(longWin, fc);
        result = { text: fmt.text, found: true, hint: t('windows.carwash.dry', { h: longWin.duration }) };
      } else {
        const fallback = findLongestActivityWindow(hours, preset.check, 6);
        if (fallback) {
          const fmt = formatActivityWindow(fallback, fc);
          result = { text: fmt.text, found: true, hint: t('windows.carwash.dry', { h: fallback.duration }) };
        } else {
          result = { text: t('windows.carwash.notRec'), found: false, hint: '' };
        }
      }
    } else {
      const win = findActivityWindow(hours, preset.check, preset.minDuration);
      result = formatActivityWindow(win, fc);
    }

    const cell = document.createElement('div');
    cell.className = `aw-cell aw-${preset.id} ${result.found ? 'aw-found' : 'aw-not-found'}`;
    cell.innerHTML = `
      <div class="aw-head">
        <span class="aw-icon">${ACTIVITY_ICONS[preset.id]}</span>
        <span class="aw-title">${t('windows.preset.' + preset.id)}</span>
      </div>
      <div class="aw-result">${escapeHtml(result.text)}</div>
      ${result.hint ? `<div class="aw-hint">${escapeHtml(result.hint)}</div>` : ''}
    `;
    grid.appendChild(cell);
  });
}

const ACTIVITY_ICONS = {
  jogging:  '🏃',
  kids:     '👶',
  bbq:      '🔥',
  laundry:  '🧺',
  carwash:  '🚗',
  watering: '🌱'
};

// Источник прогноза для окон — всегда AVG (или fallback). Конкретные модели тут не дают пользы.
function ACTIVITY_PRESETS_FORECAST_SOURCE() {
  return ACTIVE_FORECAST_BY_MODEL.avg || BASELINE;
}

// Astro / UV / AQI плашки в шапке — статика по getActiveForecast()[0] (avg или fallback BASELINE).
// Вызывается из applyAll() при загрузке и при смене языка.
function renderStaticAstro() {
  const d = getActiveForecast()[0];
  const sunArcEl = document.getElementById('sunArc');
  if (sunArcEl) sunArcEl.innerHTML = sunArc(d.sunrise, d.sunset, currentLocalHHMM());
  const moonIconEl = document.getElementById('moonIcon');
  if (moonIconEl) moonIconEl.innerHTML = moonPhaseIcon(d.moonIllum, d.moonWaxing);
  const uvGaugeEl = document.getElementById('uvGauge');
  if (uvGaugeEl) uvGaugeEl.innerHTML = uvGauge(d.uv);

  const dayLenEl = document.getElementById('dayLength');
  if (dayLenEl) dayLenEl.textContent = localizeDayLen(d.dayLen);
  const sunriseEl = document.getElementById('sunriseTime');
  if (sunriseEl) sunriseEl.textContent = d.sunrise;
  const sunsetEl = document.getElementById('sunsetTime');
  if (sunsetEl) sunsetEl.textContent = d.sunset;

  const moonIllumEl = document.getElementById('moonIllum');
  if (moonIllumEl) moonIllumEl.textContent = d.moonIllum + '%';
  const moonNameEl = document.getElementById('moonName');
  if (moonNameEl) {
    const localized = localizeMoonName(d.moonName);
    // Двухстрочное отображение (как в оригинале) – разбиваем по пробелу пополам если есть
    const parts = localized.split(' ');
    moonNameEl.innerHTML = parts.length > 1 ? parts.join('<br>') : localized;
  }

  const uvValEl = document.getElementById('uvVal');
  if (uvValEl) uvValEl.textContent = d.uv;
  const uvStatusEl = document.getElementById('uvStatus');
  if (uvStatusEl) uvStatusEl.textContent = localizeUvLabel(d.uvLabel);

  const aqiValEl = document.getElementById('aqiVal');
  if (aqiValEl) aqiValEl.textContent = d.aqi;
  const aqiStatusEl = document.getElementById('aqiStatus');
  if (aqiStatusEl) aqiStatusEl.textContent = localizeAqiLabel(d.aqiLabel);
}

function updateClock() {
  const el = document.getElementById('clockLine');
  if (!el) return;
  // Время реального успешного fetch (или системное время, пока не было fetch)
  const ts = API_STATE.lastSuccess || new Date();
  const h = String(ts.getHours()).padStart(2,'0');
  const m = String(ts.getMinutes()).padStart(2,'0');
  el.textContent = t('footer.updated', { time: `${h}:${m}` });
}
// === Managed intervals ===========================================
// Все периодические задачи регистрируются через registerManagedInterval(),
// при visibilitychange=hidden их таймеры останавливаются (экономия батареи
// на телефоне в фоне), при возврате — стартуют заново + однократный
// прогон тика чтобы догнать пропущенное состояние.
const MANAGED_INTERVALS = [];
function registerManagedInterval(fn, ms) {
  const entry = { fn, ms, id: null };
  entry.id = setInterval(fn, ms);
  MANAGED_INTERVALS.push(entry);
  return entry;
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    MANAGED_INTERVALS.forEach(e => { if (e.id) { clearInterval(e.id); e.id = null; } });
  } else {
    MANAGED_INTERVALS.forEach(e => {
      if (!e.id) {
        try { e.fn(); } catch (_) {}
        e.id = setInterval(e.fn, e.ms);
      }
    });
  }
});

registerManagedInterval(updateClock, 30_000);

// Солнце на дуге двигается раз в минуту (без перерисовки остального).
registerManagedInterval(() => {
  const d = getActiveForecast()[0];
  if (!d) return;
  const sunArcEl = document.getElementById('sunArc');
  if (sunArcEl) sunArcEl.innerHTML = sunArc(d.sunrise, d.sunset, currentLocalHHMM());
}, 60_000);

// Дата + время в шапке. Обновляется при applyAll() и каждую минуту.
function updateDateLine() {
  const el = document.getElementById('dateLine');
  if (!el) return;
  const now = new Date();
  const dayNamesFullRu = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  const dayRu = dayNamesFullRu[now.getDay()];
  const dayFull = localizeDayFull(dayRu);
  const dateStr = formatDateLocale(formatDateDDMMYYYY(now));
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  // UTC offset (например, "UTC+3" для Киева)
  const offsetMin = -now.getTimezoneOffset();
  const sign = offsetMin >= 0 ? '+' : '-';
  const offsetH = Math.abs(Math.trunc(offsetMin / 60));
  const offsetMM = Math.abs(offsetMin % 60);
  const utcStr = offsetMM === 0 ? `UTC${sign}${offsetH}` : `UTC${sign}${offsetH}:${String(offsetMM).padStart(2,'0')}`;
  el.textContent = `${dayFull}, ${dateStr} · ${hh}:${mm} ${utcStr}`;
}
registerManagedInterval(updateDateLine, 60_000);

/* ============================================
   LOCATION / CITY PICKER
   ============================================ */

const LOCATION_STORAGE_KEY = 'kw:location:v1';
const FAVORITES_STORAGE_KEY = 'kw:favorites:v1';
const FAVORITES_MAX = 8;

// Дефолт – Харьков (центр)
const DEFAULT_LOCATION = {
  name: 'Харьков', region: 'Харьковская обл.', country: 'Украина',
  lat: 49.9935, lon: 36.2304, source: 'default'
};

// Топ-30 населённых пунктов Украины + Высокий (по умолчанию показываем при открытии модалки)
const POPULAR_UA_CITIES = [
  { name: 'Киев',              region: 'Киевская обл.',          lat: 50.4501, lon: 30.5234 },
  { name: 'Харьков',           region: 'Харьковская обл.',       lat: 49.9935, lon: 36.2304 },
  { name: 'Высокий',           region: 'Харьковская обл. (пгт)', lat: 49.9000, lon: 36.2100 },
  { name: 'Одесса',            region: 'Одесская обл.',          lat: 46.4825, lon: 30.7233 },
  { name: 'Днепр',             region: 'Днепропетровская обл.',  lat: 48.4647, lon: 35.0462 },
  { name: 'Львов',             region: 'Львовская обл.',         lat: 49.8397, lon: 24.0297 },
  { name: 'Запорожье',         region: 'Запорожская обл.',       lat: 47.8388, lon: 35.1396 },
  { name: 'Кривой Рог',        region: 'Днепропетровская обл.',  lat: 47.9105, lon: 33.3918 },
  { name: 'Николаев',          region: 'Николаевская обл.',      lat: 46.9750, lon: 31.9946 },
  { name: 'Винница',           region: 'Винницкая обл.',         lat: 49.2331, lon: 28.4682 },
  { name: 'Полтава',           region: 'Полтавская обл.',        lat: 49.5883, lon: 34.5514 },
  { name: 'Чернигов',          region: 'Черниговская обл.',      lat: 51.4982, lon: 31.2893 },
  { name: 'Херсон',            region: 'Херсонская обл.',        lat: 46.6354, lon: 32.6169 },
  { name: 'Черкассы',          region: 'Черкасская обл.',        lat: 49.4444, lon: 32.0598 },
  { name: 'Сумы',              region: 'Сумская обл.',           lat: 50.9077, lon: 34.7981 },
  { name: 'Житомир',           region: 'Житомирская обл.',       lat: 50.2547, lon: 28.6587 },
  { name: 'Ровно',             region: 'Ровненская обл.',        lat: 50.6199, lon: 26.2516 },
  { name: 'Кропивницкий',      region: 'Кировоградская обл.',    lat: 48.5079, lon: 32.2623 },
  { name: 'Хмельницкий',       region: 'Хмельницкая обл.',       lat: 49.4229, lon: 26.9871 },
  { name: 'Ивано-Франковск',   region: 'Ивано-Франковская обл.', lat: 48.9226, lon: 24.7111 },
  { name: 'Тернополь',         region: 'Тернопольская обл.',     lat: 49.5535, lon: 25.5948 },
  { name: 'Луцк',              region: 'Волынская обл.',         lat: 50.7472, lon: 25.3254 },
  { name: 'Краматорск',        region: 'Донецкая обл.',          lat: 48.7387, lon: 37.5848 },
  { name: 'Белая Церковь',     region: 'Киевская обл.',          lat: 49.7958, lon: 30.1278 },
  { name: 'Мелитополь',        region: 'Запорожская обл.',       lat: 46.8395, lon: 35.3654 },
  { name: 'Ужгород',           region: 'Закарпатская обл.',      lat: 48.6207, lon: 22.2879 },
  { name: 'Бровары',           region: 'Киевская обл.',          lat: 50.5114, lon: 30.7906 },
  { name: 'Каменское',         region: 'Днепропетровская обл.',  lat: 48.5114, lon: 34.6021 },
  { name: 'Мариуполь',         region: 'Донецкая обл.',          lat: 47.0971, lon: 37.5430 },
  { name: 'Северодонецк',      region: 'Луганская обл.',         lat: 48.9482, lon: 38.4913 },
  { name: 'Бахмут',            region: 'Донецкая обл.',          lat: 48.5947, lon: 37.9959 },
  { name: 'Каменец-Подольский',region: 'Хмельницкая обл.',       lat: 48.6845, lon: 26.5868 }
];

// Города мира — крупные столицы и мегаполисы для quick-add в city-modal.
// Open-Meteo даёт данные глобально (ECMWF/GFS/ICON покрывают всю планету), так что любые координаты работают.
// Имена в EN — стандартные, локализация в city-modal не критична (поиск Geocoding API работает по имени).
const POPULAR_WORLD_CITIES = [
  { name: 'New York',     region: 'USA',                 lat: 40.7128, lon: -74.0060 },
  { name: 'London',       region: 'United Kingdom',      lat: 51.5074, lon: -0.1278  },
  { name: 'Paris',        region: 'France',              lat: 48.8566, lon:  2.3522  },
  { name: 'Berlin',       region: 'Germany',             lat: 52.5200, lon: 13.4050  },
  { name: 'Madrid',       region: 'Spain',               lat: 40.4168, lon: -3.7038  },
  { name: 'Rome',         region: 'Italy',               lat: 41.9028, lon: 12.4964  },
  { name: 'Amsterdam',    region: 'Netherlands',         lat: 52.3676, lon:  4.9041  },
  { name: 'Vienna',       region: 'Austria',             lat: 48.2082, lon: 16.3738  },
  { name: 'Warsaw',       region: 'Poland',              lat: 52.2297, lon: 21.0122  },
  { name: 'Prague',       region: 'Czech Republic',      lat: 50.0755, lon: 14.4378  },
  { name: 'Stockholm',    region: 'Sweden',              lat: 59.3293, lon: 18.0686  },
  { name: 'Istanbul',     region: 'Turkey',              lat: 41.0082, lon: 28.9784  },
  { name: 'Dubai',        region: 'UAE',                 lat: 25.2048, lon: 55.2708  },
  { name: 'Tel Aviv',     region: 'Israel',              lat: 32.0853, lon: 34.7818  },
  { name: 'Tokyo',        region: 'Japan',               lat: 35.6762, lon: 139.6503 },
  { name: 'Beijing',      region: 'China',               lat: 39.9042, lon: 116.4074 },
  { name: 'Singapore',    region: 'Singapore',           lat:  1.3521, lon: 103.8198 },
  { name: 'Bangkok',      region: 'Thailand',            lat: 13.7563, lon: 100.5018 },
  { name: 'Sydney',       region: 'Australia',           lat: -33.8688, lon: 151.2093 },
  { name: 'Toronto',      region: 'Canada',              lat: 43.6532, lon: -79.3832 },
  { name: 'Los Angeles',  region: 'USA',                 lat: 34.0522, lon: -118.2437 },
  { name: 'Sao Paulo',    region: 'Brazil',              lat: -23.5505, lon: -46.6333 },
  { name: 'Cairo',        region: 'Egypt',               lat: 30.0444, lon: 31.2357  }
];

// Текущая локация — заполнится в loadInitialLocation()
let currentLocation = { ...DEFAULT_LOCATION };

// === Избранные города (localStorage) ===
function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    // Валидация: каждый item должен иметь name+lat+lon
    return arr.filter(it => it && typeof it.name === 'string' && typeof it.lat === 'number' && typeof it.lon === 'number').slice(0, FAVORITES_MAX);
  } catch (e) {
    return [];
  }
}
function saveFavorites(list) {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(list.slice(0, FAVORITES_MAX)));
  } catch (e) {
    console.warn('Не удалось сохранить favorites:', e);
  }
}
// Координаты совпадают (с точностью до 2 знаков ≈ 1км) — считаем что это один и тот же город
function sameCoords(a, b) {
  if (!a || !b) return false;
  return Math.abs(a.lat - b.lat) < 0.01 && Math.abs(a.lon - b.lon) < 0.01;
}
function isFavorite(loc) {
  return loadFavorites().some(f => sameCoords(f, loc));
}
function toggleFavorite(loc) {
  const list = loadFavorites();
  const idx = list.findIndex(f => sameCoords(f, loc));
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    if (list.length >= FAVORITES_MAX) {
      list.pop();  // вытесняем самый старый
    }
    list.unshift({
      name: loc.name,
      region: loc.region || '',
      country: loc.country || '',
      lat: loc.lat,
      lon: loc.lon
    });
  }
  saveFavorites(list);
  return list;
}

// === localStorage ===
function loadSavedLocation() {
  try {
    const raw = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    // Sanity check
    if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number' || !obj.name) return null;
    if (obj.lat < -90 || obj.lat > 90 || obj.lon < -180 || obj.lon > 180) return null;
    return obj;
  } catch (e) {
    console.warn('Не удалось прочитать локацию из localStorage:', e);
    return null;
  }
}
function saveLocation(loc) {
  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(loc));
  } catch (e) {
    console.warn('Не удалось сохранить локацию:', e);
  }
}

// === Применение локации к UI ===
function setCurrentLocation(loc) {
  currentLocation = { ...loc };
  saveLocation(currentLocation);
  renderLocationHeader();
  renderFavoritesRow();
  // Перезапросить прогноз для новых координат
  refreshForecast();
}
function renderLocationHeader() {
  const nameEl = document.getElementById('locationName');
  const tagEl = document.getElementById('locationTag');
  if (!nameEl || !tagEl) return;

  // Локализованные имя и регион (если город из POPULAR_UA_CITIES)
  const { name: locName, region: locRegion } = localizeCity(currentLocation);

  let title = locName;
  if (locRegion && !locRegion.startsWith(locName)) {
    const combined = `${locName} · ${locRegion}`;
    title = combined.length <= 32 ? combined : locName;
  }
  nameEl.textContent = title;

  if (currentLocation.source === 'geo') {
    tagEl.className = 'geo-tag';
    tagEl.textContent = t('city.tag.geo');
    tagEl.style.display = '';
  } else if (currentLocation.source === 'manual') {
    tagEl.className = 'geo-tag manual';
    tagEl.textContent = t('city.tag.manual');
    tagEl.style.display = '';
  } else {
    tagEl.style.display = 'none';
  }
}

// === Геолокация браузера + reverse-geocode ===
async function requestGeolocation() {
  if (!('geolocation' in navigator)) {
    throw new Error(t('city.geoErr.notSupported'));
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      err => {
        const map = { 1: 'city.geoErr.denied', 2: 'city.geoErr.unavailable', 3: 'city.geoErr.timeout' };
        reject(new Error(t(map[err.code] || 'city.geoErr.generic')));
      },
      { timeout: 8000, maximumAge: 60_000, enableHighAccuracy: false }
    );
  });
}

async function reverseGeocode(lat, lon) {
  const acceptLang = SUPPORTED_LANGS.includes(state.lang) ? state.lang : 'en';
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=${acceptLang}&zoom=12`;
  try {
    const resp = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();
    const a = data.address || {};
    const name = a.city || a.town || a.village || a.hamlet || a.suburb || a.county || `${lat.toFixed(3)}, ${lon.toFixed(3)}`;
    const region = a.state || a.region || a.country || '';
    return { name, region };
  } catch (e) {
    console.warn('Reverse-geocode не удался:', e);
    return { name: `${lat.toFixed(3)}, ${lon.toFixed(3)}`, region: '' };
  }
}

// === Поиск через Open-Meteo Geocoding ===
// Глобальный поиск через Open-Meteo Geocoding API.
// Раньше был жёстко ограничен countryCode=UA → ломал поиск Tokyo/Berlin/etc.
// Сейчас: глобальный поиск, но результаты пост-сортируются так чтобы
// при русско-/украиноязычном интерфейсе украинские населённые пункты шли сверху.
async function searchCities(query) {
  const q = query.trim();
  if (q.length < 2) return [];
  // Open-Meteo Geocoding поддерживает: en, de, fr, it, es, pt, ru, ja, zh, hi.
  // Польский/чешский и др. — пока не в списке, для них используем en.
  const OM_GEO_LANGS = ['en','de','fr','it','es','pt','ru','ja','zh','hi'];
  const apiLang = OM_GEO_LANGS.includes(state.lang) ? state.lang : (state.lang === 'uk' ? 'uk' : 'en');
  const params = new URLSearchParams({
    name: q,
    count: '25',  // было 15 — увеличили чтобы захватить больше сёл
    language: apiLang
  });
  const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Geocoding HTTP ' + resp.status);
  const data = await resp.json();
  if (!data.results) return [];

  // Сортируем по релевантности с учётом локали: для RU/UK украинские населённые пункты сверху.
  // Open-Meteo возвращает уже отсортированный список по релевантности, но для UA-локали хочется приоритета.
  const preferUA = (apiLang === 'ru' || apiLang === 'uk');
  const sorted = [...data.results].sort((a, b) => {
    if (preferUA) {
      const aUa = a.country_code === 'UA' ? 1 : 0;
      const bUa = b.country_code === 'UA' ? 1 : 0;
      if (aUa !== bUa) return bUa - aUa;
    }
    // Внутри страны сохраняем порядок от API (он по убыванию релевантности)
    return 0;
  });

  return sorted.map(r => ({
    name: r.name,
    region: [r.admin1, r.admin2].filter(Boolean).join(' · ') || r.country || '',
    country: r.country || '',
    lat: r.latitude,
    lon: r.longitude
  }));
}

// === Модалка: открыть/закрыть/отрисовка ===
const cityModal = document.getElementById('cityModal');
const cityModalClose = document.getElementById('cityModalClose');
const cityGeoBtn = document.getElementById('cityGeoBtn');
const cityGeoError = document.getElementById('cityGeoError');
const cityGeoErrorText = document.getElementById('cityGeoErrorText');
const citySearchInput = document.getElementById('citySearchInput');
const citySearchClear = document.getElementById('citySearchClear');
const cityListHeader = document.getElementById('cityListHeader');
const cityList = document.getElementById('cityList');

function openCityModal() {
  hideGeoError();
  citySearchInput.value = '';
  citySearchClear.classList.remove('visible');
  cityListHeader.textContent = t('city.list.popular');
  renderCityList(null, { sections: getDefaultCitySections() });
  cityModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => citySearchInput.focus(), 350);
}
function closeCityModal() {
  cityModal.classList.remove('open');
  document.body.style.overflow = '';
}

// Один item списка городов: pin + текст + check + звёздочка-избранное.
// Звёздочка — отдельная кнопка с stopPropagation, не должна переключать локацию.
function buildCityItem(c) {
  const isActive = sameCoords(c, currentLocation);
  const fav = isFavorite(c);
  const item = document.createElement('button');
  item.type = 'button';
  item.className = 'city-item' + (isActive ? ' active' : '');
  const { name: dispName, region: dispRegion } = localizeCity(c);
  item.innerHTML = `
    <span class="city-pin">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2C7.58 2 4 5.58 4 10c0 5.5 8 12 8 12s8-6.5 8-12c0-4.42-3.58-8-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
    </span>
    <span class="city-text">
      <span class="city-name">${escapeHtml(dispName)}</span>
      <span class="city-region">${escapeHtml(dispRegion)}</span>
    </span>
    <span class="city-active-check">✓</span>
    <button type="button" class="city-item-fav-btn${fav ? ' active' : ''}" aria-label="${escapeHtml(fav ? t('fav.removeFromFav') : t('fav.addToFav'))}" title="${escapeHtml(fav ? t('fav.removeFromFav') : t('fav.addToFav'))}">${fav ? '★' : '☆'}</button>
  `;
  item.addEventListener('click', () => selectCityFromList(c));
  const favBtn = item.querySelector('.city-item-fav-btn');
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(c);
    renderFavoritesRow();
    // Перерисовать всю модалку чтобы обновить состояние всех звёзд (один город может появляться в нескольких секциях)
    if (typeof window._lastCityRender === 'function') window._lastCityRender();
  });
  return item;
}

// cities — либо массив городов (плоский, для поиска), либо null + opts.sections с секциями.
function renderCityList(cities, opts = {}) {
  cityList.innerHTML = '';

  // Сохраняем последнюю функцию рендера чтобы можно было перерисовать после toggleFavorite
  window._lastCityRender = () => renderCityList(cities, opts);

  // Режим секций
  if (opts.sections && Array.isArray(opts.sections)) {
    let totalCount = 0;
    opts.sections.forEach(section => {
      if (!section.cities || !section.cities.length) return;
      totalCount += section.cities.length;
      const header = document.createElement('div');
      header.className = 'city-section-header';
      header.textContent = section.title;
      cityList.appendChild(header);
      section.cities.forEach(c => cityList.appendChild(buildCityItem(c)));
    });
    if (totalCount === 0) {
      cityList.innerHTML = `
        <div class="city-empty">
          <div class="empty-icon">🔍</div>
          <div>${opts.emptyText || t('city.list.empty')}</div>
        </div>`;
    }
    return;
  }

  // Плоский режим (обычный массив, для результатов поиска)
  if (!cities || !cities.length) {
    cityList.innerHTML = `
      <div class="city-empty">
        <div class="empty-icon">🔍</div>
        <div>${opts.emptyText || t('city.list.empty')}</div>
      </div>`;
    return;
  }
  cities.forEach(c => cityList.appendChild(buildCityItem(c)));
}

// Дефолтный набор секций при открытии city-modal без ввода: Избранные → Украина → Мир
function getDefaultCitySections() {
  const sections = [];
  const favs = loadFavorites();
  if (favs.length > 0) {
    sections.push({ title: t('city.section.favorites'), cities: favs });
  }
  sections.push({ title: t('city.section.ua'), cities: POPULAR_UA_CITIES });
  sections.push({ title: t('city.section.world'), cities: POPULAR_WORLD_CITIES });
  return sections;
}

// Рисуем чипы избранного в шапке. Если favorites пуст — рисуем только кнопку «+ Добавить».
function renderFavoritesRow() {
  const row = document.getElementById('favoritesRow');
  if (!row) return;
  row.innerHTML = '';
  const favs = loadFavorites();
  favs.forEach(f => {
    const isActive = sameCoords(f, currentLocation);
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'fav-chip' + (isActive ? ' active' : '');
    const { name: dispName } = localizeCity(f);
    chip.innerHTML = `
      <span class="fav-chip-pin">📍</span>
      <span class="fav-chip-name">${escapeHtml(dispName)}</span>
      <button type="button" class="fav-chip-remove" aria-label="${escapeHtml(t('fav.removeFromFav'))}" title="${escapeHtml(t('fav.removeFromFav'))}">×</button>
    `;
    chip.addEventListener('click', () => {
      setCurrentLocation({ ...f, source: 'favorite' });
    });
    chip.querySelector('.fav-chip-remove').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(f);
      renderFavoritesRow();
    });
    row.appendChild(chip);
  });
  // Кнопка "+ Добавить" — открывает city-modal
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'fav-chip add';
  addBtn.textContent = t('fav.add');
  addBtn.addEventListener('click', () => openCityModal());
  row.appendChild(addBtn);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

function selectCityFromList(c) {
  setCurrentLocation({ ...c, source: 'manual' });
  closeCityModal();
}

function showGeoError(text) {
  cityGeoErrorText.textContent = text;
  cityGeoError.style.display = 'flex';
}
function hideGeoError() {
  cityGeoError.style.display = 'none';
}

// === Обработчики ===
document.getElementById('locationBlock').addEventListener('click', openCityModal);
document.getElementById('locationBlock').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCityModal(); }
});
cityModalClose.addEventListener('click', closeCityModal);
cityModal.addEventListener('click', e => { if (e.target === cityModal) closeCityModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && cityModal.classList.contains('open')) closeCityModal();
});

cityGeoBtn.addEventListener('click', async () => {
  hideGeoError();
  cityGeoBtn.classList.add('loading');
  try {
    const pos = await requestGeolocation();
    const { name, region } = await reverseGeocode(pos.lat, pos.lon);
    setCurrentLocation({ name, region, lat: pos.lat, lon: pos.lon, source: 'geo' });
    closeCityModal();
  } catch (err) {
    showGeoError(err.message || t('city.geoErr.generic'));
  } finally {
    cityGeoBtn.classList.remove('loading');
  }
});

// debounce — чтобы не дёргать API на каждой букве
let searchTimer = null;
citySearchInput.addEventListener('input', () => {
  const q = citySearchInput.value;
  citySearchClear.classList.toggle('visible', q.length > 0);

  clearTimeout(searchTimer);

  if (q.trim().length === 0) {
    cityListHeader.textContent = t('city.list.popular');
    renderCityList(null, { sections: getDefaultCitySections() });
    return;
  }
  if (q.trim().length < 2) {
    cityListHeader.textContent = t('city.list.minChars');
    renderCityList([]);
    return;
  }

  // Локальная фильтрация: ищем по UA-городам + мировым + сохранённым избранным.
  // Учитываем все языковые имена (через UA_CITY_TRANSLATIONS), region и country.
  const ql = q.toLowerCase().trim();
  const allKnown = [...POPULAR_UA_CITIES, ...POPULAR_WORLD_CITIES, ...loadFavorites()];
  // Дедуп по координатам — favorites могут совпадать с popular
  const seenKeys = new Set();
  const dedupKnown = allKnown.filter(c => {
    const k = `${c.lat.toFixed(2)}_${c.lon.toFixed(2)}`;
    if (seenKeys.has(k)) return false;
    seenKeys.add(k);
    return true;
  });
  const local = dedupKnown.filter(c => {
    const tr = UA_CITY_TRANSLATIONS[c.name] || {};
    return c.name.toLowerCase().includes(ql)
        || (tr.uk && tr.uk.toLowerCase().includes(ql))
        || (tr.en && tr.en.toLowerCase().includes(ql))
        || (c.region && c.region.toLowerCase().includes(ql))
        || (c.country && c.country.toLowerCase().includes(ql));
  });
  if (local.length > 0) {
    cityListHeader.textContent = t('city.list.foundLocal');
    renderCityList(local);
  } else {
    cityListHeader.innerHTML = `<span style="display:inline-flex;gap:8px;align-items:center"><span class="geo-spinner" style="width:11px;height:11px;border-width:1.5px"></span>${escapeHtml(t('city.list.searching'))}</span>`;
    renderCityList([]);
  }

  // Параллельно — API-поиск (с задержкой 300 мс). Дедуп с локальными результатами по координатам.
  searchTimer = setTimeout(async () => {
    try {
      const found = await searchCities(q);
      // Объединяем: локальные сверху (они уже видны), потом уникальные API-результаты
      const localKeys = new Set(local.map(c => `${c.lat.toFixed(2)}_${c.lon.toFixed(2)}`));
      const uniqueApi = found.filter(c => !localKeys.has(`${c.lat.toFixed(2)}_${c.lon.toFixed(2)}`));
      const combined = [...local, ...uniqueApi];
      cityListHeader.textContent = combined.length ? t('city.list.found', { n: combined.length }) : t('city.list.notFound');
      renderCityList(combined, { emptyText: t('city.list.emptyForQuery', { q: escapeHtml(q) }) });
    } catch (err) {
      // Если локальные результаты есть — оставляем их видимыми, ошибку показываем только если ничего не нашли вообще
      if (local.length === 0) {
        cityListHeader.textContent = t('city.list.notFound');
        renderCityList([], { emptyText: t('city.list.searchError') });
      }
    }
  }, 300);
});

citySearchClear.addEventListener('click', () => {
  citySearchInput.value = '';
  citySearchClear.classList.remove('visible');
  cityListHeader.textContent = t('city.list.popular');
  renderCityList(null, { sections: getDefaultCitySections() });
  citySearchInput.focus();
});

/* ============================================
   COMPARE MODE — UI handlers, fetch, render
   ============================================ */

let _compareChartInstance = null;

// Helper — берём AVG-прогноз второго города (или null если ещё не загружен)
function compareForecastB() {
  const m = COMPARE_STATE.forecastB;
  if (!m || !m.avg) return null;
  return m.avg;
}

// Fetch + парс прогноза для второго города. Кэш переиспользует существующую
// инфраструктуру forecast-cache (по координатам).
async function fetchCompareCityForecast(city) {
  if (!city || typeof city.lat !== 'number') throw new Error('bad city');
  // Сначала пробуем кэш
  const cached = loadForecastCache(city.lat, city.lon);
  if (cached) return cached.byModel;
  // Иначе сеть
  const modelIds = SOURCES.filter(s => s.model).map(s => s.model);
  const data = await fetchOpenMeteo(city.lat, city.lon, modelIds);
  const byModel = await parseAllModels(data, SOURCES);
  if (!byModel.avg || byModel.avg.length === 0) throw new Error('empty parse');
  // Дозальём AQI (но без блокировки)
  fetchAirQuality(city.lat, city.lon).then(aqiData => {
    const aqiByDay = parseAqiByDay(aqiData);
    if (aqiByDay.length > 0) {
      for (const sourceId of Object.keys(byModel)) {
        byModel[sourceId].forEach((day, i) => {
          if (aqiByDay[i] != null) { day.aqi = aqiByDay[i]; day.aqiLabel = aqiLabelFromValue(aqiByDay[i]); }
        });
      }
    }
  }).catch(() => {});
  // Сохраним в кэш — пригодится и для основного, если юзер потом туда переключится
  saveForecastCache(city.lat, city.lon, byModel);
  return byModel;
}

// Активировать compare mode с конкретным городом B
async function activateCompare(cityB) {
  COMPARE_STATE.active = true;
  COMPARE_STATE.cityB = cityB;
  COMPARE_STATE.forecastB = null;
  saveCompareState();
  document.body.classList.add('compare-mode');
  const banner = document.getElementById('compareBanner');
  const view = document.getElementById('compareView');
  if (banner) banner.style.display = '';
  if (view) view.style.display = '';
  // Промежуточный рендер (плейсхолдер) пока fetch не закончился
  renderCompareView();
  try {
    COMPARE_STATE.forecastB = await fetchCompareCityForecast(cityB);
    renderCompareView();
  } catch (err) {
    console.warn('Compare fetch failed:', err);
    const summaryText = document.getElementById('compareSummaryText');
    if (summaryText) summaryText.textContent = t('compare.error', { city: cityB.name || '—' });
  }
}

function deactivateCompare() {
  COMPARE_STATE.active = false;
  COMPARE_STATE.cityB = null;
  COMPARE_STATE.forecastB = null;
  if (_compareChartInstance) { try { _compareChartInstance.destroy(); } catch (_) {} _compareChartInstance = null; }
  saveCompareState();
  document.body.classList.remove('compare-mode');
  const banner = document.getElementById('compareBanner');
  const view = document.getElementById('compareView');
  if (banner) banner.style.display = 'none';
  if (view) view.style.display = 'none';
}

// Главный render — заполняет dual-hero, метрики, summary, chart, 7-day
function renderCompareView() {
  if (!COMPARE_STATE.active) return;
  const forecastA = getForecast(currentSourceId);
  const forecastB = compareForecastB();
  if (!forecastA || !forecastA[0]) return;
  const dayA = forecastA[0];
  const cityA = currentLocation ? (currentLocation.name || '—') : '—';
  const cityB = COMPARE_STATE.cityB ? (COMPARE_STATE.cityB.name || '—') : '—';

  // Банер
  const labA = document.getElementById('compareLabelA');
  const labB = document.getElementById('compareLabelB');
  if (labA) labA.textContent = cityA;
  if (labB) labB.textContent = cityB;

  // Hero A
  setText('chCityA', cityA);
  document.getElementById('chIconA').innerHTML = weatherIcon(dayA.condition, 64);
  const tempA = Math.round(convertTemp(dayA.max, state.units.temp));
  setText('chTempA', String(tempA));
  setText('chTempUnitA', unitTemp());
  setText('chCondA', dayA.condLabel || '');
  setText('chFeelsA', dayA.hourly && dayA.hourly[NOW_HOUR] && dayA.hourly[NOW_HOUR].feels != null
    ? '~' + Math.round(convertTemp(dayA.hourly[NOW_HOUR].feels, state.units.temp)) + unitTemp() : '');

  // Hero B (placeholders если ещё не загружено)
  setText('chCityB', cityB);
  if (forecastB && forecastB[0]) {
    const dayB = forecastB[0];
    document.getElementById('chIconB').innerHTML = weatherIcon(dayB.condition, 64);
    const tempB = Math.round(convertTemp(dayB.max, state.units.temp));
    setText('chTempB', String(tempB));
    setText('chTempUnitB', unitTemp());
    setText('chCondB', dayB.condLabel || '');
    setText('chFeelsB', dayB.hourly && dayB.hourly[NOW_HOUR] && dayB.hourly[NOW_HOUR].feels != null
      ? '~' + Math.round(convertTemp(dayB.hourly[NOW_HOUR].feels, state.units.temp)) + unitTemp() : '');
  } else {
    document.getElementById('chIconB').innerHTML = '';
    setText('chTempB', '…');
    setText('chTempUnitB', '');
    setText('chCondB', t('compare.loading', { city: cityB }));
    setText('chFeelsB', '');
  }

  // Метрики
  fillCompareMetric('cmWind',     dayA.wind,        forecastB && forecastB[0] ? forecastB[0].wind     : null, fmtWind);
  fillCompareMetric('cmRain',     dayA.precip,      forecastB && forecastB[0] ? forecastB[0].precip   : null, v => v + '%');
  fillCompareMetric('cmPressure', dayA.pressure,    forecastB && forecastB[0] ? forecastB[0].pressure : null, v => Math.round(convertPressure(v, state.units.pressure)) + ' ' + shortMetricUnit('pressure'));
  fillCompareMetric('cmHumidity', dayA.humidity,    forecastB && forecastB[0] ? forecastB[0].humidity : null, v => v + '%');

  // Summary — кто теплее / суше
  renderCompareSummary(dayA, forecastB && forecastB[0] ? forecastB[0] : null, cityA, cityB);

  // Legend названия городов
  setText('cccLegendA', cityA);
  setText('cccLegendB', cityB);

  // Chart — почасовая температура (lazy Chart.js)
  renderCompareChart(dayA, forecastB && forecastB[0] ? forecastB[0] : null);

  // 10-дневная лента. Скролл синхронизирован нативно: оба ряда живут
  // внутри одного скролл-контейнера .cd-table, а лейблы городов залипают
  // position:sticky на левый край. Никакого JS-синхрона не нужно.
  setText('cdRowLabelA', cityA);
  setText('cdRowLabelB', cityB);
  renderCompareDays('cdCellsA', forecastA);
  renderCompareDays('cdCellsB', forecastB);
}

function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }

function fillCompareMetric(idPrefix, valA, valB, formatFn) {
  const aEl = document.getElementById(idPrefix + 'A');
  const bEl = document.getElementById(idPrefix + 'B');
  if (!aEl || !bEl) return;
  aEl.classList.remove('better'); bEl.classList.remove('better');
  aEl.textContent = (valA != null && !Number.isNaN(valA)) ? formatFn(valA) : '—';
  bEl.textContent = (valB != null && !Number.isNaN(valB)) ? formatFn(valB) : '—';
  // Подсветка лучшего — для осадков/влажности меньше = лучше; для давления нейтрально
  if (valA != null && valB != null && valA !== valB) {
    if (idPrefix === 'cmRain' || idPrefix === 'cmHumidity' || idPrefix === 'cmWind') {
      if (valA < valB) aEl.classList.add('better'); else bEl.classList.add('better');
    }
  }
}

function renderCompareSummary(dayA, dayB, cityA, cityB) {
  const el = document.getElementById('compareSummaryText');
  if (!el) return;
  if (!dayB) { el.textContent = t('compare.loading', { city: cityB }); return; }
  const dT = (dayA.max ?? 0) - (dayB.max ?? 0);
  const dP = (dayA.precip ?? 0) - (dayB.precip ?? 0);
  // Температура важнее — она основной критерий "лучше"
  if (Math.abs(dT) >= 3) {
    const winnerA = dT > 0;
    const key = winnerA ? 'compare.summary.warmerA' : 'compare.summary.warmerB';
    el.textContent = t(key, { a: cityA, b: cityB, d: Math.abs(Math.round(dT)) });
    return;
  }
  // Если темпы близки — смотрим на осадки
  if (Math.abs(dP) >= 15) {
    const winnerA = dP < 0; // меньше осадков = лучше
    const key = winnerA ? 'compare.summary.drierA' : 'compare.summary.drierB';
    el.textContent = t(key, { a: cityA, b: cityB, pa: Math.round(dayA.precip), pb: Math.round(dayB.precip) });
    return;
  }
  el.textContent = t('compare.summary.same');
}

function renderCompareChart(dayA, dayB) {
  const canvas = document.getElementById('compareChart');
  if (!canvas) return;
  if (!window.Chart) {
    ensureChartJs().then(() => renderCompareChart(dayA, dayB)).catch(() => {});
    return;
  }
  const labels = dayA.hourly.map(h => String(h.h).padStart(2,'0'));
  const dataA = dayA.hourly.map(h => Math.round(convertTemp(h.t, state.units.temp)));
  const dataB = dayB && dayB.hourly ? dayB.hourly.map(h => Math.round(convertTemp(h.t, state.units.temp))) : labels.map(() => null);
  if (_compareChartInstance) { try { _compareChartInstance.destroy(); } catch (_) {} _compareChartInstance = null; }
  const ctx = canvas.getContext('2d');
  _compareChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'A', data: dataA, borderColor: '#00d4ff', backgroundColor: 'rgba(0,212,255,0.10)', borderWidth: 2.5, tension: 0.35, pointRadius: 0, pointHoverRadius: 5, fill: false },
        { label: 'B', data: dataB, borderColor: '#a78bfa', backgroundColor: 'rgba(167,139,250,0.10)', borderWidth: 2.5, tension: 0.35, pointRadius: 0, pointHoverRadius: 5, fill: false, spanGaps: true }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(10,17,40,0.95)', titleColor: '#e8f0ff', bodyColor: '#e8f0ff', borderColor: 'rgba(167,139,250,0.3)', borderWidth: 1, padding: 10, cornerRadius: 10 } },
      scales: {
        x: { ticks: { color: 'rgba(232,240,255,0.5)', font: { family: 'JetBrains Mono', size: 10 }, maxRotation: 0 }, grid: { color: 'rgba(255,255,255,0.04)' }, border: { display: false } },
        y: { ticks: { color: 'rgba(232,240,255,0.5)', font: { family: 'JetBrains Mono', size: 10 }, callback: v => v + unitTemp() }, grid: { color: 'rgba(255,255,255,0.04)' }, border: { display: false } }
      }
    }
  });
}

function renderCompareDays(containerId, forecast) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!forecast || !forecast.length) {
    el.innerHTML = Array.from({length: 10}, () => '<div class="cd-cell"><div class="day">—</div></div>').join('');
    return;
  }
  el.innerHTML = forecast.slice(0, 10).map(d => {
    const dayLabel = d.id === 0 ? t('day.today') : localizeDayShort(d.name);
    const dateShort = d.date ? d.date.slice(0,5) : '';
    const hi = Math.round(convertTemp(d.max, state.units.temp));
    const lo = Math.round(convertTemp(d.min, state.units.temp));
    return `<div class="cd-cell">
      <div class="day">${dayLabel}</div>
      <div class="date">${dateShort}</div>
      <div class="icon">${weatherIcon(d.condition, 36)}</div>
      <div class="t"><span class="hi">${hi}°</span><span class="lo">${lo}°</span></div>
      <div class="prec">💧 ${d.precip}%</div>
      <div class="wind">${fmtWind(d.wind, { withUnit: false })} ${unitWind()}</div>
    </div>`;
  }).join('');
}

// Compare picker modal
function openComparePicker() {
  const modal = document.getElementById('comparePickerModal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderComparePickerList('');
  setTimeout(() => {
    const inp = document.getElementById('comparePickerInput');
    if (inp) inp.focus();
  }, 320);
}
function closeComparePicker() {
  const modal = document.getElementById('comparePickerModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function renderComparePickerList(query) {
  const list = document.getElementById('comparePickerList');
  if (!list) return;
  query = (query || '').trim().toLowerCase();
  const favs = loadFavorites();
  const curLat = currentLocation ? currentLocation.lat : null;
  const curLon = currentLocation ? currentLocation.lon : null;
  let items = [];
  // Favorites сначала (без текущего города)
  for (const f of favs) {
    if (Math.abs(f.lat - curLat) < 0.05 && Math.abs(f.lon - curLon) < 0.05) continue;
    items.push({ name: f.name, region: f.region, country: f.country, lat: f.lat, lon: f.lon, kind: 'fav' });
  }
  if (query) {
    items = items.filter(i => (i.name || '').toLowerCase().includes(query));
  }
  if (items.length === 0 && !query) {
    list.innerHTML = `<div style="text-align:center;color:rgba(232,240,255,0.5);font-size:13px;padding:18px 8px">${t('compare.pickHint')}</div>`;
    return;
  }
  list.innerHTML = items.map(i =>
    `<div class="city-item" role="option" data-lat="${i.lat}" data-lon="${i.lon}" data-name="${(i.name||'').replace(/"/g,'&quot;')}" data-region="${(i.region||'').replace(/"/g,'&quot;')}">
      <div class="city-pin">${i.kind === 'fav' ? '★' : '📍'}</div>
      <div class="city-text">
        <div class="city-name">${i.name}</div>
        ${i.region ? `<div class="city-region">${i.region}</div>` : ''}
      </div>
    </div>`).join('');
  list.querySelectorAll('.city-item').forEach(it => {
    it.addEventListener('click', () => {
      const city = { name: it.dataset.name, region: it.dataset.region, lat: parseFloat(it.dataset.lat), lon: parseFloat(it.dataset.lon) };
      closeComparePicker();
      activateCompare(city);
    });
  });
  // Если поиск — также живой запрос через geocoding
  if (query && query.length >= 2) {
    searchCities(query).then(results => {
      if (!results || !results.length) return;
      const cur = document.getElementById('comparePickerList');
      if (!cur) return;
      const apiCards = results.slice(0, 10).map(r =>
        `<div class="city-item" role="option" data-lat="${r.lat}" data-lon="${r.lon}" data-name="${(r.name||'').replace(/"/g,'&quot;')}" data-region="${(r.region||'').replace(/"/g,'&quot;')}">
          <div class="city-pin">🌐</div>
          <div class="city-text">
            <div class="city-name">${r.name}</div>
            ${r.region ? `<div class="city-region">${r.region}</div>` : ''}
          </div>
        </div>`).join('');
      cur.insertAdjacentHTML('beforeend', apiCards);
      cur.querySelectorAll('.city-item').forEach(it => {
        it.onclick = () => {
          const city = { name: it.dataset.name, region: it.dataset.region, lat: parseFloat(it.dataset.lat), lon: parseFloat(it.dataset.lon) };
          closeComparePicker();
          activateCompare(city);
        };
      });
    }).catch(() => {});
  }
}

// Event handlers
function setupCompareMode() {
  const chip = document.getElementById('compareChip');
  const closeBtn = document.getElementById('compareCloseBtn');
  const pickerClose = document.getElementById('comparePickerClose');
  const pickerInput = document.getElementById('comparePickerInput');
  const pickerClear = document.getElementById('comparePickerClear');
  const pickerModal = document.getElementById('comparePickerModal');
  const swapA = document.getElementById('chSwapA');
  const swapB = document.getElementById('chSwapB');
  if (chip) chip.addEventListener('click', () => {
    if (COMPARE_STATE.active) deactivateCompare();
    else openComparePicker();
  });
  if (closeBtn) closeBtn.addEventListener('click', deactivateCompare);
  if (pickerClose) pickerClose.addEventListener('click', closeComparePicker);
  if (pickerModal) pickerModal.addEventListener('click', (e) => { if (e.target === pickerModal) closeComparePicker(); });
  if (pickerInput) pickerInput.addEventListener('input', (e) => renderComparePickerList(e.target.value));
  if (pickerClear) pickerClear.addEventListener('click', () => { if (pickerInput) { pickerInput.value = ''; renderComparePickerList(''); pickerInput.focus(); } });
  // Кнопка смены города A — открывает обычную модалку выбора локации (тот же
  // механизм что в шапке: переключает currentLocation → refreshForecast → renderAll
  // → renderCompareView). Compare mode остаётся активным.
  if (swapA) swapA.addEventListener('click', (e) => { e.stopPropagation(); openCityModal(); });
  // Кнопка смены города B — открывает compare picker (тот же что для первого выбора).
  if (swapB) swapB.addEventListener('click', (e) => { e.stopPropagation(); openComparePicker(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pickerModal && pickerModal.classList.contains('open')) closeComparePicker();
  });
}

/* ============================================
   SETTINGS MENU — chip + modal + handlers
   ============================================ */

const settingsChip       = document.getElementById('settingsChip');
const settingsModal      = document.getElementById('settingsModal');
const settingsModalClose = document.getElementById('settingsModalClose');

function openSettingsModal()  { refreshSegmentedActive(); renderVoiceList(); settingsModal.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeSettingsModal() { settingsModal.classList.remove('open'); document.body.style.overflow = ''; }

settingsChip.addEventListener('click', openSettingsModal);
settingsModalClose.addEventListener('click', closeSettingsModal);
settingsModal.addEventListener('click', e => { if (e.target === settingsModal) closeSettingsModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && settingsModal.classList.contains('open')) closeSettingsModal();
});

/* ============================================
   SOURCE DATA MODAL — открывается кликом на индикатор источника в шапке.
   Содержит карточки "Источник прогноза" + "Точность источников".
   ============================================ */
const sourceIndicatorEl   = document.getElementById('sourceIndicator');
const sourceDataModal     = document.getElementById('sourceDataModal');
const sourceDataModalClose = document.getElementById('sourceDataModalClose');

function openSourceDataModal()  { sourceDataModal.classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeSourceDataModal() { sourceDataModal.classList.remove('open'); document.body.style.overflow = ''; }

if (sourceIndicatorEl && sourceDataModal) {
  sourceIndicatorEl.addEventListener('click', openSourceDataModal);
  sourceIndicatorEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSourceDataModal(); }
  });
  sourceDataModalClose.addEventListener('click', closeSourceDataModal);
  sourceDataModal.addEventListener('click', e => { if (e.target === sourceDataModal) closeSourceDataModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sourceDataModal.classList.contains('open')) closeSourceDataModal();
  });
}

function setActiveInGroup(groupId, val) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.seg-btn').forEach(b => b.classList.toggle('active', b.dataset.val === val));
}

// Базовые языки — 3 фиксированные кнопки. Остальные открываются через picker
// (iOS-style bottom-sheet с вертикальной прокруткой) по кнопке-chevron на EN.
const PRIMARY_LANGS = ['ru','uk','en'];

// Заголовок picker'а на текущем языке интерфейса.
function _langPickerTitle() {
  switch (state.lang) {
    case 'uk': return 'Мова інтерфейсу';
    case 'en': return 'Interface language';
    case 'de': return 'Sprache der Oberfläche';
    case 'pl': return 'Język interfejsu';
    case 'cs': return 'Jazyk rozhraní';
    case 'fr': return 'Langue de l\'interface';
    case 'it': return 'Lingua dell\'interfaccia';
    case 'es': return 'Idioma de la interfaz';
    default:   return 'Язык интерфейса';
  }
}

// Динамическая отрисовка переключателя языка: 3 сегмента (RU/UK/EN).
// На EN-кнопке — chevron ▾, который открывает picker со всеми языками.
// Если текущий язык не из PRIMARY — EN-кнопка показывает его код вместо «EN»
// (чтобы юзер сразу видел текущий выбор) и подсвечивается как active.
function renderLangSegmented() {
  const el = document.getElementById('segLang');
  if (!el) return;

  const currentInPrimary = PRIMARY_LANGS.includes(state.lang);
  // Если выбран язык из picker'а — отображаем его на третьей кнопке вместо EN.
  // Сам код 'en' на кнопке — только когда юзер реально выбрал английский.
  const thirdCode = currentInPrimary ? 'en' : 'en'; // data-val всегда 'en' для click-fallback
  const thirdDisplay = currentInPrimary ? 'en' : state.lang;
  const thirdMeta = LANG_META[thirdDisplay] || { native: 'English' };

  // Хелпер: класс seg-btn + .active для текущего state.lang. Подсвечивает
  // выбранную кнопку по той же логике, что и остальные сегменты в Settings
  // (см. setActiveInGroup) — но мы выставляем класс при генерации HTML,
  // потому что renderLangSegmented работает ПОСЛЕ refreshSegmentedActive.
  const segCls = (code) => 'seg-btn' + (code === state.lang ? ' active' : '');

  const ruBtn = (() => {
    const m = LANG_META.ru;
    return `<button class="${segCls('ru')}" type="button" data-val="ru">`
         + `<span class="seg-main">RU</span>`
         + `<span class="seg-sub">${m.native}</span>`
         + `</button>`;
  })();
  const ukBtn = (() => {
    const m = LANG_META.uk;
    return `<button class="${segCls('uk')}" type="button" data-val="uk">`
         + `<span class="seg-main">UK</span>`
         + `<span class="seg-sub">${m.native}</span>`
         + `</button>`;
  })();
  // 3-я кнопка: либо чистая EN, либо «текущий не-primary» язык. Внутри —
  // встроенный chevron ▾ который открывает picker.
  // data-val выставляем динамически: чтобы клик по основной части
  // переключал на отображаемый язык (en — если primary, иначе уже выбранный).
  // Active-class: подсвечивается когда state.lang совпадает с отображаемым
  // (т.е. либо EN выбран, либо язык из picker'а — оба случая).
  const thirdActive = state.lang === thirdDisplay ? ' active' : '';
  const thirdBtn =
    `<button class="seg-btn seg-btn-with-more${thirdActive}" type="button" data-val="${thirdDisplay}">`
    + `<span class="seg-main">${thirdDisplay.toUpperCase()}</span>`
    + `<span class="seg-sub">${thirdMeta.native}</span>`
    + `<span class="seg-chevron" role="button" tabindex="0" aria-label="${_escAttr(_langPickerTitle())}" aria-haspopup="dialog">▾</span>`
    + `</button>`;

  el.innerHTML = ruBtn + ukBtn + thirdBtn;

  // Клик на chevron открывает picker — отдельно от seg-handler'а на seg-btn.
  const chev = el.querySelector('.seg-chevron');
  if (chev) {
    const open = (e) => { e.preventDefault(); e.stopPropagation(); openLangPicker(); };
    chev.addEventListener('click', open);
    chev.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') open(e);
    });
  }
}

// Простой esc — на случай если основной helper ещё не определён (renderLangSegmented
// вызывается до init order строго не гарантирован).
function _escAttr(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// =============================================================
// Language Picker — iOS-style bottom-sheet модал.
// Создаётся при первом открытии, переиспользуется.
// =============================================================
let _langPickerEl = null;
let _langPickerWired = false;

function _ensureLangPicker() {
  if (_langPickerEl) return _langPickerEl;
  const overlay = document.createElement('div');
  overlay.className = 'lang-picker-overlay';
  overlay.id = 'langPickerOverlay';
  overlay.setAttribute('hidden', '');
  overlay.innerHTML =
    `<div class="lang-picker-sheet" role="dialog" aria-modal="true" aria-labelledby="langPickerTitle">
       <div class="lang-picker-handle"></div>
       <div class="lang-picker-header">
         <h3 id="langPickerTitle" class="lang-picker-title"></h3>
         <button class="lang-picker-close" type="button" data-i18n-aria="modal.closeAria" aria-label="Close">✕</button>
       </div>
       <div class="lang-picker-list" role="listbox"></div>
     </div>`;
  document.body.appendChild(overlay);
  _langPickerEl = overlay;

  if (!_langPickerWired) {
    _langPickerWired = true;
    // Клик по backdrop закрывает (не по самому sheet'у)
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLangPicker(); });
    overlay.querySelector('.lang-picker-close').addEventListener('click', closeLangPicker);
    overlay.querySelector('.lang-picker-list').addEventListener('click', (e) => {
      const opt = e.target.closest('.lang-picker-opt');
      if (!opt) return;
      const v = opt.dataset.val;
      if (!SUPPORTED_LANGS.includes(v)) return;
      state.lang = v;
      saveSettings();
      if (typeof syncLangToBot === 'function') syncLangToBot();
      closeLangPicker();
      applyAll();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && _langPickerEl && !_langPickerEl.hasAttribute('hidden')) {
        closeLangPicker();
      }
    });
  }
  return overlay;
}

function openLangPicker() {
  const overlay = _ensureLangPicker();
  // Перерисовываем содержимое — заголовок и подсветка active меняются вместе с языком
  overlay.querySelector('.lang-picker-title').textContent = _langPickerTitle();
  const list = overlay.querySelector('.lang-picker-list');
  list.innerHTML = SUPPORTED_LANGS.map(code => {
    const meta = LANG_META[code] || { native: code };
    const isActive = code === state.lang;
    return `<button class="lang-picker-opt${isActive ? ' active' : ''}" type="button" role="option" data-val="${code}" aria-selected="${isActive}">`
         + `<span class="flag">${meta.flag || ''}</span>`
         + `<span class="name">${meta.native}</span>`
         + `<span class="code">${code.toUpperCase()}</span>`
         + (isActive ? `<span class="check" aria-hidden="true">✓</span>` : '')
         + `</button>`;
  }).join('');
  overlay.removeAttribute('hidden');
  // Двойной requestAnimationFrame чтобы класс 'open' применился после CSS-инициализации
  requestAnimationFrame(() => requestAnimationFrame(() => {
    overlay.classList.add('open');
    // Прокручиваем к активному
    const active = list.querySelector('.lang-picker-opt.active');
    if (active) active.scrollIntoView({ block: 'nearest' });
  }));
  document.documentElement.style.overflow = 'hidden';
}

function closeLangPicker() {
  if (!_langPickerEl) return;
  _langPickerEl.classList.remove('open');
  // Дождаться transition перед hidden — анимация slide-out
  setTimeout(() => {
    if (_langPickerEl && !_langPickerEl.classList.contains('open')) {
      _langPickerEl.setAttribute('hidden', '');
    }
  }, 260);
  document.documentElement.style.overflow = '';
}
function refreshSegmentedActive() {
  setActiveInGroup('segTheme',    state.theme);
  setActiveInGroup('segLang',     state.lang);
  setActiveInGroup('segTemp',     state.units.temp);
  setActiveInGroup('segWind',     state.units.wind);
  setActiveInGroup('segPressure', state.units.pressure);
  setActiveInGroup('segVoiceRate', String(state.voice.rate));
}

function setupSegmentedHandlers() {
  const groups = [
    { id: 'segTheme',    allowed: ['dark','light','system'],   apply: v => { setTheme(v); },
      skipApplyAll: true /* setTheme сам всё делает, applyAll не нужен */ },
    { id: 'segLang',     allowed: SUPPORTED_LANGS,             apply: v => { state.lang = v; syncLangToBot(); } },
    { id: 'segTemp',     allowed: ['C','F'],                   apply: v => { state.units.temp = v; } },
    { id: 'segWind',     allowed: ['ms','kmh','mph','kn'],     apply: v => { state.units.wind = v; } },
    { id: 'segPressure', allowed: ['mmhg','hpa','inhg'],       apply: v => { state.units.pressure = v; } },
    { id: 'segVoiceRate', allowed: ['0.85','1','1.2'],         apply: v => { state.voice.rate = parseFloat(v); },
      skipApplyAll: true /* скорость голоса не требует ре-рендера всего */ }
  ];
  groups.forEach(g => {
    const el = document.getElementById(g.id);
    if (!el) return;
    el.addEventListener('click', e => {
      const btn = e.target.closest('.seg-btn');
      if (!btn) return;
      const v = btn.dataset.val;
      if (!g.allowed.includes(v)) return;
      g.apply(v);
      saveSettings();
      if (g.skipApplyAll) {
        refreshSegmentedActive();
      } else {
        applyAll();
      }
    });
  });
}

function updateChip() {
  document.getElementById('chipLang').textContent = state.lang.toUpperCase();
  document.getElementById('chipTemp').textContent = unitTemp();
  document.getElementById('chipWind').textContent = unitWind();
}

// Перерисовать ВСЁ: переводы DOM + чип + активные кнопки + локация + астро + погода + часы + дата + открытые модалки
function applyAll() {
  applyTranslations();
  updateChip();
  refreshSegmentedActive();
  // Перерисовка переключателя языка — должна быть ПОСЛЕ refreshSegmentedActive,
  // т.к. setActiveInGroup('segLang') не знает про lang-more (нет data-val)
  // и снимает у неё .active. renderLangSegmented сам выставит active корректно.
  renderLangSegmented();
  renderLocationHeader();
  renderFavoritesRow();
  renderStaticAstro();
  renderAstroPhoto();
  renderActivityWindows();
  renderClimateContext();
  renderPollen();
  renderStorm();
  renderAccuracy();
  renderSourceButtons();
  renderAll();
  updateClock();
  updateDateLine();
  if (modal.classList.contains('open')) closeModal();
  if (cityModal.classList.contains('open')) {
    const q = citySearchInput.value;
    if (!q.trim()) {
      cityListHeader.textContent = t('city.list.popular');
      renderCityList(null, { sections: getDefaultCitySections() });
    } else {
      citySearchInput.dispatchEvent(new Event('input'));
    }
  }
}

/* ============================================
   OPEN-METEO API — fetch, parse, helpers
   Шаг Б2: одна модель ECMWF, дальше расширим
   ============================================ */

// hPa → мм рт.ст.
function hPaToMmHg(hPa) { return Math.round(hPa * 0.750062); }

// Градусы → 8-румбовый код направления ветра
function degreesToCardinal(deg) {
  if (deg == null || Number.isNaN(deg)) return 'N';
  const dirs = ['N','NE','E','SE','S','SW','W','NW'];
  return dirs[Math.round(((deg % 360) / 45)) % 8];
}

// WMO weather_code → строковый ключ нашей иконки (clear / partly-cloudy / rain / etc)
function codeToCondition(code) {
  if (code == null) return 'cloudy';
  if (code === 0) return 'clear';
  if (code <= 2) return 'partly-cloudy';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'rain';        // drizzle
  if (code >= 61 && code <= 65) return 'rain';        // rain
  if (code >= 66 && code <= 67) return 'rain';        // freezing rain
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'heavy-rain';
  if (code >= 85 && code <= 86) return 'snow';
  if (code >= 95 && code <= 99) return 'thunderstorm';
  return 'cloudy';
}

// Condition «прямо сейчас» для hero-блока — берёт состояние из hourly[NOW_HOUR]
// (а не дневной агрегат today.condition, который показывает worst-case за сутки).
// Дополнительно: если weather_code указывает на осадки, но фактические pmm ~0 —
// снижаем до cloudy/partly-cloudy (Open-Meteo иногда оставляет «мокрый» код в часах
// с нулевой интенсивностью осадков — вероятность есть, реализации нет).
function hourSurfaceCondition(nowH, fallback) {
  if (!nowH) return fallback || 'cloudy';
  let c = (nowH.wc != null) ? codeToCondition(nowH.wc) : (nowH.c || fallback || 'cloudy');
  const isWet = (c === 'rain' || c === 'heavy-rain' || c === 'snow' || c === 'thunderstorm');
  if (isWet && (nowH.pmm == null || nowH.pmm < 0.1)) {
    return (nowH.cl != null && nowH.cl < 60) ? 'partly-cloudy' : 'cloudy';
  }
  return c;
}

// v1.42.1: применяет тот же downgrade ко ВСЕМ часам массива hourly[] на месте.
// Решает рассогласование «иконка дождя, но 0 мм/ч» в почасовых плитках и модалках.
// Особенно критично для AVG, где wc = max по моделям (одна предсказала дождь →
// код дождевой) а pmm = mean (большинство видят 0 → реальный pmm ~ 0).
// Применяется в parseOpenMeteoToForecast и computeAverageForecast.
function downgradeWetHourlyConditions(hourly) {
  if (!Array.isArray(hourly)) return;
  for (const h of hourly) {
    if (!h) continue;
    const isWet = (h.c === 'rain' || h.c === 'heavy-rain' || h.c === 'snow' || h.c === 'thunderstorm');
    if (isWet && (h.pmm == null || h.pmm < 0.1)) {
      h.c = (h.cl != null && h.cl < 60) ? 'partly-cloudy' : 'cloudy';
    }
  }
}

// hour-based condition → русский condLabel (для hero, чтобы текст совпал с иконкой)
function hourCondToLabelRu(cond) {
  switch (cond) {
    case 'clear':         return 'Ясно';
    case 'partly-cloudy': return 'Переменная облачность';
    case 'cloudy':        return 'Облачно';
    case 'overcast':      return 'Пасмурно';
    case 'fog':           return 'Туман';
    case 'rain':          return 'Дождь';
    case 'heavy-rain':    return 'Сильный дождь';
    case 'snow':          return 'Снег';
    case 'thunderstorm':  return 'Гроза';
    default:              return 'Облачно';
  }
}

// WMO weather_code → русский condLabel (совместим с COND_LABEL_TO_KEY локализатором)
function codeToCondLabelRu(code) {
  if (code == null) return 'Облачно';
  if (code === 0) return 'Ясно';
  if (code <= 2) return 'Переменная облачность';
  if (code === 3) return 'Облачно';
  if (code === 45 || code === 48) return 'Туман';
  if (code >= 51 && code <= 57) return 'Дождь';
  if (code >= 61 && code <= 65) return 'Дождь';
  if (code >= 66 && code <= 67) return 'Дождь';
  if (code >= 71 && code <= 77) return 'Снег';
  if (code >= 80 && code <= 82) return 'Сильный дождь';
  if (code >= 85 && code <= 86) return 'Снег';
  if (code >= 95 && code <= 99) return 'Гроза';
  return 'Облачно';
}

// WMO weather_code → i18n-ключ описания (condDesc.*).
// Учитывается сила ветра: если > 7 м/с — добавим уточнение про сильный ветер при render.
function codeToCondDescKey(code, windMs) {
  if (code == null) return 'condDesc.cloudy';
  if (code === 0) return (windMs && windMs >= 7) ? 'condDesc.clearWindy' : 'condDesc.clear';
  if (code <= 2) return 'condDesc.partlyCloudy';
  if (code === 3) return 'condDesc.cloudy';
  if (code === 45 || code === 48) return 'condDesc.fog';
  if (code >= 51 && code <= 57) return 'condDesc.rainLight';
  if (code >= 61 && code <= 65) return 'condDesc.rain';
  if (code >= 66 && code <= 67) return 'condDesc.rain';
  if (code >= 71 && code <= 77) return 'condDesc.snow';
  if (code >= 80 && code <= 82) return 'condDesc.heavyRain';
  if (code >= 85 && code <= 86) return 'condDesc.snow';
  if (code >= 95 && code <= 99) return 'condDesc.thunderstorm';
  return 'condDesc.cloudy';
}

// UV-значение → русский label (совместим с UV_LABEL_TO_KEY)
function uvLabelFromValue(uv) {
  if (uv == null || uv < 3) return 'Низкий';
  if (uv < 6) return 'Умеренный';
  if (uv < 8) return 'Высокий';
  if (uv < 11) return 'Очень высокий';
  return 'Экстремальный';
}

// AQI European → русский label
function aqiLabelFromValue(aqi) {
  if (aqi == null || aqi <= 20) return 'Хорошее';
  if (aqi <= 40) return 'Хорошее';
  if (aqi <= 60) return 'Умеренное';
  if (aqi <= 80) return 'Вредно для чувствительных';
  if (aqi <= 100) return 'Вредно';
  return 'Очень вредно';
}

// Дата → "ДД.ММ.ГГГГ"
function formatDateDDMMYYYY(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${date.getFullYear()}`;
}

// День недели короткий ("Пн", "Вт", ... — русский, для совместимости с локализаторами)
function dayShortRu(date) {
  // JS: 0=Sun, 1=Mon, ..., 6=Sat. Наш порядок: Пн, Вт, Ср, Чт, Пт, Сб, Вс
  const idx = date.getDay() === 0 ? 6 : date.getDay() - 1;
  return ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'][idx];
}
function dayFullRu(date) {
  const idx = date.getDay() === 0 ? 6 : date.getDay() - 1;
  return ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'][idx];
}

// "2026-05-14T05:13" → "05:13"
function isoTimeToHHMM(iso) {
  if (!iso || typeof iso !== 'string') return '—';
  const m = iso.match(/T(\d{2}:\d{2})/);
  return m ? m[1] : iso;
}

// Длительность дня из sunrise/sunset (ISO-строки) в минутах
function dayLengthMinutes(sunriseIso, sunsetIso) {
  try {
    const r = new Date(sunriseIso);
    const s = new Date(sunsetIso);
    return Math.max(0, Math.round((s - r) / 60000));
  } catch (e) { return 0; }
}

// Простая аппроксимация фазы луны (29.5305882 дней цикл, опорная точка - известное новолуние)
function moonPhaseInfo(date) {
  const REF = Date.UTC(2000, 0, 6, 18, 14); // известное новолуние 6 янв 2000
  const SYNODIC = 29.5305882;
  const days = (date.getTime() - REF) / 86400000;
  let phase = (days / SYNODIC) % 1;
  if (phase < 0) phase += 1;
  // фаза: 0 = новолуние, 0.5 = полнолуние
  const illum = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);
  const waxing = phase < 0.5;
  let name;
  if (phase < 0.03 || phase > 0.97) name = 'Новолуние';
  else if (phase < 0.22) name = 'Молодая луна';
  else if (phase < 0.28) name = 'Первая четверть';
  else if (phase < 0.47) name = 'Прибывающая луна';
  else if (phase < 0.53) name = 'Полнолуние';
  else if (phase < 0.72) name = 'Убывающая луна';
  else if (phase < 0.78) name = 'Последняя четверть';
  else name = 'Старая луна';
  return { illum, name, waxing };
}

// === Глобальное состояние API-загрузки ===
const API_STATE = {
  loading: false,
  lastError: null,        // { code: 'cors'|'http'|'timeout'|'parse', detail }
  lastSuccess: null,      // Date — успешного fetch
  abortController: null   // для отмены текущего запроса
};

// === Кэш прогноза (localStorage, TTL 15 минут) ===
// Ключ зависит от координат — каждый город свой кэш.
const FORECAST_CACHE_TTL_MS = 15 * 60 * 1000;
function forecastCacheKey(lat, lon) {
  // v12: day.max и day.min для AVG-источника теперь вычисляются по hourly[*].t
  // (max/min) вместо meanOf(daily.tempMax/min) — устраняет расхождение между
  // плиткой дня (9°/5°) и почасовой лентой (которая показывала 11° внутри).
  return `kw:forecast-cache:${lat.toFixed(2)}_${lon.toFixed(2)}:v16`;
}
function loadForecastCache(lat, lon) {
  try {
    const raw = localStorage.getItem(forecastCacheKey(lat, lon));
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (!obj || typeof obj.timestamp !== 'number' || !obj.byModel) return null;
    if (Date.now() - obj.timestamp > FORECAST_CACHE_TTL_MS) return null;
    // Структурная валидация: в hourly должно быть поле pmm (precipitation mm/ч, добавлено в hotfix activity-windows).
    // Если его нет — кэш создан более старой версией кода, игнорируем.
    const avg = obj.byModel.avg;
    if (avg && avg[0] && avg[0].hourly && avg[0].hourly[0] && avg[0].hourly[0].pmm === undefined) return null;
    return obj;
  } catch (e) { return null; }
}
function saveForecastCache(lat, lon, byModel) {
  try {
    localStorage.setItem(forecastCacheKey(lat, lon), JSON.stringify({ timestamp: Date.now(), byModel }));
  } catch (e) { /* localStorage переполнен / отключён — не критично */ }
}

// === Самооценка точности источников (Шаг В7) ===
// При каждом fetch сохраняем для каждой модели предсказание на завтра/+2д.
// Когда эти даты наступают (становятся forecast[0]), записываем actual из avg[0] —
// лучший доступный наблюдаемый сигнал без backend (archive-api лагает 5 дней).
// MAE считаем по накопленным парам (prediction, actual).
const ACCURACY_MAX_RECORDS = 30;

// Округление координат для ключа: 1 знак после точки ≈ 10 км.
// Раньше было 2 знака (≈1 км) — но накопление за неделю с десятка визитов
// размазывалось по разным ключам если геолокация чуть «дрожала» или юзер
// переключался между близкими городами. На 10км погода практически одинакова.
function accLatLon(lat, lon) { return [Number(lat.toFixed(1)), Number(lon.toFixed(1))]; }

function accuracyKey(lat, lon) {
  // v2: точность ключа снижена до 0.1° (≈10 км) для меньшего размазывания
  // данных при дрожании геолокации / переключении близких городов.
  const [a, b] = accLatLon(lat, lon);
  return `kw:accuracy:${a.toFixed(1)}_${b.toFixed(1)}:v2`;
}

// Мигрировать все старые v1-ключи (.toFixed(2)) и v2-кандидаты в близких координатах
// в единый ключ текущей локации. Объединяет records по дате, приоритет — записям с actual.
// Отрабатывает один раз для каждой уникальной точки `accLatLon` за сессию.
const _accuracyMigratedKeys = new Set();
function migrateAccuracyForLocation(lat, lon) {
  const [tgtLat, tgtLon] = accLatLon(lat, lon);
  const migrationKey = `${tgtLat.toFixed(1)}_${tgtLon.toFixed(1)}`;
  if (_accuracyMigratedKeys.has(migrationKey)) return;
  _accuracyMigratedKeys.add(migrationKey);
  const tgtKey = accuracyKey(lat, lon);
  const all = new Map(); // date → record
  const toRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k || !k.startsWith('kw:accuracy:')) continue;
    // Парсим координаты из ключа: kw:accuracy:LAT_LON:vN
    const m = k.match(/^kw:accuracy:(-?\d+(?:\.\d+)?)_(-?\d+(?:\.\d+)?):/);
    if (!m) continue;
    const klat = Number(m[1]);
    const klon = Number(m[2]);
    // Сливаем только ключи в радиусе 0.1° (т.е. их округление до 0.1° совпадает с целевым).
    if (Math.abs(klat - tgtLat) > 0.1 || Math.abs(klon - tgtLon) > 0.1) continue;
    try {
      const data = JSON.parse(localStorage.getItem(k));
      const records = (data && data.records) || [];
      for (const r of records) {
        const existing = all.get(r.date);
        // Приоритет — записям с actual; если оба без actual, оставляем существующую.
        if (!existing || (!existing.actual && r.actual)) {
          all.set(r.date, r);
        }
      }
    } catch (e) {}
    if (k !== tgtKey) toRemove.push(k);
  }
  if (all.size === 0) return; // нечего сливать
  const merged = Array.from(all.values()).sort((a, b) => a.date.localeCompare(b.date));
  try {
    localStorage.setItem(tgtKey, JSON.stringify({ records: merged }));
    for (const k of toRemove) localStorage.removeItem(k);
    const withActual = merged.filter(r => r.actual).length;
    console.info(`[accuracy] миграция: слито ${toRemove.length + 1} ключ(ей) → ${tgtKey}: ${merged.length} записей, ${withActual} замеров`);
  } catch (e) { /* localStorage full / отключён */ }
}

function loadAccuracyData(lat, lon) {
  // Авто-миграция при первом обращении — собираем близкие старые ключи в текущий.
  migrateAccuracyForLocation(lat, lon);
  try {
    const raw = localStorage.getItem(accuracyKey(lat, lon));
    if (!raw) return { records: [] };
    const obj = JSON.parse(raw);
    if (!obj || !Array.isArray(obj.records)) return { records: [] };
    return obj;
  } catch (e) { return { records: [] }; }
}
function saveAccuracyData(lat, lon, data) {
  try {
    localStorage.setItem(accuracyKey(lat, lon), JSON.stringify(data));
  } catch (e) { /* лимит исчерпан — не критично */ }
}
function extractDayMetrics(day) {
  if (!day || typeof day.max !== 'number') return null;
  return {
    tempMax: day.max,
    tempMin: typeof day.min === 'number' ? day.min : null,
    precip: typeof day.precip === 'number' ? day.precip : null
  };
}
function todayIso() { return new Date().toISOString().slice(0, 10); }
function dateOffsetIso(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

// Обновляет accuracy-records на основе свежего byModel.
// (a) Для записей без actual, дата = сегодня → берём actual из byModel.avg[0]
// (b) Добавляем новые предсказания на +1 и +2 дня от каждой модели (если ещё не сохранены)
function updateAccuracyData(lat, lon, byModel) {
  if (!byModel || !byModel.avg || byModel.avg.length === 0) return;
  const data = loadAccuracyData(lat, lon);
  const today = todayIso();

  // (a) Заполнить actual для сегодняшней даты
  const todayActual = extractDayMetrics(byModel.avg[0]);
  if (todayActual) {
    for (const rec of data.records) {
      if (!rec.actual && rec.date === today) rec.actual = todayActual;
    }
  }

  // (b) Новые предсказания на +1 и +2 дня
  for (let offset = 1; offset <= 2; offset++) {
    const targetDate = dateOffsetIso(offset);
    if (data.records.some(r => r.date === targetDate)) continue;
    const predictions = {};
    let hasAny = false;
    for (const srcId of Object.keys(byModel)) {
      if (srcId === 'avg') continue;
      const day = byModel[srcId][offset];
      const m = extractDayMetrics(day);
      if (m) { predictions[srcId] = m; hasAny = true; }
    }
    const avgM = extractDayMetrics(byModel.avg[offset]);
    if (avgM) { predictions.avg = avgM; hasAny = true; }
    if (hasAny) data.records.push({ date: targetDate, predictions, actual: null });
  }

  data.records.sort((a, b) => a.date.localeCompare(b.date));
  if (data.records.length > ACCURACY_MAX_RECORDS) {
    data.records = data.records.slice(-ACCURACY_MAX_RECORDS);
  }
  saveAccuracyData(lat, lon, data);
}

// MAE + signed bias по моделям →
//   { ecmwf: {tempMaxMAE, tempMinMAE, precipMAE, n, tempMaxBias, tempMinBias, precipBias}, ..., avg: {...} }
// sampleSize = число записей с заполненным actual.
// Bias = mean(predicted - actual). Положительный = модель завышает, отрицательный = занижает.
// Bias используется для пост-калибровки прогноза (v1.35.1, bias-correction).
function computeAccuracyStats(records) {
  const acc = {};
  let sampleSize = 0;
  let groundTruthSamples = 0; // v1.37: сколько записей с реальным actual из archive
  if (!Array.isArray(records)) return { stats: acc, sampleSize: 0, groundTruthSamples: 0 };

  for (const rec of records) {
    if (!rec.actual || !rec.predictions) continue;
    sampleSize++;
    if (rec.actualSource === 'archive') groundTruthSamples++;
    for (const srcId of Object.keys(rec.predictions)) {
      const pred = rec.predictions[srcId];
      if (!pred) continue;
      if (!acc[srcId]) {
        acc[srcId] = {
          tempMaxSum: 0, tempMinSum: 0, precipSum: 0,
          nTempMax: 0, nTempMin: 0, nPrecip: 0,
          tempMaxBiasSum: 0, tempMinBiasSum: 0, precipBiasSum: 0
        };
      }
      const s = acc[srcId];
      if (typeof pred.tempMax === 'number' && typeof rec.actual.tempMax === 'number') {
        const diff = pred.tempMax - rec.actual.tempMax;
        s.tempMaxSum += Math.abs(diff); s.tempMaxBiasSum += diff; s.nTempMax++;
      }
      if (typeof pred.tempMin === 'number' && typeof rec.actual.tempMin === 'number') {
        const diff = pred.tempMin - rec.actual.tempMin;
        s.tempMinSum += Math.abs(diff); s.tempMinBiasSum += diff; s.nTempMin++;
      }
      if (typeof pred.precip === 'number' && typeof rec.actual.precip === 'number') {
        const diff = pred.precip - rec.actual.precip;
        s.precipSum += Math.abs(diff); s.precipBiasSum += diff; s.nPrecip++;
      }
    }
  }

  const out = {};
  for (const srcId of Object.keys(acc)) {
    const s = acc[srcId];
    out[srcId] = {
      tempMaxMAE: s.nTempMax > 0 ? Math.round((s.tempMaxSum / s.nTempMax) * 10) / 10 : null,
      tempMinMAE: s.nTempMin > 0 ? Math.round((s.tempMinSum / s.nTempMin) * 10) / 10 : null,
      precipMAE:  s.nPrecip  > 0 ? Math.round((s.precipSum  / s.nPrecip)  * 10) / 10 : null,
      tempMaxBias: s.nTempMax > 0 ? Math.round((s.tempMaxBiasSum / s.nTempMax) * 10) / 10 : null,
      tempMinBias: s.nTempMin > 0 ? Math.round((s.tempMinBiasSum / s.nTempMin) * 10) / 10 : null,
      precipBias:  s.nPrecip  > 0 ? Math.round((s.precipBiasSum  / s.nPrecip)  * 10) / 10 : null,
      n: Math.max(s.nTempMax, s.nTempMin, s.nPrecip),
      nTempMax: s.nTempMax, nTempMin: s.nTempMin, nPrecip: s.nPrecip
    };
  }
  return { stats: out, sampleSize, groundTruthSamples };
}

// === Bias-correction (v1.35.1) ===
// Возвращает скорректированный bias с учётом shrinkage (защита от шума на
// малых выборках) и кэпа (защита от выбросов). Применяется к raw prediction
// при отображении прогноза.
//
//   n < BIAS_MIN_SAMPLES        → коррекция не применяется (0)
//   BIAS_MIN ≤ n < BIAS_FULL    → частичная: bias × (n - MIN) / (FULL - MIN)
//   n ≥ BIAS_FULL_SAMPLES       → полная коррекция
//
// Кэп: ±BIAS_CAP_TEMP °C для температуры, ±BIAS_CAP_PRECIP % для осадков.
// Это страховка — если за месяц modeling биас > 3°C, скорее всего у нас
// слишком мало замеров и доверять им рискованно.
const BIAS_MIN_SAMPLES = 5;
const BIAS_FULL_SAMPLES = 15;
const BIAS_CAP_TEMP = 3.0;
const BIAS_CAP_PRECIP = 20;

function effectiveBias(rawBias, nSamples, capValue) {
  if (rawBias == null || typeof rawBias !== 'number' || !Number.isFinite(rawBias)) return 0;
  if (nSamples < BIAS_MIN_SAMPLES) return 0;
  const shrinkage = nSamples >= BIAS_FULL_SAMPLES
    ? 1
    : (nSamples - BIAS_MIN_SAMPLES) / (BIAS_FULL_SAMPLES - BIAS_MIN_SAMPLES);
  const capped = Math.max(-capValue, Math.min(capValue, rawBias));
  return capped * shrinkage;
}

// Возвращает эффективные смещения для модели — то что реально вычтется при показе.
// `null` для каждого поля если данных недостаточно.
function getEffectiveBiasForSource(srcId) {
  const state = ACCURACY_STATE;
  if (!state || !state.stats || !state.stats[srcId]) return null;
  const s = state.stats[srcId];
  const tempMaxBias = effectiveBias(s.tempMaxBias, s.nTempMax || 0, BIAS_CAP_TEMP);
  const tempMinBias = effectiveBias(s.tempMinBias, s.nTempMin || 0, BIAS_CAP_TEMP);
  const precipBias  = effectiveBias(s.precipBias,  s.nPrecip  || 0, BIAS_CAP_PRECIP);
  if (tempMaxBias === 0 && tempMinBias === 0 && precipBias === 0) return null;
  return { tempMax: tempMaxBias, tempMin: tempMinBias, precip: precipBias };
}

// === Weighted ensemble (v1.36.0) ===
// Веса для AVG: модели с меньшей композитной MAE получают больший вес.
// Формула w_i = 1 / (composite_i + epsilon), потом нормализация к sum=1.
//
// Защиты:
// – Модели с < WEIGHT_MIN_SAMPLES замеров вообще не учитываются как «надёжные»
//   — им присваивается медиана весов других моделей (нейтральная позиция).
// – Если у >= половины моделей нет данных — fallback на uniform (как раньше).
// – Эпсилон 0.5° предотвращает деление на ноль и экстремальные веса
//   для модели с MAE=0 (это всё равно скорее везение чем закономерность).
const WEIGHT_MIN_SAMPLES = 3;
const WEIGHT_EPSILON = 0.5;

// Возвращает Map<modelId, weight> со суммой == 1.
// Если данных мало — возвращает равные веса (1/N).
function computeEnsembleWeights(modelIds) {
  const state = ACCURACY_STATE;
  const n = modelIds.length;
  if (n === 0) return new Map();
  const uniformWeight = 1 / n;
  if (!state || !state.stats) {
    return new Map(modelIds.map(id => [id, uniformWeight]));
  }

  const raw = {};
  let useful = 0;
  for (const id of modelIds) {
    const s = state.stats[id];
    if (!s || s.n == null || s.n < WEIGHT_MIN_SAMPLES) {
      raw[id] = null;
      continue;
    }
    const composite = (typeof accuracyComposite === 'function') ? accuracyComposite(s) : null;
    if (composite == null) { raw[id] = null; continue; }
    raw[id] = 1 / (composite + WEIGHT_EPSILON);
    useful++;
  }

  // Если меньше половины моделей имеет данные — не доверяем весам, идём uniform.
  if (useful < Math.max(2, Math.ceil(n / 2))) {
    return new Map(modelIds.map(id => [id, uniformWeight]));
  }

  // Модели без данных получают медиану весов «надёжных» (нейтральная позиция).
  const validW = Object.values(raw).filter(v => v != null).sort((a, b) => a - b);
  const median = validW[Math.floor(validW.length / 2)];
  for (const id of modelIds) {
    if (raw[id] == null) raw[id] = median;
  }

  // Нормализация.
  const sum = Object.values(raw).reduce((a, b) => a + b, 0);
  const result = new Map();
  for (const id of modelIds) {
    result.set(id, raw[id] / sum);
  }
  return result;
}

// Применяет bias-коррекцию к скопированному forecast'у.
// day.max / day.min / day.precip — вычитается дневной bias.
// hourly[*].t — вычитается интерполированный bias по позиции от min до max дневной температуры.
// hourly[*].p — пропорциональная коррекция probability (precipBias масштабируется к доле).
// hourly[*].pmm — НЕ трогаем (мм — это абсолютная величина другого порядка чем %).
function applyBiasCorrection(forecast, srcId) {
  const bias = getEffectiveBiasForSource(srcId);
  if (!bias) return forecast;
  for (const day of forecast) {
    const origMax = day.max;
    const origMin = day.min;
    if (typeof day.max === 'number') day.max = Math.round(day.max - bias.tempMax);
    if (typeof day.min === 'number') day.min = Math.round(day.min - bias.tempMin);
    if (typeof day.precip === 'number') {
      day.precip = Math.max(0, Math.min(100, Math.round(day.precip - bias.precip)));
    }
    // Hourly t: линейная интерполяция между tempMin-bias (низ дня) и tempMax-bias (пик).
    if (Array.isArray(day.hourly) && typeof origMax === 'number' && typeof origMin === 'number') {
      const range = origMax - origMin;
      for (const h of day.hourly) {
        if (typeof h.t !== 'number') continue;
        // Доля от min до max в исходных данных: 0 = min, 1 = max
        const ratio = range > 0 ? Math.max(0, Math.min(1, (h.t - origMin) / range)) : 0.5;
        const hourBias = bias.tempMin + (bias.tempMax - bias.tempMin) * ratio;
        h.t = Math.round(h.t - hourBias);
        if (typeof h.feels === 'number') h.feels = Math.round(h.feels - hourBias);
      }
    }
    day.biasApplied = true;
  }
  return forecast;
}

// Состояние accuracy — обновляется в refreshForecast, читается в renderAccuracy.
let ACCURACY_STATE = { stats: {}, sampleSize: 0 };

// Публичная sync-сводка accuracy с сервера (Worker @meteo-star-bot).
// Анонимный запрос — возвращает общие данные по координатам, накопленные
// ботом для всех пользователей этой точки на 0.1° сетке.
// При успешном ответе ПОЛНОСТЬЮ заменяет локальные данные серверными —
// все устройства в одной точке видят одинаковый рейтинг. Локальное
// накопление через updateAccuracyData() остаётся как fallback на
// случай недоступности бота (если ответ не пришёл — локальные не трогаем).
async function fetchAccuracyFromServer(lat, lon) {
  try {
    const r = await fetch(`${BOT_API_BASE}/api/accuracy?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`);
    if (!r.ok) return;
    const data = await r.json();
    if (!data.ok || !Array.isArray(data.records)) return;
    // Replace ВСЕГДА (даже если records пустой) — сервер авторитет.
    // Если у сервера нет данных, значит и UI должен показать «накапливаем»,
    // а не локальный остаточный счётчик прошлых сессий.
    const converted = data.records.map(convertServerRecord).filter(Boolean);
    saveAccuracyData(lat, lon, { records: converted });
    ACCURACY_STATE = computeAccuracyStats(converted);
    if (typeof renderAccuracy === 'function') renderAccuracy();
    if (typeof renderHeroAccuracyHint === 'function') renderHeroAccuracyHint();
    if (typeof renderHeroNowcastHint === 'function') renderHeroNowcastHint();
  } catch (e) {
    // тихо: бот недоступен — оставляем локальные как fallback
  }
}

// Конверсия server-формата (tempMax/tempMin/precipSum/precipProb) в локальный.
// Локальный формат: { tempMax, tempMin, precip } где precip — probability %.
function convertServerRecord(sRec) {
  if (!sRec || !sRec.date) return null;
  const convertMetrics = (m) => {
    if (!m) return null;
    return {
      tempMax: typeof m.tempMax === 'number' ? Math.round(m.tempMax * 10) / 10 : null,
      tempMin: typeof m.tempMin === 'number' ? Math.round(m.tempMin * 10) / 10 : null,
      // На сервере precipProb — probability_max (%) — совпадает с локальным precip
      precip: typeof m.precipProb === 'number' ? Math.round(m.precipProb) : null
    };
  };
  const predictions = {};
  let hasPred = false;
  if (sRec.predictions) {
    for (const k of Object.keys(sRec.predictions)) {
      const m = convertMetrics(sRec.predictions[k]);
      if (m && (m.tempMax != null || m.tempMin != null)) {
        predictions[k] = m;
        hasPred = true;
      }
    }
  }
  if (!hasPred) return null;
  const actual = convertMetrics(sRec.actual);
  // v1.37.0: сохраняем actualSource для UI-аудита («archive» = реальные
  // наблюдения из Open-Meteo Archive; иначе legacy proxy от avg).
  const out = { date: sRec.date, predictions, actual: (actual && (actual.tempMax != null || actual.tempMin != null)) ? actual : null };
  if (sRec.actualSource) out.actualSource = sRec.actualSource;
  return out;
}

// Запрос к Air Quality API (отдельный домен, тот же провайдер Open-Meteo).
// Возвращает european_aqi + pm2_5 + pm10 на 5 дней (часовые).
// Не падает при ошибке — возвращает null, чтобы основной forecast мог отрисоваться без AQI.
async function fetchAirQuality(lat, lon, signal = null) {
  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    hourly: 'european_aqi,pm2_5,pm10,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen',
    current: 'european_aqi,pm2_5,pm10,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen',
    timezone: 'auto',
    forecast_days: '7'
  });
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?${params.toString()}`;
  try {
    const resp = await fetch(url, signal ? { signal } : {});
    if (!resp.ok) return null;
    return await resp.json();
  } catch (e) {
    return null; // не критично — UI должен работать даже без AQI
  }
}

// Из ответа Air Quality берём дневное среднее для каждого вида пыльцы.
// Возвращает { alder, birch, grass, mugwort, olive, ragweed } со значениями частиц/м³ за сегодня (0..i*24+24).
function parsePollenToday(aqiData) {
  if (!aqiData || !aqiData.hourly) return null;
  const TYPES = ['alder_pollen','birch_pollen','grass_pollen','mugwort_pollen','olive_pollen','ragweed_pollen'];
  const out = {};
  TYPES.forEach(type => {
    const arr = aqiData.hourly[type];
    if (!Array.isArray(arr)) { out[type.replace('_pollen','')] = null; return; }
    const today = arr.slice(0, 24).filter(v => typeof v === 'number' && !Number.isNaN(v));
    if (today.length === 0) { out[type.replace('_pollen','')] = null; return; }
    const mean = today.reduce((a, b) => a + b, 0) / today.length;
    out[type.replace('_pollen','')] = Math.round(mean * 10) / 10;
  });
  return out;
}

// Концентрация пыльцы (частиц/м³) → уровень (для UI).
// Пороги адаптированы под реальные данные Open-Meteo CAMS, где значения часто сотых-десятых долей.
function pollenLevel(value) {
  if (value == null || value < 0.1) return 'none';
  if (value < 5)  return 'low';
  if (value < 20) return 'mid';
  if (value < 50) return 'high';
  return 'veryHigh';
}

// Из часового массива european_aqi считаем среднее за каждый из 5 дней.
// Возвращает массив [aqiDay0, aqiDay1, ...] длиной до 5.
function parseAqiByDay(aqiData) {
  if (!aqiData || !aqiData.hourly || !Array.isArray(aqiData.hourly.european_aqi)) return [];
  const arr = aqiData.hourly.european_aqi;
  const result = [];
  for (let i = 0; i < 5; i++) {
    const slice = arr.slice(i * 24, i * 24 + 24).filter(v => typeof v === 'number' && !Number.isNaN(v));
    if (slice.length === 0) { result.push(null); continue; }
    result.push(Math.round(slice.reduce((a, b) => a + b, 0) / slice.length));
  }
  return result;
}

// Один запрос — все модели сразу. Поля в ответе получают суффикс _<model>, например temperature_2m_ecmwf_ifs025.
// models = массив строк (имена моделей Open-Meteo) либо null/[] для best_match (без суффиксов).
async function fetchOpenMeteo(lat, lon, models = null) {
  if (API_STATE.abortController) {
    try { API_STATE.abortController.abort(); } catch (_) {}
  }
  API_STATE.abortController = new AbortController();
  const ctrl = API_STATE.abortController;

  const timeoutId = setTimeout(() => { try { ctrl.abort('timeout'); } catch (_) {} }, 15000);

  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    // v1.39.0: 15-минутный nowcast осадков на 2 часа вперёд (8 кадров).
    // Open-Meteo выдаёт его из gfs_seamless. Используется для precip-hint
    // на hero (когда начнётся/закончится дождь в ближайший час-два).
    minutely_15: ['precipitation', 'precipitation_probability'].join(','),
    forecast_minutely_15: '8',
    hourly: [
      'temperature_2m',
      'precipitation_probability',
      'precipitation',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
      'relative_humidity_2m',
      'surface_pressure',
      'weather_code',
      'dew_point_2m',
      'apparent_temperature',
      'cloud_cover',
      'cape',
      'lifted_index',
      'uv_index',
      'visibility',
      'shortwave_radiation'
    ].join(','),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'precipitation_sum',
      'weather_code',
      'sunrise',
      'sunset',
      'uv_index_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
      'wind_direction_10m_dominant'
    ].join(','),
    timezone: 'auto',
    wind_speed_unit: 'ms',
    forecast_days: '10'
  });
  if (Array.isArray(models) && models.length > 0) {
    params.set('models', models.join(','));
  } else if (typeof models === 'string' && models) {
    params.set('models', models);
  }

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  try {
    const resp = await fetch(url, { signal: ctrl.signal });
    if (!resp.ok) {
      const err = new Error('HTTP ' + resp.status);
      err.code = 'http';
      err.httpStatus = resp.status;
      throw err;
    }
    const data = await resp.json();
    return data;
  } catch (e) {
    if (e.name === 'AbortError') {
      const err = new Error('timeout');
      err.code = 'timeout';
      throw err;
    }
    if (e.code === 'http') throw e;
    // TypeError при fetch = почти всегда CORS / сеть
    const err = new Error(e.message || 'network');
    err.code = 'cors';
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Превращаем JSON Open-Meteo в массив до 10 дней в нашем внутреннем формате (как BASELINE).
// Bы будем хранить русские строки в полях condLabel/uvLabel/aqiLabel/moonName/windDir чтобы
// существующие локализаторы (localizeCondLabel, localizeUvLabel и т.д.) работали без изменений.
// Параметр suffix — пустая строка для best_match, или '_<model_name>' для конкретной модели.
// При отсутствующих полях у модели — fallback на best_match (поле без суффикса), затем default.
function parseOpenMeteoToForecast(data, suffix = '') {
  if (!data || !data.daily || !data.hourly) {
    const err = new Error('Invalid response shape');
    err.code = 'parse';
    throw err;
  }
  const d  = data.daily;
  const h  = data.hourly;
  // Поля могут существовать только в варианте с суффиксом или только без — пробуем оба
  const dPick = (key) => {
    if (suffix && d[key + suffix] !== undefined) return d[key + suffix];
    if (d[key] !== undefined) return d[key];
    return null;
  };
  const hPick = (key) => {
    if (suffix && h[key + suffix] !== undefined) return h[key + suffix];
    if (h[key] !== undefined) return h[key];
    return null;
  };
  const dailyTime = d.time;
  const hourlyTime = h.time;
  if (!Array.isArray(dailyTime) || !Array.isArray(hourlyTime)) {
    const err = new Error('Invalid time arrays'); err.code = 'parse'; throw err;
  }

  const tMax  = dPick('temperature_2m_max');
  const tMin  = dPick('temperature_2m_min');
  const pMax  = dPick('precipitation_probability_max');
  const pSum  = dPick('precipitation_sum');  // реальная сумма мм/сутки (раньше не запрашивалась — была аппроксимация в render'е)
  const wcDay = dPick('weather_code');
  const sunR  = dPick('sunrise');
  const sunS  = dPick('sunset');
  const uvMax = dPick('uv_index_max');
  const wMax  = dPick('wind_speed_10m_max');
  const wGust = dPick('wind_gusts_10m_max');
  const wDir  = dPick('wind_direction_10m_dominant');

  const hT   = hPick('temperature_2m');
  const hPp  = hPick('precipitation_probability');
  const hPmm = hPick('precipitation');               // фактический прогноз осадков в мм/ч (надёжнее, чем вероятность)
  const hW   = hPick('wind_speed_10m');
  const hHum = hPick('relative_humidity_2m');
  const hPr  = hPick('surface_pressure');
  const hWc  = hPick('weather_code');
  const hDp  = hPick('dew_point_2m');
  const hAp  = hPick('apparent_temperature');
  const hCl  = hPick('cloud_cover');
  const hCape = hPick('cape');           // CAPE J/kg — энергия конвекции (для В6)
  const hLi   = hPick('lifted_index');   // Lifted Index — индекс неустойчивости (для В6)
  const hUv   = hPick('uv_index');       // УФ-индекс почасово (расширенный hourly для модалки)
  const hVis  = hPick('visibility');     // Видимость в метрах (для модалки)
  const hSr   = hPick('shortwave_radiation'); // Солнечная радиация W/m² (для модалки)

  // Если у модели вообще нет температуры — отбраковываем (модель не покрывает регион)
  if (!tMax || tMax.every(v => v == null)) return null;

  const days = [];
  for (let i = 0; i < Math.min(10, dailyTime.length); i++) {
    const date = new Date(dailyTime[i] + 'T12:00:00');
    const sunriseIso = sunR ? sunR[i] : null;
    const sunsetIso  = sunS ? sunS[i] : null;
    const dayLenMin  = sunriseIso && sunsetIso ? dayLengthMinutes(sunriseIso, sunsetIso) : 0;
    const moon       = moonPhaseInfo(date);
    const wcDaily    = wcDay ? wcDay[i] : null;

    // Часовые данные: 24 часа на день. apparent_temperature кладём в feels.
    const hourly = [];
    for (let k = 0; k < 24; k++) {
      const idx = i * 24 + k;
      if (idx >= hourlyTime.length) break;
      const hourDate = new Date(hourlyTime[idx]);
      hourly.push({
        h: hourDate.getHours(),
        t: hT && hT[idx] != null ? Math.round(hT[idx]) : 0,
        p: hPp && hPp[idx] != null ? Math.round(hPp[idx]) : 0,
        pmm: hPmm && hPmm[idx] != null ? Math.round(hPmm[idx] * 10) / 10 : 0,  // мм/ч (для activity-windows и других проверок реальных осадков)
        w: hW && hW[idx] != null ? Math.round(hW[idx]) : 0,
        c: hWc && hWc[idx] != null ? codeToCondition(hWc[idx]) : 'cloudy',
        feels: hAp && hAp[idx] != null ? Math.round(hAp[idx]) : null,
        cl: hCl && hCl[idx] != null ? Math.round(hCl[idx]) : null,
        pr: hPr && hPr[idx] != null ? hPaToMmHg(hPr[idx]) : null,  // давление в мм рт.ст. для почасовых табов
        hum: hHum && hHum[idx] != null ? Math.round(hHum[idx]) : null,   // влажность % (для hourly detail modal)
        dp:  hDp  && hDp[idx]  != null ? Math.round(hDp[idx]) : null,    // точка росы °C
        uvi: hUv  && hUv[idx]  != null ? Math.round(hUv[idx] * 10) / 10 : null, // UV-индекс /11
        vis: hVis && hVis[idx] != null ? Math.round(hVis[idx] / 100) / 10 : null, // видимость в км (метры → км с 1 знаком)
        sr:  hSr  && hSr[idx]  != null ? Math.round(hSr[idx]) : null,    // солнечная радиация W/m²
        // В6 (гроза-индикатор): сырой weather_code (число), CAPE, lifted_index
        wc: hWc && hWc[idx] != null ? hWc[idx] : null,
        cape: hCape && hCape[idx] != null ? Math.round(hCape[idx]) : null,
        li: hLi && hLi[idx] != null ? Math.round(hLi[idx] * 10) / 10 : null
      });
    }
    // v1.42.1: синхронизация иконки часа с реальным pmm.
    // Open-Meteo для single-model тоже иногда оставляет «мокрый» wc при pmm=0.
    downgradeWetHourlyConditions(hourly);

    const noonIdx = i * 24 + 12;
    const noonHum  = hHum && hHum[noonIdx] != null ? Math.round(hHum[noonIdx]) : 60;
    const noonPres = hPr  && hPr[noonIdx]  != null ? hPaToMmHg(hPr[noonIdx])    : 760;
    const noonDew  = hDp  && hDp[noonIdx]  != null ? Math.round(hDp[noonIdx])   : 10;

    // Тренд давления: сравниваем полуденное значение с тем, что было 6 часов назад (или start-of-day).
    let pressureTrend = 'stable';
    if (hPr) {
      const prevIdx = Math.max(0, noonIdx - 6);
      const prev = hPr[prevIdx];
      const cur = hPr[noonIdx];
      if (typeof prev === 'number' && typeof cur === 'number') {
        const delta = (cur - prev) * 0.750062; // hPa → мм рт.ст.
        if (delta < -1) pressureTrend = 'falling';
        else if (delta > 1) pressureTrend = 'rising';
      }
    }

    // UV: не все модели его выдают (только GFS из бесплатных) — пусть будет null если данных нет,
    // тогда computeAverageForecast корректно его игнорирует, а render возьмёт значение из avg.
    const uv = uvMax && uvMax[i] != null ? Math.round(uvMax[i]) : null;
    const dayWind = wMax && wMax[i] != null ? Math.round(wMax[i]) : 0;

    days.push({
      id: i,
      name: i === 0 ? 'Сегодня' : dayShortRu(date),
      dayName: dayFullRu(date),
      date: formatDateDDMMYYYY(date),
      condition: codeToCondition(wcDaily),
      condLabel: codeToCondLabelRu(wcDaily),
      condDescKey: codeToCondDescKey(wcDaily, dayWind),
      condDesc: '',
      max: tMax[i] != null ? Math.round(tMax[i]) : 0,
      min: tMin && tMin[i] != null ? Math.round(tMin[i]) : 0,
      precip: pMax && pMax[i] != null ? Math.round(pMax[i]) : 0,
      precipSum: pSum && pSum[i] != null ? Math.round(pSum[i] * 10) / 10 : 0,  // мм/сутки реально
      wind: dayWind,
      windDir: wDir && wDir[i] != null ? degreesToCardinal(wDir[i]) : 'N',
      windGust: wGust && wGust[i] != null ? Math.round(wGust[i]) : 0,
      humidity: noonHum,
      pressure: noonPres,
      pressureTrend,
      dewPoint: noonDew,
      sunrise: isoTimeToHHMM(sunriseIso),
      sunset:  isoTimeToHHMM(sunsetIso),
      dayLen: fmtDayLen(dayLenMin),
      moonIllum: moon.illum,
      moonName: moon.name,
      moonWaxing: moon.waxing,
      uv: uv,
      uvLabel: uv != null ? uvLabelFromValue(uv) : null,
      aqi: 42,
      aqiLabel: aqiLabelFromValue(42),
      hourly
    });
  }
  return days;
}

// Парсит ответ Open-Meteo (который содержит данные по всем 8 моделям) в объект:
//   { 'ecmwf': [10 days], 'gfs': [10 days], ..., 'avg': [10 days] }
//
// АСИНХРОННАЯ через yielding: парсинг 8 моделей суммарно ~70–200мс на телефоне.
// Чтобы не блокировать main thread одним куском, между моделями делаем
// await setTimeout(0) — браузер успевает отрисовать промежуточные кадры,
// принять пользовательский ввод и т.п. Каждый чанк (одна модель) занимает
// ~10–20мс — это укладывается в 16мс-кадр без jank'а.
async function parseAllModels(data, sources) {
  const result = {};
  const validForecasts = [];
  const validIds = [];
  const yieldToBrowser = () => new Promise(resolve => setTimeout(resolve, 0));

  for (const src of sources) {
    if (!src.model) continue; // 'avg' пропускаем — вычисляем отдельно
    try {
      const forecast = parseOpenMeteoToForecast(data, '_' + src.model);
      if (forecast && forecast.length > 0) {
        result[src.id] = forecast;
        validForecasts.push(forecast);
        validIds.push(src.id);
      }
    } catch (e) {
      console.warn('Не удалось распарсить модель', src.model, e);
    }
    // Отдаём управление браузеру между моделями — UI не фризит во время парса
    await yieldToBrowser();
  }

  if (validForecasts.length > 0) {
    // v1.36.0: веса по обратной MAE. Если ACCURACY_STATE ещё пуст
    // (первая сессия) — внутри функции вернётся uniform и AVG будет как
    // прежнее простое среднее. Bias-correction (v1.35.1) применяется
    // отдельно при getForecast(), не зависит от AVG.
    const weightsMap = computeEnsembleWeights(validIds);
    const weights = validIds.map(id => weightsMap.get(id));
    result.avg = computeAverageForecast(validForecasts, weights);
  }
  // v1.39.0: 15-минутный nowcast осадков. Не привязан к моделям — у Open-Meteo
  // это глобальный набор (на основе gfs_seamless + ассимиляции). Кладём в
  // спец-ключ __minutely15__, чтобы попал в кэш вместе с остальным byModel.
  const m15 = parseMinutely15(data);
  if (m15 && m15.length > 0) result.__minutely15__ = m15;
  return result;
}

// v1.39.0: парсер minutely_15 — возвращает массив { time, mm, prob } за
// ближайшие 8 × 15 мин (= 2 часа). Возвращает [] если в ответе нет блока.
//
// v1.42.2 КРИТИЧНЫЙ ФИКС: когда forecast запрашивается с `models=A,B,C,...`,
// Open-Meteo НЕ отдаёт поле `precipitation` — только `precipitation_A`,
// `precipitation_B` и т.д. Раньше код искал голое `m.precipitation` →
// получал undefined → плашка nowcast никогда не появлялась для AVG-юзеров
// (большинство пользователей). Теперь: если найдены поля с суффиксами
// моделей — усредняем по моделям (precipitation→max, probability→mean,
// как в боте). Если есть голое поле — используем его (best_match-режим).
function parseMinutely15(data) {
  if (!data || !data.minutely_15) return [];
  const m = data.minutely_15;
  const times = m.time || [];
  if (times.length === 0) return [];

  // Детектируем формат: голые поля vs с суффиксами моделей.
  const plainPp = m.precipitation;
  const plainPpp = m.precipitation_probability;
  const usePlain = Array.isArray(plainPp);

  // Собираем именa-ключи моделей если формат с суффиксами.
  let precipFields = [], probFields = [];
  if (!usePlain) {
    for (const key of Object.keys(m)) {
      if (key === 'time') continue;
      if (key.startsWith('precipitation_probability_')) probFields.push(key);
      else if (key.startsWith('precipitation_')) precipFields.push(key);
    }
  }

  const out = [];
  for (let i = 0; i < times.length; i++) {
    const t = new Date(times[i]);
    if (Number.isNaN(t.getTime())) continue;
    let mm, prob;
    if (usePlain) {
      mm = typeof plainPp[i] === 'number' ? plainPp[i] : 0;
      prob = typeof plainPpp?.[i] === 'number' ? plainPpp[i] : 0;
    } else {
      // precipitation — MAX по моделям (консервативно: «хоть одна видит дождь»)
      // probability — MEAN по моделям (среднее ожидание)
      let maxMm = 0, anyMm = false;
      for (const f of precipFields) {
        const v = m[f]?.[i];
        if (typeof v === 'number' && Number.isFinite(v)) {
          if (v > maxMm) maxMm = v;
          anyMm = true;
        }
      }
      mm = anyMm ? maxMm : 0;
      let sumProb = 0, nProb = 0;
      for (const f of probFields) {
        const v = m[f]?.[i];
        if (typeof v === 'number' && Number.isFinite(v)) {
          sumProb += v; nProb++;
        }
      }
      prob = nProb > 0 ? sumProb / nProb : 0;
    }
    out.push({
      time: times[i],
      ts: t.getTime(),
      mm:  Math.round(mm * 100) / 100,
      prob: Math.round(prob)
    });
  }
  return out;
}

// v1.39.0: достаём minutely_15 из активного byModel (или пустой массив).
function getMinutely15() {
  const m = ACTIVE_FORECAST_BY_MODEL && ACTIVE_FORECAST_BY_MODEL.__minutely15__;
  return Array.isArray(m) ? m : [];
}

// v1.39.0: nowcast-hint — анализирует 2 часа 15-минутных прогнозов и
// возвращает строку для UI: «дождь начнётся через ~30 мин», «дождь идёт сейчас»,
// «без осадков 2ч». Null если нет данных или нет уверенности.
// Порог mm: >= 0.1 мм/15мин (≈ слабая морось — заметно глазу).
// Порог prob: >= 50% — достаточная уверенность чтобы предупреждать.
function nowcastInfo() {
  const m = getMinutely15();
  if (m.length < 2) return null;
  const now = Date.now();
  // Фильтруем кадры начиная с текущего времени (отбрасываем устаревшие из кэша).
  const future = m.filter(f => f.ts >= now - 5 * 60 * 1000); // ±5 мин толерантность
  if (future.length < 2) return null;
  const WET_MM = 0.1, WET_PROB = 50;
  const isWet = (f) => f.mm >= WET_MM || f.prob >= WET_PROB;
  const firstWet = future.findIndex(isWet);
  const firstDry = future.findIndex(f => !isWet(f));
  if (firstWet === -1) {
    // Все 8 кадров сухие — уверенно «без осадков 2 часа»
    return { kind: 'dry' };
  }
  if (firstWet === 0) {
    // Идёт прямо сейчас. Когда закончится?
    const restAfterNow = future.slice(0);
    const dryIdx = restAfterNow.findIndex(f => !isWet(f));
    if (dryIdx === -1) {
      // Дождь весь горизонт. Без конкретного «конца».
      return { kind: 'now', endsTs: null, peakMm: Math.max(...future.map(f => f.mm)) };
    }
    return { kind: 'now', endsTs: restAfterNow[dryIdx].ts, peakMm: Math.max(...future.slice(0, dryIdx).map(f => f.mm)) };
  }
  // Начнётся через firstWet × 15 мин (от первого кадра).
  // Точнее — от текущего времени до future[firstWet].ts.
  const startMin = Math.max(0, Math.round((future[firstWet].ts - now) / 60000));
  return { kind: 'soon', startMin, peakMm: future[firstWet].mm, prob: future[firstWet].prob };
}

// Среднее по N моделям — для каждого дня и каждого часа берём ВЗВЕШЕННОЕ среднее.
// weights — массив той же длины что forecasts, веса нормализованы (сумма == 1).
// Если weights не передан или содержит null'ы — используется равномерное среднее.
// Категориальные поля (направление ветра, иконка, фаза луны) берём из первой модели.
function computeAverageForecast(forecasts, weights = null) {
  if (!forecasts || forecasts.length === 0) return [];
  const numDays = Math.min(...forecasts.map(f => f.length));
  const result = [];
  const useWeights = Array.isArray(weights) && weights.length === forecasts.length
    && weights.every(w => typeof w === 'number' && Number.isFinite(w));

  // weightedMeanOf: parallel arrays — values vs ws. Игнорирует null/NaN values
  // (соответствующий вес тоже исключается, чтобы остальные нормально нормализовались).
  const wMeanOf = (arr, field, ws) => {
    let sumVW = 0, sumW = 0;
    for (let i = 0; i < arr.length; i++) {
      const v = arr[i][field];
      if (typeof v !== 'number' || Number.isNaN(v)) continue;
      const w = ws ? ws[i] : 1;
      sumVW += v * w; sumW += w;
    }
    return sumW > 0 ? sumVW / sumW : 0;
  };
  // (внутри дневного цикла используется dMeanOf, использующий dayWeights —
  // он подменяет старый бесвесовой meanOf, который раньше был тут.)

  for (let i = 0; i < numDays; i++) {
    // Парные [day, weight] чтобы фильтр пропадающих дней не сбил порядок.
    const pairs = forecasts.map((f, idx) => ({
      day: f[i],
      w: useWeights ? weights[idx] : 1
    })).filter(p => p.day);
    if (pairs.length === 0) continue;
    const days = pairs.map(p => p.day);
    const dayWeights = pairs.map(p => p.w);
    const first = days[0];
    // dMeanOf: взвешенное среднее по дням текущей итерации с учётом dayWeights.
    const dMeanOf = (field) => wMeanOf(days, field, dayWeights);

    // Усреднение часовых: тоже взвешенное. Парим [hour, weight] чтобы пропадающие
    // часы у отдельной модели не сбили весовой порядок.
    const hourly = [];
    const numHours = Math.min(...days.map(d => d.hourly.length));
    for (let k = 0; k < numHours; k++) {
      const hourPairs = days.map((d, idx) => ({
        hour: d.hourly[k],
        w: dayWeights[idx]
      })).filter(p => p.hour);
      if (hourPairs.length === 0) continue;
      const hours = hourPairs.map(p => p.hour);
      const hourWeights = hourPairs.map(p => p.w);
      // wMeanRound: взвешенное среднее по полю field, с округлением до decimals знаков.
      // Возвращает null если ни у одной модели нет значения для этого поля.
      const wMR = (field, decimals = 0) => {
        let sumVW = 0, sumW = 0;
        for (let i = 0; i < hours.length; i++) {
          const v = hours[i][field];
          if (typeof v !== 'number' || Number.isNaN(v)) continue;
          sumVW += v * hourWeights[i]; sumW += hourWeights[i];
        }
        if (sumW === 0) return null;
        const factor = Math.pow(10, decimals);
        return Math.round((sumVW / sumW) * factor) / factor;
      };
      const tVals = hours.map(o => o.t).filter(v => typeof v === 'number');
      const wcVals = hours.map(o => o.wc).filter(v => typeof v === 'number');
      // wc для AVG — максимум среди моделей (грозовой/осадочный код побеждает над спокойным).
      // c должен СООТВЕТСТВОВАТЬ wc, иначе hero (читает wc) и hourly (читает c) расходятся.
      const avgWc = wcVals.length > 0 ? Math.max(...wcVals) : null;
      hourly.push({
        h: hours[0].h,
        t: wMR('t', 0) ?? 0,
        p: wMR('p', 0) ?? 0,
        pmm: wMR('pmm', 1) ?? 0,
        pmmMax: Math.max(0, ...hours.map(o => typeof o.pmm === 'number' ? o.pmm : 0)),
        w: wMR('w', 0) ?? 0,
        c: avgWc != null ? codeToCondition(avgWc) : (hours[0].c || 'cloudy'),
        feels: wMR('feels', 0),
        cl: wMR('cl', 0),
        pr: wMR('pr', 0),
        hum: wMR('hum', 0),
        dp:  wMR('dp', 0),
        uvi: wMR('uvi', 1),
        vis: wMR('vis', 1),
        sr:  wMR('sr', 0),
        tMin: tVals.length > 0 ? Math.min(...tVals) : null,
        tMax: tVals.length > 0 ? Math.max(...tVals) : null,
        wc: avgWc,
        cape: wMR('cape', 0),
        li:   wMR('li', 1)
      });
    }
    // v1.42.1: согласование иконки часа с реальным pmm. Главный кейс — AVG,
    // где avgWc = max по моделям (одна предсказала дождь → wc дождевой),
    // а pmm = weighted mean (большинство видят 0 → pmm ~ 0). Иконка
    // показывала дождь, график 0 мм/ч — пользователь видел противоречие.
    downgradeWetHourlyConditions(hourly);

    // UV: считаем mean только из моделей, реально вернувших значение (null игнорируется в meanOf автоматически).
    const uvVals = days.map(o => o.uv).filter(v => typeof v === 'number' && !Number.isNaN(v));
    const avgUv = uvVals.length > 0 ? Math.round(uvVals.reduce((a,b) => a+b, 0) / uvVals.length) : null;
    const avgWind = Math.round(dMeanOf('wind'));
    // Тренд давления — берём наиболее частый из моделей (mode)
    const trendCounts = {};
    days.forEach(d => { if (d.pressureTrend) trendCounts[d.pressureTrend] = (trendCounts[d.pressureTrend]||0) + 1; });
    const avgTrend = Object.keys(trendCounts).sort((a,b) => trendCounts[b] - trendCounts[a])[0] || 'stable';

    // === Индекс согласия моделей (confidence) ===
    // Считаем как разброс max-температуры дня среди моделей.
    // range = 0°C → 99%, range = 5°C → 50%, дальше плоско на 30%.
    const dayMaxes = days.map(d => d.max).filter(v => typeof v === 'number');
    const dayMins  = days.map(d => d.min).filter(v => typeof v === 'number');
    const maxRange = dayMaxes.length > 1 ? Math.max(...dayMaxes) - Math.min(...dayMaxes) : 0;
    const minRange = dayMins.length > 1  ? Math.max(...dayMins)  - Math.min(...dayMins)  : 0;
    const tempRange = Math.max(maxRange, minRange);
    let confidence = Math.round(99 - (tempRange / 5) * 49);
    if (confidence > 99) confidence = 99;
    if (confidence < 30) confidence = 30;
    const modelCount = days.length;

    result.push({
      id: first.id,
      name: first.name,
      dayName: first.dayName,
      date: first.date,
      condition: first.condition,
      condLabel: first.condLabel,
      condDescKey: codeToCondDescKey(null, avgWind) === 'condDesc.cloudy' ? first.condDescKey : first.condDescKey,
      condDesc: first.condDesc,
      // max/min для AVG берём по почасовой ленте — это гарантирует
      // согласованность с тем что юзер видит в модалке часа за часом.
      // Раньше было `dMeanOf('max')` — усреднённые daily.tempMax
      // моделей, которые могли расходиться с реальным максимумом hourly
      // (например daily max=9, а в hourly за тот же день видно 11°).
      max: (function() {
        if (!hourly.length) return Math.round(dMeanOf('max'));
        const ts = hourly.map(h => h.t).filter(v => typeof v === 'number');
        return ts.length ? Math.max(...ts) : Math.round(dMeanOf('max'));
      })(),
      min: (function() {
        if (!hourly.length) return Math.round(dMeanOf('min'));
        const ts = hourly.map(h => h.t).filter(v => typeof v === 'number');
        return ts.length ? Math.min(...ts) : Math.round(dMeanOf('min'));
      })(),
      precip: Math.round(dMeanOf('precip')),
      precipSum: Math.round(dMeanOf('precipSum') * 10) / 10,
      wind: avgWind,
      windDir: first.windDir,
      windGust: Math.round(dMeanOf('windGust')),
      humidity: Math.round(dMeanOf('humidity')),
      pressure: Math.round(dMeanOf('pressure')),
      pressureTrend: avgTrend,
      dewPoint: Math.round(dMeanOf('dewPoint')),
      sunrise: first.sunrise,
      sunset: first.sunset,
      dayLen: first.dayLen,
      moonIllum: first.moonIllum,
      moonName: first.moonName,
      moonWaxing: first.moonWaxing,
      uv: avgUv,
      uvLabel: avgUv != null ? uvLabelFromValue(avgUv) : null,
      aqi: first.aqi,
      aqiLabel: first.aqiLabel,
      confidence,
      tempRange: Math.round(tempRange * 10) / 10,
      modelCount,
      hourly
    });
  }
  return result;
}

// === Error banner (показ/скрытие/локализация) ===
const apiErrorBanner = document.getElementById('apiErrorBanner');
const apiErrorTitle  = document.getElementById('apiErrorTitle');
const apiErrorMsg    = document.getElementById('apiErrorMsg');
const apiErrorRetry  = document.getElementById('apiErrorRetry');

function showApiError(errCode, detail) {
  if (!apiErrorBanner) return;
  apiErrorTitle.textContent = t('apiErr.title');
  let msg;
  if (errCode === 'cors')    msg = t('apiErr.cors');
  else if (errCode === 'timeout') msg = t('apiErr.timeout');
  else if (errCode === 'http')    msg = t('apiErr.http', { code: detail || '?' });
  else if (errCode === 'parse')   msg = t('apiErr.parse');
  else msg = t('apiErr.msg');
  apiErrorMsg.textContent = msg;
  apiErrorRetry.textContent = t('apiErr.retry');
  apiErrorBanner.style.display = '';
}
function hideApiError() { if (apiErrorBanner) apiErrorBanner.style.display = 'none'; }

// === Loader (overlay на hero) ===
const heroBlock = document.getElementById('heroBlock');
const heroLoaderText = document.getElementById('heroLoaderText');
function showLoader() {
  if (heroBlock) heroBlock.classList.add('loading');
  if (heroLoaderText) heroLoaderText.textContent = API_STATE.lastSuccess ? t('loader.refreshing') : t('loader.fetching');
}
function hideLoader() {
  if (heroBlock) heroBlock.classList.remove('loading');
}

// === Главная функция обновления прогноза ===
// force=true пропускает кэш (для кнопки «Обновить»).
async function refreshForecast(force = false) {
  if (API_STATE.loading) return;
  if (!currentLocation || typeof currentLocation.lat !== 'number' || typeof currentLocation.lon !== 'number') return;

  // Текущий час — обязательно до рендера. Раньше обновлялся только в сетевой ветке,
  // из-за чего после кэша hero показывал данные на 23:00 (захардкоженное значение).
  NOW_HOUR = new Date().getHours();

  // Попытка отдать из кэша (мгновенно, без сети)
  if (!force) {
    const cached = loadForecastCache(currentLocation.lat, currentLocation.lon);
    if (cached) {
      ACTIVE_FORECAST_BY_MODEL = cached.byModel;
      API_STATE.lastSuccess = new Date(cached.timestamp);
      // Обновляем accuracy-историю на основе кэшированных данных (идемпотентно)
      updateAccuracyData(currentLocation.lat, currentLocation.lon, cached.byModel);
      ACCURACY_STATE = computeAccuracyStats(loadAccuracyData(currentLocation.lat, currentLocation.lon).records);
      // Параллельно — публичная сводка с бота (sync между устройствами)
      fetchAccuracyFromServer(currentLocation.lat, currentLocation.lon);
    // После первого успешного fetch и обновления ACCURACY_STATE — может,
    // предложим юзеру более точный источник (одноразовый toast за сессию).
    setTimeout(() => { try { maybeAdviseBetterSource(); } catch (_) {} }, 1500);

      // Climate-данные тоже из кэша; если нет — догружаем в фоне (не блокируем UI).
      const climateCached = loadClimateCache(currentLocation.lat, currentLocation.lon);
      CLIMATE_DATA = climateCached || null;
      if (!climateCached) {
        fetchArchiveClimate(currentLocation.lat, currentLocation.lon).then(d => {
          const parsed = d ? parseArchiveClimate(d) : null;
          if (parsed) {
            saveClimateCache(currentLocation.lat, currentLocation.lon, parsed);
            CLIMATE_DATA = parsed;
            renderClimateContext();
          }
        }).catch(() => {});
      }

      // AQI / Pollen — fetch в фоне, пыльца в forecast-кэше не хранится
      fetchAirQuality(currentLocation.lat, currentLocation.lon).then(aqi => {
        POLLEN_DATA.today = aqi ? parsePollenToday(aqi) : null;
        renderPollen();
      }).catch(() => { POLLEN_DATA.today = null; renderPollen(); });

      renderStaticAstro();
      renderAstroPhoto();
      renderActivityWindows();
      renderClimateContext();
      renderPollen();
      renderStorm();
      renderAccuracy();
      renderSourceButtons();
      renderAll();
      updateClock();
      clearAppBootstrap();
      return; // кэш свежий — основной сетевой запрос не делаем
    }
  }

  API_STATE.loading = true;
  hideApiError();
  showLoader();

  // Список реальных моделей Open-Meteo, для которых будем запрашивать данные.
  const modelIds = SOURCES.filter(s => s.model).map(s => s.model);

  try {
    // Параллельно: основной прогноз + AQI + climate.
    // Используем allSettled, чтобы падение AQI или climate не валило весь рендер.
    const climateCached = loadClimateCache(currentLocation.lat, currentLocation.lon);
    const climatePromise = climateCached
      ? Promise.resolve(climateCached)
      : fetchArchiveClimate(currentLocation.lat, currentLocation.lon).then(d => {
          const parsed = d ? parseArchiveClimate(d) : null;
          if (parsed) saveClimateCache(currentLocation.lat, currentLocation.lon, parsed);
          return parsed;
        }).catch(() => null);

    const results = await Promise.allSettled([
      fetchOpenMeteo(currentLocation.lat, currentLocation.lon, modelIds),
      fetchAirQuality(currentLocation.lat, currentLocation.lon),
      climatePromise
    ]);
    // Основной прогноз обязателен — если он упал, бросаем ошибку дальше
    if (results[0].status === 'rejected') throw results[0].reason;
    const data       = results[0].value;
    const aqiData    = results[1].status === 'fulfilled' ? results[1].value : null;
    const climateData = results[2].status === 'fulfilled' ? results[2].value : null;
    CLIMATE_DATA = climateData;
    // v1.36.0: подгружаем accuracy ДО parseAllModels, чтобы computeAverageForecast
    // мог использовать накопленные веса (1/MAE) с самого первого fetch'а.
    // Если данных мало — внутри computeEnsembleWeights вернётся uniform.
    try {
      ACCURACY_STATE = computeAccuracyStats(loadAccuracyData(currentLocation.lat, currentLocation.lon).records);
    } catch (e) { /* без accuracy parseAllModels всё равно работает с uniform */ }
    const byModel = await parseAllModels(data, SOURCES);
    if (!byModel.avg || byModel.avg.length === 0) {
      const e = new Error('empty'); e.code = 'parse'; throw e;
    }

    // Пыльца на сегодня (отдельно от AQI, тот же ответ Air Quality API)
    POLLEN_DATA.today = aqiData ? parsePollenToday(aqiData) : null;

    // Подмешиваем реальный AQI в каждый день каждой модели
    const aqiByDay = parseAqiByDay(aqiData);
    if (aqiByDay.length > 0) {
      for (const sourceId of Object.keys(byModel)) {
        byModel[sourceId].forEach((day, i) => {
          if (aqiByDay[i] != null) {
            day.aqi = aqiByDay[i];
            day.aqiLabel = aqiLabelFromValue(aqiByDay[i]);
          }
        });
      }
    }

    ACTIVE_FORECAST_BY_MODEL = byModel;
    API_STATE.lastSuccess = new Date();
    API_STATE.lastError = null;
    // Кэш в localStorage — мгновенный показ при следующем открытии в течение 15 минут
    saveForecastCache(currentLocation.lat, currentLocation.lon, byModel);
    // Самооценка точности (В7) — копим историю предсказаний и фактов
    updateAccuracyData(currentLocation.lat, currentLocation.lon, byModel);
    ACCURACY_STATE = computeAccuracyStats(loadAccuracyData(currentLocation.lat, currentLocation.lon).records);
    // Параллельно — публичная сводка с бота (sync между устройствами)
    fetchAccuracyFromServer(currentLocation.lat, currentLocation.lon);
    // После первого успешного fetch и обновления ACCURACY_STATE — может,
    // предложим юзеру более точный источник (одноразовый toast за сессию).
    setTimeout(() => { try { maybeAdviseBetterSource(); } catch (_) {} }, 1500);
    renderStaticAstro();
    renderAstroPhoto();
    renderActivityWindows();
    renderClimateContext();
    renderPollen();
    renderStorm();
    renderAccuracy();
    renderSourceButtons();
    renderAll();
    updateClock();
  } catch (err) {
    if (err.code === 'timeout' && err.name === 'AbortError') return; // тихая отмена при смене города
    console.warn('Open-Meteo error:', err.code, err.message);
    API_STATE.lastError = { code: err.code || 'cors', detail: err.httpStatus };
    showApiError(API_STATE.lastError.code, API_STATE.lastError.detail);
    if (Object.keys(ACTIVE_FORECAST_BY_MODEL).length === 0 && !API_STATE.lastSuccess) {
      // Не получили ничего реального — оставляем пустой map, getForecast вернёт BASELINE
      renderStaticAstro();
      renderAstroPhoto();
      renderActivityWindows();
      renderClimateContext();
      renderPollen();
      renderStorm();
      renderAccuracy();
      renderAll();
    }
  } finally {
    API_STATE.loading = false;
    hideLoader();
    clearAppBootstrap();
  }
}

// Retry-кнопка в баннере
if (apiErrorRetry) apiErrorRetry.addEventListener('click', () => refreshForecast());

/* ============================================
   INITIAL LOCATION + FINAL INIT
   ============================================ */

function loadInitialLocation() {
  const saved = loadSavedLocation();
  currentLocation = saved ? saved : { ...DEFAULT_LOCATION };
  // Если последняя локация была определена через geolocation — перезапросить
  // координаты в фоне при каждом старте/reload. Если пользователь переехал
  // (даже на 200м+) — обновим точку, прогноз перезагрузится автоматически
  // (через setCurrentLocation). Выбранный источник погоды сохраняется —
  // он живёт в отдельном ключе `kw:source:v1`.
  if (currentLocation.source === 'geo') {
    // setTimeout — даём init завершиться (рендер, init forecasts) до запроса
    // геолокации. На iOS PWA это особенно важно — браузер не любит запрос
    // прямо в первом тике после старта.
    setTimeout(refreshGeoLocationIfMoved, 50);
  }
}

// Тихий рефреш геолокации. Если координаты ушли больше чем на ~200м (0.002°)
// от закэшированных — обновляем currentLocation. setCurrentLocation сам
// перезагрузит прогноз для новой точки.
// Минимум 1.2 сек пульсации (даже если geolocation вернула мгновенно из
// своего внутреннего кэша) + видимый toast с результатом, чтобы юзер
// точно понял что произошло.
async function refreshGeoLocationIfMoved() {
  if (!currentLocation || currentLocation.source !== 'geo') return;
  const tagEl = document.getElementById('locationTag');
  if (tagEl) tagEl.classList.add('locating');
  const startedAt = performance.now();
  let resultKind = 'same'; // 'same' | 'moved' | 'error'
  try {
    const pos = await requestGeolocation();
    const oldLat = currentLocation.lat;
    const oldLon = currentLocation.lon;
    const moved = Math.abs(pos.lat - oldLat) > 0.002 || Math.abs(pos.lon - oldLon) > 0.002;
    if (!moved) {
      resultKind = 'same';
    } else {
      resultKind = 'moved';
      const meta = await reverseGeocode(pos.lat, pos.lon);
      setCurrentLocation({
        name: meta.name,
        region: meta.region,
        lat: pos.lat,
        lon: pos.lon,
        source: 'geo'
      });
    }
  } catch (e) {
    resultKind = 'error';
    console.info('[geo-refresh] не удалось обновить координаты:', e.message);
  } finally {
    // Гарантируем минимум 1.2 сек пульсации, чтобы юзер заметил
    const elapsed = performance.now() - startedAt;
    const remaining = Math.max(0, 1200 - elapsed);
    setTimeout(() => {
      if (tagEl) tagEl.classList.remove('locating');
    }, remaining);
    showGeoToast(resultKind);
  }
}

function showGeoToast(kind) {
  let toast = document.getElementById('geoToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'geoToast';
    toast.className = 'geo-toast';
    document.body.appendChild(toast);
  }
  const texts = {
    same:  '📍 Местоположение: без изменений',
    moved: '📍 Местоположение обновлено',
    error: '📍 Не удалось определить местоположение'
  };
  const kinds = { same: 'ok', moved: 'ok', error: 'err' };
  toast.textContent = texts[kind] || texts.same;
  toast.className = `geo-toast ${kinds[kind]} show`;
  clearTimeout(toast._hide);
  toast._hide = setTimeout(() => { toast.classList.remove('show'); }, 2400);
}

/* ============================================
   SWIPE-DOWN TO CLOSE — мобильный жест для всех модалок.
   Дублирует кнопку закрытия (стрелка/крестик), чтобы на iPhone, где топ-бар может
   перекрывать кнопку безопасной зоной, всегда был резервный способ.
   Активен только на ≤640px. Срабатывает только если внутренний скролл листа сверху.
   ============================================ */
function enableSwipeToClose(sheetEl, closeFn, opts = {}) {
  if (!sheetEl || typeof closeFn !== 'function') return;
  const scroller = opts.scrollableSelector ? sheetEl.querySelector(opts.scrollableSelector) : null;
  // Можно ли начинать swipe (т.е. внутренний контент НЕ прокручен от верха)
  function canStart() {
    if (window.innerWidth > 640) return false;
    if (scroller) return scroller.scrollTop <= 0;
    // Для .modal scrollableSelector не передан — сам элемент scrollable
    return sheetEl.scrollTop <= 0;
  }
  let startY = 0, startX = 0, lastY = 0, panning = false, dragging = false, startedAt = 0;
  const THRESHOLD = 90;       // пикселей вниз для закрытия
  const VEL_THRESHOLD = 0.55; // px/ms — быстрый flick

  sheetEl.addEventListener('touchstart', (e) => {
    if (!canStart()) return;
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    startY = lastY = t.clientY;
    startX = t.clientX;
    panning = true;
    dragging = false;
    startedAt = Date.now();
  }, { passive: true });

  sheetEl.addEventListener('touchmove', (e) => {
    if (!panning) return;
    const t = e.touches[0];
    lastY = t.clientY;
    const dy = lastY - startY;
    const dx = Math.abs(t.clientX - startX);
    if (!dragging) {
      // Считаем что это вертикальный swipe-down, если палец явно ушёл вниз и Y доминирует над X
      if (dy > 12 && dy > dx * 1.3) {
        dragging = true;
        sheetEl.classList.add('swiping');
      } else if (dy < -10 || dx > 20) {
        panning = false; // не наш жест
        return;
      } else {
        return;
      }
    }
    if (dy < 0) {
      sheetEl.style.transform = '';
      sheetEl.style.opacity = '';
      return;
    }
    // Лёгкое замедление в самом начале (даёт ощущение «упругости»)
    const eased = dy < 30 ? dy * 0.8 : dy;
    sheetEl.style.transform = `translateY(${eased}px)`;
    sheetEl.style.opacity = String(Math.max(0.4, 1 - eased / 520));
  }, { passive: true });

  function reset() {
    sheetEl.classList.remove('swiping');
    sheetEl.style.transition = '';
    sheetEl.style.transform = '';
    sheetEl.style.opacity = '';
  }

  sheetEl.addEventListener('touchend', () => {
    if (!panning) return;
    const dy = lastY - startY;
    const dt = Math.max(1, Date.now() - startedAt);
    const vel = dy / dt;
    panning = false;
    if (!dragging) { reset(); return; }
    const shouldClose = dy > THRESHOLD || (dy > 36 && vel > VEL_THRESHOLD);
    if (shouldClose) {
      sheetEl.classList.remove('swiping');
      sheetEl.style.transition = 'transform 0.26s ease-out, opacity 0.26s ease-out';
      sheetEl.style.transform = `translateY(${Math.max(dy + 80, 220)}px)`;
      sheetEl.style.opacity = '0';
      setTimeout(() => { reset(); closeFn(); }, 280);
    } else {
      sheetEl.classList.remove('swiping');
      sheetEl.style.transition = 'transform 0.22s ease-out, opacity 0.22s ease-out';
      sheetEl.style.transform = '';
      sheetEl.style.opacity = '';
      setTimeout(reset, 240);
    }
  }, { passive: true });

  sheetEl.addEventListener('touchcancel', () => { panning = false; dragging = false; reset(); });
}

/* ============================================
   HERO STICKY — когда юзер скроллит, карточка «Сейчас» фиксируется
   на верху экрана и плавно сжимается в компактную полоску. Остальной
   контент (метрики, прогнозы) проезжает под ней.
   ============================================ */
function setupHeroSticky() {
  const hero = document.getElementById('heroBlock');
  if (!hero) return;

  // Узнаём фактический safe-area-inset-top (на iOS PWA это высота notch).
  let safeTop = 0;
  function measureSafeTop() {
    const probe = document.createElement('div');
    probe.style.cssText = 'position:fixed;top:env(safe-area-inset-top,0px);left:0;width:1px;height:1px;pointer-events:none;visibility:hidden';
    document.body.appendChild(probe);
    safeTop = probe.getBoundingClientRect().top || 0;
    document.body.removeChild(probe);
  }
  measureSafeTop();

  // Запоминаем оригинальный document-offset hero (до того как stuck).
  // ВАЖНО: при stuck размер hero меняется → если мы будем использовать
  // getBoundingClientRect().top то получим feedback loop (stuck → размер
  // меняется → top меняется → unstuck → размер меняется → stuck → ...).
  // Решение: считаем по scrollY от стабильного origin = offsetTop из
  // unstuck-состояния. offsetTop у position:sticky не меняется при stuck.
  let heroOrigin = 0;
  function measureOrigin() {
    // Снимаем stuck чтобы получить «настоящую» геометрию без анимации
    const wasStuck = hero.classList.contains('stuck');
    if (wasStuck) hero.classList.remove('stuck');
    heroOrigin = hero.offsetTop;
    if (wasStuck) hero.classList.add('stuck');
  }
  measureOrigin();

  // Гистерезис 60px — стик и unstuck происходят на разных порогах.
  // На ПК (трекпад/мышь с инерцией) маленькие значения дают «дрожание»
  // от того что пользователь случайно колеблется около границы, плюс
  // CSS-transition размера hero может частично проигрываться туда-обратно.
  const HYSTERESIS = 60;
  // Cooldown — пока идёт CSS-transition (~0.42s) не позволяем повторно
  // переключать stuck. Защита от агрессивного flicker'а на границе.
  const SWITCH_COOLDOWN_MS = 380;
  let lastStuck = false;
  let lastSwitchAt = 0;

  function check() {
    // В compare-mode hero скрыт — sticky не нужен
    if (document.body.classList.contains('compare-mode')) {
      if (lastStuck) {
        hero.classList.remove('stuck');
        lastStuck = false;
      }
      return;
    }
    const sy = window.scrollY || window.pageYOffset || 0;
    // Порог прилипания = оригинальная позиция hero минус safe-area top
    const threshold = heroOrigin - safeTop;
    let isStuck;
    if (lastStuck) {
      // Был залипшим — отлипаем только когда явно скроллим назад
      isStuck = sy >= threshold - HYSTERESIS;
    } else {
      isStuck = sy >= threshold;
    }
    if (isStuck !== lastStuck) {
      // Cooldown: если только что переключили — не дёргаем туда-обратно
      const now = performance.now();
      if (now - lastSwitchAt < SWITCH_COOLDOWN_MS) return;
      hero.classList.toggle('stuck', isStuck);
      lastStuck = isStuck;
      lastSwitchAt = now;
    }
  }

  // Throttle через rAF — не пересчитываем чаще одного кадра
  let rafScheduled = false;
  function onScroll() {
    if (rafScheduled) return;
    rafScheduled = true;
    requestAnimationFrame(() => { rafScheduled = false; check(); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    measureSafeTop();
    // Перемерять origin — если шапка/чипы изменили высоту
    measureOrigin();
    check();
  });
  check(); // initial
}

/* ============================================
   PULL-TO-REFRESH — свайп вниз с верха для принудительного обновления PWA
   ============================================ */
function setupPullToRefresh() {
  const ind = document.getElementById('pullRefreshIndicator');
  const text = document.getElementById('prrText');
  if (!ind || !text) return;

  const THRESHOLD = 95;          // px реального движения пальца после рубер-бэнда (≈170px физического свайпа)
  const RUBBER_RATIO = 0.55;     // палец тянет, индикатор движется с меньшей амплитудой — natural feel
  const HIDDEN_OFFSET = -110;    // %, насколько прячем над экраном

  let startY = 0;
  let dist = 0;
  let active = false;

  // Игнорируем pull когда тач происходит внутри горизонтально-скроллящихся
  // лент / модалок / списков — там свой жест ценнее.
  function isInExcluded(target) {
    return !!(target.closest && target.closest(
      '.modal-backdrop.open, .hdm-backdrop.open, ' +
      '.precip-scroll, .hours-scroll, .scroll-wrap, ' +
      '.cd-table, .cd-cells, .city-list, .favorites-row, ' +
      '.pdm-scroll, .hdm-scroll, .precip-y-axis'
    ));
  }
  function inExcludedZone(target) {
    if (!target) return false;
    // Также exclude если над любой открытой модалкой
    if (document.body.classList.contains('modal-bridge')) return true;
    if (document.querySelector('.modal-backdrop.open, .hdm-backdrop.open')) return true;
    return isInExcluded(target);
  }

  function setIndicator(translatePx, opacity) {
    ind.classList.remove('transitioning');
    ind.style.transform = `translateY(${translatePx}px)`;
    ind.style.opacity = String(opacity);
  }
  function hideIndicator() {
    ind.classList.add('transitioning');
    ind.style.transform = `translateY(${HIDDEN_OFFSET}%)`;
    ind.style.opacity = '0';
    ind.classList.remove('ready');
  }

  document.addEventListener('touchstart', (e) => {
    if (window.scrollY > 4) return;
    if (inExcludedZone(e.target)) return;
    startY = e.touches[0].clientY;
    dist = 0;
    active = true;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!active) return;
    if (window.scrollY > 4) { active = false; hideIndicator(); return; }
    const dy = e.touches[0].clientY - startY;
    if (dy <= 0) {
      hideIndicator();
      return;
    }
    dist = dy;
    const pull = Math.min(dy * RUBBER_RATIO, 140);
    setIndicator(Math.min(0, pull - 70), Math.min(pull / 60, 1));
    if (pull >= THRESHOLD) {
      ind.classList.add('ready');
      text.textContent = t('pullRefresh.ready');
    } else {
      ind.classList.remove('ready');
      text.textContent = t('pullRefresh.pull');
    }
  }, { passive: true });

  document.addEventListener('touchend', () => {
    if (!active) return;
    active = false;
    const pull = dist * RUBBER_RATIO;
    if (pull >= THRESHOLD) {
      // Trigger refresh
      ind.classList.remove('ready');
      ind.classList.add('refreshing','transitioning');
      ind.style.transform = 'translateY(0)';
      ind.style.opacity = '1';
      text.textContent = t('pullRefresh.refreshing');
      forceFullRefresh();
    } else {
      hideIndicator();
    }
  });
  document.addEventListener('touchcancel', () => {
    if (!active) return;
    active = false;
    hideIndicator();
  });
}

// Принудительное обновление PWA: убиваем кэш, обновляем SW, перезагружаем.
// На iOS PWA без этого новые версии не подхватываются даже с network-first.
async function forceFullRefresh() {
  try {
    // 1. Снести API/HTML кэш — но НЕ шрифты/иконки (быстрая повторная загрузка)
    if ('caches' in window) {
      try {
        const keys = await caches.keys();
        // Удаляем всё — на reload SW restaurнет нужное по своим стратегиям
        await Promise.all(keys.map(k => caches.delete(k)));
      } catch (_) {}
    }
    // 2. Принудительная проверка обновления SW
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) {
          await reg.update();
          if (reg.waiting) {
            // Активируем ждущий SW
            reg.waiting.postMessage('skipWaiting');
            // controllerchange listener сам сделает reload
            return;
          }
        }
      } catch (_) {}
    }
  } catch (_) {}
  // Fallback: жёсткий reload (если SW не сменился — просто перезагрузка)
  setTimeout(() => { window.location.reload(); }, 250);
}

// Auto-reload при переключении на новый SW (после skipWaiting от pull-refresh
// ИЛИ когда SW сам обновился в фоне). Без флага есть риск infinite loop.
if ('serviceWorker' in navigator) {
  let _swReloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (_swReloaded) return;
    _swReloaded = true;
    window.location.reload();
  });
}

function setupSwipeToClose() {
  // Регулярные .modal-backdrop модалки (overflow-y у самого .modal)
  const modalDay      = document.getElementById('modal');
  const cityModalEl   = document.getElementById('cityModal');
  const settingsEl    = document.getElementById('settingsModal');
  const searchEl      = document.getElementById('searchModal');
  if (modalDay)    enableSwipeToClose(modalDay.querySelector('.modal'), () => modalDay.classList.contains('open') && (typeof closeModal === 'function') && closeModal());
  if (cityModalEl) enableSwipeToClose(cityModalEl.querySelector('.modal'), () => cityModalEl.classList.contains('open') && (typeof closeCityModal === 'function') && closeCityModal());
  if (settingsEl)  enableSwipeToClose(settingsEl.querySelector('.modal'), () => settingsEl.classList.contains('open') && (typeof closeSettingsModal === 'function') && closeSettingsModal());
  if (searchEl)    enableSwipeToClose(searchEl.querySelector('.modal'), () => searchEl.classList.contains('open') && (typeof closeSearchModal === 'function') && closeSearchModal());
  const sourceDataEl = document.getElementById('sourceDataModal');
  if (sourceDataEl) enableSwipeToClose(sourceDataEl.querySelector('.modal'), () => sourceDataEl.classList.contains('open') && (typeof closeSourceDataModal === 'function') && closeSourceDataModal());

  // Полноэкранные .hdm-backdrop модалки — внутренний скролл у .hdm-scroll / .pdm-scroll
  const hdmEl  = document.getElementById('hourlyDetailModal');
  const pdmEl  = document.getElementById('precipDetailModal');
  if (hdmEl) enableSwipeToClose(hdmEl.querySelector('.hdm-sheet'),
    () => hdmEl.classList.contains('open') && (typeof closeHourlyDetail === 'function') && closeHourlyDetail(),
    { scrollableSelector: '.hdm-scroll' });
  if (pdmEl) enableSwipeToClose(pdmEl.querySelector('.hdm-sheet'),
    () => pdmEl.classList.contains('open') && (typeof closePrecipDetail === 'function') && closePrecipDetail(),
    { scrollableSelector: '.pdm-scroll' });
}

/* ============================================
   TELEGRAM NOTIFICATIONS (фаза Б3)
   Связка с ботом + редактор правил
   ============================================ */
const BOT_API_BASE = 'https://meteo-star-bot.stanislav-perec.workers.dev';
const BOT_TG_LINK = 'https://t.me/MeteoStarBot';
const NOTIF_STORAGE_KEY = 'kw:telegram:v1';            // legacy: single active account
const NOTIF_ACCOUNTS_KEY = 'kw:telegram-accounts:v1';  // массив аккаунтов
const NOTIF_ACTIVE_KEY = 'kw:telegram-active:v1';      // chatId активного аккаунта

// Текстовые поля заменены на i18n-ключи (nameKey/descKey/labelKey/unitKey).
// renderRulesUI разворачивает их через t(...). См. блок rule.* в I18N_EXTRA.
const RULE_DEFS = [
  { type: 'precip_soon',     icon: '💧', defaults: { windowHours: 3, watchRain: true, watchSnow: false, sensitivity: 'med' },
    input: { field: 'windowHours', min: 1, max: 24, unitKey: 'unit.h' },
    nameKey: 'rule.precipSoon.name',
    descKey: 'rule.precipSoon.desc',
    subChoices: [
      { field: 'watchRain', icon: '🌧', labelKey: 'rule.precipSoon.choice.rain' },
      { field: 'watchSnow', icon: '❄',  labelKey: 'rule.precipSoon.choice.snow' }
    ],
    sensitivityOptions: [
      { value: 'low',  labelKey: 'rule.precipSoon.sens.low.label',  descKey: 'rule.precipSoon.sens.low.desc' },
      { value: 'med',  labelKey: 'rule.precipSoon.sens.med.label',  descKey: 'rule.precipSoon.sens.med.desc' },
      { value: 'high', labelKey: 'rule.precipSoon.sens.high.label', descKey: 'rule.precipSoon.sens.high.desc' }
    ]
  },
  { type: 'storm_alert',     icon: '⚡', defaults: {},
    input: null,
    nameKey: 'rule.stormAlert.name',
    descKey: 'rule.stormAlert.desc' },
  { type: 'temp_below',      icon: '🥶', defaults: { threshold: 0 },
    input: { field: 'threshold', min: -40, max: 40, unit: '°C' },
    nameKey: 'rule.tempBelow.name',
    descKey: 'rule.tempBelow.desc' },
  { type: 'temp_above',      icon: '🥵', defaults: { threshold: 30 },
    input: { field: 'threshold', min: 0, max: 50, unit: '°C' },
    nameKey: 'rule.tempAbove.name',
    descKey: 'rule.tempAbove.desc' },
  { type: 'dry_streak',      icon: '☀',  defaults: { days: 3 },
    input: { field: 'days', min: 1, max: 10, unitKey: 'unit.days' },  // прогноз ограничен 10 днями
    nameKey: 'rule.dryStreak.name',
    descKey: 'rule.dryStreak.desc' },
  { type: 'morning_summary', icon: '🌅', defaults: { hour: 7, minute: 0 },
    input: { field: 'time', isTime: true },
    nameKey: 'rule.morningSummary.name',
    descKey: 'rule.morningSummary.desc',
    sections: [
      { key: 'wind',     icon: '🌬', labelKey: 'rule.section.wind' },
      { key: 'precip',   icon: '💧', labelKey: 'rule.section.precip' },
      { key: 'fog',      icon: '🌫', labelKey: 'rule.section.fog' },
      { key: 'astro',    icon: '🌅', labelKey: 'rule.section.astro' },
      { key: 'moon',     icon: '🌙', labelKey: 'rule.section.moon' },
      { key: 'storm',    icon: '⛈', labelKey: 'rule.section.storm' },
      { key: 'feels',    icon: '🌡', labelKey: 'rule.section.feels' },
      { key: 'tomorrow', icon: '📊', labelKey: 'rule.section.tomorrow' }
    ]
  }
];

// === Multi-account storage ===
// На устройстве может быть несколько связок с ботом (личный чат + N групп).
// Храним массив всех связок, плюс отдельно chatId «активной» (та что сейчас
// редактируется на сайте). При смене активной — перерисовывается весь
// notif-блок с правилами этого аккаунта.
function loadAccounts() {
  try {
    const raw = localStorage.getItem(NOTIF_ACCOUNTS_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr;
    }
  } catch (e) {}
  // Миграция со старого формата (single account)
  try {
    const legacy = localStorage.getItem(NOTIF_STORAGE_KEY);
    if (legacy) {
      const s = JSON.parse(legacy);
      if (s && s.chatId && s.pairToken) {
        const arr = [s];
        saveAccounts(arr);
        localStorage.setItem(NOTIF_ACTIVE_KEY, String(s.chatId));
        return arr;
      }
    }
  } catch (e) {}
  return [];
}
function saveAccounts(arr) {
  try { localStorage.setItem(NOTIF_ACCOUNTS_KEY, JSON.stringify(arr)); } catch (e) {}
}
function getActiveAccountId() {
  return localStorage.getItem(NOTIF_ACTIVE_KEY);
}
function setActiveAccountId(chatId) {
  if (chatId == null) localStorage.removeItem(NOTIF_ACTIVE_KEY);
  else localStorage.setItem(NOTIF_ACTIVE_KEY, String(chatId));
}
function getActiveAccount() {
  const accounts = loadAccounts();
  if (!accounts.length) return null;
  const activeId = getActiveAccountId();
  return accounts.find(a => String(a.chatId) === String(activeId)) || accounts[0];
}
function addOrUpdateAccount(acc) {
  const accounts = loadAccounts();
  const idx = accounts.findIndex(a => String(a.chatId) === String(acc.chatId));
  if (idx >= 0) accounts[idx] = { ...accounts[idx], ...acc };
  else accounts.push(acc);
  saveAccounts(accounts);
  setActiveAccountId(acc.chatId);
  // Поддерживаем legacy ключ синхронным — для других мест где он читается
  try { localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(acc)); } catch (e) {}
  return acc;
}
function removeAccount(chatId) {
  let accounts = loadAccounts();
  accounts = accounts.filter(a => String(a.chatId) !== String(chatId));
  saveAccounts(accounts);
  if (String(getActiveAccountId()) === String(chatId)) {
    if (accounts.length) setActiveAccountId(accounts[0].chatId);
    else setActiveAccountId(null);
  }
  // Sync legacy
  const active = getActiveAccount();
  if (active) {
    try { localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(active)); } catch (e) {}
  } else {
    try { localStorage.removeItem(NOTIF_STORAGE_KEY); } catch (e) {}
  }
}
function accountDisplayName(acc) {
  if (!acc) return '—';
  const isGroup = acc.chatType && acc.chatType !== 'private';
  if (isGroup) return `👥 ${acc.chatTitle || `Группа ${acc.chatId}`}`;
  return acc.firstName || (acc.username ? `@${acc.username}` : `Чат ${acc.chatId}`);
}

// Совместимость со старым кодом — возвращает активный аккаунт или null
function loadTelegramState() {
  return getActiveAccount();
}
function saveTelegramState(s) {
  addOrUpdateAccount(s);
}
function clearTelegramState() {
  const active = getActiveAccount();
  if (active) removeAccount(active.chatId);
}

// Текущее состояние формы (правил), копия для редактирования
let _notifEditing = { rules: [], dirty: false };
let _notifPollTimer = null;
let _notifTimerInterval = null;
let _notifPollCode = null;

function setupNotifSection() {
  const linkBtn   = document.getElementById('notifLinkBtn');
  const cancelBtn = document.getElementById('notifCancelBtn');
  const unlinkBtn = document.getElementById('notifUnlinkBtn');
  const saveBtn   = document.getElementById('notifSaveBtn');
  const addAccountBtn = document.getElementById('notifAddAccountBtn');
  const selectEl = document.getElementById('notifAccountSelect');
  if (!linkBtn) return;
  linkBtn.addEventListener('click', startPairing);
  cancelBtn.addEventListener('click', cancelPairing);
  unlinkBtn.addEventListener('click', unlinkTelegram);
  saveBtn.addEventListener('click', saveNotifRules);
  if (addAccountBtn) addAccountBtn.addEventListener('click', startPairing);
  if (selectEl) selectEl.addEventListener('change', () => {
    setActiveAccountId(selectEl.value);
    // Sync legacy storage с новым активным
    const acc = getActiveAccount();
    if (acc) {
      try { localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(acc)); } catch (e) {}
    }
    refreshNotifPane();
  });

  // Проверяем магическую ссылку из /login команды бота. Если в URL есть
  // ?auth=TOKEN — обмениваем у Worker'а на chatId+pairToken и логинимся
  // на этом устройстве. После — чистим URL чтобы при перезагрузке не
  // пытаться обменять уже использованный токен.
  const params = new URLSearchParams(window.location.search);
  const authToken = params.get('auth');
  if (authToken && /^[0-9a-f]{32}$/.test(authToken)) {
    claimAuthToken(authToken).finally(() => {
      // Удаляем ?auth= из URL не перезагружая страницу
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    });
  } else {
    refreshNotifPane();
  }
}

async function claimAuthToken(token) {
  try {
    const r = await fetch(`${BOT_API_BASE}/api/auth-claim`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ token })
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      console.warn('auth-claim failed:', err.error || r.status);
      refreshNotifPane();
      return;
    }
    const data = await r.json();
    if (data.ok) {
      saveTelegramState({
        chatId: data.chatId,
        pairToken: data.pairToken,
        name: data.name,
        username: data.username,
        firstName: data.firstName,
        chatType: data.chatType || 'private',
        chatTitle: data.chatTitle || null
      });
      // Открываем Settings модалку чтобы пользователь увидел что залогинен
      try {
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) settingsModal.classList.add('open');
      } catch (e) {}
    }
    refreshNotifPane();
  } catch (e) {
    console.error('claimAuthToken err:', e);
    refreshNotifPane();
  }
}

function refreshNotifPane() {
  const accounts = loadAccounts();
  const paneU = document.getElementById('notifPaneUnlinked');
  const paneC = document.getElementById('notifPaneCode');
  const paneL = document.getElementById('notifPaneLinked');
  const switcher = document.getElementById('notifAccountSwitcher');
  const selectEl = document.getElementById('notifAccountSelect');

  if (accounts.length === 0) {
    paneU.style.display = 'block';
    paneC.style.display = 'none';
    paneL.style.display = 'none';
    return;
  }

  paneU.style.display = 'none';
  paneC.style.display = 'none';
  paneL.style.display = 'block';

  // Селектор — показываем только если 2+ аккаунтов
  if (accounts.length >= 2 && switcher) {
    switcher.style.display = 'flex';
    selectEl.innerHTML = '';
    const activeId = String(getActiveAccountId() || accounts[0].chatId);
    for (const acc of accounts) {
      const opt = document.createElement('option');
      opt.value = String(acc.chatId);
      opt.textContent = `${accountDisplayName(acc)} · ${acc.name || ''}`;
      if (String(acc.chatId) === activeId) opt.selected = true;
      selectEl.appendChild(opt);
    }
  } else if (switcher) {
    switcher.style.display = 'none';
  }

  const tg = getActiveAccount();
  if (!tg) return;
  document.getElementById('notifLinkedName').textContent =
    `${accountDisplayName(tg)} · ${tg.name || ''}`;
  // Источник погоды для уведомлений: текущий currentSourceId.
  // Реальный source сохранится при следующем «Сохранить» — пока показываем
  // текущий выбранный на сайте, как ориентир для юзера.
  updateNotifSourceLabel();
  fetchAndRenderRules(tg);
}

function updateNotifSourceLabel() {
  const el = document.getElementById('notifSourceName');
  if (!el) return;
  const src = (typeof getCurrentSource === 'function') ? getCurrentSource() : null;
  if (!src) { el.textContent = t('sources.avgShort'); return; }
  if (src.id === 'avg') {
    el.textContent = t('sources.avgShort');
  } else {
    el.textContent = src.shortName || src.name;
  }
}

async function startPairing() {
  // Генерим 6-значный код
  const code = String(Math.floor(100000 + Math.random() * 900000));
  _notifPollCode = code;
  try {
    const r = await fetch(`${BOT_API_BASE}/api/pair-create`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code })
    });
    if (!r.ok) throw new Error('pair-create failed');

    document.getElementById('notifPaneUnlinked').style.display = 'none';
    document.getElementById('notifPaneCode').style.display = 'block';
    document.getElementById('notifCode').textContent = code;
    document.getElementById('notifCodeCmd').textContent = `/pair ${code}`;
    // Кнопка-копирование команды в буфер обмена
    const copyBtn = document.getElementById('notifCopyCmdBtn');
    const toast = document.getElementById('notifCopyToast');
    if (copyBtn && !copyBtn._wired) {
      copyBtn._wired = true;
      copyBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const text = document.getElementById('notifCodeCmd').textContent || '';
        let ok = false;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            ok = true;
          } else {
            // Fallback для старых браузеров / небезопасного контекста (file://)
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            ok = document.execCommand('copy');
            document.body.removeChild(ta);
          }
        } catch (_) { ok = false; }
        if (toast) {
          toast.textContent = ok ? t('toast.copied') : t('toast.copyFailed');
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 1400);
        }
      });
    }
    document.getElementById('notifOpenBot').href = BOT_TG_LINK;

    // Таймер обратного отсчёта (10 минут)
    let secondsLeft = 600;
    const tEl = document.getElementById('notifTimerValue');
    tEl.textContent = '10:00';
    if (_notifTimerInterval) clearInterval(_notifTimerInterval);
    _notifTimerInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        cancelPairing();
        return;
      }
      const m = Math.floor(secondsLeft / 60);
      const s = secondsLeft % 60;
      tEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
    }, 1000);

    // Polling: первые 30 сек агрессивно каждые 1 сек (пользователь скорее всего
    // вводит /pair прямо сейчас), потом снижаем до 3 сек до конца таймера.
    if (_notifPollTimer) clearInterval(_notifPollTimer);
    let pollCount = 0;
    const pollFn = () => {
      pollCount++;
      pollPairing(code);
      // После 30 быстрых тиков переходим на медленный режим
      if (pollCount === 30) {
        clearInterval(_notifPollTimer);
        _notifPollTimer = setInterval(() => pollPairing(code), 3000);
      }
    };
    // Первый запрос сразу — НЕ ждём первую секунду
    pollFn();
    _notifPollTimer = setInterval(pollFn, 1000);
  } catch (e) {
    console.error('pair start err:', e);
    alert(t('alert.botUnreachable'));
  }
}

function cancelPairing() {
  if (_notifPollTimer) { clearInterval(_notifPollTimer); _notifPollTimer = null; }
  if (_notifTimerInterval) { clearInterval(_notifTimerInterval); _notifTimerInterval = null; }
  _notifPollCode = null;
  refreshNotifPane();
}

async function pollPairing(code) {
  try {
    const r = await fetch(`${BOT_API_BASE}/api/pair-poll?code=${code}`);
    if (!r.ok) {
      if (r.status === 404) {
        cancelPairing();
        alert(t('alert.codeExpired'));
      }
      return;
    }
    const data = await r.json();
    if (data.status === 'linked') {
      // Готово!
      clearInterval(_notifPollTimer); _notifPollTimer = null;
      clearInterval(_notifTimerInterval); _notifTimerInterval = null;
      _notifPollCode = null;
      saveTelegramState({
        chatId: data.chatId,
        pairToken: data.pairToken,
        name: data.name,
        username: data.username,
        firstName: data.firstName,
        chatType: data.chatType || 'private',
        chatTitle: data.chatTitle || null
      });
      refreshNotifPane();
    }
  } catch (e) {
    console.error('poll err:', e);
  }
}

async function fetchAndRenderRules(tg) {
  // Сбрасываем плашку «токен устарел» (она могла быть от предыдущей попытки)
  showNotifAuthWarning(false);
  try {
    const r = await fetch(`${BOT_API_BASE}/api/rules-get`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chatId: tg.chatId, pairToken: tg.pairToken })
    });
    if (!r.ok) {
      if (r.status === 401) {
        // pairToken невалиден. НЕ удаляем локально, но показываем UI-плашку
        // с подсказкой и всё равно рендерим редактор правил (юзер увидит
        // переключатели, но сохранить не сможет, пока не переподключится).
        showNotifAuthWarning(true);
      } else {
        console.warn(`[notif] /api/rules-get HTTP ${r.status}`);
      }
      _notifEditing.rules = [];
      _notifEditing.dirty = false;
      renderRulesUI();
      return;
    }
    const data = await r.json();
    const rawRules = Array.isArray(data.rules) ? data.rules : [];
    // Миграция: старый rain_soon → новый precip_soon с watchRain=true.
    // Сохранится на сервере при следующем нажатии «Сохранить».
    _notifEditing.rules = rawRules.map(r => {
      if (r && r.type === 'rain_soon') {
        return { type: 'precip_soon', windowHours: r.windowHours, watchRain: true, watchSnow: false };
      }
      return r;
    });
    _notifEditing.dirty = false;
    renderRulesUI();
  } catch (e) {
    console.error('rules-get err:', e);
    // Сеть упала — рендерим хотя бы шаблон правил, чтоб UI не был пустым
    _notifEditing.rules = [];
    _notifEditing.dirty = false;
    renderRulesUI();
  }
}

// Показать/скрыть предупреждение что связка устарела (после /login на другом
// устройстве). Создаёт элемент в .notif-pane-linked при первом включении.
function showNotifAuthWarning(show) {
  let el = document.getElementById('notifAuthWarning');
  if (!show) { if (el) el.style.display = 'none'; return; }
  const pane = document.getElementById('notifPaneLinked');
  if (!pane) return;
  if (!el) {
    el = document.createElement('div');
    el.id = 'notifAuthWarning';
    el.className = 'notif-auth-warning';
    el.innerHTML = t('notif.authStale');
    // Вставляем в начало linked-pane (после заголовка)
    const firstChild = pane.firstElementChild;
    if (firstChild) pane.insertBefore(el, firstChild.nextSibling);
    else pane.appendChild(el);
  }
  el.style.display = '';
}

// iOS-style wheel picker. Создаёт DOM-элемент с вертикальным колесом чисел.
// Поддерживает touch, mouse drag, wheel-event, кнопки клавиатуры (↑↓).
// При завершении drag — snap к ближайшему значению, momentum-инерция.
//
// opts: {
//   min, max, step (default 1),
//   value (текущее),
//   pad (default 0 — числа со ведущим нулём, например '07' для 7),
//   onChange(newValue)
// }
// Возвращает DOM-элемент. Программный set value: el._setValue(v).
function createWheelPicker(opts) {
  const min = opts.min;
  const max = opts.max;
  const step = opts.step || 1;
  const pad = opts.pad || 0;
  let value = clampToStep(opts.value != null ? opts.value : min, min, max, step);

  const ITEM_H = 28;
  const TRACK_H = 88;
  const CENTER_OFFSET = TRACK_H / 2 - ITEM_H / 2; // y-смещение чтобы центр трека = центр выбранного item

  // Список всех допустимых значений
  const values = [];
  for (let v = min; v <= max; v += step) values.push(v);

  const root = document.createElement('div');
  root.className = 'wheel-picker';

  const track = document.createElement('div');
  track.className = 'wp-track';
  track.tabIndex = 0;
  track.setAttribute('role', 'spinbutton');
  track.setAttribute('aria-valuemin', String(min));
  track.setAttribute('aria-valuemax', String(max));
  track.setAttribute('aria-valuenow', String(value));

  const fadeTop = document.createElement('div');
  fadeTop.className = 'wp-fade top';
  const fadeBot = document.createElement('div');
  fadeBot.className = 'wp-fade bottom';

  const list = document.createElement('ul');
  list.className = 'wp-list';
  values.forEach(v => {
    const li = document.createElement('li');
    li.className = 'wp-item';
    li.dataset.val = String(v);
    li.textContent = pad ? String(v).padStart(pad, '0') : String(v);
    list.appendChild(li);
  });

  track.appendChild(fadeTop);
  track.appendChild(fadeBot);
  track.appendChild(list);
  root.appendChild(track);

  function indexOfValue(v) {
    const idx = values.indexOf(v);
    return idx >= 0 ? idx : 0;
  }

  function applyTransform(translateY, animated = true) {
    list.classList.toggle('dragging', !animated);
    list.style.transform = `translateY(${translateY}px)`;
    // Подсветка активного / соседних
    const idx = Math.round((CENTER_OFFSET - translateY) / ITEM_H);
    const items = list.children;
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('active', 'near');
      const d = Math.abs(i - idx);
      if (d === 0) items[i].classList.add('active');
      else if (d === 1) items[i].classList.add('near');
    }
  }

  function setValue(v, opts = {}) {
    const next = clampToStep(v, min, max, step);
    if (next === value && !opts.force) return;
    value = next;
    const idx = indexOfValue(value);
    const targetY = CENTER_OFFSET - idx * ITEM_H;
    applyTransform(targetY, true);
    track.setAttribute('aria-valuenow', String(value));
    if (!opts.silent && typeof opts.fireChange !== 'undefined' ? opts.fireChange : true) {
      if (typeof opts.onChange === 'function') opts.onChange(value);
      else if (typeof opts._opts?.onChange === 'function') opts._opts.onChange(value);
    }
  }

  // Инициализация — без onChange
  const initIdx = indexOfValue(value);
  list.style.transform = `translateY(${CENTER_OFFSET - initIdx * ITEM_H}px)`;
  // Подсветка после рендера
  requestAnimationFrame(() => applyTransform(CENTER_OFFSET - initIdx * ITEM_H, false));

  // === Touch / Mouse drag ===
  let dragging = false;
  let startY = 0;
  let startTranslateY = 0;
  let lastY = 0;
  let lastT = 0;
  let velocity = 0; // px/ms

  function pointerStart(clientY) {
    dragging = true;
    startY = clientY;
    lastY = clientY;
    lastT = performance.now();
    velocity = 0;
    // Текущий translateY
    const m = list.style.transform.match(/translateY\((-?[\d.]+)px\)/);
    startTranslateY = m ? parseFloat(m[1]) : CENTER_OFFSET;
    list.classList.add('dragging');
  }

  function pointerMove(clientY) {
    if (!dragging) return;
    const dy = clientY - startY;
    const ty = startTranslateY + dy;
    list.style.transform = `translateY(${ty}px)`;
    // Подсветка во время drag
    const idx = Math.round((CENTER_OFFSET - ty) / ITEM_H);
    const items = list.children;
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('active', 'near');
      const d = Math.abs(i - idx);
      if (d === 0) items[i].classList.add('active');
      else if (d === 1) items[i].classList.add('near');
    }
    // Скорость для инерции
    const now = performance.now();
    const dt = now - lastT;
    if (dt > 0) velocity = (clientY - lastY) / dt;
    lastY = clientY;
    lastT = now;
  }

  function pointerEnd() {
    if (!dragging) return;
    dragging = false;
    // Инерция: продолжаем скорость пока |velocity| > 0.05 с decay 0.95
    const m = list.style.transform.match(/translateY\((-?[\d.]+)px\)/);
    let ty = m ? parseFloat(m[1]) : CENTER_OFFSET;
    const animFrame = () => {
      if (Math.abs(velocity) < 0.05) {
        snap(ty);
        return;
      }
      ty += velocity * 16; // delta за 16ms
      velocity *= 0.92;
      list.style.transform = `translateY(${ty}px)`;
      requestAnimationFrame(animFrame);
    };
    if (Math.abs(velocity) > 0.1) {
      requestAnimationFrame(animFrame);
    } else {
      snap(ty);
    }
  }

  function snap(ty) {
    list.classList.remove('dragging');
    let idx = Math.round((CENTER_OFFSET - ty) / ITEM_H);
    idx = Math.max(0, Math.min(values.length - 1, idx));
    const newValue = values[idx];
    if (newValue !== value) {
      value = newValue;
      track.setAttribute('aria-valuenow', String(value));
      if (typeof opts.onChange === 'function') opts.onChange(value);
    }
    applyTransform(CENTER_OFFSET - idx * ITEM_H, true);
  }

  // Touch
  track.addEventListener('touchstart', e => {
    if (e.touches.length === 1) pointerStart(e.touches[0].clientY);
  }, { passive: true });
  track.addEventListener('touchmove', e => {
    if (dragging && e.touches.length === 1) {
      pointerMove(e.touches[0].clientY);
      e.preventDefault();
    }
  }, { passive: false });
  track.addEventListener('touchend', () => pointerEnd());
  track.addEventListener('touchcancel', () => pointerEnd());

  // Mouse
  track.addEventListener('mousedown', e => {
    pointerStart(e.clientY);
    e.preventDefault();
    const onMouseMove = e => pointerMove(e.clientY);
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      pointerEnd();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Wheel (колесо мыши)
  track.addEventListener('wheel', e => {
    e.preventDefault();
    const dir = e.deltaY > 0 ? 1 : -1;
    const curIdx = indexOfValue(value);
    const newIdx = Math.max(0, Math.min(values.length - 1, curIdx + dir));
    const newValue = values[newIdx];
    if (newValue !== value) {
      value = newValue;
      track.setAttribute('aria-valuenow', String(value));
      applyTransform(CENTER_OFFSET - newIdx * ITEM_H, true);
      if (typeof opts.onChange === 'function') opts.onChange(value);
    }
  }, { passive: false });

  // Keyboard (стрелки)
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const dir = e.key === 'ArrowUp' ? -1 : 1;
      const curIdx = indexOfValue(value);
      const newIdx = Math.max(0, Math.min(values.length - 1, curIdx + dir));
      const newValue = values[newIdx];
      if (newValue !== value) {
        value = newValue;
        track.setAttribute('aria-valuenow', String(value));
        applyTransform(CENTER_OFFSET - newIdx * ITEM_H, true);
        if (typeof opts.onChange === 'function') opts.onChange(value);
      }
    }
  });

  root._setValue = (v) => {
    value = clampToStep(v, min, max, step);
    const idx = indexOfValue(value);
    applyTransform(CENTER_OFFSET - idx * ITEM_H, true);
    track.setAttribute('aria-valuenow', String(value));
  };
  root._getValue = () => value;

  return root;
}

function clampToStep(v, min, max, step) {
  let x = Math.max(min, Math.min(max, v));
  const rem = (x - min) % step;
  if (rem !== 0) x = x - rem;
  return x;
}

// Глобальный реестр для закрытия предыдущего popover'а при открытии нового
let _activeWpPopover = null;
function closeWpPopover() {
  if (_activeWpPopover) {
    _activeWpPopover.trigger.classList.remove('open');
    _activeWpPopover.el.remove();
    document.removeEventListener('mousedown', _activeWpPopover.outsideHandler, true);
    document.removeEventListener('touchstart', _activeWpPopover.outsideHandler, true);
    document.removeEventListener('keydown', _activeWpPopover.keyHandler);
    _activeWpPopover = null;
  }
}

// Позиционирование popover'а под триггер (или над, если не помещается снизу).
function positionWpPopover(popover, trigger) {
  const tr = trigger.getBoundingClientRect();
  const pw = popover.offsetWidth;
  const ph = popover.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let top = tr.bottom + window.scrollY + 6;
  let left = tr.left + window.scrollX + tr.width / 2 - pw / 2;
  // Если уходим вправо — придвинуть
  if (left + pw > window.scrollX + vw - 8) left = window.scrollX + vw - pw - 8;
  if (left < window.scrollX + 8) left = window.scrollX + 8;
  // Если уходим вниз — открыть над триггером
  if (top + ph > window.scrollY + vh - 8) {
    top = tr.top + window.scrollY - ph - 6;
  }
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

// Открывает popover для одного числового поля (windowHours / threshold / days).
function openNumPopover(trigger, def, rule) {
  if (_activeWpPopover && _activeWpPopover.trigger === trigger) {
    closeWpPopover();
    return;
  }
  closeWpPopover();
  const fld = def.input.field;
  const curVal = rule[fld];
  const popover = document.createElement('div');
  popover.className = 'wp-popover';
  const body = document.createElement('div');
  body.className = 'wp-popover-body';
  const picker = createWheelPicker({
    min: def.input.min, max: def.input.max,
    value: (typeof curVal === 'number') ? curVal : def.input.min,
    onChange: (v) => {
      const r = _notifEditing.rules.find(x => x.type === def.type);
      if (!r) return;
      r[fld] = v;
      _notifEditing.dirty = true;
      // Обновить триггер
      const valEl = trigger.querySelector('.wp-tr-val');
      if (valEl) valEl.textContent = String(v);
    }
  });
  body.appendChild(picker);
  if (def.input.unit) {
    const unit = document.createElement('span');
    unit.className = 'wp-sep';
    unit.textContent = def.input.unit;
    body.appendChild(unit);
  }
  popover.appendChild(body);
  const done = document.createElement('button');
  done.type = 'button';
  done.className = 'wp-popover-done';
  done.textContent = t('common.done');
  done.addEventListener('click', closeWpPopover);
  popover.appendChild(done);
  document.body.appendChild(popover);
  positionWpPopover(popover, trigger);
  trigger.classList.add('open');

  const outsideHandler = (e) => {
    if (popover.contains(e.target) || trigger.contains(e.target)) return;
    closeWpPopover();
  };
  const keyHandler = (e) => {
    if (e.key === 'Escape') closeWpPopover();
  };
  setTimeout(() => {
    document.addEventListener('mousedown', outsideHandler, true);
    document.addEventListener('touchstart', outsideHandler, true);
    document.addEventListener('keydown', keyHandler);
  }, 0);
  _activeWpPopover = { el: popover, trigger, outsideHandler, keyHandler };
}

// Открывает popover для morning_summary — два picker'а (час + минута) рядом.
function openTimePopover(trigger, def, rule) {
  if (_activeWpPopover && _activeWpPopover.trigger === trigger) {
    closeWpPopover();
    return;
  }
  closeWpPopover();
  const popover = document.createElement('div');
  popover.className = 'wp-popover';
  const body = document.createElement('div');
  body.className = 'wp-popover-body';
  const updateTrigger = () => {
    const r = _notifEditing.rules.find(x => x.type === def.type);
    if (!r) return;
    const valEl = trigger.querySelector('.wp-tr-val');
    if (valEl) {
      const h = String(r.hour ?? 7).padStart(2, '0');
      const m = String(r.minute ?? 0).padStart(2, '0');
      valEl.textContent = `${h}:${m}`;
    }
  };
  const hourPicker = createWheelPicker({
    min: 0, max: 23, value: rule.hour ?? 7, pad: 2,
    onChange: (v) => {
      const r = _notifEditing.rules.find(x => x.type === def.type);
      if (!r) return;
      r.hour = v; _notifEditing.dirty = true;
      updateTrigger();
    }
  });
  const sep = document.createElement('span');
  sep.className = 'wp-sep';
  sep.textContent = ':';
  const minutePicker = createWheelPicker({
    min: 0, max: 55, step: 5, value: rule.minute ?? 0, pad: 2,
    onChange: (v) => {
      const r = _notifEditing.rules.find(x => x.type === def.type);
      if (!r) return;
      r.minute = v; _notifEditing.dirty = true;
      updateTrigger();
    }
  });
  body.appendChild(hourPicker);
  body.appendChild(sep);
  body.appendChild(minutePicker);
  popover.appendChild(body);
  const done = document.createElement('button');
  done.type = 'button';
  done.className = 'wp-popover-done';
  done.textContent = t('common.done');
  done.addEventListener('click', closeWpPopover);
  popover.appendChild(done);
  document.body.appendChild(popover);
  positionWpPopover(popover, trigger);
  trigger.classList.add('open');

  const outsideHandler = (e) => {
    if (popover.contains(e.target) || trigger.contains(e.target)) return;
    closeWpPopover();
  };
  const keyHandler = (e) => {
    if (e.key === 'Escape') closeWpPopover();
  };
  setTimeout(() => {
    document.addEventListener('mousedown', outsideHandler, true);
    document.addEventListener('touchstart', outsideHandler, true);
    document.addEventListener('keydown', keyHandler);
  }, 0);
  _activeWpPopover = { el: popover, trigger, outsideHandler, keyHandler };
}

function renderRulesUI() {
  const container = document.getElementById('ruleList');
  if (!container) return;
  container.innerHTML = '';
  RULE_DEFS.forEach(def => {
    const existing = _notifEditing.rules.find(r => r && r.type === def.type);
    const enabled = !!existing;
    const rule = existing ? { ...existing } : { type: def.type, ...def.defaults };

    const row = document.createElement('div');
    row.className = 'rule-row' + (enabled ? ' enabled' : '');
    row.dataset.type = def.type;

    // Триггеры: компактные пилюли с текущим значением. Клик → popover с wheel-picker'ом.
    let inputHtml = '';
    if (def.input) {
      if (def.input.isTime) {
        const h = String(rule.hour ?? 7).padStart(2, '0');
        const m = String(rule.minute ?? 0).padStart(2, '0');
        inputHtml = `<button type="button" class="wp-trigger" data-wp-time="1">
          <span class="wp-tr-val">${h}:${m}</span>
          <span class="wp-tr-arrow">▾</span>
        </button>`;
      } else {
        const val = rule[def.input.field];
        const display = (typeof val === 'number') ? val : def.input.min;
        // unitKey → локализованная единица (h/days); unit как литерал — '°C' и подобные.
        const unitText = def.input.unitKey ? t(def.input.unitKey) : (def.input.unit || '');
        inputHtml = `<button type="button" class="wp-trigger" data-wp-num="${def.input.field}">
          <span class="wp-tr-val">${display}</span>
          <span class="wp-tr-unit">${unitText}</span>
          <span class="wp-tr-arrow">▾</span>
        </button>`;
      }
    }

    // Подразделы (для precip_soon — Дождь/Снег; для morning_summary — 6 секций сводки).
    // Видимы только если правило включено (enabled === true).
    let subHtml = '';
    if (enabled && def.subChoices) {
      const chips = def.subChoices.map(c => {
        const on = rule[c.field] === true;
        return `<button type="button" class="rule-subchoice${on ? ' on' : ''}" data-field="${c.field}">
          <span class="rsc-icon">${c.icon}</span><span>${t(c.labelKey)}</span>
        </button>`;
      }).join('');
      subHtml = `<div class="rule-subopts" data-kind="choices">${chips}</div>`;
    }
    // Бар чувствительности (для precip_soon) — три кнопки в одном ряду.
    // Показываем только когда правило включено.
    if (enabled && def.sensitivityOptions) {
      const curSens = rule.sensitivity || 'med';
      const chips = def.sensitivityOptions.map(o => {
        const on = o.value === curSens;
        const lbl = t(o.labelKey);
        const desc = _escAttr(t(o.descKey));
        return `<button type="button" class="rule-sens-chip${on ? ' on' : ''}" data-sens="${o.value}" title="${desc}">
          ${lbl}
        </button>`;
      }).join('');
      const hint = `<div class="rule-subopts-hint">${t('rule.sensitivityHint')}</div>`;
      subHtml += `${hint}<div class="rule-subopts" data-kind="sensitivity">${chips}</div>`;
    }
    if (enabled && def.sections) {
      const sec = rule.sections || {};
      const chips = def.sections.map(s => {
        const on = sec[s.key] === true;
        return `<button type="button" class="rule-section-chip${on ? ' on' : ''}" data-key="${s.key}">
          <span class="rsc-icon">${s.icon}</span><span>${t(s.labelKey)}</span>
        </button>`;
      }).join('');
      const hint = `<div class="rule-subopts-hint">${t('rule.sectionsHint')}</div>`;
      subHtml = `${hint}<div class="rule-subopts" data-kind="sections">${chips}</div>`;
    }

    row.innerHTML = `
      <span class="rule-icon">${def.icon}</span>
      <div class="rule-text">
        <span class="rule-name">${t(def.nameKey)}</span>
        <span class="rule-desc">${t(def.descKey)}</span>
      </div>
      ${inputHtml}
      <button type="button" class="rule-toggle" aria-pressed="${enabled}"></button>
      ${subHtml}
    `;

    // Обработчики
    const toggle = row.querySelector('.rule-toggle');
    toggle.addEventListener('click', () => {
      const idx = _notifEditing.rules.findIndex(r => r.type === def.type);
      if (idx >= 0) {
        _notifEditing.rules.splice(idx, 1);
      } else {
        const newRule = { type: def.type, ...def.defaults };
        // Применяем текущие значения input'ов если есть
        row.querySelectorAll('.rule-input').forEach(inp => {
          const v = parseInt(inp.value, 10);
          if (Number.isFinite(v)) newRule[inp.dataset.field] = v;
        });
        _notifEditing.rules.push(newRule);
      }
      _notifEditing.dirty = true;
      renderRulesUI();
    });

    // Триггеры с popover'ом. Клик → открывается выпадающий picker, snap при
    // отпускании, апдейт триггера + правила. Закрытие — клик вне, Esc, или «Готово».
    const timeTrigger = row.querySelector('[data-wp-time]');
    if (timeTrigger && def.input?.isTime) {
      timeTrigger.addEventListener('click', e => {
        e.stopPropagation();
        openTimePopover(timeTrigger, def, rule);
      });
    }
    const numTrigger = row.querySelector('[data-wp-num]');
    if (numTrigger && def.input && !def.input.isTime) {
      numTrigger.addEventListener('click', e => {
        e.stopPropagation();
        openNumPopover(numTrigger, def, rule);
      });
    }

    // Чекбоксы Дождь/Снег для precip_soon
    row.querySelectorAll('.rule-subchoice').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const r = _notifEditing.rules.find(x => x.type === def.type);
        if (!r) return;
        const field = btn.dataset.field;
        const newVal = !(r[field] === true);
        // Запрет: оба должны не быть выключены одновременно (хотя бы один)
        if (!newVal) {
          const others = (def.subChoices || []).filter(c => c.field !== field);
          const anyOnElsewhere = others.some(c => r[c.field] === true);
          if (!anyOnElsewhere) return; // блокируем выключение последнего
        }
        r[field] = newVal;
        _notifEditing.dirty = true;
        renderRulesUI();
      });
    });

    // Чувствительность для precip_soon (3 уровня)
    row.querySelectorAll('.rule-sens-chip').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const r = _notifEditing.rules.find(x => x.type === def.type);
        if (!r) return;
        const v = btn.dataset.sens;
        if (!['low', 'med', 'high'].includes(v)) return;
        r.sensitivity = v;
        _notifEditing.dirty = true;
        renderRulesUI();
      });
    });

    // Чекбоксы секций для morning_summary
    row.querySelectorAll('.rule-section-chip').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const r = _notifEditing.rules.find(x => x.type === def.type);
        if (!r) return;
        const key = btn.dataset.key;
        const sec = r.sections || {};
        sec[key] = !(sec[key] === true);
        r.sections = sec;
        _notifEditing.dirty = true;
        renderRulesUI();
      });
    });

    container.appendChild(row);
  });
}

// Phase 3 i18n: при смене языка в Settings — синхронизируем sub.lang в боте.
// Без этого push-уведомления продолжат приходить на старом языке до следующей
// перезаписи правил. POST /api/rules-set без rules — обновит только lang.
// «Тихая» функция: не блокирует UI, ошибки только в console.warn.
async function syncLangToBot() {
  const tg = (typeof loadTelegramState === 'function') ? loadTelegramState() : null;
  if (!tg || !tg.chatId || !tg.pairToken) return;
  try {
    const r = await fetch(`${BOT_API_BASE}/api/rules-set`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chatId: tg.chatId, pairToken: tg.pairToken, lang: state.lang })
    });
    if (!r.ok) {
      console.warn(`[i18n] sync lang to bot failed: HTTP ${r.status}`);
      return;
    }
    const data = await r.json().catch(() => ({}));
    if (data && data.ok) {
      console.info(`[i18n] bot language synced → ${data.lang}`);
    }
  } catch (e) {
    console.warn('[i18n] sync lang to bot error:', e);
  }
}

async function saveNotifRules() {
  const tg = loadTelegramState();
  if (!tg) return;
  const statusEl = document.getElementById('notifSaveStatus');
  statusEl.textContent = t('notif.saving');
  statusEl.classList.remove('error');
  try {
    // Передаём текущий выбранный источник погоды — бот будет использовать его
    // при cron-проверках. Если 'avg' (по умолчанию) — AVG из 8 моделей.
    const source = (typeof currentSourceId === 'string') ? currentSourceId : 'avg';
    const r = await fetch(`${BOT_API_BASE}/api/rules-set`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chatId: tg.chatId, pairToken: tg.pairToken, rules: _notifEditing.rules, source, lang: state.lang })
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const data = await r.json();
    if (!data.ok) throw new Error('save failed');
    const srcName = (typeof getCurrentSource === 'function') ? (getCurrentSource()?.shortName || source) : source;
    statusEl.textContent = t('notif.saved', { n: data.count, src: srcName });
    _notifEditing.dirty = false;
    setTimeout(() => { statusEl.textContent = ''; }, 3000);
  } catch (e) {
    statusEl.classList.add('error');
    statusEl.textContent = t('notif.saveError', { msg: e.message });
  }
}

async function unlinkTelegram() {
  if (!confirm(t('confirm.unlinkTelegram'))) return;
  const tg = loadTelegramState();
  if (tg) {
    try {
      await fetch(`${BOT_API_BASE}/api/unpair`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ chatId: tg.chatId, pairToken: tg.pairToken })
      });
    } catch (e) {}
  }
  clearTelegramState();
  refreshNotifPane();
}

// Read settings + location from localStorage, hook up segmented controls, paint everything
loadSavedSettings();
applyTheme();
// Применяем source-цвета для текущей темы СРАЗУ (до первого рендера),
// иначе будет короткая вспышка дефолтного cyan на light-теме.
if (typeof applySourceTheme === 'function') applySourceTheme();
// Если тема = system — слушать смену OS-темы
if (state.theme === 'system') {
  setTheme('system'); // повторно, чтобы навесить слушатель matchMedia
}
loadInitialLocation();
renderLangSegmented();
setupSegmentedHandlers();
setupHourlyTabs();
setupScrollArrows();
setupHourlyDetailModal();
setupPrecipDetailModal();
setupMetricCards();
setupRainRadarControls();
setupSearchModal();
setupSpeakButton();
setupCompareMode();
setupSwipeToClose();
setupPullToRefresh();
setupHeroSticky();
setupNotifSection();
loadCompareState();
applyAll();
// Если был активен compare mode перед перезагрузкой — переактивируем
if (COMPARE_STATE.active && COMPARE_STATE.cityB) {
  activateCompare(COMPARE_STATE.cityB);
}

// PWA: регистрируем service-worker для офлайн-кэша и установки приложения на главный экран.
// Поддержка: Chrome/Edge/Firefox/Safari iOS 11.3+. Без push-уведомлений — только установка и cache-first/network-first стратегии.
if ('serviceWorker' in navigator) {
  // Откладываем до window.load чтобы не блокировать первую отрисовку
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then((reg) => {
        console.info('[PWA] Service Worker зарегистрирован, scope:', reg.scope);
        // Сразу после регистрации — проверка обновлений (не ждём 24ч default'a)
        try { reg.update(); } catch (_) {}

        // Периодическая проверка раз в час (на случай долгого открытого PWA)
        setInterval(() => {
          try { reg.update(); } catch (_) {}
        }, 60 * 60 * 1000);
      })
      .catch((err) => {
        console.warn('[PWA] Регистрация Service Worker не удалась:', err);
      });
  });

  // ВАЖНО для PWA: проверка обновлений при каждом возврате к приложению.
  // Без этого PWA на iPhone могла «жить» со старым SW неделями, потому что
  // browser HTTP cache держит service-worker.js и при обычном открытии PWA
  // SW не пересматривается. visibilitychange срабатывает каждый раз, когда
  // юзер сворачивает/возвращается к PWA — отличный триггер для check'а.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg) {
        try { reg.update(); } catch (_) {}
      }
    });
  });
}

// Refresh-кнопка в footer — принудительно обновить прогноз (пропуская кэш)
const btnRefresh = document.getElementById('btnRefresh');
if (btnRefresh) {
  btnRefresh.addEventListener('click', () => {
    btnRefresh.style.transform = 'scale(0.94)';
    setTimeout(() => { btnRefresh.style.transform = ''; }, 150);
    refreshForecast(true);
  });
}

// Первый запрос реального прогноза при загрузке
refreshForecast();
