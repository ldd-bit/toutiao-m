<template>
<div class='login-container'>
  <van-nav-bar
    class="app-nav-bar"
    title="登录"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-form
    @submit="onLogin"
    :show-error="false"
    :show-error-message="false"
    @failed="onfailed"
  >
    <van-field
      v-model="user.mobile"
      icon-prefix="toutiao"
      left-icon="shouji"
      placeholder="  请输入手机号"
      :rules="rules.mobile"
    />
    <van-field
      v-model="user.code"
      icon-prefix="toutiao"
      left-icon="yanzhengma"
      placeholder="  请输入验证码"
      :rules="rules.code"
    >
      <template #button>
        <van-button size="small" round class="send-code">发送验证码</van-button>
      </template>
    </van-field>
    <div class="login-btn">
      <van-button type="info" block class="login-btn-wrap">登录</van-button>
    </div>
  </van-form>
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
      },
      rules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
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
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(this.user)
        this.$toast.success('登陆成功')
        console.log(res)
      } catch (err) {
        this.$toast.fail('登陆失败')
        console.log(err)
      }
    },
    onfailed (err) {
      console.log(err)
      this.$toast.fail(err.errors[0].message)
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
