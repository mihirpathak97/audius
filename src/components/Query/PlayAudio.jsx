import React from 'react';
import {
  IconButton,
  CircularProgress
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import ReactPlayer from 'react-player'

class PlayAudio extends React.Component {

  state = {
    playing: false,
    loading: false
  }

  playAudio = () => {
    this.setState({
      playing: true,
      loading: true
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
              {
                this.state.loading ? (
                  <CircularProgress variant="indeterminate" thickness={5}
                    style={{width: '18px', marginLeft: '10px', height: '18px', marginTop: '5px'}} />
                ) : (
                  <IconButton style={{fontSize: '18px'}} onClick={this.pauseAudio}>
                    <FontAwesomeIcon icon={faPause} />
                  </IconButton>
                )
              }
              <ReactPlayer
                url={'https://youtube.com/watch?v=' + this.props.id}
                playing={true}
                onStart={() => {
                  this.setState({
                    loading: false
                  })
                }}
                style={{display: 'none'}}/>
            </div>
          ) : (
            <IconButton style={{fontSize: '18px'}} onClick={this.playAudio}>
              <FontAwesomeIcon icon={faPlay} />
            </IconButton>
          )
        }
      </div>
    )
  }
}

export default PlayAudio;
