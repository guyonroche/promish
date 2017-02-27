'use strict';
var Promish = require('../lib/promish');

var shpecs = require('../test-utils/shpecs');

var shpecList = [
  'all',
  'any',
  'apply',
  'call',
  'catch',
  'constructor',
  'defer',
  'delay',
  'finally',
  'method',
  'promisify-all',
  'race',
  'reject',
  'resolve',
  'some',
  'spread',
  'then',
];

shpecs(Promish, 'Promish', shpecList);