import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Button,
  IconButton,
  Typography
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlay, faArrowCircleDown } from '@fortawesome/fontawesome-free-solid';

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
  }
};

class TrackContainer extends React.Component {

  playAudio = () => {
    const { BrowserWindow } = window.require('electron').remote;
    const aboutWindow = new BrowserWindow({width: 400, height: 200});
    aboutWindow.setResizable(false);
    aboutWindow.loadURL('http://localhost:6969/' + this.props.youtubeLink.split('?v=')[1]);
  }

  downloadAudio = () => {

    var YTDownload = require('../modules/YTDownload');
    YTDownload.downloadMp3(this.props.youtubeLink, 'audio', function (error, response) {
      if (error) {
        console.log(error);
      }
      if (response == 'done') {

      };
    })
  }

  render() {
    const { classes } = this.props;
    return(
      <div>
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
            <Button variant="raised" color="secondary" onClick={this.downloadAudio}>
              Download
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

TrackContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackContainer);
