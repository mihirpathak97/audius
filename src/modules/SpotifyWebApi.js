
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

let searchTrackByQuery = (query) => {
  return new Promise(function(resolve, reject) {
    const settings = window.require('electron-settings');
    var params = {
      q: query,
      type: 'track'
    }
    var triesRemaining = 5;
    function run() {
      axios.get(endpointURL + 'search?' + querystring.stringify(params), {headers: {
        'Authorization': 'Bearer ' + settings.get('spotifyAccessToken')
      }})
      .then(response => {
        // Check if result is obtained
        if(response.data.tracks.items.length === 0) {
          reject({
            code: '404S',
            message: 'Your search did not match any results'
          });
        }

        // Take the first result
        var track = response.data.tracks.items[0];

        // Clean it up
        track = {
          title: track.name,
          trackArtist: track.artists[0].name,
          albumArtist: track.album.artists[0].name,
          album: track.album.name,
          albumArt: track.album.images[1].url,
          spotifyUrl: track.external_urls.spotify,
          spotifyId: track.id,
          SpotifyUri: track.uri,
          isrc: track.external_ids.isrc,
          duration_ms: track.duration_ms
        }
        resolve(track)
      })
      .catch(error => {
        // Send IPC message to main
        // to refresh token
        if (error.message.includes('401') && triesRemaining > 0) {
          triesRemaining--;
          const renderer = window.require('electron').ipcRenderer;
          renderer.send('refresh-spotify-token')
          renderer.on('refresh-token-success', run)
          renderer.on('refresh-token-error', () => {
            reject(error)
          })
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
  searchTrackByQuery
};
