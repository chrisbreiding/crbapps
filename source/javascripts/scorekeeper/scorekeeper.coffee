debounce = (timeout, fn)->
  (args...)->
    context = this
    clearTimeout debounce.timeout
    debounce.timeout = setTimeout ->
      fn.call context, args...
    , timeout

newId = (items)->
  ids = (item.id for item in items)
  return 0 unless ids.length
  Math.max(ids...) + 1

LS_KEY = 'scorekeeper'
ENTER_KEY_CODE = 13

boardTemplate = '
  <div class="board">
    <input class="name" type="text" placeholder="name..." tabindex="1" value="{{name}}" />
    <button class="close">&times;</button>
    <div class="scores"></div>
    <div class="total">0</div>
  </div>
'

scoreTemplate = '
  <div class="score">
    <input type="text" tabindex="2" value="{{score}}">
  </div>
'

$boards = $ '.boards'
$plus = $ '.plus'

class Score

  constructor: (props, @onUpdate, @onEntered)->
    @id = props.id
    @score = props.score or ''
    @$el = $ @template()
    @$input = @$el.find 'input'

    @bindEvents()

  template: ->
    scoreTemplate.replace '{{score}}', @score

  bindEvents: ->
    @$el
      .on 'keyup', @updateTotal
      .on 'click', @edit
      .on 'focus', 'input', @edit
      .on 'blur', 'input', @stopEditing

  edit: (e)=>
    e and e.stopPropagation()
    unless @editing
      @editing = true
      @$el.addClass 'editing'
      @$input.focus()

  stopEditing: =>
    @editing = false
    @$el.removeClass 'editing'

  updateTotal: (e)=>
    @score = $(e.target).val()
    @onUpdate()
    if e.keyCode is ENTER_KEY_CODE
      @onEntered this

  toJSON: ->
    id: @id
    score: @score


class Board

  constructor: (props, @onUpdate, @onRemove)->
    @id = props.id
    @name = props.name
    @scores = []

    @$el = $ @template()
    @$total = @$el.find '.total'
    @$scores = @$el.find '.scores'

    if props.scores and props.scores.length
      @addScore score for score in props.scores
    else
      @newScore()

    @bindEvents()
    @calculateTotal @scores

  template: ->
    boardTemplate
      .replace '{{name}}', @name
      .replace '{{scores}}', @scores

  remove: =>
    @$el.off().remove()
    @onRemove this

  bindEvents: ->
    @$el
      .on 'keyup', '.name', (e)=> @updateName $(e.target).val()
      .on 'click', '.scores', @editLastScore
      .on 'click', '.close', @remove

  updateName: (name)=>
    @name = name
    @onUpdate()

  newScore: =>
    @addScore id: newId(@scores)

  addScore: (props)->
    score = new Score props, @updateScore.bind(this), @editNextScore.bind(this)
    @scores.push score
    @$scores.append score.$el
    score

  updateScore: ->
    @calculateTotal()

  editNextScore: (score)->
    index = @scores.indexOf score
    nextScore = @scores[index + 1]
    if score.score.trim()
      (nextScore or @newScore).edit()

  editLastScore: =>
    lastScore = @scores[@scores.length - 1]
    if !lastScore.score.trim()
      lastScore.edit()
    else
      @newScore().edit()

  calculateTotal: =>
    total = 0
    total += +score.score for score in @scores when not isNaN(+score.score)

    @updateTotal total

  updateTotal: (score)->
    @onUpdate()
    @$total.text score

  toJSON: ->
    id: @id
    name: @name
    scores: @scores


class ScoreKeeper

  constructor: ->
    @bindEvents()

    @data = JSON.parse(localStorage[LS_KEY] or '{}')
    @boards = []

    if @data.boards and @data.boards.length
      @addBoard board for board in @data.boards
    else
      @newBoard()
      @newBoard()

  bindEvents: ->
    $plus.on 'click', @newBoard

  newBoard: =>
    @addBoard id: newId(@boards), name: '', scores: ''

  addBoard: (props)->
    board = new Board props, @save.bind(this), @removeBoard.bind(this)
    @boards.push board
    $boards.append board.$el

  removeBoard: (board)->
    index = @boards.indexOf board
    @boards.splice(index, 1) if index > -1
    @save()

  save: debounce 300, ->
    localStorage[LS_KEY] = JSON.stringify boards: @boards

$ ->
  new ScoreKeeper()
