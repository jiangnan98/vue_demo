import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
const defaultSettings = require('../../src/settings.js')
const service = axios.create({
  baseURL: defaultSettings.weblogicUrl,
  timeout: 50000
})
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    getToken() ? (config.headers['token'] = getToken()) : ''
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200 && res.code !== 201) {
      Message({
        message: res.msg || 'error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 109) {
        MessageBox.confirm('您的账号登录超时', '', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else if (res.code == 111 || res.code == '111') {
        return res
      }
      return Promise.reject(res.msg || 'error')
    } else {
      if (res.code == '201') {
        Message({
          message: res.msg || 'success',
          type: 'success',
          duration: 5 * 1000
        })
      }
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
