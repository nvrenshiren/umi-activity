import { RouteProps, RouteComponentProps, match } from 'react-router'
import { Action, Location } from 'history'
import pageEvent from './functions/page.event'
import commonFunc from './functions/common.func'
import shareAction from './functions/share.action'

interface RoutesList extends RouteProps {
  routes?: RoutesList[]
}

interface RouteParams {
  routes: RoutesList[]
  action: Action
  location: Location
}

interface RouteChildProps extends RouteComponentProps {
  computedMatch: match<any>
}

export function patchRoutes(routes: RoutesList[]) {}
export function render(oldRender: () => Promise<void>) {
  oldRender()
}
export function onRouteChange(params: RouteParams) {
  if (params.action && __IS_BROWSER) {
    pageEvent.emit('RouteChange')
  }
}
export function rootContainer(container: React.ComponentElement<any, any>) {
  return container
}
export function modifyRouteProps(
  props: RouteChildProps,
  params: { route: RouteProps }
) {
  return { ...props }
}
