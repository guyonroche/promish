'use strict';
var expect = require('chai').expect
var Q = require('q');

var helpersh = require('./helpersh');

// This spec just to verify that Promish.nfcall works the same as Q
describe('Q', function() {
  describe('nfcall', function () {
    describe('call sync', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.nfCall.Sync.One.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.nfCall.Sync.One.Reject(Q);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.nfCall.Sync.Two.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.nfCall.Sync.Two.Reject(Q);
        });
      });
    });
    describe('call async', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.nfCall.Async.One.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.nfCall.Async.One.Reject(Q);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.nfCall.Async.Two.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.nfCall.Async.Two.Reject(Q);
        });
      });
    });
  });
});