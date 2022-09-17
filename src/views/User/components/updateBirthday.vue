<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="getUserInfo"
    />
  </div>
</template>

<script>
import { getUserName } from '@/api/user'
import { Toast } from 'vant'
import dayjs from '@/utils/dayjs'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async getUserInfo() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await getUserName({ birthday: dayjs(this.currentDate).format('YYYY-MM-DD') })
        this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
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
