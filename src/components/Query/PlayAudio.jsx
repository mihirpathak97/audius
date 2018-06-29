import React from 'react';
import {
  Button
} from '@material-ui/core';

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
        <Button variant="raised" size="small" color="secondary" onClick={this.playAudio}>
          Play
        </Button>
      </div>
    )
  }
}

export default PlayAudio;
