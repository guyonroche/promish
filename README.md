# Promish

```javascript
     SH
      I
P R O M
```

The Promish module creates a wrapper around the EcmaScript 6 Promise class.
 It adds some of the useful features found in many of the other popular promise libraries such as Q and Bluebird.
 It is designed to be interchangeable with the ES6 Promise as its interface is a superset of the Promise class.

# Installation

npm install promish

# New Features!

<ul>
    <li><a href="#nfapply">Promish.nfapply()</li>
    <li><a href="#nfcall">Promish.nfcall()</li>
</ul>

# Backlog

<ul>
    <li>TBD</li>
</ul>

# Contents

<ul>
    <li>
        <a href="#interface">Interface</a>
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
```

### Value Wrapper Mode
```javascript
var promise = new Promish('Resolve Value');
```

### Error Wrapper Mode
```javascript
var promise = new Promish(new Error('This promise is rejected'));
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

```javascript
// catch all
promise
  .catch(function(error) {
    // Something async has failed with an error.
    // Just like with then(), you can return a resolve value,
    // return a new Promish or throw a new error (handled as rejection)
    // You can also 'rethrow' the error by returning a new Promish with the error
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

## Spread

```javascript
Promish.all(getPromish1(), getPromish2(), getPromish3())
  .spread(function(value1, value2, value3) {
    // use values...
  });
```

## Nfapply

Simple promisification of standard async methods

```javascript
Promish.nfapply(fs.readFile, [filename])
  .then(function(data) {
    // oooh data!
  })
  .catch(function(error) {
    // handle failure
  });
```

## Nfcall

Simple promisification of standard async methods

```javascript
Promish.nfcall(fs.readFile, filename)
  .then(function(data) {
    // oooh data!
  })
  .catch(function(error) {
    // handle failure
  });
```


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
| 0.0.4   | <ul><li><a href="#nfapply">Promish.nfapply()</li><li><a href="#nfcall">Promish.nfcall()</li></ul> |