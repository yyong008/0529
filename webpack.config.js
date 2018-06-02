const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isDev = process.env.NODE_ENV === 'development'
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  target: 'web',
  mode: 'development',
  entry: path.join(__dirname, 'src/index'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.styl(us)?$/,
      use: [
        isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          }
        },
        'stylus-loader'
      ]
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader'
    }, {
      test: /\.(png|jpg|jpeg|svg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: '[name]--aaa.[ext]'
        }
      }
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      title: 'todolist'
    })
  ]
}

//用isDev来区分 dev 和 prod
if (isDev) {
  config.devtool = "#cheap-module-eval-source-map"
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  )
} else {
  config.entry = {
      app: path.join(__dirname, 'src/index')
    },
    config.output.filename = '[name].[chunkhash:8].js'
  config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'style.[contentHash:8].css'
      })
    ),
    config.optimization = {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    }
}

module.exports = config;
