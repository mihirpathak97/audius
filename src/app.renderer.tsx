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
import Routes from './Routes';

// Components
import AppBar from './components/AppBar';
import ErrorBoundary from './components/ErrorBoundary';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const App: React.FunctionComponent = () => {
  useEffect(() => {
    notification.config({
      placement: 'bottomLeft'
    });
  }, []);

  return (
    <Provider store={store}>
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
