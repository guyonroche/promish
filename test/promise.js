var util = require('util');
var Promish = require('./promish');

var MyError = function(message, data) {
  Error.call(this, message);
  this.data = data;
}
util.inherits(MyError, Error);

function f(i) {
  var values = ['hello', 'world']
  return new Promish(function(resolve, reject) {
    Promish.setTimeout(function() {
      if (i < values.length) {
        resolve(values[i]);
      } else {
        throw new MyError('Invalid index: ', i);
      }
    }, 1000, resolve, reject);
  });
}

f(0)
  .then(function(value) {
    console.log(value);
    return f(1);
  })
  .then(function(value) {
    console.log(value);
    return f(2);
  })
  .then(function(value) {
    console.log("This shouldn't happen");
    return f(3);
  })
  .catch(MyError, function(error) {
    console.error('MyError: ', error);
    console.error(error.stack)
  })
  .catch(function(e) {
    console.log('Unexpected Error: ', e.message);
  })
  .finally(function() {
    console.log('finally');
  });
  
  