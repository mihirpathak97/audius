import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
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

  componentDidMount () {
    console.log(this.props.location)
  }

  componentDidUpdate() {
    console.log(this.props.location)
  }

  render () {
    const { classes } = this.props;
    let renderChildren;
    switch (this.props.location.pathname) {
      case '/':
        renderChildren = (
          <Toolbar>
            <TopMenuList />
            <DownloadQueue />
            <WindowHandlers />
          </Toolbar>
        )
        break;
      case '/query':
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

export default withRouter(withStyles(styles)(TopAppBar));
