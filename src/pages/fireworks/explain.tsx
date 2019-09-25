import commonFunc from '@/functions/common.func'
import FontSizeBox from '@/components/util/font.size'
import PageDefault from '@/components/page/page.default'
import React from 'react'
import { Box } from '@material-ui/core'

export default class FireWorksExplain extends React.PureComponent {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <PageDefault config={{ title: '活动攻略' }} appBar back>
        <Box
          height="100%"
          p={commonFunc.toVW(30)}
          style={{
            background: `url('${require('@/statics/image/explain/bg.png')}') no-repeat bottom center #0097EE`,
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
              放礼花活动说明
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
                1.用户可以通过微信端或智慧党建APP参与所有活动并获取奖品，微信端及APP端获得的分数独立区分，用户全程参与各活动，获取的分数均可兑换所有实物奖品。
                <br />
                2.用户上传的评论、文字、图片不得包含反动、色情、暴力、赌博、酗酒等国家法律不允许传播的内容，如参与讨论的文字、图片出现上述情况，主办方有权随时删除该等信息和图像。
                <br />
                3.智慧党建可根据活动的实际举办情况对活动规则进行变更或调整(如有)，相关变动或调整将公布在活动页面上或以合适的方式及时通知。
                <br />
                4.若用户涉嫌采用作弊等行为获得奖励或其余不正当行为的，主办方保留取消、收回奖励和追责的权利。
                <br />
                5.本次活动的最终解释权归江西国泰利民信息科技公司所有。
                <br />
                6.如有疑问请联系客服电话：0791-88115322。
              </FontSizeBox>
            </Box>
          </Box>
        </Box>
      </PageDefault>
    )
  }
}
