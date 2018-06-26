// 作为入入口文件
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStrore from '../store/store'
Vue.use(VueRouter)
Vue.use(Vuex)
const router = createRouter()
const store = createStrore()

// 异步加载模块
store.registerModule('c', {
  state: {
    text: 3
  }
})

store.watch((state) => state.count + 1, (newCount) => {
  console.log('new count watch', newCount)
})

// store.subscribe((mutation, state) => {
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

router.beforeEach((to, from, next) => {
  console.log('[全局的]-before each invoked', `${to.fullPath}`)
  // if (to.fullPath === '/app') {
  //   next({path: '/login'}) // next() 没有被调用的时候是不会跳转路由的
  // } else {
  //   next()
  // }
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('[全局的]-before resolve invoked')
  next() // next() 没有被调用的时候是不会跳转路由的
})

router.afterEach((to, from) => {
  console.log('[全局的]-bafter each invoked')
})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
