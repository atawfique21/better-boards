import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import axios from 'axios';
import Widget from './Components/Widget';
import Board from './Components/Board';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// TODO: addTask is not properly working. If you click the button for the second time, it breaks.
// TODO: make it so when a new task is added, it's automatically draggable.

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apikey: "5324aa7815ff9a187f7b56bc7b82b9a0",
      zipcode: "11432",
      weatherData: {},
      addTask: false,
      currentTaskCounter: 8,
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
            name: "whatever",
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
          }]
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

  onDragStart = result => {
    let boardSelector = document.querySelectorAll("div.board")
    for (var i = 0; i < boardSelector.length; i++) {
      boardSelector[i].classList.add('full');
    }
  }

  onDragEnd = result => {
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
      const taskToMove = startBoard.tasks.filter(task => task.id === draggableId)[0];
      const startTaskIds = Array.from(startBoard.tasks)
      startTaskIds.splice(source.index, 1);
      // console.log(startTaskIds)

      // at this point, we've gone ahead
      // and removed the task from where it was.

      // filter through oldBoards 2 and if task.id matches, remove it. 

      let currentBoard;
      oldBoards2.map(board => {
        if (board.id === source.droppableId) {
          currentBoard = board
        }
      })

      let takenBoard = oldBoards2.splice(source.droppableId, 1)[0]
      const takenBoardTasks = Array.from(takenBoard.tasks)
      takenBoardTasks.splice(source.index, 1)

      let newNew = {
        ...takenBoard,
        tasks: takenBoardTasks
      }

      console.log(newNew)

      const newMe = [...oldBoards2, newNew]
      // console.log(newMe)

      const finishTaskIds = Array.from(finishBoard.tasks)
      finishTaskIds.splice(destination.index, 0, taskToMove)
      // console.log(oldBoards2)
      // At this point, we've put into new array. 
      const newFinish = {
        ...finishBoard,
        tasks: finishTaskIds
      };

      // console.log(oldBoards2)

      const boards = [newFinish, ...newMe];
      // console.log(boards)
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
        <Header onButtonClick={this.onButtonClick} />
        <div className="board-wrapper">
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
          >
            {this.state.boards.map((board, key) =>
              <Droppable droppableId={board.id} key={board.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
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
                    />
                    {provided.placeholder}
                  </div>
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
