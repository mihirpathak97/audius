import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
  container: {
    flex: 1
  }
});

class DownloadQueue extends React.Component {
  state = {
    anchorEl: null,
  };

  componentDidMount() {
    console.log(this.props.queue);
  }

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div style={{position: 'absolute', right: 120}}>
        <FontAwesomeIcon
          aria-owns={anchorEl ? 'download-menu' : null}
          aria-haspopup="true"
          onClick={this.handleOpen}
          style={{ color: '#2196f3', fontSize: '24', cursor: 'pointer' }}
          icon={faCloudDownloadAlt}>
        </FontAwesomeIcon>
        <Menu
          id="download-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
        </Menu>
      </div>
    );
  }
}

DownloadQueue.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  queue: state.queue
})

export default connect(mapStateToProps, {})(withStyles(styles)(DownloadQueue));
