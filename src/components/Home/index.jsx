import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setSearchQuery } from '../../actions/searchQuery';
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

  handleChange = event => {
    this.props.setSearchQuery(event.target.value)
  };

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
            <Link to="/Query" style={{ textDecoration: 'none', display: 'block', width: '50px', margin: 'auto' }}>
              <Button color="primary" variant="outlined" className={classes.button}>Search</Button>
            </Link>
          </div>
      </div>
    );
  }
}

View.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  query: state.searchQuery.query
})

export default connect(mapStateToProps, {setSearchQuery})(withStyles(styles)(View));
