import request from '@/utils/debugreq'
// api test
export function test(url, method, data) {
  return request({
    url: url,
    method: method,
    data
  })
}
