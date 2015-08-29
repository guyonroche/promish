var fs = Promise.promisify(require('fs'));

fs.readFile('test/promisify.js')
  .then(function(data) {
    console.log(data.toString());
  });