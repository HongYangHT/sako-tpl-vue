/* eslint-disable */
import Vue from 'vue'
import App from './modules/app.vue'
import router from './router'
import('./css/index.scss')

new Vue({
  el: '#app',
  router,
	render: h => h(App)
})
