/**
 * Settings.js: Initializes persistant storage and writes some configs when main process
 * is invokes
 * 
 * Refer https://github.com/nathanbuchar/electron-settings
 */

const isDev = require('electron-is-dev');
const path = require('path');
const settings = require('electron-settings');

// FFmpeg [platform dependant]
ffmpegPath = isDev ? path.join(__dirname, '../../ffmpeg', process.platform, 'ffmpeg') : path.join(process.resourcesPath, 'ffmpeg', process.platform, 'ffmpeg');
if (process.platform == 'win32') {
  ffmpegPath += '.exe';
}
settings.set('FFMPEG_PATH', ffmpegPath);
// Default download directory
settings.has('downloadDirectory') ? null : settings.set('downloadDirectory', path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], 'Music'));
// Default download format
settings.has('defaultAudioOut') ? null : settings.set('defaultAudioOut', 'mp3');