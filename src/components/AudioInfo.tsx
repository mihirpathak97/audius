import React from 'react';
import {
  Avatar,
  Typography
} from 'antd';

import {
  openExternal
} from '../modules/electronConfig'

interface Props {
  name: string,
  albumArt: string,
  artist: string,
  spotifyTrackUrl?: string
}

const AudioInfo: React.FunctionComponent<Props> = ({
  name,
  albumArt,
  artist,
  spotifyTrackUrl
}) => {
  return(
    <div className="audio-info">
      <div className="avatar">
        <Avatar
          alt={name}
          src={albumArt}
          shape={"square"}
          size="large"
        />
      </div>
      <div className="info">
        <Typography.Text>
          <span className="track-url" onClick={() => openExternal(spotifyTrackUrl)}><strong>{name}</strong></span>
          <br></br>
          {artist}
        </Typography.Text>
      </div>
    </div>
  )
}

export default AudioInfo
