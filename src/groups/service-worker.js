const cacheName = 'com.crbapps.groups.v2'
const files = [
  '/groups/',
  '/groups/shared.css',
  '/groups/groups.css',
  '/groups/groups.js',
  '/groups/favicon.ico',
  '/groups/icons/icon-32.png',
  '/groups/icons/icon-64.png',
  '/groups/icons/icon-96.png',
  '/groups/icons/icon-128.png',
  '/groups/icons/icon-168.png',
  '/groups/icons/icon-192.png',
  '/groups/icons/icon-256.png',
  '/groups/icons/icon-512.png',
]

console.log('[Service Worker] Version:', cacheName)

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install')

  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName)
      console.log('[Service Worker] Caching all')
      try {
        await cache.addAll(files)
        console.log('[Service Worker] Caching successful')
      } catch (e) {
        console.error('[Service Worker] Error caching files:', e)
      }
    })()
  )
})

// delete old caches
self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activate')

  e.waitUntil(
    caches.keys()
    .then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return
          }
          console.log('[Service Worker] Deleting old cache with key:', key)
          return caches.delete(key)
        }),
      )
    })
    .then(() => {
      console.log('[Service Worker] Activation successful')
    })
    .catch((error) => {
      console.error('[Service Worker] Error deleting old caches:', error)
    })
  )
})

const putInCache = async (request, response) => {
  const cache = await caches.open(cacheName)
  await cache.put(request, response)
}

const cacheFirst = async (request) => {
  console.log(`[Service Worker] Checking cache for resource: ${request.url}`)
  const responseFromCache = await caches.match(request)

  if (responseFromCache) {
    console.log('[Service Worker] Return cached resource')

    return responseFromCache
  }

  try {
    console.log('[Service Worker] Fetching and caching resource')

    const responseFromNetwork = await fetch(request)

    putInCache(request, responseFromNetwork.clone())

    return responseFromNetwork
  } catch (error) {
    console.error('[Service Worker] Error fetching resource:', error)

    return new Response(`Could not fetch: ${request.url}\n\n${error.message || error}`, {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}

self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetch')

  event.respondWith(cacheFirst(event.request))
})
