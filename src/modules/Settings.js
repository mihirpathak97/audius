/**
 * Settings.js: Initializes persistant storage and writes some configs when main process
 * is invoked. It is necessary to do it here as both __dirname and electron will not
 * be available inside a react component
 *
 * Refer https://github.com/nathanbuchar/electron-settings
 */

const isDev = require('electron-is-dev')
const path = require('path')

const storage = require('./Store')

var log = require('electron-log')
log.transports.file.level = 'debug'

if (storage.has('didFirstRun')) {
  log.info('[Settings.js] Found config. Skipping')
  return
} else {
  log.info('[Settings.js] Setting default config')

  let rainbowPath = isDev
    ? path.join(__dirname, '../../bin/rainbow/build/rainbow')
    : path.join(process.resourcesPath, 'bin', 'rainbow', 'build', 'rainbow')
  let downloadDirectory = path.join(
    process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'],
    'Music'
  )
  let defaultAudioOut = 'mp3'
  let embedMetadata = true

  if (process.platform === 'win32') {
    // Add exe for binaries in win32
    rainbowPath += '.exe'
  }

  if (process.platform === 'darwin') {
    // Default audio out for Mac is M4A
    defaultAudioOut = 'm4a'
  }

  storage.set('RAINBOW_PATH', rainbowPath)
  storage.set('downloadDirectory', downloadDirectory)
  storage.set('defaultAudioOut', defaultAudioOut)
  storage.set('embedMetadata', embedMetadata)
  storage.set('youtubeApiKey', '')
  storage.set('spotifyClientId', '')
  storage.set('spotifyClientSecret', '')
  storage.set('didFirstRun', true)
}
