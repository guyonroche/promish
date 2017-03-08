'use strict';
require("babel-polyfill");

var Promish = require('../../lib/promish');

function unexpected(done) {
  return function() {
    expect(true).toEqual(false);
    done();
  }
}

describe('Promish', function() {
  it('should resolve with value', function (done) {
    new Promish(function (resolve) { resolve(7); })
      .catch(unexpected(done))
      .then(function (value) {
        expect(value).toEqual(7);
        done();
      })
      .catch(unexpected(done));
  });

  it('should map values', function(done) {
    Promish.resolve([1,2,3])
      .map(function(a) { return a * 2; })
      .spread(function(a,b,c) {
        expect(a).toEqual(2);
        expect(b).toEqual(4);
        expect(c).toEqual(6);
        done();
      })
      .catch(unexpected(done));
  });
  it('should map promises', function(done) {
    Promish.resolve([Promish.resolve(1),Promish.resolve(2),Promish.resolve(3)])
      .map(function(a) { return a * 2; })
      .spread(function(a,b,c) {
        expect(a).toEqual(2);
        expect(b).toEqual(4);
        expect(c).toEqual(6);
        done();
      })
      .catch(unexpected(done));
  });

});
