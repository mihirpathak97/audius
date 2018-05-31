import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
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
    const aboutWindow = new BrowserWindow({width: 800, height: 600, frame: false});
    aboutWindow.setResizable(false);
    aboutWindow.loadURL(process.env.NODE_ENV == 'development' ? 'http://localhost:3000?Settings' : `file://${path.join(app.getAppPath(), 'react-compiled/index.html?Settings')}`);
  };

  handleAbout = () => {
    const aboutWindow = new BrowserWindow({width: 800, height: 600, frame: false});
    aboutWindow.setResizable(false);
    aboutWindow.loadURL(process.env.NODE_ENV == 'development' ? 'http://localhost:3000?About' : `file://${path.join(app.getAppPath(), 'react-compiled/index.html?About')}`);
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="top-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <MenuItem onClick={this.handleAbout}>About</MenuItem>
          <MenuItem onClick={this.handleSettings}>Settings</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default TopMenuList;
