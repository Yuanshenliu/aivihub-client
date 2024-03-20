import { app, session } from 'electron'
import path from 'node:path'
import { createLoginWindow } from './windows/login'
import { taskManager } from './upload/manager'
import './events'

export const { addTask } = taskManager()

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public')

const VITE_DEV_SERVER_URL = path.join(process.env['VITE_DEV_SERVER_URL'] || '', 'html')
const DIST_URL = path.join(process.env.DIST as string, 'html')

export const URL = process.env['VITE_DEV_SERVER_URL'] ? VITE_DEV_SERVER_URL : DIST_URL

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.whenReady().then(async () => {
  await session.defaultSession.loadExtension('E:\\aivihub\\aivihub-client\\devtool')

  createLoginWindow()
})
