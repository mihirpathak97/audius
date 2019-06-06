import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import {
  TextField,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from './audius_big.png';

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

class View extends Component {

  state = {
    query: ''
  }

  handleChange = event => {
    this.setState({
      query: event.target.value
    })
  };

  handleClick = () => {
    this.props.history.push({
      pathname: 'search',
      search: queryString.stringify(this.state)
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <img src={logo} style={{marginTop: 70, width: 340}} alt="Audius" />
          <div className={classes.container}>
            <TextField
              label="Enter Song Name, Spotify or YouTube Link"
              className={classes.textField}
              value={this.props.query}
              onChange={this.handleChange}
              margin="normal"/>
            <Button color="primary" onClick={this.handleClick} variant="outlined" className={classes.button}>Search</Button>
          </div>
      </div>
    );
  }
}

View.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter((withStyles(styles)(View)));
