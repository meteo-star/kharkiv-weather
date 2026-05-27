// Meteo Star Bot — i18n словарь и хелперы.
//
// Поддерживаемые языки: ru, uk, en, de, pl, cs, fr, it, es.
// Источник истины — массив SUPPORTED_LANGS ниже. Должен совпадать с тем
// что в app.js на сайте (синхронизируется вручную при добавлении языков).
//
// Использование:
//   import { t, tPluralDays, tWhenStr, tWindDir, tSourceLabel,
//            tWeatherCodeLabel, tMoonName, detectLang } from './i18n.js';
//   const text = t('fired.cold', sub.lang, { name: 'Kyiv', temp: -8, when: '...' });

export const SUPPORTED_LANGS = ['ru','uk','en','de','pl','cs','fr','it','es','ro','hu','sk','pt','nl','tr','el'];

// Автодетект из Telegram language_code (двухбуквенный ISO 639-1).
// Telegram присылает 'ru', 'uk', 'en-US', 'pt-BR', etc. — берём первые 2 символа.
export function detectLang(rawCode) {
  if (!rawCode) return 'ru';
  const code = String(rawCode).toLowerCase().slice(0, 2);
  return SUPPORTED_LANGS.includes(code) ? code : 'en';
}

// Имя месяца (для whenStr). Все языки — мужской/именительный для шаблона DD.MM.
// На случай расширения формата whenStr (хочется «13 мая в 14:00») — оставляю готовый словарь.
const MONTHS = {
  ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
  uk: ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  de: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
  pl: ['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia'],
  cs: ['ledna','února','března','dubna','května','června','července','srpna','září','října','listopadu','prosince'],
  fr: ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'],
  it: ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'],
  es: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
  ro: ['ianuarie','februarie','martie','aprilie','mai','iunie','iulie','august','septembrie','octombrie','noiembrie','decembrie'],
  hu: ['január','február','március','április','május','június','július','augusztus','szeptember','október','november','december'],
  sk: ['januára','februára','marca','apríla','mája','júna','júla','augusta','septembra','októbra','novembra','decembra'],
  pt: ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'],
  nl: ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'],
  tr: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
  el: ['Ιανουαρίου','Φεβρουαρίου','Μαρτίου','Απριλίου','Μαΐου','Ιουνίου','Ιουλίου','Αυγούστου','Σεπτεμβρίου','Οκτωβρίου','Νοεμβρίου','Δεκεμβρίου']
};

// «Сегодня в HH:MM» / «завтра в HH:MM» / «DD.MM в HH:MM» для каждого языка.
// isoTime — локальная строка от Open-Meteo (без 'Z').
// utcOffsetSec — смещение локации, нужно чтобы корректно определять «сегодня».
// Логика TZ-fix — см. v1.42.3 в HANDOFF.md.
export function tWhenStr(isoTime, utcOffsetSec, lang) {
  if (!isoTime) return '';
  const lng = SUPPORTED_LANGS.includes(lang) ? lang : 'ru';
  const nowLocal = new Date(Date.now() + (utcOffsetSec || 0) * 1000);
  const today    = nowLocal.toISOString().slice(0,10);
  const tomorrow = new Date(nowLocal.getTime() + 86400000).toISOString().slice(0,10);
  const dateStr = isoTime.slice(0,10);
  const hh = isoTime.slice(11,16);

  if (dateStr === today)    return _whenToday(lng, hh);
  if (dateStr === tomorrow) return _whenTomorrow(lng, hh);
  const [, m, dd] = dateStr.split('-');
  return _whenOtherDate(lng, dd, m, hh);
}

function _whenToday(lng, hh) {
  switch (lng) {
    case 'uk': return `сьогодні о ${hh}`;
    case 'en': return `today at ${hh}`;
    case 'de': return `heute um ${hh}`;
    case 'pl': return `dziś o ${hh}`;
    case 'cs': return `dnes v ${hh}`;
    case 'fr': return `aujourd'hui à ${hh}`;
    case 'it': return `oggi alle ${hh}`;
    case 'es': return `hoy a las ${hh}`;
    case 'ro': return `astăzi la ${hh}`;
    case 'hu': return `ma ${hh}-kor`;
    case 'sk': return `dnes o ${hh}`;
    case 'pt': return `hoje às ${hh}`;
    case 'nl': return `vandaag om ${hh}`;
    case 'tr': return `bugün ${hh}'da`;
    case 'el': return `σήμερα στις ${hh}`;
    default:   return `сегодня в ${hh}`;
  }
}
function _whenTomorrow(lng, hh) {
  switch (lng) {
    case 'uk': return `завтра о ${hh}`;
    case 'en': return `tomorrow at ${hh}`;
    case 'de': return `morgen um ${hh}`;
    case 'pl': return `jutro o ${hh}`;
    case 'cs': return `zítra v ${hh}`;
    case 'fr': return `demain à ${hh}`;
    case 'it': return `domani alle ${hh}`;
    case 'es': return `mañana a las ${hh}`;
    case 'ro': return `mâine la ${hh}`;
    case 'hu': return `holnap ${hh}-kor`;
    case 'sk': return `zajtra o ${hh}`;
    case 'pt': return `amanhã às ${hh}`;
    case 'nl': return `morgen om ${hh}`;
    case 'tr': return `yarın ${hh}'da`;
    case 'el': return `αύριο στις ${hh}`;
    default:   return `завтра в ${hh}`;
  }
}
function _whenOtherDate(lng, dd, mm, hh) {
  // Для всех языков формат «DD.MM в/at/à/etc HH:MM» — короткий и понятный.
  switch (lng) {
    case 'uk': return `${dd}.${mm} о ${hh}`;
    case 'en': return `${dd}.${mm} at ${hh}`;
    case 'de': return `${dd}.${mm} um ${hh}`;
    case 'pl': return `${dd}.${mm} o ${hh}`;
    case 'cs': return `${dd}.${mm} v ${hh}`;
    case 'fr': return `${dd}.${mm} à ${hh}`;
    case 'it': return `${dd}.${mm} alle ${hh}`;
    case 'es': return `${dd}.${mm} a las ${hh}`;
    case 'ro': return `${dd}.${mm} la ${hh}`;
    case 'hu': return `${dd}.${mm} ${hh}-kor`;
    case 'sk': return `${dd}.${mm} o ${hh}`;
    case 'pt': return `${dd}.${mm} às ${hh}`;
    case 'nl': return `${dd}.${mm} om ${hh}`;
    case 'tr': return `${dd}.${mm} ${hh}'da`;
    case 'el': return `${dd}.${mm} στις ${hh}`;
    default:   return `${dd}.${mm} в ${hh}`;
  }
}

// «через ~N мин» — для коротких minutely-15 сценариев в evaluateRule.
export function tInMinutes(minAhead, lang) {
  const lng = SUPPORTED_LANGS.includes(lang) ? lang : 'ru';
  switch (lng) {
    case 'uk': return `через ~${minAhead} хв`;
    case 'en': return `in ~${minAhead} min`;
    case 'de': return `in ~${minAhead} Min`;
    case 'pl': return `za ~${minAhead} min`;
    case 'cs': return `za ~${minAhead} min`;
    case 'fr': return `dans ~${minAhead} min`;
    case 'it': return `tra ~${minAhead} min`;
    case 'es': return `en ~${minAhead} min`;
    case 'ro': return `peste ~${minAhead} min`;
    case 'hu': return `~${minAhead} perc múlva`;
    case 'sk': return `o ~${minAhead} min`;
    case 'pt': return `em ~${minAhead} min`;
    case 'nl': return `over ~${minAhead} min`;
    case 'tr': return `~${minAhead} dakika içinde`;
    case 'el': return `σε ~${minAhead} λεπτά`;
    default:   return `через ~${minAhead} мин`;
  }
}

// «N дней» — плюрализация в каждом языке.
// Используется в dry_streak («N дней без дождя») и аналогах.
export function tPluralDays(n, lang) {
  const lng = SUPPORTED_LANGS.includes(lang) ? lang : 'ru';
  switch (lng) {
    case 'ru': return _pluralRuUk(n, 'день', 'дня', 'дней');
    case 'uk': return _pluralRuUk(n, 'день', 'дні', 'днів');
    case 'pl': return _pluralRuUk(n, 'dzień', 'dni', 'dni');
    case 'cs': return _pluralRuUk(n, 'den', 'dny', 'dnů');
    case 'en': return n === 1 ? 'day' : 'days';
    case 'de': return n === 1 ? 'Tag' : 'Tage';
    case 'fr': return n === 1 ? 'jour' : 'jours';
    case 'it': return n === 1 ? 'giorno' : 'giorni';
    case 'es': return n === 1 ? 'día' : 'días';
    case 'ro': return _pluralRo(n);
    case 'hu': return 'nap';   // в венгерском нет морфологического числа после числительного
    case 'sk': return _pluralRuUk(n, 'deň', 'dni', 'dní');
    case 'pt': return n === 1 ? 'dia' : 'dias';
    case 'nl': return n === 1 ? 'dag' : 'dagen';
    case 'tr': return 'gün';
    case 'el': return n === 1 ? 'ημέρα' : 'ημέρες';
    default:   return 'дней';
  }
}
// Румынский: 1 zi; 2-19 zile; 20+ — «de zile» (но «zile» как существительное без «de»
// уже звучит естественно для текущих сценариев типа «3 zile fără ploaie»).
function _pluralRo(n) {
  if (n === 1) return 'zi';
  return 'zile';
}
function _pluralRuUk(n, one, few, many) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

// 8 сторон света на разных языках — для buildWindBlock.
const WIND_DIRS = {
  ru: ['северный','северо-восточный','восточный','юго-восточный','южный','юго-западный','западный','северо-западный'],
  uk: ['північний','північно-східний','східний','південно-східний','південний','південно-західний','західний','північно-західний'],
  en: ['northern','north-eastern','eastern','south-eastern','southern','south-western','western','north-western'],
  de: ['Nord','Nordost','Ost','Südost','Süd','Südwest','West','Nordwest'],
  pl: ['północny','północno-wschodni','wschodni','południowo-wschodni','południowy','południowo-zachodni','zachodni','północno-zachodni'],
  cs: ['severní','severovýchodní','východní','jihovýchodní','jižní','jihozápadní','západní','severozápadní'],
  fr: ['nord','nord-est','est','sud-est','sud','sud-ouest','ouest','nord-ouest'],
  it: ['settentrionale','nord-orientale','orientale','sud-orientale','meridionale','sud-occidentale','occidentale','nord-occidentale'],
  es: ['del norte','del noreste','del este','del sureste','del sur','del suroeste','del oeste','del noroeste'],
  ro: ['nordic','nord-estic','estic','sud-estic','sudic','sud-vestic','vestic','nord-vestic'],
  hu: ['északi','északkeleti','keleti','délkeleti','déli','délnyugati','nyugati','északnyugati'],
  sk: ['severný','severovýchodný','východný','juhovýchodný','južný','juhozápadný','západný','severozápadný'],
  pt: ['de norte','de nordeste','de leste','de sudeste','de sul','de sudoeste','de oeste','de noroeste'],
  nl: ['noord','noordoost','oost','zuidoost','zuid','zuidwest','west','noordwest'],
  tr: ['kuzeyden','kuzeydoğudan','doğudan','güneydoğudan','güneyden','güneybatıdan','batıdan','kuzeybatıdan'],
  el: ['βόρειος','βορειοανατολικός','ανατολικός','νοτιοανατολικός','νότιος','νοτιοδυτικός','δυτικός','βορειοδυτικός']
};
export function tWindDir(deg, lang) {
  if (deg == null || !Number.isFinite(deg)) return '';
  const lng = SUPPORTED_LANGS.includes(lang) ? lang : 'ru';
  const dirs = WIND_DIRS[lng] || WIND_DIRS.ru;
  const idx = Math.round(((deg % 360) / 45)) % 8;
  return dirs[(idx + 8) % 8];
}

// Источник данных в footer'е «по данным X». ID источника + язык → строка.
const SOURCE_NAMES = {
  ecmwf: 'ECMWF', aifs: 'ECMWF AIFS (AI)', gfs: 'GFS', icon: 'ICON',
  gem: 'GEM', jma: 'JMA', mf: 'Météo-France', ukmo: 'UKMO'
};
const SOURCE_AVG_LABEL = {
  ru: 'усреднения 8 моделей',
  uk: 'усереднення 8 моделей',
  en: '8-model average',
  de: 'des Mittels aus 8 Modellen',
  pl: 'średniej z 8 modeli',
  cs: 'průměru z 8 modelů',
  fr: 'la moyenne de 8 modèles',
  it: 'media di 8 modelli',
  es: 'el promedio de 8 modelos',
  ro: 'media a 8 modele',
  hu: '8 modell átlaga',
  sk: 'priemeru z 8 modelov',
  pt: 'média de 8 modelos',
  nl: 'gemiddelde van 8 modellen',
  tr: '8 modelin ortalaması',
  el: 'του μέσου όρου 8 μοντέλων'
};
export function tSourceLabel(sourceId, lang) {
  const lng = SUPPORTED_LANGS.includes(lang) ? lang : 'ru';
  if (sourceId === 'avg' || !sourceId) return SOURCE_AVG_LABEL[lng] || SOURCE_AVG_LABEL.ru;
  return SOURCE_NAMES[sourceId] || SOURCE_AVG_LABEL[lng];
}

// «по данным X» — окружающая фраза для footer'а.
const SOURCE_FOOTER_TPL = {
  ru: 'по данным {src}',
  uk: 'за даними {src}',
  en: 'from {src}',
  de: 'gemäß {src}',
  pl: 'według {src}',
  cs: 'podle {src}',
  fr: "d'après {src}",
  it: 'secondo {src}',
  es: 'según {src}',
  ro: 'conform {src}',
  hu: '{src} szerint',
  sk: 'podľa {src}',
  pt: 'segundo {src}',
  nl: 'volgens {src}',
  tr: '{src} verilerine göre',
  el: 'σύμφωνα με {src}'
};
export function tSourceFooter(sourceId, lang) {
  const lng = SUPPORTED_LANGS.includes(lang) ? lang : 'ru';
  const tpl = SOURCE_FOOTER_TPL[lng] || SOURCE_FOOTER_TPL.ru;
  return tpl.replace('{src}', tSourceLabel(sourceId, lng));
}

// Лейбл условия погоды по WMO weather_code.
const WC_LABELS = {
  ru: { fc:'☁ Прогноз', clr:'☀ Ясно', pcl:'🌤 Переменная облачность', cld:'☁ Облачно',
        fog:'🌫 Туман', driz:'🌧 Морось', rain:'🌧 Дождь', snow:'🌨 Снег',
        shower:'⛈ Ливень', snowfall:'🌨 Снегопад', storm:'⛈ Гроза' },
  uk: { fc:'☁ Прогноз', clr:'☀ Ясно', pcl:'🌤 Мінлива хмарність', cld:'☁ Хмарно',
        fog:'🌫 Туман', driz:'🌧 Мряка', rain:'🌧 Дощ', snow:'🌨 Сніг',
        shower:'⛈ Злива', snowfall:'🌨 Снігопад', storm:'⛈ Гроза' },
  en: { fc:'☁ Forecast', clr:'☀ Clear', pcl:'🌤 Partly cloudy', cld:'☁ Cloudy',
        fog:'🌫 Fog', driz:'🌧 Drizzle', rain:'🌧 Rain', snow:'🌨 Snow',
        shower:'⛈ Showers', snowfall:'🌨 Snowfall', storm:'⛈ Thunderstorm' },
  de: { fc:'☁ Prognose', clr:'☀ Klar', pcl:'🌤 Wolkig', cld:'☁ Bedeckt',
        fog:'🌫 Nebel', driz:'🌧 Nieselregen', rain:'🌧 Regen', snow:'🌨 Schnee',
        shower:'⛈ Schauer', snowfall:'🌨 Schneefall', storm:'⛈ Gewitter' },
  pl: { fc:'☁ Prognoza', clr:'☀ Pogodnie', pcl:'🌤 Częściowe zachmurzenie', cld:'☁ Pochmurno',
        fog:'🌫 Mgła', driz:'🌧 Mżawka', rain:'🌧 Deszcz', snow:'🌨 Śnieg',
        shower:'⛈ Przelotny deszcz', snowfall:'🌨 Opady śniegu', storm:'⛈ Burza' },
  cs: { fc:'☁ Předpověď', clr:'☀ Jasno', pcl:'🌤 Polojasno', cld:'☁ Oblačno',
        fog:'🌫 Mlha', driz:'🌧 Mrholení', rain:'🌧 Déšť', snow:'🌨 Sníh',
        shower:'⛈ Přeháňky', snowfall:'🌨 Sněžení', storm:'⛈ Bouřka' },
  fr: { fc:'☁ Prévision', clr:'☀ Dégagé', pcl:'🌤 Partiellement nuageux', cld:'☁ Nuageux',
        fog:'🌫 Brouillard', driz:'🌧 Bruine', rain:'🌧 Pluie', snow:'🌨 Neige',
        shower:'⛈ Averses', snowfall:'🌨 Chutes de neige', storm:'⛈ Orage' },
  it: { fc:'☁ Previsione', clr:'☀ Sereno', pcl:'🌤 Parzialmente nuvoloso', cld:'☁ Nuvoloso',
        fog:'🌫 Nebbia', driz:'🌧 Pioviggine', rain:'🌧 Pioggia', snow:'🌨 Neve',
        shower:'⛈ Rovesci', snowfall:'🌨 Nevicata', storm:'⛈ Temporale' },
  es: { fc:'☁ Previsión', clr:'☀ Despejado', pcl:'🌤 Parcialmente nublado', cld:'☁ Nublado',
        fog:'🌫 Niebla', driz:'🌧 Llovizna', rain:'🌧 Lluvia', snow:'🌨 Nieve',
        shower:'⛈ Chubascos', snowfall:'🌨 Nevada', storm:'⛈ Tormenta' },
  ro: { fc:'☁ Prognoză', clr:'☀ Senin', pcl:'🌤 Parțial înnorat', cld:'☁ Înnorat',
        fog:'🌫 Ceață', driz:'🌧 Burniță', rain:'🌧 Ploaie', snow:'🌨 Ninsoare',
        shower:'⛈ Averse', snowfall:'🌨 Ninsori', storm:'⛈ Furtună' },
  hu: { fc:'☁ Előrejelzés', clr:'☀ Derült', pcl:'🌤 Részben felhős', cld:'☁ Felhős',
        fog:'🌫 Köd', driz:'🌧 Szitálás', rain:'🌧 Eső', snow:'🌨 Hó',
        shower:'⛈ Zápor', snowfall:'🌨 Havazás', storm:'⛈ Zivatar' },
  sk: { fc:'☁ Predpoveď', clr:'☀ Jasno', pcl:'🌤 Polojasno', cld:'☁ Zamračené',
        fog:'🌫 Hmla', driz:'🌧 Mrholenie', rain:'🌧 Dážď', snow:'🌨 Sneh',
        shower:'⛈ Prehánky', snowfall:'🌨 Sneženie', storm:'⛈ Búrka' },
  pt: { fc:'☁ Previsão', clr:'☀ Limpo', pcl:'🌤 Parcialmente nublado', cld:'☁ Nublado',
        fog:'🌫 Nevoeiro', driz:'🌧 Chuvisco', rain:'🌧 Chuva', snow:'🌨 Neve',
        shower:'⛈ Aguaceiros', snowfall:'🌨 Queda de neve', storm:'⛈ Trovoada' },
  nl: { fc:'☁ Voorspelling', clr:'☀ Helder', pcl:'🌤 Half bewolkt', cld:'☁ Bewolkt',
        fog:'🌫 Mist', driz:'🌧 Motregen', rain:'🌧 Regen', snow:'🌨 Sneeuw',
        shower:'⛈ Buien', snowfall:'🌨 Sneeuwval', storm:'⛈ Onweer' },
  tr: { fc:'☁ Tahmin', clr:'☀ Açık', pcl:'🌤 Parçalı bulutlu', cld:'☁ Bulutlu',
        fog:'🌫 Sis', driz:'🌧 Çisenti', rain:'🌧 Yağmur', snow:'🌨 Kar',
        shower:'⛈ Sağanak', snowfall:'🌨 Kar yağışı', storm:'⛈ Fırtına' },
  el: { fc:'☁ Πρόγνωση', clr:'☀ Αίθριος', pcl:'🌤 Μερικώς νεφελώδης', cld:'☁ Νεφελώδης',
        fog:'🌫 Ομίχλη', driz:'🌧 Ψιλόβροχο', rain:'🌧 Βροχή', snow:'🌨 Χιόνι',
        shower:'⛈ Καταιγίδες', snowfall:'🌨 Χιονόπτωση', storm:'⛈ Καταιγίδα' }
};
export function tWeatherCodeLabel(code, lang) {
  const lng = SUPPORTED_LANGS.includes(lang) ? lang : 'ru';
  const dict = WC_LABELS[lng] || WC_LABELS.ru;
  if (code == null) return dict.fc;
  if (code === 0) return dict.clr;
  if (code <= 2) return dict.pcl;
  if (code === 3) return dict.cld;
  if (code === 45 || code === 48) return dict.fog;
  if (code <= 57) return dict.driz;
  if (code <= 67) return dict.rain;
  if (code <= 77) return dict.snow;
  if (code <= 82) return dict.shower;
  if (code <= 86) return dict.snowfall;
  if (code <= 99) return dict.storm;
  return dict.fc;
}

// Фаза луны. Принимает «индекс фазы» 0..7 (от phase в buildMoonBlock) + lang.
const MOON_NAMES = {
  ru: ['Новолуние','Молодая луна','Первая четверть','Прибывающая луна','Полнолуние','Убывающая луна','Последняя четверть','Старая луна'],
  uk: ['Молодик','Молодий місяць','Перша чверть','Прибуваючий місяць','Повня','Спадаючий місяць','Остання чверть','Старий місяць'],
  en: ['New moon','Waxing crescent','First quarter','Waxing gibbous','Full moon','Waning gibbous','Last quarter','Waning crescent'],
  de: ['Neumond','Zunehmende Sichel','Erstes Viertel','Zunehmender Mond','Vollmond','Abnehmender Mond','Letztes Viertel','Abnehmende Sichel'],
  pl: ['Nów','Sierp przybywający','Pierwsza kwadra','Garb przybywający','Pełnia','Garb ubywający','Ostatnia kwadra','Sierp ubywający'],
  cs: ['Nov','Dorůstající srpek','První čtvrť','Dorůstající měsíc','Úplněk','Couvající měsíc','Poslední čtvrť','Couvající srpek'],
  fr: ['Nouvelle lune','Premier croissant','Premier quartier','Lune gibbeuse croissante','Pleine lune','Lune gibbeuse décroissante','Dernier quartier','Dernier croissant'],
  it: ['Luna nuova','Falce crescente','Primo quarto','Gibbosa crescente','Luna piena','Gibbosa calante','Ultimo quarto','Falce calante'],
  es: ['Luna nueva','Creciente','Cuarto creciente','Gibosa creciente','Luna llena','Gibosa menguante','Cuarto menguante','Menguante'],
  ro: ['Lună nouă','Lună crescătoare','Primul pătrar','Lună gheboasă crescătoare','Lună plină','Lună gheboasă descrescătoare','Ultimul pătrar','Lună descrescătoare'],
  hu: ['Újhold','Növekvő sarló','Első negyed','Növekvő hold','Telihold','Fogyó hold','Utolsó negyed','Fogyó sarló'],
  sk: ['Nov','Dorastajúci kosáčik','Prvá štvrť','Dorastajúci mesiac','Spln','Cúvajúci mesiac','Posledná štvrť','Cúvajúci kosáčik'],
  pt: ['Lua nova','Lua crescente','Quarto crescente','Lua gibosa crescente','Lua cheia','Lua gibosa minguante','Quarto minguante','Lua minguante'],
  nl: ['Nieuwe maan','Wassende sikkel','Eerste kwartier','Wassende maan','Volle maan','Afnemende maan','Laatste kwartier','Afnemende sikkel'],
  tr: ['Yeni ay','Hilal','İlk dördün','Şişkin ay','Dolunay','Azalan ay','Son dördün','Azalan hilal'],
  el: ['Νέα Σελήνη','Αυξανόμενο μηνίσκος','Πρώτο τέταρτο','Αυξανόμενη','Πανσέληνος','Φθίνουσα','Τελευταίο τέταρτο','Φθίνων μηνίσκος']
};
const MOON_TREND = {
  ru: { wax: '↑ растёт', wan: '↓ убывает' },
  uk: { wax: '↑ росте',  wan: '↓ спадає' },
  en: { wax: '↑ waxing', wan: '↓ waning' },
  de: { wax: '↑ zunehmend', wan: '↓ abnehmend' },
  pl: { wax: '↑ przybywa',  wan: '↓ ubywa' },
  cs: { wax: '↑ dorůstá',   wan: '↓ couvá' },
  fr: { wax: '↑ croissante', wan: '↓ décroissante' },
  it: { wax: '↑ crescente',  wan: '↓ calante' },
  es: { wax: '↑ creciente',  wan: '↓ menguante' },
  ro: { wax: '↑ crește', wan: '↓ descrește' },
  hu: { wax: '↑ növekszik', wan: '↓ fogy' },
  sk: { wax: '↑ dorastá', wan: '↓ cúva' },
  pt: { wax: '↑ crescente', wan: '↓ minguante' },
  nl: { wax: '↑ wassend', wan: '↓ afnemend' },
  tr: { wax: '↑ büyüyor', wan: '↓ küçülüyor' },
  el: { wax: '↑ αυξάνεται', wan: '↓ φθίνει' }
};
export function tMoonName(idx, lang) {
  const lng = SUPPORTED_LANGS.includes(lang) ? lang : 'ru';
  return (MOON_NAMES[lng] || MOON_NAMES.ru)[idx] || (MOON_NAMES.ru[idx] || '');
}
export function tMoonTrend(waxing, lang) {
  const lng = SUPPORTED_LANGS.includes(lang) ? lang : 'ru';
  const m = MOON_TREND[lng] || MOON_TREND.ru;
  return waxing ? m.wax : m.wan;
}

// ====================================================================
// Главный словарь — все остальные сообщения. Структура key → 9 переводов.
// {placeholders} заменяются на значения из params в t().
// ====================================================================
const DICT = {
  // ---------- evaluateRule fired-messages ----------
  'fired.cold': {
    ru: '❄️ <b>Похолодание!</b>\n{name}: до <b>{temp}°C</b> {when}',
    uk: '❄️ <b>Похолодання!</b>\n{name}: до <b>{temp}°C</b> {when}',
    en: '❄️ <b>Cold snap!</b>\n{name}: down to <b>{temp}°C</b> {when}',
    de: '❄️ <b>Kälteeinbruch!</b>\n{name}: bis <b>{temp}°C</b> {when}',
    pl: '❄️ <b>Ochłodzenie!</b>\n{name}: do <b>{temp}°C</b> {when}',
    cs: '❄️ <b>Ochlazení!</b>\n{name}: až na <b>{temp}°C</b> {when}',
    fr: '❄️ <b>Coup de froid !</b>\n{name} : jusqu\'à <b>{temp}°C</b> {when}',
    it: '❄️ <b>Calo termico!</b>\n{name}: fino a <b>{temp}°C</b> {when}',
    es: '❄️ <b>¡Frente frío!</b>\n{name}: hasta <b>{temp}°C</b> {when}'
  },
  'fired.heat': {
    ru: '🥵 <b>Жара!</b>\n{name}: до <b>{temp}°C</b> {when}',
    uk: '🥵 <b>Спека!</b>\n{name}: до <b>{temp}°C</b> {when}',
    en: '🥵 <b>Heat!</b>\n{name}: up to <b>{temp}°C</b> {when}',
    de: '🥵 <b>Hitze!</b>\n{name}: bis <b>{temp}°C</b> {when}',
    pl: '🥵 <b>Upał!</b>\n{name}: do <b>{temp}°C</b> {when}',
    cs: '🥵 <b>Horko!</b>\n{name}: až na <b>{temp}°C</b> {when}',
    fr: '🥵 <b>Chaleur !</b>\n{name} : jusqu\'à <b>{temp}°C</b> {when}',
    it: '🥵 <b>Caldo!</b>\n{name}: fino a <b>{temp}°C</b> {when}',
    es: '🥵 <b>¡Calor!</b>\n{name}: hasta <b>{temp}°C</b> {when}'
  },
  'fired.rainSoon': {
    ru: '🌧 <b>Скоро дождь!</b>\n{name}: {mm} мм{unit}{probPart} {when}',
    uk: '🌧 <b>Незабаром дощ!</b>\n{name}: {mm} мм{unit}{probPart} {when}',
    en: '🌧 <b>Rain soon!</b>\n{name}: {mm} mm{unit}{probPart} {when}',
    de: '🌧 <b>Bald Regen!</b>\n{name}: {mm} mm{unit}{probPart} {when}',
    pl: '🌧 <b>Wkrótce deszcz!</b>\n{name}: {mm} mm{unit}{probPart} {when}',
    cs: '🌧 <b>Brzy déšť!</b>\n{name}: {mm} mm{unit}{probPart} {when}',
    fr: '🌧 <b>Pluie bientôt !</b>\n{name} : {mm} mm{unit}{probPart} {when}',
    it: '🌧 <b>Presto pioggia!</b>\n{name}: {mm} mm{unit}{probPart} {when}',
    es: '🌧 <b>¡Lluvia pronto!</b>\n{name}: {mm} mm{unit}{probPart} {when}'
  },
  'fired.snowSoon': {
    ru: '🌨 <b>Скоро снег!</b>\n{name}: {mm} мм/ч{probPart} {when}',
    uk: '🌨 <b>Незабаром сніг!</b>\n{name}: {mm} мм/год{probPart} {when}',
    en: '🌨 <b>Snow soon!</b>\n{name}: {mm} mm/h{probPart} {when}',
    de: '🌨 <b>Bald Schnee!</b>\n{name}: {mm} mm/h{probPart} {when}',
    pl: '🌨 <b>Wkrótce śnieg!</b>\n{name}: {mm} mm/godz{probPart} {when}',
    cs: '🌨 <b>Brzy sníh!</b>\n{name}: {mm} mm/h{probPart} {when}',
    fr: '🌨 <b>Neige bientôt !</b>\n{name} : {mm} mm/h{probPart} {when}',
    it: '🌨 <b>Presto neve!</b>\n{name}: {mm} mm/h{probPart} {when}',
    es: '🌨 <b>¡Nieve pronto!</b>\n{name}: {mm} mm/h{probPart} {when}'
  },
  // Юниты mm/15min vs mm/h — отдельные суффиксы, чтобы шаблон оставался единым.
  'unit.mm15': {
    ru: '/15мин', uk: '/15хв', en: '/15min', de: '/15Min', pl: '/15min',
    cs: '/15min', fr: '/15min', it: '/15min', es: '/15min'
  },
  'unit.mmh': {
    ru: '/ч',    uk: '/год',  en: '/h',     de: '/h',     pl: '/godz',
    cs: '/h',    fr: '/h',    it: '/h',    es: '/h'
  },
  'fired.storm': {
    ru: '⚡ <b>Гроза прогнозируется!</b>\n{name}: {when}\nСледи за прогнозом и подготовься.',
    uk: '⚡ <b>Прогнозується гроза!</b>\n{name}: {when}\nСлідкуй за прогнозом і підготуйся.',
    en: '⚡ <b>Thunderstorm forecast!</b>\n{name}: {when}\nWatch the forecast and prepare.',
    de: '⚡ <b>Gewitter vorhergesagt!</b>\n{name}: {when}\nVerfolge die Prognose und bereite dich vor.',
    pl: '⚡ <b>Prognoza burzy!</b>\n{name}: {when}\nŚledź prognozę i przygotuj się.',
    cs: '⚡ <b>Předpovídá se bouřka!</b>\n{name}: {when}\nSleduj předpověď a připrav se.',
    fr: '⚡ <b>Orage prévu !</b>\n{name} : {when}\nSurveille la prévision et prépare-toi.',
    it: '⚡ <b>Temporale previsto!</b>\n{name}: {when}\nSegui la previsione e preparati.',
    es: '⚡ <b>¡Tormenta prevista!</b>\n{name}: {when}\nObserva el pronóstico y prepárate.'
  },
  'fired.dryStreak': {
    ru: '☀ <b>{n} {days} без дождя!</b>\n{name}: с завтра по {end} — отличное окно для дачи / выезда.',
    uk: '☀ <b>{n} {days} без дощу!</b>\n{name}: з завтра по {end} — чудове вікно для дачі / виїзду.',
    en: '☀ <b>{n} {days} without rain!</b>\n{name}: from tomorrow to {end} — a great window for outings.',
    de: '☀ <b>{n} {days} ohne Regen!</b>\n{name}: von morgen bis {end} — ein tolles Fenster für Ausflüge.',
    pl: '☀ <b>{n} {days} bez deszczu!</b>\n{name}: od jutra do {end} — świetne okno na wyjazd.',
    cs: '☀ <b>{n} {days} bez deště!</b>\n{name}: od zítřka do {end} — skvělé okno na výlet.',
    fr: '☀ <b>{n} {days} sans pluie !</b>\n{name} : de demain à {end} — une excellente fenêtre pour sortir.',
    it: '☀ <b>{n} {days} senza pioggia!</b>\n{name}: da domani al {end} — ottima finestra per uscire.',
    es: '☀ <b>{n} {days} sin lluvia!</b>\n{name}: de mañana al {end} — gran ventana para salir.'
  },
  // Часть «, NN%» — приклеивается к fired.rainSoon / fired.snowSoon.
  'prob.part': {
    ru: ', {prob}%', uk: ', {prob}%', en: ', {prob}%', de: ', {prob}%', pl: ', {prob}%',
    cs: ', {prob}%', fr: ', {prob}%', it: ', {prob}%', es: ', {prob}%'
  },

  // ---------- buildMorningSummary ----------
  'summary.greeting': {
    ru: '🌅 <b>Доброе утро!</b>',
    uk: '🌅 <b>Доброго ранку!</b>',
    en: '🌅 <b>Good morning!</b>',
    de: '🌅 <b>Guten Morgen!</b>',
    pl: '🌅 <b>Dzień dobry!</b>',
    cs: '🌅 <b>Dobré ráno!</b>',
    fr: '🌅 <b>Bonjour !</b>',
    it: '🌅 <b>Buongiorno!</b>',
    es: '🌅 <b>¡Buenos días!</b>'
  },
  'summary.nowTemp': {
    ru: '🌡 Сейчас: <b>{t}</b>',
    uk: '🌡 Зараз: <b>{t}</b>',
    en: '🌡 Now: <b>{t}</b>',
    de: '🌡 Jetzt: <b>{t}</b>',
    pl: '🌡 Teraz: <b>{t}</b>',
    cs: '🌡 Teď: <b>{t}</b>',
    fr: '🌡 Maintenant : <b>{t}</b>',
    it: '🌡 Ora: <b>{t}</b>',
    es: '🌡 Ahora: <b>{t}</b>'
  },
  'summary.todayRange': {
    ru: '📊 Сегодня: <b>{min}…{max}°C</b>',
    uk: '📊 Сьогодні: <b>{min}…{max}°C</b>',
    en: '📊 Today: <b>{min}…{max}°C</b>',
    de: '📊 Heute: <b>{min}…{max}°C</b>',
    pl: '📊 Dziś: <b>{min}…{max}°C</b>',
    cs: '📊 Dnes: <b>{min}…{max}°C</b>',
    fr: '📊 Aujourd\'hui : <b>{min}…{max}°C</b>',
    it: '📊 Oggi: <b>{min}…{max}°C</b>',
    es: '📊 Hoy: <b>{min}…{max}°C</b>'
  },
  'summary.precipShort': {
    ru: '💧 Осадки сегодня: {mm} мм',
    uk: '💧 Опади сьогодні: {mm} мм',
    en: '💧 Precipitation today: {mm} mm',
    de: '💧 Niederschlag heute: {mm} mm',
    pl: '💧 Opady dziś: {mm} mm',
    cs: '💧 Srážky dnes: {mm} mm',
    fr: '💧 Précipitations aujourd\'hui : {mm} mm',
    it: '💧 Precipitazioni oggi: {mm} mm',
    es: '💧 Precipitaciones hoy: {mm} mm'
  },

  // ---------- buildPrecipBlock ----------
  'block.precip.rain': {
    ru: '🌧 Дождь: <b>{from}–{to}</b>',
    uk: '🌧 Дощ: <b>{from}–{to}</b>',
    en: '🌧 Rain: <b>{from}–{to}</b>',
    de: '🌧 Regen: <b>{from}–{to}</b>',
    pl: '🌧 Deszcz: <b>{from}–{to}</b>',
    cs: '🌧 Déšť: <b>{from}–{to}</b>',
    fr: '🌧 Pluie : <b>{from}–{to}</b>',
    it: '🌧 Pioggia: <b>{from}–{to}</b>',
    es: '🌧 Lluvia: <b>{from}–{to}</b>'
  },
  'block.precip.rainMax': {
    ru: ', до {mm} мм/ч', uk: ', до {mm} мм/год', en: ', up to {mm} mm/h',
    de: ', bis {mm} mm/h', pl: ', do {mm} mm/godz', cs: ', až {mm} mm/h',
    fr: ', jusqu\'à {mm} mm/h', it: ', fino a {mm} mm/h', es: ', hasta {mm} mm/h'
  },
  'block.precip.daySum': {
    ru: ' · за сутки {mm} мм',
    uk: ' · за добу {mm} мм',
    en: ' · {mm} mm/day',
    de: ' · {mm} mm/Tag',
    pl: ' · {mm} mm/dobę',
    cs: ' · {mm} mm/den',
    fr: ' · {mm} mm/jour',
    it: ' · {mm} mm/giorno',
    es: ' · {mm} mm/día'
  },
  'block.precip.possible': {
    ru: '🌧 Возможны осадки (за сутки {mm} мм)',
    uk: '🌧 Можливі опади (за добу {mm} мм)',
    en: '🌧 Possible precipitation ({mm} mm/day)',
    de: '🌧 Niederschlag möglich ({mm} mm/Tag)',
    pl: '🌧 Możliwe opady ({mm} mm/dobę)',
    cs: '🌧 Možné srážky ({mm} mm/den)',
    fr: '🌧 Précipitations possibles ({mm} mm/jour)',
    it: '🌧 Precipitazioni possibili ({mm} mm/giorno)',
    es: '🌧 Posibles precipitaciones ({mm} mm/día)'
  },
  'block.precip.noRain': {
    ru: '✓ Дождя не ожидается',
    uk: '✓ Дощу не очікується',
    en: '✓ No rain expected',
    de: '✓ Kein Regen erwartet',
    pl: '✓ Bez deszczu',
    cs: '✓ Déšť se neočekává',
    fr: '✓ Pas de pluie prévue',
    it: '✓ Nessuna pioggia prevista',
    es: '✓ No se espera lluvia'
  },
  'block.precip.snow': {
    ru: '❄ Снег: <b>{from}–{to}</b>',
    uk: '❄ Сніг: <b>{from}–{to}</b>',
    en: '❄ Snow: <b>{from}–{to}</b>',
    de: '❄ Schnee: <b>{from}–{to}</b>',
    pl: '❄ Śnieg: <b>{from}–{to}</b>',
    cs: '❄ Sníh: <b>{from}–{to}</b>',
    fr: '❄ Neige : <b>{from}–{to}</b>',
    it: '❄ Neve: <b>{from}–{to}</b>',
    es: '❄ Nieve: <b>{from}–{to}</b>'
  },
  'block.precip.noSnow': {
    ru: '✓ Снега не ожидается',
    uk: '✓ Снігу не очікується',
    en: '✓ No snow expected',
    de: '✓ Kein Schnee erwartet',
    pl: '✓ Bez śniegu',
    cs: '✓ Sníh se neočekává',
    fr: '✓ Pas de neige prévue',
    it: '✓ Nessuna neve prevista',
    es: '✓ No se espera nieve'
  },

  // ---------- buildWindBlock ----------
  'block.wind.calm': {
    ru: '🌬 Ветер: штиль',
    uk: '🌬 Вітер: штиль',
    en: '🌬 Wind: calm',
    de: '🌬 Wind: Windstille',
    pl: '🌬 Wiatr: cisza',
    cs: '🌬 Vítr: bezvětří',
    fr: '🌬 Vent : calme',
    it: '🌬 Vento: calmo',
    es: '🌬 Viento: calma'
  },
  'block.wind.main': {
    ru: '🌬 Ветер: до <b>{ms} м/с</b>',
    uk: '🌬 Вітер: до <b>{ms} м/с</b>',
    en: '🌬 Wind: up to <b>{ms} m/s</b>',
    de: '🌬 Wind: bis <b>{ms} m/s</b>',
    pl: '🌬 Wiatr: do <b>{ms} m/s</b>',
    cs: '🌬 Vítr: do <b>{ms} m/s</b>',
    fr: '🌬 Vent : jusqu\'à <b>{ms} m/s</b>',
    it: '🌬 Vento: fino a <b>{ms} m/s</b>',
    es: '🌬 Viento: hasta <b>{ms} m/s</b>'
  },
  'block.wind.gusts': {
    ru: ', порывы <b>{ms} м/с</b>',
    uk: ', пориви <b>{ms} м/с</b>',
    en: ', gusts <b>{ms} m/s</b>',
    de: ', Böen <b>{ms} m/s</b>',
    pl: ', porywy <b>{ms} m/s</b>',
    cs: ', nárazy <b>{ms} m/s</b>',
    fr: ', rafales <b>{ms} m/s</b>',
    it: ', raffiche <b>{ms} m/s</b>',
    es: ', ráfagas <b>{ms} m/s</b>'
  },

  // ---------- buildFeelsBlock ----------
  'block.feels.close': {
    ru: '🌡 По ощущениям: близко к фактической',
    uk: '🌡 За відчуттями: близько до фактичної',
    en: '🌡 Feels like: close to actual',
    de: '🌡 Gefühlt: nahe an der tatsächlichen',
    pl: '🌡 Odczuwalna: blisko rzeczywistej',
    cs: '🌡 Pocitově: blízko skutečné',
    fr: '🌡 Ressenti : proche du réel',
    it: '🌡 Percepita: vicina alla reale',
    es: '🌡 Sensación: cerca de la real'
  },
  'block.feels.range': {
    ru: '🌡 По ощущениям: <b>{min}…{max}°C</b>',
    uk: '🌡 За відчуттями: <b>{min}…{max}°C</b>',
    en: '🌡 Feels like: <b>{min}…{max}°C</b>',
    de: '🌡 Gefühlt: <b>{min}…{max}°C</b>',
    pl: '🌡 Odczuwalna: <b>{min}…{max}°C</b>',
    cs: '🌡 Pocitově: <b>{min}…{max}°C</b>',
    fr: '🌡 Ressenti : <b>{min}…{max}°C</b>',
    it: '🌡 Percepita: <b>{min}…{max}°C</b>',
    es: '🌡 Sensación: <b>{min}…{max}°C</b>'
  },

  // ---------- buildAstroBlock ----------
  'block.astro.line': {
    ru: '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · день {h}ч {m}м',
    uk: '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · день {h}год {m}хв',
    en: '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · day {h}h {m}m',
    de: '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · Tag {h}h {m}min',
    pl: '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · dzień {h}g {m}min',
    cs: '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · den {h}h {m}m',
    fr: '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · jour {h}h {m}min',
    it: '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · giorno {h}h {m}m',
    es: '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · día {h}h {m}m'
  },

  // ---------- buildFogBlock ----------
  'block.fog.window': {
    ru: '🌫 Туман: <b>{from}–{to}</b>',
    uk: '🌫 Туман: <b>{from}–{to}</b>',
    en: '🌫 Fog: <b>{from}–{to}</b>',
    de: '🌫 Nebel: <b>{from}–{to}</b>',
    pl: '🌫 Mgła: <b>{from}–{to}</b>',
    cs: '🌫 Mlha: <b>{from}–{to}</b>',
    fr: '🌫 Brouillard : <b>{from}–{to}</b>',
    it: '🌫 Nebbia: <b>{from}–{to}</b>',
    es: '🌫 Niebla: <b>{from}–{to}</b>'
  },
  'block.fog.none': {
    ru: '✓ Тумана не ожидается',
    uk: '✓ Туману не очікується',
    en: '✓ No fog expected',
    de: '✓ Kein Nebel erwartet',
    pl: '✓ Bez mgły',
    cs: '✓ Mlha se neočekává',
    fr: '✓ Pas de brouillard prévu',
    it: '✓ Nessuna nebbia prevista',
    es: '✓ No se espera niebla'
  },

  // ---------- buildStormBlock ----------
  'block.storm.window': {
    ru: '⛈ Возможна гроза: <b>{from}–{to}</b>',
    uk: '⛈ Можлива гроза: <b>{from}–{to}</b>',
    en: '⛈ Storm possible: <b>{from}–{to}</b>',
    de: '⛈ Gewitter möglich: <b>{from}–{to}</b>',
    pl: '⛈ Możliwa burza: <b>{from}–{to}</b>',
    cs: '⛈ Možná bouřka: <b>{from}–{to}</b>',
    fr: '⛈ Orage possible : <b>{from}–{to}</b>',
    it: '⛈ Temporale possibile: <b>{from}–{to}</b>',
    es: '⛈ Tormenta posible: <b>{from}–{to}</b>'
  },
  'block.storm.none': {
    ru: '✓ Грозы не ожидается',
    uk: '✓ Грози не очікується',
    en: '✓ No storm expected',
    de: '✓ Kein Gewitter erwartet',
    pl: '✓ Bez burzy',
    cs: '✓ Bouřka se neočekává',
    fr: '✓ Pas d\'orage prévu',
    it: '✓ Nessun temporale previsto',
    es: '✓ No se espera tormenta'
  },

  // ---------- buildTomorrowBlock ----------
  'block.tomorrow.line': {
    ru: '📊 Завтра: <b>{tStr}</b>, {label}, {precipStr}',
    uk: '📊 Завтра: <b>{tStr}</b>, {label}, {precipStr}',
    en: '📊 Tomorrow: <b>{tStr}</b>, {label}, {precipStr}',
    de: '📊 Morgen: <b>{tStr}</b>, {label}, {precipStr}',
    pl: '📊 Jutro: <b>{tStr}</b>, {label}, {precipStr}',
    cs: '📊 Zítra: <b>{tStr}</b>, {label}, {precipStr}',
    fr: '📊 Demain : <b>{tStr}</b>, {label}, {precipStr}',
    it: '📊 Domani: <b>{tStr}</b>, {label}, {precipStr}',
    es: '📊 Mañana: <b>{tStr}</b>, {label}, {precipStr}'
  },
  'block.tomorrow.precip': {
    ru: '{mm} мм осадков',
    uk: '{mm} мм опадів',
    en: '{mm} mm of precipitation',
    de: '{mm} mm Niederschlag',
    pl: '{mm} mm opadów',
    cs: '{mm} mm srážek',
    fr: '{mm} mm de précipitations',
    it: '{mm} mm di precipitazioni',
    es: '{mm} mm de precipitaciones'
  },
  'block.tomorrow.noPrecip': {
    ru: 'без осадков',
    uk: 'без опадів',
    en: 'no precipitation',
    de: 'kein Niederschlag',
    pl: 'bez opadów',
    cs: 'bez srážek',
    fr: 'pas de précipitations',
    it: 'senza precipitazioni',
    es: 'sin precipitaciones'
  },

  // ---------- formatRule ----------
  'rule.tempBelow': {
    ru: '🥶 Температура ниже {t}°C', uk: '🥶 Температура нижче {t}°C',
    en: '🥶 Temperature below {t}°C', de: '🥶 Temperatur unter {t}°C',
    pl: '🥶 Temperatura poniżej {t}°C', cs: '🥶 Teplota pod {t}°C',
    fr: '🥶 Température sous {t}°C', it: '🥶 Temperatura sotto {t}°C',
    es: '🥶 Temperatura bajo {t}°C'
  },
  'rule.tempAbove': {
    ru: '🥵 Температура выше {t}°C', uk: '🥵 Температура вище {t}°C',
    en: '🥵 Temperature above {t}°C', de: '🥵 Temperatur über {t}°C',
    pl: '🥵 Temperatura powyżej {t}°C', cs: '🥵 Teplota nad {t}°C',
    fr: '🥵 Température au-dessus de {t}°C', it: '🥵 Temperatura sopra {t}°C',
    es: '🥵 Temperatura sobre {t}°C'
  },
  'rule.rainSoon': {
    ru: '🌧 Дождь в ближайшие {h}ч', uk: '🌧 Дощ найближчі {h}год',
    en: '🌧 Rain in the next {h}h', de: '🌧 Regen in den nächsten {h}h',
    pl: '🌧 Deszcz w ciągu {h}h', cs: '🌧 Déšť v následujících {h}h',
    fr: '🌧 Pluie dans les {h}h', it: '🌧 Pioggia nelle prossime {h}h',
    es: '🌧 Lluvia en las próximas {h}h'
  },
  'rule.precipSoon': {
    ru: '🌧 Осадки в ближайшие {h}ч ({what})',
    uk: '🌧 Опади найближчі {h}год ({what})',
    en: '🌧 Precipitation in the next {h}h ({what})',
    de: '🌧 Niederschlag in den nächsten {h}h ({what})',
    pl: '🌧 Opady w ciągu {h}h ({what})',
    cs: '🌧 Srážky v následujících {h}h ({what})',
    fr: '🌧 Précipitations dans les {h}h ({what})',
    it: '🌧 Precipitazioni nelle prossime {h}h ({what})',
    es: '🌧 Precipitaciones en las próximas {h}h ({what})'
  },
  'rule.precipWhat.rain': {
    ru: 'дождь', uk: 'дощ', en: 'rain', de: 'Regen', pl: 'deszcz',
    cs: 'déšť', fr: 'pluie', it: 'pioggia', es: 'lluvia'
  },
  'rule.precipWhat.snow': {
    ru: 'снег', uk: 'сніг', en: 'snow', de: 'Schnee', pl: 'śnieg',
    cs: 'sníh', fr: 'neige', it: 'neve', es: 'nieve'
  },
  'rule.precipWhat.any': {
    ru: 'осадки', uk: 'опади', en: 'precipitation', de: 'Niederschlag', pl: 'opady',
    cs: 'srážky', fr: 'précipitations', it: 'precipitazioni', es: 'precipitaciones'
  },
  'rule.storm': {
    ru: '⚡ Гроза в 48ч', uk: '⚡ Гроза в 48год', en: '⚡ Thunderstorm in 48h',
    de: '⚡ Gewitter in 48h', pl: '⚡ Burza w 48h', cs: '⚡ Bouřka v 48h',
    fr: '⚡ Orage dans 48h', it: '⚡ Temporale in 48h', es: '⚡ Tormenta en 48h'
  },
  'rule.dryStreak': {
    ru: '☀ {n} {days} подряд без осадков',
    uk: '☀ {n} {days} поспіль без опадів',
    en: '☀ {n} {days} in a row without precipitation',
    de: '☀ {n} {days} in Folge ohne Niederschlag',
    pl: '☀ {n} {days} z rzędu bez opadów',
    cs: '☀ {n} {days} v řadě bez srážek',
    fr: '☀ {n} {days} d\'affilée sans précipitations',
    it: '☀ {n} {days} di fila senza precipitazioni',
    es: '☀ {n} {days} seguidos sin precipitaciones'
  },
  'rule.morningSummary': {
    ru: '🌅 Сводка утром в {time}', uk: '🌅 Зведення вранці о {time}',
    en: '🌅 Morning summary at {time}', de: '🌅 Morgen-Zusammenfassung um {time}',
    pl: '🌅 Poranne podsumowanie o {time}', cs: '🌅 Ranní souhrn v {time}',
    fr: '🌅 Résumé du matin à {time}', it: '🌅 Riepilogo del mattino alle {time}',
    es: '🌅 Resumen matutino a las {time}'
  },
  'rule.morningSummary.withFlags': {
    ru: '🌅 Сводка утром в {time} (+ {flags})',
    uk: '🌅 Зведення вранці о {time} (+ {flags})',
    en: '🌅 Morning summary at {time} (+ {flags})',
    de: '🌅 Morgen-Zusammenfassung um {time} (+ {flags})',
    pl: '🌅 Poranne podsumowanie o {time} (+ {flags})',
    cs: '🌅 Ranní souhrn v {time} (+ {flags})',
    fr: '🌅 Résumé du matin à {time} (+ {flags})',
    it: '🌅 Riepilogo del mattino alle {time} (+ {flags})',
    es: '🌅 Resumen matutino a las {time} (+ {flags})'
  },
  'rule.flag.wind':     { ru:'ветер', uk:'вітер', en:'wind', de:'Wind', pl:'wiatr', cs:'vítr', fr:'vent', it:'vento', es:'viento' },
  'rule.flag.precip':   { ru:'осадки', uk:'опади', en:'precipitation', de:'Niederschlag', pl:'opady', cs:'srážky', fr:'précipitations', it:'precipitazioni', es:'precipitaciones' },
  'rule.flag.fog':      { ru:'туман', uk:'туман', en:'fog', de:'Nebel', pl:'mgła', cs:'mlha', fr:'brouillard', it:'nebbia', es:'niebla' },
  'rule.flag.astro':    { ru:'восход/закат', uk:'схід/захід', en:'sunrise/sunset', de:'Auf-/Untergang', pl:'wschód/zachód', cs:'východ/západ', fr:'lever/coucher', it:'alba/tramonto', es:'amanecer/atardecer' },
  'rule.flag.moon':     { ru:'луна', uk:'місяць', en:'moon', de:'Mond', pl:'księżyc', cs:'měsíc', fr:'lune', it:'luna', es:'luna' },
  'rule.flag.storm':    { ru:'гроза', uk:'гроза', en:'storm', de:'Gewitter', pl:'burza', cs:'bouřka', fr:'orage', it:'temporale', es:'tormenta' },
  'rule.flag.feels':    { ru:'ощущения', uk:'відчуття', en:'feels-like', de:'Gefühlt', pl:'odczuwalna', cs:'pocitově', fr:'ressenti', it:'percepita', es:'sensación' },
  'rule.flag.tomorrow': { ru:'завтра', uk:'завтра', en:'tomorrow', de:'morgen', pl:'jutro', cs:'zítra', fr:'demain', it:'domani', es:'mañana' },

  // ---------- /start ----------
  'cmd.start.welcomeBack': {
    ru: '👋 С возвращением! Ты уже подписан{bannedNote}.\n\n📍 Локация: {loc}\n🔔 Правил: {rules}\n\nНапиши /help чтобы посмотреть команды.',
    uk: '👋 З поверненням! Ти вже підписаний{bannedNote}.\n\n📍 Локація: {loc}\n🔔 Правил: {rules}\n\nНапиши /help, щоб подивитися команди.',
    en: '👋 Welcome back! You\'re already subscribed{bannedNote}.\n\n📍 Location: {loc}\n🔔 Rules: {rules}\n\nType /help to see the commands.',
    de: '👋 Willkommen zurück! Du bist bereits abonniert{bannedNote}.\n\n📍 Standort: {loc}\n🔔 Regeln: {rules}\n\nSchreibe /help für die Befehlsliste.',
    pl: '👋 Witaj ponownie! Jesteś już zapisany{bannedNote}.\n\n📍 Lokalizacja: {loc}\n🔔 Reguł: {rules}\n\nWpisz /help, aby zobaczyć polecenia.',
    cs: '👋 Vítej zpět! Už jsi přihlášen{bannedNote}.\n\n📍 Místo: {loc}\n🔔 Pravidel: {rules}\n\nNapiš /help pro seznam příkazů.',
    fr: '👋 Bon retour ! Tu es déjà abonné{bannedNote}.\n\n📍 Lieu : {loc}\n🔔 Règles : {rules}\n\nTape /help pour voir les commandes.',
    it: '👋 Bentornato! Sei già iscritto{bannedNote}.\n\n📍 Località: {loc}\n🔔 Regole: {rules}\n\nScrivi /help per vedere i comandi.',
    es: '👋 ¡Bienvenido de nuevo! Ya estás suscrito{bannedNote}.\n\n📍 Ubicación: {loc}\n🔔 Reglas: {rules}\n\nEscribe /help para ver los comandos.'
  },
  'cmd.start.bannedNote': {
    ru: ', но твоя подписка ЗАБЛОКИРОВАНА',
    uk: ', але твоя підписка ЗАБЛОКОВАНА',
    en: ', but your subscription is BLOCKED',
    de: ', aber dein Abonnement ist GESPERRT',
    pl: ', ale twoja subskrypcja jest ZABLOKOWANA',
    cs: ', ale tvé předplatné je ZABLOKOVÁNO',
    fr: ', mais ton abonnement est BLOQUÉ',
    it: ', ma il tuo abbonamento è BLOCCATO',
    es: ', pero tu suscripción está BLOQUEADA'
  },
  'cmd.start.locUnset': {
    ru: 'не задана', uk: 'не задана', en: 'not set', de: 'nicht festgelegt',
    pl: 'nie ustawiona', cs: 'nenastaveno', fr: 'non définie', it: 'non impostata',
    es: 'no establecida'
  },
  'cmd.start.new': {
    ru: '🌤 Привет! Я бот <b>Meteo Star</b> — буду присылать тебе уведомления о погоде.\n\n📍 Локация по умолчанию: <b>Высокий</b> (Харьковская обл.).\n   Сменить: <code>/location &lt;город&gt;</code>\n   Например: <code>/location Київ</code>\n\n🔔 Правила уведомлений настраиваются через веб-интерфейс приложения.\n\n📋 Все команды: /help',
    uk: '🌤 Привіт! Я бот <b>Meteo Star</b> — буду надсилати тобі сповіщення про погоду.\n\n📍 Локація за замовчуванням: <b>Високий</b> (Харківська обл.).\n   Змінити: <code>/location &lt;місто&gt;</code>\n   Наприклад: <code>/location Київ</code>\n\n🔔 Правила сповіщень налаштовуються через веб-інтерфейс застосунку.\n\n📋 Усі команди: /help',
    en: '🌤 Hi! I\'m the <b>Meteo Star</b> bot — I\'ll send you weather notifications.\n\n📍 Default location: <b>Vysokyi</b> (Kharkiv region).\n   Change: <code>/location &lt;city&gt;</code>\n   Example: <code>/location Berlin</code>\n\n🔔 Notification rules are configured via the web app.\n\n📋 All commands: /help',
    de: '🌤 Hallo! Ich bin der <b>Meteo Star</b>-Bot — ich schicke dir Wetterbenachrichtigungen.\n\n📍 Standard-Standort: <b>Vysokyi</b> (Region Charkiw).\n   Ändern: <code>/location &lt;Stadt&gt;</code>\n   Beispiel: <code>/location Berlin</code>\n\n🔔 Benachrichtigungsregeln werden über die Web-App konfiguriert.\n\n📋 Alle Befehle: /help',
    pl: '🌤 Cześć! Jestem botem <b>Meteo Star</b> — będę wysyłać ci powiadomienia pogodowe.\n\n📍 Domyślna lokalizacja: <b>Wysokyj</b> (obwód charkowski).\n   Zmień: <code>/location &lt;miasto&gt;</code>\n   Przykład: <code>/location Warszawa</code>\n\n🔔 Reguły powiadomień konfigurujesz przez aplikację webową.\n\n📋 Wszystkie polecenia: /help',
    cs: '🌤 Ahoj! Jsem bot <b>Meteo Star</b> — budu ti posílat upozornění o počasí.\n\n📍 Výchozí poloha: <b>Vysokyi</b> (Charkovská oblast).\n   Změnit: <code>/location &lt;město&gt;</code>\n   Příklad: <code>/location Praha</code>\n\n🔔 Pravidla upozornění se nastavují přes webovou aplikaci.\n\n📋 Všechny příkazy: /help',
    fr: '🌤 Salut ! Je suis le bot <b>Meteo Star</b> — je t\'enverrai des notifications météo.\n\n📍 Lieu par défaut : <b>Vysokyi</b> (région de Kharkiv).\n   Changer : <code>/location &lt;ville&gt;</code>\n   Exemple : <code>/location Paris</code>\n\n🔔 Les règles de notification se configurent via l\'app web.\n\n📋 Toutes les commandes : /help',
    it: '🌤 Ciao! Sono il bot <b>Meteo Star</b> — ti invierò notifiche meteo.\n\n📍 Posizione predefinita: <b>Vysokyi</b> (regione di Kharkiv).\n   Cambia: <code>/location &lt;città&gt;</code>\n   Esempio: <code>/location Roma</code>\n\n🔔 Le regole di notifica si configurano tramite l\'app web.\n\n📋 Tutti i comandi: /help',
    es: '🌤 ¡Hola! Soy el bot <b>Meteo Star</b> — te enviaré notificaciones del tiempo.\n\n📍 Ubicación por defecto: <b>Vysokyi</b> (región de Járkov).\n   Cambiar: <code>/location &lt;ciudad&gt;</code>\n   Ejemplo: <code>/location Madrid</code>\n\n🔔 Las reglas de notificación se configuran en la app web.\n\n📋 Todos los comandos: /help'
  },
  'cmd.start.groupHint': {
    ru: '👋 Привет! В групповом чате используй <code>/setup</code> (от админа группы) чтобы привязать бота.',
    uk: '👋 Привіт! У груповому чаті використовуй <code>/setup</code> (від адміна групи), щоб прив\'язати бота.',
    en: '👋 Hi! In a group chat use <code>/setup</code> (from a group admin) to link the bot.',
    de: '👋 Hallo! In einem Gruppen-Chat verwende <code>/setup</code> (von einem Gruppen-Admin), um den Bot zu verbinden.',
    pl: '👋 Cześć! W czacie grupowym użyj <code>/setup</code> (od admina grupy), aby podłączyć bota.',
    cs: '👋 Ahoj! Ve skupinovém chatu použij <code>/setup</code> (od správce skupiny) pro propojení bota.',
    fr: '👋 Salut ! Dans un chat de groupe, utilise <code>/setup</code> (par un admin du groupe) pour lier le bot.',
    it: '👋 Ciao! In una chat di gruppo usa <code>/setup</code> (da un admin del gruppo) per collegare il bot.',
    es: '👋 ¡Hola! En un chat de grupo usa <code>/setup</code> (por un admin del grupo) para vincular el bot.'
  },

  // ---------- /help ----------
  'cmd.help.user': {
    ru: '📋 <b>Команды Meteo Star Bot:</b>\n\n<code>/start</code> — подписаться\n<code>/status</code> — твоя подписка и активные правила\n<code>/location &lt;город&gt;</code> — сменить локацию\n<code>/pair &lt;код&gt;</code> — связать с сайтом (код берётся в Settings)\n<code>/login</code> — ссылка для входа на сайт с любого устройства\n<code>/unpair</code> — разорвать связь с сайтом\n<code>/stop</code> — отписаться от всех уведомлений\n<code>/help</code> — эта подсказка',
    uk: '📋 <b>Команди Meteo Star Bot:</b>\n\n<code>/start</code> — підписатися\n<code>/status</code> — твоя підписка та активні правила\n<code>/location &lt;місто&gt;</code> — змінити локацію\n<code>/pair &lt;код&gt;</code> — пов\'язати з сайтом (код у Settings)\n<code>/login</code> — посилання для входу на сайт з будь-якого пристрою\n<code>/unpair</code> — розірвати зв\'язок із сайтом\n<code>/stop</code> — відписатися від усіх сповіщень\n<code>/help</code> — ця підказка',
    en: '📋 <b>Meteo Star Bot commands:</b>\n\n<code>/start</code> — subscribe\n<code>/status</code> — your subscription and active rules\n<code>/location &lt;city&gt;</code> — change location\n<code>/pair &lt;code&gt;</code> — link with the website (code from Settings)\n<code>/login</code> — magic link to sign in on any device\n<code>/unpair</code> — disconnect from the website\n<code>/stop</code> — unsubscribe from all notifications\n<code>/help</code> — this help',
    de: '📋 <b>Meteo Star Bot-Befehle:</b>\n\n<code>/start</code> — abonnieren\n<code>/status</code> — dein Abo und aktive Regeln\n<code>/location &lt;Stadt&gt;</code> — Standort ändern\n<code>/pair &lt;Code&gt;</code> — mit der Website verbinden (Code aus Settings)\n<code>/login</code> — Magic-Link zum Anmelden auf jedem Gerät\n<code>/unpair</code> — Verbindung zur Website trennen\n<code>/stop</code> — von allen Benachrichtigungen abmelden\n<code>/help</code> — diese Hilfe',
    pl: '📋 <b>Polecenia Meteo Star Bot:</b>\n\n<code>/start</code> — subskrybuj\n<code>/status</code> — twoja subskrypcja i aktywne reguły\n<code>/location &lt;miasto&gt;</code> — zmień lokalizację\n<code>/pair &lt;kod&gt;</code> — połącz ze stroną (kod w Ustawieniach)\n<code>/login</code> — magic-link do logowania na dowolnym urządzeniu\n<code>/unpair</code> — rozłącz ze stroną\n<code>/stop</code> — wypisz się ze wszystkich powiadomień\n<code>/help</code> — ta pomoc',
    cs: '📋 <b>Příkazy Meteo Star Bot:</b>\n\n<code>/start</code> — přihlásit se\n<code>/status</code> — tvé předplatné a aktivní pravidla\n<code>/location &lt;město&gt;</code> — změnit polohu\n<code>/pair &lt;kód&gt;</code> — propojit se stránkou (kód v Nastavení)\n<code>/login</code> — magic-link pro přihlášení na jakémkoli zařízení\n<code>/unpair</code> — odpojit od stránky\n<code>/stop</code> — odhlásit ze všech upozornění\n<code>/help</code> — tato nápověda',
    fr: '📋 <b>Commandes Meteo Star Bot :</b>\n\n<code>/start</code> — s\'abonner\n<code>/status</code> — ton abonnement et règles actives\n<code>/location &lt;ville&gt;</code> — changer de lieu\n<code>/pair &lt;code&gt;</code> — lier au site (code dans Paramètres)\n<code>/login</code> — lien magique pour se connecter sur n\'importe quel appareil\n<code>/unpair</code> — déconnecter du site\n<code>/stop</code> — se désabonner de toutes les notifications\n<code>/help</code> — cette aide',
    it: '📋 <b>Comandi Meteo Star Bot:</b>\n\n<code>/start</code> — iscriviti\n<code>/status</code> — la tua iscrizione e regole attive\n<code>/location &lt;città&gt;</code> — cambia posizione\n<code>/pair &lt;codice&gt;</code> — collega al sito (codice in Impostazioni)\n<code>/login</code> — magic-link per accedere da qualsiasi dispositivo\n<code>/unpair</code> — scollega dal sito\n<code>/stop</code> — disiscriviti da tutte le notifiche\n<code>/help</code> — questo aiuto',
    es: '📋 <b>Comandos de Meteo Star Bot:</b>\n\n<code>/start</code> — suscribirse\n<code>/status</code> — tu suscripción y reglas activas\n<code>/location &lt;ciudad&gt;</code> — cambiar ubicación\n<code>/pair &lt;código&gt;</code> — vincular con el sitio (código en Ajustes)\n<code>/login</code> — enlace mágico para entrar en cualquier dispositivo\n<code>/unpair</code> — desvincular del sitio\n<code>/stop</code> — darse de baja de todas las notificaciones\n<code>/help</code> — esta ayuda'
  },

  // ---------- /status ----------
  'cmd.status.notSubscribed': {
    ru: 'Ты ещё не подписан. Напиши /start чтобы начать.',
    uk: 'Ти ще не підписаний. Напиши /start, щоб почати.',
    en: 'You\'re not subscribed yet. Send /start to begin.',
    de: 'Du bist noch nicht abonniert. Sende /start, um zu beginnen.',
    pl: 'Nie jesteś jeszcze zapisany. Wpisz /start, aby zacząć.',
    cs: 'Ještě nejsi přihlášen. Napiš /start pro zahájení.',
    fr: 'Tu n\'es pas encore abonné. Envoie /start pour commencer.',
    it: 'Non sei ancora iscritto. Invia /start per iniziare.',
    es: 'Aún no estás suscrito. Envía /start para empezar.'
  },
  'cmd.status.banned': {
    ru: '🚫 Твоя подписка заблокирована администратором.',
    uk: '🚫 Твою підписку заблоковано адміністратором.',
    en: '🚫 Your subscription has been blocked by the admin.',
    de: '🚫 Dein Abonnement wurde vom Administrator gesperrt.',
    pl: '🚫 Twoja subskrypcja została zablokowana przez administratora.',
    cs: '🚫 Tvé předplatné bylo zablokováno administrátorem.',
    fr: '🚫 Ton abonnement a été bloqué par l\'administrateur.',
    it: '🚫 Il tuo abbonamento è stato bloccato dall\'amministratore.',
    es: '🚫 Tu suscripción ha sido bloqueada por el administrador.'
  },
  'cmd.status.noRules': {
    ru: '   <i>(нет правил, добавь через веб-интерфейс)</i>',
    uk: '   <i>(немає правил, додай через веб-інтерфейс)</i>',
    en: '   <i>(no rules, add via the web interface)</i>',
    de: '   <i>(keine Regeln, füge sie über die Web-Oberfläche hinzu)</i>',
    pl: '   <i>(brak reguł, dodaj przez interfejs WWW)</i>',
    cs: '   <i>(žádná pravidla, přidej je přes webové rozhraní)</i>',
    fr: '   <i>(aucune règle, ajoute-les via l\'interface web)</i>',
    it: '   <i>(nessuna regola, aggiungile tramite l\'interfaccia web)</i>',
    es: '   <i>(sin reglas, añádelas en la interfaz web)</i>'
  },
  'cmd.status.main': {
    ru: '📊 <b>Твоя подписка:</b>\n\n📍 Локация: <b>{name}</b> ({lat}, {lon})\n🌐 Язык: {lang}\n📅 Подписан: {date}\n\n🔔 <b>Правила уведомлений:</b>\n{rules}',
    uk: '📊 <b>Твоя підписка:</b>\n\n📍 Локація: <b>{name}</b> ({lat}, {lon})\n🌐 Мова: {lang}\n📅 Підписаний: {date}\n\n🔔 <b>Правила сповіщень:</b>\n{rules}',
    en: '📊 <b>Your subscription:</b>\n\n📍 Location: <b>{name}</b> ({lat}, {lon})\n🌐 Language: {lang}\n📅 Subscribed: {date}\n\n🔔 <b>Notification rules:</b>\n{rules}',
    de: '📊 <b>Dein Abo:</b>\n\n📍 Standort: <b>{name}</b> ({lat}, {lon})\n🌐 Sprache: {lang}\n📅 Abonniert: {date}\n\n🔔 <b>Benachrichtigungsregeln:</b>\n{rules}',
    pl: '📊 <b>Twoja subskrypcja:</b>\n\n📍 Lokalizacja: <b>{name}</b> ({lat}, {lon})\n🌐 Język: {lang}\n📅 Zapisany: {date}\n\n🔔 <b>Reguły powiadomień:</b>\n{rules}',
    cs: '📊 <b>Tvé předplatné:</b>\n\n📍 Místo: <b>{name}</b> ({lat}, {lon})\n🌐 Jazyk: {lang}\n📅 Přihlášen: {date}\n\n🔔 <b>Pravidla upozornění:</b>\n{rules}',
    fr: '📊 <b>Ton abonnement :</b>\n\n📍 Lieu : <b>{name}</b> ({lat}, {lon})\n🌐 Langue : {lang}\n📅 Abonné : {date}\n\n🔔 <b>Règles de notification :</b>\n{rules}',
    it: '📊 <b>La tua iscrizione:</b>\n\n📍 Località: <b>{name}</b> ({lat}, {lon})\n🌐 Lingua: {lang}\n📅 Iscritto: {date}\n\n🔔 <b>Regole di notifica:</b>\n{rules}',
    es: '📊 <b>Tu suscripción:</b>\n\n📍 Ubicación: <b>{name}</b> ({lat}, {lon})\n🌐 Idioma: {lang}\n📅 Suscrito: {date}\n\n🔔 <b>Reglas de notificación:</b>\n{rules}'
  },

  // ---------- /stop ----------
  'cmd.stop.notSubscribed': {
    ru: 'Ты и так не подписан.', uk: 'Ти і так не підписаний.', en: 'You\'re not subscribed.',
    de: 'Du bist nicht abonniert.', pl: 'Nie jesteś zapisany.', cs: 'Nejsi přihlášen.',
    fr: 'Tu n\'es pas abonné.', it: 'Non sei iscritto.', es: 'No estás suscrito.'
  },
  'cmd.stop.done': {
    ru: '✅ Отписал тебя. Все уведомления больше не приходят.\n\nЕсли захочешь вернуться — /start.',
    uk: '✅ Відписав тебе. Жодних сповіщень більше не буде.\n\nЯкщо захочеш повернутися — /start.',
    en: '✅ Unsubscribed. No more notifications.\n\nIf you want to come back — /start.',
    de: '✅ Du wurdest abgemeldet. Keine Benachrichtigungen mehr.\n\nWenn du zurückkommen willst — /start.',
    pl: '✅ Wypisany. Powiadomienia już nie przychodzą.\n\nJeśli chcesz wrócić — /start.',
    cs: '✅ Odhlášen. Žádná upozornění už nepřijdou.\n\nPokud se budeš chtít vrátit — /start.',
    fr: '✅ Désabonné. Plus aucune notification.\n\nSi tu veux revenir — /start.',
    it: '✅ Disiscritto. Nessuna altra notifica.\n\nSe vuoi tornare — /start.',
    es: '✅ Dado de baja. No habrá más notificaciones.\n\nSi quieres volver — /start.'
  },

  // ---------- /location ----------
  'cmd.location.usage': {
    ru: '📍 Сейчас укажи город:\n<code>/location Київ</code>\n\nИли пришли свои координаты в формате:\n<code>/location 49.9 36.21</code>',
    uk: '📍 Зараз вкажи місто:\n<code>/location Київ</code>\n\nАбо надішли свої координати у форматі:\n<code>/location 49.9 36.21</code>',
    en: '📍 Specify a city:\n<code>/location Berlin</code>\n\nOr send coordinates in the format:\n<code>/location 49.9 36.21</code>',
    de: '📍 Gib eine Stadt an:\n<code>/location Berlin</code>\n\nOder sende Koordinaten im Format:\n<code>/location 49.9 36.21</code>',
    pl: '📍 Podaj miasto:\n<code>/location Warszawa</code>\n\nLub wyślij współrzędne w formacie:\n<code>/location 49.9 36.21</code>',
    cs: '📍 Zadej město:\n<code>/location Praha</code>\n\nNebo pošli souřadnice ve formátu:\n<code>/location 49.9 36.21</code>',
    fr: '📍 Indique une ville :\n<code>/location Paris</code>\n\nOu envoie des coordonnées au format :\n<code>/location 49.9 36.21</code>',
    it: '📍 Indica una città:\n<code>/location Roma</code>\n\nO invia coordinate nel formato:\n<code>/location 49.9 36.21</code>',
    es: '📍 Indica una ciudad:\n<code>/location Madrid</code>\n\nO envía coordenadas en formato:\n<code>/location 49.9 36.21</code>'
  },
  'cmd.location.subscribeFirst': {
    ru: 'Сначала подпишись — /start.',
    uk: 'Спочатку підпишись — /start.',
    en: 'Subscribe first — /start.',
    de: 'Abonniere zuerst — /start.',
    pl: 'Najpierw się zapisz — /start.',
    cs: 'Nejprve se přihlas — /start.',
    fr: 'Abonne-toi d\'abord — /start.',
    it: 'Iscriviti prima — /start.',
    es: 'Suscríbete primero — /start.'
  },
  'cmd.location.setCoords': {
    ru: '📍 Установил координаты: <b>{name}</b>',
    uk: '📍 Встановив координати: <b>{name}</b>',
    en: '📍 Coordinates set: <b>{name}</b>',
    de: '📍 Koordinaten festgelegt: <b>{name}</b>',
    pl: '📍 Ustawiłem współrzędne: <b>{name}</b>',
    cs: '📍 Souřadnice nastaveny: <b>{name}</b>',
    fr: '📍 Coordonnées définies : <b>{name}</b>',
    it: '📍 Coordinate impostate: <b>{name}</b>',
    es: '📍 Coordenadas establecidas: <b>{name}</b>'
  },
  'cmd.location.notFound': {
    ru: '🤷 Не нашёл город <b>{q}</b>. Попробуй полное название или координаты: <code>/location 49.9 36.21</code>',
    uk: '🤷 Не знайшов місто <b>{q}</b>. Спробуй повну назву або координати: <code>/location 49.9 36.21</code>',
    en: '🤷 Could not find city <b>{q}</b>. Try the full name or coordinates: <code>/location 49.9 36.21</code>',
    de: '🤷 Stadt <b>{q}</b> nicht gefunden. Versuche den vollständigen Namen oder Koordinaten: <code>/location 49.9 36.21</code>',
    pl: '🤷 Nie znalazłem miasta <b>{q}</b>. Spróbuj pełnej nazwy lub współrzędnych: <code>/location 49.9 36.21</code>',
    cs: '🤷 Nenašel jsem město <b>{q}</b>. Zkus celý název nebo souřadnice: <code>/location 49.9 36.21</code>',
    fr: '🤷 Ville <b>{q}</b> introuvable. Essaie le nom complet ou des coordonnées : <code>/location 49.9 36.21</code>',
    it: '🤷 Città <b>{q}</b> non trovata. Prova il nome completo o le coordinate: <code>/location 49.9 36.21</code>',
    es: '🤷 No encontré la ciudad <b>{q}</b>. Prueba el nombre completo o coordenadas: <code>/location 49.9 36.21</code>'
  },
  'cmd.location.set': {
    ru: '📍 Локация обновлена: <b>{name}</b>\n   ({lat}, {lon})',
    uk: '📍 Локацію оновлено: <b>{name}</b>\n   ({lat}, {lon})',
    en: '📍 Location updated: <b>{name}</b>\n   ({lat}, {lon})',
    de: '📍 Standort aktualisiert: <b>{name}</b>\n   ({lat}, {lon})',
    pl: '📍 Lokalizacja zaktualizowana: <b>{name}</b>\n   ({lat}, {lon})',
    cs: '📍 Poloha aktualizována: <b>{name}</b>\n   ({lat}, {lon})',
    fr: '📍 Lieu mis à jour : <b>{name}</b>\n   ({lat}, {lon})',
    it: '📍 Posizione aggiornata: <b>{name}</b>\n   ({lat}, {lon})',
    es: '📍 Ubicación actualizada: <b>{name}</b>\n   ({lat}, {lon})'
  },
  'cmd.location.geocodeErr': {
    ru: '⚠ Ошибка геокодирования. Попробуй позже или укажи координаты вручную.',
    uk: '⚠ Помилка геокодування. Спробуй пізніше або вкажи координати вручну.',
    en: '⚠ Geocoding error. Try later or specify coordinates manually.',
    de: '⚠ Geocoding-Fehler. Versuche es später oder gib Koordinaten manuell an.',
    pl: '⚠ Błąd geokodowania. Spróbuj później lub podaj współrzędne ręcznie.',
    cs: '⚠ Chyba geokódování. Zkus to později nebo zadej souřadnice ručně.',
    fr: '⚠ Erreur de géocodage. Réessaie plus tard ou indique les coordonnées manuellement.',
    it: '⚠ Errore di geocodifica. Riprova più tardi o indica le coordinate manualmente.',
    es: '⚠ Error de geocodificación. Inténtalo más tarde o indica las coordenadas manualmente.'
  },

  // ---------- /pair ----------
  'cmd.pair.usage': {
    ru: '🔗 Использование: <code>/pair 123456</code>\n\nКод из 6 цифр нужно сначала получить на сайте: Настройки → 🔔 Уведомления → «Связать с Telegram».',
    uk: '🔗 Використання: <code>/pair 123456</code>\n\nКод з 6 цифр потрібно спочатку отримати на сайті: Налаштування → 🔔 Сповіщення → «Зв\'язати з Telegram».',
    en: '🔗 Usage: <code>/pair 123456</code>\n\nGet a 6-digit code first on the website: Settings → 🔔 Notifications → "Link with Telegram".',
    de: '🔗 Verwendung: <code>/pair 123456</code>\n\nHole zuerst einen 6-stelligen Code auf der Website: Einstellungen → 🔔 Benachrichtigungen → „Mit Telegram verbinden".',
    pl: '🔗 Użycie: <code>/pair 123456</code>\n\nNajpierw pobierz 6-cyfrowy kod na stronie: Ustawienia → 🔔 Powiadomienia → „Połącz z Telegram".',
    cs: '🔗 Použití: <code>/pair 123456</code>\n\nNejprve získej 6místný kód na webu: Nastavení → 🔔 Upozornění → „Propojit s Telegramem".',
    fr: '🔗 Utilisation : <code>/pair 123456</code>\n\nObtiens d\'abord un code à 6 chiffres sur le site : Paramètres → 🔔 Notifications → « Lier à Telegram ».',
    it: '🔗 Uso: <code>/pair 123456</code>\n\nOttieni prima un codice di 6 cifre sul sito: Impostazioni → 🔔 Notifiche → "Collega a Telegram".',
    es: '🔗 Uso: <code>/pair 123456</code>\n\nPrimero obtén un código de 6 dígitos en el sitio: Ajustes → 🔔 Notificaciones → «Vincular con Telegram».'
  },
  'cmd.pair.groupOnlyAdmin': {
    ru: '🚫 В группе связку с сайтом может сделать только админ группы.',
    uk: '🚫 У групі зв\'язок із сайтом може зробити лише адмін групи.',
    en: '🚫 Only a group admin can link the site in a group.',
    de: '🚫 Nur ein Gruppen-Admin kann die Website in einer Gruppe verbinden.',
    pl: '🚫 W grupie połączenie ze stroną może utworzyć tylko admin grupy.',
    cs: '🚫 Ve skupině může propojení se stránkou provést pouze správce skupiny.',
    fr: '🚫 Seul un admin du groupe peut lier le site dans un groupe.',
    it: '🚫 Solo un admin del gruppo può collegare il sito in un gruppo.',
    es: '🚫 Solo un admin del grupo puede vincular el sitio en un grupo.'
  },
  'cmd.pair.codeNotFound': {
    ru: '❌ Код <code>{code}</code> не найден или истёк (срок 10 минут).\nЗапроси новый на сайте.',
    uk: '❌ Код <code>{code}</code> не знайдено або закінчився термін (10 хвилин).\nЗапроси новий на сайті.',
    en: '❌ Code <code>{code}</code> not found or expired (valid for 10 minutes).\nRequest a new one on the site.',
    de: '❌ Code <code>{code}</code> nicht gefunden oder abgelaufen (10 Minuten gültig).\nHole einen neuen auf der Seite.',
    pl: '❌ Kod <code>{code}</code> nie znaleziony lub wygasł (ważny 10 minut).\nPobierz nowy na stronie.',
    cs: '❌ Kód <code>{code}</code> nenalezen nebo vypršel (platnost 10 minut).\nVyžádej si nový na webu.',
    fr: '❌ Code <code>{code}</code> introuvable ou expiré (valable 10 minutes).\nDemande-en un nouveau sur le site.',
    it: '❌ Codice <code>{code}</code> non trovato o scaduto (valido 10 minuti).\nRichiedine uno nuovo sul sito.',
    es: '❌ Código <code>{code}</code> no encontrado o caducado (válido 10 minutos).\nSolicita uno nuevo en el sitio.'
  },
  'cmd.pair.alreadyUsed': {
    ru: '⚠ Этот код уже использован другим чатом.',
    uk: '⚠ Цей код уже використано іншим чатом.',
    en: '⚠ This code has already been used by another chat.',
    de: '⚠ Dieser Code wurde bereits von einem anderen Chat verwendet.',
    pl: '⚠ Ten kod został już użyty przez inny czat.',
    cs: '⚠ Tento kód už byl použit jiným chatem.',
    fr: '⚠ Ce code a déjà été utilisé par un autre chat.',
    it: '⚠ Questo codice è già stato usato da un\'altra chat.',
    es: '⚠ Este código ya ha sido usado por otro chat.'
  },
  'cmd.pair.linked': {
    ru: '✅ <b>Связано с сайтом!</b>\n\nВозвращайся в браузер — теперь можешь настроить уведомления.\n\nЛокация: <b>{name}</b>\nЕсли хочешь сменить — <code>/location &lt;город&gt;</code>',
    uk: '✅ <b>Зв\'язано із сайтом!</b>\n\nПовертайся у браузер — тепер можеш налаштувати сповіщення.\n\nЛокація: <b>{name}</b>\nЯкщо хочеш змінити — <code>/location &lt;місто&gt;</code>',
    en: '✅ <b>Linked with the site!</b>\n\nReturn to the browser — you can now configure notifications.\n\nLocation: <b>{name}</b>\nTo change it — <code>/location &lt;city&gt;</code>',
    de: '✅ <b>Mit der Website verbunden!</b>\n\nKehre zum Browser zurück — du kannst jetzt Benachrichtigungen einrichten.\n\nStandort: <b>{name}</b>\nZum Ändern — <code>/location &lt;Stadt&gt;</code>',
    pl: '✅ <b>Połączono ze stroną!</b>\n\nWróć do przeglądarki — możesz teraz skonfigurować powiadomienia.\n\nLokalizacja: <b>{name}</b>\nAby zmienić — <code>/location &lt;miasto&gt;</code>',
    cs: '✅ <b>Propojeno se stránkou!</b>\n\nVrať se do prohlížeče — teď můžeš nastavit upozornění.\n\nMísto: <b>{name}</b>\nKe změně — <code>/location &lt;město&gt;</code>',
    fr: '✅ <b>Lié au site !</b>\n\nRetourne au navigateur — tu peux maintenant configurer les notifications.\n\nLieu : <b>{name}</b>\nPour changer — <code>/location &lt;ville&gt;</code>',
    it: '✅ <b>Collegato al sito!</b>\n\nTorna al browser — ora puoi configurare le notifiche.\n\nLocalità: <b>{name}</b>\nPer cambiare — <code>/location &lt;città&gt;</code>',
    es: '✅ <b>¡Vinculado al sitio!</b>\n\nVuelve al navegador — ahora puedes configurar las notificaciones.\n\nUbicación: <b>{name}</b>\nPara cambiar — <code>/location &lt;ciudad&gt;</code>'
  },

  // ---------- /setup ----------
  'cmd.setup.privateHint': {
    ru: '💡 Команда <code>/setup</code> для группового чата.\nВ личном чате используй <code>/start</code>.',
    uk: '💡 Команда <code>/setup</code> для групового чату.\nВ особистому чаті використовуй <code>/start</code>.',
    en: '💡 The <code>/setup</code> command is for group chats.\nIn a private chat use <code>/start</code>.',
    de: '💡 Der Befehl <code>/setup</code> ist für Gruppen-Chats.\nIm privaten Chat verwende <code>/start</code>.',
    pl: '💡 Polecenie <code>/setup</code> jest dla czatów grupowych.\nW prywatnym czacie użyj <code>/start</code>.',
    cs: '💡 Příkaz <code>/setup</code> je pro skupinové chaty.\nV soukromém chatu použij <code>/start</code>.',
    fr: '💡 La commande <code>/setup</code> est pour les chats de groupe.\nEn chat privé, utilise <code>/start</code>.',
    it: '💡 Il comando <code>/setup</code> è per le chat di gruppo.\nIn chat privata usa <code>/start</code>.',
    es: '💡 El comando <code>/setup</code> es para chats de grupo.\nEn chat privado usa <code>/start</code>.'
  },
  'cmd.setup.onlyAdmin': {
    ru: '🚫 Только админ группы может запустить /setup.',
    uk: '🚫 Лише адмін групи може запустити /setup.',
    en: '🚫 Only a group admin can run /setup.',
    de: '🚫 Nur ein Gruppen-Admin kann /setup ausführen.',
    pl: '🚫 Tylko admin grupy może uruchomić /setup.',
    cs: '🚫 /setup může spustit pouze správce skupiny.',
    fr: '🚫 Seul un admin du groupe peut exécuter /setup.',
    it: '🚫 Solo un admin del gruppo può eseguire /setup.',
    es: '🚫 Solo un admin del grupo puede ejecutar /setup.'
  },
  'cmd.setup.howTo': {
    ru: '📡 <b>Настройка группы:</b> {title}\n\n1. Открой сайт <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Настройки → 🔔 Уведомления → «Связать с Telegram»\n3. Получи 6-значный код\n4. Возвращайся сюда и напиши: <code>/pair &lt;код&gt;</code>\n\nПосле связки настраивай правила через сайт — уведомления приходят в этот чат.',
    uk: '📡 <b>Налаштування групи:</b> {title}\n\n1. Відкрий сайт <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Налаштування → 🔔 Сповіщення → «Зв\'язати з Telegram»\n3. Отримай 6-значний код\n4. Повертайся сюди й напиши: <code>/pair &lt;код&gt;</code>\n\nПісля зв\'язки налаштовуй правила через сайт — сповіщення приходять у цей чат.',
    en: '📡 <b>Group setup:</b> {title}\n\n1. Open the site <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Settings → 🔔 Notifications → "Link with Telegram"\n3. Get a 6-digit code\n4. Come back and write: <code>/pair &lt;code&gt;</code>\n\nAfter linking, configure rules on the site — notifications arrive in this chat.',
    de: '📡 <b>Gruppe einrichten:</b> {title}\n\n1. Öffne die Seite <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Einstellungen → 🔔 Benachrichtigungen → „Mit Telegram verbinden"\n3. Hole einen 6-stelligen Code\n4. Komm zurück und schreibe: <code>/pair &lt;Code&gt;</code>\n\nNach dem Verbinden Regeln auf der Seite konfigurieren — Benachrichtigungen kommen in diesen Chat.',
    pl: '📡 <b>Konfiguracja grupy:</b> {title}\n\n1. Otwórz stronę <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Ustawienia → 🔔 Powiadomienia → „Połącz z Telegram"\n3. Pobierz 6-cyfrowy kod\n4. Wróć tutaj i wpisz: <code>/pair &lt;kod&gt;</code>\n\nPo połączeniu skonfiguruj reguły na stronie — powiadomienia trafiają do tego czatu.',
    cs: '📡 <b>Nastavení skupiny:</b> {title}\n\n1. Otevři web <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Nastavení → 🔔 Upozornění → „Propojit s Telegramem"\n3. Získej 6místný kód\n4. Vrať se sem a napiš: <code>/pair &lt;kód&gt;</code>\n\nPo propojení nastav pravidla na webu — upozornění chodí do tohoto chatu.',
    fr: '📡 <b>Configuration du groupe :</b> {title}\n\n1. Ouvre le site <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Paramètres → 🔔 Notifications → « Lier à Telegram »\n3. Obtiens un code à 6 chiffres\n4. Reviens ici et écris : <code>/pair &lt;code&gt;</code>\n\nAprès la liaison, configure les règles sur le site — les notifications arrivent dans ce chat.',
    it: '📡 <b>Configurazione del gruppo:</b> {title}\n\n1. Apri il sito <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Impostazioni → 🔔 Notifiche → "Collega a Telegram"\n3. Ottieni un codice di 6 cifre\n4. Torna qui e scrivi: <code>/pair &lt;codice&gt;</code>\n\nDopo il collegamento, configura le regole sul sito — le notifiche arrivano in questa chat.',
    es: '📡 <b>Configuración del grupo:</b> {title}\n\n1. Abre el sitio <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Ajustes → 🔔 Notificaciones → «Vincular con Telegram»\n3. Obtén un código de 6 dígitos\n4. Vuelve aquí y escribe: <code>/pair &lt;código&gt;</code>\n\nTras vincular, configura las reglas en el sitio — las notificaciones llegan a este chat.'
  },

  // ---------- /unpair ----------
  'cmd.unpair.notSubscribed': {
    ru: 'Ты не подписан.', uk: 'Ти не підписаний.', en: 'You\'re not subscribed.',
    de: 'Du bist nicht abonniert.', pl: 'Nie jesteś zapisany.', cs: 'Nejsi přihlášen.',
    fr: 'Tu n\'es pas abonné.', it: 'Non sei iscritto.', es: 'No estás suscrito.'
  },
  'cmd.unpair.noLink': {
    ru: 'Сайт не связан с этим чатом.',
    uk: 'Сайт не пов\'язаний з цим чатом.',
    en: 'No site linked to this chat.',
    de: 'Keine Website mit diesem Chat verbunden.',
    pl: 'Strona nie jest połączona z tym czatem.',
    cs: 'K tomuto chatu není připojen žádný web.',
    fr: 'Aucun site lié à ce chat.',
    it: 'Nessun sito collegato a questa chat.',
    es: 'No hay sitio vinculado a este chat.'
  },
  'cmd.unpair.done': {
    ru: '🔓 Связь с сайтом разорвана (отвязано {n} устр.).\nПодписка осталась, правила тоже. Чтобы менять правила — снова свяжи через сайт.',
    uk: '🔓 Зв\'язок із сайтом розірвано (відв\'язано {n} прист.).\nПідписка лишилася, правила теж. Щоб змінювати правила — знову зв\'яжи через сайт.',
    en: '🔓 Site disconnected ({n} device(s) unlinked).\nSubscription and rules are kept. To edit rules — link again via the site.',
    de: '🔓 Website getrennt ({n} Gerät(e) entkoppelt).\nAbo und Regeln bleiben. Zum Bearbeiten der Regeln — erneut über die Seite verbinden.',
    pl: '🔓 Strona odłączona (odłączono {n} urządz.).\nSubskrypcja i reguły zostają. Aby edytować reguły — połącz ponownie przez stronę.',
    cs: '🔓 Web odpojen (odpojeno {n} zařízení).\nPředplatné i pravidla zůstávají. Pro úpravu pravidel — propoj znovu přes web.',
    fr: '🔓 Site déconnecté ({n} appareil(s) délié(s)).\nL\'abonnement et les règles sont conservés. Pour modifier les règles — relie via le site.',
    it: '🔓 Sito disconnesso ({n} dispositivo/i scollegato/i).\nIscrizione e regole restano. Per modificare le regole — collega di nuovo dal sito.',
    es: '🔓 Sitio desconectado ({n} dispositivo(s) desvinculado(s)).\nLa suscripción y reglas se conservan. Para editar reglas — vuelve a vincular en el sitio.'
  },

  // ---------- /login ----------
  'cmd.login.notSubscribed': {
    ru: 'Сначала /start (или /pair если уже создал код на сайте).',
    uk: 'Спочатку /start (або /pair, якщо вже створив код на сайті).',
    en: 'First /start (or /pair if you already created a code on the site).',
    de: 'Zuerst /start (oder /pair, falls du auf der Seite schon einen Code erstellt hast).',
    pl: 'Najpierw /start (lub /pair, jeśli już utworzyłeś kod na stronie).',
    cs: 'Nejdříve /start (nebo /pair, pokud jsi už vytvořil kód na webu).',
    fr: 'D\'abord /start (ou /pair si tu as déjà créé un code sur le site).',
    it: 'Prima /start (o /pair se hai già creato un codice sul sito).',
    es: 'Primero /start (o /pair si ya creaste un código en el sitio).'
  },
  'cmd.login.onlyAdmin': {
    ru: '🚫 Только админ группы может получить ссылку для входа на сайт.',
    uk: '🚫 Лише адмін групи може отримати посилання для входу на сайт.',
    en: '🚫 Only a group admin can get a login link.',
    de: '🚫 Nur ein Gruppen-Admin kann einen Login-Link erhalten.',
    pl: '🚫 Tylko admin grupy może otrzymać link logowania.',
    cs: '🚫 Jen správce skupiny může získat přihlašovací odkaz.',
    fr: '🚫 Seul un admin du groupe peut obtenir un lien de connexion.',
    it: '🚫 Solo un admin del gruppo può ottenere un link di accesso.',
    es: '🚫 Solo un admin del grupo puede obtener un enlace de inicio de sesión.'
  },
  'cmd.unknown': {
    ru: '🤖 Не знаю такую команду. Напиши /help — покажу что умею.',
    uk: '🤖 Не знаю такої команди. Напиши /help — покажу що вмію.',
    en: '🤖 I don\'t know that command. Type /help to see what I can do.',
    de: '🤖 Diesen Befehl kenne ich nicht. Schreibe /help, um zu sehen was ich kann.',
    pl: '🤖 Nie znam takiego polecenia. Wpisz /help, aby zobaczyć co potrafię.',
    cs: '🤖 Tento příkaz neznám. Napiš /help — ukážu, co umím.',
    fr: '🤖 Je ne connais pas cette commande. Tape /help pour voir ce que je sais faire.',
    it: '🤖 Non conosco questo comando. Scrivi /help per vedere cosa so fare.',
    es: '🤖 No conozco ese comando. Escribe /help para ver qué puedo hacer.'
  },
  'cmd.login.link': {
    ru: '🔗 <b>Ссылка для входа на сайт:</b>\n\n{url}\n\n<i>Открой её на любом устройстве (iPhone, ПК, ноут) — сайт сам войдёт с твоим аккаунтом.\nДействительна 10 минут, используется один раз.</i>',
    uk: '🔗 <b>Посилання для входу на сайт:</b>\n\n{url}\n\n<i>Відкрий його на будь-якому пристрої (iPhone, ПК, ноут) — сайт сам увійде з твоїм акаунтом.\nДіє 10 хвилин, використовується один раз.</i>',
    en: '🔗 <b>Login link:</b>\n\n{url}\n\n<i>Open it on any device (iPhone, PC, laptop) — the site signs in with your account automatically.\nValid for 10 minutes, single-use.</i>',
    de: '🔗 <b>Login-Link:</b>\n\n{url}\n\n<i>Öffne ihn auf einem beliebigen Gerät (iPhone, PC, Laptop) — die Seite meldet dich automatisch mit deinem Konto an.\n10 Minuten gültig, einmalig.</i>',
    pl: '🔗 <b>Link do logowania:</b>\n\n{url}\n\n<i>Otwórz na dowolnym urządzeniu (iPhone, PC, laptop) — strona zaloguje cię automatycznie.\nWażne 10 minut, jednorazowe.</i>',
    cs: '🔗 <b>Přihlašovací odkaz:</b>\n\n{url}\n\n<i>Otevři jej na libovolném zařízení (iPhone, PC, notebook) — web tě sám přihlásí s tvým účtem.\nPlatí 10 minut, jednorázové použití.</i>',
    fr: '🔗 <b>Lien de connexion :</b>\n\n{url}\n\n<i>Ouvre-le sur n\'importe quel appareil (iPhone, PC, portable) — le site te connectera automatiquement avec ton compte.\nValide 10 minutes, à usage unique.</i>',
    it: '🔗 <b>Link di accesso:</b>\n\n{url}\n\n<i>Aprilo su qualsiasi dispositivo (iPhone, PC, laptop) — il sito accederà automaticamente con il tuo account.\nValido 10 minuti, uso singolo.</i>',
    es: '🔗 <b>Enlace de inicio de sesión:</b>\n\n{url}\n\n<i>Ábrelo en cualquier dispositivo (iPhone, PC, portátil) — el sitio iniciará sesión automáticamente con tu cuenta.\nVálido 10 minutos, un solo uso.</i>'
  }
};

// ====================================================================
// Extension-блок: переводы для языков, добавленных в Фазе 4 (ro/hu/sk) и
// Фазе 5 (pt/nl/tr/el). Чтобы не править все ~70 объектов DICT по одному,
// держим переводы плоско по языкам, потом одной итерацией мерджим в DICT.
// Это ничему не меняет в API t() — после мержа DICT[key][lang] просто есть.
// ====================================================================
const DICT_EXTRA = {
  ro: {
    'fired.cold': '❄️ <b>Răcire!</b>\n{name}: până la <b>{temp}°C</b> {when}',
    'fired.heat': '🥵 <b>Caniculă!</b>\n{name}: până la <b>{temp}°C</b> {when}',
    'fired.rainSoon': '🌧 <b>Plouă curând!</b>\n{name}: {mm} mm{unit}{probPart} {when}',
    'fired.snowSoon': '🌨 <b>Ninge curând!</b>\n{name}: {mm} mm/h{probPart} {when}',
    'unit.mm15': '/15min', 'unit.mmh': '/h',
    'fired.storm': '⚡ <b>Furtună prognozată!</b>\n{name}: {when}\nUrmărește prognoza și pregătește-te.',
    'fired.dryStreak': '☀ <b>{n} {days} fără ploaie!</b>\n{name}: de mâine până {end} — o fereastră excelentă pentru ieșiri.',
    'prob.part': ', {prob}%',
    'summary.greeting': '🌅 <b>Bună dimineața!</b>',
    'summary.nowTemp': '🌡 Acum: <b>{t}</b>',
    'summary.todayRange': '📊 Astăzi: <b>{min}…{max}°C</b>',
    'summary.precipShort': '💧 Precipitații astăzi: {mm} mm',
    'block.precip.rain': '🌧 Ploaie: <b>{from}–{to}</b>',
    'block.precip.rainMax': ', până la {mm} mm/h',
    'block.precip.daySum': ' · {mm} mm/zi',
    'block.precip.possible': '🌧 Posibile precipitații ({mm} mm/zi)',
    'block.precip.noRain': '✓ Nu se așteaptă ploaie',
    'block.precip.snow': '❄ Ninsoare: <b>{from}–{to}</b>',
    'block.precip.noSnow': '✓ Nu se așteaptă ninsoare',
    'block.wind.calm': '🌬 Vânt: calm',
    'block.wind.main': '🌬 Vânt: până la <b>{ms} m/s</b>',
    'block.wind.gusts': ', rafale <b>{ms} m/s</b>',
    'block.feels.close': '🌡 Resimțită: apropiată de cea reală',
    'block.feels.range': '🌡 Resimțită: <b>{min}…{max}°C</b>',
    'block.astro.line': '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · zi {h}h {m}m',
    'block.fog.window': '🌫 Ceață: <b>{from}–{to}</b>',
    'block.fog.none': '✓ Nu se așteaptă ceață',
    'block.storm.window': '⛈ Posibilă furtună: <b>{from}–{to}</b>',
    'block.storm.none': '✓ Nu se așteaptă furtună',
    'block.tomorrow.line': '📊 Mâine: <b>{tStr}</b>, {label}, {precipStr}',
    'block.tomorrow.precip': '{mm} mm precipitații',
    'block.tomorrow.noPrecip': 'fără precipitații',
    'rule.tempBelow': '🥶 Temperatură sub {t}°C',
    'rule.tempAbove': '🥵 Temperatură peste {t}°C',
    'rule.rainSoon': '🌧 Ploaie în următoarele {h}h',
    'rule.precipSoon': '🌧 Precipitații în următoarele {h}h ({what})',
    'rule.precipWhat.rain': 'ploaie', 'rule.precipWhat.snow': 'ninsoare', 'rule.precipWhat.any': 'precipitații',
    'rule.storm': '⚡ Furtună în 48h',
    'rule.dryStreak': '☀ {n} {days} consecutive fără precipitații',
    'rule.morningSummary': '🌅 Rezumat de dimineață la {time}',
    'rule.morningSummary.withFlags': '🌅 Rezumat de dimineață la {time} (+ {flags})',
    'rule.flag.wind': 'vânt', 'rule.flag.precip': 'precipitații', 'rule.flag.fog': 'ceață',
    'rule.flag.astro': 'răsărit/apus', 'rule.flag.moon': 'lună', 'rule.flag.storm': 'furtună',
    'rule.flag.feels': 'resimțită', 'rule.flag.tomorrow': 'mâine',
    'cmd.start.welcomeBack': '👋 Bine ai revenit! Ești deja abonat{bannedNote}.\n\n📍 Locație: {loc}\n🔔 Reguli: {rules}\n\nTastează /help pentru a vedea comenzile.',
    'cmd.start.bannedNote': ', dar abonamentul tău este BLOCAT',
    'cmd.start.locUnset': 'nestabilită',
    'cmd.start.new': '🌤 Salut! Sunt botul <b>Meteo Star</b> — îți voi trimite notificări meteo.\n\n📍 Locație implicită: <b>Vysokyi</b> (regiunea Harkov).\n   Schimbă: <code>/location &lt;oraș&gt;</code>\n   Exemplu: <code>/location București</code>\n\n🔔 Regulile de notificare se configurează prin aplicația web.\n\n📋 Toate comenzile: /help',
    'cmd.start.groupHint': '👋 Salut! Într-un chat de grup folosește <code>/setup</code> (de către admin-ul grupului) pentru a conecta botul.',
    'cmd.help.user': '📋 <b>Comenzi Meteo Star Bot:</b>\n\n<code>/start</code> — abonare\n<code>/status</code> — abonamentul tău și regulile active\n<code>/location &lt;oraș&gt;</code> — schimbă locația\n<code>/pair &lt;cod&gt;</code> — conectează cu site-ul (cod din Setări)\n<code>/login</code> — link magic pentru autentificare pe orice dispozitiv\n<code>/unpair</code> — deconectează de la site\n<code>/stop</code> — dezabonare de la toate notificările\n<code>/help</code> — acest ajutor',
    'cmd.status.notSubscribed': 'Nu ești încă abonat. Trimite /start pentru a începe.',
    'cmd.status.banned': '🚫 Abonamentul tău a fost blocat de administrator.',
    'cmd.status.noRules': '   <i>(fără reguli, adaugă prin interfața web)</i>',
    'cmd.status.main': '📊 <b>Abonamentul tău:</b>\n\n📍 Locație: <b>{name}</b> ({lat}, {lon})\n🌐 Limbă: {lang}\n📅 Abonat: {date}\n\n🔔 <b>Reguli de notificare:</b>\n{rules}',
    'cmd.stop.notSubscribed': 'Nu ești abonat.',
    'cmd.stop.done': '✅ Dezabonat. Nu mai primești notificări.\n\nDacă vrei să revii — /start.',
    'cmd.location.usage': '📍 Specifică un oraș:\n<code>/location București</code>\n\nSau trimite coordonate în format:\n<code>/location 49.9 36.21</code>',
    'cmd.location.subscribeFirst': 'Abonează-te mai întâi — /start.',
    'cmd.location.setCoords': '📍 Coordonate setate: <b>{name}</b>',
    'cmd.location.notFound': '🤷 Nu am găsit orașul <b>{q}</b>. Încearcă numele complet sau coordonate: <code>/location 49.9 36.21</code>',
    'cmd.location.set': '📍 Locație actualizată: <b>{name}</b>\n   ({lat}, {lon})',
    'cmd.location.geocodeErr': '⚠ Eroare de geocodificare. Încearcă mai târziu sau introdu coordonatele manual.',
    'cmd.pair.usage': '🔗 Utilizare: <code>/pair 123456</code>\n\nObține mai întâi un cod de 6 cifre pe site: Setări → 🔔 Notificări → „Conectează cu Telegram".',
    'cmd.pair.groupOnlyAdmin': '🚫 Doar admin-ul grupului poate conecta site-ul într-un grup.',
    'cmd.pair.codeNotFound': '❌ Codul <code>{code}</code> nu a fost găsit sau a expirat (valabil 10 minute).\nCere unul nou pe site.',
    'cmd.pair.alreadyUsed': '⚠ Acest cod a fost deja folosit de un alt chat.',
    'cmd.pair.linked': '✅ <b>Conectat la site!</b>\n\nÎntoarce-te în browser — acum poți configura notificările.\n\nLocație: <b>{name}</b>\nPentru a schimba — <code>/location &lt;oraș&gt;</code>',
    'cmd.setup.privateHint': '💡 Comanda <code>/setup</code> este pentru chat-urile de grup.\nÎntr-un chat privat folosește <code>/start</code>.',
    'cmd.setup.onlyAdmin': '🚫 Doar admin-ul grupului poate rula /setup.',
    'cmd.setup.howTo': '📡 <b>Configurare grup:</b> {title}\n\n1. Deschide site-ul <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Setări → 🔔 Notificări → „Conectează cu Telegram"\n3. Obține un cod de 6 cifre\n4. Întoarce-te aici și scrie: <code>/pair &lt;cod&gt;</code>\n\nDupă conectare, configurează regulile pe site — notificările vin în acest chat.',
    'cmd.unpair.notSubscribed': 'Nu ești abonat.',
    'cmd.unpair.noLink': 'Niciun site conectat la acest chat.',
    'cmd.unpair.done': '🔓 Site deconectat ({n} dispozitiv(e) deconectate).\nAbonamentul și regulile sunt păstrate. Pentru a edita regulile — conectează din nou prin site.',
    'cmd.login.notSubscribed': 'Mai întâi /start (sau /pair dacă ai creat deja un cod pe site).',
    'cmd.login.onlyAdmin': '🚫 Doar admin-ul grupului poate obține un link de conectare.',
    'cmd.unknown': '🤖 Nu cunosc această comandă. Tastează /help — îți arăt ce pot.',
    'cmd.login.link': '🔗 <b>Link de conectare:</b>\n\n{url}\n\n<i>Deschide-l pe orice dispozitiv (iPhone, PC, laptop) — site-ul se va autentifica automat cu contul tău.\nValabil 10 minute, o singură utilizare.</i>'
  },
  hu: {
    'fired.cold': '❄️ <b>Lehűlés!</b>\n{name}: <b>{temp}°C</b>-ig {when}',
    'fired.heat': '🥵 <b>Hőség!</b>\n{name}: <b>{temp}°C</b>-ig {when}',
    'fired.rainSoon': '🌧 <b>Hamarosan eső!</b>\n{name}: {mm} mm{unit}{probPart} {when}',
    'fired.snowSoon': '🌨 <b>Hamarosan hó!</b>\n{name}: {mm} mm/h{probPart} {when}',
    'unit.mm15': '/15p', 'unit.mmh': '/h',
    'fired.storm': '⚡ <b>Zivatar várható!</b>\n{name}: {when}\nKövesd az előrejelzést és készülj fel.',
    'fired.dryStreak': '☀ <b>{n} {days} eső nélkül!</b>\n{name}: holnaptól {end}-ig — nagyszerű kiruccanásra.',
    'prob.part': ', {prob}%',
    'summary.greeting': '🌅 <b>Jó reggelt!</b>',
    'summary.nowTemp': '🌡 Most: <b>{t}</b>',
    'summary.todayRange': '📊 Ma: <b>{min}…{max}°C</b>',
    'summary.precipShort': '💧 Csapadék ma: {mm} mm',
    'block.precip.rain': '🌧 Eső: <b>{from}–{to}</b>',
    'block.precip.rainMax': ', {mm} mm/h-ig',
    'block.precip.daySum': ' · {mm} mm/nap',
    'block.precip.possible': '🌧 Csapadék lehetséges ({mm} mm/nap)',
    'block.precip.noRain': '✓ Nem várható eső',
    'block.precip.snow': '❄ Hó: <b>{from}–{to}</b>',
    'block.precip.noSnow': '✓ Nem várható hó',
    'block.wind.calm': '🌬 Szél: szélcsend',
    'block.wind.main': '🌬 Szél: <b>{ms} m/s</b>-ig',
    'block.wind.gusts': ', széllökések <b>{ms} m/s</b>',
    'block.feels.close': '🌡 Hőérzet: közel a valóshoz',
    'block.feels.range': '🌡 Hőérzet: <b>{min}…{max}°C</b>',
    'block.astro.line': '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · nap {h}ó {m}p',
    'block.fog.window': '🌫 Köd: <b>{from}–{to}</b>',
    'block.fog.none': '✓ Nem várható köd',
    'block.storm.window': '⛈ Lehetséges zivatar: <b>{from}–{to}</b>',
    'block.storm.none': '✓ Nem várható zivatar',
    'block.tomorrow.line': '📊 Holnap: <b>{tStr}</b>, {label}, {precipStr}',
    'block.tomorrow.precip': '{mm} mm csapadék',
    'block.tomorrow.noPrecip': 'csapadék nélkül',
    'rule.tempBelow': '🥶 Hőmérséklet {t}°C alatt',
    'rule.tempAbove': '🥵 Hőmérséklet {t}°C felett',
    'rule.rainSoon': '🌧 Eső a következő {h} órában',
    'rule.precipSoon': '🌧 Csapadék a következő {h} órában ({what})',
    'rule.precipWhat.rain': 'eső', 'rule.precipWhat.snow': 'hó', 'rule.precipWhat.any': 'csapadék',
    'rule.storm': '⚡ Zivatar 48 órán belül',
    'rule.dryStreak': '☀ {n} egymást követő {days} csapadék nélkül',
    'rule.morningSummary': '🌅 Reggeli összefoglaló {time}-kor',
    'rule.morningSummary.withFlags': '🌅 Reggeli összefoglaló {time}-kor (+ {flags})',
    'rule.flag.wind': 'szél', 'rule.flag.precip': 'csapadék', 'rule.flag.fog': 'köd',
    'rule.flag.astro': 'napkelte/napnyugta', 'rule.flag.moon': 'hold', 'rule.flag.storm': 'zivatar',
    'rule.flag.feels': 'hőérzet', 'rule.flag.tomorrow': 'holnap',
    'cmd.start.welcomeBack': '👋 Üdv újra! Már feliratkoztál{bannedNote}.\n\n📍 Hely: {loc}\n🔔 Szabályok: {rules}\n\nÍrd be /help a parancsokhoz.',
    'cmd.start.bannedNote': ', de az előfizetésed LE VAN TILTVA',
    'cmd.start.locUnset': 'nincs beállítva',
    'cmd.start.new': '🌤 Szia! Én a <b>Meteo Star</b> bot vagyok — időjárás-értesítéseket küldök neked.\n\n📍 Alapértelmezett hely: <b>Vysokyi</b> (Harkivi terület).\n   Módosítás: <code>/location &lt;város&gt;</code>\n   Példa: <code>/location Budapest</code>\n\n🔔 Az értesítési szabályokat a webalkalmazásban állíthatod be.\n\n📋 Összes parancs: /help',
    'cmd.start.groupHint': '👋 Szia! Csoportos csevegésben használd a <code>/setup</code>-ot (csoportadmin által) a bot összekapcsolásához.',
    'cmd.help.user': '📋 <b>Meteo Star Bot parancsok:</b>\n\n<code>/start</code> — feliratkozás\n<code>/status</code> — előfizetésed és aktív szabályok\n<code>/location &lt;város&gt;</code> — hely módosítása\n<code>/pair &lt;kód&gt;</code> — összekapcsolás a webhellyel (kód a Beállításokban)\n<code>/login</code> — magic-link bármely eszközről bejelentkezéshez\n<code>/unpair</code> — leválasztás a webhelyről\n<code>/stop</code> — leiratkozás minden értesítésről\n<code>/help</code> — ez a súgó',
    'cmd.status.notSubscribed': 'Még nem iratkoztál fel. Küldd a /start parancsot a kezdéshez.',
    'cmd.status.banned': '🚫 Az előfizetésedet az adminisztrátor letiltotta.',
    'cmd.status.noRules': '   <i>(nincsenek szabályok, add hozzá a webfelületen)</i>',
    'cmd.status.main': '📊 <b>Az előfizetésed:</b>\n\n📍 Hely: <b>{name}</b> ({lat}, {lon})\n🌐 Nyelv: {lang}\n📅 Feliratkozás: {date}\n\n🔔 <b>Értesítési szabályok:</b>\n{rules}',
    'cmd.stop.notSubscribed': 'Nem vagy feliratkozva.',
    'cmd.stop.done': '✅ Leiratkozva. Nem érkezik több értesítés.\n\nHa vissza akarsz térni — /start.',
    'cmd.location.usage': '📍 Adj meg egy várost:\n<code>/location Budapest</code>\n\nVagy küldj koordinátákat ebben a formában:\n<code>/location 49.9 36.21</code>',
    'cmd.location.subscribeFirst': 'Előbb iratkozz fel — /start.',
    'cmd.location.setCoords': '📍 Koordináták beállítva: <b>{name}</b>',
    'cmd.location.notFound': '🤷 Nem találtam a várost: <b>{q}</b>. Próbáld a teljes nevet vagy koordinátákat: <code>/location 49.9 36.21</code>',
    'cmd.location.set': '📍 Hely frissítve: <b>{name}</b>\n   ({lat}, {lon})',
    'cmd.location.geocodeErr': '⚠ Geokódolási hiba. Próbáld később, vagy adj meg koordinátákat kézzel.',
    'cmd.pair.usage': '🔗 Használat: <code>/pair 123456</code>\n\nElőbb szerezz egy 6 számjegyű kódot a webhelyen: Beállítások → 🔔 Értesítések → „Telegrammal való összekapcsolás".',
    'cmd.pair.groupOnlyAdmin': '🚫 Csak csoportadmin tudja összekapcsolni a webhelyet egy csoportban.',
    'cmd.pair.codeNotFound': '❌ A <code>{code}</code> kód nem található vagy lejárt (10 perces érvényesség).\nKérj újat a webhelyen.',
    'cmd.pair.alreadyUsed': '⚠ Ezt a kódot már egy másik chat felhasználta.',
    'cmd.pair.linked': '✅ <b>Webhelyhez kapcsolva!</b>\n\nTérj vissza a böngészőbe — most beállíthatod az értesítéseket.\n\nHely: <b>{name}</b>\nMódosításhoz — <code>/location &lt;város&gt;</code>',
    'cmd.setup.privateHint': '💡 A <code>/setup</code> parancs csoportos chatekhez való.\nPrivát chatben használd a <code>/start</code>-ot.',
    'cmd.setup.onlyAdmin': '🚫 Csak csoportadmin futtathatja a /setup parancsot.',
    'cmd.setup.howTo': '📡 <b>Csoport beállítása:</b> {title}\n\n1. Nyisd meg a webhelyet <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Beállítások → 🔔 Értesítések → „Telegrammal való összekapcsolás"\n3. Szerezz egy 6 számjegyű kódot\n4. Térj vissza ide és írd be: <code>/pair &lt;kód&gt;</code>\n\nÖsszekapcsolás után állítsd be a szabályokat a webhelyen — az értesítések ide érkeznek.',
    'cmd.unpair.notSubscribed': 'Nem vagy feliratkozva.',
    'cmd.unpair.noLink': 'Nincs webhely kapcsolva ehhez a chathez.',
    'cmd.unpair.done': '🔓 Webhely leválasztva ({n} eszköz leválasztva).\nAz előfizetés és a szabályok megmaradnak. A szabályok szerkesztéséhez — kapcsolódj újra a webhelyen.',
    'cmd.login.notSubscribed': 'Előbb /start (vagy /pair, ha már létrehoztál egy kódot a webhelyen).',
    'cmd.login.onlyAdmin': '🚫 Csak csoportadmin kaphat bejelentkezési linket.',
    'cmd.unknown': '🤖 Nem ismerem ezt a parancsot. Írd be a /help-et — megmutatom, mit tudok.',
    'cmd.login.link': '🔗 <b>Bejelentkezési link:</b>\n\n{url}\n\n<i>Nyisd meg bármely eszközön (iPhone, PC, laptop) — a webhely automatikusan bejelentkezik a fiókoddal.\n10 percig érvényes, egyszer használható.</i>'
  },
  sk: {
    'fired.cold': '❄️ <b>Ochladenie!</b>\n{name}: až na <b>{temp}°C</b> {when}',
    'fired.heat': '🥵 <b>Horúčava!</b>\n{name}: až na <b>{temp}°C</b> {when}',
    'fired.rainSoon': '🌧 <b>Čoskoro dážď!</b>\n{name}: {mm} mm{unit}{probPart} {when}',
    'fired.snowSoon': '🌨 <b>Čoskoro sneh!</b>\n{name}: {mm} mm/h{probPart} {when}',
    'unit.mm15': '/15min', 'unit.mmh': '/h',
    'fired.storm': '⚡ <b>Predpovedaná búrka!</b>\n{name}: {when}\nSleduj predpoveď a priprav sa.',
    'fired.dryStreak': '☀ <b>{n} {days} bez dažďa!</b>\n{name}: od zajtra do {end} — skvelé okno na výlet.',
    'prob.part': ', {prob}%',
    'summary.greeting': '🌅 <b>Dobré ráno!</b>',
    'summary.nowTemp': '🌡 Teraz: <b>{t}</b>',
    'summary.todayRange': '📊 Dnes: <b>{min}…{max}°C</b>',
    'summary.precipShort': '💧 Zrážky dnes: {mm} mm',
    'block.precip.rain': '🌧 Dážď: <b>{from}–{to}</b>',
    'block.precip.rainMax': ', až {mm} mm/h',
    'block.precip.daySum': ' · {mm} mm/deň',
    'block.precip.possible': '🌧 Možné zrážky ({mm} mm/deň)',
    'block.precip.noRain': '✓ Dážď sa neočakáva',
    'block.precip.snow': '❄ Sneh: <b>{from}–{to}</b>',
    'block.precip.noSnow': '✓ Sneh sa neočakáva',
    'block.wind.calm': '🌬 Vietor: bezvetrie',
    'block.wind.main': '🌬 Vietor: do <b>{ms} m/s</b>',
    'block.wind.gusts': ', nárazy <b>{ms} m/s</b>',
    'block.feels.close': '🌡 Pocitovo: blízko skutočnej',
    'block.feels.range': '🌡 Pocitovo: <b>{min}…{max}°C</b>',
    'block.astro.line': '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · deň {h}h {m}m',
    'block.fog.window': '🌫 Hmla: <b>{from}–{to}</b>',
    'block.fog.none': '✓ Hmla sa neočakáva',
    'block.storm.window': '⛈ Možná búrka: <b>{from}–{to}</b>',
    'block.storm.none': '✓ Búrka sa neočakáva',
    'block.tomorrow.line': '📊 Zajtra: <b>{tStr}</b>, {label}, {precipStr}',
    'block.tomorrow.precip': '{mm} mm zrážok',
    'block.tomorrow.noPrecip': 'bez zrážok',
    'rule.tempBelow': '🥶 Teplota pod {t}°C',
    'rule.tempAbove': '🥵 Teplota nad {t}°C',
    'rule.rainSoon': '🌧 Dážď v nasledujúcich {h}h',
    'rule.precipSoon': '🌧 Zrážky v nasledujúcich {h}h ({what})',
    'rule.precipWhat.rain': 'dážď', 'rule.precipWhat.snow': 'sneh', 'rule.precipWhat.any': 'zrážky',
    'rule.storm': '⚡ Búrka v 48h',
    'rule.dryStreak': '☀ {n} {days} po sebe bez zrážok',
    'rule.morningSummary': '🌅 Ranný súhrn o {time}',
    'rule.morningSummary.withFlags': '🌅 Ranný súhrn o {time} (+ {flags})',
    'rule.flag.wind': 'vietor', 'rule.flag.precip': 'zrážky', 'rule.flag.fog': 'hmla',
    'rule.flag.astro': 'východ/západ', 'rule.flag.moon': 'mesiac', 'rule.flag.storm': 'búrka',
    'rule.flag.feels': 'pocitovo', 'rule.flag.tomorrow': 'zajtra',
    'cmd.start.welcomeBack': '👋 Vitaj späť! Už si prihlásený{bannedNote}.\n\n📍 Miesto: {loc}\n🔔 Pravidiel: {rules}\n\nNapíš /help pre zoznam príkazov.',
    'cmd.start.bannedNote': ', ale tvoje predplatné je ZABLOKOVANÉ',
    'cmd.start.locUnset': 'nenastavené',
    'cmd.start.new': '🌤 Ahoj! Som bot <b>Meteo Star</b> — budem ti posielať upozornenia o počasí.\n\n📍 Predvolené miesto: <b>Vysokyi</b> (Charkovská oblasť).\n   Zmena: <code>/location &lt;mesto&gt;</code>\n   Príklad: <code>/location Bratislava</code>\n\n🔔 Pravidlá upozornení sa nastavujú cez webovú aplikáciu.\n\n📋 Všetky príkazy: /help',
    'cmd.start.groupHint': '👋 Ahoj! V skupinovom chate použi <code>/setup</code> (od správcu skupiny) na pripojenie bota.',
    'cmd.help.user': '📋 <b>Príkazy Meteo Star Bot:</b>\n\n<code>/start</code> — prihlásiť sa\n<code>/status</code> — tvoje predplatné a aktívne pravidlá\n<code>/location &lt;mesto&gt;</code> — zmeniť polohu\n<code>/pair &lt;kód&gt;</code> — prepojiť so stránkou (kód v Nastaveniach)\n<code>/login</code> — magic-link pre prihlásenie na akomkoľvek zariadení\n<code>/unpair</code> — odpojiť od stránky\n<code>/stop</code> — odhlásiť zo všetkých upozornení\n<code>/help</code> — táto pomoc',
    'cmd.status.notSubscribed': 'Ešte nie si prihlásený. Pošli /start na začatie.',
    'cmd.status.banned': '🚫 Tvoje predplatné bolo zablokované administrátorom.',
    'cmd.status.noRules': '   <i>(žiadne pravidlá, pridaj cez webové rozhranie)</i>',
    'cmd.status.main': '📊 <b>Tvoje predplatné:</b>\n\n📍 Miesto: <b>{name}</b> ({lat}, {lon})\n🌐 Jazyk: {lang}\n📅 Prihlásený: {date}\n\n🔔 <b>Pravidlá upozornení:</b>\n{rules}',
    'cmd.stop.notSubscribed': 'Nie si prihlásený.',
    'cmd.stop.done': '✅ Odhlásený. Žiadne ďalšie upozornenia.\n\nAk sa budeš chcieť vrátiť — /start.',
    'cmd.location.usage': '📍 Zadaj mesto:\n<code>/location Bratislava</code>\n\nAlebo pošli súradnice vo formáte:\n<code>/location 49.9 36.21</code>',
    'cmd.location.subscribeFirst': 'Najprv sa prihlás — /start.',
    'cmd.location.setCoords': '📍 Súradnice nastavené: <b>{name}</b>',
    'cmd.location.notFound': '🤷 Mesto <b>{q}</b> som nenašiel. Skús celý názov alebo súradnice: <code>/location 49.9 36.21</code>',
    'cmd.location.set': '📍 Poloha aktualizovaná: <b>{name}</b>\n   ({lat}, {lon})',
    'cmd.location.geocodeErr': '⚠ Chyba geokódovania. Skús to neskôr alebo zadaj súradnice ručne.',
    'cmd.pair.usage': '🔗 Použitie: <code>/pair 123456</code>\n\nNajprv získaj 6-miestny kód na webe: Nastavenia → 🔔 Upozornenia → „Prepojiť s Telegramom".',
    'cmd.pair.groupOnlyAdmin': '🚫 Len správca skupiny môže prepojiť web v skupine.',
    'cmd.pair.codeNotFound': '❌ Kód <code>{code}</code> nebol nájdený alebo vypršal (platnosť 10 minút).\nVyžiadaj si nový na webe.',
    'cmd.pair.alreadyUsed': '⚠ Tento kód už použil iný chat.',
    'cmd.pair.linked': '✅ <b>Prepojené s webom!</b>\n\nVráť sa do prehliadača — teraz môžeš nastaviť upozornenia.\n\nMiesto: <b>{name}</b>\nNa zmenu — <code>/location &lt;mesto&gt;</code>',
    'cmd.setup.privateHint': '💡 Príkaz <code>/setup</code> je pre skupinové chaty.\nV súkromnom chate použi <code>/start</code>.',
    'cmd.setup.onlyAdmin': '🚫 /setup môže spustiť len správca skupiny.',
    'cmd.setup.howTo': '📡 <b>Nastavenie skupiny:</b> {title}\n\n1. Otvor web <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Nastavenia → 🔔 Upozornenia → „Prepojiť s Telegramom"\n3. Získaj 6-miestny kód\n4. Vráť sa sem a napíš: <code>/pair &lt;kód&gt;</code>\n\nPo prepojení nastav pravidlá na webe — upozornenia chodia do tohto chatu.',
    'cmd.unpair.notSubscribed': 'Nie si prihlásený.',
    'cmd.unpair.noLink': 'K tomuto chatu nie je pripojený žiadny web.',
    'cmd.unpair.done': '🔓 Web odpojený (odpojené {n} zariadenia).\nPredplatné aj pravidlá zostávajú. Na úpravu pravidiel — prepoj znova cez web.',
    'cmd.login.notSubscribed': 'Najprv /start (alebo /pair, ak si už vytvoril kód na webe).',
    'cmd.login.onlyAdmin': '🚫 Len správca skupiny môže získať prihlasovací odkaz.',
    'cmd.unknown': '🤖 Tento príkaz nepoznám. Napíš /help — ukážem, čo viem.',
    'cmd.login.link': '🔗 <b>Prihlasovací odkaz:</b>\n\n{url}\n\n<i>Otvor ho na akomkoľvek zariadení (iPhone, PC, notebook) — web sa sám prihlási s tvojím účtom.\nPlatí 10 minút, jednorazové použitie.</i>'
  },
  pt: {
    'fired.cold': '❄️ <b>Frente fria!</b>\n{name}: até <b>{temp}°C</b> {when}',
    'fired.heat': '🥵 <b>Calor!</b>\n{name}: até <b>{temp}°C</b> {when}',
    'fired.rainSoon': '🌧 <b>Chuva em breve!</b>\n{name}: {mm} mm{unit}{probPart} {when}',
    'fired.snowSoon': '🌨 <b>Neve em breve!</b>\n{name}: {mm} mm/h{probPart} {when}',
    'unit.mm15': '/15min', 'unit.mmh': '/h',
    'fired.storm': '⚡ <b>Trovoada prevista!</b>\n{name}: {when}\nAcompanhe a previsão e prepare-se.',
    'fired.dryStreak': '☀ <b>{n} {days} sem chuva!</b>\n{name}: de amanhã até {end} — ótima janela para passeios.',
    'prob.part': ', {prob}%',
    'summary.greeting': '🌅 <b>Bom dia!</b>',
    'summary.nowTemp': '🌡 Agora: <b>{t}</b>',
    'summary.todayRange': '📊 Hoje: <b>{min}…{max}°C</b>',
    'summary.precipShort': '💧 Precipitação hoje: {mm} mm',
    'block.precip.rain': '🌧 Chuva: <b>{from}–{to}</b>',
    'block.precip.rainMax': ', até {mm} mm/h',
    'block.precip.daySum': ' · {mm} mm/dia',
    'block.precip.possible': '🌧 Possível precipitação ({mm} mm/dia)',
    'block.precip.noRain': '✓ Sem chuva prevista',
    'block.precip.snow': '❄ Neve: <b>{from}–{to}</b>',
    'block.precip.noSnow': '✓ Sem neve prevista',
    'block.wind.calm': '🌬 Vento: calmo',
    'block.wind.main': '🌬 Vento: até <b>{ms} m/s</b>',
    'block.wind.gusts': ', rajadas <b>{ms} m/s</b>',
    'block.feels.close': '🌡 Sensação: próxima da real',
    'block.feels.range': '🌡 Sensação: <b>{min}…{max}°C</b>',
    'block.astro.line': '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · dia {h}h {m}m',
    'block.fog.window': '🌫 Nevoeiro: <b>{from}–{to}</b>',
    'block.fog.none': '✓ Sem nevoeiro previsto',
    'block.storm.window': '⛈ Trovoada possível: <b>{from}–{to}</b>',
    'block.storm.none': '✓ Sem trovoada prevista',
    'block.tomorrow.line': '📊 Amanhã: <b>{tStr}</b>, {label}, {precipStr}',
    'block.tomorrow.precip': '{mm} mm de precipitação',
    'block.tomorrow.noPrecip': 'sem precipitação',
    'rule.tempBelow': '🥶 Temperatura abaixo de {t}°C',
    'rule.tempAbove': '🥵 Temperatura acima de {t}°C',
    'rule.rainSoon': '🌧 Chuva nas próximas {h}h',
    'rule.precipSoon': '🌧 Precipitação nas próximas {h}h ({what})',
    'rule.precipWhat.rain': 'chuva', 'rule.precipWhat.snow': 'neve', 'rule.precipWhat.any': 'precipitação',
    'rule.storm': '⚡ Trovoada em 48h',
    'rule.dryStreak': '☀ {n} {days} seguidos sem precipitação',
    'rule.morningSummary': '🌅 Resumo matinal às {time}',
    'rule.morningSummary.withFlags': '🌅 Resumo matinal às {time} (+ {flags})',
    'rule.flag.wind': 'vento', 'rule.flag.precip': 'precipitação', 'rule.flag.fog': 'nevoeiro',
    'rule.flag.astro': 'nascer/pôr-do-sol', 'rule.flag.moon': 'lua', 'rule.flag.storm': 'trovoada',
    'rule.flag.feels': 'sensação', 'rule.flag.tomorrow': 'amanhã',
    'cmd.start.welcomeBack': '👋 Bem-vindo de volta! Já estás inscrito{bannedNote}.\n\n📍 Localização: {loc}\n🔔 Regras: {rules}\n\nEscreve /help para ver os comandos.',
    'cmd.start.bannedNote': ', mas a tua subscrição está BLOQUEADA',
    'cmd.start.locUnset': 'não definida',
    'cmd.start.new': '🌤 Olá! Sou o bot <b>Meteo Star</b> — enviarei notificações meteo.\n\n📍 Localização padrão: <b>Vysokyi</b> (região de Kharkiv).\n   Mudar: <code>/location &lt;cidade&gt;</code>\n   Exemplo: <code>/location Lisboa</code>\n\n🔔 As regras de notificação configuram-se na aplicação web.\n\n📋 Todos os comandos: /help',
    'cmd.start.groupHint': '👋 Olá! Num chat de grupo, usa <code>/setup</code> (de um admin do grupo) para conectar o bot.',
    'cmd.help.user': '📋 <b>Comandos Meteo Star Bot:</b>\n\n<code>/start</code> — subscrever\n<code>/status</code> — a tua subscrição e regras ativas\n<code>/location &lt;cidade&gt;</code> — mudar localização\n<code>/pair &lt;código&gt;</code> — ligar ao site (código nas Definições)\n<code>/login</code> — link mágico para entrar em qualquer dispositivo\n<code>/unpair</code> — desligar do site\n<code>/stop</code> — anular todas as notificações\n<code>/help</code> — esta ajuda',
    'cmd.status.notSubscribed': 'Ainda não estás inscrito. Envia /start para começar.',
    'cmd.status.banned': '🚫 A tua subscrição foi bloqueada pelo administrador.',
    'cmd.status.noRules': '   <i>(sem regras, adiciona pela interface web)</i>',
    'cmd.status.main': '📊 <b>A tua subscrição:</b>\n\n📍 Localização: <b>{name}</b> ({lat}, {lon})\n🌐 Idioma: {lang}\n📅 Inscrito: {date}\n\n🔔 <b>Regras de notificação:</b>\n{rules}',
    'cmd.stop.notSubscribed': 'Não estás inscrito.',
    'cmd.stop.done': '✅ Sem subscrição. Sem mais notificações.\n\nSe quiseres voltar — /start.',
    'cmd.location.usage': '📍 Indica uma cidade:\n<code>/location Lisboa</code>\n\nOu envia coordenadas no formato:\n<code>/location 49.9 36.21</code>',
    'cmd.location.subscribeFirst': 'Subscreve primeiro — /start.',
    'cmd.location.setCoords': '📍 Coordenadas definidas: <b>{name}</b>',
    'cmd.location.notFound': '🤷 Não encontrei a cidade <b>{q}</b>. Tenta o nome completo ou coordenadas: <code>/location 49.9 36.21</code>',
    'cmd.location.set': '📍 Localização atualizada: <b>{name}</b>\n   ({lat}, {lon})',
    'cmd.location.geocodeErr': '⚠ Erro de geocodificação. Tenta mais tarde ou indica coordenadas manualmente.',
    'cmd.pair.usage': '🔗 Uso: <code>/pair 123456</code>\n\nObtém primeiro um código de 6 dígitos no site: Definições → 🔔 Notificações → „Ligar ao Telegram".',
    'cmd.pair.groupOnlyAdmin': '🚫 Apenas um admin do grupo pode ligar o site num grupo.',
    'cmd.pair.codeNotFound': '❌ Código <code>{code}</code> não encontrado ou expirado (válido 10 minutos).\nPede um novo no site.',
    'cmd.pair.alreadyUsed': '⚠ Este código já foi usado por outro chat.',
    'cmd.pair.linked': '✅ <b>Ligado ao site!</b>\n\nRegressa ao browser — agora podes configurar as notificações.\n\nLocalização: <b>{name}</b>\nPara mudar — <code>/location &lt;cidade&gt;</code>',
    'cmd.setup.privateHint': '💡 O comando <code>/setup</code> é para chats de grupo.\nEm chat privado, usa <code>/start</code>.',
    'cmd.setup.onlyAdmin': '🚫 Apenas um admin do grupo pode executar /setup.',
    'cmd.setup.howTo': '📡 <b>Configuração do grupo:</b> {title}\n\n1. Abre o site <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Definições → 🔔 Notificações → „Ligar ao Telegram"\n3. Obtém um código de 6 dígitos\n4. Regressa aqui e escreve: <code>/pair &lt;código&gt;</code>\n\nApós a ligação, configura as regras no site — as notificações chegam a este chat.',
    'cmd.unpair.notSubscribed': 'Não estás inscrito.',
    'cmd.unpair.noLink': 'Nenhum site ligado a este chat.',
    'cmd.unpair.done': '🔓 Site desligado ({n} dispositivo(s) desligado(s)).\nSubscrição e regras mantêm-se. Para editar regras — liga novamente pelo site.',
    'cmd.login.notSubscribed': 'Primeiro /start (ou /pair se já criaste um código no site).',
    'cmd.login.onlyAdmin': '🚫 Apenas um admin do grupo pode obter link de entrada.',
    'cmd.unknown': '🤖 Não conheço esse comando. Escreve /help — mostro o que sei fazer.',
    'cmd.login.link': '🔗 <b>Link de início de sessão:</b>\n\n{url}\n\n<i>Abre-o em qualquer dispositivo (iPhone, PC, portátil) — o site fará o login automaticamente.\nVálido 10 minutos, uso único.</i>'
  },
  nl: {
    'fired.cold': '❄️ <b>Koude inval!</b>\n{name}: tot <b>{temp}°C</b> {when}',
    'fired.heat': '🥵 <b>Hitte!</b>\n{name}: tot <b>{temp}°C</b> {when}',
    'fired.rainSoon': '🌧 <b>Binnenkort regen!</b>\n{name}: {mm} mm{unit}{probPart} {when}',
    'fired.snowSoon': '🌨 <b>Binnenkort sneeuw!</b>\n{name}: {mm} mm/h{probPart} {when}',
    'unit.mm15': '/15min', 'unit.mmh': '/u',
    'fired.storm': '⚡ <b>Onweer voorspeld!</b>\n{name}: {when}\nVolg de voorspelling en bereid je voor.',
    'fired.dryStreak': '☀ <b>{n} {days} zonder regen!</b>\n{name}: van morgen tot {end} — uitstekend voor uitstapjes.',
    'prob.part': ', {prob}%',
    'summary.greeting': '🌅 <b>Goedemorgen!</b>',
    'summary.nowTemp': '🌡 Nu: <b>{t}</b>',
    'summary.todayRange': '📊 Vandaag: <b>{min}…{max}°C</b>',
    'summary.precipShort': '💧 Neerslag vandaag: {mm} mm',
    'block.precip.rain': '🌧 Regen: <b>{from}–{to}</b>',
    'block.precip.rainMax': ', tot {mm} mm/u',
    'block.precip.daySum': ' · {mm} mm/dag',
    'block.precip.possible': '🌧 Mogelijke neerslag ({mm} mm/dag)',
    'block.precip.noRain': '✓ Geen regen verwacht',
    'block.precip.snow': '❄ Sneeuw: <b>{from}–{to}</b>',
    'block.precip.noSnow': '✓ Geen sneeuw verwacht',
    'block.wind.calm': '🌬 Wind: windstil',
    'block.wind.main': '🌬 Wind: tot <b>{ms} m/s</b>',
    'block.wind.gusts': ', windstoten <b>{ms} m/s</b>',
    'block.feels.close': '🌡 Gevoelstemperatuur: dicht bij werkelijk',
    'block.feels.range': '🌡 Gevoelstemperatuur: <b>{min}…{max}°C</b>',
    'block.astro.line': '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · dag {h}u {m}m',
    'block.fog.window': '🌫 Mist: <b>{from}–{to}</b>',
    'block.fog.none': '✓ Geen mist verwacht',
    'block.storm.window': '⛈ Onweer mogelijk: <b>{from}–{to}</b>',
    'block.storm.none': '✓ Geen onweer verwacht',
    'block.tomorrow.line': '📊 Morgen: <b>{tStr}</b>, {label}, {precipStr}',
    'block.tomorrow.precip': '{mm} mm neerslag',
    'block.tomorrow.noPrecip': 'zonder neerslag',
    'rule.tempBelow': '🥶 Temperatuur onder {t}°C',
    'rule.tempAbove': '🥵 Temperatuur boven {t}°C',
    'rule.rainSoon': '🌧 Regen binnen {h}u',
    'rule.precipSoon': '🌧 Neerslag binnen {h}u ({what})',
    'rule.precipWhat.rain': 'regen', 'rule.precipWhat.snow': 'sneeuw', 'rule.precipWhat.any': 'neerslag',
    'rule.storm': '⚡ Onweer binnen 48u',
    'rule.dryStreak': '☀ {n} {days} achter elkaar zonder neerslag',
    'rule.morningSummary': '🌅 Ochtendoverzicht om {time}',
    'rule.morningSummary.withFlags': '🌅 Ochtendoverzicht om {time} (+ {flags})',
    'rule.flag.wind': 'wind', 'rule.flag.precip': 'neerslag', 'rule.flag.fog': 'mist',
    'rule.flag.astro': 'opkomst/ondergang', 'rule.flag.moon': 'maan', 'rule.flag.storm': 'onweer',
    'rule.flag.feels': 'gevoel', 'rule.flag.tomorrow': 'morgen',
    'cmd.start.welcomeBack': '👋 Welkom terug! Je bent al ingeschreven{bannedNote}.\n\n📍 Locatie: {loc}\n🔔 Regels: {rules}\n\nTyp /help om de commando\'s te zien.',
    'cmd.start.bannedNote': ', maar je abonnement is GEBLOKKEERD',
    'cmd.start.locUnset': 'niet ingesteld',
    'cmd.start.new': '🌤 Hallo! Ik ben de <b>Meteo Star</b>-bot — ik stuur je weerberichten.\n\n📍 Standaardlocatie: <b>Vysokyi</b> (regio Charkov).\n   Wijzigen: <code>/location &lt;stad&gt;</code>\n   Voorbeeld: <code>/location Amsterdam</code>\n\n🔔 Meldingsregels stel je in via de webapp.\n\n📋 Alle commando\'s: /help',
    'cmd.start.groupHint': '👋 Hallo! In een groepschat gebruik <code>/setup</code> (door een groepsbeheerder) om de bot te koppelen.',
    'cmd.help.user': '📋 <b>Meteo Star Bot-commando\'s:</b>\n\n<code>/start</code> — abonneren\n<code>/status</code> — je abonnement en actieve regels\n<code>/location &lt;stad&gt;</code> — locatie wijzigen\n<code>/pair &lt;code&gt;</code> — koppelen aan de website (code in Instellingen)\n<code>/login</code> — magic-link om op elk apparaat in te loggen\n<code>/unpair</code> — ontkoppelen van de website\n<code>/stop</code> — uitschrijven voor alle meldingen\n<code>/help</code> — deze hulp',
    'cmd.status.notSubscribed': 'Je bent nog niet geabonneerd. Stuur /start om te beginnen.',
    'cmd.status.banned': '🚫 Je abonnement is geblokkeerd door de beheerder.',
    'cmd.status.noRules': '   <i>(geen regels, voeg toe via de webinterface)</i>',
    'cmd.status.main': '📊 <b>Je abonnement:</b>\n\n📍 Locatie: <b>{name}</b> ({lat}, {lon})\n🌐 Taal: {lang}\n📅 Geabonneerd: {date}\n\n🔔 <b>Meldingsregels:</b>\n{rules}',
    'cmd.stop.notSubscribed': 'Je bent niet geabonneerd.',
    'cmd.stop.done': '✅ Uitgeschreven. Geen meldingen meer.\n\nWil je terugkomen — /start.',
    'cmd.location.usage': '📍 Geef een stad op:\n<code>/location Amsterdam</code>\n\nOf stuur coördinaten in dit formaat:\n<code>/location 49.9 36.21</code>',
    'cmd.location.subscribeFirst': 'Schrijf je eerst in — /start.',
    'cmd.location.setCoords': '📍 Coördinaten ingesteld: <b>{name}</b>',
    'cmd.location.notFound': '🤷 Stad <b>{q}</b> niet gevonden. Probeer de volledige naam of coördinaten: <code>/location 49.9 36.21</code>',
    'cmd.location.set': '📍 Locatie bijgewerkt: <b>{name}</b>\n   ({lat}, {lon})',
    'cmd.location.geocodeErr': '⚠ Geocodeerfout. Probeer later of geef coördinaten handmatig op.',
    'cmd.pair.usage': '🔗 Gebruik: <code>/pair 123456</code>\n\nHaal eerst een 6-cijferige code op de website: Instellingen → 🔔 Meldingen → „Koppelen met Telegram".',
    'cmd.pair.groupOnlyAdmin': '🚫 Alleen een groepsbeheerder kan de site in een groep koppelen.',
    'cmd.pair.codeNotFound': '❌ Code <code>{code}</code> niet gevonden of verlopen (10 minuten geldig).\nVraag een nieuwe op de site.',
    'cmd.pair.alreadyUsed': '⚠ Deze code is al door een andere chat gebruikt.',
    'cmd.pair.linked': '✅ <b>Gekoppeld aan de site!</b>\n\nGa terug naar de browser — je kunt nu meldingen instellen.\n\nLocatie: <b>{name}</b>\nOm te wijzigen — <code>/location &lt;stad&gt;</code>',
    'cmd.setup.privateHint': '💡 Het commando <code>/setup</code> is voor groepschats.\nIn een privéchat gebruik <code>/start</code>.',
    'cmd.setup.onlyAdmin': '🚫 Alleen een groepsbeheerder kan /setup uitvoeren.',
    'cmd.setup.howTo': '📡 <b>Groep instellen:</b> {title}\n\n1. Open de site <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Instellingen → 🔔 Meldingen → „Koppelen met Telegram"\n3. Krijg een 6-cijferige code\n4. Kom terug en schrijf: <code>/pair &lt;code&gt;</code>\n\nNa koppeling stel regels in op de site — meldingen komen in deze chat.',
    'cmd.unpair.notSubscribed': 'Je bent niet geabonneerd.',
    'cmd.unpair.noLink': 'Geen site gekoppeld aan deze chat.',
    'cmd.unpair.done': '🔓 Site ontkoppeld ({n} apparaat/apparaten ontkoppeld).\nAbonnement en regels blijven behouden. Om regels te bewerken — koppel opnieuw via de site.',
    'cmd.login.notSubscribed': 'Eerst /start (of /pair als je al een code op de site hebt aangemaakt).',
    'cmd.login.onlyAdmin': '🚫 Alleen een groepsbeheerder kan een login-link krijgen.',
    'cmd.unknown': '🤖 Ik ken dat commando niet. Typ /help — ik laat zien wat ik kan.',
    'cmd.login.link': '🔗 <b>Login-link:</b>\n\n{url}\n\n<i>Open hem op een willekeurig apparaat (iPhone, PC, laptop) — de site logt automatisch in met je account.\n10 minuten geldig, eenmalig gebruik.</i>'
  },
  tr: {
    'fired.cold': '❄️ <b>Soğuk dalgası!</b>\n{name}: <b>{temp}°C</b>\'ye kadar {when}',
    'fired.heat': '🥵 <b>Sıcak!</b>\n{name}: <b>{temp}°C</b>\'ye kadar {when}',
    'fired.rainSoon': '🌧 <b>Yakında yağmur!</b>\n{name}: {mm} mm{unit}{probPart} {when}',
    'fired.snowSoon': '🌨 <b>Yakında kar!</b>\n{name}: {mm} mm/h{probPart} {when}',
    'unit.mm15': '/15dk', 'unit.mmh': '/sa',
    'fired.storm': '⚡ <b>Fırtına bekleniyor!</b>\n{name}: {when}\nTahmini takip et ve hazırlan.',
    'fired.dryStreak': '☀ <b>{n} {days} yağmursuz!</b>\n{name}: yarından {end}\'e kadar — dışarı çıkmak için harika fırsat.',
    'prob.part': ', %{prob}',
    'summary.greeting': '🌅 <b>Günaydın!</b>',
    'summary.nowTemp': '🌡 Şimdi: <b>{t}</b>',
    'summary.todayRange': '📊 Bugün: <b>{min}…{max}°C</b>',
    'summary.precipShort': '💧 Bugün yağış: {mm} mm',
    'block.precip.rain': '🌧 Yağmur: <b>{from}–{to}</b>',
    'block.precip.rainMax': ', {mm} mm/sa\'e kadar',
    'block.precip.daySum': ' · {mm} mm/gün',
    'block.precip.possible': '🌧 Olası yağış ({mm} mm/gün)',
    'block.precip.noRain': '✓ Yağmur beklenmiyor',
    'block.precip.snow': '❄ Kar: <b>{from}–{to}</b>',
    'block.precip.noSnow': '✓ Kar beklenmiyor',
    'block.wind.calm': '🌬 Rüzgar: sakin',
    'block.wind.main': '🌬 Rüzgar: <b>{ms} m/s</b>\'ye kadar',
    'block.wind.gusts': ', hamleler <b>{ms} m/s</b>',
    'block.feels.close': '🌡 Hissedilen: gerçeğe yakın',
    'block.feels.range': '🌡 Hissedilen: <b>{min}…{max}°C</b>',
    'block.astro.line': '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · gün {h}sa {m}dk',
    'block.fog.window': '🌫 Sis: <b>{from}–{to}</b>',
    'block.fog.none': '✓ Sis beklenmiyor',
    'block.storm.window': '⛈ Olası fırtına: <b>{from}–{to}</b>',
    'block.storm.none': '✓ Fırtına beklenmiyor',
    'block.tomorrow.line': '📊 Yarın: <b>{tStr}</b>, {label}, {precipStr}',
    'block.tomorrow.precip': '{mm} mm yağış',
    'block.tomorrow.noPrecip': 'yağış yok',
    'rule.tempBelow': '🥶 Sıcaklık {t}°C altında',
    'rule.tempAbove': '🥵 Sıcaklık {t}°C üzerinde',
    'rule.rainSoon': '🌧 Önümüzdeki {h} saatte yağmur',
    'rule.precipSoon': '🌧 Önümüzdeki {h} saatte yağış ({what})',
    'rule.precipWhat.rain': 'yağmur', 'rule.precipWhat.snow': 'kar', 'rule.precipWhat.any': 'yağış',
    'rule.storm': '⚡ 48 saat içinde fırtına',
    'rule.dryStreak': '☀ Üst üste {n} {days} yağışsız',
    'rule.morningSummary': '🌅 Sabah özeti {time}\'da',
    'rule.morningSummary.withFlags': '🌅 Sabah özeti {time}\'da (+ {flags})',
    'rule.flag.wind': 'rüzgar', 'rule.flag.precip': 'yağış', 'rule.flag.fog': 'sis',
    'rule.flag.astro': 'gündoğumu/günbatımı', 'rule.flag.moon': 'ay', 'rule.flag.storm': 'fırtına',
    'rule.flag.feels': 'hissedilen', 'rule.flag.tomorrow': 'yarın',
    'cmd.start.welcomeBack': '👋 Tekrar hoş geldin! Zaten aboneyim{bannedNote}.\n\n📍 Konum: {loc}\n🔔 Kural sayısı: {rules}\n\nKomutları görmek için /help yaz.',
    'cmd.start.bannedNote': ', ancak aboneliğin ENGELLENMİŞ durumda',
    'cmd.start.locUnset': 'ayarlanmadı',
    'cmd.start.new': '🌤 Merhaba! Ben <b>Meteo Star</b> botuyum — sana hava durumu bildirimleri göndereceğim.\n\n📍 Varsayılan konum: <b>Vysokyi</b> (Harkov bölgesi).\n   Değiştir: <code>/location &lt;şehir&gt;</code>\n   Örnek: <code>/location İstanbul</code>\n\n🔔 Bildirim kurallarını web uygulamasından ayarlayabilirsin.\n\n📋 Tüm komutlar: /help',
    'cmd.start.groupHint': '👋 Merhaba! Bir grup sohbetinde botu bağlamak için <code>/setup</code> (grup yöneticisinden) kullan.',
    'cmd.help.user': '📋 <b>Meteo Star Bot komutları:</b>\n\n<code>/start</code> — abone ol\n<code>/status</code> — aboneliğin ve aktif kurallar\n<code>/location &lt;şehir&gt;</code> — konumu değiştir\n<code>/pair &lt;kod&gt;</code> — siteye bağla (kod Ayarlar\'dan)\n<code>/login</code> — herhangi bir cihazdan giriş için sihirli bağlantı\n<code>/unpair</code> — siteden ayır\n<code>/stop</code> — tüm bildirimlerden çık\n<code>/help</code> — bu yardım',
    'cmd.status.notSubscribed': 'Henüz abone değilsin. Başlamak için /start gönder.',
    'cmd.status.banned': '🚫 Aboneliğin yönetici tarafından engellendi.',
    'cmd.status.noRules': '   <i>(kural yok, web arayüzünden ekle)</i>',
    'cmd.status.main': '📊 <b>Aboneliğin:</b>\n\n📍 Konum: <b>{name}</b> ({lat}, {lon})\n🌐 Dil: {lang}\n📅 Abone olma: {date}\n\n🔔 <b>Bildirim kuralları:</b>\n{rules}',
    'cmd.stop.notSubscribed': 'Abone değilsin.',
    'cmd.stop.done': '✅ Abonelik iptal edildi. Artık bildirim gelmeyecek.\n\nGeri dönmek istersen — /start.',
    'cmd.location.usage': '📍 Bir şehir belirt:\n<code>/location İstanbul</code>\n\nVeya şu formatta koordinat gönder:\n<code>/location 49.9 36.21</code>',
    'cmd.location.subscribeFirst': 'Önce abone ol — /start.',
    'cmd.location.setCoords': '📍 Koordinatlar ayarlandı: <b>{name}</b>',
    'cmd.location.notFound': '🤷 <b>{q}</b> şehrini bulamadım. Tam adı veya koordinatları dene: <code>/location 49.9 36.21</code>',
    'cmd.location.set': '📍 Konum güncellendi: <b>{name}</b>\n   ({lat}, {lon})',
    'cmd.location.geocodeErr': '⚠ Konum kodlama hatası. Daha sonra dene veya koordinatları elle gir.',
    'cmd.pair.usage': '🔗 Kullanım: <code>/pair 123456</code>\n\nÖnce sitede 6 haneli bir kod al: Ayarlar → 🔔 Bildirimler → „Telegram\'a bağla".',
    'cmd.pair.groupOnlyAdmin': '🚫 Bir grupta siteyi yalnızca grup yöneticisi bağlayabilir.',
    'cmd.pair.codeNotFound': '❌ <code>{code}</code> kodu bulunamadı veya süresi doldu (10 dakika geçerli).\nSitede yeni bir kod iste.',
    'cmd.pair.alreadyUsed': '⚠ Bu kod başka bir sohbet tarafından kullanıldı.',
    'cmd.pair.linked': '✅ <b>Siteye bağlandı!</b>\n\nTarayıcıya geri dön — artık bildirimleri ayarlayabilirsin.\n\nKonum: <b>{name}</b>\nDeğiştirmek için — <code>/location &lt;şehir&gt;</code>',
    'cmd.setup.privateHint': '💡 <code>/setup</code> komutu grup sohbetleri içindir.\nÖzel sohbette <code>/start</code> kullan.',
    'cmd.setup.onlyAdmin': '🚫 /setup komutunu yalnızca grup yöneticisi çalıştırabilir.',
    'cmd.setup.howTo': '📡 <b>Grup kurulumu:</b> {title}\n\n1. <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a> sitesini aç\n2. Ayarlar → 🔔 Bildirimler → „Telegram\'a bağla"\n3. 6 haneli bir kod al\n4. Buraya geri gel ve yaz: <code>/pair &lt;kod&gt;</code>\n\nBağlandıktan sonra kuralları sitede ayarla — bildirimler bu sohbete gelir.',
    'cmd.unpair.notSubscribed': 'Abone değilsin.',
    'cmd.unpair.noLink': 'Bu sohbete bağlı bir site yok.',
    'cmd.unpair.done': '🔓 Site ayrıldı ({n} cihaz ayrıldı).\nAbonelik ve kurallar korunur. Kuralları düzenlemek için — site üzerinden yeniden bağlan.',
    'cmd.login.notSubscribed': 'Önce /start (veya sitede zaten kod oluşturduysan /pair).',
    'cmd.login.onlyAdmin': '🚫 Sadece grup yöneticisi giriş bağlantısı alabilir.',
    'cmd.unknown': '🤖 Bu komutu bilmiyorum. /help yaz — neler yapabildiğimi göstereyim.',
    'cmd.login.link': '🔗 <b>Giriş bağlantısı:</b>\n\n{url}\n\n<i>Herhangi bir cihazda (iPhone, PC, dizüstü) aç — site hesabınla otomatik giriş yapacak.\n10 dakika geçerli, tek kullanımlık.</i>'
  },
  el: {
    'fired.cold': '❄️ <b>Ψυχρή εισβολή!</b>\n{name}: έως <b>{temp}°C</b> {when}',
    'fired.heat': '🥵 <b>Καύσωνας!</b>\n{name}: έως <b>{temp}°C</b> {when}',
    'fired.rainSoon': '🌧 <b>Σύντομα βροχή!</b>\n{name}: {mm} mm{unit}{probPart} {when}',
    'fired.snowSoon': '🌨 <b>Σύντομα χιόνι!</b>\n{name}: {mm} mm/h{probPart} {when}',
    'unit.mm15': '/15λ', 'unit.mmh': '/ώ',
    'fired.storm': '⚡ <b>Προβλέπεται καταιγίδα!</b>\n{name}: {when}\nΠαρακολούθησε την πρόγνωση και προετοιμάσου.',
    'fired.dryStreak': '☀ <b>{n} {days} χωρίς βροχή!</b>\n{name}: από αύριο έως {end} — υπέροχη ευκαιρία για εξορμήσεις.',
    'prob.part': ', {prob}%',
    'summary.greeting': '🌅 <b>Καλημέρα!</b>',
    'summary.nowTemp': '🌡 Τώρα: <b>{t}</b>',
    'summary.todayRange': '📊 Σήμερα: <b>{min}…{max}°C</b>',
    'summary.precipShort': '💧 Βροχόπτωση σήμερα: {mm} mm',
    'block.precip.rain': '🌧 Βροχή: <b>{from}–{to}</b>',
    'block.precip.rainMax': ', έως {mm} mm/ώ',
    'block.precip.daySum': ' · {mm} mm/ημέρα',
    'block.precip.possible': '🌧 Πιθανή βροχόπτωση ({mm} mm/ημέρα)',
    'block.precip.noRain': '✓ Δεν αναμένεται βροχή',
    'block.precip.snow': '❄ Χιόνι: <b>{from}–{to}</b>',
    'block.precip.noSnow': '✓ Δεν αναμένεται χιόνι',
    'block.wind.calm': '🌬 Άνεμος: άπνοια',
    'block.wind.main': '🌬 Άνεμος: έως <b>{ms} m/s</b>',
    'block.wind.gusts': ', ριπές <b>{ms} m/s</b>',
    'block.feels.close': '🌡 Αισθητή: κοντά στην πραγματική',
    'block.feels.range': '🌡 Αισθητή: <b>{min}…{max}°C</b>',
    'block.astro.line': '🌅 <b>{sr}</b>  🌇 <b>{ss}</b> · ημέρα {h}ώ {m}λ',
    'block.fog.window': '🌫 Ομίχλη: <b>{from}–{to}</b>',
    'block.fog.none': '✓ Δεν αναμένεται ομίχλη',
    'block.storm.window': '⛈ Πιθανή καταιγίδα: <b>{from}–{to}</b>',
    'block.storm.none': '✓ Δεν αναμένεται καταιγίδα',
    'block.tomorrow.line': '📊 Αύριο: <b>{tStr}</b>, {label}, {precipStr}',
    'block.tomorrow.precip': '{mm} mm βροχόπτωσης',
    'block.tomorrow.noPrecip': 'χωρίς βροχόπτωση',
    'rule.tempBelow': '🥶 Θερμοκρασία κάτω από {t}°C',
    'rule.tempAbove': '🥵 Θερμοκρασία πάνω από {t}°C',
    'rule.rainSoon': '🌧 Βροχή τις επόμενες {h} ώρες',
    'rule.precipSoon': '🌧 Βροχόπτωση τις επόμενες {h} ώρες ({what})',
    'rule.precipWhat.rain': 'βροχή', 'rule.precipWhat.snow': 'χιόνι', 'rule.precipWhat.any': 'βροχόπτωση',
    'rule.storm': '⚡ Καταιγίδα σε 48ώ',
    'rule.dryStreak': '☀ {n} συνεχόμενες {days} χωρίς βροχόπτωση',
    'rule.morningSummary': '🌅 Πρωινή σύνοψη στις {time}',
    'rule.morningSummary.withFlags': '🌅 Πρωινή σύνοψη στις {time} (+ {flags})',
    'rule.flag.wind': 'άνεμος', 'rule.flag.precip': 'βροχόπτωση', 'rule.flag.fog': 'ομίχλη',
    'rule.flag.astro': 'ανατολή/δύση', 'rule.flag.moon': 'σελήνη', 'rule.flag.storm': 'καταιγίδα',
    'rule.flag.feels': 'αισθητή', 'rule.flag.tomorrow': 'αύριο',
    'cmd.start.welcomeBack': '👋 Καλώς ήρθες πίσω! Είσαι ήδη συνδρομητής{bannedNote}.\n\n📍 Τοποθεσία: {loc}\n🔔 Κανόνες: {rules}\n\nΓράψε /help για να δεις τις εντολές.',
    'cmd.start.bannedNote': ', αλλά η συνδρομή σου είναι ΑΠΟΚΛΕΙΣΜΕΝΗ',
    'cmd.start.locUnset': 'μη ορισμένη',
    'cmd.start.new': '🌤 Γεια! Είμαι το bot <b>Meteo Star</b> — θα σου στέλνω ειδοποιήσεις καιρού.\n\n📍 Προεπιλεγμένη τοποθεσία: <b>Vysokyi</b> (περιοχή Χαρκόβου).\n   Αλλαγή: <code>/location &lt;πόλη&gt;</code>\n   Παράδειγμα: <code>/location Αθήνα</code>\n\n🔔 Οι κανόνες ειδοποιήσεων ρυθμίζονται μέσω της εφαρμογής web.\n\n📋 Όλες οι εντολές: /help',
    'cmd.start.groupHint': '👋 Γεια! Σε μια ομαδική συνομιλία, χρησιμοποίησε <code>/setup</code> (από διαχειριστή ομάδας) για να συνδέσεις το bot.',
    'cmd.help.user': '📋 <b>Εντολές Meteo Star Bot:</b>\n\n<code>/start</code> — εγγραφή\n<code>/status</code> — η συνδρομή σου και ενεργοί κανόνες\n<code>/location &lt;πόλη&gt;</code> — αλλαγή τοποθεσίας\n<code>/pair &lt;κωδικός&gt;</code> — σύνδεση με τον ιστότοπο (κωδικός στις Ρυθμίσεις)\n<code>/login</code> — magic-link για σύνδεση σε οποιαδήποτε συσκευή\n<code>/unpair</code> — αποσύνδεση από τον ιστότοπο\n<code>/stop</code> — κατάργηση εγγραφής από όλες τις ειδοποιήσεις\n<code>/help</code> — αυτή η βοήθεια',
    'cmd.status.notSubscribed': 'Δεν είσαι ακόμα εγγεγραμμένος. Στείλε /start για να αρχίσεις.',
    'cmd.status.banned': '🚫 Η συνδρομή σου έχει αποκλειστεί από τον διαχειριστή.',
    'cmd.status.noRules': '   <i>(χωρίς κανόνες, πρόσθεσε μέσω της διεπαφής web)</i>',
    'cmd.status.main': '📊 <b>Η συνδρομή σου:</b>\n\n📍 Τοποθεσία: <b>{name}</b> ({lat}, {lon})\n🌐 Γλώσσα: {lang}\n📅 Εγγραφή: {date}\n\n🔔 <b>Κανόνες ειδοποιήσεων:</b>\n{rules}',
    'cmd.stop.notSubscribed': 'Δεν είσαι εγγεγραμμένος.',
    'cmd.stop.done': '✅ Διαγράφηκε η εγγραφή. Δεν θα έρχονται άλλες ειδοποιήσεις.\n\nΑν θέλεις να επιστρέψεις — /start.',
    'cmd.location.usage': '📍 Όρισε μια πόλη:\n<code>/location Αθήνα</code>\n\nΉ στείλε συντεταγμένες σε μορφή:\n<code>/location 49.9 36.21</code>',
    'cmd.location.subscribeFirst': 'Πρώτα εγγράψου — /start.',
    'cmd.location.setCoords': '📍 Συντεταγμένες ορίστηκαν: <b>{name}</b>',
    'cmd.location.notFound': '🤷 Δεν βρήκα την πόλη <b>{q}</b>. Δοκίμασε το πλήρες όνομα ή συντεταγμένες: <code>/location 49.9 36.21</code>',
    'cmd.location.set': '📍 Τοποθεσία ενημερώθηκε: <b>{name}</b>\n   ({lat}, {lon})',
    'cmd.location.geocodeErr': '⚠ Σφάλμα γεωκωδικοποίησης. Δοκίμασε αργότερα ή δώσε συντεταγμένες χειροκίνητα.',
    'cmd.pair.usage': '🔗 Χρήση: <code>/pair 123456</code>\n\nΠάρε πρώτα έναν 6ψήφιο κωδικό στον ιστότοπο: Ρυθμίσεις → 🔔 Ειδοποιήσεις → „Σύνδεση με Telegram".',
    'cmd.pair.groupOnlyAdmin': '🚫 Μόνο διαχειριστής ομάδας μπορεί να συνδέσει τον ιστότοπο σε ομάδα.',
    'cmd.pair.codeNotFound': '❌ Ο κωδικός <code>{code}</code> δεν βρέθηκε ή έληξε (έγκυρος για 10 λεπτά).\nΖήτησε νέο στον ιστότοπο.',
    'cmd.pair.alreadyUsed': '⚠ Αυτός ο κωδικός έχει ήδη χρησιμοποιηθεί από άλλη συνομιλία.',
    'cmd.pair.linked': '✅ <b>Συνδέθηκε με τον ιστότοπο!</b>\n\nΕπίστρεψε στον browser — μπορείς τώρα να ρυθμίσεις τις ειδοποιήσεις.\n\nΤοποθεσία: <b>{name}</b>\nΓια αλλαγή — <code>/location &lt;πόλη&gt;</code>',
    'cmd.setup.privateHint': '💡 Η εντολή <code>/setup</code> είναι για ομαδικές συνομιλίες.\nΣε ιδιωτική συνομιλία χρησιμοποίησε <code>/start</code>.',
    'cmd.setup.onlyAdmin': '🚫 Μόνο διαχειριστής ομάδας μπορεί να εκτελέσει /setup.',
    'cmd.setup.howTo': '📡 <b>Ρύθμιση ομάδας:</b> {title}\n\n1. Άνοιξε τον ιστότοπο <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n2. Ρυθμίσεις → 🔔 Ειδοποιήσεις → „Σύνδεση με Telegram"\n3. Πάρε έναν 6ψήφιο κωδικό\n4. Επίστρεψε εδώ και γράψε: <code>/pair &lt;κωδικός&gt;</code>\n\nΜετά τη σύνδεση, ρύθμισε κανόνες στον ιστότοπο — οι ειδοποιήσεις έρχονται σε αυτή τη συνομιλία.',
    'cmd.unpair.notSubscribed': 'Δεν είσαι εγγεγραμμένος.',
    'cmd.unpair.noLink': 'Κανένας ιστότοπος δεν είναι συνδεδεμένος με αυτή τη συνομιλία.',
    'cmd.unpair.done': '🔓 Ιστότοπος αποσυνδέθηκε ({n} συσκευή(ές) αποσυνδέθηκαν).\nΗ συνδρομή και οι κανόνες διατηρούνται. Για επεξεργασία κανόνων — συνδέσου ξανά μέσω του ιστότοπου.',
    'cmd.login.notSubscribed': 'Πρώτα /start (ή /pair αν έχεις ήδη δημιουργήσει κωδικό στον ιστότοπο).',
    'cmd.login.onlyAdmin': '🚫 Μόνο διαχειριστής ομάδας μπορεί να λάβει σύνδεσμο εισόδου.',
    'cmd.unknown': '🤖 Δεν γνωρίζω αυτή την εντολή. Γράψε /help — θα σου δείξω τι μπορώ.',
    'cmd.login.link': '🔗 <b>Σύνδεσμος εισόδου:</b>\n\n{url}\n\n<i>Άνοιξέ τον σε οποιαδήποτε συσκευή (iPhone, PC, laptop) — ο ιστότοπος θα συνδεθεί αυτόματα με τον λογαριασμό σου.\nΈγκυρος 10 λεπτά, μίας χρήσης.</i>'
  }
};

// Мерджим extra-переводы в DICT при загрузке модуля.
for (const lang of Object.keys(DICT_EXTRA)) {
  for (const [key, val] of Object.entries(DICT_EXTRA[lang])) {
    if (DICT[key]) DICT[key][lang] = val;
  }
}

// Главный helper: t(key, lang, params) → строка.
// При отсутствии перевода: 1) фолбэк на 'ru' (исторический язык бота),
// 2) если и там нет — возвращаем ключ как есть.
export function t(key, lang, params) {
  const lng = SUPPORTED_LANGS.includes(lang) ? lang : 'ru';
  const entry = DICT[key];
  if (!entry) return key;
  let s = entry[lng] || entry.ru || key;
  if (params) {
    for (const k of Object.keys(params)) {
      s = s.replaceAll(`{${k}}`, params[k]);
    }
  }
  return s;
}
