/*  Service Worker — Meteo Star
    Стратегии кэширования:
      - Static (HTML, иконки, manifest): cache-first c сетевым fallback
      - Шрифты (Google Fonts CSS + файлы): cache-first навсегда
      - Chart.js (CDN): cache-first
      - API (Open-Meteo, Nominatim): network-first с фолбэком на последний кэш
    При обновлении версии CACHE_VERSION старый кэш стирается на activate.
*/

const CACHE_VERSION = 'meteo-star-v1.15.8';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const API_CACHE = `${CACHE_VERSION}-api`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;

// Shell — что обязательно положим в кэш сразу при установке
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
  // Не блокируем сразу — даём шеллу установиться даже если что-то не докачается
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS).catch((err) => {
        console.warn('[SW] Часть shell-ассетов не закэшировалась:', err);
      }))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => !k.startsWith(CACHE_VERSION)).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Игнорируем не-GET (POST к API мы вообще не делаем, но на всякий случай)
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // === Открытые API погоды и геокодинга — network-first ===
  // Прогноз должен быть свежим; если нет сети — отдаём последний валидный кэш.
  const isApi =
    url.hostname === 'api.open-meteo.com' ||
    url.hostname === 'air-quality-api.open-meteo.com' ||
    url.hostname === 'archive-api.open-meteo.com' ||
    url.hostname === 'geocoding-api.open-meteo.com' ||
    url.hostname === 'nominatim.openstreetmap.org';

  if (isApi) {
    event.respondWith(networkFirst(req, API_CACHE));
    return;
  }

  // === Google Fonts (CSS + woff2) — cache-first навсегда ===
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(req, FONT_CACHE));
    return;
  }

  // === Chart.js CDN — cache-first ===
  if (url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(cacheFirst(req, STATIC_CACHE));
    return;
  }

  // === Same-origin ===
  if (url.origin === self.location.origin) {
    // Navigation (HTML, manifest.json) — network-first: при наличии сети обновление видно
    // сразу. Без этого iOS PWA требовал 2 запуска, чтобы подхватить новый shell.
    // Иконки/картинки/прочие статические ассеты — stale-while-revalidate (мгновенно из кэша).
    const isFreshNeeded = req.mode === 'navigate' ||
                          url.pathname.endsWith('/') ||
                          url.pathname.endsWith('.html') ||
                          url.pathname.endsWith('manifest.json');
    if (isFreshNeeded) {
      event.respondWith(networkFirst(req, STATIC_CACHE));
    } else {
      event.respondWith(staleWhileRevalidate(req, STATIC_CACHE));
    }
    return;
  }

  // Прочее — просто сетевой запрос
});

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const resp = await fetch(req);
    if (resp && resp.ok && (resp.type === 'basic' || resp.type === 'cors')) {
      cache.put(req, resp.clone()).catch(() => {});
    }
    return resp;
  } catch (err) {
    // Сети нет и кэша нет — возвращаем минимальный 503
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const resp = await fetch(req);
    if (resp && resp.ok) {
      cache.put(req, resp.clone()).catch(() => {});
    }
    return resp;
  } catch (err) {
    const cached = await cache.match(req);
    if (cached) return cached;
    // Нет ни сети, ни кэша
    return new Response(JSON.stringify({ offline: true, error: 'No network and no cached response' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req).then((resp) => {
    if (resp && resp.ok) {
      cache.put(req, resp.clone()).catch(() => {});
    }
    return resp;
  }).catch(() => null);
  // Если есть кэш — возвращаем сразу, фон обновляет
  return cached || (await fetchPromise) || new Response('Offline', { status: 503 });
}

// Пользователь может скомандовать SW обновиться немедленно (например при клике на «Обновить»)
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
