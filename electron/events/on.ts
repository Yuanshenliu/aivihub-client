import { OnEvent } from './ipc-event'
import { ipcMain, BrowserWindow } from 'electron'
import { createHome } from '../windows/home'
import { store } from '../store'

ipcMain.on(OnEvent.CLOSE_WINDOW, (event) => {
  BrowserWindow.fromWebContents(event.sender)?.close()
})

ipcMain.on(OnEvent.MINI_WINDOW, (event) => {
  BrowserWindow.fromWebContents(event.sender)?.minimize()
})

ipcMain.on(OnEvent.SET_THEME, (_event, dark) => {
  store.value.dark = dark
})

ipcMain.on(OnEvent.OPEN_DEV_TOOL, (_event) => {
  BrowserWindow.fromWebContents(_event.sender)?.webContents.openDevTools()
})

ipcMain.on(OnEvent.LOGGED, (_event, token) => {
  createHome()
  store.value.token = token
  BrowserWindow.fromWebContents(_event.sender)?.close()
})

ipcMain.on(OnEvent.SET_FULL_WINDOW, (_event, full) => {
  if (full) {
    BrowserWindow.fromWebContents(_event.sender)?.maximize()
  } else {
    BrowserWindow.fromWebContents(_event.sender)?.restore()
  }
})
