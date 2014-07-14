TAB_KEY = 9
ENTER_KEY = 13
UP_KEY = 38
DOWN_KEY = 40

define ['react', 'jsx!./score-template'], (React, template)->

  React.createClass

    render: template

    edit: (e)->
      e and e.stopPropagation()
      @refs.container.getDOMNode().className = 'score editing'
      @refs.score.getDOMNode().focus()

    stopEditing: ->
      @refs.container.getDOMNode().className = 'score'

    keyDown: (e)->
      return unless e.keyCode is TAB_KEY

      e.preventDefault()
      if e.shiftKey
        @props.onPreviousBoard()
      else
        @props.onNextBoard()

    keyUp: (e)->
      score = e.target.value
      @props.onUpdate
        id: @props.key
        score: score

      switch e.keyCode
        when UP_KEY
          @previousScore score
        when ENTER_KEY, DOWN_KEY
          @nextScore score

    previousScore: (score)->
      @props.onPrevious
        id: @props.key
        score: score

    nextScore: (score)->
      @props.onNext
        id: @props.key
        score: score

    remove: ->
      @props.onRemove id: @props.key
