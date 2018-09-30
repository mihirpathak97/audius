import React from 'react';
import {
  IconButton
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

class PlayAudio extends React.Component {

  playAudio = () => {
    const { BrowserWindow } = window.require('electron').remote;
    const aboutWindow = new BrowserWindow({width: 400, height: 200});
    aboutWindow.setResizable(false);
    aboutWindow.loadURL('http://localhost:6969/' + this.props.id);
  }

  render() {
    return(
      <div>
        <IconButton size="small" onClick={this.playAudio}>
          <FontAwesomeIcon icon={faPlay} />
        </IconButton>
      </div>
    )
  }
}

export default PlayAudio;
