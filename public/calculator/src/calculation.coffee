define ['calculator'], (calculator) ->

  result:
    value: '0'
    type: null

  collection: []

  reset: ->
    @result =
      value: '0'
      type: null

    @collection = []
    calculator.trigger 'result:change', '0'

  setResult: (value, type) ->
    # issue: will never be able to set properties to null
    @result =
      value: value || @result.value
      type: type || @result.type

    calculator.trigger 'result:change', @result.value

  calculate: ->
    coll = @collection

    return if !coll.length

    while coll.length > 1
        num1 = parseFloat(coll[0].value)
        operator = coll[1].value
        num2 = parseFloat(coll[2].value)

        coll[2].value = calculator.op[operator](num1, num2)
        coll.shift()
        coll.shift()

    @setResult coll[0].value, 'calc'
