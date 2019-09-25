import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import commonFunc from './common.func'
import Qs from 'qs'

interface RequestOption<D> extends AxiosRequestConfig {
  url: string
  params?: D
  isJson?: boolean
}

export default new (class {
  AxiosConfig: AxiosRequestConfig
  Axios: AxiosInstance
  constructor() {
    this.AxiosConfig = {
      baseURL: process.env.NODE_ENV === 'production' ? '' : '/api'
    }
    this.Axios = Axios.create(this.AxiosConfig)
    this.Axios.interceptors.request.use((config) => {
      /**
       * 获取URl参数携带的Passport
       */
      let UrlPassPort = commonFunc.getPassPort
      if (!!UrlPassPort) {
        Cookies.set('passport', encodeURIComponent(UrlPassPort))
      }
      if (!!UrlPassPort || Cookies.get('passport')) {
        config.headers['passport'] =
          UrlPassPort || decodeURIComponent(Cookies.get('passport'))
      }
      config.headers['reqClient'] = `dj-${
        commonFunc.checkUA.android
          ? 'android'
          : commonFunc.checkUA.ios
          ? 'ios'
          : 'web'
      }`
      return config
    })

    this.Axios.interceptors.response.use((value) => {
      let result = Object.assign({}, value)
      Object.keys(value.data).map((key) => {
        result.data[key.toLocaleLowerCase()] = value.data[key]
      })
      return result
    })
  }
  async get<T, U = any>(
    option: RequestOption<U> = {
      url: '',
      params: null
    }
  ): Promise<T> {
    try {
      let { url, params, ...other } = option
      let ajax = await this.Axios.get<T>(url, {
        params,
        ...other
      })
      return ajax.data
    } catch (error) {
      throw error
    }
  }
  async post<T, U = any>(
    option: RequestOption<U> = {
      url: '',
      params: null,
      isJson: false
    }
  ): Promise<T> {
    try {
      let { url, params, isJson, ...other } = option
      let config = Object.assign({ headers: {} }, other, this.AxiosConfig)
      if (!isJson) {
        config.headers['Content-Type'] =
          'application/x-www-form-urlencoded; charset=UTF-8'
        config.transformRequest = [
          (data) => {
            return !!data && Qs.stringify(data)
          }
        ]
      }
      let ajax = await this.Axios.post<T>(url, params, { ...config })
      return ajax.data
    } catch (error) {
      throw error
    }
  }
})()
