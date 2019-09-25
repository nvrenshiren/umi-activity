import React from 'react'
interface Props {}
interface State {}
export default class DefaultComponentName extends React.PureComponent<
  Props,
  State
> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  render() {
    return <div id="DefaultComponentName"></div>
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
