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
        import(/* webpackChunkName: "index" */ '@/modules/index.vue'),
      meta: {},
      props: route => ({ query: route.query.id })
    },
    {
      // 会匹配所有路径
      path: '/403',
      name: '403',
      component: () =>
        import(/* webpackChunkName: "403" */ '@/modules/exception/403.vue')
    },
    {
      // 会匹配所有路径
      path: '/500',
      name: '500',
      component: () =>
        import(/* webpackChunkName: "500" */ '@/modules/exception/500.vue')
    },
    {
      // 会匹配所有路径
      path: '*',
      name: '404',
      component: () =>
        import(/* webpackChunkName: "404" */ '@/modules/exception/404.vue')
    }
  ]
})
