import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  FormControl,
  Select,
  Typography,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Button
} from '@material-ui/core';

import TopAppBar from '../components/TopAppBar';

const settings = window.require('electron-settings');

const styles = theme => ({
  table: {
    width: '80%',
    border: 'none',
    marginTop: 50
  },
  tablerow: {
    border: 'none'
  },
  text: {
    fontSize: 16,
    fontWeight: 500
  }
});

class Settings extends Component {

  state = {
    defaultAudioOut: settings.get('defaultAudioOut'),
    downloadDirectory: settings.get('downloadDirectory')
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    settings.set(event.target.name, event.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <TopAppBar title="Settings" showMenu={false} />
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell className={classes.tablerow}><Typography className={classes.text}>Download Format</Typography></TableCell>
              <TableCell className={classes.tablerow}>
                <Select
                  value={this.state.defaultAudioOut}
                  onChange={this.handleChange}
                  name="defaultAudioOut">
                  <MenuItem value={'mp3'}>MP3</MenuItem>
                  <MenuItem value={'m4a'}>M4A</MenuItem>
                </Select>
              </TableCell>
              <TableCell className={classes.tablerow}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tablerow}><Typography className={classes.text}>Download Location</Typography></TableCell>
              <TableCell className={classes.tablerow}><Typography>{this.state.downloadDirectory}</Typography></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
