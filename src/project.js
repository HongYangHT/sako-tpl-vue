// eslint-disable-next-line
var config = {
  name: '{{name}}', // NOTE: 应用名字
  main: 'http://localhost:8002/{{name}}-app/{{name}}-js/single-spa.js', // NOTE: 入口文件地址，必须是绝对地址
  base: false, // NOTE: 是否首次渲染
  mode: 'history', // NOTE: 渲染模式
  path: '/{{name}}' // 渲染路径
}
