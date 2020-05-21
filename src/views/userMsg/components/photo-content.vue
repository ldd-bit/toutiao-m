<template>
<div class='photo-container'>
  <van-image
    class="image"
    width="100%"
    height="50%"
    fit="contain"
    :src="this.image"
  />
  <van-nav-bar
    @click-right="changePhoto"
    class="bottomNav"
    left-text="返回"
    right-text="裁剪"
    @click-left="$emit('close')"
  />
</div>
</template>

<script>
import { editUserPhoto } from '@/api/user'
export default {
  name: 'PhotoIndex',
  props: {
    perviewPhoto: {
      type: File,
      required: true
    }
  },
  components: {},
  data () {
    return {
      image: window.URL.createObjectURL(this.perviewPhoto)
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    async changePhoto () {
      const data = new FormData()
      data.append('photo', this.perviewPhoto)
      await editUserPhoto(data)
      this.$emit('updata-photo', this.image)
      this.$emit('close')
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.photo-container {
  background-color: black;
  height: 100%;
}
.bottomNav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
}
</style>
