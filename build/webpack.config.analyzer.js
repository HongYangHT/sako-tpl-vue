const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { resolve } = require('path')
const devMode = process.env.NODE_ENV !== 'production'
const BaseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer')

const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap(
  merge(
    {
      output: {
        path: resolve(__dirname, '../dist/asset'),
        publicPath: '/asset/',
        libraryTarget: 'umd',
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        umdNamedDefine: true
      },
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            common: {
              test: module => {
                return (
                  /[\\/]node_modules[\\/]/.test(module.context) &&
                  !/react|redux|prop-types/.test(module.context) &&
                  !/vue|vuex|vue-router/.test(module.context)
                )
              },
              name: 'common',
              chunks: 'initial',
              priority: 2,
              minChunks: 3
            },
            // reactBase: {
            //   name: 'reactBase',
            //   test: module => {
            //     return /react|redux|prop-types/.test(module.context)
            //   },
            //   chunks: 'initial',
            //   priority: 10
            // },
            vueBase: {
              name: 'vueBase',
              test: module => {
                return /vue|vuex|vue-router/.test(module.context)
              },
              chunks: 'initial',
              priority: 12
            },
            componentCommon: {
              name: 'component-commons',
              test: resolve('src/components'), // 可自定义拓展你的规则
              minChunks: 2, // 最小共用次数
              priority: 5,
              reuseExistingChunk: true
            },
            chunkCommon: {
              name: 'chunk-common',
              chunks: 'async',
              priority: 10,
              minChunks: 3 // 最小共用次数
            },
            commonStyle: {
              name: 'commonStyle',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
              priority: 20
            }
          }
        },
        minimizer: [
          new TerserJSPlugin({}),
          new OptimizeCSSAssetsPlugin({}), // 压缩css
          new UglifyJsPlugin({
            // 有很多可以配置
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
              // 在UglifyJs删除没有用到的代码时不输出警告
              warnings: false,
              output: {
                // 删除所有的注释
                comments: false,
                // 最紧凑的输出
                beautify: false
              },
              compress: {
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
              }
            }
          })
        ]
      },
      plugins: [
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: ['**/*'],
          verbose: true,
          dry: false
        }),
        new MiniCssExtractPlugin({
          filename: devMode
            ? 'asset/css/[name].css'
            : 'asset/css/[name].[hash].css',
          chunkFilename: devMode
            ? 'asset/css/[id].css'
            : 'asset/css/[id].[hash].css'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new BundleAnalyzer.BundleAnalyzerPlugin()
      ]
    },
    BaseConfig
  )
)
