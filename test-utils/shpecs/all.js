'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise) {
  describe('all', function () {
    // TODO: proper all spec
    it.skip('should have the correct type', function() {
      var promise = CPromise.all([
        CPromise.resolve(1),
        CPromise.resolve(2),
      ]);
      expect(promise).to.be.instanceOf(CPromise);
    });
  });
};
