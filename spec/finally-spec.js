'use strict';
var expect = require('chai').expect
var Promish = require('../lib/promish');

var helpersh = require('../test-utils/helpersh');
var EReshult = helpersh.EReshult;
var Errorsh = helpersh.Errorsh;
var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('finally', function () {
    it("Isn't already in Promise", function() {
      expect(Promise.finally).not.to.be.defined;
    });
    it('should call the onFinally with no value after resolve', function () {
      return new Promise(function(resolve, reject) {
        helpersh.paushe(EReshult.RESOLVE, 5)
          .catch(Unexpected.catch(resolve, reject))
          .finally(function(value) {
            expect(value).not.to.be.defined;
            resolve();
          });
      });
    });

    it('should call the onFinally with no value after reject', function () {
      return new Promise(function(resolve, reject) {
        helpersh.paushe(EReshult.REJECT, 5)
          .finally(function(value) {
            expect(value).not.to.be.defined;
            resolve();
          });
      });
    });
  });
});