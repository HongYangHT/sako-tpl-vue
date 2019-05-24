const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = [
  {
    test: /\.less$/,
    use: [
      {
        loader:
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV === 'development'
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
    ]
  }
]
