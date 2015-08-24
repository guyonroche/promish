'use strict';
var Promish = require('../lib/promish');

var helpersh = require('./helpersh');

describe('Promish', function() {
  describe('nfapply', function () {
    describe('call sync', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.nfApply.Sync.One.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.nfApply.Sync.One.Reject(Promish);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.nfApply.Sync.Two.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.nfApply.Sync.Two.Reject(Promish);
        });
      });
    });
    describe('call async', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.nfApply.Async.One.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.nfApply.Async.One.Reject(Promish);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.nfApply.Async.Two.Resolve(Promish);
        });
        it("reject path", function () {
          return helpersh.nfApply.Async.Two.Reject(Promish);
        });
      });
    });
  });
});