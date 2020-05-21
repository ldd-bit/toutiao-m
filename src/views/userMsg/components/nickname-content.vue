<template>
<div class='nickName-container'>
  <van-nav-bar
    class="articleHand"
    title="修改昵称"
    right-text="确认"
    left-arrow
    @click-left="$emit('close')"
    @click-right="changeNick"
  />
  <div class="input">
    <van-field
    v-model="message"
    autosize
    type="textarea"
    maxlength="12"
    placeholder="请输入昵称"
    show-word-limit
  />
  </div>
</div>
</template>

<script>
import { editUserInfo } from '@/api/user'
export default {
  name: 'NickNameIndex',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      message: this.value
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    async changeNick () {
      await editUserInfo({
        name: this.message
      })
      this.$emit('input', this.message)
      this.$emit('close')
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.nickName-container {
  background-color: rgb(245, 247, 249);
  height: 100%;
  .articleHand {
    background-color: #3296fa;
    /deep/ .van-icon-arrow-left {
      color: white;
    }
    /deep/ .van-nav-bar__title {
      color: white;
    }
    /deep/ .van-nav-bar__text {
      color: white;
    }
  }
  .input {
    margin: 14px;
  }
}

</style>
