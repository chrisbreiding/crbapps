define ['react', 'jsx!./score-list-template', 'lodash', './util'], (React, template, _, util)->

  React.createClass

    render: template

    addOrEditLastScore: ->
      lastScore = @props.scores[@props.scores.length - 1]
      score = if lastScore and !lastScore.score.trim()
        lastScore
      else
        @newScore()
      @editScore score

    nextOrNewScore: (score)->
      index = _.findIndex @props.scores, (s)-> s.id is score.id
      nextScore = @props.scores[index + 1]
      if score.score.trim()
        @editScore(nextScore or @newScore())

    newScore: ->
      score =
        id: util.newId @props.scores
        score: ''
      @props.scores.push score
      score

    editScore: (score)->
      score.edit = true
      @updateScore(score).then =>
        score.edit = false
        @updateScore score

    updateScore: (score)->
      @replaceScore score, score

    removeScore: (score)->
      @replaceScore score

    replaceScore: (score, replacement)->
      index = _.findIndex @props.scores, (s)-> s.id is score.id
      if index > -1
        args = [index, 1]
        args.push replacement if replacement
        @props.scores.splice args...
        @save()

    save: ->
      @props.onUpdate @props.scores
