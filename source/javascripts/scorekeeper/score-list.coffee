define ['react', 'jsx!./score-list-template', './util'], (React, template, util)->

  React.createClass

    render: template

    getInitialState: ->
      scores: this.props.scores

    addOrEditLastScore: ->
      lastScore = @state.scores[@state.scores.length - 1]
      if lastScore and !lastScore.score.trim()
        lastScore.edit = true
        @updateScore lastScore
      else
        @editNewScore()

      @setState scores: @state.scores, => @save()

    nextOrNewScore: (score)->
      index = util.findIndex @state.scores, (s)-> s.id is score.id
      nextScore = @state.scores[index + 1]
      if score.score.trim()
        if nextScore
          nextScore.edit = true
          @updateScore nextScore
        else
          @editNewScore()

    editNewScore: ->
      @state.scores.push
        id: util.newId @state.scores
        score: ''
        edit: true

    didEdit: (score)->
      @updateScore score

    updateScore: (score)->
      @replaceScore score, score

    removeScore: (score)->
      @replaceScore score

    replaceScore: (score, replacement)->
      index = util.findIndex @state.scores, (s)-> s.id is score.id
      if index > -1
        args = [index, 1]
        args.push replacement if replacement
        @state.scores.splice args...
        @setState scores: @state.scores, => @save()

    save: ->
      @props.onUpdate @state.scores
