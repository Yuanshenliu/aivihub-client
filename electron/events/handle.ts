import { HandleEvent } from './ipc-event'
import { BrowserWindow, ipcMain } from 'electron'
import { store } from '../store'

ipcMain.handle(HandleEvent.INIT_APP, () => {
  return { ...store.value }
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
