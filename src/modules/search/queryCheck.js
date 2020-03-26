const Spotify = require('../SpotifyWebApi')
const YTSearch = require('../YTSearch')
let queryCheck = function(query) {
  return new Promise(function(resolve, reject) {
    if (query.includes('youtube.com')) {
      if (query.includes('playlist?')) {
        reject({
          code: 400,
          message: 'Playlists are not supported!',
        })
      }
      YTSearch.searchVideoById(query.split('?v=')[1])
        .then(response => {
          // Get Spotify metadata
          Spotify.searchTrackByQuery(response[0].title)
            .then(metadata => {
              resolve({
                youtubeResult: response,
                spotifyResult: metadata,
              })
            })
            .catch(spotifyError => {
              if (spotifyError.code === '404S') {
                resolve({
                  youtubeResult: response,
                  spotifyResult: null,
                })
              }
              reject(spotifyError)
            })
        })
        .catch(error => {
          reject(error)
        })
    } else if (query.includes('spotify.com')) {
      Spotify.search(query)
        .then(response => {
          switch (response.type) {
            case 'track':
              YTSearch.searchVideosByQuery(
                response.artist.name + ' ' + response.name
              )
                .then(YTresponse => {
                  resolve({
                    spotifyResult: response,
                    youtubeResult: YTresponse,
                  })
                })
                .catch(YTerror => {
                  reject(YTerror)
                })
              break

            case 'playlist':
              let youtubeResult = []
              response.tracks.forEach(track => {
                YTSearch.searchVideosByQuery(
                  track.artist.name + ' ' + track.name
                )
                  .then(YTresponse => {
                    youtubeResult.push({
                      spotifyResult: response,
                      youtubeResult: YTresponse,
                    })
                  })
                  .catch(YTerror => {
                    //
                  })
              })
              resolve({
                spotifyResult: response,
                youtubeResult: youtubeResult,
              })
              break
            default:
              break
          }
        })
        .catch(error => reject(error))
    } else {
      Spotify.searchTrackByQuery(query)
        .then(response => {
          YTSearch.searchVideosByQuery(
            response.artist.name + ' ' + response.name
          )
            .then(YTresponse => {
              resolve({
                spotifyResult: response,
                youtubeResult: YTresponse,
              })
            })
            .catch(YTerror => {
              reject(YTerror)
            })
        })
        .catch(error => {
          reject(error)
        })
    }
  })
}

export { queryCheck }
