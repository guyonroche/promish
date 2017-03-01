'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

module.exports = function(CPromise) {

  describe('some', function () {
    it('4, resolve YYYY', function () {
      return new Promise(function (resolve, reject) {
        CPromise.some([
          helpersh.delay(10, null, 1),
          helpersh.delay(20, null, 2),
          helpersh.delay(30, null, 3),
          helpersh.delay(40, null, 4),
        ], 4)
          .spread(function (value1, value2, value3, value4) {
            expect(value1).to.equal(1);
            expect(value2).to.equal(2);
            expect(value3).to.equal(3);
            expect(value4).to.equal(4);
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('3, resolve YYYY', function () {
      return new Promise(function (resolve, reject) {
        CPromise.some([
          helpersh.delay(10, null, 1),
          helpersh.delay(20, null, 2),
          helpersh.delay(30, null, 3),
          helpersh.delay(40, null, 4),
        ], 3)
          .spread(function (value1, value2, value3, value4) {
            expect(value1).to.equal(1);
            expect(value2).to.equal(2);
            expect(value3).to.equal(3);
            expect(value4).to.be.undefined;
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('2, resolve YYYY', function () {
      return new Promise(function (resolve, reject) {
        CPromise.some([
          helpersh.delay(10, null, 1),
          helpersh.delay(20, null, 2),
          helpersh.delay(30, null, 3),
          helpersh.delay(40, null, 4),
        ], 2)
          .spread(function (value1, value2, value3, value4) {
            expect(value1).to.equal(1);
            expect(value2).to.equal(2);
            expect(value3).to.be.undefined;
            expect(value4).to.be.undefined;
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('1, resolve YYYY', function () {
      return new Promise(function (resolve, reject) {
        CPromise.some([
          helpersh.delay(10, null, 1),
          helpersh.delay(20, null, 2),
          helpersh.delay(30, null, 3),
          helpersh.delay(40, null, 4),
        ], 1)
          .spread(function (value1, value2, value3, value4) {
            expect(value1).to.equal(1);
            expect(value2).to.be.undefined;
            expect(value3).to.be.undefined;
            expect(value4).to.be.undefined;
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('4, resolve YYYN', function () {
      return new Promise(function (resolve, reject) {
        CPromise.some([
          helpersh.delay(10, null, 1),
          helpersh.delay(20, null, 2),
          helpersh.delay(30, null, 3),
          helpersh.delay(40, new Error('fum'), 4),
        ], 4)
          .then(Unexpected.then(resolve, reject))
          .catch(function (errors) {
            expect(errors.length).to.equal(1);
            expect(errors[0].message).to.equal('fum');
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('4, resolve NYYY', function () {
      return new Promise(function (resolve, reject) {
        CPromise.some([
          helpersh.delay(10, new Error('fe'), 1),
          helpersh.delay(20, null, 2),
          helpersh.delay(30, null, 3),
          helpersh.delay(40, null, 4),
        ], 4)
          .then(Unexpected.then(resolve, reject))
          .catch(function (errors) {
            expect(errors.length).to.equal(1);
            expect(errors[0].message).to.equal('fe');
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    it('3, resolve YYYN', function () {
      return new Promise(function (resolve, reject) {
        CPromise.some([
          helpersh.delay(10, null, 1),
          helpersh.delay(20, null, 2),
          helpersh.delay(30, null, 3),
          helpersh.delay(40, new Error('fum'), 4),
        ], 3)
          .spread(function (value1, value2, value3, value4) {
            expect(value1).to.equal(1);
            expect(value2).to.equal(2);
            expect(value3).to.equal(3);
            expect(value4).to.be.undefined;
            resolve();
          })
          .catch(Unexpected.catch(resolve, reject));
      });
    });
    [
      [4, [1, 2, 3, 4]],
      [3, [1, 2, 3, 4]],
      [2, [1, 2, 3, 4]],
      [1, [1, 2, 3, 4]],
      [4, [1, 2, 3, new Error('fie')]],
      [3, [1, 2, 3, new Error('fie')]],
      [2, [1, 2, 3, new Error('fie')]],
      [1, [1, 2, 3, new Error('fie')]],
      [4, [1, 2, new Error('fie'), 3]],
      [3, [1, 2, new Error('fie'), 3]],
      [2, [1, 2, new Error('fie'), 3]],
      [1, [1, 2, new Error('fie'), 3]],
      [4, [1, new Error('fie'), 2, 3]],
      [3, [1, new Error('fie'), 2, 3]],
      [2, [1, new Error('fie'), 2, 3]],
      [1, [1, new Error('fie'), 2, 3]],
      [4, [new Error('fie'), 1, 2, 3]],
      [3, [new Error('fie'), 1, 2, 3]],
      [2, [new Error('fie'), 1, 2, 3]],
      [1, [new Error('fie'), 1, 2, 3]],
      [4, [1, new Error('fie'), new Error('fie'), 3]],
      [3, [1, new Error('fie'), new Error('fie'), 3]],
      [2, [1, new Error('fie'), new Error('fie'), 3]],
      [1, [1, new Error('fie'), new Error('fie'), 3]],
    ].forEach(function (defn) {
      const [count,  values] = defn;
      const  title = `expect ${count}, resolve ${values.map(function(value) { return value instanceof Error ? 'N' : 'Y' }).join('')}`;
      it(title, function() {
        return new Promise(function(resolve, reject) {
          var promises = values.map(function(value, index) {
            var error = value instanceof Error && value;
            return helpersh.delay(index * 10, error, value);
          });
          var resolves = values.filter(function(value) {
            return !(value instanceof Error);
          });
          CPromise.some(promises, count)
            .then(function(results) {
              expect(resolves.length).to.be.at.least(count);
              expect(results.length).to.equal(count);
              for (var i = 0; i < count; i++) {
                expect(results[i]).to.equal(resolves[i]);
              }
              resolve();
            })
            .catch(function(errors) {
              expect(resolves.length).to.be.below(count);
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject));
        });
      });
    });
  });
}