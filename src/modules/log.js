let log = window.require('electron-log')

function getPrefix(filename) {
  return '[' + filename + '] ';
}

function info(filename, message) {
  log.info(getPrefix(filename) + message);
}
function debug(filename, message) {
  log.debug(getPrefix(filename) + message);
}
function warn(filename, message) {
  log.warn(getPrefix(filename) + message);
}
function error(filename, message) {
  log.error(getPrefix(filename) + message);
}

module.exports = {
  info,
  debug,
  warn,
  error
};
