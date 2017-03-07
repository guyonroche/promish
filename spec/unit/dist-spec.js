'use strict';

var distros = {
  ES6PromishNode: require('../../dist/promish-node'),
  ES6PromishBundle: require('../../dist/promish-bundle.min'),
  ES6PromishBundleMin: require('../../dist/promish-bundle.min'),
};

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

describe('Dist', function() {
  Object.keys(distros).forEach(dist => {
    describe(dist, () => {
      shpecs(distros[dist], shpecList);
    });
  });
});
