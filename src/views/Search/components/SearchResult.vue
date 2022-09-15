<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        // 发送请求
        const { data } = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        if (data.data.results.length === 0) {
          // 当请求数据页面不满时，会向后台一直请求数据，加一个if判断，当没有数据时，不会一直发送请求
          this.finished = true
        }
        // 保存数据
        // this.results = data.data.results
        // this.results.push(...data.data.results)
        // 将页面展示的数据结构出来，在将获取到的数据进行解构，两者加在一起放进一个新数组中，并展示到页面
        this.results = [...this.results, ...data.data.results]
      } catch {
        this.error = true
      } finally {
        // 关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
// overflow和auto用法基本一致
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
