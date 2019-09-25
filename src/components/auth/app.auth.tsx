import React from 'react'
import commonFunc from '@/functions/common.func'
import Loading from '../page/loading.page'
import userService from '@/service/user.service'
import '@/jsapi/index'
interface State {
  done: boolean
}
class AppAuth extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      done: false
    }
  }
  render() {
    return this.state.done ? this.props.children : <Loading />
  }
  getUserInfo() {
    userService.getUserDetail().then((res) => {
      if (res.status) {
        commonFunc.setItem('user', res.result)
        this.setState({
          done: true
        })
      } else {
        alert(JSON.stringify(res))
      }
    })
  }
  componentDidMount() {
    this.getUserInfo()
  }
}

export default AppAuth
