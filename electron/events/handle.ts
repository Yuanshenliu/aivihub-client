import { HandleEvent, OnEvent } from './ipc-event'
import { BrowserWindow, ipcMain, dialog } from 'electron'
import { appParams } from '../store'
import fs from 'node:fs'
import { createDialogWindow } from '../windows/dialog'

ipcMain.handle(HandleEvent.INIT_APP, () => {
  return { ...appParams.value }
})

ipcMain.handle(HandleEvent.CAPTURE, (_event) => {
  return new Promise((resolve) => {
    BrowserWindow.fromWebContents(_event.sender)
      ?.capturePage()
      .then((c) => {
        resolve(c.toDataURL())
      })
  })
})

ipcMain.handle(HandleEvent.SELECT_IMAGE, (_event, args) => {
  return new Promise((resolve, reject) => {
    const result = dialog.showOpenDialogSync({
      filters: [{ name: 'Images', extensions: ['jpg', 'png'] }],
      ...args
    })
    if (result) {
      const path = result.map((p) => {
        return fs.readFileSync(p)
      })
      resolve(path)
    } else {
      reject()
    }
  })
})

ipcMain.handle(
  HandleEvent.OPEN_DIALOG,
  (_event, data: { width: number; height: number; name: string }) => {
    return new Promise((resolve) => {
      const parent = BrowserWindow.fromWebContents(_event.sender) as BrowserWindow
      const dialog = createDialogWindow(parent, data)

      ipcMain.on(OnEvent.CLOSE_DIALOG, (_event, args) => {
        if (args.name !== data.name) return
        dialog?.destroy()

        if (args) {
          resolve(args)
        }
      })
    })
  }
)
