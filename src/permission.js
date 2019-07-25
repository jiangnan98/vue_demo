import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { initMenu } from '@/utils/util'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (!store.getters.deptId) {
        store
          .dispatch('user/getInfo')
          .then(res => {
            store.dispatch('permission/getUserMenu').then(data => {
              initMenu(router, data)
            })
            next()
          })
          .catch(err => {
            store.dispatch('software/FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({
                path: '/'
              })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
