import React, { Component } from 'react';
import {
  Typography,
  GridList,
  GridListTile
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faNodeJs, faChrome, faReact } from '@fortawesome/free-brands-svg-icons';
import electron from './electron-logo.svg';
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
          <Typography variant="title" style={{marginTop: 30, fontWeight: 400, fontSize: 18}} gutterBottom>
            Image assets courtesy of <span onClick={() => openExternal("http://github.com/turnerboy")} style={{color: 'blue', cursor: 'pointer'}}>@turnerboy</span>
          </Typography>
          <Typography variant="subheading" style={{marginTop: 40}} gutterBottom>
            Version {window.require('electron').remote.app.getVersion()}
          </Typography>
          <div style={{textAlign: 'center', marginTop: 40}}>
            <Typography style={{display: 'inline-block'}} variant="title">Built with</Typography>
            <img alt="Electron Logo" src={electron} style={{width: '150px', display: 'inline-block', marginLeft: '10px'}} />
          </div>
          <GridList style={{marginTop: 60, textAlign: 'center'}} cols={4}>
            <GridListTile>
              <FontAwesomeIcon
                icon={faGithub}
                onClick={() => openExternal('https://github.com/mihirpathak97/audius')}
                style={{ fontSize: '30px', cursor: 'pointer' }} />
              <Typography style={{marginTop: '5px'}}>GitHub</Typography>
            </GridListTile>
            <GridListTile>
              <FontAwesomeIcon
                icon={faNodeJs}
                onClick={() => openExternal('https://nodejs.org')}
                style={{ fontSize: '30px', cursor: 'pointer' }} />
              <Typography style={{marginTop: '5px'}}>v{process.versions.node}</Typography>
            </GridListTile>
            <GridListTile>
              <FontAwesomeIcon
                icon={faChrome}
                onClick={() => openExternal('https://electronjs.org')}
                style={{ fontSize: '30px', cursor: 'pointer' }}/>
              <Typography style={{marginTop: '5px'}}>v{process.versions.chrome}</Typography>
            </GridListTile>
            <GridListTile>
              <FontAwesomeIcon
                icon={faReact}
                onClick={() => openExternal('https://reactjs.org')}
                style={{ fontSize: '30px', cursor: 'pointer' }} />
              <Typography style={{marginTop: '5px'}}>v{React.version}</Typography>
            </GridListTile>
          </GridList>
        </div>
      </div>
    );
  }
}

export default View;
