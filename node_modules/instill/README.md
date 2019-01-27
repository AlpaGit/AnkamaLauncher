instill
========

![Logo](./logo.png)

The littlest dependency injection framework for Node.js.

API
---

### Usage

```javascript
const inject = require('instill')

inject(exports, {
  fs: require('fs')
})

exports.readAFile = function (...args) {
  this.modules.fs.readFile(...args)
}
```

You then have essentially two options:

  * `use`: This will change a dependency in the current module instance. Useful for
     injecting configuration-based dependencies. This affect all other parts of the
     code using this module.

  * `with`: Creates a copy of the current module. Useful for testing.

Example:

```javascript
describe('testing', function () {
  require('logger').use('winston', ...)

  it('test readAFile', function (done) {
    require('myModule').with({
      fs: require('mock-fs').fs({
        myFile: 'some content'
      })
    }, function (myModuleCopy) {
      myModuleCopy.readAFile('myFile', done)
    })
  })
})
```

This will:

  1. Mock winston in the logger. All other modules using the logger module will be affected.
  2. Get a copy of myModule, and test it.

### Instanciating objects

The only drawback of this library is that you will need to change how objects get
instanciated. If you do not like it, well... I understand. It's OK.

First, you will need to register your classes, like so:

```javascript
inject(exports, {
  fs: require('fs')
}, {
  SomeClass,
  SomeOtherClass
})
```

Then, to create an instance of registered classes:

```javascript
  const someObject = myModule.instanciate('SomeClass', 1, 2, 3)
```

TODO
----

- [ ] Test suite, linting, etc.
- [ ] Maybe support AOP?

License
-------

MIT
