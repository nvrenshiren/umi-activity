export default {
  eventList: new Map(),
  on(event: string, callback?: Function) {
    this.eventList.has(event) || this.eventList.set(event, new Set())
    this.eventList.get(event).add(callback)
    return this
  },
  emit(event: string, ...args: any[]) {
    if (!this.eventList.has(event)) {
      console.warn(`<${event}> 事件未注册!`)
      return false
    }
    this.eventList.get(event).forEach((cb: Function) => cb.call(this, ...args))
    return true
  },
  off(event: string) {
    this.eventList.has(event) && this.eventList.delete(event)
    return this
  }
}
