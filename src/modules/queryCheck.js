const Spotify = require('./SpotifyWebApi')
const YTSearch = require('./YTSearch')
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
