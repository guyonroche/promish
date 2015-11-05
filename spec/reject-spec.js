'use strict';
var expect = require('chai').expect;
var Promish = require('../lib/promish');

var helpersh = require('../test-utils/helpersh');
var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('reject', function () {
    it('should have the correct type', function() {
      var promish = Promish.reject('fail!');
      expect(promish).to.be.instanceOf(Promish);
    });
    it('should call the onRejected handler with the errorvalue', function () {
      return new Promise(function(resolve, reject) {
        Promish.reject('fail')
          .then(Unexpected.then(resolve, reject))
          .catch(function(value) {
            expect(value).to.equal('fail');
            resolve();
          });
      });
    });
  });
});