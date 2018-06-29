import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

    var YTDownload = require('../../modules/YTDownload');
    // Set loading and dialogOpen
    this.setState({
      loading: true,
      dialogOpen: false
    })
    YTDownload.download(this.props.youtubeLink, this.props.spotifyMetadata, (error, response) => {

      if (error) {
        this.setState({
          loading: false
        })
        this.renderDialog("Error!", "An error occured while downloading! [REASON - " + error + "]");
      }
      if (response === "done") {
        this.setState({
          loading: false
        })
        this.renderDialog("Download Success!", "Your download was successfull. You can find your song in the download location");
      };
    })
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

export default withStyles(styles)(Track);
