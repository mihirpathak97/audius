
/*
  YTCore.js: YouTube audio stream and download
*/

const path = require('path');
const ytdl = require('ytdl-core');
const through2 = require('through2');
const Ffmpeg = require('fluent-ffmpeg');

var os = require("os");
var util = require("util");
var EventEmitter = require("events").EventEmitter;
var async = require("async");
var progress = require("progress-stream");
var sanitize = require("sanitize-filename");


const express = require('express');
const nofavicon = require('express-no-favicons');
const app = express();

function stream(id, res) {
  const video = ytdl(id)
  const ffmpeg = new Ffmpeg(video)
  const stream = through2()

  try {
    ffmpeg.format('mp3').pipe(stream)
    return stream
  } catch (e) {
    throw e
  }
}

function listen (port, callback = () => {}) {

  // No favicon
  app.use(nofavicon())

  // display test page
  app.get('/', (req, res) => {
    const file = path.resolve(__dirname, 'audio.html')
    res.sendFile(file)
  })

  app.get('/:videoId', (req, res) => {
    const videoId = req.params.videoId

    try {
      stream(videoId).pipe(res)
    } catch (e) {
      console.error(e)
      res.sendStatus(500, e)
    }
  })

  app.use((req, res) => {
    res.sendStatus(404)
  })

  app.listen(port, callback)
}

function downloadMp3(youtubeUrl, fileName, callback) {

  const settings = window.require('electron-settings');

  const infoOptions = {
    quality: 'highest'
  }

  const downloadOptions = {
    quality: 'highest',
    requestOptions: { maxRedirects: 5 }
  }

  fileName = path.join(settings.get('USERHOME'), fileName, '.mp3');

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
  listen,
  downloadMp3
}
