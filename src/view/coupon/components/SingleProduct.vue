<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="(item,index) in product.carousel" :key="index">
        <img :src="item.url" alt="">
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ product.name }}</div>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell>
        <van-col class="goods-price" span="12">{{ '¥' + product.price }}</van-col>
        <van-col class="goods-total text-right" span="12">
          <small>已送{{ total_shipments }}份</small>
        </van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="商品详情" />
      <div class="description" v-html="product.description" />
    </van-cell-group>

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
      <van-goods-action-icon icon="service-o" @click="callPhone">客服</van-goods-action-icon>
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
  GoodsActionButton
} from 'vant'
export default {
  name: 'SingleProduct',
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
    [GoodsActionButton.name]: GoodsActionButton
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
      total_shipments: this.coupons.total_shipments,
      product: this.coupons.products[0] ?? null
    }
  },
  methods: {
    callPhone() {
      window.location.href = 'tel://' + this.contact
    },
    redirectToForm() {
      this.$router.push({
        name: 'Form', params: { id: this.coupons.id },
        query: {
          coupon_id: JSON.stringify(this.coupons.id),
          products: JSON.stringify([this.product.id])
        }
      })
    }
  }
}
</script>

<style lang="less">
  .goods {
        padding-bottom: 50px;

        &-swipe {
            img {
                width: 100%;
                display: block;
            }
        }

        &-title {
            font-weight: bold;
        }

        &-price {
            color: #f44;
            font-size: 18px;
            text-decoration:line-through;
        }

        &-express {
            color: #999;
            font-size: 12px;
            padding: 5px 15px;
        }

        &-cell-group {
            margin: 15px 0;

            .van-cell__value {
                color: #999;
            }
        }

        &-tag {
            margin-left: 5px;
        }
    }
  .description {
    padding: 0 16px 10px 16px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .notice {
    font-size: 13px;
  }
</style>
