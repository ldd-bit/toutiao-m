<template>
<div class='my-container'>
  <van-cell-group class="bgcImage">
    <van-cell title="单元格" value="内容" center class="perInfo" :border="false">
      <van-image
        class="imgInfo"
        fit="cover"
        slot="icon"
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div slot="title" class="nickName">昵称</div>
      <van-button
        class="changeInfo"
        type="default"
        size="small"
        round
      >
        编辑资料
      </van-button>
    </van-cell>
    <van-grid class="countMsg" :border="false">
      <van-grid-item class="countCenter">
        <span class="count">123</span>
        <span class="text">头条</span>
      </van-grid-item>
      <van-grid-item class="countCenter">
        <span class="count">123</span>
        <span class="text">粉丝</span>
      </van-grid-item>
      <van-grid-item class="countCenter">
        <span class="count">123</span>
        <span class="text">关注</span>
      </van-grid-item>
      <van-grid-item class="countCenter">
        <span class="count">123</span>
        <span class="text">获赞</span>
      </van-grid-item>
    </van-grid>
  </van-cell-group>
  <van-grid :column-num="2" class="marBotttom4px">
    <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" />
    <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" />
  </van-grid>
  <van-cell title="消息通知" is-link />
  <van-cell title="小智同学" is-link class="marBotttom4px"/>
  <van-cell title="退出登录" class="titleCenter"/>
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
.my-container {
  .bgcImage {
    background-image: url(./banner.png);
    background-size: cover;
    .perInfo {
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      background-color: unset;
      .imgInfo {
        width: 66px;
        height: 66px;
        margin-right: 11px;
      }
      .nickName {
        font-size: 15px;
        color: white;
      }
      .changeInfo {
        font-size: 10px;
        height: 16px;
        .van-button__text {
          color: #666666;
        }
      }
    }
    .countMsg {
      height: 65px;
      .countCenter {
        /deep/ .van-grid-item__content {
          background-color: unset;
          color: white;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
  }
  .marBotttom4px {
    margin-bottom: 4px;
    /deep/ .toutiao-lishi {
      color: #ff9d1d;
      font-size: 22px;
    }
    /deep/ .van-grid-item__text {
      font-size: 14px;
      color: #000;
    }
    /deep/ .toutiao-shoucang {
      color: #eb5253;
      font-size: 22px;
    }
  }
  .van-cell__title {
    font-size: 15px;
  }
  .titleCenter {
    .van-cell__title {
      color: #d86262;
      font-size: 15px;
      text-align: center;
    }
  }
}
</style>
