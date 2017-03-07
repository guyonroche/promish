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

// the purpose of this file is to test that all the above named shpecs are correct wrt bluebird
// I.e we're not testing bluebird here!
describe('Bluebird', function() {
  const options = {
    promishResolveCtor: false
  };
  shpecs(Bluebird, shpecList, options);
});
