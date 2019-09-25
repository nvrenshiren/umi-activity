import React from 'react'
import commonFunc from '@/functions/common.func'
import WeChatAuth from './wechat.auth'
import AppAuth from './app.auth'

const WebAuth: React.FunctionComponent = (props) => {
  const OS = commonFunc.checkUA
  if (process.env.NODE_ENV !== 'production') {
    return <React.Fragment>{props.children}</React.Fragment>
  }
  if (OS.wechat) {
    return <WeChatAuth>{props.children}</WeChatAuth>
  } else {
    return <AppAuth>{props.children}</AppAuth>
  }
}

export default WebAuth
