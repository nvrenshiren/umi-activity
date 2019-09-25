import FontSizeBox from '../util/font.size'
import moment from 'moment'
import React from 'react'
import UtilImage from '../util/util.img'
import { Box } from '@material-ui/core'
import { SpecialContentItem } from '@/interface/api.res'
import 'moment/locale/zh-cn'

interface Props {
  item: SpecialContentItem
  //图片位置
  direction?: 'left' | 'right'
  //图片的长宽比
  scale?: number
  onClick: () => void
}
moment.locale('zh-cn')
const CmsNewsItem: React.FunctionComponent<Props> = (props) => {
  let { item, direction, scale, onClick } = props
  return (
    <Box
      display="flex"
      flexDirection={direction === 'left' ? 'row-reverse' : 'row'}
      alignItems="stretch"
      width="100%"
      onClick={() => {
        onClick()
      }}
    >
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <FontSizeBox viewSize={28} color="#333" width="100%">
          {item.title}
        </FontSizeBox>
        <FontSizeBox
          viewSize={20}
          display="flex"
          lineHeight={1}
          justifyContent="space-around"
          color="#999"
        >
          <Box>{item.origin}</Box>
          <Box>{item.commentCount}评</Box>
          <Box>{moment().to(item.releaseDate)}</Box>
        </FontSizeBox>
      </Box>
      <Box width="40%" flexShrink={0}>
        <UtilImage src={item.url} ratio={scale || 3 / 5} ani="Fade" />
      </Box>
    </Box>
  )
}
export default CmsNewsItem
