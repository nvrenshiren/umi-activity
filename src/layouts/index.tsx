import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import * as Color from '@material-ui/core/colors'
import commonFunc from '@/functions/common.func'
import pageEvent from '@/functions/page.event'
import WebAuth from '@/components/auth/web.auth'
import BrowerCheck from '@/components/brower/brower.check'
import activityService from '@/service/activity.service'
import QueryString from 'query-string'
import modalBox from '@/components/util/modal.box'
import { UtilToast } from '@/components/util/util.toast'
import { ErrorOutline } from '@material-ui/icons'

interface State {
  theme?: string
  dark?: boolean
  ready: boolean
}

class Layout extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      theme: commonFunc.Theme,
      dark: commonFunc.Dark,
      ready: false
    }
  }
  get Theme() {
    let Theme = Color[this.state.theme]
    window.Theme = createMuiTheme({
      palette: {
        primary: Object.assign({}, Theme),
        secondary: Object.assign({}, Color['amber']),
        type: this.state.dark ? 'dark' : 'light',
        divider: 'rgba(0, 0, 0, 0.05)'
      }
    })
    return window.Theme
  }
  render() {
    return (
      <MuiThemeProvider theme={this.Theme}>
        <CssBaseline />
        {__IS_BROWSER ? (
          <BrowerCheck app wechat>
            <WebAuth>{this.state.ready && this.props.children}</WebAuth>
          </BrowerCheck>
        ) : (
          this.props.children
        )}
      </MuiThemeProvider>
    )
  }
  componentDidMount() {
    /**
     * 删除服务端生成的CSS
     */
    let ssrCss = document.getElementById('js-css')
    if (ssrCss && typeof ssrCss != 'string') {
      ssrCss.remove()
    }
    /**
     * 获取活动列表
     */
    if (!this.state.ready) {
      let themeID = QueryString.parse(location.search).theme
      if (!!themeID) {
        commonFunc.setItem('themeID', themeID)
        activityService.list(themeID.toString()).then((res) => {
          commonFunc.setItem('activity', res.result)
          this.setState({
            ready: true
          })
        })
      } else {
        let activityList = !!commonFunc.getItem('activity')
        if (activityList) {
          this.setState({
            ready: true
          })
        } else {
          modalBox.open({
            content: UtilToast,
            hideBg: true,
            params: {
              message: '参数错误',
              icon: <ErrorOutline color="inherit" fontSize="large" />
            }
          })
        }
      }
    }
  }
  componentWillMount() {
    pageEvent.on('changeDark', () => {
      this.setState({
        dark: !this.state.dark
      })
    })
  }
}

export default Layout
