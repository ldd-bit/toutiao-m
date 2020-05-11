<template>
<div class='my-container'>
  <van-cell-group>
    <van-cell title="单元格" value="内容">
      <van-image
        width="40px"
        height="40px"
        fit="cover"
        slot="icon"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div slot="title">昵称</div>
      <div>编辑资料</div>
    </van-cell>
  </van-cell-group>
  <van-grid>
    <van-grid-item icon="photo-o" text="头条" />
    <van-grid-item icon="photo-o" text="关注" />
    <van-grid-item icon="photo-o" text="粉丝" />
    <van-grid-item icon="photo-o" text="获赞" />
  </van-grid>
  <van-grid :column-num="2">
    <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" />
    <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" />
  </van-grid>
  <van-cell title="消息通知" is-link />
  <van-cell title="小智同学" is-link />
  <van-cell title="退出登录"/>
</div>
</template>

<script>

export default {
  name: 'MyIndex',
  props: {},
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
