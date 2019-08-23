import React, { Component } from 'react';
import Home from './components/Home';
import SpesialisasiByLocation from './components/SpesialisasiByLocation';
import CariFaskes from './components/CariFaskes';
import BookingCepat from './components/BookingCepat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';


class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Router>
      <div className="app">
        <Switch>
            <Route exact path="/" component={Home} />   
            <Route path="/booking" component={SpesialisasiByLocation} />
        </Switch>
      </div>
      </Router>
    )
  }
}

export default App;
