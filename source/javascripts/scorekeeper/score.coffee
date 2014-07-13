define ['react', 'jsx!./score-template', 'jquery'], (React, template, $)->

  React.createClass

    render: template

    componentDidMount: ->
      @componentDidUpdate()

    componentDidUpdate: ->
      @edit() if @props.edit

    edit: (e)->
      e and e.stopPropagation()
      $(@refs.container.getDOMNode()).addClass('editing')
      $(@refs.score.getDOMNode()).focus()

    stopEditing: ->
      $(@refs.container.getDOMNode()).removeClass('editing')

    updateScore: (e)->
      @props.onUpdate
        id: @props.key
        score: e.target.value
      if e.keyCode is 13
        @props.onNext
          id: @props.key
          score: e.target.value

    remove: ->
      @props.onRemove id: @props.key
