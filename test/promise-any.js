var Promish = require('./promish');

function f(index, timeout, pass) {
  var promise = new Promish(function(resolve, reject) {
    console.log('Starting ' + index);
    Promish.setTimeout(function() {
      if (pass) {
        console.log('Passed ' + index);
        resolve('Index ' + index + ' for the win');
      } else {
        console.log('Failed ' + index);
        throw new Error('Index ' + i + ' failed');
      }
    }, timeout, resolve, reject);
  });
  return promise
}


Promish.any([
  f(0, 1000, false),
  f(1, 2000, true),
  f(2, 3000, false),
  f(3, 4000, false)
])
  .then(function(value) {
    console.log('Value' + value);
  })
  .catch(function(errors) {
    console.log('catch')
    if (errors instanceof Array) {
      errors.forEach(function(error) {
        console.log(error.message);
      });
    } else {
      console.log(errors.message);
    }
  })
  .finally(function() {
      console.log('finally')
  });
  