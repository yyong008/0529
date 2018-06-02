const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
  target: 'web',
  mode: 'development',
  entry: path.resolve(__dirname, '../client/index'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.(vue|js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      enforce: 'pre'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
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
