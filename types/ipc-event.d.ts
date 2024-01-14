import {
  OnEventChannels,
  HandleEventChannels,
  SendEventChannels
} from '../electron/events/ipc-event'

declare global {
  interface Window {
    electron: {
      send(channel: OnEventChannels, ...arg: any[]): void
      invoke<T = unknown>(channel: HandleEventChannels, ...args: any[]): Promise<T>
      on<T>(channel: SendEventChannels, func: (args: T) => void): void
      once(channel: SendEventChannels, func: (...args: any[]) => void): void
    }
  }
}
