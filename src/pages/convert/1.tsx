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
        config={{ title: '小马机器人' }}
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
            title="小马机器人"
            content={
              <React.Fragment>
                <Box textAlign="center" mb={2}>
                  <img
                    src={require('@/statics/image/convert/1.png')}
                    width="80%"
                  />
                </Box>
                小马助理机器人是由江西国泰利民信息科技有限公司独立研发，致力于改变当前党务工作模式，利用语音识别技术与大数据分析平台，使工作更加高效、便捷，给用户更好的办公体验。
                <br />
                产品功能如下： <br />
                行程事务
                <br />
                制定、查询当前所有的任务安排工作任务或行程的定点定时提醒详细了解工作任务信息
                <br />
                组织生活
                <br /> 了解支部组织生活开展动态
                <br /> 掌握支部实时信息
                <br />
                查询每个活动详细信息
                <br /> 数据统计
                <br /> 了解支部基本构成信息
                <br />
                了解支部活动执行情况 <br />
                查看各个支部的数据统计
                <br /> 党建问答
                <br />
                快速解决用户疑难
                <br />
                庞大的数据库提供各式各样的问答热门推荐帮助了解最新情况 <br />
                党建智库
                <br />
                快速查询各种党建文档
                <br /> 便捷了解各种报告书籍 <br />
                便利用户文章报告的写作
                <br />
                党员管理
                <br /> 快速联系支部成员
                <br /> 党员信息的快速查询
                <br /> 支持短信音频视频通话
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
        return item.rewardId === '1'
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
