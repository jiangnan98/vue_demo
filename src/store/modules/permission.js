import { constantRoutes } from '@/router'
import { validatenull, validateURL } from '@/utils/validate'

import { userMenu } from '@/api/user'

// const permission = {
const state = {
  routers: constantRoutes,
  addRouters: []
}
const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRoutes
  },
  ADD_ROUTERS: (state, addRouters) => {
    state.routers = constantRoutes.concat(addRouters)
  }
}
const actions = {
  GenerateRoutes({ commit }, data) {
    return new Promise(resolve => {
      resolve()
    })
  },
  // 获取系统菜单
  getUserMenu({ commit }) {
    return new Promise(resolve => {
      userMenu().then(res => {
        const data = res.result
        data.forEach(ele => {
          if (ele.children) {
            ele.children.forEach(child => {
              if (!validatenull(child.component)) {
                if (validateURL(child.path)) {
                  child.path = `${child.path}`
                } else {
                  child.path = `${ele.path}/${child.path}`
                }
              }
            })
          }
        })
        commit('SET_ROUTERS', data)
        resolve(data)
      })
    })
  }
}
// }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
