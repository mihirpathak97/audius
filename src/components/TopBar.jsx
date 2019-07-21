import React from 'react';

import {
  Link,
  withRouter
} from 'react-router-dom';

import {
  Menu, 
  Icon,
  Dropdown,
  Typography
} from 'antd';

const {
  openWindow,
  BrowserWindow
} = require('@/modules/electronConfig');

export default withRouter(({
  location
}) => {

  const minimizeApplication = () => {
    BrowserWindow.getFocusedWindow().minimize();
  };

  const quitApplication = () => {
    BrowserWindow.getFocusedWindow().close();
  };

  const menu = (
    <Menu onClick={({key}) => openWindow(key)}>
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
  return (
    <div className="top-app-bar">
      <div className="nav-menu">
        {
          location.pathname === '/'
          ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <Icon type="menu" style={{color: 'black'}}/>
            </Dropdown>
          ) : (null)
        }
        {
          location.pathname.includes('search')
          ? (
            <Link to="/">
              <Icon type="arrow-left" style={{color: 'black'}}/>
            </Link>
          ) : null
        }
      </div>

      {/* <DownloadQueue /> */}

      <div className="window-handlers">
        <Icon
          style={{cursor: 'pointer', fontSize: '16px', color: 'hsl(48, 100%, 67%)'}}
          type="minus-circle"
          theme="filled"
          onClick={minimizeApplication}/>
        <Icon
          style={{paddingLeft: 10, fontSize: '16px', color: 'hsl(348, 100%, 61%)'}}
          theme="filled"
          onClick={quitApplication}
          type="close-circle" />
      </div>
    </div>
  );
})

