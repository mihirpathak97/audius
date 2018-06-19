import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimesCircle, faMinusCircle } from '@fortawesome/fontawesome-free-solid';

const { BrowserWindow } = window.require('electron').remote;

const styles = theme => ({
  container: {
    flex: 1
  }
});

class WindowHandlers extends React.Component {

  handleMinimize = () => {
    BrowserWindow.getFocusedWindow().minimize();
  };

  handleQuit = () => {
    BrowserWindow.getFocusedWindow().close();
  };

  render() {

    return (
      <div style={{position: 'absolute', right: 30}}>
        <FontAwesomeIcon
          icon={faMinusCircle}
          style={{cursor: 'pointer', color: 'hsl(48, 100%, 67%)'}}
          onClick={this.handleMinimize}/>
        <FontAwesomeIcon
          icon={faTimesCircle}
          style={{cursor: 'pointer', paddingLeft: 10, color: 'hsl(348, 100%, 61%)'}}
          onClick={this.handleQuit}/>
      </div>
    );
  }
}

WindowHandlers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WindowHandlers);
