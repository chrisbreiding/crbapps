define(['react'], function (React) {
  return function () {
    return (
      <div className="score" onClick={this.edit} ref="container">
        <input type="text"
               tabIndex="2"
               ref="score"
               defaultValue={this.state.score}
               onKeyUp={this.updateScore}
               onFocus={this.edit}
               onBlur={this.stopEditing} />
        <button onClick={this.remove}>&times;</button>
      </div>
    );
  };
});
