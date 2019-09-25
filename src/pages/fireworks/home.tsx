import ActivityAction from '@/functions/activity.action'
import BottomBar from '@/components/page/bottom.bar'
import commonFunc from '@/functions/common.func'
import FireworksMain from '@/components/fireworks/fireworks.main'
import FontSizeBox from '@/components/util/font.size'
import modalBox from '@/components/util/modal.box'
import PageDefault from '@/components/page/page.default'
import React from 'react'
import { Box, ButtonBase, Switch } from '@material-ui/core'
import {
  FireworksFail,
  FireworksSuccess
} from '@/components/fireworks/fireworks.modal'
import { router } from 'umi'
import pageEvent from '@/functions/page.event'
import { listTheme } from '@/interface/api.res'
import FireWorksMedia from '@/components/fireworks/fireworks.media'
import { UtilToast } from '@/components/util/util.toast'

interface State {
  danmu: boolean
  danmuTotal: number
}

export default class FireWorkHome extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      danmu: true,
      danmuTotal: 0
    }
    let activityList: listTheme[] = commonFunc.getItem('activity')
    if (activityList) {
      this.activityInfo = activityList.filter((item) => {
        return item.activityType === 1
      })[0]
      this.ActivityAction = new ActivityAction(this.activityInfo.id)
    }
  }
  activityInfo: listTheme
  ActivityAction: ActivityAction
  render() {
    return (
      <PageDefault
        config={{ title: '放礼花迎国庆得分数' }}
        appBar
        back
        share
        barStyle={{
          background: '#06172D'
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          className="pageBox"
          height="100%"
        >
          <Box className="videoDiv">
            <FireWorksMedia
              imgUrl={
                this.activityInfo &&
                JSON.parse(this.activityInfo.background)['coverUrl']
              }
              danmu={this.state.danmu}
              danmuApi={this.danmuApi.bind(this)}
            />
          </Box>
          <Box
            flexGrow={1}
            position="relative"
            style={{
              backgroundImage: `url(${require('@/statics/image/fireworks/bg.png')})`,
              backgroundSize: '100% 100%'
            }}
          >
            <Box
              width="100%"
              height="100%"
              position="absolute"
              display="flex"
              flexDirection="column"
            >
              <Box
                width="100%"
                bgcolor="rgba(0,0,0,.4)"
                height={commonFunc.toVW(88)}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={commonFunc.toVW(30)}
                overflow="hidden"
                color="#fff"
              >
                <FontSizeBox viewSize={28} whiteSpace="nowrap" color="inherit">
                  弹幕
                </FontSizeBox>
                <Box>
                  <Switch
                    color="primary"
                    checked={this.state.danmu}
                    onChange={(e, danmu) => {
                      this.setState({
                        danmu
                      })
                    }}
                  />
                </Box>
                <Box
                  flexGrow={1}
                  position="relative"
                  height={commonFunc.toVW(26)}
                >
                  <FontSizeBox
                    position="absolute"
                    width="100%"
                    viewSize={26}
                    lineHeight={1.1}
                    align
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    color="inherit"
                  >
                    已有{this.state.danmuTotal}人为祖国送上祝福，赶快参与吧！
                  </FontSizeBox>
                </Box>
              </Box>
              <Box width="100%" flexGrow={1} position="relative">
                <Box
                  width="100%"
                  height="100%"
                  position="absolute"
                  p={commonFunc.toVW(30)}
                >
                  <Box height="100%" display="flex" flexDirection="column">
                    <Box textAlign="right">
                      <ButtonBase
                        onClick={() => {
                          router.push('/fireworks/explain')
                        }}
                      >
                        <FontSizeBox viewSize={24} color="#999">
                          活动说明
                        </FontSizeBox>
                      </ButtonBase>
                    </Box>
                    <Box flexGrow={1} position="relative">
                      <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        pt={commonFunc.toVW(60)}
                      >
                        <FireworksMain
                          ActivityAction={this.ActivityAction}
                        ></FireworksMain>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box height={commonFunc.toVW(98)} width="100%">
                <BottomBar
                  ActivityAction={this.ActivityAction}
                  bg="rgba(0,0,0,.4)"
                  fontColor="#fff"
                  inputBg="#F5F5F5"
                  onPost={this.postComment.bind(this)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </PageDefault>
    )
  }

  postComment(content: string, state: number = 1) {
    modalBox.open({
      content: UtilToast,
      hideBg: true,
      params: {
        message: '发送成功'
      }
    })
    setTimeout(() => {
      this.ActivityAction.comment(content, state).then((res) => {
        if (res.status) {
          modalBox.open({
            content: FireworksSuccess,
            params: {
              point: res.result.prizeCount
            }
          })
        } else {
          let log = commonFunc.getItem('fireworks')
          let nowDate = new Date()
          if (
            !!log &&
            !log[`zhufu-${nowDate.getMonth() + 1}-${nowDate.getDate()}`]
          ) {
            modalBox.open({
              content: FireworksFail,
              params: {
                type: 'zhufu'
              }
            })
          }
        }
        if (this.state.danmu) {
          pageEvent.emit('postCom', content)
        }
      })
    }, 4000)
    this.setState({
      danmuTotal: this.state.danmuTotal + 1
    })
  }
  componentDidMount() {
    this.ActivityAction.init()
    this.ActivityAction.commentList({
      page: 1,
      pageSize: 10,
      type: 1,
      activityId: this.ActivityAction.activityID
    }).then((res) => {
      this.setState({
        danmuTotal: Number(res.result.total)
      })
    })
  }
  pageIndex: number = 1
  async danmuApi() {
    let commentList = await this.ActivityAction.commentList({
      page: this.pageIndex,
      pageSize: 99999,
      type: 1,
      activityId: this.ActivityAction.activityID
    })
    // this.pageIndex++
    return commentList.result.records
  }
}
