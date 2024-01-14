import { BrowserWindow } from 'electron'
import path from 'node:path'
import { URL } from '../main'

export let loginWindow: BrowserWindow | null
const html = 'login.html'

export function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 740,
    height: 400,
    frame: false,
    show: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  loginWindow.loadURL(path.join(URL, html))

  loginWindow.once('ready-to-show', () => {
    loginWindow?.show()
  })
}
