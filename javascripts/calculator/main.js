(function(){"use strict";require.config({paths:{angular:"../vendor/angular"},shim:{angular:{exports:"angular"}}}),require(["angular","app","util","calculator","calculation","CalcNumber","CalcOperator","CalcClear","CalcCtrl"],function(a){return a.bootstrap(document,["calculatorApp"])})}).call(this);