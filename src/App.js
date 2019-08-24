import React, { Component } from 'react';
import Home from './components/Home';
import SpesialisasiByLocation from './components/SpesialisasiByLocation';
import JadwalByLocation from './components/JadwalByLocation';
import ProfilDokter from './components/ProfilDokter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';


class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
          <div className="app">
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />   
                <Route path="/spesialisasi" component={SpesialisasiByLocation} />
                <Route path="/jadwal" component={JadwalByLocation} />
                <Route path="/profil" component={ProfilDokter} />
              </Switch>
            </Router>
          </div>
    )
  }
}

export default App;
