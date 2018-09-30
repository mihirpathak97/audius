import React from 'react';
import {
  IconButton
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import ReactPlayer from 'react-player'

class PlayAudio extends React.Component {

  state = {
    playing: false
  }

  playAudio = () => {
    this.setState({
      playing: true
    })
  }

  pauseAudio = () => {
    this.setState({
      playing: false
    })
  }

  render() {
    return(
      <div>
        {
          this.state.playing ? (
            <div>
              <IconButton size="small" onClick={this.pauseAudio}>
                <FontAwesomeIcon icon={faPause} />
              </IconButton>
              <ReactPlayer
                url={'https://youtube.com/watch?v=' + this.props.id}
                playing={true}
                onStart={() => console.log('Playing')}
                style={{display: 'none'}}/>
            </div>
          ) : (
            <IconButton size="small" onClick={this.playAudio}>
              <FontAwesomeIcon icon={faPlay} />
            </IconButton>
          )
        }
      </div>
    )
  }
}

export default PlayAudio;
