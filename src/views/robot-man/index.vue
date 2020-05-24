<template>
<div class='robot-container'>
  <!-- 头部开始 -->
  <van-nav-bar
    class="articleHand"
    title="小智同学"
    left-arrow
    @click-left="$router.back()"
  />
  <van-cell title="单元格" right-icon class="bottomContent" >
    <van-button type="primary">发送</van-button>
  </van-cell>
</div>
</template>

<script>

export default {
  name: 'robotIndex',
  props: {},
  components: {},
  data () {
    return {
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
.articleHand {
  background-color: #3296fa;
  /deep/ .van-icon-arrow-left {
    color: white;
  }
  /deep/ .van-nav-bar__title {
    color: white;
  }
}
.bottomContent {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
