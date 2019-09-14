import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Icon, Dropdown, Typography } from 'antd';
import DownloadQueue from '@/components/DownloadQueue';

const os = require('os');
const { openWindow, BrowserWindow } = require('@/modules/electronConfig');

// Styled Components
const StyledAppBar = styled.div`
  height: 64px;
  width: 100vw;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: ${os.platform() === 'darwin' ? 'row-reverse' : 'row'};
  align-items: center;
  justify-content: space-between;
`;

const StyledDropdown = styled(Dropdown)`
  ${props =>
    props.path !== '/' || os.platform() === 'darwin' ? 'display: none' : ''};
`;

const GoBack = styled(Link)`
  ${props =>
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
`;

const StyledDownloadQueue = styled(DownloadQueue)`
  display: ${props =>
    props.path.includes('search') || props.path === '/' ? 'block' : 'none'};
`;

const StyledWindowHandlers = styled.div`
  ${os.platform() === 'darwin'
    ? `
    position: absolute;
    display: flex;
    flex-direction: row-reverse;
    left: 10px;
    align-items: center;`
    : ''};
`;
const StyledIcon = styled(Icon)`
  ${os.platform() === 'darwin'
    ? `
    margin-right: 10px;
  `
    : ''}
`;

/**
 * Minises current window
 */
const minimizeApplication = () => {
  BrowserWindow.getFocusedWindow().minimize();
};

/**
 * Closes current window
 */
const quitApplication = () => {
  BrowserWindow.getFocusedWindow().close();
};

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
);

export default withRouter(({ location }) => {
  return (
    <StyledAppBar>
      <StyledDropdown
        path={location.pathname}
        overlay={AppMenu}
        trigger={['click']}
      >
        <Icon type="menu" style={{ color: 'black' }} />
      </StyledDropdown>

      <GoBack path={location.pathname} to="/">
        <Icon type="arrow-left" style={{ color: 'black' }} />
        <span style={{ color: 'black', marginLeft: '0.3rem' }}>Go Back</span>
      </GoBack>

      <StyledDownloadQueue path={location.pathname} />

      <StyledWindowHandlers>
        <StyledIcon
          style={{
            cursor: 'pointer',
            fontSize: '16px',
            color: 'hsl(48, 100%, 67%)'
          }}
          type="minus-circle"
          theme="filled"
          onClick={minimizeApplication}
        />
        <StyledIcon
          style={{
            paddingLeft: 10,
            fontSize: '16px',
            color: 'hsl(348, 100%, 61%)'
          }}
          theme="filled"
          onClick={quitApplication}
          type="close-circle"
        />
      </StyledWindowHandlers>
    </StyledAppBar>
  );
});
