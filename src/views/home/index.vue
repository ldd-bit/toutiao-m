<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button type="danger" to="/search" slot="title" class="searchInfo" icon="search" round>搜索</van-button>
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <article-list :channel="item" class="fixed"></article-list>
      </van-tab>
      <div slot="nav-right" class="noContainer"></div>
      <div slot="nav-right" class="navRight" @click="channelShow=true">
        <van-image width="1px" height="44px" fit="contain" :src="require('./border.png')" />
        <van-icon name="wap-nav" class="wapNav" />
      </div>
    </van-tabs>
    <van-popup
      v-model="channelShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      round
      get-container="body"
    >
      <channel-list
        :channel="channels"
        @active="active1($event)"
        :active="active"
        @show="show($event)"
        :channelShow="channelShow"
      ></channel-list>
    </van-popup>
  </div>
</template>

<script>
import { getchannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelList from './components/channel-list'
import { mapState } from 'vuex'
import { getToken } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  props: {},
  components: {
    ArticleList,
    ChannelList
  },
  data () {
    return {
      active: 0,
      channels: [],
      channelShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    EditClosed: {
      handler (newval, old) {
        this.edit = !newval
      }
    },
    immediate: true,
    deep: true
  },
  // 方法集合
  methods: {
    async getUserChannel () {
      if (this.user) {
        const { data } = await getchannels()
        this.channels = data.data.channels
      } else {
        if (getToken('my-channels')) {
          this.channels = getToken('my-channels')
        } else {
          const { data } = await getchannels()
          this.channels = data.data.channels
        }
      }
    },
    active1 (data) {
      this.active = data
    },
    show (data) {
      this.channelShow = data
    }
  },
  created () {
    this.getUserChannel()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.home-container {
  .app-nav-bar {
    /deep/ .van-nav-bar__title {
      max-width: unset;
      .searchInfo {
        width: 277px;
        height: 32px;
        background-color: #5babfb;
        border: 0 none;
      }
    }
  }
  .fixed {
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }
  /deep/ .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tabs__line {
    width: 15px !important;
    height: 3px;
    margin-bottom: 5px;
    background-color: #3296fa;
  }
  .noContainer {
    width: 35px;
    height: 44px;
    flex-shrink: 0;
  }
  .navRight {
    display: flex;
    position: fixed;
    right: 0;
    height: 44px;
    background-color: rgba(255, 255, 255, 0.8);
    .wapNav {
      font-size: 24px;
      line-height: 44px;
      margin: 0 5px;
    }
  }
}
</style>
