export enum OnEvent {
  CLOSE_WINDOW = 'close-window',
  MINI_WINDOW = 'mini-window',
  SET_THEME = 'set-theme',
  OPEN_DEV_TOOL = 'open-dev-tool',
  LOGGED = 'logged',
  SET_FULL_WINDOW = 'set-full-window'
}

export enum HandleEvent {
  INIT_APP = 'init-app',
  CAPTURE = 'capture'
}

export enum SendEvent {
  ASYNC_PARAMS = 'async-params',
  WINDOW_MAX_SIZE = 'window-max-size'
}

export type OnEventChannels = `${OnEvent}`

export type HandleEventChannels = `${HandleEvent}`

export type SendEventChannels = `${SendEvent}`
