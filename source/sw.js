"use strict";
(function() {
    var cacheVersion = "20180110";
    var staticImageCacheName = "image" + cacheVersion;
    var staticFontsCacheName = "fonts" + cacheVersion;
    var staticAssetsCacheName = "assets" + cacheVersion;
    var contentCacheName = "content" + cacheVersion;
    var vendorCacheName = "vendor" + cacheVersion;
    var maxEntries = 100;
    self.importScripts("https://cdn.jsdelivr.net/npm/sw-toolbox@3.6.0/sw-toolbox.js");
    self.toolbox.options.debug = false;
    self.toolbox.options.networkTimeoutSeconds = 5;
    //SOURCEß
    self.toolbox.router.get('/(.*)\.js', self.toolbox.cacheFirst, {
        origin: /blog\.zscself\.com/,
        cache: {
            name: staticAssetsCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get('/(.*)\.css', self.toolbox.cacheFirst, {
        origin: /blog\.zscself\.com/,
        cache: {
            name: staticAssetsCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get('/assets/(.*)', self.toolbox.cacheFirst, {
        cache: {
            name: staticAssetsCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/images/(.*)", self.toolbox.fastest, {
        cache: {
            name: staticImageCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/fonts/(.*)", self.toolbox.cacheFirst, {
        cache: {
            name: staticFontsCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/img/(.*)", self.toolbox.fastest, {
        cache: {
            name: staticImageCacheName,
            maxEntries: maxEntries
        }
    });

    // CDN
    self.toolbox.router.get('/(.*)', self.toolbox.fastest, {
        origin: /ojewiybay\.qnssl\.com/,
        cache: {
            name: staticAssetsCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get('/(.*)', self.toolbox.fastest, {
        origin: /ojiv0mk0j\.qnssl\.com/,
        cache: {
            name: staticAssetsCacheName,
            maxEntries: maxEntries
        }
    });

    //Disqus
    self.toolbox.router.get("/(.*)", self.toolbox.networkOnly, {
        origin: /disqus\.com/,
    });
    self.toolbox.router.get("/(.*)", self.toolbox.networkOnly, {
        origin: /referrer\.disqus\.com/,
    });

    //Disqus CDN
    self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
        origin: /a\.disquscdn\.com/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
        origin: /c\.disquscdn\.com/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
        origin: /uploads\.disquscdn\.com/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
        origin: /media\.disquscdn\.com/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });

    //Google Analytics
    self.toolbox.router.get("/(.*)", self.toolbox.networkOnly, {
        origin: /(www\.google-analytics\.com|ssl\.google-analytics\.com)/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });

    self.toolbox.router.get('/*', self.toolbox.fastest, {
        cache: {
            name: contentCacheName,
            maxEntries: maxEntries
        }
    });

    self.addEventListener("install", function(event) {
        return event.waitUntil(self.skipWaiting())
    });
    self.addEventListener("activate", function(event) {
        return event.waitUntil(self.clients.claim())
    })
}
)();
