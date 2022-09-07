// 引入并配置axios
import axios from 'axios'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000
const request = axios.create({
  // 克隆axios  ,目的：当页面有两个不同的baseURL时，可以进行再复制一份并导出，不用再新建文件
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})
export default request
