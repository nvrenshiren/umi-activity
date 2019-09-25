import { Theme } from '@material-ui/core'
import { wx } from './interface/app.wx'
import pageEvent from './functions/page.event'

declare global {
  //主题ID
  const g_theme: string
  /**
   * 是否服务端渲染
   */
  const __IS_BROWSER: boolean
  /**
   * 微信SDK
   */

  interface Window {
    /**
     * 路由根
     */
    routerBase: string
    /**
     * 项目根目录
     */
    publicPath: string
    /**
     * 主题配置
     */
    Theme: Theme
    /**
     * webkit
     */
    webkit: any
    JSApi: any
    JXRSApi: any
    wx: wx
  }
}
