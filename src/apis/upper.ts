import http from '@/utils/request'

export type Upper = {
  id: string
  name: string
  description: string
  avatar: string | Blob
  createTime: number
}

export function saveUpper(formData: FormData) {
  return http.post('/upper/saveUpper', {
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function getUpperList() {
  return http.get<Upper[]>('/upper/list', {})
}

export function getUpperDetail(params: { id: string }) {
  return http.get<Upper>('/upper/detail', { params })
}
