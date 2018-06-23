/**
 * App's main process
 * Calls electron's API to create window and initialize the app
 */

const electron = require('electron');
const app = require('electron').app;
const BrowserWindow = electron.BrowserWindow;

// Auto Updater
require("./modules/AutoUpdater");

const path = require('path');
const isDev = require('electron-is-dev');

const YTCore = require('./modules/YTCore');
const Spotify = require('./modules/SpotifyWebApi');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    frame: false
  });
  mainWindow.setResizable(false);
  mainWindow.loadURL(isDev ? 'http://localhost:3000?Home' : `file://${path.join(__dirname, '../react-compiled/index.html?Home')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
  // Init persistant storage
  require('./modules/Settings');
  // First create BrowserWindow
  createWindow();
  // Then start audio stream listener
  YTCore.listen(6969, () => {
    // console.log(`Listening on port http://localhost:6969`)
  });
  // Then get Spotify access token
  Spotify.getAccessToken();
});

app.on('window-all-closed', () => {
  // [OS X] it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // [OS X] Re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});