import React from 'react'
import Task from './Task'
import { Draggable } from 'react-beautiful-dnd'

function Column(props) {
  console.log(props.tasks)
  return (
    <div key={props.index}>
      <h3>{props.name}</h3>
      {
        props.tasks.map((task, index) =>
          <Draggable draggableId={task.id} index={index} >
            {(provided) =>
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Task task={task} index={index} id={task.id} />
                {provided.placeholder}
              </div>
            }
          </Draggable >
        )
      }
    </div>
  )
}

export default Column;