define ['react', 'jsx!./board-list-template', './list-mixin'],
(React, template, List)->

  React.createClass

    mixins: [List]

    render: template

    componentWillMount: ->
      @listName = 'boards'

    newBoard: ->
      @props.boards.push
        id: @newId()
        name: ''
        scores: []
      @save()

    previousBoard: (board)->
      @moveToBoard board, (index)=>
        if index - 1 < 0 then @props.boards.length - 1 else index - 1

    nextBoard: (board)->
      @moveToBoard board, (index)=>
        if index + 1 > @props.boards.length - 1 then 0 else index + 1

    moveToBoard: (board, moveToIndex)->
      index = @indexOf board
      @edit @props.boards[moveToIndex index] if index > -1
