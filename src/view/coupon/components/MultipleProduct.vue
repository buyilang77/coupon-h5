<template>
  <div class="goods">
    <van-cell-group>
      <van-cell>
        <van-col span="5">活动名称</van-col>
        <van-col class="detail" span="16">{{ coupons.title }}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="5">有效期</van-col>
        <van-col class="detail" span="16">{{ coupons.start_time }} - {{ coupons.end_time }}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="5">客服电话</van-col>
        <van-col class="detail" span="16" @click="callPhone(coupons.services_phone)">{{ coupons.services_phone }}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="5">活动说明</van-col>
        <van-col class="detail" span="16">{{ coupons.activity_description }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-radio-group v-model="checkedProduct" icon-size="15px">
      <van-cell><van-col span="5">可选礼品</van-col></van-cell>
      <van-cell v-for="(item,index) in product" :key="index">
        <van-card :title="item.name" :desc="item.name" :price="item.price + '元'" :thumb="thumbnailImage(item.carousel)" />
        <template #right-icon>
          <van-radio ref="checkboxes" checked-color="#FF0000" :name="item.id" />
        </template>
      </van-cell>
    </van-radio-group>

    <van-cell-group>
      <van-cell>
        <h4 class="text-center">兑换须知</h4>
        <div class="notice">
          <p>1.提货卡上印制的提货码及密码，为唯一提货标识，提货密码为一次性使用，请在未提货前勿将涂层刮开。</p>
          <p>2.提货卡不兑现、不找零、遗失不补，敬请妥善保管。</p>
          <p>3.购卡时已经开具发票，提货时不提供发票。</p>
          <p>4.提货卡请在有效期内使用，逾期无法保证指定商品兑换有效性。</p>
          <p>5.全国大部分地区免费配送，新疆、西藏、内蒙古、青海、海南、宁夏、甘肃、香港、澳门、台湾等区域请联系商家确定是否配送。</p>
        </div>
      </van-cell>
    </van-cell-group>
    <van-goods-action>
      <van-goods-action-icon icon="home-o">首页</van-goods-action-icon>
      <van-goods-action-icon icon="service-o" @click="callPhone(contact)">客服</van-goods-action-icon>
      <van-goods-action-button type="danger" @click="redirectToForm">现在提货</van-goods-action-button>
    </van-goods-action>
  </div>
</template>
<script>
import {
  Tag,
  Col,
  Row,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Card,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Toast
} from 'vant'
export default {
  name: 'MultipleProduct',
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [CheckboxGroup.name]: CheckboxGroup,
    [Toast.name]: Toast
  },
  props: {
    coupons: {
      type: Object,
      default: () => {}
    },
    contact: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      checkedProduct: null,
      total_shipments: this.coupons.total_shipments,
      product: this.coupons.products
    }
  },
  methods: {
    callPhone(number) {
      window.location.href = 'tel://' + number
    },
    redirectToForm() {
      if (!this.checkedProduct) {
        Toast.fail('你还没有选择礼品~')
        return
      }
      this.$router.push({
        name: 'Form', params: { id: this.coupons.id },
        query: {
          coupon_id: this.coupons.id,
          product_id: this.checkedProduct
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

<style lang="less">
.goods {
  padding-bottom: 50px;
  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }
  .van-checkbox-group {
    background-color: #FFFFFF;
  }
  &__item {
    position: relative;
    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 10px 16px;
      box-sizing: border-box;
    }
    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }
    .van-card__price {
      color: #f44;
    }

  }
  .van-card {
    background-color: #FFFFFF;
  }
}
.description {
  padding: 0 16px 10px 16px;
  img {
    width: 100%;
    height: auto;
  }
}
.detail {
  color: #696767;
}
.notice {
  font-size: 13px;
}
</style>
