<template>
  <div>
    <van-form @submit="onSubmit">
      <div class="mt-1">
        <h4 class="form-info">可提货门店</h4>
        <van-field
          readonly
          clickable
          name="picker"
          left-icon="location-o"
          :value="store"
          :rules="[{ required: true }]"
          placeholder="点击选择门店"
          @click="showPickerStore = true"
        />
        <van-popup v-model="showPickerStore" position="bottom">
          <van-picker
            show-toolbar
            values="2"
            :columns="coupons.stores_array"
            @confirm="onConfirmStore"
            @cancel="showPickerStore = false"
          />
        </van-popup>
      </div>
      <div class="mt-1">
        <h4 class="form-info">填写信息</h4>
        <van-field v-model="postForm.code" name="卡号" label="卡号" placeholder="请填写卡号" :rules="[{ required: true }]" />
        <van-field v-model="postForm.password" name="密码" label="密码" placeholder="请填写提货密码" :rules="[{ required: true }]" />
        <van-field v-model="postForm.consignee" name="提货人" label="收货人" placeholder="请填写提货人" :rules="[{ required: true }]" />
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="postForm.appointment_time"
          label="提货日期"
          placeholder="点击选择提货日期"
          :rules="[{ required: true }]"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker
            type="date"
            :min-date="minDate"
            @confirm="onConfirmDate"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field v-model="postForm.phone" name="手机号" label="手机号" placeholder="请填写手机号" :rules="[{ required: true }]" />
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
import { Area, Button, Cell, Col, Field, Form, Image as VanImage, Popup, Tab, Tabs, Icon, Toast, Picker, DatetimePicker } from 'vant'
import { createOrder } from '@/api/order'
import dayjs from 'dayjs'
import { CodeToText } from 'element-china-area-data/dist/app'
const defaultForm = {
  store_id: null,
  coupon_id: null,
  code: null,
  consignee: null,
  appointment_time: null,
  phone: null,
  region: [],
  product_id: null,
  address: null,
  remark: null,
  type: 'self_collection',
  password: null
}
export default {
  name: 'SelfCollection',
  components: {
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Col.name]: Col,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [VanImage.name]: VanImage,
    [Tab.name]: VanImage,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [Area.name]: Area,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker
  },
  props: {
    coupons: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      CodeToText,
      showPickerStore: false,
      minDate: new Date(),
      show: false,
      showPicker: false,
      stores: [],
      store: '',
      postForm: Object.assign({}, defaultForm)
    }
  },
  created() {
    this.postForm.coupon_id = this.$route.query.coupon_id
    this.postForm.product_id = this.$route.query.product_id
    this.stores = this.coupons.stores
  },
  methods: {
    onSubmit() {
      createOrder(this.postForm).then(response => {
        Toast.success(response.message)
        this.$router.push({ name: 'Coupon', params: { id: this.postForm.coupon_id }})
      })
    },
    onConfirmDate(time) {
      this.postForm.appointment_time = dayjs(time).format('YYYY-MM-DD')
      this.showPicker = false
    },
    onConfirmStore(value, index) {
      const currentStore = this.coupons.stores[index].region
      this.store = CodeToText[currentStore[0]] + CodeToText[currentStore[1]] + CodeToText[currentStore[2]] + ',' + this.coupons.stores[index].address
      this.postForm.store_id = this.coupons.stores[index].id
      this.showPickerStore = false
    }
  }
}
</script>

<style lang="scss" scoped>
.form-info {
  padding: 10px 13px;
  margin: 0;
  background-color: #FFFFFF;
  border-bottom: 1px solid #ebedf0;
}
.store {
  background-color: #FFFFFF;
  padding: 10px 13px;
}
</style>
