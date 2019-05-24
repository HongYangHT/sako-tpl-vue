const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const VueConfig = require('./webpack.config.vue')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')
const devMode = process.env.NODE_ENV !== 'production'

// NOTE: 应用了splitChunks, 不再需要设置vender

// const venderPackage = [
//   'vue',
//   'vuex',
//   'vue-router'
// 'react',
// 'react-dom',
// 'redux',
// 'redux-thunk',
// 'react-redux',
// 'react-router-dom',
// 'react-router-redux',
// 'history',
// 'prop-types',
// 'react-loadable'
// ]

module.exports = merge(
  {
    mode: devMode ? 'development' : 'production',
    entry: {
      app: './src'
      // vendor: venderPackage
    },
    output: {
      path: resolve(__dirname, '../dist'),
      publicPath: '/'
    },
    module: {
      // 忽略构建时，webpack解析相关的库
      // noParse: function(lib) {
      // 	return /lodash|moment|vue|vuex|vue-router|react|react-router|redux/.test(
      // 		lib
      // 	)
      // },
      rules: [
        // ... 其它规则
        {
          enforce: 'pre',
          test: /\.(js|vue|jsx)$/,
          exclude: /node_modules/,
          include: resolve(__dirname, '/src/**'),
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }
      ]
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.vue', '.jsx', '.json', '.css', '.scss', '.sass'],
      alias: {
        '@': resolve(__dirname, '../src'),
        vue$: devMode ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.min.js',
        moment: 'moment',
        lodash: 'lodash',
        vuex: 'vuex',
        'vue-router': 'vue-router'
        // react: 'react',
        // 'react-router': 'react-router',
        // redux: 'redux'
      }
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      // 处理html
      new HtmlWebpackPlugin({
        template: './src/index.html',
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
      new FriendlyErrorsPlugin()
    ]
  },
  VueConfig
)
