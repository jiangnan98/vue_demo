import { getInfo, userMenu } from '@/api/user'
import { signs } from '@/utils/encryption'
const state = {
  nickName: '',
  avatar: '',
  deptId: '',
  userdetail: {}
}

const mutations = {
  SET_NICKNAME: (state, nickName) => {
    state.nickName = nickName
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_DEPTID: (state, deptId) => {
    state.deptId = deptId
  },
  SET_USERDETAIL: (state, userdetail) => {
    state.userdetail = userdetail
  }
}

const actions = {
  getInfo({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const data = response.result
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const { nickName, deptId, avatar } = data
          commit('SET_DEPTID', deptId)
          commit('SET_NICKNAME', nickName)
          commit('SET_AVATAR', avatar)
          commit('SET_USERDETAIL', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  userMenu({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      userMenu(params)
        .then(response => {
          const data = response.result
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
