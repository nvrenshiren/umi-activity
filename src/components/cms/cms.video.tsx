import FontSizeBox from '../util/font.size'
import moment from 'moment'
import React from 'react'
import UtilImage from '../util/util.img'
import { Box } from '@material-ui/core'
import { SpecialContentItem } from '@/interface/api.res'
import 'moment/locale/zh-cn'
import VideoH5 from '../video/video.h5'

interface Props {
  item: SpecialContentItem
  //图片的长宽比
  scale?: number
}
moment.locale('zh-cn')
const CmsVideoItem: React.FunctionComponent<Props> = (props) => {
  let { item, scale } = props
  return (
    <Box width="100%">
      <FontSizeBox
        viewSize={28}
        color="#333"
        width="100%"
        lineHeight={1.5}
        fontWeight={500}
      >
        {item.title}
      </FontSizeBox>
      <Box py={1}>
        <VideoH5 video={item.mediaPath} pic={item.url} noh5 />
      </Box>
      <FontSizeBox
        viewSize={20}
        display="flex"
        lineHeight={1}
        justifyContent="space-around"
        color="#999"
      >
        <Box>{item.origin}</Box>
        <Box>{moment().to(item.releaseDate)}</Box>
      </FontSizeBox>
    </Box>
  )
}
export default CmsVideoItem
