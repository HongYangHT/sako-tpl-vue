const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('path')
module.exports = [
  {
    test: /\.(sc|sa|c)ss$/,
    oneOf: [
      {
        resourceQuery: /module/,
        use: [
          {
            loader:
              process.env.NODE_ENV !== 'production'
                ? 'vue-style-loader'
                : MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              publicPath: resolve('/dist/css')
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // 开启 CSS Modules
              modules: true,
              // 自定义生成的类名
              localIdentName: '[local]_[hash:base64:8]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: loader => [
                // 可以配置多个插件
                require('autoprefixer')({
                  browsers: [
                    'last 10 Chrome versions',
                    'last 5 Firefox versions',
                    'Safari >= 6',
                    'ie > 8'
                  ]
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ] // use的顺序从右往左
      },
      {
        use: [
          {
            loader:
              process.env.NODE_ENV !== 'production'
                ? 'vue-style-loader'
                : MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              publicPath: resolve('/dist/css')
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: loader => [
                // 可以配置多个插件
                require('autoprefixer')({
                  browsers: [
                    'last 10 Chrome versions',
                    'last 5 Firefox versions',
                    'Safari >= 6',
                    'ie > 8'
                  ]
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ] // use的顺序从右往左
      }
    ]
  }
]
