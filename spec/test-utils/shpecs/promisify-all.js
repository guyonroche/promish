'use strict';
var fs = require('fs');
var util = require('util');
var expect = require('chai').expect;
var helpersh = require('../helpersh');
var Unexpected = helpersh.handlersh.unexpected;

var A = function() {};
A.prototype.a = function(x, callback) {
  setTimeout(function() {
    if (x) {
      callback(null, x);
    } else {
      callback(new Error('Fail A'));
    }
  }, 10);
};

var B = function(y) {
  this.y = y;
};
util.inherits(B, A);
B.prototype.b = function(callback) {
  setTimeout(function() {
    if (this.y) {
      callback(null, this.y);
    } else {
      callback(new Error('Fail B'));
    }
  }.bind(this), 10);
};

var BB = function(y) {
  B.call(this, y);
};
util.inherits(BB, B);
BB.prototype.b = function(callback) {
  setTimeout(function() {
    if (this.y) {
      callback(null, this.y + 1);
    } else {
      callback(new Error('Fail BB'));
    }
  }.bind(this), 10);
};

var classes = {
  A: A,
  B: B,
  BB: BB
};


module.exports = function(CPromise) {

  describe('promisifyAll', function () {
    describe('in-place', function () {
      var options = {inPlace: true};
      // skipping this as it mutates fs
      describe.skip('fs', function () {
        describe('readFile', function () {
          it('resolve', function () {
            return new Promise(function(resolve, reject) {
              fsp.readFileAsync('test-utils/helpersh.js')
                .then(function(data) {
                  var contents = data.toString();
                  expect(contents).to.contain('Any text I put right here actually!');
                  resolve();
                })
                .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
            });
          });
          it('reject', function () {
            var fsp = CPromise.promisifyAll(fs, options);
            return new Promise(function(resolve, reject) {
              fsp.readFileAsync('tpeirjgpeoijrgpcesij')
                .then(Unexpected.then(resolve, reject))
                .catch(function(error) {
                  expect(error.code).to.equal('ENOENT');
                  resolve();
                });
            });
          });
        });
      });

      describe('class instance', function() {
        describe('class A', function() {
          describe('method a', function() {
            it('resolve', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new A(), options);
                o.aAsync(5)
                  .then(function(value) {
                    expect(value).to.equal(5);
                    resolve();
                  })
                  .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
              });
            });
            it('reject', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new A(), options);
                o.aAsync(0)
                  .then(Unexpected.then(resolve, reject))
                  .catch(function(error) {
                    expect(error.message).to.equal('Fail A');
                    resolve();
                  });
              });
            });
          });
        });
        describe('class B', function() {
          describe('method a', function() {
            it('resolve', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new B(7), options);
                o.aAsync(5)
                  .then(function(value) {
                    expect(value).to.equal(5);
                    resolve();
                  })
                  .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
              });
            });
            it('reject', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new B(77), options);
                o.aAsync(0)
                  .then(Unexpected.then(resolve, reject))
                  .catch(function(error) {
                    expect(error.message).to.equal('Fail A');
                    resolve();
                  });
              });
            });
          });
          describe('method b', function() {
            it('resolve', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new B(7), options);
                o.bAsync()
                  .then(function(value) {
                    expect(value).to.equal(7);
                    resolve();
                  })
                  .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
              });
            });
            it('reject', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new B(0), options);
                o.bAsync()
                  .then(Unexpected.then(resolve, reject))
                  .catch(function(error) {
                    expect(error.message).to.equal('Fail B');
                    resolve();
                  });
              });
            });
          });
        });
        describe('class BB', function() {
          describe('method b', function() {
            it('resolve', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new BB(7), options);
                o.bAsync()
                  .then(function(value) {
                    expect(value).to.equal(8);
                    resolve();
                  })
                  .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
              });
            });
            it('reject', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new BB(0), options);
                o.bAsync()
                  .then(Unexpected.then(resolve, reject))
                  .catch(function(error) {
                    expect(error.message).to.equal('Fail BB');
                    resolve();
                  });
              });
            });
          });
        });
      });
    });
    describe('proxy', function () {
      var options = {suffix: 'Async'};
      describe('fs', function () {
        describe('readFile', function () {
          it('resolve', function () {
            var fsp = CPromise.promisifyAll(fs, options);
            return new Promise(function(resolve, reject) {
              fsp.readFileAsync(__filename)
                .then(function(data) {
                  var contents = data.toString();
                  expect(contents).to.contain('Any text I put right here actually!');
                  resolve();
                })
                .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
            });
          });
          it('reject', function () {
            var fsp = CPromise.promisifyAll(fs, options);
            return new Promise(function(resolve, reject) {
              fsp.readFileAsync('tpeirjgpeoijrgpcesij')
                .then(Unexpected.then(resolve, reject))
                .catch(function(error) {
                  expect(error.code).to.equal('ENOENT');
                  resolve();
                });
            });
          });
        });
      });

      describe('class instance', function() {
        describe('class A', function() {
          describe('method a', function() {
            it('resolve', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new A(), options);
                o.aAsync(5)
                  .then(function(value) {
                    expect(value).to.equal(5);
                    resolve();
                  })
                  .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
              });
            });
            it('reject', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new A(), options);
                o.aAsync(0)
                  .then(Unexpected.then(resolve, reject))
                  .catch(function(error) {
                    expect(error.message).to.equal('Fail A');
                    resolve();
                  });
              });
            });
          });
        });
        describe('class B', function() {
          describe('method a', function() {
            it('resolve', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new B(7), options);
                o.aAsync(5)
                  .then(function(value) {
                    expect(value).to.equal(5);
                    resolve();
                  })
                  .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
              });
            });
            it('reject', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new B(77), options);
                o.aAsync(0)
                  .then(Unexpected.then(resolve, reject))
                  .catch(function(error) {
                    expect(error.message).to.equal('Fail A');
                    resolve();
                  });
              });
            });
          });
          describe('method b', function() {
            it('resolve', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new B(7), options);
                o.bAsync()
                  .then(function(value) {
                    expect(value).to.equal(7);
                    resolve();
                  })
                  .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
              });
            });
            it('reject', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new B(0), options);
                o.bAsync()
                  .then(Unexpected.then(resolve, reject))
                  .catch(function(error) {
                    expect(error.message).to.equal('Fail B');
                    resolve();
                  });
              });
            });
          });
        });
        describe('class BB', function() {
          describe('method b', function() {
            it('resolve', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new BB(7), options);
                o.bAsync()
                  .then(function(value) {
                    expect(value).to.equal(8);
                    resolve();
                  })
                  .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
              });
            });
            it('reject', function() {
              return new Promise(function(resolve, reject) {
                var o = CPromise.promisifyAll(new BB(0), options);
                o.bAsync()
                  .then(Unexpected.then(resolve, reject))
                  .catch(function(error) {
                    expect(error.message).to.equal('Fail BB');
                    resolve();
                  });
              });
            });
          });
        });
      });
    });
  });

};