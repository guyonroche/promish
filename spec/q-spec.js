'use strict';
var Q = require('q');

var HrStopwatch = require('../test-utils/hr-stopwatch');
var helpersh = require('../test-utils/helpersh');
var Unexpected = helpersh.handlersh.unexpected;

var shpecs = require('../test-utils/shpecs');

var shpecList = [
  'all',
  'any',
  'apply',
  'call',
  'catch',
  'defer',
  'delay',
  'finally',
  'promish',
  'race',
  'reject',
  'resolve',
  'spread',
  'then',
];

// TODO: promisify,  promisifyAll

describe('Q', function() {
  var options = {
    spreadResolveValues: false,
    spreadResolvePromises: false,
  };
  shpecs(Q, shpecList, options);
});

