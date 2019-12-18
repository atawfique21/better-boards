import React, { Component } from 'react';
import './App.css';
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      boards: [{
        name: "Not started",
        id: "column-1",
        tasks: [{
          name: "Automate Sprinkler",
          id: "task-1",
        },
        {
          name: "Replace yard lights",
          id: "task-2"
        },
        {
          name: "Spray tick killer",
          id: "task-3",
        },
        {
          name: "Onion",
          id: "task-4"
        },
        {
          name: "Put up christmas decorations",
          id: "task-5"
        }]
      }]
    }
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = this.state.boards[0]
    const newTasks = Array.from(column.tasks)
    newTasks.splice(source.index, 1)
    newTasks.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      tasks: newTasks
    }

    const newState = {
      boards: [newColumn]
    }

    console.log(this.state)

    this.setState(newState)
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          {this.state.boards.map((board, index) =>
            <Droppable droppableId={board.id}>
              {(provided) =>
                <Column
                  name={board.name}
                  tasks={board.tasks}
                  index={index}
                />
              }
            </Droppable>
          )}
        </div>
      </DragDropContext>
    );
  }
}

export default App;
