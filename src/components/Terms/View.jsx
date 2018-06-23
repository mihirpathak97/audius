import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

const styles = {
  list: {
    marginTop: 5,
    marginBottom: 5,
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 14
  },
  link: {
    color: 'blue',
    cursor: 'pointer'
  }
}

function openExternal(url) {
  var shell = window.require('electron').shell;
  shell.openExternal(url);
}

class Terms extends Component {

  render() {
    return (
      <div>
        <div style={{disply: 'block', width: '87%', margin: 'auto', marginTop: 10, textAlign: 'left'}}>

          <Typography variant="display1" style={{color: 'hsl(348, 100%, 61%)', fontSize: '18', marginBottom: 10}}>
            Terms of Use
          </Typography>
          <Typography variant="display1" style={{fontSize: 16, marginTop: 20, marginBottom: 20}}>
            Copyright (c) 2018 Mihir Pathak All Rights Reserved.
          </Typography>

          { /* YouTube's Terms and Conditions */ }
          <Typography variant="display1" style={{fontSize: 18, marginTop: 40, marginBottom: 20, color: 'hsl(348, 100%, 61%)'}}>
            This app is subject to YouTube's terms of use which dictate the following:
          </Typography>
          <Typography style={{fontWeight: 400, fontSize: 18}} gutterBottom>
            <li style={styles.list}>
              An enduser is not allowed to share or redistribute any content downloaded from this software.
            </li>
            <li style={styles.list}>
              This software cannot be used in countries where YouTube is illegal.
            </li>
            <li style={styles.list}>
              This software should not be used to download and share any form of copyrighted material.
            </li>
          </Typography>

          { /* FFmpeg */ }
          <Typography style={{fontWeight: 500, fontSize: 16, marginTop: 35, marginBottom: 20}}>
            This software uses a pre-compiled version of <span onClick={() => openExternal("http://ffmpeg.org")} style={styles.link}>FFmpeg</span>
          </Typography>

          <Typography style={{fontSize: 16, marginTop: 35, marginBottom: 20}}>
            <span style={{fontWeight: 500}}>NOTE</span> : This software is meant for educational purposes only. The developer is not responsible in any way for any form of improper or illegal usage.
          </Typography>
        </div>
      </div>
    );
  }
}

export default Terms;
