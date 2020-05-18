<template>
<div class='search-container'>
  <van-search
    v-model="articleText"
    shape="round"
    show-action
    background= "rgb(50, 150, 250)"
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="$router.back()"
    @focus="isSearch=false"
  />
  <search-result v-if="isSearch" :articleText="articleText"/>
  <search-associate v-else-if="articleText" :articleText="articleText" @item="onSearch($event)"/>
  <search-history v-else :history="history"/>
</div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchAssociate from './components/search-associate'
export default {
  name: 'searchIndex',
  props: {},
  components: {
    SearchHistory,
    SearchResult,
    SearchAssociate
  },
  data () {
    return {
      articleText: '',
      isSearch: false,
      history: []
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    onSearch (val) {
      this.articleText = val
      this.isSearch = true
      // 数组去重
      const index = this.history.indexOf(val)
      if (index === -1) {
        this.history.unshift(val)
      } else {
        this.history.splice(index, 1)
        this.history.unshift(val)
      }
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.van-search__action {
  color: white;
}
</style>
