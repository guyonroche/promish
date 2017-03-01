'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise) {

  describe('nfapply', function () {
    describe('call sync', function () {
      describe('1 argument', function () {
        it('resolve path', function () {
          return new Promise(function(resolve, reject) {
            CPromise.nfapply(helpersh.fn.call_1_1_0, [5])
              .then(function(value) {
                expect(value).to.equal(5);
                resolve();
              })
              .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
          });
        });
        it('reject path', function () {
          return new Promise(function(resolve, reject) {
            CPromise.nfapply(helpersh.fn.call_1_1_0, [new Error('Fail')])
              .then(Unexpected.then(resolve, reject))
              .catch(function(error) {
                expect(error.message).to.equal('Fail');
                resolve();
              });
          });
        });
      });
      describe('2 arguments', function () {
        it('resolve path', function () {
          return new Promise(function(resolve, reject) {
            CPromise.nfapply(helpersh.fn.call_2_2_0, [5, 7])
              .spread(function(value1, value2) {
                expect(value1).to.equal(5);
                expect(value2).to.equal(7);
                resolve();
              })
              .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
          });
        });
        it('reject path', function () {
          return new Promise(function(resolve, reject) {
            CPromise.nfapply(helpersh.fn.call_2_2_0, [new Error('Fail'), 6])
              .then(Unexpected.then(resolve, reject))
              .catch(function(error) {
                expect(error.message).to.equal('Fail');
                resolve();
              });
          });
        });
      });
    });
    describe('call async', function () {
      describe('1 argument', function () {
        it('resolve path', function () {
          return new Promise(function(resolve, reject) {
            CPromise.nfapply(helpersh.fn.call_1_1_10, [5])
              .then(function(value) {
                expect(value).to.equal(5);
                resolve();
              })
              .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
          });
        });
        it('reject path', function () {
          return new Promise(function(resolve, reject) {
            CPromise.nfapply(helpersh.fn.call_1_1_10, [new Error('Fail')])
              .then(Unexpected.then(resolve, reject))
              .catch(function(error) {
                expect(error.message).to.equal('Fail');
                resolve();
              });
          });
        });
      });
      describe('2 arguments', function () {
        it('resolve path', function () {
          return new Promise(function(resolve, reject) {
            CPromise.nfapply(helpersh.fn.call_2_2_10, [5, 7])
              .spread(function(value1, value2) {
                expect(value1).to.equal(5);
                expect(value2).to.equal(7);
                resolve();
              })
              .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
          });
        });
        it('reject path', function () {
          return new Promise(function(resolve, reject) {
            CPromise.nfapply(helpersh.fn.call_2_2_10, [new Error('Fail'), 6])
              .then(Unexpected.then(resolve, reject))
              .catch(function(error) {
                expect(error.message).to.equal('Fail');
                resolve();
              });
          });
        });
      });
    });
  });

};