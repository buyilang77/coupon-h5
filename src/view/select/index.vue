<template>
  <div>
    <div class="container">
      <h4>可选礼品</h4>
      <div class="product-items">
        <van-radio-group v-model="checkedProduct" icon-size="15px">
          <van-cell v-for="(item,index) in coupons.products" :key="index" class="product-items-item">
            <van-card :title="item.name" :price="item.price + '元'" :thumb="thumbnailImage(item.carousel)" />
            <template #right-icon>
              <van-radio ref="checkboxes" checked-color="#FF0000" :name="item.id" />
            </template>
          </van-cell>
        </van-radio-group>
      </div>
    </div>
    <div class="submit-btn mt-1">
      <van-button round block type="info" native-type="submit" @click="redirectToForm">
        提交
      </van-button>
    </div>
  </div>
</template>
<script>
import { fetchCoupon } from '@/api/index'
import { fetchMerchant } from '@/api/information'
import { Cell, Card, Button, Checkbox, CheckboxGroup, RadioGroup, Radio, Toast } from 'vant'
export default {
  name: 'SelectProduct',
  components: {
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [Card.name]: Card,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [RadioGroup.name]: RadioGroup
  },
  data() {
    return {
      checkedProduct: null,
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
      this.product_component = 'MultipleProduct'
    },
    thumbnailImage(image) {
      let url = 'http://xxx.com'
      if (image !== undefined && image.length > 0) {
        url = image[0].url
      }
      return url
    },
    redirectToForm() {
      if (this.checkedProduct !== null) {
        this.$router.push({
          name: 'Form', params: { id: this.coupons.id },
          query: {
            coupon_id: this.coupons.id,
            product_id: this.checkedProduct,
            card_num: this.$route.query.card_num
          }
        })
      } else {
        Toast.fail('请选择礼品！')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.van-card {
  background: unset;
}
.container {
  margin: 13px 20px;
  .product-items-item {
    background: #FFFFFF;
    border-radius: 10px;
  }
}
.submit-btn {
  position: fixed;
  bottom: 5vh;
  width: 100%;
  button {
    margin: 0 auto;
    width: 200px;
  }
}
</style>
