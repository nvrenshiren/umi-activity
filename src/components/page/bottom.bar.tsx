import _ from 'lodash'
import ActivityAction from '@/functions/activity.action'
import ButtonRadius from '../util/button.radius'
import commonFunc from '@/functions/common.func'
import FontSizeBox from '../util/font.size'
import modalBox, { ModalContenProps } from '../util/modal.box'
import React from 'react'
import { AppBar, Box, ButtonBase, IconButton } from '@material-ui/core'
import { getOperateActivityBlessingsListRes } from '@/interface/api.res'
import { Replay } from '@material-ui/icons'

interface Props {
  ActivityAction: ActivityAction
  onPost: Function
  bg?: string
  fontColor?: string
  inputBg?: string
}
interface State {
  BlessingsList: getOperateActivityBlessingsListRes[]
  input: string
}

export default class BottomBar extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      BlessingsList: [],
      input: ''
    }
  }
  render() {
    return (
      <AppBar color="primary" position="static">
        <Box display="flex" height="100%">
          <Box
            flexGrow={1}
            px={commonFunc.toVW(30)}
            bgcolor={this.props.bg || 'background.paper'}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              mr={commonFunc.toVW(30)}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              color={this.props.fontColor || '#999'}
            >
              <IconButton
                size="small"
                color="inherit"
                onClick={() => {
                  let index = _.random(this.state.BlessingsList.length - 1)
                  this.setState({
                    input: this.state.BlessingsList[index].blessing
                  })
                }}
              >
                <Replay></Replay>
              </IconButton>
              <FontSizeBox viewSize={20} lineHeight={1} color="inherit">
                换一下
              </FontSizeBox>
            </Box>
            <Box
              flexGrow={1}
              display="flex"
              position="relative"
              height={commonFunc.toVW(64)}
              onClick={() => {
                modalBox.open({
                  content: InputModal,
                  params: {
                    onPost: (text) => {
                      this.props.onPost(text, 0)
                    }
                  }
                })
              }}
            >
              <FontSizeBox
                position="absolute"
                width="100%"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                viewSize={26}
                color="#666"
                bgcolor={this.props.inputBg || 'action.hover'}
                lineHeight={commonFunc.toVW(64)}
                pl={commonFunc.toVW(20)}
              >
                {this.state.input}
              </FontSizeBox>
            </Box>
          </Box>
          <Box width={commonFunc.toVW(150)} height="100%">
            <ButtonBase
              style={{ width: '100%' }}
              onClick={() => {
                this.props.onPost(this.state.input)
              }}
            >
              <FontSizeBox viewSize={28} lineHeight={commonFunc.toVW(98)}>
                送祝福
              </FontSizeBox>
            </ButtonBase>
          </Box>
        </Box>
      </AppBar>
    )
  }
  componentDidMount() {
    this.props.ActivityAction.blessList().then((res) => {
      this.setState({
        BlessingsList: res.result,
        input: res.result[0].blessing
      })
    })
  }
}

interface inputProps {
  onPost: (input: string) => void
}

const InputModal: React.FunctionComponent<inputProps & ModalContenProps> = (
  props
) => {
  let inputEle: HTMLTextAreaElement
  return (
    <Box width={commonFunc.toVW(595)} position="relative">
      <img src={require('@/statics/image/input-bg.png')} width="100%" />
      <Box position="absolute" left={0} top={0} width="100%">
        <Box
          mt={commonFunc.toVW(140)}
          mb={commonFunc.toVW(80)}
          mx="auto"
          width={commonFunc.toVW(370)}
        >
          <textarea
            ref={(node) => {
              inputEle = node
            }}
            placeholder="请输入祝福语"
            style={{
              resize: 'none',
              border: 0,
              padding: '5px 10px',
              width: '100%',
              height: commonFunc.toVW(250),
              background: 'rgba(245,245,245,1)',
              color: '#999',
              fontSize: commonFunc.toVW(30)
            }}
          />
        </Box>
        <ButtonRadius
          mx="auto"
          height={90}
          width={commonFunc.toVW(450)}
          bgcolor="rgb(255,210,0)"
          color="rgb(234,58,13)"
          fontSize={40}
          onClick={() => {
            if (inputEle.value.length > 0) {
              props.onPost && props.onPost(inputEle.value)
            }
            props.closeModal()
          }}
        >
          发送
        </ButtonRadius>
        <FontSizeBox
          viewSize={32}
          color="#fff"
          textAlign="center"
          lineHeight={3}
          onClick={() => {
            props.closeModal()
          }}
        >
          取消
        </FontSizeBox>
      </Box>
    </Box>
  )
}
