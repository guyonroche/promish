'use strict';
var util = require('util');
var expect = require('chai').expect

var Promish = require('../lib/promish');
var helpersh = require('./helpersh');
var Unexpected = helpersh.handlersh.unexpected;

var fsp = Promish.promisifyAll(require('fs'));

var A = function() {};
A.prototype.a = function(x, callback) {
  setTimeout(function() {
    if (x) {
      callback(null, x);
    } else {
      callback(new Error('Fail'));
    }
  }, 10);
};

var B = function(y) {
  this.y = y;
};
util.inherits(B, A);
B.prototype.b = function(callback) {
  setTimeout(function() {
    if (this.y) {
      callback(null, this.y);
    } else {
      callback(new Error('Fail'));
    }
  }.bind(this), 10);
};


describe('Promish', function() {
  describe('promisifyAll', function () {
    describe('fs', function () {
      it("reads a file", function () {
        return new Promise(function(resolve, reject) {
          fsp.readFile('spec/promisify-all-spec.js')
            .then(function(data) {
              var contents = data.toString();
              expect(contents).to.contain('"reads a file"');
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });
      it("rejects for a non-existant file", function () {
        return new Promise(function(resolve, reject) {
          fsp.readFile('tpeirjgpeoijrgpcesij')
            .then(Unexpected.then(resolve, reject))
            .catch(function(error) {
              expect(error.code).to.equal('ENOENT');
              resolve();
            });
        });
      });
    });
    
    describe('class instance', function() {
      describe('method a of A', function() {
        it('resolve path', function() {
          return new Promise(function(resolve, reject) {
            var ap = Promish.promisifyAll(new A());
            ap.a(5)
              .then(function(value) {
                expect(value).to.equal(5);
                resolve();
              })
              .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
          });
        });
        it('reject path', function() {
          return new Promise(function(resolve, reject) {
            var ap = Promish.promisifyAll(new A());
            ap.a(0)
              .then(Unexpected.then(resolve, reject))
              .catch(function(error) {
                expect(error.message).to.equal('Fail');
                resolve();
              });
          });
        });
      });
      describe('method a of B', function() {
        it('resolve path', function() {
          return new Promise(function(resolve, reject) {
            var bp = Promish.promisifyAll(new B(7));
            bp.a(5)
              .then(function(value) {
                expect(value).to.equal(5);
                resolve();
              })
              .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
          });
        });
        it('reject path', function() {
          return new Promise(function(resolve, reject) {
            var bp = Promish.promisifyAll(new B(77));
            bp.a(0)
              .then(Unexpected.then(resolve, reject))
              .catch(function(error) {
                expect(error.message).to.equal('Fail');
                resolve();
              });
          });
        });
      });
      describe('method b of B', function() {
        it('resolve path', function() {
          return new Promise(function(resolve, reject) {
            var bp = Promish.promisifyAll(new B(7));
            bp.b()
              .then(function(value) {
                expect(value).to.equal(7);
                resolve();
              })
              .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
          });
        });
        it('reject path', function() {
          return new Promise(function(resolve, reject) {
            var bp = Promish.promisifyAll(new B(0));
            bp.b()
              .then(Unexpected.then(resolve, reject))
              .catch(function(error) {
                expect(error.message).to.equal('Fail');
                resolve();
              });
          });
        });
      });
    });
  });
});