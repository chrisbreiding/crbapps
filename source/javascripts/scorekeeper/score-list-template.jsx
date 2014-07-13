define(['react', './score'], function (React, Score) {
  return function () {
    var scores = this.state.scores.map(function (score) {
      return (
        <Score key={score.id}
               score={score.score}
               edit={score.edit}
               didEdit={this.didEdit}
               onNext={this.nextOrNewScore}
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
