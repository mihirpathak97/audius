import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addToQueue } from '../../actions/downloadQueue';
import {
  IconButton
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

const styles = {
  wrapper: {
    position: 'relative',
  }
};

class Track extends React.Component {

  constructor(props){
    super(props);
    this.downloadAudio = this.downloadAudio.bind(this);
  }

  downloadAudio = () => {
    this.props.addToQueue({
      youtubeMetadata: this.props.youtubeMetadata,
      spotifyMetadata: this.props.spotifyMetadata
    });
  }

  render() {
    const { classes } = this.props;
    return(
      <div id="wrapper">
        <div className={classes.wrapper}>
          <IconButton size="small" onClick={this.downloadAudio}>
            <FontAwesomeIcon icon={faArrowCircleDown} />
          </IconButton>
        </div>
      </div>
    )
  }
}

Track.propTypes = {
  classes: PropTypes.object,
};

export default connect(null, { addToQueue })(withStyles(styles)(Track));
