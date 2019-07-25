import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/Layout/index'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/software/login'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/company/index')
      }
    ]
  }
]
export const devtoolRoutes = [
  {
    path: '/debug',
    component: () => import('@/views/devtools/debug'),
    hidden: true
  },
  {
    path: '/icon',
    component: () => import('@/views/devtools/icon'),
    hidden: true
  }
]
const createRouter = () =>
  new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes.concat(devtoolRoutes)
  })

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
