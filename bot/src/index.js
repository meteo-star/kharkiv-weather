/*
 * Meteo Star — Telegram-бот на Cloudflare Worker
 *
 * Эндпоинты:
 *   POST /webhook  — webhook Telegram Bot API (приём update'ов)
 *   GET  /health   — health-check (вернёт 200 OK для мониторинга)
 *
 * Cron (каждые 30 мин):
 *   проходит по всем подпискам в KV SUBSCRIPTIONS, тянет погоду из
 *   Open-Meteo, применяет правила, отправляет уведомления через Bot API.
 *
 * Secrets (через `wrangler secret put`):
 *   TELEGRAM_BOT_TOKEN       — токен от @BotFather
 *   TELEGRAM_WEBHOOK_SECRET  — случайная строка для верификации запросов
 *
 * Vars (в wrangler.toml):
 *   ADMIN_USER_ID            — Telegram user_id главного админа (Стас)
 *
 * KV bindings:
 *   SUBSCRIPTIONS  — ключ "sub:<chat_id>" → JSON подписки
 *   PAIRING        — ключ "pair:<code>" → chat_id (TTL 10 мин)
 *   STATS          — ключ "stats:<YYYY-MM-DD>" → JSON счётчики
 */

import {
  t, tPluralDays, tWhenStr, tInMinutes, tWindDir,
  tSourceLabel, tSourceFooter, tWeatherCodeLabel,
  tMoonName, tMoonTrend, detectLang
} from './i18n.js';

const TG_API = 'https://api.telegram.org';

// ============================================================
// HTTP ROUTER
// ============================================================
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return new Response('OK', { status: 200 });
    }

    if (url.pathname === '/webhook' && request.method === 'POST') {
      return handleWebhook(request, env, ctx);
    }

    // API endpoints для сайта (фаза Б3)
    if (url.pathname.startsWith('/api/')) {
      return handleApi(url, request, env, ctx);
    }

    // Простая корневая страница — помогает понять, что Worker жив,
    // когда заходишь в браузере по URL `.workers.dev`.
    return new Response('Meteo Star Bot is running. POST /webhook for Telegram updates.', {
      status: 200,
      headers: { 'content-type': 'text/plain; charset=utf-8' }
    });
  },

  // Cron — выполняется по расписанию из wrangler.toml ("*/30 * * * *")
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runCronCheck(env));
    const d = new Date(event.scheduledTime || Date.now());
    // 04:00 UTC — обновляем публичный рейтинг точности моделей
    // (forecast'ы за +1/+2 дня на все локации в registry).
    if (d.getUTCHours() === 4 && d.getUTCMinutes() < 30) {
      ctx.waitUntil(runAccuracyCron(env));
    }
    // 05:00 UTC — переписываем actual реальными наблюдениями из archive-api
    // для записей T-8..T-2 (v1.37.0). Час разнесён, чтобы не пересекаться
    // с accuracy-cron и не перегрузить worker одновременно двумя обходами.
    if (d.getUTCHours() === 5 && d.getUTCMinutes() < 30) {
      ctx.waitUntil(runObservationsCron(env));
    }
  }
};

// ============================================================
// WEBHOOK HANDLER
// ============================================================
async function handleWebhook(request, env, ctx) {
  // Верификация: Telegram присылает наш секрет в этом заголовке.
  // Если кто-то стучится напрямую без секрета — игнор.
  const secret = request.headers.get('x-telegram-bot-api-secret-token');
  if (env.TELEGRAM_WEBHOOK_SECRET && secret !== env.TELEGRAM_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  let update;
  try {
    update = await request.json();
  } catch (e) {
    return new Response('Bad JSON', { status: 400 });
  }

  // Worker должен отвечать Telegram быстро (<10 сек). Долгие операции
  // (отправка сообщений, запись в KV) делаем через ctx.waitUntil.
  ctx.waitUntil(processUpdate(update, env));
  return new Response('OK', { status: 200 });
}

// ============================================================
// UPDATE PROCESSOR — диспетчер команд
// ============================================================
async function processUpdate(update, env) {
  try {
    const msg = update.message || update.edited_message;
    if (!msg) return;

    const chatId = msg.chat?.id;
    const userId = msg.from?.id;
    const chatType = msg.chat?.type || 'private';
    // Бота добавили в группу — приветствуем
    if (msg.new_chat_members && msg.new_chat_members.length > 0) {
      const me = await getBotInfo(env);
      const botAdded = me && msg.new_chat_members.some(m => m.id === me.id);
      if (botAdded) {
        await sendMessage(env, chatId,
          `👋 Привет! Я бот <b>Meteo Star</b>.\n\nЧтобы начать получать уведомления о погоде в этом чате:\n\n1. Админ группы пишет <code>/setup</code>\n2. Я выдам код для связки с сайтом\n3. На сайте Settings → 🔔 Уведомления → «Связать с Telegram»\n4. На сайте вводишь код, я подтверждаю связку\n\nДальше настраиваешь правила через сайт — и алерты приходят в этот чат.`,
          { parse_mode: 'HTML' }
        );
      }
      return;
    }

    const text = (msg.text || '').trim();
    if (!chatId || !text) return;

    // Ленивая миграция: для групповых подписок, привязанных ДО фикса
    // chatTitle, обновляем имя группы при любом сообщении (раз в N часов
    // достаточно, но KV-write дешёвая операция).
    if (chatType !== 'private' && msg.chat?.title) {
      const subForMigration = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
      if (subForMigration && subForMigration.chatTitle !== msg.chat.title) {
        subForMigration.chatTitle = msg.chat.title;
        subForMigration.chatType = chatType;
        // Очищаем ошибочно сохранённые поля юзера-инициатора
        if (subForMigration.username && !subForMigration.initiator) {
          subForMigration.initiator = {
            username: subForMigration.username,
            firstName: subForMigration.firstName
          };
          subForMigration.username = null;
          subForMigration.firstName = null;
        }
        await env.SUBSCRIPTIONS.put(`sub:${chatId}`, JSON.stringify(subForMigration));
      }
    }

    // Парсинг команды: "/cmd@BotName arg1 arg2" → { cmd, args }
    const parsed = parseCommand(text);
    if (!parsed) {
      // Не команда — для будущей фазы (диалог с ботом). Пока тихо.
      return;
    }

    const { cmd, args } = parsed;
    const isAdmin = String(userId) === String(env.ADMIN_USER_ID);

    // Базовые команды для всех
    switch (cmd) {
      case '/start':       return handleStart(env, chatId, userId, msg.from, chatType);
      case '/help':        return handleHelp(env, chatId, isAdmin);
      case '/status':      return handleStatus(env, chatId);
      case '/stop':        return handleStop(env, chatId);
      case '/location':    return handleLocation(env, chatId, args);
      case '/pair':        return handlePair(env, chatId, userId, msg.from, args, chatType, msg.chat);
      case '/unpair':      return handleUnpair(env, chatId);
      case '/setup':       return handleSetup(env, chatId, userId, chatType, msg);
      case '/login':       return handleLogin(env, chatId, userId, chatType);
    }

    // Админ-команды
    if (isAdmin) {
      switch (cmd) {
        case '/admin_stats':     return handleAdminStats(env, chatId);
        case '/admin_list':      return handleAdminList(env, chatId, args);
        case '/admin_broadcast': return handleAdminBroadcast(env, chatId, args);
        case '/admin_ban':       return handleAdminBan(env, chatId, args);
        case '/admin_unban':     return handleAdminUnban(env, chatId, args);
        case '/admin_test':      return handleAdminTest(env, chatId, args);
        case '/admin_cron':      return handleAdminCron(env, chatId);
        case '/admin_accuracy_cron': return handleAdminAccuracyCron(env, chatId);
        case '/admin_obs_cron': return handleAdminObsCron(env, chatId);
        case '/admin_summary_test': return handleAdminSummaryTest(env, chatId, args);
        case '/admin_addrule':   return handleAdminAddRule(env, chatId, args);
        case '/admin_clearrules':return handleAdminClearRules(env, chatId);
        case '/admin_cooldowns': return handleAdminCooldowns(env, chatId, args);
      }
    }

    // Неизвестная команда — локализуем по sub.lang (если подписка есть).
    const sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
    const lang = sub?.lang || 'ru';
    return sendMessage(env, chatId, t('cmd.unknown', lang));
  } catch (err) {
    console.error('processUpdate error:', err);
  }
}

function parseCommand(text) {
  if (!text.startsWith('/')) return null;
  // "/cmd@bot arg1 arg2" → cmd="/cmd", args="arg1 arg2"
  const parts = text.split(/\s+/);
  const cmdRaw = parts[0];
  const cmd = cmdRaw.split('@')[0].toLowerCase();
  const args = parts.slice(1).join(' ').trim();
  return { cmd, args };
}

// ============================================================
// КОМАНДЫ ПОЛЬЗОВАТЕЛЯ
// ============================================================

function esc(s) {
  // HTML-escape для безопасной вставки user-input в сообщение
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function handleStart(env, chatId, userId, fromObj, chatType = 'private') {
  const lang = detectLang(fromObj?.language_code);
  // В групповом чате /start не создаёт подписку — нужен /setup от админа
  if (chatType !== 'private') {
    return sendMessage(env, chatId, t('cmd.start.groupHint', lang), { parse_mode: 'HTML' });
  }
  // Создаём или обновляем подписку с дефолтами
  const key = `sub:${chatId}`;
  const existing = await env.SUBSCRIPTIONS.get(key, { type: 'json' });

  if (existing) {
    const lng = existing.lang || lang;
    return sendMessage(env, chatId, t('cmd.start.welcomeBack', lng, {
      bannedNote: existing.banned ? t('cmd.start.bannedNote', lng) : '',
      loc: esc(existing.name || t('cmd.start.locUnset', lng)),
      rules: (existing.rules || []).length
    }), { parse_mode: 'HTML' });
  }

  // Новая подписка
  const sub = {
    chatId,
    userId,
    chatType,
    username: fromObj?.username || null,
    firstName: fromObj?.first_name || null,
    lat: 49.9,         // Высокий по умолчанию
    lon: 36.21,
    name: 'Высокий',
    lang,
    rules: [],
    createdAt: new Date().toISOString(),
    banned: false,
    lastFired: {}
  };
  await env.SUBSCRIPTIONS.put(key, JSON.stringify(sub));

  // Инкремент счётчика новых подписок за сегодня
  await incrementStat(env, 'subscribed');

  return sendMessage(env, chatId, t('cmd.start.new', lang), { parse_mode: 'HTML' });
}

async function handleHelp(env, chatId, isAdmin) {
  // Юзерская часть — берём из словаря по sub.lang. Админский блок — только
  // на русском (это для одного человека-админа, перевод избыточен).
  const sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  const lang = sub?.lang || 'ru';
  let text = t('cmd.help.user', lang);

  if (isAdmin) {
    text +=
      `\n\n👑 <b>Админ-команды:</b>\n` +
      `<code>/admin_stats</code> — статистика бота\n` +
      `<code>/admin_list [N]</code> — последние N подписавшихся\n` +
      `<code>/admin_broadcast &lt;текст&gt;</code> — рассылка всем\n` +
      `<code>/admin_ban &lt;chat_id&gt;</code> — заблокировать\n` +
      `<code>/admin_unban &lt;chat_id&gt;</code> — разблокировать\n` +
      `<code>/admin_test &lt;chat_id&gt;</code> — отправить тестовое сообщение\n` +
      `<code>/admin_cron</code> — запустить cron-проверку вручную\n` +
      `<code>/admin_summary_test [base|full|chat_id]</code> — прислать утреннюю сводку прямо сейчас\n` +
      `<code>/admin_addrule &lt;тип&gt; [параметры]</code> — добавить правило себе\n` +
      `<code>/admin_clearrules</code> — удалить все свои правила\n` +
      `<code>/admin_cooldowns [chat_id]</code> — показать когда сработают правила (по умолч. свой)`;
  }

  return sendMessage(env, chatId, text, { parse_mode: 'HTML' });
}

async function handleStatus(env, chatId) {
  const sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  if (!sub) {
    return sendMessage(env, chatId, t('cmd.status.notSubscribed', 'ru'));
  }
  const lang = sub.lang || 'ru';
  if (sub.banned) {
    return sendMessage(env, chatId, t('cmd.status.banned', lang));
  }

  const rulesText = (sub.rules || []).length === 0
    ? t('cmd.status.noRules', lang)
    : sub.rules.map(r => `   • ${esc(formatRule(r, lang))}`).join('\n');

  return sendMessage(env, chatId, t('cmd.status.main', lang, {
    name: esc(sub.name),
    lat: sub.lat.toFixed(2),
    lon: sub.lon.toFixed(2),
    lang: lang.toUpperCase(),
    date: new Date(sub.createdAt).toLocaleDateString(_bcp47(lang)),
    rules: rulesText
  }), { parse_mode: 'HTML' });
}

async function handleStop(env, chatId) {
  const key = `sub:${chatId}`;
  const sub = await env.SUBSCRIPTIONS.get(key, { type: 'json' });
  if (!sub) {
    return sendMessage(env, chatId, t('cmd.stop.notSubscribed', 'ru'));
  }
  const lang = sub.lang || 'ru';
  await env.SUBSCRIPTIONS.delete(key);
  await incrementStat(env, 'unsubscribed');
  return sendMessage(env, chatId, t('cmd.stop.done', lang));
}

// BCP-47 для toLocaleDateString. Маппинг lang → локаль.
function _bcp47(lang) {
  switch (lang) {
    case 'uk': return 'uk-UA';
    case 'en': return 'en-US';
    case 'de': return 'de-DE';
    case 'pl': return 'pl-PL';
    case 'cs': return 'cs-CZ';
    case 'fr': return 'fr-FR';
    case 'it': return 'it-IT';
    case 'es': return 'es-ES';
    case 'ro': return 'ro-RO';
    case 'hu': return 'hu-HU';
    case 'sk': return 'sk-SK';
    case 'pt': return 'pt-PT';
    case 'nl': return 'nl-NL';
    case 'tr': return 'tr-TR';
    case 'el': return 'el-GR';
    default:   return 'ru-RU';
  }
}

async function handleLocation(env, chatId, args) {
  const sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  const lang = sub?.lang || 'ru';
  if (!args) {
    return sendMessage(env, chatId, t('cmd.location.usage', lang), { parse_mode: 'HTML' });
  }
  if (!sub) return sendMessage(env, chatId, t('cmd.location.subscribeFirst', lang));

  // Прямой формат: "49.9 36.21"
  const coords = args.match(/^(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)$/);
  if (coords) {
    sub.lat = parseFloat(coords[1]);
    sub.lon = parseFloat(coords[2]);
    sub.name = `${sub.lat.toFixed(2)}, ${sub.lon.toFixed(2)}`;
    await env.SUBSCRIPTIONS.put(`sub:${chatId}`, JSON.stringify(sub));
    return sendMessage(env, chatId, t('cmd.location.setCoords', lang, { name: esc(sub.name) }), { parse_mode: 'HTML' });
  }

  // Имя города → Open-Meteo geocoding. OM поддерживает en/de/fr/it/es/pt/ru/ja/zh/hi.
  // Для uk/pl/cs передаём lang как есть (uk OM понимает, pl/cs — фолбэк на en).
  const OM_GEO_LANGS = ['en','de','fr','it','es','pt','ru','ja','zh','hi','uk'];
  const apiLang = OM_GEO_LANGS.includes(lang) ? lang : 'en';
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(args)}&count=1&language=${apiLang}`;
    const r = await fetch(geoUrl);
    if (!r.ok) throw new Error(`geocode HTTP ${r.status}`);
    const data = await r.json();
    const place = data.results?.[0];
    if (!place) {
      return sendMessage(env, chatId, t('cmd.location.notFound', lang, { q: esc(args) }), { parse_mode: 'HTML' });
    }
    sub.lat = place.latitude;
    sub.lon = place.longitude;
    sub.name = place.name + (place.admin1 ? `, ${place.admin1}` : '');
    await env.SUBSCRIPTIONS.put(`sub:${chatId}`, JSON.stringify(sub));
    return sendMessage(env, chatId, t('cmd.location.set', lang, {
      name: esc(sub.name), lat: sub.lat.toFixed(2), lon: sub.lon.toFixed(2)
    }), { parse_mode: 'HTML' });
  } catch (err) {
    console.error('geocode err:', err);
    return sendMessage(env, chatId, t('cmd.location.geocodeErr', lang));
  }
}

function formatRule(r, lang = 'ru') {
  switch (r.type) {
    case 'temp_below':       return t('rule.tempBelow', lang, { t: r.threshold });
    case 'temp_above':       return t('rule.tempAbove', lang, { t: r.threshold });
    case 'rain_soon':        return t('rule.rainSoon', lang, { h: r.windowHours });
    case 'precip_soon': {
      const parts = [];
      if (r.watchRain) parts.push(t('rule.precipWhat.rain', lang));
      if (r.watchSnow) parts.push(t('rule.precipWhat.snow', lang));
      const what = parts.length ? parts.join(' / ') : t('rule.precipWhat.any', lang);
      return t('rule.precipSoon', lang, { h: r.windowHours, what });
    }
    case 'storm_alert':      return t('rule.storm', lang);
    case 'dry_streak':       return t('rule.dryStreak', lang, { n: r.days, days: tPluralDays(r.days, lang) });
    case 'morning_summary': {
      const time = `${r.hour}:${String(r.minute || 0).padStart(2,'0')}`;
      const sections = r.sections || {};
      const flags = [];
      if (sections.wind)     flags.push(t('rule.flag.wind',     lang));
      if (sections.precip)   flags.push(t('rule.flag.precip',   lang));
      if (sections.fog)      flags.push(t('rule.flag.fog',      lang));
      if (sections.astro)    flags.push(t('rule.flag.astro',    lang));
      if (sections.moon)     flags.push(t('rule.flag.moon',     lang));
      if (sections.storm)    flags.push(t('rule.flag.storm',    lang));
      if (sections.feels)    flags.push(t('rule.flag.feels',    lang));
      if (sections.tomorrow) flags.push(t('rule.flag.tomorrow', lang));
      return flags.length
        ? t('rule.morningSummary.withFlags', lang, { time, flags: flags.join(', ') })
        : t('rule.morningSummary', lang, { time });
    }
    default:                 return `? ${r.type}`;
  }
}

// /pair <code>  — связать чат с сайтом по коду из сайта
async function handlePair(env, chatId, userId, fromObj, args, chatType = 'private', chatObj = null) {
  // Если подписка уже есть — используем её lang. Иначе — детектим из TG.
  const existingSub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  const lang = existingSub?.lang || detectLang(fromObj?.language_code);
  const code = (args || '').trim();
  if (!/^\d{6}$/.test(code)) {
    return sendMessage(env, chatId, t('cmd.pair.usage', lang), { parse_mode: 'HTML' });
  }
  // В группе /pair доступен только админу группы
  if (chatType !== 'private') {
    const isGroupAdmin = await checkGroupAdmin(env, chatId, userId);
    if (!isGroupAdmin) {
      return sendMessage(env, chatId, t('cmd.pair.groupOnlyAdmin', lang));
    }
  }
  const raw = await env.PAIRING.get(`pair:${code}`);
  if (!raw) {
    return sendMessage(env, chatId, t('cmd.pair.codeNotFound', lang, { code: esc(code) }), { parse_mode: 'HTML' });
  }
  const data = JSON.parse(raw);
  if (data.chatId) {
    return sendMessage(env, chatId, t('cmd.pair.alreadyUsed', lang));
  }

  const isGroup = chatType !== 'private';
  // Создаём подписку если её нет
  let sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  if (!sub) {
    sub = {
      chatId,
      userId,
      chatType,
      // Для группы — храним название группы и инициатора отдельно.
      // Для лички — username/firstName юзера в основных полях.
      username: isGroup ? null : (fromObj?.username || null),
      firstName: isGroup ? null : (fromObj?.first_name || null),
      chatTitle: isGroup ? (chatObj?.title || `Группа ${chatId}`) : null,
      initiator: isGroup ? {
        userId: fromObj?.id,
        username: fromObj?.username || null,
        firstName: fromObj?.first_name || null
      } : null,
      lat: 49.9, lon: 36.21, name: 'Высокий',
      lang: detectLang(fromObj?.language_code),
      rules: [],
      createdAt: new Date().toISOString(),
      banned: false,
      lastFired: {}
    };
    await incrementStat(env, 'subscribed');
  } else if (isGroup) {
    // Группа — обновляем chatTitle и chatType (миграция со старого формата
    // где username/firstName было заполнено данными инициатора)
    sub.chatType = chatType;
    if (chatObj?.title) sub.chatTitle = chatObj.title;
    sub.username = null;
    sub.firstName = null;
    sub.initiator = sub.initiator || {
      userId: fromObj?.id,
      username: fromObj?.username || null,
      firstName: fromObj?.first_name || null
    };
  }

  // Генерим pairToken (32 hex символа) для ЭТОГО устройства.
  // Добавляем в массив, не перетирая токены других устройств.
  const pairToken = generatePairToken();
  addPairToken(sub, pairToken);
  await env.SUBSCRIPTIONS.put(`sub:${chatId}`, JSON.stringify(sub));

  // Обновляем pair-запись — теперь сайт сможет получить chatId+pairToken через poll
  data.chatId = chatId;
  data.pairToken = pairToken;
  await env.PAIRING.put(`pair:${code}`, JSON.stringify(data), { expirationTtl: 600 });

  return sendMessage(env, chatId,
    t('cmd.pair.linked', sub.lang || lang, { name: esc(sub.name) }),
    { parse_mode: 'HTML' }
  );
}

// /setup — для группы: запросить связку с сайтом. Доступно только админу группы.
async function handleSetup(env, chatId, userId, chatType, msg) {
  // В группе sub.lang ещё нет (подписку создаст /pair) — детектим из инициатора
  const existingSub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  const lang = existingSub?.lang || detectLang(msg?.from?.language_code);
  if (chatType === 'private') {
    return sendMessage(env, chatId, t('cmd.setup.privateHint', lang), { parse_mode: 'HTML' });
  }
  const isGroupAdmin = await checkGroupAdmin(env, chatId, userId);
  if (!isGroupAdmin) {
    return sendMessage(env, chatId, t('cmd.setup.onlyAdmin', lang));
  }
  const groupTitle = msg.chat?.title || `Group ${chatId}`;
  return sendMessage(env, chatId, t('cmd.setup.howTo', lang, { title: esc(groupTitle) }), { parse_mode: 'HTML' });
}

// Кэш для getMe — токен бота не меняется, можно кэшировать в памяти Worker'а
let _botInfoCache = null;
async function getBotInfo(env) {
  if (_botInfoCache) return _botInfoCache;
  try {
    const r = await fetch(`${TG_API}/bot${env.TELEGRAM_BOT_TOKEN}/getMe`);
    const data = await r.json();
    if (data.ok) _botInfoCache = data.result;
    return _botInfoCache;
  } catch (e) {
    return null;
  }
}

// Проверка прав пользователя в группе (admin/creator)
async function checkGroupAdmin(env, chatId, userId) {
  try {
    const r = await fetch(`${TG_API}/bot${env.TELEGRAM_BOT_TOKEN}/getChatMember?chat_id=${chatId}&user_id=${userId}`);
    const data = await r.json();
    if (!data.ok) return false;
    const status = data.result?.status;
    return status === 'creator' || status === 'administrator';
  } catch (e) {
    return false;
  }
}

async function handleUnpair(env, chatId) {
  const sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  if (!sub) return sendMessage(env, chatId, t('cmd.unpair.notSubscribed', 'ru'));
  const lang = sub.lang || 'ru';
  const tokens = getPairTokens(sub);
  if (tokens.length === 0) return sendMessage(env, chatId, t('cmd.unpair.noLink', lang));
  // /unpair от бота — отвязываем ВСЕ устройства разом
  sub.pairTokens = [];
  delete sub.pairToken;
  await env.SUBSCRIPTIONS.put(`sub:${chatId}`, JSON.stringify(sub));
  return sendMessage(env, chatId, t('cmd.unpair.done', lang, { n: tokens.length }));
}

function generatePairToken() {
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  return Array.from(a, b => b.toString(16).padStart(2, '0')).join('');
}

// /login — выдаёт магическую ссылку для входа на сайт с любого устройства.
// Используется когда: на новом устройстве (iPhone) сайт не знает что юзер уже
// связан с ботом → юзер пишет /login → получает URL → открывает → сайт сам
// логинится с правильным chatId+pairToken.
//
// В группе: /login генерит ссылку именно для ГРУППЫ (chatId группы).
// Доступ к группе с любого устройства = просто открыть свежую ссылку.
async function handleLogin(env, chatId, userId, chatType) {
  let sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  const lang = sub?.lang || 'ru';
  // В группе только admin/creator может генерить login-ссылку
  if (chatType !== 'private') {
    const isGroupAdmin = await checkGroupAdmin(env, chatId, userId);
    if (!isGroupAdmin) {
      return sendMessage(env, chatId, t('cmd.login.onlyAdmin', lang));
    }
  }
  if (!sub) {
    return sendMessage(env, chatId, t('cmd.login.notSubscribed', lang));
  }
  // Генерим НОВЫЙ pairToken для устройства, которое кликнет magic-link.
  // Добавляем в массив — старые токены других устройств не трогаем.
  // Так iPhone и ПК могут оба быть подключены параллельно.
  const newPairToken = generatePairToken();
  addPairToken(sub, newPairToken);
  await env.SUBSCRIPTIONS.put(`sub:${chatId}`, JSON.stringify(sub));

  // Короткий одноразовый auth-токен, истекает через 10 мин
  const authToken = generatePairToken();
  await env.PAIRING.put(`auth:${authToken}`,
    JSON.stringify({ chatId, pairToken: newPairToken, createdAt: new Date().toISOString() }),
    { expirationTtl: 600 }
  );

  const url = `https://meteo-star.github.io/kharkiv-weather/?auth=${authToken}`;
  return sendMessage(env, chatId, t('cmd.login.link', lang, { url }), { parse_mode: 'HTML' });
}

// ============================================================
// АДМИН-КОМАНДЫ
// ============================================================

async function handleAdminStats(env, chatId) {
  const today = new Date().toISOString().slice(0,10);
  const stats = (await env.STATS.get(`stats:${today}`, { type: 'json' })) || {};
  const total = await countSubscriptions(env);
  return sendMessage(env, chatId,
    `👑 <b>Статистика бота (${today}):</b>\n\n` +
    `👥 Активных подписок: <b>${total}</b>\n` +
    `➕ Подписалось сегодня: ${stats.subscribed || 0}\n` +
    `➖ Отписалось сегодня: ${stats.unsubscribed || 0}\n` +
    `📤 Отправлено уведомлений: ${stats.notifications || 0}\n` +
    `⚠ Ошибок отправки: ${stats.errors || 0}\n` +
    `⏰ Cron-запусков: ${stats.cron_runs || 0}`,
    { parse_mode: 'HTML' }
  );
}

async function handleAdminList(env, chatId, args) {
  const limit = Math.min(parseInt(args, 10) || 10, 50);
  const list = await env.SUBSCRIPTIONS.list({ prefix: 'sub:' });
  const rows = [];
  for (const key of list.keys.slice(0, limit)) {
    const sub = await env.SUBSCRIPTIONS.get(key.name, { type: 'json' });
    if (!sub) continue;
    rows.push(`${sub.chatId} · ${esc(sub.name)} · ${(sub.rules || []).length} правил${sub.banned ? ' · BAN' : ''}`);
  }
  return sendMessage(env, chatId,
    `👑 <b>Последние ${rows.length} подписок:</b>\n\n` +
    (rows.length ? rows.map(r => `<code>${r}</code>`).join('\n') : '<i>(нет подписок)</i>'),
    { parse_mode: 'HTML' }
  );
}

async function handleAdminBroadcast(env, chatId, args) {
  if (!args) {
    return sendMessage(env, chatId, `Использование: /admin_broadcast <текст сообщения>`);
  }
  const list = await env.SUBSCRIPTIONS.list({ prefix: 'sub:' });
  let sent = 0, failed = 0;
  for (const key of list.keys) {
    const sub = await env.SUBSCRIPTIONS.get(key.name, { type: 'json' });
    if (!sub || sub.banned) continue;
    try {
      await sendMessage(env, sub.chatId, args);
      sent++;
      // Telegram лимит ~30 msg/sec — пауза 40 мс
      await sleep(40);
    } catch (e) {
      failed++;
    }
  }
  return sendMessage(env, chatId, `📤 Рассылка завершена: отправлено <b>${sent}</b>, ошибок <b>${failed}</b>`, { parse_mode: 'HTML' });
}

async function handleAdminBan(env, chatId, args) {
  const targetId = args.trim();
  if (!targetId) return sendMessage(env, chatId, `Использование: /admin_ban <chat_id>`);
  const key = `sub:${targetId}`;
  const sub = await env.SUBSCRIPTIONS.get(key, { type: 'json' });
  if (!sub) return sendMessage(env, chatId, `Подписка ${targetId} не найдена.`);
  sub.banned = true;
  await env.SUBSCRIPTIONS.put(key, JSON.stringify(sub));
  return sendMessage(env, chatId, `🚫 Подписка ${targetId} заблокирована.`);
}

async function handleAdminUnban(env, chatId, args) {
  const targetId = args.trim();
  if (!targetId) return sendMessage(env, chatId, `Использование: /admin_unban <chat_id>`);
  const key = `sub:${targetId}`;
  const sub = await env.SUBSCRIPTIONS.get(key, { type: 'json' });
  if (!sub) return sendMessage(env, chatId, `Подписка ${targetId} не найдена.`);
  sub.banned = false;
  await env.SUBSCRIPTIONS.put(key, JSON.stringify(sub));
  return sendMessage(env, chatId, `✅ Подписка ${targetId} разблокирована.`);
}

async function handleAdminTest(env, chatId, args) {
  const targetId = args.trim();
  if (!targetId) return sendMessage(env, chatId, `Использование: /admin_test <chat_id>`);
  try {
    await sendMessage(env, targetId, `🧪 Тестовое сообщение от админа.`);
    return sendMessage(env, chatId, `✅ Тест отправлен на ${targetId}.`);
  } catch (err) {
    return sendMessage(env, chatId, `❌ Ошибка отправки: ${err.message}`);
  }
}

// Принудительный запуск cron-проверки (для отладки в реальном времени,
// не дожидаясь следующего */30 минут).
// /admin_accuracy_cron — принудительно обновить публичные accuracy-данные.
async function handleAdminAccuracyCron(env, chatId) {
  await sendMessage(env, chatId, `🌡 Обновляю публичную accuracy-сводку...`);
  try {
    const reg = await env.STATS.get('acc:registry', { type: 'json' });
    const count = (reg && Array.isArray(reg.locations)) ? reg.locations.length : 0;
    if (count === 0) {
      return sendMessage(env, chatId, `📍 В registry нет локаций. Откройте сайт хотя бы раз — он зарегистрирует свои координаты через /api/accuracy.`);
    }
    await runAccuracyCron(env);
    return sendMessage(env, chatId, `✅ Готово. Обработано ${count} локаций. Смотри логи через wrangler tail.`);
  } catch (err) {
    return sendMessage(env, chatId, `❌ Ошибка: ${esc(err.message)}`, { parse_mode: 'HTML' });
  }
}

// /admin_obs_cron — принудительно переписать actual реальными наблюдениями
// из archive-api (v1.37.0). Полезно для теста сразу после деплоя без
// ожидания 05:00 UTC.
async function handleAdminObsCron(env, chatId) {
  await sendMessage(env, chatId, `📡 Тяну реальные наблюдения из archive-api...`);
  try {
    const reg = await env.STATS.get('acc:registry', { type: 'json' });
    const count = (reg && Array.isArray(reg.locations)) ? reg.locations.length : 0;
    if (count === 0) {
      return sendMessage(env, chatId, `📍 В registry нет локаций.`);
    }
    await runObservationsCron(env);
    return sendMessage(env, chatId, `✅ Готово. Обработано ${count} локаций. Логи через wrangler tail.`);
  } catch (err) {
    return sendMessage(env, chatId, `❌ Ошибка: ${esc(err.message)}`, { parse_mode: 'HTML' });
  }
}

// /admin_summary_test [base|wind|precip|astro|storm|feels|tomorrow|full|chat_id]
// Билдит и шлёт утреннюю сводку прямо сейчас, без проверки времени.
// Без аргумента — full. Если аргумент — chat_id (число), отправляет тому чату с full секциями.
async function handleAdminSummaryTest(env, chatId, args) {
  const parts = (args || '').trim().split(/\s+/).filter(Boolean);
  // Определяем targetChat и mode из аргументов
  let targetChat = chatId;
  let mode = 'full';
  for (const p of parts) {
    if (/^-?\d+$/.test(p)) targetChat = p;
    else mode = p.toLowerCase();
  }
  const sub = await env.SUBSCRIPTIONS.get(`sub:${targetChat}`, { type: 'json' });
  if (!sub) return sendMessage(env, chatId, `Подписка ${esc(String(targetChat))} не найдена.`);

  const sections = (mode === 'base')
    ? {}
    : (mode === 'full')
      ? { wind: true, precip: true, fog: true, astro: true, moon: true, storm: true, feels: true, tomorrow: true }
      : { [mode]: true };

  const fc = await fetchWeather(sub.lat, sub.lon, sub);
  if (!fc) return sendMessage(env, chatId, `Не удалось получить погоду.`);

  const fakeRule = { type: 'morning_summary', hour: 7, minute: 0, sections };
  const msg = buildMorningSummary(sub, fakeRule, fc);
  if (!msg) return sendMessage(env, chatId, `Не удалось построить сводку.`);

  await sendMessage(env, targetChat, msg, { parse_mode: 'HTML' });
  if (String(targetChat) !== String(chatId)) {
    await sendMessage(env, chatId, `✅ Тестовая сводка (${mode}) отправлена в ${esc(String(targetChat))}.`);
  }
}

async function handleAdminCron(env, chatId) {
  await sendMessage(env, chatId, `⏰ Запускаю cron-проверку...`);
  try {
    const res = await runCronCheck(env);
    return sendMessage(env, chatId,
      `✅ Готово.\nОбработано: <b>${res.processed}</b>\nСработало правил: <b>${res.fired}</b>\nОшибок: <b>${res.failed}</b>`,
      { parse_mode: 'HTML' });
  } catch (err) {
    return sendMessage(env, chatId, `❌ Ошибка: ${esc(err.message)}`, { parse_mode: 'HTML' });
  }
}

// Добавить правило себе для теста.
// Форматы:
//   /admin_addrule rain_soon 3
//   /admin_addrule temp_below 0
//   /admin_addrule temp_above 30
//   /admin_addrule storm_alert
//   /admin_addrule dry_streak 5
//   /admin_addrule morning_summary 7 30
async function handleAdminAddRule(env, chatId, args) {
  const parts = args.split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return sendMessage(env, chatId,
      `Использование:\n` +
      `<code>/admin_addrule rain_soon 3</code> (часов, legacy)\n` +
      `<code>/admin_addrule precip_soon 3 rain</code> (часов · rain|snow|both)\n` +
      `<code>/admin_addrule temp_below 0</code>\n` +
      `<code>/admin_addrule temp_above 30</code>\n` +
      `<code>/admin_addrule storm_alert</code>\n` +
      `<code>/admin_addrule dry_streak 5</code> (дней)\n` +
      `<code>/admin_addrule morning_summary 7 30 full</code> (час минута [base|full])`,
      { parse_mode: 'HTML' });
  }
  const [type, p1, p2] = parts;
  const sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  if (!sub) return sendMessage(env, chatId, `Сначала /start.`);
  sub.rules = sub.rules || [];

  let rule = null;
  switch (type) {
    case 'temp_below':       rule = { type, threshold: Number(p1) }; break;
    case 'temp_above':       rule = { type, threshold: Number(p1) }; break;
    case 'rain_soon':        rule = { type, windowHours: Number(p1) || 3 }; break;
    case 'precip_soon': {
      const win = Number(p1) || 3;
      const mode = (p2 || 'rain').toLowerCase();
      rule = {
        type,
        windowHours: win,
        watchRain: mode === 'rain' || mode === 'both',
        watchSnow: mode === 'snow' || mode === 'both'
      };
      break;
    }
    case 'storm_alert':      rule = { type }; break;
    case 'dry_streak':       rule = { type, days: Number(p1) || 3 }; break;
    case 'morning_summary': {
      const mode = (parts[3] || 'base').toLowerCase();
      const sections = mode === 'full'
        ? { wind: true, precip: true, fog: true, astro: true, moon: true, storm: true, feels: true, tomorrow: true }
        : undefined;
      rule = { type, hour: Number(p1) || 7, minute: Number(p2) || 0 };
      if (sections) rule.sections = sections;
      break;
    }
    default: return sendMessage(env, chatId, `Неизвестный тип: ${esc(type)}`);
  }
  sub.rules.push(rule);
  await env.SUBSCRIPTIONS.put(`sub:${chatId}`, JSON.stringify(sub));
  return sendMessage(env, chatId, `✅ Добавлено: ${esc(formatRule(rule))}\nВсего правил: ${sub.rules.length}`, { parse_mode: 'HTML' });
}

async function handleAdminClearRules(env, chatId) {
  const sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  if (!sub) return sendMessage(env, chatId, `Сначала /start.`);
  sub.rules = [];
  sub.lastFired = {};
  await env.SUBSCRIPTIONS.put(`sub:${chatId}`, JSON.stringify(sub));
  return sendMessage(env, chatId, `🗑 Все правила удалены.`);
}

// /admin_cooldowns [chat_id]
// Без аргумента — для текущего чата. С аргументом — для указанной подписки.
async function handleAdminCooldowns(env, chatId, args) {
  const targetId = args.trim() || String(chatId);
  const sub = await env.SUBSCRIPTIONS.get(`sub:${targetId}`, { type: 'json' });
  if (!sub) return sendMessage(env, chatId, `Подписка ${esc(targetId)} не найдена.`);

  if (!sub.rules || sub.rules.length === 0) {
    return sendMessage(env, chatId, `У подписки ${targetId} нет правил.`);
  }

  const now = Date.now();
  const todayISO = new Date().toISOString().slice(0,10);
  const lines = [];
  for (const rule of sub.rules) {
    const key = ruleKeyOf(rule);
    const last = (sub.lastFired || {})[key];
    const cooldownMs = COOLDOWNS_MS[rule.type];
    let status;
    if (rule.type === 'morning_summary') {
      if (last === todayISO) status = `сегодня уже было, ждёт завтра`;
      else if (last) status = `последнее: ${esc(last)}, готово к отправке`;
      else status = `никогда не срабатывало, готово`;
    } else if (cooldownMs) {
      if (!last) {
        status = `никогда, готово к отправке`;
      } else {
        const lastMs = new Date(last).getTime();
        const remaining = (lastMs + cooldownMs) - now;
        if (remaining <= 0) {
          status = `готово (cooldown истёк)`;
        } else {
          const h = Math.floor(remaining / 3600000);
          const m = Math.floor((remaining % 3600000) / 60000);
          status = `cooldown ещё ${h}ч ${m}м`;
        }
      }
    } else {
      status = '?';
    }
    lines.push(`${esc(formatRule(rule))}\n   <i>${status}</i>`);
  }

  return sendMessage(env, chatId,
    `⏱ <b>Cooldown'ы подписки ${esc(targetId)}:</b>\n\n` + lines.join('\n\n'),
    { parse_mode: 'HTML' });
}

// ============================================================
// HTTP API для сайта (фаза Б3)
// ============================================================

// Whitelist origin'ов с которых разрешены CORS-запросы
const ALLOWED_ORIGINS = [
  'https://meteo-star.github.io',
  'http://localhost:8000',
  'http://localhost:8765',
  'http://127.0.0.1:8000',
  'http://127.0.0.1:8765'
];

function corsHeaders(origin) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, x-admin-token',
    'Access-Control-Max-Age': '86400'
  };
}

function withCors(response, origin) {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(corsHeaders(origin))) headers.set(k, v);
  return new Response(response.body, { status: response.status, headers });
}

function jsonResp(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

async function handleApi(url, request, env, ctx) {
  const origin = request.headers.get('Origin');

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  const path = url.pathname;

  // POST /api/pair-create  { code }  →  { ok: true } | { error }
  // Регистрирует код для будущей связки. Сайт показывает код пользователю,
  // тот пишет /pair <code> в боте. TTL 10 минут.
  if (path === '/api/pair-create' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const code = String(body.code || '').trim();
    if (!/^\d{6}$/.test(code)) {
      return withCors(jsonResp({ error: 'invalid_code' }, 400), origin);
    }
    const existing = await env.PAIRING.get(`pair:${code}`);
    if (existing) {
      return withCors(jsonResp({ error: 'code_taken' }, 409), origin);
    }
    await env.PAIRING.put(`pair:${code}`,
      JSON.stringify({ chatId: null, pairToken: null, createdAt: new Date().toISOString() }),
      { expirationTtl: 600 }  // 10 минут
    );
    return withCors(jsonResp({ ok: true }), origin);
  }

  // GET /api/pair-poll?code=123456  →  { ok, chatId?, pairToken?, name? }
  // Сайт спрашивает раз в 3 секунды до получения данных.
  if (path === '/api/pair-poll' && request.method === 'GET') {
    const code = url.searchParams.get('code') || '';
    if (!/^\d{6}$/.test(code)) {
      return withCors(jsonResp({ error: 'invalid_code' }, 400), origin);
    }
    const raw = await env.PAIRING.get(`pair:${code}`);
    if (!raw) {
      return withCors(jsonResp({ error: 'expired_or_not_found' }, 404), origin);
    }
    const data = JSON.parse(raw);
    if (!data.chatId) {
      return withCors(jsonResp({ ok: true, status: 'pending' }), origin);
    }
    // Получаем имя/локацию подписки, чтобы вернуть для UI
    const sub = await env.SUBSCRIPTIONS.get(`sub:${data.chatId}`, { type: 'json' });
    // Удаляем pair: запись — она больше не нужна
    await env.PAIRING.delete(`pair:${code}`);
    return withCors(jsonResp({
      ok: true,
      status: 'linked',
      chatId: data.chatId,
      pairToken: data.pairToken,
      name: sub?.name || null,
      username: sub?.username || null,
      firstName: sub?.firstName || null,
      chatType: sub?.chatType || 'private',
      chatTitle: sub?.chatTitle || null
    }), origin);
  }

  // POST /api/rules-get  { chatId, pairToken }  →  { rules: [], name }
  if (path === '/api/rules-get' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const sub = await authSub(env, body);
    if (!sub) return withCors(jsonResp({ error: 'unauthorized' }, 401), origin);
    return withCors(jsonResp({ rules: sub.rules || [], name: sub.name, lang: sub.lang, source: sub.source || 'avg' }), origin);
  }

  // POST /api/rules-set  { chatId, pairToken, rules: [] }  →  { ok: true }
  if (path === '/api/rules-set' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const sub = await authSub(env, body);
    if (!sub) return withCors(jsonResp({ error: 'unauthorized' }, 401), origin);

    // rules опционально: если поле передано — обновляем правила и сбрасываем
    // cooldown'ы. Если не передано — сайт хочет обновить только lang/source,
    // правила оставляем как есть. См. syncLangToBot в app.js.
    if (Array.isArray(body.rules)) {
      sub.rules = body.rules.filter(validateRule).slice(0, 20);
      sub.lastFired = {};
    }
    // Сохраняем выбранный пользователем источник погоды — fetchWeather будет
    // использовать его при cron-проверках. Если 'avg' / null — все 8 моделей.
    if (typeof body.source === 'string') {
      const allowed = ['avg', 'ecmwf', 'aifs', 'gfs', 'icon', 'gem', 'jma', 'mf', 'ukmo'];
      if (allowed.includes(body.source)) sub.source = body.source;
    }
    // Фаза 3 i18n: сайт может прислать lang при смене языка в Settings —
    // следующее push-уведомление приходит уже на новом языке.
    if (typeof body.lang === 'string') {
      const allowedLangs = ['ru','uk','en','de','pl','cs','fr','it','es','ro','hu','sk','pt','nl','tr','el'];
      if (allowedLangs.includes(body.lang)) sub.lang = body.lang;
    }
    await env.SUBSCRIPTIONS.put(`sub:${body.chatId}`, JSON.stringify(sub));
    return withCors(jsonResp({ ok: true, count: (sub.rules || []).length, source: sub.source || 'avg', lang: sub.lang }), origin);
  }

  // GET /api/accuracy?lat=X&lon=Y → { records: [...], updated: ts }
  // Публичный анонимный endpoint — возвращает накопленные accuracy-данные
  // для точки на 0.1° сетке. Заодно регистрирует точку как «интересную»
  // в acc:registry, чтобы cron обновлял её ежедневно.
  //
  // Тонкий момент: один и тот же физический город (например Высокий) может
  // оказаться на разных 0.1°-ячейках в зависимости от способа задания
  // координат (city-picker 49.91/36.21 → 49.9_36.2; geolocation 49.89/36.12
  // → 49.9_36.1). Чтобы юзер не видел два разных счётчика для одного места,
  // проверяем не только центральную ячейку, но и 8 соседних (радиус 10км).
  // Возвращаем ячейку с максимальным числом замеров (центр имеет небольшой
  // бонус — если данные есть и тут, и у соседа, центр в приоритете).
  if (path === '/api/accuracy' && request.method === 'GET') {
    const lat = parseFloat(url.searchParams.get('lat'));
    const lon = parseFloat(url.searchParams.get('lon'));
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return withCors(jsonResp({ error: 'invalid_coords' }, 400), origin);
    }
    const [lat1, lon1] = accGridCoords(lat, lon);
    // Регистрация — для центральной ячейки (cron будет копить именно тут)
    ctx.waitUntil(registerAccuracyLocation(env, lat1, lon1));

    // Перебираем центр + 8 соседних с шагом 0.1°
    const offsets = [
      [0, 0], [-0.1, 0], [0.1, 0], [0, -0.1], [0, 0.1],
      [-0.1, -0.1], [-0.1, 0.1], [0.1, -0.1], [0.1, 0.1]
    ];
    let best = null;
    let bestScore = -1;
    let bestKey = null;
    for (const [dlat, dlon] of offsets) {
      const cellLat = Math.round((lat1 + dlat) * 10) / 10;
      const cellLon = Math.round((lon1 + dlon) * 10) / 10;
      const k = `acc:loc:${cellLat.toFixed(1)}_${cellLon.toFixed(1)}`;
      const stored = await env.STATS.get(k, { type: 'json' });
      if (!stored || !Array.isArray(stored.records)) continue;
      const withActual = stored.records.filter(r => r.actual).length;
      // Центральная ячейка получает небольшой бонус — при равенстве выбираем её
      const score = withActual + (dlat === 0 && dlon === 0 ? 0.5 : 0);
      if (score > bestScore) {
        bestScore = score;
        best = stored;
        bestKey = k;
      }
    }
    if (!best) {
      return withCors(jsonResp({ ok: true, records: [], updated: null, sampleSize: 0 }), origin);
    }
    return withCors(jsonResp({
      ok: true,
      records: best.records || [],
      updated: best.updated || null,
      sampleSize: (best.records || []).filter(r => r.actual).length,
      cell: bestKey  // для отладки — какая ячейка реально вернулась
    }), origin);
  }

  // POST /api/auth-claim  { token }  →  { chatId, pairToken, name, chatTitle, chatType }
  // Магическая ссылка из /login команды бота — обмен короткого auth-токена
  // на постоянный pairToken. Используется для входа с нового устройства.
  if (path === '/api/auth-claim' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const token = String(body.token || '').trim();
    if (!/^[0-9a-f]{32}$/.test(token)) {
      return withCors(jsonResp({ error: 'invalid_token' }, 400), origin);
    }
    const raw = await env.PAIRING.get(`auth:${token}`);
    if (!raw) {
      return withCors(jsonResp({ error: 'expired_or_used' }, 404), origin);
    }
    const data = JSON.parse(raw);
    // Удаляем — токен одноразовый
    await env.PAIRING.delete(`auth:${token}`);
    // Получаем имя/локацию подписки для UI
    const sub = await env.SUBSCRIPTIONS.get(`sub:${data.chatId}`, { type: 'json' });
    if (!sub || sub.banned) {
      return withCors(jsonResp({ error: 'subscription_not_found' }, 404), origin);
    }
    return withCors(jsonResp({
      ok: true,
      chatId: data.chatId,
      pairToken: data.pairToken,
      name: sub.name,
      username: sub.username,
      firstName: sub.firstName,
      chatType: sub.chatType || 'private',
      chatTitle: sub.chatTitle || null
    }), origin);
  }

  // POST /api/unpair  { chatId, pairToken }  →  { ok: true }
  // Отвязывает ТОЛЬКО это устройство (удаляет его pairToken из массива).
  // Другие устройства остаются подключёнными. Подписка в боте сохраняется.
  if (path === '/api/unpair' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const sub = await authSub(env, body);
    if (!sub) return withCors(jsonResp({ error: 'unauthorized' }, 401), origin);
    removePairToken(sub, body.pairToken);
    await env.SUBSCRIPTIONS.put(`sub:${body.chatId}`, JSON.stringify(sub));
    return withCors(jsonResp({ ok: true }), origin);
  }

  // ===== ADMIN endpoints (фаза Б4, защищены ADMIN_TOKEN) =====
  if (path.startsWith('/api/admin/')) {
    return handleAdminApi(path, request, env, origin);
  }

  return withCors(jsonResp({ error: 'not_found' }, 404), origin);
}

async function handleAdminApi(path, request, env, origin) {
  // Авторизация: X-Admin-Token header должен совпадать с ADMIN_TOKEN secret.
  // Защита от брутфорса: считаем неудачные попытки login по IP, при 5+
  // блокируем на 10 минут. Без этого короткий пароль легко перебрать.
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const failKey = `admin_fails:${ip}`;
  const failData = await env.STATS.get(failKey, { type: 'json' });

  // Проверяем не заблокирован ли IP
  if (failData?.blockUntil && Date.now() < failData.blockUntil) {
    const remainMin = Math.ceil((failData.blockUntil - Date.now()) / 60000);
    return withCors(jsonResp({ error: 'rate_limited', remain: remainMin }, 429), origin);
  }

  const token = request.headers.get('X-Admin-Token');
  if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
    // Только для /login инкрементируем счётчик попыток. Остальные endpoints
    // тоже требуют токен, но обычно их вызывает уже-залогиненный фронтенд,
    // подсчёт там бессмыслен.
    if (path === '/api/admin/login') {
      const count = (failData?.count || 0) + 1;
      const newData = { count };
      if (count >= 5) {
        // Блок на 10 минут
        newData.blockUntil = Date.now() + 10 * 60 * 1000;
      }
      await env.STATS.put(failKey, JSON.stringify(newData), { expirationTtl: 3600 });
    }
    return withCors(jsonResp({ error: 'unauthorized' }, 401), origin);
  }

  // Успешный логин — сбрасываем счётчик
  if (path === '/api/admin/login' && failData) {
    await env.STATS.delete(failKey);
  }

  // GET /api/admin/login — просто проверка валидности токена (для UI)
  if (path === '/api/admin/login' && request.method === 'GET') {
    return withCors(jsonResp({ ok: true }), origin);
  }

  // GET /api/admin/list — все подписки с детальной инфой
  if (path === '/api/admin/list' && request.method === 'GET') {
    const list = await env.SUBSCRIPTIONS.list({ prefix: 'sub:' });
    const subs = [];
    for (const key of list.keys) {
      const sub = await env.SUBSCRIPTIONS.get(key.name, { type: 'json' });
      if (!sub) continue;
      subs.push({
        chatId: sub.chatId,
        username: sub.username,
        firstName: sub.firstName,
        chatTitle: sub.chatTitle || null,
        initiator: sub.initiator || null,
        name: sub.name,
        lat: sub.lat,
        lon: sub.lon,
        lang: sub.lang,
        rulesCount: (sub.rules || []).length,
        rules: sub.rules || [],
        createdAt: sub.createdAt,
        banned: !!sub.banned,
        paired: !!sub.pairToken,
        chatType: sub.chatType || 'private',
        lastFiredCount: Object.keys(sub.lastFired || {}).length
      });
    }
    return withCors(jsonResp({ subs }), origin);
  }

  // GET /api/admin/stats?days=7 — статистика за N дней
  if (path === '/api/admin/stats' && request.method === 'GET') {
    const url = new URL(request.url);
    const days = Math.min(parseInt(url.searchParams.get('days') || '7', 10), 90);
    const today = new Date();
    const dayStats = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(today.getTime() - i * 86400000);
      const key = `stats:${d.toISOString().slice(0,10)}`;
      const stats = (await env.STATS.get(key, { type: 'json' })) || {};
      dayStats.push({
        date: d.toISOString().slice(0,10),
        ...stats
      });
    }
    const totalSubs = (await env.SUBSCRIPTIONS.list({ prefix: 'sub:' })).keys.length;
    return withCors(jsonResp({ totalSubs, dayStats }), origin);
  }

  // POST /api/admin/broadcast { text } — рассылка всем
  if (path === '/api/admin/broadcast' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const text = (body.text || '').toString().trim();
    if (!text) return withCors(jsonResp({ error: 'empty_text' }, 400), origin);

    const list = await env.SUBSCRIPTIONS.list({ prefix: 'sub:' });
    let sent = 0, failed = 0;
    for (const key of list.keys) {
      const sub = await env.SUBSCRIPTIONS.get(key.name, { type: 'json' });
      if (!sub || sub.banned) continue;
      try {
        await sendMessage(env, sub.chatId, text);
        sent++;
        await sleep(40);
      } catch (e) { failed++; }
    }
    return withCors(jsonResp({ ok: true, sent, failed }), origin);
  }

  // POST /api/admin/ban { chatId }
  if (path === '/api/admin/ban' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const chatId = body.chatId;
    if (!chatId) return withCors(jsonResp({ error: 'no_chat_id' }, 400), origin);
    const key = `sub:${chatId}`;
    const sub = await env.SUBSCRIPTIONS.get(key, { type: 'json' });
    if (!sub) return withCors(jsonResp({ error: 'not_found' }, 404), origin);
    sub.banned = true;
    await env.SUBSCRIPTIONS.put(key, JSON.stringify(sub));
    return withCors(jsonResp({ ok: true }), origin);
  }

  // POST /api/admin/unban { chatId }
  if (path === '/api/admin/unban' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const chatId = body.chatId;
    if (!chatId) return withCors(jsonResp({ error: 'no_chat_id' }, 400), origin);
    const key = `sub:${chatId}`;
    const sub = await env.SUBSCRIPTIONS.get(key, { type: 'json' });
    if (!sub) return withCors(jsonResp({ error: 'not_found' }, 404), origin);
    sub.banned = false;
    await env.SUBSCRIPTIONS.put(key, JSON.stringify(sub));
    return withCors(jsonResp({ ok: true }), origin);
  }

  // POST /api/admin/test { chatId, text? }
  if (path === '/api/admin/test' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const chatId = body.chatId;
    const text = body.text || '🧪 Тестовое сообщение от админа.';
    if (!chatId) return withCors(jsonResp({ error: 'no_chat_id' }, 400), origin);
    try {
      await sendMessage(env, chatId, text);
      return withCors(jsonResp({ ok: true }), origin);
    } catch (e) {
      return withCors(jsonResp({ error: e.message }, 500), origin);
    }
  }

  // POST /api/admin/cron — принудительный запуск cron-проверки
  if (path === '/api/admin/cron' && request.method === 'POST') {
    const res = await runCronCheck(env);
    return withCors(jsonResp({ ok: true, ...res }), origin);
  }

  // POST /api/admin/delete-sub { chatId } — полное удаление подписки
  if (path === '/api/admin/delete-sub' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const chatId = body.chatId;
    if (!chatId) return withCors(jsonResp({ error: 'no_chat_id' }, 400), origin);
    await env.SUBSCRIPTIONS.delete(`sub:${chatId}`);
    return withCors(jsonResp({ ok: true }), origin);
  }

  return withCors(jsonResp({ error: 'not_found' }, 404), origin);
}

// Авторизация устройства: chat_id один (= один пользователь, общие
// настройки уведомлений), но pairToken'ов может быть несколько (по одному
// на каждое устройство). Когда юзер делает /login с нового устройства,
// новый токен ДОБАВЛЯЕТСЯ в массив, а не перетирает старый — это значит
// iPhone и ПК остаются «привязанными» одновременно.
//
// Backward-compat: если в KV ещё лежит старая структура с одним
// sub.pairToken — обрабатываем её как массив из одного элемента.
async function authSub(env, body) {
  const chatId = body.chatId;
  const pairToken = body.pairToken;
  if (!chatId || !pairToken) return null;
  const sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  if (!sub) return null;
  if (sub.banned) return null;
  const validTokens = getPairTokens(sub);
  if (!validTokens.includes(pairToken)) return null;
  return sub;
}

// Возвращает массив активных pairToken'ов подписки (унифицированный API
// над legacy `sub.pairToken` и новым `sub.pairTokens`).
function getPairTokens(sub) {
  if (!sub) return [];
  if (Array.isArray(sub.pairTokens) && sub.pairTokens.length > 0) {
    return sub.pairTokens.filter(t => typeof t === 'string' && t.length > 0);
  }
  if (typeof sub.pairToken === 'string' && sub.pairToken.length > 0) {
    return [sub.pairToken];
  }
  return [];
}

// Добавляет новый pairToken в массив. Сохраняет до MAX_TOKENS_PER_SUB
// последних — старые автоматически выпадают (юзер давно не пользовался).
const MAX_TOKENS_PER_SUB = 8;
function addPairToken(sub, newToken) {
  if (!sub || !newToken) return;
  const existing = getPairTokens(sub);
  if (existing.includes(newToken)) return;
  existing.push(newToken);
  // Лимит — последние N токенов
  sub.pairTokens = existing.slice(-MAX_TOKENS_PER_SUB);
  // Чистим legacy поле, чтоб не было путаницы
  delete sub.pairToken;
}

// Удаляет один pairToken (для /api/unpair с конкретного устройства).
function removePairToken(sub, token) {
  if (!sub || !token) return;
  const existing = getPairTokens(sub);
  sub.pairTokens = existing.filter(t => t !== token);
  delete sub.pairToken;
}

// Пороги чувствительности для precip-уведомлений.
// 'low' — только сильные осадки. 'med' — баланс (default). 'high' — даже моросящий дождь.
function precipThresholds(sensitivity) {
  switch (sensitivity) {
    case 'low':  return [60, 0.3];
    case 'high': return [25, 0.1];
    case 'med':
    default:     return [40, 0.2];
  }
}

function validateRule(r) {
  if (!r || typeof r !== 'object') return false;
  switch (r.type) {
    case 'temp_below':
    case 'temp_above':
      return Number.isFinite(Number(r.threshold));
    case 'rain_soon':
      // legacy — оставляем для обратной совместимости (старые подписки)
      return Number.isFinite(Number(r.windowHours)) && r.windowHours > 0 && r.windowHours <= 48;
    case 'precip_soon':
      // Новый тип с подразделами "дождь"/"снег". Хотя бы один должен быть включён.
      // sensitivity — опциональный 'low' | 'med' | 'high', default 'med'.
      if (r.sensitivity != null && !['low', 'med', 'high'].includes(r.sensitivity)) return false;
      return Number.isFinite(Number(r.windowHours)) && r.windowHours > 0 && r.windowHours <= 48
        && (r.watchRain === true || r.watchSnow === true);
    case 'storm_alert':
      return true;
    case 'dry_streak':
      return Number.isFinite(Number(r.days)) && r.days > 0 && r.days <= 10;
    case 'morning_summary':
      // sections — опциональный объект булевых флагов; если не передан, используется базовая сводка.
      if (r.sections != null && (typeof r.sections !== 'object' || Array.isArray(r.sections))) return false;
      return Number.isFinite(Number(r.hour)) && r.hour >= 0 && r.hour <= 23
        && Number.isFinite(Number(r.minute)) && r.minute >= 0 && r.minute <= 59;
    default: return false;
  }
}

// ============================================================
// CRON — проверка правил каждые 30 минут (фаза Б2)
// ============================================================

// Cooldown'ы — минимальное время между двумя срабатываниями одного правила.
// Защита от спама: даже если условие держится долго, не шлём чаще чем раз в N часов.
const COOLDOWNS_MS = {
  temp_below:      12 * 3600 * 1000,
  temp_above:      12 * 3600 * 1000,
  // v1.50.3: precip-cooldown снижен с 6ч до 3ч. 6ч было перебором — за это
  // время может пройти один дождевой эпизод и начаться второй. 3ч + smart-
  // reset (см. runCronCheck) даёт нормальный баланс «не спамить vs полезно».
  rain_soon:        3 * 3600 * 1000,
  precip_soon:      3 * 3600 * 1000,
  storm_alert:     12 * 3600 * 1000,
  dry_streak:      24 * 3600 * 1000,
  // morning_summary — особый случай: проверяется по дате, не cooldown
};

// ============================================================
// ПУБЛИЧНАЯ ACCURACY-СВОДКА (вариант С из обсуждения)
// Бот раз в сутки обходит все «интересные» координаты и обновляет
// MAE-данные на 0.1° сетке. Сайт читает их через /api/accuracy.
// ============================================================

// Округление координат до 0.1° (та же сетка что в app.js)
function accGridCoords(lat, lon) {
  return [Math.round(lat * 10) / 10, Math.round(lon * 10) / 10];
}

const ACC_REGISTRY_KEY = 'acc:registry';
const ACC_MAX_RECORDS = 30;
const ACC_REGISTRY_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 дней без запросов → удаление

// Добавляет/обновляет точку в registry «интересных» координат.
// Вызывается при каждом GET /api/accuracy.
async function registerAccuracyLocation(env, lat1, lon1) {
  try {
    const raw = await env.STATS.get(ACC_REGISTRY_KEY, { type: 'json' });
    const reg = (raw && Array.isArray(raw.locations)) ? raw.locations : [];
    const now = Date.now();
    const idx = reg.findIndex(l => l.lat === lat1 && l.lon === lon1);
    if (idx >= 0) {
      reg[idx].lastReq = now;
    } else {
      reg.push({ lat: lat1, lon: lon1, lastReq: now });
    }
    await env.STATS.put(ACC_REGISTRY_KEY, JSON.stringify({ locations: reg }));
  } catch (e) {
    console.error('registerAccuracyLocation:', e);
  }
}

// Раз в сутки обходит registry, тянет Open-Meteo с 8 моделями для каждой точки,
// обновляет accuracy-records аналогично логике на сайте (но на стороне сервера —
// данные общие для всех пользователей этой точки).
async function runAccuracyCron(env) {
  try {
    const raw = await env.STATS.get(ACC_REGISTRY_KEY, { type: 'json' });
    const reg = (raw && Array.isArray(raw.locations)) ? raw.locations : [];
    const now = Date.now();
    // Чистим старые точки (не запрашивались > 30 дней)
    const active = reg.filter(l => (now - (l.lastReq || 0)) < ACC_REGISTRY_TTL_MS);
    if (active.length !== reg.length) {
      await env.STATS.put(ACC_REGISTRY_KEY, JSON.stringify({ locations: active }));
    }
    console.log(`[accuracy-cron] processing ${active.length} locations`);
    let ok = 0, failed = 0;
    for (const loc of active) {
      try {
        const byModel = await fetchModelsForecast(loc.lat, loc.lon);
        if (!byModel) { failed++; continue; }
        await updateAccuracyForLocation(env, loc.lat, loc.lon, byModel);
        ok++;
        await sleep(200); // не топим Open-Meteo
      } catch (e) {
        console.error(`[accuracy-cron] loc ${loc.lat},${loc.lon}:`, e);
        failed++;
      }
    }
    console.log(`[accuracy-cron] done: ok=${ok} failed=${failed}`);
  } catch (e) {
    console.error('runAccuracyCron:', e);
  }
}

// Open-Meteo с 8 моделями. Возвращает { ecmwf: [...], gfs: [...], ..., avg: [...] }
// где каждый массив — дни (только metrics нужные для accuracy: tempMax/Min/precipSum).
async function fetchModelsForecast(lat, lon) {
  const MODELS = ['ecmwf_ifs025', 'ecmwf_aifs025_single',
                  'gfs_seamless', 'icon_seamless', 'gem_seamless',
                  'jma_seamless', 'meteofrance_seamless', 'ukmo_seamless'];
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '5',
    models: MODELS.join(',')
  });
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!r.ok) return null;
    const data = await r.json();
    const daily = data.daily || {};
    const times = daily.time || [];
    const byModel = {};
    // Open-Meteo возвращает поля с суффиксом модели: temperature_2m_max_ecmwf_ifs04
    const modelKeyMap = {
      ecmwf_ifs025: 'ecmwf', ecmwf_aifs025_single: 'aifs',
      gfs_seamless: 'gfs', icon_seamless: 'icon',
      gem_seamless: 'gem', jma_seamless: 'jma',
      meteofrance_seamless: 'mf', ukmo_seamless: 'ukmo'
    };
    for (const m of MODELS) {
      const tmax = daily[`temperature_2m_max_${m}`] || [];
      const tmin = daily[`temperature_2m_min_${m}`] || [];
      const psum = daily[`precipitation_sum_${m}`] || [];
      const pprob = daily[`precipitation_probability_max_${m}`] || [];
      const days = times.map((t, i) => ({
        date: t,
        tempMax: tmax[i],
        tempMin: tmin[i],
        precipSum: psum[i],
        precipProb: pprob[i]
      }));
      byModel[modelKeyMap[m]] = days;
    }
    // Вычисляем avg как среднее по всем моделям
    const avg = times.map((t, i) => {
      const tmaxes = [], tmins = [], psums = [], pprobs = [];
      for (const m of MODELS) {
        const k = modelKeyMap[m];
        const d = byModel[k][i];
        if (d.tempMax != null) tmaxes.push(d.tempMax);
        if (d.tempMin != null) tmins.push(d.tempMin);
        if (d.precipSum != null) psums.push(d.precipSum);
        if (d.precipProb != null) pprobs.push(d.precipProb);
      }
      const mean = arr => arr.length ? arr.reduce((s, x) => s + x, 0) / arr.length : null;
      return { date: t, tempMax: mean(tmaxes), tempMin: mean(tmins), precipSum: mean(psums), precipProb: mean(pprobs) };
    });
    byModel.avg = avg;
    return byModel;
  } catch (e) {
    console.error('fetchModelsForecast:', e);
    return null;
  }
}

// Обновляет accuracy-records для точки: заполняет actual для записей с date=today
// (из byModel.avg[0]) и добавляет новые predictions на +1 и +2 дня.
async function updateAccuracyForLocation(env, lat1, lon1, byModel) {
  const key = `acc:loc:${lat1.toFixed(1)}_${lon1.toFixed(1)}`;
  const stored = (await env.STATS.get(key, { type: 'json' })) || { records: [] };
  const records = Array.isArray(stored.records) ? stored.records : [];
  const today = byModel.avg[0]?.date;
  if (!today) return;

  // (a) Заполнить actual для записей где date === today
  const todayActual = byModel.avg[0];
  for (const rec of records) {
    if (!rec.actual && rec.date === today) {
      rec.actual = {
        tempMax: todayActual.tempMax,
        tempMin: todayActual.tempMin,
        precipSum: todayActual.precipSum,
        precipProb: todayActual.precipProb
      };
    }
  }

  // (b) Добавить predictions на +1 и +2 дня
  for (let offset = 1; offset <= 2; offset++) {
    const day = byModel.avg[offset];
    if (!day || !day.date) continue;
    const targetDate = day.date;
    if (records.some(r => r.date === targetDate)) continue;
    const predictions = {};
    let hasAny = false;
    for (const k of Object.keys(byModel)) {
      const d = byModel[k][offset];
      if (d && d.tempMax != null) {
        predictions[k] = { tempMax: d.tempMax, tempMin: d.tempMin, precipSum: d.precipSum, precipProb: d.precipProb };
        hasAny = true;
      }
    }
    if (hasAny) records.push({ date: targetDate, predictions, actual: null });
  }

  records.sort((a, b) => a.date.localeCompare(b.date));
  // Лимит — последние 30 записей
  const trimmed = records.length > ACC_MAX_RECORDS ? records.slice(-ACC_MAX_RECORDS) : records;
  await env.STATS.put(key, JSON.stringify({ records: trimmed, updated: new Date().toISOString() }));
}

// === v1.37.0: реальные наблюдения из Open-Meteo Archive API ===
// Раньше actual в accuracy-records заполнялся через avg[0] (текущий прогноз
// AVG на сегодня) — это proxy, который искусственно занижает MAE для моделей
// близких к AVG (главным образом ECMWF). Теперь раз в сутки бот после
// runAccuracyCron обходит все локации, тянет реальные max/min/precip из
// Open-Meteo Archive (ERA5 + ERA5T, бесплатно, без ключа) для дат T-7..T-2
// (archive публикует данные с задержкой ~5 дней) и переписывает actual.
// Это даёт честное сравнение моделей vs ground truth, а не vs ансамбль.
//
// PrecipProb из archive не доступен (только precipSum мм/сутки) — оставляем
// как было (proxy от avg). Это самая слабая метрика в нашем MAE-наборе.
async function fetchObservations(lat, lon, startDate, endDate) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
    timezone: 'auto',
    start_date: startDate,
    end_date: endDate
  });
  try {
    const r = await fetch(`https://archive-api.open-meteo.com/v1/archive?${params}`);
    if (!r.ok) return null;
    const data = await r.json();
    const daily = data.daily || {};
    const times = daily.time || [];
    const tmax = daily.temperature_2m_max || [];
    const tmin = daily.temperature_2m_min || [];
    const psum = daily.precipitation_sum || [];
    const result = {};
    for (let i = 0; i < times.length; i++) {
      if (tmax[i] == null && tmin[i] == null && psum[i] == null) continue;
      result[times[i]] = {
        tempMax: tmax[i],
        tempMin: tmin[i],
        precipSum: psum[i]
      };
    }
    return result;
  } catch (e) {
    console.error('fetchObservations:', e);
    return null;
  }
}

// Обновляет accuracy-records реальными наблюдениями.
// Возвращает кол-во обновлённых записей.
async function updateObservationsForLocation(env, lat1, lon1) {
  const key = `acc:loc:${lat1.toFixed(1)}_${lon1.toFixed(1)}`;
  const stored = await env.STATS.get(key, { type: 'json' });
  if (!stored || !Array.isArray(stored.records) || stored.records.length === 0) return 0;
  const records = stored.records;

  // Окно: T-8d (archive публикует с задержкой 3-7 дней, иногда дальше) до T-2d.
  // Без T-1d / today чтобы не задеть свежие записи у которых archive пока null.
  const today = new Date();
  const fmt = (d) => d.toISOString().slice(0, 10);
  const start = new Date(today); start.setDate(start.getDate() - 8);
  const end = new Date(today); end.setDate(end.getDate() - 2);
  const startDate = fmt(start);
  const endDate = fmt(end);

  // Есть ли в принципе записи в этом окне которые имело бы смысл обновить?
  const candidates = records.filter(r =>
    r.date >= startDate && r.date <= endDate &&
    (!r.actualSource || r.actualSource !== 'archive')
  );
  if (candidates.length === 0) return 0;

  const obs = await fetchObservations(lat1, lon1, startDate, endDate);
  if (!obs) return 0;

  let updated = 0;
  for (const rec of records) {
    const o = obs[rec.date];
    if (!o) continue;
    // Перезаписываем actual реальными значениями; precipProb (если был
    // proxy от avg) сохраняем для совместимости со старым composite MAE.
    const prevPrecipProb = rec.actual && typeof rec.actual.precipProb === 'number'
      ? rec.actual.precipProb : null;
    rec.actual = {
      tempMax: o.tempMax,
      tempMin: o.tempMin,
      precipSum: o.precipSum,
      precipProb: prevPrecipProb
    };
    rec.actualSource = 'archive';
    updated++;
  }
  if (updated > 0) {
    await env.STATS.put(key, JSON.stringify({
      records, updated: new Date().toISOString(), observationsUpdated: new Date().toISOString()
    }));
  }
  return updated;
}

// Запускается ПОСЛЕ runAccuracyCron в том же daily-cron (04:00 UTC).
// Обходит registry, тянет archive для T-8..T-2, переписывает actual.
async function runObservationsCron(env) {
  try {
    const raw = await env.STATS.get(ACC_REGISTRY_KEY, { type: 'json' });
    const reg = (raw && Array.isArray(raw.locations)) ? raw.locations : [];
    const now = Date.now();
    const active = reg.filter(l => (now - (l.lastReq || 0)) < ACC_REGISTRY_TTL_MS);
    console.log(`[obs-cron] processing ${active.length} locations`);
    let totalUpdated = 0, ok = 0, failed = 0;
    for (const loc of active) {
      try {
        const n = await updateObservationsForLocation(env, loc.lat, loc.lon);
        totalUpdated += n;
        ok++;
        await sleep(250); // archive-api тоже не топим
      } catch (e) {
        console.error(`[obs-cron] loc ${loc.lat},${loc.lon}:`, e);
        failed++;
      }
    }
    console.log(`[obs-cron] done: ok=${ok} failed=${failed} updated_records=${totalUpdated}`);
  } catch (e) {
    console.error('runObservationsCron:', e);
  }
}

async function runCronCheck(env) {
  await incrementStat(env, 'cron_runs');

  const list = await env.SUBSCRIPTIONS.list({ prefix: 'sub:' });
  let processed = 0;
  let fired = 0;
  let failed = 0;

  for (const key of list.keys) {
    try {
      const sub = await env.SUBSCRIPTIONS.get(key.name, { type: 'json' });
      if (!sub || sub.banned) continue;
      if (!Array.isArray(sub.rules) || sub.rules.length === 0) continue;

      // Тянем погоду один раз для всех правил этой подписки
      const fc = await fetchWeather(sub.lat, sub.lon, sub);
      if (!fc) continue;

      let changed = false;
      sub.lastFired = sub.lastFired || {};

      for (const rule of sub.rules) {
        if (!rule || !rule.type) continue;
        const ruleKey = ruleKeyOf(rule);

        // v1.50.3: для precip-правил мы НЕ просто пропускаем cron при активном
        // cooldown — нам надо детектировать конец «дождевого эпизода» чтобы
        // сбросить lastFired и дать следующему эпизоду пройти раньше срока.
        // Поэтому считаем cooldownActive как флаг и решаем позже что делать.
        const isPrecip = (rule.type === 'precip_soon' || rule.type === 'rain_soon');
        let cooldownActive = false;
        if (COOLDOWNS_MS[rule.type]) {
          const lastTs = sub.lastFired[ruleKey];
          if (lastTs && (Date.now() - new Date(lastTs).getTime()) < COOLDOWNS_MS[rule.type]) {
            cooldownActive = true;
          }
        }
        // Для не-precip правил: cooldown = skip как раньше (защита от спама)
        if (cooldownActive && !isPrecip) continue;

        // morning_summary — раз в сутки в указанное время (±15 мин окно)
        if (rule.type === 'morning_summary') {
          const lastDate = sub.lastFired[ruleKey];
          const today = new Date().toISOString().slice(0,10);
          if (lastDate === today) continue;
          // Проверка времени — в окне ±15 мин от заданного часа:минуты
          const now = new Date();
          const nowMin = now.getUTCHours() * 60 + now.getUTCMinutes();
          // sub.lang определяет timezone? нет, используем UTC + локальное смещение Open-Meteo
          // Для простоты считаем что rule.hour/minute задано в local time подписки.
          // utcOffset придёт в fc.utcOffsetSec
          const tzOffsetMin = Math.round((fc.utcOffsetSec || 0) / 60);
          const ruleMin = ((rule.hour|0) * 60 + (rule.minute|0)) - tzOffsetMin;
          const ruleMinNorm = ((ruleMin % 1440) + 1440) % 1440;
          const delta = Math.abs(nowMin - ruleMinNorm);
          if (delta > 15 && delta < 1425) continue;
          // Совпало — отправляем
          const msg = buildMorningSummary(sub, rule, fc);
          if (msg) {
            try {
              await sendMessage(env, sub.chatId, msg, { parse_mode: 'HTML' });
              sub.lastFired[ruleKey] = today;
              changed = true;
              fired++;
            } catch (e) { failed++; }
          }
          continue;
        }

        // Остальные правила — evaluate
        const result = evaluateRule(rule, fc, sub);

        // v1.50.3 SMART-RESET для precip-правил:
        // если cooldown ещё активен, но evaluateRule сообщает что в окне
        // осадков НЕТ — значит предыдущий «дождевой эпизод» закончился.
        // Сбрасываем lastFired, чтобы следующее реальное появление дождя
        // вызвало уведомление сразу, не дожидаясь полного cooldown'а.
        // Так бот корректно ловит «дождь → пауза → новый дождь» в один день.
        if (isPrecip && cooldownActive) {
          if (!(result && result.fired) && sub.lastFired[ruleKey]) {
            delete sub.lastFired[ruleKey];
            changed = true;
          }
          // В cooldown НЕ шлём уведомление даже если fired=true —
          // это та же защита от спама что и раньше.
          continue;
        }

        if (result && result.fired) {
          try {
            await sendMessage(env, sub.chatId, result.message, { parse_mode: 'HTML' });
            sub.lastFired[ruleKey] = new Date().toISOString();
            changed = true;
            fired++;
          } catch (e) { failed++; }
        }
      }

      if (changed) {
        await env.SUBSCRIPTIONS.put(key.name, JSON.stringify(sub));
      }
      processed++;

      // Telegram rate-limit: ~30 msg/sec на бота. С запасом 25 — пауза 40мс.
      await sleep(40);
    } catch (e) {
      console.error('cron sub error:', e);
      failed++;
    }
  }

  console.log(`cron: processed=${processed} fired=${fired} failed=${failed}`);
  return { processed, fired, failed };
}

// Ключ правила для lastFired-хранения. Включает параметры — если юзер
// поменял threshold, считаем правило новым (старый cooldown сбросится).
function ruleKeyOf(rule) {
  switch (rule.type) {
    case 'temp_below':       return `temp_below_${rule.threshold}`;
    case 'temp_above':       return `temp_above_${rule.threshold}`;
    case 'rain_soon':        return `rain_soon_${rule.windowHours}`;
    case 'precip_soon':      return `precip_soon_${rule.windowHours}_${rule.watchRain?1:0}_${rule.watchSnow?1:0}_${rule.sensitivity||'med'}`;
    case 'storm_alert':      return 'storm_alert';
    case 'dry_streak':       return `dry_streak_${rule.days}`;
    case 'morning_summary':  return `morning_summary_${rule.hour}_${rule.minute || 0}`;
    default:                 return rule.type;
  }
}

// Тянем прогноз для одной локации. Один запрос — все нужные поля.
// 8 моделей Open-Meteo (7 физических + ECMWF AIFS AI) — те же что на сайте.
// Default (без передачи sub) — используем AVG из всех моделей. Если в подписке
// сохранён конкретный источник (sub.source) — используем только эту модель.
// ECMWF: 0.25° HRES (было 0.4° — заменили на согласованную с сайтом версию).
// AIFS — AI-модель, даёт независимый «голос» в ансамбле.
const WEATHER_MODELS = ['ecmwf_ifs025', 'ecmwf_aifs025_single',
                        'gfs_seamless', 'icon_seamless', 'gem_seamless',
                        'jma_seamless', 'meteofrance_seamless', 'ukmo_seamless'];

const SUB_SOURCE_TO_MODEL = {
  ecmwf:     'ecmwf_ifs025',
  aifs:      'ecmwf_aifs025_single',
  gfs:       'gfs_seamless',
  icon:      'icon_seamless',
  gem:       'gem_seamless',
  jma:       'jma_seamless',
  mf:        'meteofrance_seamless',
  ukmo:      'ukmo_seamless'
};

// v1.43.1 + i18n: человекочитаемое название источника + локализованный footer.
// Используется в evaluateRule (fired-сообщения) и buildMorningSummary.
// Переехало в bot/src/i18n.js → tSourceLabel(sourceId, lang) / tSourceFooter(sourceId, lang).

async function fetchWeather(lat, lon, sub = null) {
  // Если подписка задала конкретный источник — используем только эту модель.
  // Если 'avg' / null / неизвестный — используем все 8 и считаем AVG.
  const wantedSource = (sub && sub.source) || 'avg';
  const useAllModels = wantedSource === 'avg';
  const singleModel = useAllModels ? null : SUB_SOURCE_TO_MODEL[wantedSource];

  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: 'temperature_2m,apparent_temperature,precipitation,precipitation_probability,weather_code,wind_speed_10m,wind_gusts_10m,wind_direction_10m,cape,lifted_index',
    // v1.40.0: 15-минутный nowcast осадков на 2 часа вперёд (8 кадров).
    // Используется в evaluateRule для precip_soon/rain_soon с короткими окнами
    // (windowHours ≤ 2) — даёт минутную точность вместо часовой.
    minutely_15: 'precipitation,precipitation_probability',
    forecast_minutely_15: '8',
    daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,weather_code',
    timezone: 'auto',
    wind_speed_unit: 'ms',
    forecast_days: '5'
  });
  if (useAllModels) {
    params.set('models', WEATHER_MODELS.join(','));
  } else if (singleModel) {
    params.set('models', singleModel);
  }
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!r.ok) {
      console.error(`Open-Meteo HTTP ${r.status} for ${lat},${lon}`);
      return null;
    }
    const data = await r.json();
    // Если single model — нужно убрать суффикс модели из field-имён
    // (например temperature_2m_ecmwf_ifs04 → temperature_2m)
    if (singleModel) {
      data.hourly = stripModelSuffix(data.hourly || {}, singleModel);
      data.daily = stripModelSuffix(data.daily || {}, singleModel);
      data.minutely_15 = stripModelSuffix(data.minutely_15 || {}, singleModel);
      return {
        hourly: data.hourly,
        daily: data.daily,
        minutely15: data.minutely_15,
        utcOffsetSec: data.utc_offset_seconds || 0,
        timezone: data.timezone || 'UTC'
      };
    }
    // AVG из 8 моделей — усредняем все поля (precipitation — берём MAX
    // как консервативный сигнал «хоть одна модель видит дождь», temperature
    // и пр. — обычное среднее, weather_code — max).
    const avgHourly = averageHourlyMultiModel(data.hourly || {}, WEATHER_MODELS);
    const avgDaily = averageDailyMultiModel(data.daily || {}, WEATHER_MODELS);
    const avgMinutely15 = averageMinutely15MultiModel(data.minutely_15 || {}, WEATHER_MODELS);
    return {
      hourly: avgHourly,
      daily: avgDaily,
      minutely15: avgMinutely15,
      utcOffsetSec: data.utc_offset_seconds || 0,
      timezone: data.timezone || 'UTC'
    };
  } catch (e) {
    console.error('fetchWeather err:', e);
    return null;
  }
}

// Убирает _modelName из field-имён в hourly/daily, оставляя базовые имена
// для совместимости со старым кодом (он читает temperature_2m, precipitation, ...)
function stripModelSuffix(obj, model) {
  if (!obj || typeof obj !== 'object') return obj;
  const suffix = `_${model}`;
  const result = { time: obj.time };
  for (const key of Object.keys(obj)) {
    if (key === 'time') continue;
    if (key.endsWith(suffix)) {
      const base = key.slice(0, -suffix.length);
      result[base] = obj[key];
    } else if (!key.includes('_seamless') && !key.includes('_ifs')) {
      // Некоторые поля без суффикса (если бы были) — пропускаем как есть
      result[key] = obj[key];
    }
  }
  return result;
}

// Усреднение hourly/daily когда запрошены несколько моделей. Возвращает поля
// БЕЗ суффиксов моделей — для совместимости с evaluateRule/buildPrecipBlock.
function averageHourlyMultiModel(hourly, models) {
  const time = hourly.time || [];
  const result = { time };
  if (!time.length || !models.length) return result;
  // v1.42.4: precipitation сменили `max` → `mean` для согласия с сайтом.
  // Раньше max генерировал ложные «дождь» уведомления когда 1 из 8 моделей
  // видела каплю а 7 — нет (юзер видел расхождение: сайт «облачно», бот
  // «дождь весь день»). Mean делает бот таким же точным как и сайт.
  // weather_code оставлен max — консерватизм по типу события (если хоть
  // одна модель видит грозу 95-99, обозначаем). Но storm-alert теперь
  // дополнительно требует cape ≥ 500 (см. evaluateRule).
  const FIELDS = [
    { base: 'temperature_2m', aggregate: 'mean' },
    { base: 'apparent_temperature', aggregate: 'mean' },
    { base: 'precipitation', aggregate: 'mean' },
    { base: 'precipitation_probability', aggregate: 'mean' },
    { base: 'weather_code', aggregate: 'max' },
    { base: 'wind_speed_10m', aggregate: 'mean' },
    { base: 'wind_gusts_10m', aggregate: 'max' },
    { base: 'wind_direction_10m', aggregate: 'first' },
    { base: 'cape', aggregate: 'mean' },
    { base: 'lifted_index', aggregate: 'mean' }
  ];
  for (const { base, aggregate } of FIELDS) {
    const arr = new Array(time.length).fill(null);
    for (let i = 0; i < time.length; i++) {
      const vals = [];
      for (const m of models) {
        const v = hourly[`${base}_${m}`]?.[i];
        if (v != null && Number.isFinite(v)) vals.push(v);
      }
      if (vals.length === 0) { arr[i] = null; continue; }
      if (aggregate === 'mean') arr[i] = vals.reduce((s, x) => s + x, 0) / vals.length;
      else if (aggregate === 'max') arr[i] = Math.max(...vals);
      else if (aggregate === 'first') arr[i] = vals[0];
    }
    result[base] = arr;
  }
  return result;
}

function averageDailyMultiModel(daily, models) {
  const time = daily.time || [];
  const result = { time };
  if (!time.length || !models.length) return result;
  const FIELDS = [
    { base: 'temperature_2m_max', aggregate: 'mean' },
    { base: 'temperature_2m_min', aggregate: 'mean' },
    { base: 'precipitation_sum', aggregate: 'max' },  // макс среди моделей — консервативно
    { base: 'weather_code', aggregate: 'max' },
    { base: 'sunrise', aggregate: 'first' },
    { base: 'sunset', aggregate: 'first' }
  ];
  for (const { base, aggregate } of FIELDS) {
    const arr = new Array(time.length).fill(null);
    for (let i = 0; i < time.length; i++) {
      const vals = [];
      for (const m of models) {
        const v = daily[`${base}_${m}`]?.[i];
        if (v != null) vals.push(v);
      }
      if (vals.length === 0) continue;
      if (aggregate === 'mean') {
        const nums = vals.filter(v => Number.isFinite(v));
        arr[i] = nums.length ? nums.reduce((s, x) => s + x, 0) / nums.length : null;
      }
      else if (aggregate === 'max') {
        const nums = vals.filter(v => Number.isFinite(v));
        arr[i] = nums.length ? Math.max(...nums) : null;
      }
      else if (aggregate === 'first') arr[i] = vals[0];
    }
    result[base] = arr;
  }
  return result;
}

// v1.40.0: усреднение minutely_15 (8 кадров × 15 мин). Структура та же что
// у averageHourlyMultiModel. precipitation — max (если хоть одна модель видит
// дождь — считаем что дождь). precipitation_probability — mean.
function averageMinutely15MultiModel(m15, models) {
  const time = m15.time || [];
  const result = { time };
  if (!time.length || !models.length) return result;
  // v1.42.4: тоже mean (был max) — синхронизация с сайтом для consistency
  // в плашке nowcast и в precip_soon с windowHours ≤ 2.
  const FIELDS = [
    { base: 'precipitation', aggregate: 'mean' },
    { base: 'precipitation_probability', aggregate: 'mean' }
  ];
  for (const { base, aggregate } of FIELDS) {
    const arr = new Array(time.length).fill(null);
    for (let i = 0; i < time.length; i++) {
      const vals = [];
      for (const m of models) {
        const v = m15[`${base}_${m}`]?.[i];
        if (v != null && Number.isFinite(v)) vals.push(v);
      }
      if (vals.length === 0) { arr[i] = null; continue; }
      if (aggregate === 'mean') arr[i] = vals.reduce((s, x) => s + x, 0) / vals.length;
      else if (aggregate === 'max') arr[i] = Math.max(...vals);
    }
    result[base] = arr;
  }
  return result;
}

// v1.40.0: minutely_15-based precip check. Возвращает первый кадр в окне
// windowMin минут (от текущего момента), где precipitation ≥ minMm и
// effProb ≥ minProb. effProb = prob или 100 при prob=0 + mm ≥ minMm
// (proxy для случая когда модель не отдаёт probability). null если не найден.
// Используется в precip_soon и rain_soon при windowHours ≤ 2.
function findFirstWetMinutely(m15, windowMin, minMm, minProb, utcOffsetSec = 0) {
  if (!m15 || !Array.isArray(m15.time)) return null;
  const t = m15.time;
  const pm = m15.precipitation || [];
  const pp = m15.precipitation_probability || [];
  // v1.42.3 TZ-fix: minutely_15 timestamps без 'Z' — парсятся в Worker (UTC)
  // как UTC, но фактически это локальное время. Сдвигаем now на utcOffsetSec
  // чтобы сравнение было корректным.
  const now = Date.now() + utcOffsetSec * 1000;
  const horizon = now + windowMin * 60 * 1000;
  for (let i = 0; i < t.length; i++) {
    const ts = new Date(t[i]).getTime();
    if (Number.isNaN(ts)) continue;
    // Толерантность ±5 мин: кадр «только что был» по-прежнему актуален.
    if (ts < now - 5 * 60 * 1000) continue;
    if (ts > horizon) break;
    const mm = pm[i] || 0;
    const prob = pp[i] || 0;
    const effProb = prob > 0 ? prob : (mm >= minMm ? 100 : 0);
    if (mm >= minMm && effProb >= minProb) {
      // v1.42.3: minAhead тоже считается тут — `now` уже сдвинут на offset,
      // вычитание `ts - now` даёт корректные минуты до события (а не +offset).
      const minAhead = Math.max(0, Math.round((ts - now) / 60000));
      return { ts, mm, prob, iso: t[i], minAhead };
    }
  }
  return null;
}

// Оценка одного правила. Возвращает { fired: bool, message: string }.
function evaluateRule(rule, fc, sub) {
  const hourly = fc.hourly;
  const times = hourly.time || [];
  if (times.length === 0) return null;

  // CRITICAL TZ-FIX (v1.42.3): Open-Meteo с timezone=auto отдаёт строки времени
  // БЕЗ суффикса Z или offset (например '2026-05-25T11:00' = 11:00 локального TZ).
  // `new Date(...)` в Cloudflare Worker (UTC-окружение) парсит такую строку как
  // 11:00 UTC. Если сравнивать с `Date.now()` (тоже UTC), получаем сдвиг на
  // fc.utcOffsetSec → бот ищет «сейчас» на N часов раньше реальности и
  // проверяет окно осадков в прошлом, где данных ещё нет.
  // Решение: добавляем offset к now, чтобы он соответствовал local-парсингу.
  const offsetMs = (fc.utcOffsetSec || 0) * 1000;
  const nowMs = Date.now() + offsetMs;
  let nowIdx = 0;
  for (let i = 0; i < times.length; i++) {
    if (new Date(times[i]).getTime() > nowMs) { nowIdx = Math.max(0, i - 1); break; }
    nowIdx = i;
  }

  const temps = hourly.temperature_2m || [];
  const pp = hourly.precipitation_probability || [];
  const pm = hourly.precipitation || [];
  const wc = hourly.weather_code || [];

  // v1.43.1: footer «по данным X» в каждом fired-сообщении. Локализован по sub.lang.
  const lang = sub?.lang || 'ru';
  const src = (sub && sub.source) || 'avg';
  const srcFooter = `\n<i>${tSourceFooter(src, lang)}</i>`;
  const when = (iso) => tWhenStr(iso, fc.utcOffsetSec, lang);
  const nowText = () => {
    switch (lang) {
      case 'uk': return 'просто зараз';
      case 'en': return 'right now';
      case 'de': return 'gerade jetzt';
      case 'pl': return 'właśnie teraz';
      case 'cs': return 'právě teď';
      case 'fr': return 'tout de suite';
      case 'it': return 'proprio ora';
      case 'es': return 'ahora mismo';
      default:   return 'прямо сейчас';
    }
  };

  switch (rule.type) {
    case 'temp_below': {
      const threshold = Number(rule.threshold);
      if (!Number.isFinite(threshold)) return null;
      // Проверяем ближайшие 12 часов
      let minT = Infinity, minIdx = -1;
      for (let i = nowIdx; i < Math.min(nowIdx + 12, temps.length); i++) {
        if (temps[i] != null && temps[i] < minT) { minT = temps[i]; minIdx = i; }
      }
      if (minT < threshold) {
        return {
          fired: true,
          message: t('fired.cold', lang, { name: esc(sub.name), temp: Math.round(minT), when: when(times[minIdx]) }) + srcFooter
        };
      }
      return { fired: false };
    }

    case 'temp_above': {
      const threshold = Number(rule.threshold);
      if (!Number.isFinite(threshold)) return null;
      let maxT = -Infinity, maxIdx = -1;
      for (let i = nowIdx; i < Math.min(nowIdx + 12, temps.length); i++) {
        if (temps[i] != null && temps[i] > maxT) { maxT = temps[i]; maxIdx = i; }
      }
      if (maxT > threshold) {
        return {
          fired: true,
          message: t('fired.heat', lang, { name: esc(sub.name), temp: Math.round(maxT), when: when(times[maxIdx]) }) + srcFooter
        };
      }
      return { fired: false };
    }

    case 'rain_soon': {
      const windowH = Number(rule.windowHours) || 3;
      const [minProb, minMm] = precipThresholds(rule.sensitivity);
      const unitM15 = t('unit.mm15', lang);
      const unitH   = t('unit.mmh', lang);
      // v1.40.0: для коротких окон (≤2ч) используем minutely_15 — даёт
      // минутную точность вместо часовой. Для бóльших окон остаётся hourly.
      if (windowH <= 2 && fc.minutely15) {
        const hit = findFirstWetMinutely(fc.minutely15, windowH * 60, minMm, minProb, fc.utcOffsetSec);
        if (hit) {
          const minAhead = hit.minAhead;
          const whenLabel = minAhead < 5
            ? nowText()
            : minAhead < 60 ? tInMinutes(minAhead, lang) : when(hit.iso);
          return {
            fired: true,
            message: t('fired.rainSoon', lang, {
              name: esc(sub.name),
              mm: Math.round(hit.mm * 10) / 10,
              unit: unitM15,
              probPart: hit.prob > 0 ? t('prob.part', lang, { prob: hit.prob }) : '',
              when: whenLabel
            }) + srcFooter
          };
        }
        return { fired: false };
      }
      // FIX v1.50.2: пропускаем текущий час (i = nowIdx + 1). Раньше начинали
      // с nowIdx → в 14:30 cron видел mm в hourly[14:00] и слал «скоро дождь
      // сегодня в 14:00», хотя час уже на 30 мин прошёл. «Скоро» = в будущем.
      // minutely_15-ветка выше уже корректно ищет только в future минутах.
      for (let i = nowIdx + 1; i < Math.min(nowIdx + 1 + windowH, temps.length); i++) {
        const prob = pp[i] || 0;
        const mm = pm[i] || 0;
        // Open-Meteo НЕ возвращает probability для конкретных моделей —
        // если prob=0 но mm выше порога, считаем что дождь точно будет (proxy 100%).
        const effProb = prob > 0 ? prob : (mm >= minMm ? 100 : 0);
        if (effProb >= minProb && mm >= minMm) {
          return {
            fired: true,
            message: t('fired.rainSoon', lang, {
              name: esc(sub.name),
              mm: Math.round(mm * 10) / 10,
              unit: unitH,
              probPart: prob > 0 ? t('prob.part', lang, { prob }) : '',
              when: when(times[i])
            }) + srcFooter
          };
        }
      }
      return { fired: false };
    }

    case 'precip_soon': {
      // Новое правило: «Осадки в ближайшие N часов» с подразделами Дождь/Снег.
      // Различаем по weather_code: 51-67/80-82 — дождь, 71-77/85-86 — снег, 95-99 — гроза (трактуем как дождь).
      // Порог чувствительности задаёт пользователь: 'low' (строгий) / 'med' (default) / 'high' (чувствительный).
      // Open-Meteo НЕ возвращает probability для конкретных моделей — если prob=0,
      // используем mm как proxy: при mm >= minMm считаем что дождь точно будет (effProb = 100).
      const windowH = Number(rule.windowHours) || 3;
      const watchRain = rule.watchRain !== false;
      const watchSnow = rule.watchSnow === true;
      const [minProb, minMm] = precipThresholds(rule.sensitivity);
      const unitM15 = t('unit.mm15', lang);
      const unitH   = t('unit.mmh', lang);
      // v1.40.0: для коротких окон (≤2ч) используем minutely_15. Тип осадков
      // (дождь vs снег) минутки не дают — определяем по hourly[nowIdx]
      // (текущий час) + температуре. <=0°C + осадки → снег, иначе дождь.
      if (windowH <= 2 && fc.minutely15) {
        const hit = findFirstWetMinutely(fc.minutely15, windowH * 60, minMm, minProb, fc.utcOffsetSec);
        if (hit) {
          // Определяем тип: смотрим weather_code следующего hourly + температуру
          // ближайшего часа от hit.ts.
          const hitHourIdx = (() => {
            for (let i = nowIdx; i < temps.length; i++) {
              const hourTs = new Date(times[i]).getTime();
              if (hourTs >= hit.ts) return i;
            }
            return nowIdx;
          })();
          const code = wc[hitHourIdx];
          const temp = (hourly.temperature_2m || [])[hitHourIdx];
          const codeSnow = (code >= 71 && code <= 77) || (code >= 85 && code <= 86);
          const codeRain = (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 95 && code <= 99);
          // Если код явно снежный — снег. Если явно дождевой — дождь.
          // Иначе fallback на температуру: T ≤ 1°C → снег, иначе дождь.
          const isSnow = codeSnow || (!codeRain && typeof temp === 'number' && temp <= 1);
          const isRain = !isSnow;
          const minAhead = hit.minAhead;
          const whenLabel = minAhead < 5
            ? nowText()
            : minAhead < 60 ? tInMinutes(minAhead, lang) : when(hit.iso);
          if (watchRain && isRain) {
            return {
              fired: true,
              message: t('fired.rainSoon', lang, {
                name: esc(sub.name),
                mm: Math.round(hit.mm * 10) / 10,
                unit: unitM15,
                probPart: hit.prob > 0 ? t('prob.part', lang, { prob: hit.prob }) : '',
                when: whenLabel
              }) + srcFooter
            };
          }
          if (watchSnow && isSnow) {
            return {
              fired: true,
              message: t('fired.snowSoon', lang, {
                name: esc(sub.name),
                mm: Math.round(hit.mm * 10) / 10,
                probPart: hit.prob > 0 ? t('prob.part', lang, { prob: hit.prob }) : '',
                when: whenLabel
              }) + srcFooter
            };
          }
        }
        return { fired: false };
      }
      // FIX v1.50.2: пропускаем текущий час — см. комментарий выше в rain_soon.
      for (let i = nowIdx + 1; i < Math.min(nowIdx + 1 + windowH, temps.length); i++) {
        const prob = pp[i] || 0;
        const mm = pm[i] || 0;
        const code = wc[i];
        const effProb = prob > 0 ? prob : (mm >= minMm ? 100 : 0);
        if (mm < minMm || effProb < minProb) continue;
        const isRain = (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 95 && code <= 99);
        const isSnow = (code >= 71 && code <= 77) || (code >= 85 && code <= 86);
        if (watchRain && isRain) {
          return {
            fired: true,
            message: t('fired.rainSoon', lang, {
              name: esc(sub.name),
              mm: Math.round(mm * 10) / 10,
              unit: unitH,
              probPart: prob > 0 ? t('prob.part', lang, { prob }) : '',
              when: when(times[i])
            }) + srcFooter
          };
        }
        if (watchSnow && isSnow) {
          return {
            fired: true,
            message: t('fired.snowSoon', lang, {
              name: esc(sub.name),
              mm: Math.round(mm * 10) / 10,
              probPart: prob > 0 ? t('prob.part', lang, { prob }) : '',
              when: when(times[i])
            }) + srcFooter
          };
        }
      }
      return { fired: false };
    }

    case 'storm_alert': {
      // Гроза в ближайшие 6 часов:
      //   – по WMO weather_code 95/96/99 + cape ≥ 500 (требует physical corroboration)
      //   – ИЛИ по CAPE ≥ 1500 + lifted_index ≤ -2 (классическая нестабильность)
      // v1.42.4: добавлено требование cape ≥ 500 для code-based триггера.
      // Без этого max wc по 8 моделям ловил «грозу 95» от одной outlier-модели
      // даже без реальной конвективной нестабильности — ложные алёрты.
      const cape = hourly.cape || [];
      const li = hourly.lifted_index || [];
      for (let i = nowIdx; i < Math.min(nowIdx + 6, temps.length); i++) {
        const code = wc[i];
        const capeNow = cape[i] || 0;
        const liNow = li[i] || 0;
        const stormByCode = (code === 95 || code === 96 || code === 99) && capeNow >= 500;
        const stormByPhysics = capeNow >= 1500 && liNow <= -2;
        if (stormByCode || stormByPhysics) {
          return {
            fired: true,
            message: t('fired.storm', lang, { name: esc(sub.name), when: when(times[i]) }) + srcFooter
          };
        }
      }
      return { fired: false };
    }

    case 'dry_streak': {
      const need = Number(rule.days) || 3;
      const daily = fc.daily || {};
      const dailyTimes = daily.time || [];
      const dailyP = daily.precipitation_sum || [];
      let streak = 0;
      // Проверяем СЛЕДУЮЩИЕ N дней (начиная с завтра)
      for (let i = 1; i < dailyTimes.length; i++) {
        if ((dailyP[i] || 0) < 0.5) streak++;
        else break;
      }
      if (streak >= need) {
        return {
          fired: true,
          message: t('fired.dryStreak', lang, {
            n: streak,
            days: tPluralDays(streak, lang),
            name: esc(sub.name),
            end: dailyTimes[streak] ? esc(dailyTimes[streak]) : '?'
          }) + srcFooter
        };
      }
      return { fired: false };
    }

    default:
      return null;
  }
}

// whenStr перенесён в bot/src/i18n.js → tWhenStr(isoTime, utcOffsetSec, lang).
// TZ-fix v1.42.4 учтён там же.

// Сводка утра. Базовая часть всегда есть. Дополнительные секции включаются через rule.sections:
//   { wind, precip, astro, storm, feels, tomorrow } — булевые флаги.
// Если sections не задан (legacy-правила) — поведение как раньше (только базовая инфа).
function buildMorningSummary(sub, rule, fc) {
  const hourly = fc.hourly || {};
  const daily = fc.daily || {};
  if (!hourly.time?.length || !daily.time?.length) return null;

  const lang = sub?.lang || 'ru';
  const sections = (rule && rule.sections) || {};
  const todayDate = (daily.time[0] || '').slice(0, 10);
  const [s, e] = computeTodayRange(hourly.time, todayDate);

  // Базовая часть (всегда показывается)
  const nowIdx = findNowIdx(hourly.time, fc.utcOffsetSec);
  const curT = hourly.temperature_2m?.[nowIdx];
  const tMin = daily.temperature_2m_min?.[0];
  const tMax = daily.temperature_2m_max?.[0];
  const wc = daily.weather_code?.[0];
  const condLabel = tWeatherCodeLabel(wc, lang);

  const lines = [
    t('summary.greeting', lang),
    esc(sub.name),
    ``,
    condLabel,
    t('summary.nowTemp', lang, { t: fmtDeg(curT) }),
    t('summary.todayRange', lang, { min: fmtNum(tMin), max: fmtNum(tMax) })
  ];

  // Если детальная precip-секция выключена — старая короткая строка про сумму осадков (если есть)
  if (!sections.precip) {
    const pSum = daily.precipitation_sum?.[0] || 0;
    if (pSum > 0.5) lines.push(t('summary.precipShort', lang, { mm: pSum.toFixed(1) }));
  }

  // Дополнительные секции — порядок фиксированный, между блоками пустая строка
  const lat = (sub && typeof sub.lat === 'number') ? sub.lat : 50;
  if (sections.precip)   pushBlock(lines, buildPrecipBlock(hourly, s, e, lat, daily, lang));
  if (sections.fog)      pushBlock(lines, buildFogBlock(hourly, s, e, lang));
  if (sections.wind)     pushBlock(lines, buildWindBlock(hourly, s, e, lang));
  if (sections.feels)    pushBlock(lines, buildFeelsBlock(hourly, s, e, lang));
  if (sections.astro)    pushBlock(lines, buildAstroBlock(daily, lang));
  if (sections.moon)     pushBlock(lines, buildMoonBlock(lang));
  if (sections.storm)    pushBlock(lines, buildStormBlock(hourly, s, e, lang));
  if (sections.tomorrow) pushBlock(lines, buildTomorrowBlock(daily, lang));

  // v1.43.1: footer с источником данных — для прозрачности «на основе чего сводка»
  const src = (sub && sub.source) || 'avg';
  lines.push('');
  lines.push(`<i>${tSourceFooter(src, lang)}</i>`);

  return lines.join('\n');
}

function pushBlock(lines, block) {
  if (block) { lines.push(''); lines.push(block); }
}

function fmtDeg(v) {
  return v == null ? '?°C' : `${Math.round(v)}°C`;
}

function fmtNum(v) {
  return v == null ? '?' : String(Math.round(v));
}

function findNowIdx(times, utcOffsetSec = 0) {
  // v1.42.3 TZ-fix: см. evaluateRule. times без 'Z' → парсятся как UTC,
  // фактически локальное время. Сдвигаем now на offset чтобы сравнение корректно.
  const nowMs = Date.now() + utcOffsetSec * 1000;
  let nowIdx = 0;
  for (let i = 0; i < times.length; i++) {
    if (new Date(times[i]).getTime() > nowMs) { nowIdx = Math.max(0, i-1); break; }
    nowIdx = i;
  }
  return nowIdx;
}

// Диапазон часов «сегодня» в hourly. Возвращает [startIdx, endIdx) — endIdx не включается.
// Open-Meteo с timezone=auto возвращает hourly.time в локальном времени, поэтому
// фильтр по префиксу YYYY-MM-DD совпадает с гражданским днём подписки.
function computeTodayRange(hourlyTime, todayDate) {
  if (!hourlyTime || !todayDate) return [-1, -1];
  let start = -1, end = -1;
  for (let i = 0; i < hourlyTime.length; i++) {
    if (hourlyTime[i].startsWith(todayDate)) {
      if (start < 0) start = i;
      end = i + 1;
    } else if (start >= 0) {
      break;
    }
  }
  return [start, end];
}

// Тип осадков по WMO weather_code + фактическая интенсивность.
// pmm < 0.05 → null (формально код «дождевой», но капли почти нет).
function precipKindAt(wc, mm) {
  if (mm == null || mm < 0.05) return null;
  if (wc == null) return null;
  if ((wc >= 71 && wc <= 77) || (wc >= 85 && wc <= 86)) return 'snow';
  if ((wc >= 51 && wc <= 67) || (wc >= 80 && wc <= 82) || (wc >= 95 && wc <= 99)) return 'rain';
  return null;
}

// Ищет первое сплошное окно осадков заданного типа в диапазоне [start, end).
function findPrecipWindow(hourlyTime, wcArr, pmArr, type, start, end) {
  if (start < 0 || !hourlyTime) return null;
  let winStart = -1, winEnd = -1, maxMm = 0;
  for (let i = start; i < end; i++) {
    const kind = precipKindAt(wcArr?.[i], pmArr?.[i]);
    if (kind === type) {
      if (winStart < 0) winStart = i;
      winEnd = i;
      if ((pmArr[i] || 0) > maxMm) maxMm = pmArr[i];
    } else if (winStart >= 0) {
      break;
    }
  }
  if (winStart < 0) return null;
  return {
    from: hourlyTime[winStart].slice(11, 16),
    to:   hourlyTime[winEnd + 1] ? hourlyTime[winEnd + 1].slice(11, 16) : (hourlyTime[winEnd].slice(11, 13) + ':59'),
    maxMm
  };
}

// «Сезон снега» по широте + календарному месяцу.
// Северное полушарие (lat >= 0): октябрь–апрель.
// Южное (lat < 0): инверсия — апрель–октябрь.
// В межсезонье блок снега всё равно скрывается, чтобы не вводить в заблуждение летом «снега не ожидается».
function inSnowSeason(lat, date) {
  const m = (date || new Date()).getMonth() + 1;
  if (lat >= 0) return m >= 10 || m <= 4;
  return m >= 4 && m <= 10;
}

function buildPrecipBlock(hourly, s, e, lat, daily, lang = 'ru') {
  if (s < 0) return null;
  const wcArr = hourly.weather_code || [];
  const pmArr = hourly.precipitation || [];
  const times = hourly.time || [];

  // Сумма осадков за сегодня по daily — fallback если continuous window не нашли
  // (например, осадки прерывистые: 0.1 мм/ч в каждом из 5 часов — за день
  // набегает 0.5 мм, но цельного «дождевого окна» нет). Без этого блок
  // выдавал «дождя не ожидается» при сценарии где сайт показывал явный дождь.
  const todayDailyPSum = (daily && Array.isArray(daily.precipitation_sum))
    ? Number(daily.precipitation_sum[0]) || 0
    : 0;
  let todayHourlyPSum = 0;
  for (let i = s; i < e; i++) {
    if (typeof pmArr[i] === 'number' && pmArr[i] > 0) todayHourlyPSum += pmArr[i];
  }
  const totalSum = Math.max(todayDailyPSum, todayHourlyPSum);
  const fmtMm = (v) => (Math.round(v * 10) / 10).toFixed(1);

  const rainWin = findPrecipWindow(times, wcArr, pmArr, 'rain', s, e);
  let block;
  if (rainWin) {
    let line = t('block.precip.rain', lang, { from: rainWin.from, to: rainWin.to });
    if (rainWin.maxMm >= 0.5) line += t('block.precip.rainMax', lang, { mm: fmtMm(rainWin.maxMm) });
    if (totalSum >= 0.5)      line += t('block.precip.daySum',  lang, { mm: fmtMm(totalSum) });
    block = line;
  } else if (totalSum >= 0.5) {
    block = t('block.precip.possible', lang, { mm: fmtMm(totalSum) });
  } else {
    block = t('block.precip.noRain', lang);
  }

  if (inSnowSeason(lat, new Date())) {
    const snowWin = findPrecipWindow(times, wcArr, pmArr, 'snow', s, e);
    if (snowWin) {
      let line = t('block.precip.snow', lang, { from: snowWin.from, to: snowWin.to });
      if (snowWin.maxMm >= 0.5) line += t('block.precip.rainMax', lang, { mm: fmtMm(snowWin.maxMm) });
      block += `\n${line}`;
    } else {
      block += `\n${t('block.precip.noSnow', lang)}`;
    }
  }
  return block;
}

function buildWindBlock(hourly, s, e, lang = 'ru') {
  if (s < 0) return null;
  const wArr = hourly.wind_speed_10m || [];
  const gArr = hourly.wind_gusts_10m || [];
  const dArr = hourly.wind_direction_10m || [];
  let maxW = 0, gust = 0, maxIdx = s;
  for (let i = s; i < e; i++) {
    if (wArr[i] != null && wArr[i] > maxW) { maxW = wArr[i]; maxIdx = i; }
    if (gArr[i] != null && gArr[i] > gust) gust = gArr[i];
  }
  if (maxW < 0.5) return t('block.wind.calm', lang);
  const dir = tWindDir(dArr[maxIdx], lang);
  let line = t('block.wind.main', lang, { ms: Math.round(maxW) });
  if (gust >= maxW + 2) line += t('block.wind.gusts', lang, { ms: Math.round(gust) });
  if (dir) line += `, ${dir}`;
  return line;
}

function buildFeelsBlock(hourly, s, e, lang = 'ru') {
  if (s < 0) return null;
  const ap = hourly.apparent_temperature || [];
  const temps  = hourly.temperature_2m || [];
  let apMin = Infinity, apMax = -Infinity, maxDelta = 0;
  for (let i = s; i < e; i++) {
    if (ap[i] == null) continue;
    if (ap[i] < apMin) apMin = ap[i];
    if (ap[i] > apMax) apMax = ap[i];
    if (temps[i] != null) {
      const d = Math.abs(ap[i] - temps[i]);
      if (d > maxDelta) maxDelta = d;
    }
  }
  if (!Number.isFinite(apMin)) return null;
  if (maxDelta < 1.5) return t('block.feels.close', lang);
  return t('block.feels.range', lang, { min: Math.round(apMin), max: Math.round(apMax) });
}

function buildAstroBlock(daily, lang = 'ru') {
  const sr = daily.sunrise?.[0];
  const ss = daily.sunset?.[0];
  if (!sr || !ss) return null;
  const srTime = sr.slice(11, 16);
  const ssTime = ss.slice(11, 16);
  const toMin = (iso) => {
    const [hh, mm] = iso.slice(11, 16).split(':').map(Number);
    return (hh|0) * 60 + (mm|0);
  };
  let lenMin = toMin(ss) - toMin(sr);
  if (lenMin < 0) lenMin += 24 * 60;
  const lenH = Math.floor(lenMin / 60);
  const lenM = lenMin % 60;
  return t('block.astro.line', lang, { sr: srTime, ss: ssTime, h: lenH, m: lenM });
}

// Блок «Туман» — ищет в hourly за сегодня weather_code 45 (туман) или 48
// (изморозь). Если есть — возвращает окно появления. Иначе — «✓ Тумана нет».
function buildFogBlock(hourly, s, e, lang = 'ru') {
  if (s < 0) return null;
  const wcArr = hourly.weather_code || [];
  const times = hourly.time || [];
  let winStart = -1, winEnd = -1;
  for (let i = s; i < e; i++) {
    const code = wcArr[i];
    const isFog = (code === 45 || code === 48);
    if (isFog) {
      if (winStart < 0) winStart = i;
      winEnd = i;
    } else if (winStart >= 0) {
      break;
    }
  }
  if (winStart < 0) return t('block.fog.none', lang);
  const from = times[winStart].slice(11, 16);
  const to = times[winEnd + 1] ? times[winEnd + 1].slice(11, 16) : (times[winEnd].slice(11, 13) + ':59');
  return t('block.fog.window', lang, { from, to });
}

// Блок «Фаза Луны» — текущая фаза + процент освещения + растущая/убывающая.
// Считается математически (синодический цикл 29.53 дней от опорного новолуния).
function buildMoonBlock(lang = 'ru') {
  const REF = Date.UTC(2000, 0, 6, 18, 14);
  const SYNODIC = 29.5305882;
  const now = Date.now();
  const days = (now - REF) / 86400000;
  let phase = (days / SYNODIC) % 1;
  if (phase < 0) phase += 1;
  const illum = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);
  const waxing = phase < 0.5;

  // 8 фаз → индексы: 0..7. См. tMoonName/tMoonTrend в i18n.js.
  let idx, emoji;
  if (phase < 0.03 || phase > 0.97)  { idx = 0; emoji = '🌑'; }
  else if (phase < 0.22)             { idx = 1; emoji = '🌒'; }
  else if (phase < 0.28)             { idx = 2; emoji = '🌓'; }
  else if (phase < 0.47)             { idx = 3; emoji = '🌔'; }
  else if (phase < 0.53)             { idx = 4; emoji = '🌕'; }
  else if (phase < 0.72)             { idx = 5; emoji = '🌖'; }
  else if (phase < 0.78)             { idx = 6; emoji = '🌗'; }
  else                               { idx = 7; emoji = '🌘'; }

  return `${emoji} ${tMoonName(idx, lang)} · ${illum}% · ${tMoonTrend(waxing, lang)}`;
}

function buildStormBlock(hourly, s, e, lang = 'ru') {
  if (s < 0) return null;
  const wcArr = hourly.weather_code || [];
  const capeArr = hourly.cape || [];
  const liArr = hourly.lifted_index || [];
  const times = hourly.time || [];
  let winStart = -1, winEnd = -1;
  for (let i = s; i < e; i++) {
    const code = wcArr[i];
    const stormByCode = code === 95 || code === 96 || code === 99;
    const stormByPhysics = (capeArr[i] || 0) >= 1500 && (liArr[i] || 0) <= -2;
    if (stormByCode || stormByPhysics) {
      if (winStart < 0) winStart = i;
      winEnd = i;
    } else if (winStart >= 0) {
      break;
    }
  }
  if (winStart < 0) return t('block.storm.none', lang);
  const from = times[winStart].slice(11, 16);
  const to = times[winEnd + 1] ? times[winEnd + 1].slice(11, 16) : (times[winEnd].slice(11, 13) + ':59');
  return t('block.storm.window', lang, { from, to });
}

function buildTomorrowBlock(daily, lang = 'ru') {
  if (!daily.time || daily.time.length < 2) return null;
  const tMin = daily.temperature_2m_min?.[1];
  const tMax = daily.temperature_2m_max?.[1];
  const pSum = daily.precipitation_sum?.[1] || 0;
  const wc = daily.weather_code?.[1];
  const label = tWeatherCodeLabel(wc, lang);
  const tStr = `${tMin != null ? Math.round(tMin) : '?'}…${tMax != null ? Math.round(tMax) : '?'}°C`;
  const precipStr = pSum > 0.5
    ? t('block.tomorrow.precip', lang, { mm: pSum.toFixed(1) })
    : t('block.tomorrow.noPrecip', lang);
  return t('block.tomorrow.line', lang, { tStr, label, precipStr });
}

// ============================================================
// УТИЛИТЫ
// ============================================================

async function sendMessage(env, chatId, text, options = {}) {
  const url = `${TG_API}/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id: chatId,
    text,
    disable_web_page_preview: true,
    ...options
  };
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!r.ok) {
    const errText = await r.text();
    console.error(`sendMessage failed (chat ${chatId}): ${r.status} ${errText}`);
    await incrementStat(env, 'errors');
    throw new Error(`sendMessage ${r.status}`);
  }
  await incrementStat(env, 'notifications');
  return r.json();
}

async function incrementStat(env, key) {
  const today = new Date().toISOString().slice(0,10);
  const k = `stats:${today}`;
  const cur = (await env.STATS.get(k, { type: 'json' })) || {};
  cur[key] = (cur[key] || 0) + 1;
  // TTL 90 дней — старая статистика автоудаляется
  await env.STATS.put(k, JSON.stringify(cur), { expirationTtl: 60 * 60 * 24 * 90 });
}

async function countSubscriptions(env) {
  const list = await env.SUBSCRIPTIONS.list({ prefix: 'sub:' });
  // list_complete=false для очень больших списков потребовал бы cursor-пагинации.
  // Для MVP до ~1000 подписок этого достаточно.
  return list.keys.length;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
