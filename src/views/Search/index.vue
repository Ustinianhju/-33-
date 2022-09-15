<template>
  <div>
    <!-- 结构：页面结构有四个，搜索框，搜索历史，建议，搜索结果，而后三个只显示一个 -->
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索历史/建议/搜索结果 -->
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-result></search-result> -->
    <component
      :keywords="keywords"
      :is="componentsName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    ...mapState(['histories']),
    componentsName() {
      // 搜索历史：搜索框的值为空
      // 搜索建议：搜索框有值，并且不渲染搜索结果
      // 搜索结果：触发搜索时，显示搜索结果
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      // this.keywords一定有值
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      // 即不渲染搜索结果也不渲染搜索历史
      return 'SearchSuggestion'
    }
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 把keywords关键词存起来
      // 1.用户手动敲回车 2.点击了搜索建议
      // 去重：1.获取没有去重的数组[keywords, ...this.histories] 2.放在new Set(arr)  3.[...set]将set数组原封不动的解析到数组中
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      // 将搜索历史存储到本地
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>
<!-- class和style属性的特殊 -->
<!-- vue自动把class和style合并到组件的根节点上 -->
<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
