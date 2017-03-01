'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise) {

  describe('reject', function () {
    it('should call the onRejected handler with the errorvalue', function () {
      return new Promise(function(resolve, reject) {
        CPromise.reject('fail')
          .then(Unexpected.then(resolve, reject))
          .catch(function(value) {
            expect(value).to.equal('fail');
            resolve();
          });
      });
    });
  });

};