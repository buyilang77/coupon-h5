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
          coupon_id: this.coupons.id,
          product_id: this.product.id
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
