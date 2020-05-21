<template>
<div class='birthday-content'>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择时间"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel="$emit('close')"
    @confirm="changeDate"
  />
</div>
</template>

<script>
import dayjs from 'dayjs'
import { editUserInfo } from '@/api/user'
export default {
  name: 'BrithdayIndex',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    async changeDate (value) {
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 0
      })
      const date = dayjs(value).format('YYYY-MM-DD')
      // console.log(date)
      await editUserInfo({
        birthday: date

      })
      this.$emit('input', date)
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
