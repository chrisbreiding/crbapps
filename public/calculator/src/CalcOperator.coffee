define ['calculation'], (calculation) ->

  class CalcOperator

    constructor: (@value, @type = 'op') ->

    process: ->
      cC = calculation.collection
      prevType = calculation.result.type
      value = @value
      type = @type

      cC.push( value: '0', type: 'num' ) if !cC.length

      if prevType == type
        cC[cC.length - 1].value = value
      else
        cC.push( value: value, type: type )

      calculation.setResult value, type
