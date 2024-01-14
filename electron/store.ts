import { ref, watch } from 'vue'
import type { BrowserWindow } from 'electron'
import { SendEvent } from './events/ipc-event'
import { getBackground } from './utils/theme'

export type WindowField = {
  id: string
  window: BrowserWindow
}

export const windows: WindowField[] = []

export type Store = {
  token?: string
  dark?: boolean
}

export const store = ref<Store>({})

watch(
  () => store.value,
  (value) => {
    windows.forEach((win) => win.window.webContents.send(SendEvent.ASYNC_PARAMS, value))
  }
)

watch(
  () => store.value.dark,
  (value) => {
    windows.forEach((win) => win.window.setBackgroundColor(getBackground(value)))
  }
)
