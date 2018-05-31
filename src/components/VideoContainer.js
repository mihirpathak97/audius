import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlay, faArrowCircleDown } from '@fortawesome/fontawesome-free-solid';

const styles = {
  card: {
    maxWidth: '67%',
    display: 'block',
    margin: 'auto',
    marginTop: 20,
    borderRadius: 5
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  action: {
    position: 'relative',
    maxWidth: '10%',
    margin: 'auto',
    marginBottom: 10
  }
};

function VideoContainer(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  let playAudio = () => {
    const { BrowserWindow } = window.require('electron').remote;
    const aboutWindow = new BrowserWindow({width: 300, height: 60, frame: false});
    aboutWindow.setResizable(false);
    aboutWindow.loadURL('http://localhost:6969/' + props.link.split('?v=')[1]);
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {props.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.link}
          </Typography>
        </CardContent>
        <CardActions className={classes.action}>
        <FontAwesomeIcon
          onClick={playAudio}
          icon={faPlay}
          style={{cursor: 'pointer', paddingLeft: 10, color: 'hsl(348, 100%, 61%)'}}/>
        <FontAwesomeIcon
          icon={faArrowCircleDown}
          style={{cursor: 'pointer', paddingLeft: 10, color: 'hsl(348, 100%, 61%)'}}/>
        </CardActions>
      </Card>
    </div>
  );
}

VideoContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoContainer);
