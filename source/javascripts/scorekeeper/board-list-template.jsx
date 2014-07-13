define(['react', './board'], function (React, Board) {
  return function () {
    var boards = this.state.boards.map(function (board) {
      return (
        <Board key={board.id}
               name={board.name}
               scores={board.scores}
               onUpdate={this.updateBoard}
               onRemove={this.removeBoard} />
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
