'use strict';
var expect = require('chai').expect;
var Promish = require('../lib/promish');

var helpersh = require('../test-utils/helpersh');
//var Unexpected = helpersh.handlersh.unexpected;

describe('Promish', function() {
  describe('all', function () {
    it('should have the correct type', function() {
      var promish = Promish.all([
          Promish.call(helpersh.curry.timeout(10, null, 1)),
          Promish.call(helpersh.curry.timeout(20, null, 2))
        ]);
      expect(promish).to.be.instanceOf(Promish);
    });
  });
});