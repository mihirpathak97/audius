import React, { Component } from 'react';
import TopAppBar from '../components/TopAppBar';
import QueryField from '../components/QueryField';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <QueryField />
      </div>
    );
  }
}

export default Home;
