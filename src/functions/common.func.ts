import Moment from 'moment'
import QueryString from 'query-string'
export interface WebOS {
  wechat?: boolean
  app?: boolean
  android?: boolean
  version?: string
  isBadAndroid?: boolean
  ios?: boolean
  iphone?: boolean
  ipad?: boolean
}
type StorageKey =
  | 'user'
  | 'autodark'
  | 'theme'
  | 'isdark'
  | 'config'
  | 'themeID'
  | 'activity'
  | 'fireworks'

export default new (class {
  /**
   * Storage对象
   */
  get Storage() {
    return window.localStorage
  }
  /**
   * 设置Storage
   */
  setItem(key: StorageKey, value: any) {
    this.Storage.setItem(key, JSON.stringify(value))
  }
  /**
   * 读取Storage
   * noConverted:不转换成对象
   */
  getItem(key: StorageKey, noConverted: boolean = false) {
    let value = this.Storage.getItem(key)
    if (!value) {
      return !!value
    }
    if (noConverted) {
      return value
    }
    return JSON.parse(value)
  }
  /**
   * 移除Storage
   */
  removeItem(key: StorageKey) {
    this.Storage.removeItem(key)
  }
  /**
   * 清空Storage
   */
  clearItem() {
    this.Storage.clear()
  }
  /**
   * 是否夜间模式
   */
  get Dark() {
    let isAuto = this.getItem('autodark')
    if (!!isAuto) {
      let config = this.getItem('config')
      let { app_light } = config
      let [start, end] = app_light ? app_light.split('-') : [7, 18]
      let nowHour = Moment().hours()
      return !(nowHour > start && nowHour < end)
    } else {
      return !!this.getItem('isdark')
    }
  }
  /**
   * 获取当前主题
   */
  get Theme() {
    //服务端配置的
    let config = this.getItem('config')
    //用户配置的
    let theme = this.getItem('theme')
    return theme || (config && config['theme']) || 'blue'
  }
  get isWKview() {
    return /QQBROWSER|MICROMESSENGER|BAIDU/.test(
      window.navigator.userAgent.toLocaleUpperCase()
    )
  }
  /**
   * 将PX转为VW模式
   * @param pixel 需要的宽度像素
   * @param initPixel 设计图宽度总像素
   */
  toVW(pixel: number, initPixel: number = 750) {
    return `${(pixel / initPixel) * 100}vw`
  }
  urlParams(key: string) {
    return new URL(location.href).searchParams.get(key)
  }
  get getPassPort() {
    const urlCheck = decodeURIComponent(location.href).match(/passport=.+?=/i)
    return !!urlCheck && `${urlCheck[0].replace('passport=', '')}`
  }
  get checkUA() {
    const OS: WebOS = {}
    const UA = window.navigator.userAgent
    const funcList = [
      () => {
        const wechat = UA.match(/MicroMessenger/i)
        if (wechat) {
          OS.wechat = true
        }
        return false
      },
      () => {
        const dangjian = UA.match(/dangjian|jxrs/gi)
        if (dangjian) {
          OS.app = true
        }
        return false
      },
      () => {
        const android = UA.match(/(Android);?[\s\/]+([\d.]+)?/)
        if (android) {
          OS.android = true
          OS.version = android[2]
          OS.isBadAndroid = !/Chrome\/\d/.test(window.navigator.appVersion)
        }
        return OS.android === true
      },
      () => {
        const iphone = UA.match(/(iPhone\sOS)\s([\d_]+)/)
        if (iphone) {
          OS.ios = OS.iphone = true
          OS.version = iphone[2].replace(/_/g, '.')
        } else {
          var ipad = UA.match(/(iPad).*OS\s([\d_]+)/)
          if (ipad) {
            OS.ios = OS.ipad = true
            OS.version = ipad[2].replace(/_/g, '.')
          }
        }
        return OS.ios === true
      }
    ]
    funcList.every((item) => {
      return !item()
    })
    return OS
  }
})()
