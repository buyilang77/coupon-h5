<template>
  <div class="goods">
    <div class="header-title text-center">礼品券卡信息</div>
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="(item,index) in product[0].carousel" :key="index">
        <img :src="item.url" alt="">
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell v-if="card_num">
        <van-col span="7">提货编码</van-col>
        <van-col class="detail" span="16">{{ card_num }}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="7">活动名称</van-col>
        <van-col class="detail" span="16">{{ coupons.title }}</van-col>
      </van-cell>
      <van-cell v-if="card_num">
        <van-col span="7">券卡面值</van-col>
        <van-col class="detail" span="16">{{ coupons.original_price }} 元</van-col>
      </van-cell>
      <van-cell v-if="card_num">
        <van-col span="7">券卡状态</van-col>
        <van-col class="detail" span="16">卡券为真, {{ coupon_item.open_status | openStatusFilter }}, {{ coupon_item.redemption_status | redemptionStatusFilter }}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="7">开始有效期</van-col>
        <van-col class="detail" span="16">{{ coupons.start_time }}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="7">结束有效期</van-col>
        <van-col class="detail" span="16">{{ coupons.end_time }}</van-col>
      </van-cell>
      <van-cell>
        <van-col span="7">客服电话</van-col>
        <van-col class="detail" span="16" @click="callPhone(coupons.services_phone || contact)">{{ coupons.services_phone || contact }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group v-if="coupons.activity_description" class="goods-cell-group">
      <van-cell title="活动说明" />
      <div class="description" v-html="coupons.activity_description" />
    </van-cell-group>

    <van-goods-action>
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
import { fetchCouponItem } from '@/api/index'
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
  filters: {
    openStatusFilter(status) {
      const statusMap = {
        0: '未开启',
        1: '已开启'
      }
      return statusMap[status]
    },
    redemptionStatusFilter(status) {
      const statusMap = {
        0: '未兑换',
        1: '已兑换'
      }
      return statusMap[status]
    }
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
      coupon_item: {},
      card_num: null,
      checkedProduct: null,
      total_shipments: this.coupons.total_shipments,
      product: this.coupons.products
    }
  },
  created() {
    this.card_num = this.$route.query.card_num
    if (this.card_num) {
      fetchCouponItem({
        coupon_id: this.coupons.id,
        code: this.card_num
      }).then(res => {
        this.coupon_item = res.data
      })
    }
  },
  methods: {
    callPhone(phone) {
      console.log(phone)
      window.location.href = 'tel://' + phone
    },
    redirectToForm() {
      this.$router.push({ name: 'SelectProduct', params: { id: this.coupons.id }, query: {
        card_num: this.card_num,
        password: this.$route.query.password
      }})
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
@media only screen and (min-width: 1230px) {
  .goods {
    width:750px;
  }
}
.goods {
  .header-title {
    padding: .6rem 0;
    color: #FFFFFF;
    font-size: 10pt;
    background: linear-gradient(to right,#ff6034,#ee0a24);
  }
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
