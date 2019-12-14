import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'

class App extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="App">
        <Header />
        <p>Testing</p>
      </div>
    );
  }
}

export default App;
