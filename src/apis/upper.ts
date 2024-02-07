import http from '@/utils/request'

export type Upper = {
  id: string
  name: string
  description: string
  avatar: string | Blob
  createTime: string
}

export function saveUpper(formData: FormData) {
  return http.post('/upper/saveUpper', {
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
