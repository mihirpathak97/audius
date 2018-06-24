/**
 * Bootstrap
 * 
 * Sets up the development environment
 */
var download = require('download-file');
var admZip = require('adm-zip');
var path = require('path');

// Download binraries
const fileNameFFmpeg = process.platform === "win32" ? 'ffmpeg.exe' : 'ffmpeg';
const fileNameRainbow = process.platform + '.zip';

var urlFFmpeg = "https://s3.ap-south-1.amazonaws.com/mihirpathak/audius/binaries/ffmpeg/" + process.platform + "/" + fileNameFFmpeg;
var urlRainbow = "https://s3.ap-south-1.amazonaws.com/mihirpathak/audius/binaries/rainbow/" + fileNameRainbow;
 
download(urlFFmpeg, {
    directory: "../bin/ffmpeg/",
    filename: fileNameFFmpeg
}, function(err){
    if (err) {
      console.log(err);
    }
    console.log("Finished downloading FFmpeg")
});

download(urlRainbow, {
    directory: "../bin/rainbow/",
    filename: fileNameRainbow
}, function(err){
    if (err) {
      console.log(err);
    }
    console.log("Finished downloading Rainbow")
    var zip = new admZip(path.join('../bin/rainbow/', fileNameRainbow));
    console.log("Extracting files...");
    zip.extractAllTo("../bin/rainbow/" + process.platform, true);
});

