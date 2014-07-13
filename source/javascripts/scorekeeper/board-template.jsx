define(['react', './score-list'], function (React, ScoreList) {
  return function () {
    return (
      <div className="board">
        <input className="name"
               type="text"
               placeholder="name..."
               tabIndex="1"
               defaultValue={this.props.name}
               onKeyUp={this.updateName} />
        <button className="close" onClick={this.remove}>
          <span>&times;</span>
        </button>
        <ScoreList scores={this.props.scores} onUpdate={this.updateScores} />
        <div className="total">
          <span>{this.state.total}</span>
        </div>
      </div>
    );
  };
});
