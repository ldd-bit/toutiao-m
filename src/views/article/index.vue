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
  <div class="articleList">
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
      <van-button :type="articleMsg.is_followed?'default':'danger'" :icon="articleMsg.is_followed?'':'plus'" class="attentionButton" round>{{articleMsg.is_followed?'已关注':'关注'}}</van-button>
    </van-cell>
    <div class="articleContent markdown-body" ref="content" v-html="articleMsg.content" v-lazy="articleMsg.content">
    </div>
  </div>
  <!-- 文章详情内容结束 -->
</div>
</template>

<script>
import './github-markdown.css'
import { getArticleItem } from '@/api/article'
import { ImagePreview } from 'vant' // 加载图片预览

export default {
  name: 'articleDetails',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {},
  data () {
    return {
      articleMsg: {}
    }
  },
  computed: {},
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
        console.log(imgs)
        const img = []
        imgs.forEach((item, i) => {
          img.push(item.src)
          item.onclick = function () {
            ImagePreview({
              images: img,
              startPosition: i,
              loop: false
            })
            console.log(this)
          }
        })
      })
      // 给每个img添加点击事件
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
  }
}
</style>
