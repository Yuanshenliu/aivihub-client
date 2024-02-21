import { ref, watch } from 'vue'
import type { BrowserWindow } from 'electron'
import { SendEvent } from './events/ipc-event'
import { getBackground } from './utils/theme'

export type WindowField = {
  id: string
  window: BrowserWindow
}

export const windows: WindowField[] = []

export type AppParams = {
  [key:string]:any
  token?: string
  dark?: boolean
  upperOrder?: string
}


export const appParams = ref<AppParams>({})

watch(
  () => appParams.value,
  (value) => {
    windows.forEach((win) => win.window.webContents.send(SendEvent.ASYNC_PARAMS, value))
  }
)

watch(
  () => appParams.value.dark,
  (value) => {
    windows.forEach((win) => win.window.setBackgroundColor(getBackground(value)))
  }
)
