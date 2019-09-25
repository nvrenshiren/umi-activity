import * as React from 'react'
import {
  Fade,
  IconButton,
  withStyles,
  Slider,
  Box,
  CircularProgress
} from '@material-ui/core'
import {
  Fullscreen,
  PauseCircleFilled,
  PlayCircleFilled,
  VolumeOff,
  VolumeUp
} from '@material-ui/icons'
import pageEvent from '@/functions/page.event'
import commonFunc from '@/functions/common.func'

interface Props {
  videoEle: HTMLVideoElement
  full?: boolean
}

interface State {
  loading: boolean
  totalTime: number
  currentTime: any
  show: boolean
  play: boolean
  volume: number
}

const WhiteSlider = withStyles({
  root: { color: '#fff' },
  thumb: {
    backgroundColor: 'currentColor',
    '&:focus,&:hover': {
      boxShadow: '0px 0px 0px 14px rgba(255,255,255, 0.16)'
    },
    '&.MuiSlider-activated': {
      boxShadow: '0px 0px 0px 14px rgba(255,255,255, 0.16)'
    }
  },
  track: {
    backgroundColor: 'currentColor'
  }
})(Slider)

class VideoControls extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      loading: false,
      totalTime: 9999,
      currentTime: 0,
      show: true,
      play: false,
      volume: 1
    }
  }
  showTime: NodeJS.Timeout
  isFullScreen: boolean = false
  render() {
    return (
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        color="#fff"
        height="100%"
      >
        <Box
          flexGrow={1}
          width="100%"
          onClick={() => {
            this.setState(
              {
                show: !this.state.show
              },
              () => {
                clearTimeout(this.showTime)
                if (this.state.show) {
                  this.showTime = setTimeout(() => {
                    this.setState({
                      show: false
                    })
                  }, 3000)
                }
              }
            )
          }}
        />
        <Box
          width="100%"
          overflow="hidden"
          onTouchStart={() => {
            clearTimeout(this.showTime)
          }}
          onTouchEnd={() => {
            if (this.state.show) {
              this.showTime = setTimeout(() => {
                this.setState({
                  show: false
                })
              }, 3000)
            }
          }}
        >
          <Fade in={this.state.show}>
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              style={{
                background: 'linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.8))'
              }}
            >
              <Box>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    !this.state.loading && this.state.play
                      ? this.props.videoEle.pause()
                      : this.props.videoEle.play()
                  }}
                >
                  {!this.state.loading ? (
                    this.state.play ? (
                      <PauseCircleFilled />
                    ) : (
                      <PlayCircleFilled />
                    )
                  ) : (
                    <CircularProgress color="inherit" size={24} />
                  )}
                </IconButton>
              </Box>
              <Box
                flexGrow={1}
                fontSize={0}
                mx={1}
                style={{
                  touchAction: 'none'
                }}
              >
                <WhiteSlider
                  aria-labelledby="input-slider"
                  value={this.state.currentTime}
                  max={this.state.totalTime}
                  onChange={(e, v) => {
                    this.setState(
                      {
                        currentTime: v
                      },
                      () => {
                        this.props.videoEle.currentTime = Number(v)
                      }
                    )
                  }}
                />
              </Box>
              <Box>
                <Box display="flex">
                  <Box>
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        //兼容IOS
                        this.props.videoEle.muted = !!this.state.volume
                          ? true
                          : false
                        //兼容安卓
                        this.props.videoEle.volume = !!this.state.volume ? 0 : 1
                        this.setState({
                          volume: !!this.state.volume ? 0 : 1
                        })
                      }}
                    >
                      {this.state.volume ? <VolumeUp /> : <VolumeOff />}
                    </IconButton>
                  </Box>
                  {this.props.full && (
                    <Box>
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          this.props.videoEle.webkitEnterFullScreen()
                        }}
                      >
                        <Fullscreen />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Fade>
        </Box>
      </Box>
    )
  }
  componentDidMount() {
    let { videoEle } = this.props
    videoEle.onloadstart = () => {}
    videoEle.onloadedmetadata = () => {
      this.setState({
        totalTime: Number(videoEle.duration),
        currentTime: 0
      })
    }
    videoEle.onwaiting = () => {
      this.setState({
        loading: true
      })
    }
    videoEle.onvolumechange = () => {}
    videoEle.onplay = () => {
      this.setState({
        play: true,
        loading: false
      })
      if (commonFunc.checkUA.wechat && commonFunc.checkUA.android) {
        videoEle.style.display = 'block'
      }
      pageEvent.emit('videoPlay', this.props.videoEle.src)
    }
    videoEle.ontimeupdate = () => {
      this.setState({
        currentTime: Number(videoEle.currentTime)
      })
    }
    videoEle.onplaying = () => {
      this.setState({
        loading: false
      })
    }
    videoEle.onpause = () => {
      this.setState({
        play: false
      })
      if (commonFunc.checkUA.wechat && commonFunc.checkUA.android) {
        videoEle.style.display = 'none'
      }
    }
    videoEle.addEventListener('webkitfullscreenchange', (e) => {
      this.isFullScreen = !this.isFullScreen
      videoEle.style.objectFit = this.isFullScreen ? '' : 'fill'
    })
  }
  componentWillUnmount() {
    this.setState = () => {}
  }
}

export default VideoControls
