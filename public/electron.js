const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const YTCore = require('../src/modules/YTCore');
const Spotify = require('../src/modules/SpotifyWebApi');

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const settings = require('electron-settings');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680, frame: false});
  mainWindow.setResizable(false);
  mainWindow.loadURL(isDev ? 'http://localhost:3000?Home' : `file://${path.join(__dirname, '../react-compiled/index.html?Home')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {

  /*
    Write some conf to persisent storage on init
  */
  // FFmpeg
  settings.set('FFMPEG_PATH', isDev ? path.join(__dirname, '../ffmpeg/ffmpeg.exe') : path.join(__dirname, '../../ffmpeg/ffmpeg.exe'));
  // Default download directory
  settings.has('downloadDirectory') ? null : settings.set('downloadDirectory', process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']);
  // Default download format
  settings.has('defaultAudioOut') ? null : settings.set('defaultAudioOut', 'mp3');

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
