# webpack 打包 vue 应用

    * webpack@4.10.0
    * webpack-cli@2.1.4

    * vue@2.5.16
    * vue-loader@15.2.2
    * vue-template-compiler@2.5.16

    - stylus
    - stylus-loader

    * css-loader@0.28.11
    * vue-style-loader
    * postcss-loader@2.1.5
    * autoprefixer@8.5.1

    * babel-preset-env@1.7.0
    * babel-core@6.26.3
    * babel-loader@7.1.4
    * babel-plugin-syntax-jsx@6.18.0
    * babel-plugin-transform-vue-jsx@3.7.0
    * babel-helper-vue-jsx-merge-props@2.0.3

    * file-loader@1.1.11
    * url-loader@1.0.1

    * webpack-dev-server@3.1.4

    * cross-env@5.1.6

    * html-webpack-plugin@3.2.0

    * mini-css-extract-plugin@0.4.0

    + rimraf@2.6.2

## 区分 development 和 production

```js
const isDev = process.env.NODE_ENV === "development";
```

## webpack.config.base.js

1. 主要存放公共的出入口和 mode、target

    target
    mode
    entry
    output

1. css 的预处理是 stylus 由于 css 涉及到 css 提取所以对 stylus 的处理是分

    dev
    prod
    两种环境

3..vue 文件的处理

    ..vue 文件=> vue-loader + vue-loader/lib/plugin + new VueLoaderPlugin()

    js 将/node_modules/加入白名单

    都需要单独的loader进行处理

4..jsx 文件的处理
    babel-loader

5.图片文件

url-loader filer-loader

## webpack.config.client.js

需要另外: entry
output
stylus + 提取 css + plugin
optimization

## vue-loader 的 options
