import React, { CSSProperties } from 'react'
import commonFunc from '@/functions/common.func'
import { Box } from '@material-ui/core'
import { BoxProps } from '@material-ui/core/Box'

interface Props {
  //设计图文字大小像素
  viewSize: number
  //设计图尺寸像素
  initPixel?: number
  //是否对齐
  align?: boolean
}

const FontSizeBox: React.FunctionComponent<Props & BoxProps> = (props) => {
  const { children, align, viewSize, initPixel, ...config } = props
  const trueFontSize = commonFunc.toVW(viewSize, initPixel)
  const sizeNum = Number(commonFunc.toVW(viewSize, initPixel).replace('vw', ''))
  const scale = (sizeNum * window.innerWidth) / 100
  if (scale > 12) {
    return (
      <Box fontSize={trueFontSize} {...config}>
        {children}
      </Box>
    )
  } else {
    let fontStyle: CSSProperties = {
      transform: `scale(${scale / 12})`,
      transformOrigin: align ? 'left' : 'inherit'
    }
    let newConfig: BoxProps = Object.assign(config, {
      style: fontStyle
    })
    return (
      <Box fontSize={trueFontSize} {...newConfig}>
        {children}
      </Box>
    )
  }
}

export default FontSizeBox
