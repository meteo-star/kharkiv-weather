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
      case '/pair':        return handlePair(env, chatId, userId, msg.from, args, chatType);
      case '/unpair':      return handleUnpair(env, chatId);
      case '/setup':       return handleSetup(env, chatId, userId, chatType, msg);
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
        case '/admin_addrule':   return handleAdminAddRule(env, chatId, args);
        case '/admin_clearrules':return handleAdminClearRules(env, chatId);
      }
    }

    // Неизвестная команда
    return sendMessage(env, chatId, '🤖 Не знаю такую команду. Напиши /help — покажу что умею.');
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
  // В групповом чате /start не создаёт подписку — нужен /setup от админа
  if (chatType !== 'private') {
    return sendMessage(env, chatId,
      `👋 Привет! В групповом чате используй <code>/setup</code> (от админа группы) чтобы привязать бота.`,
      { parse_mode: 'HTML' }
    );
  }
  // Создаём или обновляем подписку с дефолтами
  const key = `sub:${chatId}`;
  const existing = await env.SUBSCRIPTIONS.get(key, { type: 'json' });

  if (existing) {
    return sendMessage(env, chatId,
      `👋 С возвращением! Ты уже подписан${existing.banned ? ', но твоя подписка ЗАБЛОКИРОВАНА' : ''}.\n\n` +
      `📍 Локация: ${esc(existing.name || 'не задана')}\n` +
      `🔔 Правил: ${(existing.rules || []).length}\n\n` +
      `Напиши /help чтобы посмотреть команды.`,
      { parse_mode: 'HTML' }
    );
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
    lang: fromObj?.language_code === 'uk' ? 'uk' : (fromObj?.language_code === 'en' ? 'en' : 'ru'),
    rules: [],
    createdAt: new Date().toISOString(),
    banned: false,
    lastFired: {}
  };
  await env.SUBSCRIPTIONS.put(key, JSON.stringify(sub));

  // Инкремент счётчика новых подписок за сегодня
  await incrementStat(env, 'subscribed');

  return sendMessage(env, chatId,
    `🌤 Привет! Я бот <b>Meteo Star</b> — буду присылать тебе уведомления о погоде.\n\n` +
    `📍 Локация по умолчанию: <b>Высокий</b> (Харьковская обл.).\n` +
    `   Сменить: <code>/location &lt;город&gt;</code>\n` +
    `   Например: <code>/location Київ</code>\n\n` +
    `🔔 Правила уведомлений настраиваются через веб-интерфейс приложения.\n` +
    `   <i>(скоро добавим)</i>\n\n` +
    `📋 Все команды: /help`,
    { parse_mode: 'HTML' }
  );
}

async function handleHelp(env, chatId, isAdmin) {
  let text =
    `📋 <b>Команды Meteo Star Bot:</b>\n\n` +
    `<code>/start</code> — подписаться\n` +
    `<code>/status</code> — твоя подписка и активные правила\n` +
    `<code>/location &lt;город&gt;</code> — сменить локацию\n` +
    `<code>/pair &lt;код&gt;</code> — связать с сайтом (код берётся в Settings)\n` +
    `<code>/unpair</code> — разорвать связь с сайтом\n` +
    `<code>/stop</code> — отписаться от всех уведомлений\n` +
    `<code>/help</code> — эта подсказка`;

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
      `<code>/admin_addrule &lt;тип&gt; [параметры]</code> — добавить правило себе\n` +
      `<code>/admin_clearrules</code> — удалить все свои правила`;
  }

  return sendMessage(env, chatId, text, { parse_mode: 'HTML' });
}

async function handleStatus(env, chatId) {
  const sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  if (!sub) {
    return sendMessage(env, chatId, `Ты ещё не подписан. Напиши /start чтобы начать.`);
  }
  if (sub.banned) {
    return sendMessage(env, chatId, `🚫 Твоя подписка заблокирована администратором.`);
  }

  const rulesText = (sub.rules || []).length === 0
    ? '   <i>(нет правил, добавь через веб-интерфейс)</i>'
    : sub.rules.map(r => `   • ${esc(formatRule(r))}`).join('\n');

  return sendMessage(env, chatId,
    `📊 <b>Твоя подписка:</b>\n\n` +
    `📍 Локация: <b>${esc(sub.name)}</b> (${sub.lat.toFixed(2)}, ${sub.lon.toFixed(2)})\n` +
    `🌐 Язык: ${sub.lang.toUpperCase()}\n` +
    `📅 Подписан: ${new Date(sub.createdAt).toLocaleDateString('ru-RU')}\n\n` +
    `🔔 <b>Правила уведомлений:</b>\n${rulesText}`,
    { parse_mode: 'HTML' }
  );
}

async function handleStop(env, chatId) {
  const key = `sub:${chatId}`;
  const existing = await env.SUBSCRIPTIONS.get(key);
  if (!existing) {
    return sendMessage(env, chatId, `Ты и так не подписан.`);
  }
  await env.SUBSCRIPTIONS.delete(key);
  await incrementStat(env, 'unsubscribed');
  return sendMessage(env, chatId, `✅ Отписал тебя. Все уведомления больше не приходят.\n\nЕсли захочешь вернуться — /start.`);
}

async function handleLocation(env, chatId, args) {
  if (!args) {
    return sendMessage(env, chatId,
      `📍 Сейчас укажи город:\n<code>/location Київ</code>\n\nИли пришли свои координаты в формате:\n<code>/location 49.9 36.21</code>`,
      { parse_mode: 'HTML' }
    );
  }

  const sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  if (!sub) return sendMessage(env, chatId, `Сначала подпишись — /start.`);

  // Прямой формат: "49.9 36.21"
  const coords = args.match(/^(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)$/);
  if (coords) {
    sub.lat = parseFloat(coords[1]);
    sub.lon = parseFloat(coords[2]);
    sub.name = `${sub.lat.toFixed(2)}, ${sub.lon.toFixed(2)}`;
    await env.SUBSCRIPTIONS.put(`sub:${chatId}`, JSON.stringify(sub));
    return sendMessage(env, chatId, `📍 Установил координаты: <b>${esc(sub.name)}</b>`, { parse_mode: 'HTML' });
  }

  // Имя города → Open-Meteo geocoding
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(args)}&count=1&language=${sub.lang}`;
    const r = await fetch(geoUrl);
    if (!r.ok) throw new Error(`geocode HTTP ${r.status}`);
    const data = await r.json();
    const place = data.results?.[0];
    if (!place) {
      return sendMessage(env, chatId,
        `🤷 Не нашёл город <b>${esc(args)}</b>. Попробуй полное название или координаты: <code>/location 49.9 36.21</code>`,
        { parse_mode: 'HTML' }
      );
    }
    sub.lat = place.latitude;
    sub.lon = place.longitude;
    sub.name = place.name + (place.admin1 ? `, ${place.admin1}` : '');
    await env.SUBSCRIPTIONS.put(`sub:${chatId}`, JSON.stringify(sub));
    return sendMessage(env, chatId,
      `📍 Локация обновлена: <b>${esc(sub.name)}</b>\n   (${sub.lat.toFixed(2)}, ${sub.lon.toFixed(2)})`,
      { parse_mode: 'HTML' }
    );
  } catch (err) {
    console.error('geocode err:', err);
    return sendMessage(env, chatId, `⚠ Ошибка геокодирования. Попробуй позже или укажи координаты вручную.`);
  }
}

function formatRule(r) {
  switch (r.type) {
    case 'temp_below':       return `🥶 Температура ниже ${r.threshold}°C`;
    case 'temp_above':       return `🥵 Температура выше ${r.threshold}°C`;
    case 'rain_soon':        return `🌧 Дождь в ближайшие ${r.windowHours}ч`;
    case 'storm_alert':      return `⚡ Гроза в 48ч`;
    case 'dry_streak':       return `☀ ${r.days} дней подряд без осадков`;
    case 'morning_summary':  return `🌅 Сводка утром в ${r.hour}:${String(r.minute || 0).padStart(2,'0')}`;
    default:                 return `? ${r.type}`;
  }
}

// /pair <code>  — связать чат с сайтом по коду из сайта
async function handlePair(env, chatId, userId, fromObj, args, chatType = 'private') {
  const code = (args || '').trim();
  if (!/^\d{6}$/.test(code)) {
    return sendMessage(env, chatId,
      `🔗 Использование: <code>/pair 123456</code>\n\nКод из 6 цифр нужно сначала получить на сайте: Настройки → 🔔 Уведомления → «Связать с Telegram».`,
      { parse_mode: 'HTML' }
    );
  }
  // В группе /pair доступен только админу группы
  if (chatType !== 'private') {
    const isGroupAdmin = await checkGroupAdmin(env, chatId, userId);
    if (!isGroupAdmin) {
      return sendMessage(env, chatId, `🚫 В группе связку с сайтом может сделать только админ группы.`);
    }
  }
  const raw = await env.PAIRING.get(`pair:${code}`);
  if (!raw) {
    return sendMessage(env, chatId,
      `❌ Код <code>${esc(code)}</code> не найден или истёк (срок 10 минут).\nЗапроси новый на сайте.`,
      { parse_mode: 'HTML' }
    );
  }
  const data = JSON.parse(raw);
  if (data.chatId) {
    return sendMessage(env, chatId, `⚠ Этот код уже использован другим чатом.`);
  }

  // Создаём подписку если её нет
  let sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  if (!sub) {
    sub = {
      chatId,
      userId,
      chatType,
      username: fromObj?.username || null,
      firstName: fromObj?.first_name || null,
      lat: 49.9, lon: 36.21, name: 'Высокий',
      lang: fromObj?.language_code === 'uk' ? 'uk' : (fromObj?.language_code === 'en' ? 'en' : 'ru'),
      rules: [],
      createdAt: new Date().toISOString(),
      banned: false,
      lastFired: {}
    };
    await incrementStat(env, 'subscribed');
  }

  // Генерим pairToken (32 hex символа)
  const pairToken = generatePairToken();
  sub.pairToken = pairToken;
  await env.SUBSCRIPTIONS.put(`sub:${chatId}`, JSON.stringify(sub));

  // Обновляем pair-запись — теперь сайт сможет получить chatId+pairToken через poll
  data.chatId = chatId;
  data.pairToken = pairToken;
  await env.PAIRING.put(`pair:${code}`, JSON.stringify(data), { expirationTtl: 600 });

  return sendMessage(env, chatId,
    `✅ <b>Связано с сайтом!</b>\n\nВозвращайся в браузер — теперь можешь настроить уведомления.\n\nЛокация: <b>${esc(sub.name)}</b>\nЕсли хочешь сменить — <code>/location &lt;город&gt;</code>`,
    { parse_mode: 'HTML' }
  );
}

// /setup — для группы: запросить связку с сайтом. Доступно только админу группы.
async function handleSetup(env, chatId, userId, chatType, msg) {
  if (chatType === 'private') {
    return sendMessage(env, chatId,
      `💡 Команда <code>/setup</code> для группового чата.\nВ личном чате используй <code>/start</code>.`,
      { parse_mode: 'HTML' }
    );
  }
  const isGroupAdmin = await checkGroupAdmin(env, chatId, userId);
  if (!isGroupAdmin) {
    return sendMessage(env, chatId, `🚫 Только админ группы может запустить /setup.`);
  }
  const groupTitle = msg.chat?.title || `Группа ${chatId}`;
  return sendMessage(env, chatId,
    `📡 <b>Настройка группы:</b> ${esc(groupTitle)}\n\n` +
    `1. Открой сайт <a href="https://meteo-star.github.io/kharkiv-weather/">Meteo Star</a>\n` +
    `2. Настройки → 🔔 Уведомления → «Связать с Telegram»\n` +
    `3. Получи 6-значный код\n` +
    `4. Возвращайся сюда и напиши: <code>/pair &lt;код&gt;</code>\n\n` +
    `После связки настраивай правила через сайт — уведомления приходят в этот чат.`,
    { parse_mode: 'HTML' }
  );
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
  if (!sub) return sendMessage(env, chatId, `Ты не подписан.`);
  if (!sub.pairToken) return sendMessage(env, chatId, `Сайт не связан с этим чатом.`);
  sub.pairToken = null;
  await env.SUBSCRIPTIONS.put(`sub:${chatId}`, JSON.stringify(sub));
  return sendMessage(env, chatId,
    `🔓 Связь с сайтом разорвана.\nПодписка осталась, правила тоже. Чтобы менять правила — снова свяжи через сайт.`
  );
}

function generatePairToken() {
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  return Array.from(a, b => b.toString(16).padStart(2, '0')).join('');
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
      `<code>/admin_addrule rain_soon 3</code> (часов)\n` +
      `<code>/admin_addrule temp_below 0</code>\n` +
      `<code>/admin_addrule temp_above 30</code>\n` +
      `<code>/admin_addrule storm_alert</code>\n` +
      `<code>/admin_addrule dry_streak 5</code> (дней)\n` +
      `<code>/admin_addrule morning_summary 7 30</code> (час минута)`,
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
    case 'storm_alert':      rule = { type }; break;
    case 'dry_streak':       rule = { type, days: Number(p1) || 3 }; break;
    case 'morning_summary':  rule = { type, hour: Number(p1) || 7, minute: Number(p2) || 0 }; break;
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
      firstName: sub?.firstName || null
    }), origin);
  }

  // POST /api/rules-get  { chatId, pairToken }  →  { rules: [], name }
  if (path === '/api/rules-get' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const sub = await authSub(env, body);
    if (!sub) return withCors(jsonResp({ error: 'unauthorized' }, 401), origin);
    return withCors(jsonResp({ rules: sub.rules || [], name: sub.name, lang: sub.lang }), origin);
  }

  // POST /api/rules-set  { chatId, pairToken, rules: [] }  →  { ok: true }
  if (path === '/api/rules-set' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const sub = await authSub(env, body);
    if (!sub) return withCors(jsonResp({ error: 'unauthorized' }, 401), origin);

    const rules = Array.isArray(body.rules) ? body.rules.filter(validateRule).slice(0, 20) : [];
    sub.rules = rules;
    // При смене правил сбрасываем cooldown'ы — иначе старые ключи висят
    sub.lastFired = {};
    await env.SUBSCRIPTIONS.put(`sub:${body.chatId}`, JSON.stringify(sub));
    return withCors(jsonResp({ ok: true, count: rules.length }), origin);
  }

  // POST /api/unpair  { chatId, pairToken }  →  { ok: true }
  // Сбрасывает pairToken (сайт теряет доступ, бот остаётся подписан).
  if (path === '/api/unpair' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const sub = await authSub(env, body);
    if (!sub) return withCors(jsonResp({ error: 'unauthorized' }, 401), origin);
    sub.pairToken = null;
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
  // Авторизация: X-Admin-Token header должен совпадать с ADMIN_TOKEN secret
  const token = request.headers.get('X-Admin-Token');
  if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
    return withCors(jsonResp({ error: 'unauthorized' }, 401), origin);
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

async function authSub(env, body) {
  const chatId = body.chatId;
  const pairToken = body.pairToken;
  if (!chatId || !pairToken) return null;
  const sub = await env.SUBSCRIPTIONS.get(`sub:${chatId}`, { type: 'json' });
  if (!sub) return null;
  if (sub.banned) return null;
  if (!sub.pairToken || sub.pairToken !== pairToken) return null;
  return sub;
}

function validateRule(r) {
  if (!r || typeof r !== 'object') return false;
  switch (r.type) {
    case 'temp_below':
    case 'temp_above':
      return Number.isFinite(Number(r.threshold));
    case 'rain_soon':
      return Number.isFinite(Number(r.windowHours)) && r.windowHours > 0 && r.windowHours <= 48;
    case 'storm_alert':
      return true;
    case 'dry_streak':
      return Number.isFinite(Number(r.days)) && r.days > 0 && r.days <= 14;
    case 'morning_summary':
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
  rain_soon:        6 * 3600 * 1000,
  storm_alert:     12 * 3600 * 1000,
  dry_streak:      24 * 3600 * 1000,
  // morning_summary — особый случай: проверяется по дате, не cooldown
};

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
      const fc = await fetchWeather(sub.lat, sub.lon);
      if (!fc) continue;

      let changed = false;
      sub.lastFired = sub.lastFired || {};

      for (const rule of sub.rules) {
        if (!rule || !rule.type) continue;
        const ruleKey = ruleKeyOf(rule);

        // Cooldown — для большинства правил по времени
        if (COOLDOWNS_MS[rule.type]) {
          const lastTs = sub.lastFired[ruleKey];
          if (lastTs && (Date.now() - new Date(lastTs).getTime()) < COOLDOWNS_MS[rule.type]) {
            continue;
          }
        }

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
          const msg = buildMorningSummary(sub, fc);
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
    case 'storm_alert':      return 'storm_alert';
    case 'dry_streak':       return `dry_streak_${rule.days}`;
    case 'morning_summary':  return `morning_summary_${rule.hour}_${rule.minute || 0}`;
    default:                 return rule.type;
  }
}

// Тянем прогноз для одной локации. Один запрос — все нужные поля.
async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: 'temperature_2m,precipitation,precipitation_probability,weather_code,wind_speed_10m,cape,lifted_index',
    daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,weather_code',
    timezone: 'auto',
    wind_speed_unit: 'ms',
    forecast_days: '5'
  });
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!r.ok) {
      console.error(`Open-Meteo HTTP ${r.status} for ${lat},${lon}`);
      return null;
    }
    const data = await r.json();
    return {
      hourly: data.hourly || {},   // { time: [], temperature_2m: [], precipitation: [], ... }
      daily:  data.daily  || {},   // { time: [], temperature_2m_max: [], ... }
      utcOffsetSec: data.utc_offset_seconds || 0,
      timezone: data.timezone || 'UTC'
    };
  } catch (e) {
    console.error('fetchWeather err:', e);
    return null;
  }
}

// Оценка одного правила. Возвращает { fired: bool, message: string }.
function evaluateRule(rule, fc, sub) {
  const hourly = fc.hourly;
  const times = hourly.time || [];
  if (times.length === 0) return null;

  // Находим индекс «сейчас» в hourly (ближайший прошедший час)
  const nowMs = Date.now();
  let nowIdx = 0;
  for (let i = 0; i < times.length; i++) {
    if (new Date(times[i]).getTime() > nowMs) { nowIdx = Math.max(0, i - 1); break; }
    nowIdx = i;
  }

  const t = hourly.temperature_2m || [];
  const pp = hourly.precipitation_probability || [];
  const pm = hourly.precipitation || [];
  const wc = hourly.weather_code || [];

  switch (rule.type) {
    case 'temp_below': {
      const threshold = Number(rule.threshold);
      if (!Number.isFinite(threshold)) return null;
      // Проверяем ближайшие 12 часов
      let minT = Infinity, minIdx = -1;
      for (let i = nowIdx; i < Math.min(nowIdx + 12, t.length); i++) {
        if (t[i] != null && t[i] < minT) { minT = t[i]; minIdx = i; }
      }
      if (minT < threshold) {
        return {
          fired: true,
          message: `❄️ <b>Похолодание!</b>\n${esc(sub.name)}: до <b>${Math.round(minT)}°C</b> ${whenStr(times[minIdx], fc.utcOffsetSec)}`
        };
      }
      return { fired: false };
    }

    case 'temp_above': {
      const threshold = Number(rule.threshold);
      if (!Number.isFinite(threshold)) return null;
      let maxT = -Infinity, maxIdx = -1;
      for (let i = nowIdx; i < Math.min(nowIdx + 12, t.length); i++) {
        if (t[i] != null && t[i] > maxT) { maxT = t[i]; maxIdx = i; }
      }
      if (maxT > threshold) {
        return {
          fired: true,
          message: `🥵 <b>Жара!</b>\n${esc(sub.name)}: до <b>${Math.round(maxT)}°C</b> ${whenStr(times[maxIdx], fc.utcOffsetSec)}`
        };
      }
      return { fired: false };
    }

    case 'rain_soon': {
      const windowH = Number(rule.windowHours) || 3;
      // Ищем час в ближайшие N где prob > 60% И pmm > 0.3
      for (let i = nowIdx; i < Math.min(nowIdx + windowH, t.length); i++) {
        const prob = pp[i] || 0;
        const mm = pm[i] || 0;
        if (prob >= 60 && mm >= 0.3) {
          return {
            fired: true,
            message: `🌧 <b>Скоро дождь!</b>\n${esc(sub.name)}: ${Math.round(mm * 10) / 10} мм/ч, ${prob}% ${whenStr(times[i], fc.utcOffsetSec)}`
          };
        }
      }
      return { fired: false };
    }

    case 'storm_alert': {
      // Гроза в ближайшие 6 часов по WMO weather_code 95/96/99
      // или по CAPE > 1500 + lifted_index < -2 (классическая нестабильность)
      const cape = hourly.cape || [];
      const li = hourly.lifted_index || [];
      for (let i = nowIdx; i < Math.min(nowIdx + 6, t.length); i++) {
        const code = wc[i];
        const stormByCode = code === 95 || code === 96 || code === 99;
        const stormByPhysics = (cape[i] || 0) >= 1500 && (li[i] || 0) <= -2;
        if (stormByCode || stormByPhysics) {
          return {
            fired: true,
            message: `⚡ <b>Гроза прогнозируется!</b>\n${esc(sub.name)}: ${whenStr(times[i], fc.utcOffsetSec)}\nСледи за прогнозом и подготовься.`
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
          message: `☀ <b>${streak} ${pluralDays(streak)} без дождя!</b>\n${esc(sub.name)}: с завтра по ${dailyTimes[streak] ? esc(dailyTimes[streak]) : '?'} — отличное окно для дачи / выезда.`
        };
      }
      return { fired: false };
    }

    default:
      return null;
  }
}

function pluralDays(n) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return 'дней';
  if (mod10 === 1) return 'день';
  if (mod10 >= 2 && mod10 <= 4) return 'дня';
  return 'дней';
}

// "2026-05-17T22:00" + utcOffsetSec → "сегодня в 22:00" / "завтра в 03:00"
function whenStr(isoTime, utcOffsetSec) {
  if (!isoTime) return '';
  const d = new Date(isoTime);
  const now = new Date();
  // Открытое время уже в local-зоне (Open-Meteo с timezone=auto), поэтому
  // не применяем utcOffsetSec вторично. Сравниваем как ISO-строки дат.
  const today = now.toISOString().slice(0,10);
  const tomorrow = new Date(now.getTime() + 86400000).toISOString().slice(0,10);
  const dateStr = isoTime.slice(0,10);
  const hh = isoTime.slice(11,16);
  if (dateStr === today) return `сегодня в ${hh}`;
  if (dateStr === tomorrow) return `завтра в ${hh}`;
  // Иначе — "DD.MM в HH:MM"
  const [, m, dd] = dateStr.split('-');
  return `${dd}.${m} в ${hh}`;
}

// Сводка утра: текущие + макс/мин + осадки сегодня + что-нибудь интересное
function buildMorningSummary(sub, fc) {
  const hourly = fc.hourly;
  const daily = fc.daily;
  if (!hourly?.time?.length || !daily?.time?.length) return null;

  // Текущий час
  const nowMs = Date.now();
  let nowIdx = 0;
  for (let i = 0; i < hourly.time.length; i++) {
    if (new Date(hourly.time[i]).getTime() > nowMs) { nowIdx = Math.max(0, i-1); break; }
    nowIdx = i;
  }
  const curT = hourly.temperature_2m?.[nowIdx];
  const tMin = daily.temperature_2m_min?.[0];
  const tMax = daily.temperature_2m_max?.[0];
  const pSum = daily.precipitation_sum?.[0] || 0;
  const wc = daily.weather_code?.[0];

  // Краткий лейбл погоды по WMO коду
  const condLabel = weatherCodeLabel(wc);
  const rainPart = pSum > 0.5 ? `\n💧 Осадки сегодня: ${pSum.toFixed(1)} мм` : '';

  return (
    `🌅 <b>Доброе утро!</b>\n` +
    `${esc(sub.name)}\n\n` +
    `${condLabel}\n` +
    `🌡 Сейчас: <b>${curT != null ? Math.round(curT) : '?'}°C</b>\n` +
    `📊 Сегодня: <b>${tMin != null ? Math.round(tMin) : '?'}…${tMax != null ? Math.round(tMax) : '?'}°C</b>` +
    rainPart
  );
}

function weatherCodeLabel(code) {
  if (code == null) return '☁ Прогноз';
  if (code === 0) return '☀ Ясно';
  if (code <= 2) return '🌤 Переменная облачность';
  if (code === 3) return '☁ Облачно';
  if (code === 45 || code === 48) return '🌫 Туман';
  if (code <= 57) return '🌧 Морось';
  if (code <= 67) return '🌧 Дождь';
  if (code <= 77) return '🌨 Снег';
  if (code <= 82) return '⛈ Ливень';
  if (code <= 86) return '🌨 Снегопад';
  if (code <= 99) return '⛈ Гроза';
  return '☁ Прогноз';
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
