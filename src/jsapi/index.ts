import { api } from './variable'
import { invoke, notify } from './native-to-h5'
import { wrap, invokeApp, aliasBridge, alias } from './adapter'
import { setDebug } from './debug'
import './action/index'
// 对外定义的API
api.invoke = invoke
api.notify = notify
api.debug = setDebug
// 对外输出此方法,用于特定项目去开发各自应用的专属交互操作
api.wrap = (action: string) =>
  wrap(action, (kv: any, callback: any) => {
    invokeApp(action, kv, callback)
    return api
  })
// 注册事件action，主要提供App端简化
api.on = function(action: string, handler: any) {
  wrap('on.' + action, handler)
  return api
}
alias.call(api, 'JXRSApi')
aliasBridge.call(api, 'JXRSBridge')
window.JXRSApi.wrap(`app.party_98.share`)
window.JXRSApi.on(`shareResult`, (data: any) => {
  console.log(`shareResult------------${data}`)
})
