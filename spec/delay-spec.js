'use strict';
var expect = require('chai').expect;

var HrStopwatch = require('../test-utils/hr-stopwatch');
var helpersh = require('../test-utils/helpersh');
var EReshult = helpersh.EReshult;
var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('delay', function () {
    it('should delay 50ms and forward the correct value', function () {
      return new Promise(function(resolve, reject) {
        var stopwatch = new HrStopwatch();
        helpersh.paushe(EReshult.RESOLVE, 5)
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
        helpersh.paushe(EReshult.RESOLVE, new Error('Pththt!'))
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
});
