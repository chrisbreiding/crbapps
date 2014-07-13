define(['react', './score'], function (React, Score) {
  return function () {
    var scores = this.props.scores.map(function (score) {
      return (
        <Score key={score.id}
               score={score.score}
               edit={score.edit}
               onPrevious={this.previousScore}
               onNext={this.nextOrNewScore}
               onPreviousBoard={this.props.onPreviousBoard}
               onNextBoard={this.props.onNextBoard}
               onUpdate={this.updateScore}
               onRemove={this.removeScore} />
      );
    }.bind(this));
    return (
      <div className="scores" onClick={this.addOrEditLastScore}>
        {scores}
      </div>
    );
  };
});
