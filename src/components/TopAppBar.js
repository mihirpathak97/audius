import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TopMenuList from './TopMenuList';
import WindowHandlers from './WindowHandlers';

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
    const { BrowserWindow, app } = window.require('electron').remote;
    const path = require('path');
    BrowserWindow.getFocusedWindow().loadURL(process.env.NODE_ENV == 'development' ? 'http://localhost:3000?Home' : `file://${path.join(app.getAppPath(), 'react-compiled/index.html?Home')}`);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          { /* MenuBar Icon */ }
          { props.showMenu ? <TopMenuList /> : null }

          { /* Back Icon for query */ }
          { props.showBackIcon ? <IconButton onClick={handleClick}><ArrowBackIcon /></IconButton> : null }

          { /* Title in app bar */ }
          <Typography variant="title" color="inherit" className={classes.flex}>{ props.title }</Typography>

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
