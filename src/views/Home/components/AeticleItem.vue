<template>
  <div>
    <van-cell
      v-if="article.cover.type === 0"
      :title="article.title"
      :label="label"
    ></van-cell>
    <van-cell
      v-else-if="article.cover.type === 1"
      :title="article.title"
      :label="label"
    >
      <van-image
        width="180"
        height="90"
        :src="article.cover.images[0]"
      ></van-image>
    </van-cell>
    <van-cell v-else-if="article.cover.type === 2" title="两张图片">
      <template #label>
        <van-image
          v-for="(item, index) in article.cover.images"
          :key="index"
          width="180"
          height="90"
          :src="item"
        ></van-image>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      /* eslint-disable */
      const { aut_name, comm_count, pubdate } = this.article
      return `${aut_name} ${comm_count}评论 ${pubdate}`
    }
  }
}
</script>

<style></style>
