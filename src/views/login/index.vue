<template>
<div class='login-container'>
  <van-nav-bar
    class="app-nav-bar"
    title="登录"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-cell-group>
    <van-field
      v-model="user.mobile"
      icon-prefix="toutiao"
      left-icon="shouji"
      placeholder="  请输入手机号"
    />
    <van-field
      v-model="user.code"
      icon-prefix="toutiao"
      left-icon="yanzhengma"
      placeholder="  请输入验证码"
    >
      <template #button>
        <van-button size="small" round class="send-code">发送验证码</van-button>
      </template>
    </van-field>
    <div class="login-btn">
      <van-button @click="onLogin" type="info" block class="login-btn-wrap">登录</van-button>
    </div>
  </van-cell-group>
</div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  props: {},
  components: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    onClickLeft () {},
    // 登录
    async onLogin () {
      try {
        const res = await login(this.user)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.login-btn {
  margin: 26px 16px 26px 16px;
  .login-btn-wrap {
    border-radius: 5px;
    border: 0 none;
    .van-button__text {
      font-size: 15px;
    }
  }
}
.send-code {
  width: 76px;
  height: 23px;
  background-color: #ededed;
  border: 0 none;
  .van-button__text {
    color: #666666;
    font-size: 11px;
  }
}
</style>
