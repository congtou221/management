var path = require('path');
var webpack = require("webpack");

var config = {
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.es6|\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
      loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
      exclude: /node_modules/,
      query: {
        presets: ["es2015", "react"],
        plugins: [
          ["import",
           {
             libraryName: "antd",
             style: true
           }
          ]
        ]
      }
    },{
      test: /\.scss$/,
      loader: 'style!css!sass'
    },{
      test: /\.css$/,
      loader: 'style!css'
    },{
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  },
  resolve: {
    root: [__dirname],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./production.manifest.json')
    }),
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ]
}

module.exports = config;
