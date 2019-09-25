import commonFunc from '@/functions/common.func'
import FireWorksUtil from './fireworks.util'
import FontSizeBox from '../util/font.size'
import React from 'react'
import { Box, ButtonBase } from '@material-ui/core'
import { FireworksSuccess, FireworksFail } from './fireworks.modal'
import modalBox from '../util/modal.box'
import ActivityAction from '@/functions/activity.action'

interface State {
  showFire: boolean
}
interface Props {
  ActivityAction: ActivityAction
}
export default class FireworksMain extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      showFire: false
    }
  }
  render() {
    return (
      <Box
        className="fireworks-main"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="center"
        overflow="auto"
      >
        <Box width={commonFunc.toVW(516)}>
          <ButtonBase
            onClick={() => {
              this.setState(
                {
                  showFire: true
                },
                () => {
                  setTimeout(() => {
                    this.props.ActivityAction.action()
                      .then((res) => {
                        if (res.status) {
                          modalBox.open({
                            content: FireworksSuccess,
                            params: {
                              point: res.result.prizeCount
                            }
                          })
                        } else {
                          let log = commonFunc.getItem('fireworks') || {}
                          let nowDate = new Date()
                          if (
                            !log[
                              `firework-${nowDate.getMonth() +
                                1}-${nowDate.getDate()}`
                            ]
                          ) {
                            modalBox.open({
                              content: FireworksFail,
                              params: {
                                type: 'firework'
                              }
                            })
                          }
                        }
                      })
                      .finally(() => {
                        this.setState({
                          showFire: false
                        })
                      })
                  }, 5000)
                }
              )
            }}
          >
            <img
              src={require('@/statics/image/fireworks/btn.png')}
              width="100%"
            />
          </ButtonBase>
        </Box>
        <FontSizeBox viewSize={24} mt={commonFunc.toVW(20)} color="#999">
          温馨提示: 放礼花, 送祝福, 即可获取分数, 兑大奖
        </FontSizeBox>
        {this.state.showFire && (
          <FireWorksUtil
            sound
            maxRocket={5}
            config={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              bgcolor: 'rgba(0,0,0,.3)',
              top: 0,
              left: 0,
              zIndex: 9999
            }}
          />
        )}
      </Box>
    )
  }
}
