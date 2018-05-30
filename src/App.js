import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './views/Home';
import About from './views/About';
import Settings from './views/Settings';
import Query from './views/Query';

import './App.css';

class App extends Component {

  static Views() {
    return {
      Home: <Home />,
      About: <About />,
      Settings: <Settings />,
      Query: <Query />
    }
  }

  static View(props) {
    let name = props.location.search.substr(1).split('&')[0];
    let view = App.Views()[name];
    if(view == null)
      throw new Error("View '" + name + "' is undefined");
    return view;
  }

  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={App.View}/>
        </div>
      </Router>
    );
  }
}

export default App;
