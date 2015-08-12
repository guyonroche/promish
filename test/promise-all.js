var util = require('util');
var Promish = require('./promish');

var MyError = function(message, code) {
  Error.call(this, message);
  this.code = code;
}
util.inherits(MyError, Error);

console.log('Promise.all = ', Promise.all)
console.log('Promish.all = ', Promish.all)

function f(index, timeout, pass) {
  var promise = new Promish(function(resolve, reject) {
    console.log('Starting ' + index);
    Promish.setTimeout(function() {
      if (pass) {
        console.log('Passed ' + index);
        resolve('Index ' + index + ' for the win');
      } else {
        console.log('Failed ' + index);
        throw new MyError('Index ' + i + ' failed', i);
      }
    }, timeout, resolve, reject);
  });
  return promise
}

f(0, 1000, true)
  .then(function(value) {
    console.log(value);
    return Promish.all([f(1, 1000, true), f(2, 2000, true)]);
  })
  .then(function(values) {
    console.log(values);
  })
  .catch(function(error) {
    console.error(error.message);
    console.error(error.stack)
  })
  .finally(function() {
    console.log('finally');
  });
