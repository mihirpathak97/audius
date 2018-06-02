
/*
  SpotifyWebApi.js: JS wrapper for the Spotify Web API providing basic functionalities for searching
*/

var xhr = require('xhr')
if (!xhr.open) xhr = require('request')
var base64 = require('base-64')

const clientId = '6c67544dbe4a4d15a6b80eec0a5c0063';
const clientSecret = '710ba1ba3e324dc190b66eae8d7c613e';

const base64EncodedToken = base64.encode(clientId + ':' + clientSecret);

xhr({
  url: 'https://accounts.spotify.com/api/token',
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + base64EncodedToken,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: "grant_type=client_credentials"
}, function (err, resp, body) {
  if (err) {
    return console.log(err);
  }

  console.log(resp.body);

})
