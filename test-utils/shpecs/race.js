'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise) {

  describe('race', function () {
    it('all resolve', function () {
      return new Promise(function(resolve, reject) {
        CPromise.race([
          helpersh.delay(10, null, 1),
          helpersh.delay(5, null, 2),
        ])
          .then(function(value) {
            expect(value).to.equal(2);
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('fail first', function () {
      return new Promise(function(resolve, reject) {
        CPromise.race([
          helpersh.delay(10, null, 1),
          helpersh.delay(5, new Error('Fie'), 2),
        ])
          .then(Unexpected.then(resolve, reject))
          .catch(function(error) {
            expect(error.message).to.equal('Fie');
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('fail last', function () {
      return new Promise(function(resolve, reject) {
        CPromise.race([
          helpersh.delay(10, new Error('Fei'), 1),
          helpersh.delay(5, null, 2),
        ])
          .then(function(value) {
            expect(value).to.equal(2);
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
  });

};