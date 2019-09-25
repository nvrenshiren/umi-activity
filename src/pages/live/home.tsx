import BottomBar from '@/components/page/bottom.bar'
import commonFunc from '@/functions/common.func'
import FontSizeBox from '@/components/util/font.size'
import PageDefault from '@/components/page/page.default'
import React from 'react'
import VideoH5 from '@/components/video/video.h5'
import { Box, Switch } from '@material-ui/core'
import { listTheme, commentItem } from '@/interface/api.res'
import ActivityAction from '@/functions/activity.action'
import modalBox from '@/components/util/modal.box'
import { FireworksTip } from '@/components/fireworks/fireworks.modal'
import pageEvent from '@/functions/page.event'
import _ from 'lodash'

interface State {
  danmu: boolean
  danmuTotal: number
  danmuList: commentItem[]
}

export default class LiveHome extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      danmu: true,
      danmuTotal: 0,
      danmuList: []
    }
    let activityList: listTheme[] = commonFunc.getItem('activity')
    if (activityList) {
      this.activityInfo = activityList.filter((item) => {
        return item.activityType === 4
      })[0]
      this.ActivityAction = new ActivityAction(this.activityInfo.id)
    }
  }
  ActivityAction: ActivityAction
  activityInfo: listTheme
  render() {
    return (
      <PageDefault config={{ title: '国庆阅兵' }} appBar back share>
        <Box
          display="flex"
          flexDirection="column"
          className="pageBox"
          height="100%"
        >
          <Box className="videoDiv">
            <VideoH5
              video={
                this.activityInfo &&
                JSON.parse(this.activityInfo.background).videoUrl
              }
              full
              danmu={this.state.danmu}
              danmuApi={this.danmuApi.bind(this)}
            />
          </Box>
          <Box flexGrow={1} position="relative">
            <Box
              width="100%"
              height="100%"
              position="absolute"
              display="flex"
              flexDirection="column"
            >
              <Box
                width="100%"
                bgcolor="background.paper"
                height={commonFunc.toVW(88)}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={commonFunc.toVW(30)}
                overflow="hidden"
              >
                <FontSizeBox viewSize={28} whiteSpace="nowrap">
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
                    color="#666"
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
                  <Box
                    height="100%"
                    pb={commonFunc.toVW(60)}
                    overflow="auto"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                  >
                    {this.state.danmuList.map((item) => {
                      return (
                        <FontSizeBox
                          viewSize={32}
                          lineHeight={1.5}
                          key={`comment-${item.id}-${item.userId}`}
                        >
                          <Box color="primary.main" display="inline">
                            {item.userName}:{' '}
                          </Box>
                          {item.comment}
                        </FontSizeBox>
                      )
                    })}
                  </Box>
                  <Box
                    position="absolute"
                    bottom={0}
                    width="100%"
                    left={0}
                    textAlign="center"
                    bgcolor="#FFF7EA"
                  >
                    <FontSizeBox
                      viewSize={24}
                      color="#F17333"
                      lineHeight={commonFunc.toVW(60)}
                    >
                      温馨提示：送祝福，即可获取分数，兑大奖
                    </FontSizeBox>
                  </Box>
                </Box>
              </Box>
              <Box height={commonFunc.toVW(98)} width="100%">
                <BottomBar
                  ActivityAction={this.ActivityAction}
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
    // modalBox.open({
    //   content: FireworksTip,
    //   hideBg: true
    // })

    this.ActivityAction.comment(content, state).then((res) => {
      if (this.state.danmu) {
        pageEvent.emit('postCom', content)
        this.setState({
          danmuTotal: this.state.danmuTotal + 1
        })
      }
    })
  }
  componentDidMount() {
    this.ActivityAction.init()
    this.ActivityAction.commentList({
      page: 1,
      pageSize: 20,
      type: 1,
      activityId: this.ActivityAction.activityID
    }).then((res) => {
      this.setState({
        danmuTotal: Number(res.result.total),
        danmuList: res.result.records
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
    let List = commentList.result ? commentList.result.records : []
    let newList = _.differenceBy(List, this.state.danmuList, 'id')
    this.setState({
      danmuList: newList.concat(this.state.danmuList)
    })
    // this.pageIndex++
    return commentList.result ? commentList.result.records : []
  }
}
