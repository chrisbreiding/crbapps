debounce = (timeout, fn)->
  (args...)->
    context = this
    clearTimeout debounce.timeout
    debounce.timeout = setTimeout ->
      fn.call context, args...
    , timeout

LS_KEY = 'scorekeeper'

boardTemplate = '
  <div class="board">
    <input class="name" type="text" placeholder="name..." tabindex="1" value="{{name}}" />
    <button class="close">&times;</button>
    <textarea class="score" placeholder="scores..." tabindex="2">{{scores}}</textarea>
    <div class="total">0</div>
  </div>
'

$boards = $ '.boards'
$plus = $ '.plus'


class Board

  constructor: (props, @onUpdate, @onRemove)->
    @id = props.id
    @name = props.name
    @scores = props.scores

    @$el = $ @template()
    @bindEvents()
    @calculateScore @scores

  template: ->
    boardTemplate
      .replace '{{name}}', @name
      .replace '{{scores}}', @scores

  add: ->
    $boards.append @$el

  remove: =>
    @$el.off().remove()
    @onRemove this

  bindEvents: ->
    @$el
      .on 'keyup', '.name', (e)=> @updateName $(e.target).val()
      .on 'keyup', '.score', (e)=> @calculateScore $(e.target).val()
      .on 'click', '.close', @remove

  updateName: (name)=>
    @name = name
    @onUpdate()

  calculateScore: (scores)=>
    @scores = scores
    scores = scores.split '\n'
    total = 0
    total += +score for score in scores when not isNaN(+score)

    @updateScore total

  updateScore: (score)->
    @onUpdate()
    @$el.find('.total').text score

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
    @addBoard id: @newId(), name: '', scores: ''

  addBoard: (props)->
    board = new Board props, @save.bind(this), @removeBoard.bind(this)
    @boards.push board
    board.add()

  removeBoard: (board)->
    for b, index in @boards
      if b.id is board.id
        @boards.splice(index, 1)
        break
    @save()

  newId: ->
    ids = (board.id for board in @boards)
    return 0 unless ids.length
    Math.max(ids...) + 1

  save: debounce 300, ->
    localStorage[LS_KEY] = JSON.stringify boards: @boards

$ ->
  new ScoreKeeper()
