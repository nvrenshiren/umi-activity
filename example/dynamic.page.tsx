import React from 'react'
import { DynamicRouteProps } from '../src/interface/umi.page'
interface RouteMath {}
interface Props extends DynamicRouteProps<RouteMath> {}
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
