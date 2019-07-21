import React from 'react';
import {
  Avatar,
  Typography
} from 'antd';

const {
  openExternal
} = require('@/modules/electronConfig');

export default ({
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
