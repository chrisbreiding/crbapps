define(['react'], function (React) {
  return function () {
    return (
      <div className="score" onClick={this.edit} ref="container">
        <input type="text"
               tabIndex="-1"
               ref="score"
               defaultValue={this.props.score}
               onKeyDown={this.keyDown}
               onKeyUp={this.keyUp}
               onFocus={this.edit}
               onBlur={this.stopEditing} />
        <button onClick={this.remove}>&times;</button>
      </div>
    );
  };
});
