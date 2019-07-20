import React from 'react';

import { 
  Menu, 
  Dropdown, 
  Icon, 
  Typography 
} from 'antd';

const { BrowserWindow, app } = window.require('electron').remote;
const path = require('path');

export default function TopMenuList () {
  const openWindow = (url) => {
    const miniWindow = new BrowserWindow({width: 800, height: 600, frame: false});
    miniWindow.setResizable(false);
    miniWindow.loadURL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000/#' + url : `file://${path.join(app.getAppPath(), 'react-compiled/index.html/#' + url)}`);
  }

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
    <Dropdown overlay={menu} trigger={['click']}>
      <Icon type="menu" style={{color: 'black'}}/>
    </Dropdown>
  );
}
