import React from 'react';
import AddTask from './AddTask';
import Task from './Task';
import { Draggable } from 'react-beautiful-dnd'

function Board(props) {
  return (
    <div className="outer-board" key={props.index}>
      <div className="board">
        <h3>{props.name}</h3>
        {props.name === "Not started" ?
          (props.addTask &&
            <div className="task">
              <AddTask onSubmit={props.onSubmit} onChange={props.handleChange} />
            </div>)
          : null
        }
        {props.tasks && props.tasks.map((task, key) =>
          <Draggable draggableId={task.id} index={key}>
            {(provided, snapshot) => (
              <div
                key={key}
                className="task"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <Task
                  task={task}
                  name={task.name}
                  // id={task.id}
                  // index={key}
                  checkList={task.checkList}
                  note={task.note}
                  // divKey={key}
                  handleClick={props.handleClick}
                  handleAddNotes={props.handleAddNotes}
                  handleAddChecklist={props.handleAddChecklist}
                />
              </div>
            )}
          </Draggable>
        )}
      </div>
    </div >
  )
}

export default Board;