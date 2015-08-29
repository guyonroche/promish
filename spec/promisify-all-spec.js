'use strict';
var util = require('util');
var expect = require('chai').expect

var Promish = require('../lib/promish');
var helpersh = require('./helpersh');
var Unexpected = helpersh.handlersh.unexpected;

var fsp = Promish.promisifyAll(require('fs'));


describe('Promish', function() {
  describe('promisifyAll', function () {
    describe('in-place', function () {
      describe('fs', function () {
        describe('readFile', function () {
          it("resolve", function () {
            return helpersh.spec.promisifyAll.fs.readFile.resolve(Promish, {inPlace: true});
          });
          it("reject", function () {
            return helpersh.spec.promisifyAll.fs.readFile.reject(Promish, {inPlace: true});
          });
        });
      });
      
      describe('class instance', function() {
        describe('class A', function() {
          describe('method a', function() {
            it('resolve', function() {
              return helpersh.spec.promisifyAll.classes.A.a.resolve(Promish, {inPlace: true});
            });
            it('reject', function() {
              return helpersh.spec.promisifyAll.classes.A.a.reject(Promish, {inPlace: true});
            });
          });
        });
        describe('class B', function() {
          describe('method a', function() {
            it('resolve', function() {
              return helpersh.spec.promisifyAll.classes.B.a.resolve(Promish, {inPlace: true});
            });
            it('reject', function() {
                return helpersh.spec.promisifyAll.classes.B.a.reject(Promish, {inPlace: true});
            });
          });
          describe('method b', function() {
            it('resolve', function() {
              return helpersh.spec.promisifyAll.classes.B.b.resolve(Promish, {inPlace: true});
            });
            it('reject', function() {
                return helpersh.spec.promisifyAll.classes.B.b.reject(Promish, {inPlace: true});
            });
          });
        });
        describe('class BB', function() {
          describe('method b', function() {
            it('resolve', function() {
              return helpersh.spec.promisifyAll.classes.BB.b.resolve(Promish, {inPlace: true});
            });
            it('reject', function() {
                return helpersh.spec.promisifyAll.classes.BB.b.reject(Promish, {inPlace: true});
            });
          });
        });
      });
    });
    describe('proxy', function () {
      describe('fs', function () {
        describe('readFile', function () {
          it("resolve", function () {
            return helpersh.spec.promisifyAll.fs.readFile.resolve(Promish, {suffix: 'Async'});
          });
          it("reject", function () {
            return helpersh.spec.promisifyAll.fs.readFile.reject(Promish, {suffix: 'Async'});
          });
        });
      });
      
      describe('class instance', function() {
        describe('class A', function() {
          describe('method a', function() {
            it('resolve', function() {
              return helpersh.spec.promisifyAll.classes.A.a.resolve(Promish, {suffix: 'Async'});
            });
            it('reject', function() {
              return helpersh.spec.promisifyAll.classes.A.a.reject(Promish, {suffix: 'Async'});
            });
          });
        });
        describe('class B', function() {
          describe('method a', function() {
            it('resolve', function() {
              return helpersh.spec.promisifyAll.classes.B.a.resolve(Promish, {suffix: 'Async'});
            });
            it('reject', function() {
                return helpersh.spec.promisifyAll.classes.B.a.reject(Promish, {suffix: 'Async'});
            });
          });
          describe('method b', function() {
            it('resolve', function() {
              return helpersh.spec.promisifyAll.classes.B.b.resolve(Promish, {suffix: 'Async'});
            });
            it('reject', function() {
                return helpersh.spec.promisifyAll.classes.B.b.reject(Promish, {suffix: 'Async'});
            });
          });
        });
        describe('class BB', function() {
          describe('method b', function() {
            it('resolve', function() {
              return helpersh.spec.promisifyAll.classes.BB.b.resolve(Promish, {suffix: 'Async'});
            });
            it('reject', function() {
                return helpersh.spec.promisifyAll.classes.BB.b.reject(Promish, {suffix: 'Async'});
            });
          });
        });
      });
    });
  });
});