import React, { useState, useEffect } from 'react'

import { Typography, Table, Select, Button, Switch } from 'antd'

const { BrowserWindow, dialog } = require('electron').remote
const storage = require('../modules/Store')

const Settings: React.FunctionComponent = () => {
  const [defaultAudioOut, setDefaultAudioOut] = useState<string>(
    storage.get('defaultAudioOut')
  )
  const [downloadDirectory, setDownloadDirectory] = useState<string>(
    storage.get('downloadDirectory')
  )
  const [embedMetadata, setEmbedMetadata] = useState<boolean>(
    storage.get('embedMetadata')
  )

  let selectDirectory = () => {
    dialog.showOpenDialog(
      BrowserWindow.getFocusedWindow() || new BrowserWindow(),
      {
        properties: ['openDirectory'],
      },
      (path: string[] | undefined) => {
        path && setDownloadDirectory(path[0])
      }
    )
  }

  useEffect(() => {
    storage.set('defaultAudioOut', defaultAudioOut)
    storage.set('downloadDirectory', downloadDirectory)
    storage.set('embedMetadata', embedMetadata)
  }, [defaultAudioOut, downloadDirectory, embedMetadata])

  const columns = [
    {
      dataIndex: 'title',
      key: 'title',
    },
    {
      dataIndex: 'action',
      key: 'action',
    },
    {
      dataIndex: 'optional',
      key: 'optional',
    },
  ]

  const tableData = [
    {
      key: 'download-format',
      title: 'Download Format',
      action: (
        <Select
          showArrow={false}
          style={{
            width: '60px',
          }}
          showSearch={false}
          value={defaultAudioOut}
          onChange={setDefaultAudioOut}
        >
          <Select.Option value={'mp3'}>MP3</Select.Option>
          <Select.Option value={'m4a'}>M4A</Select.Option>
        </Select>
      ),
    },
    {
      key: 'download-location',
      title: 'Download Location',
      action: <Typography.Text>{downloadDirectory}</Typography.Text>,
      optional: (
        <Button onClick={selectDirectory} size="small" color="primary">
          Change
        </Button>
      ),
    },
    {
      key: 'id3-metadata',
      title: 'Embed ID3 metadata',
      action: <Switch checked={embedMetadata} onChange={setEmbedMetadata} />,
    },
  ]

  return (
    <div className="settings">
      <Typography.Title className="title">Settings</Typography.Title>
      <Table
        showHeader={false}
        tableLayout="fixed"
        columns={columns}
        pagination={false}
        dataSource={tableData}
      />
    </div>
  )
}

export default Settings
