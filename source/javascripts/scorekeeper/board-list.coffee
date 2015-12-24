define ['react', 'lodash', './util', './list-mixin', './board'], (React, _, util, List, Board)->

  React.createClass

    mixins: [List]

    render: ->
      rankings = @_rankings()
      shouldRank = !(rankings.length is 1 and !rankings[0])

      React.DOM.div
        className: 'board-list'
      ,
        React.DOM.div
          className: 'boards'
        ,
          @props.boards.map (board)=>
            Board
              key: board.id
              name: board.name
              rank: if shouldRank then @_rankForBoard(rankings, board) else null
              scores: board.scores
              ref: "board#{board.id}"
              onUpdate: @update
              onRemove: @remove
              onPreviousBoard: @previousBoard
              onNextBoard: @nextBoard
      ,
        React.DOM.button
          className: 'plus'
          onClick: @newBoard
        ,
          '+'

    componentWillMount: ->
      @listName = 'boards'

    _rankings: ->
      _(@props.boards)
        .map (board)-> util.scoresTotal board.scores
        .unique()
        .sortBy (a, b)-> b - a
        .value()

    _rankForBoard: (rankings, board) ->
      1 + _.findIndex rankings, (ranking)->
        ranking is util.scoresTotal(board.scores)

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

    edit: (board)->
      @refs["board#{board.id}"].edit()
