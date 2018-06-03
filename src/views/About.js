import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import TopAppBar from '../components/TopAppBar';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <TopAppBar title="About" showMenu={false} />
        <div style={{disply: 'block', width: '90%', margin: 'auto', marginTop: 100, textAlign: 'left'}}>
          <Typography variant="display1" style={{color: 'hsl(348, 100%, 61%)', fontSize: '18', marginBottom: 10}}>
            About The App
          </Typography>
          <Typography variant="heading" style={{fontWeight: 400, fontSize: 18}} gutterBottom>
            Audius is a cross-platform app that allows you to download songs from YouTube by provviding either
            the song name, or Spotify/YouTube link.
          </Typography>

          <Typography variant="display1" style={{fontSize: 16, marginTop: 80}}>
            Copyright (c) 2018 Mihir Pathak All Rights Reserved.
          </Typography>

        </div>
      </div>
    );
  }
}

export default Home;
