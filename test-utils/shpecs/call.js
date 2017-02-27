'use strict';

'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise, name) {

  describe(name, function() {
    describe('nfcall', function () {
      describe('call sync', function () {
        describe('1 argument', function () {
          it('resolve path', function () {
            return helpersh.spec.call.Sync.One.Resolve(CPromise);
          });
          it('reject path', function () {
            return helpersh.spec.call.Sync.One.Reject(CPromise);
          });
        });
        describe('2 arguments', function () {
          it('resolve path', function () {
            return helpersh.spec.call.Sync.Two.Resolve(CPromise);
          });
          it('reject path', function () {
            return helpersh.spec.call.Sync.Two.Reject(CPromise);
          });
        });
      });
      describe('call async', function () {
        describe('1 argument', function () {
          it('resolve path', function () {
            return helpersh.spec.call.Async.One.Resolve(CPromise);
          });
          it('reject path', function () {
            return helpersh.spec.call.Async.One.Reject(CPromise);
          });
        });
        describe('2 arguments', function () {
          it('resolve path', function () {
            return helpersh.spec.call.Async.Two.Resolve(CPromise);
          });
          it('reject path', function () {
            return helpersh.spec.call.Async.Two.Reject(CPromise);
          });
        });
      });
    });
  });
  
};