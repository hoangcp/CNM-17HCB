import Vue from 'vue'
import Router from 'vue-router'

import login from './components/Login.vue'
import request from './components/RequestCompo.vue'

Vue.use(Router)

var router = new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/request',
      name: 'request',
      component: request,
      meta: {
        requiresAuth: true
      }
    },
    /*{
      path: '/categories/:catId',
      name: 'products',
      component: Products
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },*/
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    var token = localStorage.access_token;
    if (typeof token === 'undefined') {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;