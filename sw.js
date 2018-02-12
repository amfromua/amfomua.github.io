'use strict';

importScripts('sw-toolbox.js');

toolbox.precache(["index.html","/dist/build.js"]);

toolbox.router.get('/images/*', toolbox.cacheFirst);

toolbox.router.get('/*', toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});
