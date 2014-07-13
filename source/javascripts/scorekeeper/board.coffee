define ['react', 'jsx!./board-template', 'lodash'], (React, template, _)->

  React.createClass

    render: template

    getInitialState: ->
      total: @total @props.scores

    total: (scores)->
      total = 0
      total += +score.score for score in scores when not isNaN(+score.score)
      total

    updateName: (e)->
      @props.name = e.target.value
      @save()

    updateScores: (scores)->
      @setState total: @total scores
      @props.scores = scores
      @save()

    remove: ->
      @props.onRemove id: @props.key

    save: (props)->
      @props.onUpdate
        id: @props.key
        name: @props.name
        scores: @props.scores
