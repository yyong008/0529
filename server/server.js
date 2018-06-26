const path = require('path')
const send = require('koa-send')
const Koa = require('koa')
// koa'router
// const pageRouter = require('./routers/dev-ssr')
const app = new Koa()
// 服务端渲染是分开发状态和正式环境情况
const isDev = process.env.NODE_ENV === 'development'

// 中间

app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.error(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, './favicon.ico', {root: path.join(__dirname, '../')})
  } else {
    await next()
  }
})

let pageRouter

if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
