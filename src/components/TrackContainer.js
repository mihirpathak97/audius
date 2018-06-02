import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';

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

function TrackContainer(props) {
  const { classes } = props;

  let playAudio = () => {
    const { BrowserWindow } = window.require('electron').remote;
    const aboutWindow = new BrowserWindow({width: 300, height: 60, frame: false});
    aboutWindow.setResizable(false);
    aboutWindow.loadURL('http://localhost:6969/' + props.link.split('?v=')[1]);
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
          <Button variant="raised" color="secondary">
            Play
          </Button>
          <Button variant="raised" color="secondary">
            Download
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

TrackContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackContainer);
