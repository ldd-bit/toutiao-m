<template>
<div class='home-container'>
  <van-nav-bar class="app-nav-bar">
    <van-button type="danger" slot="title" class="searchInfo" icon="search" round>搜索</van-button>
  </van-nav-bar>
  <van-tabs v-model="active">
    <van-tab :title="item.name" v-for="item in channels" :key="item.id">
      <article-list></article-list>
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
      console.log(data)
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
