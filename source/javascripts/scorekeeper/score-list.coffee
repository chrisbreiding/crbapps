define ['react', 'jsx!./score-list-template', './list-mixin'],
(React, template, List)->

  React.createClass

    mixins: [List]

    render: template

    componentWillMount: ->
      @listName = 'scores'

    componentDidMount: ->
      @componentDidUpdate()

    componentDidUpdate: ->
      @addOrEditLastScore() if @props.edit

    addOrEditLastScore: ->
      lastScore = @props.scores[@props.scores.length - 1]
      score = if lastScore and !lastScore.score.trim()
        lastScore
      else
        @newScore()
      @edit score

    previousScore: (score)->
      index = @indexOf score
      @edit @props.scores[index - 1] if index > 0

    nextOrNewScore: (score)->
      nextScore = @props.scores[@indexOf(score) + 1]
      @edit(nextScore or @newScore()) if score.score.trim()

    newScore: ->
      score =
        id: @newId()
        score: ''
      @props.scores.push score
      score
