<template>
<div class='comment-list'>
  <div class="commentTitle">全部评论</div>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="(item,i) in commentList" :key="i" :title="item.content" />
  </van-list>
</div>
</template>

<script>
import { articleComment } from '@/api/article'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {},
  data () {
    return {
      commentList: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      total_count: 0
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    async onLoad () {
      // 异步更新数据
      // 获取文章评论数据
      const { data } = await articleComment({
        type: 'a',
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit
      })
      console.log(data)
      this.commentList.push(...data.data.results)
      this.total_count = data.data.total_count
      // // 加载状态结束
      this.loading = false
      // // 数据全部加载完成
      if (data.data.results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.commentTitle {
  font-size: 18px;
  padding: 20px 14px;
}
</style>
