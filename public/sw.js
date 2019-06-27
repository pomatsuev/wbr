//CHANGE staticCacheName IF YOU CHANGED OTHER FILES IN YOUR PROJECT
const staticCacheName     = 'app-static-cache-v1';
const dynamicCacheName    = 'app-dynamic-cache-v1';

const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/build/style.css',
  '/build/vendor.js',
  '/build/bundle.js',
  'https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap',
  'https://fonts.gstatic.com/s/quicksand/v9/6xKtdSZaM9iE8KbpRA_hK1QN.woff2',
  'https://fonts.gstatic.com/s/quicksand/v9/6xKodSZaM9iE8KbpRA_pkHEYT8L_.woff2'
];

const limitCacheSize = (name, size) => {
  caches.open(name).then(cache=>{
    cache.keys().then(keys=>{
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size))
      }
    })
  })
}


self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(staticCacheName)
      .then(cache=>{
        cache.addAll(assets);
      })
  );
})

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>{
      return Promise.all(
        keys.filter(key=> key!==staticCacheName && key!==dynamicCacheName)
        .map(key=>caches.delete(key))
      )
    })
  );
})

self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request)
      .then(response=>{
        return response || fetch(e.request).then(fetchResponse=>{
          return caches.open(dynamicCacheName)
            .then(cache=>{
              cache.put(e.request.url, fetchResponse.clone());
              limitCacheSize(dynamicCacheName,15);
              return fetchResponse;
            });
        }).catch(_err=>{
          if(~e.request.url.indexOf('.html')){
            return caches.match('/');
          }
        });
      })
  )
})