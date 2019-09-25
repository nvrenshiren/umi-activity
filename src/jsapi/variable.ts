// api操作对象集合
export const api: any = {
  version: 1.0
}
// JSApi.wrap("on.{操作名称}")的action规则来注入的事件处理器列表
type FunctionHandlers = {
  [key: string]: Function | any
}
export const messageHandlers: FunctionHandlers = {}
// 所有回调事件的列表
export const callbackBuckets: FunctionHandlers = {}
// 获取当前浏览器的基础信息: 内核、版本、操作系统
export const ua = navigator.userAgent.toLowerCase()
// 是否是iphone客户端
export const isIPhone = ~ua.indexOf('iphone')
// 是否是Android客户端
export const isAndroid = ~ua.indexOf('android')
