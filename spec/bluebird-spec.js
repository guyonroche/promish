'use strict';
var Bluebird = require('bluebird');

var shpecs = require('../test-utils/shpecs');

var shpecList = [
  'all',
  'any',
  'catch',
  'defer',
  'delay',
  'finally',
  'map',
  'method',
  'promish',
  'race',
  'reduce',
  'reject',
  'resolve',
  'some',
  'spread',
  'then',
];

describe('Bluebird', function() {
  const options = {
    promishResolveCtor: false
  };
  shpecs(Bluebird, shpecList, options);
});
