define ['react', 'jsx!./board-template'], (React, template)->

  React.createClass

    render: template

    getInitialState: ->
      name: @props.name
      scores: @props.scores
      total: @total @props.scores

    total: (scores)->
      total = 0
      total += +score.score for score in scores when not isNaN(+score.score)
      total

    updateName: (e)->
      @setState name: e.target.value, => @save()

    updateScores: (scores)->
      state =
        scores: scores
        total: @total scores
      @setState state, => @save()

    remove: ->
      @props.onRemove id: @props.key

    save: ->
      @props.onUpdate
        id: @props.key
        name: @state.name
        scores: @state.scores
