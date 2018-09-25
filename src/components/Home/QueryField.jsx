import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';

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
  state = {
    query: ''
  };

  handleChange = name => event => {
    this.setState({
      query: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <TextField
          error={this.state.toggleError}
          id="query"
          label="Enter Song Name, Spotify or YouTube Link"
          className={classes.textField}
          value={this.state.query}
          onChange={this.handleChange('query')}
          margin="normal"/>
        <Link to="\Query" style={{ textDecoration: 'none' }}>
          <Button color="primary" variant="outlined" className={classes.button}>Search</Button>
        </Link>
      </div>
    );
  }
}

QueryField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QueryField);
