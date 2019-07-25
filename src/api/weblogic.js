import request from '@/utils/weblogicreq'
// Upload Image
export function uploadImg() {
  return request({
    url: '/upload/image',
    method: 'post'
  })
}
// Get Kaptcha
export function getKaptcha() {
  return request({
    url: '/kaptcha/image/get',
    method: 'post'
  })
}
// Verify Kaptcha
export function verifyKaptcha() {
  return request({
    url: '/kaptcha/image/verify',
    method: 'post'
  })
}
// Get province
export function getProvince() {
  return request({
    url: '/area/province/query',
    method: 'post'
  })
}
// Get Area
export function getArea() {
  return request({
    url: '/area/byType/query',
    method: 'post'
  })
}
