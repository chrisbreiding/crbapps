(function(){define(["react","./util","./score-list"],function(s,e,r){return s.createClass({render:function(){var t,o;return o=e.scoresTotal(this.props.scores),t=null!=this.props.rank?"":" no-rank",s.DOM.div({className:"board"+t},s.DOM.input({ref:"name",className:"name",placeholder:"name...",tabIndex:"1",defaultValue:this.props.name,onKeyUp:this.updateName}),s.DOM.div({className:"rank"},s.DOM.span(null,this.props.rank)),s.DOM.button({className:"close",onClick:this.remove},s.DOM.span(null,"\xd7")),r({ref:"scoreList",scores:this.props.scores,onUpdate:this.updateScores,onPreviousBoard:this.previousBoard,onNextBoard:this.nextBoard}),s.DOM.div({className:"total"},s.DOM.span(null,o),s.DOM.button({onClick:this.clearScores},s.DOM.span(null,"\u229d"))))},componentDidMount:function(){return this.props.name.trim()?void 0:this.refs.name.getDOMNode().focus()},updateName:function(s){return this.props.name=s.target.value,this.save()},updateScores:function(s){return this.props.scores=s,this.save()},clearScores:function(){return this.props.scores=[],this.save()},remove:function(){return this.props.onRemove({id:this.props.key})},previousBoard:function(){return this.props.onPreviousBoard({id:this.props.key})},nextBoard:function(){return this.props.onNextBoard({id:this.props.key})},edit:function(){return this.refs.scoreList.edit()},save:function(){return this.props.onUpdate({id:this.props.key,name:this.props.name,scores:this.props.scores})}})})}).call(this);