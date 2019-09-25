import React from 'react'
import { SpecialContentItem } from '@/interface/api.res'
import { Box, ListItem } from '@material-ui/core'
import CmsNewsItem from '@/components/cms/cms.news'
import CmsPicItem from '@/components/cms/cms.pic'
import CmsVideoItem from '@/components/cms/cms.video'
import { router } from 'umi'

interface Props {
  item: SpecialContentItem
}

const SpecialTemplate: React.FunctionComponent<Props> = (props) => {
  let { item } = props
  switch (item.contentType) {
    case '1':
      return (
        <ListItem button divider>
          <CmsPicItem
            item={item}
            onClick={() => {
              router.push({
                pathname: '/special/content',
                query: {
                  contentId: item.contentId,
                  title: item.title
                }
              })
            }}
          />
        </ListItem>
      )

      break
    case '2':
      return (
        <ListItem button divider>
          <CmsNewsItem
            item={item}
            onClick={() => {
              router.push({
                pathname: '/special/content',
                query: {
                  contentId: item.contentId,
                  title: item.title
                }
              })
            }}
          />
        </ListItem>
      )

      break
    case 'mp4':
      return (
        <ListItem divider>
          <CmsVideoItem item={item} />
        </ListItem>
      )
      break
  }
}
export default SpecialTemplate
