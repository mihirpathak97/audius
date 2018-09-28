
/*
  SpotifyWebApi.js: JS wrapper for the Spotify Web API providing basic functionalities for searching
*/

var xhr = require('xhr');
var base64 = require('base-64');
var querystring = require('querystring');
const axios = require('axios');

// client Id and Secret for 'Audius' from https://developer.spotify.com
const clientId = '6c67544dbe4a4d15a6b80eec0a5c0063';
const clientSecret = '710ba1ba3e324dc190b66eae8d7c613e';

// Spotify API endpoint URL
const endpointURL = 'https://api.spotify.com/v1/';

let getAccessToken = () => {
  xhr({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + base64.encode(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: "grant_type=client_credentials"
  }, function (err, resp, body) {
    if (err) {
      const { dialog } = require('electron');
      dialog.showErrorBox('Error!', 'There was an error generating the Spotify Access Token. Please check your internet connection.');
      return;
    }

    const settings = process.type === 'renderer' ? window.require('electron-settings') : require('electron-settings');
    // Store access_token in a persintant user data file
    settings.set('spotifyAccessToken', JSON.parse(body).access_token);
  })
}

let searchTrackByQuery = (query) => {
  return new Promise(function(resolve, reject) {
    const settings = window.require('electron-settings');
    var params = {
      q: query,
      type: 'track'
    }
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
      if (error.message.includes('401')) {
        getAccessToken()
      }
      else {
        reject(error)
      }
    })
  });
}

module.exports = {
  getAccessToken,
  searchTrackByQuery
};
