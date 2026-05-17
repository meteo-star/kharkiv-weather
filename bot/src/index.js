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
      case '/start':       return handleStart(env, chatId, userId, msg.from);
      case '/help':        return handleHelp(env, chatId, isAdmin);
      case '/status':      return handleStatus(env, chatId);
      case '/stop':        return handleStop(env, chatId);
      case '/location':    return handleLocation(env, chatId, args);
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

async function handleStart(env, chatId, userId, fromObj) {
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
      `<code>/admin_test &lt;chat_id&gt;</code> — отправить тестовое сообщение`;
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

// ============================================================
// CRON — проверка правил каждые 30 минут
// ============================================================
async function runCronCheck(env) {
  await incrementStat(env, 'cron_runs');
  // Фаза Б2: пройти по всем подпискам, проверить правила, отправить
  // уведомления. Реализуем после того как Б1 (этот скелет) запустится
  // и /start будет работать.
  // TODO: implement
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
