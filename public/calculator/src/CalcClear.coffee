define ['calculation'], (calculation) ->

  class CalcClear

    constructor: (@value = 'C', @type = 'op') ->

    process: ->
      calculation.reset()
