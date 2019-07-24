/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 微前端工程入口
 * @Date: 2019-07-19 11:35:35
 * @LastEditTime: 2019-07-24 14:36:26
 */
import singleSpaVue from 'single-spa-vue'

/* eslint-disable */
import Vue from "vue"
import App from "@/modules/app.vue"
import router from "@/router"
import store from "@/store"
import { sync } from "vuex-router-sync"
// NOTE: 采取懒加载的模式
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
// Vue.use(Antd)

import i18nManager from "@/utils/i18n"

import "normalize.css"

// 将路由状态同步到store中
sync(store, router)

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || navigator.language || "zh-CN"
  i18nManager.loadLanguageAsync(lang).then(() => next())
})

Vue.config.productionTip = false

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: "#{{name}}",
    router,
    store,
    i18n: i18nManager.i18n,
    render: h => h(App)
  }
})

export const bootstrap = [vueLifecycles.bootstrap]

export function mount(props) {
  createDomElement()
  return vueLifecycles.mount(props)
}

export const unmount = [vueLifecycles.unmount]

function createDomElement() {
  // Make sure there is a div for us to render into
  let el = document.getElementById("{{name}}");

  if (!el) {
    el = document.createElement("div")
    el.id = "{{name}}";
    document.body.appendChild(el)
  }
  return el
}
