/*
 * Meteo Star Admin Panel
 * Хранит admin token в sessionStorage (очищается при закрытии вкладки).
 * Все запросы к Worker идут с заголовком X-Admin-Token.
 */
const BOT_API_BASE = 'https://meteo-star-bot.stanislav-perec.workers.dev';
const TOKEN_KEY = 'kw:admin-token:v1';

const $ = (id) => document.getElementById(id);

let adminToken = sessionStorage.getItem(TOKEN_KEY) || '';

async function apiCall(path, options = {}) {
  const headers = { 'X-Admin-Token': adminToken, ...(options.headers || {}) };
  if (options.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
    headers['Content-Type'] = 'application/json';
  }
  const r = await fetch(`${BOT_API_BASE}${path}`, { ...options, headers });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || `HTTP ${r.status}`);
  return data;
}

async function tryLogin(token) {
  adminToken = token;
  try {
    await apiCall('/api/admin/login');
    sessionStorage.setItem(TOKEN_KEY, token);
    showDashboard();
  } catch (e) {
    adminToken = '';
    sessionStorage.removeItem(TOKEN_KEY);
    $('loginErr').textContent = '❌ Неверный токен';
  }
}

function showLogin() {
  $('loginView').style.display = '';
  $('dashView').style.display = 'none';
  $('tokenInput').value = '';
  $('loginErr').textContent = '';
  setTimeout(() => $('tokenInput').focus(), 0);
}

async function showDashboard() {
  $('loginView').style.display = 'none';
  $('dashView').style.display = '';
  await refresh();
}

async function refresh() {
  $('lastRefresh').textContent = `обновлено ${new Date().toLocaleTimeString('ru-RU')}`;
  try {
    const [statsData, listData] = await Promise.all([
      apiCall('/api/admin/stats?days=7'),
      apiCall('/api/admin/list')
    ]);
    renderStats(statsData);
    renderSubs(listData.subs || []);
  } catch (e) {
    if (e.message === 'unauthorized') {
      adminToken = '';
      sessionStorage.removeItem(TOKEN_KEY);
      showLogin();
    } else {
      console.error(e);
    }
  }
}

function renderStats(data) {
  const today = data.dayStats?.[0] || {};
  $('statTotal').textContent = data.totalSubs ?? '?';
  $('statSent').textContent = today.notifications || 0;
  $('statCron').textContent = today.cron_runs || 0;
  $('statErr').textContent = today.errors || 0;

  const container = $('dayRows');
  container.innerHTML = '';
  (data.dayStats || []).forEach(d => {
    const row = document.createElement('div');
    row.className = 'day-row';
    row.innerHTML = `
      <div>${d.date.slice(5)}</div>
      <div class="v pos">+${d.subscribed || 0}</div>
      <div class="v bad">−${d.unsubscribed || 0}</div>
      <div class="v col4">${d.notifications || 0}</div>
      <div class="v col5 bad">${d.errors || 0}</div>
      <div class="v col6">${d.cron_runs || 0}</div>
      <div class="v col7"></div>
    `;
    container.appendChild(row);
  });
}

function renderSubs(subs) {
  $('subsCount').textContent = subs.length;
  const tbody = $('subsBody');
  tbody.innerHTML = '';
  subs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  for (const s of subs) {
    const tr = document.createElement('tr');
    const handle = s.username ? `@${s.username}` : (s.firstName || '—');
    const isGroup = s.chatType && s.chatType !== 'private';
    const stateBadges = [];
    if (s.banned) stateBadges.push('<span class="badge-banned">BAN</span>');
    if (s.paired) stateBadges.push('<span class="badge-paired">сайт</span>');
    if (isGroup) stateBadges.push(`<span class="badge-group">${s.chatType}</span>`);

    tr.innerHTML = `
      <td class="mono">${s.chatId}</td>
      <td>${esc(handle)}</td>
      <td>${esc(s.name || '')}</td>
      <td>${s.rulesCount || 0}</td>
      <td>${stateBadges.join(' ') || '<span style="color:rgba(232,240,255,0.4)">—</span>'}</td>
      <td>
        <div class="row-actions">
          <button data-action="test" data-id="${s.chatId}">тест</button>
          <button data-action="${s.banned ? 'unban' : 'ban'}" data-id="${s.chatId}">${s.banned ? 'разбан' : 'бан'}</button>
          <button data-action="delete" data-id="${s.chatId}" class="danger">×</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  }
  // Делегирование кликов
  tbody.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', () => handleRowAction(btn.dataset.action, btn.dataset.id));
  });
}

async function handleRowAction(action, chatId) {
  try {
    if (action === 'test') {
      await apiCall('/api/admin/test', { method: 'POST', body: { chatId } });
      flash(`✓ Тест отправлен на ${chatId}`);
    } else if (action === 'ban') {
      if (!confirm(`Заблокировать ${chatId}?`)) return;
      await apiCall('/api/admin/ban', { method: 'POST', body: { chatId } });
      flash(`✓ Заблокировано ${chatId}`);
      await refresh();
    } else if (action === 'unban') {
      await apiCall('/api/admin/unban', { method: 'POST', body: { chatId } });
      flash(`✓ Разблокировано ${chatId}`);
      await refresh();
    } else if (action === 'delete') {
      if (!confirm(`УДАЛИТЬ подписку ${chatId} полностью? Восстановить нельзя.`)) return;
      await apiCall('/api/admin/delete-sub', { method: 'POST', body: { chatId } });
      flash(`✓ Удалено ${chatId}`);
      await refresh();
    }
  } catch (e) {
    flash(`❌ ${e.message}`, true);
  }
}

async function doBroadcast() {
  const text = $('broadcastText').value.trim();
  if (!text) return;
  if (!confirm(`Отправить сообщение всем подписчикам?\n\n${text.slice(0, 200)}${text.length > 200 ? '…' : ''}`)) return;
  const statusEl = $('broadcastStatus');
  statusEl.textContent = '⏳ Отправляю...';
  statusEl.classList.remove('error');
  try {
    const r = await apiCall('/api/admin/broadcast', { method: 'POST', body: { text } });
    statusEl.textContent = `✅ Отправлено: ${r.sent}, ошибок: ${r.failed}`;
    $('broadcastText').value = '';
    setTimeout(() => statusEl.textContent = '', 5000);
  } catch (e) {
    statusEl.classList.add('error');
    statusEl.textContent = `❌ ${e.message}`;
  }
}

async function runCron() {
  flash('⏰ Запускаю cron...');
  try {
    const r = await apiCall('/api/admin/cron', { method: 'POST' });
    flash(`✓ Обработано: ${r.processed}, сработало: ${r.fired}, ошибок: ${r.failed}`);
    await refresh();
  } catch (e) {
    flash(`❌ ${e.message}`, true);
  }
}

function flash(msg, isError = false) {
  const el = $('broadcastStatus');
  el.classList.toggle('error', isError);
  el.textContent = msg;
  setTimeout(() => { el.textContent = ''; }, 4000);
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// === Init ===
$('loginBtn').addEventListener('click', () => tryLogin($('tokenInput').value.trim()));
$('tokenInput').addEventListener('keydown', e => { if (e.key === 'Enter') $('loginBtn').click(); });
$('refreshBtn').addEventListener('click', refresh);
$('logoutBtn').addEventListener('click', () => {
  adminToken = '';
  sessionStorage.removeItem(TOKEN_KEY);
  showLogin();
});
$('broadcastBtn').addEventListener('click', doBroadcast);
$('cronBtn').addEventListener('click', runCron);

if (adminToken) {
  // Проверяем что токен валиден
  apiCall('/api/admin/login').then(() => showDashboard()).catch(() => {
    adminToken = '';
    sessionStorage.removeItem(TOKEN_KEY);
    showLogin();
  });
} else {
  showLogin();
}
