import path from 'path'
import { IConfig } from 'umi-types'
import Proxy from './proxy'

const Spritesmith = require('webpack-spritesmith')
export default {
  chainWebpack: (config, { webpack }) => {
    config.plugin('webpack-spritesmith').use(Spritesmith, [
      {
        logCreatedFiles: true,
        src: {
          cwd: path.join(__dirname, '../src/statics/_icons'),
          glob: '**/*.png'
        },
        target: {
          image: path.join(__dirname, '../src/statics/image/sprite.png'),
          css: path.join(__dirname, '../src/statics/sprites.css')
        },
        apiOptions: {
          cssImageRef: 'image/sprite.png',
          generateSpriteName: (fullPath: string) => {
            let parsed = path.parse(fullPath)
            let dir = parsed.dir.split(path.sep)
            let moduleName = dir[dir.length - 1]
            return moduleName + '-' + parsed.name
          }
        },
        spritesmithOptions: {
          algorithm: 'top-down',
          padding: 4
        }
      }
    ])
    config.module
      .rule('image-file')
      .test(/no64/i)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'static/[name]-[hash:8].[ext]'
      })
  },
  // 配置主题，实际上是配 less 变量。支持对象和字符串两种类型，字符串需要指向一个返回配置的文件。
  theme: {},
  // 配置是否开启 treeShaking，默认关闭。
  treeShaking: true,
  // 通过 webpack 的 DefinePlugin 传递给代码，值会自动做 JSON.stringify 处理。
  define: {},
  // 配置 webpack 的?externals?属性。
  externals: {},
  // 配置 webpack 的 resolve.alias 属性
  alias: {},
  // 配置 webpack 的 devtool 属性
  devtool: '',
  // 禁用 CSS Modules
  disableCSSModules: true,
  // 禁用 CSS 的 SourceMap 生成
  disableCSSSourceMap: true,
  // 定义额外的 babel preset 列表，格式为数组。
  extraBabelPresets: [],
  // 定义额外的 babel plugin 列表，格式为数组
  extraBabelPlugins: [],
  // 定义额外需要做 babel 转换的文件匹配列表，格式为数组，数组项是 webpack#Condition
  extraBabelIncludes: [],
  // 定义额外的 PostCSS 插件，格式为数组
  extraPostCSSPlugins: [],
  // 指定项目目录下的文件不走 css modules，格式为数组，项必须是 css 或 less 文件
  cssModulesExcludes: [],
  // 定义需要单纯做复制的文件列表，格式为数组，项的格式参考 copy-webpack-plugin 的配置
  copy: [],
  // 配置 webpack-dev-server 的 proxy 属性
  proxy: {
    '/api': {
      target: Proxy[process.env.PRO_ENV || 'test'],
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api': '' }
    }
  },
  // 配置 node-sass 的选项。注意：使用 sass 时需在项目目录安装 node-sass 和 sass-loader 依赖
  sass: {},
  // 配置后会生成 manifest.json
  manifest: {},
  // 忽略 moment 的 locale 文件，用于减少尺寸
  ignoreMomentLocale: true,
  // 给 less-loader 的额外配置项
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  // 给 css-loader 的额外配置项。
  cssLoaderOptions: {},
  urlLoaderExcludes: [/(base64)$/i]
} as IConfig
