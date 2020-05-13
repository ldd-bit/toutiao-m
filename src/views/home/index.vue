<template>
<div class='home-container'>
  <van-nav-bar class="app-nav-bar">
    <van-button type="danger" slot="title" class="searchInfo" icon="search" round>搜索</van-button>
  </van-nav-bar>
  <van-tabs v-model="active">
    <van-tab :title="item.name" v-for="item in channels" :key="item.id">
      <article-list :channel="item" class="fixed"></article-list>
    </van-tab>
  </van-tabs>
</div>
</template>

<script>
import { getchannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  props: {},
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    async getUserChannel () {
      const { data } = await getchannels()
      // console.log(data)
      this.channels = data.data.channels
    }
  },
  created () {
    this.getUserChannel()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.home-container {
  .app-nav-bar {
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
  .fixed {
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }
  /deep/ .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tabs__line {
    width: 15px !important;
    height: 3px;
    margin-bottom: 5px;
    background-color: #3296fa;
  }
}
</style>
