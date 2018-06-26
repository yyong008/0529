const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const createVueLoaderOptions = require('./vue-loader.config')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  mode: 'development',
  entry: path.resolve(__dirname, '../client/client-entry.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'http://127.0.0.1:8000/public/'
  },
  module: {
    rules: [{
      test: /\.(vue|js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      enforce: 'pre'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: createVueLoaderOptions(isDev)
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader'
    }, {
      test: /\.(png|jpg|jpeg|svg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'resources/[path][name]-[hash].[ext]'
        }
      }
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
module.exports = config
