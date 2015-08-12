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
    this.__proto__ = f;
  } else {
    this.__proto__ = new Promise(f);
  }
  
  // add finally sugar if not supported by Promise
  if (!this.finally) {
    this.__proto__.finally = function(h) {
      function fin() { return h(); }
      return this.then(fin, fin);
    };
  }
  
  // extend catch to allow type specific
  // the last argument is the handler, all previous are matchers
  this.__proto__.catch = function() {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    var h = args.pop();
    return this.then(undefined, function(error) {
      if (!args.length) {
        return h(error);
      }
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
      return new Promish(function(resolve, reject) { reject(error); });
    });
  };
  
  // wrap then so that we maintain the Promish chain
  this.__proto__.then = function(t, r) {
    var p = Promise.prototype.then.call(this, t, r);
    return new Promish(p);
  }
}

Promish.setTimeout = function(f, tm, resolve, reject) {
  setTimeout(function() {
    try{
      resolve(f(resolve, reject));
    }
    catch(ex) {
      reject(ex);
    }
  }, tm);
};

Promish.setImmediate = function(f, resolve, reject) {
  setImmediate(function() {
    try{
      resolve(f(resolve, reject));
    }
    catch(ex) {
      reject(ex);
    }
  });
};

Promish.all = function(promises) {
  return new Promish(Promise.all(promises));
}

Promish.race = Promise.race || function(promises) {
  return new Promish(function(resolve, reject) {
    promises.each(function(promise) {
      promise.then(resolve).catch(reject);
    });
  });
};

Promish.any = Promise.any || function(promises) {
  return new Promish(function(resolve, reject) {
    var rejects = [];
    var countDown = promises.length;
    promises.forEach(function(promise, index) {
      promise
        .then(resolve)
        .catch(function(error) {
          rejects[index] = error;
          if (--countDown === 0){
            reject(rejects);
          }
        });
    });
  });
};

module.exports = Promish;

