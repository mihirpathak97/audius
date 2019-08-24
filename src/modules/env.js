require('dotenv').config()

const log = require('electron-log');

const checkTheseVars = [
  'YOUTUBE_V3_API_KEY',
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET'
]

checkTheseVars.forEach(key => {
  if (!process.env[key]) {
    log.error('[env.js] Missing environemt key - ' + key);
  }
})