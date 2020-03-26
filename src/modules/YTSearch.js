/*
  YTSearch.js: YouTube search module using the v3 API
*/

const axios = require('axios')
var querystring = require('querystring')
var log = require('./log')

let convertYTDuration = duration => {
  var a = duration.match(/\d+/g)
  if (
    duration.indexOf('M') >= 0 &&
    duration.indexOf('H') === -1 &&
    duration.indexOf('S') === -1
  ) {
    a = [0, a[0], 0]
  }
  if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1) {
    a = [a[0], 0, a[1]]
  }
  if (
    duration.indexOf('H') >= 0 &&
    duration.indexOf('M') === -1 &&
    duration.indexOf('S') === -1
  ) {
    a = [a[0], 0, 0]
  }
  duration = 0
  if (a.length === 3) {
    duration = duration + parseInt(a[0], 10) * 3600
    duration = duration + parseInt(a[1], 10) * 60
    duration = duration + parseInt(a[2], 10)
  }
  if (a.length === 2) {
    duration = duration + parseInt(a[0], 10) * 60
    duration = duration + parseInt(a[1], 10)
  }
  if (a.length === 1) {
    duration = duration + parseInt(a[0], 10)
  }
  return duration * 1000
}

let searchVideoById = youtubeId => {
  return new Promise(function(resolve, reject) {
    axios
      .get(
        'https://www.googleapis.com/youtube/v3/videos?' +
          querystring.stringify({
            id: youtubeId,
            part: 'snippet, contentDetails',
            key: process.env.YOUTUBE_V3_API_KEY,
          })
      )
      .then(response => {
        if (response.data.items.length === 0) {
          reject({
            code: '404Y',
            message: 'Your search did not match any results',
          })
        }
        let result = response.data.items.map(function(item) {
          return {
            id: item.id,
            link: 'https://www.youtube.com/watch?v=' + item.id,
            kind: item.kind,
            publishedAt: item.snippet.publishedAt,
            channelId: item.snippet.channelId,
            channelTitle: item.snippet.channelTitle,
            title: item.snippet.title,
            description: item.snippet.description,
            duration: convertYTDuration(item.contentDetails.duration),
          }
        })
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

let searchVideosByQuery = query => {
  log.info('YTSearch', 'Recieved search parameters - ' + query)

  var apiParams = {
    part: 'snippet',
    maxResults: 10,
    q: query,
    key: process.env.YOUTUBE_V3_API_KEY,
    type: 'video',
    // Topic ID for music
    // Gives us only music videos as resuts
    topicId: '/m/04rlf',
  }

  return new Promise(function(resolve, reject) {
    axios
      .get(
        'https://www.googleapis.com/youtube/v3/search?' +
          querystring.stringify(apiParams)
      )
      .then(response => {
        try {
          var result = response.data

          // crunch the results into a meaningfull JSON object
          result = result.items.map(function(item) {
            return {
              id: item.id.videoId,
              link: 'https://www.youtube.com/watch?v=' + item.id.videoId,
              kind: item.id.kind,
              publishedAt: item.snippet.publishedAt,
              channelId: item.snippet.channelId,
              channelTitle: item.snippet.channelTitle,
              title: item.snippet.title,
              description: item.snippet.description,
            }
          })
          // Asyncronously get video duration and write to result
          result.forEach(element => {
            axios
              .get(
                'https://www.googleapis.com/youtube/v3/videos?' +
                  querystring.stringify({
                    id: element.id,
                    part: 'snippet, contentDetails',
                    key: process.env.YOUTUBE_V3_API_KEY,
                  })
              )
              .then(response => {
                element.duration = convertYTDuration(
                  response.data.items[0].contentDetails.duration
                )
              })
              .catch(error => {
                reject(error.message)
              })
          })

          resolve(result)
        } catch (error) {
          console.log(error)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

module.exports = {
  searchVideosByQuery,
  searchVideoById,
}
