'use strict';
var Pinkie = require('pinkie');
var PromishClass = require('../../lib/promish-class');
var PinkiePromish = PromishClass(Pinkie);

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

describe.only('PinkiePromish', function() {
  shpecs(PinkiePromish, shpecList);
});
