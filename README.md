# Promish

```javascript
     SH
      I
P R O M
```

The Promish module creates a wrapper around the EcmaScript 6 Promise class.
 It adds some of the useful features found in many of the other popular promise libraries such as Q and Bluebird.
 It is designed to be interchangeable with the ES6 Promise as its interface is a superset of the Promise class.

This is probably one of the smallest promise libraries - currently around 6.5kb (smaller than this README!)
 and comes with no dependencies (other than ES6 Promises).

# Installation

npm install promish

# New Features!

<ul>
  <li>finally() must not swallow rejection.</li>
</ul>

# Backlog

<ul>
  <li>TBD</li>
</ul>

# Contents

<ul>
  <li>
    <a href="#interface">Interface</a>
    <ul>
      <li><a href="#include">Include</a></li>
      <li><a href="#instantiation">Instantiation</a></li>
      <li><a href="#then">Then</a></li>
      <li><a href="#catch">Catch</a></li>
      <li><a href="#finally">Finally</a></li>
      <li>
        <a href="#promisification">Promishification</a>
        <ul>
          <li><a href="#apply">Apply</a></li>
          <li><a href="#call">Call</a></li>
          <li><a href="#post">Post</a></li>
          <li><a href="#invoke">Invoke</a></li>
          <li><a href="#promisify">Promisify</a></li>
          <li><a href="#promisify-all">Promisify All</a></li>
          <li><a href="#method">Method</a></li>
        </ul>
      </li>
      <li><a href="#race">Race</a></li>
      <li><a href="some">Some</a></li>
      <li><a href="#any">Any</a></li>
      <li><a href="#spread">Spread</a></li>
    </ul>
  </li>
  <li><a href="#known-issues">Known Issues</a></li>
  <li><a href="#release-history">Release History</a></li>
</ul>

# Interface

## Include

```javascript
var Promish = require('promish');
```

## Instantiation

### Typical use - construct with handler function

```javascript
var promise = new Promish(function(resolve, reject) {
  // do something async
});
```

### 3rd Party Wrapper Mode

```javascript
var promise = new Promish(Q());

var promise = new Promish(new Promise( ... ));
```

### Value Wrapper Mode
```javascript
// If the constructor value is not a function, a thenable or an Error,
// assume it should be a resolve value.
var promise = new Promish('Resolve Value');

// To explicitly signal resolve, use Promish.resolve
var promise = Promish.resolve('Resolve Value');
```

### Error Wrapper Mode
```javascript
// If the constructor value is an Error type, it will be interpreted as rejection
var promise = new Promish(new Error('This promise is rejected'));

// To explicitly signal something is rejection use Promish.reject
var promise = Promish.reject('This is not an error object, but reject with it anyway')
```



## Then

```javascript
// typical use
promise
  .then(function(value) {
    // something async has completed with a value
    // here you can return a resolve value,
    // return a new Promish or throw an error (handled as rejection)
  });
  
// with onRejected...
promise.then(
  function(value) {
  },
  function(error) {
  });
```

## Catch

The catch function takes a catch handler that will be called when the promise state is rejected
 and is a more elegant way to handle errors than using the second then argument.

```javascript
// catch all
promise
  .catch(function(error) {
    // Something async has failed with an error.
    // Just like with then(), you can return a resolve value,
    // return a new Promish or throw a new error (handled as rejection)
    // You can also 'rethrow' the error by returning a new Promish
    // with the error
  });
```

Promishes also support Error type matching

```javascript
new Promish(function(resolve, reject) {
    resolve(JSON.parse(text));
  })
  .then(function(json) { ... })
  .catch(SyntaxError, function(error) {
    // only called if error is instanceof SyntaxError
  })
  .catch(function(error) {
    // will be called for other types of error
  });
```

And also support user supplied error match functions

```javascript
function isFooString(value) {
  return ((typeof value) === 'string') && (value.indexOf('foo') >= 0);
}

promise
  .then(function(value) { ... })
  .catch(isFooString, function(error) {
    // error is a string and contains 'foo'
  })
  .catch(function(error) {
    // called if the not a foo string
  });
```

## Finally

A finally handler will be called no matter what state the promise chain gets into.
 There are no arguments provided to the finally handler and the downstream promise state will depend on the handler code.
 Typically this will be resolved with the return value (e.g. undefined).

```javascript
// catch all
promise
  .then(function(value) { ... })
  .catch(function(error) { ... })
  .finally(function() {
    // clean stuff up
  })
```

## Delay

Pause for a number of milliseconds and then continue.
 The resolve value will be preserved.
 If the promish state is rejected, delay will not delay and will preserve the rejection error

```javascript
getAPromish()
  .delay(1000)
  .then(function(value) {
    // continue 1 second later
  })
  .catch(function(error) {
    // there was an error, process immediately
  });
```

## Defer

For compatability with the old Promise.defer() pattern...

```javascript
function readAFile(filename) {
  var deferred = Promish.defer();
  
  fs.readFile(filename, function(error, data) {
    if (error) {
      deferred.reject(error);
    } else {
      deferred.resolve(data);
    }
  });
  
  return deferred.promise;
}
```

## Promisification Calls

The majority of the old asynchronous Node methods follow a basic pattern where the last argument in a function
 is a callback function and the first argument of that callback function is used to signal errors -
 if the error argument is truthy, then the call failed and the value of the error will indicate why,
 otherwise the call succeeded.

Promisification involves converting the async pattern into promises - either on the fly or by wrapping functions,
 methods or even whole objects...

### Apply

```javascript
// Note: Promish.nfapply alias included for Q compatability
Promish.apply(fs.readFile, [filename])
  .then(function(data) {
    // oooh data!
  })
  .catch(function(error) {
    // handle failure
  });
```

### Call

```javascript
// Note: Promish.nfcall alias included for Q compatability
Promish.call(fs.readFile, filename)
  .then(function(data) {
    // oooh data!
  })
  .catch(function(error) {
    // handle failure
  });
```

### Post

```javascript
// call method of target with arguments inline
// Note: Promish.npost alias
Promish.invoke(target, value1, value2)
  .then(function(value) { ... });  
```

### Invoke

```javascript
// invoke method of target with array of arguments
// Note: Promish.ninvoke alias
Promish.invoke(target, [value1, value2])
  .then(function(value) { ... });  
```

### Promisify

Convert a function from async to promise for future use.

```javascript
var readFile = Promish.promisify(fs.readFile);

readFile(filename)
  .then(function(data) { ... })
```

### Promisify All

Promisify all the async methods of an object.

There are two modes supported:
* Proxy Mode (default)
  * Creates a separate object that contains promisified methods for each method of the target object. The methods typically have the same name
  * Note: ES6 Proxies eagerly awaited here!
* In-Place Mode
  * Adds promisified methods to the object, typically with a suffix to avoid colliding with the actual methods.

```javascript

// Proxy mode:
var fs = Promish.promisifyAll(require('fs'));
fs.readFile(filename)
  .then(function(data) { ... });

// In-Place Mode
var fs = Promish.promisifyAll(require('fs'), { inPlace: true, suffix: 'Async' });
fs.readFileAsync(filename)
  .then(function(data) { ... });

```

### Method

Wrap a synchronous function or method so that it always returns a promise

```javascript
var myFunc = Promish.method(function(value) {
  // can throw
  if (!value) throw new Error('Not zero!');
  
  // can return value
  if (value > 0) return value;
  
  // can return promish()
  return Promish.resolve(value);
});

myFunc(1234)
  .then(function(value) {
    // ...
  });

// also works as member functions
MyClass.prototype.func = Promish.method(function(value) {
  // this is what you think it is
  return this.value = value;
});

new MyClass(7).func
  .then(function(value) {
    // ...
  });

```

## All

Promish wraps the native implementation of all.

```javascript
Promish.all([getPromise1(), getPromise2()])
  .then(function(values) { ... });
```

## Race

Promish wraps the native implementation of race.

```javascript
Promish.race([promise1, promise2])
  .then(function(value) {
    // first promise to finish was a success
  })
  .catch(function(error) {
    // first promise to finish failed
  });
  
```

## Some

Resolve on first N successful promises or reject with array of errors.

```javascript
Promish.some([promise1, promise2, promise3], 2)
  .then(function(values) {
    // first 2 successful promises...
  })
  .catch(function(errors) {
    // at least 2 promises failed
  });
  
```

## Any

Resolve on first successful promise or reject with array of errors.

```javascript
Promish.any([promise1, promise2])
  .then(function(value) {
    // first successful promise...
  })
  .catch(function(errors) {
    // all promises failed
  });
  
```

## Spread

Convert a resolve value array into arguments

```javascript
Promish.all([getPromish1(), getPromish2(), getPromish3()])
  .spread(function(a,b,c) {
    // a === value from getPromish1
    // b === value from getPromish2
    // c === value from getPromish3
  });
```

Spread will also convert an array of promises into their resolved values
new Promish(function(resolve) {
    resolve([getPromish1(), getPromish2(), getPromish3()])
  })
  .spread(function(a,b,c) {
    // a === value from getPromish1
    // b === value from getPromish2
    // c === value from getPromish3
  });

# Known Issues

<ul>
    <li>TBD</li>
</ul>

# Release History

| Version | Changes |
| ------- | ------- |
| 0.0.1   | <ul><li>Initial Version</li></ul> |
| 0.0.2   | <ul><li><a href="#delay">Promish.delay()</li><li><a href="#defer">Promish.defer()</li></ul> |
| 0.0.3   | <ul><li><a href="#delay">Promish.delay()</li><li><a href="#defer">Promish.defer()</li><li><a href="#spread">Promish.spread()</li></ul> |
| 0.0.4   | <ul><li><a href="#apply">Promish.apply()</li><li><a href="#call">Promish.call()</li></ul> |
| 0.0.5   | <ul><li><a href="#promisification">Promishification</a></li></ul> |
| 0.0.6   | <ul><li>Bugfixes and Documentation</li></ul> |
| 4.2.2   | <ul><li>Updated for compatability with Node v4.<ul><li>Version number matches the version of Node I used when this was published</li><li>For compatability with older 0.x versions, specify Promish version 0.0.8 in your package.json</li></ul></li><li>Refactored to extend Promise instead of wrapping</li></ul> |
| 4.2.3   | <ul><li>Added implict Promish.all to spread</li></ul> |

