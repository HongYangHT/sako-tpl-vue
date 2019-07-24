/* eslint-disable */
import Vue from 'vue'
import App from './modules/app.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
// NOTE: 采取懒加载的模式
// import Antd from "ant-design-vue"
// import 'ant-design-vue/dist/antd.css'
// Vue.use(Antd)

import i18nManager from '@/utils/i18n'

import 'normalize.css'

import * as serviceWorker from './serviceWorker'

// 将路由状态同步到store中
sync(store, router)

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || navigator.language || 'zh-CN'
  i18nManager.loadLanguageAsync(lang).then(() => next())
})

new Vue({
  el: '#app',
  router,
  store,
  i18n: i18nManager.i18n,
  render: h => h(App)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
