<template>
  <div>
    <van-icon
      color="#ffa500"
      :name="value ? 'star' : 'star-o'"
      @click="Collect"
    />
  </div>
</template>

<script>
import { addArticles, delArticles } from '@/api'
export default {
  props: {
    value: {
      type: Boolean
      // required: true
    },
    articleId: {
      type: [Number, String]
      // required: true
    }
  },
  methods: {
    async Collect() {
      try {
        if (this.value) {
          await delArticles(this.articleId)
        } else {
          await addArticles(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '取消收藏' : '收藏成功')
      } catch (error) {
        // console.log(error)
        this.$toast.fail('请重试')
      }
    }
  }
}
</script>

<style></style>
