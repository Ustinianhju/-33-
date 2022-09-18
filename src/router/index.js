import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// SPA 首屏加载速度很慢
// 路由懒加载   使用到了路由页面，再去请求他
// 懒加载的chunk 默认的名字是模块的路径
// webpack魔法注释：/*webpackChunkName:"新名字" */
const routes = [
  {
    // 懒加载，只有用到该网页的时候才加载网页
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName: "bask" */ '@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/User',
    component: () => import(/* webpackChunkName:"User" */ '@/views/User')
  },
  {
    path: '/article/:articleId',
    component: () => import(/* webpackChunkName:"Article" */ '@/views/article'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
