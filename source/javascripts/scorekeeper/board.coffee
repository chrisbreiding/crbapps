define ['react', 'jsx!./board-template', 'lodash'], (React, template, _)->

  React.createClass

    render: template

    componentDidMount: ->
      if !@props.name.trim()
        @refs.name.getDOMNode().focus()

    updateName: (e)->
      @props.name = e.target.value
      @save()

    updateScores: (scores)->
      @props.scores = scores
      @save()

    clearScores: ->
      @props.scores = []
      @save()

    remove: ->
      @props.onRemove id: @props.key

    previousBoard: ->
      @props.onPreviousBoard id: @props.key

    nextBoard: ->
      @props.onNextBoard id: @props.key

    edit: ->
      @refs.scoreList.edit()

    save: ->
      @props.onUpdate
        id: @props.key
        name: @props.name
        scores: @props.scores
