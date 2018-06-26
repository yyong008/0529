const path = require('path')
const merge = require('webpack-merge')
const isDev = process.env.NODE_ENV === 'development'
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
let config

const baseConfig = require('./webpack.config.base')
const defaultPlugins = [
  new HTMLWebpackPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  // 'http:127.0.0.1:8000/vue-ssr-client-manifest.json'
  new VueClientPlugin()
]
let devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  historyApiFallback: {
    // 根目录下额index.html
    index: '/index.html'
  },
  hot: true
}

if (isDev) {
  config = merge(baseConfig, {
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
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js')
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [{
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: 'style.[contentHash:8].css'
      })
    ]),
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    }
  })
}

module.exports = config
