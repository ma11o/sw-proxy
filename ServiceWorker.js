"use strict";(function(){function b(d,e,g){function a(j,i){if(!e[j]){if(!d[j]){var f="function"==typeof require&&require;if(!i&&f)return f(j,!0);if(h)return h(j,!0);var c=new Error("Cannot find module '"+j+"'");throw c.code="MODULE_NOT_FOUND",c}var k=e[j]={exports:{}};d[j][0].call(k.exports,function(b){var c=d[j][1][b];return a(c||b)},k,k.exports,b,d,e,g)}return e[j].exports}for(var h="function"==typeof require&&require,c=0;c<g.length;c++)a(g[c]);return a}return b})()({1:[function(){(function(){"use strict";self.addEventListener("install",function(a){a.waitUntil(self.skipWaiting())}),self.addEventListener("activate",function(a){a.waitUntil(self.clients.claim())}),self.addEventListener("fetch",function(a){console.log("fetch",self.endpoints),self.endpoints.authorization_endpoint&&self.endpoints.token_endpoint&&a.request.url.match(self.endpoints.authorization_endpoint)&&(console.log("respond with"),a.respondWith(new Promise(function(){return fetch(self.endpoints.token_endpoint).then(function(a){return a})})))}),self.addEventListener("message",function(a){"configuration"===a.data.message&&(self.endpoints=a.data.endpoints,console.log("configured",self.endpoints),a.waitUntil(self.clients.claim().then(function(){return a.ports[0].postMessage({message:"configured"})})))})})()},{}]},{},[1]);