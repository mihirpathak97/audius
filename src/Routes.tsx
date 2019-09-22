import { Route, Switch } from 'react-router';
import React, { Component } from 'react';

/**
 * The application routes are defined here
 *
 * Import the component or view and define the route
 */

import Home from './components/Home';
import About from './components/About';
import Settings from './components/Settings';
import Terms from './components/Terms';
import Query from './components/Query';

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Route exact path="/terms" render={() => <Terms />} />
        <Route exact path="/search" render={() => <Query />} />
      </Switch>
    );
  }
}
