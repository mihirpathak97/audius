import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button
} from '@material-ui/core';

const { BrowserWindow, app } = window.require('electron').remote;
const path = require('path');

const styles = theme => ({
  container: {
    marginTop: 150
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
    toggleError: false
  };

  handleChange = name => event => {
    this.setState({
      query: event.target.value,
    });
  };

  handleSearch = (e) => {
    e.preventDefault()
    console.log(this.state.query);
    if (this.state.query.indexOf('spotify.com') != -1 || this.state.query.indexOf('youtube.com') != -1) {
      this.setState({
        toggleError: true
      })
      return
    }
    else {
      BrowserWindow.getFocusedWindow().loadURL(process.env.NODE_ENV == 'development' ? 'http://localhost:3000?Query&val=' + this.state.query : `file://${path.join(app.getAppPath(), 'react-compiled/index.html?Query&val=' + this.state.query)}`);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} onSubmit={this.handleSearch} noValidate autoComplete="off">
        <TextField
          onSubmit={this.handleSearch}
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
      </form>
    );
  }
}

QueryField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QueryField);
