'use strict';
var expect = require('chai').expect;
var Promish = require('../lib/promish');

var helpersh = require('../test-utils/helpersh');
var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('any', function () {
    it('should have the correct type', function() {
      var promish = Promish.any([
          Promish.call(helpersh.curry.timeout(10, null, 1)),
          Promish.call(helpersh.curry.timeout(20, null, 2))
        ]);
      expect(promish).to.be.instanceOf(Promish);
    });
    it('all resolve', function () {
      return new Promise(function(resolve, reject) {
        Promish.any([
          Promish.call(helpersh.curry.timeout(10, null, 1)),
          Promish.call(helpersh.curry.timeout(20, null, 2))
        ])
          .then(function(value) {
            expect(value).to.equal(1);
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('one resolve', function () {
      return new Promise(function(resolve, reject) {
        Promish.any([
          Promish.call(helpersh.curry.timeout(10, new Error('fie'))),
          Promish.call(helpersh.curry.timeout(20, null, 2))
        ])
          .then(function(value) {
            expect(value).to.equal(2);
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('none resolve', function () {
      return new Promise(function(resolve, reject) {
        Promish.any([
          Promish.call(helpersh.curry.timeout(10, new Error('fie'))),
          Promish.call(helpersh.curry.timeout(20, new Error('fei')))
        ])
          .then(Unexpected.then(resolve, reject))
          .catch(function(errors) {
            expect(errors.length).to.equal(2);
            expect(errors[0].message).to.equal('fie');
            expect(errors[1].message).to.equal('fei');
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
  });
});