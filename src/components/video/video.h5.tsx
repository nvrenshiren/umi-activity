import * as React from 'react'
import commonFunc from '@/functions/common.func'
import VideoControls from './video.controls'
import VideoDanMu from './video.danmu'
import { Box } from '@material-ui/core'
import pageEvent from '@/functions/page.event'

interface Props {
  noh5?: boolean
  pic?: string
  video: string
  full?: boolean
  danmu?: boolean
  danmuApi?: () => Promise<any>
}
interface State {
  done: boolean
}

class VideoH5 extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      done: false
    }
  }
  videoEle: HTMLVideoElement
  boxEle: HTMLDivElement
  render() {
    let { pic, video, noh5 } = this.props
    return (
      <Box
        className="videoBox"
        position="relative"
        bgcolor="#000"
        height={0}
        pt="56.25%"
        overflow="hidden"
      >
        <div
          className="videoMain"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          }}
          ref={(node) => {
            this.boxEle = node
          }}
        >
          <video
            preload="auto"
            playsInline
            webkit-playsinline="true"
            x5-video-player-fullscreen="true"
            x5-video-player-type={noh5 ? 'false' : 'h5'}
            x5-playsinline="true"
            x-webkit-airplay="allow"
            style={{
              verticalAlign: 'top',
              objectFit: 'fill'
            }}
            width="100%"
            height="100%"
            poster={pic}
            src={video}
            ref={(node) => {
              this.videoEle = node
            }}
          />
          <Box
            className="videoDanMu"
            position="absolute"
            zIndex={2}
            top={0}
            left={0}
            width="100%"
            height="100%"
            pb="40px"
            style={{
              visibility: this.props.danmu ? 'visible' : 'hidden'
            }}
          >
            <VideoDanMu
              danmu={this.props.danmu}
              danmuApi={this.props.danmuApi}
            />
          </Box>
          <Box
            className="videoControls"
            position="absolute"
            zIndex={3}
            top={0}
            left={0}
            width="100%"
            height="100%"
          >
            {this.state.done && (
              <VideoControls videoEle={this.videoEle} full={this.props.full} />
            )}
          </Box>
        </div>
      </Box>
    )
  }

  componentDidMount() {
    pageEvent.on('videoPlay', (videoUrl: string) => {
      if (this.props.video !== videoUrl) {
        this.videoEle && this.videoEle.pause()
      }
    })
    this.setState({
      done: true
    })
  }
}

export default VideoH5
