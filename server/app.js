
const express = require('express');
const router = express.Router();
const path = require('path');
const proxy = require('express-http-proxy');
const jsonServer = require('./mock/jsonServer');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('../webpack.dev.config.js');
const compiler = webpack(webpackDevConfig);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

// if(process.env.NODE_ENV == 'local') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));

  app.use(webpackHotMiddleware(compiler));
// } else {
//   // 静态资源路径
//   app.use(express.static(path.join(__dirname, '../build')));
// }

// mock数据  开发环境下代理到jsonServer，生产环境代理到线上服务器
if(process.env.NODE_ENV == 'local') {
  jsonServer.listen(3004, () => {
    console.log('JSON Server is running');
  });

  app.use('/api', proxy('http://localhost:3004'));
} else {
  app.use('/api', proxy('https://test.joudou.com'));
} 

app.use('/', router);
router.get('/', function(req, res, next){
  res.render('index');
});


module.exports = app;
