<template>
  <div class="article">
    <!-- 属性  @load:触底的时候触发load事件 -->
    <!-- offset：滚动条和底部距离多少的时候触发load事件，默认值位300px -->
    <!-- immediate-check：初渲染的时候是否执行load事件，默认值为true -->
    <!-- v-model="loading" -->
    <!-- loading为true，load事件不会被触发 -->
    <!-- loading为false的时候，load事件会被触发 -->
    <!-- loading会在load事件执行后，被van-list组件自动设置为true，需要手动的改为false -->
    <!-- finished:Boolean false:load事件会被触发 true：load事件不会被触发，并且显示finished-text文本 -->
    <!-- error.sync 请求出错的时候load不在会被触发，显示error-text文本 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArcicle">
      <van-list
        v-model="loading"
        @load="getNextPageArcicle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        :error.sync="error"
        error-text="请求出错，请重新加载！"
        finished-text="没有更多文章了~~"
      >
        <aeticle-item
          v-for="item in Articles"
          :key="item.art_id"
          :article="item"
        ></aeticle-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import AeticleItem from './AeticleItem.vue'

export default {
  name: 'ArticleList',
  data() {
    return {
      Articles: [],
      loading: false,
      preTimestamp: '',
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  components: { AeticleItem },
  props: {
    id: [String, Number]
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    async getFirstPageArticles() {
      // 时间戳 new Date().valueof()   Date.now()    +new Date()
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.Articles = data.data.results
        // 保存下一页的时间戳，用于分页
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        if (!error.response || error.response.status === 507) {
          throw error
        } else {
          if (error.response.status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    // 实现加载下一页的数据
    async getNextPageArcicle() {
      try {
        // if (Math.random() > 0.5) {
        //   throw new Error()  测试用
        // }

        // 发送请求
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          // 用于判断是否还能请求到文章
          this.finished = true
        }

        // 如果时下滑加载，讲数据放在最后，如果时上拉刷新，讲数据放在最前
        if (this.loading) {
          this.Articles.push(...data.data.results)
        } else {
          this.Articles.unshift(...data.data.results)
        }
        // 添加到article 不加...发送进去的是一个数组
        // 更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // finally语句一定会执行
        // 更改loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 如何给盒子拥有自己的滚动条
// 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
}

// &: 代表当前元素他爹
// ::-webkit-scrollbar : 滚动槽
// ::-webkit-scrollbar-thumb: 滚动的滑块
&::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}
&::-webkit-scrollbar-thumb {
  background-color: #3296fa;
  border-radius: 10px;
}
</style>
