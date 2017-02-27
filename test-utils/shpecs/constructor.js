'use strict';

var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise, name) {

  describe(name, function () {
    describe('constructor', function () {

      it('should resolve with value', function () {
        return new Promise(function (resolve, reject) {
          var promish = new CPromise(function (res) {
            res(7);
          })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'))
            .then(function (value) {
              expect(value).to.equal(7);
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));

          expect(promish).to.be.instanceOf(CPromise);
        });
      });

      it('should resolve immediately if given value', function () {
        return new Promise(function (resolve, reject) {
          new CPromise(7)
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'))
            .then(function (value) {
              expect(value).to.equal(7);
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });

      it('should reject immediately if given error', function () {
        return new Promise(function (resolve, reject) {
          new CPromise(new Error('tada'))
            .then(Unexpected.then(resolve, reject))
            .catch(function (error) {
              expect(error).to.be.an.instanceof(Error);
              expect(error.message).to.equal('tada');
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });
    });
  });

};