<template>
<div class='comment-reply'>
  <van-field
    v-model="message"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
  >
    <template #button>
      <van-button size="small" type="primary" @click="publishComment" >发布</van-button>
    </template>
  </van-field>
</div>
</template>

<script>
import { addArticleComment } from '@/api/article'
export default {
  name: 'CommentReply',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {},
  data () {
    return {
      message: '',
      art_id: null
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    async publishComment () {
      const { data } = await addArticleComment({
        target: this.articleId.toString(),
        content: this.message,
        art_id: this.art_id
      })
      console.log(data.data)
      this.$emit('addCommentItem', { data: data.data.new_obj, false: false })
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.comment-reply {
  margin: 0 10px;
}
</style>
