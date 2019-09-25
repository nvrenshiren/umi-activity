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
        config={{ title: '高档家居四件套' }}
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
            title="高档家居四件套"
            content={
              <React.Fragment>
                <Box textAlign="center" mb={2}>
                  <img
                    src={require('@/statics/image/convert/31.png')}
                    width="80%"
                  />
                </Box>
                产品参数：
                <br />
                • 被里材质: 棉<br />
                • 棉种类: 棉<br />
                • 成分含量: 100%
                <br />
                • 件数: 4件
                <br />
                • 适用床尺寸: 1.8m（6英尺）床 适合200*230被子【四件套】
                <br />
                • 产品等级: 合格品
                <br />
                • 床品工艺: 绗缝
                <br />
                • 面料支数: 40支
                <br />
                • 面料密度: 128x68
                <br />
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
        return item.rewardId === '4'
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
