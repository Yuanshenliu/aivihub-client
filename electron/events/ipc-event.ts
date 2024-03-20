export enum OnEvent {
  CLOSE_WINDOW = 'close-window',
  MINI_WINDOW = 'mini-window',
  SET_THEME = 'set-theme',
  OPEN_DEV_TOOL = 'open-dev-tool',
  LOGGED = 'logged',
  SET_FULL_WINDOW = 'set-full-window',
  CLOSE_DIALOG = 'close-dialog',
  ADD_UPLOAD_TASK = 'add-upload-task'
}

export enum HandleEvent {
  INIT_APP = 'init-app',
  CAPTURE = 'capture',
  SELECT_IMAGE = 'select-image',
  SELECT_VIDEO = 'select-video',
  OPEN_DIALOG = 'open-dialog'
}

export enum SendEvent {
  ASYNC_PARAMS = 'async-params',
  WINDOW_MAX_SIZE = 'window-max-size',
  DIALOG_DATA = 'dialog-data',
  UPLOADING_TASKS = 'uploading-task'
}

export type OnEventChannels = `${OnEvent}`

export type HandleEventChannels = `${HandleEvent}`

export type SendEventChannels = `${SendEvent}`
