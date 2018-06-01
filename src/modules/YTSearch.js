
/*
  YTSearch.js: YouTube search module using the v3 API
*/

var querystring = require('querystring')
var xhr = require('xhr')

if (!xhr.open) xhr = require('request')

module.exports = function search(query, callback) {

  var apiParams = {
    q: query,
    key: 'AIzaSyBVqWn_4aUZnAtJXSTyg-WRevZrRK3ctPE',
    maxResults: 10,
    part: 'snippet'
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
      return callback(null, result)
    } catch (error) {
      return callback(error)
    }
  })

}
