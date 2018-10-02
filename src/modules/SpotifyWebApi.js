
/*
  SpotifyWebApi.js: JS wrapper for the Spotify Web API providing basic functionalities for searching
*/

const base64 = require('base-64');
const querystring = require('querystring');
const axios = require('axios');
const settings = process.type === 'renderer' ? window.require('electron-settings') : require('electron-settings');

// client Id and Secret for 'Audius' from https://developer.spotify.com
const clientId = '6c67544dbe4a4d15a6b80eec0a5c0063';
const clientSecret = '710ba1ba3e324dc190b66eae8d7c613e';

// Spotify API endpoint URL
const endpointURL = 'https://api.spotify.com/v1/';
const commonConfig = {
  headers: {
  'Authorization': 'Bearer ' + settings.get('spotifyAccessToken')
  }
}
var triesRemaining = 5;

let getAccessToken = () => {
  return new Promise(function(resolve, reject) {
    axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Authorization': 'Basic ' + base64.encode(clientId + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      settings.set('spotifyAccessToken', response.data.access_token)
      resolve({
        code: 200,
        message: 'OK'
      })
    }).catch(error => {
      reject(error)
    })
  });
}

let refreshSpotifyToken = () => {
  return new Promise(function(resolve, reject) {
    if (triesRemaining > 0) {
      triesRemaining--;
      const renderer = window.require('electron').ipcRenderer;
      renderer.send('refresh-spotify-token')
      renderer.on('refresh-token-success', () => {
        resolve(true)
      })
      renderer.on('refresh-token-error', () => {
        reject(false)
      })
    }
  });
}

let getSpotifyTrack = (trackId) => {
  return new Promise(function(resolve, reject) {
    function run() {
      axios.get(endpointURL + 'tracks/' + trackId, commonConfig)
      .then(response => {
        resolve({
          type: response.data.type,
          name: response.data.name,
          artist: response.data.artists[0].name,
          album: response.data.album.name,
          albumArt: response.data.album.images[1].url,
          spotifyId: response.data.id,
        })
      })
      .catch(error => {
        // Refresh token
        if (error.message.includes('401')) {
          refreshSpotifyToken()
            .then(run).catch(reject(error))
        }
        else {
          reject(error)
        }
      })
    }
    run()
  });
}

let parseSpotifyLink = (link) => {
  return new Promise(function(resolve, reject) {
    if (link.includes('/track/')) {
      getSpotifyTrack(link.split('/track/')[1])
        .then(response => resolve(response))
        .catch(error => reject(error))
    }
    else {
      reject({
        code: 400,
        message: 'Unsupported Spotify link'
      })
    }
  });
}

let searchTrackByQuery = (query) => {
  return new Promise(function(resolve, reject) {
    const settings = window.require('electron-settings');
    var params = {
      q: query,
      type: 'track'
    }
    triesRemaining = 5;
    function run() {
      axios.get(endpointURL + 'search?' + querystring.stringify(params), commonConfig)
      .then(response => {
        // Check if result is obtained
        if(response.data.tracks.items.length === 0) {
          reject({
            code: '404S',
            message: 'Your search did not match any results'
          });
        }

        // Take the first result and send it back
        getSpotifyTrack(response.data.tracks.items[0].id)
          .then(trackResonse => resolve(trackResonse))
          .catch(trackError => reject(trackError))
      })
      .catch(error => {
        // Refresh token
        if (error.message.includes('401')) {
          refreshSpotifyToken()
            .then(run).catch(reject(error))
        }
        else {
          reject(error)
        }
      })
    }
    run()
  });
}

module.exports = {
  getAccessToken,
  searchTrackByQuery,
  parseSpotifyLink
};
