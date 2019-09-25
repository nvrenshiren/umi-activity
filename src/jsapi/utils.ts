import { isIPhone, ua } from './variable'

export function createCallbackID(action: string) {
  return 'cb_' + action + '_' + new Date().getTime()
}

export function isFn(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Function]'
}

/**
 * 判断是否是IOS7以上的版本
 */
export function canUseIOSWK() {
  if (!isIPhone) return false
  let version = ua.match(/os [\d._]+/gi)[0]
  version = (version + '').replace(/[^0-9|_.]/gi, '')
  version = version.split('_')[0]
  return Number(version) > 7
}
