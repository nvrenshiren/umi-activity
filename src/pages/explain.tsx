import React from 'react'
import PageDefault from '@/components/page/page.default'
import { Box } from '@material-ui/core'
import commonFunc from '@/functions/common.func'
import FontSizeBox from '@/components/util/font.size'

export default class IndexExplain extends React.PureComponent {
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
              活动攻略
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
                【集分兑大奖】
                <br />
                1.活动时间： 2019年9月23日00:00-10月8日19:00。
                <br />
                2.此活动为主活动，通过参与放礼花送祝福、人人都是升旗手、阅兵直播活动、抽奖活动获取分数，集齐一定数量的分数后可以去兑换价值数千元的实物大奖。
                <br />
                3.集分兑奖奖品数量有限，先到先得，同一用户只能兑换一次相同奖品，不可重复兑换，集分只在活动期间内有效，活动后分数失效。
                <br />
                4.集分兑奖需填写用户收货信息，奖品将在活动结束后统一发放，由于用户自身填写信息错误或缺漏导致奖品无法发放或发放错误的，由用户自身承担责任，可及时联系客服人员进行处理。
                <br />
                5.集分兑奖奖品的邮寄费用由智慧党建官方承担，但凡任何联系自称是智慧党建的客服人员，涉及到金钱的索取请不要相信，谨防骗子。
              </FontSizeBox>
              <FontSizeBox viewSize={28} mb={2}>
                【放礼花送祝福】
                <br />
                1.活动时间：2019年9月23日00:00-10月8日19:00。
                <br />
                2.每日用户首次放礼花及送弹幕祝福均可获取随机分数；非首次放礼花或送祝福无分数奖励，参与活动次数不限。
              </FontSizeBox>
              <FontSizeBox viewSize={28} mb={2}>
                【人人都是升旗手】
                <br />
                1.活动时间：2019年9月26日00:00-10月8日19:00。
                <br />
                2.活动期间每日用户均可参与一次升旗活动，次日重置该活动可继续参与。
                <br />
                3.升旗手活动需分享5次才能升旗成功，每次分享均可随机获取一定数量的分数，且国旗会动态上升1/5，升旗成功还有额外分数奖励。
              </FontSizeBox>
              <FontSizeBox viewSize={28} mb={2}>
                【阅兵直播】
                <br />
                1.活动时间：2019年10月1日00:00-10月8日19:00。
                <br />
                2.活动期间每日用户首次送祝福可获取随机分数，参与送祝福次数不限，每日非首次送祝福无分数奖励。
              </FontSizeBox>
              <FontSizeBox viewSize={28} mb={2}>
                【幸运大抽奖】
                <br />
                1.活动时间：2019年9月23日00:00-10月8日19:00。
                <br />
                2.活动期间每日用户有3次的免费抽奖机会，次日重置免费抽奖次数，奖品包含价值数千元的实物奖励及分数，抽中实物奖励需要填写个人收货信息。
                <br />
                3.抽奖实物奖品的邮寄费用由智慧党建官方承担，但凡任何联系自称是智慧党建的客服人员，涉及到金钱的索取请不要相信，谨防骗子。
              </FontSizeBox>
              <FontSizeBox viewSize={28} mb={2}>
                其他：
                <br />
                1.用户可以通过微信端或智慧党建APP参与所有活动并获取奖品，微信端及APP端获得的分数独立区分，用户全程参与各活动，获取的分数均可兑换所有实物奖品
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
          </Box>
        </Box>
      </PageDefault>
    )
  }
}
