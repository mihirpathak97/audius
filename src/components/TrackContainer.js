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
  Typography,
  Snackbar
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
  },
  closeButton: {
    width: 100,
    height: 40
  }
};

function TrackContainer(props) {
  const { classes } = props;

  var state = {
    snackbarOpen: false
  }

  let handleSnackbarOpen = () => {
    state.snackbarOpen = true;
  };

  let handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    state.snackbarOpen = false;
  };

  let playAudio = () => {
    const { BrowserWindow } = window.require('electron').remote;
    const aboutWindow = new BrowserWindow({width: 400, height: 200});
    aboutWindow.setResizable(false);
    aboutWindow.loadURL('http://localhost:6969/' + props.youtubeLink.split('?v=')[1]);
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent style={{display: 'inline'}}>
          <Avatar
            alt={props.album}
            src={props.albumArt}
            className={classes.albumArt}/>
          <Typography className={classes.title}>{props.title} by {props.artist}</Typography>
        </CardContent>
        <CardActions className={classes.action}>
          <Button variant="raised" color="secondary" onClick={playAudio}>
            Play
          </Button>
          <Button variant="raised" color="secondary" onClick={handleSnackbarOpen}>
            Download
          </Button>
        </CardActions>
      </Card>

      { /* Snackbar */ }
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        open={state.snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        ContentProps={{'aria-describedby': 'message-id',}}
        message={<span id="message-id">Note archived</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.closeButton}
            onClick={handleSnackbarClose}>
              <CloseIcon />
            </IconButton>
          ]}
        />

    </div>
  );
}

TrackContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackContainer);
