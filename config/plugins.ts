import { IPlugin } from 'umi-types'
import Helmet from 'react-helmet'
import { ServerStyleSheets } from '@material-ui/styles'
import { IOpts } from 'umi-pre-render/src/index'

const Plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: false,
      dva: false,
      routes: {
        exclude: []
      },
      locale: {
        enable: false,
        default: 'zh-CN',
        baseNavigator: false,
        antd: false
      },
      library: 'react',
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/page/loading.page.tsx',
        level: 99
      },
      hd: false,
      pwa: false,
      fastClick: false,
      scripts: [
        // { src: 'http://cdn/a.js' },
        // { src: '<%= PUBLIC_PATH %>a.js' },
        // { content: `alert('a');` }
      ],
      headScripts: [
        // { src: 'http://cdn/a.js' },
        // { src: '<%= PUBLIC_PATH %>a.js' },
        // { content: `alert('a');` }
      ],
      metas: [
        // { charset: 'utf-8' }
      ],
      links: [
        // { rel: 'stylesheet', href: 'a.css' }
      ]
    }
  ]
]

const Prerender: IPlugin = [
  'umi-pre-render',
  {
    visible: false,
    exclude: [],
    runInMockContext: {
      publicPath: '/app/70th/'
    },
    diyRender: async (
      ReactDOMServer: any,
      htmlElement: any,
      getDocument: any
    ) => {
      const StyleSheets = new ServerStyleSheets()
      const Html = ReactDOMServer.renderToString(
        StyleSheets.collect(htmlElement)
      )
      let PageCss = StyleSheets.toString()
      const postcss = require('postcss')
      const autoprefixer = require('autoprefixer')
      const CleanCSS = require('clean-css')
      const prefixer = postcss([autoprefixer])
      const cleanCSS = new CleanCSS()
      const cssData = await prefixer.process(PageCss, { from: undefined })
      PageCss = cssData.css
      PageCss = cleanCSS.minify(PageCss).styles
      const $ = getDocument(Html)
      $('html head').prepend(`<style id="js-css">${PageCss}</style>`)
      return $.html()
    },
    postProcessHtml: ($) => {
      const HelmetData = Helmet.rewind()
      if (HelmetData) {
        $('title').html()
          ? $('title').text(HelmetData.title.toString())
          : $('html head').prepend(`${HelmetData.title}`)
      }
      return $
    }
  } as IOpts
]

if (process.env.NODE_ENV === 'production') {
  Plugins.push(Prerender)
}
export default Plugins
