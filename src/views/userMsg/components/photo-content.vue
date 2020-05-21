<template>
<div class='photo-container'>
  <img :src="this.image" class="image" alt="" ref="image">
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
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
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
      image: window.URL.createObjectURL(this.perviewPhoto),
      cropper: null // cropper实例
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    async changePhoto () {
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 0
      })
      const file = await this.getCroppedCanvas()
      const data = new FormData()
      data.append('photo', file)
      await editUserPhoto(data)
      this.$emit('updata-photo', window.URL.createObjectURL(file))
      this.$emit('close')
      this.$toast.success('上传成功')
    },
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    }
  },
  created () {},
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>
<style lang='less' scoped>
.photo-container {
  background-color: black;
  height: 100%;
}
.image {
  display: block;
  max-width: 100%;
  height:"50%";
  margin: 0 auto;
  background-size: cover;
}
.bottomNav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
}
</style>
