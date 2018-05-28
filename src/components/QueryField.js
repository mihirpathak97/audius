import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  TextField,
  Button
} from '@material-ui/core';

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
  state = {
    name: '',
  };

  handleChange = name => event => {
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="query"
          label="Enter Song Name, Spotify or YouTube Link"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <Button color="primary" variant="raised" className={classes.button}>
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
