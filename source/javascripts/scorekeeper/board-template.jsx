define(['react', './score-list'], function (React, ScoreList) {
  return function () {
    var total = this.props.scores.reduce(function (total, score) {
      if (!isNaN(+score.score)) total += +score.score;
      return total;
    }, 0);

    return (
      <div className="board">
        <input className="name"
               type="text"
               ref="name"
               placeholder="name..."
               tabIndex="1"
               defaultValue={this.props.name}
               onKeyUp={this.updateName} />
        <button className="close" onClick={this.remove}>
          <span>&times;</span>
        </button>
        <ScoreList scores={this.props.scores}
                   ref="scoreList"
                   onUpdate={this.updateScores}
                   onPreviousBoard={this.previousBoard}
                   onNextBoard={this.nextBoard} />
        <div className="total">
          <span>{total}</span>
          <button onClick={this.clearScores}>
            <span>&#8861;</span>
          </button>
        </div>
      </div>
    );
  };
});
