boardTemplate = '
  <div class="scoreboard">
    <form>
      <input type="text" />
      <textarea class="score"></textarea>
    </form>
    <div class="total"></div>
    <a href="#" class="close">-</a>
  </div>
'

$plus = $('#plus')


class Board

  constructor: ->
    @$el = $(boardTemplate)

    @.add()
    @.bindEvents()

  add: ->
    $plus.before @$el

  remove: (e) =>
    e.preventDefault()
    @$el.remove()

  bindEvents: ->
    @$el
      .on('keypress', '.score', @.calculateScore)
      .on('click', '.close', @.remove)

  calculateScore: (e) =>
    if e.keyCode is 13
      content = $(e.target).val()
      scores = content.split("\n")
      total = 0

      total += +score for score in scores when not isNaN(+score)

      @.updateScore(total)

  updateScore: (score) ->

    @$el.find('.total').text(score)


class ScoreKeeper

  constructor: ->
    @.addBoard()
    @.addBoard()
    @.bindEvents()

  bindEvents: ->
    $('body').on('submit', 'form', @.formSubmit)
    $plus.on('click', @.addBoard)

  formSubmit: (e) ->
    e.preventDefault()

  addBoard: (e) =>
    e.preventDefault() if e
    new Board()


$ ->
  new ScoreKeeper()
