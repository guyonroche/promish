
var delay = function(ms, pass) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (pass) {
        resolve(ms);
      } else {
        reject(new Error('' + ms));
      }
    }, ms);
  })
}

Promise.race([delay(1000,false), delay(2000, true)])
  .then(function(value) {
    console.log('Success: ', value);
  })
  .catch(function(error) {
    console.log('Fail: ', error.message);
  });