import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setSearchQuery } from '../../actions/searchQuery';
import {
  TextField,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';

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

  handleChange = event => {
    this.props.setSearchQuery(event.target.value)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <TextField
          label="Enter Song Name, Spotify or YouTube Link"
          className={classes.textField}
          value={this.props.query}
          onChange={this.handleChange}
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

const mapStateToProps = state => ({
  query: state.searchQuery.query
})

export default connect(mapStateToProps, {setSearchQuery})(withStyles(styles)(QueryField));
