import axios from 'axios'
import type { SMRequestConfig } from 'types/request'
import type { AxiosInstance } from 'axios'
import { message as aMsg } from 'ant-design-vue'
// @ts-ignore
import { ResultEnum } from 'types/index.d.ts'

class Request {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API,
      timeout: 5000
    })

    this.instance.interceptors.request.use((config) => {
      const appStore = useAppStore()

      if (appStore.token) {
        config.headers['Authorization'] = `Bearer ${appStore.token}`
      }

      return config
    })

    this.instance.interceptors.response.use(
      (response) => {
        const { status, message, data } = response.data
        if (status === ResultEnum.ERROR) {
          aMsg.error(message).then((r) => r)
        } else if (status === ResultEnum.WARNING) {
          aMsg.warning(message).then((r) => r)
          return data
        } else if (status === ResultEnum.SUCCESS) {
          if (message) {
            aMsg.success(message).then((r) => r)
          }
          return data
        }
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  request<T = any>(config: SMRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res: T) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)

          return err
        })
    })
  }

  get<T = any>(url: string, config: SMRequestConfig<T>): Promise<T> {
    return this.request<T>({ url, ...config, method: 'GET' })
  }

  post<T = any>(url: string, config: SMRequestConfig<T>): Promise<T> {
    return this.request<T>({ url, ...config, method: 'POST' })
  }

  delete<T = any>(url: string, config: SMRequestConfig<T>): Promise<T> {
    return this.request<T>({ url, ...config, method: 'DELETE' })
  }

  put<T = any>(url: string, config: SMRequestConfig<T>): Promise<T> {
    return this.request<T>({ url, ...config, method: 'PUT' })
  }

  patch<T = any>(url: string, config: SMRequestConfig<T>): Promise<T> {
    return this.request<T>({ url, ...config, method: 'PATCH' })
  }
}

export default new Request()
