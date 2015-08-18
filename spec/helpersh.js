'use strict';
var util = require('util');
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
module.exports = {
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
