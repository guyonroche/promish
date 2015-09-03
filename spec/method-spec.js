'use strict';
var expect = require('chai').expect
var Promish = require('../lib/promish');

var helpersh = require('./helpersh');
var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('method', function () {
    it('return value', function () {
      return new Promise(function(resolve, reject) {
        var f = Promish.method(function(value) {
          return value * 2;
        });
        f(7).then(function(value) {
            expect(value).to.equal(14);
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('return promish', function () {
      return new Promise(function(resolve, reject) {
        var f = Promish.method(function(value) {
          return Promish.resolve(value * 2);
        });
        f(7).then(function(value) {
            expect(value).to.equal(14);
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('throw error', function () {
      return new Promise(function(resolve, reject) {
        var f = Promish.method(function(value) {
          throw (value * 2);
        });
        f(3).then(Unexpected.then(resolve, reject))
          .catch(function(value) {
            expect(value).to.equal(6);
            resolve();
          });
      });
    });
    
    it('return this.value', function () {
      return new Promise(function(resolve, reject) {
        var A = function(value) { this.value = value; };
        A.prototype.f = Promish.method(function(value) {
          return this.value * 2;
        });
        var a = new A(6);
        a.f().then(function(value) {
            expect(value).to.equal(12);
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
  });
});