import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Typography,
  Table,
  Select,
  Button,
  Switch
} from 'antd';

const settings = window.require('electron-settings');

const styles = theme => ({
  table: {
    width: '100%',
    border: 'none',
    marginTop: 50,
    marginLeft: -20
  },
  tablerow: {
    border: 'none'
  },
  text: {
    fontSize: 16,
    fontWeight: 500
  }
});

class View extends Component {

  state = {
    defaultAudioOut: settings.get('defaultAudioOut'),
    downloadDirectory: settings.get('downloadDirectory'),
    embedMetadata: settings.get('embedMetadata')
  };

  handleChange = value => {
    this.setState({ defaultAudioOut: value });
    settings.set('defaultAudioOut', value );
  };

  selectDirectory = () => {
    const { BrowserWindow, dialog } = window.require('electron').remote;
    dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
      properties: ['openDirectory']
    }, (path) => {
      if (path) {
        this.setState({ downloadDirectory: path[0] });
        settings.set('downloadDirectory', path[0]);
      }
    })
  }

  handleSwitchChange = value => {
    this.setState({ embedMetadata: value });
    settings.set('embedMetadata', value);
  }

  render() {

    const columns = [
      {
        dataIndex: 'title',
        key: 'title'
      },
      {
        dataIndex: 'action',
        key: 'action'
      },
      {
        dataIndex: 'optional',
        key: 'optional'
      }
    ]
  
    const tableData = [
      {
        key: 'download-format',
        title: 'Download Format',
        action: (
          <Select
            value={this.state.defaultAudioOut}
            onChange={this.handleChange}
            name="defaultAudioOut">
              <Select.Option value={'mp3'}>MP3</Select.Option>
              <Select.Option value={'m4a'}>M4A</Select.Option>
          </Select>
        )
      },
      {
        key: 'download-location',
        title: 'Download Location',
        action: <Typography.Text>{this.state.downloadDirectory}</Typography.Text>,
        optional: (
          <Button onClick={this.selectDirectory} size="small" color="primary">Change</Button>
        )
      },
      {
        key: 'id3-metadata',
        title: 'Embed ID3 metadata',
        action: <Switch checked={this.state.embedMetadata} onChange={this.handleSwitchChange}/>
      }
    ]

    return (
      <div className="settings">
        <Typography.Title className="title">
          Settings
        </Typography.Title>
        <Table columns={columns} pagination={false} dataSource={tableData} />
        {/* <Table>
          <TableBody>
            <TableRow>
              <TableCell className={classes.tablerow}><Typography className={classes.text}>Download Format</Typography></TableCell>
              <TableCell className={classes.tablerow}>
                
              </TableCell>
              <TableCell className={classes.tablerow}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tablerow}>
                <Typography className={classes.text}>Download Location</Typography>
              </TableCell>
              <TableCell className={classes.tablerow}>
                <Typography>{this.state.downloadDirectory}</Typography>
              </TableCell>
              <TableCell className={classes.tablerow}>
                <Button onClick={this.selectDirectory} size="small" color="primary">Change</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tablerow}>
                <Typography className={classes.text}>Embed ID3 metadata for songs</Typography>
              </TableCell>
              <TableCell style={{paddingLeft: '10px'}} className={classes.tablerow}>
                <Switch checked={this.state.embedMetadata} disableRipple onChange={this.handleSwitchChange}/>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table> */}
      </div>
    );
  }
}

View.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(View);
