import React from 'react'
interface Props {}
interface State {}
export default class PageName extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  render() {
    return <div id="PageName"></div>
  }
  componentDidMount() {}
  componentWillUnmount() {
    this.setState = () => {}
    /**
     * clearInterval()
     * clearTimeout()
     */
  }
}
