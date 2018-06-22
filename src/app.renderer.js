/**
 * App's renderer process
 * Called by the browser when it loads itself
 * 
 * Initialises React App
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// import global CSS file
import './app.global.css';

// Views
import Home from './components/Home/View';
import About from './components/About/View';
import Settings from './components/Settings/View';
import Terms from './components/Terms/View';
import Query from './components/Query/View';

// Components
import TopAppBar from './components/TopAppBar';

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

  state = {
    showMenu: false,
    showBack: false
  }

  componentWillMount() {
    let view = window.location.href.split('?')[1].split('&')[0];
    switch (view) {
      case 'Home':
        this.setState({
          showMenu: true
        })
        break;
      case 'Query':
        this.setState({
          showMenu: false,
          showBack: true
        })
        break;
      default:
        this.setState({
          title: view
        })
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
      <div className="App">
        <TopAppBar showMenu={this.state.showMenu} showBack={this.state.showBack} />
        <Router>
          <div>
            <Route path='/' component={App.View}/>
          </div>
        </Router>
      </div>
    );
  }
}

// Render App to DOM
ReactDOM.render(<App />, document.getElementById('root'));