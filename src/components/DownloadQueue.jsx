import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Button,
  MenuList,
  Typography,
  MenuItem,
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
    console.log(newProps);
  }

  render() {
    const { open } = this.state;
    let downloadQueue;
    if (this.props.queue.length > 0) {
      downloadQueue = this.props.queue.map(queueItem => {
        let useYT;
        queueItem.spotifyMetadata == null ? useYT = true : useYT = false
        return (
          <MenuItem>
            <Avatar alt={useYT ? queueItem.youtubeMetadata.title : queueItem.spotifyMetadata.title}
              src={useYT ? '' : queueItem.spotifyMetadata.albumArt}
              style={{marginRight: 12, height: '24px', width: '24px'}}/>
            <Typography>{useYT ? queueItem.youtubeMetadata.title : queueItem.spotifyMetadata.title}</Typography>
            <IconButton style={{fontSize: '18px', position: 'absolute', right: '18px'}}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </MenuItem>
        )
      });
    }
    else {
      downloadQueue = (
        <MenuItem>
          You do not have any downloads
        </MenuItem>
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
