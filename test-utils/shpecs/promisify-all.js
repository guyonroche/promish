'use strict';

'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise, name) {

  describe(name, function() {
    describe('promisifyAll', function () {
      describe('in-place', function () {
        describe('fs', function () {
          describe('readFile', function () {
            it('resolve', function () {
              return helpersh.spec.promisifyAll.fs.readFile.resolve(CPromise, {inPlace: true});
            });
            it('reject', function () {
              return helpersh.spec.promisifyAll.fs.readFile.reject(CPromise, {inPlace: true});
            });
          });
        });

        describe('class instance', function() {
          describe('class A', function() {
            describe('method a', function() {
              it('resolve', function() {
                return helpersh.spec.promisifyAll.classes.A.a.resolve(CPromise, {inPlace: true});
              });
              it('reject', function() {
                return helpersh.spec.promisifyAll.classes.A.a.reject(CPromise, {inPlace: true});
              });
            });
          });
          describe('class B', function() {
            describe('method a', function() {
              it('resolve', function() {
                return helpersh.spec.promisifyAll.classes.B.a.resolve(CPromise, {inPlace: true});
              });
              it('reject', function() {
                return helpersh.spec.promisifyAll.classes.B.a.reject(CPromise, {inPlace: true});
              });
            });
            describe('method b', function() {
              it('resolve', function() {
                return helpersh.spec.promisifyAll.classes.B.b.resolve(CPromise, {inPlace: true});
              });
              it('reject', function() {
                return helpersh.spec.promisifyAll.classes.B.b.reject(CPromise, {inPlace: true});
              });
            });
          });
          describe('class BB', function() {
            describe('method b', function() {
              it('resolve', function() {
                return helpersh.spec.promisifyAll.classes.BB.b.resolve(CPromise, {inPlace: true});
              });
              it('reject', function() {
                return helpersh.spec.promisifyAll.classes.BB.b.reject(CPromise, {inPlace: true});
              });
            });
          });
        });
      });
      describe('proxy', function () {
        describe('fs', function () {
          describe('readFile', function () {
            it('resolve', function () {
              return helpersh.spec.promisifyAll.fs.readFile.resolve(CPromise, {suffix: 'Async'});
            });
            it('reject', function () {
              return helpersh.spec.promisifyAll.fs.readFile.reject(CPromise, {suffix: 'Async'});
            });
          });
        });

        describe('class instance', function() {
          describe('class A', function() {
            describe('method a', function() {
              it('resolve', function() {
                return helpersh.spec.promisifyAll.classes.A.a.resolve(CPromise, {suffix: 'Async'});
              });
              it('reject', function() {
                return helpersh.spec.promisifyAll.classes.A.a.reject(CPromise, {suffix: 'Async'});
              });
            });
          });
          describe('class B', function() {
            describe('method a', function() {
              it('resolve', function() {
                return helpersh.spec.promisifyAll.classes.B.a.resolve(CPromise, {suffix: 'Async'});
              });
              it('reject', function() {
                return helpersh.spec.promisifyAll.classes.B.a.reject(CPromise, {suffix: 'Async'});
              });
            });
            describe('method b', function() {
              it('resolve', function() {
                return helpersh.spec.promisifyAll.classes.B.b.resolve(CPromise, {suffix: 'Async'});
              });
              it('reject', function() {
                return helpersh.spec.promisifyAll.classes.B.b.reject(CPromise, {suffix: 'Async'});
              });
            });
          });
          describe('class BB', function() {
            describe('method b', function() {
              it('resolve', function() {
                return helpersh.spec.promisifyAll.classes.BB.b.resolve(CPromise, {suffix: 'Async'});
              });
              it('reject', function() {
                return helpersh.spec.promisifyAll.classes.BB.b.reject(CPromise, {suffix: 'Async'});
              });
            });
          });
        });
      });
    });
  });

};