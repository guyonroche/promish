'use strict';
var util = require('util');
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
  
  nfApply: {
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
  
  nfCall: {
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
