const webpack = require('webpack');

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