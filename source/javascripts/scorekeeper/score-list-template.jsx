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
               onUpdate={this.update}
               onRemove={this.remove} />
      );
    }.bind(this));
    return (
      <div className="scores" onClick={this.addOrEditLastScore}>
        {scores}
      </div>
    );
  };
});
