'use strict';

'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise, name) {

  describe(name, function() {
    describe('race', function () {
      it('should have the correct type', function() {
        var promish = CPromise.race([
          CPromise.call(helpersh.curry.timeout(10, null, 1)),
          CPromise.call(helpersh.curry.timeout(20, null, 2))
        ]);
        expect(promish).to.be.instanceOf(CPromise);
      });
    });
  });

};