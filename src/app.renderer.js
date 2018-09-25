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
import { ConnectedRouter } from 'connected-react-router'

import { Provider } from 'react-redux';
import { store, history } from './store/configureStore';

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
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <HashRouter>
            <div className="App">
              <TopAppBar />
              <Route path='/Home' exact component={Home}/>
              <Route path='/Query' component={Query} />
              <Route path='/About' component={About} />
              <Route path='/Terms' component={Terms} />
              <Route path='/Settings' component={Settings} />
            </div>
          </HashRouter>
        </ConnectedRouter>
      </Provider>
    );
  }
}

// Render App to DOM
ReactDOM.render(<App />, document.getElementById('root'));
