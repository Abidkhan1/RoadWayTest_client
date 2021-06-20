import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // beforeEnter: (to, from, next) => {
    //   if(store.getters['auth/authenticated']){
    //     return next({
    //       name: 'Dashboard'
    //     })
    //   }
    //   next()
    // }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if(!store.getters['auth/authenticated']){
        return next({
          name: 'Login'
        })
      }
      next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')

  },
  {
    path: '/addTodo',
    name: 'AddTodo',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddTodo.vue')
  },
  {
    path: '/showUpdateTodo/:id',
    name: 'showUpdateTodo',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowUpdateTodo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
