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
const Spotify = require('./modules/SpotifyWebApi');

// Log
var log = require('electron-log');
log.transports.file.level = 'debug';

let mainWindow;

function createWindow() {
  log.info('[app.main.js] Creating window');
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    frame: false
  });
  mainWindow.setResizable(false);
  mainWindow.loadURL(isDev ? 'http://localhost:3000/#/Home' : `file://${path.join(__dirname, '../react-compiled/index.html/#/Home')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
  log.info('[app.main.js] App ready');
  // Init persistant storage
  require('./modules/Settings');
  // First create BrowserWindow
  createWindow();
  // Then get Spotify access token
  Spotify.getAccessToken();
});

app.on('window-all-closed', () => {
  // [OS X] it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  log.info('[app.main.js] Quitting app');
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
