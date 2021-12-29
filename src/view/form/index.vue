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
    <div class="tap mt-1">
      <div v-for="(type, index) in coupons.delivery_type" :key="index" class="tap-item" :class="{ active: isActive === index }" @click="selectDelivery(type, index)"><a>{{ type | deliveryType }}</a></div>
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
  filters: {
    deliveryType(status) {
      const statusMap = {
        'delivery': '快递发货',
        'pick_up': '门店自提'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      isActive: 0,
      formComponent: '',
      coupons: {
        stores: []
      }
    }
  },
  created() {
    this.getCoupon(this.$route.query.coupon_id)
  },
  methods: {
    selectDelivery(item, index) {
      switch (item) {
        case 'delivery':
          this.formComponent = 'ExpressDelivery'
          break
        case 'pick_up':
          this.formComponent = 'SelfCollection'
          break
      }
      this.isActive = index
    },
    getCoupon(id) {
      fetchCoupon(id).then(response => {
        this.coupons = response.data
        switch (this.coupons.delivery_type[0]) {
          case 'delivery':
            this.formComponent = 'ExpressDelivery'
            break
          case 'pick_up':
            this.formComponent = 'SelfCollection'
            break
        }
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
