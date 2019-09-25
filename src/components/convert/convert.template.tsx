import React from 'react'
import { rewardItem, listPrizeItem } from '@/interface/api.res'
import FontSizeBox from '../util/font.size'
import commonFunc from '@/functions/common.func'
import { Box, ButtonBase } from '@material-ui/core'
import QueryString, { ParsedUrl } from 'query-string'
import { router } from 'umi'
import modalBox from '../util/modal.box'
import { ConvertModal } from './convert.modal'
interface Props {
  title: string
  content: React.ReactNode
  point: number
  rewardInfo: rewardItem
}
const ConvertTemplate: React.FunctionComponent<Props> = (props) => {
  let { title, content, point, rewardInfo } = props
  let urlParams: ParsedUrl = QueryString.parseUrl(location.href)
  /**
   * 前置脚本
   */
  return (
    <React.Fragment>
      <img src={rewardInfo && rewardInfo.url} width="100%" />
      <FontSizeBox
        viewSize={30}
        lineHeight={3}
        px={commonFunc.toVW(35)}
        mb={commonFunc.toVW(20)}
        bgcolor="#fff"
      >
        {title}
      </FontSizeBox>
      <Box p={commonFunc.toVW(35)} bgcolor="#fff" pb={commonFunc.toVW(120)}>
        <FontSizeBox
          viewSize={28}
          fontWeight="bold"
          color="#333"
          mb={commonFunc.toVW(20)}
        >
          活动规则：
        </FontSizeBox>
        <FontSizeBox viewSize={24} color="#333" mb={commonFunc.toVW(20)}>
          <ol style={{ paddingLeft: commonFunc.toVW(35) }}>
            <li>
              奖品数量有限，先到先得，同一用户只能兑换一次相同奖品，不可重复兑换，集分只在活动期间内（2019年9月23日00:00-10月11日19:00）有效，活动后分数失效。
            </li>
            <li>
              奖品需填写用户收货信息，奖品将在活动结束后统一发放，由于用户自身填写信息错误或缺漏导致奖品无法发放或发放错误的，由用户自身承担责任，可及时联系客服人员进行处理。
            </li>
            <li>
              奖品的邮寄费用由智慧党建官方承担，但凡任何联系自称是智慧党建的客服人员，涉及到金钱的索取请不要相信，谨防骗子。
            </li>
          </ol>
        </FontSizeBox>
        <FontSizeBox
          viewSize={28}
          fontWeight="bold"
          color="#333"
          mb={commonFunc.toVW(20)}
        >
          详情说明：
        </FontSizeBox>
        <FontSizeBox viewSize={24} color="#333" mb={commonFunc.toVW(20)}>
          {content}
        </FontSizeBox>
        <FontSizeBox
          viewSize={28}
          fontWeight="bold"
          color="#333"
          mb={commonFunc.toVW(20)}
        >
          重要声明：
        </FontSizeBox>
        <FontSizeBox viewSize={24} color="#333" mb={commonFunc.toVW(20)}>
          <ol style={{ paddingLeft: commonFunc.toVW(35) }}>
            <li>
              若用户涉嫌采用作弊等行为获得奖励或其余不正当行为的，主办方保留取消、收回奖励和追责的权利。
            </li>
            <li>本次活动的最终解释权归江西国泰利民信息科技公司所有。</li>
            <li>如有疑问请联系客服电话：0791-88115322。</li>
          </ol>
        </FontSizeBox>
      </Box>
      {!!urlParams.query.isExchange ? (
        <ButtonBase
          style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            display: 'block',
            background: '#FF2951',
            color: '#fff'
          }}
          onClick={() => {
            router.push({
              pathname: '/convert/address',
              query: urlParams.query
            })
          }}
        >
          <FontSizeBox viewSize={36} lineHeight={commonFunc.toVW(100)}>
            {!!urlParams.query.address ? '修改' : '填写'}收货地址
          </FontSizeBox>
        </ButtonBase>
      ) : (
        <ButtonBase
          onClick={() => {
            if (!!rewardInfo && rewardInfo.consumptionScore < point) {
              modalBox.open({
                content: ConvertModal,
                params: {
                  rewardInfo
                }
              })
            }
          }}
          style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            display: 'block',
            background:
              !!rewardInfo && rewardInfo.consumptionScore > point
                ? '#E6E6E6'
                : '#FF2951',
            color:
              !!rewardInfo && rewardInfo.consumptionScore > point
                ? '#666'
                : '#fff'
          }}
        >
          <FontSizeBox viewSize={36} lineHeight={commonFunc.toVW(100)}>
            {!!rewardInfo && rewardInfo.consumptionScore > point
              ? '当前分数不足以兑换'
              : '去兑换'}
          </FontSizeBox>
        </ButtonBase>
      )}
    </React.Fragment>
  )
}
export default ConvertTemplate
