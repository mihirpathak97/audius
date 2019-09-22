/**
 * App's renderer process
 * Called by the browser when it loads itself
 *
 * Initialises React App
 */

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { notification } from 'antd';

// import global CSS file
import './app.global.less';

// Routes
import Routes from './routes';

// Components
import AppBar from './components/AppBar';
import ErrorBoundary from './components/ErrorBoundary';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const App = () => {
  useEffect(() => {
    notification.config({
      placement: 'bottomLeft'
    });
  }, []);

  return (
    <Provider store={createStore(rootReducer)}>
      <HashRouter>
        <div className="App">
          <AppBar />
          <ErrorBoundary>
            <Routes></Routes>
          </ErrorBoundary>
        </div>
      </HashRouter>
    </Provider>
  );
};

// Render App to DOM
ReactDOM.render(<App />, document.getElementById('root'));
