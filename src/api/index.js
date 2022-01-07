import request from '@/utils/request'

export function fetchMerchant(username) {
  return request({
    url: 'merchant/' + username,
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
export function checkCard(merchant_id, data) {
  return request({
    url: merchant_id + '/check-card/',
    method: 'post',
    data
  })
}
export function fetchCoupon(id) {
  return request({
    url: '/coupons/' + id,
    method: 'get'
  })
}
