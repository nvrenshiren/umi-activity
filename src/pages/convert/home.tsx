import React from 'react'
import PageDefault from '@/components/page/page.default'
import { Box } from '@material-ui/core'
import userService from '@/service/user.service'
import commonFunc from '@/functions/common.func'
import FontSizeBox from '@/components/util/font.size'
import activityService from '@/service/activity.service'
import { rewardItem, listPrizeItem } from '@/interface/api.res'
import { router } from 'umi'
import ButtonRadius from '@/components/util/button.radius'
interface Props {}
interface State {
  point: number
  rewardList: rewardItem[]
  listPrize: listPrizeItem[]
}
export default class ConvertHome extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      point: 0,
      rewardList: [],
      listPrize: []
    }
  }
  render() {
    return (
      <PageDefault
        config={{ title: '我的集分兑奖' }}
        appBar
        back
        close
        barStyle={{ background: '#fff', color: '#666' }}
      >
        <Box
          className="pageBox"
          height="100%"
          overflow="auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <Box className="banner" position="relative">
            <img
              src={require('@/statics/image/convert/banner.png')}
              width="100%"
            />
            <Box
              position="absolute"
              left={0}
              top={0}
              width="100%"
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <FontSizeBox viewSize={82} lineHeight={2} color="#FFE26C">
                {this.state.point} 分
              </FontSizeBox>
              <FontSizeBox viewSize={30} color="#fff">
                我的分数
              </FontSizeBox>
            </Box>
          </Box>
          <Box className="canDraw" mt={commonFunc.toVW(40)}>
            <FontSizeBox
              mx={commonFunc.toVW(30)}
              viewSize={32}
              color="#333"
              lineHeight={1}
              fontWeight="bold"
            >
              可兑换奖品
            </FontSizeBox>
            <Box className="drawList" display="flex" flexWrap="wrap">
              {this.state.rewardList.map((item) => {
                return (
                  <Box
                    width="50%"
                    p={commonFunc.toVW(30)}
                    key={`item-${item.rewardId}-${item.count}`}
                  >
                    <img
                      src={item.url}
                      width="100%"
                      style={{ height: commonFunc.toVW(210) }}
                    />
                    <FontSizeBox
                      viewSize={28}
                      lineHeight={1}
                      color="#333"
                      fontWeight="bold"
                      mt={commonFunc.toVW(25)}
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                    >
                      {item.rewardName}
                    </FontSizeBox>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      mt={commonFunc.toVW(15)}
                      lineHeight={1}
                    >
                      <FontSizeBox viewSize={24} color="#FF2951">
                        {item.consumptionScore}分
                      </FontSizeBox>
                      <FontSizeBox viewSize={24} color="#666">
                        剩余数量: {item.count}
                      </FontSizeBox>
                    </Box>
                    <ButtonRadius
                      fontSize={32}
                      onClick={() => {
                        if (!!item.count && !this.isExchange(item)) {
                          router.push(`/convert/${item.rewardId}`)
                        }
                      }}
                      mt={commonFunc.toVW(45)}
                      width="100%"
                      height={70}
                      bgcolor={
                        item.count && !this.isExchange(item)
                          ? 'rgb(246,65,65)'
                          : '#999'
                      }
                      color="#fff"
                      style={{
                        boxShadow:
                          item.count && !this.isExchange(item)
                            ? 'rgb(243,131,134) 0px 4px 4px 1px'
                            : 'none'
                      }}
                    >
                      {this.isExchange(item) ? '已兑换' : '去兑换'}
                    </ButtonRadius>
                  </Box>
                )
              })}
            </Box>
          </Box>
          {this.state.listPrize.length > 0 && (
            <Box className="doneDraw" mt={commonFunc.toVW(40)}>
              <FontSizeBox
                mx={commonFunc.toVW(30)}
                viewSize={32}
                color="#333"
                lineHeight={1}
                fontWeight="bold"
              >
                已获取奖品
              </FontSizeBox>
              <FontSizeBox
                mx={commonFunc.toVW(30)}
                viewSize={24}
                color="#FF1E3E"
                lineHeight={1}
                mt={commonFunc.toVW(15)}
              >
                兑奖期限：截止2019年10月8日 24:00
              </FontSizeBox>
              <Box className="drawList">
                {this.state.listPrize.map((item) => {
                  return (
                    <Box
                      key={`list-${item.id}-${item.rewardId}`}
                      p={commonFunc.toVW(30)}
                      display="flex"
                      justifyContent="space-between"
                      onClick={() => {
                        router.push({
                          pathname: '/convert/address',
                          query: {
                            id: item.id,
                            isExchange: item.isExchange,
                            address: item.prizeAddress
                          }
                        })
                      }}
                    >
                      <Box
                        width={commonFunc.toVW(210)}
                        height={commonFunc.toVW(140)}
                        bgcolor="#F5F5F5"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <img
                          src={item.url}
                          style={{
                            maxWidth: commonFunc.toVW(210),
                            maxHeight: commonFunc.toVW(140)
                          }}
                        />
                      </Box>
                      <Box
                        flexGrow={1}
                        px={commonFunc.toVW(30)}
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <FontSizeBox
                          viewSize={32}
                          color="#333"
                          fontWeight="bold"
                          lineHeight={1.5}
                        >
                          {item.rewardName}
                        </FontSizeBox>
                        <FontSizeBox
                          viewSize={28}
                          color={item.prizeAddress ? '#5993FE' : '#FF2951'}
                        >
                          {item.prizeAddress
                            ? '修改收货地址'
                            : '未填写收货地址'}
                        </FontSizeBox>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          )}
        </Box>
      </PageDefault>
    )
  }
  isExchange(item: rewardItem) {
    let { rewardId } = item
    return !!this.state.listPrize.filter((temp) => {
      return !!temp.isExchange && temp.rewardId === rewardId
    })[0]
  }
  componentDidMount() {
    Promise.all([
      userService.remainScore({
        themeId: commonFunc.getItem('themeID'),
        rewardId: '5'
      }),
      activityService.rewardList({ themeId: commonFunc.getItem('themeID') }),
      userService.listPrize({ themeId: commonFunc.getItem('themeID') })
    ]).then(([remainScore, rewardList, listPrize]) => {
      this.setState({
        point: remainScore.result,
        rewardList: rewardList.result,
        listPrize: listPrize.result.filter((item) => {
          return item.rewardId !== '5'
        })
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
