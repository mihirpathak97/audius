import React, { Component } from 'react';

import TopAppBar from '../components/TopAppBar';

class Terms extends Component {
  render() {
    return (
      <div className="App">
        <TopAppBar title="Terms of Use" showMenu={false} />
      </div>
    );
  }
}

export default Terms;
