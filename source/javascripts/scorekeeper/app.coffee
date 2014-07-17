LS_KEY = 'scorekeeper'

define ['react', './app-template', 'lodash', 'rsvp'],
(React, template, _, RSVP)->

  React.createClass

    render: template

    getInitialState: ->
      data = JSON.parse(localStorage[LS_KEY] or '{}')
      boards: data.boards or []

    update: (boards)->
      @save boards
      new RSVP.Promise (resolve)=>
        @setState boards: boards, resolve

    save: _.throttle (boards)->
      localStorage[LS_KEY] = JSON.stringify boards: boards
    , 300
