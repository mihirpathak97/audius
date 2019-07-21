const { BrowserWindow, app } = process.env.NODE_ENV ? window.require('electron').remote : require('electron');
const path = require('path');

const windowConfig = {
  mainWindow: {
    width: 900,
    height: 680,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  },
  miniWindow: {
    width: 800, 
    height: 600, 
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  }
}

let openWindow = (url) => {
  const miniWindow = new BrowserWindow(windowConfig.miniWindow);
  miniWindow.setResizable(false);
  miniWindow.loadURL(
    process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/#' + url 
    : `file://${path.join(app.getAppPath(), 'react-compiled/index.html/#' + url)}`
  );
}

module.exports = {
  windowConfig,
  openWindow,
  BrowserWindow
}