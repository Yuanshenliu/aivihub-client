import { contextBridge, ipcRenderer } from 'electron'
import type { OnEventChannels, HandleEventChannels, SendEventChannels } from './events/ipc-event'
import type { IpcRendererEvent } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  send(channel: OnEventChannels, ...args: any[]) {
    ipcRenderer.send(channel, ...args)
  },
  on(channel: SendEventChannels, func: (...args: any[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: any[]) => func(...args)
    ipcRenderer.on(channel, subscription)

    return () => ipcRenderer.removeListener(channel, subscription)
  },
  invoke(channel: HandleEventChannels, ...args: any[]) {
    return ipcRenderer.invoke(channel, ...args)
  }
})
