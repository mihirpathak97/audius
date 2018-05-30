import React, { Component } from 'react';

import TopAppBar from '../components/TopAppBar';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <TopAppBar title="About" showMenu={false} />
      </div>
    );
  }
}

export default Home;
