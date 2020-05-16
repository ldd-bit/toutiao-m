<template>
<div class='channel-list'>
  <van-nav-bar>
    <template #left>
      <span class="myChannel">我的频道</span>
      <span class="myChannelRight">点击进入频道</span>
    </template>
    <template #right>
      <van-button type="warning" plain size="mini" round @click="isEdit = !isEdit">{{isEdit? '完成' : '编辑'}}</van-button>
    </template>
  </van-nav-bar>
  <van-grid class="channelList">
    <van-grid-item class="channelItem" v-for="(item,i) in channel" :key="i" @click="isEdit === true? delChannel(i) : jumpChannel(i)">
      <span slot="text" class="textFont" :class="{activeItem : i === active}">{{item.name}}</span>
      <van-icon slot="icon" name="close" class="close" v-if="isEdit === true && i !==0"/>
    </van-grid-item>
  </van-grid>
  <van-nav-bar>
    <template #left>
      <span class="myChannel">推荐频道</span>
      <span class="myChannelRight">点击添加频道</span>
    </template>
  </van-nav-bar>
  <van-grid class="channelList">
    <van-grid-item @click="addChannel(item)" :text="item.name" class="channelItem" v-for="(item,i) in recommendChannel" :key="i"/>
  </van-grid>
</div>
</template>

<script>
import {
  getAllChannels
} from '@/api/user'
export default {
  name: 'channelList',
  props: {
    channel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  components: {},
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    recommendChannel () {
      return this.allChannels.filter((item) => {
        return !this.channel.find((data) => {
          return item.id === data.id
        })
      })
    }
  },
  watch: {},
  // 方法集合
  methods: {
    // 获取推荐频道
    async loadChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    // 添加用户频道
    async addChannel (item) {
      // const res = await editUserChannel({
      //   id: id,
      //   seq: `${this.allChannels.length}+1`
      // })
      // console.log(res)
      this.channel.push(item)
    },
    async delChannel (index) {
      if (index === 0) {
        return
      }
      if (index <= this.active) {
        this.$emit('active', this.active - 1)
      }
      this.channel.splice(index, 1)
    },
    // 跳转页面,选中频道
    jumpChannel (active) {
      this.$emit('active', active)
      this.$emit('show', false)
    }
  },
  created () {
    this.loadChannels()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.channel-list {
  padding-top: 70px;
  /deep/ .van-nav-bar  {
    background-color: unset;
  }
  /deep/ .van-hairline--bottom::after {
    border: none;
  }
  .myChannel {
    font-size: 16px;
  }
  .myChannelRight {
    font-size: 12px;
    margin-left: 10px;
    color: rgb(204, 204, 204);
  }
  .channelList {
    padding: 0 11px;
    margin-bottom: 7px;
    .channelItem {
      /deep/ .van-grid-item__content {
        position: relative;
        width: 80px;
        height: 43px;
        margin-bottom: 14px;
        background-color: rgb(244, 245, 246);
        .van-grid-item__icon-wrapper {
          position: unset;
          .close {
            position: absolute;
            right: -6px;
            top: -6px;
            font-size: 16px;
          }
        }
      }
      .textFont {
        font-size: 12px;
        color: rgb(100, 101, 102);
      }
      .activeItem {
        color: orangered;
      }
    }
  }
}
</style>
