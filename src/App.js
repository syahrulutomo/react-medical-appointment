import React, { Component } from 'react';
import Home from './components/Home';
import Nav from './components/Nav';
import './App.scss';

class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="app">
        <Home/>
        <Nav/>
      </div>
    )
  }
}

export default App;
