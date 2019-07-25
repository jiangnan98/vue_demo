import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
const service = axios.create({
  timeout: 50000
})
service.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'application/json'
    // getToken() ? config.headers['token'] = getToken() : ''
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.dat
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
