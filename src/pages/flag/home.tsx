import React from 'react'
import PageDefault from '@/components/page/page.default'
import { Box, ButtonBase, IconButton } from '@material-ui/core'
import { MusicNote, MusicOff, WidgetsOutlined } from '@material-ui/icons'
import commonFunc from '@/functions/common.func'
import modalBox from '@/components/util/modal.box'
import { FlagFail, FlagSuccess, FlagShare } from '@/components/flag/flag.modal'
import pageEvent from '@/functions/page.event'
import { listTheme } from '@/interface/api.res'
import ActivityAction from '@/functions/activity.action'
import ButtonRadius from '@/components/util/button.radius'
import { router } from 'umi'

interface Props {}
interface State {
  audio: boolean
  hashoise: number
  point?: number
  total: number
  show: boolean
}

export default class FlagHome extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      audio: true,
      hashoise: 0,
      point: 7,
      total: 0,
      show: false
    }
    let activityList: listTheme[] = commonFunc.getItem('activity')
    if (activityList) {
      this.activityInfo = activityList.filter((item) => {
        return item.activityType === 3
      })[0]
      this.ActivityAction = new ActivityAction(this.activityInfo.id)
    }
  }
  AudioEle: HTMLAudioElement
  ActivityAction: ActivityAction
  activityInfo: listTheme
  render() {
    let marginBottom = this.state.hashoise * ((900 - 150) / 5) + 150
    return (
      <PageDefault
        config={{ title: '人人都是升旗手' }}
        appBar
        back
        share
        barStyle={{ background: '#fff', color: '#666' }}
      >
        <Box
          hidden={!this.state.show}
          className="pageBox"
          height="100%"
          overflow="hidden"
          style={{
            background: `url(${require('@/statics/image/flag/hoise-bg.png')}) top center no-repeat`,
            backgroundSize: '100%'
          }}
        >
          <Box width="100%" height="100%" position="relative" overflow="hidden">
            <Box textAlign="right" color="#fff">
              <Box p={commonFunc.toVW(25)} display="inline-block">
                <IconButton
                  className={this.state.audio ? 'spin' : ''}
                  color="inherit"
                  size="small"
                  style={{
                    border: '2px solid #fff'
                  }}
                  onClick={() => {
                    this.setState(
                      {
                        audio: !this.state.audio
                      },
                      () => {
                        this.AudioEle.muted = this.state.audio ? false : true
                        this.AudioEle.volume = this.state.audio ? 1 : 0
                      }
                    )
                  }}
                >
                  {this.state.audio ? (
                    <MusicNote fontSize="large" />
                  ) : (
                    <MusicOff fontSize="large" />
                  )}
                </IconButton>
              </Box>
            </Box>
            <Box
              position="absolute"
              width={commonFunc.toVW(148)}
              left={commonFunc.toVW(30)}
              bottom={commonFunc.toVW(10)}
              zIndex={0}
            >
              <img
                src={require('@/statics/image/flag/police.png')}
                width="100"
                style={{
                  transform: 'rotateY(180deg)'
                }}
              />
            </Box>
            <Box
              position="absolute"
              width={commonFunc.toVW(774)}
              zIndex={1}
              bottom={commonFunc.toVW(-90)}
              left={commonFunc.toVW(30)}
            >
              <img
                src={require('@/statics/image/flag/hoise-tai.png')}
                width="100%"
              />
            </Box>
            <Box
              position="absolute"
              width={commonFunc.toVW(188)}
              zIndex={2}
              bottom={commonFunc.toVW(-10)}
              right={commonFunc.toVW(15)}
            >
              <img
                src={require('@/statics/image/flag/police.png')}
                width="100%"
              />
            </Box>
            <Box
              position="absolute"
              width={commonFunc.toVW(23)}
              zIndex={3}
              bottom={commonFunc.toVW(140)}
              left={commonFunc.toVW(390)}
            >
              <img
                src={require('@/statics/image/flag/hoise-gan.png')}
                width="100%"
              />
            </Box>
            <Box
              position="absolute"
              width={commonFunc.toVW(214)}
              zIndex={4}
              bottom={commonFunc.toVW(marginBottom)}
              left={commonFunc.toVW(185)}
              style={{
                transition: 'bottom 2s'
              }}
            >
              <img
                src={require('@/statics/image/flag/flag.png')}
                width="100%"
              />
            </Box>
            <Box
              position="absolute"
              width={commonFunc.toVW(310)}
              height={commonFunc.toVW(87)}
              bottom={commonFunc.toVW(44)}
              left="50%"
              marginLeft={commonFunc.toVW(-155)}
              zIndex={5}
            >
              <ButtonRadius
                onClick={() => {
                  if (this.state.hashoise === 5) {
                    modalBox.open({
                      content: FlagSuccess,
                      params: {
                        point: this.state.point
                      }
                    })
                  } else {
                    this.flagPost()
                  }
                }}
                position="absolute"
                width={commonFunc.toVW(300)}
                height={80}
                bgcolor="#ffaf00"
                color="#fff"
                zIndex={1}
                fontSize={28}
              >
                开始升旗
              </ButtonRadius>
              <Box
                position="absolute"
                width={commonFunc.toVW(300)}
                height={commonFunc.toVW(80)}
                left={commonFunc.toVW(10)}
                top={commonFunc.toVW(8)}
                bgcolor="#dc7184"
                borderRadius={commonFunc.toVW(40)}
                overflow="hidden"
                zIndex={0}
              />
            </Box>
          </Box>
        </Box>
        <Box
          display={this.state.show ? 'none' : 'flex'}
          flexDirection="column"
          className="pageBox"
          height="100%"
          overflow="auto"
          style={{
            background: `url(${require('@/statics/image/flag/bg.png')}) center top no-repeat #FAEAE4`,
            backgroundSize: '100%',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <Box
            width="100%"
            textAlign="right"
            p={commonFunc.toVW(30)}
            color="#fff"
          >
            <IconButton
              style={{ fontSize: commonFunc.toVW(40) }}
              color="inherit"
              onClick={() => {
                router.push('/flag/explain')
              }}
            >
              <WidgetsOutlined fontSize="inherit"></WidgetsOutlined>
            </IconButton>
          </Box>
          <Box width={commonFunc.toVW(558)} mx="auto">
            <img src={require('@/statics/image/flag/title.png')} width="100%" />
          </Box>
          <Box
            position="relative"
            width={commonFunc.toVW(310)}
            height={commonFunc.toVW(87)}
            mx="auto"
          >
            <ButtonRadius
              position="absolute"
              width={commonFunc.toVW(300)}
              height={80}
              bgcolor="#ffaf00"
              color="#fff"
              zIndex={1}
              fontSize={28}
              onClick={() => {
                this.AudioEle.play()
                this.ActivityAction.remainPrize().then((res) => {
                  this.setState(
                    {
                      show: true,
                      hashoise: 5 - res.result
                    },
                    () => {
                      this.checkStatus()
                    }
                  )
                })
              }}
            >
              去升旗
            </ButtonRadius>
            <Box
              position="absolute"
              width={commonFunc.toVW(300)}
              height={commonFunc.toVW(80)}
              left={commonFunc.toVW(10)}
              top={commonFunc.toVW(8)}
              bgcolor="#dc7184"
              borderRadius={commonFunc.toVW(40)}
              overflow="hidden"
              zIndex={0}
            />
          </Box>
          <Box
            color="#333"
            fontSize={commonFunc.toVW(24)}
            mt={commonFunc.toVW(16)}
            mb={commonFunc.toVW(48)}
            textAlign="center"
          >
            已有{this.state.total}人参加升旗活动
          </Box>
          <Box
            width={commonFunc.toVW(534)}
            mx="auto"
            px={commonFunc.toVW(120)}
            py={commonFunc.toVW(56)}
            bgcolor="background.paper"
            color="#333"
            fontSize={commonFunc.toVW(36)}
            lineHeight={2}
            borderRadius={commonFunc.toVW(20)}
          >
            升旗游戏靠分享，
            <br />
            每次分享皆有分，
            <br />
            五次分享即成功， <br />
            还有额外7分送，
            <br />
            要想集分兑大奖，
            <br />
            那就快来升旗吧
          </Box>
        </Box>
        <audio
          ref={(node) => {
            this.AudioEle = node
          }}
          src={require('@/statics/audio/anthem.mp3')}
          preload="auto"
          loop
          hidden
        />
      </PageDefault>
    )
  }
  checkStatus() {
    if (this.state.hashoise === 5) {
      modalBox.open({
        content: FlagSuccess,
        params: {
          point: 7
        }
      })
    } else {
      if (this.state.hashoise > 0) {
        modalBox.open({
          content: FlagFail,
          params: {
            number: 5 - this.state.hashoise
          }
        })
      }
    }
  }
  flagPost() {
    modalBox.open({
      content: FlagShare
    })
  }
  componentDidMount() {
    this.ActivityAction.init().then(() => {
      this.ActivityAction.commentList({
        page: 1,
        pageSize: 10,
        type: 0,
        activityId: this.ActivityAction.activityID
      }).then((res) => {
        this.setState({
          total: Number(res.result.total)
        })
      })
    })
    pageEvent.on('ShareSuccess', () => {
      this.ActivityAction.action().then((res) => {
        if (res.status) {
          this.setState(
            {
              hashoise: this.state.hashoise + 1
            },
            () => {
              if (this.state.hashoise === 5) {
                modalBox.open({
                  content: FlagSuccess,
                  params: {
                    point: this.state.point
                  }
                })
              }
            }
          )
        }
      })
    })
  }
  componentWillUnmount() {
    this.setState = () => {}
    /**
     * clearInterval()
     * clearTimeout()
     */
  }
}
