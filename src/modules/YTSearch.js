
/*
  YTSearch.js: YouTube search module using the v3 API
*/

var querystring = require('querystring')
var xhr = require('xhr')

if (!xhr.open) xhr = require('request')

var params = {
  q: 'alan walker faded',
  part: 'snippet',
  key: 'AIzaSyBVqWn_4aUZnAtJXSTyg-WRevZrRK3ctPE',
  maxResults: 10
}

xhr({
  url: 'https://www.googleapis.com/youtube/v3/search?' + querystring.stringify(params),
  method: 'GET'
}, function (err, res, body) {
  if (err) return err

  try {
    var result = JSON.parse(body)

    console.log(result);
  } catch (e) {
    return e
  }
})
