const Spotify = require('./SpotifyWebApi')
const YTSearch = require('./YTSearch')
let queryCheck = function (query) {
  return new Promise(function(resolve, reject) {
    if (query.includes('youtube.com')) {
      if (query.includes('playlist?')) {
        reject({
          code: 400,
          message: 'Playlists are not supported!'
        })
      }
      YTSearch.searchVideoById(query.split('?v=')[1]).then(response => {
        // Get Spotify metadata
        Spotify.searchTrackByQuery(response[0].title).then(metadata => {
          resolve({
            youtubeResult: response,
            spotifyResult: metadata
          })
        }).catch(spotifyError => {
          if (spotifyError.code === '404S') {
            resolve({
              youtubeResult: response,
              spotifyResult: null
            })
          }
          reject(spotifyError)
        })
      }).catch(error => {
        reject(error)
      })
    }
    else if (query.includes('spotify.com')) {
      reject({
        code: 403,
        message: 'Spotify links are not allowed at the moment'
      })
    }
    else {
      Spotify.searchTrackByQuery(query).then(response => {
        YTSearch.searchVideosByQuery(response.title).then(YTresponse => {
          resolve({
            spotifyResult: response,
            youtubeResult: YTresponse
          })
        }).catch(YTerror => {
          reject(YTerror)
        })
      }).catch(error => {
        reject(error)
      })
    }
  });
}

export { queryCheck }
