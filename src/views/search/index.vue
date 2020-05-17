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
  <search-associate v-else-if="articleText" :articleText="articleText" @item="fn($event)"/>
  <search-history v-else/>
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
      isSearch: false
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    onSearch (val) {
      this.isSearch = true
    },
    // 接收到联想建议传来的数据
    fn (item) {
      this.articleText = item
      this.isSearch = true
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
