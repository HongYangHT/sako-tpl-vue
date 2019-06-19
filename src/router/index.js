import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/sako/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "index" */ '@/modules/index.vue')
    },
    {
      // 会匹配所有路径
      path: '/403',
      name: '403',
      component: () =>
        import(/* webpackChunkName: "notFound" */ '@/modules/exception/403.vue')
    },
    {
      // 会匹配所有路径
      path: '/500',
      name: '500',
      component: () =>
        import(/* webpackChunkName: "notFound" */ '@/modules/exception/500.vue')
    },
    {
      // 会匹配所有路径
      path: '*',
      name: '404',
      component: () =>
        import(/* webpackChunkName: "notFound" */ '@/modules/exception/404.vue')
    }
  ]
})
