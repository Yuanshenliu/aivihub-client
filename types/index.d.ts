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
