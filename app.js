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
    'hero.sourceAvg': 'усреднения 7 моделей',
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
    'chart.sub.avg': 'Усреднено по 7 моделям',
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
    'sources.sub': 'Выбери источник или используй среднее по всем 7 моделям',
    'sources.avgTitle': 'Среднее по всем сервисам',
    'sources.avgSub': 'Агрегация 7 моделей · ансамблевый прогноз',
    'sources.avgShort': 'Среднее по 7 моделям',
    'sources.dividerOr': 'или конкретный источник',
    'sources.confHint': 'Цветная полоска под карточкой дня — согласие 7 моделей:',
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
    'chart.spreadLabel': 'Разброс между 7 моделями',
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
    'settings.title': 'Язык и единицы измерения',
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
    'hero.sourceAvg': 'усереднення 7 моделей',
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
    'chart.sub.avg': 'Усереднено по 7 моделях',
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
    'sources.sub': 'Обери джерело або використовуй середнє по 7 моделях',
    'sources.avgTitle': 'Середнє по всіх сервісах',
    'sources.avgSub': 'Агрегація 7 моделей · ансамблевий прогноз',
    'sources.confHint': 'Кольорова смужка під карткою дня — згода 7 моделей:',
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
    'sources.avgShort': 'Середнє по 7 моделях',
    'sources.dividerOr': 'або конкретне джерело',
    'confidence.label': 'Згода моделей',
    'confidence.high': 'висока',
    'confidence.mid': 'середня',
    'confidence.low': 'низька',
    'confidence.veryLow': 'погана',
    'confidence.tooltip': '{n} моделей · розкид ±{range}°C по максимальній температурі сьогодні',
    'chart.spreadLabel': 'Розкид між 7 моделями',
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
    'settings.title': 'Мова та одиниці виміру',
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
    'hero.sourceAvg': 'average of 7 models',
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
    'chart.sub.avg': 'Averaged across 7 models',
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
    'sources.sub': 'Pick a source or use the average of all 7 models',
    'sources.avgTitle': 'Average of all services',
    'sources.avgSub': 'Aggregation of 7 models · ensemble forecast',
    'sources.confHint': 'Coloured bar under the day card — agreement of 7 models:',
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
    'sources.avgShort': 'Average of 7 models',
    'sources.dividerOr': 'or a specific source',
    'confidence.label': 'Model agreement',
    'confidence.high': 'high',
    'confidence.mid': 'moderate',
    'confidence.low': 'low',
    'confidence.veryLow': 'poor',
    'confidence.tooltip': '{n} models · spread ±{range}°C on today\'s max temperature',
    'chart.spreadLabel': 'Spread across 7 models',
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
    'settings.title': 'Language and units',
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
  }
};

// App-level state (overwritten from localStorage in init below)
const state = {
  lang: 'ru',
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
  if (state.lang === 'uk' && tr) name = tr.uk;
  else if (state.lang === 'en' && tr) name = tr.en;
  if (state.lang === 'uk' && rtr) region = rtr.uk;
  else if (state.lang === 'en' && rtr) region = rtr.en;
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
      if (['ru','uk','en'].includes(s.lang)) state.lang = s.lang;
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

// 7 бесплатных глобальных моделей Open-Meteo + ансамблевое среднее
const SOURCES = [
  { id: 'avg',   name: 'Среднее по всем моделям', shortName: 'Среднее по 7 моделям', tag: 'AVG',   color: '#00d4ff', model: null },
  { id: 'ecmwf', name: 'ECMWF IFS 0.25°',          shortName: 'ECMWF',                tag: 'ECMWF', color: '#60a5fa', model: 'ecmwf_ifs025' },
  { id: 'gfs',   name: 'NOAA GFS',                 shortName: 'GFS',                  tag: 'GFS',   color: '#a78bfa', model: 'gfs_seamless' },
  { id: 'icon',  name: 'DWD ICON',                 shortName: 'ICON',                 tag: 'ICON',  color: '#5eead4', model: 'icon_seamless' },
  { id: 'gem',   name: 'CMC GEM (Канада)',         shortName: 'GEM',                  tag: 'GEM',   color: '#fb923c', model: 'gem_seamless' },
  { id: 'jma',   name: 'JMA (Япония)',             shortName: 'JMA',                  tag: 'JMA',   color: '#facc15', model: 'jma_seamless' },
  { id: 'mf',    name: 'Météo-France',             shortName: 'Météo-France',         tag: 'MF',    color: '#f472b6', model: 'meteofrance_seamless' },
  { id: 'ukmo',  name: 'UK Met Office',            shortName: 'UKMO',                 tag: 'UKMO',  color: '#4ade80', model: 'ukmo_seamless' }
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
    // (только GFS из 7 бесплатных моделей выдаёт UV — для остальных он null)
    return data.map((d, i) => {
      const out = {...d, hourly: d.hourly.map(h => ({...h}))};
      if (out.uv == null && avg && avg[i] && avg[i].uv != null) {
        out.uv = avg[i].uv;
        out.uvLabel = avg[i].uvLabel;
      }
      return out;
    });
  }
  // fallback: avg или BASELINE
  const fb = ACTIVE_FORECAST_BY_MODEL.avg || BASELINE;
  return fb.map(d => ({...d, hourly: d.hourly.map(h => ({...h}))}));
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
  avg:   '#c0532a',  // terracotta вместо cyan
  ecmwf: '#2563eb',  // deep blue
  gfs:   '#7c3aed',  // deep purple
  icon:  '#0d9488',  // teal-dark
  gem:   '#ea580c',  // orange-dark
  jma:   '#ca8a04',  // gold-dark
  mf:    '#db2777',  // pink-dark
  ukmo:  '#16a34a'   // green-dark
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

  document.getElementById('metricWind').innerHTML =
    `${fmtWind(today.wind, {withUnit:false})}<span>${unitWind()}</span>`;
  document.getElementById('metricWindSub').textContent =
    t('metric.windSub', { dir: localizeWindDirFull(today.windDir), gust: fmtWind(today.windGust) });

  document.getElementById('metricRain').innerHTML = `${today.precip}<span>%</span>`;
  const mm = Math.max(0, Math.round(today.precip * 0.07 * 10) / 10);
  document.getElementById('metricRainSub').textContent =
    t('metric.rainSub', { mm: mm, desc: t(precipDescKey(today.precip)) });

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
  // Меньше 3 моделей с данными — рейтинг шаткий, не показываем
  if (rows.length < 3) { el.innerHTML = ''; return; }
  rows.sort((a, b) => a.score - b.score);
  const top = rows[0];
  const topName = top.src.shortName || top.src.name;

  const avgS = accState.stats.avg;
  const avgScore = avgS ? accuracyComposite(avgS) : null;
  const cur = (typeof currentSourceId === 'string') ? currentSourceId : 'avg';

  let txt = '';
  let cls = 'hap-leader';   // обычный (вы не лидер)
  if (cur === 'avg') {
    if (avgScore != null && avgScore <= top.score + 0.05) {
      txt = `📊 Среднее — самый точный`;
      cls = 'hap-best';
    } else {
      txt = `🏆 ${topName} точнее AVG`;
    }
  } else {
    const curRow = rows.find(r => r.src.id === cur);
    if (curRow) {
      const rank = rows.indexOf(curRow) + 1;
      if (rank === 1) {
        txt = `🏆 Лидер по точности`;
        cls = 'hap-best';
      } else {
        txt = `🏆 ${topName} точнее (вы #${rank} из ${rows.length})`;
      }
    } else {
      txt = `🏆 Точнее всех: ${topName}`;
    }
  }

  el.innerHTML = `<button type="button" class="hero-acc-pill ${cls}" aria-label="Открыть рейтинг точности">${txt}</button>`;
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

  // Если пользователь раньше не скроллил (savedScroll === 0) — центрируем текущий час
  // в видимой области. Иначе восстанавливаем его позицию, чтобы переключение таба
  // не сбрасывало вид. rAF — гарантирует что layout стабилизировался (clientWidth != 0).
  if (savedScroll > 0) {
    row.scrollLeft = savedScroll;
  } else {
    const centerNow = () => {
      const nowCell = row.querySelector('.hour-cell.now');
      if (!nowCell) return;
      const target = nowCell.offsetLeft - (row.clientWidth / 2) + (nowCell.offsetWidth / 2);
      row.scrollLeft = Math.max(0, target);
    };
    requestAnimationFrame(centerNow);
  }
}

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
    { id:'pmm',        emoji:'🌧', nameKey:'precip.title',      unit:'мм',                        color:blueColor,   get:h=>typeof h.pmm==='number'?h.pmm:0,                               fmt:v=>`${Math.round(v*10)/10}` },
    { id:'wind',       emoji:'💨', nameKey:'metric.wind',       unit:unitWind(),                  color:grayColor,   get:h=>convertWind(h.w, state.units.wind),                            fmt:v=>`${Math.round(v)}` },
    { id:'pressure',   emoji:'⊙',  nameKey:'metric.pressure',   unit:shortMetricUnit('pressure'), color:purpleColor, get:h=>h.pr!=null?convertPressure(h.pr, state.units.pressure):null,   fmt:v=>v!=null?`${Math.round(v)}`:'—' },
    { id:'humidity',   emoji:'💦', nameKey:'metric.humidity',   unit:'%',                         color:cyanColor,   get:h=>typeof h.hum==='number'?h.hum:null,                            fmt:v=>v!=null?`${Math.round(v)}`:'—' },
    { id:'dewpoint',   emoji:'🌫', nameKey:'metric.dewpoint',   unit:unitTemp(),                  color:violetColor, get:h=>h.dp!=null?convertTemp(h.dp, state.units.temp):null,           fmt:v=>v!=null?`${Math.round(v)}°`:'—' },
    { id:'uv',         emoji:'☀',  nameKey:'metric.uv',         unit:'/11',                       color:yellowColor, get:h=>typeof h.uvi==='number'?h.uvi:null,                            fmt:v=>v!=null?`${Math.round(v)}`:'—' },
    { id:'visibility', emoji:'👁', nameKey:'metric.visibility', unit:'км',                        color:whiteColor,  get:h=>typeof h.vis==='number'?h.vis:null,                            fmt:v=>v!=null?`${Math.round(v)}`:'—' },
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
const FORECAST_CACHE_CURRENT = 9;
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
          <div class="l">Луна · ${d.moonIllum}%</div>
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
      <div class="hours-scroll" id="modalHourlyRow"></div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Сбрасываем модальную метрику на температуру при каждом открытии — так UX предсказуемее.
  currentModalMetric = 'temp';
  renderModalHourlyRow(d);
  setupModalHourlyTabs(d);
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
      subEl.textContent = '⚠ Данные пыльцы не получены (возможно, блокирует расширение)';
    } else if (POLLEN_DATA.today === undefined) {
      subEl.textContent = '⏳ Загрузка...';
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
const ACCURACY_MIN_SAMPLES = 3;
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
  if (subEl) subEl.textContent = t('accuracy.subData', { n });

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

  function buildRow({ src, s, score }, rank) {
    const q = accuracyQuality(score, minScore, maxScore) || 0;
    const w = barWidth(score);
    const rankBadge = rank === 1 ? '🏆' : String(rank);
    const rankCls = rank === 1 ? 'r1' : '';
    const bestCls = rank === 1 ? ' best' : '';
    const tempCls = s.tempMaxMAE == null ? ' na' : '';
    const precipCls = s.precipMAE == null ? ' na' : '';
    return `
      <div class="acc-row${bestCls}" data-src="${src.id}">
        <div class="acc-rank ${rankCls}">${rankBadge}</div>
        <div class="acc-name"><span class="ac-dot" style="background:${src.color};color:${src.color}"></span><span class="ac-text">${src.shortName || src.name}</span></div>
        <div class="acc-bar-wrap"><div class="acc-bar q${q + 1}" style="width:${w}%"></div></div>
        <div class="acc-metric${tempCls}">${formatMetric(s.tempMaxMAE, '°', 1)}</div>
        <div class="acc-metric${precipCls}">${formatMetric(s.precipMAE, '%', 0)}</div>
      </div>`;
  }

  let html = rows.map((r, i) => buildRow(r, i + 1)).join('');

  // Добавляем avg как контрольную строку (без ранга)
  if (avgSrc && avgScore != null) {
    const q = accuracyQuality(avgScore, minScore, maxScore);
    const w = barWidth(avgScore);
    const tempCls = avgS.tempMaxMAE == null ? ' na' : '';
    const precipCls = avgS.precipMAE == null ? ' na' : '';
    html += `
      <div class="acc-row" data-src="avg" style="margin-top:6px;border-top:1px dashed rgba(255,255,255,0.08);border-radius:0 0 10px 10px">
        <div class="acc-rank" style="color:#5eead4">∑</div>
        <div class="acc-name"><span class="ac-dot" style="background:${avgSrc.color};color:${avgSrc.color}"></span><span class="ac-text">${avgSrc.shortName || avgSrc.name}</span></div>
        <div class="acc-bar-wrap"><div class="acc-bar q${(q || 0) + 1}" style="width:${w}%"></div></div>
        <div class="acc-metric${tempCls}">${formatMetric(avgS.tempMaxMAE, '°', 1)}</div>
        <div class="acc-metric${precipCls}">${formatMetric(avgS.precipMAE, '%', 0)}</div>
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
    curEl.textContent = `${current} мм`;
    normEl.textContent = t('climate.norm', { v: `${norm} мм` });
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
  const acceptLang = state.lang === 'uk' ? 'uk' : state.lang === 'en' ? 'en' : 'ru';
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
  const apiLang = state.lang === 'uk' ? 'uk' : state.lang === 'en' ? 'en' : 'ru';
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
    { id: 'segLang',     allowed: ['ru','uk','en'],            apply: v => { state.lang = v; } },
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
  // v9: в hourly добавлены поля hum/dp/uvi/vis/sr (влажность, точка росы, УФ, видимость, солнечная радиация) для модалки "Почасовой".
  return `kw:forecast-cache:${lat.toFixed(2)}_${lon.toFixed(2)}:v9`;
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

// MAE по моделям → { ecmwf: {tempMaxMAE, tempMinMAE, precipMAE, n}, ..., avg: {...} }
// sampleSize = число записей с заполненным actual.
function computeAccuracyStats(records) {
  const acc = {};
  let sampleSize = 0;
  if (!Array.isArray(records)) return { stats: acc, sampleSize: 0 };

  for (const rec of records) {
    if (!rec.actual || !rec.predictions) continue;
    sampleSize++;
    for (const srcId of Object.keys(rec.predictions)) {
      const pred = rec.predictions[srcId];
      if (!pred) continue;
      if (!acc[srcId]) acc[srcId] = { tempMaxSum: 0, tempMinSum: 0, precipSum: 0, nTempMax: 0, nTempMin: 0, nPrecip: 0 };
      const s = acc[srcId];
      if (typeof pred.tempMax === 'number' && typeof rec.actual.tempMax === 'number') {
        s.tempMaxSum += Math.abs(pred.tempMax - rec.actual.tempMax); s.nTempMax++;
      }
      if (typeof pred.tempMin === 'number' && typeof rec.actual.tempMin === 'number') {
        s.tempMinSum += Math.abs(pred.tempMin - rec.actual.tempMin); s.nTempMin++;
      }
      if (typeof pred.precip === 'number' && typeof rec.actual.precip === 'number') {
        s.precipSum += Math.abs(pred.precip - rec.actual.precip); s.nPrecip++;
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
      n: Math.max(s.nTempMax, s.nTempMin, s.nPrecip)
    };
  }
  return { stats: out, sampleSize };
}

// Состояние accuracy — обновляется в refreshForecast, читается в renderAccuracy.
let ACCURACY_STATE = { stats: {}, sampleSize: 0 };

// Публичная sync-сводка accuracy с сервера (Worker @meteo-star-bot).
// Анонимный запрос — возвращает общие данные по координатам, накопленные
// ботом для всех пользователей этой точки на 0.1° сетке.
// Локальные records сливаются с серверными (приоритет — записям с actual,
// при конфликте — серверные «выигрывают» как авторитетный источник).
// Кэш в localStorage чтобы не блокировать UI при следующих refreshForecast.
const ACCURACY_SERVER_TTL_MS = 30 * 60 * 1000; // 30 минут
function accServerCacheKey(lat, lon) {
  const [a, b] = accLatLon(lat, lon);
  return `kw:accuracy-server:${a.toFixed(1)}_${b.toFixed(1)}:v1`;
}
async function fetchAccuracyFromServer(lat, lon) {
  // Throttle: если недавно тянули — не дёргаем ещё раз
  const cacheKey = accServerCacheKey(lat, lon);
  try {
    const raw = localStorage.getItem(cacheKey);
    if (raw) {
      const obj = JSON.parse(raw);
      if (obj && obj.fetchedAt && (Date.now() - obj.fetchedAt < ACCURACY_SERVER_TTL_MS)) {
        return;
      }
    }
  } catch (e) {}
  try {
    const r = await fetch(`${BOT_API_BASE}/api/accuracy?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`);
    if (!r.ok) return;
    const data = await r.json();
    if (!data.ok || !Array.isArray(data.records)) return;
    // Кэшируем ответ
    try { localStorage.setItem(cacheKey, JSON.stringify({ fetchedAt: Date.now(), serverRecords: data.records })); } catch (e) {}
    if (data.records.length === 0) return;
    // Сливаем серверные records с локальными. Локальные хранятся в формате
    // { date, predictions: {ecmwf:{tMax,tMin,precip},...}, actual: {tMax,tMin,precip} }.
    // Серверные — в формате { date, predictions: {ecmwf:{tempMax,tempMin,precipSum},...}, actual: {tempMax,tempMin,precipSum} }.
    // Нормализуем к локальному формату при слиянии.
    const local = loadAccuracyData(lat, lon);
    const byDate = new Map();
    for (const rec of (local.records || [])) byDate.set(rec.date, rec);
    let changed = false;
    for (const sRec of data.records) {
      const existing = byDate.get(sRec.date);
      const converted = convertServerRecord(sRec);
      if (!converted) continue;
      if (!existing) {
        byDate.set(sRec.date, converted);
        changed = true;
      } else if (!existing.actual && converted.actual) {
        // Серверная запись имеет actual, локальная — нет: берём серверную
        byDate.set(sRec.date, converted);
        changed = true;
      }
    }
    if (changed) {
      const merged = Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));
      saveAccuracyData(lat, lon, { records: merged });
      ACCURACY_STATE = computeAccuracyStats(merged);
      // Перерисовать UI элементы, где это видно
      if (typeof renderAccuracy === 'function') renderAccuracy();
      if (typeof renderHeroAccuracyHint === 'function') renderHeroAccuracyHint();
    }
  } catch (e) {
    // тихо: бот может быть недоступен — это OK, локальные данные всё равно работают
  }
}

// Конверсия server-формата (tempMax/tempMin/precipSum) в локальный (tMax/tMin/precip).
function convertServerRecord(sRec) {
  if (!sRec || !sRec.date) return null;
  // Локальный формат записи: { tempMax, tempMin, precip }
  // На сервере у нас уже tempMax / tempMin / precipSum.
  // precipSum (мм/сутки) и precip (вероятность %) — разные метрики;
  // не конвертируем precip из серверных данных, оставляем null.
  const convertMetrics = (m) => {
    if (!m) return null;
    return {
      tempMax: typeof m.tempMax === 'number' ? Math.round(m.tempMax * 10) / 10 : null,
      tempMin: typeof m.tempMin === 'number' ? Math.round(m.tempMin * 10) / 10 : null,
      precip: null
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
  return { date: sRec.date, predictions, actual: (actual && (actual.tempMax != null || actual.tempMin != null)) ? actual : null };
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

// Парсит ответ Open-Meteo (который содержит данные по всем 7 моделям) в объект:
//   { 'ecmwf': [10 days], 'gfs': [10 days], ..., 'avg': [10 days] }
//
// АСИНХРОННАЯ через yielding: парсинг 7 моделей суммарно ~50–150мс на телефоне.
// Чтобы не блокировать main thread одним куском, между моделями делаем
// await setTimeout(0) — браузер успевает отрисовать промежуточные кадры,
// принять пользовательский ввод и т.п. Каждый чанк (одна модель) занимает
// ~10–20мс — это укладывается в 16мс-кадр без jank'а.
async function parseAllModels(data, sources) {
  const result = {};
  const validForecasts = [];
  const yieldToBrowser = () => new Promise(resolve => setTimeout(resolve, 0));

  for (const src of sources) {
    if (!src.model) continue; // 'avg' пропускаем — вычисляем отдельно
    try {
      const forecast = parseOpenMeteoToForecast(data, '_' + src.model);
      if (forecast && forecast.length > 0) {
        result[src.id] = forecast;
        validForecasts.push(forecast);
      }
    } catch (e) {
      console.warn('Не удалось распарсить модель', src.model, e);
    }
    // Отдаём управление браузеру между моделями — UI не фризит во время парса
    await yieldToBrowser();
  }

  if (validForecasts.length > 0) {
    result.avg = computeAverageForecast(validForecasts);
  }
  return result;
}

// Среднее по N моделям — для каждого дня и каждого часа берём арифметическое среднее.
// Категориальные поля (направление ветра, иконка, фаза луны) берём из первой модели.
function computeAverageForecast(forecasts) {
  if (!forecasts || forecasts.length === 0) return [];
  const numDays = Math.min(...forecasts.map(f => f.length));
  const result = [];

  const meanOf = (arr, field) => {
    const vals = arr.map(o => o[field]).filter(v => typeof v === 'number' && !Number.isNaN(v));
    if (vals.length === 0) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };

  for (let i = 0; i < numDays; i++) {
    const days = forecasts.map(f => f[i]).filter(Boolean);
    if (days.length === 0) continue;
    const first = days[0];

    // Усреднение часовых (включая feels-like, cloud_cover, а также min/max температуры среди моделей — для полосы разброса на графике)
    const hourly = [];
    const numHours = Math.min(...days.map(d => d.hourly.length));
    for (let k = 0; k < numHours; k++) {
      const hours = days.map(d => d.hourly[k]).filter(Boolean);
      if (hours.length === 0) continue;
      const feelsVals = hours.map(o => o.feels).filter(v => typeof v === 'number');
      const clVals = hours.map(o => o.cl).filter(v => typeof v === 'number');
      const tVals = hours.map(o => o.t).filter(v => typeof v === 'number');
      // В6: cape/li усредняем; wc берём максимум по моделям — если хоть одна предсказала
      // грозовой код (95/96/99), он «выиграет» у спокойных кодов.
      const capeVals = hours.map(o => o.cape).filter(v => typeof v === 'number');
      const liVals   = hours.map(o => o.li).filter(v => typeof v === 'number');
      const wcVals   = hours.map(o => o.wc).filter(v => typeof v === 'number');
      const prVals   = hours.map(o => o.pr).filter(v => typeof v === 'number');
      const humVals  = hours.map(o => o.hum).filter(v => typeof v === 'number');
      const dpVals   = hours.map(o => o.dp).filter(v => typeof v === 'number');
      const uviVals  = hours.map(o => o.uvi).filter(v => typeof v === 'number');
      const visVals  = hours.map(o => o.vis).filter(v => typeof v === 'number');
      const srVals   = hours.map(o => o.sr).filter(v => typeof v === 'number');
      const meanRound = (arr, decimals = 0) => {
        if (arr.length === 0) return null;
        const m = arr.reduce((a,b) => a+b, 0) / arr.length;
        const factor = Math.pow(10, decimals);
        return Math.round(m * factor) / factor;
      };
      hourly.push({
        h: hours[0].h,
        t: Math.round(meanOf(hours, 't')),
        p: Math.round(meanOf(hours, 'p')),
        pmm: Math.round(meanOf(hours, 'pmm') * 10) / 10,  // среднее количество осадков мм/ч по моделям
        pmmMax: Math.max(0, ...hours.map(o => typeof o.pmm === 'number' ? o.pmm : 0)),  // максимум среди моделей (для консервативной проверки)
        w: Math.round(meanOf(hours, 'w')),
        c: hours[0].c,
        feels: feelsVals.length > 0 ? Math.round(feelsVals.reduce((a,b) => a+b, 0) / feelsVals.length) : null,
        cl: clVals.length > 0 ? Math.round(clVals.reduce((a,b) => a+b, 0) / clVals.length) : null,
        pr: meanRound(prVals, 0),
        hum: meanRound(humVals, 0),
        dp:  meanRound(dpVals, 0),
        uvi: meanRound(uviVals, 1),
        vis: meanRound(visVals, 1),
        sr:  meanRound(srVals, 0),
        tMin: tVals.length > 0 ? Math.min(...tVals) : null,
        tMax: tVals.length > 0 ? Math.max(...tVals) : null,
        wc: wcVals.length > 0 ? Math.max(...wcVals) : null,
        cape: capeVals.length > 0 ? Math.round(capeVals.reduce((a,b) => a+b, 0) / capeVals.length) : null,
        li: liVals.length > 0 ? Math.round((liVals.reduce((a,b) => a+b, 0) / liVals.length) * 10) / 10 : null
      });
    }

    // UV: считаем mean только из моделей, реально вернувших значение (null игнорируется в meanOf автоматически).
    const uvVals = days.map(o => o.uv).filter(v => typeof v === 'number' && !Number.isNaN(v));
    const avgUv = uvVals.length > 0 ? Math.round(uvVals.reduce((a,b) => a+b, 0) / uvVals.length) : null;
    const avgWind = Math.round(meanOf(days, 'wind'));
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
      max: Math.round(meanOf(days, 'max')),
      min: Math.round(meanOf(days, 'min')),
      precip: Math.round(meanOf(days, 'precip')),
      wind: avgWind,
      windDir: first.windDir,
      windGust: Math.round(meanOf(days, 'windGust')),
      humidity: Math.round(meanOf(days, 'humidity')),
      pressure: Math.round(meanOf(days, 'pressure')),
      pressureTrend: avgTrend,
      dewPoint: Math.round(meanOf(days, 'dewPoint')),
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

  // Гистерезис ~20px — стик и unstuck происходят на разных порогах,
  // что устраняет дрожание на границе.
  const HYSTERESIS = 18;
  let lastStuck = false;

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
      hero.classList.toggle('stuck', isStuck);
      lastStuck = isStuck;
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

const RULE_DEFS = [
  { type: 'precip_soon',     icon: '💧', defaults: { windowHours: 3, watchRain: true, watchSnow: false },
    input: { field: 'windowHours', min: 1, max: 24, unit: 'ч' },
    name: 'Осадки в ближайшие',
    desc: 'Уведомить если ожидаются осадки >0.3 мм/ч и вероятность >60%',
    subChoices: [
      { field: 'watchRain', icon: '🌧', label: 'Дождь' },
      { field: 'watchSnow', icon: '❄',  label: 'Снег' }
    ]
  },
  { type: 'storm_alert',     icon: '⚡', defaults: {},
    input: null,
    name: 'Гроза в ближайшие 6 часов',
    desc: 'Алерт при weather_code 95/96/99 или CAPE>1500 + LI<-2' },
  { type: 'temp_below',      icon: '🥶', defaults: { threshold: 0 },
    input: { field: 'threshold', min: -40, max: 40, unit: '°C' },
    name: 'Температура ниже',
    desc: 'Минимум по прогнозу на ближайшие 12 часов' },
  { type: 'temp_above',      icon: '🥵', defaults: { threshold: 30 },
    input: { field: 'threshold', min: 0, max: 50, unit: '°C' },
    name: 'Температура выше',
    desc: 'Максимум по прогнозу на ближайшие 12 часов' },
  { type: 'dry_streak',      icon: '☀',  defaults: { days: 3 },
    input: { field: 'days', min: 1, max: 14, unit: 'дн' },
    name: 'Дней без дождя подряд',
    desc: 'Алерт когда подряд N+ дней с осадками <0.5 мм/сутки' },
  { type: 'morning_summary', icon: '🌅', defaults: { hour: 7, minute: 0 },
    input: { field: 'time', isTime: true },
    name: 'Утренняя сводка',
    desc: 'Ежедневная сводка погоды в указанное время',
    sections: [
      { key: 'wind',     icon: '🌬', label: 'Ветер' },
      { key: 'precip',   icon: '💧', label: 'Осадки' },
      { key: 'astro',    icon: '🌅', label: 'Восход/закат' },
      { key: 'storm',    icon: '⛈', label: 'Гроза' },
      { key: 'feels',    icon: '🌡', label: 'По ощущениям' },
      { key: 'tomorrow', icon: '📊', label: 'Завтра' }
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
  fetchAndRenderRules(tg);
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
    alert('Не удалось связаться с ботом. Попробуй позже.');
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
        alert('Код истёк или не найден');
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
  try {
    const r = await fetch(`${BOT_API_BASE}/api/rules-get`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chatId: tg.chatId, pairToken: tg.pairToken })
    });
    if (!r.ok) {
      if (r.status === 401) {
        // pairToken недействителен — отвязываем
        clearTelegramState();
        refreshNotifPane();
        return;
      }
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
  } catch (e) { console.error('rules-get err:', e); }
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

    let inputHtml = '';
    if (def.input) {
      if (def.input.isTime) {
        const h = rule.hour ?? 7;
        const m = rule.minute ?? 0;
        inputHtml = `<div class="rule-time">
          <input class="rule-input" type="number" min="0" max="23" data-field="hour" value="${h}"/>
          <span>:</span>
          <input class="rule-input" type="number" min="0" max="59" data-field="minute" value="${String(m).padStart(2,'0')}"/>
        </div>`;
      } else {
        const val = rule[def.input.field];
        inputHtml = `<div class="rule-time">
          <input class="rule-input" type="number" min="${def.input.min}" max="${def.input.max}" data-field="${def.input.field}" value="${val}"/>
          <span>${def.input.unit}</span>
        </div>`;
      }
    }

    // Подразделы (для precip_soon — Дождь/Снег; для morning_summary — 6 секций сводки).
    // Видимы только если правило включено (enabled === true).
    let subHtml = '';
    if (enabled && def.subChoices) {
      const chips = def.subChoices.map(c => {
        const on = rule[c.field] === true;
        return `<button type="button" class="rule-subchoice${on ? ' on' : ''}" data-field="${c.field}">
          <span class="rsc-icon">${c.icon}</span><span>${c.label}</span>
        </button>`;
      }).join('');
      subHtml = `<div class="rule-subopts" data-kind="choices">${chips}</div>`;
    }
    if (enabled && def.sections) {
      const sec = rule.sections || {};
      const chips = def.sections.map(s => {
        const on = sec[s.key] === true;
        return `<button type="button" class="rule-section-chip${on ? ' on' : ''}" data-key="${s.key}">
          <span class="rsc-icon">${s.icon}</span><span>${s.label}</span>
        </button>`;
      }).join('');
      const hint = '<div class="rule-subopts-hint">Доп. блоки в утреннем сообщении</div>';
      subHtml = `${hint}<div class="rule-subopts" data-kind="sections">${chips}</div>`;
    }

    row.innerHTML = `
      <span class="rule-icon">${def.icon}</span>
      <div class="rule-text">
        <span class="rule-name">${def.name}</span>
        <span class="rule-desc">${def.desc}</span>
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

    row.querySelectorAll('.rule-input').forEach(inp => {
      inp.addEventListener('input', () => {
        const r = _notifEditing.rules.find(x => x.type === def.type);
        if (!r) return;
        const v = parseInt(inp.value, 10);
        if (Number.isFinite(v)) {
          r[inp.dataset.field] = v;
          _notifEditing.dirty = true;
        }
      });
      // Клик по input не должен toggle'ить
      inp.addEventListener('click', e => e.stopPropagation());
    });

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

async function saveNotifRules() {
  const tg = loadTelegramState();
  if (!tg) return;
  const statusEl = document.getElementById('notifSaveStatus');
  statusEl.textContent = '⏳ Сохраняю...';
  statusEl.classList.remove('error');
  try {
    const r = await fetch(`${BOT_API_BASE}/api/rules-set`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chatId: tg.chatId, pairToken: tg.pairToken, rules: _notifEditing.rules })
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const data = await r.json();
    if (!data.ok) throw new Error('save failed');
    statusEl.textContent = `✅ Сохранено: ${data.count} правил`;
    _notifEditing.dirty = false;
    setTimeout(() => { statusEl.textContent = ''; }, 3000);
  } catch (e) {
    statusEl.classList.add('error');
    statusEl.textContent = `❌ Ошибка: ${e.message}`;
  }
}

async function unlinkTelegram() {
  if (!confirm('Отвязать сайт от бота? Подписка в Telegram останется.')) return;
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
      })
      .catch((err) => {
        console.warn('[PWA] Регистрация Service Worker не удалась:', err);
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
