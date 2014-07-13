define(['react', './board'], function (React, Board) {
  return function () {
    var boards = this.props.boards.map(function (board) {
      return (
        <Board key={board.id}
               name={board.name}
               scores={board.scores}
               edit={board.edit}
               onUpdate={this.updateBoard}
               onRemove={this.removeBoard}
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
