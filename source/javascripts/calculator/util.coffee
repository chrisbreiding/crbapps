define [], ->
  events:
    events: {}
    on: (event, handler) ->
      @events[event] ?= []
      @events[event].push handler

    off: (event) ->
      delete @events[event]

    trigger: (event, arg) ->
      handlers = @events[event]

      if handlers
        handler.call(@, arg) for handler in handlers

  extend: (target, source) ->
    target[prop] = value for own prop, value of source