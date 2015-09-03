'use strict';
var expect = require('chai').expect
var Promish = require('../lib/promish');

var helpersh = require('./helpersh');
var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('resolve', function () {
    it('should call the onResolved handler with the resolved value', function () {
      return new Promise(function(resolve, reject) {
        Promish.resolve('Hello, World!')
          .then(function(value) {
            expect(value).to.equal('Hello, World!');
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
  });
});