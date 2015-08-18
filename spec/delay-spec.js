'use strict';
var expect = require('chai').expect
var Promish = require('../lib/promish');

var HrStopwatch = require('./hr-stopwatch');
var helpersh = require('./helpersh');
var EReshult = helpersh.EReshult;
var Errorsh = helpersh.Errorsh;
var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('delay', function () {
    it('should delay 50ms and forward the correct value', function () {
      return new Promise(function(resolve, reject) {
        var stopwatch = new HrStopwatch();
        helpersh.paushe(EReshult.RESOLVE, 5)
          .then(function(value) {
            console.log('start')
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
    }, 100);
  });
});