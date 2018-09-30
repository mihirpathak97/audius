import React, { Component } from 'react';
import {
  Typography,
  IconButton
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faNodeJs, faChrome, faReact } from '@fortawesome/free-brands-svg-icons';

function openExternal(url) {
  var shell = window.require('electron').shell;
  shell.openExternal(url);
}

class View extends Component {
  render() {
    return (
      <div>
        <div style={{disply: 'block', width: '87%', margin: 'auto', marginTop: 10, textAlign: 'left'}}>
          <Typography variant="display1" style={{color: 'hsl(348, 100%, 61%)', fontSize: '18', marginBottom: 10}}>
            About
          </Typography>
          <Typography variant="heading" style={{fontWeight: 400, fontSize: 18}} gutterBottom>
            Audius is a cross-platform app that allows you to download songs from YouTube by providing either
            the song name, or Spotify/YouTube link.
          </Typography>
          <Typography variant="heading" style={{marginTop: 30, fontWeight: 400, fontSize: 18}} gutterBottom>
            Audius logo courtesy of <span onClick={() => openExternal("http://github.com/turnerboy")} style={{color: 'blue', cursor: 'pointer'}}>Sri Ganesh</span>
          </Typography>
          <Typography variant="subheading" style={{marginTop: 50}} gutterBottom>
            Version {window.require('electron').remote.app.getVersion()}
          </Typography>
          <div style={{marginTop: 100}}>
            <IconButton style={{display: 'block'}}>
              <FontAwesomeIcon icon={faGithub} />
            </IconButton>
            <FontAwesomeIcon icon={faNodeJs} />
          </div>
        </div>
      </div>
    );
  }
}

export default View;
