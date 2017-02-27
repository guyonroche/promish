'use strict';

module.exports = function(CPromise, name, specs) {
  specs.forEach(spec => {
    const f = require(`./${spec}`);
    f(CPromise, name);
  });
};