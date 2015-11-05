'use strict';
var expect = require('chai').expect;
var Promish = require('../lib/promish');

var helpersh = require('../test-utils/helpersh');
var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('constructor', function () {

    it('should resolve with value', function () {
      return new Promise(function(resolve, reject) {
        var promish = new Promish(function(res) {
            res(7);
          })
          .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'))
          .then(function(value) {
            expect(value).to.equal(7);
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        
        expect(promish).to.be.instanceOf(Promish);
      });
    });
    
    it('should resolve immediately if given value', function () {
      return new Promise(function(resolve, reject) {
        new Promish(7)
          .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'))
          .then(function(value) {
            expect(value).to.equal(7);
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
      });
    });

    it('should reject immediately if given error', function () {
      return new Promise(function(resolve, reject) {
        new Promish(new Error('tada'))
          .then(Unexpected.then(resolve, reject))
          .catch(function(error) {
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.equal('tada');
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
      });
    });
  });
});