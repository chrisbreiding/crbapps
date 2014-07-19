LS_KEY = 'scorekeeper'

debounce = (timeout, fn)->
  (args...)->
    context = this
    clearTimeout debounce.timeout
    debounce.timeout = setTimeout ->
      fn.call context, args...
    , timeout

define ['react', 'rsvp', './board-list'], (React, RSVP, BoardList)->

  React.createClass

    render: ->
      BoardList
        boards: @state.boards
        onUpdate: @update

    getInitialState: ->
      data = JSON.parse(localStorage[LS_KEY] or '{}')
      boards: data.boards or []

    update: (boards)->
      @save boards
      new RSVP.Promise (resolve)=>
        @setState boards: boards, resolve

    save: debounce 300, (boards)->
      localStorage[LS_KEY] = JSON.stringify boards: boards
