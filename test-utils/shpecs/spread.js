'use strict';

'use strict';
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;
var EReshult = helpersh.EReshult;

module.exports = function(CPromise, name) {

  describe(name, function() {
    describe('spread', function () {
      it('should spread an array into the handler\'s arguments', function () {
        return new Promise(function(resolve, reject) {
          helpersh.paushe(EReshult.RESOLVE, [1,2,3])
            .spread(function(a,b,c) {
              expect(a).to.equal(1);
              expect(b).to.equal(2);
              expect(c).to.equal(3);
              expect(arguments.length).to.equal(3);
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });

      it('should spread CPromise.all results into the handler\'s arguments', function () {
        return new Promise(function(resolve, reject) {
          CPromise.all([
            helpersh.paushe(EReshult.RESOLVE, 1),
            helpersh.paushe(EReshult.RESOLVE, 2),
            helpersh.paushe(EReshult.RESOLVE, 3)
          ]).spread(function(a,b,c) {
            expect(a).to.equal(1);
            expect(b).to.equal(2);
            expect(c).to.equal(3);
            expect(arguments.length).to.equal(3);
            resolve();
          })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });

      it('should spread promises resolved values into the handler\'s arguments', function () {
        return new Promise(function(resolve, reject) {
          new CPromise(function(resolve) {
            resolve([
              helpersh.paushe(EReshult.RESOLVE, 1),
              helpersh.paushe(EReshult.RESOLVE, 2),
              helpersh.paushe(EReshult.RESOLVE, 3)
            ]);
          })
            .spread(function(a,b,c) {
              expect(a).to.equal(1);
              expect(b).to.equal(2);
              expect(c).to.equal(3);
              expect(arguments.length).to.equal(3);
              resolve();
            })
            .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
        });
      });
    });
  });

};