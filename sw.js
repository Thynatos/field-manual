/* Summer Field Manual — offline cache (network-first, cache fallback).
   Sidecar to index.html; the page only registers this when served over https,
   so the single-file version stays self-contained. Network-first means updates
   arrive whenever you're online; the cache is the offline safety net. */
const CACHE = 'fm-v1';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(['./'])).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      // opportunistically cache everything that loads (page, fonts, manifest)
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return r;
    }).catch(() =>
      caches.match(e.request, { ignoreSearch: true }).then(m => m || caches.match('./'))
    )
  );
});
