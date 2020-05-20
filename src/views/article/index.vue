<template>
<div class='article-details'>
  <!-- 头部开始 -->
  <van-nav-bar
    class="articleHand"
    title="文章详情"
    left-arrow
    @click-left="$router.back()"
  />
  <!-- 头部结束 -->
  <!-- 文章详情内容开始 -->
  <div class="articleList fixed">
    <div class="articleTitle">{{articleMsg.title}}</div>
    <van-cell class="articleItem">
      <van-image
        slot="icon"
        class="artImage"
        fit="cover"
        round
        :src="articleMsg.aut_photo"
      />
      <div slot="title">
        <div class="autName">{{articleMsg.aut_name}}</div>
        <div class="autTime">{{articleMsg.pubdate}}</div>
      </div>
      <van-button
       :type="articleMsg.is_followed?'default':'danger'"
       :icon="articleMsg.is_followed?'':'plus'"
       class="attentionButton"
       round
       :loading="idLoading"
       @click="followed"
      >
        {{articleMsg.is_followed?'已关注':'关注'}}
      </van-button>
    </van-cell>
    <div class="articleContent markdown-body" ref="content" v-html="articleMsg.content">
    </div>
    <!-- <div class="articleOver">正文结束</div> -->
    <!-- 文章评论开始 -->
    <comment-list :source="articleId" :commentList="commentList" @totalCount="total_count=$event"/>
    <!-- 文章评论结束 -->
  </div>
  <!-- 文章详情内容结束 -->
  <!-- 底部菜单栏开始 -->
  <van-tabbar class="box">
    <van-button type="default" class="comment" round @click="show = true">评论</van-button>
    <van-tabbar-item icon="comment-o" :badge="total_count"></van-tabbar-item>
    <van-tabbar-item @click="onStart" :class="articleMsg.is_collected?'start':''" :icon="articleMsg.is_collected?'star':'star-o'"></van-tabbar-item>
    <van-tabbar-item @click="onGoodJob" :class="articleMsg.attitude===1?'goodjob':''" :icon="articleMsg.attitude===1?'good-job':'good-job-o'"></van-tabbar-item>
    <van-tabbar-item icon="share"></van-tabbar-item>
  </van-tabbar>
  <!-- 底部菜单栏结束 -->
  <!-- 评论弹出层开始 -->
  <van-popup v-model="show" position="bottom">
    <comment-reply :articleId="articleId" @addCommentItem="addCommentItem"/>
  </van-popup>
  <!-- 评论弹出层结束 -->
</div>
</template>

<script>
import './github-markdown.css'
import { getArticleItem, collection, notcollection, likings, notlikings } from '@/api/article'
import { ImagePreview } from 'vant' // 加载图片预览
import { followUser, cancelUser } from '@/api/user'
import { mapState } from 'vuex'
import CommentList from './components/articleComment-list'
import CommentReply from './components/comment-reply'
export default {
  name: 'articleDetails',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {
    CommentList,
    CommentReply
  },
  data () {
    return {
      articleMsg: {},
      idLoading: false,
      show: false,
      commentList: [],
      total_count: 0
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  // 方法集合
  methods: {
    async loadArticleDetail () {
      const res = await getArticleItem(this.articleId)
      // console.log(res)
      this.articleMsg = res.data.data
      // 1.获取Dom元素
      // 数据改变影响视图更新,不是立即的,修改数据之后马上操作dom元素,需要把这个代码放到$nextTick里边
      this.$nextTick(() => {
        const content = this.$refs.content
        const imgs = content.querySelectorAll('img')
        // console.log(imgs)
        const img = []
        imgs.forEach((item, i) => {
          img.push(item.src)
          item.onclick = function () {
            ImagePreview({
              images: img,
              startPosition: i,
              loop: false
            })
            // console.log(this)
          }
        })
      })
    },
    // 关注按钮添加事件
    async followed () {
      this.idLoading = true
      console.log(this.user)
      if (this.user) {
        if (this.articleMsg.is_followed) {
          // 取消关注
          await cancelUser(this.articleMsg.aut_id)
        } else {
          // 添加关注
          await followUser(this.articleMsg.aut_id)
        }
        this.articleMsg.is_followed = !this.articleMsg.is_followed
      } else {
        this.$router.push('/login')
      }
      this.idLoading = false
    },
    // 收藏事件
    async onStart () {
      if (this.user) {
        if (this.articleMsg.is_collected) {
          // 取消关注
          await notcollection(this.articleMsg.art_id.toString())
        } else {
          // 添加关注
          await collection(this.articleMsg.art_id.toString())
        }
        this.articleMsg.is_collected = !this.articleMsg.is_collected
      } else {
        this.$router.push('/login')
      }
    },
    // 点赞事件
    async onGoodJob () {
      if (this.user) {
        if (this.articleMsg.attitude === 1) {
          // 取消关注
          await notlikings(this.articleMsg.art_id.toString())
          this.articleMsg.attitude = -1
        } else {
          // 添加关注
          await likings(this.articleMsg.art_id.toString())
          this.articleMsg.attitude = 1
        }
      } else {
        this.$router.push('/login')
      }
    },
    // 添加评论
    addCommentItem (event) {
      this.commentList.unshift(event.data)
      this.total_count++
      this.show = event.false
    }
  },
  created () {
    this.loadArticleDetail()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.article-details {
  .articleHand {
    background-color: #3296fa;
    /deep/ .van-icon-arrow-left {
      color: white;
    }
    /deep/ .van-nav-bar__title {
      color: white;
    }
  }
  .articleList {
    background-color: white;
    .articleTitle {
      padding: 14px 14px 5px;
      font-size: 18px;
      font-weight: 700;
    }
    .articleItem {
      display: flex;
      align-items: center;
      .artImage {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .autName {
        font-size: 14px;
        color: #333333;
      }
      .autTime {
        font-size: 12px;
        color: #b4b4b4;
      }
      .attentionButton {
        width: 100px;
        height: 29px;
      }
    }
    .articleContent {
      padding: 14px 14px 5px;
      font-size: 16px;
    }
    /deep/.markdown-body ul {
      list-style: disc;
    }
    .articleOver {
      text-align: center;
      font-size: 16px;
      color: rgb(150, 151, 153);
      margin-top: 10px;
    }
  }
  /deep/ .box {
    display: flex;
    align-items: center;
    .comment {
      width: 140px;
      height: 23px;
      margin: 0 15px;
    }
    .van-icon-comment-o::before {
      color: #777777;
    }
    .start {
      color: #f89a05;
    }
    .goodjob {
      color: red;
    }
  }
  .fixed {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }
}
</style>
