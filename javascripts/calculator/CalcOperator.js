(function(){define(["calculation"],function(t){var e;return e=function(){function e(t,e){this.value=t,this.type=null!=e?e:"op"}return e.prototype.process=function(){var e,n,u,l;return e=t.collection,n=t.result.type,l=this.value,u=this.type,e.length||e.push({value:"0",type:"num"}),n===u?e[e.length-1].value=l:e.push({value:l,type:u}),t.setResult(l,u)},e}()})}).call(this);