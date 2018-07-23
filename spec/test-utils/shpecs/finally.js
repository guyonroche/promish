'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;
var EReshult = helpersh.EReshult;

module.exports = function(CPromise) {

  describe('finally', function () {
    it(`Isn't already in Promise`, function() {
      expect(Promise.finally).to.be.undefined;
    });

    describe('incoming resolve', function() {
      it('should call the onFinally with no value after resolve', function () {
        return new Promise(function(resolve, reject) {
          helpersh.paushe(EReshult.RESOLVE, 5)
            .catch(Unexpected.catch(resolve, reject))
            .finally(function(value) {
              expect(value).to.be.undefined;
              resolve();
            });
        });
      });

      it('should pass on values', function () {
        return new Promise(function(resolve) {
          helpersh.paushe(EReshult.RESOLVE, 7)
            .finally(() => 5)
            .then(function(value) {
              expect(value).to.equal(7);
              resolve();
            });
        });
      });

      it('should take on new rejection', function() {
        return new Promise(function(resolve, reject) {
          helpersh.paushe(EReshult.RESOLVE, 5)
            .finally(() => helpersh.paushe(EReshult.REJECT, 8))
            .then(Unexpected.then(resolve, reject))
            .catch(function(error) {
              expect(error).to.equal(8);
              resolve();
            });
        });
      });
    });

    describe('incoming reject', function() {
      it('should call the onFinally with no value after reject', function () {
        return new Promise(function(resolve) {
          helpersh.paushe(EReshult.REJECT, 5)
            .finally(function(value) {
              expect(value).to.be.undefined;
              resolve();
            })
            .catch(() => {});
        });
      });

      it('should not swallow rejection', function () {
        return new Promise(function(resolve, reject) {
          helpersh.paushe(EReshult.REJECT, 5)
            .finally(() => 7)
            .then(Unexpected.then(resolve, reject))
            .catch(function(error) {
              expect(error).to.equal(5);
              resolve();
            });
        });
      });

      it('should replace with new rejection', function() {
        return new Promise(function(resolve, reject) {
          helpersh.paushe(EReshult.REJECT, 5)
            .finally(() => helpersh.paushe(EReshult.REJECT, 8))
            .then(Unexpected.then(resolve, reject))
            .catch(function(error) {
              expect(error).to.equal(8);
              resolve();
            });
        });
      });
    });
  });

};