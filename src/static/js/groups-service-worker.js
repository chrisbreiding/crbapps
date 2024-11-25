const cacheName = 'crbapps-groups-v2'
const files = [
  '/groups/',
  '/static/css/shared.css',
  '/static/css/groups.css',
  '/static/js/groups.js',
  '/static/img/favicon.ico',
  '/static/img/groups/icon-32.png',
  '/static/img/groups/icon-64.png',
  '/static/img/groups/icon-96.png',
  '/static/img/groups/icon-128.png',
  '/static/img/groups/icon-168.png',
  '/static/img/groups/icon-192.png',
  '/static/img/groups/icon-256.png',
  '/static/img/groups/icon-512.png',
]

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install')

  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName)
      console.log('[Service Worker] Caching all')
      await cache.addAll(files)
    })()
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request)
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`)
      if (r) {
        return r
      }

      const response = await fetch(e.request)
      const cache = await caches.open(cacheName)
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`)
      cache.put(e.request, response.clone())
      return response
    })(),
  )
})

// delete old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return
          }
          return caches.delete(key)
        }),
      )
    }),
  )
})
