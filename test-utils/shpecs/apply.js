'use strict';

'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise, name) {

  describe(name, function() {
    describe('nfapply', function () {
      describe('call sync', function () {
        describe('1 argument', function () {
          it('resolve path', function () {
            return helpersh.spec.apply.Sync.One.Resolve(CPromise);
          });
          it('reject path', function () {
            return helpersh.spec.apply.Sync.One.Reject(CPromise);
          });
        });
        describe('2 arguments', function () {
          it('resolve path', function () {
            return helpersh.spec.apply.Sync.Two.Resolve(CPromise);
          });
          it('reject path', function () {
            return helpersh.spec.apply.Sync.Two.Reject(CPromise);
          });
        });
      });
      describe('call async', function () {
        describe('1 argument', function () {
          it('resolve path', function () {
            return helpersh.spec.apply.Async.One.Resolve(CPromise);
          });
          it('reject path', function () {
            return helpersh.spec.apply.Async.One.Reject(CPromise);
          });
        });
        describe('2 arguments', function () {
          it('resolve path', function () {
            return helpersh.spec.apply.Async.Two.Resolve(CPromise);
          });
          it('reject path', function () {
            return helpersh.spec.apply.Async.Two.Reject(CPromise);
          });
        });
      });
    });
  });
  
};