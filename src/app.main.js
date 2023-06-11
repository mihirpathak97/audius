/**
 * App's main process
 * Calls electron's API to create window and initialize the app
 */

const { app, protocol, BrowserWindow, Menu } = require('electron')

const { osxApplicationMenu } = require('./modules/electronConfig')

const path = require('path')
const isDev = require('electron-is-dev')
const electronConfig = require('./modules/electronConfig')

var log = require('electron-log')
log.transports.file.level = 'debug'

let mainWindow

require('dotenv').config()

function createWindow() {
  log.info('[app.main.js] Creating window')
  mainWindow = new BrowserWindow(electronConfig.windowConfig.mainWindow)
  mainWindow.setResizable(false)
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../react-compiled/index.html')}`
  )
  mainWindow.on('closed', () => (mainWindow = null))

  process.platform === 'darwin'
    ? Menu.setApplicationMenu(Menu.buildFromTemplate(osxApplicationMenu))
    : Menu.setApplicationMenu(null)

  // Register protocol `audius` for serving static files
  // as webpack + chromium causes relative path issue
  protocol.registerFileProtocol(
    'audius',
    (request, callback) => {
      const url = request.url.substr(9)
      if (url.includes('static')) {
        callback({
          path: path.normalize(`${__dirname}/../react-compiled/${url}`),
        })
      }
    },
    error => {
      if (error) console.error('Failed to register protocol')
    }
  )
}

app.whenReady().then(() => {
  require('./modules/autoUpdate')
  require('./modules/settings')
  require('./lib/listeners')

  log.info('[app.main.js] App ready')
  createWindow()
})

app.on('window-all-closed', () => {
  // [OS X] it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  log.info('[app.main.js] Quitting app')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // [OS X] Re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
