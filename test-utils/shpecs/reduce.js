'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise) {

  describe('reduce', function () {
    it('should reduce values with an initial value', function() {
      return new Promise(function(resolve, reject) {
        CPromise.resolve([1,2,3,4,5])
          .reduce(function(a,b) { return a + b; }, 0)
          .then(function(total) {
            expect(total).to.equal(15);
            resolve();
          })
          .catch(reject);
      });
    });
    it('should reduce values with no initial value', function() {
      return new Promise(function(resolve, reject) {
        CPromise.resolve([1,2,3,4,5])
          .reduce(function(a,b) { return a + b; })
          .then(function(total) {
            expect(total).to.equal(15);
            resolve();
          })
          .catch(reject);
      });
    });
    it('should reduce promises with an initial value', function() {
      return new Promise(function(resolve, reject) {
        CPromise.resolve([CPromise.resolve(1), CPromise.resolve(2), CPromise.resolve(3), CPromise.resolve(4), CPromise.resolve(5),])
          .reduce(function(a,b) { return a + b; }, 0)
          .then(function(total) {
            expect(total).to.equal(15);
            resolve();
          })
          .catch(reject);
      });
    });
    it('should reduce promises with no initial value', function() {
      return new Promise(function(resolve, reject) {
        CPromise.resolve([CPromise.resolve(1), CPromise.resolve(2), CPromise.resolve(3), CPromise.resolve(4), CPromise.resolve(5),])
          .reduce(function(a,b) { return a + b; })
          .then(function(total) {
            expect(total).to.equal(15);
            resolve();
          })
          .catch(reject);
      });
    });
    it('should reduce values with a promising reducer', function() {
      return new Promise(function(resolve, reject) {
        CPromise.resolve([1,2,3,4,5])
          .reduce(function(a,b) { return CPromise.resolve(a + b); }, 0)
          .then(function(total) {
            expect(total).to.equal(15);
            resolve();
          })
          .catch(reject);
      });
    });
  });

};