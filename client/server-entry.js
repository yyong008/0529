import createApp from './create-app'
// server-render.js 中
//    const appString = await renderer.renderToString(context)
// 这里的 context 是服务端渲染模板时传入的
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    // 主动调用路由进行导航
    router.push(context.url)
    // 异步操作 才会调用回调，获取数据的操作 api 还没有做
    router.onReady(() => {
      // 异步操作，组件中写一些内容，异步的数据请求
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        console.log(matchedComponents)
        return reject(new Error('no component matched 没有匹配到组价'))
      }
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
