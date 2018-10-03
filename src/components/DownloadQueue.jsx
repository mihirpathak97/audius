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
  List,
  Typography,
  ListItem,
  CircularProgress,
  Avatar,
  IconButton
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { downloadAudio } from '../modules/YTDownload'

import Notification from './Notification'

const styles = theme => ({
  container: {
    flex: 1
  }
});

class DownloadQueue extends React.Component {
  state = {
    open: false,
    queue: [],
    showNotification: false,
    notificationMessage: ''
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
    // Downloading
    if (newProps.queue.length > this.props.queue.length) {
      // Add to component queue
      this.setState({
        queue: [...this.state.queue, {
          progress: 0,
          waiting: true,
          downloading: false
        }],
        showNotification: true,
        notificationMessage: 'Added to Queue'
      })
    }
    // Deleting
    else {

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.queue.length === 0 || prevState.queue[0].progress === 100) && this.props.queue.length > 0) {
      let itemToDownload = this.props.queue[0];
      downloadAudio(itemToDownload.youtubeMetadata, itemToDownload.spotifyMetadata, (progress) => {
        this.setState({
          queue: [{
              progress: progress.percentage,
              waiting: false,
              downloading: true
            },
            ...this.state.queue.slice(1)
          ]
        })
      })
      .then(response => {
        this.deleteFromQueue(0)
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
    }
    else {
      //
    }
  }

  deleteFromQueue = (index) => {
    this.props.dispatch(removeFromQueue(index))
    this.setState({
      queue: [
        ...this.state.queue.slice(0, index),
        ...this.state.queue.slice(index + 1)
      ]
    })
  }

  render() {
    const { open } = this.state;
    let downloadQueue;
    if (this.props.queue.length > 0) {
      downloadQueue = this.props.queue.map((queueItem, index) => {
        let useYT;
        queueItem.spotifyMetadata == null ? useYT = true : useYT = false
        return (
          <ListItem key={index} style={{ height: '48px' }}>
            <Avatar alt={useYT ? queueItem.youtubeMetadata.title : queueItem.spotifyMetadata.name}
              src={useYT ? '' : queueItem.spotifyMetadata.albumArt}
              style={{marginRight: 12, height: '24px', width: '24px'}}/>
            <Typography style={{maxWidth: '150px', minWidth: '150px', overflow: 'hidden'}}>{useYT ? queueItem.youtubeMetadata.title : queueItem.spotifyMetadata.name}</Typography>
            <CircularProgress thickness={5} variant={this.state.queue[index].waiting ? 'indeterminate' : 'static'}
              style={{width: '18px', height: '18px', position: 'absolute', right: '72px'}}
              value={this.state.queue[index].progress} color="primary" />
            <IconButton onClick={() => this.deleteFromQueue(index)} disabled={index === 0 ? true : false } style={{fontSize: '18px', position: 'absolute', right: '18px'}}>
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
              <Paper style={{zIndex: '9999'}}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <List style={{ width: '321px', maxHeight: '200px', overflow: 'auto'}}>
                    { downloadQueue }
                  </List>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {
          this.state.showNotification ? <Notification message={this.state.notificationMessage} onClose={() => {
            this.setState({
              showNotification: false,
              notificationMessage: ''
            })
          }} /> : null
        }
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
