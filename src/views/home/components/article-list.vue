<template>
<div class='article-list'>
  <van-pull-refresh
    v-model="isPullLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,i) in artlcleList" :key="i" :title="item.title" />
    </van-list>
  </van-pull-refresh>
</div>
</template>

<script>
import { getArticleList } from '@/api/article'
export default {
  name: 'articleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {},
  data () {
    return {
      artlcleList: [], // 文章列表
      loading: false, // 加载状态
      finished: false, // 加载完成
      timestamp: null, // 时间戳
      isPullLoading: false // 下拉刷新状态
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    // 上拉加载获取文章列表
    async onLoad () {
      // 1. 请求接口获取当前频道的文章
      const { data } = await getArticleList({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      console.log(data)
      // 2. 将遍历到的文章添加到数组
      this.artlcleList.push(...data.data.results)
      // 3. 加载状态结束
      this.loading = false
      // 4. 数据加载完成
      if (data.data.results.length) {
        // 将时间戳保存到timestamp中
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    // 下拉刷新获取文章列表
    async onRefresh () {
      const { data } = await getArticleList({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      this.artlcleList.unshift(...data.data.results)
      this.isPullLoading = false
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
