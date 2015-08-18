'use strict';
var expect = require('chai').expect
var Promish = require('../lib/promish');
var Q = require('q');

var helpersh = require('./helpersh');
var EReshult = helpersh.EReshult;
var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('Q', function () {
    describe('resolve', function () {
      it('should resolve with Q value', function () {
        return new Promise(function(resolve, reject) {
          new Promish(Q(6))
            .then(function(value) {
              expect(value).to.equal(6);
              resolve();
            })
        });
      });
      it("should resolve with Q's resolve value", function () {
        return new Promise(function(resolve, reject) {
          new Promish(Q.resolve(8))
            .then(function(value) {
              expect(value).to.equal(8);
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });
    });
    
    describe('reject', function () {
      it("should reject with Q's rejectvalue", function () {
        return new Promise(function(resolve, reject) {
          new Promish(Q.reject(9))
            .then(Unexpected.then(resolve, reject))
            .catch(function(error) {
              expect(error).to.equal(9);
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });
    });
  });
});