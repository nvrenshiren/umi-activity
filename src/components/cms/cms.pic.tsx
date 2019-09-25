import FontSizeBox from '../util/font.size'
import moment from 'moment'
import React from 'react'
import UtilImage from '../util/util.img'
import { Box } from '@material-ui/core'
import { SpecialContentItem } from '@/interface/api.res'
import 'moment/locale/zh-cn'

interface Props {
  item: SpecialContentItem
  //图片的长宽比
  scale?: number
  onClick: () => void
}
moment.locale('zh-cn')
const CmsPicItem: React.FunctionComponent<Props> = (props) => {
  let { item, scale, onClick } = props
  return (
    <Box
      width="100%"
      onClick={() => {
        onClick()
      }}
    >
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
        <UtilImage src={item.url} ratio={scale || 3 / 5} ani="Fade" />
      </Box>
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
  )
}
export default CmsPicItem
