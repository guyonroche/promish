'use strict';

var Prm = require('../lib/promish');

Prm.resolve(5)
  .finally(function() {
    return Prm.resolve(1)
      .delay(1000)
      .then(function(value) {
        console.log('last part of finally', value);
        return Prm.resolve(value);
      });
  })
  .then(function(value) {
    console.log('Final Then: ', value);
  })
  .catch(function(error) {
    console.log('Final Catch:', error);
  });