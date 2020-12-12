import request from '@/utils/request'

export function fetchCoupon(id) {
  return request({
    url: '/coupons/' + id,
    method: 'get'
  })
}
