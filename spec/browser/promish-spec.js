'use strict';
var Promish = require('../../lib/promish');

var shpecList = {
  'all': require('../test-utils/shpecs/all'),
  'any': require('../test-utils/shpecs/any'),
  'apply': require('../test-utils/shpecs/apply'),
  'bluebird': require('../test-utils/shpecs/bluebird'),
  'call': require('../test-utils/shpecs/call'),
  'catch': require('../test-utils/shpecs/catch'),
  'constructor': require('../test-utils/shpecs/constructor'),
  'defer': require('../test-utils/shpecs/defer'),
  'delay': require('../test-utils/shpecs/delay'),
  'finally': require('../test-utils/shpecs/finally'),
  'map': require('../test-utils/shpecs/map'),
  'method': require('../test-utils/shpecs/method'),
  'promisify-all': require('../test-utils/shpecs/promisify'),
  'race': require('../test-utils/shpecs/race'),
  'reduce': require('../test-utils/shpecs/reduce'),
  'reject': require('../test-utils/shpecs/reject'),
  'resolve': require('../test-utils/shpecs/resolve'),
  'some': require('../test-utils/shpecs/some'),
  'spread': require('../test-utils/shpecs/spread'),
  'then': require('../test-utils/shpecs/then'),
};

describe('Promish', function() {
  Object.keys(shpecList).forEach(key => {
    describe(key, () => {
      shpecList[key](Promish);
    });
  });
});
