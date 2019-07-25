import {
  roleList,
  createRole,
  updateRole,
  deleteRole,
  updateRoleMenu,
  roleMenuList,
  menuList,
  deleteMenu,
  updateMenu,
  createMenu
} from '@/api/system'
import { signs } from '@/utils/encryption'
const state = {}

const mutations = {}

const actions = {
  roleList({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      roleList(params)
        .then(response => {
          const data = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  createRole({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      createRole(params)
        .then(response => {
          const data = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateRole({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      updateRole(params)
        .then(response => {
          const data = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteRole({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      deleteRole(params)
        .then(response => {
          const data = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateRoleMenu({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      updateRoleMenu(params)
        .then(response => {
          const data = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  menuList({ commit, state }, params) {
    console.log('222')
    signs(params)
    return new Promise((resolve, reject) => {
      menuList(params)
        .then(response => {
          const data = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  roleMenuList({ commit, state }, params) {
    console.log('111')
    signs(params)
    return new Promise((resolve, reject) => {
      roleMenuList(params)
        .then(response => {
          const data = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  deleteMenu({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      deleteMenu(params)
        .then(response => {
          const data = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateMenu({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      updateMenu(params)
        .then(response => {
          const data = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  createMenu({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      createMenu(params)
        .then(response => {
          const data = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
