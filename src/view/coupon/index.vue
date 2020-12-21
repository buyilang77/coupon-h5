<template>
  <component :is="product_component" :coupons="coupons" :contact="contact" />
</template>
<script>
import SingleProduct from './components/SingleProduct'
import MultipleProduct from './components/MultipleProduct'
import { fetchCoupon } from '@/api/index'
import { fetchMerchant } from '@/api/information'
export default {
  name: 'Coupon',
  components: {
    SingleProduct,
    MultipleProduct
  },
  data() {
    return {
      coupon_id: null,
      contact: null,
      product_component: null,
      coupons: Object
    }
  },
  created() {
    this.coupon_id = this.$route.params.id
    this.getCoupon(this.coupon_id)
    fetchMerchant(this.coupon_id).then(response => {
      this.contact = response.data.phone
    })
  },
  methods: {
    getCoupon(id) {
      fetchCoupon(id).then(response => {
        this.coupons = response.data
        this.switchComponent()
      })
    },
    switchComponent() {
      if (this.coupons.products.length === 1) {
        this.product_component = 'SingleProduct'
      } else {
        this.product_component = 'MultipleProduct'
      }
    }
  }
}
</script>
