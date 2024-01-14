import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface SMRequestInterceptors<T extends AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface SMRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: SMRequestInterceptors<T>
}
