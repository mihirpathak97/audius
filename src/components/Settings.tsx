import React, { useState } from 'react'
import { Typography, Table, Select, Button, Switch, Input } from 'antd'

const { BrowserWindow, dialog } = require('electron').remote
const storage = require('../modules/store')

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

  const [youtubeApiKey, setYoutubeApiKey] = useState<string>(
    storage.get('youtubeApiKey')
  )
  const [spotifyClientId, setSpotifyClientId] = useState<string>(
    storage.get('spotifyClientId')
  )
  const [spotifyClientSecret, setSpotifyClientSecret] = useState<string>(
    storage.get('spotifyClientSecret')
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

  let saveSettings = () => {
    storage.set('defaultAudioOut', defaultAudioOut)
    storage.set('downloadDirectory', downloadDirectory)
    storage.set('embedMetadata', embedMetadata)
    storage.set('youtubeApiKey', youtubeApiKey)
    storage.set('spotifyClientId', spotifyClientId)
    storage.set('spotifyClientSecret', spotifyClientSecret)
  }

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
    {
      key: 'youtube-api-key',
      title: 'YouTube API Key',
      action: (
        <Input
          value={youtubeApiKey}
          onChange={event => setYoutubeApiKey(event.target.value)}
        />
      ),
    },
    {
      key: 'spotify-client-id',
      title: 'Spotify Client ID',
      action: (
        <Input
          value={spotifyClientId}
          onChange={event => setSpotifyClientId(event.target.value)}
        />
      ),
    },
    {
      key: 'spotify-client-secret',
      title: 'Spotify Client Secret',
      action: (
        <Input
          value={spotifyClientSecret}
          onChange={event => setSpotifyClientSecret(event.target.value)}
        />
      ),
    },
  ]

  return (
    <div className="settings">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Title className="title">Settings</Typography.Title>
        <Button
          style={{
            width: '120px',
          }}
          onClick={() => saveSettings()}
        >
          Save
        </Button>
      </div>
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
