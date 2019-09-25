import React from 'react'
import Box, { BoxProps } from '@material-ui/core/Box'
import { ButtonBase } from '@material-ui/core'
import commonFunc from '@/functions/common.func'
import FontSizeBox from './font.size'

const ButtonRadius: React.FunctionComponent<BoxProps> = (props) => {
  /**
   * 前置脚本
   */
  let { children, ...config } = props
  return (
    <Box
      className="ButtonRadius"
      {...config}
      overflow="hidden"
      height={commonFunc.toVW(config.height)}
      borderRadius={config.borderRadius || commonFunc.toVW(config.height / 2)}
    >
      <ButtonBase style={{ display: 'block', color: 'inherit', width: '100%' }}>
        <FontSizeBox
          lineHeight={commonFunc.toVW(config.height)}
          viewSize={config.fontSize}
        >
          {children}
        </FontSizeBox>
      </ButtonBase>
    </Box>
  )
}
export default ButtonRadius
