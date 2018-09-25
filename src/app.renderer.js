/**
 * App's renderer process
 * Called by the browser when it loads itself
 *
 * Initialises React App
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store/configureStore';

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

  state = {
    showMenu: false,
    showBack: false
  }

  componentWillMount() {
    let view = window.location.href.split('/#/')[1];
    console.log(window.location.href);
    console.log(view);
    var log = require('log');
    log.info('app.renderer.js', 'Loading view - ' + view);
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

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <TopAppBar showMenu={this.state.showMenu} showBack={this.state.showBack} />
          <HashRouter>
            <div>
              <Route path='/Home' exact component={Home}/>
              <Route path='/Query' component={Query} />
              <Route path='/About' component={About} />
              <Route path='/Terms' component={Terms} />
              <Route path='/Settings' component={Settings} />
            </div>
          </HashRouter>
        </div>
      </Provider>
    );
  }
}

// Render App to DOM
ReactDOM.render(<App />, document.getElementById('root'));
