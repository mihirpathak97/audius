var os = require("os");
var util = require("util");
var EventEmitter = require("events").EventEmitter;
var async = require("async");
var progress = require("progress-stream");
var sanitize = require("sanitize-filename");

const path = require('path');
const ytdl = require('ytdl-core');
const Ffmpeg = require('fluent-ffmpeg');

const settings = window.require('electron-settings');
Ffmpeg.setFfmpegPath(settings.get('FFMPEG_PATH'));

function downloadMp3(youtubeUrl, fileName, callback) {

  const infoOptions = {
    quality: 'highest'
  }

  const downloadOptions = {
    quality: 'highest',
    requestOptions: { maxRedirects: 5 }
  }

  fileName = path.join(settings.get('USERHOME'), fileName+'.mp3');

  ytdl.getInfo(youtubeUrl, infoOptions, function(err, info) {
    // Setup stream
    var stream = ytdl.downloadFromInfo(info, downloadOptions);
    stream.on("response", function(httpResponse) {
      console.log(httpResponse);

      var str = progress({
        length: parseInt(httpResponse.headers["content-length"])
      });

      // Start encoding
      var proc = new Ffmpeg({
        source: stream
      })
      .audioBitrate(info.formats[0].audioBitrate)
      .withAudioCodec("libmp3lame")
      .toFormat("mp3")
      .on("error", function(err) {
        callback(err.message);
      })
      .on("end", function() {
        callback(null, true);
      })
      .saveToFile(fileName);
    });
  });

}

module.exports = {
  downloadMp3
}
