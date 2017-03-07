'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise) {

  describe('map', function () {
    it('should map values', function() {
      return new Promise(function(resolve, reject) {
        CPromise.resolve([1,2,3])
          .map(function(a) { return a * 2; })
          .spread(function(a,b,c) {
            expect(a).to.equal(2);
            expect(b).to.equal(4);
            expect(c).to.equal(6);
            resolve();
          })
          .catch(reject);
      });
    });
    it('should map promises', function() {
      return new Promise(function(resolve, reject) {
        CPromise.resolve([CPromise.resolve(1),CPromise.resolve(2),CPromise.resolve(3)])
          .map(function(a) { return a * 2; })
          .spread(function(a,b,c) {
            expect(a).to.equal(2);
            expect(b).to.equal(4);
            expect(c).to.equal(6);
            resolve();
          })
          .catch(reject);
      });
    });
  });

};