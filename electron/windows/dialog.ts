import { BrowserWindow } from 'electron'
import type { Rectangle } from 'electron'
import path from 'path'
import { URL } from '../main'
import { getBackground } from '../utils/theme'

const html = 'dialog.html'

export function createDialogWindow(
  parent: BrowserWindow,
  { width, height }: { width: number; height: number }
) {
  const bounds = parent?.getBounds() as Rectangle

  const x = bounds.x + parent.getBounds().width / 2 - width / 2
  const y = bounds.y + parent.getBounds().height / 2 - height / 2

  let dialogWindow: BrowserWindow | null = new BrowserWindow({
    resizable: false,
    x,
    y,
    width,
    height,
    frame: false,
    modal: true,
    show: false,
    backgroundColor: getBackground(),
    parent: parent,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })


  dialogWindow.loadURL(path.join(URL, html))

  dialogWindow.once('ready-to-show', () => {
    dialogWindow?.show()
  })

  dialogWindow.once('hide', () => {
    dialogWindow = null
  })

  return dialogWindow
}
