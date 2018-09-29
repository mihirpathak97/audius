import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { removeFromQueue } from '../actions/downloadQueue';

import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Button,
  MenuList,
  Typography,
  ListItem,
  Avatar,
  IconButton
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
  container: {
    flex: 1
  }
});

class DownloadQueue extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  componentWillReceiveProps (newProps) {
    // Get last added prop
    let itemToDownload = newProps.queue[this.props.queue.length];
  }

  deleteFromQueue = (index) => {
    this.props.dispatch(removeFromQueue(index))
  }

  render() {
    const { open } = this.state;
    let downloadQueue;
    if (this.props.queue.length > 0) {
      downloadQueue = this.props.queue.map((queueItem, index) => {
        let useYT;
        queueItem.spotifyMetadata == null ? useYT = true : useYT = false
        return (
          <ListItem key={index}>
            <Avatar alt={useYT ? queueItem.youtubeMetadata.title : queueItem.spotifyMetadata.title}
              src={useYT ? '' : queueItem.spotifyMetadata.albumArt}
              style={{marginRight: 12, height: '24px', width: '24px'}}/>
            <Typography>{useYT ? queueItem.youtubeMetadata.title : queueItem.spotifyMetadata.title}</Typography>
            <IconButton onClick={() => this.deleteFromQueue(index)} style={{fontSize: '18px', position: 'absolute', right: '18px'}}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </ListItem>
        )
      });
    }
    else {
      downloadQueue = (
        <ListItem>
          <Typography>You do not have any downloads</Typography>
        </ListItem>
      );
    }
    return (
      <div style={{position: 'absolute', right: 120}}>
        <Button
        buttonRef={node => {
          this.anchorEl = node;
        }}
        aria-owns={open ? 'menu-list-grow' : null}
        aria-haspopup="true"
        onClick={this.handleToggle}>
        Download Queue <FontAwesomeIcon icon={faCloudDownloadAlt} style={{ color: '#2196f3', marginLeft: '5', fontSize: '18' }} />
      </Button>
      <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
            <Paper>
              <ClickAwayListener onClickAway={this.handleClose}>
                <MenuList style={{ width: '321px' }}>
                  { downloadQueue }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      </div>
    );
  }
}

DownloadQueue.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  queue: state.downloadQueue.queue
})

export default connect(mapStateToProps)(withStyles(styles)(DownloadQueue));
