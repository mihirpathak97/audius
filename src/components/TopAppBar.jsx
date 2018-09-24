import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import TopMenuList from './TopMenuList';
import WindowHandlers from './WindowHandlers';

const { BrowserWindow, app } = window.require('electron').remote;
const path = require('path');

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    marginLeft: 30
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

function TopAppBar(props) {
  const { classes } = props;

  function handleClick() {
    BrowserWindow.getFocusedWindow().loadURL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000?Home' : `file://${path.join(app.getAppPath(), 'react-compiled/index.html?Home')}`);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{boxShadow: 'none', backgroundColor: 'inherit'}}>
        <Toolbar>
          { /* MenuBar Icon */ }
          { props.showMenu ? <TopMenuList /> : null }

          { /* Back Icon for query */ }
          { props.showBack ? <FontAwesomeIcon icon={faArrowLeft} onClick={handleClick}/> : null }

          { /* Window Minimise and Quit */ }
          <WindowHandlers />
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopAppBar);
