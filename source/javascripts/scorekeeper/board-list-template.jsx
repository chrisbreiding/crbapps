define(['react', './board'], function (React, Board) {
  return function () {
    var boards = this.props.boards.map(function (board) {
      return (
        <Board key={board.id}
               name={board.name}
               scores={board.scores}
               ref={'board' + board.id}
               onUpdate={this.update}
               onRemove={this.remove}
               onPreviousBoard={this.previousBoard}
               onNextBoard={this.nextBoard} />
      );
    }.bind(this));

    return (
      <div className="board-list">
        <div className="boards">
          {boards}
        </div>
        <button className="plus" onClick={this.newBoard}>+</button>
      </div>
    );
  };
});
