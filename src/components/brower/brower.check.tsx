import React from 'react'
import commonFunc from '@/functions/common.func'
interface Props {
  app?: boolean
  wechat?: boolean
  ios?: boolean
  android?: boolean
  iphone?: boolean
  ipad?: boolean
}
const BrowerCheck: React.FunctionComponent<Props> = (props) => {
  const { children, ...allowList } = props
  if (process.env.NODE_ENV !== 'production') {
    return <React.Fragment>{props.children}</React.Fragment>
  }
  if (
    Object.keys(allowList)
      .map((key) => {
        return !!commonFunc.checkUA[key]
      })
      .includes(true)
  ) {
    return <React.Fragment>{children}</React.Fragment>
  } else {
    return <div id="BrowerCheck">不支持的浏览器类型</div>
  }
}
export default BrowerCheck
