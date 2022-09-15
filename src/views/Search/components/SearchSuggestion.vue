<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item,index) in hightLightSuggestions"
      :key="index"
      @click="$emit('change-keywords',suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
//  map
//  - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
// 动态正则
//  - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
// - new RegExp(字符串,修饰符'ig')

// 字符串的 replace
// - 字符串.replace(正则,函数)
//  - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { getSuggestionAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keywords: {
      // 当输入第一个字母时，数据才渲染，因此不会立即监听到
      immediate: true, // 立即监听一次
      handler: 'getSuggestion'
    }
  },
  computed: {
    hightLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  },
  methods: {
    // debounce 防抖  引入 yarn add loadsh  按需引入import {debounce} from 'loadsh'
    getSuggestion: debounce(async function () {
      try {
        const { data } = await getSuggestionAPI(this.keywords)
        // console.log(data)
        // this.suggestions = data.data.option.filter(Boolean)
        this.suggestions = data.data.options.filter((item) => Boolean(item))
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style></style>
