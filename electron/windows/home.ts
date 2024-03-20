import { BrowserWindow } from 'electron'
import path from 'node:path'
import { URL } from '../main'
import { windows } from '../store'
import { getBackground } from '../utils/theme'
import { SendEvent } from '../events/ipc-event'

const html = 'home.html'
export let home: BrowserWindow

export function createHome() {
  home = new BrowserWindow({
    width: 1080,
    height: 658,
    minWidth: 1080,
    minHeight: 658,
    resizable: true,
    backgroundColor: getBackground(),
    frame: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const id = `${new Date().getTime()}`

  windows.push({
    id,
    window: home
  })

  home.loadURL(path.join(URL, html))

  home.once('ready-to-show', () => {
    home?.show()

    if (home.isMaximized()) {
      setTimeout(() => {
        home.webContents.send(SendEvent.WINDOW_MAX_SIZE, true)
      }, 50)
    }
  })

  home.on('maximize', () => {
    home.webContents.send(SendEvent.WINDOW_MAX_SIZE, true)
  })

  home.on('unmaximize', () => {
    home.webContents.send(SendEvent.WINDOW_MAX_SIZE, false)
  })

  home.once('closed', () => {
    const target = windows.findIndex((w) => w.id === id)
    windows.splice(target, 1)
  })
}
