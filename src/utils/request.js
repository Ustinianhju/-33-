// 引入并配置axios
import store from '@/store'
import axios from 'axios'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000
const request = axios.create({
  // 克隆axios  ,目的：当页面有两个不同的baseURL时，可以进行再复制一份并导出，不用再新建文件
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器：请求做些事情
// config是每一次请求的配置对象
request.interceptors.request.use(
  function (config) {
    // 每一次发送请求都会执行
    // 登陆了，所有的请求都加上Authorization
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config // 必须返回config
  },
  function (error) {
    console.log(error)
  }
)
export default request
