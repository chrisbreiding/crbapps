(function(){define(["react"],function(e){return e.createClass({render:function(){return e.DOM.div({ref:"container",className:"score",onClick:this.edit},e.DOM.input({ref:"score",type:"number",tabIndex:"-1",defaultValue:this.props.score,onKeyDown:this.keyDown,onKeyUp:this.keyUp,onFocus:this.edit,onBlur:this.stopEditing}),e.DOM.button({onClick:this.remove},"\xd7"))},edit:function(e){return e&&e.stopPropagation(),this.refs.container.getDOMNode().className="score editing",this.refs.score.getDOMNode().focus()},stopEditing:function(){return this.refs.container.getDOMNode().className="score"},keyDown:function(e){return"Tab"===e.key?(e.preventDefault(),e.shiftKey?this.props.onPreviousBoard():this.props.onNextBoard()):void 0},keyUp:function(e){var t;switch(t=e.target.value,this.props.onUpdate({id:this.props.key,score:t}),e.key){case"ArrowUp":return this.previousScore(t);case"Enter":case"ArrowDown":return this.nextScore(t)}},previousScore:function(e){return this.props.onPrevious({id:this.props.key,score:e})},nextScore:function(e){return this.props.onNext({id:this.props.key,score:e})},remove:function(){return this.props.onRemove({id:this.props.key})}})})}).call(this);