import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Typography
} from '@material-ui/core';

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
    textAlign: 'left'
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
  }
};

class AudioInfo extends React.Component {
  render() {
    const { classes } = this.props;
    return(
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
    )
  }
}

AudioInfo.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AudioInfo);
