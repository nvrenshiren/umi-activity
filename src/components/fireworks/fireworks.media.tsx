import React from 'react'
import { Box } from '@material-ui/core'
import VideoDanMu from '../video/video.danmu'

interface Props {
  imgUrl: string
  danmu?: boolean
  danmuApi?: () => Promise<any>
}

const FireWorksMedia: React.FunctionComponent<Props> = (props) => {
  return (
    <Box className="mediaBox" position="relative" bgcolor="#000">
      <img src={props.imgUrl} width="100%" style={{ height: '56.25vw' }} />
      <Box
        className="videoDanMu"
        position="absolute"
        zIndex={2}
        top={0}
        left={0}
        width="100%"
        height="100%"
        style={{
          visibility: props.danmu ? 'visible' : 'hidden'
        }}
      >
        <VideoDanMu danmu={props.danmu} danmuApi={props.danmuApi} />
      </Box>
    </Box>
  )
}
export default FireWorksMedia
