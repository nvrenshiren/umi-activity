import React from 'react'
import { DynamicRouteProps } from '../src/interface/umi.page'
import { withRouter } from 'react-router'
interface RouteMath {}
interface Props extends DynamicRouteProps<RouteMath> {}
interface State {}
class DefaultComponent extends React.PureComponent<Props, State> {
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
const DefaultComponentName = withRouter(DefaultComponent)
export default DefaultComponentName
