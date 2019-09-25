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
        config={{ title: '改革开放40周年纪念币+高档党旗国旗台式摆件' }}
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
            title="改革开放40周年纪念币+高档党旗国旗台式摆件"
            content={
              <Box textAlign="center">
                <img
                  src={require('@/statics/image/convert/41.png')}
                  width="50%"
                />
                <img
                  src={require('@/statics/image/convert/42.png')}
                  width="50%"
                />
                <img
                  src={require('@/statics/image/convert/43.png')}
                  width="80%"
                />
                <img
                  src={require('@/statics/image/convert/44.png')}
                  width="80%"
                />
              </Box>
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
        return item.rewardId === '6'
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
