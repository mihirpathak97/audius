import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  FormControl,
  Select,
  Typography
} from '@material-ui/core';

import TopAppBar from '../components/TopAppBar';

const settings = window.require('electron-settings');

const styles = theme => ({
  wrapper: {
    display: 'block',
    width: 'auto',
    position: 'absolute',
    left: 56
  },
  formControl: {
    display: 'inline',
    margin: theme.spacing.unit,
    minWidth: 120,
    marginLeft: 20
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  text: {
    display: 'inline',
    marginRight: 20,
    fontSize: 16,
    fontWeight: 500
  }
});

class Settings extends Component {

  state = {
    defaultAudioOut: settings.get('defaultAudioOut'),
    downloadDirectory: settings.get('downloadDirectory')
  };

  componentDidMount() {
    console.log(settings.get('defaultAudioOut'));
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    settings.set(event.target.name, event.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <TopAppBar title="Settings" showMenu={false} />
        <div className={classes.wrapper} style={{marginTop: 50}}>
          <Typography className={classes.text}>Download format</Typography>
          <FormControl className={classes.formControl}>
            <Select
              value={this.state.defaultAudioOut}
              onChange={this.handleChange}
              name="defaultAudioOut"
              className={classes.selectEmpty}>
              <MenuItem value={'mp3'}>MP3</MenuItem>
              <MenuItem value={'m4a'}>M4A</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.wrapper} style={{marginTop: 130}}>
          <Typography className={classes.text}>Download location</Typography>
          <Typography style={{marginLeft: 20, display: 'inline'}}>{settings.get('downloadDirectory')}</Typography>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
