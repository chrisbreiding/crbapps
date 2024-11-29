define([], function() {
  var hasProp = {}.hasOwnProperty;

  return {
    events: {
      events: {},
      on: function(event, handler) {
        var base;
        if ((base = this.events)[event] == null) {
          base[event] = [];
        }
        return this.events[event].push(handler);
      },
      off: function(event) {
        return delete this.events[event];
      },
      trigger: function(event, arg) {
        var handler, handlers, i, len, results;
        handlers = this.events[event];
        if (handlers) {
          results = [];
          for (i = 0, len = handlers.length; i < len; i++) {
            handler = handlers[i];
            results.push(handler.call(this, arg));
          }
          return results;
        }
      }
    },
    extend: function(target, source) {
      var prop, results, value;
      results = [];
      for (prop in source) {
        if (!hasProp.call(source, prop)) continue;
        value = source[prop];
        results.push(target[prop] = value);
      }
      return results;
    }
  };
});
