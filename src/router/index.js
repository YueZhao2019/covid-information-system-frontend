import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/mainPage'
import Login from '../views/login'


Vue.use(VueRouter)


//Sub page under main page of main page
let pages = [
  'home',
  'apply',
  'applyMake',
  'overview',
  'userAdd',
  'examine'
].map(name => ({
  path: name,
  name: name,
  component: () =>
    import(`@/views/${name}`)
}))

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'mainPage',
    component: MainPage,
    children: pages,
    meta: {
      requiresAuth: true //When accessing this route, you need to determine whether to log in
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  ]
})
export default router