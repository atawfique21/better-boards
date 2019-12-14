import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'
import axios from 'axios'
import Widget from './Components/Widget'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apikey: "5324aa7815ff9a187f7b56bc7b82b9a0",
      zipcode: "11432",
      weatherData: {}
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
    console.log(this.state.weatherData)
  }

  componentDidMount() {
    this.apiCall()
  }

  render() {
    return (
      <div className="App">
        <Header />
        <p>Testing</p>
        <Widget icon={this.state.weatherData.icon} temp={this.state.weatherData.temp} />
      </div>
    );
  }
}

export default App;
