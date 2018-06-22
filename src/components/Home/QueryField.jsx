import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button
} from '@material-ui/core';

import DialogBox from '../Dialog';

const { BrowserWindow, app } = window.require('electron').remote;
const path = require('path');

const styles = theme => ({
  container: {
    marginTop: 50
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  },
  button: {
    display: 'block',
    margin: 'auto',
    marginTop: 50
  }
});

class QueryField extends React.Component {

  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  state = {
    query: '',
    toggleError: false,
    dialogOpen: false,
    dialogTitle: "Info",
    dialogMessage: "Spotify and YouTube links are disabled for the time being"
  };

  handleChange = name => event => {
    this.setState({
      query: event.target.value,
      dialogOpen: false,
      toggleError: false
    });
  };

  handleSearch = () => {
    if (this.state.query.indexOf('spotify.com') !== -1 || this.state.query.indexOf('youtube.com') !== -1) {
      this.setState({
        toggleError: true,
        dialogOpen: true
      })
      return
    }
    else {
      BrowserWindow.getFocusedWindow().loadURL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000?Query&val=' + this.state.query : `file://${path.join(app.getAppPath(), 'react-compiled/index.html?Query&val=' + this.state.query)}`);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} onSubmit={(e) => {e.preventDefault(); this.handleSearch()}} noValidate autoComplete="off">
        <TextField
          error={this.state.toggleError}
          id="query"
          label="Enter Song Name, Spotify or YouTube Link"
          className={classes.textField}
          value={this.state.query}
          onChange={this.handleChange('query')}
          margin="normal"
        />
        <Button color="primary" variant="raised" onClick={this.handleSearch} className={classes.button}>
          Search
        </Button>
        {
          this.state.dialogOpen ? <DialogBox dialogTitle={this.state.dialogTitle} dialogMessage={this.state.dialogMessage} /> : null
        }
      </form>
    );
  }
}

QueryField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QueryField);
