'use strict';
var expect = require('chai').expect;
var Promish = require('../lib/promish-es2015');
var Bluebird = require('bluebird');

var helpersh = require('../test-utils/helpersh');
var Unexpected = helpersh.handlersh.unexpected;

describe.only('ES 2016', function() {
  describe('promisifyAll', function () {
    describe('fs', function () {
      describe('readFile', function () {
        it('resolve', function () {
          return helpersh.spec.promisifyAll.fs.readFile.resolve(Bluebird);
        });
        it('reject', function () {
          return helpersh.spec.promisifyAll.fs.readFile.reject(Bluebird);
        });
      });
    });
    
    describe('class instance', function() {
      describe('class A', function() {
        describe('method a', function() {
          it('resolve', function() {
            return helpersh.spec.promisifyAll.classes.A.a.resolve(Bluebird);
          });
          it('reject', function() {
            return helpersh.spec.promisifyAll.classes.A.a.reject(Bluebird);
          });
        });
      });
      describe('class B', function() {
        describe('method a', function() {
          it('resolve', function() {
            return helpersh.spec.promisifyAll.classes.B.a.resolve(Bluebird);
          });
          it('reject', function() {
              return helpersh.spec.promisifyAll.classes.B.a.reject(Bluebird);
          });
        });
        describe('method b', function() {
          it('resolve', function() {
            return helpersh.spec.promisifyAll.classes.B.b.resolve(Bluebird);
          });
          it('reject', function() {
              return helpersh.spec.promisifyAll.classes.B.b.reject(Bluebird);
          });
        });
      });
      describe('class BB', function() {
        describe('method b', function() {
          it('resolve', function() {
            return helpersh.spec.promisifyAll.classes.BB.b.resolve(Bluebird);
          });
          it('reject', function() {
              return helpersh.spec.promisifyAll.classes.BB.b.reject(Bluebird);
          });
        });
      });
    });
  });  
});