import React from 'react'
import { commentItem } from '@/interface/api.res'
import { CSSProperties } from '@material-ui/styles'
import commonFunc from '@/functions/common.func'
import _ from 'lodash'
import pageEvent from '@/functions/page.event'

interface Props {
  danmu?: boolean
  danmuApi?: () => Promise<commentItem[]>
}
export default class VideoDanMu extends React.PureComponent<Props> {
  constructor(props: any) {
    super(props)
  }
  danmuList: commentItem[] = []
  opacity: number = 0.7
  danmuTop: number = 0
  maxDanmu: number = 6
  boxEle: HTMLDivElement
  getInterval: NodeJS.Timeout
  viewWidth: number
  viewHeight: number
  contentHeight: number
  render() {
    return (
      <div
        id="VideoDanMu"
        className="full"
        style={{
          position: 'relative'
        }}
        ref={(node) => {
          this.boxEle = node
        }}
      />
    )
  }
  setInterval() {
    clearInterval(this.getInterval)
    this.getInterval = setInterval(() => {
      this.props.danmuApi().then((res) => {
        let newDanMu = _.differenceBy(res, this.danmuList, 'id')
        this.danmuList = this.danmuList.concat(newDanMu)
        if (newDanMu.length > 0) {
          this.findDanMu(newDanMu)
        }
      })
    }, 5000)
  }
  clear() {
    this.danmuTop = 0
    const children = this.boxEle.children
    for (const child of Array.from(children)) {
      this.boxEle.removeChild(child)
    }
  }
  refresh() {
    this.viewWidth = this.boxEle.offsetWidth
    this.viewHeight = this.boxEle.offsetHeight
  }
  init() {
    this.refresh()
    // 弹幕内容高度
    const div = document.createElement('div')
    div.innerHTML = 'div'
    div.style.fontSize = commonFunc.toVW(40)
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(div)
    this.contentHeight = div.offsetHeight
    body.removeChild(div)
  }
  send(commentItem: commentItem) {
    if (this.boxEle) {
      const danmuEle = this.createDanMuElem(commentItem)
      this.boxEle.appendChild(danmuEle)
      const x = -(this.viewWidth + danmuEle.offsetWidth)
      setTimeout(() => {
        this.danmuTop += 1
        danmuEle.style.webkitTransform = `translate3d(${x}px, 0, 0)`
        danmuEle.style.transform = `translate3d(${x}px, 0, 0)`
      }, 10)
    } else {
      setTimeout(() => {
        this.send(commentItem)
      }, 200)
    }
  }
  createDanMuElem(commentItem: commentItem) {
    const div = document.createElement('div')
    div.innerHTML = `<img src="${decodeURIComponent(
      commentItem.path
    )}" width="${this.contentHeight}" height="${
      this.contentHeight
    }" style="margin-right:5px;border-radius:50%;" onError="javascript:this.src='http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/SMXWi7yNFA%40upload_3a08dfd3daadf9db4dd4d5a7daf574be.jpg'"/>${
      commentItem.comment
    }`
    const style: CSSProperties = {
      position: 'absolute',
      fontSize: `${(this.contentHeight * 60) / 100}px`,
      whiteSpace: 'nowrap',
      textShadow: 'rgb(0, 0, 0) 1px 1px 2px',
      color: '#fff',
      opacity: this.opacity,
      lineHeight: `${this.contentHeight}px`
    }
    style.top = `${(this.danmuTop % this.maxDanmu) * this.contentHeight}px`
    style.left = `${this.viewWidth}px`
    style.webkitTransition = '-webkit-transform 5s linear 0s'
    style.transition = 'transform 5s linear 0s'
    const transitionName = getTransitionEndName(div)
    const handleTransitionEnd = () => {
      // 弹幕运动完成后移除监听，清除弹幕
      div.removeEventListener(transitionName, handleTransitionEnd)
      div.remove()
    }
    div.addEventListener(transitionName, handleTransitionEnd)
    for (const k in style) {
      if (style[k] !== void 0) {
        div.style[k] = style[k]
      }
    }
    return div
  }
  componentDidMount() {
    this.init()
    this.setInterval()
    pageEvent.on('postCom', (comment: string) => {
      this.send({
        id: new Date().getTime().toString(),
        comment,
        userName: commonFunc.getItem('user')['userName'],
        path: decodeURIComponent(commonFunc.getItem('user')['headUrl'])
      })
    })
  }
  sendTimeOut: NodeJS.Timeout
  findDanMu(newDanMu: commentItem[]) {
    let temItem = newDanMu.pop()
    this.send(temItem)
    if (newDanMu.length) {
      this.sendTimeOut = setTimeout(() => {
        this.findDanMu(newDanMu)
      }, 950)
    }
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.danmu) {
      this.setInterval()
    } else {
      this.clear()
      clearInterval(this.getInterval)
    }
  }
  componentWillUnmount() {
    clearInterval(this.getInterval)
    clearTimeout(this.sendTimeOut)
    this.setState = () => {}
  }
}
function getTransitionEndName(dom: HTMLElement): string | undefined {
  const cssTransition = ['transition', 'webkitTransition']
  const transitionEnd = {
    transition: 'transitionend',
    webkitTransition: 'webkitTransitionEnd'
  }
  for (const key of cssTransition) {
    if (dom.style[key] !== undefined) {
      return transitionEnd[key]
    }
  }
  return undefined
}
