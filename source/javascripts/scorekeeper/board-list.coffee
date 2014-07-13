define ['react', 'jsx!./board-list-template', 'lodash', './util'],
(React, template, _, util)->

  React.createClass

    render: template

    newBoard: ->
      @props.boards.push
        id: util.newId @props.boards
        name: ''
        scores: []
      @save()

    updateBoard: (board)->
      @replaceBoard board, board

    removeBoard: (board)->
      @replaceBoard board

    replaceBoard: (board, replacement)->
      index = _.findIndex @props.boards, (b)-> b.id is board.id
      if index > -1
        args = [index, 1]
        args.push replacement if replacement
        @props.boards.splice args...
        @save()

    previousBoard: (board)->
      index = _.findIndex @props.boards, (b)-> b.id is board.id
      if index > -1
        previousIndex = index - 1
        previousIndex = @props.boards.length - 1 if previousIndex < 0
        @editBoard @props.boards[previousIndex]

    nextBoard: (board)->
      index = _.findIndex @props.boards, (b)-> b.id is board.id
      if index > -1
        nextIndex = index + 1
        nextIndex = 0 if nextIndex > @props.boards.length - 1
        @editBoard @props.boards[nextIndex]

    editBoard: (board)->
      board.edit = true
      @updateBoard(board).then =>
        board.edit = false
        @updateBoard board

    save: ->
      @props.onUpdate @props.boards
