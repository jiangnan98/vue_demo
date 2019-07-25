import request from '@/utils/request'
// -----------------------------------------Role-------------------------------------------------
// role list
export function roleList(data) {
  return request({
    url: '/role/query',
    method: 'post',
    data
  })
}
// create role
export function createRole(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data
  })
}
// update role
export function updateRole(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data
  })
}
// delete role
export function deleteRole(data) {
  return request({
    url: '/role/delete',
    method: 'post',
    data
  })
}
// update role menu
export function updateRoleMenu(data) {
  return request({
    url: '/role/menu/update',
    method: 'post',
    data
  })
}
// role menu list
export function roleMenuList(data) {
  return request({
    url: '/role/menu/query',
    method: 'post',
    data
  })
}
// -----------------------------------------Menu------------------------------------------------------
// create menu
export function menuList(data) {
  return request({
    url: '/menu/query',
    method: 'post',
    data
  })
}
// create menu
export function createMenu(data) {
  return request({
    url: '/menu/create',
    method: 'post',
    data
  })
}
// update menu
export function updateMenu(data) {
  return request({
    url: '/menu/update',
    method: 'post',
    data
  })
}
// delete menu
export function deleteMenu(data) {
  return request({
    url: '/menu/delete',
    method: 'post',
    data
  })
}
