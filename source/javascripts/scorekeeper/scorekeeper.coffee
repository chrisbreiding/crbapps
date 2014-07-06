boardTemplate = '
  <div class="scoreboard">
    <input type="text" />
    <textarea class="score"></textarea>
    <div class="total"></div>
    <button class="close">-</button>
  </div>
'

$boards = $ '.boards'
$plus = $ '.plus'


class Board

  constructor: ->
    @$el = $ boardTemplate
    @bindEvents()

  add: ->
    $boards.append @$el

  remove: =>
    @$el.off().remove()

  bindEvents: ->
    @$el
      .on 'keypress', '.score', @calculateScore
      .on 'click', '.close', @remove

  calculateScore: (e) =>
    if e.keyCode is 13
      scores = $(e.target).val().split '\n'
      total = 0
      total += +score for score in scores when not isNaN(+score)

      @updateScore total

  updateScore: (score) ->
    @$el.find('.total').text score


class ScoreKeeper

  constructor: ->
    @addBoard()
    @addBoard()
    @bindEvents()

  bindEvents: ->
    $plus.on 'click', @addBoard

  addBoard: =>
    new Board().add()


$ ->
  new ScoreKeeper()
