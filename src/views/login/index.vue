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
    ref="countDown"
    validate-first
  >
    <van-field
      v-model="user.mobile"
      icon-prefix="toutiao"
      left-icon="shouji"
      name="mobile"
      placeholder="  请输入手机号"
      :rules="rules.mobile"
    />
    <van-field
      v-model="user.code"
      icon-prefix="toutiao"
      left-icon="yanzhengma"
      name="code"
      placeholder="  请输入验证码"
      :rules="rules.code"
    >
      <template #button>
        <van-count-down :time="time" format="ss s" v-if="isShow" @finish="isShow=false"/>
        <van-button size="small" round class="send-code" @click.prevent="Start" v-else :loading="isLoading">发送验证码</van-button>
      </template>
    </van-field>
    <div class="login-btn">
      <van-button type="info" block class="login-btn-wrap">登录</van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import { login, getCode } from '@/api/user'
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
      // 验证规则
      rules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      time: 60 * 1000,
      isShow: false,
      isLoading: false
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
        // 返回上一页
        this.$router.back()
        // 登陆成功向vuex中保存token
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登陆成功')
        console.log(res)
      } catch (err) {
        this.$toast.fail('登陆失败')
        console.log(err)
      }
    },
    // 验证失败时
    onfailed (err) {
      console.log(err)
      this.$toast({
        message: err.errors[0].message,
        position: 'top'
      })
    },
    // 发送验证码时
    async Start () {
      // this.isShow = true
      try {
        await this.$refs.countDown.validate('mobile')
        const res = await getCode(this.user.mobile)
        // 发送验证码后开启倒计时
        this.isLoading = true
        this.isShow = true
        console.log(res)
        // console.log(res)
      } catch (err) {
        if (err && err.response && err.response.status === 429) {
          // console.log(111)
          this.$toast({
            message: '获取验证码太频繁,请稍后重试',
            position: 'top'
          })
        } else if (err && err.name === 'mobile') {
          this.$toast({
            message: err.message,
            position: 'top'
          })
        }
      }
      this.isLoading = false
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
  height: 24px;
  background-color: #ededed;
  border: 0 none;
  .van-button__text {
    color: #666666;
    font-size: 11px;
  }
}
.send-code {
  display: flex;
  align-self: center;
}
</style>
