import { applyQuery, companyAdd, companyType, companyList } from '@/api/company'
import { signs } from '@/utils/encryption'
const state = {}

const mutations = {}

const actions = {
  applyQuery({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      applyQuery(params)
        .then(response => {
          const data = response.result
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  companyAdd({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      companyAdd(params)
        .then(response => {
          const data = response.result
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  companyType({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      companyType(params)
        .then(response => {
          const data = response.result
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  companyList({ commit, state }, params) {
    signs(params)
    return new Promise((resolve, reject) => {
      companyList(params)
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
