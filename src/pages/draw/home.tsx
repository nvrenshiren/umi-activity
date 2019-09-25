import React, { Props } from 'react'
import PageDefault from '@/components/page/page.default'
import { Box, ButtonBase } from '@material-ui/core'
import commonFunc from '@/functions/common.func'
import { router } from 'umi'
import FontSizeBox from '@/components/util/font.size'
import { listTheme, prizeItem, allListPrizeItem } from '@/interface/api.res'
import ActivityAction from '@/functions/activity.action'
import DrawMachine from '@/components/draw/draw.machine'
import pageEvent from '@/functions/page.event'

interface State {
  drawTimes: number
  prizeList: prizeItem[]
  allListPrize: allListPrizeItem[]
}

export default class DrawHome extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      drawTimes: 0,
      prizeList: [],
      allListPrize: []
    }
    let activityList: listTheme[] = commonFunc.getItem('activity')
    if (activityList) {
      this.activityInfo = activityList.filter((item) => {
        return item.activityType === 5
      })[0]
      this.ActivityAction = new ActivityAction(this.activityInfo.id)
    }
  }
  activityInfo: listTheme
  ActivityAction: ActivityAction
  render() {
    return (
      <PageDefault
        config={{ title: '抽取千元大奖' }}
        appBar
        back
        share
        barStyle={{ background: '#fff', color: '#666' }}
      >
        <Box
          height="100%"
          overflow="auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
          bgcolor="rgb(255,244,209)"
          pb={commonFunc.toVW(115)}
        >
          <Box position="relative">
            <img
              src={require('@/statics/image/draw/banner.png')}
              width="100%"
            />
            <ButtonBase
              style={{
                position: 'absolute',
                right: 0,
                top: commonFunc.toVW(45),
                color: '#fff',
                borderRadius: `${commonFunc.toVW(20)} 0 0 ${commonFunc.toVW(
                  20
                )}`,
                background: '#DE8823'
              }}
              onClick={() => {
                // router.push('/flag/home')
                router.push('/convert/home')
              }}
            >
              <FontSizeBox
                viewSize={22}
                width={commonFunc.toVW(115)}
                textAlign="center"
                lineHeight={1}
                py={commonFunc.toVW(10)}
                style={{
                  borderRadius: `${commonFunc.toVW(20)} 0 0 ${commonFunc.toVW(
                    20
                  )}`
                }}
              >
                我的奖品
              </FontSizeBox>
            </ButtonBase>
          </Box>
          <Box
            px={commonFunc.toVW(30)}
            pt={commonFunc.toVW(20)}
            pb={commonFunc.toVW(30)}
            display="flex"
            justifyContent="space-between"
            color="#E76300"
          >
            <FontSizeBox viewSize={24}>活动期间每天可免费参与抽奖</FontSizeBox>
            <FontSizeBox
              viewSize={24}
              onClick={() => {
                router.push('/draw/explain')
              }}
            >
              活动规则
            </FontSizeBox>
          </Box>
          <Box mx={commonFunc.toVW(45)}>
            <Box
              className="draw-box"
              bgcolor="background.paper"
              pt={commonFunc.toVW(10)}
              borderRadius={commonFunc.toVW(20)}
            >
              <Box
                borderRadius={commonFunc.toVW(20)}
                bgcolor="#FFED9A"
                py={commonFunc.toVW(15)}
              >
                <FontSizeBox
                  viewSize={34}
                  mx={commonFunc.toVW(22)}
                  mb={commonFunc.toVW(15)}
                  bgcolor="#FFDE71"
                  borderRadius={commonFunc.toVW(10)}
                  color="#84092D"
                  textAlign="center"
                  fontFamily="PingFang-SC-Medium"
                  lineHeight={commonFunc.toVW(68)}
                >
                  今日还剩
                  <Box display="inline" color="#FC6361">
                    {this.state.drawTimes}次
                  </Box>
                  抽奖机会哦
                </FontSizeBox>
                <Box mx="auto" width={commonFunc.toVW(630)}>
                  {this.state.prizeList.length && (
                    <DrawMachine
                      allListPrize={this.state.allListPrize}
                      prizeList={this.state.prizeList}
                      ActivityAction={this.ActivityAction}
                    />
                  )}
                </Box>
              </Box>
            </Box>

            <Box
              id="draw-list"
              mt={commonFunc.toVW(30)}
              bgcolor="#FFED9A"
              pb={commonFunc.toVW(35)}
            >
              <img
                src={require('@/statics/image/draw/line.png')}
                style={{
                  width: commonFunc.toVW(680),
                  marginLeft: commonFunc.toVW(-17.5)
                }}
              />
              <FontSizeBox
                viewSize={40}
                color="#E76300"
                textAlign="center"
                lineHeight={commonFunc.toVW(100)}
              >
                奖品清单
              </FontSizeBox>
              <Box
                mx={commonFunc.toVW(30)}
                display="flex"
                flexDirection="rows"
                flexWrap="wrap"
                justifyContent="space-between"
                pb={commonFunc.toVW(20)}
                borderBottom={`${commonFunc.toVW(5)} solid #F1CD29`}
              >
                <FontSizeBox
                  viewSize={30}
                  color="#E76300"
                  lineHeight={3}
                  fontWeight="bold"
                >
                  特等奖
                </FontSizeBox>
                <FontSizeBox viewSize={30} color="#E76300" lineHeight={3}>
                  价值2000元
                </FontSizeBox>
                <FontSizeBox width="100%" color="#E76300" viewSize={26}>
                  小马机器人
                </FontSizeBox>
              </Box>
              <Box
                mx={commonFunc.toVW(30)}
                display="flex"
                flexDirection="rows"
                flexWrap="wrap"
                justifyContent="space-between"
                pb={commonFunc.toVW(20)}
                borderBottom={`${commonFunc.toVW(5)} solid #F1CD29`}
              >
                <FontSizeBox
                  viewSize={30}
                  color="#E76300"
                  lineHeight={3}
                  fontWeight="bold"
                >
                  一等奖
                </FontSizeBox>
                <FontSizeBox viewSize={30} color="#E76300" lineHeight={3}>
                  价值700元
                </FontSizeBox>
                <FontSizeBox width="100%" color="#E76300" viewSize={26}>
                  《英雄.1949》纪念版钢笔 赠二个墨囊、一份1949年
                  <br />
                  10月1日《人民日报》、阅兵明信片一套
                </FontSizeBox>
              </Box>
              <Box
                mx={commonFunc.toVW(30)}
                display="flex"
                flexDirection="rows"
                flexWrap="wrap"
                justifyContent="space-between"
                pb={commonFunc.toVW(20)}
                borderBottom={`${commonFunc.toVW(5)} solid #F1CD29`}
              >
                <FontSizeBox
                  viewSize={30}
                  color="#E76300"
                  lineHeight={3}
                  fontWeight="bold"
                >
                  二等奖
                </FontSizeBox>
                <FontSizeBox viewSize={30} color="#E76300" lineHeight={3}>
                  价值227元
                </FontSizeBox>
                <FontSizeBox width="100%" color="#E76300" viewSize={26}>
                  (1)中华人民共和国成立70周年礼盒（高档橡胶杯+旅 行本）
                  <br />
                  (2)高档家居四件套
                </FontSizeBox>
              </Box>
              <Box
                mx={commonFunc.toVW(30)}
                display="flex"
                flexDirection="rows"
                flexWrap="wrap"
                justifyContent="space-between"
                pb={commonFunc.toVW(20)}
                borderBottom={`${commonFunc.toVW(5)} solid #F1CD29`}
              >
                <FontSizeBox
                  viewSize={30}
                  color="#E76300"
                  lineHeight={3}
                  fontWeight="bold"
                >
                  三等奖
                </FontSizeBox>
                <FontSizeBox viewSize={30} color="#E76300" lineHeight={3}>
                  价值38元
                </FontSizeBox>
                <FontSizeBox width="100%" color="#E76300" viewSize={26}>
                  改革开放40周年纪念币1枚 + 高档党旗国旗台式摆件
                </FontSizeBox>
              </Box>
            </Box>
          </Box>
        </Box>
      </PageDefault>
    )
  }
  allListPrizeInterval: NodeJS.Timeout
  componentDidMount() {
    this.ActivityAction.init().then(() => {
      Promise.all([
        this.ActivityAction.remainPrize(),
        this.ActivityAction.prizeList()
      ]).then(([remainPrize, prizeList]) => {
        this.ActivityAction.allListPrize({
          page: 1,
          pageSize: 10
        }).then((res) => {
          this.setState({
            drawTimes: remainPrize.result,
            prizeList: prizeList.result,
            allListPrize: res.result.records
          })
        })
      })
      this.allListPrizeInterval = setInterval(() => {
        this.ActivityAction.allListPrize({
          page: 1,
          pageSize: 10
        }).then((res) => {
          this.setState({
            allListPrize: res.result.records
          })
        })
      }, 5000)
    })

    pageEvent.on('drawDone', () => {
      this.setState({
        drawTimes: this.state.drawTimes - 1
      })
    })
  }

  componentWillUnmount() {
    this.setState = () => {}
    clearInterval(this.allListPrizeInterval)
    /**
     * clearInterval()
     * clearTimeout()
     */
  }
}
