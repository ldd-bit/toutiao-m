<template>
<div class='search-result'>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
  </van-list>
</div>
</template>

<script>
import { getSearchResult } from '@/api/article'
export default {
  name: 'searchResult',
  props: {
    articleText: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.articleText
      })
      // console.log(data)
      this.list.push(...data.data.results)
      // for (let i = 0; i < 10; i++) {
      //   this.list.push(this.list.length + 1)
      // }
      // // 加载状态结束
      this.loading = false

      // // 数据全部加载完成
      if (data.data.results) {
        this.page += 1
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
.search-result {
  position: fixed;
  top: 54px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>
