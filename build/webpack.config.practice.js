const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const defaultPlugins = [
  new HTMLWebpackPlugin({
    title: 'practice',
    template: path.join(__dirname, 'template.html')
  })
]
let devServer = {
  port: 9000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
}

let config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  module: {
    rules: [{
      test: /\.styl(us)?$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }]
  },
  devtool: '#cheap-module-eval-source-map',
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  devServer,
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
