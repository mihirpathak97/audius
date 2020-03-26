/*
  SpotifyWebApi.js: JS wrapper for the Spotify Web API providing basic functionalities for searching
*/

const base64 = require('base-64')
const querystring = require('querystring')
const axios = require('axios')
const storage = require('./Store')

// client Id and Secret for Spotify must be set as env variables
const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

// Spotify API endpoint URL
const endpointURL = 'https://api.spotify.com/v1/'
const commonConfig = {
  headers: {
    Authorization: 'Bearer ' + storage.get('spotifyAccessToken'),
  },
}
var triesRemaining = 5

let getAccessToken = () => {
  return new Promise(function(resolve, reject) {
    axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      params: {
        grant_type: 'client_credentials',
      },
      headers: {
        Authorization: 'Basic ' + base64.encode(clientId + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        storage.set('spotifyAccessToken', response.data.access_token)
        resolve({
          code: 200,
          message: 'OK',
        })
      })
      .catch(error => {
        reject(error)
      })
  })
}

let refreshSpotifyToken = () => {
  return new Promise(function(resolve, reject) {
    if (triesRemaining > 0) {
      triesRemaining--
      const renderer = require('electron').ipcRenderer
      renderer.send('refresh-spotify-token')
      renderer.on('refresh-token-success', () => {
        resolve(true)
        triesRemaining = 0
      })
      renderer.on('refresh-token-error', () => {
        reject(false)
      })
    }
  })
}

let fetch = (uri, config) => {
  return new Promise((resolve, reject) => {
    function run() {
      axios
        .get(endpointURL + uri, {
          ...commonConfig,
          ...config,
        })
        .then(({ data: response }) => {
          resolve(response)
        })
        .catch(error => {
          // Refresh token
          if (error.message.includes('401')) {
            refreshSpotifyToken()
              .then(run)
              .catch(reject(error))
          } else {
            reject(error)
          }
        })
    }
    run()
  })
}

let sanitizeTrackResponse = response => {
  return {
    type: response.type,
    name: response.name,
    artist: {
      name: response.artists[0].name,
      spotifyId: response.artists[0].id,
      spotifyUrl: response.artists[0].external_urls.spotify,
    },
    album: {
      name: response.album.name,
      image: response.album.images[1].url,
      spotifyId: response.album.id,
      spotifyUrl: response.album.external_urls.spotify,
    },
    spotifyId: response.id,
    spotifyUrl: response.external_urls.spotify,
  }
}

let getSpotifyTrack = trackId => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch('tracks/' + trackId)
      resolve(sanitizeTrackResponse(response))
    } catch (error) {
      reject(error)
    }
  })
}

let getSpotifyPlaylist = playlistId => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch('playlists/' + playlistId)
      resolve({
        type: response.type,
        name: response.name,
        description: response.description,
        playlistThumbnail: response.images[1].url,
        spotifyId: response.id,
        spotifyUrl: response.external_urls.spotify,
      })
    } catch (error) {
      reject(error)
    }
  })
}

let search = link => {
  return new Promise(async (resolve, reject) => {
    let type = link.split('/')[3]
    let id = link.split('/')[4]
    try {
      switch (type) {
        case 'track':
          resolve(await getSpotifyTrack(id))
          break
        case 'playlist':
          resolve(await getSpotifyPlaylist(id))
          break
        default:
          reject({
            code: 400,
            message: 'Unsupported Spotify link',
          })
          break
      }
    } catch (error) {
      reject(error)
    }
  })
}

let searchTrackByQuery = query => {
  return new Promise(async (resolve, reject) => {
    var params = {
      q: query,
      type: 'track',
    }
    triesRemaining = 5
    try {
      let response = await fetch('search?' + querystring.stringify(params))
      if (response.tracks.items.length === 0) {
        reject({
          code: '404S',
          message: 'Your search did not match any results',
        })
      }
      resolve(sanitizeTrackResponse(response.tracks.items[0]))
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getAccessToken,
  searchTrackByQuery,
  search,
}
