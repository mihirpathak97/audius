/**
 * Bootstrap
 * 
 * Sets up the development environment
 */
var download = require('download-file');
var admZip = require('adm-zip');
var path = require('path');

function downloadBinaries(platform) {
    console.log("Downloading binaries for " + platform);
    const fileNameFFmpeg = platform === "win32" ? 'ffmpeg.exe' : 'ffmpeg';
    const fileNameRainbow = platform + '.zip';

    var urlFFmpeg = "https://s3.ap-south-1.amazonaws.com/mihirpathak/audius/binaries/ffmpeg/" + platform + "/" + fileNameFFmpeg;
    var urlRainbow = "https://s3.ap-south-1.amazonaws.com/mihirpathak/audius/binaries/rainbow/" + fileNameRainbow;

    download(urlFFmpeg, {
        directory: "bin/ffmpeg/" + platform,
        filename: fileNameFFmpeg
    }, function(err){
        if (err) {
          console.log(err);
        }
        console.log("Finished downloading FFmpeg for " + platform)
    });
    
    download(urlRainbow, {
        directory: "bin/rainbow/",
        filename: fileNameRainbow
    }, function(err){
        if (err) {
          console.log(err);
        }
        console.log("Finished downloading Rainbow for " + platform)
        var zip = new admZip(path.join('bin/rainbow/', fileNameRainbow));
        console.log("Extracting files...");
        zip.extractAllTo("bin/rainbow/" + platform, true);
    });
}


// Download for all platforms [since CI will be doing cross-platform build]
// You can commnet out the rest of them.
// 
// Downloads approximately 150mb worth files.
downloadBinaries("win32");
downloadBinaries("linux");
downloadBinaries("darwin");

