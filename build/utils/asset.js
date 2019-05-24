module.exports = [
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          // 具体配置见插件官网
          limit: 10000,
          name: '[name]-[hash:5].[ext]',
          outputPath: 'asset/img/' // outputPath所设置的路径，是相对于 webpack 的输出目录。
          // publicPath 选项则被许多 webpack 的插件用于在生产模式下更新内嵌到 css、html文件内的 url , 如CDN地址
        }
      },
      {
        loader: 'url-loader',
        options: {
          // 具体配置见插件官网
          limit: 10000,
          name: '[name]-[hash:5].[ext]',
          outputPath: 'asset/img/' // outputPath所设置的路径，是相对于 webpack 的输出目录。
          // publicPath 选项则被许多 webpack 的插件用于在生产模式下更新内嵌到css、html文件内的 url , 如CDN地址
        }
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          },
          gifsicle: {
            interlaced: false
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75
          }
        }
      }
    ]
  }
]
