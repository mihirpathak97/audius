
/*
  YTSearch.js: YouTube search module using the v3 API
*/

var querystring = require('querystring')
var xhr = require('xhr')

if (!xhr.open) xhr = require('request')

let convertYTDuration = (duration) => {
  var a = duration.match(/\d+/g);
  if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
      a = [0, a[0], 0];
  }
  if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
      a = [a[0], 0, a[1]];
  }
  if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
      a = [a[0], 0, 0];
  }
  duration = 0;
  if (a.length == 3) {
      duration = duration + parseInt(a[0]) * 3600;
      duration = duration + parseInt(a[1]) * 60;
      duration = duration + parseInt(a[2]);
  }
  if (a.length == 2) {
      duration = duration + parseInt(a[0]) * 60;
      duration = duration + parseInt(a[1]);
  }
  if (a.length == 1) {
      duration = duration + parseInt(a[0]);
  }
  return duration*1000;
}

module.exports = function search(metadata, callback) {

  var apiParams = {
    part: 'snippet',
    maxResults: 25,
    q: metadata.title,
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
      var result = JSON.parse(body);

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
        }
      })

      // Asyncronously get video duration and write to result
      result.forEach(element => {
        xhr({
          url: 'https://www.googleapis.com/youtube/v3/videos?' + querystring.stringify({
            id: element.id,
            part: 'snippet, contentDetails',
            key: 'AIzaSyBVqWn_4aUZnAtJXSTyg-WRevZrRK3ctPE'
          }),
          method: 'GET',
        }, function (err, res, body) {
            if(err) {
              console.log(err);
              return '0';
            }
            element.duration = convertYTDuration(JSON.parse(body).items[0].contentDetails.duration);
        });
      });

      // [TODO]: Implement sorting results by Spotify audio duration

      return callback(null, result)
    } catch (error) {
      return callback(error)
    }
  })

}
