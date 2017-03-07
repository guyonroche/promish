'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise) {

  describe('resolve', function () {
    it('should call the onResolved handler with the resolved value', function () {
      return new Promise(function(resolve, reject) {
        CPromise.resolve('Hello, World!')
          .then(function(value) {
            expect(value).to.equal('Hello, World!');
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
  });

};