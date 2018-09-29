import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addToQueue } from '../../actions/downloadQueue';
import {
  Button,
  CircularProgress
} from '@material-ui/core';

import DialogBox from '../Dialog';

const styles = {
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
};

class Track extends React.Component {

  constructor(props){
    super(props);
    this.downloadAudio = this.downloadAudio.bind(this);
  }

  state = {
    loading: false,
    dialogOpen: false,
    dialogTitle: "",
    dialogMessage: ""
  }

  downloadAudio = () => {
    this.props.addToQueue({
      youtubeMetadata: this.props.youtubeMetadata,
      spotifyMetadata: this.props.spotifyMetadata
    });
  }

  renderDialog = (title, message) => {
    this.setState({
      dialogOpen: true,
      dialogTitle: title,
      dialogMessage: message
    })
  }

  render() {
    const { classes } = this.props;
    return(
      <div id="wrapper">
        <div className={classes.wrapper}>
          <Button variant="raised" size="small" disabled={this.state.loading} color="secondary" onClick={this.downloadAudio}>
            Download
          </Button>
        {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
        {
          this.state.dialogOpen ? <DialogBox dialogTitle={this.state.dialogTitle} dialogMessage={this.state.dialogMessage} /> : null
        }
      </div>
    )
  }
}

Track.propTypes = {
  classes: PropTypes.object,
};

export default connect(null, { addToQueue })(withStyles(styles)(Track));
