<template>
  <div class="container">
    <div class="coupon-item">
      <div class="coupon-item-image">
        <van-image
          fit="contain"
          :src="thumbnailImage(coupons.products && coupons.products[0].carousel)"
          :alt="coupons.title"
        />
      </div>
      <div class="coupon-item-info">
        <p class="coupon-item-info-title">{{ coupons.title }}</p>
        <p>¥ <span>{{ coupons.products && coupons.products[0].price }}</span></p>
      </div>
    </div>
    <div class="tap">
      <div class="tap-item" :class="{ active: 1 === isActive }" @click="selectDelivery(1)"><a>快递配送</a></div>
      <div class="tap-item" :class="{ active: 2 === isActive }" @click="selectDelivery(2)"><a>门店自提</a></div>
    </div>
    <div class="mt-1">
      <component :is="formComponent" :coupons="coupons" />
    </div>
  </div>
</template>
<script>
import { Image as VanImage } from 'vant'
import { fetchCoupon } from '@/api/index'
import ExpressDelivery from './components/ExpressDelivery'
import SelfCollection from './components/SelfCollection'
export default {
  name: 'From',
  components: {
    [VanImage.name]: VanImage,
    ExpressDelivery,
    SelfCollection
  },
  data() {
    return {
      isActive: 1,
      formComponent: 'ExpressDelivery',
      coupons: {}
    }
  },
  created() {
    this.getCoupon(this.$route.query.coupon_id)
  },
  methods: {
    selectDelivery(item) {
      switch (item) {
        case 1:
          this.formComponent = 'ExpressDelivery'
          break
        case 2:
          this.formComponent = 'SelfCollection'
          break
      }
      this.isActive = item
    },
    getCoupon(id) {
      fetchCoupon(id).then(response => {
        this.coupons = response.data
      })
    },
    thumbnailImage(image) {
      let url = 'http://xxx.com'
      if (image !== undefined && image.length > 0) {
        url = image[0].url
      }
      return url
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    margin: 1rem;
    .coupon-item {
      display: flex;
      align-content: center;
      background-color: #ffffff;
      //border-radius: 10px;
      font-size: 10pt;
      padding: 13px 8px 16px;

      &-image {
        display: flex;
        align-content: center;
        align-items: center;
        width: 100px;
      }
      &-info {
        p {
          margin: 0 0 5px;
        }
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-content: center;
        padding-left: 8px;
        &-title {
          font-weight: bold;
          font-size: 11pt;
        }
      }
    }
    .tap {
      display: flex;
      background-color: #ffffff;
      padding-left: 10px;
      &-item {
        padding: 10px 0;
        &:first-child {
          margin-right: 24px;
        }
      }
    }
  }
  .active {
    border-bottom: 3px solid #ff0000;
  }
</style>
