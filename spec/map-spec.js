'use strict';
var expect = require('chai').expect;
var Promish = require('../lib/promish');

var helpersh = require('../test-utils/helpersh');

describe('Promish', function() {
  describe('map', function () {
    it('Values', function() {
      helpersh.spec.map.Values(Promish);
    });
    it('Promises', function() {
      helpersh.spec.map.Promises(Promish);
    });
  });
});