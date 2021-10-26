<template>
  <div class="container">
    <h4 class="text-center">填写提货信息</h4>
    <van-form @submit="onSubmit">
      <van-field v-model="postForm.code" name="用户名" placeholder="请填写卡号" :rules="[{ required: true }]" />
      <van-field v-model="postForm.password" name="密码" placeholder="请填写提货密码" :rules="[{ required: true }]" />
      <div class="mt-1">
        <van-field v-model="postForm.consignee" name="收货人" label="收货人" placeholder="请填写收货人" :rules="[{ required: true }]" />
        <van-field v-model="postForm.phone" name="手机号" label="手机号" placeholder="请填写手机号" :rules="[{ required: true }]" />
        <van-cell is-link @click="showPopup">
          <van-col span="7">选择地区</van-col>
          <van-col>{{ formatRegion() }}</van-col>
        </van-cell>
        <van-popup v-model="show" round position="bottom">
          <van-area :value="area" :area-list="areaList" name="选择城市" @change="onChange" @confirm="onConfirm" @cancel="onCancel" />
        </van-popup>
        <van-field v-model="postForm.address" name="收货地址" label="收货地址" placeholder="收货地址" :rules="[{ required: true }]" />
        <div class="remark">
          <h5>备注</h5>
          <van-field v-model="postForm.remark" name="用户名" placeholder="" type="textarea" maxlength="50" show-word-limit />
        </div>
      </div>
      <div class="mt-1">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { regionList } from '@/vendor/Area'
import { createOrder } from '@/api/order'
import { Area, Button, Cell, Col, Field, Form, Popup, Toast } from 'vant'

const defaultForm = {
  coupon_id: null,
  code: null,
  consignee: null,
  phone: null,
  region: [],
  product_id: null,
  address: null,
  remark: null,
  password: null
}
export default {
  name: 'From',
  components: {
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Col.name]: Col,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Area.name]: Area
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      show: false,
      tempRegion: [],
      area: '',
      areaList: {}
    }
  },
  created() {
    this.areaList = regionList()
    this.postForm.coupon_id = this.$route.query.coupon_id
    this.postForm.product_id = this.$route.query.product_id
  },
  methods: {
    onSubmit() {
      this.postForm.region = this.tempRegion.map((item) => {
        return item.code
      })
      createOrder(this.postForm).then(response => {
        Toast.success(response.message)
        this.$router.go(-1)
      })
    },
    showPopup() {
      this.show = true
    },
    onChange(picker, value) {
      this.tempRegion = value
    },
    onConfirm() {
      this.show = false
    },
    onCancel() {
      this.show = false
    },
    formatRegion() {
      if (this.tempRegion.length <= 0) {
        return
      }
      const region = this.tempRegion.map((item) => {
        return item.name
      })
      return region.join(' / ')
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 1rem;
  }
</style>
