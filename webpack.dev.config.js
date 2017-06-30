var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MyPlugin = require('./myPlugin');

var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var config = {
  entry: {
       page: [path.resolve(__dirname, 'src/app.js'), hotMiddlewareScript]
  },
  output: {
    publicPath: 'http://localhost:3000/',
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
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
    },{
      test: /\.html$/,
      loader: 'html'
    }]
  },
  resolve: {
    root: [__dirname],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dev.manifest.json'),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'server/view/index.html'),
      filename: 'index.html',
      hash: true
    }),
    new MyPlugin({
      path: './build',
      filename: 'vendors.dll.js',
      hash: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ],
  eslint: {
    configFile: './.eslintrc'
  }
};

module.exports = config;
