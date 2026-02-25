const CACHE_NAME = 'recibos-v1.5'; // Subimos la versión
const assets = [
  './',
  './index.html',
  './app.js',
  './logo.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Obliga al nuevo SW a tomar el control
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

// ESTRATEGIA: Intentar internet primero, si no hay, usar caché.
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});