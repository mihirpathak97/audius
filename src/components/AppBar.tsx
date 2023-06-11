import React, { useState } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import {
  List,
  Menu,
  Dropdown,
  Typography,
  Button,
  Drawer,
  Avatar,
  Popover,
  Progress,
} from 'antd'
import {
  CloudDownloadOutlined,
  ArrowLeftOutlined,
  MenuOutlined,
  MinusCircleFilled,
  CloseCircleFilled,
  DeleteFilled,
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromQueue } from '../actions/downloadQueue'

import { Store, StreamProgress, QueueItem } from '../types'

const os = require('os')
const { openWindow, BrowserWindow } = require('../modules/electronConfig')

const defaultArtwork = require('../assets/default-artwork.png')

interface DownloadQueueProps {
  path: string
}

interface DropdownProps {
  path: string
}

interface GoBackProps {
  path: string
}

const DownloadQueue: React.FunctionComponent<DownloadQueueProps> = ({
  path,
}) => {
  const [showDrawer, setShowDrawer] = useState(false)

  let queue = useSelector((state: Store) => state.downloadQueue)
  let dispatch = useDispatch()

  let progressContent = (progress: StreamProgress | undefined) => {
    return (
      <div>
        {progress ? (
          <div>
            <Typography.Text>Your song is being downloaded!</Typography.Text>
            <Progress
              strokeColor="#652d91"
              percent={Math.floor(progress.percentage)}
              status="active"
            />
          </div>
        ) : (
          <Typography.Text>Waiting in queue</Typography.Text>
        )}
      </div>
    )
  }

  return (
    <StyledDownloadQueue path={path}>
      <Button
        onClick={() => {
          setShowDrawer(true)
        }}
      >
        Download Queue <CloudDownloadOutlined />
      </Button>
      <Drawer
        placement="left"
        closable={false}
        onClose={() => setShowDrawer(false)}
        visible={showDrawer}
        width={300}
      >
        {queue && queue.length > 0 ? (
          <List>
            {queue.map((queueItem: QueueItem, index) => {
              let useYT = queueItem.metadata === null ? true : false
              return (
                <Popover
                  title={
                    useYT
                      ? queueItem.video.title
                      : queueItem.metadata
                      ? queueItem.metadata.name
                      : ''
                  }
                  key={queueItem.video.id}
                  className="download-item"
                  placement="rightBottom"
                  trigger="click"
                  content={progressContent(queueItem.progress)}
                >
                  <List.Item>
                    <Avatar
                      alt={
                        useYT
                          ? queueItem.video.title
                          : queueItem.metadata
                          ? queueItem.metadata.name
                          : ''
                      }
                      src={
                        useYT
                          ? defaultArtwork
                          : queueItem.metadata
                          ? queueItem.metadata.album.image
                          : defaultArtwork
                      }
                    />
                    <Typography.Text>
                      {useYT
                        ? queueItem.video.title
                        : queueItem.metadata
                        ? queueItem.metadata.name
                        : ''}
                    </Typography.Text>
                    <Button
                      onClick={() => dispatch(removeFromQueue(index))}
                      icon={<DeleteFilled />}
                      disabled={index === 0 ? true : false}
                    />
                  </List.Item>
                </Popover>
              )
            })}
          </List>
        ) : (
          <Typography.Text>
            You do not have any downloads.
            <br /> Try searching for something
          </Typography.Text>
        )}
      </Drawer>
    </StyledDownloadQueue>
  )
}

// Styled Components
const StyledAppBar = styled.div`
  height: 64px;
  width: 100vw;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: ${os.platform() === 'darwin' ? 'row-reverse' : 'row'};
  align-items: center;
  justify-content: space-between;
`

const StyledDropdown = styled(Dropdown)`
  ${(props: DropdownProps) =>
    props.path !== '/' || os.platform() === 'darwin' ? 'display: none' : ''};
`

const GoBack = styled(Link)`
  ${(props: GoBackProps) =>
    props.path.includes('search')
      ? `
    display: block;
    ${
      os.platform() === 'darwin'
        ? `
    position: absolute;
    left: 97px;
    top: 23px;
    `
        : ''
    }
  `
      : `display: none`};
`

const StyledDownloadQueue = styled.div`
  display: ${(props: DownloadQueueProps) =>
    props.path.includes('search') || props.path === '/' ? 'block' : 'none'};
  position: absolute;
  right: ${os.platform() === 'darwin' ? '20px' : '120px'};
`

const StyledWindowHandlers = styled.div`
  ${os.platform() === 'darwin'
    ? `
    position: absolute;
    display: flex;
    flex-direction: row-reverse;
    left: 10px;
    align-items: center;`
    : ''};
`

/**
 * Minises current window
 */
const minimizeApplication = () => {
  BrowserWindow.getFocusedWindow().minimize()
}

/**
 * Closes current window
 */
const quitApplication = () => {
  BrowserWindow.getFocusedWindow().close()
}

const AppMenu = (
  <Menu onClick={({ key }) => openWindow(key)}>
    <Menu.Item key="about">
      <Typography.Text>About</Typography.Text>
    </Menu.Item>
    <Menu.Item key="settings">
      <Typography.Text>Settings</Typography.Text>
    </Menu.Item>
    <Menu.Item key="terms">
      <Typography.Text>Terms of Use</Typography.Text>
    </Menu.Item>
  </Menu>
)

const AppBar: React.FunctionComponent<RouteComponentProps> = ({ location }) => {
  return (
    <StyledAppBar>
      <StyledDropdown
        path={location.pathname}
        overlay={AppMenu}
        trigger={['click']}
      >
        <MenuOutlined style={{ color: 'black' }} />
      </StyledDropdown>

      <GoBack path={location.pathname} to="/">
        <ArrowLeftOutlined style={{ color: 'black' }} />
        <span style={{ color: 'black', marginLeft: '0.3rem' }}>Go Back</span>
      </GoBack>

      <DownloadQueue path={location.pathname} />

      <StyledWindowHandlers>
        <MinusCircleFilled
          style={{
            cursor: 'pointer',
            fontSize: '16px',
            color: 'hsl(48, 100%, 67%)',
            marginRight: os.platform() === 'darwin' ? '10px' : '',
          }}
          onClick={minimizeApplication}
        />
        <CloseCircleFilled
          style={{
            paddingLeft: 10,
            fontSize: '16px',
            color: 'hsl(348, 100%, 61%)',
            marginRight: os.platform() === 'darwin' ? '10px' : '',
          }}
          onClick={quitApplication}
        />
      </StyledWindowHandlers>
    </StyledAppBar>
  )
}

export default withRouter(AppBar)
