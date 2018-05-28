import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
const { BrowserWindow } = window.require('electron').remote;
const path = require('path');

console.log('hello');

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
    // TODO: window open logic
  };

  handleAbout = () => {
    // TODO: window open logic
  };

  handleMinimize = () => {
    BrowserWindow.getFocusedWindow().minimize();
  };

  handleQuit = () => {
    BrowserWindow.getFocusedWindow().close();
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
          <MenuItem onClick={this.handleMinimize}>Minimize</MenuItem>
          <MenuItem onClick={this.handleQuit}>Quit</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default TopMenuList;
