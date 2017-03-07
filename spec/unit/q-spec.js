'use strict';
var Q = require('q');

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

// the purpose of this file is to test that all the above named shpecs are correct wrt Q
// I.e we're not testing Q here!
describe('Q', function() {
  var options = {
    spreadResolveValues: false,
    spreadResolvePromises: false,
  };
  shpecs(Q, shpecList, options);
});

