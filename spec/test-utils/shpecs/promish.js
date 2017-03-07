'use strict';

var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;
var Promish = require('../../../lib/promish');

module.exports = function(CPromise, options = {}) {
  options = Object.assign({}, {
    promishResolveCtor: true,
    promishResolveResolve: true,
    promishRejectReject: true,
  }, options);

  describe('Inside Promish', function () {

    describe('resolve', function () {
      if (options.promishResolveCtor) {
        it('should resolve with supplied promise value', function () {
          return new Promise(function (resolve) {
            /* jshint -W064 */
            new Promish(CPromise(6))
              .then(function (value) {
                expect(value).to.equal(6);
                resolve();
              });
            /* jshint +W064 */
          });
        });
      }
      if (options.promishResolveResolve) {
        it('should resolve with supplied resolve value', function () {
          return new Promise(function (resolve, reject) {
            new Promish(CPromise.resolve(8))
              .then(function (value) {
                expect(value).to.equal(8);
                resolve();
              })
              .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
          });
        });
      }
    });

    describe('reject', function () {
      if (options.promishRejectReject) {
        it('should reject with supplied reject value', function () {
          return new Promise(function (resolve, reject) {
            new Promish(CPromise.reject(9))
              .then(Unexpected.then(resolve, reject))
              .catch(function (error) {
                expect(error).to.equal(9);
                resolve();
              })
              .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
          });
        });
      }
    });
  });

};