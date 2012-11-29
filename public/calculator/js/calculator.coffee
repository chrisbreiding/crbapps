Events =
  events: {}
  on: (event, handler) ->
    @events[event] ?= []
    @events[event].push handler

  off: (event) ->
    delete @events[event]

  trigger: (event, arg) ->
    handlers = @events[event]

    if handlers
      handler.call(@, arg) for handler in handlers


extend = (target, source) ->
  target[prop] = value for own prop, value of source


calculator =
  ACCURACY: 1000
  op:
    '+': (a, b) ->
      (a * calculator.ACCURACY + b * calculator.ACCURACY) / calculator.ACCURACY
    '-': (a, b) ->
      (a * calculator.ACCURACY - b * calculator.ACCURACY) / calculator.ACCURACY
    '*': (a, b) ->
      ((a * calculator.ACCURACY) * (b * calculator.ACCURACY)) / (calculator.ACCURACY * calculator.ACCURACY)
    '/': (a, b) ->
      (a * calculator.ACCURACY) / (b * calculator.ACCURACY)

extend calculator, Events


class calculator.Calculation

  constructor: ->
    @reset()

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


class calculator.Number

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


class calculator.Operator

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



class calculator.Clear

  constructor: (@value = 'C', @type = 'op') ->

  process: ->
    calculation.reset()


calculation = new calculator.Calculation()


calculatorApp = angular.module 'calculatorApp', []

calculatorApp.controller 'CalcCtrl', ($scope) ->

  $scope.buttons = [
    new calculator.Number('7')
    new calculator.Number('8')
    new calculator.Number('9')
    new calculator.Operator('+')
    new calculator.Number('4')
    new calculator.Number('5')
    new calculator.Number('6')
    new calculator.Operator('-')
    new calculator.Number('1')
    new calculator.Number('2')
    new calculator.Number('3')
    new calculator.Operator('/')
    new calculator.Number('0')
    new calculator.Number('.')
    new calculator.Clear()
    new calculator.Operator('*' )
  ]

  $scope.buttonClick = (button) ->
    button.process()

  $scope.calculate = ->
    calculation.calculate()

  calculator.on 'result:change', (result) ->
    $scope.result = result


# TODO
# - add tests
# - add ability to continually hit = and repeat last action
# - add ERROR display when dividing by 0, and handle next interaction
# - break out into multiple files and use require.js
