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

    save: ->
      @props.onUpdate @props.boards
