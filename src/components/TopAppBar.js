import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';
import TopMenuList from './TopMenuList';

const styles = {
  root: {
    flexGrow: 1
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
          <TopMenuList />
          <Typography variant="title" color="inherit" className={classes.flex}>
            Audius
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopAppBar);
