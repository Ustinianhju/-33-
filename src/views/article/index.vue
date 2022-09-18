<template>
  <div class="article-container">
    <!-- 导航区 -->
    <van-nav-bar title="黑马头条" left-arrow @click-left="$router.push('/')" />

    <!-- 主体部位 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->
      <!-- 文章详情 -->
      <div v-else-if="articlea.title" class="article-detail">
        <h1 class="article-title">{{ articlea.title }}</h1>
        <hr style="border-color: rgb(241, 243, 245)" />

        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articlea.aut_photo"
          />
          <div slot="title" class="user-name">{{ articlea.aut_name }}</div>
          <div slot="label" class="publish-date">{{ articlea.pubdate }}</div>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            v-if="!articlea.is_followed"
            round
            size="small"
            icon="plus"
            :loading="isFollowLoading"
            @click="onFollow"
            >关注</van-button
          ><van-button
            v-else
            class="follow-btn"
            round
            size="small"
            icon="plus"
            :loading="isFollowLoading"
            @click="onFollow"
            >以关注</van-button
          >
        </van-cell>
        <!-- 正文 -->
        <div
          class="article-content markdown-body"
          v-html="articlea.content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="newsContent" class="retry-btn">点击重试</van-button>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <article-collection :articleId="articlea.art_id" v-model="articlea.is_collected"></article-collection>
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import '../../../node_modules/github-markdown-css/github-markdown.css'
import { getnewsContent } from '@/api/articles'
import { addFollow, delFollow } from '@/api'
import articleCollection from './components/articleCollection.vue'
export default {
  data() {
    return {
      articlea: {},
      errStatus: 0,
      isLoading: false,
      isFollowLoading: false
    }
  },
  components: { articleCollection },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  created() {
    this.newsContent()
  },
  methods: {
    async newsContent() {
      try {
        // console.log(this.articleId)
        const { data } = await getnewsContent(this.articleId)
        // console.log(data)
        this.articlea = data.data
        // console.log(this.articlea.is_followed)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        } else {
          throw error
        }
        this.isLoading = false
      }
    },
    async onFollow() {
      try {
        this.isFollowLoading = true
        const articleq = this.articlea.aut_id
        if (this.articlea.is_followed) {
          await delFollow(articleq)
        } else {
          await addFollow(articleq)
        }
        this.articlea.is_followed = !this.articlea.is_followed
      } catch (error) {
        console.log(error)
        this.$toast.fail('关注失败')
      }
      this.isFollowLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }
    :deep(.user-info) {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
