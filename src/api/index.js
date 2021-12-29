import request from '@/utils/request'

export function fetchCoupon(id) {
  return request({
    url: '/coupons/' + id,
    method: 'get'
  })
}
export function fetchCouponItem(params) {
  return request({
    url: '/coupon-item',
    method: 'get',
    params
  })
}
