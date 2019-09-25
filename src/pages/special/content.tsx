import React from 'react'
import { Box } from '@material-ui/core'
import { getContentDetailItem } from '@/interface/api.res'
import { router } from 'umi'
import QueryString, { ParsedUrl } from 'query-string'
import cmsService from '@/service/cms.service'
import PageDefault from '@/components/page/page.default'
import FontSizeBox from '@/components/util/font.size'
import Loading from '@/components/page/loading.page'
import moment from 'moment'

interface State {
  content?: getContentDetailItem
}

export default class SpecialList extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props)
    let { contentId } = this.urlParams.query
    if (!contentId) {
      console.log('缺少参数-内容ID')
      router.goBack()
    }
    this.state = {}
  }
  urlParams: ParsedUrl = QueryString.parseUrl(location.href)
  render() {
    let { title } = this.urlParams.query
    return (
      <PageDefault
        elevation={4}
        config={{
          title:
            (title && title.toString()) ||
            (this.state.content && this.state.content.title) ||
            '抽奖迎国庆 集分兑大奖'
        }}
        appBar
        back
        close
        share
        barStyle={{ background: '#fff', color: '#666', position: 'relative' }}
      >
        <Box
          bgcolor="background.paper"
          height="100%"
          p={2}
          style={{
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {this.state.content ? (
            <React.Fragment>
              <FontSizeBox viewSize={50} fontWeight="bold">
                {this.state.content.title}
              </FontSizeBox>
              <FontSizeBox
                viewSize={26}
                display="flex"
                lineHeight={3}
                color="#999"
              >
                <Box mr={2}>
                  {moment(this.state.content.publishTime).format(
                    'YYYY-M-DD HH:mm'
                  )}
                </Box>
                <Box mr={2}>{this.state.content.clickCount}浏览</Box>
                <Box mr={2}>{this.state.content.likeCount}点赞</Box>
                <Box mr={2}>{this.state.content.commentCount}评论</Box>
              </FontSizeBox>
              <FontSizeBox
                id="contentBox"
                viewSize={36}
                lineHeight={1.5}
                dangerouslySetInnerHTML={{ __html: this.state.content.txt }}
              />
            </React.Fragment>
          ) : (
            <Loading />
          )}
        </Box>
      </PageDefault>
    )
  }
  componentDidMount() {
    let { contentId } = this.urlParams.query
    if (contentId) {
      cmsService
        .getContentDetail({ contentId: contentId.toString() })
        .then((res) => {
          if (res.status && res.list.length) {
            this.setState({
              content: res.list[0]
            })
          }
        })
    }
  }
}
