(function(){define(["app","calculator","calculation","CalcNumber","CalcOperator","CalcClear"],function(n,e,t,c,l,r){return n.controller("CalcCtrl",["$scope",function(n){return n.buttons=[new c("7"),new c("8"),new c("9"),new l("+"),new c("4"),new c("5"),new c("6"),new l("-"),new c("1"),new c("2"),new c("3"),new l("/"),new c("0"),new c("."),new r,new l("*")],n.buttonClick=function(n){return n.process()},n.calculate=function(){return t.calculate()},e.on("result:change",function(e){return n.result=e})}])})}).call(this);