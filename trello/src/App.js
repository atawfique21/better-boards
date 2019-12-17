import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import axios from 'axios';
import Widget from './Components/Widget';
import Board from './Components/Board';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apikey: "5324aa7815ff9a187f7b56bc7b82b9a0",
      zipcode: "11432",
      weatherData: {},
      addTask: false,
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
          }]
        },
        {
          name: "Done",
          id: "column-3",
          tasks: [{
            name: "Clean up grass",
            id: "task-8",
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
    newTask = { name: this.state.input }
    let previous = this.state.boards[0].tasks
    previous.unshift(newTask)
    this.setState({
      input: "",
      addTask: false
    })
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleClick = (e, sentTask) => {
    e.preventDefault();
    const newTasks = this.state.boards.map((board) => {
      return board.tasks.filter((item) =>
        item.name !== sentTask.name
      )
    })
    const updatedNewTasks = [{ name: "Not started", tasks: newTasks[0] }, { name: "Doing", tasks: newTasks[1] }, { name: "Done", tasks: newTasks[2] }]
    this.setState({
      boards: updatedNewTasks
    })
  }

  onDragEnd = result => {
    // update later
  }

  render() {
    return (
      <div className="App">
        <Header onButtonClick={this.onButtonClick} />
        <div className="board-wrapper">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.boards.map(board =>
              <Board
                name={board.name}
                key={board.id}
                tasks={board.tasks}
                checkList={board.checkList}
                note={board.note}
                addTask={this.state.addTask}
                onSubmit={this.onFormSubmit}
                handleChange={this.handleChange}
                handleClick={this.handleClick}
              />
            )}
          </DragDropContext>
        </div>
        <Widget icon={this.state.weatherData.icon} temp={this.state.weatherData.temp} />
      </div>
    );
  }
}

export default App;
