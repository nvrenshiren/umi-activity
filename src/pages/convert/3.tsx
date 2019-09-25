import ConvertTemplate from '@/components/convert/convert.template'
import PageDefault from '@/components/page/page.default'
import commonFunc from '@/functions/common.func'
import { listPrizeItem, rewardItem } from '@/interface/api.res'
import activityService from '@/service/activity.service'
import userService from '@/service/user.service'
import { Box } from '@material-ui/core'
import React from 'react'
interface Props {}
interface State {
  point: number
  rewardList: rewardItem[]
}
export default class ConvertDetail extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      rewardList: [],
      point: 0
    }
  }
  rewardInfo: rewardItem
  render() {
    return (
      <PageDefault
        config={{ title: '新中国成立70周年礼盒' }}
        appBar
        back
        share
        close
        barStyle={{ background: '#fff', color: '#666' }}
      >
        <Box
          className="pageBox"
          height="100%"
          overflow="auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <ConvertTemplate
            title="新中国成立70周年礼盒"
            content={
              <React.Fragment>
                <Box textAlign="center" mb={2}>
                  <img
                    src={require('@/statics/image/convert/21.png')}
                    width="80%"
                  />
                </Box>
                旅行本尺寸：120*200mm <br />
                手感细腻，内有2个本芯，防水袋和卡袋，方便有效。
              </React.Fragment>
            }
            rewardInfo={this.rewardInfo}
            point={this.state.point}
          />
        </Box>
      </PageDefault>
    )
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
      this.rewardInfo = rewardList.result.filter((item) => {
        return item.rewardId === '3'
      })[0]
      this.setState({
        point: remainScore.result,
        rewardList: rewardList.result
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
