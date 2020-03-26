import React from 'react'
import { Avatar, Typography } from 'antd'

import { openExternal } from '../modules/electronConfig'
import { SpotifyAlbum, SpotifyArtist } from '../types'

interface Props {
  name: string
  album?: SpotifyAlbum
  artist?: SpotifyArtist
  url?: string
}

const defaultArtwork = require('../assets/default-artwork.png')

const AudioInfo: React.FunctionComponent<Props> = ({
  name,
  album,
  artist,
  url,
}) => {
  return (
    <div className="audio-info">
      <div className="avatar">
        <Avatar
          alt={name}
          src={album ? album.image : defaultArtwork}
          shape={'square'}
          size="large"
        />
      </div>
      <div className="info">
        <Typography.Text>
          <span className="track-url" onClick={() => openExternal(url)}>
            <strong>{name}</strong>
          </span>
          <br></br>
          {artist && artist.name}
        </Typography.Text>
      </div>
    </div>
  )
}

export default AudioInfo
