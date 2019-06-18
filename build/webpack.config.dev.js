const BaseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const { resolve } = require('path')

module.exports = merge(
  {
    output: {
      path: resolve(__dirname, '../dist'),
      publicPath: '/'
    },
    optimization: {
      runtimeChunk: true
    },
    devServer: {
      contentBase: resolve(__dirname, '../dist'),
      open: true,
      port: 8000,
      hot: true,
      overlay: {
        warnings: true,
        errors: true
      }
    }
  },
  BaseConfig
)
