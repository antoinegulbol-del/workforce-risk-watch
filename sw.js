/* Workforce Risk Watch service worker: app shell cached, event data network-first with offline fallback. */
const CACHE = "riskwatch-v1";
const SHELL = ["./", "index.html", "world.json", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // fonts and libraries: let the browser handle them
  // Network first for everything on our origin, so updates arrive at once; cache is the offline fallback.
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(url.pathname.endsWith("events.json") ? "data/events.json" : req, copy)); }
      return res;
    }).catch(() => caches.match(url.pathname.endsWith("events.json") ? "data/events.json" : req).then(r => r || caches.match("index.html")))
  );
});
