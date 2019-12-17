import React from 'react';
import AddTask from './AddTask';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

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
          < Droppable droppableId={props.id} >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Task
                  task={task}
                  name={task.name}
                  id={task.id}
                  index={key}
                  checkList={task.checkList}
                  note={task.note}
                  divKey={key}
                  handleClick={props.handleClick}
                  handleAddNotes={props.handleAddNotes}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}

      </div>
    </div >
  )
}

export default Board;