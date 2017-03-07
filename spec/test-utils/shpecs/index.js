'use strict';

module.exports = function(CPromise, specs, options) {
  specs.forEach(spec => {
    const f = require(`./${spec}`);
    f(CPromise, options);
  });
};