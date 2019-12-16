import React from 'react';

function Board(props) {
  return (
    <div className="outer-board">
      <div className="board">
        <h3>{props.name}</h3>
        {props.tasks && props.tasks.map((task, key) =>
          <div key={key} className="task">
            <p>{task.name}</p>
            {task.checkList && task.checkList.map((listItem, key) =>
              <div className="checklist" key={key}>
                <label><input type="checkbox" className="checkbox" />{listItem}</label>
              </div>
            )}
            {task.note &&
              <div className="note">
                <p>{task.note}</p>
              </div>
            }
          </div>)}
      </div>
    </div>
  )
}

export default Board;