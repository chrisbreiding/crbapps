define [
  'app'
  'calculator'
  'calculation'
  'CalcNumber'
  'CalcOperator'
  'CalcClear'
], (app, calculator, calculation, CalcNumber, CalcOperator, CalcClear) ->

  app.controller 'CalcCtrl', [ '$scope', ($scope) ->

    $scope.buttons = [
      new CalcNumber('7')
      new CalcNumber('8')
      new CalcNumber('9')
      new CalcOperator('+')
      new CalcNumber('4')
      new CalcNumber('5')
      new CalcNumber('6')
      new CalcOperator('-')
      new CalcNumber('1')
      new CalcNumber('2')
      new CalcNumber('3')
      new CalcOperator('/')
      new CalcNumber('0')
      new CalcNumber('.')
      new CalcClear()
      new CalcOperator('*' )
    ]

    $scope.buttonClick = (button) ->
      button.process()

    $scope.calculate = ->
      calculation.calculate()

    calculator.on 'result:change', (result) ->
      $scope.result = result

  ]
