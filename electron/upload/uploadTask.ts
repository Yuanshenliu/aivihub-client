type UploadStatus = 'pause' | 'uploading' | 'wait' | 'finish'

type UploadTaskOption = {
  id: string
  title: string
  path: string
  status: UploadStatus
  size: number
  uploadedSize: number
  totalChunk: number
  currentChunk: number
  directory?: string
}

export class UploadTask {
  id: string
  title: string
  path: string
  status: UploadStatus
  size: number
  uploadedSize: number
  totalChunk: number
  currentChunk: number
  directory?: string

  constructor(options: UploadTaskOption) {
    this.id = options.id
    this.title = options.title
    this.path = options.path
    this.size = options.size
    this.status = options.status
    this.uploadedSize = options.uploadedSize
    this.totalChunk = options.totalChunk
    this.currentChunk = options.currentChunk
    this.directory = options.directory
  }
}
