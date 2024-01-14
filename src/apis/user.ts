import http from '@/utils/request'

export type LoginField = {
  username?: string
  password?: string
}

export function login(data: LoginField) {
  return http.post<string>('/auth/login', {
    data
  })
}
