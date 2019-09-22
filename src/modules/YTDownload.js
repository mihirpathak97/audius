import { updateQueueItem, removeFromQueue } from '../actions/downloadQueue'
import store from '../store'

const progress = require('progress-stream')
const path = require('path')
const ytdl = require('ytdl-core')
const Ffmpeg = require('./ffmpeg-wrapper')
const sanitize = require('sanitize-filename')
const log = require('./log')

const storage = require('./Store')

let downloadAudio = (youtubeMetadata, spotifyMetadata) => {
  return new Promise(function(resolve, reject) {
    const outputFormat = storage.has('defaultAudioOut')
      ? storage.get('defaultAudioOut')
      : 'mp3'
    const outputCodec = outputFormat === 'mp3' ? 'libmp3lame' : 'aac'
    const infoOptions = {
      quality: 'highestaudio',
    }
    const fileName = path.join(
      storage.get('downloadDirectory'),
      sanitize(
        spotifyMetadata === null ? youtubeMetadata.title : spotifyMetadata.name
      ) +
        '.' +
        outputFormat
    )

    ytdl.getInfo(youtubeMetadata.link, infoOptions, function(err, info) {
      if (err) {
        log.error('YTDownload', JSON.stringify(err))
        reject(err.message)
      }

      var downloadOptions = {
        quality: 'highestaudio',
        requestOptions: { maxRedirects: 5 },
        format: ytdl.filterFormats(info.formats, 'audioonly')[0],
      }

      // Setup stream
      var stream = ytdl.downloadFromInfo(info, downloadOptions)
      stream.on('response', function(httpResponse) {
        // TODO: Add event emitter to share progress with caller

        // Build progress var
        var str = progress({
          length: parseInt(httpResponse.headers['content-length'], 10),
          time: 1000,
        })

        // Stream progress listener
        str.on('progress', function(progress) {
          store.dispatch(updateQueueItem(progress))
        })

        // Start encoding
        new Ffmpeg({
          source: stream.pipe(str),
        })
          .audioBitrate(info.formats[0].audioBitrate)
          .withAudioCodec(outputCodec)
          .on('error', function(err) {
            store.dispatch(removeFromQueue(0))
            log.error('YTDownload', JSON.stringify(err))
            reject(err.message)
          })
          .on('end', function() {
            // Embed metadata
            if (storage.get('embedMetadata') && spotifyMetadata !== null) {
              const rainbow = require('./rainbowWrapper')
              rainbow.embedMetadata(fileName, spotifyMetadata.spotifyTrackId)
            }
            store.dispatch(removeFromQueue(0))
            log.info(
              'YTDownload',
              'Download complete for ' + youtubeMetadata.link
            )
            resolve({
              code: 200,
              message: 'Download complete',
            })
          })
          .saveToFile(fileName)
      })
    })
  })
}

export { downloadAudio }
