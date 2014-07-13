define ['react', 'jsx!./board-list-template', './util'], (React, template, util)->

  React.createClass

    render: template

    getInitialState: ->
      boards: @props.boards

    newBoard: ->
      @state.boards.push
        id: util.newId @state.boards
        name: ''
        scores: []
      @setState boards: @state.boards, => @save()

    updateBoard: (board)->
      @replaceBoard board, board

    removeBoard: (board)->
      @replaceBoard board

    replaceBoard: (board, replacement)->
      index = util.findIndex @state.boards, (b)-> b.id is board.id
      if index > -1
        args = [index, 1]
        args.push replacement if replacement
        @state.boards.splice args...
        @setState boards: @state.boards, => @save()

    save: ->
      @props.onUpdate @state.boards
