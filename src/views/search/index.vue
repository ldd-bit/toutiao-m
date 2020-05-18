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
  <search-history v-else :history="history" @deleteAll="deleteHistoryAll" @onSearch="onSearch"/>
</div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchAssociate from './components/search-associate'
import { mapState } from 'vuex'
import { deleteSearchHistory } from '@/api/article'
import { getToken } from '@/utils/storage'
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
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  // 方法集合
  methods: {
    async onSearch (val) {
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
      // setToken('search-history', this.history)
    },
    async loadHistory () {
      const searchHistory = getToken('search-history') || []
      // if (this.user) {
      //   const { data } = await getSearchHistory()
      //   searchHistory = Array.from(new Set([...searchHistory, ...data.data.keywords]))
      // }
      this.history = searchHistory
      // setToken('search-history', searchHistory)
      // // console.log(searchHistory)
    },
    // 删除所有的历史记录
    async deleteHistoryAll (data) {
      // 如果登陆的话就把登录的历史记录都删除
      if (this.user) {
        await deleteSearchHistory()
      }
      this.history = data
    }
  },
  created () {
    this.loadHistory()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.van-search__action {
  color: white;
}
</style>
