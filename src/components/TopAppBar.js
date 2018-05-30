import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';
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
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          { /* MenuBar Icon */ }
          { props.showMenu ? <TopMenuList /> : null }

          { /* Back Icon for query */ }
          { props.showBackIcon ? <h6>Go Back</h6> : null }

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
