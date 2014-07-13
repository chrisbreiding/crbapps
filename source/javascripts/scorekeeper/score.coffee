define ['react', 'jsx!./score-template', 'jquery'], (React, template, $)->

  React.createClass

    render: template

    getInitialState: ->
      score: @props.score

    componentDidUpdate: ->
      if @props.edit
        @edit()
        @props.didEdit
          id: @props.key
          score: @state.score

    edit: (e)->
      e and e.stopPropagation()
      $(@refs.container.getDOMNode()).addClass('editing')
      $(@refs.score.getDOMNode()).focus()

    stopEditing: ->
      $(@refs.container.getDOMNode()).removeClass('editing')

    updateScore: (e)->
      @setState score: e.target.value, =>
        @props.onUpdate
          id: @props.key
          score: @state.score
      if e.keyCode is 13
        @props.onNext
          id: @props.key
          score: @state.score

    remove: ->
      @props.onRemove id: @props.key
