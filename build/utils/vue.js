module.exports = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    exclude: file => /node_modules/.test(file) && !/\.vue\.js\.ts/.test(file),
    options: {}
  }
]
