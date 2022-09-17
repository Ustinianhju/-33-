<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { getUserName } from '@/api/user'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  methods: {
    onChange(picker, value, index) {
      // console.log(index)
      this.gender = index
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await getUserName({ gender: this.gender })
        this.$emit('input', this.gender)
        this.$emit('close')
        Toast.success('更新成功')
      } catch (error) {
        Toast.fail('更新失败')
      }
    }
  }
}
</script>

<style></style>
