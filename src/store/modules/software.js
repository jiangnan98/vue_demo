import { login, logout } from '@/api/software'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { aes } from '@/utils/encryption'
import { resetRouter } from '@/router'
import md5 from 'md5'
import user from './user'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  deptId: '',
  pubkey: '',
  role: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_PUBKEY: (state, pubkey) => {
    state.pubkey = pubkey
  },
  SET_PERMISSIONS: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const dataparams = {
      params: {
        phone: userInfo.account,
        password: md5(userInfo.password).toUpperCase()
      }
    }
    return new Promise((resolve, reject) => {
      login(dataparams)
        .then(response => {
          commit('SET_TOKEN', response.result)
          commit('SET_PERMISSIONS', [])
          const pubkey = decodeURIComponent(
            escape(window.atob(response.result.split('.')[1]))
          )
          const pubstr = JSON.parse(pubkey).sub
          commit('SET_PUBKEY', pubstr)
          sessionStorage.setItem('PUBKEY', aes.en(pubstr))

          setToken(response.result)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // user logout
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_PERMISSIONS', {})
      removeToken()
      resolve()
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
