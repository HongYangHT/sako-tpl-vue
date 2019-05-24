module.exports = [
  // 它会应用到普通的 `.js` 文件
  // 以及 `.vue` 文件中的 `<script>` 块
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: file => /node_modules/.test(file) && !/\.vue\.js\.ts/.test(file)
  }
]
