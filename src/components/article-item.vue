<template>
<div class='article-item'>
  <van-cell>
    <div slot="title" class="articleTitle van-multi-ellipsis--l3">{{articleItem.title}}</div>
    <div slot="label" class="articleLabel">
      <div v-if="articleItem.cover.images.length === 3" class="image3">
        <van-image
          v-for="(item,i) in articleItem.cover.images"
          :key="i"
          class="articleImage3"
          fit="cover"
          :src="item"
        />
      </div>
      <div>
        <span>{{articleItem.aut_name}}</span>
        <span>{{articleItem.comm_count}}评论</span>
        <span>{{articleItem.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
      v-if="articleItem.cover.images.length === 1"
      class="articleImage"
      fit="cover"
      :src="articleItem.cover.images[0]"
    />
  </van-cell>
</div>
</template>

<script>
export default {
  name: 'articleItem',
  props: {
    articleItem: {
      type: Object,
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
.article-item {
  .articleTitle {
    font-size: 16px;
    margin-bottom: 7px;
  }
  /deep/ .van-cell__value {
    flex: unset;
    margin-left: 11px;
    .articleImage {
      width: 116px;
      height: 73px;
    }
  }
  .articleLabel {
    font-size: 11px;
    span:nth-child(2),
    span:nth-child(3) {
      margin-left: 8px;
    }
    .image3 {
      display: flex;
      margin-bottom: 7px;
      .articleImage3 {
        flex: 1;
        height: 73px;
      }
      .articleImage3:nth-child(1),
      .articleImage3:nth-child(2) {
        margin-right: 3px;
      }
    }
  }
}
</style>
