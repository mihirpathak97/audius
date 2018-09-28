import axios from 'axios'
const log = require('electron-log')
const Spotify = require('./SpotifyWebApi')
const YTSearch = require('./YTSearch')
const querystring = require('querystring')
let queryCheck = function (query) {
  return new Promise(function(resolve, reject) {
    if (query.includes('youtube.com')) {
      YTSearch.searchVideoById(query.split('?v=')[1]).then(response => {
        // Get Spotify metadata
        Spotify.searchTrackByQuery(response.data.items[0].title).then(metadata => {
          console.log(metadata);
        }).catch(spotifyError => {
          console.log(spotifyError);
          reject(spotifyError)
        })
      }).catch(error => {
        reject(error)
      })
    }
    else if (query.includes('spotify.com')) {
      Spotify.searchTrackById(query)
    }
    else {
      Spotify.searchTrackByQuery(query)
    }
  });
}

export { queryCheck }
