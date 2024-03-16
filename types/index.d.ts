export type AppParams = {
  token?: string
  dark?: boolean
}

export type UpperField = {
  id: string
  name: string
  description: string
  avatar: string | Blob
  createTime: string
}

export type CommonDialogField = {
  name?: string
  params?: Record<string, any>
}

export type Collection = {
  id?: string
  actress?: string
  title?: string
  poster?: string
  createTime?: number
  posterBlob?: Blob
}

export type SubmissionVideo = {
  id?: string
  title: string
  videoRelativePath?: string
  upper?: string
  poster?: string
  duration?: string
  collection?: string
  description: string
  serialNumber: string
  manufacturer: string
  uploadTime?: number
  timesWatched?: number
  fileSize?: number
  createTime?: number
}

export type SubmissionVideoUploadTask = {
  key: string
  title: string
  upper: string
  videoPath: string
  videoSize: number
  totalChunk: number
  currentChunk: number
}

export type Page<T> = {
  records: T[]
  total: number
  size: number
  current: number
  hasNextPage: boolean
  hasPrePage: boolean
  pages: number
}

export type SubmissionTag = {
  id: number
  title: string
}
