const VueLoaderPlugin = require('vue-loader/lib/plugin')
const merge = require('webpack-merge')
const vueConfig = require('./utils/vue')
const tsConfig = require('./utils/ts')
const cssModuleConfig = require('./utils/cssModule')
const assetConfig = require('./utils/asset')
const esConfig = require('./utils/es6')
const fontConfig = require('./utils/font')
const lessConfig = require('./utils/less')

module.exports = merge({
  mode: 'development',
  module: {
    rules: [
      ...vueConfig,
      ...tsConfig,
      ...esConfig,
      ...lessConfig,
      ...cssModuleConfig,
      ...assetConfig,
      ...fontConfig
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
})
