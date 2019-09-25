import commonFunc from '@/functions/common.func'
import FontSizeBox from './font.size'
import React from 'react'
import { Box } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import { ModalContenProps } from './modal.box'

interface Props {
  message: React.ReactNode
  icon?: React.ReactNode
  delay?: number
  onClose?: Function
}

export const UtilToast: React.FunctionComponent<ModalContenProps & Props> = (
  props
) => {
  setTimeout(() => {
    props.closeModal().then(() => {
      props.onClose && props.onClose()
    })
  }, props.delay || 3000)
  return (
    <Box
      width={commonFunc.toVW(400)}
      position="relative"
      bgcolor="text.secondary"
      p={commonFunc.toVW(55)}
      color="#fff"
      display="flex"
      flexDirection="column"
      justifyContent="speac-between"
      alignItems="center"
    >
      <Box mb={commonFunc.toVW(30)}>
        {props.icon || (
          <CheckCircle color="inherit" fontSize="large"></CheckCircle>
        )}
      </Box>
      <FontSizeBox viewSize={40}>{props.message}</FontSizeBox>
    </Box>
  )
}
