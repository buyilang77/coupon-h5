import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/coupons/:id(\\d+)',
    name: 'Coupon',
    component: () => import('./view/coupon'),
    meta: {
      title: '领取礼品'
    }
  },
  {
    path: '/form/:id',
    name: 'Form',
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
