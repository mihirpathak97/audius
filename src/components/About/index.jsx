import React, { Component } from 'react';

import {
  Typography
} from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faNodeJs,
  faChrome,
  faReact 
} from '@fortawesome/free-brands-svg-icons';

import electron from '@/assets/electron-logo.svg';

const {
  openExternal
} = require('@/modules/electronConfig');

class View extends Component {
  render() {
    return (
      <div>
        <div className="about">
          <Typography.Title className="title">
            About
          </Typography.Title>
          <Typography.Text>
            Audius is a cross-platform app that allows you to download songs from YouTube by providing either
            the song name, or Spotify/YouTube link.
          </Typography.Text>
          <Typography.Text>
            Image assets courtesy of <span onClick={() => openExternal("http://github.com/turnerboy")} className="mention">@turnerboy</span>
          </Typography.Text>
          <Typography.Title>
            Version {window.require('electron').remote.app.getVersion()}
          </Typography.Title>
          <div className="electron">
            <Typography.Text>Built with</Typography.Text>
            <img alt="Electron Logo" src={electron}/>
          </div>
          <div className="icons">
            <div>
              <FontAwesomeIcon
                icon={faGithub}
              />
              <Typography onClick={() => openExternal('https://github.com/mihirpathak97/audius')}>GitHub</Typography>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faNodeJs}
              />
              <Typography onClick={() => openExternal('https://nodejs.org')}>v{process.versions.node}</Typography>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faChrome}
              />
              <Typography onClick={() => openExternal('https://electronjs.org')}>v{process.versions.chrome}</Typography>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faReact}
              />
              <Typography onClick={() => openExternal('https://reactjs.org')}>v{React.version}</Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default View;
