'use strict';
var util = require('util');
var fs = require('fs');
var expect = require('chai').expect
var Promish = require('../lib/promish');

// =============================================================================
var EReshult = {
  RESOLVE: 1,
  REJECT: 2,
  THROW: 3
};

// =============================================================================
var MultiError = function(message, inner) {
  Error.call(this, message);
  this.inner = inner;
}
util.inherits(MultiError, Error);


// =============================================================================
var MyError = function(message, data) {
  Error.call(this, message);
  this.data = data;
}
util.inherits(MyError, Error);

var MyErrorA = function(message, data) {
  MyError.call(this, message, data);
}
util.inherits(MyErrorA, MyError);

var MyErrorB = function(message, data) {
  MyError.call(this, message, data);
}
util.inherits(MyErrorB, MyError);

// =============================================================================
// classes for promisifyAll

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

// =============================================================================
var helpersh = module.exports = {
  EReshult : EReshult,
  Errorsh: {
    MyError: MyError,
    MyErrorA: MyErrorA,
    MyErrorB: MyErrorB
  },
  paushe: function(result, value, timeout) {
    if (timeout === undefined) timeout = 1;
    return new Promish(function(resolve, reject) {
      if (result === EReshult.THROW) {
        throw value;
      }
      setTimeout(function() {
        switch(result) {
          case EReshult.RESOLVE:
            resolve(value);
            break;
          case EReshult.REJECT:
            reject(value);
            break;
        }
      },timeout);
    });
  },
  
  
  
  curry: {
    timeout: function(timeout, error, value) {
      return function(callback) {
        setTimeout(function(){ callback(error, value); }, timeout);
      }
    }
  },
  
  defer: function(result, value, timeout) {
    var deferred = Promish.defer();
    function handler() {
      switch(result) {
        case EReshult.RESOLVE:
          deferred.resolve(value);
          break;
        case EReshult.REJECT:
          deferred.reject(value);
          break;
      }
    }
    
    if (timeout === undefined) {
      // handle immediately (on the stack)
      handler();
    } else {
      setTimeout(handler, timeout);
    }
    
    return deferred.promise;
  },
  
  fn: {
    // call 1 in, 1 out, 10ms timer
    call_1_1_10: function(value, callback) {
      setTimeout(function() {
        if (value instanceof Error) {
          callback(value);
        } else {
          callback(null, value);
        }
      }, 10);
    },
    // call 1 in, 1 out, no timer
    call_1_1_0: function(value, callback) {
      if (value instanceof Error) {
        callback(value);
      } else {
        callback(null, value);
      }
    },
    // call 2 in, 2 out, 10ms timer
    call_2_2_10: function(value1, value2, callback) {
      setTimeout(function() {
        if (value1 instanceof Error) {
          callback(value1);
        } else {
          callback(null, value1, value2);
        }
      }, 10);
    },
    // call 2 in, 2 out, no timer
    call_2_2_0: function(value1, value2, callback) {
      if (value1 instanceof Error) {
        callback(value1);
      } else {
        callback(null, value1, value2);
      }
    }
  },
  
  spec: {
    
    some: function(count, values) {
      return {
        title: 'expect ' + count + ', resolve ' + values.map(function(value) { return value instanceof Error ? 'N' : 'Y' }).join(''),
        example: function() {
          return new Promise(function(resolve, reject) {
            var promises = values.map(function(value, index) {
              var error = value instanceof Error && value;
              return Promish.call(helpersh.curry.timeout(index * 10, error, value));
            });
            var resolves = values.filter(function(value) {
              return !(value instanceof Error);
            });
            Promish.some(promises, count)
              .then(function(results) {
                expect(resolves.length).to.be.at.least(count);
                expect(results.length).to.equal(count);
                for (var i = 0; i < count; i++) {
                  expect(results[i]).to.equal(resolves[i]);
                }
                resolve();
              })
              .catch(function(errors) {
                expect(resolves.length).to.be.below(count);
                resolve();
              })
              .catch(Unexpected.catch(resolve, reject));
          });
        }
      }
    },
    
    apply: {
      Sync: {
        One: {
          Resolve: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfapply(helpersh.fn.call_1_1_0, [5])
                .then(function(value) {
                  expect(value).to.equal(5);
                  resolve();
                })
                .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
            });
          },
          Reject: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfapply(helpersh.fn.call_1_1_0, [new Error('Fail')])
                .then(Unexpected.then(resolve, reject))
                .catch(function(error) {
                  expect(error.message).to.equal('Fail');
                  resolve();
                });
            });
          }
        },
        Two: {
          Resolve: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfapply(helpersh.fn.call_2_2_0, [5, 7])
                .spread(function(value1, value2) {
                  expect(value1).to.equal(5);
                  expect(value2).to.equal(7);
                  resolve();
                })
                .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
            });
          },
          Reject: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfapply(helpersh.fn.call_2_2_0, [new Error('Fail'), 6])
                .then(Unexpected.then(resolve, reject))
                .catch(function(error) {
                  expect(error.message).to.equal('Fail');
                  resolve();
                });
            });
          }
        }
      },
      Async: {
        One: {
          Resolve: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfapply(helpersh.fn.call_1_1_10, [5])
                .then(function(value) {
                  expect(value).to.equal(5);
                  resolve();
                })
                .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
            });
          },
          Reject: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfapply(helpersh.fn.call_1_1_10, [new Error('Fail')])
                .then(Unexpected.then(resolve, reject))
                .catch(function(error) {
                  expect(error.message).to.equal('Fail');
                  resolve();
                });
            });
          }
        },
        Two: {
          Resolve: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfapply(helpersh.fn.call_2_2_10, [5, 7])
                .spread(function(value1, value2) {
                  expect(value1).to.equal(5);
                  expect(value2).to.equal(7);
                  resolve();
                })
                .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
            });
          },
          Reject: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfapply(helpersh.fn.call_2_2_10, [new Error('Fail'), 6])
                .then(Unexpected.then(resolve, reject))
                .catch(function(error) {
                  expect(error.message).to.equal('Fail');
                  resolve();
                });
            });
          }
        }
      }
    },
    
    call: {
      Sync: {
        One: {
          Resolve: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfcall(helpersh.fn.call_1_1_0, 5)
                .then(function(value) {
                  expect(value).to.equal(5);
                  resolve();
                })
                .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
            });
          },
          Reject: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfcall(helpersh.fn.call_1_1_0, new Error('Fail'))
                .then(Unexpected.then(resolve, reject))
                .catch(function(error) {
                  expect(error.message).to.equal('Fail');
                  resolve();
                });
            });
          }
        },
        Two: {
          Resolve: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfcall(helpersh.fn.call_2_2_0, 5, 7)
                .spread(function(value1, value2) {
                  expect(value1).to.equal(5);
                  expect(value2).to.equal(7);
                  resolve();
                })
                .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
            });
          },
          Reject: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfcall(helpersh.fn.call_2_2_0, new Error('Fail'), 6)
                .then(Unexpected.then(resolve, reject))
                .catch(function(error) {
                  expect(error.message).to.equal('Fail');
                  resolve();
                });
            });
          }
        }
      },
      Async: {
        One: {
          Resolve: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfcall(helpersh.fn.call_1_1_10, 5)
                .then(function(value) {
                  expect(value).to.equal(5);
                  resolve();
                })
                .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
            });
          },
          Reject: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfcall(helpersh.fn.call_1_1_10, new Error('Fail'))
                .then(Unexpected.then(resolve, reject))
                .catch(function(error) {
                  expect(error.message).to.equal('Fail');
                  resolve();
                });
            });
          }
        },
        Two: {
          Resolve: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfcall(helpersh.fn.call_2_2_10, 5, 7)
                .spread(function(value1, value2) {
                  expect(value1).to.equal(5);
                  expect(value2).to.equal(7);
                  resolve();
                })
                .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
            });
          },
          Reject: function(Type) {
            return new Promise(function(resolve, reject) {
              Type.nfcall(helpersh.fn.call_2_2_10, new Error('Fail'), 6)
                .then(Unexpected.then(resolve, reject))
                .catch(function(error) {
                  expect(error.message).to.equal('Fail');
                  resolve();
                });
            });
          }
        }
      }
    },
    
    promisifyAll: {
      fs: {
        readFile: {
          resolve: function(Type, options) {
            var fsp = Type.promisifyAll(fs, options);
            return new Promise(function(resolve, reject) {
              fsp.readFileAsync('spec/helpersh.js')
                .then(function(data) {
                  var contents = data.toString();
                  expect(contents).to.contain('Any text I put right here actually!');
                  resolve();
                })
                .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
            });
          },
          reject: function(Type, options) {
            var fsp = Type.promisifyAll(fs, options);
            return new Promise(function(resolve, reject) {
              fsp.readFileAsync('tpeirjgpeoijrgpcesij')
                .then(Unexpected.then(resolve, reject))
                .catch(function(error) {
                  expect(error.code).to.equal('ENOENT');
                  resolve();
                });
            });
          }
        }
      },
      
      classes: {
        A: {
          a: {
            resolve: function(Type, options) {
              return new Promise(function(resolve, reject) {
                var o = Type.promisifyAll(new A(), options);
                o.aAsync(5)
                  .then(function(value) {
                    expect(value).to.equal(5);
                    resolve();
                  })
                  .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
              });
            },
            reject: function(Type, options) {
              return new Promise(function(resolve, reject) {
                var o = Type.promisifyAll(new A(), options);
                o.aAsync(0)
                  .then(Unexpected.then(resolve, reject))
                  .catch(function(error) {
                    expect(error.message).to.equal('Fail A');
                    resolve();
                  });
              });
            }
          }
        },
        B: {
          a: {
            resolve: function(Type, options) {
              return new Promise(function(resolve, reject) {
                var o = Type.promisifyAll(new B(7), options);
                o.aAsync(5)
                  .then(function(value) {
                    expect(value).to.equal(5);
                    resolve();
                  })
                  .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
              });
            },
            reject: function(Type, options) {
              return new Promise(function(resolve, reject) {
                var o = Type.promisifyAll(new B(77), options);
                o.aAsync(0)
                  .then(Unexpected.then(resolve, reject))
                  .catch(function(error) {
                    expect(error.message).to.equal('Fail A');
                    resolve();
                  });
              });
            }
          },
          b: {
            resolve: function(Type, options) {
              return new Promise(function(resolve, reject) {
                var o = Type.promisifyAll(new B(7), options);
                o.bAsync()
                  .then(function(value) {
                    expect(value).to.equal(7);
                    resolve();
                  })
                  .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
              });
            },
            reject: function(Type, options) {
              return new Promise(function(resolve, reject) {
                var o = Type.promisifyAll(new B(0), options);
                o.bAsync()
                  .then(Unexpected.then(resolve, reject))
                  .catch(function(error) {
                    expect(error.message).to.equal('Fail B');
                    resolve();
                  });
              });
            }
          }
        },
        BB: {
          b: {
            resolve: function(Type, options) {
              return new Promise(function(resolve, reject) {
                var o = Type.promisifyAll(new BB(7), options);
                o.bAsync()
                  .then(function(value) {
                    expect(value).to.equal(8);
                    resolve();
                  })
                  .catch(Unexpected.catch(resolve, reject, 'Did not expect to catch error here'));
              });
            },
            reject: function(Type, options) {
              return new Promise(function(resolve, reject) {
                var o = Type.promisifyAll(new BB(0), options);
                o.bAsync()
                  .then(Unexpected.then(resolve, reject))
                  .catch(function(error) {
                    expect(error.message).to.equal('Fail BB');
                    resolve();
                  });
              });
            }
          }
        }
      }
    }
  },
  
  matchersh: {
    fooString: function(value) {
      return ((typeof value) === 'string') && (value.indexOf('foo') >= 0);
    }
  },
  
  handlersh: {
    unexpected: {
      then: function(resolve, reject, message) {
        return function(value) {
          message = message || 'Unexpected then:' + value;
          reject(new Error(message));
        }
      },
      catch: function(resolve, reject, message) {
        return function(error) {
          message = message || 'Unexpected catch:';
          reject(new MultiError(message, error));
        }
      }
    }
  }
};

var Unexpected = helpersh.handlersh.unexpected;
var EReshult = helpersh.EReshult;
