import request from '@/utils/request'
// company audit list
export function applyQuery(data) {
  return request({
    url: '/company/apply/query',
    method: 'post',
    data
  })
}
// Add service provider
export function companyAdd() {
  return request({
    url: '/company/apply/add',
    method: 'post'
  })
}
// Type of service provider
export function companyType() {
  return request({
    url: '/company/type/query',
    method: 'post'
  })
}
// company list
export function companyList() {
  return request({
    url: '/company/query',
    method: 'post'
  })
}
