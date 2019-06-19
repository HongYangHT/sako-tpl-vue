const BaseConfig = require('./webpack.config.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const { resolve } = require('path')

module.exports = merge(BaseConfig, {
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
    libraryTarget: 'umd',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    umdNamedDefine: true
  },
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
    compress: true,
    open: true,
    port: 8000,
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    },
    hotOnly: true,
    historyApiFallback: true
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
    })
  ]
})
