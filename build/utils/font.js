module.exports = [
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      // 文件大小小于limit参数，url-loader 将会把文件转为DataUR
      limit: 10000,
      name: '[name]-[hash:5].[ext]',
      output: 'asset/fonts/'
      // publicPath: '', 多用于CDN
    }
  }
]
