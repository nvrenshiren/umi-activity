import { isFn, createCallbackID, canUseIOSWK } from './utils'
import { api, callbackBuckets, messageHandlers } from './variable'

// 当前Hybird应用中App端注入的JSContext上下文的名称
let appJSContextName = 'JSBridge'

/**
 *
 * 包装api方法
 *
 * @param {String} action 业务操作全部名称
 * @param {Function} handler 业务操作方法
 */
export function wrap(action: string, handler: Function) {
  let names = action.split('.')
  if (names.length === 1) {
    api[names[0]] = handler
    return
  }
  let name = names.shift(),
    kv
  if (name === 'on') {
    // on开头的都是实现事件注册
    messageHandlers[names.join('.')] = handler
    return
  }
  if (!kv) {
    kv = api[name] || (api[name] = {})
    name = names.shift()
  }
  while (name) {
    if (!kv[name]) {
      kv[name] = names.length === 0 ? handler : (kv = {})
    } else {
      kv = kv[name]
    }
    name = names.shift()
  }
}

/**
 *
 * 调用原生功能
 *
 * @param {String} action 业务操作名称
 * @param {Object} [params] 业务操作需要的参数
 * @param {*} callback 针对当前操作的H5端回调函数
 */
export function invokeApp(action: string, params: Object, callback?: Object) {
  if (arguments.length === 2 && isFn(params)) {
    callback = params
    params = null
  }
  let callbackid: string
  if (callback) {
    callbackBuckets[(callbackid = createCallbackID(action))] = callback
  }
  params = params ? JSON.stringify(params) : ''
  callbackid = callbackid || ''
  if (canUseIOSWK()) {
    window.webkit.messageHandlers[appJSContextName].postMessage({
      action,
      data: params,
      callbackid
    })
  } else {
    window[appJSContextName].invoke(action, params, callbackid)
  }
}

/**
 *
 * 考虑到有些应用需要个性化的api名称
 *
 * @param {String} newContextName 新的全局上下文名称
 */
export function alias(newContextName: string) {
  if (newContextName === 'JSApi') return false
  window[newContextName] = api
  if ('JSApi' in window) {
    delete window.JSApi
  }
}

/**
 *
 * 绑定App端注入的JSContext上下文
 *
 * @param {String} name App端注入的JSContext上下文名称
 */
export function aliasBridge(name: string) {
  if (!name) return
  if (!(name in window)) {
    console.warn &&
      console.warn(`不存在App注入的名称为${name}的JSContext上下文`)
  }
  appJSContextName = name
}
