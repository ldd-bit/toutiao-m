<template>
<div class='user-message'>
  <van-nav-bar
    class="articleHand"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
  />
  <van-cell title="头像" is-link value="内容" center >
    <van-image
      width="34px"
      height="34px"
      fit="cover"
      round
      :src="userMessage.photo"
    />
  </van-cell>
  <van-cell title="昵称" @click="IsNickNameShow = true" is-link :value="userMessage.name" />
  <van-cell title="性别" @click="IsSexShow = true" is-link :value="userMessage.gender===0?'男':'女'" />
  <van-cell title="生日" @click="IsBrithdayShow = true" is-link :value="userMessage.birthday" />

  <!-- 昵称弹窗开始 -->
  <van-popup v-model="IsNickNameShow" position="bottom" :style="{ height: '100%' }">
    <nick-name @close="IsNickNameShow = false" v-model="userMessage.name" v-if="IsNickNameShow"/>
  </van-popup>
  <!-- 昵称弹窗结束 -->

  <!-- 性别弹窗开始 -->
  <van-popup v-model="IsSexShow" position="bottom" >
    <sex-index @close="IsSexShow = false" v-model="userMessage.gender" v-if="IsSexShow" />
  </van-popup>
  <!-- 性别弹窗结束 -->

  <!-- 生日弹窗开始 -->
  <van-popup v-model="IsBrithdayShow" position="bottom" >
    <brithday-index @close="IsBrithdayShow = false" v-model="userMessage.birthday" v-if="IsBrithdayShow" />
  </van-popup>
  <!-- 生日弹窗结束 -->
</div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import SexIndex from './components/sex-content'
import NickName from './components/nickname-content'
import BrithdayIndex from './components/brithday-content'
export default {
  name: 'UserMessage',
  props: {},
  components: {
    SexIndex,
    NickName,
    BrithdayIndex
  },
  data () {
    return {
      userMessage: {},
      IsSexShow: false, // 性别弹窗显示状态
      IsNickNameShow: false, // 昵称弹窗显示状态
      IsBrithdayShow: false
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      console.log(data)
      this.userMessage = data.data
    }
  },
  created () {
    this.loadUserInfo()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.articleHand {
  background-color: #3296fa;
  /deep/ .van-icon-arrow-left {
    color: white;
  }
  /deep/ .van-nav-bar__title {
    color: white;
  }
}
</style>
