import ButtonRadius from '../util/button.radius'
import commonFunc from '@/functions/common.func'
import FontSizeBox from '../util/font.size'
import React from 'react'
import { Box, IconButton } from '@material-ui/core'
import { CancelOutlined, CancelTwoTone, Cancel } from '@material-ui/icons'
import { ModalContenProps } from '../util/modal.box'
import { rewardItem } from '@/interface/api.res'
import convertService from '@/service/convert.service'
import { router } from 'umi'

interface ConvertProps extends ModalContenProps {
  rewardInfo: rewardItem
}
export const ConvertModal: React.FunctionComponent<ConvertProps> = (props) => {
  return (
    <Box
      id="ConvertModal"
      position="relative"
      width={commonFunc.toVW(500)}
      borderRadius={commonFunc.toVW(20)}
      // overflow="hidden"
      bgcolor="#fff"
      textAlign="center"
    >
      <img src={props.rewardInfo.url} width="100%" />
      <FontSizeBox
        width={commonFunc.toVW(385)}
        mt={commonFunc.toVW(35)}
        mb={commonFunc.toVW(65)}
        mx="auto"
        viewSize={26}
      >
        兑换将消耗您{props.rewardInfo.consumptionScore}分数，
        <br />
        是否确认兑换？
      </FontSizeBox>
      <ButtonRadius
        bgcolor="#FFAF00"
        color="#fff"
        height={64}
        width={commonFunc.toVW(350)}
        mx="auto"
        mb={commonFunc.toVW(66)}
        fontSize={26}
        onClick={() => {
          convertService
            .exchange({
              id: Number(props.rewardInfo.rewardId),
              rewardId: 5,
              themeId: Number(commonFunc.getItem('themeID'))
            })
            .then((res) => {
              router.push({
                pathname: '/convert/address',
                query: {
                  isExchange: true,
                  id: res.result
                }
              })
            })
        }}
      >
        确认兑换并填写收货地址
      </ButtonRadius>
      <Box color="#fff" position="absolute" top={-30} right={-30}>
        <IconButton
          color="inherit"
          onClick={() => {
            props.closeModal()
          }}
        >
          <Cancel fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  )
}
