/**
 * Settings.js: Initializes persistant storage and writes some configs when main process
 * is invoked. It is necessary to do it here as both __dirname and electron will not 
 * be available inside a react component
 * 
 * Refer https://github.com/nathanbuchar/electron-settings
 */

const isDev = require('electron-is-dev');
const path = require('path');
const settings = require('electron-settings');

let ffmpegPath = isDev ? path.join(__dirname, '../../bin/ffmpeg', process.platform, 'ffmpeg') : path.join(process.resourcesPath, 'bin', 'ffmpeg', process.platform, 'ffmpeg');
let rainbowPath = isDev ? path.join(__dirname, '../../bin/rainbow', process.platform, 'rainbow') : path.join(process.resourcesPath, 'bin', 'rainbow', process.platform, 'rainbow');
let downloadDirectory = path.join(process.env['HOME'], 'Music');
let defaultAudioOut = "mp3";
let embedMetadata = true;

if(process.platform === "win32") {
  // Add exe for binaries in win32
  ffmpegPath += ".exe";
  rainbowPath += ".exe";
  // Use USERPROFILE instead of HOME
  downloadDirectory = path.join(process.env['USERPROFILE'], 'Music');
}

if(process.platform === "darwin") {
  // Default audio out for Mac is M4A
  defaultAudioOut = "m4a";
}

// set binary paths
settings.set('FFMPEG_PATH', ffmpegPath);
settings.set('RAINBOW_PATH', rainbowPath);

// Default download directory
if(!settings.has('downloadDirectory')) { 
  settings.set('downloadDirectory', downloadDirectory);
}
// Default download format
if(!settings.has('defaultAudioOut')) { 
  settings.set('defaultAudioOut', defaultAudioOut);
}
// Embed meta-data
if(!settings.has('embedMetadata')) { 
  settings.set('embedMetadata', embedMetadata);
}