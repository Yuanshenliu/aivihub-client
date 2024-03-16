import http from '@/utils/request'
import type { Collection, Page, SubmissionTag, SubmissionVideoUploadTask } from 'types/index'

export function saveCollection(data: FormData) {
  return http.post('/video/saveCollection', {
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function getCollectionPageList(params: { pageIndex: number; upper: string }) {
  return http.get<Page<Collection>>('/video/getCollectionPageList', { params })
}

export function getCollectionTextList() {
  return http.get<Collection[]>('/video/getCollectionTextList', {})
}

export function getSubmissionTag() {
  return http.get<SubmissionTag[]>('/video/getSubmissionTag', {})
}

export function createSubmissionTag(data: FormData) {
  return http.post<SubmissionVideoUploadTask>('/video/createTask', {
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
