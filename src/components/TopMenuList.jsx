import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const { BrowserWindow, app } = window.require('electron').remote;
const path = require('path');

class TopMenuList extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSettings = () => {
    this.openWindow('Settings');
  };

  handleAbout = () => {
    this.openWindow('About');
  };

  handleTerms = () => {
    this.openWindow('Terms');
  }

  openWindow = (url) => {
    this.setState({ anchorEl: null });
    const miniWindow = new BrowserWindow({width: 800, height: 600, frame: false});
    miniWindow.setResizable(false);
    miniWindow.loadURL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000/#/' + url : `file://${path.join(app.getAppPath(), 'react-compiled/index.html/#/' + url)}`);
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}>
          <FontAwesomeIcon style={{ fontSize: '20' }} icon={faBars} />
        </IconButton>
        <Menu
          id="top-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <MenuItem onClick={this.handleAbout}>About</MenuItem>
          <MenuItem onClick={this.handleSettings}>Settings</MenuItem>
          <MenuItem onClick={this.handleTerms}>Terms of Use</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default TopMenuList;
