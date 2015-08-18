'use strict';
var expect = require('chai').expect
var Promish = require('../lib/promish');

var helpersh = require('./helpersh');
var EReshult = helpersh.EReshult;
var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('defer', function () {
    describe('immediate', function () {
      it('should resolve on defer.resolve', function () {
        return new Promise(function(resolve, reject) {
          helpersh.defer(EReshult.RESOLVE, 'Hello, World!')
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'))
            .then(function(value) {
              expect(value).to.equal('Hello, World!');
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });
      
      it('should call the onRejected handler with the error', function () {
        return new Promise(function(resolve, reject) {
          helpersh.defer(EReshult.REJECT, new Error('Goodbye, Cruel World!'))
            .then(Unexpected.then(resolve, reject))
            .catch(function(error) {
              // this should not be called
              expect(error).to.be.an.instanceof(Error);
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });
    });
    describe('delayed', function () {
      it('should resolve on defer.resolve', function () {
        return new Promise(function(resolve, reject) {
          helpersh.defer(EReshult.RESOLVE, 'Hello, World!', 10)
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'))
            .then(function(value) {
              expect(value).to.equal('Hello, World!');
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });
      
      it('should call the onRejected handler with the error', function () {
        return new Promise(function(resolve, reject) {
          helpersh.defer(EReshult.REJECT, new Error('Goodbye, Cruel World!'), 10)
            .then(Unexpected.then(resolve, reject))
            .catch(function(error) {
              // this should not be called
              expect(error).to.be.an.instanceof(Error);
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });
    });
  });
});