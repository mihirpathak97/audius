import React from 'react'
import { Avatar, Typography } from 'antd'

import { openExternal } from '../modules/electronConfig'
import { SpotifyAlbum } from '../types/spotify'

const defaultArtwork = require('../assets/default-artwork.png')

interface Props {
  name: string
  image?: string
  spotifyUrl: string
  album?: SpotifyAlbum
}

const AudioInfo: React.FunctionComponent<Props> = ({ name, image, album }) => {
  return (
    <div className="audio-info">
      <div className="avatar">
        <Avatar
          alt={name}
          src={image ? image : album ? album.image : defaultArtwork}
          shape={'square'}
          size="large"
        />
      </div>
      <div className="info">
        <Typography.Text>
          <span className="track-url" onClick={() => openExternal('')}>
            <strong>{name}</strong>
          </span>
          <br></br>
          {album ? album.name : null}
        </Typography.Text>
      </div>
    </div>
  )
}

export default AudioInfo
