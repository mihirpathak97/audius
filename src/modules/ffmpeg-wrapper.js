/*
  ffmpeg-wrapper.js - A wrapper to include the correct fluent-ffmpeg module file
  as webpack does not support contitional require
*/

module.exports = require('../../node_modules/fluent-ffmpeg/lib/fluent-ffmpeg')
