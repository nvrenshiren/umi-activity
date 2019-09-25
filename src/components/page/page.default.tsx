import commonFunc from '@/functions/common.func'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  withTheme,
  WithTheme
} from '@material-ui/core'
import { BoxProps } from '@material-ui/core/Box'
import {
  ArrowBackIosOutlined,
  CloseOutlined,
  LaunchOutlined
} from '@material-ui/icons'
import React from 'react'
import Helmet, { HelmetProps } from 'react-helmet'
import { router } from 'umi'
import shareAction from '@/functions/share.action'

interface Props {
  elevation?: number
  barStyle?: React.CSSProperties
  appBar?: boolean
  close?: boolean
  back?: boolean
  share?: boolean
  noBg?: boolean
  style?: React.CSSProperties
  config?: HelmetProps
}

const PageDefaultBox: React.FunctionComponent<Props & BoxProps & WithTheme> = (
  props
) => {
  let { children, config, style, barStyle, elevation, ...other } = props
  style = style || {}
  barStyle = barStyle || {}
  return (
    <React.Fragment>
      <Helmet {...config} />
      <Box className="full" display="flex" flexDirection="column" style={style}>
        <Box hidden={!other.appBar || commonFunc.checkUA.wechat}>
          <AppBar
            elevation={elevation || 0}
            style={{
              position: barStyle.position || 'static',
              paddingTop: window.devicePixelRatio * 11,
              backgroundColor:
                !!other.noBg ||
                !!style.background ||
                !!style.backgroundImage ||
                !!barStyle.background ||
                !!barStyle.backgroundImage
                  ? 'transparent'
                  : other.theme.palette.type === 'dark'
                  ? other.theme.palette.background.paper
                  : other.theme.palette.primary.main,
              ...barStyle
            }}
          >
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                color="inherit"
                style={{ visibility: other.back ? 'visible' : 'hidden' }}
                onClick={() => {
                  if (['/app/70th/', '/app/70th'].includes(location.pathname)) {
                    window.JXRSApi.view.close()
                  } else {
                    router.goBack()
                  }
                }}
              >
                <ArrowBackIosOutlined />
              </IconButton>
              <IconButton
                edge="start"
                color="inherit"
                style={{ visibility: other.close ? 'visible' : 'hidden' }}
                onClick={() => {
                  window.JXRSApi.view.close()
                }}
              >
                <CloseOutlined />
              </IconButton>
              <Typography
                variant="subtitle1"
                style={{
                  flexGrow: 1,
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {config.title}
              </Typography>
              <IconButton edge="end" style={{ visibility: 'hidden' }}>
                <LaunchOutlined />
              </IconButton>
              <IconButton
                edge="end"
                color="inherit"
                style={{ visibility: other.share ? 'visible' : 'hidden' }}
                onClick={() => {
                  shareAction.shareDo()
                }}
              >
                <LaunchOutlined />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
        <Box flexGrow={1} display="flex" position="relative">
          <Box
            height="100%"
            width="100%"
            position="absolute"
            top={0}
            left={0}
            overflow="hidden"
          >
            {children}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}
const PageDefault = withTheme(PageDefaultBox)
export default PageDefault
