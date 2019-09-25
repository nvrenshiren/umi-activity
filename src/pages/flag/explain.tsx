import commonFunc from '@/functions/common.func'
import FontSizeBox from '@/components/util/font.size'
import PageDefault from '@/components/page/page.default'
import React from 'react'
import { Box } from '@material-ui/core'

export default class FlagExplain extends React.PureComponent {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <PageDefault
        config={{ title: '升旗手规则' }}
        appBar
        back
        share
        barStyle={{ background: '#fff', color: '#666' }}
      >
        <Box
          height="100%"
          p={commonFunc.toVW(30)}
          style={{
            background: `url('${require('@/statics/image/flag/bg.png')}') no-repeat top center #FAEAE4`,
            backgroundSize: '100%'
          }}
        >
          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            borderRadius={commonFunc.toVW(30)}
            bgcolor="rgba(255,255,255,0.7)"
          >
            <FontSizeBox
              fontWeight="bold"
              viewSize={42}
              borderBottom="2px solid #0071B2"
              textAlign="center"
              mx={commonFunc.toVW(70)}
              p={commonFunc.toVW(30)}
            >
              升旗手规则
            </FontSizeBox>

            <Box
              flexGrow={1}
              mt={commonFunc.toVW(40)}
              mb={commonFunc.toVW(75)}
              style={{ overflowY: 'auto' }}
              px={commonFunc.toVW(75)}
              lineHeight={commonFunc.toVW(50)}
            >
              <FontSizeBox viewSize={28} mb={2}>
                1.活动时间： 2019年9月23日00:00-10月8日19:00
                <br />
                2.每日用户首次放礼花及送弹幕祝福均可获取随机分数；非首次放礼花或送祝福无分数奖励，参与活动次数不限。
                <br />
                3.获取的分数可通过我的集分页面兑换价值数千元的实物奖品，奖品多多，快来参与吧。
              </FontSizeBox>
              <FontSizeBox viewSize={28}>
                1.活动时间：2019年9月26日00:00-10月8日19:00。
                <br />
                2.活动期间每日用户均可参与一次升旗活动，次日重置该活动可继续参与。
                <br />
                3.升旗手活动需分享5次才能升旗成功，每次分享均可随机获取一定数量的分数，国旗会动态上升1/5，升旗成功还有额外分数奖励。
                <br />
                4.获取的分数可通过我的集分页面兑换价值数千元的实物奖品，奖品多多，快来参与吧。
              </FontSizeBox>
            </Box>
          </Box>
        </Box>
      </PageDefault>
    )
  }
}
