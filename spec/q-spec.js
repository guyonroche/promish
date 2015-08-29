'use strict';
var expect = require('chai').expect
var Promish = require('../lib/promish');
var Q = require('q');

var HrStopwatch = require('./hr-stopwatch');
var helpersh = require('./helpersh');
var EReshult = helpersh.EReshult;
var Unexpected = helpersh.handlersh.unexpected;

// Check Promishes work with Q promises
describe('Promish', function() {
  describe('Q', function () {
    describe('resolve', function () {
      it('should resolve with Q value', function () {
        return new Promise(function(resolve, reject) {
          new Promish(Q(6))
            .then(function(value) {
              expect(value).to.equal(6);
              resolve();
            })
        });
      });
      it("should resolve with Q's resolve value", function () {
        return new Promise(function(resolve, reject) {
          new Promish(Q.resolve(8))
            .then(function(value) {
              expect(value).to.equal(8);
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });
    });
    
    describe('reject', function () {
      it("should reject with Q's rejectvalue", function () {
        return new Promise(function(resolve, reject) {
          new Promish(Q.reject(9))
            .then(Unexpected.then(resolve, reject))
            .catch(function(error) {
              expect(error).to.equal(9);
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });
    });
  });
});

// Run the same tests on Q to check Interchangeability
describe('Q', function() {
  describe('delay', function () {
    it('should delay 50ms and forward the correct value', function () {
      return new Promise(function(resolve, reject) {
        var stopwatch = new HrStopwatch();
        Q.when(5)
          .then(function(value) {
            stopwatch.start();
            return value;
          })
          .delay(50)
          .then(function(value) {
            stopwatch.stop();
            expect(stopwatch.ms).to.be.above(40);
            expect(stopwatch.ms).to.be.below(60);
            expect(value).to.equal(5);
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });

    it('should not delay 50ms if the promise is rejected', function () {
      return new Promise(function(resolve, reject) {
        var stopwatch = new HrStopwatch();
        Q.when(new Error('Pththt!'))
          .then(function(value) {
            stopwatch.start();
            throw value;
          })
          .then(Unexpected.then(resolve, reject))
          .delay(50)
          .then(Unexpected.then(resolve, reject))
          .catch(function(error) {
            stopwatch.stop();
            expect(stopwatch.ms).to.be.below(10);
            expect(error.message).to.equal('Pththt!');
            resolve();
          });
      });
    });
  });

  describe('nfapply', function () {
    describe('call sync', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.spec.apply.Sync.One.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.spec.apply.Sync.One.Reject(Q);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.spec.apply.Sync.Two.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.spec.apply.Sync.Two.Reject(Q);
        });
      });
    });
    describe('call async', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.spec.apply.Async.One.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.spec.apply.Async.One.Reject(Q);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.spec.apply.Async.Two.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.spec.apply.Async.Two.Reject(Q);
        });
      });
    });
  });

  describe('nfcall', function () {
    describe('call sync', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.spec.call.Sync.One.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.spec.call.Sync.One.Reject(Q);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.spec.call.Sync.Two.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.spec.call.Sync.Two.Reject(Q);
        });
      });
    });
    describe('call async', function () {
      describe('1 argument', function () {
        it("resolve path", function () {
          return helpersh.spec.call.Async.One.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.spec.call.Async.One.Reject(Q);
        });
      });
      describe('2 arguments', function () {
        it("resolve path", function () {
          return helpersh.spec.call.Async.Two.Resolve(Q);
        });
        it("reject path", function () {
          return helpersh.spec.call.Async.Two.Reject(Q);
        });
      });
    });
  });
});
