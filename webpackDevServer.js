const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.js');

config.entry.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  contentBase: "build",
  hot: true,
  publicPath: "/assets/",
  headers: {
    "X-Custom-Header": "yes"
  },
  stats: {
    colors: true
  }
});

module.exports = server;