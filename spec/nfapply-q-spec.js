'use strict';
var Q = require('q');
var helpersh = require('./helpersh');

// This spec just to verify that Promish.nfapply works the same as Q
describe('Q', function() {
  describe('nfapply', function () {
    describe('call sync', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.nfApply.Sync.One.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.nfApply.Sync.One.Reject(Q);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.nfApply.Sync.Two.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.nfApply.Sync.Two.Reject(Q);
        });
      });
    });
    describe('call async', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.nfApply.Async.One.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.nfApply.Async.One.Reject(Q);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.nfApply.Async.Two.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.nfApply.Async.Two.Reject(Q);
        });
      });
    });
  });
});