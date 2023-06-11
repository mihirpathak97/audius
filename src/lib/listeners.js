const { ipcMain } = require('electron')
const axios = require('axios')
const base64 = require('base-64')
const log = require('./log')
const fetch = require('node-fetch')

/**
 * Refresh Spotify token
 */
ipcMain.on('refresh-spotify-token', event => {
  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    params: {
      grant_type: 'client_credentials',
    },
    headers: {
      Authorization:
        'Basic ' +
        base64.encode(
          process.env.SPOTIFY_CLIENT_ID +
            ':' +
            process.env.SPOTIFY_CLIENT_SECRET
        ),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => {
      log.debug('listener.js', 'Refreshed Spotify token')
      event.returnValue = response.data.access_token
    })
    .catch(() => {
      log.error('listener.js', 'Error refreshing Spotify token!')
      event.returnValue = null
    })
})

ipcMain.on('fetch-youtube', (event, query) => {
  fetch(`https://www.youtube.com/results?search_query=${query}`)
    .then(resepone => resepone.text())
    .then(html => {
      event.returnValue = html
    })
    .catch(error => {
      console.log(error)
      event.returnValue = null
    })
})
