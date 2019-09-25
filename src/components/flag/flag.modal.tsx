import commonFunc from '@/functions/common.func'
import shareAction from '@/functions/share.action'
import { Box, ButtonBase } from '@material-ui/core'
import React from 'react'
import { router } from 'umi'
import ButtonRadius from '../util/button.radius'
import FontSizeBox from '../util/font.size'
import { ModalContenProps } from '../util/modal.box'
interface FlagFailProps extends ModalContenProps {
  number: number
  onClose: () => void
}
export const FlagFail: React.FunctionComponent<FlagFailProps> = (props) => {
  return (
    <Box
      id="FlagFail"
      position="relative"
      width={commonFunc.toVW(500)}
      borderRadius={commonFunc.toVW(20)}
      overflow="hidden"
      bgcolor="#fff"
    >
      <img src={require('@/statics/image/flag/modal-bg.png')} width="100%" />
      <FontSizeBox
        width={commonFunc.toVW(385)}
        mt={commonFunc.toVW(35)}
        mb={commonFunc.toVW(65)}
        mx="auto"
        textAlign="center"
        viewSize={26}
      >
        升旗仪式未完成
        <br />
        继续升旗{props.number}次，即可完成升旗仪式，并获取大量额外分数兑大奖
        <br />
        继续加油哦
        <br />
      </FontSizeBox>
      <ButtonRadius
        onClick={() => {
          props.closeModal().then(() => {
            props.onClose && props.onClose()
          })
        }}
        fontSize={26}
        mx="auto"
        mb={commonFunc.toVW(66)}
        width={commonFunc.toVW(270)}
        height={64}
        bgcolor="#FFAF00"
        color="#fff"
      >
        继续升旗
      </ButtonRadius>
    </Box>
  )
}

interface FlagSuccessProps extends ModalContenProps {
  point: number
}
export const FlagSuccess: React.FunctionComponent<FlagSuccessProps> = (
  props
) => {
  return (
    <Box
      id="FlagSuccess"
      position="relative"
      width={commonFunc.toVW(500)}
      borderRadius={commonFunc.toVW(20)}
      overflow="hidden"
      bgcolor="#fff"
    >
      <img src={require('@/statics/image/flag/modal-bg.png')} width="100%" />
      <FontSizeBox
        width={commonFunc.toVW(385)}
        mt={commonFunc.toVW(35)}
        mb={commonFunc.toVW(65)}
        mx="auto"
        textAlign="center"
        viewSize={26}
      >
        恭喜您!
        <br />
        今天已经成功完成升旗仪式，奖励额外分数{props.point}分<br />
        明天可以继续哦
        <br />
      </FontSizeBox>
      <ButtonRadius
        onClick={() => {
          props.closeModal().then(() => {
            router.push('/draw/home')
          })
        }}
        fontSize={26}
        mx="auto"
        mb={commonFunc.toVW(66)}
        width={commonFunc.toVW(270)}
        height={64}
        bgcolor="#FFAF00"
        color="#fff"
      >
        去抽奖
      </ButtonRadius>
    </Box>
  )
}

export const FlagShare: React.FunctionComponent<ModalContenProps> = (props) => {
  let { closeModal } = props
  return (
    <Box
      id="FlagShare"
      position="relative"
      width={commonFunc.toVW(500)}
      borderRadius={commonFunc.toVW(20)}
      overflow="hidden"
      bgcolor="#fff"
    >
      <img src={require('@/statics/image/flag/modal-bg.png')} width="100%" />
      <FontSizeBox
        width={commonFunc.toVW(400)}
        mt={commonFunc.toVW(35)}
        mb={commonFunc.toVW(65)}
        mx="auto"
        textAlign="center"
        viewSize={26}
      >
        分享5次即可升旗成功，每次分享均可获得随机分数，升旗成功还可额外获得大量分数
        <br />
        快去分享吧
        <br />
      </FontSizeBox>
      <Box
        width={commonFunc.toVW(400)}
        borderTop="1px solid #999"
        mx="auto"
        py={commonFunc.toVW(30)}
        display="flex"
        justifyContent="space-around"
      >
        <Box textAlign="center">
          <ButtonBase
            onClick={() => {
              closeModal().then(() => {
                shareAction.shareDo('app')
              })
            }}
            style={{
              borderRadius: '50%',
              display: 'block',
              width: commonFunc.toVW(67),
              margin: '0 auto'
            }}
          >
            <img src={require('@/statics/image/wx.png')} width="100%" />
          </ButtonBase>
          <FontSizeBox
            viewSize={20}
            color="#333"
            textAlign="center"
            lineHeight={2}
          >
            微信
          </FontSizeBox>
        </Box>
        <Box textAlign="center">
          <ButtonBase
            onClick={() => {
              closeModal().then(() => {
                shareAction.shareDo('time')
              })
            }}
            style={{
              borderRadius: '50%',
              display: 'block',
              width: commonFunc.toVW(67),
              margin: '0 auto'
            }}
          >
            <img
              src={require('@/statics/image/pengyouquan.png')}
              width="100%"
            />
          </ButtonBase>
          <FontSizeBox
            viewSize={20}
            color="#333"
            textAlign="center"
            lineHeight={2}
          >
            朋友圈
          </FontSizeBox>
        </Box>
        <Box textAlign="center" hidden={commonFunc.checkUA.wechat}>
          <ButtonBase
            onClick={() => {
              closeModal().then(() => {
                shareAction.shareDo()
              })
            }}
            style={{
              borderRadius: '50%',
              display: 'block',
              width: commonFunc.toVW(67),
              margin: '0 auto'
            }}
          >
            <img src={require('@/statics/image/haoyou.png')} width="100%" />
          </ButtonBase>
          <FontSizeBox
            viewSize={20}
            color="#333"
            textAlign="center"
            lineHeight={2}
          >
            好友
          </FontSizeBox>
        </Box>
        <Box textAlign="center" hidden={commonFunc.checkUA.wechat}>
          <ButtonBase
            onClick={() => {
              closeModal().then(() => {
                shareAction.shareDo()
              })
            }}
            style={{
              borderRadius: '50%',
              display: 'block',
              width: commonFunc.toVW(67),
              margin: '0 auto'
            }}
          >
            <img src={require('@/statics/image/hongtudi.png')} width="100%" />
          </ButtonBase>
          <FontSizeBox
            viewSize={20}
            color="#333"
            textAlign="center"
            lineHeight={2}
          >
            红土地
          </FontSizeBox>
        </Box>
      </Box>
    </Box>
  )
}
