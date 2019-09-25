import { Box, Collapse, Fade, Grow, Zoom } from '@material-ui/core'
import { ImageSearch, SupervisedUserCircle } from '@material-ui/icons'
import * as React from 'react'

interface Props {
  src: string
  ani?: 'Collapse' | 'Fade' | 'Grow' | 'Zoom' | 'none'
  ratio?: number
  mode?: number
  onload?: Function
  imgtype?: 'img' | 'ren'
}

interface State {
  oksrc: string
  loaded: boolean
}

class UtilImage extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      oksrc: '',
      loaded: false
    }
  }
  state: State
  imgBox: HTMLDivElement
  imgItem: HTMLImageElement
  toWidth: number
  toHeight: number
  render() {
    return (
      <div
        className="full"
        ref={(node) => {
          this.imgBox = node
        }}
      >
        {this.state.loaded ? this.Transition : this.LoadBox}
      </div>
    )
  }
  get LoadBox() {
    return (
      <Box
        width={this.toWidth}
        height={this.toHeight || 100}
        bgcolor="background.default"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {this.props.imgtype === 'ren' ? (
          <SupervisedUserCircle
            color="disabled"
            style={{
              fontSize: this.toHeight ? this.toHeight / 2 : 50
            }}
          />
        ) : (
          <ImageSearch
            color="disabled"
            style={{
              fontSize: this.toHeight ? this.toHeight / 2 : 50
            }}
          />
        )}
      </Box>
    )
  }
  get Transition() {
    let children = (
      <img
        src={this.state.oksrc}
        style={{
          width: this.toWidth,
          height: this.toHeight || 'auto',
          verticalAlign: 'top'
        }}
        ref={(node) => {
          this.imgItem = node
        }}
      />
    )
    switch (this.props.ani) {
      case 'Collapse':
        return <Collapse in={this.state.loaded} children={children} />
      case 'Fade':
        return <Fade in={this.state.loaded} children={children} />
      case 'Grow':
        return <Grow in={this.state.loaded} children={children} />
      case 'Zoom':
        return <Zoom in={this.state.loaded} children={children} />
      default:
        return children
    }
  }

  loadImg(src: string) {
    if (src) {
      let DownLoad = new Image()
      DownLoad.src = src
      DownLoad.onload = () => {
        this.setState({
          oksrc: src,
          loaded: true
        })
        //图片加载完执行的回调
        this.props.onload && this.props.onload(this.imgItem)
      }
    }
  }
  componentWillReceiveProps(props: Props) {
    if (props.src !== this.props.src) {
      this.loadImg(props.src)
    }
  }
  componentDidMount() {
    this.toWidth = this.imgBox.offsetWidth
    this.toHeight = this.props.ratio
      ? Math.round(this.toWidth * this.props.ratio)
      : this.imgBox.offsetHeight
    this.loadImg(this.props.src)
  }
  componentWillUnmount() {
    this.setState(() => {})
  }
}
export default UtilImage
