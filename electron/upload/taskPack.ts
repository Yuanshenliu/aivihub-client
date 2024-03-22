import type { UploadStatus, UploadTaskOption } from './uploadTask'
import { noop, UploadTask } from './uploadTask'
import { debounce } from 'lodash-es'

export type TaskPackFiled = {
  uploadedChunk: number
  uploadedSize: number
  totalChunk: number
  totalSize: number
  directory: string
  status: UploadStatus
  title: string
  tasksList: UploadTaskOption[]
}

export class TaskPack {
  directory: string
  tasks: UploadTask[]
  totalChunk: number
  totalSize: number
  status: UploadStatus
  listener: Record<'progress', Function>
  title: string

  constructor(directory: string, title: string) {
    this.directory = directory
    this.title = title
    this.tasks = []
    this.totalChunk = 0
    this.totalSize = 0
    this.status = 'pause'
    this.listener = {
      progress: noop
    }
  }

  onProgress(hook: Function) {
    this.listener.progress = hook
  }

  addUploadTaskItem(task: UploadTask, record: boolean) {
    task.on(
      'progress',
      debounce(() => this.listener.progress(), 100)
    )
    this.calcTotalProgress()

    this.tasks.push(task)
    record && task.record()

    if (task.status === 'wait') {
      task.status = 'uploading'
      task.timer()
      task.upload()
    }
  }

  startTask() {}

  calcTotalProgress() {
    this.totalChunk = this.tasks.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.totalChunk
    }, 0)

    this.totalSize = this.tasks.reduce(function (pre, cur) {
      return pre + cur.size
    }, 0)
  }

  calcProgress(): TaskPackFiled {
    const uploadedChunk = this.tasks.reduce(function (pre, cur) {
      return pre + cur.currentChunk
    }, 0)

    const uploadedSize = this.tasks.reduce(function (pre, cur) {
      return pre + cur.uploadedSize
    }, 0)

    const totalChunk = this.tasks.reduce(function (pre, cur) {
      return pre + cur.totalChunk
    }, 0)

    const totalSize = this.tasks.reduce(function (pre, cur) {
      return pre + cur.size
    }, 0)

    const tasksList = this.tasks.map((i) => i.valueOf())

    return {
      uploadedChunk,
      uploadedSize,
      tasksList,
      totalChunk,
      totalSize,
      directory: this.directory,
      status: this.status,
      title: this.title
    }
  }
}
