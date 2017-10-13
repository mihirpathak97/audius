const remote = require('electron').remote;
var w3js = document.createElement('script');
w3js.src = 'src/js/w3.js';
document.head.appendChild(w3js);

function minimize() {
  var window = remote.getCurrentWindow();
  window.minimize();
}

function quit() {
  var window = remote.getCurrentWindow();
  window.close();
}

function hideModal() {
  document.getElementsByClassName('modal')[0].style.display = 'none';
}

function run_search() {
  output = document.getElementById('output');
  query = document.getElementById('query').value;
  if(document.getElementById('m4a').checked){
    format = '.m4a';
  }
  else {
    format = '.mp3';
  }
  output.innerHTML = 'Please wait, querying...';
  w3.addClass('#albumart', 'spin');
  queue = document.getElementById('queue');
  albumart = document.getElementById('albumart');
  document.getElementById('queue').style.display = 'block';
  progress = document.getElementById('inner');
  progress.style.width = '0%';
  const process = require('child_process');
  const path = require('path');
  var ls = process.execFile(path.join(__dirname + '/src/core-api/win/audius.exe'), ['--download', query], ['-o', format]);
  ls.stdout.on('data', function(data){
    if (data.indexOf('albumart:') > -1) {
      w3.removeClass('#albumart', 'spin');
      img = albumart.getElementsByTagName('img')[0];
      img.style.display = 'block';
      img.src = data.substring(11);
      progress.style.width = '30%';
    }
    else if(data.indexOf('Downloading') > -1) {
      output.innerHTML = 'Downloading...';
      progress.style.width = '60%';
    }
    else if(data.indexOf('Converting') > -1) {
      output.innerHTML = data;
      progress.style.width = '80%';
    }
    else if(data.indexOf('Done :)') > -1) {
      output.innerHTML = data;
      progress.style.width = '100%';
    }
    else if(data.indexOf('Song already exists') > -1) {
      output.innerHTML = data;
      progress.style.width = '100%';
    }
    else {
      output.innerHTML = data;
    }
  });
  ls.stderr.on('data', function (data) {
    var modal = document.getElementsByClassName('modal')[0]
    if (data.indexOf('ConnectionError') > -1) {
      modal.getElementsByTagName('p')[0].innerHTML = 'Please check your internet connection!';
      modal.style.display = 'block';
    }
    else {
      modal.getElementsByTagName('p')[0].innerHTML = 'There was some error!';
      modal.style.display = 'block';
    }
  })
}
