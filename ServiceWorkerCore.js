(function () {
  "use strict";

  self.addEventListener("install", (event) => {
    event.waitUntil(self.skipWaiting());
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener('fetch', function (event) {
    console.log('fetch', self.endpoints);

    if (self.endpoints.authorization_endpoint && self.endpoints.token_endpoint && event.request.url.match(self.endpoints.authorization_endpoint)) {
      console.log('respond with');

      event.respondWith(new Promise((resolve, reject) => {
        return fetch(self.endpoints.token_endpoint)
          .then(function (response) {
            return response;
          });
      }))
    }
  })

  self.addEventListener("message", (event) => {
    if (event.data.message === "configuration") {

      self.endpoints = event.data.endpoints;
      console.log('configured', self.endpoints);

      event.waitUntil(self.clients.claim().then(() =>
        event.ports[0].postMessage({
          "message": "configured"
        })
      ));
    }
  });

}());
