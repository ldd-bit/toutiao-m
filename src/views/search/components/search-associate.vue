<template>
<div class='search-associate'>
  <van-cell-group>
    <van-cell icon="search" v-for="(item,index) in associate" :key="index" @click="$emit('item', item)">
      <div slot="title" v-html="heightLight(item)"></div>
    </van-cell>
  </van-cell-group>
</div>
</template>

<script>
import { getSuggestion } from '@/api/article'
import { debounce } from 'lodash'
export default {
  name: 'searchAssociate',
  props: {
    articleText: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      associate: []
    }
  },
  computed: {},
  watch: {
    articleText: {
      handler: debounce(async function () {
        const { data } = await getSuggestion({
          q: this.articleText
        })
        this.associate = data.data.options
        // console.log(this)
      }, 200),
      immediate: true
    }
  },
  // 方法集合
  methods: {
    // 高亮
    heightLight (str) {
      return str.replace(new RegExp(this.articleText, 'gi'), `<span style="color: red">${this.articleText}</span>`)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
