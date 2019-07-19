import packageJson from '../package.json'

module.export = {
  name: packageJson.name,
  // NOTE: 是否进去就显示
  main:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8001/js/single-spa.js'
      : '/asset/js/single-spa.js',
  base: false,
  mode: 'history',
  path: `/${packageJson.name}`
}
