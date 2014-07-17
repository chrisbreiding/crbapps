define ['react', './score-list-template', './list-mixin'],
(React, template, List)->

  React.createClass

    mixins: [List]

    render: template

    componentWillMount: ->
      @listName = 'scores'

    edit: ->
      lastScore = @props.scores[@props.scores.length - 1]
      if lastScore and !lastScore.score.trim()
        @editScore lastScore
      else
        @editNewScore()

    editScore: (score)->
      @refs["score#{score.id}"].edit()

    previousScore: (score)->
      index = @indexOf score
      @editScore @props.scores[index - 1] if index > 0

    nextOrNewScore: (score)->
      nextScore = @props.scores[@indexOf(score) + 1]
      if score.score.trim()
        if nextScore
          @editScore nextScore
        else
          @editNewScore()

    editNewScore: ->
      @addScore().then (score)=> @editScore score

    addScore: ->
      score =
        id: @newId()
        score: ''
      @props.scores.push score
      @save().then -> score
