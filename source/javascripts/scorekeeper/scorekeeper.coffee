boardTemplate = '
  <div class="board">
    <input type="text" placeholder="name..." tabindex="1" />
    <button class="close">&times;</button>
    <textarea class="score" placeholder="scores..." tabindex="2"></textarea>
    <div class="total">0</div>
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
      .on 'keyup', '.score', @calculateScore
      .on 'click', '.close', @remove

  calculateScore: (e) =>
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
