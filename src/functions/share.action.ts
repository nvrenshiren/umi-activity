import { wxShare } from '@/interface/app.wx'
import { shareData } from '@/interface/app.native'
import pageEvent from './page.event'
import commonFunc from './common.func'
import QueryString from 'query-string'
const shareIcon = require('@/statics/image/share.png')
const shareImg = require('@/statics/image/share-no64.png')
export default new (class {
  shareWx: wxShare
  shareApp: shareData
  title = '抽奖迎国庆，集分兑大奖'
  desc = '热烈庆祝中华人民共和国成立70周年'
  wxUrl = `${location.origin + window.publicPath}?theme=${commonFunc.getItem(
    'themeID'
  ) || QueryString.parse(location.search).theme}`
  appUrl = `${
    location.origin
  }/party_98/app/proxy.html?theme=${commonFunc.getItem('themeID') ||
    QueryString.parse(location.search).theme}`
  constructor() {
    this.shareWx = {
      title: this.title,
      desc: this.desc,
      link: this.wxUrl,
      imgUrl: shareImg
    }
    this.shareApp = {
      title: this.title,
      desc: this.desc,
      wxUrl: this.wxUrl,
      url: this.appUrl,
      icon: shareIcon,
      iconUri: shareImg
    }
  }
  shareDo(type?: 'app' | 'time') {
    let { wechat, app } = commonFunc.checkUA
    if (!!wechat) {
      let shareData: wxShare = {
        success: () => {
          pageEvent.emit('ShareSuccess')
        },
        ...this.shareWx
      }
      if (type === 'app') {
        window.wx.onMenuShareAppMessage(shareData)
      } else {
        window.wx.onMenuShareTimeline(shareData)
      }
      alert('请点击右上角进行分享操作,支持分享好友或者朋友圈')
    }
    if (!!app) {
      window.JXRSApi.app.party_98.share(this.shareApp)
      pageEvent.emit('ShareSuccess')
    }
  }
})()
