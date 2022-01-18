import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/:username',
    name: 'SignIn',
    component: () => import('./view/signIn/index'),
    meta: {
      title: '提货'
    }
  },
  {
    path: '/coupons/:id(\\d+)',
    name: 'Coupon',
    component: () => import('./view/coupon'),
    meta: {
      title: '提货'
    }
  },
  {
    path: '/coupons/:id(\\d+)/electronic-card',
    name: 'ElectronicCard',
    component: () => import('./view/electronicCard'),
    meta: {
      title: '电子卡'
    }
  },
  {
    path: '/coupons/:id(\\d+)/select-product',
    name: 'SelectProduct',
    component: () => import('./view/select'),
    meta: {
      title: '选择礼品'
    }
  },
  {
    path: '/coupons/form',
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
