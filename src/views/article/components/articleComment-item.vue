<template>
<div class='comment-item'>
  <van-cell class="articleItem">
    <van-image
      slot="icon"
      class="artImage"
      fit="cover"
      round
      :src="commentItem.aut_photo"
    />
    <div slot="title" class="autName">
      <div>{{commentItem.aut_name}}</div>
      <div class="center" @click="goodJob">
        <van-icon  :name="commentItem.is_liking?'good-job':'good-job-o'" />
        <span>{{commentItem.like_count}}</span>
      </div>
    </div>
    <div slot="label" class="autTime">
      <div class="commentContent">{{commentItem.content}}</div>
      <div>
        <span>{{commentItem.pubdate | relativeTime}}</span>
        <van-button @click="$emit('replyShow', true)" type="default" round class="commentReply">回复{{commentItem.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</div>
</template>

<script>
import { likingComment, nolikingComment } from '@/api/article'
export default {
  name: 'CommentItem',
  props: {
    commentItem: {
      type: Object,
      required: true
    }
  },
  components: {},
  data () {
    return {
      show: false
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    async goodJob () {
      if (this.commentItem.is_liking) {
        await nolikingComment(this.commentItem.com_id.toString())
        this.commentItem.like_count--
      } else {
        await likingComment(this.commentItem.com_id.toString())
        this.commentItem.like_count++
      }
      this.commentItem.is_liking = !this.commentItem.is_liking
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.articleList {
  background-color: white;
  .articleTitle {
    padding: 14px 14px 5px;
    font-size: 18px;
    font-weight: 700;
  }
  .articleItem {
    .artImage {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .autName {
      font-size: 14px;
      color: #333333;
      display: flex;
      justify-content: space-between;
      .center {
        display: flex;
        .van-icon {
          display: flex;
          align-self: center;
        }
      }
    }
    .autTime {
      font-size: 12px;
      color: #b4b4b4;
      .commentContent {
        margin: 10px 0;
      }
      .commentReply {
        margin-left: 12px;
        font-size: 12px;
        width: 65px;
        height: 24px;
        background-color: #f4f5f6;
      }
    }
  }
}
</style>
