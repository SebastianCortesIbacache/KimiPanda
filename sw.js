/**
 * KIMI PANDA — SERVICE WORKER OFFLINE-FIRST (PWA v1.2.0)
 */

const CACHE_NAME = 'kimi-panda-v12';

const PRECACHE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./favicon.ico",
  "./assets/iconos/favicon.png",
  "./css/tokens.css",
  "./css/hub.css",
  "./css/game.css",
  "./css/shop.css",
  "./css/worlds.css",
  "./css/achievements.css",
  "./js/main.js",
  "./js/store.js",
  "./js/db.js",
  "./js/audio.js",
  "./js/speech.js",
  "./js/ui.js",
  "./js/game.js",
  "./js/shop.js",
  "./js/worlds.js",
  "./js/achievements.js",
  "./data/questions_mvp_6_7.json",
  "./assets/mascotas/mochi_hub.webp",
  "./assets/mascotas/mochi_celebrate.webp",
  "./assets/mascotas/mochi_avatar.webp",
  "./assets/mascotas/mochi_thinking.webp",
  "./assets/mascotas/skins/classic_hub.webp",
  "./assets/mascotas/skins/classic_avatar.webp",
  "./assets/mascotas/skins/mochi_classic_hub.webp",
  "./assets/mascotas/skins/mochi_classic_avatar.webp",
  "./assets/mascotas/skins/explorer_hub.webp",
  "./assets/mascotas/skins/explorer_avatar.webp",
  "./assets/mascotas/skins/mochi_explorer_hub.webp",
  "./assets/mascotas/skins/mochi_explorer_avatar.webp",
  "./assets/mascotas/skins/diver_hub.webp",
  "./assets/mascotas/skins/diver_avatar.webp",
  "./assets/mascotas/skins/mochi_diver_hub.webp",
  "./assets/mascotas/skins/mochi_diver_avatar.webp",
  "./assets/mascotas/skins/aviator_hub.webp",
  "./assets/mascotas/skins/aviator_avatar.webp",
  "./assets/mascotas/skins/mochi_aviator_hub.webp",
  "./assets/mascotas/skins/mochi_aviator_avatar.webp",
  "./assets/mascotas/skins/scientist_hub.webp",
  "./assets/mascotas/skins/scientist_avatar.webp",
  "./assets/mascotas/skins/mochi_scientist_hub.webp",
  "./assets/mascotas/skins/mochi_scientist_avatar.webp",
  "./assets/mascotas/skins/astronaut_hub.webp",
  "./assets/mascotas/skins/astronaut_avatar.webp",
  "./assets/mascotas/skins/mochi_astronaut_hub.webp",
  "./assets/mascotas/skins/mochi_astronaut_avatar.webp",
  "./assets/mascotas/skins/artist_hub.webp",
  "./assets/mascotas/skins/artist_avatar.webp",
  "./assets/mascotas/skins/mochi_artist_hub.webp",
  "./assets/mascotas/skins/mochi_artist_avatar.webp",
  "./assets/mascotas/skins/detective_hub.webp",
  "./assets/mascotas/skins/detective_avatar.webp",
  "./assets/mascotas/skins/mochi_detective_hub.webp",
  "./assets/mascotas/skins/mochi_detective_avatar.webp",
  "./assets/mascotas/skins/wizard_hub.webp",
  "./assets/mascotas/skins/wizard_avatar.webp",
  "./assets/mascotas/skins/mochi_wizard_hub.webp",
  "./assets/mascotas/skins/mochi_wizard_avatar.webp",
  "./assets/preguntas/mvp_ciencias_001.webp",
  "./assets/preguntas/mvp_ciencias_021.webp",
  "./assets/preguntas/mvp_ciencias_034.webp",
  "./assets/preguntas/mvp_ciencias_041.webp",
  "./assets/preguntas/mvp_ciencias_054.webp",
  "./assets/preguntas/mvp_ciencias_081.webp",
  "./assets/preguntas/mvp_ciencias_087.webp",
  "./assets/preguntas/mvp_ciencias_094.webp",
  "./assets/preguntas/mvp_ciencias_101.webp",
  "./assets/preguntas/mvp_ciencias_107.webp",
  "./assets/preguntas/mvp_ciencias_114.webp",
  "./assets/preguntas/mvp_ciencias_127.webp",
  "./assets/preguntas/mvp_ciencias_141.webp",
  "./assets/preguntas/mvp_ciencias_147.webp",
  "./assets/preguntas/mvp_ciencias_154.webp",
  "./assets/preguntas/mvp_ciencias_161.webp",
  "./assets/preguntas/mvp_ciencias_181.webp",
  "./assets/preguntas/mvp_ciencias_194.webp",
  "./assets/preguntas/mvp_historia_001.webp",
  "./assets/preguntas/mvp_historia_021.webp",
  "./assets/preguntas/mvp_historia_041.webp",
  "./assets/preguntas/mvp_historia_091.webp",
  "./assets/preguntas/mvp_historia_111.webp",
  "./assets/preguntas/mvp_historia_121.webp",
  "./assets/preguntas/mvp_historia_131.webp",
  "./assets/preguntas/mvp_historia_141.webp",
  "./assets/preguntas/mvp_historia_161.webp",
  "./assets/preguntas/mvp_historia_171.webp",
  "./assets/preguntas/mvp_ingles_011.webp",
  "./assets/preguntas/mvp_ingles_021.webp",
  "./assets/preguntas/mvp_ingles_031.webp",
  "./assets/preguntas/mvp_ingles_041.webp",
  "./assets/preguntas/mvp_ingles_051.webp",
  "./assets/preguntas/mvp_ingles_061.webp",
  "./assets/preguntas/mvp_ingles_071.webp",
  "./assets/preguntas/mvp_ingles_081.webp",
  "./assets/preguntas/mvp_ingles_091.webp",
  "./assets/preguntas/mvp_ingles_101.webp",
  "./assets/preguntas/mvp_ingles_111.webp",
  "./assets/preguntas/mvp_ingles_121.webp",
  "./assets/preguntas/mvp_ingles_131.webp",
  "./assets/preguntas/mvp_ingles_141.webp",
  "./assets/preguntas/mvp_ingles_151.webp",
  "./assets/preguntas/mvp_ingles_161.webp",
  "./assets/preguntas/mvp_ingles_171.webp",
  "./assets/preguntas/mvp_ingles_191.webp",
  "./assets/preguntas/mvp_lenguaje_005.webp",
  "./assets/preguntas/mvp_lenguaje_021.webp",
  "./assets/preguntas/mvp_lenguaje_041.webp",
  "./assets/preguntas/mvp_lenguaje_045.webp",
  "./assets/preguntas/mvp_lenguaje_049.webp",
  "./assets/preguntas/mvp_lenguaje_061.webp",
  "./assets/preguntas/mvp_lenguaje_065.webp",
  "./assets/preguntas/mvp_lenguaje_069.webp",
  "./assets/preguntas/mvp_lenguaje_113.webp",
  "./assets/preguntas/mvp_lenguaje_157.webp",
  "./assets/preguntas/mvp_lenguaje_169.webp",
  "./assets/preguntas/mvp_lenguaje_173.webp",
  "./assets/preguntas/mvp_lenguaje_181.webp",
  "./assets/preguntas/mvp_logica_001.webp",
  "./assets/preguntas/mvp_logica_011.webp",
  "./assets/preguntas/mvp_logica_016.webp",
  "./assets/preguntas/mvp_logica_026.webp",
  "./assets/preguntas/mvp_logica_031.webp",
  "./assets/preguntas/mvp_logica_036.webp",
  "./assets/preguntas/mvp_logica_046.webp",
  "./assets/preguntas/mvp_logica_051.webp",
  "./assets/preguntas/mvp_logica_061.webp",
  "./assets/preguntas/mvp_logica_066.webp",
  "./assets/preguntas/mvp_logica_076.webp",
  "./assets/preguntas/mvp_logica_081.webp",
  "./assets/preguntas/mvp_logica_086.webp",
  "./assets/preguntas/mvp_logica_091.webp",
  "./assets/preguntas/mvp_logica_096.webp",
  "./assets/preguntas/mvp_logica_101.webp",
  "./assets/preguntas/mvp_logica_106.webp",
  "./assets/preguntas/mvp_logica_111.webp",
  "./assets/preguntas/mvp_logica_116.webp",
  "./assets/preguntas/mvp_logica_126.webp",
  "./assets/preguntas/mvp_logica_131.webp",
  "./assets/preguntas/mvp_logica_136.webp",
  "./assets/preguntas/mvp_logica_141.webp",
  "./assets/preguntas/mvp_logica_146.webp",
  "./assets/preguntas/mvp_logica_156.webp",
  "./assets/preguntas/mvp_logica_166.webp",
  "./assets/preguntas/mvp_logica_181.webp",
  "./assets/preguntas/mvp_logica_191.webp",
  "./assets/preguntas/mvp_logica_196.webp",
  "./assets/preguntas/mvp_matematicas_001.webp",
  "./assets/preguntas/mvp_matematicas_006.webp",
  "./assets/preguntas/mvp_matematicas_021.webp",
  "./assets/preguntas/mvp_matematicas_036.webp",
  "./assets/preguntas/mvp_matematicas_046.webp",
  "./assets/preguntas/mvp_matematicas_056.webp",
  "./assets/preguntas/mvp_matematicas_071.webp",
  "./assets/preguntas/mvp_matematicas_081.webp",
  "./assets/preguntas/mvp_matematicas_086.webp",
  "./assets/preguntas/mvp_matematicas_091.webp",
  "./assets/preguntas/mvp_matematicas_096.webp",
  "./assets/preguntas/mvp_matematicas_111.webp",
  "./assets/preguntas/mvp_matematicas_116.webp",
  "./assets/preguntas/mvp_matematicas_121.webp",
  "./assets/preguntas/mvp_matematicas_126.webp",
  "./assets/preguntas/mvp_matematicas_141.webp",
  "./assets/preguntas/mvp_matematicas_156.webp",
  "./assets/preguntas/mvp_matematicas_176.webp"
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
