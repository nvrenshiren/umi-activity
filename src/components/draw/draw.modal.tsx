import ButtonRadius from '../util/button.radius'
import commonFunc from '@/functions/common.func'
import FontSizeBox from '../util/font.size'
import React from 'react'
import { Box, IconButton } from '@material-ui/core'
import { CancelOutlined } from '@material-ui/icons'
import { ModalContenProps } from '../util/modal.box'
import { prizeItem } from '@/interface/api.res'
import { router } from 'umi'

interface Props {
  item: prizeItem
  addressID?: number
}

export const DrawMatter: React.FunctionComponent<ModalContenProps & Props> = (
  props
) => {
  return (
    <Box id="DrawMatter" width={commonFunc.toVW(494)} position="relative">
      <img
        src={require('@/statics/image/draw/modal-matter.png')}
        width="100%"
      />
      <Box
        className="modal-box"
        position="absolute"
        top={commonFunc.toVW(67)}
        width="100%"
        left={0}
      >
        <Box textAlign="center">
          <img src={props.item.url} style={{ width: commonFunc.toVW(280) }} />
          <FontSizeBox
            px={commonFunc.toVW(20)}
            viewSize={28}
            lineHeight={1.5}
            mb={commonFunc.toVW(28)}
            color="#F3323A"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {props.item.prizeName}
          </FontSizeBox>
          <img
            src={require('@/statics/image/draw/modal-luck-matter.png')}
            style={{
              width: commonFunc.toVW(360),
              marginBottom: commonFunc.toVW(25)
            }}
          />
          <ButtonRadius
            fontSize={32}
            mx="auto"
            width={commonFunc.toVW(330)}
            height={80}
            bgcolor="#fff"
            color="#E03716"
            style={{
              boxShadow: 'rgb(255, 219, 187) 0px 0px 6px 3px'
            }}
            onClick={() => {
              router.push({
                pathname: '/convert/address',
                query: { id: props.addressID }
              })
            }}
          >
            填写收货地址
          </ButtonRadius>
          <IconButton
            style={{ marginTop: commonFunc.toVW(80), color: '#fff' }}
            onClick={() => {
              props.closeModal()
            }}
          >
            <CancelOutlined
              style={{ fontSize: commonFunc.toVW(60) }}
              color="inherit"
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
export const DrawPoints: React.FunctionComponent<ModalContenProps & Props> = (
  props
) => {
  return (
    <Box id="DrawPoints" width={commonFunc.toVW(494)} position="relative">
      <img
        src={require('@/statics/image/draw/modal-points.png')}
        width="100%"
      />
      <Box
        className="modal-box"
        position="absolute"
        top={commonFunc.toVW(80)}
        width="100%"
        left={0}
      >
        <Box textAlign="center">
          <img
            src={require('@/statics/image/draw/modal-luck-points.png')}
            style={{ width: commonFunc.toVW(360) }}
          />
          <FontSizeBox
            viewSize={40}
            lineHeight={3}
            color="#FDE7A9"
            textOverflow="ellipsis"
            overflow="hidden"
            mb={commonFunc.toVW(130)}
          >
            抽中{props.item.prizeCount}分数
          </FontSizeBox>
          <ButtonRadius
            onClick={() => {
              props.closeModal()
            }}
            fontSize={32}
            mx="auto"
            width={commonFunc.toVW(330)}
            height={80}
            bgcolor="rgb(246,65,65)"
            color="#FDE7A9"
            style={{
              boxShadow: 'rgb(243,131,134) 0px 0px 6px 3px'
            }}
          >
            收下奖品
          </ButtonRadius>
          <IconButton
            style={{ marginTop: commonFunc.toVW(80), color: '#fff' }}
            onClick={() => {
              props.closeModal()
            }}
          >
            <CancelOutlined
              style={{ fontSize: commonFunc.toVW(60) }}
              color="inherit"
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
export const DrawNone: React.FunctionComponent<ModalContenProps> = (props) => {
  return (
    <Box id="DrawNone" width={commonFunc.toVW(494)} position="relative">
      <Box
        height={commonFunc.toVW(570)}
        bgcolor="#fff"
        borderRadius={commonFunc.toVW(20)}
      />
      <Box
        className="modal-box"
        position="absolute"
        top={commonFunc.toVW(35)}
        width="100%"
        left={0}
      >
        <Box textAlign="center">
          <img
            src={require('@/statics/image/draw/modal-none-pic.png')}
            style={{ width: commonFunc.toVW(325) }}
          />
          <Box
            width={commonFunc.toVW(348)}
            mx="auto"
            mt={commonFunc.toVW(50)}
            mb={commonFunc.toVW(170)}
          >
            <img
              src={require('@/statics/image/draw/modal-none.png')}
              width="100%"
            />
          </Box>
          <IconButton
            style={{ color: '#fff' }}
            onClick={() => {
              props.closeModal()
            }}
          >
            <CancelOutlined
              style={{ fontSize: commonFunc.toVW(60) }}
              color="inherit"
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export const DrawNoNum: React.FunctionComponent<ModalContenProps & Props> = (
  props
) => {
  return (
    <Box id="DrawNoNum" width="100%" position="relative">
      <img src={require('@/statics/image/draw/error.png')} width="100%" />
      <Box
        className="modal-box"
        position="absolute"
        top={commonFunc.toVW(410)}
        width="100%"
        left={0}
      >
        <Box textAlign="center">
          <FontSizeBox
            width={commonFunc.toVW(350)}
            mx="auto"
            viewSize={28}
            color="#333"
            mb={commonFunc.toVW(55)}
          >
            很抱歉，今日抽奖机会已 经用完，请明天再来！
          </FontSizeBox>
          <ButtonRadius
            onClick={() => {
              props.closeModal()
            }}
            fontSize={32}
            mx="auto"
            width={commonFunc.toVW(400)}
            height={80}
            bgcolor="rgb(255,71,58)"
            color="rgb(253,229,168)"
            style={{
              boxShadow: 'rgb(251,176,176) 0px 0px 6px 3px'
            }}
          >
            确定
          </ButtonRadius>
          <IconButton
            style={{ marginTop: commonFunc.toVW(80), color: '#fff' }}
            onClick={() => {
              props.closeModal()
            }}
          >
            <CancelOutlined
              style={{ fontSize: commonFunc.toVW(60) }}
              color="inherit"
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
