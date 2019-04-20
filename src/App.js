import React, { Component } from 'react';
import './App.css';

import data from './api/data';

import ChartPie from './components/ChartPie/';
import ChartXY from './components/ChartXY/';

class App extends Component {

  state = {
    data
  };

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1>Возрастная статистика</h1>
        </header>
        <div className="App__chartBlock">
          <ChartPie data={this.state.data}/>
          <ChartXY data={this.state.data}/>
        </div>
      </div>
    );
  };
};

export default App;
