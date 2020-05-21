<template>
<div class='user-message'>
  <van-nav-bar
    class="articleHand"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
  />
  <input type="file" hidden ref="file" accept="image/*" @change="photoFile">
  <van-cell title="头像" is-link value="内容" center @click="$refs.file.click()">
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

  <!-- 头像弹窗开始 -->
  <van-popup v-model="IsPhotoShow" position="bottom" :style="{ height: '100%' }">
    <photo-index
      @close="IsPhotoShow = false"
      v-model="userMessage.photo"
      v-if="IsPhotoShow"
      :perviewPhoto="perviewPhoto"
      @updata-photo="userMessage.photo = $event"
    />
  </van-popup>
  <!-- 头像弹窗结束 -->

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
import PhotoIndex from './components/photo-content'
export default {
  name: 'UserMessage',
  props: {},
  components: {
    SexIndex,
    NickName,
    BrithdayIndex,
    PhotoIndex
  },
  data () {
    return {
      userMessage: {},
      IsSexShow: false, // 性别弹窗显示状态
      IsNickNameShow: false, // 昵称弹窗显示状态
      IsBrithdayShow: false, // 生日弹窗显示状态
      IsPhotoShow: false, // 头像弹窗显示状态
      perviewPhoto: '' // 需要预览的头像
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
    },
    photoFile () {
      // console.log(this.$refs.file.files[0])
      this.perviewPhoto = this.$refs.file.files[0]
      this.IsPhotoShow = true
      // 清空input的内容
      this.$refs.file.value = ''
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
