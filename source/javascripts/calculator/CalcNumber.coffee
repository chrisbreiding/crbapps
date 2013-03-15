define ['calculation'], (calculation) ->

  class CalcNumber

    constructor: (@value, @type = 'num') ->

    process: ->
      cC = calculation.collection
      prevType = calculation.result.type
      value = @value
      type = @type

      if @value == '.'
        if cC.length > 1 &&
        /\./.test(cC[cC.length - 1].value) &&
        prevType != 'calc'
          return

        if !prevType || prevType == 'calc'
          value = '0.'
          type = 'num'

      if prevType == 'calc'
        cC[0].value = value
      else if prevType == type
        value = cC[cC.length - 1].value = cC[cC.length - 1].value + value
      else
        cC.push( value: value, type: type )

      calculation.setResult value, type
