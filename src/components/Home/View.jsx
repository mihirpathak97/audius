import React, { Component } from 'react';
import QueryField from './QueryField';

import logo from './audius_big.png';

const { app } = window.require('electron').remote;
const path = require('path');

class Home extends Component {
  render() {
    return (
      <div>
        <img src={logo} style={{marginTop: 70, width: 340}} alt="Audius" />
        <QueryField />
      </div>
    );
  }
}

export default Home;
