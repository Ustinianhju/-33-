<template>
  <div>
    <router-view></router-view>
    <!-- <h1>{{ count }}</h1>
    <span>count的10倍:{{ bigNum }}</span
    ><br />
    <button @click="SET_COUNT(10)">朱文涛</button> -->
  </div>
</template>

<script>
// mapState --> 将vuex里面state映射到computed
// 使用 引入mapState：函数，返回一个对象
// 参数：['映射的属性']

// mapGetters --> 将vuex里面getters映射到computed

// mapMutations --> 将vuex的mutations方法映射到methods
// import { mapState, mapGetters, mapMutations } from 'vuex'
// // console.log(mapState(['count']))
// export default {
//   methods: {
//     // increment() {
//     // this.$store.commit('SET_COUNT', 10)
//     // }
//     ...mapMutations(['SET_COUNT'])
//   },
//   computed: {
//     ...mapState(['count']),
//     ...mapGetters(['bigNum'])
//   }
// }

// 声明一个变量，放在vuex
// vuex声明的变量
// state里声明
// 取:{{$store.state.属性名}}

// Vuex修改数据，遵循自产自销
// 规范：函数命名采用大驼峰
// mutations：函数

// 触发 mutations 里面的方法
// this.$store.commit('mutation方法名字')

// getters --> 相当于computed计算属性
// getters的函数，第一个参数是state

// state: {
//     count: 0
//   },
//   getters: {
//     bigNum(state) {
//       return state.count * 10
//     }
//   },
//   mutations: {
//     SET_COUNT(state, palyoad) {
//       state.count += palyoad
//     }
//   }
</script>

<style scoped></style>
