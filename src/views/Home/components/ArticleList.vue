<template>
  <div>
    <aeticle-item
      v-for="item in Articles"
      :key="item.art_id"
      :article="item"
    ></aeticle-item>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import AeticleItem from './AeticleItem.vue'
export default {
  data() {
    return {
      Articles: {}
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
      } catch (error) {
        if (!error.response || error.response.status === 507) {
          throw error
        } else {
          if (error.response.status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style></style>
