'use strict';

'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise, name) {

  describe(name, function() {
    describe('reject', function () {
      it('should have the correct type', function() {
        var promish = CPromise.reject('fail!');
        expect(promish).to.be.instanceOf(CPromise);
      });
      it('should call the onRejected handler with the errorvalue', function () {
        return new Promise(function(resolve, reject) {
          CPromise.reject('fail')
            .then(Unexpected.then(resolve, reject))
            .catch(function(value) {
              expect(value).to.equal('fail');
              resolve();
            });
        });
      });
    });
  });
  
};