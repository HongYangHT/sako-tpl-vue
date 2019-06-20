/* eslint-disable */
import Vue from 'vue'
import App from './modules/app.vue'
import router from './router'
import store from './store'
import('./css/index.scss')
// NOTE: 采取懒加载的模式
// import Antd from "ant-design-vue"
// import 'ant-design-vue/dist/antd.css'
// Vue.use(Antd)

new Vue({
  el: '#app',
  router,
  store,
	render: h => h(App)
})
