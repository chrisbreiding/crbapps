(function(){define(["calculator"],function(t){return{result:{value:"0",type:null},collection:[],reset:function(){return this.result={value:"0",type:null},this.collection=[],t.trigger("result:change","0")},setResult:function(e,l){return this.result={value:e||this.result.value,type:l||this.result.type},t.trigger("result:change",this.result.value)},calculate:function(){var e,l,u,r;if(e=this.collection,e.length){for(;e.length>1;)l=parseFloat(e[0].value),r=e[1].value,u=parseFloat(e[2].value),e[2].value=t.op[r](l,u),e.shift(),e.shift();return this.setResult(e[0].value,"calc")}}}})}).call(this);