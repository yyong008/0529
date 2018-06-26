const ejs = require('ejs')

// 引用名称 serverRender
module.exports = async (ctx, renderer, template) => {
  ctx.headers['Context-Type'] = 'text/html' // ?
  // 传入vue-server-renderer
  const context = {
    url: ctx.path
  }
  try {
    const appString = await renderer.renderToString(context)
    // 在context会暴露这些方法在 构建配置的 手动注入的部分

    const {
      title
    } = context.meta.inject()
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text()
    })
    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
