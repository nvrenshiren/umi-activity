import commonFunc from '@/functions/common.func'
import FontSizeBox from '../util/font.size'
import React from 'react'
import { Box, IconButton } from '@material-ui/core'
import { Cancel, CheckCircle } from '@material-ui/icons'
import { ModalContenProps } from '../util/modal.box'
import { router } from 'umi'

interface SuccessProps extends ModalContenProps {
  point: number
}

export const FireworksSuccess: React.FunctionComponent<SuccessProps> = (
  props
) => {
  return (
    <Box width={commonFunc.toVW(590)} position="relative">
      <img src={require('@/statics/image/fireworks/ok-bg.png')} width="100%" />
      <Box
        position="absolute"
        width="100%"
        height="100%"
        top={0}
        left={0}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        textAlign="center"
      >
        <Box textAlign="right" width="100%" color="#ccc">
          <IconButton
            color="inherit"
            style={{ marginRight: -18, marginTop: -7 }}
            onClick={() => {
              props.closeModal()
            }}
          >
            <Cancel fontSize="large"></Cancel>
          </IconButton>
        </Box>
        <Box color="#fff">
          <FontSizeBox viewSize={40} lineHeight={2}>
            恭喜您
          </FontSizeBox>
          <FontSizeBox viewSize={26} lineHeight={2}>
            获得{props.point}积分
          </FontSizeBox>
        </Box>
        <Box
          width={commonFunc.toVW(488)}
          pb={commonFunc.toVW(32)}
          position="relative"
          onClick={() => {
            props.closeModal().then(() => {
              //dosomethings
            })
          }}
        >
          <Box position="absolute" top={commonFunc.toVW(28)} width="100%">
            <FontSizeBox viewSize={32} color="#391916">
              收下奖品
            </FontSizeBox>
          </Box>
          <img
            src={require('@/statics/image/fireworks/ok-btn.png')}
            width="100%"
          />
        </Box>
      </Box>
    </Box>
  )
}

interface FailProps {
  type: 'firework' | 'zhufu'
}

export const FireworksFail: React.FunctionComponent<
  FailProps & ModalContenProps
> = (props) => {
  let log = commonFunc.getItem('fireworks') || {}
  let nowDate = new Date()
  log[`${props.type}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`] = true
  commonFunc.setItem('fireworks', log)
  return (
    <Box width={commonFunc.toVW(590)} position="relative">
      <img src={require('@/statics/image/fireworks/err-bg.png')} width="100%" />
      <Box
        position="absolute"
        width="100%"
        height="100%"
        top={0}
        left={0}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        textAlign="center"
      >
        <Box textAlign="right" width="100%" color="#ccc">
          <IconButton
            color="inherit"
            style={{ marginRight: -18, marginTop: -7 }}
            onClick={() => {
              props.closeModal()
            }}
          >
            <Cancel fontSize="large"></Cancel>
          </IconButton>
        </Box>
        <Box color="#fff">
          <FontSizeBox viewSize={40} lineHeight={2}>
            恭喜您
          </FontSizeBox>
          <FontSizeBox viewSize={26} lineHeight={2}>
            今天放礼花的任务已完成
            <br />
            请明天再来吧~
          </FontSizeBox>
        </Box>
        <Box
          width={commonFunc.toVW(488)}
          pb={commonFunc.toVW(32)}
          position="relative"
          onClick={() => {
            props.closeModal().then(() => {
              router.push('/draw/home')
            })
          }}
        >
          <Box
            position="absolute"
            top={commonFunc.toVW(28)}
            width="100%"
            onClick={() => {
              router.push('/draw/home')
            }}
          >
            <FontSizeBox viewSize={32} color="#391916">
              去抽奖
            </FontSizeBox>
          </Box>
          <img
            src={require('@/statics/image/fireworks/err-btn.png')}
            width="100%"
          />
        </Box>
      </Box>
    </Box>
  )
}
