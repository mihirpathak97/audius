
/*
  YTCore.js: YouTube audio stream and download
*/

const path = require('path');
const ytdl = require('ytdl-core');
const through2 = require('through2');
const Ffmpeg = require('./ffmpeg-wrapper');
const settings = require('electron-settings');

Ffmpeg.setFfmpegPath(settings.get('FFMPEG_PATH'));

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

module.exports = {
  listen
}
