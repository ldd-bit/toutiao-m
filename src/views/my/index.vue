<template>
<div class='my-container'>
  <van-cell-group class="bgcImage" v-if="user">
    <van-cell center class="perInfo" :border="false">
      <van-image
        class="imgInfo"
        fit="cover"
        slot="icon"
        round
        :src="currentInfo.photo"
      />
      <div slot="title" class="nickName">{{ currentInfo.name }}</div>
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
        <span class="count">{{ currentInfo.art_count }}</span>
        <span class="text">头条</span>
      </van-grid-item>
      <van-grid-item class="countCenter">
        <span class="count">{{ currentInfo.fans_count }}</span>
        <span class="text">粉丝</span>
      </van-grid-item>
      <van-grid-item class="countCenter">
        <span class="count">{{ currentInfo.follow_count }}</span>
        <span class="text">关注</span>
      </van-grid-item>
      <van-grid-item class="countCenter">
        <span class="count">{{ currentInfo.like_count }}</span>
        <span class="text">获赞</span>
      </van-grid-item>
    </van-grid>
  </van-cell-group>
  <van-cell-group class="bgcImage noLogin" center v-else>
    <!-- <van-cell center class="perInfo" :border="false"> -->
      <div class="imgNotInfo" @click="$router.push('/login')">
      </div>
       <!-- <van-image
        class="imgNotInfo"
        fit="cover"
        icon-prefix="toutiao"
        icon="shouji"
        round
        src="./banner.png"
        @click="$router.push('/login')"
      /> -->
      <span class="noLoginTitle">登录/注册</span>
  </van-cell-group>
  <van-grid :column-num="2" class="marBotttom4px">
    <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" />
    <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" />
  </van-grid>
  <van-cell title="消息通知" is-link />
  <van-cell title="小智同学" is-link class="marBotttom4px"/>
  <van-cell title="退出登录" v-if="user" class="titleCenter" @click="exitLogin"/>
</div>
</template>

<script>
import { getMyInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  props: {},
  components: {},
  data () {
    return {
      currentInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  // 方法集合
  methods: {
    async getPersonInfo () {
      const res = await getMyInfo()
      this.currentInfo = res.data.data
      // console.log(res)
    },
    // 退出登录操作
    exitLogin () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '您确定要退出吗?'
      })
        .then(() => {
          this.$store.commit('setUser', '')
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  created () {
    this.getPersonInfo()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.my-container {
  .bgcImage {
    height: 180px;
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
  .noLogin {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-top: 54px;
    // 未登录样式
    .imgNotInfo {
      width: 66px;
      height: 66px;
      // box-sizing: border-box;
      margin-bottom: 6px;
      background: url(./touxiang.png);
      background-size: cover;
    }
    .noLoginTitle {
      font-size: 14px;
      color: white;
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
