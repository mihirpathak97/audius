import React from 'react';

import {
  Menu, 
  Icon,
  Dropdown,
  Typography
} from 'antd';

const { BrowserWindow, app } = window.require('electron').remote;
const path = require('path');

export default function topBar ({
  location = {
    pathname: '/'
  }
}) {

  const openWindow = (url) => {
    const miniWindow = new BrowserWindow({width: 800, height: 600, frame: false});
    miniWindow.setResizable(false);
    miniWindow.loadURL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000/#' + url : `file://${path.join(app.getAppPath(), 'react-compiled/index.html/#' + url)}`);
  }
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
}

