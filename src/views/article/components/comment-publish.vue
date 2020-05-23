<template>
<div class='comment-publish'>
  <van-nav-bar
    :title="`${commitItem.reply_count}条回复`"
    @click-left="$emit('false')"
  >
    <template #left>
      <van-icon name="cross" size="18" />
    </template>
  </van-nav-bar>
  <div class="content">
    <comment-item :commentItem="commitItem"/>
    <comment-list type="c" :commentList="commentList" :source="commitItem.com_id"/>
  </div>
  <van-button type="primary" class="comment" @click="showcomment = true">评论</van-button>
  <van-popup v-model="showcomment" position="bottom" style="">
    <comment-reply :articleId="commitItem.com_id" :target="articleId" @addCommentItem="addCommentItem" />
  </van-popup>
</div>
</template>

<script>
import CommentItem from './articleComment-item'
import CommentList from './articleComment-list'
import CommentReply from './comment-reply'
export default {
  name: 'CommentPublish',
  props: {
    commitItem: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentReply
  },
  data () {
    return {
      commentList: [],
      showcomment: false
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    addCommentItem (event) {
      this.commentList.unshift(event.data)
      this.commitItem.reply_count++
      this.showcomment = false
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.comment-reply {
  padding: 15px;
}
.comment-title {
  font-size: 16px;
}
.comment {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
}
.content {
  position: fixed;
  left: 0;
  right: 0;
  top: 120px;
  bottom: 40px;
  overflow-y: auto;
}
</style>
