import React from 'react';

function Board(props) {
  return (
    <div className="board">
      <h3>{props.name}</h3>
      {props.tasks && props.tasks.map(task =>
        <div>
          <p>{task.name}</p>
        </div>)}
    </div>
  )
}

export default Board;