import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tree from './components/trees/Tree.jsx'

class App extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Simple JS Tree</h2>
        </div>
        <div className="App-body">
          <Tree />
        </div>
      </div>
    );
  }
}

export default App;
