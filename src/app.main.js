/**
 * App's main process
 * Calls electron's API to create window and initialize the app
 */

const electron = require('electron');
const app = require('electron').app;
const protocol = require('electron').protocol;
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
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../react-compiled/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);

  // Register protocol `audius` for serving static files
  // as webpack + chromium causes relative path issue
  protocol.registerFileProtocol('audius', (request, callback) => {
    const url = request.url.substr(9)
    if (url.includes('static')) {
      callback({ path: path.normalize(`${__dirname}/../react-compiled/${url}`) })
    }
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })

}

app.on('ready', () => {
  log.info('[app.main.js] App ready');
  // Init persistant storage
  require('./modules/Settings');
  // First create BrowserWindow
  createWindow();
  // Then get Spotify access token
  Spotify.getAccessToken().then(response => {
    if (response.code === 200) {
      log.info('[app.main.js] Generated Spotify token');
    }
  }).catch(error => {
    log.error('[app.main.js] Error generating Spotify token!');
    electron.dialog.showErrorBox('Error Generating Spotify Access Token!', error.message)
  });
});

/**
 * Refresh token
 * Called by render and uses electron's IPC to communicate
 */
electron.ipcMain.on('refresh-spotify-token', (event) => {
  Spotify.getAccessToken().then(response => {
    if (response.code === 200) {
      log.info('[app.main.js] Refreshed Spotify token');
      event.sender.send('refresh-token-success');
    }
  }).catch(error => {
    log.error('[app.main.js] Error refreshing Spotify token!');
    electron.dialog.showErrorBox('Error refreshing Spotify Access Token!', error.message)
    event.sender.send('refresh-token-error')
  });
})

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
