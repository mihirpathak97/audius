const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const YTCore = require('../src/modules/YTCore.js');
const Spotify = require('../src/modules/SpotifyWebApi.js');

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

process.env.FFMPEG_PATH = isDev ?  path.join(__dirname, '../ffmpeg/ffmpeg.exe') : path.join(__dirname, '../../ffmpeg/ffmpeg.exe');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680, frame: false});
  mainWindow.setResizable(false);
  mainWindow.loadURL(isDev ? 'http://localhost:3000?Home' : `file://${path.join(__dirname, '../react-compiled/index.html?Home')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {

  // First create BrowserWindow
  createWindow()
  // Then start audio stream listener
  YTCore.listen(6969, () => {
    console.log(`Listening on port http://localhost:6969`)
  })
  // Then get Spotify access token
  Spotify.getAccessToken()
});

app.on('window-all-closed', () => {
  // Don't quit app on MacOS
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
