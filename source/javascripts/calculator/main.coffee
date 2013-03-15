'use strict'

require.config
  paths:
    angular: '../vendor/angular'
  shim:
    angular:
      exports: 'angular'


require [
  'angular'
  'app'
  'util'
  'calculator'
  'calculation'
  'CalcNumber'
  'CalcOperator'
  'CalcClear'
  'CalcCtrl'
], (angular) ->

  angular.bootstrap document, ['calculatorApp']


# TODO
# - add tests
# - add ability to continually hit = and repeat last action
# - add ERROR display when dividing by 0, and handle next interaction
# - break out into multiple files and use require.js
