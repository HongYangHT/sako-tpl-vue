const BaseConfig = require('./webpack.config.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const { resolve } = require('path')
const config = require('./config')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const packageJson = require('../package.json')
const webpack = require('webpack')

const devWebpackConfig = merge(BaseConfig, {
  output: {
    path: resolve(__dirname, './dist'),
    publicPath: '/',
    libraryTarget: 'umd',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    umdNamedDefine: true
  },
  devServer: {
    // publicPath: '/asset/',
    contentBase: resolve(__dirname, '../dist'),
    clientLogLevel: 'warning',
    compress: true,
    open: true,
    port: config.port,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    hotOnly: true,
    historyApiFallback: true,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false
    },
    proxy: config.proxy
  },
  plugins: [
    // NOTE: webpack4 不需要
    // new webpack.HotModuleReplacementPlugin(),
    // 处理html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: resolve(__dirname, '../src/asset/ico/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: `${packageJson.name}`,
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      mergeStaticsConfig: true,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return
        }
        console.log(message)
      },
      minify: false,
      staticFileGlobs: [],
      // For unknown URLs, fallback to the index page
      navigateFallback: '/index.html',
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      // Work around Windows path issue in SWPrecacheWebpackPlugin:
      // https://github.com/facebookincubator/create-react-app/issues/2235
      stripPrefix: '/'.replace(/\\/g, '/') + '/'
    }),
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify('/'),
      'process.env.NODE_ENV': JSON.stringify('development')
    })
    // new SkeletonPlugin({
    //   pathname: resolve(__dirname, './shell'), // 用来存储 shell 文件的地址
    //   staticDir: resolve(__dirname, './dist'), // 最好和 `output.path` 相同
    //   routes: ['/'], // 将需要生成骨架屏的路由添加到数组中
    //   port: '9999'
    // })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host ||
                'localhost'}:${port}`
            ]
          }
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
