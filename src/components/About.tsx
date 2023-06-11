import React from 'react'

import { Typography } from 'antd'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faNodeJs,
  faChrome,
  faReact,
} from '@fortawesome/free-brands-svg-icons'

const electron = require('../assets/electron-logo.svg')

const { openExternal } = require('../modules/electronConfig')

const About: React.FunctionComponent = () => {
  return (
    <div>
      <div className="about">
        <Typography.Title className="title">About</Typography.Title>
        <Typography.Text>
          Audius is a cross-platform app that allows you to download songs from
          YouTube by providing either the song name, or Spotify/YouTube link.
        </Typography.Text>
        <Typography.Text>
          Image assets courtesy of{' '}
          <span
            onClick={() => openExternal('http://github.com/turnerboy')}
            className="mention"
          >
            @turnerboy
          </span>
        </Typography.Text>
        <Typography.Title>
          Version {require('electron').remote.app.getVersion()}
        </Typography.Title>
        <div className="electron">
          <Typography.Text>Built with</Typography.Text>
          <img alt="Electron Logo" src={electron} />
        </div>
        <div className="icons">
          <div>
            <FontAwesomeIcon icon={faGithub} />
            <span
              onClick={() =>
                openExternal('https://github.com/mihirpathak97/audius')
              }
            >
              <Typography>GitHub</Typography>
            </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faNodeJs} />
            <span onClick={() => openExternal('https://nodejs.org')}>
              <Typography>v{process.versions.node}</Typography>
            </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faChrome} />
            <span onClick={() => openExternal('https://electronjs.org')}>
              <Typography>v{process.versions.chrome}</Typography>
            </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faReact} />
            <span onClick={() => openExternal('https://reactjs.org')}>
              <Typography>v{React.version}</Typography>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
