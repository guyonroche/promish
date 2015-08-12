'use strict';
var expect = require('chai').expect
var Promish = require('../lib/promish');

var helpersh = require('./helpersh');
var EReshult = helpersh.EReshult;

describe('Promish', function() {
  describe('then', function () {
    describe('resolve', function () {
      it('should call the onResolved handler with the resolved value', function () {
        return new Promise(function(resolve, reject) {
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
              function(value) {
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
});