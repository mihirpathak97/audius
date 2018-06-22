import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// import global CSS file
import './app.global.css';

// Views
import Home from './views/Home';
import About from './views/About';
import Settings from './views/Settings';
import Terms from './views/Terms';
import Query from './views/Query';

class App extends Component {

  // Define routes here
  static Views() {
    return {
      Home: <Home />,
      About: <About />,
      Settings: <Settings />,
      Terms: <Terms />,
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

// Render App to DOM
ReactDOM.render(<App />, document.getElementById('root'));