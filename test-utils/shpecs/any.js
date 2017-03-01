'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise) {

  describe('any', function () {
    it('all resolve', function () {
      return new Promise(function(resolve, reject) {
        CPromise.any([
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
    it('one resolve', function () {
      return new Promise(function(resolve, reject) {
        CPromise.any([
          helpersh.delay(10, null, 1),
          helpersh.delay(5, new Error('Fie'), 2),
        ])
          .then(function(value) {
            expect(value).to.equal(1);
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('none resolve', function () {
      return new Promise(function(resolve, reject) {
        CPromise.any([
          helpersh.delay(10, new Error('Fei'), 1),
          helpersh.delay(5, new Error('Fie'), 2),
        ])
          .then(Unexpected.then(resolve, reject))
          .catch(function(errors) {
            if (Array.isArray(errors)) {
              expect(errors.length).to.equal(2);
              expect(errors[0].message).to.equal('Fie');
              expect(errors[1].message).to.equal('Fei');
            }
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
  });

};