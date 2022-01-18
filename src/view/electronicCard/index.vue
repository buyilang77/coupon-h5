<template>
  <div>
    <div class="container">
      <div v-if="Object.keys(coupon_item).length" class="electronic-card" :style="{backgroundImage:'url(' + coupon_item.electronic_card.image + ')'}">
        <div class="from"><span>来自: </span>{{ coupon_item.electronic_card.from }}</div>
        <div class="description">{{ coupon_item.electronic_card.description }}</div>
        <div class="card-info">
          <div class="card-info-item">卡号: {{ coupon_item.code }}</div>
          <div class="card-info-item">密码: {{ coupon_item.password }}</div>
        </div>
      </div>
    </div>
    <div class="submit-btn mt-1">
      <van-button round block type="info" native-type="submit" @click="redirectToForm">
        领取
      </van-button>
    </div>
  </div>
</template>
<script>
import { fetchCoupon, checkCard } from '@/api/index'
import { fetchMerchant } from '@/api/information'
import { Cell, Card, Button, Checkbox, CheckboxGroup, RadioGroup, Radio } from 'vant'
export default {
  name: 'ElectronicCard',
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
      coupons: {},
      coupon_item: {}
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
        checkCard(this.coupons.merchant.id, {
          code: this.$route.query.card_num,
          password: this.$route.query.password
        }).then((res) => {
          this.coupon_item = res.data
        })
      })
    },
    redirectToForm() {
      this.$router.push({
        name: 'Coupon', params: { id: this.coupons.id },
        query: {
          coupon_id: this.coupons.id,
          card_num: this.$route.query.card_num,
          password: this.$route.query.password
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  background-color: #363636 !important;
}
.van-card {
  background: unset;
}
.container {
  margin: 13px 20px;
  .electronic-card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 10pt;
    margin-top: 20vh;
    height: 220px;
    border-radius: 10px;
    background-repeat: no-repeat;
    background-size: 100%;
    .from {
      color: #FFFFFF;
      padding: 20px 20px;
    }
    .description {
      color: #FFFFFF;
      padding: 10px 40px;
    }
    .card-info {
      color: #ff730e;
      display: flex;
      margin: 0 20px 0 auto;
      &-item {
        &:last-child {
          margin-left: 10px;
        }
      }
    }
    span {
      color: #ecbbb3
    }
  }
}
.submit-btn {
  position: fixed;
  bottom: 5vh;
  width: 100%;
  button {
    margin: 0 auto;
    width: 65px;
    height: 65px;
  }
}
</style>
