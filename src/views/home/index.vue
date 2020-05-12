<template>
<div class='home-container'>
  <van-nav-bar class="app-nav-bar">
    <van-button type="danger" slot="title" class="searchInfo" icon="search" round>搜索</van-button>
  </van-nav-bar>
  <van-tabs v-model="active">
    <van-tab title="标签 1">内容 1</van-tab>
    <van-tab title="标签 2">内容 2</van-tab>
    <van-tab title="标签 3">内容 3</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
    <van-tab title="标签 4">内容 5</van-tab>
    <van-tab title="标签 4">内容 6</van-tab>
    <van-tab title="标签 4">内容 7</van-tab>
    <van-tab title="标签 4">内容 8</van-tab>
  </van-tabs>
</div>
</template>

<script>

export default {
  name: 'HomeIndex',
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
.home-container {
  /deep/ .van-nav-bar__title{
    max-width: unset;
    .searchInfo {
      width: 277px;
      height: 32px;
      background-color: #5babfb;
      border: 0 none;
    }
  }
}
</style>
