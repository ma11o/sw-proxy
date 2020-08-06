(function () {
  "use strict";

  /**
   * Module used to easily setup AppAuthJS in a way that allows it to transparently obtain and renew access tokens
   * @module AuthHelper
   */
  module.exports = {

    init: function (config) {

      this.AppConfig = {};
      this.AppConfig.serviceWorkerUri = 'ServiceWorker.js';
      this.AppConfig.endpoints = {
        "authorization_endpoint": config.authorizationEndpoint,
        "token_endpoint": config.tokenEndpoint
      };

      this.identityProxyMessageChannel = new MessageChannel();
      this.register();
    },

    register: function () {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(this.AppConfig.serviceWorkerUri).then((function (reg) {
          if (reg.installing) {
            console.log('Service worker installing');
          } else if (reg.waiting) {
            console.log('Service worker installed');
          } else if (reg.active) {
            console.log('Service worker active');
          }

          var sendConfigMessage = (function () {
            reg.active.postMessage({
                "message": "configuration",
                "endpoints": this.AppConfig.endpoints
            }, [this.identityProxyMessageChannel.port2]);
          }).bind(this);

          navigator.serviceWorker.ready.then(sendConfigMessage);
        }).bind(this))
        .catch((function (error) {
          console.log('Registration failed with ' + error);
        }).bind(this));
      }
    }
  }

}());
