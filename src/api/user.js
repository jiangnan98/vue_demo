import request from '@/utils/request'
// get user info
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'post'
  })
}
// user update
export function updateUser() {
  return request({
    url: '/user/update',
    method: 'post'
  })
}
// user menu
export function userMenu(data) {
  return request({
    url: '/menu/user/query',
    method: 'post',
    data
  })
}
// change user pwd
export function changePwd() {
  return request({
    url: '/user/pwd/change',
    method: 'post'
  })
}
