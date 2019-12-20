import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import axios from 'axios';
import Widget from './Components/Widget';
import Board from './Components/Board';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${props => (props.isDraggingOver ? '#e5f0f570' : 'transparent')};
  border-radius: 15px;
`;


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apikey: "5324aa7815ff9a187f7b56bc7b82b9a0",
      zipcode: "11432",
      weatherData: {},
      addTask: false,
      addNote: false,
      currentTaskCounter: 10,
      input: "",
      boards: [
        {
          name: "Not started",
          id: "column-1",
          tasks: [{
            name: "Automate Sprinkler",
            id: "task-1",
            checkList: ["Buy new automated sprinkler", "Hire someone to set it up"],
            note: "Make sure to go to home-depot, they have sales on sprinklers from what I saw."
          },
          {
            name: "Replace yard lights",
            id: "task-2"
          },
          {
            name: "Spray tick killer",
            id: "task-3",
            note: "Be careful that the dog doesn't lick it up!"
          },
          {
            name: "Onion",
            id: "task-4"
          },
          {
            name: "Put up christmas decorations",
            id: "task-5"
          }]
        },
        {
          name: "Doing",
          id: "column-2",
          tasks: [{
            name: "Cut weeds",
            id: "task-6"
          },
          {
            name: "Powerwash drive-way",
            id: "task-7"
          },
          {
            name: "Clean up leaves",
            id: "task-8"
          }
          ]
        },
        {
          name: "Done",
          id: "column-3",
          tasks: [{
            name: "Clean up grass",
            id: "task-9",
            checkList: ["Mow grass", "Put new seeds"]
          },
          {
            name: "Clean porch",
            id: "task-10"
          }
          ]
        }
      ],
      columnOrder: ["column-1", "column-2", "column-3"]
    }
  }

  apiCall = async () => {
    let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},us&units=imperial&appid=${this.state.apikey}`)
    let temp = Math.floor(res.data.main.temp)
    this.setState({
      weatherData: {
        icon: res.data.weather[0].icon,
        temp
      }
    })

  }

  componentDidMount() {
    this.apiCall()
  }

  onButtonClick = (e) => {
    e.preventDefault();
    this.setState({
      addTask: !this.state.addTask
    })
  }

  onFormSubmit = (e, newTask) => {
    e.preventDefault();
    let counter = this.state.currentTaskCounter
    counter++
    newTask = {
      name: this.state.input,
      id: `task-${counter}`
    }
    let previous = this.state.boards[0].tasks
    previous.unshift(newTask)
    this.setState({
      input: "",
      addTask: false,
      currentTaskCounter: counter
    })
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleClick = (e, sentTask) => {
    e.preventDefault();
    const newBoards = this.state.boards;

    for (let i = 0; i < this.state.boards.length; i++) {
      for (let k = 0; k < this.state.boards[i].tasks.length; k++) {
        if (this.state.boards[i].tasks[k].name === sentTask.name) {
          newBoards[i].tasks.splice(k, 1);
        }
      }
    }

    this.setState({
      boards: newBoards
    })
  }

  handleAddNotes = (e, sentTask, newNote) => {
    e.preventDefault()
    const newTasks = this.state.boards.map((board) => {
      return board.tasks.map((item) => {
        if (item.name === sentTask.name) item.note = newNote;
      })
    })
  }

  handleAddChecklist = (e) => {
    e.preventDefault()
  }

  handleNoteSubmit = (e, input, task, showNotes) => {
    e.preventDefault()
    console.log(showNotes)
    const newTasks = this.state.boards.map((board) => {
      return board.tasks.map((item) => {
        if (item.name === task.name) {
          if (item.note === input) {
            return;
          } else {
            item.note = input;
          }
        }
      })
    })
    this.setState({
      addNote: false
    })
  }

  onTaskClick = (e, taskId) => {
    e.preventDefault()
    document.querySelector(`#${taskId}`).classList.add("taskFull")
    document.querySelector(`#${taskId}`).classList.add("showButtons")
  }

  handleExpand = (e) => {
    e.preventDefault()
    let taskDivs = document.querySelectorAll(`.task`)
    for (let i = 0; i < taskDivs.length; i++) {
      taskDivs[i].classList.add("taskFull")
    }
  }

  handleCollapse = (e) => {
    e.preventDefault()
    let taskDivs = document.querySelectorAll(`.task`)
    for (let i = 0; i < taskDivs.length; i++) {
      taskDivs[i].classList.remove('taskFull')
    }
  }

  onDragStart = result => {
    let boardSelector = document.querySelectorAll("div.board")
    for (let i = 0; i < boardSelector.length; i++) {
      boardSelector[i].classList.add('full');
    }
  }

  onDragEnd = result => {
    console.log(result)
    let boardSelector = document.querySelectorAll("div.board")
    for (var i = 0; i < boardSelector.length; i++) {
      boardSelector[i].classList.remove('full');
    }

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let startBoard;
    let finishBoard;
    let oldBoards = [];
    let oldBoards2 = [];

    for (let i = 0; i < this.state.boards.length; i++) {
      if (this.state.boards[i].id === source.droppableId) {
        startBoard = this.state.boards[i];
      } else {
        oldBoards.push(this.state.boards[i]);
      }
    }

    for (let i = 0; i < this.state.boards.length; i++) {
      if (this.state.boards[i].id === destination.droppableId) {
        finishBoard = this.state.boards[i];
      } else {
        oldBoards2.push(this.state.boards[i]);
      }
    }

    if (startBoard === finishBoard) {
      const taskToMove = startBoard.tasks.filter(task => task.id === draggableId)[0];
      const newTaskIds = Array.from(startBoard.tasks)
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, taskToMove);

      const newBoard = {
        ...startBoard,
        tasks: newTaskIds
      };

      const boards = [newBoard, ...oldBoards];
      const sortedBoards = boards.sort((a, b) => a.id.localeCompare(b.id));

      this.setState({
        boards
      })
      return;

    } else {
      const taskToMove = startBoard.tasks.filter(task => task.id === draggableId)[0]
      const startTaskIds = Array.from(startBoard.tasks)
      startTaskIds.splice(source.index, 1);

      let correctIndex = 0;
      for (i = 0; i < oldBoards2.length; i++) {
        if (oldBoards2[i].id === source.droppableId) {
          correctIndex = i;
        }
      }

      let takenBoard = oldBoards2.splice(correctIndex, 1)[0]
      const takenBoardTasks = Array.from(takenBoard.tasks)
      takenBoardTasks.splice(source.index, 1)

      let newNew = {
        ...takenBoard,
        tasks: takenBoardTasks
      }

      const newMe = [...oldBoards2, newNew]

      const finishTaskIds = Array.from(finishBoard.tasks)
      finishTaskIds.splice(destination.index, 0, taskToMove)
      const newFinish = {
        ...finishBoard,
        tasks: finishTaskIds
      };

      const boards = [newFinish, ...newMe];
      const sortedBoards = boards.sort((a, b) => a.id.localeCompare(b.id));

      this.setState({
        boards
      })
      return;
    }
  }

  render() {
    return (
      <div className="App">
        <Header
          onButtonClick={this.onButtonClick}
          handleExpand={this.handleExpand}
          handleCollapse={this.handleCollapse}
        />
        <div className="board-wrapper">
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
          >
            {this.state.boards.map((board, key) =>
              <Droppable droppableId={board.id} key={board.id}>
                {(provided, snapshot) => (
                  <Container
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    <Board
                      name={board.name}
                      index={key}
                      tasks={board.tasks}
                      checkList={board.checkList}
                      note={board.note}
                      addTask={this.state.addTask}
                      onSubmit={this.onFormSubmit}
                      handleChange={this.handleChange}
                      handleClick={this.handleClick}
                      handleAddNotes={this.handleAddNotes}
                      handleAddChecklist={this.handleAddChecklist}
                      handleNoteSubmit={this.handleNoteSubmit}
                      addNoteBoolean={this.state.addNote}
                      onTaskClick={this.onTaskClick}
                    />
                    {provided.placeholder}
                  </Container>
                )}
              </Droppable>
            )}
          </DragDropContext>
        </div>
        <Widget
          icon={this.state.weatherData.icon}
          temp={this.state.weatherData.temp}
        />
      </div>
    );
  }
}

export default App;
