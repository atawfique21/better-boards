import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'
import axios from 'axios'
import Widget from './Components/Widget'
import Board from './Components/Board'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apikey: "5324aa7815ff9a187f7b56bc7b82b9a0",
      zipcode: "11432",
      weatherData: {},
      boards: [
        {
          name: "Not started",
          tasks: [{
            name: "Automate Sprinkler"
          },
          {
            name: "Replace yard lights"
          }]
        },
        {
          name: "Doing",
          tasks: null
        },
        {
          name: "Done",
          tasks: null
        }
      ]
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
    // this.apiCall()
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="board-wrapper">
          {this.state.boards.map(board =>
            <Board name={board.name} tasks={board.tasks} />
          )}
        </div>
        <Widget icon={this.state.weatherData.icon} temp={this.state.weatherData.temp} />
      </div>
    );
  }
}

export default App;
