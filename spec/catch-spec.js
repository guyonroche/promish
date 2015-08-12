'use strict';
var expect = require('chai').expect
var Promish = require('../lib/promish');

var helpersh = require('./helpersh');
var EReshult = helpersh.EReshult;
var Errorsh = helpersh.Errorsh;
var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('catch', function () {
    it('should call the onCatch handler with the reject value', function () {
      return new Promise(function(resolve, reject) {
        helpersh.paushe(EReshult.REJECT, 5)
          .then(Unexpected.then(resolve, reject))
          .catch(function(error) {
            expect(error).to.equal(5);
            resolve();
          });
      });
    });
    
    it('should call type-specific catch (only)', function() {
      return new Promise(function(resolve, reject) {
        helpersh.paushe(EReshult.REJECT, new Errorsh.MyError('Hello', 'World'))
          .then(Unexpected.then(resolve, reject))
          .catch(Errorsh.MyError, function(error) {
            expect(error).to.be.an.instanceof(Errorsh.MyError);
            expect(error.data).to.be.defined;
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    
    it('should call correct type-specific catch (only)', function() {
      return new Promise(function(resolve, reject) {
        helpersh.paushe(EReshult.REJECT, new Errorsh.MyErrorB('Hello', 'World'))
          .then(Unexpected.then(resolve, reject))
          .catch(Errorsh.MyErrorA, Unexpected.catch(resolve, reject, 'Did not expect to catch MyErrorB in MyErrorA handler'))
          .catch(Errorsh.MyErrorB, function(error) {
            expect(error).to.be.an.instanceof(Errorsh.MyErrorB);
            expect(error.data).to.be.defined;
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error which should have been handled earlier'));
      });
    });
    
    it('should cope with rejection values that are not errors', function() {
      return new Promise(function(resolve, reject) {
        helpersh.paushe(EReshult.REJECT, 'Pthththt!')
          .then(Unexpected.then(resolve, reject))
          .catch(Errorsh.MyError, Unexpected.catch(resolve, reject, 'Did not expect to catch Non-Error in MyError handler'))
          .catch(function(error) {
            expect(error).to.equal('Pthththt!');
            resolve();
          });
      });
    });
  });
});