require.config({
  paths: {
    angular: '../../vendor/angular'
  },
  shim: {
    angular: {
      exports: 'angular'
    }
  }
});

require([
  'angular',
  'app',
  'util',
  'calculator',
  'calculation',
  'CalcNumber',
  'CalcOperator',
  'CalcClear',
  'CalcCtrl'
], function(angular) {
  return angular.bootstrap(document, ['calculatorApp']);
});
