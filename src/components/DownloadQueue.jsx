import React from 'react';
import { connect } from 'react-redux';
import { removeFromQueue } from '../actions/downloadQueue';

import { 
  Typography,
  Icon,
  Button,
  Menu,
  Dropdown,
  Avatar,
  Spin,
  notification
} from "antd";

import { downloadAudio } from '../modules/YTDownload';
import { bindActionCreators } from 'redux';

class DownloadQueue extends React.Component {
  state = {
    queue: []
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
        }]
      })
      notification.info({
        message: 'Info!',
        description: 'A download was added to the queue'
      })
    }
    // Deleting
    else {
      notification.warn({
        message: 'Warning!',
        description: 'An item was deleted from the queue'
      })
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
      .then(() => {
        this.deleteFromQueue(0)
        notification.success({
          message: 'Success!',
          description: 'Finished downloading an item'
        })
      }).catch((error) => {
        this.deleteFromQueue(0)
        notification.error({
          message: 'Error!',
          description: error
        })
      })
    }
    else {
      //
    }
  }

  deleteFromQueue = (index) => {
    this.props.removeFromQueue(index)
    this.setState({
      queue: [
        ...this.state.queue.slice(0, index),
        ...this.state.queue.slice(index + 1)
      ]
    })
  }

  render() {
    const downloadQueue = this.props.queue.length > 0 ? (
        <Menu>
          {
            this.props.queue.map((queueItem, index) => {
              let useYT = queueItem.spotifyMetadata === null ? true : false
              return (
                <Menu.Item key={queueItem.youtubeMetadata.id} className="download-item">
                  <Avatar alt={useYT ? queueItem.youtubeMetadata.title : queueItem.spotifyMetadata.name}
                    src={useYT ? '' : queueItem.spotifyMetadata.albumArt}
                  />
                  <Typography.Text>{useYT ? queueItem.youtubeMetadata.title : queueItem.spotifyMetadata.name}</Typography.Text>
                  {
                    this.state.queue[index].waiting ? (
                      <Spin />
                    ) : null
                  }
                  <Button
                    onClick={() => this.deleteFromQueue(index)}
                    icon="delete" 
                    disabled={index === 0 ? true : false } />
                </Menu.Item>
              )
            })
          }
        </Menu>
    ) : (
        <Menu>
          <Menu.Item key="no-downloads">
            <Typography>You do not have any downloads</Typography>
          </Menu.Item>
        </Menu>
    )
    return (
      <div className="download-queue">
        <Dropdown overlayClassName="dropdown-queue-menu" overlay={downloadQueue} trigger={['click']}>
          <Button>
            Download Queue{' '}<Icon type="cloud-download" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  queue: state.downloadQueue.queue
})

const mapDispatchToProps = dispatch => {
  return {
    removeFromQueue: bindActionCreators(removeFromQueue, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadQueue);
