/**
 * rainbowWrapper.js : A JS wrapper for a modified binary of 'rainbow'
 * Refer - https://github.com/mihirpathak97/rainbow/tree/audius-mod
 */

const exec = require('child_process').execFileSync;
const settings = window.require('electron-settings');

function embedMetadata(filePath, spotifyID) {
  exec(settings.get('RAINBOW_PATH'), [filePath, spotifyID], {}, (error, stdout, stderr) => {
    if(error) {
      return;
    }
  });
}

module.exports = {
  embedMetadata
}