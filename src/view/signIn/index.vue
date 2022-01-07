<template>
  <div class="container">
    <div class="merchant-info">
      <div v-if="false" class="merchant-info-img">
        <img v-if="false" :src="merchant.avatar" alt="">
      </div>
      <a>{{ merchant.merchant_name }}</a>
    </div>
    <van-row>
      <van-col span="24">
        <van-form class="login-form">
          <van-field v-model="postForm.code" name="code" label="卡号" placeholder="请输入卡号" :rules="[{ required: true }]" />
          <van-field v-model="postForm.password" type="password" name="Password" label="密码" placeholder="请输入密码" :rules="[{ required: true }]" />
        </van-form>
      </van-col>
    </van-row>
    <div class="submit">
      <van-button round block native-type="submit" @click="onSubmit">
        开始提货
      </van-button>
    </div>
  </div>
</template>

<script>
import { fetchMerchant, checkCard } from '@/api/index'
import {
  Field,
  Form,
  Toast,
  Col,
  Row,
  Button
} from 'vant'

export default {
  name: 'SignIn',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Form.name]: Form,
    [Col.name]: Col,
    [Row.name]: Row
  },
  data() {
    return {
      username: '',
      merchant: {},
      postForm: {
        code: '',
        password: ''
      }
    }
  },
  created() {
    this.username = this.$route.params.username
    this.getMerchant()
  },
  methods: {
    getMerchant() {
      fetchMerchant(this.username).then(res => {
        this.merchant = res.data
      })
    },
    onSubmit() {
      checkCard(this.merchant.id, this.postForm).then((res) => {
        this.$router.push({
          name: 'Coupon',
          params: { id: res.data.coupon_id },
          query: {
            card_num: this.postForm.code,
            password: this.postForm.password
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.merchant-info {
  margin: 40px 20px;
  display: flex;
  align-items: center;
  &-img {
    width: 70px;
    height: 70px;
    border-radius: 100px;
    margin-right: 10px;
    overflow: hidden;
    img {
      height: 70px;
    }
  }
  a {
    font-weight: bold;
  }
}
.login-form {
  margin: 20vh 20px 0;
  border-radius: 10px;
  overflow: hidden;
}
.submit {
  margin-top: 3rem;
  button {
    width: 200px;
    margin: 0 auto;
    color: #FFFFFF;
    background: linear-gradient(to right,#ff6034,#ee0a24);
  }
}
</style>
