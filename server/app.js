const express = require('express');
const router = express.Router();
const path = require('path');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');

const app = express();

const proxy = require('express-http-proxy');
const jsonServer = require('./mock/jsonServer');

const controller = require('./controller/index');

// view engine setup
app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'view'));

// app.set('views', path.join(__dirname, 'view'));
// app.set('view engine', 'ejs');

// local variables for all views
app.locals.env = process.env.NODE_ENV || 'local';
app.locals.reload = true;

if(process.env.NODE_ENV == 'local') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackDevConfig = require('../webpack.dev.config.js');

  const compiler = webpack(webpackDevConfig);

  app.use(express.static(path.join(__dirname, '../build')));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));

  app.use(webpackHotMiddleware(compiler));

} else {
  // 静态资源路径
  app.use(express.static(path.join(__dirname, '../dist')));
}

// mock数据  开发环境下代理到jsonServer，生产环境代理到线上服务器
if(process.env.NODE_ENV == 'local') {
  jsonServer.listen(3004, () => {
    console.log('JSON Server is running');
  });

  app.use('/api', proxy('http://localhost:3004'));
} else {
  app.use('/api', proxy('https://beta.joudou.com'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//路由
controller(app);

module.exports = app;
