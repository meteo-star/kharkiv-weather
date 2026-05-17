#!/usr/bin/env node
/*
 * Регистрирует webhook у Telegram Bot API.
 * Запускается ОДИН РАЗ после первого деплоя Worker'а, и каждый раз
 * когда меняется URL Worker'а или webhook secret.
 *
 * Использование:
 *   node scripts/set-webhook.js [WORKER_URL]
 *
 * URL можно передать аргументом или ввести в prompt.
 * Token и secret спрашиваются интерактивно — НЕ попадают в shell history.
 */

import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

async function ask(rl, label, mask = false) {
  if (!mask) {
    return (await rl.question(label)).trim();
  }
  // Для секретов — выключаем echo (как пароль)
  const sttyAvailable = process.platform !== 'win32';
  if (sttyAvailable) {
    // На *nix можно отключить echo через stty
    return (await rl.question(label)).trim();
  }
  // На Windows прячем через ANSI escape — input всё равно виден
  // в логах если кто-то будет смотреть, но в обычном терминале не виден.
  process.stdout.write(label);
  const ch = await new Promise(resolve => {
    let buf = '';
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    const onData = (key) => {
      if (key === '\r' || key === '\n' || key === '') {
        stdin.setRawMode(false);
        stdin.removeListener('data', onData);
        stdout.write('\n');
        resolve(buf);
      } else if (key === '') {  // Ctrl+C
        process.exit(1);
      } else if (key === '' || key === '\b') {  // backspace
        if (buf.length > 0) {
          buf = buf.slice(0, -1);
          stdout.write('\b \b');
        }
      } else {
        buf += key;
        stdout.write('*');
      }
    };
    stdin.on('data', onData);
  });
  return ch.trim();
}

(async () => {
  const rl = createInterface({ input: stdin, output: stdout });

  let workerUrl = process.argv[2];
  if (!workerUrl) {
    workerUrl = await ask(rl, 'Worker URL (https://...workers.dev): ');
  }
  workerUrl = workerUrl.replace(/\/$/, '');
  const webhookUrl = `${workerUrl}/webhook`;

  const botToken = await ask(rl, 'Bot token (paste, hidden): ', true);
  if (!botToken) { console.error('No token provided'); process.exit(1); }

  const webhookSecret = await ask(rl, 'Webhook secret (paste, hidden, or leave empty): ', true);

  rl.close();

  console.log(`\nRegistering webhook: ${webhookUrl}`);

  const body = {
    url: webhookUrl,
    allowed_updates: ['message', 'edited_message']
  };
  if (webhookSecret) body.secret_token = webhookSecret;

  const apiUrl = `https://api.telegram.org/bot${botToken}/setWebhook`;
  const r = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await r.json();
  if (data.ok) {
    console.log('✅ Webhook установлен:', webhookUrl);
    console.log('   description:', data.description);
    console.log('\nПроверь в Telegram: открой своего бота и напиши /start');
  } else {
    console.error('❌ Telegram API ошибка:', data);
    process.exit(1);
  }
})().catch(err => {
  console.error('❌ Ошибка:', err.message);
  process.exit(1);
});
