import React from 'react';
import {
  IconButton
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

class PlayAudio extends React.Component {

  playAudio = () => {
    var shell = window.require('electron').shell;
    shell.openExternal('https://youtube.com/watch?v=' + this.props.id);
  }

  render() {
    return(
      <div>
        <IconButton style={{fontSize: '18px'}} onClick={this.playAudio}>
          <FontAwesomeIcon icon={faPlay} />
        </IconButton>
      </div>
    )
  }
}

export default PlayAudio;
