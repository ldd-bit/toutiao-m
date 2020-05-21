<template>
<div class='sex-container'>
  <van-picker
    title="标题"
    show-toolbar
    :default-index="this.value"
    :columns="columns"
    @confirm="onConfirm"
    @cancel="$emit('close')"
  />
</div>
</template>

<script>
import { editUserInfo } from '@/api/user'
export default {
  name: 'SexIndex',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  components: {},
  data () {
    return {
      columns: ['男', '女']
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 0
      })
      await editUserInfo({
        gender: index
      })
      this.$emit('input', index)
      this.$emit('close')
      this.$toast.success('上传成功')
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
