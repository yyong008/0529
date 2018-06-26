const Router = require('koa-router')
const path = require('path')
const axios = require('axios')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const mfs = new MemoryFS()
const webpack = require('webpack')
const VueServerRenderder = require('vue-server-renderer')
const serverConfig = require('../../build/webpack.config.server')
const serverComplier = webpack(serverConfig)
const serverRender = require('./server-render')
// mfs 写入到内存，写到内存里面快
serverComplier.outputFileSystem = mfs

let bundle

// 生成服务端渲染要用到的bundle，node中编译webpack,watch监听重新打包
serverComplier.watch({}, (err, stats) => {
  // webpack的错误
  if (err) throw err
  // eslint、非webpack的错误，通过stats来发现
  stats = stats.toJson()
  stats.errors.forEach(err => {
    console.log(err)
  })
  stats.warnings.forEach(warn => console.log(err))

  // path: path.join(__dirname, '../server-build')
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  // handlePath是字符串，vue-server-renderer使用的是json，还需要专转义json
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

// koa中间件
const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '你等一会，别着急....'
    return
  }
  // 服务端渲染只有 body 的html
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  // 读取模板
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'), 'utf-8'
  )

  // node-server 的 render 的 toToString 会用到这个方法
  const renderer = VueServerRenderder.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })
  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
