export enum OnEvent {
  CLOSE_WINDOW = 'close-window',
  MINI_WINDOW = 'mini-window',
  SET_THEME = 'set-theme',
  OPEN_DEV_TOOL = 'open-dev-tool',
  LOGGED = 'logged',
  SET_FULL_WINDOW = 'set-full-window',
  CLOSE_DIALOG = 'close-dialog'
}

export enum HandleEvent {
  INIT_APP = 'init-app',
  CAPTURE = 'capture',
  SELECT_IMAGE = 'select-image',
  OPEN_DIALOG = 'open-dialog'
}

export enum SendEvent {
  ASYNC_PARAMS = 'async-params',
  WINDOW_MAX_SIZE = 'window-max-size',
  DIALOG_DATA = 'dialog-data'
}

export type OnEventChannels = `${OnEvent}`

export type HandleEventChannels = `${HandleEvent}`

export type SendEventChannels = `${SendEvent}`
