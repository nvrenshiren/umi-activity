import React from 'react'
import commonFunc from '@/functions/common.func'
import wxService from '@/service/wx.service'
import Loading from '../page/loading.page'
import Cookies from 'js-cookie'
import userService from '@/service/user.service'
import { signWeiXinURLRes } from '@/interface/api.res'
import shareAction from '@/functions/share.action'

window.wx = require('weixin-js-sdk')
interface State {
  done: boolean
  wxconfig?: signWeiXinURLRes
}

class WeChatAuth extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      done: false
    }
  }
  render() {
    return this.state.done ? this.props.children : <Loading />
  }
  wxInit(config?: signWeiXinURLRes) {
    return new Promise((resolve, reject) => {
      let { appid, timestamp, nonceStr, signature } =
        config || this.state.wxconfig
      window.wx.config({
        appId: appid,
        timestamp: Number(timestamp),
        nonceStr,
        signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'onVoicePlayEnd',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard'
        ]
      })
      window.wx.checkJsApi({
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareAppMessage',
          'onMenuShareTimeline'
        ],
        success: (res) => {
          console.log(res)
        }
      })
      window.wx.error((res) => {
        reject(res)
      })
      window.wx.ready(() => {
        resolve()
      })
    })
  }
  checkAuch() {
    const UpassPort = commonFunc.getPassPort
    const CpassPort = Cookies.get('passport')
    if (UpassPort || CpassPort) {
      userService.getUserDetail().then((res) => {
        if (res.status) {
          commonFunc.setItem('user', res.result)
          this.setState({
            done: true
          })
          this.wxInit()
            .then(() => {
              this.setState({
                done: true
              })
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          alert(JSON.stringify(res))
        }
      })
    } else {
      this.wxAuth()
    }
  }
  wxAuth() {
    const redirect = `${window.location.origin}/weixin/authorize.uu?successRedirectURL=${this.state.wxconfig.url}&failRedirectURL=${this.state.wxconfig.url}`
    location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1&redirect_uri=${redirect}&appid=${this.state.wxconfig.appid}#wechat_redirect`
  }
  getConfig() {
    wxService.signWeiXinURL({ url: location.href }).then((res) => {
      if (res.result) {
        this.setState(
          {
            wxconfig: res.result
          },
          () => {
            this.checkAuch()
          }
        )
      } else {
        Cookies.remove('passport')
        this.getConfig()
      }
    })
  }
  componentDidUpdate() {
    if (this.state.wxconfig) {
      wxService.signWeiXinURL({ url: location.href }).then((res) => {
        this.wxInit(res.result).then(() => {
          window.wx.onMenuShareAppMessage(shareAction.shareWx)
          window.wx.onMenuShareTimeline(shareAction.shareWx)
          window.wx.updateAppMessageShareData(shareAction.shareWx)
          window.wx.updateTimelineShareData(shareAction.shareWx)
        })
      })
    }
  }
  componentDidMount() {
    this.getConfig()
  }
}

export default WeChatAuth
