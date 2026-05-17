#!/usr/bin/env node
/*
 * Регистрирует webhook у Telegram Bot API.
 * Запускается ОДИН РАЗ после первого деплоя Worker'а, и каждый раз
 * когда меняется URL Worker'а или webhook secret.
 *
 * Использование:
 *   node scripts/set-webhook.js <WORKER_URL> <BOT_TOKEN> [WEBHOOK_SECRET]
 *
 * Пример:
 *   node scripts/set-webhook.js \
 *     https://meteo-star-bot.<your-subdomain>.workers.dev \
 *     1234567890:ABC-... \
 *     myrandomsecret123
 *
 * Если не указать WEBHOOK_SECRET — Telegram будет слать update'ы без
 * заголовка X-Telegram-Bot-Api-Secret-Token (менее безопасно).
 */

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node set-webhook.js <WORKER_URL> <BOT_TOKEN> [WEBHOOK_SECRET]');
  process.exit(1);
}

const [workerUrl, botToken, webhookSecret] = args;
const url = `${workerUrl.replace(/\/$/, '')}/webhook`;

const body = {
  url,
  allowed_updates: ['message', 'edited_message']
};
if (webhookSecret) body.secret_token = webhookSecret;

const apiUrl = `https://api.telegram.org/bot${botToken}/setWebhook`;

fetch(apiUrl, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body)
})
  .then(r => r.json())
  .then(data => {
    if (data.ok) {
      console.log('✅ Webhook установлен:', url);
      console.log('   description:', data.description);
    } else {
      console.error('❌ Ошибка:', data);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ Сетевая ошибка:', err.message);
    process.exit(1);
  });
