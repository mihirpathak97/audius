/**
 * App's renderer process
 * Called by the browser when it loads itself
 *
 * Initialises React App
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store/configureStore';

// import global CSS file
import './app.global.scss';

// Routes
import Routes from './routes/';

// Components
import TopBar from './components/TopBar';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <TopBar />
            <Routes></Routes>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

// Render App to DOM
ReactDOM.render(<App />, document.getElementById('root'));
