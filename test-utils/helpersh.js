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
    // TODO: use CPromise
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

  delay: function(timeout, error, value) {
    let promise = Promish.delay(timeout, value);
    if (error) {
      promise = promise.then(() => { throw error; });
    }
    return promise;
  },
  
  defer: function(result, value, timeout) {
    // TODO: use CPromise
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
