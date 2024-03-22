import fs from 'node:fs'
import FormData from 'form-data'
import axios from 'axios'
import { appParams } from '../store'
// @ts-ignore
import { ResultEnum } from '../../types/index.d.ts'
import { addRecordsItem } from './recorder'

export type UploadStatus = 'pause' | 'uploading' | 'wait' | 'finish'
type Listener = 'progress' | 'status'
type TaskType = 'media' | 'picture'
type UploadResponseFiled = {
  status: ResultEnum
  message: string
  data: {
    uploadedChunkIndex: number
    currentChunkIndex: number
  }
}

export type UploadTaskOption = {
  taskID: string
  key: string
  title: string
  path: string
  status: UploadStatus
  size: number
  uploadedSize: number
  totalChunk: number
  currentChunk: number
  directory: string
  uploadPercent: number
  type: TaskType
  createdTime: number
  uploadedTime: number
}

export const noop = () => {}
const chunkSize = Number(import.meta.env.VITE_UPLOAD_CHUNK_SIZE)

export class UploadTask {
  taskID: string
  key: string
  title: string
  path: string
  status: UploadStatus
  size: number
  uploadedSize: number
  totalChunk: number
  currentChunk: number
  directory: string
  uploadPercent: number
  listener: Record<Listener, Function>
  type: TaskType
  timerId: any
  createdTime: number
  uploadedTime: number

  constructor(options: UploadTaskOption) {
    this.taskID = options.taskID
    this.key = options.key
    this.title = options.title
    this.path = options.path
    this.size = options.size
    this.status = options.status || 'pause'
    this.uploadedSize = options.uploadedSize || 0
    this.totalChunk = options.totalChunk
    this.currentChunk = 1
    this.directory = options.directory
    this.uploadPercent = options.uploadPercent || 0
    this.timerId = ''
    this.type = options.type
    this.createdTime = options.createdTime
    this.uploadedTime = options.uploadedTime
    this.listener = {
      progress: noop,
      status: noop
    }
  }

  on(listener: Listener, hook: Function) {
    this.listener[listener] = hook
  }

  timer() {
    this.timerId = setInterval(() => {
      const uploadSize = this.currentChunk * chunkSize

      this.uploadedSize = uploadSize <= this.size ? uploadSize : this.size
      this.uploadPercent = (this.currentChunk / this.totalChunk) * 100
      this.listener.progress()
    }, 500)
  }

  cancelTimer() {
    clearInterval(this.timerId)
    this.listener.progress()
  }

  execute() {
    this.timer()
  }

  upload() {
    if (this.status === 'uploading' && this.currentChunk <= this.totalChunk) {
      const start = (this.currentChunk - 1) * chunkSize

      const rs = fs.createReadStream(this.path, {
        start,
        end: start + chunkSize - 1,
        highWaterMark: chunkSize + 1
      })

      const form = new FormData()
      form.append('chunk', rs)
      form.append('key', this.key)
      form.append('type', this.type)
      form.append('currentChunk', this.currentChunk)

      axios
        .post<UploadResponseFiled>(import.meta.env.VITE_BASE_API + '/upload/chunk', form, {
          headers: {
            Authorization: `Bearer ${appParams.value.token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({ data }) => {
          if (data.status === ResultEnum.SUCCESS) {
            this.currentChunk++
            this.record()
            this.upload()
          } else if (data.status === ResultEnum.CHUNK_INDEX_ERROR) {
            this.currentChunk = data.data.currentChunkIndex + 1
          }
        })
    } else if (this.status === 'uploading' && this.currentChunk > this.totalChunk) {
      axios
        .post(
          import.meta.env.VITE_BASE_API + '/upload/finish',
          {
            key: this.key,
            type: this.type
          },
          {
            headers: {
              Authorization: `Bearer ${appParams.value.token}`
            }
          }
        )
        .then(() => this.finish())
    }

    this.record()
  }

  finish() {
    this.status = 'finish'
    this.cancelTimer()
  }

  record() {
    const item = this.valueOf()
    addRecordsItem({ ...item, status: item.status === 'finish' ? 'finish' : 'pause' })
  }

  pause() {
    this.status = 'pause'
    this.cancelTimer()
    this.listener.status(this.status)
    this.record()
  }

  valueOf(): UploadTaskOption {
    return {
      taskID: this.taskID,
      key: this.key,
      title: this.title,
      path: this.path,
      status: this.status,
      size: this.size,
      uploadedSize: this.uploadedSize,
      totalChunk: this.totalChunk,
      currentChunk: this.currentChunk,
      directory: this.directory,
      uploadPercent: this.uploadPercent,
      type: this.type,
      createdTime: this.createdTime,
      uploadedTime: this.uploadedTime
    }
  }
}
