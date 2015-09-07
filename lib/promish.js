'use strict';

var util = require('util');

function isErrorClass(type) {
  while (type && (type !== Object)) {
    if ((type === Error) || (type instanceof Error)) {
      return true;
    }
    type = type.prototype;
  }
  return false;
}

var Promish = function(f) {
  if (f instanceof Promise) {
    // if f is a Promise, then wrap it
    this.__proto__ = f;
  } else if (f.then instanceof Function) {
    // if f is a 3rd Party Promise, then wrap it
    this.__proto__ = new Promise(function(resolve, reject) {
      f.then(function(value) {
        resolve(value);
      })
      .catch(function(error) {
        reject(error);
      });
    });
  } else if (f instanceof Error) {
    // sugar for 'rethrow'
    this.__proto__ = new Promise(function(resolve, reject) {
      reject(f);
    });
  } else if (f instanceof Function) {
    // otherwise create a new Promise and wrap that
    this.__proto__ = new Promise(f);
  } else {
    // resolve instantly
    this.__proto__ = new Promise(function(resolve, reject) {
      resolve(f);
    });
  }
  
  // add finally sugar if not supported by Promise
  if (!this.finally) {
    this.finally = function(h) {
      function fin() { return h(); }
      return this.then(fin, fin);
    };
  }
  
  // extend catch to allow type specific
  // the last argument is the handler, all previous are matchers
  this.catch = function() {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    var h = args.pop();
    return this.then(undefined, function(error) {
      // default catch - no matchers. Just return handler result
      if (!args.length) {
        return h(error);
      }
      
      // search for a match in argument order and return handler result if found
      for (var i = 0; i < args.length; i++) {
        var matcher = args[i];
        if (isErrorClass(matcher)) {
          if (error instanceof matcher) {
            return h(error);
          }
        } else if (matcher instanceof Function) {
          if (matcher(error)) {
            return h(error);
          }
        }
      }
      
      // no match was found send this error to the next promise handler in the chain
      return new Promish(function(resolve, reject) { reject(error); });
    });
  };
  
  // wrap then so that we maintain the Promish chain
  this.then = function(t, r) {
    var p = Promise.prototype.then.call(this, t, r);
    return new Promish(p);
  };
  
  // sleep some ms then resolve with incoming value
  this.delay = function(timeout) {
    return this.then(function(value) {
      return new Promish(function(resolve) {
        setTimeout(function() {
          resolve(value);
        }, timeout);
      });
    });
  };
  
  this.spread = function(f) {
    return this.then(function(value){
      return f.apply(undefined, value);
    });
  }
}

// Provide 'Promish' version
Promish.resolve = function(value) {
  return new Promish(function(resolve, reject) {
    resolve(value);
  });
}

// Provide 'Promish' version
Promish.reject = function(error) {
  return new Promish(function(resolve, reject) {
    reject(error);
  });
}

// Wrap a synchronous method and resolve with its return value
Promish.method = function(f) {
  return function() {
    var self = this;
    var args = arguments;
    return new Promish(function(resolve, reject) {
      resolve(f.apply(self, args));
    });
  }
}

// Promise.all already supported but need to wrap in Promish
Promish.all = function(promises) {
  return new Promish(Promise.all(promises));
}

// same for Promise.race
Promish.race = Promise.race || function(promises) {
  return new Promish(Promise.race(promises));
};

Promish.apply = Promish.nfapply = function(f, args) {
  // take a copy of args because a) might not be Array and b) no side-effects
  args = Array.prototype.slice.call(args);
  return new Promish(function(resolve, reject) {
    args.push(function () {
      var error = Array.prototype.shift.apply(arguments);
      if (error) {
        reject(error);
      } else {
        if (arguments.length === 1) {
          resolve(arguments[0]);
        } else {
          resolve(arguments);
        }
      }
    });
    f.apply(undefined, args);
  });
}

Promish.call = Promish.nfcall = function() {
  var f = Array.prototype.shift.apply(arguments);
  return Promish.apply(f, arguments);
}

Promish.post = Promish.npost = function(o, f, a) {
  return Promish.apply(f.bind(o), a);
}

Promish.invoke = Promish.ninvoke = function() {
  var o = Array.prototype.shift.apply(arguments);
  var f = Array.prototype.shift.apply(arguments);
  return Promish.apply(f.bind(o), arguments);
}

// create curry function for nfcall
Promish.promisify = Promish.denodify = function(f) {
  return function() {
    return Promish.apply(f, arguments);
  }
}
// create Q based curry function for ninvoke
Promish.nbind = function(f, o) {
  // Why is it function, object?
  return function() {
    return Promish.post(o, f, arguments);
  }
}
// curry function for ninvoke with arguments in object, method order
Promish.bind = function(o, f) {
  return function() {
    return Promish.post(o, f, arguments);
  }
}

// Promishify every method in an object
Promish.promisifyAll = function(o, options) {
  options = options || {};
  var inPlace = options.inPlace || false;
  var suffix = options.suffix || (inPlace ? 'Async' : '');
  
  var p = {};
  var oo = o;
  while (oo && (oo !== Object)) {
    for (var i in oo) {
      var value = oo[i];
      if (!p[i + suffix] && (value instanceof Function)) {
        p[i + suffix] = Promish.bind(o, value);
      }
    }
    oo = oo.__proto__ || oo.prototype;
  }
  
  if (inPlace) {
    for (var i in p) {
      o[i] = p[i];
    }
    p = o;
  } else {
    // waiting for ES6 Proxies!
  }
  
  return p;
}

// some - the first n to resolve, win - else reject with all of the errors
Promish.some = Promise.some || function(promises, n) {
  return new Promish(function(resolve, reject) {
    var values = [];
    var rejects = [];
    promises.forEach(function(promise) {
      promise
        .then(function(value) {
          values.push(value);
          if (values.length >= n) {
            resolve(values);
          }
        })
        .catch(function(error) {
          rejects.push(error);
          if (rejects.length > promises.length - n){
            reject(rejects);
          }
        });
    });
  });
};

// any - the first to resolve, wins - else reject with all of the errors
Promish.any = Promise.any || function(promises) {
  return Promish.some(promises, 1)
    .then(function(values) {
      return values[0];
    });
};

// old-style for ease of adoption
Promish.defer = function() {
  var deferred = {};
  deferred.promise = new Promish(function(resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

// spread - apply array of values to function as args
Promish.spread = function(value, f) {
  return f.apply(undefined, value);
}

module.exports = Promish;