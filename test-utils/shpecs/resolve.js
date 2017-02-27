'use strict';

'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise, name) {

  describe(name, function() {
    describe('resolve', function () {
      it('should have the correct type', function() {
        var promish = CPromise.resolve('Hello, World!');
        expect(promish).to.be.instanceOf(CPromise);
      });
      it('should call the onResolved handler with the resolved value', function () {
        return new Promise(function(resolve, reject) {
          CPromise.resolve('Hello, World!')
            .then(function(value) {
              expect(value).to.equal('Hello, World!');
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject));
        });
      });
    });
  });
  
};