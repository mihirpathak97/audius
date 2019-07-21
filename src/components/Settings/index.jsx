import React, { Component } from 'react';

import {
  Typography,
  Table,
  Select,
  Button,
  Switch
} from 'antd';

const settings = window.require('electron-settings');

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
      </div>
    );
  }
}

export default View;
