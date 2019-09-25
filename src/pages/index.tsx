import * as React from 'react'
import { Box, ButtonBase } from '@material-ui/core'
import { Link, router } from 'umi'
import PageDefault from '@/components/page/page.default'
import commonFunc from '@/functions/common.func'
import moment from 'moment'
import FontSizeBox from '@/components/util/font.size'
import userService from '@/service/user.service'
import { listTheme, specialItem } from '@/interface/api.res'
import cmsService from '@/service/cms.service'
import modalBox from '@/components/util/modal.box'
import { UtilToast } from '@/components/util/util.toast'
import { ErrorOutline } from '@material-ui/icons'

interface State {
  index: number
  point: number
  special: specialItem[]
}

export default class IndexPage extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      index: 0,
      point: 0,
      special: []
    }
    const activityList: listTheme[] = commonFunc.getItem('activity')
    const nowMoment = moment()
    this.navList.map((item) => {
      if (!!activityList) {
        activityList.map((temp) => {
          if (temp.activityType === item.type) {
            item.startTime = temp.startTime
            item.endTime = temp.endTime
          }
        })
      }
      item.will = nowMoment.isBefore(item.startTime, 'second')
      item.start = nowMoment.isBetween(item.startTime, item.endTime, 'second')
      item.end = nowMoment.isAfter(item.endTime, 'second')
    })
  }
  navList = [
    {
      name: '放礼花',
      type: 1,
      startTime: '2019-09-23 00:00:00',
      endTime: '2019-10-08 19:00:00',
      bg: require('@/statics/image/index/lihua.png'),
      route: '/fireworks/home',
      will: false,
      start: false,
      end: false
    },
    {
      name: '升旗手',
      type: 3,
      startTime: '2019-09-26 00:00:00',
      endTime: '2019-10-08 19:00:00',
      bg: require('@/statics/image/index/shengqi.png'),
      route: '/flag/home',
      will: false,
      start: false,
      end: false
    },
    {
      name: '阅兵直播',
      type: 4,
      startTime: '2019-10-01 00:00:00',
      endTime: '2019-10-08 19:00:00',
      bg: require('@/statics/image/index/yuebing.png'),
      route: '/live/home',
      will: false,
      start: false,
      end: false
    }
  ]
  render() {
    return (
      <PageDefault
        config={{
          title: '抽奖迎国庆 集分兑大奖'
        }}
        appBar
        back
        share
        noBg
        barStyle={{
          background: `url(${require('@/statics/image/index/bg.png')}) no-repeat`,
          backgroundSize: '100%'
        }}
      >
        <Box
          height="100%"
          overflow="auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <Box
            className="pageBox"
            pt={commonFunc.toVW(20)}
            style={{
              background: `url(${require('@/statics/image/index/bg.png')}) no-repeat`,
              backgroundSize: '100%',
              backgroundPositionY: commonFunc.toVW(-120)
            }}
          >
            <Box
              position="relative"
              height={commonFunc.toVW(450)}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              overflow="hidden"
            >
              <ButtonBase
                style={{
                  position: 'absolute',
                  left: 0,
                  top: commonFunc.toVW(30),
                  color: '#fff',
                  borderRadius: `0 ${commonFunc.toVW(32)} ${commonFunc.toVW(
                    32
                  )} 0`
                }}
                onClick={() => {
                  router.push('/explain')
                }}
              >
                <Box
                  border="1px solid #fff"
                  borderLeft="0"
                  width={commonFunc.toVW(145)}
                  textAlign="center"
                  lineHeight={1}
                  py={commonFunc.toVW(20)}
                  style={{
                    borderRadius: `0 ${commonFunc.toVW(32)} ${commonFunc.toVW(
                      32
                    )} 0`
                  }}
                >
                  <FontSizeBox viewSize={26}>活动规则</FontSizeBox>
                </Box>
              </ButtonBase>
              <Box
                width={commonFunc.toVW(240)}
                height={commonFunc.toVW(240)}
                p={commonFunc.toVW(20)}
                borderRadius="50%"
                bgcolor="rgba(255,255,255,0.4)"
                position="absolute"
                zIndex={2}
                onClick={() => {
                  router.push('/convert/home')
                }}
              >
                <Box
                  width="100%"
                  height="100%"
                  borderRadius="50%"
                  bgcolor="#FFF0D3"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FontSizeBox viewSize={45} color="#CB5809">
                    {this.state.point}
                  </FontSizeBox>
                  <FontSizeBox viewSize={26} color="#666">
                    集分兑换
                  </FontSizeBox>
                </Box>
              </Box>

              <Box
                width={commonFunc.toVW(666)}
                position="absolute"
                bottom={commonFunc.toVW(-20)}
                zIndex={1}
              >
                <img
                  src={require('@/statics/image/index/draw.png')}
                  width="100%"
                />
                <ButtonBase
                  onClick={() => {
                    router.push('/draw/home')
                  }}
                  style={{
                    position: 'absolute',
                    width: commonFunc.toVW(82),
                    height: commonFunc.toVW(82),
                    borderRadius: '50%',
                    bottom: commonFunc.toVW(60),
                    right: commonFunc.toVW(130)
                  }}
                />
              </Box>
            </Box>
            <Box className="pageNav" mx={commonFunc.toVW(30)}>
              <Box
                display="flex"
                justifyContent="center"
                borderRadius={commonFunc.toVW(49)}
                overflow="hidden"
                style={{
                  boxShadow: '0px 5px 5px 2px #da602f'
                }}
              >
                {this.navList.map((item, index) => {
                  let isIndex = this.state.index === index
                  return (
                    <Box
                      width="33.3333333333333%"
                      key={`${item.name}-${item.startTime}`}
                    >
                      <Box
                        onClick={() => {
                          this.setState({
                            index
                          })
                        }}
                        width="100%"
                        height={commonFunc.toVW(98)}
                        bgcolor={isIndex ? '#744aac' : '#FFA200'}
                        textAlign="center"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        overflow="hidden"
                      >
                        <FontSizeBox
                          viewSize={26}
                          color="#fff"
                          lineHeight={1}
                          mb={commonFunc.toVW(8)}
                        >
                          {item.name}
                        </FontSizeBox>
                        <FontSizeBox
                          viewSize={20}
                          px={commonFunc.toVW(20)}
                          py={commonFunc.toVW(5)}
                          lineHeight={1.5}
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
                          borderRadius={commonFunc.toVW(16)}
                          color={isIndex ? '#E12311' : '#fff'}
                          bgcolor={isIndex ? '#FFCC00' : '#FF6C00'}
                        >
                          {item.start
                            ? '火热进行中'
                            : item.will
                            ? `${moment(item.startTime).format('MM月DD日')}开启`
                            : '已结束'}
                        </FontSizeBox>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
            <Box
              mt={commonFunc.toVW(32)}
              mb={commonFunc.toVW(65)}
              onClick={() => {
                let item = this.navList[this.state.index]
                if (item.start) {
                  router.push(this.navList[this.state.index].route)
                } else {
                  if (item.will) {
                    modalBox.open({
                      content: UtilToast,
                      hideBg: true,
                      params: {
                        message: '活动尚未开始',
                        icon: <ErrorOutline color="inherit" fontSize="large" />
                      }
                    })
                  }
                  if (item.end) {
                    modalBox.open({
                      content: UtilToast,
                      hideBg: true,
                      params: {
                        message: '活动已经结束',
                        icon: <ErrorOutline color="inherit" fontSize="large" />
                      }
                    })
                  }
                }
              }}
            >
              <img src={this.navList[this.state.index].bg} width="100%"></img>
            </Box>
            <Box
              mx="auto"
              mb={commonFunc.toVW(45)}
              width={commonFunc.toVW(530)}
              height={commonFunc.toVW(84)}
              style={{
                backgroundImage: `url(${require('@/statics/image/index/h1-bg.png')})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat'
              }}
              textAlign="center"
            >
              <FontSizeBox color="#FFFBF4" lineHeight={2} viewSize={36}>
                壮丽70年 • 奋斗新时代
              </FontSizeBox>
            </Box>
            {this.state.special.map((item) => {
              return (
                <React.Fragment key={`special-${item.id}`}>
                  {this.specialList(item)}
                </React.Fragment>
              )
            })}
          </Box>
        </Box>
      </PageDefault>
    )
  }
  specialList(item: specialItem) {
    return (
      <Box
        height={commonFunc.toVW(265)}
        mb={commonFunc.toVW(20)}
        mx={commonFunc.toVW(30)}
        p={commonFunc.toVW(30)}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        color="#fff"
        style={{
          backgroundSize: '100%',
          backgroundImage: `url(${item.coverImage})`
        }}
        onClick={() => {
          let { id, title } = item
          // if (commonFunc.checkUA.app) {
          //   window.JXRSApi.view.goto({
          //     url: 'native://columnDetail',
          //     query: {
          //       id,
          //       title
          //     }
          //   })
          // } else {
          //   window.location.href = `${window.location.origin}/party_98/news/?id=${id}&title=${title}`
          // }
          router.push({
            pathname: '/special/list',
            query: {
              id,
              title
            }
          })
        }}
      >
        <FontSizeBox viewSize={34} lineHeight={2} align>
          {item.title}
        </FontSizeBox>
        <FontSizeBox viewSize={27} align>
          {item.subtitle}
        </FontSizeBox>
      </Box>
    )
  }
  componentDidMount() {
    let themeID = commonFunc.getItem('themeID')
    Promise.all([
      userService.remainScore({
        themeId: themeID,
        rewardId: '5'
      }),
      cmsService.findSpecialByThemeId({ themeId: themeID })
    ]).then(([remainScore, Special]) => {
      if (Special && Special.status && !!Special.result.length) {
        cmsService
          .findSpecialByPid({
            pid: Special.result[0].id.toString()
          })
          .then((res) => {
            this.setState({
              point: remainScore.result,
              special: res.result
            })
          })
      } else {
        this.setState({
          point: remainScore.result
        })
      }
    })
  }
}
