# Meteo Star Bot

Telegram-бот для push-уведомлений Meteo Star. Развёрнут как Cloudflare Worker.

## Архитектура

```
Telegram ──webhook──▶ Cloudflare Worker (этот код)
                       │
                       ├─ KV: SUBSCRIPTIONS  (подписки)
                       ├─ KV: PAIRING        (коды привязки к веб-фронту)
                       └─ KV: STATS          (статистика)

Cron (каждые 30 мин) ─▶ Worker.scheduled() ─▶ для каждой подписки:
                       │
                       1. fetch Open-Meteo по координатам
                       2. apply rules
                       3. если matched && не firing-cooldown → sendMessage
                       4. обновить lastFired в KV
```

## Установка (один раз)

### 1. Логин в Cloudflare

```powershell
cd bot
npm install
npx wrangler login
```

Откроется браузер — подтверди доступ.

### 2. Создание KV namespaces

```powershell
npx wrangler kv namespace create SUBSCRIPTIONS
npx wrangler kv namespace create PAIRING
npx wrangler kv namespace create STATS
```

Каждая команда выведет id. Вставь их в `wrangler.toml` вместо `REPLACE_ME_AFTER_kv_namespace_create`.

### 3. Сохранение секретов

```powershell
npx wrangler secret put TELEGRAM_BOT_TOKEN
# Введи токен от @BotFather, нажми Enter

npx wrangler secret put TELEGRAM_WEBHOOK_SECRET
# Введи случайную строку (32+ символов). Используется для верификации
# что POST /webhook реально пришёл от Telegram.
```

Сгенерировать случайный секрет:
```powershell
[guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N')
```

### 4. Деплой

```powershell
npx wrangler deploy
```

Wrangler выведет URL вида:
```
https://meteo-star-bot.<your-subdomain>.workers.dev
```

### 5. Регистрация webhook в Telegram

```powershell
node scripts/set-webhook.js `
  https://meteo-star-bot.<your-subdomain>.workers.dev `
  1234567890:ABC-... `
  <тот же secret что в шаге 3>
```

### 6. Проверка

В Telegram открой своего бота и напиши `/start`. Должен ответить.

## Разработка

```powershell
npm run dev      # локальный сервер на http://localhost:8787
npm run tail     # стрим логов задеплоенного Worker'а
npm run deploy   # передеплой
```

## Команды бота

### Для всех:
- `/start` — подписаться (создаёт запись в KV SUBSCRIPTIONS)
- `/help` — список команд
- `/status` — твоя подписка
- `/location <город>` — сменить локацию (через Open-Meteo geocoding)
- `/stop` — отписаться

### Только для админа (ADMIN_USER_ID в wrangler.toml):
- `/admin_stats` — статистика дня
- `/admin_list [N]` — последние N подписок
- `/admin_broadcast <текст>` — рассылка всем
- `/admin_ban <chat_id>` — заблокировать
- `/admin_unban <chat_id>` — разблокировать
- `/admin_test <chat_id>` — тестовое сообщение

## Структура подписки в KV

Ключ: `sub:<chat_id>` (например `sub:151252296`)

```json
{
  "chatId": 151252296,
  "userId": 151252296,
  "username": "stanislav",
  "firstName": "Stanislav",
  "lat": 49.9,
  "lon": 36.21,
  "name": "Высокий",
  "lang": "ru",
  "rules": [
    { "type": "rain_soon", "windowHours": 3 },
    { "type": "morning_summary", "hour": 7, "minute": 30 }
  ],
  "createdAt": "2026-05-17T...",
  "banned": false,
  "lastFired": {
    "rain_soon": "2026-05-17T08:00:00Z"
  }
}
```

## Лимиты Cloudflare Free tier

- 100,000 запросов/день (Worker invocations)
- KV: 100,000 reads/day, 1,000 writes/day, 1 GB storage
- Cron Triggers — бесплатно
- Webhook от Telegram — каждый update = 1 invocation

С запасом для ~100 подписок при cron каждые 30 мин:
- 48 cron-запусков/день × 100 подписок × 1 fetch погоды × 1 write = ~5000 writes/day ❗

Если упрёмся в лимит writes — group fetches по близким координатам.

## TODO (фазы Б2-Б5)

- [ ] Б2: cron-логика — реальная проверка правил каждые 30 мин
- [ ] Б3: UI настройки правил в самом приложении (Settings → Уведомления)
- [ ] Б4: полные admin-команды (уже частично)
- [ ] Б5: групповые чаты, веб-админка
