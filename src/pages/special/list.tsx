import cmsService from '@/service/cms.service'
import FontSizeBox from '@/components/util/font.size'
import Loading from '@/components/page/loading.page'
import PageDefault from '@/components/page/page.default'
import QueryString, { ParsedUrl } from 'query-string'
import React from 'react'
import SpecialTemplate from '@/components/special/list.template'
import { Box, List, Tab, Tabs, AppBar } from '@material-ui/core'
import { findSpecialByIdRes } from '@/interface/api.res'
import { router } from 'umi'
import commonFunc from '@/functions/common.func'

interface State {
  index: number
  specialData?: findSpecialByIdRes
}

export default class SpecialList extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props)
    let { id } = this.urlParams.query
    if (!id) {
      console.log('缺少参数-专栏ID')
      router.goBack()
    }
    this.state = {
      index: 0
    }
  }
  urlParams: ParsedUrl = QueryString.parseUrl(location.href)
  topList: number[] = []
  render() {
    let { title } = this.urlParams.query
    return (
      <PageDefault
        config={{
          title:
            (title && title.toString()) ||
            (this.state.specialData && this.state.specialData.title) ||
            '抽奖迎国庆 集分兑大奖'
        }}
        appBar
        back
        close
        share
        barStyle={{ background: '#fff', color: '#666' }}
      >
        <Box
          height="100%"
          className="pageBox"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          {this.state.specialData ? (
            <React.Fragment>
              <AppBar className="navList" position="relative" color="default">
                <Tabs
                  value={this.state.index}
                  onChange={(e, index) => {
                    this.setState(
                      {
                        index
                      },
                      () => {
                        this.getTop()
                        document
                          .getElementById('ListWrap')
                          .scrollTo(0, this.topList[this.state.index] + 1)
                      }
                    )
                  }}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="off"
                >
                  {this.state.specialData &&
                    this.state.specialData.infoTagContentVos.map((item) => {
                      return (
                        <Tab
                          label={item.specialTag.specialTag}
                          key={`nav-${item.specialTag.id}-${item.specialTag.specialId}`}
                        />
                      )
                    })}
                </Tabs>
              </AppBar>
              <Box
                className="contentList"
                display="flex"
                flexGrow={1}
                position="relative"
              >
                <Box
                  id="ListWrap"
                  position="absolute"
                  width="100%"
                  height="100%"
                  left={0}
                  top={0}
                  style={{
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch'
                  }}
                  onScroll={this.checkIndex.bind(this)}
                >
                  <List disablePadding>
                    {this.state.specialData.infoTagContentVos.map(
                      (sub, index, array) => (
                        <Box
                          bgcolor="background.paper"
                          key={`sub-${sub.specialTag.specialId}-${sub.specialTag.id}`}
                          mb={1}
                        >
                          <FontSizeBox
                            display="inline-block"
                            viewSize={28}
                            fontWeight="bold"
                            color="#000"
                            bgcolor="#fff"
                            px={2}
                            my={commonFunc.toVW(24)}
                            lineHeight={1.3}
                            style={{
                              boxShadow:
                                'inset 0 0 0 0 #000, inset 0 0 0 0 #000, inset 0 0 0 0 #000, inset 0px -8px 0px 0px #fce500'
                            }}
                          >
                            {`${index + 1}/${array.length} ${
                              sub.specialTag.specialTag
                            }`}
                          </FontSizeBox>
                          {sub.specialContents.map((item) => (
                            <SpecialTemplate
                              item={item}
                              key={`item-${item.channelId}-${item.contentId}`}
                            />
                          ))}
                        </Box>
                      )
                    )}
                  </List>
                </Box>
              </Box>
            </React.Fragment>
          ) : (
            <Loading />
          )}
        </Box>
      </PageDefault>
    )
  }
  getTop() {
    let Box = document.getElementById('ListWrap')
    let itemList: Element[] = [...Box.children[0].children]
    itemList.map((ele, index) => {
      this.topList[index] =
        ele.getBoundingClientRect().top -
        Box.getBoundingClientRect().top +
        Box.scrollTop
    })
  }
  checkIndex(e: React.UIEvent<HTMLElement>) {
    if (this.topList.length) {
      let index = this.topList.findIndex((value) => {
        return value > e.currentTarget.scrollTop
      })
      let setIndex = index > 0 ? index - 1 : this.topList.length - 1
      if (setIndex !== this.state.index) {
        this.setState({
          index: setIndex
        })
      }
    } else {
      this.getTop()
      this.checkIndex(e)
    }
  }
  componentDidMount() {
    let { id } = this.urlParams.query
    cmsService
      .findSpecialById({
        id: id.toString()
      })
      .then((res) => {
        if (res.status) {
          this.setState({
            specialData: res.result
          })
        }
      })
  }
}
