'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;
var EReshult = helpersh.EReshult;

module.exports = function(CPromise) {

  describe('then', function () {
    describe('resolve', function () {
      it('should call the onResolved handler with the resolved value', function () {
        return new Promise(function(resolve) {
          helpersh.paushe(EReshult.RESOLVE, 'Hello, World!')
            .then(function(value) {
              expect(value).to.equal('Hello, World!');
              resolve();
            });
        });
      });
    });

    describe('reject', function () {
      it('should call the onRejected handler with the error', function () {
        return new Promise(function(resolve, reject) {
          helpersh.paushe(EReshult.REJECT, new Error('Goodbye, Cruel World!'))
            .then(
              function() {
                reject(new Error('onResolve called when onReject expected'));
              },
              function(error) {
                expect(error.message).to.equal('Goodbye, Cruel World!');
                resolve();
              }
            )
            .catch(function(error) {
              // this should not be called
              expect(error).to.be(undefined);
              reject(error.message);
            });
        });
      });
    });
  });

};