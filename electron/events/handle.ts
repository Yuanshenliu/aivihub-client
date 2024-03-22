import { HandleEvent, OnEvent } from './ipc-event'
import { BrowserWindow, ipcMain, dialog } from 'electron'
import { appParams } from '../store'
import fs from 'node:fs'
import { createDialogWindow } from '../windows/dialog'
import path from 'node:path'
import { initTaskQueue } from '../main'

ipcMain.handle(HandleEvent.INIT_APP, () => {
  initTaskQueue()
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

ipcMain.handle(HandleEvent.SELECT_VIDEO, () => {
  return new Promise((resolve) => {
    dialog
      .showOpenDialog({
        title: '选择视频',
        filters: [{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] }]
      })
      .then(async ({ canceled, filePaths }) => {
        if (!canceled) {
          const videoPath = filePaths[0]
          const size = fs.statSync(videoPath).size
          const extensionName = path.extname(videoPath)
          resolve({ path: filePaths[0], size, extensionName })
        }
      })
  })
})
