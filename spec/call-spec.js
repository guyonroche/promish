'use strict';
var Promish = require('../lib/promish');
var helpersh = require('../test-utils/helpersh');

describe('Promish', function() {
  describe('nfcall', function () {
    describe('call sync', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.spec.call.Sync.One.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.spec.call.Sync.One.Reject(Promish);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.spec.call.Sync.Two.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.spec.call.Sync.Two.Reject(Promish);
        });
      });
    });
    describe('call async', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.spec.call.Async.One.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.spec.call.Async.One.Reject(Promish);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.spec.call.Async.Two.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.spec.call.Async.Two.Reject(Promish);
        });
      });
    });
  });
});