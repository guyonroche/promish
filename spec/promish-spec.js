'use strict';
var Promish = require('../lib/promish');

var shpecs = require('../test-utils/shpecs');

var shpecList = [
  'all',
  'any',
  'apply',
  'bluebird',
  'call',
  'catch',
  'constructor',
  'defer',
  'delay',
  'finally',
  'map',
  'method',
  'promisify-all',
  'race',
  'reduce',
  'reject',
  'resolve',
  'some',
  'spread',
  'then',
];

describe('Promish', function() {
  shpecs(Promish, shpecList);
});
