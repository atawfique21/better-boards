import React from 'react';
import AddTask from './AddTask';
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'

function Board(props) {
  return (
    <div className="outer-board">
      <div className="board">
        <h3>{props.name}</h3>
        {props.name === "Not started" ?
          (props.addTask &&
            <div className="task">
              <AddTask onSubmit={props.onSubmit} onChange={props.handleChange} />
            </div>)
          : null}
        {props.tasks && props.tasks.map((task, key) =>
          <Task
            task={task}
            name={task.name}
            id={task.id}
            checkList={task.checkList}
            note={task.note}
            divKey={key}
            handleClick={props.handleClick}
          />
        )}
      </div>
    </div >
  )
}

export default Board;