<template>
<div class='search-history'>
  <van-cell-group>
    <van-cell title="历史记录">
      <div v-if="isDelete">
        <span class="marginRight" @click="$emit('deleteAll', [])">全部删除</span>
        <span @click="isDelete = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDelete = true"/>
    </van-cell>
    <van-cell :title="item" v-for="(item,i) in history" :key="i">
      <van-icon name="close" v-show="isDelete" @click="isDelete?deleteHistory(i):jumpList"/>
    </van-cell>
  </van-cell-group>
</div>
</template>

<script>
import { setToken } from '@/utils/storage'
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
      isDelete: false
    }
  },
  computed: {},
  watch: {
    history: {
      handler () {
        setToken('search-history', this.history)
      },
      immediate: true
    }
  },
  // 方法集合
  methods: {
    // 删除历史记录
    deleteHistory (index) {
      this.history.splice(index, 1)
      // console.log(index)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.marginRight {
  margin-right: 10px;
}
</style>
