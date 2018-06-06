var progress = require("progress-stream");
const path = require('path');
const ytdl = require('ytdl-core');
const Ffmpeg = require('./ffmpeg-wrapper');
var sanitize = require("sanitize-filename")

const settings = window.require('electron-settings');
Ffmpeg.setFfmpegPath(settings.get('FFMPEG_PATH'));

function download(youtubeUrl, metadata, callback) {

  const outputFormat = settings.has('defaultAudioOut') ? settings.get('defaultAudioOut') : 'mp3';
  const outputCodec = outputFormat == 'mp3' ? "libmp3lame" : "aac";

  const infoOptions = {
    quality: 'highest'
  }

  const fileName = path.join(settings.get('downloadDirectory'), sanitize(metadata.title) + '.' + outputFormat);

  ytdl.getInfo(youtubeUrl, infoOptions, function(err, info) {

    if (err) {
      return callback(err.message);
    }

    var downloadOptions = {
      quality: 'highest',
      requestOptions: { maxRedirects: 5 },
      format: ytdl.filterFormats(info.formats, 'audioonly')[0]
    }

    // Setup stream
    var stream = ytdl.downloadFromInfo(info, downloadOptions);
    stream.on("response", function(httpResponse) {

      // TODO: Add event emitter to share progress with caller
      // TODO: [FFmpeg] Embed ID3 metadata along with audio while encoding

      // Build progress var
      var str = progress({
        length: parseInt(httpResponse.headers["content-length"], 10),
        time: 1000
      });

      // Stream progress listener
      str.on("progress", function(progress) {
        console.log(progress);
      });

      // Start encoding
      var proc = new Ffmpeg({
        source: stream
      })
      .audioBitrate(info.formats[0].audioBitrate)
      .withAudioCodec(outputCodec)
      .on("error", function(err) {
        return callback(err.message);
      })
      .on("end", function() {
        return callback(null, "done");
      })
      .saveToFile(fileName);
    });
  });

}

module.exports = {
  download
}
