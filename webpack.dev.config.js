var path = require('path');
var webpack = require("webpack");

var config = {
  entry: [
      'webpack/hot/dev-server',   
      'webpack-dev-server/client?http://localhost:8080/',  // inline mode 自动刷新
      path.resolve(__dirname, 'src/app.js')
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint-loader'
    //   },
    // ],
    loaders: [{
      test: /\.es6|\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
      loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
      exclude: /node_modules/,
      query: {
          presets: ["es2015", "stage-0", "react"],
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"develop"'
      }
    })
  ],
  devServer: {
    proxy: {
      '/api': {
        target: isDevelop() ? 'http://localhost:3000' : 'https://test.joudou.com',
        pathRewrite: {'^/api': ''},
        secure: false
      }
    }
  },
  eslint: {
    configFile: './.eslintrc'
  }
};
 
module.exports = config;

function isDevelop(){
  console.log(process.env.NODE_ENV);
  return process.env.NODE_ENV === 'develop';
}