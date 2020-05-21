<template>
<div class='comment-publish'>
  <van-nav-bar
    title="0条回复"
    @click-left="$router.back()"
  >
    <template #left>
      <van-icon name="cross" size="18" />
    </template>
  </van-nav-bar>
  <comment-item />
</div>
</template>

<script>
import CommentItem from './articleComment-item'
export default {
  name: 'CommentPublish',
  props: {},
  components: {},
  data () {
    return {
      CommentItem
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
