<template>
  <div class='layout-container'>
    <router-view/>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'layoutIndex',
  props: {},
  components: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
