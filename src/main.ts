const { app, BrowserWindow } = require('electron')
const storage = require('electron-json-storage')
const path = require('path')
const url = require('url')

let win: Electron.BrowserWindow

function createWindow () {
  let args = {
    width: 768,
    height: 500,
    icon: 'app/main.ico',
    frame: false,
    minWidth: 768,
    minHeight: 500,
    title: 'Electron Boilerplate',
    fullscreen: false
  }

  if (process.argv.includes('full'))
    args['fullscreen'] = true

  win = new BrowserWindow(args)

  win.setMenu(null)

  win.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }))

  if (process.argv.includes('dev'))
    win.webContents.openDevTools()

  win.on('closed', () => {
    app.quit()
  })
}

let shouldQuit = app.makeSingleInstance(_ => {
  if (win) {
    if (win.isMinimized())
      win.restore()
    win.focus()
  }
})

if (shouldQuit)
  app.quit()

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('activate', () => {
  createWindow()
})
