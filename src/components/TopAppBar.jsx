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

import createHistory from "history/createBrowserHistory"

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
    const history = createHistory();
    history.goBack();
  }

  return (
    <div className={classes.root}>
      <AppBar style={{boxShadow: 'none', backgroundColor: 'inherit'}}>
        <Toolbar>
          { /* MenuBar Icon */ }
          { props.showMenu ? <TopMenuList /> : null }

          { /* Back Icon for query */ }
          { props.showBack ? <IconButton onClick={handleClick}><ArrowBackIcon /></IconButton> : null }

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
