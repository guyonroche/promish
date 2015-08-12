var util = require('util');
var Promish = require('../lib/promish');

var MyError = function(message, data) {
  Error.call(this, message);
  this.data = data;
}
util.inherits(MyError, Error);

function matcher(error) {
  return error.message && (error.message.indexOf('First') >= 0);
}

function f(i, fail) {
  return new Promish(function(resolve, reject) {
    Promish.setTimeout(function() {
      if (fail) {
        switch(i) {
          case 0: throw new Error('Zero the Hero');
          case 1: throw new Error('First the Worst');
          case 2: throw new MyError('Second the Best', i);
          default: throw 'Bork!';
        }
      } else {
        resolve('Number ' + i + ' passed');
      }
    }, 1000, resolve, reject);
  });
}

var failer = parseInt(process.argv[2]);

f(0, failer == 0)
  .then(function(value) {
    console.log(value);
    return f(1, failer == 1);
  })
  .then(function(value) {
    console.log(value);
    return f(2, failer == 2);
  })
  .then(function(value) {
    console.log(value);
    return f(3, failer == 3);
  })
  .catch(MyError, function(error) {
    console.error('MyError: ', error);
    
  })
  .catch(matcher, function(error) {
    console.error('Matched: ', error.stack)
  })
  .catch(Error, function(error) {
    console.error('Plain Error: ', error.stack)
  })
  .catch(function(error) {
    console.error('Unexpected Error: ', error)
  })
  .finally(function() {
    console.log('finally');
  });
  
  