
/*
  YTSearch.js: YouTube search module using the v3 API
*/

var querystring = require('querystring')
var xhr = require('xhr')

if (!xhr.open) xhr = require('request')

module.exports = function search(query, callback) {

  var apiParams = {
    part: 'snippet',
    maxResults: 25,
    q: query,
    key: 'AIzaSyBVqWn_4aUZnAtJXSTyg-WRevZrRK3ctPE',
    type: 'video',
    topicId: '/m/04rlf'
  }

  xhr({
    url: 'https://www.googleapis.com/youtube/v3/search?' + querystring.stringify(apiParams),
    method: 'GET'
  }, function (err, res, body) {
    if (err) {
      return callback(err)
    }
    try {
      var result = JSON.parse(body)

      // crunch the results into a meaningfull JSON object
      result = result.items.map(function (item) {
        return {
          id: item.id.videoId,
          link: 'https://www.youtube.com/watch?v=' + item.id.videoId,
          kind: item.id.kind,
          publishedAt: item.snippet.publishedAt,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnails: item.snippet.thumbnails
        }
      })

      return callback(null, result)
    } catch (error) {
      return callback(error)
    }
  })

}
