import React from 'react';
import AddTask from './AddTask';
import Task from './Task';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

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
          <Draggable draggableId={task.id} index={key} key={task.id}>
            {(provided, snapshot) => (
              <Container
                key={task.id}
                className="task"
                id={task.id}
                onClick={(e) => props.onTaskClick(e, task.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
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
                  handleNoteSubmit={props.handleNoteSubmit}
                  noteValue={task.note}
                  addNoteBoolean={props.addNoteBoolean}
                />
              </Container>
            )}
          </Draggable>
        )}
      </div>
    </div >
  )
}

export default Board;