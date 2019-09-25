import React from 'react'
import { Box, Snackbar, Slide, Fade } from '@material-ui/core'
import { prizeItem, allListPrizeItem } from '@/interface/api.res'
import ActivityAction from '@/functions/activity.action'
import _ from 'lodash'
import commonFunc from '@/functions/common.func'
import FontSizeBox from '../util/font.size'
import modalBox from '../util/modal.box'
import { DrawMatter, DrawNone, DrawPoints, DrawNoNum } from './draw.modal'
import pageEvent from '@/functions/page.event'
import { TransitionProps } from '@material-ui/core/transitions/transition'

interface Props {
  prizeList: prizeItem[]
  ActivityAction: ActivityAction
  allListPrize: allListPrizeItem[]
}
interface State {
  current: string
  done: boolean
}

export default class DrawMachine extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.prizeList = _.shuffle(this.props.prizeList)
    //将打乱后的列表ID+Count提取,根据九宫格规则生成一个数组
    this.circleArr = [
      ...this.prizeList
        .slice(0, 3)
        .map((item) => item.rewardId + item.prizeCount),
      this.prizeList[3].rewardId + this.prizeList[3].prizeCount,
      ...this.prizeList
        .slice(4, 7)
        .reverse()
        .map((item) => item.rewardId + item.prizeCount),
      this.prizeList[7].rewardId + this.prizeList[7].prizeCount
    ]

    //至少循环5圈
    this.scrollArr = new Array(6)
      .fill(this.circleArr)
      .join(',')
      .split(',')

    this.state = {
      current: '',
      done: true
    }
  }
  luckKey: string = ''
  prizeList: prizeItem[] = []
  circleArr: string[] = []
  scrollArr: string[] = []
  addressID: number = 0
  renderItem(item: prizeItem) {
    return (
      <Box
        key={`${item.rewardId}-${item.prizeCount}`}
        width="33.333333333%"
        height="33.333333333%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width={commonFunc.toVW(170)}
          height={commonFunc.toVW(170)}
          borderRadius={commonFunc.toVW(20)}
          overflow="hidden"
          py={commonFunc.toVW(20)}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          bgcolor={
            this.state.current === item.rewardId + item.prizeCount
              ? 'rgb(254,237,87)'
              : '#FFEFEF'
          }
        >
          <img
            src={
              item.rewardId + item.prizeCount === '50'
                ? require('@/statics/image/draw/draw-none.png')
                : item.url
            }
            width="50%"
          />
          <FontSizeBox
            viewSize={20}
            lineHeight={1}
            color="#B92825"
            mx={commonFunc.toVW(10)}
            overflow="hidden"
            textAlign="center"
          >
            {item.prizeName}
          </FontSizeBox>
        </Box>
      </Box>
    )
  }
  render() {
    return (
      <Box id="DrawMachine" position="relative">
        <img src={require('@/statics/image/draw/bg.png')} width="100%" />
        <Box
          className="scrollQueen"
          position="absolute"
          top={commonFunc.toVW(30)}
          width="100%"
          left={0}
          px={commonFunc.toVW(50)}
          height={commonFunc.toVW(60)}
          overflow="hidden"
        >
          <Box className="scrollList">
            {this.props.allListPrize.map((item, index) => {
              return (
                <FontSizeBox
                  textAlign="center"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  viewSize={26}
                  color="#FFFFE0"
                  lineHeight={commonFunc.toVW(60)}
                  key={`${item.userId}-${index}-${item.prizeQuantity}`}
                >
                  {item.userName}获得了{item.prizeQuantity}
                  {item.name === '积分' ? '' : '个'}
                  {item.name}
                </FontSizeBox>
              )
            })}
          </Box>
        </Box>
        <Box
          position="absolute"
          top={commonFunc.toVW(134)}
          bottom={commonFunc.toVW(52)}
          left={commonFunc.toVW(38)}
          right={commonFunc.toVW(38)}
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          {this.prizeList.slice(0, 3).map((item) => {
            return this.renderItem(item)
          })}
          {this.renderItem(this.prizeList[7])}
          <Box
            width="33.333333333%"
            height="33.333333333%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              width={commonFunc.toVW(170)}
              height={commonFunc.toVW(170)}
              borderRadius={commonFunc.toVW(20)}
              overflow="hidden"
              py={commonFunc.toVW(20)}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{
                background: `url(${require('@/statics/image/draw/draw.png')}) center center no-repeat`,
                backgroundSize: '100%'
              }}
            >
              <FontSizeBox
                viewSize={40}
                color="#F22129"
                lineHeight={commonFunc.toVW(46)}
                onClick={() => {
                  this.state.done && this.drawAction()
                }}
              >
                立即
                <br />
                抽奖
              </FontSizeBox>
            </Box>
          </Box>
          {this.renderItem(this.prizeList[3])}
          {this.prizeList.slice(4, 7).map((item) => {
            return this.renderItem(item)
          })}
        </Box>
      </Box>
    )
  }
  startDraw(index: number, lastIndex: number, speed: number = 500) {
    this.setState(
      {
        current: this.scrollArr[index],
        done: index === lastIndex
      },
      () => {
        if (!this.state.done) {
          setTimeout(() => {
            this.startDraw(
              ++index,
              lastIndex,
              this.getSpeed(index, lastIndex, speed)
            )
          }, speed)
        } else {
          //通知抽奖完成
          pageEvent.emit('drawDone')
          //弹窗
          this.openModal()
          //复位
          this.setState({
            done: true
          })
        }
      }
    )
  }
  openModal() {
    const luckItem = this.prizeList.filter((item) => {
      return this.luckKey === item.rewardId + item.prizeCount
    })[0]
    if (luckItem.rewardId === '5') {
      if (!!luckItem.prizeCount) {
        modalBox.open({
          content: DrawPoints,
          params: {
            item: luckItem
          }
        })
      } else {
        modalBox.open({
          content: DrawNone
        })
      }
    } else {
      modalBox.open({
        content: DrawMatter,
        params: {
          item: luckItem,
          addressID: this.addressID
        }
      })
    }
  }
  async drawAction() {
    /**
     * 手动随机
     */
    // this.luckKey = _.sample(this.circleArr)
    // let lastIndex = this.scrollArr.lastIndexOf(this.luckKey)
    // this.startDraw(0, lastIndex)
    /**
     * 正常逻辑
     */
    let drawItem = await this.props.ActivityAction.action()
    if (drawItem.status) {
      let { rewardId, prizeCount, id } = drawItem.result
      this.addressID = id
      this.luckKey = rewardId + prizeCount
      let lastIndex = this.scrollArr.lastIndexOf(this.luckKey)
      this.startDraw(0, lastIndex)
    } else {
      modalBox.open({
        content: DrawNoNum
      })
    }
  }
  getSpeed(index: number, lastIndex: number, speed: number) {
    if (index > lastIndex - 4) {
      return speed + 100
    } else if (index < 28) {
      return speed > 150 ? speed - 100 : 50
    } else {
      return speed + 20
    }
  }
  componentDidMount() {}
}
