import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './views/Home';

import './App.css';

class App extends Component {

  static Views() {
    return {
      Home: <Home />
    }
  }

  static View(props) {
    let name = props.location.search.substr(1);
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
