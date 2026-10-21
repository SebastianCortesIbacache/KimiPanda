/**
 * KIMI PANDA — SERVICE WORKER OFFLINE-FIRST (PWA)
 */

const CACHE_NAME = 'kimi-panda-v9';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/tokens.css',
  './css/hub.css',
  './css/game.css',
  './css/shop.css',
  './css/worlds.css',
  './css/achievements.css',
  './js/main.js',
  './js/store.js',
  './js/db.js',
  './js/audio.js',
  './js/ui.js',
  './js/game.js',
  './js/shop.js',
  './js/worlds.js',
  './js/achievements.js',
  './data/questions_mvp_6_7.json',
  './assets/mascotas/mochi_hub.webp',
  './assets/mascotas/mochi_celebrate.webp',
  './assets/mascotas/mochi_avatar.webp',
  './assets/mascotas/mochi_thinking.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) {
            return caches.delete(k);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Imágenes en assets/: Cache-First con Network Fallback
  if (url.pathname.includes('/assets/')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // HTML / JS / CSS / JSON: Network-First con Cache Fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
