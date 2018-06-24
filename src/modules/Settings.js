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
let ffmpegPath = isDev ? path.join(__dirname, '../../bin/ffmpeg', process.platform, 'ffmpeg') : path.join(process.resourcesPath, 'ffmpeg', process.platform, 'ffmpeg');
if (process.platform === 'win32') {
  ffmpegPath += '.exe';
}
settings.set('FFMPEG_PATH', ffmpegPath);
let rainbowPath = isDev ? path.join(__dirname, '../../bin/rainbow', process.platform, 'rainbow') : path.join(process.resourcesPath, 'rainbow', process.platform, 'rainbow');
if (process.platform === 'win32') {
  rainbowPath += '.exe';
}
settings.set('RAINBOW_PATH', rainbowPath);
// Default download directory
settings.has('downloadDirectory') ? null : settings.set('downloadDirectory', path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], 'Music'));
// Default download format
settings.has('defaultAudioOut') ? null : settings.set('defaultAudioOut', 'mp3');
// Embed meta-data
settings.has('embedMetadata') ? null : settings.set('embedMetadata', false);