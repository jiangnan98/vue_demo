
import request from '@/utils/request'
// login
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
// log out
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
