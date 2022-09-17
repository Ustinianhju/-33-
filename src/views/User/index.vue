<template>
  <div>
    <!-- 个人信息导航 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>

    <!-- 信息修改 -->
    <input
      type="file"
      ref="file"
      hidden
      accept=".png,.pdf,.jpg"
      @change="selectPhoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="avator" />
    </van-cell>
    <!-- 更新头像的弹出层 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updata-avator
        v-if="isShowPhoto"
        :avator.sync="avator"
        :photo="photo"
      ></updata-avator>
    </van-popup>
    <!-- 昵称，性别，生日 -->
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isShowPhoto1 = true"
    />
    <van-popup
      v-model="isShowPhoto1"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <nick-name
        v-if="isShowPhoto1"
        v-model="user.name"
        @close="isShowPhoto1 = false"
      ></nick-name>
    </van-popup>

    <!-- 性别 -->
    <van-cell
      title="性别"
      :value="user.gender ? '女' : '男'"
      is-link
      @click="isShowPhoto2 = true"
    />
    <van-popup
      v-model="isShowPhoto2"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <gender-navigation
        v-if="isShowPhoto2"
        v-model="user.gender"
        @close="isShowPhoto2 = false"
      ></gender-navigation>
    </van-popup>

    <!-- 生日 -->
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isShowPhoto3 = true"
    />
    <van-popup
      v-model="isShowPhoto3"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <update-birthday
        v-if="isShowPhoto3"
        v-model="user.birthday"
        @close="isShowPhoto3 = false"
      ></update-birthday>
    </van-popup>
  </div>
</template>

<script>
// 1.点击修改头像  -手动的触发input:file的点击事件
// 2.获取用户选择的图片  给input:file绑定change
// 选择的图片被保存在了input:file.value属性上，这个属于保存的文件的绝对路径
// 选择的图片还被保存在files数组中，保存的file对象
// 3.如何将file对象转成base64
// fileReader:文件阅读器
// const fr = new FileReader()  fr.readAsDataURL(file)
// 接收读取的结果:frameElement.onload = (e) => { e.target.result/base64/}

// input:file   hidden:等于display:none显示与隐藏   accept：规定file选择文件的类型
import UpdataAvator from './components/UpdataAvator.vue'
import NickName from './components/NickName.vue'
import genderNavigation from './components/genderNavigation.vue'
import updateBirthday from './components/updateBirthday.vue'
import { resolveTobase64 } from '@/utils'
import { getUserProfile } from '@/api/user'
export default {
  components: { UpdataAvator, NickName, genderNavigation, updateBirthday },
  data() {
    return {
      isShowPhoto: false,
      isShowPhoto1: false,
      isShowPhoto2: false,
      isShowPhoto3: false,
      photo: '',
      avator: '',
      user: {}
    }
  },
  created() {
    this.UserProfile()
  },
  methods: {
    async selectPhoto() {
      // 获取到用户选择的图片
      const file = this.$refs.file.files[0]
      // console.log(file)
      // file对象转成img.src可识别的属性
      // 可将file对象转为base64

      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {           // 不优雅
      //   console.log(e.target.result)
      // }
      const base64 = await resolveTobase64(file)
      this.photo = base64
      // 图片传过去并打开弹窗
      this.isShowPhoto = true

      // 解决不能连续选中同一张图片的bug
      this.$refs.file.value = ''
    },
    async UserProfile() {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (error) {
        alert('获取用户信息失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }
  :deep(.van-icon) {
    color: #fff !important;
  }
}
</style>
