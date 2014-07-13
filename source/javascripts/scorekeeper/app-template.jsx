define(['react', './board-list'], function (React, BoardList) {
  return function () {
    return (
      <BoardList boards={this.state.boards} onUpdate={this.update} />
    );
  };
});
