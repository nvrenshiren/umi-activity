import commonFunc from '@/functions/common.func'
import FontSizeBox from '@/components/util/font.size'
import PageDefault from '@/components/page/page.default'
import React from 'react'
import { Box } from '@material-ui/core'

export default class DrawExplain extends React.PureComponent {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <PageDefault
        config={{ title: '幸运大抽奖规则' }}
        appBar
        back
        barStyle={{ background: '#fff', color: '#666' }}
      >
        <Box
          height="100%"
          px={commonFunc.toVW(30)}
          py={commonFunc.toVW(40)}
          lineHeight={2}
          overflow="auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <FontSizeBox viewSize={28} mb={2}>
            1.活动时间：2019年9月23日00:00-10月8日19:00。
            <br />
            2.活动期间每日用户有3次的免费抽奖机会，次日重置免费抽奖次数，奖品包含价值数千元实物奖励及分数，抽中实物奖励需要填写个人收货信息。
            <br />
            3.获取的分数可通过我的集分页面兑换价值数千元的实物奖品，奖品多多，快来参与吧。
            <br />
            4.抽奖实物奖品的邮寄费用由智慧党建官方承担，但凡任何联系自称是智慧党建的客服人员，涉及到金钱的索取请不要相信，谨防骗子。
            <br />
          </FontSizeBox>
          <FontSizeBox viewSize={28}>
            <br />
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
            6.如有疑问请联系客服电话：
            <br />
            0791-88115322。
          </FontSizeBox>
        </Box>
      </PageDefault>
    )
  }
}
