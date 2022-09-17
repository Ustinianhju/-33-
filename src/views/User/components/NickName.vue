<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="$emit('close')"
      @click-right="UserName"
    />
    <van-field
      v-model="locdText"
      rows="2"
      autosize
      type="textarea"
      maxlength="20"
      placeholder="请输入新昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { getUserName } from '@/api/user'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  created() {
    this.locdText = this.value
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    async UserName() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.locdText.trim() === '') return Toast.fail('请输入昵称')
        await getUserName({ name: this.locdText })
        this.$emit('input', this.locdText)
        this.$emit('close1')
        Toast.success('更新成功')
      } catch (error) {
        alert('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-field) {
  background: #f5f7f9;
}
</style>
