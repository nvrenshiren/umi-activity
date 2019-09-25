import pageEvent from '@/functions/page.event'
import React from 'react'
import ReactDOM from 'react-dom'
import { Backdrop, Box, Modal, Zoom } from '@material-ui/core'

export interface ModalContenProps {
  closeModal?: () => Promise<boolean>
  updateModal?: <T>(params: Props<T>) => void
}

interface Props<T = {}> {
  content:
    | React.FunctionComponent<T & ModalContenProps>
    | React.ComponentClass<T & ModalContenProps>
  params?: T
  hideBg?: boolean
}

interface State extends Props<any> {
  show: boolean
}

class ModalBox extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      show: true,
      content: this.props.content
    }
  }
  render() {
    return (
      <Modal
        container={document.getElementById('modal-box-container')}
        open={this.state.show}
        onClose={this.closeModal.bind(this)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        hideBackdrop={this.props.hideBg}
        disableBackdropClick
        disableScrollLock
      >
        <Zoom in={this.state.show}>
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {React.createElement(
              this.state.content,
              Object.assign(
                {
                  closeModal: this.closeModal.bind(this),
                  updateModal: this.updateModal.bind(this)
                },
                { ...this.props.params }
              )
            )}
          </Box>
        </Zoom>
      </Modal>
    )
  }
  updateModal<T>({ content, params }: Props<T>) {
    this.setState({
      content,
      params
    })
  }
  closeModal() {
    return new Promise((resolve) => {
      this.setState(
        {
          show: false
        },
        () => {
          setTimeout(() => {
            if (document.getElementById('modal-box-container')) {
              ReactDOM.unmountComponentAtNode(
                document.getElementById('modal-box-container')
              )
              document.getElementById('modal-box-container').remove()
            }
            resolve(true)
          }, 500)
        }
      )
    })
  }
  componentDidMount() {
    pageEvent.on('RouteChange', () => {
      this.closeModal()
    })
  }
  componentWillUnmount() {
    this.setState = () => {}
  }
}

export default {
  open<T>(param: Props<T>) {
    let modalBox = React.createElement(ModalBox, param)
    let modalWarp: HTMLElement
    if (!(modalWarp = document.getElementById('modal-box-container'))) {
      modalWarp = document.createElement('div')
      modalWarp.id = 'modal-box-container'
      document.body.appendChild(modalWarp)
    }
    ReactDOM.render(modalBox, modalWarp)
  }
}
