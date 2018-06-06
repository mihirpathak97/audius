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

import DialogBox from './Dialog';

const styles = {
  card: {
    maxWidth: '67%',
    display: 'block',
    margin: 'auto',
    marginTop: 150,
    borderRadius: 5
  },
  title: {
    fontSize: 20,
    position: 'relative',
    marginTop: '10%',
  },
  action: {
    width: '36%',
    margin: 'auto',
    clear: 'both',
    marginBottom: 30
  },
  albumArt: {
    width: 150,
    height: 150,
    float: 'left',
    marginTop: 20,
    marginLeft: 70,
    marginBottom: 50
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

class TrackContainer extends React.Component {

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

    var YTDownload = require('../modules/YTDownload');
    // Set loading
    this.setState({
      loading: true
    })
    YTDownload.download(this.props.youtubeLink, this.props.spotifyMetadata, (error, response) => {

      if (error) {
        this.setState({
          loading: false
        })
        this.renderDialog("Error!", "An error occured while downloading!" + " [REASON - " + error + "]");
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
        <Card className={classes.card}>
          <CardContent style={{display: 'inline'}}>
            <Avatar
              alt={this.props.album}
              src={this.props.albumArt}
              className={classes.albumArt}/>
            <Typography className={classes.title}>{this.props.title} by {this.props.artist}</Typography>
          </CardContent>
          <CardActions className={classes.action}>
            <Button variant="raised" color="secondary" onClick={this.playAudio}>
              Play
            </Button>
            <div className={classes.wrapper}>
              <Button variant="raised" disabled={this.state.loading} color="secondary" onClick={this.downloadAudio}>
                Download
              </Button>
              {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </CardActions>
        </Card>
        {
          this.state.dialogOpen ? <DialogBox dialogTitle={this.state.dialogTitle} dialogMessage={this.state.dialogMessage} /> : null
        }
      </div>
    )
  }
}

TrackContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackContainer);
