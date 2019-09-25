import { ua } from './variable'
import { isFn } from './utils'
let _isDebug = false
export function setDebug(fn?: Function) {
  _isDebug = isFn(fn) ? fn(ua) : false
}
/**
 * 判断当前环境是否是debug环境
 */
export function isDebug() {
  return _isDebug
}
