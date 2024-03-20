import type { UploadStatus } from './uploadTask'
import { noop, UploadTask } from './uploadTask'
import { debounce } from 'lodash-es'

export class TaskPack {
  tasks: UploadTask[]
  totalChunk: number
  totalSize: number
  status: UploadStatus
  listener: Record<'progress', Function>

  constructor() {
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

  addUploadTaskItem(task: UploadTask) {
    task.status = 'uploading'

    task.on(
      'progress',
      debounce(() => this.listener.progress(), 100)
    )

    this.tasks.push(task)

    task.timer()
    task.upload()

    this.calcTotalProgress()
  }

  calcTotalProgress() {
    this.totalChunk = this.tasks.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.totalChunk
    }, 0)

    this.totalSize = this.tasks.reduce(function (pre, cur) {
      return pre + cur.size
    }, 0)
  }

  calcProgress() {
    const uploadedChunk = this.tasks.reduce(function (pre, cur) {
      return pre + cur.currentChunk
    }, 0)

    const uploadedSize = this.tasks.reduce(function (pre, cur) {
      return pre + cur.uploadedSize
    }, 0)

    const tasksList = this.tasks.map((i) => i.valueOf())

    return {
      uploadedChunk,
      uploadedSize,
      tasksList
    }
  }
}
