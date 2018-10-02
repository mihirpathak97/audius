import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import TopMenuList from './TopMenuList';
import WindowHandlers from './WindowHandlers';
import DownloadQueue from './DownloadQueue';

const styles = theme => ({
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
});

class TopAppBar extends React.Component {

  render () {
    const { classes } = this.props;
    let renderChildren;
    switch (this.props.hash.split('#')[1]) {
      case 'Home':
        renderChildren = (
          <Toolbar>
            <TopMenuList />
            <DownloadQueue />
            <WindowHandlers />
          </Toolbar>
        )
        break;
      case 'Query':
        renderChildren = (
          <Toolbar>
            <Link to="/Home" style={{  }}>
              <IconButton>
                <FontAwesomeIcon style={{ fontSize: '20' }} icon={faArrowLeft} />
              </IconButton>
            </Link>
            <DownloadQueue />
            <WindowHandlers />
          </Toolbar>
        )
        break;
      default:
        renderChildren = (
          <Toolbar>
            <WindowHandlers />
          </Toolbar>
        )
    }
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{boxShadow: 'none', backgroundColor: 'inherit'}}>
          { renderChildren }
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
})

export default connect(mapStateToProps)(withStyles(styles)(TopAppBar));
