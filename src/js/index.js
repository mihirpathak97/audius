const remote = require('electron').remote;
const platform = require('process').platform;

function loadDisclaimer() {
  const BrowserWindow = remote.BrowserWindow;
  var win = new BrowserWindow({frame:false, width: 800, height: 600, resizable:false});
  win.loadURL('file://' + __dirname + '/disclaimer.html');
}

function minimize() {
  var window = remote.getCurrentWindow();
  window.minimize();
}

function quit() {
  var window = remote.getCurrentWindow();
  window.close();
}

function hideModal() {
  $('.modal').hide();
}

function run_search() {
  query = $('#query').val();
  if(document.getElementById('m4a').checked){
    format = '.m4a';
  }
  else {
    format = '.mp3';
  }
  $('#output').html('Please wait, querying...');
  $('#albumart').addClass('spin');
  $('#albumart').children('img').css('display','none');
  $('#queue').show();
  $('#inner').css('width', '0%');
  const process = require('child_process');
  const path = require('path');
  if (platform == 'win32') {
    var ls = process.execFile(path.join(__dirname + '/src/core-api/win/audius.exe'), ['--download', query, '-o', format]);
  }
  else if (platform == 'linux') {
    var ls = process.execFile(path.join(__dirname + '/src/core-api/linux/audius'), ['--download', query, '-o', format]);
  }
  ls.stdout.on('data', function(data){
    if (data.indexOf('could not be found') > -1){
      $('#albumart').removeClass('spin');
      $('#albumart').children('img').css('display','block');
      $('#albumart').children('img').attr("src", "assets/notfound.png");
      $('#inner').css('width', '30%');
    }
    else if (data.indexOf('albumart:') > -1) {
      $('#albumart').removeClass('spin');
      $('#albumart').children('img').css('display','block');
      if (platform == 'win32') {
        $('#albumart').children('img').attr("src", data.toString().substring(11));
      }
      else {
        $('#albumart').children('img').attr("src", data.toString().substring(10));
      }
      $('#inner').css('width', '30%');
    }
    else if(data.indexOf('Downloading') > -1) {
      $('#output').html('Downloading...');
      $('#inner').css('width', '60%');
    }
    else if(data.indexOf('Converting') > -1) {
      $('#output').html(data);
      $('#inner').css('width', '80%');
    }
    else if(data.indexOf('Done :)') > -1) {
      $('#output').html(data);
      $('#inner').css('width', '100%');
    }
    else if(data.indexOf('Song already exists') > -1) {
      $('#output').html(data);
      $('#inner').css('width', '100%');
    }
    else {
      $('#output').html(data);
    }
  });
  ls.stderr.on('data', function (data) {
    if (data.indexOf('ConnectionError') > -1) {
      $('.modal').children('p').html('Please check your internet connection!');
      $('.modal').show();
    }
    else {
      $('.modal').children('p').html('There was some error!');
      $('.modal').show();
    }
    $('#queue').hide();
  })
}
