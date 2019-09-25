import { callbackBuckets, messageHandlers } from './variable'

/**
 * Native通知web,主要是为了用来处理回调函数
 *
 * @param {String} jsonStr
 */
export function notify(callbackid: string, jsonStr: string) {
  try {
    if (!callbackid) return
    let fn = callbackBuckets[callbackid]
    let jsonObj = JSON.parse(jsonStr)
    fn && fn(jsonObj.err, jsonObj.respData)
  } catch (ex) {
    throw new Error(ex)
  }
}

/**
 *
 * Native主动调用H5的事件
 *
 * @param {string} actionName 操作名称
 * @param {String} dataJSONStr JSON字符串形式的数据对象
 */
export function invoke(actionName: string, dataJSONStr: string) {
  let fn = messageHandlers[actionName]
  if (!fn) return
  try {
    dataJSONStr = JSON.parse(dataJSONStr)
    fn(dataJSONStr)
  } catch (ex) {
    throw new Error('invoke: JSON字符串解析失败')
  }
}
