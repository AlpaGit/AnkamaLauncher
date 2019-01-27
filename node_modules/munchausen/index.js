module.exports = function (target, attribute, frozen) {
  return new Proxy(target, {
    get: function (target, name) {
      if (target[name]) {
        return target[name]
      }

      return target[attribute][name]
    },
    set: function (target, name, value) {
      if (frozen) {
        // Let it go... let it go...
        throw new Error('Cannot set, object is frozen')
      }

      if (target[attribute] && target[attribute][name]) {
        target[attribute][name] = value
      } else {
        target[name] = value
      }

      return true
    }
  })
}

