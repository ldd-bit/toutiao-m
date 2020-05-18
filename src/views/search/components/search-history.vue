<template>
<div class='search-history'>
  <van-cell-group>
    <van-cell title="历史记录">
      <van-icon name="delete" />
    </van-cell>
    <van-cell :title="item" v-for="(item,i) in history" :key="i">
      <van-icon name="close" />
    </van-cell>
  </van-cell-group>
</div>
</template>

<script>

export default {
  name: 'searchHistory',
  props: {
    history: {
      type: Array,
      required: true
    }
  },
  components: {},
  data () {
    return {
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
</style>
