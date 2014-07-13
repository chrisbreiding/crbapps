LS_KEY = 'scorekeeper'

define ['react', 'jsx!./app-template', './util'], (React, template, util)->

  React.createClass

    render: template

    getInitialState: ->
      data = JSON.parse(localStorage[LS_KEY] or '{}')
      boards: data.boards or []

    save: util.debounce 300, (boards)->
      localStorage[LS_KEY] = JSON.stringify boards: boards
