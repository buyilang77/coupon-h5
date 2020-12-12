import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/index/:id(\\d+)',
    name: 'Index',
    component: () => import('./view/index'),
    meta: {
      title: '领取礼品'
    }
  },
  {
    path: '/form',
    name: 'From',
    component: () => import('./view/form'),
    meta: {
      title: '现在提货'
    }
  }
]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export {
  router
}
