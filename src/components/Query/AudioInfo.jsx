import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';

import DialogBox from '../Dialog';

const styles = {
  titleWrapper: {
    float: 'right',
    width: '50%',
    marginRight: 70,
    marginLeft: 20,
    marginTop: 100
  },
  title: {
    fontSize: 20,
  },
  artWrapper: {
    float: 'left',
    width: '25%',
    marginTop: 50,
    marginLeft: 70,
    marginBottom: 50
  },
  albumArt: {
    width: 150,
    height: 150,
    margin: 'auto'
  },
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

class AudioInfo extends React.Component {

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

  playAudio = () => {
    const { BrowserWindow } = window.require('electron').remote;
    const aboutWindow = new BrowserWindow({width: 400, height: 200});
    aboutWindow.setResizable(false);
    aboutWindow.loadURL('http://localhost:6969/' + this.props.youtubeLink.split('?v=')[1]);
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
        <div style={{display: "inline"}}>
          <div className={classes.artWrapper}>
            <Avatar
              alt={this.props.album}
              src={this.props.albumArt}
              className={classes.albumArt}/>
          </div>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title}>{this.props.title} by {this.props.artist}</Typography>
          </div>
          
        </div>
            {/* <Button variant="raised" color="secondary" onClick={this.playAudio}>
              Play
            </Button>
            <div className={classes.wrapper}>
              <Button variant="raised" disabled={this.state.loading} color="secondary" onClick={this.downloadAudio}>
                Download
              </Button>
              {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div> */}
        {
          this.state.dialogOpen ? <DialogBox dialogTitle={this.state.dialogTitle} dialogMessage={this.state.dialogMessage} /> : null
        }
      </div>
    )
  }
}

AudioInfo.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AudioInfo);
