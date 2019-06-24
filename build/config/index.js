module.exports = {
  proxy: {
    '/api': {
      target: 'http://localhost:9000/'
    }
  },
  port: 8000
}
