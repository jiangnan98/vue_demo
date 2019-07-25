const state = {}

const mutations = {}

const actions = {
  deepCopy(obj) {
    let result = obj
    if (typeof obj === 'object' && obj !== null) {
      result =
        Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
      for (const prop in obj) {
        result[prop] = deepCopy(obj[prop])
      }
    }
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
