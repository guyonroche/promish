'use strict';
var Promish = require('../lib/promish');
var helpersh = require('./helpersh');

describe('Promish', function() {
  describe('nfcall', function () {
    describe('call sync', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.nfCall.Sync.One.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.nfCall.Sync.One.Reject(Promish);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.nfCall.Sync.Two.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.nfCall.Sync.Two.Reject(Promish);
        });
      });
    });
    describe('call async', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.nfCall.Async.One.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.nfCall.Async.One.Reject(Promish);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.nfCall.Async.Two.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.nfCall.Async.Two.Reject(Promish);
        });
      });
    });
  });
});