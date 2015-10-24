'use strict';
var Promish = require('../lib/promish');

var helpersh = require('../test-utils/helpersh');

describe('Promish', function() {
  describe('nfapply', function () {
    describe('call sync', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.spec.apply.Sync.One.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.spec.apply.Sync.One.Reject(Promish);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.spec.apply.Sync.Two.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.spec.apply.Sync.Two.Reject(Promish);
        });
      });
    });
    describe('call async', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.spec.apply.Async.One.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.spec.apply.Async.One.Reject(Promish);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.spec.apply.Async.Two.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.spec.apply.Async.Two.Reject(Promish);
        });
      });
    });
  });
});