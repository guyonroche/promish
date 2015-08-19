'use strict';
var expect = require('chai').expect
var Promish = require('../lib/promish');
var Bluebird = require('bluebird');

var helpersh = require('./helpersh');
var EReshult = helpersh.EReshult;
var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('Bluebird', function () {
    describe('resolve', function () {
      it("should resolve with Bluebird's resolve value", function () {
        return new Promise(function(resolve, reject) {
          new Promish(Bluebird.resolve(8))
            .then(function(value) {
              expect(value).to.equal(8);
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });
    });
    
    describe('reject', function () {
      it("should reject with Bluebird's reject value", function () {
        return new Promise(function(resolve, reject) {
          new Promish(Bluebird.reject(9))
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