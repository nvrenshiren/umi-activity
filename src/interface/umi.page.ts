import { RouteComponentProps, match } from 'react-router'

export interface DynamicRouteProps<MathParams = {}>
  extends RouteComponentProps<MathParams> {
  computedMatch: match<MathParams>
}
