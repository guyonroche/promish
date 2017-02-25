'use strict';

var ES6Promise = require('es6-promise').Promise;

var Promish = require('./promish-class')(ES6Promise);

module.exports = Promish;